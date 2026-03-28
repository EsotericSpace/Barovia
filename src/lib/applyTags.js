import { drawReading, redrawLair } from '../data/tarokka.js'
import { HD_AVG, profBonus, SLOT_TABLE, SHORT_REST_CASTERS } from '../data/levelup.js'
import { LOCATIONS } from '../data/locations/index.js'
import { SA, SKILL_MAP, rollWithAdv, rollModifier, saveModifier, rollDice, rollD20 } from './dnd.js'
import { rollSurge } from '../data/wildMagicSurge.js'
import { getClassFeatureMax, CLASS_FEATURE_RECOVERY } from '../data/classes.js'
import { getFeatureRecovery, SUBCLASS_CONFIG } from '../data/subclasses.js'

const MILESTONE_MAP = Object.fromEntries(
  Object.values(LOCATIONS).flatMap(loc =>
    (loc.levelTriggers ?? []).map(t => [t.milestone, t.level])
  )
)
export const MILESTONE_CONDITIONS = Object.fromEntries(
  Object.values(LOCATIONS).flatMap(loc =>
    (loc.levelTriggers ?? []).map(t => [t.milestone, t.condition])
  )
)
export const MILESTONE_LOCATIONS = Object.fromEntries(
  Object.values(LOCATIONS).flatMap(loc =>
    (loc.levelTriggers ?? []).map(t => [t.milestone, loc.id])
  )
)

// Returns an applyTags(tags, buf) function bound to the Play component's context.
function flushPendingNpcs(c) {
  if (!c.npcs) return c
  return {
    ...c,
    npcs: Object.fromEntries(
      Object.entries(c.npcs).map(([name, npc]) => {
        if (typeof npc === 'object' && npc.pendingDisposition) {
          const { pendingDisposition, ...rest } = npc
          return [name, { ...rest, disposition: pendingDisposition }]
        }
        return [name, npc]
      })
    ),
  }
}

export function createApplyTags({ charRef, onCharacterUpdate, setGameOver, setVictory }) {
  return function applyTags(tags, buf) {
    tags.forEach(t => {
      if (t.type === 'monster') {
        fetch(`https://www.dnd5eapi.co/api/monsters/${t.slug}`)
          .then(r => r.ok ? r.json() : null)
          .then(d => { if (d) onCharacterUpdate(c => ({ ...c, activeMonster: d })) })
          .catch(() => {})
      }
      if (t.type === 'endcombat') {
        onCharacterUpdate(c => flushPendingNpcs({ ...c, activeMonster: null }))
      }
      if (t.type === 'item') {
        const add = t.val.startsWith('+')
        const raw = t.val.slice(1).trim()
        const item = raw.charAt(0).toUpperCase() + raw.slice(1)
        onCharacterUpdate(c => ({
          ...c, inventory: add
            ? c.inventory.some(i => i.toLowerCase() === item.toLowerCase()) ? c.inventory : [...c.inventory, item]
            : c.inventory.filter(i => i.toLowerCase() !== item.toLowerCase()),
        }))
      }
      if (t.type === 'damage') {
        const { rolls, total } = rollDice(t.expr)
        const c = charRef.current
        const newHp = Math.max(0, c.hp - total)
        onCharacterUpdate(ch => {
          const next = { ...ch, hp: newHp }
          if (newHp === 0 && ch.hp > 0) next.deathSaves = { successes: 0, failures: 0 }
          return next
        })
        const rollStr = rolls.length > 1 ? ` (${rolls.join(', ')})` : ''
        buf.push({
          role: 'damage', id: 'dmg-' + Date.now() + Math.random(),
          expr: t.expr, total, rollStr, newHp, maxHp: c.maxHp,
        })
      }
      if (t.type === 'hp') onCharacterUpdate(c => {
        const newHp = Math.max(0, Math.min(c.maxHp, c.hp + t.val))
        const wasAtZero = c.hp === 0
        const next = { ...c, hp: newHp }
        if (wasAtZero && newHp > 0) next.deathSaves = { successes: 0, failures: 0 }
        return next
      })
      if (t.type === 'spelllearn') onCharacterUpdate(c => ({
        ...c, spellsKnown: [...(c.spellsKnown ?? []), { name: t.name, level: t.level }],
      }))
      if (t.type === 'spellslot') onCharacterUpdate(c => {
        if (!Array.isArray(c.spellSlots)) return c
        const tierIdx = c.spellSlots.findIndex(s => s.level === t.level && s.used < s.total)
        if (tierIdx === -1) return c
        const slots = c.spellSlots.map((s, i) => i === tierIdx ? { ...s, used: s.used + 1 } : s)
        return { ...c, spellSlots: slots }
      })
      if (t.type === 'tarokka') {
        const r = charRef.current.reading
        if (r?.revealed) return
        const reading = r ?? { ...drawReading(), readingDay: charRef.current.day ?? 1 }
        onCharacterUpdate(c => ({ ...c, reading: { ...reading, revealed: true } }))
        buf.push({ role: 'tarokka', id: 'tarokka-' + Date.now(), reading })
      }
      if (t.type === 'tarokkalair') {
        if (!charRef.current.reading) return
        const newLair = redrawLair(charRef.current.reading.lair.card)
        onCharacterUpdate(c => ({ ...c, reading: { ...c.reading, lair: newLair } }))
      }
      if (t.type === 'artifact') {
        onCharacterUpdate(c => {
          const found = c.reading?.foundArtifacts ?? []
          if (found.includes(t.key)) return c
          return { ...c, reading: { ...c.reading, foundArtifacts: [...found, t.key] } }
        })
      }
      if (t.type === 'ally') {
        onCharacterUpdate(c => ({ ...c, reading: { ...c.reading, allyActive: true } }))
      }
      if (t.type === 'location') {
        onCharacterUpdate(c => flushPendingNpcs({ ...c, currentLocation: t.slug }))
      }
      if (t.type === 'milestone') {
        const already = (charRef.current.milestones ?? []).includes(t.slug)
        if (already) return
        const expectedLoc = MILESTONE_LOCATIONS[t.slug]
        const currentLoc = charRef.current.currentLocation
        if (expectedLoc && currentLoc && currentLoc !== expectedLoc) return
        onCharacterUpdate(c => ({ ...c, milestones: [...(c.milestones ?? []), t.slug] }))
        const newLevel = MILESTONE_MAP[t.slug]
        if (!newLevel || newLevel !== (charRef.current.level ?? 1) + 1) return
        onCharacterUpdate(c => {
          const hdAvg = HD_AVG[c.class] ?? 5
          const hpIncrease = hdAvg + mod(c.stats.constitution)
          const newMaxHp = c.maxHp + hpIncrease
          const tierDefs = SLOT_TABLE[c.class]?.[newLevel - 1]
          const newSpellSlots = tierDefs
            ? tierDefs.map(def => {
                const existing = Array.isArray(c.spellSlots) ? c.spellSlots.find(s => s.level === def.level) : null
                return { ...def, used: existing?.used ?? 0 }
              })
            : c.spellSlots
          const oldMax = getClassFeatureMax(c.class, c.stats, c.level ?? 1, c.subclass)
          const newMax = getClassFeatureMax(c.class, c.stats, newLevel, c.subclass)
          const newFeatures = Object.fromEntries(
            Object.entries(newMax).map(([k, max]) => {
              const gained = max - (oldMax[k] ?? 0)
              return [k, Math.min(max, (c.classFeatures?.[k] ?? max) + gained)]
            })
          )
          return {
            ...c,
            level: newLevel,
            maxHp: newMaxHp,
            hp: Math.min(c.hp + hpIncrease, newMaxHp),
            profBonus: profBonus(newLevel),
            spellSlots: newSpellSlots,
            classFeatures: newFeatures,
          }
        })
        buf.push({ role: 'levelup', id: 'lu-' + Date.now(), level: newLevel, condition: MILESTONE_CONDITIONS[t.slug] })
      }
      if (t.type === 'shortrest') {
        const c = charRef.current
        const hdAvg = HD_AVG[c.class] ?? 5
        const hpGain = hdAvg + mod(c.stats.constitution)
        const newHp = Math.min(c.hp + Math.max(1, hpGain), c.maxHp)
        const isWarlock = SHORT_REST_CASTERS.has(c.class)
        const cfMax = getClassFeatureMax(c.class, c.stats, c.level ?? 1, c.subclass)
        const cfRestored = Object.fromEntries(
          Object.entries(cfMax).filter(([k]) => {
            if (CLASS_FEATURE_RECOVERY[k] === 'shortrest') return true
            if (getFeatureRecovery(k, c.subclass) === 'shortrest') return true
            if (k === 'bardic_inspiration' && (c.level ?? 1) >= 5) return true
            return false
          })
        )
        onCharacterUpdate(ch => ({
          ...ch,
          hp: newHp,
          spellSlots: isWarlock && Array.isArray(ch.spellSlots)
            ? ch.spellSlots.map(s => ({ ...s, used: 0 }))
            : ch.spellSlots,
          classFeatures: { ...ch.classFeatures, ...cfRestored },
        }))
        buf.push({ role: 'rest', id: 'sr-' + Date.now(), short: true, hpGain: newHp - c.hp })
      }
      if (t.type === 'longrest') {
        onCharacterUpdate(c => ({
          ...c,
          hp: c.maxHp,
          spellSlots: Array.isArray(c.spellSlots) ? c.spellSlots.map(s => ({ ...s, used: 0 })) : c.spellSlots,
          classFeatures: getClassFeatureMax(c.class, c.stats, c.level ?? 1, c.subclass),
          day: (c.day ?? 1) + 1,
        }))
        buf.push({ role: 'rest', id: 'lr-' + Date.now(), short: false })
      }
      if (t.type === 'nightwatch') {
        const c = charRef.current
        const hdAvg = HD_AVG[c.class] ?? 5
        const hpGain = hdAvg + mod(c.stats.constitution)
        const newHp = Math.min(c.hp + Math.max(1, hpGain), c.maxHp)
        onCharacterUpdate(ch => ({ ...ch, hp: newHp, day: (ch.day ?? 1) + 1 }))
        buf.push({ role: 'rest', id: 'nw-' + Date.now(), short: true, hpGain: newHp - c.hp })
      }
      if (t.type === 'deathsave') onCharacterUpdate(c => {
        const ds = c.deathSaves ?? { successes: 0, failures: 0 }
        return t.success
          ? { ...c, deathSaves: { ...ds, successes: ds.successes + 1 } }
          : { ...c, deathSaves: { ...ds, failures: ds.failures + 1 } }
      })
      if (t.type === 'dead') setGameOver(true)
      if (t.type === 'victory') setVictory(true)
      if (t.type === 'condition') {
        const add = t.val.startsWith('+')
        const key = t.val.slice(1).toLowerCase()
        onCharacterUpdate(c => ({
          ...c,
          conditions: add
            ? [...new Set([...(c.conditions ?? []), key])]
            : (c.conditions ?? []).filter(k => k !== key),
        }))
      }
      if (t.type === 'feature') {
        onCharacterUpdate(c => {
          const cur = c.classFeatures?.[t.key] ?? 0
          return { ...c, classFeatures: { ...c.classFeatures, [t.key]: Math.max(0, cur + t.delta) } }
        })
      }
      if (t.type === 'surge') {
        const { roll, entry } = rollSurge()
        // Restore Tides of Chaos
        onCharacterUpdate(c => ({
          ...c,
          classFeatures: { ...c.classFeatures, tides_of_chaos: 1 },
        }))
        // Apply mechanical effect if present
        if (entry.effect) {
          const ef = entry.effect
          if (ef.type === 'hp') onCharacterUpdate(c => ({
            ...c, hp: Math.max(0, Math.min(c.maxHp, c.hp + ef.val)),
          }))
          if (ef.type === 'condition') onCharacterUpdate(c => ({
            ...c, conditions: [...new Set([...(c.conditions ?? []), ef.key])],
          }))
          if (ef.type === 'spellslot') onCharacterUpdate(c => {
            if (!Array.isArray(c.spellSlots)) return c
            const idx = [...c.spellSlots].reverse().findIndex(s => (s.used ?? 0) > 0)
            if (idx === -1) return c
            const realIdx = c.spellSlots.length - 1 - idx
            return { ...c, spellSlots: c.spellSlots.map((s, i) => i === realIdx ? { ...s, used: Math.max(0, (s.used ?? 0) - 1) } : s) }
          })
          if (ef.type === 'sorcery') onCharacterUpdate(c => {
            const max = getClassFeatureMax(c.class, c.stats, c.level ?? 1, c.subclass)
            return { ...c, classFeatures: { ...c.classFeatures, sorcery_points: max.sorcery_points ?? 0 } }
          })
        }
        buf.push({ role: 'surge', id: 'surge-' + Date.now(), roll, text: entry.text, effect: entry.effect })
      }
      if (t.type === 'attack') {
        const c = charRef.current
        const conds = c.conditions ?? []
        const condDis = conds.some(k => ['blinded', 'frightened', 'poisoned', 'restrained'].includes(k))
        const effectiveAdv = condDis && !t.adv ? 'dis' : (t.adv ?? null)
        const d20 = rollD20()
        const total = d20 + t.bonus
        const hit = total >= (c.ac ?? 10)
        buf.push({
          role: 'attack', id: 'atk-' + Date.now() + Math.random(),
          d20, bonus: t.bonus, total, ac: c.ac, hit, adv: effectiveAdv,
        })
      }
      if (t.type === 'npc') {
        onCharacterUpdate(c => {
          const existing = c.npcs?.[t.name]
          const prev = typeof existing === 'object' ? existing : { disposition: existing ?? 'neutral', notes: [] }
          return {
            ...c,
            npcs: {
              ...(c.npcs ?? {}),
              [t.name]: { ...prev, pendingDisposition: t.disposition, location: c.currentLocation ?? prev.location ?? null },
            },
          }
        })
      }
      if (t.type === 'npc_role') {
        onCharacterUpdate(c => {
          const existing = c.npcs?.[t.name]
          const prev = typeof existing === 'object' ? existing : { disposition: existing ?? 'neutral', notes: [] }
          return { ...c, npcs: { ...(c.npcs ?? {}), [t.name]: { ...prev, role: t.role } } }
        })
      }
      if (t.type === 'npc_note') {
        onCharacterUpdate(c => {
          const existing = c.npcs?.[t.name]
          const prev = typeof existing === 'object' ? existing : { disposition: existing ?? 'neutral', notes: [] }
          const notes = prev.notes ?? []
          if (notes.includes(t.note)) return c
          return { ...c, npcs: { ...(c.npcs ?? {}), [t.name]: { ...prev, notes: [...notes, t.note] } } }
        })
      }
      if (t.type === 'remember') {
        const c = charRef.current
        const note = {
          text: t.text,
          day: c.day ?? 1,
          location: c.currentLocation ?? null,
        }
        onCharacterUpdate(ch => ({ ...ch, notes: [...(ch.notes ?? []), note] }))
      }
      if (t.type === 'companion') {
        const add = t.val.startsWith('+')
        const name = t.val.slice(1).trim()
        onCharacterUpdate(c => ({
          ...c,
          companions: add
            ? [...new Set([...(c.companions ?? []), name])]
            : (c.companions ?? []).filter(n => n !== name),
        }))
      }
      if (t.type === 'save') {
        const c = charRef.current
        const { ability, modifier, proficient } = saveModifier(t.ability, c)
        const { kept, dropped } = rollWithAdv(t.adv)
        const total = kept + modifier
        buf.unshift({
          role: 'roll', id: 'roll-' + Date.now() + Math.random(),
          d20: kept, dropped, adv: t.adv, modifier, total, dc: t.dc,
          skill: (SA[ability] ?? ability.toUpperCase()) + ' Save',
          ability: SA[ability] ?? ability.toUpperCase(),
          success: total >= t.dc,
          proficient, expert: false, isSave: true,
        })
      }
      if (t.type === 'rollprompt') {
        const { ability, modifier, proficient, expert } = rollModifier(t.skill, charRef.current)
        buf.push({
          role: 'rollprompt', id: 'rp-' + Date.now() + Math.random(),
          skill: t.skill.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          rawSkill: t.skill,
          ability: SA[ability] || ability.toUpperCase(),
          modifier, proficient, expert, adv: t.adv,
        })
      }
      if (t.type === 'roll') {
        const c = charRef.current
        const conds = c.conditions ?? []
        const condDis = conds.some(k => ['frightened', 'poisoned'].includes(k))
        const effectiveAdv = condDis && !t.adv ? 'dis' : (t.adv ?? null)
        const { ability, modifier, proficient, expert } = rollModifier(t.skill, c)
        const { kept, dropped } = rollWithAdv(effectiveAdv)
        const total = kept + modifier
        buf.unshift({
          role: 'roll', id: 'roll-' + Date.now() + Math.random(),
          d20: kept, dropped, adv: effectiveAdv, modifier, total, dc: t.dc,
          skill: t.skill.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          ability: SA[ability] || ability.toUpperCase(),
          success: total >= t.dc,
          proficient, expert,
          conditionNote: condDis && !t.adv ? 'dis from condition' : null,
        })
      }
      if (t.type === 'hp' && t.val > 0) {
        // Healing visual card
        const c = charRef.current
        const newHp = Math.min(c.maxHp, c.hp + t.val)
        buf.push({ role: 'heal', id: 'heal-' + Date.now(), amount: t.val, newHp, maxHp: c.maxHp })
      }
    })
  }
}
