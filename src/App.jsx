import { useState, useEffect } from 'react'
import Barovia from './components/Barovia.jsx'
import CharGen from './components/CharGen.jsx'
import Play from './components/Play.jsx'
import SettingsButton from './components/SettingsButton.jsx'
import { useMusic } from './hooks/useMusic.js'
import {
  migrate, getActiveSlot, persistActiveSlot,
  loadSlot, writeSlot, clearSlot, loadAllSlots,
} from './lib/saves.js'
import { CLASS_WEAPONS } from './data/weapons.js'

const MONSTER_HUNTER_PACK = ["Crowbar", "Hammer", "3 wooden stakes", "Flask of holy water", "Steel mirror", "Manacles", "Tinderbox", "5 torches", "5 days' rations"]

function patchCharacter(c) {
  if (!c) return c
  let inv = c.inventory ?? []
  let result = { ...c }

  if (inv.includes("Monster hunter's pack")) {
    inv = inv.filter(i => i !== "Monster hunter's pack")
    const missing = MONSTER_HUNTER_PACK.filter(i => !inv.includes(i))
    inv = [...inv, ...missing]
    result = { ...result, inventory: inv }
  }

  if (!result.startingWeapons) {
    const weapons = CLASS_WEAPONS[c.class]?.starting ?? []
    const missing = weapons.filter(w => !inv.includes(w))
    result = { ...result, startingWeapons: weapons, inventory: [...inv, ...missing] }
  }

  return result
}

migrate()

export default function App() {
  const [activeSlot, setActiveSlot] = useState(() => getActiveSlot())
  const [phase, setPhase]           = useState(() => loadSlot(getActiveSlot())?.phase ?? 'landing')
  const [character, setCharacter]   = useState(() => patchCharacter(loadSlot(getActiveSlot())?.character ?? null))
  const [savesModal, setSavesModal]  = useState(false)
  const { volume, setVolume, muted, toggleMute, startAudio } = useMusic(!!(character?.activeMonster))
  const audioProps = { volume, setVolume, muted, toggleMute }
  const hasAnySave = loadAllSlots().some(s => s !== null)

  useEffect(() => {
    if (phase === 'play' && character) writeSlot(activeSlot, phase, character)
  }, [phase, character, activeSlot])

  function switchSlot(slot, startNew = false) {
    const saved = startNew ? null : loadSlot(slot)
    if (startNew) clearSlot(slot)
    setActiveSlot(slot)
    persistActiveSlot(slot)
    setCharacter(patchCharacter(saved?.character ?? null))
    setPhase(saved && !startNew ? 'play' : 'chargen')
  }

  function newGame() {
    const slots = loadAllSlots()
    const emptyIdx = slots.findIndex(s => s === null)
    const target = emptyIdx >= 0 ? emptyIdx : 0
    switchSlot(target, true)
  }

  const settingsProps = {
    volume, setVolume, muted, toggleMute,
    activeSlot,
    onLoadSlot: slot => switchSlot(slot, false),
    onNewInSlot: slot => switchSlot(slot, true),
    savesModal,
    onSavesModalClose: () => setSavesModal(false),
  }

  const screen = (() => {
    if (phase === 'landing') return (
      <Barovia
        onEnter={newGame}
        hasSave={!!loadSlot(activeSlot)}
        onContinue={() => setPhase('play')}
        hasAnySave={hasAnySave}
        onLoadGames={() => setSavesModal(true)}
        startAudio={startAudio}
        {...audioProps}
      />
    )
    if (phase === 'chargen') return (
      <CharGen
        onBack={() => setPhase('landing')}
        onComplete={(sheet) => {
          setCharacter({
            ...sheet,
            hp: sheet.maxHp,
            inventory: [...sheet.equip, ...sheet.startingWeapons],
            activeMonster: null,
            conditions: [],
            level: 1,
            milestones: [],
            currentLocation: null,
            deathSaves: { successes: 0, failures: 0 },
          })
          setPhase('play')
        }}
        settingsSlot={<SettingsButton {...settingsProps} />}
        {...audioProps}
      />
    )
    return (
      <Play
        character={character}
        slotIndex={activeSlot}
        onCharacterUpdate={updater => {
          setCharacter(prev => typeof updater === 'function' ? updater(prev) : updater)
        }}
        onExit={() => setPhase('landing')}
      />
    )
  })()

  return (
    <>
      {screen}
      {phase !== 'chargen' && (
        <SettingsButton {...settingsProps} className="app-settings" />
      )}
    </>
  )
}
