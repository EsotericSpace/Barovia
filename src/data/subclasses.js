// Per-subclass mechanical config.
// features(level, stats) — additional class features beyond the base class, keyed by id.
// featureLabels — display names for those feature keys.
// featureRecovery — 'longrest' | 'shortrest' | 'surge' (Wild Magic specific) | null.
// dmNotes — injected into the <character> block when the subclass is active. null = no extra instruction needed.

export const SUBCLASS_CONFIG = {

  // ── Barbarian ──────────────────────────────────────────────────────────────
  'Berserker': {
    class: 'Barbarian',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Berserker — Frenzy: when the character enters a Frenzied Rage (their choice each time they rage), they can make one bonus attack as a bonus action on each of their turns while raging. When the rage ends, they suffer one level of exhaustion — fire [CONDITION:+exhausted] immediately. This is a meaningful cost; the player should understand the tradeoff before frenzying.`,
  },
  'Totem Warrior': {
    class: 'Barbarian',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Bard ───────────────────────────────────────────────────────────────────
  'College of Lore': {
    class: 'Bard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `College of Lore — Cutting Words: as a reaction when a creature the character can see within 60ft makes an attack roll, ability check, or damage roll, they can expend one Bardic Inspiration die and subtract the roll from the creature's total. Fire [FEATURE:bardic_inspiration:-1] when used. The creature is immune if it can't be charmed.`,
  },
  'College of Valor': {
    class: 'Bard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Cleric ─────────────────────────────────────────────────────────────────
  'Life': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Life Domain — Disciple of Life: whenever the character uses a spell of 1st level or higher to restore HP, the target regains additional HP equal to 2 + the spell's level. Apply this bonus on top of the spell's normal healing when using [STAT:hp:+N] for healing spells. Preserve Life (Channel Divinity): as an action, restore HP equal to 5 × cleric level divided among any creatures within 30ft, each restored to no more than half their max HP. Fire [FEATURE:channel_divinity:-1] when used.`,
  },
  'Light': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Light Domain — Warding Flare: as a reaction when attacked, the character can impose disadvantage on the attack roll by interposing divine light. Usable a number of times equal to WIS modifier per long rest (tracked informally — no feature counter needed at this level). Radiance of the Dawn (Channel Divinity): as an action, dispels magical darkness in 30ft and deals 2d10 + cleric level radiant damage to hostile creatures in range (CON save DC 8 + proficiency + WIS mod for half). Fire [FEATURE:channel_divinity:-1] when used.`,
  },
  'Knowledge': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Knowledge Domain — Visions of the Past (Channel Divinity): as an action, the character meditates for 1 minute to receive impressions about a creature or object they hold, or events that occurred nearby within the last day. Useful for investigation scenes — let it surface one concrete detail per use. Fire [FEATURE:channel_divinity:-1] when used.`,
  },
  'Nature': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Tempest': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Tempest Domain — Destructive Wrath (Channel Divinity): when the character rolls lightning or thunder damage, they can use their Channel Divinity to deal maximum damage instead of rolling. Fire [FEATURE:channel_divinity:-1] when used — do not roll [DAMAGE:], just apply the maximum value directly via [STAT:hp:-N].`,
  },

  // ── Druid ──────────────────────────────────────────────────────────────────
  'Circle of the Land': {
    class: 'Druid',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Circle of the Land — Natural Recovery: once per day on a short rest, the character can recover spell slots totaling up to half their druid level (round up). Handle this narratively during [SHORTREST] — remind the player this option exists if they have expended slots.`,
  },
  'Circle of the Moon': {
    class: 'Druid',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Circle of the Moon — Combat Wild Shape: Wild Shape is available as a bonus action (not just an action). Transformed beasts can be CR 1 at level 2, CR 2 at level 4, scaling upward. At level 6 they can become elementals (air, earth, fire, water). While transformed, the character can use a bonus action to expend a spell slot to regain 1d8 HP per spell slot level. Fire [FEATURE:wild_shape:-1] when used. The beast's HP is separate from the character's — when the beast form drops to 0, the character reverts with whatever HP they had before transforming.`,
  },

  // ── Fighter ────────────────────────────────────────────────────────────────
  'Champion': {
    class: 'Fighter',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Champion — Improved Critical: the character scores a critical hit on a roll of 19 or 20 (not just 20). When resolving attack rolls narratively, treat a d20 result of 19 as a crit.`,
  },
  'Battle Master': {
    class: 'Fighter',
    features: (level) => ({
      superiority_dice: level >= 15 ? 6 : level >= 7 ? 5 : 4,
    }),
    featureLabels: {
      superiority_dice: 'Superiority Dice',
    },
    featureRecovery: {
      superiority_dice: 'shortrest',
    },
    dmNotes: `Battle Master — Superiority Dice (d8s, shown in class features): spent to fuel combat maneuvers. Common maneuvers: Trip Attack (add die to damage, target makes STR save DC 8+prof+STR mod or falls prone), Disarming Attack (add die to damage, target makes STR or DEX save or drops one item), Precision Attack (add die to an attack roll before or after rolling), Menacing Attack (add die to damage, target makes WIS save or becomes frightened until end of next turn), Goading Attack (add die to damage, target has disadvantage on attacks against anyone but the character until end of their next turn). Fire [FEATURE:superiority_dice:-1] per die spent. The player should declare the maneuver; you apply the mechanical effect.`,
  },
  'Eldritch Knight': {
    class: 'Fighter',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Eldritch Knight — Spellcasting: INT-based (not STR). Spells are primarily from the abjuration and evocation schools; two of their known spells can be from any school. Spell slots are tracked normally. War Magic (level 7): after casting a cantrip, the character can make one weapon attack as a bonus action.`,
  },

  // ── Monk ───────────────────────────────────────────────────────────────────
  'Way of the Open Hand': {
    class: 'Monk',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Way of the Open Hand — Open Hand Technique: after hitting with a Flurry of Blows attack, the character can impose one effect (no save): push the target 15ft, knock them prone, or deny their reaction until end of their next turn. No ki cost beyond the Flurry. Fire [FEATURE:ki:-2] for Flurry of Blows as normal.`,
  },
  'Way of Shadow': {
    class: 'Monk',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Way of Shadow — Shadow Arts: spend 2 ki to cast darkness, darkvision, pass without trace, or silence (no spell slot required). Shadow Step (level 6): as a bonus action, teleport from one area of dim light or darkness to another within 60ft — no ki cost, and the character has advantage on their first melee attack after teleporting. Fire [FEATURE:ki:-2] for Shadow Arts spells.`,
  },
  'Way of the Four Elements': {
    class: 'Monk',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Paladin ────────────────────────────────────────────────────────────────
  'Oath of Devotion': {
    class: 'Paladin',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Oath of Devotion — Sacred Weapon (Channel Divinity): as an action, imbue a weapon with holy power for 1 minute. The weapon becomes magical, adds CHA modifier to attack rolls, sheds bright light 20ft and dim light 20ft beyond, and blinds undead and fiends on a failed CON save. Fire [FEATURE:channel_divinity:-1] when used. Aura of Devotion (level 7): the character and friendly creatures within 10ft are immune to the charmed condition while the paladin is conscious.`,
  },
  'Oath of the Ancients': {
    class: 'Paladin',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Oath of the Ancients — Turn the Faithless (Channel Divinity): as an action, each fey or fiend within 30ft that can hear the character must make a WIS save (DC 8 + prof + CHA mod) or be turned for 1 minute. Fire [FEATURE:channel_divinity:-1] when used. Aura of Warding (level 7): the character and friendly creatures within 10ft have resistance to damage from spells.`,
  },
  'Oath of Vengeance': {
    class: 'Paladin',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Oath of Vengeance — Vow of Enmity (Channel Divinity): as a bonus action, the character gains advantage on all attack rolls against one creature within 10ft for 1 minute. Fire [FEATURE:channel_divinity:-1] when used. Abjure Enemy (Channel Divinity): as an action, one creature within 60ft must make a WIS save or be frightened and have speed 0 for 1 minute (or until it takes damage). Fiends and undead have disadvantage on this save. Fire [FEATURE:channel_divinity:-1] when used.`,
  },

  // ── Ranger ─────────────────────────────────────────────────────────────────
  'Hunter': {
    class: 'Ranger',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Beast Master': {
    class: 'Ranger',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Rogue ──────────────────────────────────────────────────────────────────
  'Thief': {
    class: 'Rogue',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Assassin': {
    class: 'Rogue',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Assassin — Assassinate: the character has advantage on attack rolls against creatures that haven't taken a turn yet in combat. Any hit against a surprised creature is automatically a critical hit. Lean into stealth and ambush setup — if the character positions well before a fight, this should pay off.`,
  },
  'Arcane Trickster': {
    class: 'Rogue',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Arcane Trickster — Spellcasting: INT-based (not DEX). Spells are primarily from the enchantment and illusion schools; two known spells can be from any school. Spell slots tracked normally. Mage Hand Legerdemain: their Mage Hand is invisible and can perform sleight of hand, pick locks, and disarm traps at range as a bonus action.`,
  },

  // ── Sorcerer ───────────────────────────────────────────────────────────────
  'Draconic Bloodline': {
    class: 'Sorcerer',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `Draconic Bloodline — Natural Armor: AC is 13 + DEX modifier when not wearing armor (already factored into the character's AC). Draconic Presence (level 18 only): not relevant at campaign start. Elemental Affinity: when casting a spell that deals the damage type matching their draconic ancestry, add CHA modifier to one damage roll. Apply this bonus on top of [DAMAGE:] results for qualifying spells.`,
  },
  'Wild Magic': {
    class: 'Sorcerer',
    features: () => ({
      tides_of_chaos: 1,
    }),
    featureLabels: {
      tides_of_chaos: 'Tides of Chaos',
    },
    featureRecovery: {
      tides_of_chaos: 'surge',
    },
    dmNotes: `Wild Magic — Tides of Chaos: when the character uses Tides of Chaos (shown in class features as 1/1), fire [FEATURE:tides_of_chaos:-1] and grant advantage on their next attack roll, ability check, or saving throw. After Tides of Chaos is used (showing 0/1), you may — at any point before a long rest — call for a Wild Magic Surge instead of normal spell resolution: fire [SURGE] and the app rolls the effect and restores Tides of Chaos. You can also call a surge at your discretion whenever the character casts a spell of 1st level or higher, without consuming Tides of Chaos. Long rest restores Tides of Chaos automatically.`,
  },

  // ── Warlock ────────────────────────────────────────────────────────────────
  'The Archfey': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `The Archfey — Fey Presence (level 1): as an action, the character projects an unearthly presence. Each creature within 10ft must succeed on a WIS save (DC 8 + prof + CHA mod) or be charmed or frightened (character's choice) until end of their next turn. Usable once per short or long rest. Misty Escape (level 6): as a reaction when taking damage, the character can turn invisible and teleport up to 60ft. Invisibility lasts until start of their next turn or until they attack or cast a spell.`,
  },
  'The Fiend': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `The Fiend — Dark One's Blessing: when the character reduces a hostile creature to 0 HP, they gain temporary HP equal to CHA modifier + warlock level. Apply as a bonus to their current HP (temporary HP don't stack — take the higher value). Fiend spells (expanded spell list, always prepared): Burning Hands, Command, Blindness/Deafness, Scorching Ray, Fireball, Stinking Cloud, Fire Shield, Wall of Fire.`,
  },
  'The Great Old One': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `The Great Old One — Awakened Mind: the character can telepathically communicate with any creature they can see within 30ft, in any language. The creature can respond telepathically if it chooses. Use this for eerie information-gathering moments — the patron's whispers and the character's telepathy blur together unsettlingly in Barovia.`,
  },

  // ── Wizard ─────────────────────────────────────────────────────────────────
  'School of Abjuration': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Abjuration — Arcane Ward (level 2): when the character casts an abjuration spell of 1st level or higher, they create a magical ward with HP equal to twice their wizard level + INT modifier. The ward absorbs damage before HP does. When the ward reaches 0 HP it disappears; it can be replenished by casting abjuration spells. Track the ward informally — note when it's active and roughly how much buffer it provides.`,
  },
  'School of Conjuration': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'School of Divination': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Divination — Portent (level 2): at the start of each long rest, roll two d20s and record the results. The character can replace any attack roll, saving throw, or ability check made by any creature they can see with one of these rolls — before or after the original roll, but before outcomes are revealed. Each Portent die can only be used once. Tell the player their Portent rolls at the start of each day and let them decide when to deploy them. This is mechanically powerful — a high Portent die (18–20) can guarantee a critical success; a low one (1–3) can guarantee a critical failure on an enemy.`,
  },
  'School of Enchantment': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Enchantment — Hypnotic Gaze (level 2): as an action, charm a creature within 5ft that can see and hear the character. It is incapacitated and has speed 0 until end of their next turn — fire [CONDITION:+incapacitated]. Reusable each turn as a bonus action to extend the effect. The effect ends if the character moves more than 5ft away, is incapacitated, or the target takes damage. Instinctive Charm (level 6): as a reaction when a creature within 30ft attacks the character, redirect the attack to the nearest other creature within 30ft. WIS save (DC 8 + prof + INT mod) negates. Once used, not available against that creature again until after a long rest.`,
  },
  'School of Evocation': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Evocation — Sculpt Spells (level 2): when casting an evocation spell that affects an area, the character can protect up to INT modifier friendly creatures within the area — they automatically succeed on their saving throws and take no damage from the spell (if it would deal half on a save). No resource cost. Potent Cantrip (level 6): even on a successful save against the character's damaging cantrips, targets take half damage.`,
  },
  'School of Illusion': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Illusion — Improved Minor Illusion (level 2): the character's Minor Illusion cantrip creates both a sound and an image simultaneously. Malleable Illusions (level 6): as an action, change the nature of an active illusion spell as if it were just cast.`,
  },
  'School of Necromancy': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: `School of Necromancy — Grim Harvest (level 2): once per turn when the character kills a creature with a spell, they regain HP equal to twice the spell's level (or three times if it's a necromancy spell). Apply via [STAT:hp:+N]. Undead Thralls (level 6): when casting Animate Dead, the character raises one additional corpse. Their undead thralls have bonus HP equal to wizard level and add proficiency bonus to damage rolls. In Barovia this subclass has obvious narrative weight — the land is saturated with dead.`,
  },
  'School of Transmutation': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
}

// Helper: get the merged feature label for a key, checking subclass first.
export function getFeatureLabel(key, subclass) {
  return SUBCLASS_CONFIG[subclass]?.featureLabels?.[key] ?? null
}

// Helper: get the recovery type for a feature key, checking subclass first.
export function getFeatureRecovery(key, subclass) {
  return SUBCLASS_CONFIG[subclass]?.featureRecovery?.[key] ?? null
}
