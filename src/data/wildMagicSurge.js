// Wild Magic Surge table — 50 entries covering d100 rolls 1-100 in pairs.
// Each entry: { text, effect }
// effect: null (narrative only) | { type, ... } for mechanical application
// Types: 'hp' (delta), 'condition', 'spellslot' (recover lowest), 'sorcery' (recover all points)

export const SURGE_TABLE = [
  // 1-2
  { text: 'Roll on this table at the start of each of your turns for the next minute, ignoring this result on subsequent rolls.', effect: null },
  // 3-4
  { text: 'For the next minute you can see any invisible creature within line of sight.', effect: null },
  // 5-6
  { text: 'You cast Fireball as a 3rd-level spell centered on yourself.', effect: { type: 'hp', val: -28 } }, // avg 10d6 = 35, DEX save half, approximated
  // 7-8
  { text: 'You cast Magic Missile as a 5th-level spell — six missiles of 1d4+1 each strike creatures of the DM\'s choice within range.', effect: null },
  // 9-10
  { text: 'Roll a d10 — your height changes by that many inches. Odd: you shrink. Even: you grow.', effect: null },
  // 11-12
  { text: 'You cast Confusion centered on yourself.', effect: { type: 'condition', key: 'incapacitated' } },
  // 13-14
  { text: 'For the next minute you regain 5 HP at the start of each of your turns.', effect: null },
  // 15-16
  { text: 'You grow a magnificent beard of feathers that lasts until you sneeze, whereupon the feathers explode outward.', effect: null },
  // 17-18
  { text: 'You cast Grease centered on yourself — the ground within 10 feet becomes slick.', effect: { type: 'condition', key: 'prone' } },
  // 19-20
  { text: 'Creatures have disadvantage on saving throws against the next spell you cast in the next minute.', effect: null },
  // 21-22
  { text: 'Your skin turns a vivid shade of blue. A remove curse spell can end this effect.', effect: null },
  // 23-24
  { text: 'An eye appears on your forehead for the next minute — advantage on Perception checks that rely on sight.', effect: null },
  // 25-26
  { text: 'For the next minute all your spells with a casting time of 1 action have a casting time of 1 bonus action instead.', effect: null },
  // 27-28
  { text: 'You teleport up to 60 feet to an unoccupied space you can see.', effect: null },
  // 29-30
  { text: 'You are transported to the Astral Plane until the end of your next turn, then return to the nearest unoccupied space.', effect: null },
  // 31-32
  { text: 'The next damaging spell you cast within the next minute deals maximum damage.', effect: null },
  // 33-34
  { text: 'Roll a d10 — your age changes by that many years. Odd: younger (minimum 1). Even: older.', effect: null },
  // 35-36
  { text: '1d6 flumphs appear in unoccupied spaces within 60 feet — they are frightened of you and vanish after 1 minute.', effect: null },
  // 37-38
  { text: 'You regain 2d10 hit points.', effect: { type: 'hp', val: 11 } }, // avg 2d10 = 11
  // 39-40
  { text: 'You turn into a potted plant until the start of your next turn. While a plant you are incapacitated and vulnerable to all damage.', effect: { type: 'condition', key: 'incapacitated' } },
  // 41-42
  { text: 'For the next minute you can teleport up to 20 feet as a bonus action on each of your turns.', effect: null },
  // 43-44
  { text: 'You cast Levitate on yourself.', effect: null },
  // 45-46
  { text: 'A unicorn appears in a space within 5 feet of you, regards you with deep disappointment, and vanishes 1 minute later.', effect: null },
  // 47-48
  { text: 'You cannot speak for the next minute. Whenever you try, pink bubbles float from your mouth.', effect: null },
  // 49-50
  { text: 'A spectral shield hovers near you for the next minute — +2 AC and immunity to Magic Missile.', effect: null },
  // 51-52
  { text: 'You are immune to being intoxicated by alcohol for the next 5d6 days. In Barovia this is a mixed blessing.', effect: null },
  // 53-54
  { text: 'Your hair falls out entirely but grows back within 24 hours.', effect: null },
  // 55-56
  { text: 'For the next minute any flammable object you touch that isn\'t held or worn bursts into flame.', effect: null },
  // 57-58
  { text: 'You regain your lowest-level expended spell slot.', effect: { type: 'spellslot' } },
  // 59-60
  { text: 'For the next minute you must shout when you speak.', effect: null },
  // 61-62
  { text: 'You cast Fog Cloud centered on yourself.', effect: null },
  // 63-64
  { text: 'Up to three creatures of your choice within 30 feet take 4d10 lightning damage.', effect: null },
  // 65-66
  { text: 'You are frightened by the nearest creature until the end of your next turn.', effect: { type: 'condition', key: 'frightened' } },
  // 67-68
  { text: 'Each creature within 30 feet becomes invisible for the next minute. Invisibility ends on a creature when it attacks or casts a spell.', effect: null },
  // 69-70
  { text: 'You gain resistance to all damage for the next minute.', effect: null },
  // 71-72
  { text: 'A random creature within 60 feet becomes poisoned for 1d4 hours.', effect: null },
  // 73-74
  { text: 'You glow with bright light in a 30-foot radius for the next minute. Any creature ending its turn within 5 feet of you is blinded until the end of its next turn.', effect: null },
  // 75-76
  { text: 'You cast Polymorph on yourself targeting sheep form. Make a WIS save DC 10 or spend the next minute as a sheep.', effect: null },
  // 77-78
  { text: 'Illusory butterflies and flower petals flutter around you for the next minute.', effect: null },
  // 79-80
  { text: 'You may take one additional action immediately.', effect: null },
  // 81-82
  { text: 'Each creature within 30 feet takes 1d10 necrotic damage. You regain HP equal to the total necrotic damage dealt.', effect: null },
  // 83-84
  { text: 'You cast Mirror Image.', effect: null },
  // 85-86
  { text: 'You cast Fly on a random creature within 60 feet of you.', effect: null },
  // 87-88
  { text: 'You become invisible until the start of your next turn or until you attack or cast a spell.', effect: { type: 'condition', key: 'invisible' } },
  // 89-90
  { text: 'If you die within the next minute you immediately return to life as if by Reincarnate.', effect: null },
  // 91-92
  { text: 'Your size increases by one category for the next minute.', effect: null },
  // 93-94
  { text: 'You and all creatures within 30 feet gain vulnerability to piercing damage for the next minute.', effect: null },
  // 95-96
  { text: 'Faint ethereal music follows you for the next minute — oddly, it is a Barovian waltz.', effect: null },
  // 97-98
  { text: 'You regain all expended sorcery points.', effect: { type: 'sorcery' } },
  // 99-100
  { text: 'Roll twice on this table. Both effects apply. If this result comes up again on either roll, ignore it.', effect: null },
]

// Roll 1d100 and return the surge entry.
export function rollSurge() {
  const roll = Math.floor(Math.random() * 100) + 1
  const idx = Math.floor((roll - 1) / 2)
  return { roll, entry: SURGE_TABLE[idx] }
}
