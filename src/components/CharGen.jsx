import { useState } from 'react'
import { CLASS_CONFIG } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SK, mod } from '../lib/dnd.js'
import { generateSheet, pick } from '../lib/chargen.js'
import { SPELL_ASSIGNMENTS } from '../data/spells.js'
import { SLOT_TABLE } from '../data/levelup.js'
import CharGenStats from './CharGenStats.jsx'
import CharGenCombat from './CharGenCombat.jsx'
import CharGenTraits from './CharGenTraits.jsx'

export default function CharGen({ character, onComplete }) {
  const [sheet, setSheet] = useState(() => generateSheet(character.class))
  const [locked, setLocked] = useState({ stats: {} })
  const [rerolls, setRerolls] = useState(3)

  function doReroll() {
    if (rerolls <= 0) return
    const next = generateSheet(character.class)
    setSheet(prev => {
      const cfg = CLASS_CONFIG[character.class]
      const stats = { ...next.stats }
      SK.forEach(k => { if (locked.stats?.[k]) stats[k] = prev.stats[k] })
      const bg = BACKGROUNDS[prev.background]
      return {
        ...prev, stats,
        maxHp: cfg.hd + mod(stats.constitution),
        ac: 10 + mod(stats.dexterity),
        personality: pick(bg.personality),
        ideal: pick(bg.ideal),
        bond: pick(bg.bond),
        flaw: pick(bg.flaw),
      }
    })
    setRerolls(r => r - 1)
  }

  function toggleStatLock(k) {
    setLocked(p => ({ ...p, stats: { ...p.stats, [k]: !p.stats?.[k] } }))
  }

  function rerollTrait(key) {
    const bg = BACKGROUNDS[sheet.background]
    const pool = bg[key].filter(v => v !== sheet[key])
    if (!pool.length) return
    setSheet(prev => ({ ...prev, [key]: pick(pool) }))
  }

  const bgKeys = Object.keys(BACKGROUNDS)

  function shiftBackground(dir) {
    setSheet(prev => {
      const idx = (bgKeys.indexOf(prev.background) + dir + bgKeys.length) % bgKeys.length
      const bgKey = bgKeys[idx]
      const bg = BACKGROUNDS[bgKey]
      const allProfs = [...new Set([...bg.profs, ...prev.classProfs])]
      const spellData = SPELL_ASSIGNMENTS[character.class]
      const spells = spellData?.[bgKey] ?? null
      return {
        ...prev,
        background: bgKey, bgProfs: bg.profs, profs: allProfs, equip: [...bg.equip],
        cantrips: spells?.cantrips ?? prev.cantrips,
        spellsKnown: spells?.spells ?? prev.spellsKnown,
        spellSlots: SLOT_TABLE[character.class] ? SLOT_TABLE[character.class][0].map(s => ({ ...s, used: 0 })) : prev.spellSlots,
      }
    })
  }

  const cfg = CLASS_CONFIG[character.class]
  const bg = BACKGROUNDS[sheet.background]
  const allProfs = [...new Set([...sheet.bgProfs, ...sheet.classProfs])]
  const profLevel = name => sheet.expertise.includes(name) ? 2 : allProfs.includes(name) ? 1 : 0

  return (
    <div className="cg-page">
      <div className="cg-inner">

        <div className="chargen-header">
          <div style={{ display: 'inline-flex', flexDirection: 'column', padding: 'var(--sp-sm)' }}>
            <div className="cg-name">{character.name}</div>
            <div className="cg-identity">{character.class} · Lv 1 · {sheet.background}</div>
          </div>
          <div className="cg-actions">
            <button className="cg-btn cg-reroll rbtn" onClick={doReroll} disabled={rerolls <= 0}>
              Reroll ({rerolls} left)
            </button>
            <button className="cg-btn cg-enter ebtn" onClick={() => onComplete(sheet)}>
              Enter the Mists
            </button>
          </div>
        </div>

        <div className="chargen-cols">
          <CharGenStats
            sheet={sheet} character={character} cfg={cfg}
            locked={locked} toggleStatLock={toggleStatLock}
          />
          <CharGenCombat
            sheet={sheet} cfg={cfg}
            allProfs={allProfs} profLevel={profLevel}
          />
          <CharGenTraits
            sheet={sheet} bg={bg}
            rerollTrait={rerollTrait}
            prevBackground={() => shiftBackground(-1)}
            nextBackground={() => shiftBackground(1)}
          />
        </div>

      </div>
    </div>
  )
}
