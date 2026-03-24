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
    .replace(/\[ROLL:([^:]+):(\d+)\]/g, (_, skill, dc) => {
      tags.push({ type: 'roll', skill: skill.trim(), dc: parseInt(dc) })
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
    .replace(/\[ROLLPROMPT:([^\]]+)\]/g, (_, skill) => {
      tags.push({ type: 'rollprompt', skill: skill.trim() })
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
    .replace(/\[ENDCOMBAT\]/g, () => {
      tags.push({ type: 'endcombat' })
      return ''
    })
    .replace(/\[TAROKKA\]/g, () => {
      tags.push({ type: 'tarokka' })
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
    .trim()

  return { text, tags }
}
