import { C, TY, SP } from '../lib/tokens.js'
import { SK, SA, modStr } from '../lib/dnd.js'

function crFmt(cr) {
  if (cr === 0.125) return '1/8'
  if (cr === 0.25)  return '1/4'
  if (cr === 0.5)   return '1/2'
  return String(cr)
}

export default function MonsterBlock({ monster: m }) {
  return (
    <div style={{ marginBottom: '.85rem', paddingBottom: '.85rem', borderBottom: `1px solid ${C.border}` }}>
      <div style={{ ...TY.heading, color: C.gold, marginBottom: '.1rem' }}>{m.name.toUpperCase()}</div>
      <div style={{ ...TY.helper, color: C.textDim, fontStyle: 'italic', marginBottom: SP.xs }}>{m.size} {m.type}</div>
      {[['HP', `${m.hit_points} (${m.hit_dice})`], ['AC', m.armor_class?.[0]?.value ?? '—'], ['CR', crFmt(m.challenge_rating)]].map(([l, v]) => (
        <div key={l} style={{ display: 'flex', justifyContent: 'space-between', ...TY.helper, marginBottom: '.15rem' }}>
          <span style={{ color: C.textGhost }}>{l}</span>
          <span style={{ color: C.textMuted }}>{v}</span>
        </div>
      ))}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.22rem', marginTop: SP.xs }}>
        {SK.map(k => (
          <div key={k} style={{ textAlign: 'center', border: `1px solid ${C.border}`, padding: '.22rem .1rem' }}>
            <div style={{ ...TY.micro, color: C.textGhost }}>{SA[k]}</div>
            <div style={{ fontSize: '.8rem', color: C.textMuted }}>{m[k]}</div>
            <div style={{ ...TY.micro, color: C.crimson }}>{modStr(m[k])}</div>
          </div>
        ))}
      </div>
      {m.actions?.slice(0, 2).map(a => (
        <div key={a.name} style={{ marginTop: SP.xs }}>
          <div style={{ ...TY.micro, color: C.textDim }}>{a.name}</div>
          <div style={{ ...TY.helper, color: C.textGhost, marginTop: '.08rem' }}>{a.desc?.slice(0, 130)}{a.desc?.length > 130 ? '…' : ''}</div>
        </div>
      ))}
    </div>
  )
}
