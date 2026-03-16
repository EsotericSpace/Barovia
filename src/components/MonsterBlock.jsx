import { SK, SA, modStr } from '../lib/dnd.js'

function crFmt(cr) {
  if (cr === 0.125) return '1/8'
  if (cr === 0.25)  return '1/4'
  if (cr === 0.5)   return '1/2'
  return String(cr)
}

export default function MonsterBlock({ monster: m }) {
  return (
    <div className="monster-block">
      <div className="monster-name">{m.name.toUpperCase()}</div>
      <div className="monster-type">{m.size} {m.type}</div>
      {[['HP', `${m.hit_points} (${m.hit_dice})`], ['AC', m.armor_class?.[0]?.value ?? '—'], ['CR', crFmt(m.challenge_rating)]].map(([l, v]) => (
        <div key={l} className="monster-stat">
          <span className="monster-stat-key">{l}</span>
          <span className="monster-stat-val">{v}</span>
        </div>
      ))}
      <div className="monster-ability-grid">
        {SK.map(k => (
          <div key={k} className="monster-ability">
            <div className="monster-ability-key">{SA[k]}</div>
            <div className="monster-ability-val">{m[k]}</div>
            <div className="monster-ability-mod">{modStr(m[k])}</div>
          </div>
        ))}
      </div>
      {m.actions?.slice(0, 2).map(a => (
        <div key={a.name} className="monster-action">
          <div className="monster-action-name">{a.name}</div>
          <div className="monster-action-desc">{a.desc?.slice(0, 130)}{a.desc?.length > 130 ? '…' : ''}</div>
        </div>
      ))}
    </div>
  )
}
