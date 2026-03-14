import { useState, useEffect } from 'react'
import Barovia from './components/Barovia.jsx'
import Setup from './components/Setup.jsx'
import CharGen from './components/CharGen.jsx'
import Play from './components/Play.jsx'

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

  if (phase === 'landing') {
    return (
      <Barovia
        onEnter={newGame}
        hasSave={!!saved}
        onContinue={() => setPhase('play')}
      />
    )
  }

  if (phase === 'setup') {
    return (
      <Setup
        onComplete={(name, cls) => {
          setCharacter({ name, class: cls })
          setPhase('chargen')
        }}
      />
    )
  }

  if (phase === 'chargen') {
    return (
      <CharGen
        character={character}
        onComplete={(sheet) => {
          setCharacter(c => ({
            ...c, ...sheet,
            hp: sheet.maxHp,
            inventory: [...sheet.equip],
            activeMonster: null,
            conditions: [],
          }))
          setPhase('play')
        }}
      />
    )
  }

  return (
    <Play
      character={character}
      onCharacterUpdate={c => {
        const next = typeof c === 'function' ? c(character) : c
        setCharacter(next)
      }}
    />
  )
}
