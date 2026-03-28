const SL = ({ children }) => <div className="sl">{children}</div>
const Reroll = ({ onClick }) => (
  <button className="reroll-btn" onClick={onClick} title="Reroll">
    <span className="material-symbols-outlined">refresh</span>
  </button>
)

export default function CharGenTraits({ sheet, bg, rerollTrait, prevBackground, nextBackground }) {
  return (
    <div className="cg-col">

      <div>
        <SL>Background</SL>
        <div className="bg-block">
          <div className="bg-inner">
            <div className="bg-nav">
              <button className="bg-arrow" onClick={prevBackground}><span className="material-symbols-outlined">chevron_left</span></button>
              <span className="bg-name">{sheet.background}</span>
              <button className="bg-arrow" onClick={nextBackground}><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
            <div className="bg-desc">{bg.desc}</div>
            <div className="bg-divider" />
            <div className="bg-feature-label">Feature · {bg.feature}</div>
            <div className="bg-feature-desc">{bg.featureDesc}</div>
          </div>
        </div>
      </div>

      <div>
        <SL>Character Traits</SL>
        <div className="trait-list">
          {[['personality', 'Personality'], ['ideal', 'Ideal'], ['bond', 'Bond'], ['flaw', 'Flaw']].map(([key, label]) => (
            <div key={key} className={`trait-block${key === 'flaw' ? ' flaw' : ''}`}>
              <div className="trait-header">
                <span className="trait-label">{label}</span>
                <Reroll onClick={() => rerollTrait(key)} />
              </div>
              <div className="trait-text">{sheet[key]}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
