import { useState, useEffect } from 'react'
import { loadAllSlots } from '../lib/saves.js'
import { LOCATIONS } from '../data/locations/index.js'

export default function SettingsButton({ volume, setVolume, muted, toggleMute, className = '', activeSlot, onLoadSlot, onNewInSlot, savesModal, onSavesModalClose }) {
  const [open, setOpen]         = useState(false)
  const [view, setView]         = useState(null) // null = top, 'audio', 'saves'
  const [slots, setSlots]       = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (open) setSlots(loadAllSlots())
  }, [open])

  useEffect(() => {
    if (savesModal) { setSlots(loadAllSlots()); setOpen(true); setView('saves') }
  }, [savesModal])

  useEffect(() => {
    if (view !== 'saves' || !slots) return
    const mostRecent = slots.reduce((best, slot, i) => {
      if (!slot) return best
      if (best === null || (slot.savedAt ?? 0) > (slots[best]?.savedAt ?? 0)) return i
      return best
    }, null)
    setSelected(mostRecent ?? activeSlot)
  }, [view, slots, activeSlot])

  const hasSaves = slots?.some(s => s !== null)

  function close() { setOpen(false); setView(null); setSelected(null); onSavesModalClose?.() }

  function handleResume() {
    if (selected === null) return
    const slot = slots?.[selected]
    if (slot) { onLoadSlot(selected); close() }
    else { onNewInSlot(selected); close() }
  }

  function handleDelete() {
    if (selected === null || !slots?.[selected]) return
    if (!window.confirm('Start a new game in this slot? This cannot be undone.')) return
    onNewInSlot(selected)
    close()
  }

  const volIcon = muted ? 'volume_off' : volume < 0.4 ? 'volume_down' : 'volume_up'
  const selectedSlot = selected !== null ? slots?.[selected] : null

  return (
    <>
      <button
        className={`settings-btn${className ? ' ' + className : ''}`}
        onClick={() => { setOpen(true); setView(null) }}
        title="Settings"
      >
        <span className="material-symbols-outlined">settings</span>
      </button>

      {open && (
        <div className="settings-backdrop" onClick={close}>
          <div
            className={`settings-modal${view === 'saves' ? ' settings-modal--saves' : ''}`}
            onClick={e => e.stopPropagation()}
          >

            {/* Standard header — top level and audio */}
            {view !== 'saves' && (
              <div className="settings-modal-header">
                {view ? (
                  <button className="settings-close" onClick={() => setView(null)} title="Back">
                    <span className="material-symbols-outlined">arrow_back</span>
                  </button>
                ) : (
                  <button className="settings-close" onClick={close} title="Close">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                )}
                <div className="settings-modal-title">
                  {view === 'audio' ? 'Audio' : 'Settings'}
                </div>
              </div>
            )}

            {/* Saves header — 3-column */}
            {view === 'saves' && (
              <div className="settings-saves-header">
                <button className="settings-saves-back" onClick={() => setView(null)}>
                  <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <div className="settings-saves-title">Saved Games</div>
                <button className="settings-saves-close" onClick={close}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
            )}

            {/* Top level menu */}
            {!view && (
              <div className="settings-menu">
                <button className="settings-menu-item" onClick={() => setView('audio')}>
                  <span className="settings-menu-label">Audio</span>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
                {hasSaves && (
                  <button className="settings-menu-item" onClick={() => setView('saves')}>
                    <span className="settings-menu-label">Save Games</span>
                    <span className="material-symbols-outlined">chevron_right</span>
                  </button>
                )}
              </div>
            )}

            {/* Audio view */}
            {view === 'audio' && (
              <div>
                <div className="settings-section-label">Volume</div>
                <div className="settings-volume-row">
                  <button
                    className={`settings-vol-icon${muted ? ' muted' : ''}`}
                    onClick={toggleMute}
                    title={muted ? 'Unmute' : 'Mute'}
                  >
                    <span className="material-symbols-outlined">{volIcon}</span>
                  </button>
                  <input
                    type="range"
                    className="volume-slider"
                    min={0} max={1} step={0.02}
                    value={muted ? 0 : volume}
                    onChange={e => {
                      const v = parseFloat(e.target.value)
                      if (muted && v > 0) toggleMute()
                      setVolume(v)
                    }}
                  />
                </div>
              </div>
            )}

            {/* Saves view */}
            {view === 'saves' && slots && (
              <>
                <div className="settings-saves">
                  {slots.map((slot, i) => {
                    const isSelected = selected === i
                    const locationName = slot?.character?.currentLocation
                      ? LOCATIONS[slot.character.currentLocation]?.name
                      : null
                    return (
                      <div
                        key={i}
                        className={`settings-save-slot${isSelected ? ' selected' : ''}`}
                        onClick={() => setSelected(i)}
                      >
                        <div className={`settings-save-accent${isSelected ? ' selected' : ''}`} />
                        <div className={`settings-save-inner${isSelected ? ' selected' : ''}`}>
                          <div className="settings-save-left">
                            <div className={`settings-save-meta${isSelected ? ' selected' : ''}`}>
                              {`Slot 0${i + 1}`}
                            </div>
                            <div className={`settings-save-name${slot ? '' : ' empty'}`}>
                              {slot ? slot.character?.name : 'Empty · Begin a new fate'}
                            </div>
                            {slot && (
                              <div className={`settings-save-subtitle${isSelected ? ' selected' : ''}`}>
                                {locationName ?? 'Barovia'}
                              </div>
                            )}
                          </div>
                          {slot && (
                            <div className="settings-save-level-col">
                              <div className={`settings-save-level-label${isSelected ? ' selected' : ''}`}>Level</div>
                              <div className={`settings-save-level-num${isSelected ? ' selected' : ''}`}>
                                {slot.character?.level ?? 1}
                              </div>
                              <div className={`settings-save-level-class${isSelected ? ' selected' : ''}`}>
                                {slot.character?.class}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="settings-saves-footer">
                  <button
                    className="settings-saves-btn danger"
                    disabled={!selectedSlot}
                    onClick={handleDelete}
                  >New Game</button>
                  <button
                    className="settings-saves-btn primary"
                    disabled={selected === null}
                    onClick={handleResume}
                  >{selectedSlot ? 'Resume' : 'Begin'}</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}
