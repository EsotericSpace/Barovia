import { C, TY, SP } from '../lib/tokens.js'
import { SK, SA, mod, modStr, SKILLS, PROF_BONUS, skillMod } from '../lib/dnd.js'
import { SL } from './CharGenShared.jsx'

export default function CharGenCombat({ sheet, cfg, allProfs, profLevel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: SP.md }}>

      <div>
        <SL>Saving Throws</SL>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
          {SK.map(k => {
            const prof = cfg.stProfs.includes(k)
            const val = mod(sheet.stats[k]) + (prof ? PROF_BONUS : 0)
            return (
              <div key={k} style={{
                border: `1px solid ${prof ? 'rgba(160,40,40,0.4)' : C.border}`,
                padding: '5px 6px', display: 'flex', alignItems: 'center', gap: SP.xs,
              }}>
                <span style={{ ...TY.micro, color: prof ? C.textDim : C.textGhost, flex: 1 }}>{SA[k]}</span>
                <span style={{ ...TY.label, color: C.crimson }}>{val >= 0 ? `+${val}` : `${val}`}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Combat</SL>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: SP.xs }}>
          {[
            { label: 'HP',    value: sheet.maxHp, hp: true },
            { label: 'HD',    value: `d${sheet.hd}` },
            { label: 'AC',    value: sheet.ac },
            { label: 'Init',  value: modStr(sheet.stats.dexterity) },
            { label: 'Speed', value: '30ft' },
            { label: 'Prof',  value: `+${PROF_BONUS}` },
          ].map(({ label, value, hp }) => (
            <div key={label} style={{
              border: `1px solid ${hp ? 'rgba(160,40,40,0.4)' : C.border}`,
              padding: '5px 6px', display: 'flex', alignItems: 'center', gap: SP.xs,
            }}>
              <span style={{ ...TY.micro, color: hp ? C.textDim : C.textGhost, flex: 1 }}>{label}</span>
              <span style={{ ...TY.caption, color: hp ? C.crimson : C.textMuted }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SL>Skills</SL>
        <div style={{ display: 'flex', flexDirection: 'column', gap: SP.xs }}>
          {SKILLS.filter(s => profLevel(s.name) > 0).map(s => {
            const expert = profLevel(s.name) === 2
            const val = skillMod(s.name, sheet.stats, allProfs, sheet.expertise)
            return (
              <span key={s.name} style={{
                border: `1px solid ${expert ? 'rgba(196,163,90,0.4)' : C.border}`,
                padding: '2px 6px',
                color: expert ? C.gold : C.textMuted,
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: SP.sm,
              }}>
                <span style={{ ...TY.caption }}>{s.name}{expert ? ' ★' : ''}</span>
                <span style={{ ...TY.helper, fontWeight: 600 }}>{val >= 0 ? `+${val}` : `${val}`}</span>
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <SL>Starting Inventory</SL>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          {sheet.equip.map((item, i) => {
            const isGold = /\d+\s*gp/i.test(item)
            return (
              <div key={i} style={{ ...TY.caption, color: isGold ? C.gold : C.textGhost }}>
                {item}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}
