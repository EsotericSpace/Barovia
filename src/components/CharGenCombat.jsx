import { SK, SA, mod, modStr, PROF_BONUS } from '../lib/dnd.js'
import { SL, LK } from './CharGenShared.jsx'
import { CLASS_WEAPONS } from '../data/weapons.js'

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
            const isPri = cfg.pri.includes(k)
            return (
              <div key={k} className={`stat-cell${isPri ? ' primary' : ''}`}>
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
            { label: 'HP',    value: sheet.maxHp, hp: true },
            { label: 'HD',    value: `d${sheet.hd}` },
            { label: 'AC',    value: sheet.ac },
            { label: 'Init',  value: modStr(sheet.stats.dexterity) },
            { label: 'Speed', value: '30ft' },
            { label: 'Prof',  value: `+${PROF_BONUS}` },
          ].map(({ label, value, hp }) => (
            <div key={label} className={`stat-row${hp ? ' prof' : ''}`}>
              <span className="row-key">{label}</span>
              <span className="row-val">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SL>Starting Weapons</SL>
        <div className="inv-list">
          {(CLASS_WEAPONS[cls]?.starting ?? []).map((item, i) => (
            <div key={i} className="list-row">{item}</div>
          ))}
        </div>
      </div>

    </div>
  )
}
