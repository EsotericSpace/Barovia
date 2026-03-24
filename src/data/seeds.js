// Opening scene seeds — assembled into the character's last memory before Barovia.
// All values are arrays; systemPrompt.js picks one at random each session.
// CLASS_SEEDS: keyed by class, then subclass. Second person, past tense.
// Foreshadows the subclass without naming it. Specific and sensory.

export const CLASS_SEEDS = {
  Barbarian: {
    Berserker: [
      "The last thing you remember is the sound your knuckles made. You didn't stop when they did.",
      "The last thing you remember is something breaking that you hadn't meant to break. The anger came before the thought, the way it always did.",
    ],
    'Totem Warrior': [
      "The last thing you remember is an animal sitting still where animals don't sit still. It looked at you like it had been waiting.",
      "The last thing you remember is the sound the forest made when it stopped. Not quiet. Listening.",
    ],
  },
  Bard: {
    'College of Lore': [
      "The last thing you remember is a story someone told you that you knew, somehow, was true. You were writing it down.",
      "The last thing you remember is a song you'd never heard, complete from the first line, as if you'd always known it.",
    ],
    'College of Valor': [
      "The last thing you remember is the crowd going quiet. Not because you stopped. Because they were listening.",
      "The last thing you remember is the moment before you stepped out. The noise on the other side of the curtain. Your hands were still.",
    ],
  },
  Cleric: {
    Life: [
      "The last thing you remember is your hands on a wound that should have been fatal. It wasn't.",
      "The last thing you remember is watching the color come back into someone's face. You had put it there. Your god had let you.",
    ],
    Light: [
      "The last thing you remember is holding a flame in a place where no flame should have stayed lit. It did.",
      "The last thing you remember is a room going dark all at once, and reaching for something inside yourself that was brighter.",
    ],
    Knowledge: [
      "The last thing you remember is a text you weren't supposed to have read. You read it anyway. Something shifted after that.",
      "The last thing you remember is the moment you understood something you'd been studying for years. The understanding was worse than the ignorance.",
    ],
    Nature: [
      "The last thing you remember is a tree that had not grown there the day before. You left an offering at its roots.",
      "The last thing you remember is a field that was the wrong color. Not dying. Something else.",
    ],
    Tempest: [
      "The last thing you remember is standing in the rain when everyone else had gone inside. Something in the thunder felt like a response.",
      "The last thing you remember is the wind changing direction at the same moment you did. You had stopped finding that coincidental.",
    ],
    Trickery: [
      "The last thing you remember is wearing someone else's face. It fit better than your own.",
      "The last thing you remember is a room full of people who believed you completely. You weren't sure which part of it was real.",
    ],
    War: [
      "The last thing you remember is a prayer that sounded more like a threat. You meant it that way.",
      "The last thing you remember is standing in the aftermath of something. Your god's name was still in your mouth.",
    ],
  },
  Druid: {
    'Circle of the Land': [
      "The last thing you remember is the ground telling you something was wrong. You didn't have words for how you knew.",
      "The last thing you remember is a field that had gone quiet in the way fields don't. You had knelt down to listen.",
    ],
    'Circle of the Moon': [
      "The last thing you remember is running on four legs. You weren't afraid of what you were becoming. That's what worried you.",
      "The last thing you remember is the moment before you changed. The particular smell of the air. The way your hands looked for the last time.",
    ],
  },
  Fighter: {
    Champion: [
      "The last thing you remember is a fight you won before it started. The other person just didn't know it yet.",
      "The last thing you remember is standing in a yard with opponents on the ground around you and nothing left to prove to anyone there.",
    ],
    'Battle Master': [
      "The last thing you remember is watching a battle from higher ground. You already knew how it would end.",
      "The last thing you remember is drawing something in the dirt to show someone how it would go. It went exactly that way.",
    ],
    'Eldritch Knight': [
      "The last thing you remember is a word you had never spoken aloud settling into your mouth like it had always lived there. Something moved when you said it.",
      "The last thing you remember is your blade doing something you hadn't taught it to do. You filed that away for later.",
    ],
  },
  Monk: {
    'Way of the Open Hand': [
      "The last thing you remember is stillness. Not the absence of movement. The thing underneath it.",
      "The last thing you remember is a strike landing so cleanly it made no sound. The training had finally caught up to the intention.",
    ],
    'Way of Shadow': [
      "The last thing you remember is not being seen. Not hiding. Not being seen.",
      "The last thing you remember is a room full of people and the particular satisfaction of not existing in any of their thoughts.",
    ],
    'Way of the Four Elements': [
      "The last thing you remember is the air in the room changing before you touched it. No one else noticed.",
      "The last thing you remember is water bending toward your hand. The first time it had done it without being asked.",
    ],
  },
  Paladin: {
    'Oath of Devotion': [
      "The last thing you remember is making a promise no one asked you to make. You meant every word.",
      "The last thing you remember is a moment when the right thing and the easy thing were the same. You knew it wouldn't last.",
    ],
    'Oath of the Ancients': [
      "The last thing you remember is a grove that should have been dead. Something had kept it. You weren't sure yet if it was you.",
      "The last thing you remember is a tree you had visited every year of your life. You had said goodbye to it. It hadn't felt like enough.",
    ],
    'Oath of Vengeance': [
      "The last thing you remember is a name. You had been saying it so long it no longer felt like language.",
      "The last thing you remember is getting closer. You had been getting closer for years. The road had one more turn.",
    ],
  },
  Ranger: {
    Hunter: [
      "The last thing you remember is knowing you were being followed. You let it think you didn't know.",
      "The last thing you remember is a set of tracks that stopped in the middle of an open field. Nothing stops in the middle of an open field.",
    ],
    'Beast Master': [
      "The last thing you remember is an animal that should have run. It didn't. It stayed.",
      "The last thing you remember is your companion going still beside you. Not afraid. Waiting. You had learned to trust that.",
    ],
  },
  Rogue: {
    Thief: [
      "The last thing you remember is being somewhere you weren't supposed to be. You had been careful. That wasn't the problem.",
      "The last thing you remember is a locked room and the particular silence of it opening. Inside was something you hadn't expected.",
    ],
    Assassin: [
      "The last thing you remember is a face you had memorized from a distance. You were very close now.",
      "The last thing you remember is watching someone for the last time from a place they would never find. The job was almost done.",
    ],
    'Arcane Trickster': [
      "The last thing you remember is something small moving by itself. You looked away and pretended not to notice.",
      "The last thing you remember is a coin doing something coins don't do. You had let it, and checked afterward that no one had seen.",
    ],
  },
  Sorcerer: {
    'Draconic Bloodline': [
      "The last thing you remember is heat under your skin that had no source. You had stopped trying to explain it.",
      "The last thing you remember is someone flinching when you walked past them, and the growing certainty that they were right to.",
    ],
    'Wild Magic': [
      "The last thing you remember is reaching for something ordinary and watching it go wrong in a way that was almost beautiful.",
      "The last thing you remember is a room going very quiet and everyone looking at you and something in the air that you had done without meaning to.",
    ],
  },
  Warlock: {
    'The Archfey': [
      "The last thing you remember is music from a place you couldn't find. You followed it longer than you meant to.",
      "The last thing you remember is a voice that wasn't speaking to your ears. It had asked something. You had said yes before you understood the question.",
    ],
    'The Fiend': [
      "The last thing you remember is a fire you didn't start. You were watching it. You weren't afraid.",
      "The last thing you remember is a deal that felt better than it should have. The other party had smiled. You hadn't looked away.",
    ],
    'The Great Old One': [
      "The last thing you remember is a dream you had been having your whole life. This time you didn't wake up.",
      "The last thing you remember is understanding something — not knowing it, understanding it, in a way that bypassed thought entirely. The feeling passed. The change didn't.",
    ],
  },
  Wizard: {
    'School of Abjuration': [
      "The last thing you remember is a ward you had drawn to keep something out. It held. You still don't know what tried to get through.",
      "The last thing you remember is a barrier going up between you and something you had no name for. It held. You don't know for how long.",
    ],
    'School of Conjuration': [
      "The last thing you remember is a circle drawn in chalk on stone. Something answered.",
      "The last thing you remember is the chalk still in your hand and the space inside the circle not being empty anymore.",
    ],
    'School of Divination': [
      "The last thing you remember is already knowing. The letter, the visitor, the fire. You knew before any of it arrived.",
      "The last thing you remember is a vision you had spent three days refusing to look at directly. You had finally looked.",
    ],
    'School of Enchantment': [
      "The last thing you remember is a conversation that ended exactly the way you needed it to. You weren't entirely sure how.",
      "The last thing you remember is someone agreeing to something they would not have agreed to an hour before. The work was getting cleaner.",
    ],
    'School of Evocation': [
      "The last thing you remember is heat and light in your hands and the sound of something breaking that hadn't been there before.",
      "The last thing you remember is a spell completing and the particular silence afterward, the kind that means something nearby has stopped existing.",
    ],
    'School of Illusion': [
      "The last thing you remember is something you made that looked real enough to fool yourself. For a moment, it did.",
      "The last thing you remember is a face you had constructed for a specific purpose. It had worked better than expected. You had worn it a little longer than you needed to.",
    ],
    'School of Necromancy': [
      "The last thing you remember is a stillness you recognized. You had felt it before, from the other side of it.",
      "The last thing you remember is something that should have stayed down, getting up. You had asked it to. It had listened.",
    ],
    'School of Transmutation': [
      "The last thing you remember is something changing in your hands. You weren't sure if you had done it or only allowed it.",
      "The last thing you remember is a substance that was one thing becoming another. The in-between state had lasted longer than expected. You had found that interesting.",
    ],
  },
}

// BACKGROUND_SEEDS: where they were and what they were doing. Situational, not biographical.
export const BACKGROUND_SEEDS = {
  Acolyte: [
    "The candles in the shrine had all gone out at once.",
    "You were kneeling on cold stone. The prayer had just finished. Something in the room felt different afterward.",
  ],
  Criminal: [
    "You were running. You don't remember from what.",
    "You were counting something in a dim room. The number was right. That meant the job was almost done.",
  ],
  'Folk Hero': [
    "People were counting on you. You had just figured out what to do.",
    "You were standing between something and the people behind you. That was the whole of it.",
  ],
  Outlander: [
    "You were three days from the nearest village.",
    "You were making camp in a place where the trees were the wrong kind of quiet.",
  ],
  Sage: [
    "You were reading something that didn't want to be finished.",
    "You were in a library at an hour when no one else was there. The book you needed had been on the wrong shelf.",
  ],
  Soldier: [
    "You were standing a post no one else wanted.",
    "You were on a road between two places where something had already gone wrong. You hadn't reached either one yet.",
  ],
  Hermit: [
    "You had not spoken to another person in weeks. You were beginning to prefer it.",
    "You were in a place so still you could hear your own heartbeat. You had been listening to something inside it.",
  ],
  Noble: [
    "You were at a table where your name carried weight. A letter had just arrived that you hadn't decided how to answer.",
    "You were in a hall that smelled of beeswax and old wood. Everyone there needed something from you.",
  ],
  Entertainer: [
    "You were mid-performance when the room went quiet for the wrong reason. You kept playing.",
    "You were backstage in a place that smelled of sawdust and tallow. On the other side of the curtain, they were waiting.",
  ],
  Urchin: [
    "You were on a rooftop watching a street below, waiting for the man at the corner to stop looking up.",
    "You were in an alley you had mapped three weeks ago. You knew every way out. That was the point.",
  ],
  'Haunted One': [
    "You were on a road you'd taken to avoid another road. Whatever you were putting distance between yourself and, it wasn't working.",
    "You were moving at night because the days had stopped feeling safe. The thing behind you was patient.",
  ],
}

// CLOSING_LINES: the final beat of the last memory, keyed by class.
// Brief, in-voice, character-specific. Replaces the generic "You don't recall how you got here."
export const CLOSING_LINES = {
  Barbarian: [
    "Your hands are still shaking. That hasn't happened before.",
    "The rage is still in your chest. It has nowhere to go yet.",
  ],
  Bard: [
    "The words for it haven't come yet.",
    "There's a story in it. You can feel the shape of it already.",
  ],
  Cleric: [
    "Your god has not explained why.",
    "The silence where your prayers usually land feels different here.",
  ],
  Druid: [
    "The land here is wrong in a way you haven't named yet.",
    "Something in this ground knows you're here. You can feel it noticing.",
  ],
  Fighter: [
    "Your body remembers the road. Your mind doesn't.",
    "You have been in worse situations. You are trying to remember when.",
  ],
  Monk: [
    "You breathe. You center. You don't know where you are.",
    "The stillness is here if you reach for it. You reach for it.",
  ],
  Paladin: [
    "Your oath holds. Everything else is unclear.",
    "The conviction is intact. The context has changed completely.",
  ],
  Ranger: [
    "The tracks leading here don't make sense yet. They will.",
    "You note what's around you before you note where you are. Old habit.",
  ],
  Rogue: [
    "You don't know how you got here. That's never happened before.",
    "You note the exits. There are fewer than you'd like.",
  ],
  Sorcerer: [
    "Something in you recognized the mist. You don't know why.",
    "The power is quieter here. Or listening.",
  ],
  Warlock: [
    "Your patron has not answered. That's new.",
    "The voice at the edge of your awareness has gone quiet. You don't know if that's better.",
  ],
  Wizard: [
    "Your notes from the road are gone. You don't remember making them.",
    "The place in your mind where you keep useful information has nothing for this.",
  ],
}
