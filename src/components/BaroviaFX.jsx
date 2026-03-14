import { C } from '../lib/tokens.js'

export default function BaroviaFX({ t }) {
  const vignetteOpacity = 0.85 + Math.sin(t * 0.25) * 0.12

  return <>
    <div style={{
      position: "absolute", inset: 0,
      background: `radial-gradient(ellipse 80% 50% at 50% 60%, #1a0810 0%, transparent 70%)`,
      opacity: vignetteOpacity,
      pointerEvents: "none",
    }} />

    {[0, 1, 2].map(i => (
      <div key={i} style={{
        position: "absolute",
        bottom: 0,
        left: `${-30 + Math.sin(t + i * 1.2) * 15}%`,
        width: "160%",
        height: `${25 + i * 12}%`,
        background: `radial-gradient(ellipse 60% 100% at 50% 100%, rgba(${55 + i * 6}, ${12 + i * 3}, ${12 + i * 3}, ${0.55 - i * 0.1}) 0%, transparent 70%)`,
        filter: "blur(8px)",
        pointerEvents: "none",
      }} />
    ))}
  </>
}
