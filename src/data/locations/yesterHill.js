export const yesterHill = {
  id: 'yester-hill',
  name: 'Yester Hill',
  type: 'wilderness',
  avgLevel: [6],
  status: 'available',
  nearby: ['wizard-of-wines', 'van-richtens-tower'],
  levelTriggers: [
    { level: 6, milestone: 'yester-hill-resolved', condition: 'defeating the druids and destroying the Gulthias tree at Yester Hill' },
  ],

  summary: `A blighted hilltop ringed by standing stones where a tribe of druids worship Strahd as a god. They have stolen a gem from the Wizard of Wines and are attempting a dark ritual to animate a treant in Strahd's image.`,

  entry: `YESTER HILL (avg level 5–7)

See Curse of Strahd Chapter 14: Yester Hill for full details.

Key beats: interrupting or surviving the druid ritual; recovering the stolen winery gem; the Gulthias tree at the hill's summit is the source of the blight creatures throughout the region; destroying it weakens blights everywhere.

PLACEHOLDER — refer to source material for druid and berserker stat blocks, the Gulthias tree encounter, ritual mechanics, and the hill's layout.`
}
