import { forwardRef, useRef } from 'react'

function renderInline(text) {
  const escaped = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>')
}
import { LOCATIONS } from '../data/locations/index.js'

function rollColorClass(total, dc) {
  if (total === 20) return 'roll-color-nat20'
  if (total === 1)  return 'roll-color-nat1'
  if (dc) return total >= dc
    ? (total >= dc + 5 ? 'roll-color-success' : 'roll-color-success-close')
    : (total <= dc - 5 ? 'roll-color-fail' : 'roll-color-fail-close')
  if (total >= 17) return 'roll-color-success'
  if (total >= 12) return 'roll-color-success-close'
  return 'roll-color-fail'
}

const Paragraphs = forwardRef(function Paragraphs({ content, className }, ref) {
  return (
    <div ref={ref} className={className}>
      {content.split(/\n\n+/).filter(Boolean).map((p, i) => (
        <p key={i} dangerouslySetInnerHTML={{ __html: renderInline(p.trim()) }} />
      ))}
    </div>
  )
})

export default function PlayMessages({ msgs, loading, latestRef, onRollPrompt }) {
  const msgsRef = useRef(null)
  const lastUserIdx = msgs.reduce((acc, m, i) => m.role === 'user' ? i : acc, -1)
  return (
    <div className="play-msgs-wrap">
    <button className="scroll-btn scroll-btn-top" onClick={() => msgsRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
      <span className="material-symbols-outlined">keyboard_arrow_up</span>
    </button>
    <div className="play-msgs" ref={msgsRef}>
      {msgs.map((m, idx) => {
        const isLastUser = idx === lastUserIdx
        if (m.role === 'assistant') return (
          <Paragraphs
            key={m.id}
            content={m.content}
            className={`msg-dm dm${m.ooc ? ' ooc' : ''}`}
          />
        )

        if (m.role === 'user') return (
          <div key={m.id} ref={isLastUser ? latestRef : null} className="msg-player player">
            <Paragraphs
              content={m.content}
              className={`msg-player-inner${m.ooc ? ' ooc' : ''}`}
            />
          </div>
        )

        if (m.role === 'rollprompt') {
          const profLabel = m.expert ? ' · ★ exp' : m.proficient ? ' · prof' : ''
          const advLabel = m.adv === 'adv' ? ' · adv' : m.adv === 'dis' ? ' · dis' : ''
          return (
            <button key={m.id} className="rollcard rollcard-prompt" onClick={() => onRollPrompt(m)}>
              <div className="rollcard-inner">
                <div className="roll-prompt-icon">
                  <span className="material-symbols-outlined">casino</span>
                </div>
                <div>
                  <div className="roll-skill-dc">{m.skill}</div>
                  <div className="roll-prompt-sub">{m.ability}{m.modifier >= 0 ? ` +${m.modifier}` : ` ${m.modifier}`}{profLabel}{advLabel} · click to roll</div>
                </div>
              </div>
            </button>
          )
        }

        if (m.role === 'roll') {
          const colorClass = rollColorClass(m.total, m.dc)
          const nat = m.d20 === 20 || m.d20 === 1
          const profLabel = m.expert ? '+exp' : m.proficient ? '+prof' : ''
          const advLabel = m.adv === 'adv' ? ' · adv' : m.adv === 'dis' ? ' · dis' : ''
          const diceStr = m.dropped != null
            ? `d20(${m.d20}, ${m.dropped}↷)`
            : `d20(${m.d20})`
          return (
            <div key={m.id} ref={null} className="rollcard">
              <div className="rollcard-inner">
                <div className="roll-total-wrap">
                  <div className={`roll-total ${colorClass}`}>{m.total}</div>
                  {nat && <div className={`roll-nat ${colorClass}`}>{m.d20 === 20 ? 'NAT 20' : 'NAT 1'}</div>}
                </div>
                <div>
                  <div className="roll-skill-dc">{m.skill}{m.dc != null ? ` · DC ${m.dc}` : ''}{advLabel}</div>
                  {m.success != null && (
                    <div className={`roll-result ${m.success ? 'roll-color-success' : 'roll-color-fail'}`}>
                      {m.success ? 'Success' : 'Failure'}
                    </div>
                  )}
                </div>
                <div className="tipwrap roll-tip">
                  ⓘ<span className="tip">{diceStr} {m.modifier >= 0 ? '+' : ''}{m.modifier} [{m.ability}{profLabel}] = {m.total}{m.dc != null ? ` vs DC ${m.dc}` : ''}</span>
                </div>
              </div>
            </div>
          )
        }

        if (m.role === 'attack') return (
          <div key={m.id} className="rollcard">
            <div className="rollcard-inner">
              <div className="roll-total-wrap">
                <div className={`roll-total ${m.hit ? 'roll-color-success' : 'roll-color-fail'}`}>{m.total}</div>
              </div>
              <div>
                <div className="roll-skill-dc">Attack · vs AC {m.ac}</div>
                <div className={`roll-result ${m.hit ? 'roll-color-success' : 'roll-color-fail'}`}>{m.hit ? 'Hit' : 'Miss'}</div>
              </div>
              <div className="tipwrap roll-tip">
                ⓘ<span className="tip">d20({m.d20}){m.bonus >= 0 ? '+' : ''}{m.bonus} = {m.total}{m.adv === 'dis' ? ' · dis' : ''}</span>
              </div>
            </div>
          </div>
        )

        if (m.role === 'heal') return (
          <div key={m.id} className="rollcard">
            <div className="rollcard-inner">
              <div className="roll-total-wrap">
                <div className="roll-total roll-color-success">+{m.amount}</div>
              </div>
              <div>
                <div className="roll-skill-dc">Healing</div>
                <div className="roll-result roll-color-success">HP {m.newHp} / {m.maxHp}</div>
              </div>
            </div>
          </div>
        )

        if (m.role === 'surge') return (
          <div key={m.id} className="event-card event-card-surge">
            <div className="event-icon">✦</div>
            <div>
              <div className="event-label">Wild Magic Surge · {m.roll}</div>
              <div className="event-detail">{m.text}</div>
            </div>
          </div>
        )

        if (m.role === 'damage') return (
          <div key={m.id} className="rollcard">
            <div className="rollcard-inner">
              <div className="roll-total-wrap">
                <div className="roll-total roll-color-fail">{m.total}</div>
              </div>
              <div>
                <div className="roll-skill-dc">Damage · {m.expr}</div>
                <div className="roll-result roll-color-fail">HP {m.newHp} / {m.maxHp}</div>
              </div>
              {m.rollStr && (
                <div className="tipwrap roll-tip">
                  ⓘ<span className="tip">{m.expr}{m.rollStr} = {m.total}</span>
                </div>
              )}
            </div>
          </div>
        )

        if (m.role === 'rest') return (
          <div key={m.id} ref={null} className="event-card">
            <div className="event-icon">{m.short ? '◑' : '○'}</div>
            <div>
              <div className="event-label">{m.short ? 'Short Rest' : 'Long Rest'}</div>
              <div className="event-detail">
                {m.short
                  ? m.hpGain > 0 ? `+${m.hpGain} HP` : 'No HP gained'
                  : 'Full HP · All slots restored'}
              </div>
            </div>
          </div>
        )

        if (m.role === 'tarokka') {
          const rows = [
            { label: 'Tome of Strahd',       draw: m.reading.tome,        sub: LOCATIONS[m.reading.tome.location]?.name },
            { label: 'Holy Symbol',           draw: m.reading.holySymbol,  sub: LOCATIONS[m.reading.holySymbol.location]?.name },
            { label: 'Sunsword',              draw: m.reading.sunsword,    sub: LOCATIONS[m.reading.sunsword.location]?.name },
            { label: 'Ally',                  draw: m.reading.ally,        sub: m.reading.ally.name },
            { label: "Strahd's Lair",         draw: m.reading.lair },
          ]
          return (
            <div key={m.id} ref={null} className="event-card tarokka">
              <div className="tarokka-header">
                <div className="event-icon">✦</div>
                <div className="event-label">Madam Eva's Prophecy</div>
              </div>
              <div className="tarokka-rows">
                {rows.map(({ label, draw, sub }) => (
                  <div key={label} className="tarokka-row">
                    <div className="tarokka-artifact">{label}</div>
                    <div>
                      <div className="tarokka-card-name">{draw.card}</div>
                      <div className="tarokka-hint">{draw.publicText}</div>
                      {sub && <div className="tarokka-location">{sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        }

        if (m.role === 'levelup') return (
          <div key={m.id} ref={null} className="event-card levelup">
            <div className="event-icon">↑</div>
            <div>
              <div className="event-label">Level {m.level}</div>
              {m.condition && <div className="event-detail">{m.condition}</div>}
            </div>
          </div>
        )

        return null
      })}

      {loading && (
        <div className="loading-dots">
          {[0,1,2].map(i => (
            <span key={i} className="loading-dot" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      )}
    </div>
    <button className="scroll-btn scroll-btn-bottom" onClick={() => msgsRef.current?.scrollTo({ top: msgsRef.current.scrollHeight, behavior: 'smooth' })}>
      <span className="material-symbols-outlined">keyboard_arrow_down</span>
    </button>
    </div>
  )
}
