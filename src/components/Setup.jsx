import { useState, useEffect, useRef } from 'react'
import { CLASSES, CLASS_CONFIG } from '../data/classes.js'

export default function Setup({ onComplete }) {
  const [name, setName] = useState('')
  const [cls, setCls] = useState('')
  const nameRef = useRef(null)

  useEffect(() => {
    const el = nameRef.current
    if (!el) return
    el.style.fontSize = ''
    if (el.scrollWidth > el.clientWidth) {
      const base = parseFloat(getComputedStyle(el).fontSize)
      el.style.fontSize = Math.max(12, base * el.clientWidth / el.scrollWidth) + 'px'
    }
  }, [name])

  const ready = name.trim() && cls
  const cfg = cls ? CLASS_CONFIG[cls] : null

  return (
    <div className="setup-page">
      <div className="setup-scroll">
      <div className="setup-name-wrap anim-fade-up">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ready && onComplete(name.trim(), cls)}
          placeholder="What shall the mists call you?"
          maxLength={40}
          autoComplete="new-password"
          autoFocus
          ref={nameRef}
          className="setup-name-input"
        />
      </div>

      <div className="setup-classes-wrap anim-fade-up delay-1">
        <div className="sl">Your Class</div>
        <div className="class-grid">
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
            <div key={f.name} className="feature-item">
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          )) : (
            <div className="setup-feature-placeholder">
              No class chosen. No fate written.
            </div>
          )}
        </div>
      </div>
      </div>

      <div className="page-footer anim-fade-up delay-2">
        <button
          className="setup-enter ebtn btn-mobile-cta"
          onClick={() => ready && onComplete(name.trim(), cls)}
          disabled={!ready}
        >Roll Your Fate</button>
      </div>
    </div>
  )
}
