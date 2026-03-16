import { useState } from 'react'
import { SK, SA, mod, modStr, SKILLS, PROF_BONUS, skillMod } from '../lib/dnd.js'
import { CLASS_CONFIG } from '../data/classes.js'
import MonsterBlock from './MonsterBlock.jsx'

function Section({ label, open, onToggle, children }) {
  return (
    <div>
      <button className="section-toggle" onClick={onToggle}>
        <span className="section-label">{label.toUpperCase()}</span>
        <span className="section-chevron">{open ? '−' : '+'}</span>
      </button>
      {open && children}
    </div>
  )
}

export default function PlaySheet({ character, bg, setSheetOpen, onCharacterUpdate }) {
  const [tab, setTab] = useState('identity')
  const [open, setOpen] = useState(() => {
    try {
      const saved = localStorage.getItem('barovia_sheet_sections')
      return saved ? JSON.parse(saved) : { background: true, traits: false, skills: false, inventory: false }
    } catch { return { background: true, traits: false, skills: false, inventory: false } }
  })
  const toggle = key => setOpen(o => {
    const next = { ...o, [key]: !o[key] }
    localStorage.setItem('barovia_sheet_sections', JSON.stringify(next))
    return next
  })
  const cfg = CLASS_CONFIG[character.class]
  const allProfs = character.profs ?? []
  const expertise = character.expertise ?? []
  const profLevel = name => expertise.includes(name) ? 2 : allProfs.includes(name) ? 1 : 0

  const tabs = [
    { key: 'identity', label: 'Identity' },
    { key: 'stats', label: 'Stats' },
  ]

  return (
    <div className="panel play-sheet">

      <div className="sheet-tabs">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`sheet-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >{t.label}</button>
        ))}
      </div>

      {character.activeMonster && <MonsterBlock monster={character.activeMonster} />}

      {tab === 'identity' && (
        <div className="cg-col">

          <div>
            <div className="ps-name">{character.name}</div>
            <div className="ps-identity">
              {character.class} · Lv {character.level ?? 1} · {character.background}
            </div>
          </div>

          <Section label="Background" open={open.background} onToggle={() => toggle('background')}>
            <div className="ps-bg-block">
              <div className="ps-bg-name">{character.background}</div>
              {bg && <>
                <div className="ps-bg-desc">{bg.desc}</div>
                <div className="ps-divider" />
                <div className="ps-feature-label">Feature · {bg.feature}</div>
                <div className="ps-feature-desc">{bg.featureDesc}</div>
              </>}
            </div>
          </Section>

          <Section label="Character Traits" open={open.traits} onToggle={() => toggle('traits')}>
            <div className="ps-trait-list">
              {[['personality', 'Personality'], ['ideal', 'Ideal'], ['bond', 'Bond'], ['flaw', 'Flaw']].map(([key, label]) => (
                <div key={key} className={`ps-trait${key === 'flaw' ? ' flaw' : ''}`}>
                  <div className="ps-trait-label">{label}</div>
                  <div className="ps-trait-text">{character[key]}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section label="Skills" open={open.skills} onToggle={() => toggle('skills')}>
            <div className="ps-skill-rows">
              {SKILLS.filter(s => profLevel(s.name) > 0).map(s => {
                const expert = profLevel(s.name) === 2
                const val = skillMod(s.name, character.stats, allProfs, expertise)
                return (
                  <span key={s.name} className={`ps-skill-row${expert ? ' expert' : ''}`}>
                    <span className="ps-skill-name">{s.name}{expert ? ' ★' : ''}</span>
                    <span className="ps-skill-val">{val >= 0 ? `+${val}` : `${val}`}</span>
                  </span>
                )
              })}
            </div>
          </Section>

          <Section label="Inventory" open={open.inventory} onToggle={() => toggle('inventory')}>
            {character.inventory.length === 0
              ? <div className="ps-inv-empty">Empty</div>
              : <div className="ps-inv-rows">
                  {character.inventory.map((item, i) => {
                    const isGold = /\d+\s*gp/i.test(item)
                    return (
                      <div key={i} className={`ps-inv-item${isGold ? ' gold' : ''}`}>{item}</div>
                    )
                  })}
                </div>
            }
          </Section>

        </div>
      )}

      {tab === 'stats' && (
        <div className="cg-col">

          <div>
            <div className="ps-section-header">Ability Scores</div>
            <div className="stat-grid">
              {SK.map(k => {
                const isPri = cfg.pri.includes(k)
                return (
                  <div key={k} className={`stat-cell${isPri ? ' primary' : ''}`}>
                    <div className="stat-key">{SA[k]}</div>
                    <div className="ps-stat-val">{character.stats[k]}</div>
                    <div className="stat-mod">{modStr(character.stats[k])}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div className="ps-section-header">Combat</div>
            <div className="ps-combat-grid">
              {[
                { label: 'HP',    value: `${character.hp}/${character.maxHp}`, hp: true },
                { label: 'HD',    value: `d${character.hd}` },
                { label: 'AC',    value: character.ac },
                { label: 'Init',  value: modStr(character.stats.dexterity) },
                { label: 'Speed', value: '30ft' },
                { label: 'Prof',  value: `+${character.profBonus ?? PROF_BONUS}` },
              ].map(({ label, value, hp }) => (
                <div key={label} className={`ps-combat-row${hp ? ' hp' : ''}`}>
                  <span className="ps-combat-key">{label}</span>
                  <span className="ps-combat-val">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {character.spellSlots?.length > 0 && (
            <div>
              <div className="ps-section-header">Spell Slots</div>
              <div className="cg-col">
                {character.spellSlots.map((tier, ti) => (
                  <div key={tier.level}>
                    <div className="ps-spell-tier-label">Level {tier.level}</div>
                    <div className="ps-spell-btns">
                      {Array.from({ length: tier.total }).map((_, i) => {
                        const used = i < (tier.used ?? 0)
                        return (
                          <button
                            key={i}
                            className={`ps-spell-btn${used ? ' used' : ''}`}
                            onClick={() => onCharacterUpdate?.(c => {
                              const slots = c.spellSlots.map((s, si) => si === ti ? { ...s, used: s.used >= s.total ? 0 : s.used + 1 } : s)
                              return { ...c, spellSlots: slots }
                            })}
                            title={used ? 'Slot used · click to restore' : 'Slot available · click to use'}
                          >{used ? '·' : `L${tier.level}`}</button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                <div className="ps-spell-summary">
                  {character.spellSlots.reduce((a, s) => a + (s.used ?? 0), 0)}/{character.spellSlots.reduce((a, s) => a + s.total, 0)} used · recovers on {character.shortRestCaster ? 'short' : 'long'} rest
                </div>
              </div>
              {character.cantrips?.length > 0 && (
                <div className="ps-spell-group">
                  <div className="ps-spell-group-label">Cantrips</div>
                  <div className="ps-spell-tags">
                    {character.cantrips.map(s => (
                      <span key={s} className="ps-spell-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {character.spellsKnown?.length > 0 && (
                <div className="ps-spell-group">
                  <div className="ps-spell-group-label">Spells Known</div>
                  <div className="ps-spell-tags ps-spell-tags--col">
                    {character.spellsKnown.map(s => (
                      <span key={s} className="ps-spell-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <div className="ps-section-header">Saving Throws</div>
            <div className="ps-saving-grid">
              {SK.map(k => {
                const prof = cfg.stProfs.includes(k)
                const val = mod(character.stats[k]) + (prof ? PROF_BONUS : 0)
                return (
                  <div key={k} className={`stat-row${prof ? ' prof' : ''}`}>
                    <span className="row-key">{SA[k]}</span>
                    <span className="row-val">{val >= 0 ? `+${val}` : `${val}`}</span>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
