import { useState, useEffect } from 'react'
import Barovia from './components/Barovia.jsx'
import Setup from './components/Setup.jsx'
import CharGen from './components/CharGen.jsx'
import Play from './components/Play.jsx'
import SettingsButton from './components/SettingsButton.jsx'
import { useMusic } from './hooks/useMusic.js'

const SAVE_KEY = 'barovia_save'

function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}


export default function App() {
  const saved = loadSave()
  const [phase, setPhase] = useState(saved?.phase ?? 'landing')
  const [character, setCharacter] = useState(saved?.character ?? null)
  const { volume, setVolume, muted, toggleMute, startAudio } = useMusic(!!(character?.activeMonster))
  const audioProps = { volume, setVolume, muted, toggleMute }

  useEffect(() => {
    if (phase === 'play' && character) {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ phase, character }))
    }
  }, [phase, character])

  function newGame() {
    localStorage.removeItem(SAVE_KEY)
    localStorage.removeItem('barovia_msgs')
    setCharacter(null)
    setPhase('setup')
  }

  const screen = (() => {
    if (phase === 'landing') return (
      <Barovia
        onEnter={newGame}
        hasSave={!!saved}
        onContinue={() => setPhase('play')}
        startAudio={startAudio}
        {...audioProps}
      />
    )
    if (phase === 'setup') return (
      <Setup
        onComplete={(name, cls) => {
          setCharacter({ name, class: cls })
          setPhase('chargen')
        }}
        {...audioProps}
      />
    )
    if (phase === 'chargen') return (
      <CharGen
        character={character}
        onBack={() => setPhase('setup')}
        onComplete={(sheet) => {
          setCharacter(c => ({
            ...c, ...sheet,
            hp: sheet.maxHp,
            inventory: [...sheet.equip],
            activeMonster: null,
            conditions: [],
            level: 1,
            milestones: [],
            currentLocation: null,
            deathSaves: { successes: 0, failures: 0 },
          }))
          setPhase('play')
        }}
        {...audioProps}
      />
    )
    return (
      <Play
        character={character}
        onCharacterUpdate={updater => {
          setCharacter(prev => typeof updater === 'function' ? updater(prev) : updater)
        }}
        onExit={() => setPhase('landing')}
        {...audioProps}
      />
    )
  })()

  return (
    <>
      {screen}
      <SettingsButton volume={volume} setVolume={setVolume} muted={muted} toggleMute={toggleMute} className="app-settings" />
    </>
  )
}
