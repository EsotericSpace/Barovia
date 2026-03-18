export const castleRavenloft = {
  id: 'castle-ravenloft',
  name: 'Castle Ravenloft',
  type: 'dungeon',
  avgLevel: [9],
  status: 'available',
  nearby: ['village-of-barovia', 'amber-temple'],
  levelTriggers: [
    { level: 10, milestone: 'strahd-defeated', condition: 'destroying Strahd permanently — Heart of Sorrow shattered, three brides defeated, Strahd staked in his coffin during daylight' },
  ],

  summary: `The endgame. Strahd's home, fortress, and prison. The castle is alive and aware — doors open that shouldn't, rooms shift, and Strahd knows where the party is at all times. Everything in Barovia has been leading here. The only reliable way to kill him is in his coffin during daylight, with the Heart of Sorrow destroyed and the three brides defeated.`,

  entry: `CASTLE RAVENLOFT (avg level 9)

ATMOSPHERE
The castle is alive and aware. Doors open that shouldn't. Rooms shift. The heartbeat in the high tower grows louder as the party climbs. Strahd knows where they are at all times. The castle does not trap them — it hosts them. That is worse.

STORY
Everything in Barovia has been leading here. Strahd is not a monster who became a villain. He is a man who chose, consciously and deliberately, to murder his brother for a woman who jumped from the walls rather than be his. He has spent four centuries telling himself it was love. The castle is the monument to that lie. The party's goal is not just to kill him — it is to do so in a place that was built to make that impossible.

KEY NPCS
Strahd von Zarovich — Ancient vampire, wizard, and the land itself. Brilliant, melancholic, possessive. His preferred target is whoever carries the Tome of Strahd — if he learns it has been taken, everything else is secondary until he recovers it. Will invite the party to dinner. Will be genuinely hospitable. Will kill them if it suits him. His tragedy is real. His danger is absolute.

Rahadin — Chamberlain. Drow. Quiet as a cat, loyal beyond reason, has served Strahd for centuries. Greets invited guests at the great entry and escorts them to the dining hall. Fights to the death if attacked. His loyalty is its own form of horror — he has never once questioned.

The Three Brides (Ludmilla, Anastrasya, Volenta) — Vampire spawn. Guard Strahd's coffin in his tomb, rising from the earth to protect it. Former women given eternity in exchange for servitude. Each wears the gifts Strahd lavished on them — gold, jewels, gowns now soiled and tattered.

Barovian Witches — Seven serve in the cauldron room. Sworn to Strahd in exchange for arcane power. Will capture rather than kill if possible — unconscious characters are dragged to the guest room and left unharmed. Captured witches trade information for their lives.

LOCATIONS
Front Courtyard and Entry — The castle opens its doors. Four red dragon wyrmlings guard the entry as stone statues — they allow guests in but not out. They revert to stone if intruders leave the room. The drawbridge and portcullis can only be opened with Strahd's command word or dispel magic (DC 14).

Great Entry — Gargoyles wait on the walls. Eight of them drop and attack any character who returns after leaving. Rahadin meets invited guests here.

Dining Hall — The first encounter with "Strahd" is an illusion at the organ — gracious, hospitable, informative about nothing useful. Converses for three rounds then vanishes with a laugh. The moment it disappears, all fires go out, doors slam, the drawbridge rises. The food and wine are real and safe. A secret door behind the organ leads to the south archer's post — the organ slides outward when the correct pedal is depressed.

Study — Tatyana's portrait hangs above the fireplace — the proof Strahd uses to justify his obsession with Ireena. Over a thousand unique tomes worth 80,000 gp. The Tome of Strahd is here. A secret door behind the fireplace leads to the false treasury.

False Treasury — A trapped chest releases sleeping gas (DC 18 CON or paralyzed 4 hours). If all characters succumb, the witches drag them to the guest room unharmed. Fifty scattered coins. A dead adventurer with nothing of value. The real treasury is the study.

Guest Room — Safe during the day. At night, Barovian witches from the cauldron arrive to subdue sleeping characters with sleep spells.

Cauldron Room — Seven Barovian witches. Pungent smell detectable through the door. If warned, they cast invisibility and wait. Captured witches trade information for freedom. Each carries a healing potion with a 30% chance it's actually poison. A spellbook on the table is evil — non-evil creatures take 1d10 psychic damage on contact.

High Tower and Heart of Sorrow — The tower is alive. Entering the staircase triggers initiative — the tower shudders on the Heart's turn, forcing DC 10 DEX saves or characters fall to the base. The Heart floats near the top: AC 15, 50 HP, 10 feet in diameter. Melee attacks require 10-foot reach. Ten animated halberds on the walls defend it. Destroying the Heart stops the shuddering and earns 1,500 XP. Regains all HP at dawn if not fully destroyed. Strahd senses any damage done to it and sends four vampire spawn in 3 rounds.

Tower Roof — 190 feet above the courtyard. A place Strahd is sometimes found at night, watching.

Catacombs — Beneath the castle. Bat guano covers the floor. 40+ crypts sealed with stone slabs (DC 15 STR to open). Five entry points. The architecture of a man who has outlived everyone he ever knew.

Sergei's Tomb — Portcullis requires DC 25 STR to lift. Sergei is perfectly preserved — looks as though he is sleeping. His coffin opens easily to a lawful good creature's touch. The Sunsword's hilt was his. The contrast with Tatyana's absence should land without the DM explaining it.

Strahd's Tomb — Portcullis, DC 25 STR. Three brides rise from the earth to defend the coffin. Western and eastern alcoves radiate conjuration magic. The coffin itself is in the central alcove.

MCGUFFINS
Tome of Strahd — Found in the study. Ancient, brittle, mostly illegible. The readable passages are Strahd's own account of killing Sergei, losing Tatyana, and becoming what he is. If the party takes it, Strahd abandons all other objectives until he recovers it. His preferred target becomes whoever carries it.

Holy Symbol of Ravenkind — Legendary. 10 charges, regains 1d6+4 at dawn. Hold Vampires (1 charge, DC 15 WIS or paralyzed 1 minute), enhanced Turn Undead (3 charges, disadvantage on saves), Sunlight (5 charges, 30-foot radius sunlight for 10 minutes). Requires attunement by a good-aligned cleric or paladin.

Sunsword — Sergei's weapon, destroyed by Strahd after his death — or so Strahd was told. The hilt survived. Sentient, chaotic good. INT 11, WIS 17, CHA 16. Communicates through emotion. Its purpose is destroying Strahd — not to free Barovia, but for revenge over its lost blade. It secretly fears its own destruction. Functions as a sun blade.

Heart of Sorrow — Any damage dealt to Strahd transfers to the Heart instead. If the Heart hits 0 HP, it shatters and Strahd takes the overflow. Must be destroyed before the party can reliably kill him.

THREATS
Strahd himself — Teleports when losing. Uses the castle as his arena. The only reliable kill window is his coffin during daylight hours.

The Three Brides — Vampire spawn. Guard the coffin. Must be dealt with before the party can reach Strahd at rest.

Dragon wyrmlings — Four red wyrmlings in entry. Allow entry, prevent exit.

Gargoyles — Eight in the great entry. Attack anyone who returns after leaving.

Animated halberds — Ten, defending the Heart of Sorrow.

Vampire spawn — Sent by Strahd when the Heart is damaged. Arrive in 3 rounds via Spider Climb.

Barovian witches — Seven in the cauldron room. Capture-focused rather than kill-focused.

Random encounters — See encounter table. Strahd can appear on any roll of 20. The castle never lets them forget he is here.

EVENTS
The dinner — The illusion is a test and an introduction. The real Strahd may appear before or after — on his terms, never theirs.

Ireena in the castle — If she is with the party, Strahd will make his move here. This is what the entire campaign has been building toward. The DM should treat it as the most important scene in the story.

The Heart — Once the party finds the tower, the clock starts. Strahd knows. Four vampire spawn are coming. The tower is shaking. This is the point of no return.

Sergei's tomb — A lawful good character opening the coffin easily while the portcullis required DC 25 STR — the castle acknowledges goodness even here. Worth the DM playing the contrast.

The kill — Strahd in his coffin, during the day, with the Heart destroyed and the three brides dealt with. The Sunsword, the Holy Symbol, and the Tome are the tools. The tomb is the place. This is the ending the whole campaign has earned.

TATYANA'S ABSENCE
There is no crypt for Tatyana. She jumped. She has been reincarnating ever since. The crypts hold everyone Strahd has ever known — his ancestors, his enemies, his brother perfectly preserved — and the one person he destroyed himself trying to possess is simply not there. The DM should let that land without explanation.

RANDOM ENCOUNTERS
Check for a random encounter the first time characters enter any unoccupied area, and every 10 minutes spent resting. Encounter occurs on 18+ (d20). Roll d12+d8 for type. If Barovian commoners are traveling with the party, encounters occur on 9+.

Named encounters (once only):
Ezmerelda d'Avenir (2) — Invisible via greater invisibility. Taps rearmost party member on the shoulder. "Don't be frightened. We're on the same side." Hunting Strahd but suspects she's outmatched. Must be invited to join. Tests vampire knowledge before agreeing. Whatever their answers, she comes along.
Rahadin (3) — Approaches quietly. Directs party to a random location (d6: 1-chapel, 2-audience hall, 3-study, 4-tower roof, 5-wine cellar, 6-torture chamber). Strahd isn't actually there unless the tarokka reading says otherwise. Fights to the death if attacked.
Barovian Witch (18) — Searching for her missing black cat. Spits and casts if confronted.
Black Cat (4) — The witch's familiar. Attacks if cornered. If captured or killed, doesn't recur.

Strahd (20) — Thunder shakes the castle. "Good evening." Characters with passive Perception below 19 are surprised. Attacks the surprised character nearest to him first.

Undead and hostile:
Crawling claws 2d6 (10) — Gang up on one target. One tries to hide in a backpack — Stealth vs. passive Perception. If it wins, waits until long rest to attack.
Crawling Strahd zombie (13) — Legless, 15 HP remaining. Can be avoided if party moves quietly without light.
Shadows 1d6 (11) — Passive Perception 16+ detects them. Follow the party but don't attack unless attacked first. Obey Strahd.
Wights 1d4 (15) — Former guard captains. Attack living on sight. Can be avoided if moving quietly without light.
Vampire spawn 1d4+1 (19) — Creep along ceilings. Passive Perception 16+ prevents surprise.
Flying swords 1d4+1 (6) — Attack on sight.
Broom of animated attack (5) — Attacks within 5 feet.
Giant spider cocoon (17) — Moving only. Contents d6: 1-mannequin, 2-witch who casts immediately, 3-Strahd zombie, 4-Barovian lunatic (lesser restoration cures, then flees), 5-dead Barovian hosting spider swarm, 6-Vistana who helps until Strahd appears then betrays.

Vistani 1d4+1 (14) — Claim to be escaped captives. Loyal to Strahd. Betray the party when he appears. One carries 2d8 gemstones worth 50 gp each.

Barovian commoners (9) — Angry villagers with torches and pitchforks. Follow the characters. Raise encounter threshold to 9+.

Objects and atmosphere:
Unseen servant (8) — Carrying one of: silver platter with moldy scones (first to eat gains inspiration; repeat: crawling claw), silver goblet of poisoned wine (DC 15 CON or 8d10 poison; repeat: healing potion), gold candelabrum three unlit candles, purple silk handkerchief (repeat: smeared with blood), crystal dinner bell (rings within 10 feet, attracts 1d4 vampire spawn in 1d4+1 rounds), wizard's spellbook with Strahd's prepared spells (repeat: nonmagical storybook).
Blinsky toy (7) — Moving only. d6: 1-plush werewolf with knife claws stuffed with wooden babies, 2-jester marionette with copper bells, 3-puzzle box carved with clowns (DC 20 INT to open, empty inside), 4-faceless doll in yellowed wedding dress, 5-coffin-shaped jack-in-the-box with Strahd puppet, 6-spring-loaded chattering fanged teeth.
Trinket (16) — One random character finds a lost trinket.`
}