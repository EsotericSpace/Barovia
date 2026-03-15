import { C, TY, SP } from '../lib/tokens.js'

export const LK = ({ on, toggle }) => (
  <button
    className="lbtn" onClick={toggle}
    style={{
      position: 'absolute', top: '6px', right: '4px',
      ...TY.micro, color: on ? C.gold : C.textGhost, opacity: on ? 1 : .3,
      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
    }}
    title={on ? 'Unlock' : 'Lock'}
  >{on ? '🔒' : '🔓'}</button>
)

export const Reroll = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      background: 'none', border: 'none', color: C.textGhost, cursor: 'pointer',
      fontSize: '.55rem', lineHeight: 1, padding: '0 .1rem', transition: 'color .15s',
    }}
    onMouseEnter={e => e.currentTarget.style.color = C.textMuted}
    onMouseLeave={e => e.currentTarget.style.color = C.textGhost}
    title="Reroll"
  >↺</button>
)

export const SL = ({ children }) => (
  <div style={{
    ...TY.micro, color: C.textDim,
    marginBottom: SP.sm, paddingBottom: SP.xs, borderBottom: `1px solid ${C.border}`,
  }}>{children}</div>
)
