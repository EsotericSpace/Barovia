import { useEffect, useState } from "react";
import BaroviaFX from './BaroviaFX.jsx'

const letters = ["B", "a", "r", "o", "v", "i", "a"];

export default function Barovia({ onEnter, hasSave, onContinue, startAudio }) {
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
    <div className="landing-page">
      <BaroviaFX t={t} />

      <div className="landing-content">

        <div className="landing-title-wrap">
          <div className="landing-letters">
            {letters.map((letter, i) => (
              <span key={i} className="landing-letter" style={{
                filter: visible ? `drop-shadow(0 0 ${8 + i * 2}px rgba(160, 40, 40, 0.4))` : "none",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : `translateY(${30 + i * 8}px)`,
                transition: `opacity 0.9s ease ${0.1 * i + 0.3}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 * i + 0.3}s`,
              }}>
                {letter}
              </span>
            ))}
          </div>

          <div className="landing-tagline" style={{
            opacity: enterVisible ? 1 : 0,
            transform: enterVisible ? "translateY(0)" : "translateY(8px)",
          }}>
            Something in the valley has been waiting a very long time...
          </div>
        </div>

        <div className="landing-btns" style={{
          opacity: enterVisible ? 1 : 0,
          transform: enterVisible ? "translateY(0)" : "translateY(12px)",
          pointerEvents: enterVisible ? "auto" : "none",
        }}>
          {hasSave && (
            <button className="landing-btn ebtn btn-mobile-cta" onClick={() => { startAudio(); onContinue() }}>Continue</button>
          )}
          <button
            className={`landing-btn ebtn btn-mobile-cta${hasSave ? ' secondary' : ''}`}
            onClick={() => { startAudio(); onEnter() }}
          >{hasSave ? 'New Game' : 'Enter'}</button>
        </div>

      </div>
    </div>
  );
}
