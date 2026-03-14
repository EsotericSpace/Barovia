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
    .replace(/\[SPELL:slot\]/g, () => {
      tags.push({ type: 'spellslot' })
      return ''
    })
    .trim()

  return { text, tags }
}
