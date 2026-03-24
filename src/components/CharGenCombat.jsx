import { SK, SA, mod, modStr, signStr, PROF_BONUS } from '../lib/dnd.js'
import { CLASS_WEAPONS } from '../data/weapons.js'

const SL = ({ children }) => <div className="sl">{children}</div>
const LK = ({ on, toggle }) => (
  <button className={`lock-btn${on ? ' active' : ''}`} onClick={toggle} title={on ? 'Unlock' : 'Lock'}>
    <span className="material-symbols-outlined">{on ? 'lock' : 'lock_open'}</span>
  </button>
)

export default function CharGenCombat({ sheet, cfg, locked, toggleStatLock, cls, doReroll, rerolls }) {
  return (
    <div className="cg-col">

      <div>
        <div className="cg-scores-header">
          <SL>Ability Scores</SL>
          <button className="cg-btn cg-reroll rbtn" onClick={doReroll} disabled={rerolls <= 0}>
            Reroll ({rerolls} left)
          </button>
        </div>
        <div className="stat-grid">
          {SK.map(k => {
            const isLocked = !!locked.stats?.[k]
            return (
              <div key={k} className="stat-cell">
                <LK on={isLocked} toggle={() => toggleStatLock(k)} />
                <div className="stat-key">{SA[k]}</div>
                <div className="stat-val">{sheet.stats[k]}</div>
                <div className="stat-mod">{modStr(sheet.stats[k])}</div>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Saving Throws</SL>
        <div className="grid-3">
          {SK.map(k => {
            const prof = cfg.stProfs.includes(k)
            const val = mod(sheet.stats[k]) + (prof ? PROF_BONUS : 0)
            return (
              <div key={k} className={`stat-row${prof ? ' prof' : ''}`}>
                <span className="row-key">{SA[k]}</span>
                <span className="row-val">{val >= 0 ? `+${val}` : `${val}`}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Combat</SL>
        <div className="grid-3">
          {[
            { label: 'HP',    value: sheet.maxHp },
            { label: 'HD',    value: `d${sheet.hd}` },
            { label: 'AC',    value: sheet.ac },
            { label: 'Init',  value: signStr(sheet.initiative) },
            { label: 'Speed', value: `${sheet.speed}ft` },
            { label: 'Prof',  value: `+${sheet.profBonus}` },
          ].map(({ label, value, hi }) => (
            <div key={label} className={`stat-row${hi ? ' hi' : ''}`}>
              <span className="row-key">{label}</span>
              <span className="row-val">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SL>Starting Weapons</SL>
        <div className="skill-inline">
          {(CLASS_WEAPONS[cls]?.starting ?? []).map((item, i, arr) => (
            <span key={i} className="skill-inline-item">
              {item}{i < arr.length - 1 ? ',' : ''}
            </span>
          ))}
        </div>
      </div>

    </div>
  )
}
