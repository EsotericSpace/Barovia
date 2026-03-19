export const SK = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma']
export const SA = { strength: 'STR', dexterity: 'DEX', constitution: 'CON', intelligence: 'INT', wisdom: 'WIS', charisma: 'CHA' }

export function mod(s) { return Math.floor((s - 10) / 2) }
export function modStr(s) { const m = mod(s); return m >= 0 ? `+${m}` : `${m}` }
export function spellLevelStr(n) { const s = ['th','st','nd','rd']; return n + (s[(n % 100 - 20) % 10] || s[n % 100] || s[0]) }

export const PROF_BONUS = 2

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

export function skillMod(skillName, stats, allProfs, expertise) {
  const skill = SKILLS.find(s => s.name === skillName)
  if (!skill) return 0
  const base = mod(stats[skill.ability])
  if (expertise.includes(skillName)) return base + PROF_BONUS * 2
  if (allProfs.includes(skillName)) return base + PROF_BONUS
  return base
}
