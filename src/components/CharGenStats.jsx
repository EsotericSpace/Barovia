import { SKILLS, skillMod, spellLevelStr } from '../lib/dnd.js'
import { SL } from './CharGenShared.jsx'

export default function CharGenStats({ sheet, character, cfg, prevSubclass, nextSubclass }) {
  const proficientSkills = SKILLS.filter(s => sheet.profs.includes(s.name))

  return (
    <div className="cg-col">

      <div>
        <SL>Class Features · {character.class} 1</SL>
        <div className="feature-list">
          {cfg.features.map(f => (
            <div key={f.name}>
              <div className="feature-name">{f.name}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="feature-name">
          Subclass
          {cfg.subclassLevel === 1 ? ' · Active now' : ` · Takes effect at level ${cfg.subclassLevel}`}
        </div>
        {(() => {
          const sc = cfg.subclasses.find(s => s.name === sheet.subclass) ?? cfg.subclasses[0]
          return (
            <div className="bg-block">
              <div className="bg-nav">
                <button className="bg-arrow" onClick={prevSubclass}><span className="material-symbols-outlined">chevron_left</span></button>
                <span className="bg-name">{sc.name}</span>
                <button className="bg-arrow" onClick={nextSubclass}><span className="material-symbols-outlined">chevron_right</span></button>
              </div>
              <div className="bg-desc">{sc.desc}</div>
            </div>
          )
        })()}
      </div>

      <div>
        <div className="feature-name">Skills</div>
        <div className="skill-inline">
          {proficientSkills.map((s, i) => {
            const expert = sheet.expertise.includes(s.name)
            const val = skillMod(s.name, sheet.stats, sheet.profs, sheet.expertise)
            const valStr = val >= 0 ? `+${val}` : `${val}`
            return (
              <span key={s.name} className={`skill-inline-item${expert ? ' expert' : ''}`}>
                {s.name} ({valStr}){expert ? ' ★' : ''}{i < proficientSkills.length - 1 ? ',' : ''}
              </span>
            )
          })}
        </div>
      </div>

      {sheet.cantrips?.length > 0 && (
        <div>
          <div className="feature-name">Spells</div>
          <div className="spell-list">
            {sheet.cantrips.map(s => (
              <div key={s} className="list-row">
                <span className="spell-name">{s}</span>
                <span className="spell-tier">cantrip</span>
              </div>
            ))}
            {sheet.spellsKnown.map(s => {
              const name = typeof s === 'string' ? s : s.name
              const level = typeof s === 'string' ? 1 : s.level
              return (
                <div key={name} className="list-row">
                  <span className="spell-name">{name}</span>
                  <span className="spell-tier">{spellLevelStr(level)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

    </div>
  )
}
