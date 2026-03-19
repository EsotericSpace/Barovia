import { useState } from 'react'
import { CLASS_CONFIG } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SK, mod } from '../lib/dnd.js'
import { generateSheet, pick } from '../lib/chargen.js'
import { SPELL_ASSIGNMENTS, applySubclassSpells } from '../data/spells.js'
import { SLOT_TABLE } from '../data/levelup.js'
import CharGenStats from './CharGenStats.jsx'
import CharGenCombat from './CharGenCombat.jsx'
import CharGenTraits from './CharGenTraits.jsx'

export default function CharGen({ character, onComplete, onBack }) {
  const [sheet, setSheet] = useState(() => generateSheet(character.class))
  const [locked, setLocked] = useState({ stats: {} })
  const [rerolls, setRerolls] = useState(3)
  const [activeTab, setActiveTab] = useState('class')

  function doReroll() {
    if (rerolls <= 0) return
    const next = generateSheet(character.class)
    setSheet(prev => {
      const cfg = CLASS_CONFIG[character.class]
      const stats = { ...next.stats }
      SK.forEach(k => { if (locked.stats?.[k]) stats[k] = prev.stats[k] })
      return {
        ...prev, stats,
        maxHp: cfg.hd + mod(stats.constitution),
        ac: 10 + mod(stats.dexterity),
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
      const baseSpells = SPELL_ASSIGNMENTS[character.class]?.[bgKey] ?? null
      const finalSpells = baseSpells
        ? applySubclassSpells(character.class, prev.subclass, baseSpells.cantrips, baseSpells.spells)
        : null
      return {
        ...prev,
        background: bgKey, bgProfs: bg.profs, profs: allProfs, equip: [...bg.equip],
        cantrips: finalSpells?.cantrips ?? prev.cantrips,
        spellsKnown: finalSpells?.spells.map(name => ({ name, level: 1 })) ?? prev.spellsKnown,
        spellSlots: SLOT_TABLE[character.class] ? SLOT_TABLE[character.class][0].map(s => ({ ...s, used: 0 })) : prev.spellSlots,
      }
    })
  }

  const cfg = CLASS_CONFIG[character.class]
  const bg = BACKGROUNDS[sheet.background]

  return (
    <div className="cg-page">
      <div className="cg-inner">

        <div className="chargen-header">
          <div className="cg-header-left">
            <button className="cg-back-btn" onClick={onBack}>
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
          </div>
          <div className="cg-header-center">
            <div className="cg-name">{character.name}</div>
            <div className="cg-identity">{sheet.subclass} {character.class} · {sheet.background}</div>
          </div>
          <div className="cg-header-right">
            <button className="cg-btn cg-enter ebtn cg-enter-header" onClick={() => onComplete(sheet)}>
              Enter the Mists
            </button>
          </div>
        </div>

        <div className="cg-tab-bar">
          {[['class', 'Class'], ['scores', 'Scores'], ['story', 'Story']].map(([id, label]) => (
            <button key={id} className={`cg-tab${activeTab === id ? ' active' : ''}`} onClick={() => setActiveTab(id)}>
              <span className="cg-tab-label">{label}</span>
            </button>
          ))}
        </div>

        <div className="cg-content">
          <div className="chargen-cols">
            <div className={`cg-tab-panel${activeTab === 'class' ? ' active' : ''}`}>
              <CharGenStats
                sheet={sheet} character={character} cfg={cfg}
                prevSubclass={() => setSheet(p => {
                  const subs = CLASS_CONFIG[character.class].subclasses
                  const newSubclass = subs[(subs.findIndex(s => s.name === p.subclass) - 1 + subs.length) % subs.length].name
                  const baseSpells = SPELL_ASSIGNMENTS[character.class]?.[p.background] ?? null
                  const finalSpells = baseSpells ? applySubclassSpells(character.class, newSubclass, baseSpells.cantrips, baseSpells.spells) : null
                  return { ...p, subclass: newSubclass, ...(finalSpells ? { cantrips: finalSpells.cantrips, spellsKnown: finalSpells.spells.map(name => ({ name, level: 1 })) } : {}) }
                })}
                nextSubclass={() => setSheet(p => {
                  const subs = CLASS_CONFIG[character.class].subclasses
                  const newSubclass = subs[(subs.findIndex(s => s.name === p.subclass) + 1) % subs.length].name
                  const baseSpells = SPELL_ASSIGNMENTS[character.class]?.[p.background] ?? null
                  const finalSpells = baseSpells ? applySubclassSpells(character.class, newSubclass, baseSpells.cantrips, baseSpells.spells) : null
                  return { ...p, subclass: newSubclass, ...(finalSpells ? { cantrips: finalSpells.cantrips, spellsKnown: finalSpells.spells.map(name => ({ name, level: 1 })) } : {}) }
                })}
              />
            </div>
            <div className={`cg-tab-panel${activeTab === 'scores' ? ' active' : ''}`}>
              <CharGenCombat
                sheet={sheet} cfg={cfg} cls={character.class}
                locked={locked} toggleStatLock={toggleStatLock}
                doReroll={doReroll} rerolls={rerolls}
              />
            </div>
            <div className={`cg-tab-panel${activeTab === 'story' ? ' active' : ''}`}>
              <CharGenTraits
                sheet={sheet} bg={bg}
                rerollTrait={rerollTrait}
                prevBackground={() => shiftBackground(-1)}
                nextBackground={() => shiftBackground(1)}
              />
            </div>
          </div>
        </div>

        <div className="page-footer">
          <button className="cg-btn cg-enter ebtn btn-mobile-cta" onClick={() => onComplete(sheet)}>
            Enter the Mists
          </button>
        </div>

      </div>
    </div>
  )
}
