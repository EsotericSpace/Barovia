export const argynvostholt = {
  id: 'argynvostholt',
  name: 'Argynvostholt',
  type: 'dungeon',
  avgLevel: [7],
  status: 'available',
  nearby: ['vallaki', 'werewolf-den'],
  levelTriggers: [
    { level: 7, milestone: 'argynvostholt-beacon', condition: "lighting the beacon at Argynvostholt by returning Argynvost's skull" },
  ],

  summary: `A ruined manor that was once the stronghold of the Order of the Silver Dragon, knights who fell fighting Strahd centuries ago. Their leader, the revenant Vladimir Horngaard, refuses to let them rest — consumed by hatred, he will not allow his knights to find peace even now.`,

  entry: `ARGYNVOSTHOLT (avg level 6–8)

See Curse of Strahd Chapter 7: Argynvostholt for full details.

Key beats: the revenants are not hostile by default but Vladimir is; restoring the skull of the silver dragon Argynvost to the beacon at the manor's tower lights a signal visible across Barovia and grants all who die here a peaceful afterlife; this is one of the campaign's major boons.

PLACEHOLDER — refer to source material for revenant and specter stat blocks, manor room descriptions, Argynvost lore, and Vladimir Horngaard's encounter.`
}
