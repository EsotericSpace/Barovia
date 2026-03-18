export const ruinsOfBerez = {
  id: 'ruins-of-berez',
  name: 'Ruins of Berez',
  type: 'wilderness',
  avgLevel: [8],
  status: 'available',
  nearby: ['village-of-barovia', 'amber-temple'],
  levelTriggers: [
    { level: 8, milestone: 'berez-cleared', condition: 'defeating Baba Lysaga and clearing the Ruins of Berez' },
  ],

  summary: `A flooded, fog-choked ruin on the banks of the Luna River. Strahd destroyed this village centuries ago to punish it for sheltering a woman he loved. Now the swamp witch Baba Lysaga rules here among scarecrows and the restless dead.`,

  entry: `RUINS OF BEREZ (avg level 7–9)

See Curse of Strahd Chapter 10: The Ruins of Berez for full details.

Key beats: Baba Lysaga is a powerful hag with a flying cauldron; she is fanatically devoted to Strahd and hostile to all intruders; the ruins hold lore about Marina, the woman Strahd loved here; the Martikov gem stolen by Baba Lysaga can be recovered here.

PLACEHOLDER — refer to source material for Baba Lysaga's stat block and lair actions, scarecrow and will-o'-wisp encounters, the ruin layout, and Marina's monument.`
}
