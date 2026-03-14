import { CLASS_CONFIG } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SK, SKILLS, mod } from './dnd.js'

export function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }
export function pickN(arr, n) { return [...arr].sort(() => Math.random() - 0.5).slice(0, n) }

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

  return {
    stats, background: bgKey,
    bgProfs: bg.profs, classProfs, expertise, profs: allProfs,
    personality: pick(bg.personality), ideal: pick(bg.ideal),
    bond: pick(bg.bond), flaw: pick(bg.flaw),
    equip: [...bg.equip],
    maxHp: cfg.hd + mod(stats.constitution),
    ac: 10 + mod(stats.dexterity),
    hd: cfg.hd,
  }
}
