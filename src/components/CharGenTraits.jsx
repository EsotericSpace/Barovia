import { C, TY, SP } from '../lib/tokens.js'
import { SL, Reroll } from './CharGenShared.jsx'

export default function CharGenTraits({ sheet, bg, rerollTrait, prevBackground, nextBackground }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: SP.md }}>

      <div>
        <SL>Background</SL>
        <div style={{ border: `1px solid ${C.border}`, padding: SP.sm }}>
          <div style={{
            ...TY.label, color: C.gold, marginBottom: SP.xs,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <button onClick={prevBackground} style={{ background: 'none', color: C.textMuted, fontSize: '1rem', lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>‹</button>
            <span>{sheet.background}</span>
            <button onClick={nextBackground} style={{ background: 'none', color: C.textMuted, fontSize: '1rem', lineHeight: 1, cursor: 'pointer', padding: '0 4px' }}>›</button>
          </div>
          <div style={{ ...TY.caption, color: C.textDim, fontStyle: 'italic', marginBottom: SP.sm }}>{bg.desc}</div>
          <div style={{ height: '1px', background: C.border, marginBottom: SP.sm }} />
          <div style={{ ...TY.micro, color: C.textDim, marginBottom: '3px' }}>Feature · {bg.feature}</div>
          <div style={{ ...TY.caption, color: C.textGhost }}>{bg.featureDesc}</div>
        </div>
      </div>

      <div>
        <SL>Character Traits</SL>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.sm }}>
          {[['personality', 'Personality'], ['ideal', 'Ideal'], ['bond', 'Bond'], ['flaw', 'Flaw']].map(([key, label]) => {
            const isFlaw = key === 'flaw'
            return (
              <div key={key} style={{ borderLeft: `2px solid ${isFlaw ? C.crimson : C.border}`, paddingLeft: SP.sm }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                  <span style={{ ...TY.micro, color: isFlaw ? C.crimson : C.textDim }}>{label}</span>
                  <Reroll onClick={() => rerollTrait(key)} />
                </div>
                <div style={{ ...TY.caption, color: C.textMuted, fontStyle: 'italic' }}>{sheet[key]}</div>
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
