import { useState, useEffect, useRef } from 'react'
import { CLASSES, CLASS_CONFIG } from '../data/classes.js'
import { BACKGROUNDS } from '../data/backgrounds.js'
import { SK, mod } from '../lib/dnd.js'
import { generateSheet, pick, calcAC } from '../lib/chargen.js'
import { SPELL_ASSIGNMENTS, applySubclassSpells } from '../data/spells.js'
import { SLOT_TABLE } from '../data/levelup.js'
import CharGenStats from './CharGenStats.jsx'
import CharGenCombat from './CharGenCombat.jsx'
import CharGenTraits from './CharGenTraits.jsx'

export default function CharGen({ initialName = '', initialClass = CLASSES[0], onComplete, onBack, settingsSlot }) {
  const [name, setName] = useState(initialName)
  const [classIdx, setClassIdx] = useState(() => {
    const i = CLASSES.indexOf(initialClass)
    return i >= 0 ? i : 0
  })
  const cls = CLASSES[classIdx]
  const [sheet, setSheet] = useState(() => generateSheet(cls))
  const [locked, setLocked] = useState({ stats: {} })
  const [rerolls, setRerolls] = useState(3)
  const [activeTab, setActiveTab] = useState('story')
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    el.style.fontSize = ''
    if (el.scrollWidth > el.clientWidth) {                                                                          
      const base = parseFloat(getComputedStyle(el).fontSize)                                                 
      el.style.fontSize = Math.max(12, base * el.clientWidth / el.scrollWidth) + 'px' 
    }
  }, [name])

  function shiftClass(dir) {
    const newIdx = (classIdx + dir + CLASSES.length) % CLASSES.length
    const newCls = CLASSES[newIdx]
    setClassIdx(newIdx)
    setSheet(prev => {
      const next = generateSheet(newCls)
      const bg = BACKGROUNDS[prev.background]
      const allProfs = [...new Set([...bg.profs, ...next.classProfs])]
      const baseSpells = SPELL_ASSIGNMENTS[newCls]?.[prev.background] ?? null
      const finalSpells = baseSpells
        ? applySubclassSpells(newCls, next.subclass, baseSpells.cantrips, baseSpells.spells)
        : null
      return {
        ...next,
        background: prev.background, bgProfs: bg.profs, profs: allProfs, equip: [...prev.equip],
        personality: prev.personality, ideal: prev.ideal, bond: prev.bond, flaw: prev.flaw,
        cantrips: finalSpells?.cantrips ?? next.cantrips,
        spellsKnown: finalSpells?.spells.map(n => ({ name: n, level: 1 })) ?? next.spellsKnown,
      }
    })
    setLocked({ stats: {} })
  }

  function doReroll() {
    if (rerolls <= 0) return
    const next = generateSheet(cls)
    setSheet(prev => {
      const cfg = CLASS_CONFIG[cls]
      const stats = { ...next.stats }
      SK.forEach(k => { if (locked.stats?.[k]) stats[k] = prev.stats[k] })
      return {
        ...prev, stats,
        maxHp: cfg.hd + mod(stats.constitution),
        ac: calcAC(cls, prev.subclass, stats),
        initiative: mod(stats.dexterity),
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
      const baseSpells = SPELL_ASSIGNMENTS[cls]?.[bgKey] ?? null
      const finalSpells = baseSpells
        ? applySubclassSpells(cls, prev.subclass, baseSpells.cantrips, baseSpells.spells)
        : null
      return {
        ...prev,
        background: bgKey, bgProfs: bg.profs, profs: allProfs, equip: [...bg.equip],
        personality: pick(bg.personality), ideal: pick(bg.ideal),
        bond: pick(bg.bond), flaw: pick(bg.flaw),
        cantrips: finalSpells?.cantrips ?? prev.cantrips,
        spellsKnown: finalSpells?.spells.map(n => ({ name: n, level: 1 })) ?? prev.spellsKnown,
        spellSlots: SLOT_TABLE[cls] ? SLOT_TABLE[cls][0].map(s => ({ ...s, used: 0 })) : prev.spellSlots,
      }
    })
  }

  const cfg = CLASS_CONFIG[cls]
  const bg = BACKGROUNDS[sheet.background]
  const ready = name.trim().length > 0

  function complete() {
    if (!ready) return
    onComplete({ ...sheet, name: name.trim(), class: cls })
  }

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
            <div className="cg-name-sizer" data-value={name}>
              <input
                ref={nameRef}
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && complete()}
                placeholder="What do the mists call you..."
                maxLength={35}
                autoComplete="new-password"
                className="cg-name-input"
              />
            </div>
            <div className="cg-identity">{sheet.subclass} {cls} · {sheet.background}</div>
          </div>
          <div className="cg-header-right">
            <button
              className="cg-btn cg-enter ebtn cg-enter-header"
              onClick={complete}
              disabled={!ready}
            >
              Enter the Mists
            </button>
            {settingsSlot}
          </div>
        </div>

        <div className="cg-tab-bar">
          {[['story', 'Background'], ['class', 'Class'], ['scores', 'Scores']].map(([id, label]) => (
            <button key={id} className={`cg-tab${activeTab === id ? ' active' : ''}`} onClick={() => setActiveTab(id)}>
              <span className="cg-tab-label">{label}</span>
            </button>
          ))}
        </div>

        <div className="cg-content">
          <div className="chargen-cols">
            <div className={`cg-tab-panel${activeTab === 'story' ? ' active' : ''}`}>
              <CharGenTraits
                sheet={sheet} bg={bg}
                rerollTrait={rerollTrait}
                prevBackground={() => shiftBackground(-1)}
                nextBackground={() => shiftBackground(1)}
              />
            </div>
            <div className={`cg-tab-panel${activeTab === 'class' ? ' active' : ''}`}>
              <CharGenStats
                sheet={sheet} cls={cls} cfg={cfg}
                prevClass={() => shiftClass(-1)}
                nextClass={() => shiftClass(1)}
                prevSubclass={() => setSheet(p => {
                  const subs = CLASS_CONFIG[cls].subclasses
                  const newSubclass = subs[(subs.findIndex(s => s.name === p.subclass) - 1 + subs.length) % subs.length].name
                  const baseSpells = SPELL_ASSIGNMENTS[cls]?.[p.background] ?? null
                  const finalSpells = baseSpells ? applySubclassSpells(cls, newSubclass, baseSpells.cantrips, baseSpells.spells) : null
                  return { ...p, subclass: newSubclass, ac: calcAC(cls, newSubclass, p.stats), ...(finalSpells ? { cantrips: finalSpells.cantrips, spellsKnown: finalSpells.spells.map(n => ({ name: n, level: 1 })) } : {}) }
                })}
                nextSubclass={() => setSheet(p => {
                  const subs = CLASS_CONFIG[cls].subclasses
                  const newSubclass = subs[(subs.findIndex(s => s.name === p.subclass) + 1) % subs.length].name
                  const baseSpells = SPELL_ASSIGNMENTS[cls]?.[p.background] ?? null
                  const finalSpells = baseSpells ? applySubclassSpells(cls, newSubclass, baseSpells.cantrips, baseSpells.spells) : null
                  return { ...p, subclass: newSubclass, ac: calcAC(cls, newSubclass, p.stats), ...(finalSpells ? { cantrips: finalSpells.cantrips, spellsKnown: finalSpells.spells.map(n => ({ name: n, level: 1 })) } : {}) }
                })}
              />
            </div>
            <div className={`cg-tab-panel${activeTab === 'scores' ? ' active' : ''}`}>
              <CharGenCombat
                sheet={sheet} cfg={cfg} cls={cls}
                locked={locked} toggleStatLock={toggleStatLock}
                doReroll={doReroll} rerolls={rerolls}
              />
            </div>
          </div>
        </div>

        <div className="page-footer">
          <button
            className="cg-btn cg-enter ebtn btn-mobile-cta"
            onClick={complete}
            disabled={!ready}
          >Enter the Mists</button>
        </div>

      </div>
    </div>
  )
}
