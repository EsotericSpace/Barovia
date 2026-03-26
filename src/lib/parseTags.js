// Parses and strips DM response tags.
// Returns { text: string, tags: Array<{type, ...}> }
export function parseTags(raw) {
  const tags = []
  const text = raw
    .replace(/\[MONSTER:([^\]]+)\]/g, (_, s) => {
      tags.push({ type: 'monster', slug: s.trim() })
      return ''
    })
    .replace(/\[ITEM:([^\]]+)\]/g, (_, s) => {
      tags.push({ type: 'item', val: s.trim() })
      return ''
    })
    .replace(/\[STAT:hp:(\d+)\]/g, (_, v) => {
      tags.push({ type: 'hp', val: parseInt(v) })
      return ''
    })
    .replace(/\[ROLL:([^:]+):(\d+)(?::(adv|dis))?\]/g, (_, skill, dc, adv) => {
      tags.push({ type: 'roll', skill: skill.trim(), dc: parseInt(dc), adv: adv ?? null })
      return ''
    })
    .replace(/\[CONDITION:([^\]]+)\]/g, (_, s) => {
      tags.push({ type: 'condition', val: s.trim() })
      return ''
    })
    .replace(/\[SPELL:slot:(\d+)\]/g, (_, n) => {
      tags.push({ type: 'spellslot', level: parseInt(n) })
      return ''
    })
    .replace(/\[ROLLPROMPT:([^:\]]+)(?::(adv|dis))?\]/g, (_, skill, adv) => {
      tags.push({ type: 'rollprompt', skill: skill.trim(), adv: adv ?? null })
      return ''
    })
    .replace(/\[SAVE:([^:]+):(\d+)(?::(adv|dis))?\]/g, (_, ability, dc, adv) => {
      tags.push({ type: 'save', ability: ability.trim(), dc: parseInt(dc), adv: adv ?? null })
      return ''
    })
    .replace(/\[SPELL:learn:([^:]+):(\d+)\]/g, (_, name, level) => {
      tags.push({ type: 'spelllearn', name: name.trim(), level: parseInt(level) })
      return ''
    })
    .replace(/\[SHORTREST\]/g, () => {
      tags.push({ type: 'shortrest' })
      return ''
    })
    .replace(/\[LONGREST\]/g, () => {
      tags.push({ type: 'longrest' })
      return ''
    })
    .replace(/\[DEATHSAVE:([+-])\]/g, (_, v) => {
      tags.push({ type: 'deathsave', success: v === '+' })
      return ''
    })
    .replace(/\[DEAD\]/g, () => {
      tags.push({ type: 'dead' })
      return ''
    })
    .replace(/\[VICTORY\]/g, () => {
      tags.push({ type: 'victory' })
      return ''
    })
    .replace(/\[ENDCOMBAT\]/g, () => {
      tags.push({ type: 'endcombat' })
      return ''
    })
    .replace(/\[TAROKKA\]/g, () => {
      tags.push({ type: 'tarokka' })
      return ''
    })
    .replace(/\[ARTIFACT:([^\]]+)\]/g, (_, key) => {
      tags.push({ type: 'artifact', key: key.trim() })
      return ''
    })
    .replace(/\[ALLY:active\]/g, () => {
      tags.push({ type: 'ally' })
      return ''
    })
    .replace(/\[NIGHTWATCH\]/g, () => {
      tags.push({ type: 'nightwatch' })
      return ''
    })
    .replace(/\[TAROKKA:lair\]/g, () => {
      tags.push({ type: 'tarokkalair' })
      return ''
    })
    .replace(/\[LOCATION:([^\]]+)\]/g, (_, slug) => {
      tags.push({ type: 'location', slug: slug.trim() })
      return ''
    })
    .replace(/\[MILESTONE:([^\]]+)\]/g, (_, slug) => {
      tags.push({ type: 'milestone', slug: slug.trim() })
      return ''
    })
    .replace(/\[FEATURE:([^:]+):-(\d+)\]/g, (_, key, n) => {
      tags.push({ type: 'feature', key: key.trim(), delta: -parseInt(n) })
      return ''
    })
    .trim()

  return { text, tags }
}
