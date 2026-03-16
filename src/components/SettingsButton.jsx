import { useState } from 'react'

export default function SettingsButton({ volume, setVolume, muted, toggleMute, className = '' }) {
  const [open, setOpen] = useState(false)

  const volIcon = muted ? 'volume_off' : volume < 0.4 ? 'volume_down' : 'volume_up'

  return (
    <>
      <button
        className={`settings-btn${className ? ' ' + className : ''}`}
        onClick={() => setOpen(true)}
        title="Settings"
      >
        Settings
      </button>

      {open && (
        <div className="settings-backdrop" onClick={() => setOpen(false)}>
          <div className="settings-modal" onClick={e => e.stopPropagation()}>
            <div className="settings-modal-header">
              <div className="settings-modal-title">Settings</div>
              <button className="settings-close" onClick={() => setOpen(false)} title="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

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
                min={0}
                max={1}
                step={0.02}
                value={muted ? 0 : volume}
                onChange={e => {
                  const v = parseFloat(e.target.value)
                  if (muted && v > 0) toggleMute()
                  setVolume(v)
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
