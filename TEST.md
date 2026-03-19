# Test Mode

Type `/test [command]` in the play input to trigger test mode. Test commands are intercepted before they reach the campaign — they do not appear in the message history and do not affect the DM's memory of the session.

---

## Shorthand commands

These run instantly with no API call. They inject UI components directly so you can check rendering without playing through a scenario.

### Roll prompt card
```
/test rollprompt [skill]
```
Injects a player-click roll button for the given skill. Click it to see the roll resolve and the auto-send to the DM.

**Examples:**
```
/test rollprompt perception
/test rollprompt stealth
/test rollprompt arcana
/test rollprompt animal_handling
```
Skill names match the tag system: `athletics`, `acrobatics`, `stealth`, `arcana`, `history`, `investigation`, `nature`, `religion`, `animal_handling`, `insight`, `medicine`, `perception`, `survival`, `deception`, `intimidation`, `performance`, `persuasion`, or any ability name (`strength`, `dexterity`, etc.).

---

### Completed roll card
```
/test roll [skill] [total] [dc?]
```
Injects a completed roll card. `total` is the final result. `dc` is optional — if omitted, no success/failure line is shown (matching a player-prompted roll with no set DC).

**Examples:**
```
/test roll perception 14        ← no DC, just the total
/test roll stealth 8 12         ← DC 12, shows Failure
/test roll athletics 20 15      ← DC 15, shows Success
/test roll constitution 1       ← shows NAT 1
```

---

### Rest card
```
/test rest short
/test rest long
```
Injects a short or long rest event card. Does not modify HP or spell slots — visual only.

---

### Level-up card
```
/test levelup [level]
```
Injects a level-up event card **and updates character state** — level, max HP, prof bonus, and spell slots all advance as they would in a real level-up. Spell slots use the same table as the campaign.

**Examples:**
```
/test levelup 2
/test levelup 5
```

---

### HP change
```
/test hp [value]
```
Sets the character's current HP directly. Updates the character sheet immediately. No message is injected — check the HP bar in the sheet panel.

**Examples:**
```
/test hp 1       ← near death
/test hp 0       ← dying
/test hp 999     ← capped at maxHp
```

---

## Free-text mode

Any `/test` command that doesn't match a shorthand above is sent to Claude with a stripped-down test system prompt. Claude is instructed to produce a short narrative and emit whatever tags demonstrate your scenario. The response goes through the full pipeline — `parseTags`, `applyTags`, rendering — so this tests end-to-end behaviour.

The test request is **isolated from campaign history**. The DM will not remember it.

**Examples:**
```
/test a wolf attacks
/test the player casts fireball and uses a 3rd level spell slot
/test emit a ROLLPROMPT for stealth followed by a monster encounter
/test apply the poisoned condition and drop HP to 4
/test a long rest at the Blue Water Inn
/test the tarokka reading scene
/test bold and italic markup in a DM response
```

### Tips

- **Tag combinations** — Claude will attempt to emit multiple tags in one response. Ask for compound scenarios: `/test a combat encounter that starts with a perception rollprompt`.
- **Spell slot deduction** — `/test use a 2nd level spell slot` will fire `[SPELL:slot:2]` and update the sheet's slot display.
- **Condition testing** — `/test apply exhausted and frightened conditions` is faster than triggering them through gameplay.
- **Markup rendering** — `/test a message with bold and italic text` checks that `**bold**` and `*italic*` render correctly.
- **Edge cases** — `/test HP drops to 0` will trigger the death state display.

---

## What test mode does not do

- Test commands are **not added to campaign history**. The DM will not reference them.
- Free-text tests do **not use the campaign system prompt** — the DM persona, location context, and Strahd lore are absent. Responses will be shorter and more mechanical.
- Character state mutations from free-text tests (HP changes, inventory, spell slots) **are real** and will persist. Use `/test hp [value]` to reset HP afterward if needed.
