export const SK = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
export const SA = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' }

export function mod(s) { return Math.floor((s - 10) / 2) }
export function modStr(s) { const m = mod(s); return m >= 0 ? `+${m}` : `${m}` }
export function signStr(n) { return n >= 0 ? `+${n}` : `${n}` }
export function spellLevelStr(n) { const s = ['th','st','nd','rd']; return n + (s[(n % 100 - 20) % 10] || s[n % 100] || s[0]) }

export function rollD20() { return Math.floor(Math.random() * 20) + 1 }

// Roll a dice expression like "2d6+3", "1d8", "3d4-1". Returns { rolls, total }.
export function rollDice(expr) {
  const m = expr.trim().match(/^(\d+)d(\d+)([+-]\d+)?$/i)
  if (!m) return { rolls: [], total: 0 }
  const count = parseInt(m[1])
  const sides = parseInt(m[2])
  const mod   = parseInt(m[3] ?? '0')
  const rolls = Array.from({ length: count }, () => Math.floor(Math.random() * sides) + 1)
  return { rolls, total: rolls.reduce((s, r) => s + r, 0) + mod }
}

// Roll with advantage ('adv'), disadvantage ('dis'), or straight (null/undefined).
// Returns { kept, dropped } — dropped is null for straight rolls.
export function rollWithAdv(adv) {
  const a = rollD20()
  if (!adv) return { kept: a, dropped: null }
  const b = rollD20()
  return adv === 'adv'
    ? { kept: Math.max(a, b), dropped: Math.min(a, b) }
    : { kept: Math.min(a, b), dropped: Math.max(a, b) }
}

export const SKILL_MAP = {
  athletics: 'strength',
  acrobatics: 'dexterity', sleight_of_hand: 'dexterity', stealth: 'dexterity',
  arcana: 'intelligence', history: 'intelligence', investigation: 'intelligence', nature: 'intelligence', religion: 'intelligence',
  animal_handling: 'wisdom', insight: 'wisdom', medicine: 'wisdom', perception: 'wisdom', survival: 'wisdom',
  deception: 'charisma', intimidation: 'charisma', performance: 'charisma', persuasion: 'charisma',
  strength: 'strength', dexterity: 'dexterity', constitution: 'constitution',
  intelligence: 'intelligence', wisdom: 'wisdom', charisma: 'charisma', attack: 'strength',
}

export const PROF_BONUS = 2
export const BASE_SPEED = 30

export const SKILLS = [
  { name: 'Acrobatics',      ability: 'dexterity' },
  { name: 'Animal Handling', ability: 'wisdom' },
  { name: 'Arcana',          ability: 'intelligence' },
  { name: 'Athletics',       ability: 'strength' },
  { name: 'Deception',       ability: 'charisma' },
  { name: 'History',         ability: 'intelligence' },
  { name: 'Insight',         ability: 'wisdom' },
  { name: 'Intimidation',    ability: 'charisma' },
  { name: 'Investigation',   ability: 'intelligence' },
  { name: 'Medicine',        ability: 'wisdom' },
  { name: 'Nature',          ability: 'intelligence' },
  { name: 'Perception',      ability: 'wisdom' },
  { name: 'Performance',     ability: 'charisma' },
  { name: 'Persuasion',      ability: 'charisma' },
  { name: 'Religion',        ability: 'intelligence' },
  { name: 'Sleight of Hand', ability: 'dexterity' },
  { name: 'Stealth',         ability: 'dexterity' },
  { name: 'Survival',        ability: 'wisdom' },
]

export function skillMod(skillName, stats, allProfs, expertise, profBonus = PROF_BONUS) {
  const skill = SKILLS.find(s => s.name === skillName)
  if (!skill) return 0
  const base = mod(stats[skill.ability])
  if (expertise.includes(skillName)) return base + profBonus * 2
  if (allProfs.includes(skillName)) return base + profBonus
  return base
}

// Computes a saving throw modifier for an ability (e.g. 'constitution').
// Uses class-granted save proficiency stored in char.stProfs.
export function saveModifier(abilityKey, char) {
  const profBonus = char.profBonus ?? PROF_BONUS
  const stProfs = char.stProfs ?? []
  const base = mod(char.stats?.[abilityKey] ?? 10)
  const proficient = stProfs.includes(abilityKey)
  return {
    ability: abilityKey,
    modifier: proficient ? base + profBonus : base,
    proficient,
    expert: false,
  }
}

// Converts a roll tag key (snake_case) to { ability, modifier, proficient, expert }
// using the full character object. Use this everywhere a roll modifier is computed.
export function rollModifier(skillKey, char) {
  const ability = SKILL_MAP[skillKey] || 'strength'
  const profBonus = char.profBonus ?? PROF_BONUS
  const profs = char.profs ?? []
  const expertise = char.expertise ?? []
  const skillName = skillKey.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const isNamedSkill = SKILLS.some(s => s.name === skillName)
  const modifier = isNamedSkill
    ? skillMod(skillName, char.stats, profs, expertise, profBonus)
    : mod(char.stats?.[ability] ?? 10)
  return {
    ability,
    modifier,
    proficient: isNamedSkill && (profs.includes(skillName) || expertise.includes(skillName)),
    expert: expertise.includes(skillName),
  }
}
