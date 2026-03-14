import { useState, useEffect } from 'react'
import { CLASSES, CLASS_CONFIG } from '../data/classes.js'
import { C, TY, SP, ANIM } from '../lib/tokens.js'
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
    <div style={{
      minHeight: '100vh', background: C.bg,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: SP.page, gap: SP.lg, ...TY.body, color: C.textPrimary,
      position: 'relative', overflow: 'hidden',
    }}>
      <BaroviaFX t={t} />

      {/* Name input */}
      <div style={{
        width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1,
        animation: ANIM.fadeUp,
      }}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && ready && onComplete(name.trim(), cls)}
          placeholder="Enter your name..."
          maxLength={40}
          autoFocus
          style={{
            background: 'transparent', border: 'none', borderBottom: `1px solid ${C.border}`,
            color: C.textPrimary, ...TY.body, fontSize: '1.2rem',
            padding: '.3rem 0', outline: 'none', width: '100%',
          }}
        />
      </div>

      {/* Class grid + flavor */}
      <div style={{
        width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1,
        marginTop: SP.lg,
        animation: ANIM.fadeUp, animationDelay: '0.15s', opacity: 0,
        animationFillMode: 'forwards',
      }}>
        <div style={{ ...TY.micro, color: C.textDim, letterSpacing: '.2em', marginBottom: SP.sm }}>Your Class</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: SP.md }}>
          {CLASSES.map(c => {
            const active = cls === c
            return (
              <button
                key={c} className="cbtn"
                onClick={() => setCls(c)}
                style={{
                  background: active ? `rgba(160,40,40,.2)` : 'rgba(6,6,8,.25)',
                  border: `1px solid ${active ? C.crimson : C.border}`,
                  color: active ? C.gold : C.textDim,
                  ...TY.micro, fontSize: '.45rem', letterSpacing: '.06em',
                  padding: '.2rem .4rem', cursor: 'pointer', transition: 'all .15s',
                }}
              >{c}</button>
            )
          })}
        </div>

        {/* Flavor panel — fixed height to prevent layout shift */}
        <div style={{
          marginTop: SP.md, padding: SP.lg,
          border: `1px solid ${C.border}`, background: 'rgba(6,6,8,.6)',
          height: '10rem', overflowY: 'auto',
        }}>
          {cfg ? cfg.features.map((f, i) => (
            <div key={f.name} style={{ marginTop: i > 0 ? SP.sm : 0 }}>
              <div style={{ ...TY.micro, color: C.textDim, marginBottom: '3px' }}>{f.name}</div>
              <div style={{ ...TY.caption, color: C.textGhost }}>{f.desc}</div>
            </div>
          )) : (
            <div style={{ ...TY.caption, color: '#3a2a2a', fontStyle: 'italic' }}>
              Who dares enter Barovia? The mists have been waiting a long time for a soul like yours.
            </div>
          )}
        </div>
      </div>

      <button
        className="ebtn"
        onClick={() => ready && onComplete(name.trim(), cls)}
        disabled={!ready}
        style={{
          background: 'rgba(6,6,8,.25)',
          border: `1px solid ${C.crimson}`,
          color: ready ? C.gold : C.textDim,
          ...TY.label, fontSize: '.68rem', letterSpacing: '.22em',
          padding: '.75rem 2rem', cursor: ready ? 'pointer' : 'default', transition: 'all .25s',
          position: 'relative', zIndex: 1,
          animation: ANIM.fadeUp, animationDelay: '0.3s', opacity: 0,
          animationFillMode: 'forwards',
        }}
      >Roll Your Fate</button>
    </div>
  )
}
