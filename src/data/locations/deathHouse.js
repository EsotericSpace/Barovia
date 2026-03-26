export const deathHouse = {
  id: 'death-house',
  name: 'Death House',
  type: 'dungeon',
  avgLevel: [1, 2],
  status: 'available',
  nearby: ['village-of-barovia'],
  levelTriggers: [
    { level: 2, milestone: 'death-house-survived', condition: 'surviving Death House and escaping to the village street' },
  ],

  summary: `A semi-sentient haunted manor at the edge of the Village of Barovia. It lures adventurers inside using the ghosts of two dead children, then reveals itself as a predatory house built by a cult that worshipped Strahd. The cult is long gone. The house remains. Locals call it Death House and do not go near it.`,

  entry: `DEATH HOUSE (avg level 1–2)

ATMOSPHERE
From the outside, it looks like a wealthy family home fallen into disrepair — high gabled roof, darkened windows, overgrown grounds. Two children stand outside: a girl of about ten and a younger boy, frightened, asking for help with "the monster in the basement." They are perfectly real-looking. That is the trap.

Inside, the house is unsettlingly normal at first. Dust, portraits, a piano that plays by itself. The wrongness is slow. It builds. The shift point is Strahd's letter in the second-floor library — the moment the house stops pretending. After that, doors lock, windows brick over, and the house begins actively preventing escape.

STORY
The Durst family were once wealthy landowners. When Barovia's economy collapsed after Strahd's rise, Elisabeth Durst convened a cult. What started as survival — dark rituals for dark patrons — became obsession. They killed their servants, then travelers. Gustav, Elisabeth's husband, fathered a child with the family nursemaid Anya. Elisabeth murdered Anya and sacrificed the newborn — Walter — on the basement altar hours after his birth. That act drew the Dark Powers' attention. The cult was transformed into undead and sealed inside. Gustav hanged himself. Their two children, Rose and Thorn, were locked in the attic to hide them from the cult and slowly starved to death.

The house still lures victims. Their deaths feed whatever animates it now. Strahd finds the whole affair contemptible — he destroyed the original cultists when they became an embarrassment, but the house persists without him.

KEY NPCS
Rose (Rosavalda Durst) — The older child, approximately ten. Smart, protective of her brother, drops careful hints. Her ghost haunts the attic room where she died. She is not malicious — she is terrified. She may attempt to possess a willing or unwilling party member. Her spirit finds peace only if her bones are carried to her crypt in the dungeon (Area 23E).

Thorn (Thornbolt Durst) — The younger child, approximately seven. Clings to Rose. Says less, watches more. Same haunting rules as Rose. His crypt is Area 23F.

Anya the Nursemaid — Specter haunting the Nursemaid's Suite on the third floor. Emerges from near the covered crib. Her Strength drain is lethal at this level: 3d6 necrotic damage on a hit, and the target's HP maximum is reduced by the same amount until a long rest. Do not let her catch the party flat-footed. Faint sounds — something like a baby crying — may precede her appearance.

Gustav Durst — Ghast in the dungeon. Once a weak, complicit man who let evil happen around him and hanged himself in grief. The key to the deeper dungeon is on his person. Encountered in the Cult Leaders' Quarters (Area 34) alongside his wife.

Elisabeth Durst — Ghast in the Cult Leaders' Quarters (Area 34). The architect of the cult. She is more aggressive than Gustav. A Cloak of Protection and a spellbook are in this room — significant rewards for parties at this level.

Lorghoth the Decayer — Shambling mound (CR 5) concealed in the southernmost alcove of the Ritual Chamber (Area 38). Extremely dangerous for level 1–2 characters. If the party refuses to make a sacrifice, the spectral cultists cry: "Lorghoth, the Decayer, we awaken thee!" He is not meant to be defeated by force — the correct response is to run.

FLOOR GUIDE
Ground floor: Entrance, main hall, wolf trophy room (taxidermied wolf can animate), kitchen with a dumbwaiter connecting all floors, dining room with an illusory feast (anyone who ate from it: DC 12 CON save or one level of exhaustion when the house's nature is revealed), servants' quarters.

Second floor: Piano room (plays by itself, sheet music titled "The Rose Song"), library. The library contains Strahd's letter — the turning point. Strahd's letter mocks the cult's devotion: their bloodletting, their rituals, their craven prayers. Reading it triggers DC 13 CHA save or short-term madness. Also here: the house deed and the mill deed to Old Bonegrinder near Vallaki (legally now the party's property; both become relevant later in the campaign). After the letter is found, the house drops its pretense. Master suite contains the best treasure in the house: a jewelry box worth 900 gp in gems.

Third floor: Nursemaid's Suite (specter encounter), children's room (bricked-over windows, locked door, two small skeletons inside — Rose and Thorn). Attic leads to the hidden shaft descending to the dungeon. After reconciling with the children's ghosts, the attic room is one of the few safe rest points in the house — one short rest is permitted here.

Dungeon: The bulk of the dangerous encounters. Stone corridors, partially flooded in places.
- Family crypts (Area 23): Rose's crypt (23E), Thorn's crypt (23F), Walter's crypt (23B — the infant). Placing the children's bones here lets their spirits rest.
- Area 25: A silvered shortsword. Critical for the rest of the campaign — many Barovian creatures require silvered or magical weapons.
- Area 29: Four ghouls in a narrow corridor. Potentially the deadliest non-boss encounter. Consider reducing to two or three for a party with losses.
- Area 31, Darklord's Shrine: Five shadows. Shadows have Strength drain — a character reduced to 0 STR dies and rises as a shadow. Deploy in waves of two. Do not let all five act simultaneously.
- Area 34, Cult Leaders' Quarters: Gustav and Elisabeth Durst (ghasts). Loot: Cloak of Protection, spellbook.
- Area 35, Reliquary: Hag fingers, swamp water, raven claws, amber shards, wolf's bane, dragon teeth. These are foreshadowing props — each points to a later location. The amber shards particularly: they foreshadow the Amber Temple. Do not let the party discard them without noting what they felt.

THE RITUAL CHAMBER (Area 38)
Forty feet across. Stone pillars. Murky standing water covers most of the floor except a central walkway to a raised octagonal dais. Rusty chains hang from the ceiling above the altar. Thirteen dark-robed, void-faced apparitions stand motionless on ledges around the room. They cannot be harmed. They cannot be reasoned with. They chant: "One must die. One must die. One must die."

The party has three choices:
1. Make a sacrifice. Kill any living creature on the altar. The cult is satisfied. The house releases them — but seals the normal staircase. The escape route changes.
2. Refuse. The cultists cry "Lorghoth, the Decayer, we awaken thee!" Lorghoth emerges from the south alcove. The party should run. The house's escape sequence begins.
3. Offer something unconventional — a rat, a drop of blood, something that tests whether the house has standards. Rule as the scene demands.

If the party made the sacrifice, they may feel sick about it outside. If they refused, they should feel proud and exhausted and nearly dead. Neither outcome is clean. That is the point.

THE ESCAPE
After the ritual chamber — sacrifice or refusal — the house collapses into a controlled horror sequence. The party must reach the surface while the house attacks them.

Run as a skill challenge: five successes before three failures. Obstacles in sequence:
1. Falling debris — Acrobatics DC 10 or 2d6 bludgeoning damage
2. Portcullis — Strength DC 15 (two characters working a wheel mechanism reduces it to DC 10 each)
3. Flooded passage — Athletics DC 12 or lose an action to the current
4. Smoke-filled corridor — CON save DC 12 or poisoned condition until fresh air
5. Scything blades in a doorframe — Acrobatics DC 15 or 2d10 slashing damage
6. Bricked exterior wall — Strength DC 20, or improvise (find a hammer, use a spell, charge it together)

Failed checks cost time but do not stop progress — on three total failures, a character doesn't make it out with the others. They survive but emerge alone, later, with a cost.

The house does not pursue beyond its grounds.

AFTER ESCAPE
The house looks undamaged from the street. No sign of the collapse within. The sounds have stopped. It looks like it has always looked. This is intentional. Barovia does not stay broken.

Give the party a moment of silence before introducing Ismark or another villager. Let them look at the house. Let them feel what that means.

FORESHADOWING THIS LOCATION PLANTS
- The mill deed points to Old Bonegrinder and the night hags
- Strahd's letter establishes his contempt for those who worship him
- The reliquary items map to: Old Bonegrinder (hag fingers), Tser Pool (swamp water/Vistani), Wizard of Wines (raven claws/Keepers), Amber Temple (amber shards), werewolves (wolf's bane, dragon teeth)
- The shadow encounter prefigures undead drain mechanics throughout the campaign
- The "One Must Die" chant can echo later at a Strahd confrontation — a single repeated phrase the party will never forget

RESTS
No long rests are possible in Death House. The house resists respite. One short rest per floor, maximum — the house's hostility makes any prolonged stillness dangerous. Exception: the attic room, after the children's ghosts have been reconciled, is safe for one short rest.`,
}
