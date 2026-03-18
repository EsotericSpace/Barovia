import { forwardRef } from 'react'
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
        <p key={i}>{p.trim()}</p>
      ))}
    </div>
  )
})

export default function PlayMessages({ msgs, loading, latestRef }) {
  const lastIdx = msgs.length - 1
  return (
    <div className="play-msgs">
      {msgs.map((m, idx) => {
        const isLast = idx === lastIdx
        if (m.role === 'assistant') return (
          <Paragraphs
            key={m.id}
            ref={isLast ? latestRef : null}
            content={m.content}
            className={`msg-dm dm${m.ooc ? ' ooc' : ''}`}
          />
        )

        if (m.role === 'user') return (
          <div key={m.id} ref={isLast ? latestRef : null} className="msg-player player">
            <Paragraphs
              content={m.content}
              className={`msg-player-inner${m.ooc ? ' ooc' : ''}`}
            />
          </div>
        )

        if (m.role === 'roll') {
          const colorClass = rollColorClass(m.total, m.dc)
          const nat = m.d20 === 20 || m.d20 === 1
          return (
            <div key={m.id} ref={isLast ? latestRef : null} className="rollcard">
              <div className="roll-total-wrap">
                <div className={`roll-total ${colorClass}`}>{m.total}</div>
                {nat && <div className={`roll-nat ${colorClass}`}>{m.d20 === 20 ? 'NAT 20' : 'NAT 1'}</div>}
              </div>
              <div>
                <div className="roll-skill-dc">{m.skill} · DC {m.dc}</div>
                <div className={`roll-result ${m.success ? 'roll-color-success' : 'roll-color-fail'}`}>
                  {m.success ? 'Success' : 'Failure'}
                </div>
              </div>
              <div className="tipwrap roll-tip">
                ⓘ<span className="tip">d20({m.d20}) {m.modifier >= 0 ? '+' : ''}{m.modifier} [{m.ability}] = {m.total} vs DC {m.dc}</span>
              </div>
            </div>
          )
        }

        if (m.role === 'rest') return (
          <div key={m.id} ref={isLast ? latestRef : null} className="event-card">
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
            <div key={m.id} ref={isLast ? latestRef : null} className="event-card tarokka">
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
          <div key={m.id} ref={isLast ? latestRef : null} className="event-card levelup">
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
            <span key={i} className="loading-dot" />
          ))}
        </div>
      )}
    </div>
  )
}
