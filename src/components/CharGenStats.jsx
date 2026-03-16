import { SK, SA, modStr } from '../lib/dnd.js'
import { SL, LK } from './CharGenShared.jsx'

export default function CharGenStats({ sheet, character, cfg, locked, toggleStatLock }) {
  return (
    <div className="cg-col">

      <div>
        <SL>Ability Scores</SL>
        <div className="stat-grid">
          {SK.map(k => {
            const isLocked = !!locked.stats?.[k]
            const isPri = cfg.pri.includes(k)
            return (
              <div key={k} className={`stat-cell${isPri ? ' primary' : ''}`}>
                <LK on={isLocked} toggle={() => toggleStatLock(k)} />
                <div className="stat-key">{SA[k]}</div>
                <div className="stat-val">{sheet.stats[k]}</div>
                <div className="stat-mod">{modStr(sheet.stats[k])}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Class Features · {character.class} 1</SL>
        <div className="feature-list">
          {cfg.features.map((f, i) => (
            <div key={f.name}>
              {i > 0 && <div className="feature-divider" />}
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {sheet.cantrips?.length > 0 && (
        <div>
          <SL>Spells</SL>
          <div className="spell-list">
            {sheet.spellSlots?.length > 0 && (
              <div className="spell-slots-info">
                {sheet.spellSlots.map(s => `${s.total} × L${s.level}`).join(', ')} · {sheet.shortRestCaster ? 'short rest' : 'long rest'}
              </div>
            )}
            {sheet.cantrips.map(s => (
              <div key={s} className="spell-row">
                <span className="spell-dot cantrip">◆</span>
                <span className="spell-name">{s}</span>
                <span className="spell-tier">cantrip</span>
              </div>
            ))}
            {sheet.spellsKnown.map(s => (
              <div key={s} className="spell-row">
                <span className="spell-dot known">◆</span>
                <span className="spell-name">{s}</span>
                <span className="spell-tier">1st</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
