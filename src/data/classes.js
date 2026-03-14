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
  },
}

export const CLASSES = Object.keys(CLASS_CONFIG)
