# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start both Vite (port 5173) and Express proxy (port 3001) via concurrently
npm run server   # Express proxy only
npm run build    # Production build
```

Requires a `.env` file at the root with `ANTHROPIC_API_KEY=...` (see `.env.example`).

## What This App Is

An AI-powered solo D&D campaign set in Barovia (Curse of Strahd). Three sequential phases:

**Landing** → animated Gothic title screen
**Setup** → player enters name and picks a class
**CharGen** → rolls 4d6 drop lowest for STR/DEX/CON/INT/WIS/CHA, shows modifiers, allows rerolls, calculates starting HP
**Play** → split-pane: character sheet (left) + DM chat (right)

## Architecture

### Phase state machine
`App.jsx` owns `phase` and `character` state. Each phase renders its own full-screen component; no router. `character` is assembled incrementally: Setup adds `name/class/hitDie`, CharGen adds `stats/maxHp/hp/inventory`.

### Backend proxy (`server.js`)
Express on port 3001. Single endpoint: `POST /api/chat` accepts `{ messages, system }`, calls `claude-sonnet-4-6`, returns `{ content }`. Vite proxies `/api/*` to it in dev. The API key never reaches the client bundle.

### Tag system (`src/lib/parseTags.js`)
DM appends tags at the end of responses. `parseTags(rawText)` strips them from the display string and returns an array of tag objects. Raw text (tags included) is kept in `apiHistory` sent to the API so the model can reference its own prior actions.

| Tag | Effect |
|-----|--------|
| `[MONSTER:slug]` | Fetches from dnd5eapi.co, stored in `character.activeMonster` |
| `[ITEM:+name]` / `[ITEM:-name]` | Adds/removes from `character.inventory` |
| `[STAT:hp:N]` | Sets `character.hp` to N |
| `[ROLL:skill:dc]` | Auto-rolls d20 + stat modifier, shows a roll card, auto-replies to DM with result |

### Play phase flow (`src/components/Play.jsx`)
On mount, sends an opening prompt automatically. `sendToAPI(apiHistory, displayMessages)` is the core function — posts to `/api/chat`, parses the response, updates display messages, then calls `processTags`. Roll tags trigger another `sendToAPI` call with the result injected as a user message. The system prompt is rebuilt on every send via `buildSystemPrompt(character)` (`src/lib/systemPrompt.js`) so HP and inventory are always current.

### OOC
Messages beginning with `(` are flagged as out-of-character. The DM is instructed to drop the narrative voice and, for knowledge questions, emit a `[ROLL:]` tag before answering.

### Key files
- `src/lib/systemPrompt.js` — DM persona, tag format instructions, character context
- `src/lib/parseTags.js` — tag regex parser
- `src/lib/fetchMonster.js` — hits dnd5eapi.co directly from client (no auth)
- `src/data/classes.js` — class list with hit dice (shared by Setup and CharGen)
- `src/components/CharacterSheet.jsx` — left panel; also contains inline `MonsterBlock`
