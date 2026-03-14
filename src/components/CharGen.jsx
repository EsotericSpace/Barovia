import { useState } from 'react'
import { CLASS_CONFIG } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { C, TY, SP } from '../lib/tokens.js'
import { SK, mod } from '../lib/dnd.js'
import { generateSheet, pick } from '../lib/chargen.js'
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
      return { ...next, stats, maxHp: cfg.hd + mod(stats.constitution), ac: 10 + mod(stats.dexterity) }
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

  function rerollBackground() {
    const bgKey = pick(Object.keys(BACKGROUNDS).filter(k => k !== sheet.background))
    const bg = BACKGROUNDS[bgKey]
    const allProfs = [...new Set([...bg.profs, ...sheet.classProfs])]
    setSheet(prev => ({
      ...prev,
      background: bgKey, bgProfs: bg.profs, profs: allProfs, equip: [...bg.equip],
      personality: pick(bg.personality), ideal: pick(bg.ideal),
      bond: pick(bg.bond), flaw: pick(bg.flaw),
    }))
  }

  const cfg = CLASS_CONFIG[character.class]
  const bg = BACKGROUNDS[sheet.background]
  const allProfs = [...new Set([...sheet.bgProfs, ...sheet.classProfs])]
  const profLevel = name => sheet.expertise.includes(name) ? 2 : allProfs.includes(name) ? 1 : 0

  return (
    <div style={{ height: '100vh', overflowY: 'auto', background: C.bg, ...TY.body, color: C.textPrimary }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>

        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderBottom: `1px solid ${C.border}`, paddingBottom: SP.md, marginBottom: SP.lg,
        }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', padding: SP.sm }}>
            <div style={{ ...TY.heading, fontSize: 'clamp(.9rem,3vw,1.3rem)', color: C.gold, lineHeight: 1 }}>
              {character.name}
            </div>
            <div style={{ ...TY.caption, fontFamily: "'Cinzel', serif", color: C.textMuted, marginTop: SP.xs, lineHeight: 1 }}>
              {character.class} · Lv 1 · {sheet.background}
            </div>
          </div>
          <div style={{ display: 'flex', gap: SP.sm, alignItems: 'center' }}>
            <button
              className="rbtn" onClick={doReroll} disabled={rerolls <= 0}
              style={{
                background: 'transparent', ...TY.label,
                border: `1px solid ${rerolls > 0 ? C.textGhost : C.border}`,
                color: rerolls > 0 ? C.textMuted : C.textGhost,
                cursor: rerolls > 0 ? 'pointer' : 'default',
                padding: '.38rem .9rem', lineHeight: 1,
              }}
            >Reroll ({rerolls} left)</button>
            <button
              className="ebtn" onClick={() => onComplete(sheet)}
              style={{
                background: 'transparent', ...TY.label,
                border: `1px solid ${C.crimson}`, color: C.gold,
                padding: '.38rem 1.1rem', cursor: 'pointer', lineHeight: 1,
              }}
            >Enter the Mists</button>
          </div>
        </div>

        {/* Three columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: SP.xl, alignItems: 'start' }}>
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
            rerollTrait={rerollTrait} rerollBackground={rerollBackground}
          />
        </div>

      </div>
    </div>
  )
}
