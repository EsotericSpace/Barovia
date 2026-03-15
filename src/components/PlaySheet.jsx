import { useState } from 'react'
import { C, TY, SP, Z } from '../lib/tokens.js'
import { SK, SA, mod, modStr, SKILLS, PROF_BONUS, skillMod } from '../lib/dnd.js'
import { CLASS_CONFIG } from '../data/classes.js'
import MonsterBlock from './MonsterBlock.jsx'


function Section({ label, open, onToggle, children }) {
  return (
    <div>
      <button
        onClick={onToggle}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', background: 'none', border: 0, outline: 'none',
          padding: `0 0 ${SP.xs}`, marginBottom: SP.sm, cursor: 'pointer',
        }}
      >
        <span style={{ ...TY.micro, color: C.textDim, letterSpacing: '.15em' }}>{label.toUpperCase()}</span>
        <span style={{ ...TY.micro, color: C.textGhost, fontSize: '.8rem', lineHeight: 1 }}>{open ? '−' : '+'}</span>
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
    <div className="panel" style={{
      position: 'fixed', top: 0, right: 0, bottom: 0,
      width: 'clamp(380px, 42vw, 480px)',
      background: C.surface, borderLeft: `1px solid ${C.border}`,
      padding: SP.section, overflowY: 'auto', zIndex: Z.panel,
      display: 'flex', flexDirection: 'column', gap: SP.md, ...TY.body,
    }}>

      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${C.border}` }}>
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            style={{
              background: 'none', border: 'none', borderBottom: `2px solid ${tab === t.key ? C.crimson : 'transparent'}`,
              color: tab === t.key ? C.gold : C.textGhost,
              ...TY.micro, padding: `${SP.xs} ${SP.md}`, cursor: 'pointer',
              marginBottom: '-1px', transition: 'all .15s', flex: 1,
            }}
          >{t.label}</button>
        ))}
      </div>

      {character.activeMonster && <MonsterBlock monster={character.activeMonster} />}

      {/* Identity tab */}
      {tab === 'identity' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.md }}>

          <div>
            <div style={{ ...TY.heading, fontSize: '1rem', color: C.gold, lineHeight: 1 }}>{character.name}</div>
            <div style={{ ...TY.caption, fontFamily: "'Cinzel', serif", color: C.textMuted, marginTop: SP.xs, lineHeight: 1 }}>
              {character.class} · Lv {character.level ?? 1} · {character.background}
            </div>
          </div>

          <Section label="Background" open={open.background} onToggle={() => toggle('background')}>
            <div style={{ border: `1px solid ${C.border}`, padding: SP.sm }}>
              <div style={{ ...TY.label, color: C.gold, marginBottom: SP.xs }}>{character.background}</div>
              {bg && <>
                <div style={{ ...TY.caption, color: C.textDim, fontStyle: 'italic', marginBottom: SP.sm }}>{bg.desc}</div>
                <div style={{ height: '1px', background: C.border, marginBottom: SP.sm }} />
                <div style={{ ...TY.micro, color: C.textDim, marginBottom: '3px' }}>Feature · {bg.feature}</div>
                <div style={{ ...TY.caption, color: C.textGhost }}>{bg.featureDesc}</div>
              </>}
            </div>
          </Section>

          <Section label="Character Traits" open={open.traits} onToggle={() => toggle('traits')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm }}>
              {[['personality', 'Personality'], ['ideal', 'Ideal'], ['bond', 'Bond'], ['flaw', 'Flaw']].map(([key, label]) => {
                const isFlaw = key === 'flaw'
                return (
                  <div key={key} style={{ borderLeft: `2px solid ${isFlaw ? C.crimson : C.border}`, paddingLeft: SP.sm }}>
                    <div style={{ ...TY.micro, color: isFlaw ? C.crimson : C.textDim, marginBottom: '3px' }}>{label}</div>
                    <div style={{ ...TY.caption, color: C.textMuted, fontStyle: 'italic' }}>{character[key]}</div>
                  </div>
                )
              })}
            </div>
          </Section>

          <Section label="Skills" open={open.skills} onToggle={() => toggle('skills')}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {SKILLS.filter(s => profLevel(s.name) > 0).map(s => {
                const expert = profLevel(s.name) === 2
                const val = skillMod(s.name, character.stats, allProfs, expertise)
                return (
                  <span key={s.name} style={{
                    border: `1px solid ${expert ? 'rgba(196,163,90,0.4)' : C.border}`,
                    padding: '2px 6px',
                    color: expert ? C.gold : C.textMuted,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: SP.sm,
                  }}>
                    <span style={{ ...TY.caption }}>{s.name}{expert ? ' ★' : ''}</span>
                    <span style={{ ...TY.helper, fontWeight: 600 }}>{val >= 0 ? `+${val}` : `${val}`}</span>
                  </span>
                )
              })}
            </div>
          </Section>

          <Section label="Inventory" open={open.inventory} onToggle={() => toggle('inventory')}>
            {character.inventory.length === 0
              ? <div style={{ ...TY.caption, color: C.textGhost, fontStyle: 'italic' }}>Empty</div>
              : character.inventory.map((item, i) => {
                const isGold = /\d+\s*gp/i.test(item)
                return (
                  <div key={i} style={{ ...TY.caption, color: isGold ? C.gold : C.textDim, paddingBottom: '.15rem', borderBottom: `1px solid ${C.border}`, marginBottom: '.15rem' }}>{item}</div>
                )
              })
            }
          </Section>

        </div>
      )}

      {/* Stats tab */}
      {tab === 'stats' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.md }}>

          <div>
            <div style={{ ...TY.micro, color: C.textDim, marginBottom: SP.sm, paddingBottom: SP.xs }}>Ability Scores</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
              {SK.map(k => {
                const isPri = cfg.pri.includes(k)
                return (
                  <div key={k} style={{
                    border: `1px solid ${isPri ? C.crimson : C.border}`,
                    padding: '5px 4px', textAlign: 'center',
                    background: isPri ? 'rgba(160,40,40,.04)' : 'transparent',
                  }}>
                    <div style={{ ...TY.micro, color: isPri ? C.textDim : C.textGhost }}>{SA[k]}</div>
                    <div style={{ ...TY.heading, fontSize: '1rem', color: C.textPrimary, lineHeight: 1.1 }}>{character.stats[k]}</div>
                    <div style={{ ...TY.label, color: C.crimson }}>{modStr(character.stats[k])}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div>
            <div style={{ ...TY.micro, color: C.textDim, marginBottom: SP.sm, paddingBottom: SP.xs }}>Combat</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
              {[
                { label: 'HP',    value: `${character.hp}/${character.maxHp}`, hp: true },
                { label: 'HD',    value: `d${character.hd}` },
                { label: 'AC',    value: character.ac },
                { label: 'Init',  value: modStr(character.stats.dexterity) },
                { label: 'Speed', value: '30ft' },
                { label: 'Prof',  value: `+${character.profBonus ?? PROF_BONUS}` },
              ].map(({ label, value, hp }) => (
                <div key={label} style={{
                  border: `1px solid ${hp ? 'rgba(160,40,40,0.4)' : C.border}`,
                  padding: '4px 6px', display: 'flex', alignItems: 'center', gap: SP.xs,
                }}>
                  <span style={{ ...TY.micro, color: hp ? C.textDim : C.textGhost, flex: 1 }}>{label}</span>
                  <span style={{ ...TY.caption, color: hp ? C.crimson : C.textMuted }}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {character.spellSlots?.length > 0 && (
            <div>
              <div style={{ ...TY.micro, color: C.textDim, marginBottom: SP.sm, paddingBottom: SP.xs }}>Spell Slots</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm }}>
                {character.spellSlots.map((tier, ti) => (
                  <div key={tier.level}>
                    <div style={{ ...TY.micro, color: C.textGhost, marginBottom: '4px' }}>Level {tier.level}</div>
                    <div style={{ display: 'flex', gap: SP.xs, flexWrap: 'wrap' }}>
                      {Array.from({ length: tier.total }).map((_, i) => {
                        const used = i < (tier.used ?? 0)
                        return (
                          <button
                            key={i}
                            onClick={() => onCharacterUpdate?.(c => {
                              const slots = c.spellSlots.map((s, si) => si === ti ? { ...s, used: s.used >= s.total ? 0 : s.used + 1 } : s)
                              return { ...c, spellSlots: slots }
                            })}
                            title={used ? 'Slot used · click to restore' : 'Slot available · click to use'}
                            style={{
                              width: '28px', height: '28px', border: `1px solid ${used ? C.border : C.crimson}`,
                              background: used ? 'transparent' : 'rgba(160,40,40,.1)',
                              color: used ? C.textGhost : C.crimson,
                              ...TY.micro, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >{used ? '·' : `L${tier.level}`}</button>
                        )
                      })}
                    </div>
                  </div>
                ))}
                <div style={{ ...TY.micro, color: C.textGhost }}>
                  {character.spellSlots.reduce((a, s) => a + (s.used ?? 0), 0)}/{character.spellSlots.reduce((a, s) => a + s.total, 0)} used · recovers on {character.shortRestCaster ? 'short' : 'long'} rest
                </div>
              </div>
              {character.cantrips?.length > 0 && (
                <div style={{ marginTop: SP.sm }}>
                  <div style={{ ...TY.micro, color: C.textGhost, marginBottom: '3px' }}>Cantrips</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                    {character.cantrips.map(s => (
                      <span key={s} style={{ ...TY.caption, color: C.textMuted, border: `1px solid ${C.border}`, padding: '1px 5px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
              {character.spellsKnown?.length > 0 && (
                <div style={{ marginTop: SP.sm }}>
                  <div style={{ ...TY.micro, color: C.textGhost, marginBottom: '3px' }}>Spells Known</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                    {character.spellsKnown.map(s => (
                      <span key={s} style={{ ...TY.caption, color: C.textMuted, border: `1px solid ${C.border}`, padding: '1px 5px' }}>{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <div style={{ ...TY.micro, color: C.textDim, marginBottom: SP.sm, paddingBottom: SP.xs }}>Saving Throws</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
              {SK.map(k => {
                const prof = cfg.stProfs.includes(k)
                const val = mod(character.stats[k]) + (prof ? PROF_BONUS : 0)
                return (
                  <div key={k} style={{
                    border: `1px solid ${prof ? 'rgba(160,40,40,0.4)' : C.border}`,
                    padding: '4px 6px', display: 'flex', alignItems: 'center', gap: SP.xs,
                  }}>
                    <span style={{ ...TY.micro, color: prof ? C.textDim : C.textGhost, flex: 1 }}>{SA[k]}</span>
                    <span style={{ ...TY.label, color: C.crimson }}>{val >= 0 ? `+${val}` : `${val}`}</span>
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
