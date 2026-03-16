import { SK, SA, mod, modStr, SKILLS, PROF_BONUS, skillMod } from '../lib/dnd.js'
import { SL } from './CharGenShared.jsx'

export default function CharGenCombat({ sheet, cfg, allProfs, profLevel }) {
  return (
    <div className="cg-col">

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
        <SL>Skills</SL>
        <div className="cg-col" style={{ gap: 'var(--sp-xs)' }}>
          {SKILLS.filter(s => profLevel(s.name) > 0).map(s => {
            const expert = profLevel(s.name) === 2
            const val = skillMod(s.name, sheet.stats, allProfs, sheet.expertise)
            return (
              <span key={s.name} className={`skill-row${expert ? ' expert' : ''}`}>
                <span className="skill-name">{s.name}{expert ? ' ★' : ''}</span>
                <span className="skill-mod">{val >= 0 ? `+${val}` : `${val}`}</span>
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Starting Inventory</SL>
        <div className="inv-list">
          {sheet.equip.map((item, i) => {
            const isGold = /\d+\s*gp/i.test(item)
            return (
              <div key={i} className={`inv-item${isGold ? ' gold' : ''}`}>{item}</div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
