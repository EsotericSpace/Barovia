export const villageOfBarovia = {
  id: 'village-of-barovia',
  name: 'Village of Barovia',
  type: 'settlement',
  avgLevel: [1, 3],
  status: 'available',
  nearby: ['vallaki', 'castle-ravenloft'],
  levelTriggers: [
    { level: 2, milestone: 'death-house-survived', condition: 'surviving Death House' },
    { level: 3, milestone: 'village-escaped', condition: "escaping the Village of Barovia or resolving Ireena's immediate crisis" },
  ],

  summary: `The first settlement players reach — a dying village smothered by Strahd's shadow. The streets are empty, the houses shuttered. A few souls remain, including the doomed Ismark and his sister Ireena, whose face is Strahd's obsession.`,

  entry: `VILLAGE OF BAROVIA (avg level 1–2)

See Curse of Strahd Chapter 3: Village of Barovia for full details.

Key beats: players arrive via the misty road, encounter the village's despair, meet Ismark and Ireena Kolyana, and may investigate the burgomaster's mansion or the Blood of the Vine tavern.

PLACEHOLDER — refer to source material for NPC stats, room descriptions, and encounter tables.`
}
