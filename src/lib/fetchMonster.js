export async function fetchMonster(slug) {
  const res = await fetch(`https://www.dnd5eapi.co/api/monsters/${slug}`)
  if (!res.ok) return null
  return res.json()
}
