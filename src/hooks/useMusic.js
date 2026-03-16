import { useEffect, useRef, useState } from 'react'

const FADE_MS = 1500
const TICK_MS = 50
const STEPS = FADE_MS / TICK_MS
const VOL_KEY = 'barovia_volume'

function loadVolume() {
  try {
    const v = parseFloat(localStorage.getItem(VOL_KEY))
    return isNaN(v) ? 0.8 : Math.min(1, Math.max(0, v))
  } catch { return 0.8 }
}

export function useMusic(combatActive) {
  const ambientRef    = useRef(null)
  const combatRef     = useRef(null)
  const fadeRef       = useRef(null)
  const mountedRef    = useRef(false)
  const baseVolumeRef = useRef(loadVolume())
  const [muted, setMuted]        = useState(false)
  const [volume, setVolumeState] = useState(baseVolumeRef.current)

  useEffect(() => {
    const ambient = new Audio('/ambient.mp3')
    const combat  = new Audio('/combat.mp3')
    ambient.loop = true
    combat.loop  = true
    ambient.volume = baseVolumeRef.current
    combat.volume  = 0
    ambientRef.current = ambient
    combatRef.current  = combat

    return () => {
      if (fadeRef.current) clearInterval(fadeRef.current)
      ambient.pause()
      combat.pause()
    }
  }, [])

  useEffect(() => {
    if (ambientRef.current) ambientRef.current.muted = muted
    if (combatRef.current)  combatRef.current.muted  = muted
  }, [muted])

  function startAudio() {
    ambientRef.current?.play().catch(() => {})
  }

  function crossfade(toCombat) {
    const from = toCombat ? ambientRef.current : combatRef.current
    const to   = toCombat ? combatRef.current  : ambientRef.current
    if (!from || !to) return

    if (fadeRef.current) clearInterval(fadeRef.current)

    if (toCombat) to.currentTime = 0
    to.volume = 0
    to.play().catch(() => {})

    let step = 0
    const fromStart = from.volume
    const target = baseVolumeRef.current
    fadeRef.current = setInterval(() => {
      step++
      const p = step / STEPS
      from.volume = Math.max(0, fromStart * (1 - p))
      to.volume   = Math.min(target, target * p)
      if (step >= STEPS) {
        clearInterval(fadeRef.current)
        fadeRef.current = null
        from.pause()
        from.volume = 0
      }
    }, TICK_MS)
  }

  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return }
    crossfade(combatActive)
  }, [combatActive]) // eslint-disable-line react-hooks/exhaustive-deps

  function setVolume(v) {
    const val = Math.min(1, Math.max(0, v))
    baseVolumeRef.current = val
    setVolumeState(val)
    try { localStorage.setItem(VOL_KEY, String(val)) } catch {}
    if (ambientRef.current && !ambientRef.current.paused) ambientRef.current.volume = val
    if (combatRef.current  && !combatRef.current.paused)  combatRef.current.volume  = val
  }

  function toggleMute() {
    setMuted(m => !m)
  }

  return { volume, setVolume, muted, toggleMute, startAudio }
}
