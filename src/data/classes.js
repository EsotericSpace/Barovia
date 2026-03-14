export const CLASS_CONFIG = {
  Barbarian: {
    hd: 12, pri: ['strength', 'constitution'],
    skillPool: ['Animal Handling', 'Athletics', 'Intimidation', 'Nature', 'Perception', 'Survival'],
    skillProfCount: 2, stProfs: ['strength', 'constitution'], expertiseCount: 0,
    combatFeature: { label: 'Rage Bonus', value: '+2 dmg' },
    features: [
      { name: 'Rage', desc: 'Advantage on STR checks and saves. Resistance to bludgeoning, piercing, and slashing damage. +2 damage bonus while raging.' },
      { name: 'Unarmored Defense', desc: 'AC equals 10 + DEX mod + CON mod when not wearing armor.' },
    ],
    narrative: 'This barbarian\'s rage is already part of them — primal fury, ancestral spirits, or berserker instinct. Barovia\'s oppressive dread presses on them constantly; their rage is one of the few things that feels real and honest here. Lean into the tension between raw emotion and the land\'s psychological horror.',
  },
  Bard: {
    hd: 8, pri: ['charisma'],
    skillPool: null,
    skillProfCount: 3, stProfs: ['dexterity', 'charisma'], expertiseCount: 2,
    combatFeature: { label: 'Bardic Insp.', value: 'd6' },
    features: [
      { name: 'Bardic Inspiration', desc: 'Give an ally a d6 they can add to any ability check, attack roll, or saving throw. Recharges on short rest.' },
      { name: 'Spellcasting', desc: 'CHA-based spellcasting. 2 cantrips known. 2 first-level spell slots. 2 spells known.' },
    ],
    narrative: 'Bards are lore-keepers and performers. In Barovia, their knowledge of stories, legends, and history is unusually valuable — the land has a long, dark past that almost no one will speak of directly. The Vistani recognize skilled performers and may open up to them. A bard\'s magic comes from inspiration and emotion, which Barovia is not short of.',
  },
  Cleric: {
    hd: 8, pri: ['wisdom'],
    skillPool: ['History', 'Insight', 'Medicine', 'Persuasion', 'Religion'],
    skillProfCount: 2, stProfs: ['wisdom', 'charisma'], expertiseCount: 0,
    combatFeature: null,
    features: [
      { name: 'Spellcasting', desc: 'WIS-based spellcasting. 3 cantrips. 2 first-level spell slots. All cleric spells are available to prepare each day.' },
      { name: 'Divine Domain', desc: 'Your deity grants a subclass at level 1. Adds bonus spells, proficiencies, and features.' },
    ],
    narrative: 'This cleric already serves a deity — that relationship is established and real. In Barovia, divine magic functions but feels strained, as if prayers travel farther before being heard. Their god sent them here, or allowed them to come, for a reason neither may fully understand yet. Undead are abundant; Turn Undead is relevant and meaningful. Do not question whether their faith is real — it is.',
  },
  Druid: {
    hd: 8, pri: ['wisdom'],
    skillPool: ['Arcana', 'Animal Handling', 'Insight', 'Medicine', 'Nature', 'Perception', 'Religion', 'Survival'],
    skillProfCount: 2, stProfs: ['intelligence', 'wisdom'], expertiseCount: 0,
    combatFeature: null,
    features: [
      { name: 'Druidic', desc: 'You know the secret language of druids, spoken only among the circle. Hidden messages can be left in nature.' },
      { name: 'Spellcasting', desc: 'WIS-based spellcasting. 2 cantrips. 2 first-level spell slots. Prepare spells each day from the druid list.' },
    ],
    narrative: 'Barovia\'s nature is deeply wrong — the forests are unnatural, animals behave strangely, and the land itself feels like it is in pain. A druid feels this wrongness acutely, like a persistent low sound no one else can hear. This is not their favored terrain; it is a corrupted one. Their connection to nature gives them unique insight into how badly Barovia has been wounded.',
  },
  Fighter: {
    hd: 10, pri: ['strength', 'dexterity'],
    skillPool: ['Acrobatics', 'Animal Handling', 'Athletics', 'History', 'Insight', 'Intimidation', 'Perception', 'Survival'],
    skillProfCount: 2, stProfs: ['strength', 'constitution'], expertiseCount: 0,
    combatFeature: { label: 'Second Wind', value: '1d10+1' },
    features: [
      { name: 'Fighting Style', desc: 'Choose one: Archery (+2 to ranged attacks), Defense (+1 AC in armor), Dueling (+2 damage with one-handed weapon), or Great Weapon Fighting.' },
      { name: 'Second Wind', desc: 'Bonus action: regain 1d10 + fighter level HP once per short rest.' },
    ],
    narrative: 'Fighters are disciplined, trained warriors. Their competence is reliable in a land full of threats. Barovia tests mental fortitude as much as physical — the horror is psychological. A fighter\'s training helps them stay functional under pressure, but no amount of sword practice prepares someone for what lives in these mists.',
  },
  Monk: {
    hd: 8, pri: ['dexterity', 'wisdom'],
    skillPool: ['Acrobatics', 'Athletics', 'History', 'Insight', 'Religion', 'Stealth'],
    skillProfCount: 2, stProfs: ['strength', 'dexterity'], expertiseCount: 0,
    combatFeature: { label: 'Martial Arts', value: 'd4' },
    features: [
      { name: 'Unarmored Defense', desc: 'AC equals 10 + DEX mod + WIS mod when not wearing armor or a shield.' },
      { name: 'Martial Arts', desc: 'Unarmed strikes and monk weapons deal 1d4. Use DEX instead of STR for attacks and damage.' },
    ],
    narrative: 'A monk\'s power comes from inner discipline and ki — a force that Barovia\'s dark energy presses against constantly. Maintaining stillness of mind here is a genuine struggle. Their unarmed combat and mobility make them unusual in a land where everyone else relies on weapons. Locals may find them unsettling or strange.',
  },
  Paladin: {
    hd: 10, pri: ['strength', 'charisma'],
    skillPool: ['Athletics', 'Insight', 'Intimidation', 'Medicine', 'Persuasion', 'Religion'],
    skillProfCount: 2, stProfs: ['wisdom', 'charisma'], expertiseCount: 0,
    combatFeature: { label: 'Lay on Hands', value: '5 HP' },
    features: [
      { name: 'Divine Sense', desc: 'As an action, sense celestials, fiends, and undead within 60ft. Uses: 1 + CHA mod per long rest.' },
      { name: 'Lay on Hands', desc: 'Touch to restore HP from a 5-point pool. Spend 5 points to cure one disease or neutralize one poison.' },
    ],
    narrative: 'This paladin has already sworn their oath — it defines them. In Barovia, undead are everywhere and a paladin\'s Divine Smite and Turn Undead are among the most potent tools available. Their oath will be tested; Barovia specializes in moral ambiguity, impossible choices, and situations where no option is clean. Play into that tension without breaking them unnecessarily.',
  },
  Ranger: {
    hd: 10, pri: ['dexterity', 'wisdom'],
    skillPool: ['Animal Handling', 'Athletics', 'Insight', 'Investigation', 'Nature', 'Perception', 'Stealth', 'Survival'],
    skillProfCount: 3, stProfs: ['strength', 'dexterity'], expertiseCount: 0,
    combatFeature: null,
    features: [
      { name: 'Favored Enemy', desc: 'Choose one creature type. Advantage on Survival checks to track them and on INT checks to recall information about them.' },
      { name: 'Natural Explorer', desc: 'Choose one favored terrain. Difficult terrain doesn\'t slow you there. Double proficiency on INT/WIS checks related to it.' },
    ],
    narrative: 'Rangers are hunters and trackers. Their favored terrain is unlikely to be Barovia\'s cursed forests, which means they are operating outside their comfort zone in a landscape that actively resists being read. Undead make for an excellent favored enemy here. Their Perception and Survival skills are constantly relevant in a land full of hidden threats.',
  },
  Rogue: {
    hd: 8, pri: ['dexterity'],
    skillPool: ['Acrobatics', 'Athletics', 'Deception', 'Insight', 'Intimidation', 'Investigation', 'Perception', 'Performance', 'Persuasion', 'Sleight of Hand', 'Stealth'],
    skillProfCount: 4, stProfs: ['dexterity', 'intelligence'], expertiseCount: 2,
    combatFeature: { label: 'Sneak Attack', value: '1d6' },
    features: [
      { name: 'Expertise', desc: 'Double your proficiency bonus on two chosen skills.' },
      { name: 'Sneak Attack', desc: '+1d6 damage once per turn when you have advantage or an ally is adjacent to the target.' },
      { name: "Thieves' Cant", desc: 'A secret criminal language of coded speech and signs, understood only by those in the trade.' },
    ],
    narrative: 'Barovia is full of secrets, locked doors, hidden passages, and people who are lying. A rogue\'s Investigation, Stealth, and social skills are among the most useful in the campaign. Thieves\' Cant may connect them to Barovian criminal networks or the Vistani, who have their own codes. Their ability to operate in the shadows makes them well-suited to a land where open confrontation is rarely the right answer.',
  },
  Sorcerer: {
    hd: 6, pri: ['charisma'],
    skillPool: ['Arcana', 'Deception', 'Insight', 'Intimidation', 'Persuasion', 'Religion'],
    skillProfCount: 2, stProfs: ['constitution', 'charisma'], expertiseCount: 0,
    combatFeature: null,
    features: [
      { name: 'Sorcerous Origin', desc: 'Your magic springs from an innate bloodline or cosmic event. Grants features at levels 1, 6, 14, and 18.' },
      { name: 'Spellcasting', desc: 'CHA-based spellcasting. 4 cantrips known. 2 first-level spell slots. 2 spells known.' },
    ],
    narrative: 'A sorcerer\'s magic is in their blood — it is not learned, it simply is. The Dark Powers that rule Barovia are drawn to innate magical talent. A sorcerer may feel the land responding to them in subtle, unsettling ways. Their wild or bloodline power pulses differently here, occasionally stronger than expected, occasionally sluggish, as if the mists are tasting it.',
  },
  Warlock: {
    hd: 8, pri: ['charisma'],
    skillPool: ['Arcana', 'Deception', 'History', 'Intimidation', 'Investigation', 'Nature', 'Religion'],
    skillProfCount: 2, stProfs: ['wisdom', 'charisma'], expertiseCount: 0,
    combatFeature: { label: 'Pact Slots', value: '2' },
    features: [
      { name: 'Otherworldly Patron', desc: 'A pact with a powerful entity grants expanded spell options and subclass features.' },
      { name: 'Pact Magic', desc: 'CHA-based spellcasting. 2 spell slots that recover on a short rest. 2 spells known.' },
    ],
    narrative: 'The pact is already made — it is not a future event, it is who this character is. Their patron (Fiend, Great Old One, or Archfey) is a constant presence, a voice or sensation at the edge of awareness. In Barovia, that patron may have sent them here deliberately, or may be unusually quiet — the Dark Powers do not share their domain easily. The warlock should feel the tension between their patron\'s agenda and Strahd\'s absolute control of this land. Eldritch Blast is their reliable tool; lean into the alien quality of their power.',
  },
  Wizard: {
    hd: 6, pri: ['intelligence'],
    skillPool: ['Arcana', 'History', 'Insight', 'Investigation', 'Medicine', 'Religion'],
    skillProfCount: 2, stProfs: ['intelligence', 'wisdom'], expertiseCount: 0,
    combatFeature: null,
    features: [
      { name: 'Spellcasting', desc: 'INT-based spellcasting. 3 cantrips. 2 first-level spell slots. Spellbook holds 6 spells; prepare INT mod + wizard level per day.' },
      { name: 'Arcane Recovery', desc: 'Once per day on a short rest, recover spell slots totaling up to half your wizard level (round up).' },
    ],
    narrative: 'Wizards are scholars — their power comes from study, not instinct. Their spellbook is their most prized possession and their Arcana skill makes them one of the few characters who might piece together what Barovia actually is. Ancient texts, strange inscriptions, and the arcane oddities of the land are their domain. They may recognize that the mists are not natural, that the magic here follows rules that predate conventional arcane theory.',
  },
}

export const CLASSES = Object.keys(CLASS_CONFIG)
