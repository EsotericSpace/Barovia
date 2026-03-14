import { C, TY, SP } from '../lib/tokens.js'
import { SK, SA, modStr } from '../lib/dnd.js'
import { SL, LK } from './CharGenShared.jsx'

export default function CharGenStats({ sheet, character, cfg, locked, toggleStatLock }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: SP.md }}>

      <div>
        <SL>Ability Scores</SL>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
          {SK.map(k => {
            const isLocked = !!locked.stats?.[k]
            const isPri = cfg.pri.includes(k)
            return (
              <div key={k} style={{
                border: `1px solid ${isPri ? C.crimson : C.border}`,
                padding: '6px 4px', textAlign: 'center', position: 'relative',
                background: isPri ? 'rgba(160,40,40,.04)' : 'transparent',
              }}>
                <LK on={isLocked} toggle={() => toggleStatLock(k)} />
                <div style={{ ...TY.micro, color: isPri ? C.textDim : C.textGhost }}>{SA[k]}</div>
                <div style={{ ...TY.heading, fontSize: '1.2rem', color: C.textPrimary, lineHeight: 1.1 }}>{sheet.stats[k]}</div>
                <div style={{ ...TY.label, color: C.crimson }}>{modStr(sheet.stats[k])}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Class Features · {character.class} 1</SL>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm }}>
          {cfg.features.map((f, i) => (
            <div key={f.name}>
              {i > 0 && <div style={{ height: '1px', background: C.border, marginBottom: SP.sm }} />}
              <div style={{ ...TY.micro, color: C.textDim, marginBottom: '2px' }}>{f.name}</div>
              <div style={{ ...TY.caption, color: C.textGhost }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
