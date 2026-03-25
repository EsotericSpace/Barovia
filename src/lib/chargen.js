import { CLASS_CONFIG } from '../data/classes.js'
import { CLASS_WEAPONS } from '../data/weapons.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SPELL_ASSIGNMENTS, applySubclassSpells } from '../data/spells.js'
import { SLOT_TABLE, SHORT_REST_CASTERS } from '../data/levelup.js'
import { SK, SKILLS, mod, PROF_BONUS, BASE_SPEED } from './dnd.js'

export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

const CLASS_EQUIP_OVERRIDES = {
  'Folk Hero': {
    "Artisan's tools": {
      Barbarian: "Smith's tools",   Fighter: "Smith's tools",    Paladin: "Smith's tools",
      Bard:      "Woodcarver's tools", Druid: "Woodcarver's tools", Ranger: "Woodcarver's tools",
      Cleric:    "Herbalism kit",
      Monk:      "Potter's tools",
      Rogue:     "Tinker's tools",
      Sorcerer:  "Alchemist's supplies", Warlock: "Alchemist's supplies",
      Wizard:    "Calligrapher's tools",
    },
  },
  'Entertainer': {
    'Musical instrument': {
      Bard: 'Lute', Sorcerer: 'Lute', Wizard: 'Lute',
      Cleric: 'Lyre', Paladin: 'Lyre',
      Druid: 'Pan flute',
      Ranger: 'Horn',
      Barbarian: 'War drum', Fighter: 'War drum',
      Monk: 'Flute',
      Rogue: 'Fiddle',
      Warlock: 'Dulcimer',
    },
  },
}

export const BACKGROUND_SHORT = {
  'Haunted One': 'Haunted',
}

export const SUBCLASS_SHORT = {
  'School of Abjuration': 'Abjuration',
  'School of Conjuration': 'Conjuration',
  'School of Divination': 'Divination',
  'School of Enchantment': 'Enchantment',
  'School of Evocation': 'Evocation',
  'School of Illusion': 'Illusion',
  'School of Necromancy': 'Necromancy',
  'School of Transmutation': 'Transmutation',
  'Circle of the Land': 'Land',
  'Circle of the Moon': 'Moon',
  'Way of the Open Hand': 'Open Hand',
  'Way of the Four Elements': 'Four Elements',
  'Way of Shadow': 'Shadow',
  'Oath of Devotion': 'Devotion',
  'Oath of the Ancients': 'Ancient',
  'Oath of Vengeance': 'Vengeance',
  'College of Lore': 'Lore',
  'College of Valor': 'Valor',
  'The Archfey': 'Archfey',
  'The Fiend': 'Fiend',
  'The Great Old One': 'Old One',
  'Draconic Bloodline': 'Draconic',
}

export const TRAIT_ITEMS = new Map([
  ["I keep my thoughts and discoveries in a journal. My journal is my legacy.", "Journal"],
  ["I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.", "Sacred text"],
  ["I have an ancient text holding terrible secrets that must not fall to wrong hands.", "Ancient text"],
])
export function pickN(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n) }

export function calcAC(cls, subclass, stats) {
  const dex = mod(stats.dexterity)
  if (cls === 'Barbarian') return 10 + dex + mod(stats.constitution)
  if (cls === 'Monk')      return 10 + dex + mod(stats.wisdom)
  if (cls === 'Sorcerer' && subclass === 'Draconic Bloodline') return 13 + dex
  return 10 + dex
}

function roll4d6() {
  const d = [0,1,2,3].map(() => Math.floor(Math.random() * 6) + 1)
  d.sort((a, b) => a - b)
  return d.slice(1).reduce((a, b) => a + b, 0)
}

export function generateSheet(cls) {
  const cfg = CLASS_CONFIG[cls]
  const rolls = SK.map(() => roll4d6())
  const sorted = [...rolls].sort((a, b) => b - a)
  const ordered = [...SK].sort((a, b) => (cfg.pri.includes(a) ? 0 : 1) - (cfg.pri.includes(b) ? 0 : 1))
  const stats = {}
  ordered.forEach((k, i) => { stats[k] = sorted[i] })

  const bgKey = pick(Object.keys(BACKGROUNDS))
  const bg = BACKGROUNDS[bgKey]
  const pool = cfg.skillPool || SKILLS.map(s => s.name)
  const classProfs = pickN(pool, cfg.skillProfCount)
  const expertise = cfg.expertiseCount > 0 ? pickN(classProfs, cfg.expertiseCount) : []
  const allProfs = [...new Set([...bg.profs, ...classProfs])]

  const subclass = cfg.subclasses[0].name
  const spellData = SPELL_ASSIGNMENTS[cls]
  const baseSpells = spellData?.[bgKey] ?? null
  const finalSpells = baseSpells
    ? applySubclassSpells(cls, subclass, baseSpells.cantrips, baseSpells.spells)
    : null
  const slotTiers = SLOT_TABLE[cls]
  const spellSlots = slotTiers ? slotTiers[0].map(s => ({ ...s, used: 0 })) : null
  const shortRestCaster = SHORT_REST_CASTERS.has(cls)

  const personality = pick(bg.personality)
  const ideal = pick(bg.ideal)
  const bond = pick(bg.bond)
  const flaw = pick(bg.flaw)
  const traitEquip = [personality, ideal, bond, flaw].flatMap(t => TRAIT_ITEMS.has(t) ? [TRAIT_ITEMS.get(t)] : [])
  const weapons = CLASS_WEAPONS[cls]?.starting ?? []

  return {
    stats, background: bgKey,
    bgProfs: bg.profs, classProfs, expertise, profs: allProfs,
    personality, ideal, bond, flaw,
    equip: [...bg.equip, ...traitEquip].map(item =>
      CLASS_EQUIP_OVERRIDES[bgKey]?.[item]?.[cls] ?? item
    ),
    startingWeapons: weapons,
    maxHp: cfg.hd + mod(stats.constitution),
    ac: calcAC(cls, subclass, stats),
    initiative: mod(stats.dexterity),
    speed: BASE_SPEED,
    profBonus: PROF_BONUS,
    hd: cfg.hd,
    cantrips: finalSpells?.cantrips ?? [],
    spellsKnown: finalSpells?.spells ?? [],
    spellSlots,
    shortRestCaster,
    subclass,
  }
}
