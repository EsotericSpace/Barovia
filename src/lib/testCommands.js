import { drawReading } from '../data/tarokka.js'
import { HD_AVG, profBonus, SLOT_TABLE } from '../data/levelup.js'
import { buildTestPrompt } from './systemPrompt.js'
import { parseTags } from './parseTags.js'
import { SA, SKILL_MAP, rollModifier, mod } from './dnd.js'

// Returns a handleTestCommand(raw) function bound to the Play component's context.
export function createTestCommandHandler({ charRef, onCharacterUpdate, setMsgs, setLoading, applyTags }) {
  return async function handleTestCommand(raw) {
    const args = raw.slice('/test'.length).trim()
    const parts = args.split(/\s+/)
    const cmd = parts[0]?.toLowerCase()

    if (cmd === 'rollprompt') {
      const skillRaw = parts.slice(1).join('_').toLowerCase() || 'perception'
      const { ability, modifier, proficient, expert } = rollModifier(skillRaw, charRef.current)
      setMsgs(p => [...p, {
        role: 'rollprompt', id: 'rp-test-' + Date.now(),
        skill: skillRaw.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        rawSkill: skillRaw, ability: SA[ability] || ability.toUpperCase(),
        modifier, proficient, expert,
      }])
      return
    }

    if (cmd === 'roll') {
      const skillRaw = parts[1]?.toLowerCase() || 'perception'
      const total = parseInt(parts[2]) || 14
      const dc = parts[3] ? parseInt(parts[3]) : null
      const { ability, modifier, proficient, expert } = rollModifier(skillRaw, charRef.current)
      const d20 = Math.max(1, Math.min(20, total - modifier))
      setMsgs(p => [...p, {
        role: 'roll', id: 'roll-test-' + Date.now(),
        d20, modifier, total, dc,
        skill: skillRaw.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        ability: SA[ability] || ability.toUpperCase(),
        success: dc != null ? total >= dc : null,
        proficient, expert,
      }])
      return
    }

    if (cmd === 'rest') {
      const short = parts[1] !== 'long'
      const hpGain = short ? Math.max(1, Math.floor((charRef.current.maxHp - charRef.current.hp) / 2)) : 0
      setMsgs(p => [...p, { role: 'rest', id: 'rest-test-' + Date.now(), short, hpGain }])
      return
    }

    if (cmd === 'levelup') {
      const level = parseInt(parts[1]) || (charRef.current.level ?? 1) + 1
      onCharacterUpdate(c => {
        const hdAvg = HD_AVG[c.class] ?? 5
        const hpIncrease = hdAvg + mod(c.stats.constitution)
        const newMaxHp = c.maxHp + hpIncrease
        const tierDefs = SLOT_TABLE[c.class]?.[level - 1]
        const newSpellSlots = tierDefs
          ? tierDefs.map(def => {
              const existing = Array.isArray(c.spellSlots) ? c.spellSlots.find(s => s.level === def.level) : null
              return { ...def, used: existing?.used ?? 0 }
            })
          : c.spellSlots
        return {
          ...c,
          level,
          maxHp: newMaxHp,
          hp: Math.min(c.hp + hpIncrease, newMaxHp),
          profBonus: profBonus(level),
          spellSlots: newSpellSlots,
        }
      })
      setMsgs(p => [...p, { role: 'levelup', id: 'lu-test-' + Date.now(), level }])
      return
    }

    if (cmd === 'hp') {
      const val = parseInt(parts[1])
      if (!isNaN(val)) onCharacterUpdate(c => ({ ...c, hp: Math.max(0, Math.min(c.maxHp, val)) }))
      return
    }

    if (cmd === 'tarot') {
      if (charRef.current.reading?.revealed) return
      const reading = charRef.current.reading ?? { ...drawReading(), readingDay: charRef.current.day ?? 1 }
      onCharacterUpdate(c => ({ ...c, reading: { ...reading, revealed: true } }))
      setMsgs(p => [...p, { role: 'tarokka', id: 'tarokka-test-' + Date.now(), reading }])
      return
    }

    // Free-text: send to Claude with test system prompt, isolated from campaign history
    setLoading(true)
    try {
      const r = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system: buildTestPrompt(charRef.current),
          messages: [{ role: 'user', content: args }],
        }),
      })
      const d = await r.json()
      if (d.error) throw new Error(d.error)
      const { text, tags } = parseTags(d.content)
      const buf = [{ role: 'assistant', content: text || '*(no narrative)*', id: 'test-' + Date.now() }]
      applyTags(tags, buf)
      setMsgs(p => [...p, ...buf])
    } catch {
      setMsgs(p => [...p, { role: 'assistant', content: '*(Test failed — check console)*', id: 'e' + Date.now() }])
    }
    setLoading(false)
  }
}
