import { BACKGROUNDS } from "../data/backgrounds.js";
import { CONDITIONS } from "../data/conditions.js";
import { CLASS_CONFIG, CLASS_FEATURE_LABELS, getClassFeatureMax } from "../data/classes.js";
import { SUBCLASS_CONFIG, getFeatureLabel } from "../data/subclasses.js";
import { SK, SA, mod, modStr } from "./dnd.js";
import { LOCATIONS } from "../data/locations/index.js";
import { CLASS_SEEDS, BACKGROUND_SEEDS, CLOSING_LINES } from "../data/seeds.js";
import { STRAHD_LORE } from "../data/strahd.js";
import { FACTIONS_LORE } from "../data/factions.js";
import { DARK_POWERS_LORE } from "../data/darkpowers.js";
import { TAROKKA_INFORMATION } from "../data/tarokka.js";
import {
  KEY_INFORMATION, PROSE_STYLE, OPENING, EXAMPLES, TONE,
  KNOWLEDGE_DISCIPLINE, UNCERTAINTY, OOC, LOCATION_FLOW, FORMATTING,
  LEVEL_UP_SPELLS, RESTS, DEATH_AND_DYING, MAGIC_RULES, EPILOGUE,
} from "../data/dmPromptSections.js";

export function buildSystemPrompt(character) {
  const {
    name,
    class: cls,
    background,
    profs,
    expertise,
    personality,
    ideal,
    bond,
    flaw,
    equip,
    stats,
    maxHp,
    ac,
    hd,
    hp,
    inventory,
    conditions,
    subclass,
    companions,
  } = character;
  const bg = BACKGROUNDS[background];
  const classNarrative = CLASS_CONFIG[cls]?.narrative ?? "";
  const subclassLevel = CLASS_CONFIG[cls]?.subclassLevel ?? 3;
  const subclassActive = (character.level ?? 1) >= subclassLevel;
  const subclassDesc = subclass
    ? (CLASS_CONFIG[cls]?.subclasses?.find((s) => s.name === subclass)?.desc ??
      "")
    : "";

  const statLine = SK.map(
    (k) => `${SA[k]} ${stats[k]}(${modStr(stats[k])})`,
  ).join(" ");
  const inv = inventory?.length
    ? inventory.join(", ")
    : equip?.join(", ") || "none";
  const slots = character.spellSlots;
  const slotStr = Array.isArray(slots)
    ? slots
        .map((s) => `${s.total - (s.used ?? 0)}/${s.total} L${s.level}`)
        .join(", ")
    : null;
  const spellsKnownStr = character.spellsKnown
    ?.map((s) => (typeof s === "string" ? s : `${s.name} (${s.level}th)`))
    .join(", ");
  const spellLine = character.cantrips?.length
    ? `Cantrips: ${character.cantrips.join(", ")} | Spells known: ${spellsKnownStr} | Spell slots: ${slotStr ?? "none"}${character.shortRestCaster ? " (short rest)" : ""}`
    : null;
  const cfMax = getClassFeatureMax(cls, stats, character.level ?? 1, subclass)
  const cf = character.classFeatures
  const cfLine = cf && Object.keys(cfMax).length
    ? Object.entries(cfMax).map(([k, max]) => `${getFeatureLabel(k, subclass) ?? CLASS_FEATURE_LABELS[k] ?? k}: ${cf[k] ?? max}/${max}`).join(' | ')
    : null
  const scDmNotes = subclass && subclassActive ? (SUBCLASS_CONFIG[subclass]?.dmNotes ?? null) : null

  const statFlavor = [
    stats.charisma >= 14
      ? 'High CHA — NPCs warm to them faster than expected; there is something magnetic or striking about their presence that others register without quite naming.'
      : stats.charisma <= 8
      ? 'Low CHA — something about them makes others subtly uneasy; trust comes slower, first impressions run cold, people find excuses not to hold eye contact.'
      : null,
    stats.strength >= 14
      ? 'High STR — visibly powerful build; strangers instinctively recalibrate when they enter a room, blacksmiths and soldiers clock it immediately.'
      : stats.strength <= 8
      ? 'Low STR — slight or soft frame; not physically imposing, others do not expect much from them in a fight and may say so.'
      : null,
    stats.constitution >= 14
      ? 'High CON — carries hardship without showing it; cold, hunger, and exhaustion sit on them lightly in ways that quietly impress Barovians.'
      : stats.constitution <= 8
      ? 'Low CON — shows wear early; hollow under the eyes, a persistent cough perhaps, the kind of fragility Barovia tends to notice and exploit.'
      : null,
  ].filter(Boolean)

  const DISPOSITION_LABEL = { hostile: '⚔ hostile', wary: '~ wary', neutral: '◦ neutral', friendly: '○ friendly', allied: '★ allied' }
  const npcsBlock = (() => {
    const entries = Object.entries(character.npcs ?? {})
    if (!entries.length) return null
    return entries.map(([name, val]) => {
      const npc = typeof val === 'object' ? val : { disposition: val }
      const effectiveDisp = npc.pendingDisposition ?? npc.disposition
      const pending = npc.pendingDisposition ? ' (updating this scene — not yet confirmed)' : ''
      const loc = npc.location ? ` | last seen: ${LOCATIONS[npc.location]?.name ?? npc.location}` : ''
      const role = npc.role ? `\n  ${npc.role}` : ''
      const notes = npc.notes?.length ? npc.notes.map(n => `\n  · ${n}`).join('') : ''
      return `${name} — ${DISPOSITION_LABEL[effectiveDisp] ?? effectiveDisp}${pending}${loc}${role}${notes}`
    }).join('\n')
  })()

  const rawNotes = character.notes ?? []
  const notesBlock = (() => {
    if (!rawNotes.length) return null
    const lines = rawNotes.map(n =>
      `· Day ${n.day}${n.location ? ` · ${LOCATIONS[n.location]?.name ?? n.location}` : ''}: ${n.text}`
    )
    // Trim oldest notes if total exceeds 2000 chars
    while (lines.join('\n').length > 2000 && lines.length > 1) lines.shift()
    return lines.join('\n')
  })()

  const activeConditions = (conditions ?? []).length
    ? (conditions ?? [])
        .map(
          (k) => `${CONDITIONS[k]?.label ?? k} — ${CONDITIONS[k]?.desc ?? ""}`,
        )
        .join("\n")
    : null;

  const currentLoc = character.currentLocation
    ? LOCATIONS[character.currentLocation]
    : null;
  const nearbyStr = currentLoc?.nearby?.length
    ? `Nearby: ${currentLoc.nearby.map((id) => LOCATIONS[id]?.name ?? id).join(", ")}`
    : null;
  const levelRange = currentLoc
    ? currentLoc.avgLevel.length === 1
      ? String(currentLoc.avgLevel[0])
      : currentLoc.avgLevel.join("–")
    : null;
  const locationSection = currentLoc
    ? `CURRENT LOCATION — ${currentLoc.name} (${currentLoc.type}, avg level ${levelRange})${nearbyStr ? `\n${nearbyStr}` : ""}\n\n${currentLoc.entry}`
    : `LOCATIONS: Village of Barovia (despair, Ireena & Ismark Kolyanovich; Death House lurks at the village edge) · Tser Pool (Vistani camp on the road, Madam Eva — genuine prophet) · Vallaki (walled town, mandatory joy festivals, dissent punished) · Old Bonegrinder (appears abandoned, is not) · Yester Hill (druid cultists worship Strahd) · Castle Ravenloft (visible everywhere, always watching) · Amber Temple (ancient vault, dark vestiges).`;

  const locationSlugs = Object.keys(LOCATIONS).join(", ");
  const r = character.reading;
  const artifactLoc = (artifact, key) => {
    if ((r?.foundArtifacts ?? []).includes(key)) return "FOUND — in party's possession"
    return LOCATIONS[artifact.location]?.name ?? artifact.location
  }
  const readingSection = r
    ? r.revealed
      ? `PROPHECY — Madam Eva's Tarokka Reading (revealed — fixed for this campaign, do not move artifacts or invent a different ally):
Tome of Strahd: ${r.tome.card} (${artifactLoc(r.tome, 'tome')}) — Eva said: "${r.tome.publicText}" — DM: ${r.tome.secretText}
Holy Symbol of Ravenkind: ${r.holySymbol.card} (${artifactLoc(r.holySymbol, 'holysymbol')}) — Eva said: "${r.holySymbol.publicText}" — DM: ${r.holySymbol.secretText}
Sunsword: ${r.sunsword.card} (${artifactLoc(r.sunsword, 'sunsword')}) — Eva said: "${r.sunsword.publicText}" — DM: ${r.sunsword.secretText}
Ally: ${r.ally.card} — ${r.ally.name}${r.allyActive ? ' — ACTIVE COMPANION' : ''} — Eva said: "${r.ally.publicText}" — DM: ${r.ally.hint}
Strahd's lair within the castle: ${r.lair.card} — Eva said: "${r.lair.publicText}" — DM: ${r.lair.hint}${(character.day ?? 1) - (r.readingDay ?? 1) >= 3 ? `\nEva can be re-consulted for Strahd's lair location — 3 days have passed since the reading. Fire [TAROKKA:lair] when she performs it.` : ''}`
      : `PROPHECY — Pre-reading (the cards have been drawn but Madam Eva has not yet performed the reading — do not reference artifact locations or the ally directly; use this only to plant subtle foreshadowing):
Tome of Strahd: ${artifactLoc(r.tome, 'tome')} — ${r.tome.secretText}
Holy Symbol of Ravenkind: ${artifactLoc(r.holySymbol, 'holysymbol')} — ${r.holySymbol.secretText}
Sunsword: ${artifactLoc(r.sunsword, 'sunsword')} — ${r.sunsword.secretText}
Ally: ${r.ally.name ?? 'None'} — ${r.ally.hint}
Strahd's lair: ${r.lair.hint}
Fire [TAROKKA] when the party reaches Madam Eva at Tser Pool and she performs the reading.`
    : null;
  const allMilestones = Object.values(LOCATIONS)
    .flatMap((loc) => loc.levelTriggers ?? [])
    .sort((a, b) => a.level - b.level)
    .map(
      (t) =>
        `[MILESTONE:${t.milestone}] — ${t.condition} (awards level ${t.level})`,
    )
    .join("\n");
  const hitMilestones = (character.milestones ?? []).join(", ") || "none";
  const pick = (arr) => Array.isArray(arr) ? arr[Math.floor(Math.random() * arr.length)] : arr;
  const classSeed = pick(CLASS_SEEDS[cls]?.[subclass]);
  const bgSeed = pick(BACKGROUND_SEEDS[background]);
  const closing = pick(CLOSING_LINES[cls]) ?? "You don't recall how you got here.";
  const lastMemory =
    classSeed && bgSeed
      ? `${classSeed} ${bgSeed} ${closing}`
      : `The last thing you remember is elsewhere. ${closing}`;

  return `You are the Dungeon Master for a solo gothic horror D&D 5e campaign in Barovia, domain of Count Strahd von Zarovich (Curse of Strahd).

${KEY_INFORMATION}

${PROSE_STYLE}

${OPENING}

${EXAMPLES}

${TONE}

${KNOWLEDGE_DISCIPLINE}

${UNCERTAINTY}

<character>
${name} | ${cls}${subclass ? ` (${subclass})` : ""} | ${background} | Level ${character.level ?? 1}${subclass && !subclassActive ? ` — subclass unlocks at level ${subclassLevel}` : ""}
${statLine} | HP ${hp ?? maxHp}/${maxHp} | AC ${ac} | Day ${character.day ?? 1}
Proficiencies: ${profs?.join(", ")}${expertise?.length ? ` | Expertise: ${expertise.join(", ")}` : ""}${character.stProfs?.length ? ` | Saves: ${character.stProfs.map(s => SA[s] ?? s.toUpperCase()).join(", ")}` : ""}
Background: ${bg?.desc}${character.specialty ? `\n${bg?.specialtyLabel ?? 'Specialty'}: ${character.specialty}` : ''}
Background Feature — ${bg?.feature}: ${bg?.featureDesc}
Personality: ${personality}
Ideal: ${ideal} | Bond: ${bond} | Flaw: ${flaw}
Inventory: ${inv}${spellLine ? `\n${spellLine}` : ""}${cfLine ? `\nClass features: ${cfLine}` : ""}${companions?.length ? `\nCompanions: ${companions.join(', ')}` : ""}${activeConditions ? `\nActive conditions:\n${activeConditions}` : ""}

${cls}: ${classNarrative}${subclass && subclassActive ? `\n${subclass}: ${subclassDesc}` : ""}${scDmNotes ? `\n${scDmNotes}` : ""}

${npcsBlock ? `Known NPCs:\n${npcsBlock}\n\n` : ''}${notesBlock ? `Session memory:\n${notesBlock}\n\n` : ''}Honor their class, background, and personality. The background feature (${bg?.feature}) should come up naturally — don't announce it, just use it. Press on their flaw and bond — Barovia finds every wound.${statFlavor.length ? `\n${statFlavor.join(' ')}` : ''} These are tendencies for NPC behaviour — do not announce them or have characters comment on them directly; let them surface through how people act.
</character>

${OOC}

<world>
${DARK_POWERS_LORE}

${TAROKKA_INFORMATION}

${FACTIONS_LORE}

BAROVIA: A valley sealed by sentient mists. No sun. Ravens everywhere, some serving the Keepers of the Feather (covert Strahd resistance). Barovians are hollowed by centuries of terror; most won't say Strahd's name aloud.

${locationSection}
${readingSection ? `\n${readingSection}\n` : ""}
${STRAHD_LORE}

KEY FIGURES: Strahd — ancient vampire, brilliant, melancholic, possessive. When he appears: he is never hurried, never crude, never explains himself. He is curious about the player in the way a cat is curious about something it has already decided it will eventually kill. He does not monologue. He asks questions. He already knows the answers. He is never seen to be afraid, never seen to be surprised, and never seen to lose. If a scene is going badly for him, he ends it on his terms. He does not chase. He waits. He has all the time in the world and he knows it. Ireena — brave, self-possessed, Strahd obsessed with her (bears face of his lost love Tatyana). Ismark — Ireena's brother, practical, exhausted, natural first companion. Madam Eva — cryptic seer, genuine. Ezmerelda d'Avenir — Vistana monster hunter, her own agenda. The Abbot — fallen deva at Krezk abbey, building a flesh golem bride for Strahd; profoundly wrong in ways he cannot perceive.

COMPANION: Introduce Ismark naturally in the first act — he needs to move Ireena to safety. Don't force it. Leave the door open.

LAST MEMORY: The player's last memory before Barovia is established fiction. If they reference it during play, honor it and build on it. Do not contradict it or treat it as decorative.

NARRATIVE CONSISTENCY: Only attribute experiences to the player that have actually occurred in the session. Do not imply a pattern from a single instance — if the player has spoken to one person, they cannot have "begun to notice" a recurring behaviour. Do not invent prior encounters, observations, or impressions the player has not earned through play.

NPC CONSISTENCY: Track NPC disposition across the session. If an NPC was wary, they remain wary until something in the fiction changes that. If an NPC was kind, they don't become cold without cause. Emotional state is earned through play, not reset between scenes. When an NPC's attitude shifts, name the reason — even briefly, even implicitly.
</world>

${LOCATION_FLOW}

${FORMATTING}

<mechanics>
Append these tags SILENTLY at the very end of your response, after all narrative (the app strips them, the player never sees them):
- Hostile creature present: [MONSTER:slug] using dnd5eapi.co slugs e.g. wolf, zombie, skeleton, shadow, ghoul, ghast, wight, specter, wraith, banshee, vampire, werewolf, swarm-of-bats, will-o-wisp, revenant — fire [ENDCOMBAT] when the encounter ends (creature defeated, fled, or resolved without violence)
- Item gained: [ITEM:+name] | Item lost/used: [ITEM:-name]
- Enemy attack roll: [ATTACK:+N] using the monster's attack bonus from its stat block (e.g. [ATTACK:+4]). The app rolls d20+N against the character's AC and returns HIT or MISS. If a hit, follow with [DAMAGE:XdY+Z] in your next response. If a miss, narrate accordingly. Do not pre-narrate the outcome. Emit before any description of the attack landing.
- Enemy attack damage (after a confirmed hit): [DAMAGE:XdY+Z] using the monster's damage dice (e.g. [DAMAGE:2d6+3]). The app rolls the dice, applies the result to HP, and returns the damage total — then narrate the hit landing and its severity.
- HP change (non-attack sources — traps, poison, healing spells, potions): [STAT:hp:+N] to heal or [STAT:hp:-N] to damage. The app clamps to 0–maxHP automatically.
- Ability check or skill check (known DC): [ROLL:skillname:dc] or [ROLL:skillname:dc:adv] or [ROLL:skillname:dc:dis] — app auto-rolls d20 + skill modifier (includes proficiency and expertise where applicable). Skill names: athletics, acrobatics, stealth, arcana, history, investigation, nature, religion, animal_handling, insight, medicine, perception, survival, deception, intimidation, performance, persuasion. Raw ability checks: strength, dexterity, constitution, intelligence, wisdom, charisma (no proficiency applied).
- Saving throw (known DC): [SAVE:ability:dc] or [SAVE:ability:dc:adv] or [SAVE:ability:dc:dis] — app auto-rolls d20 + save modifier (applies class save proficiency if the character has it). Use this for all saving throws. Ability names: strength, dexterity, constitution, intelligence, wisdom, charisma. The character's save proficiencies are listed in the character block under "Saves".
- Skill check (player rolls, no DC): [ROLLPROMPT:skillname] or [ROLLPROMPT:skillname:adv] or [ROLLPROMPT:skillname:dis] — surfaces a roll button the player clicks. Use when you want the player to initiate the roll, or when the DC depends on the result. Same skill names as above. When the result is returned as [Player roll: skill — ...], narrate what the character perceives or discovers based on the total.
- Advantage and disadvantage: append :adv or :dis to any roll or save tag. Common sources — advantage: Help action, high ground, ally flanking, certain spells (Bless, Guidance), Reckless Attack (Barbarian). Disadvantage: Frightened (checks and attacks while source is visible), Poisoned (checks and attacks), Blinded (attack rolls), Exhausted level 1+ (checks), Prone (attack rolls), Restrained (attack rolls). When advantage and disadvantage both apply, they cancel out — roll straight. Strahd's Charm: WIS save with disadvantage on first use against a target he has already charmed.
- Spell slot used: [SPELL:slot:N] where N is the slot level consumed (e.g. [SPELL:slot:1] for a 1st-level slot, [SPELL:slot:3] for a 3rd-level slot). Fire once per slot expended. Cantrips do not use slots — do not fire this tag for cantrips.
- New spell learned: [SPELL:learn:Spell Name:N] where N is the spell's level (e.g. [SPELL:learn:Fireball:3]). Fire when the character learns a new spell through level-up, quest reward, or similar. Do not fire for cantrips.
- Class feature used: [FEATURE:key:-N] where key is the feature identifier (rage, bardic_inspiration, channel_divinity, wild_shape, second_wind, action_surge, ki, lay_on_hands, divine_sense, sorcery_points, arcane_recovery) and N is the amount spent. Current/max values are shown in the character block under "Class features". Features recover automatically on short rest (channel_divinity, second_wind, action_surge, wild_shape, ki) or long rest (rage, bardic_inspiration, lay_on_hands, divine_sense, sorcery_points, arcane_recovery).
- Short rest: [SHORTREST] (app adds avg Hit Die + CON mod to HP, capped at max; Warlock slots also recover)
- Long rest: [LONGREST] (app restores full HP and resets all spell slots; advances the in-world day by 1)
- Night watch: [NIGHTWATCH] (player keeps sentry through the night — advances the day by 1 and applies short rest HP recovery, but no spell slot recovery)
- Apply a condition: [CONDITION:+conditionname] | Remove a condition: [CONDITION:-conditionname] using: blinded, charmed, deafened, exhausted, frightened, grappled, incapacitated, invisible, paralyzed, petrified, poisoned, prone, restrained, stunned, unconscious
- Death save result (levels 3+ only, while player is at 0 HP): [DEATHSAVE:+] on success | [DEATHSAVE:-] on failure — fire immediately after the roll resolves; fire twice on a natural 1
- Player death (third death save failure): [DEAD]
- Campaign victory: [VICTORY] — fire at the very end of the epilogue narration, after all NPC fates and the final image. Do not fire mid-narration.
- Tarokka lair re-read: [TAROKKA:lair] — fire when Eva re-reads Strahd's lair location (only available 3+ days after the original reading; the app will note this in the prophecy block when eligible). Draws a new lair card, always different from the current one.
- Tarokka reading: [TAROKKA] — fire once when Madam Eva performs the reading. The app draws the cards; narrate the results dramatically. Artifact locations and the ally are fixed from that point forward and will appear in your context on every subsequent turn. Do not fire if a reading has already been done.
- Artifact collected: [ARTIFACT:tome] | [ARTIFACT:holysymbol] | [ARTIFACT:sunsword] — fire when the party recovers one of the three artifacts. The artifact's location in your context will update to "FOUND — in party's possession." Do not continue directing the party toward a found artifact.
- Track NPC disposition: [NPC:Full Name:disposition] where disposition is one of: hostile, wary, neutral, friendly, allied. Fire when the player first meets a named NPC, and again when their disposition meaningfully shifts. Use the NPC's full name consistently (e.g. [NPC:Ireena Kolyana:friendly]). Disposition updates are held as pending until the scene resolves (location change or end of combat) — the current pending state is shown in your context.
- Set NPC role: [NPC:Full Name:role:one sentence describing who they are and their relationship to the player] — fire once on first meeting. E.g. [NPC:Ismark Kolyanovich:role:Ireena's brother. Wants the player to escort her safely to Vallaki.]
- Add NPC note: [NPC:Full Name:note:fact] — fire when something specific and lasting is true about this NPC's relationship with the player. E.g. [NPC:Baron Vallakovich:note:Believes the player is a travelling merchant — has not seen through the lie.] where disposition is one of: hostile, wary, neutral, friendly, allied. Fire when the player first meets a named NPC, and again when their disposition meaningfully shifts. Use the NPC's full name consistently (e.g. [NPC:Ireena Kolyana:friendly], [NPC:Strahd von Zarovich:hostile]). Known NPCs and their current dispositions are shown in your character context — update rather than re-set when things change.
- Persist a key fact: [REMEMBER:text] — fire when something happens that should affect future scenes: first meeting an NPC and their initial disposition, a significant relationship shift, a lie or deception the player used, a promise made or broken, an alliance formed, a secret learned, a decision with lasting consequences. Write it as a plain statement of fact ("Ireena knows the player is not a local. She is cautious but grateful." / "The player told the Baron they were a travelling merchant — lie."). Do not fire for routine narration. Fire at most once or twice per scene, only for genuinely memorable facts.
- Companion joined: [COMPANION:+Name] — fire when a named NPC joins the party as an active companion (other than the tarokka ally, which uses [ALLY:active]). Use their proper name (e.g. [COMPANION:+Ireena]). Fire [COMPANION:-Name] when they leave, are separated, or die.
- Ally joined: [ALLY:active] — fire when the party's tarokka-designated ally commits to traveling with them. The ally's entry will update to "ACTIVE COMPANION" in your context. Treat them as a present companion with their own voice and limits from that point forward.
- Location change: [LOCATION:slug] — fire when the party arrives at a new named location. Valid slugs: ${locationSlugs}. Fire this before any milestone that belongs to that location — the app uses it to validate milestone eligibility.
- Milestone reached: fire the corresponding tag when the condition is genuinely met. Each milestone can only be awarded once — the app ignores duplicates. Do not fire a milestone that is already in the reached list. Milestones already reached: ${hitMilestones}.
${allMilestones}
</mechanics>

${LEVEL_UP_SPELLS}

${RESTS}

${DEATH_AND_DYING}

${MAGIC_RULES}

${EPILOGUE}

Open on the moment the mists release the player into Barovia. Their last memory: ${lastMemory} Atmosphere first, one decision point, no info-dump. Begin now.`;
}

export function buildBackstoryPrompt(character) {
  const { name, class: cls, subclass, background, stats, personality, ideal, specialty } = character
  const statNotes = [
    stats.charisma >= 14 ? 'magnetic presence' : stats.charisma <= 8 ? 'difficult to warm to' : null,
    stats.strength >= 14 ? 'physically powerful' : stats.strength <= 8 ? 'not physically imposing' : null,
    stats.constitution >= 14 ? 'weathers hardship easily' : stats.constitution <= 8 ? 'shows wear quickly' : null,
  ].filter(Boolean).join(', ')

  return `Write a four-sentence biography for a D&D character in second person. Follow this structure exactly:
1. Who they are and where they come from.
2. How they moved through the world — their manner, their reputation, what others saw.
3. What drove them.
4. What they could not leave behind.

No em dashes. No headers. Just four sentences.

Example:
You spent a decade as a sellsword for a Waterdeep merchant house, long enough to learn that loyalty is a commodity and the people who buy it rarely deserve it. You are not large, but you move like something that has decided to take up more space than it was given, and strangers step aside without knowing why. What you wanted was simple: enough coin to stop needing anyone. What followed you was the face of the man you left bleeding in a Baldur's Gate alley, who may or may not have survived, and who you have never gone back to check on.

CHARACTER:
${name} — ${cls}${subclass ? ` (${subclass})` : ''} | ${background}
Personality: ${personality}
Ideal: ${ideal}${specialty ? `\n${BACKGROUNDS[background]?.specialtyLabel ?? 'Specialty'}: ${specialty}` : ''}${statNotes ? `\nPhysical/social texture: ${statNotes}` : ''}`
}

export function buildTestPrompt(character) {
  const { name, class: cls, stats, hp, maxHp, spellSlots } = character;
  const slotStr =
    Array.isArray(spellSlots) && spellSlots.length
      ? spellSlots
          .map((s) => `${s.total - (s.used ?? 0)}/${s.total} L${s.level}`)
          .join(", ")
      : "none";
  const statLine = `STR ${stats.strength} DEX ${stats.dexterity} CON ${stats.constitution} INT ${stats.intelligence} WIS ${stats.wisdom} CHA ${stats.charisma}`;

  return `You are a testing assistant for a D&D 5e app (Curse of Strahd). The developer needs to test a specific UI scenario.

CHARACTER (use for realistic tag values):
${name} · ${cls} · HP ${hp}/${maxHp} · Spell slots: ${slotStr}
${statLine}

Produce a 1-2 sentence DM response that demonstrates the requested scenario, then append the appropriate tags silently at the end. Keep narrative minimal. Prioritise emitting correct tags over storytelling.

AVAILABLE TAGS:
[MONSTER:slug] — e.g. wolf, zombie, ghoul, wight, vampire
[ENDCOMBAT] — clears the active monster and stops combat music
[ITEM:+name] / [ITEM:-name]
[STAT:hp:N]
[ROLL:skill:dc] — auto-rolls immediately (perception, stealth, arcana, athletics, etc.)
[ROLLPROMPT:skill] — surfaces a player-click roll button, no DC
[SPELL:slot:N] — expend slot at level N
[SPELL:learn:Name:N] — add spell to known list
[SHORTREST] / [LONGREST]
[CONDITION:+name] / [CONDITION:-name] — blinded, frightened, poisoned, exhausted, etc.
[DEATHSAVE:+] / [DEATHSAVE:-]
[DEAD]
[TAROKKA]
[LOCATION:slug]
[MILESTONE:slug]

Test request: `;
}
