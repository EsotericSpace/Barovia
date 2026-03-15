import { C, TY, SP } from '../lib/tokens.js'

function rollColor(total, dc, rollTokens) {
  const { rollNat20, rollNat1, rollSuccess, rollSuccessClose, rollFail, rollFailClose } = rollTokens
  if (total === 20) return rollNat20
  if (total === 1)  return rollNat1
  if (dc) return total >= dc
    ? (total >= dc + 5 ? rollSuccess : rollSuccessClose)
    : (total <= dc - 5 ? rollFail : rollFailClose)
  if (total >= 17) return rollSuccess
  if (total >= 12) return rollSuccessClose
  return rollFail
}

function Paragraphs({ content, style }) {
  const paras = content.split(/\n\n+/).filter(Boolean)
  return (
    <div style={style}>
      {paras.map((p, i) => (
        <p key={i} style={{ margin: 0, marginTop: i > 0 ? '.6rem' : 0 }}>{p.trim()}</p>
      ))}
    </div>
  )
}

export default function PlayMessages({ msgs, loading, bottomRef }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: SP.page, display: 'flex', flexDirection: 'column', gap: SP.md }}>
      {msgs.map(m => {
        if (m.role === 'assistant') return (
          <Paragraphs key={m.id} content={m.content} style={{
            maxWidth: '70ch',
            ...(m.ooc ? TY.ooc : { ...TY.action, fontSize: '.88rem', fontStyle: 'normal' }),
            color: m.ooc ? C.ooc : C.textPrimary,
            borderLeft: m.ooc ? `2px solid ${C.oocBorder}` : undefined,
            paddingLeft: m.ooc ? '.85rem' : undefined,
          }} />
        )

        if (m.role === 'user') return (
          <div key={m.id} className="player" style={{ alignSelf: 'flex-end', maxWidth: '840px' }}>
            <Paragraphs content={m.content} style={{
              borderLeft: `2px solid ${m.ooc ? C.oocBorder : C.icBorder}`,
              paddingLeft: '.85rem',
              color: m.ooc ? C.ooc : C.textDim,
              ...TY.action, fontSize: '.78rem', lineHeight: '1.45',
            }} />
          </div>
        )

        if (m.role === 'roll') {
          const color = rollColor(m.total, m.dc, C)
          const nat = m.d20 === 20 || m.d20 === 1
          return (
            <div key={m.id} className="rollcard" style={{
              alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: SP.md,
              border: `1px solid ${C.border}`, padding: `${SP.sm} ${SP.md}`, background: 'rgba(8,5,10,.8)',
            }}>
              <div style={{ textAlign: 'center', minWidth: '2rem' }}>
                <div style={{ ...TY.heading, fontSize: '1.3rem', color, lineHeight: 1 }}>{m.total}</div>
                {nat && <div style={{ ...TY.micro, color }}>{m.d20 === 20 ? 'NAT 20' : 'NAT 1'}</div>}
              </div>
              <div>
                <div style={{ ...TY.micro, color: C.textDim }}>{m.skill} · DC {m.dc}</div>
                <div style={{ ...TY.helper, color: m.success ? C.rollSuccess : C.rollFail, fontStyle: 'italic' }}>
                  {m.success ? 'Success' : 'Failure'}
                </div>
              </div>
              <div className="tipwrap" style={{ color: C.surface, fontSize: '.75rem' }}>
                ⓘ<span className="tip">d20({m.d20}) {m.modifier >= 0 ? '+' : ''}{m.modifier} [{m.ability}] = {m.total} vs DC {m.dc}</span>
              </div>
            </div>
          )
        }

        if (m.role === 'rest') return (
          <div key={m.id} style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: SP.md,
            border: `1px solid ${C.border}`, padding: `${SP.sm} ${SP.md}`, background: 'rgba(8,5,10,.8)',
          }}>
            <div style={{ ...TY.heading, fontSize: '1.1rem', color: C.textMuted, lineHeight: 1 }}>{m.short ? '◑' : '○'}</div>
            <div>
              <div style={{ ...TY.label, color: C.textDim }}>{m.short ? 'Short Rest' : 'Long Rest'}</div>
              <div style={{ ...TY.helper, color: C.textGhost, fontStyle: 'italic' }}>
                {m.short
                  ? m.hpGain > 0 ? `+${m.hpGain} HP` : 'No HP gained'
                  : 'Full HP · All slots restored'}
              </div>
            </div>
          </div>
        )

        if (m.role === 'levelup') return (
          <div key={m.id} style={{
            alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: SP.md,
            border: `1px solid ${C.gold}`, padding: `${SP.sm} ${SP.md}`, background: 'rgba(8,5,10,.8)',
          }}>
            <div style={{ ...TY.heading, fontSize: '1.1rem', color: C.gold, lineHeight: 1 }}>↑</div>
            <div>
              <div style={{ ...TY.label, color: C.gold }}>Level {m.level}</div>
              <div style={{ ...TY.helper, color: C.textDim, fontStyle: 'italic' }}>HP · Proficiency · Spells updated</div>
            </div>
          </div>
        )

        return null
      })}

      {loading && (
        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
          {[0,1,2].map(i => (
            <span key={i} style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: C.crimson, animation: `blink 1.2s ease-in-out ${i*.2}s infinite` }} />
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
