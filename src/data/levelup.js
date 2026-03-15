export function profBonus(level) {
  return Math.ceil(level / 4) + 1
}

// Average HP gain per level (floor(HD/2)+1 + CON mod applied separately)
export const HD_AVG = {
  Barbarian: 7, Bard: 5, Cleric: 5, Druid: 5, Fighter: 6,
  Monk: 5, Paladin: 6, Ranger: 6, Rogue: 5, Sorcerer: 4, Warlock: 5, Wizard: 4,
}

// Spell slot tables indexed by level-1 (index 0 = level 1)
// Each entry is an array of { level: spellLevel, total: count }
const FC = [
  [{ level: 1, total: 2 }],
  [{ level: 1, total: 3 }],
  [{ level: 1, total: 4 }, { level: 2, total: 2 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 2 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 3 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 3 }, { level: 4, total: 1 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 3 }, { level: 4, total: 2 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 3 }, { level: 4, total: 3 }, { level: 5, total: 1 }],
  [{ level: 1, total: 4 }, { level: 2, total: 3 }, { level: 3, total: 3 }, { level: 4, total: 3 }, { level: 5, total: 2 }],
]

const WK = [
  [{ level: 1, total: 1 }],
  [{ level: 1, total: 2 }],
  [{ level: 2, total: 2 }],
  [{ level: 2, total: 2 }],
  [{ level: 3, total: 2 }],
  [{ level: 3, total: 2 }],
  [{ level: 4, total: 2 }],
  [{ level: 4, total: 2 }],
  [{ level: 5, total: 2 }],
  [{ level: 5, total: 2 }],
]

export const SLOT_TABLE = {
  Bard: FC, Cleric: FC, Druid: FC, Sorcerer: FC, Wizard: FC, Warlock: WK,
}

export const SHORT_REST_CASTERS = new Set(['Warlock'])
