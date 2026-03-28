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
    dmNotes: null,
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
    dmNotes: null,
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
    dmNotes: null,
  },
  'Light': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Knowledge': {
    class: 'Cleric',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
    dmNotes: null,
  },

  // ── Druid ──────────────────────────────────────────────────────────────────
  'Circle of the Land': {
    class: 'Druid',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Circle of the Moon': {
    class: 'Druid',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Fighter ────────────────────────────────────────────────────────────────
  'Champion': {
    class: 'Fighter',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Battle Master': {
    class: 'Fighter',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Eldritch Knight': {
    class: 'Fighter',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Monk ───────────────────────────────────────────────────────────────────
  'Way of the Open Hand': {
    class: 'Monk',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Way of Shadow': {
    class: 'Monk',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
    dmNotes: null,
  },
  'Oath of the Ancients': {
    class: 'Paladin',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'Oath of Vengeance': {
    class: 'Paladin',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
    dmNotes: null,
  },
  'Arcane Trickster': {
    class: 'Rogue',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Sorcerer ───────────────────────────────────────────────────────────────
  'Draconic Bloodline': {
    class: 'Sorcerer',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
    dmNotes: `Wild Magic mechanics — Tides of Chaos: when the character uses Tides of Chaos (shown in class features as 1/1), fire [FEATURE:tides_of_chaos:-1] and grant advantage on their next attack roll, ability check, or saving throw. After Tides of Chaos is used (showing 0/1), you may — at any point before a long rest — call for a Wild Magic Surge instead of a normal spell resolution: fire [SURGE] and the app rolls the effect and restores Tides of Chaos. You can also call a surge at your discretion whenever the character casts a spell of 1st level or higher, without consuming Tides of Chaos. Long rest restores Tides of Chaos automatically.`,
  },

  // ── Warlock ────────────────────────────────────────────────────────────────
  'The Archfey': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'The Fiend': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'The Great Old One': {
    class: 'Warlock',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },

  // ── Wizard ─────────────────────────────────────────────────────────────────
  'School of Abjuration': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
    dmNotes: null,
  },
  'School of Enchantment': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'School of Evocation': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'School of Illusion': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
  },
  'School of Necromancy': {
    class: 'Wizard',
    features: () => ({}),
    featureLabels: {},
    featureRecovery: {},
    dmNotes: null,
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
