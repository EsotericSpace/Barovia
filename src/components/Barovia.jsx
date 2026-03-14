import { useEffect, useState } from "react";
import { C, TY, SP } from '../lib/tokens.js'
import BaroviaFX from './BaroviaFX.jsx'

const letters = ["B", "a", "r", "o", "v", "i", "a"];

export default function Barovia({ onEnter, hasSave, onContinue }) {
  const [visible, setVisible] = useState(false);
  const [t, setT] = useState(0);
  const [enterVisible, setEnterVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
    setTimeout(() => setEnterVisible(true), 2400);
    let frame;
    let time = 0;
    const animate = () => {
      time += 0.003;
      setT(time);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);


  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      position: "relative",
    }}>
      <BaroviaFX t={t} />

      <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: SP.xl }}>

        {/* Title + Tagline */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: SP.sm }}>
          <div style={{ display: "flex" }}>
            {letters.map((letter, i) => (
              <span key={i} style={{
                fontSize: "clamp(5rem, 14vw, 11rem)", lineHeight: 1,
                fontFamily: "'Cinzel', serif",
                fontWeight: 700,
                color: "transparent",
                backgroundImage: `linear-gradient(180deg, ${C.crimson} 0%, #5c0e0e 60%, #2a0505 100%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                filter: visible ? `drop-shadow(0 0 ${8 + i * 2}px rgba(160, 40, 40, 0.4))` : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : `translateY(${30 + i * 8}px)`,
                transition: `opacity 0.9s ease ${0.1 * i + 0.3}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i + 0.3}s`,
              }}>
                {letter}
              </span>
            ))}
          </div>

          {/* Tagline */}
          <div style={{
            ...TY.ooc, color: C.textGhost, letterSpacing: '.12em',
            opacity: enterVisible ? 1 : 0,
            transform: enterVisible ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 1.2s ease, transform 1.2s ease",
          }}>
            Something in the valley has been waiting a very long time...
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: SP.sm,
          opacity: enterVisible ? 1 : 0,
          transform: enterVisible ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 1.2s ease 0.4s, transform 1.2s ease 0.4s",
          pointerEvents: enterVisible ? "auto" : "none",
        }}>
          {hasSave && (
            <button
              className="ebtn"
              onClick={onContinue}
              style={{
                background: "transparent",
                border: `1px solid ${C.crimson}`,
                color: C.gold,
                ...TY.label, fontSize: '.68rem', letterSpacing: '.22em',
                padding: '.75rem 2rem', cursor: 'pointer',
              }}
            >Continue</button>
          )}
          <button
            className="ebtn"
            onClick={onEnter}
            style={{
              background: "transparent",
              border: `1px solid ${hasSave ? C.border : C.crimson}`,
              color: hasSave ? C.textGhost : C.gold,
              ...TY.label, fontSize: '.68rem', letterSpacing: '.22em',
              padding: '.75rem 2rem', cursor: 'pointer',
            }}
          >{hasSave ? 'New Game' : 'Enter'}</button>
        </div>

      </div>
    </div>
  );
}
