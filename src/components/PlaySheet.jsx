import { useState } from 'react'
import { SK, SA, mod, modStr, SKILLS, PROF_BONUS, skillMod, spellLevelStr } from '../lib/dnd.js'
import { CLASS_CONFIG } from '../data/classes.js'
import { CONDITIONS } from '../data/conditions.js'
import { SUBCLASS_SHORT, BACKGROUND_SHORT, TRAIT_ITEMS } from '../lib/chargen.js'

const TRAIT_ITEM_NAMES = new Set(TRAIT_ITEMS.values())

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
      return saved ? JSON.parse(saved) : { background: false, traits: false, skills: false, inventory: true }
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

  const hasSpells = !!(character.spellSlots?.length > 0 || character.cantrips?.length > 0)
  const tabs = [
    { key: 'identity', label: 'Identity' },
    { key: 'stats', label: 'Stats' },
    ...(hasSpells ? [{ key: 'spells', label: 'Spells' }] : []),
  ]

  return (
    <div className="panel play-sheet">

      <div className="chargen-header">
        <div className="cg-header-left">
          <button className="ps-close-btn" onClick={() => setSheetOpen(false)} title="Close">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="cg-header-center">
          <div className="cg-name">{character.name}</div>
          <div className="cg-identity">The {BACKGROUND_SHORT[character.background] ?? character.background} {SUBCLASS_SHORT[character.subclass] ?? character.subclass} {character.class}</div>
        </div>
        <div className="cg-header-right" />
      </div>

      <div className="cg-tab-bar" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map(t => (
          <button
            key={t.key}
            className={`cg-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <span className="cg-tab-label">{t.label}</span>
          </button>
        ))}
      </div>

<div className="cg-content">

        {tab === 'identity' && (
          <div className="cg-col">

            <Section label="Inventory" open={open.inventory} onToggle={() => toggle('inventory')}>
              {character.inventory.length === 0
                ? <div className="ps-inv-empty">Empty</div>
                : (() => {
                    const weaponSet = new Set(character.startingWeapons ?? [])
                    const items    = character.inventory.filter(i => !weaponSet.has(i) && !TRAIT_ITEM_NAMES.has(i))
                    const weapons  = character.inventory.filter(i => weaponSet.has(i))
                    const carried  = character.inventory.filter(i => TRAIT_ITEM_NAMES.has(i))
                    return <>
                      {items.length > 0 && (
                        <div className="inv-group">
                          <span className="inv-label">Items</span>
                          <div className="skill-inline">
                            {items.map((item, i, arr) => (
                              <span key={i} className={`skill-inline-item${/\d+\s*gp/i.test(item) ? ' gold' : ''}`}>
                                {item}{i < arr.length - 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {weapons.length > 0 && (
                        <div className="inv-group">
                          <span className="inv-label">Weapons</span>
                          <div className="skill-inline">
                            {weapons.map((item, i, arr) => (
                              <span key={i} className="skill-inline-item">
                                {item}{i < arr.length - 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {carried.length > 0 && (
                        <div className="inv-group">
                          <span className="inv-label">Carried</span>
                          <div className="skill-inline">
                            {carried.map((item, i, arr) => (
                              <span key={i} className="skill-inline-item">
                                {item}{i < arr.length - 1 ? ',' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  })()
              }
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
              <div className="skill-inline">
                {SKILLS.filter(s => profLevel(s.name) > 0).map((s, i, arr) => {
                  const expert = profLevel(s.name) === 2
                  const val = skillMod(s.name, character.stats, allProfs, expertise)
                  const valStr = val >= 0 ? `+${val}` : `${val}`
                  return (
                    <span key={s.name} className={`skill-inline-item${expert ? ' expert' : ''}`}>
                      {s.name} ({valStr}){expert ? ' ★' : ''}{i < arr.length - 1 ? ',' : ''}
                    </span>
                  )
                })}
              </div>
            </Section>

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

          </div>
        )}

        {tab === 'stats' && (
          <div className="cg-col">

            <div>
              <div className="ps-section-header">Hit Points</div>
              {(() => {
                const isDying = character.hp === 0
                const hpPct = character.hp / (character.maxHp || 1)
                const hpState = isDying ? 'dying' : hpPct <= 0.25 ? 'danger' : hpPct <= 0.5 ? 'hurt' : 'healthy'
                const deathSaves = character.deathSaves ?? { successes: 0, failures: 0 }
                const showDeathSaves = isDying && (character.level ?? 1) >= 3
                return (
                  <div className="hp-display">
                    <div className="hp-nums">
                      <span className={`hp-current ${hpState}${hpState === 'danger' || hpState === 'dying' ? ' hpdanger' : ''}`}>{character.hp}</span>
                      <span className="hp-sep">/</span>
                      <span className="hp-max">{character.maxHp}</span>
                      <span className="hp-label">HP</span>
                    </div>
                    {showDeathSaves ? (
                      <div className="death-saves">
                        <div className="ds-dots">
                          {[0,1,2].map(i => <div key={i} className={`ds-dot${i < deathSaves.successes ? ' filled' : ''}`} />)}
                        </div>
                        <div className="ds-sep">·</div>
                        <div className="ds-dots">
                          {[0,1,2].map(i => <div key={i} className={`ds-dot fail${i < deathSaves.failures ? ' filled' : ''}`} />)}
                        </div>
                      </div>
                    ) : (
                      <div className="hp-bar">
                        <div className={`hp-bar-fill ${hpState}`} style={{ width: `${Math.max(0, hpPct * 100)}%` }}>
                          {hpPct > 0 && <div className="hp-bar-edge" />}
                        </div>
                      </div>
                    )}
                    {(character.conditions ?? []).length === 0
                      ? <span className="condition-fine">Fine</span>
                      : (character.conditions ?? []).map(key => (
                        <button
                          key={key}
                          className="condition-btn"
                          onClick={() => onCharacterUpdate(c => ({ ...c, conditions: c.conditions.filter(k => k !== key) }))}
                          title={`${CONDITIONS[key]?.desc} · Click to remove`}
                        >{CONDITIONS[key]?.label ?? key}</button>
                      ))
                    }
                  </div>
                )
              })()}
            </div>

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
                  { label: 'HD',    value: `d${character.hd}` },
                  { label: 'AC',    value: character.ac },
                  { label: 'Init',  value: modStr(character.stats.dexterity) },
                  { label: 'Speed', value: '30ft' },
                  { label: 'Prof',  value: `+${character.profBonus ?? PROF_BONUS}` },
                ].map(({ label, value }) => (
                  <div key={label} className="ps-combat-row">
                    <span className="ps-combat-key">{label}</span>
                    <span className="ps-combat-val">{value}</span>
                  </div>
                ))}
              </div>
            </div>

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

        {tab === 'spells' && (
          <div className="cg-col">

            {(character.cantrips?.length > 0 || character.spellsKnown?.length > 0) && (
              <div>
                <div className="ps-section-header">Spells</div>
                {character.spellSlots?.length > 0 && (
                  <div className="ps-spell-summary">
                    {character.spellSlots.reduce((a, s) => a + (s.used ?? 0), 0)}/{character.spellSlots.reduce((a, s) => a + s.total, 0)} slots used · recovers on {character.shortRestCaster ? 'short' : 'long'} rest
                  </div>
                )}
                <div className="spell-list">
                  {(character.cantrips ?? []).map(s => (
                    <div key={s} className="list-row">
                      <span className="spell-name">{s}</span>
                      <span className="spell-tier">cantrip</span>
                    </div>
                  ))}
                  {(character.spellsKnown ?? []).map(s => {
                    const name = typeof s === 'string' ? s : s.name
                    const level = typeof s === 'string' ? 1 : s.level
                    return (
                      <div key={name} className="list-row">
                        <span className="spell-name">{name}</span>
                        <span className="spell-tier">{spellLevelStr(level)}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  )
}
