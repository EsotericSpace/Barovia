export const LK = ({ on, toggle }) => (
  <button
    className={`lock-btn${on ? ' active' : ''}`}
    onClick={toggle}
    title={on ? 'Unlock' : 'Lock'}
  >{on ? '🔒' : '🔓'}</button>
)

export const Reroll = ({ onClick }) => (
  <button className="reroll-btn" onClick={onClick} title="Reroll">↺</button>
)

export const SL = ({ children }) => (
  <div className="sl">{children}</div>
)
