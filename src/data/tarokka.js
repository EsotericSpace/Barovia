// Full Tarokka deck per Curse of Strahd Appendix E.
// publicText: Madam Eva's spoken prophecy — what the player hears.
// secretText: The DM's actual room/location reference.

export const COMMON_DECK = [

  // — SUIT OF COINS —
  { card: 'Swashbuckler', suit: 'Coins', location: 'castle-ravenloft',
    publicText: 'I see the skeleton of a deadly warrior, lying on a bed of stone flanked by gargoyles.',
    secretText: 'Crypt of Endorovich, Castle Ravenloft (area K84, crypt 7).' },

  { card: 'Philanthropist', suit: 'Coins', location: 'abbey',
    publicText: 'Look to a place where sickness and madness are bred. Where children once cried, the treasure lies still.',
    secretText: 'The nursery, Abbey of Saint Markovia (area S23).' },

  { card: 'Trader', suit: 'Coins', location: 'wizard-of-wines',
    publicText: 'Look to the wizard of wines! In wood and sand the treasure hides.',
    secretText: 'The glassblower\'s workshop, Wizard of Wines (area W10).' },

  { card: 'Merchant', suit: 'Coins', location: 'castle-ravenloft',
    publicText: 'Seek a cask that once contained the finest wine, of which not a drop remains.',
    secretText: 'The wine cellar, Castle Ravenloft (area K63).' },

  { card: 'Guild Member', suit: 'Coins', location: 'castle-ravenloft',
    publicText: 'I see a room full of bottles. It is the tomb of a guild member.',
    secretText: 'Crypt of Artank Swilovich, Castle Ravenloft (area K84, crypt 5).' },

  { card: 'Beggar', suit: 'Coins', location: 'vallaki',
    publicText: 'A wounded elf has what you seek. He will part with the treasure to see his dark dreams fulfilled.',
    secretText: 'Kasimir\'s hovel in the Vistani camp outside Vallaki (area N9a).' },

  { card: 'Thief', suit: 'Coins', location: 'village-of-barovia',
    publicText: 'What you seek lies at the crossroads of life and death, among the buried dead.',
    secretText: 'The graveyard at the River Ivlis crossroads (area F), on the road between the Village of Barovia and Vallaki.' },

  { card: 'Tax Collector', suit: 'Coins', location: 'vallaki',
    publicText: 'The Vistani have what you seek. A missing child holds the key to the treasure\'s release.',
    secretText: 'The Vistani treasure wagon outside Vallaki (area N9i). The missing child is Arabelle (area L).' },

  { card: 'Miser', suit: 'Coins', location: 'castle-ravenloft',
    publicText: 'Look for a fortress inside a fortress, in a place hidden behind fire.',
    secretText: 'The treasury of Castle Ravenloft (area K41).' },

  { card: 'Rogue', suit: 'Coins', location: 'vallaki',
    publicText: 'I see a nest of ravens. There you will find the prize.',
    secretText: 'The attic of the Blue Water Inn, Vallaki (area N2q).' },

  // — SUIT OF GLYPHS —
  { card: 'Monk', suit: 'Glyphs', location: 'abbey',
    publicText: 'The treasure you seek is hidden behind the sun, in the house of a saint.',
    secretText: 'The main hall, Abbey of Saint Markovia (area S13).' },

  { card: 'Missionary', suit: 'Glyphs', location: 'abbey',
    publicText: 'I see a garden dusted with snow, watched over by a scarecrow with a sackcloth grin. Look not to the garden but to the guardian.',
    secretText: 'Hidden inside one of the scarecrows in the garden of the Abbey of Saint Markovia (area S9).' },

  { card: 'Healer', suit: 'Glyphs', location: 'krezk',
    publicText: 'Look to the west. Find a pool blessed by the light of the white sun.',
    secretText: 'Beneath the gazebo at the Shrine of the White Sun in Krezk (area S4).' },

  { card: 'Shepherd', suit: 'Glyphs', location: 'castle-ravenloft',
    publicText: 'Find the mother — she who gave birth to evil.',
    secretText: 'Tomb of King Barov and Queen Ravenovia, Castle Ravenloft (area K88).' },

  { card: 'Druid', suit: 'Glyphs', location: 'yester-hill',
    publicText: 'An evil tree grows atop a hill of graves where the ancient dead sleep. The ravens can help you find it. Look for the treasure there.',
    secretText: 'At the base of the Gulthias tree on Yester Hill (area Y4). Any wereraven in the wilderness can lead the party there.' },

  { card: 'Anarchist', suit: 'Glyphs', location: 'castle-ravenloft',
    publicText: 'I see walls of bones, the chandelier of bones, and table of bones — all that remains of enemies long forgotten.',
    secretText: 'The hall of bones, Castle Ravenloft (area K67).' },

  { card: 'Charlatan', suit: 'Glyphs', location: 'old-bonegrinder',
    publicText: 'I see a lonely mill on a precipice. The treasure lies within.',
    secretText: 'The attic of Old Bonegrinder (area O4).' },

  { card: 'Bishop', suit: 'Glyphs', location: 'amber-temple',
    publicText: 'What you seek lies in a pile of treasure beyond a set of amber doors.',
    secretText: 'The sealed treasury of the Amber Temple (area X40).' },

  { card: 'Traitor', suit: 'Glyphs', location: 'vallaki',
    publicText: 'Look for a wealthy woman. A staunch ally of the devil, she keeps the treasure under lock and key, with the bones of an ancient enemy.',
    secretText: 'The master bedroom of the Wachterhaus, Vallaki (area N4o).' },

  { card: 'Priest', suit: 'Glyphs', location: 'castle-ravenloft',
    publicText: 'You will find what you seek in the castle, amid the ruins of a place of supplication.',
    secretText: 'The chapel of Castle Ravenloft (area K15).' },

  // — SUIT OF STARS —
  { card: 'Transmuter', suit: 'Stars', location: 'castle-ravenloft',
    publicText: 'Go to a place of dizzying heights, where the stone itself is alive!',
    secretText: 'The north tower peak, Castle Ravenloft (area K60).' },

  { card: 'Diviner', suit: 'Stars', location: 'village-of-barovia',
    publicText: 'Look to the one who sees all. The treasure is hidden in her camp.',
    secretText: 'Madam Eva\'s Vistani encampment at Tser Pool (area G), on the road out of the Village of Barovia. If Madam Eva is performing the reading, she says: "I think the treasure is under my very nose!"' },

  { card: 'Enchanter', suit: 'Stars', location: 'ruins-of-berez',
    publicText: 'I see a kneeling woman — a rose of great beauty plucked too soon. The master of the marsh knows of whom I speak.',
    secretText: 'Beneath Marina\'s monument in the Ruins of Berez (area U5). The ghost of Burgomaster Lazlo Ulrich (area U2) can point the way.' },

  { card: 'Abjurer', suit: 'Stars', location: 'argynvostholt',
    publicText: 'I see a fallen house guarded by a great stone dragon. Look to the highest peak.',
    secretText: 'The beacon of Argynvostholt (area Q53). The great stone dragon is the statue in area Q1.' },

  { card: 'Elementalist', suit: 'Stars', location: 'amber-temple',
    publicText: 'The treasure is hidden in a small castle beneath a mountain, guarded by amber giants.',
    secretText: 'Inside a model of Castle Ravenloft in the Amber Temple (area X20).' },

  { card: 'Evoker', suit: 'Stars', location: 'castle-ravenloft',
    publicText: 'Search for the crypt of the wizard ordinaire. His staff is the key.',
    secretText: 'Crypt of Gralmore Nimblenobs, Castle Ravenloft (area K84, crypt 37).' },

  { card: 'Illusionist', suit: 'Stars', location: 'vallaki',
    publicText: 'A man is not what he seems. He comes here in a carnival wagon. Therein lies what you seek.',
    secretText: 'Rictavio\'s carnival wagon in Vallaki (area N5).' },

  { card: 'Necromancer', suit: 'Stars', location: 'castle-ravenloft',
    publicText: 'A woman hangs above a roaring fire. Find her and you will find the treasure.',
    secretText: 'The study of Castle Ravenloft (area K37).' },

  { card: 'Conjurer', suit: 'Stars', location: 'ruins-of-berez',
    publicText: 'I see a dead village, drowned by a river, ruled by one who has brought great evil into the world.',
    secretText: 'Baba Lysaga\'s hut in the Ruins of Berez (area U3).' },

  { card: 'Wizard', suit: 'Stars', location: 'van-richtens-tower',
    publicText: 'Look for a wizard\'s tower on a lake. Let the wizard\'s name and servant guide you to that which you seek.',
    secretText: 'The top floor of Van Richten\'s Tower (area V7).' },

  // — SUIT OF SWORDS —
  { card: 'Avenger', suit: 'Swords', location: 'argynvostholt',
    publicText: 'The treasure lies in a dragon\'s house, in hands once clean and now corrupted.',
    secretText: 'In the possession of Vladimir Horngaard, Argynvostholt (area Q36).' },

  { card: 'Paladin', suit: 'Swords', location: 'castle-ravenloft',
    publicText: 'I see a sleeping prince, a servant of the light and the brother of darkness. The treasure lies with him.',
    secretText: 'Sergei\'s tomb, Castle Ravenloft (area K85).' },

  { card: 'Soldier', suit: 'Swords', location: 'tsolenka-pass',
    publicText: 'Go to the mountains. Climb the white tower guarded by golden knights.',
    secretText: 'The rooftop of the Tsolenka Pass guard tower (area T6).' },

  { card: 'Mercenary', suit: 'Swords', location: 'castle-ravenloft',
    publicText: 'The thing you seek lies with the dead, under mountains of gold coins.',
    secretText: 'A crypt in Castle Ravenloft (area K84, crypt 31).' },

  { card: 'Myrmidon', suit: 'Swords', location: 'werewolf-den',
    publicText: 'Look for a den of wolves in the hills overlooking a mountain lake. The treasure belongs to Mother Night.',
    secretText: 'The shrine of Mother Night in the werewolf den (area Z7).' },

  { card: 'Berserker', suit: 'Swords', location: 'castle-ravenloft',
    publicText: 'Find the Mad Dog\'s crypt. The treasure lies within, beneath the blackened bones.',
    secretText: 'Crypt of General Kroval "Mad Dog" Grislek, Castle Ravenloft (area K84, crypt 38).' },

  { card: 'Hooded One', suit: 'Swords', location: 'amber-temple',
    publicText: 'I see a faceless god. He awaits you at the end of a long and winding road, deep in the mountains.',
    secretText: 'Inside the head of a giant statue in the Amber Temple (area X5a).' },

  { card: 'Dictator', suit: 'Swords', location: 'castle-ravenloft',
    publicText: 'I see a throne fit for a king.',
    secretText: 'The audience hall of Castle Ravenloft (area K25).' },

  { card: 'Torturer', suit: 'Swords', location: 'vallaki',
    publicText: 'There is a town where all is not well. There you will find a house of corruption, and within, a dark room full of still ghosts.',
    secretText: 'The attic of the burgomaster\'s mansion in Vallaki (area N3s).' },

  { card: 'Warrior', suit: 'Swords', location: 'castle-ravenloft',
    publicText: 'That which you seek lies in the womb of darkness, the devil\'s lair: the one place to which he must return.',
    secretText: 'Strahd\'s tomb, Castle Ravenloft (area K86).' },
]

// High deck — each card has one or more ally options and one lair location within Castle Ravenloft.
// drawReading() picks randomly from allies when multiple are listed.
export const HIGH_DECK = [
  {
    card: 'Ghost',
    allies: [
      { name: 'Sir Godfrey Gwilym', location: 'argynvostholt',
        publicText: 'I see a fallen paladin of the fallen order of knights. He lingers like a ghost in a dead dragon\'s lair.',
        hint: 'The revenant Sir Godfrey Gwilym in Argynvostholt (area Q37). Won\'t accompany the party unless convinced the Order\'s honor can be restored — DC 15 Charisma (Persuasion).' },
      { name: 'Sir Klutz', location: 'castle-ravenloft',
        publicText: 'Stir the spirit of the clumsy knight whose crypt lies deep within the castle.',
        hint: 'Sir Klutz, phantom warrior in Castle Ravenloft (area K84, crypt 33). Disappears only after he or Strahd is reduced to 0 HP.' },
    ],
    lair: { publicText: 'Look to the father\'s tomb.',
            hint: 'Strahd is in the tomb of King Barov and Queen Ravenovia (area K88).' },
  },
  {
    card: 'Innocent',
    allies: [
      { name: 'Parriwimple', location: 'village-of-barovia',
        publicText: 'I see a young man with a kind heart. A mother\'s boy! He is strong in body but weak of mind. Seek him out in the village of Barovia.',
        hint: 'Parriwimple in the Village of Barovia (area E1). Can be convinced by appealing to his good heart, but his employer Bildrath will resist letting him go.' },
      { name: 'Ireena Kolyana', location: 'village-of-barovia',
        publicText: 'Evil\'s bride is the one you seek!',
        hint: 'Ireena Kolyana (area E4). Her brother Ismark opposes the idea. Ireena won\'t go until Kolyan Indirovich\'s body is laid to rest in the cemetery.' },
    ],
    lair: { publicText: 'He dwells with the one whose blood sealed his doom, a brother of light snuffed out too soon.',
            hint: 'Strahd is in Sergei\'s tomb (area K85).' },
  },
  {
    card: 'Marionette',
    allies: [
      { name: 'Pidlwick II', location: 'castle-ravenloft',
        publicText: 'What horror is this? I see a man made by a man. Ageless and alone, it haunts the towers of the castle.',
        hint: 'Pidlwick II in Castle Ravenloft (area K59). See appendix D.' },
      { name: 'Clovin Belview', location: 'abbey',
        publicText: 'Look for a man of music, a man with two heads. He lives in a place of great hunger and sorrow.',
        hint: 'Clovin Belview, two-headed mongrelfolk in the Abbey of Saint Markovia (area S17). Refuses to come if the Abbot still lives. If the Abbot is dead, can be bribed with wine.' },
    ],
    lair: { publicText: 'Look to great heights. Find the beating heart of the castle. He waits nearby.',
            hint: 'Strahd is in the north tower peak (area K60).' },
  },
  {
    card: 'Darklord',
    allies: [
      { name: null, location: null,
        publicText: 'Ah, the worst of all truths: You must face the evil of this land alone!',
        hint: 'No NPC ally is available for this campaign.' },
    ],
    lair: { publicText: 'He lurks in the depths of darkness, in the one place to which he must return.',
            hint: 'Strahd is in his tomb (area K86).' },
  },
  {
    card: 'Mists',
    allies: [
      { name: "Ezmerelda d'Avenir", location: 'abbey',
        publicText: 'A Vistana wanders this land alone, searching for her mentor. She does not stay in one place for long. Seek her out at Saint Markovia\'s abbey, near the mists.',
        hint: "Ezmerelda d'Avenir — can be found at the Abbey of Saint Markovia (area S19) and several other locations. See appendix D." },
    ],
    lair: { publicText: 'The cards cannot see where the evil lurks. The mists obscure all.',
            hint: 'No fixed lair — Strahd can appear anywhere in Castle Ravenloft. Madam Eva can be consulted again after at least three days for a new reading on his location only.' },
  },
  {
    card: 'Executioner',
    allies: [
      { name: 'Ismark Kolyanovich', location: 'village-of-barovia',
        publicText: 'Seek out the brother of the devil\'s bride. They call him "the lesser," but he has a powerful soul.',
        hint: 'Ismark Kolyanovich (area E2). Won\'t accompany the party to Castle Ravenloft until Ireena is safe.' },
    ],
    lair: { publicText: 'I see a dark figure on a balcony, looking down upon this tortured land with a twisted smile.',
            hint: 'Strahd is at the overlook (area K6).' },
  },
  {
    card: 'Broken One',
    allies: [
      { name: 'The Mad Mage of Mount Baratok', location: null,
        publicText: 'Your greatest ally will be a wizard. His mind is broken, but his spells are strong.',
        hint: 'The Mad Mage of Mount Baratok (chapter 2, area M). Found in the wilderness.' },
      { name: 'Donavich', location: 'village-of-barovia',
        publicText: 'I see a man of faith whose sanity hangs by a thread. He has lost someone close to him.',
        hint: 'Donavich, the priest in the Village of Barovia (area E5). Won\'t accompany the party until his son Doru is dead and buried.' },
    ],
    lair: { publicText: 'He haunts the tomb of the man he envied above all.',
            hint: 'Strahd is in Sergei\'s tomb (area K86).' },
  },
  {
    card: 'Tempter',
    allies: [
      { name: 'Arabelle', location: 'vallaki',
        publicText: 'I see a child — a Vistana. You must hurry, for her fate hangs in the balance. Find her at the lake!',
        hint: 'Arabelle near Vallaki (area L). Gladly joins the party, but her father Luvash won\'t let her leave if she returns to camp (area N9).' },
      { name: 'Vasilka', location: 'abbey',
        publicText: 'I hear a wedding bell, or perhaps a death knell. It calls thee to a mountainside abbey, wherein you will find a woman who is more than the sum of her parts.',
        hint: 'Vasilka, the flesh golem, in the Abbey of Saint Markovia (area S13).' },
    ],
    lair: { publicText: 'I see a secret place — a vault of temptation hidden behind a woman of great beauty. The evil waits atop his tower of treasure.',
            hint: 'Strahd is in the treasury (area K41). The woman of great beauty is the portrait of Tatyana in the study (area K37), which conceals a secret door to the treasury.' },
  },
  {
    card: 'Beast',
    allies: [
      { name: 'Zuleika Toranescu', location: 'werewolf-den',
        publicText: 'A werewolf holds a secret hatred for your enemy. Use her hatred to your advantage.',
        hint: 'Zuleika Toranescu in the werewolf den (area Z7). Will accompany the party if they promise to avenge her mate Emil by killing Kiril Stoyanovich.' },
    ],
    lair: { publicText: 'The beast sits on his dark throne.',
            hint: 'Strahd is in the audience hall (area K25).' },
  },
  {
    card: 'Donjon',
    allies: [
      { name: 'Victor Vallakovich', location: 'vallaki',
        publicText: 'Search for a troubled young man surrounded by wealth and madness. His home is his prison.',
        hint: 'Victor Vallakovich in Vallaki (area N3t).' },
      { name: 'Stella Wachter', location: 'vallaki',
        publicText: 'Find a girl driven to insanity, locked in the heart of her dead father\'s house. Curing her madness is key to your success.',
        hint: 'Stella Wachter in Vallaki (area N4n). Grants no benefit unless her madness is cured.' },
    ],
    lair: { publicText: 'He lurks in a hall of bones, in the dark pits of his castle.',
            hint: 'Strahd is in the hall of bones (area K67).' },
  },
  {
    card: 'Raven',
    allies: [
      { name: 'Davian Martikov', location: 'wizard-of-wines',
        publicText: 'Find the leader of the feathered ones who live among the vines. Though old, he has one more fight left in him.',
        hint: 'Davian Martikov at the Wizard of Wines winery. Before going to the castle, he insists on reconciling with his son Urwin Martikov in Vallaki (area N2).' },
    ],
    lair: { publicText: 'Look to the mother\'s tomb.',
            hint: 'Strahd is in the tomb of King Barov and Queen Ravenovia (area K88).' },
  },
  {
    card: 'Seer',
    allies: [
      { name: 'Kasimir Velikov', location: 'vallaki',
        publicText: 'Look for a dusk elf living among the Vistani. He has suffered a great loss and is haunted by dark dreams. Help him, and he will help you in return.',
        hint: 'Kasimir Velikov in the Vistani camp outside Vallaki (area N9a). Will only go to Castle Ravenloft after being led to the Amber Temple and finding a way to resurrect his dead sister.' },
    ],
    lair: { publicText: 'He waits for you in a place of wisdom, warmth, and despair. Great secrets are there.',
            hint: 'Strahd is in the study (area K37).' },
  },
  {
    card: 'Artifact',
    allies: [
      { name: 'Rictavio (Rudolf van Richten)', location: 'vallaki',
        publicText: 'Look for an entertaining man with a monkey. This man is more than he seems.',
        hint: 'Rictavio at the Blue Water Inn in Vallaki (area N2). When told about the card reading, he sheds his disguise and reveals himself as Dr. Rudolf van Richten.' },
    ],
    lair: { publicText: 'He lurks in the darkness where the morning light once shone — a sacred place.',
            hint: 'Strahd is in the chapel (area K15).' },
  },
  {
    card: 'Horseman',
    allies: [
      { name: 'Nikolai Wachter', location: 'vallaki',
        publicText: 'I see a dead man of noble birth, guarded by his widow. Return to life the dead man\'s corpse, and he will be your staunch ally.',
        hint: 'Nikolai Wachter the elder (dead) in the Wachterhaus, Vallaki (area N4o). Requires raise dead or resurrection. If the party lacks the means, Rictavio can provide a scroll of raise dead.' },
      { name: 'Arrigal', location: 'vallaki',
        publicText: 'A man of death named Arrigal will forsake his dark lord to serve your cause. Beware! He has a rotten soul.',
        hint: 'The Vistani assassin Arrigal outside Vallaki (area N9c). Warning: if Strahd is defeated, Arrigal betrays and attacks the party, believing himself destined to become Barovia\'s new lord.' },
    ],
    lair: { publicText: 'He lurks in the one place to which he must return — a place of death.',
            hint: 'Strahd is in his tomb (area K86).' },
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function drawReading() {
  const [tome, holySymbol, sunsword] = shuffle(COMMON_DECK)
  const [allyCard, lairCard] = shuffle(HIGH_DECK)
  const allyOption = allyCard.allies[Math.floor(Math.random() * allyCard.allies.length)]
  return {
    tome,
    holySymbol,
    sunsword,
    ally: {
      card: allyCard.card,
      name: allyOption.name,
      publicText: allyOption.publicText,
      hint: allyOption.hint,
      location: allyOption.location,
    },
    lair: {
      card: lairCard.card,
      publicText: lairCard.lair.publicText,
      hint: lairCard.lair.hint,
    },
  }
}
