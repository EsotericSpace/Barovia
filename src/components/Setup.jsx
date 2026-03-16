import { useState, useEffect } from 'react'
import { CLASSES, CLASS_CONFIG } from '../data/classes.js'
import BaroviaFX from './BaroviaFX.jsx'

export default function Setup({ onComplete }) {
  const [name, setName] = useState('')
  const [cls, setCls] = useState('')
  const [t, setT] = useState(0)

  useEffect(() => {
    let frame
    let time = 0
    const animate = () => {
      time += 0.003
      setT(time)
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const ready = name.trim() && cls
  const cfg = cls ? CLASS_CONFIG[cls] : null

  return (
    <div className="setup-page">
      <BaroviaFX t={t} />

      <div className="setup-name-wrap anim-fade-up">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ready && onComplete(name.trim(), cls)}
          placeholder="Enter your name..."
          maxLength={40}
          autoComplete="new-password"
          autoFocus
          className="setup-name-input"
        />
      </div>

      <div className="setup-classes-wrap anim-fade-up delay-1">
        <div className="setup-class-label">Your Class</div>
        <div className="class-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--sp-md)' }}>
          {CLASSES.map(c => (
            <button
              key={c}
              className={`class-btn cbtn${cls === c ? ' active' : ''}`}
              onClick={() => setCls(c)}
            >{c}</button>
          ))}
        </div>

        <div className="setup-features">
          {cfg ? cfg.features.map((f, i) => (
            <div key={f.name} style={{ marginTop: i > 0 ? 'var(--sp-sm)' : 0 }}>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          )) : (
            <div className="setup-feature-placeholder">
              Who dares enter Barovia? The mists have been waiting a long time for a soul like yours.
            </div>
          )}
        </div>
      </div>

      <button
        className="setup-enter ebtn anim-fade-up delay-2"
        onClick={() => ready && onComplete(name.trim(), cls)}
        disabled={!ready}
      >Roll Your Fate</button>
    </div>
  )
}
