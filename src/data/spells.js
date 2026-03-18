// Spell assignments by class + background.
// Counts are RAW level 1: Bard 2c/2s, Cleric 3c/3s, Druid 2c/3s,
// Sorcerer 4c/2s, Warlock 2c/2s, Wizard 3c/3s.
// shortRest: true means slots recover on short rest (Warlock).

export const SPELL_ASSIGNMENTS = {
  Bard: {
    Acolyte:    { cantrips: ['Vicious Mockery', 'Mage Hand'],     spells: ['Healing Word', 'Bane'] },
    Criminal:   { cantrips: ['Vicious Mockery', 'Minor Illusion'], spells: ['Charm Person', 'Disguise Self'] },
    'Folk Hero':{ cantrips: ['Vicious Mockery', 'Thunderclap'],   spells: ['Healing Word', 'Heroism'] },
    Outlander:  { cantrips: ['Vicious Mockery', 'Mage Hand'],     spells: ['Speak with Animals', 'Longstrider'] },
    Sage:       { cantrips: ['Vicious Mockery', 'Mage Hand'],     spells: ['Identify', 'Comprehend Languages'] },
    Soldier:    { cantrips: ['Vicious Mockery', 'Thunderclap'],   spells: ['Heroism', 'Dissonant Whispers'] },
    Hermit:     { cantrips: ['Vicious Mockery', 'Minor Illusion'], spells: ['Dissonant Whispers', 'Detect Magic'] },
  },
  Cleric: {
    Acolyte:    { cantrips: ['Sacred Flame', 'Guidance', 'Thaumaturgy'], spells: ['Cure Wounds', 'Bless', 'Detect Evil and Good'] },
    Criminal:   { cantrips: ['Sacred Flame', 'Guidance', 'Toll the Dead'], spells: ['Bane', 'Command', 'Inflict Wounds'] },
    'Folk Hero':{ cantrips: ['Sacred Flame', 'Guidance', 'Mending'],      spells: ['Cure Wounds', 'Bless', 'Shield of Faith'] },
    Outlander:  { cantrips: ['Sacred Flame', 'Guidance', 'Resistance'],   spells: ['Cure Wounds', 'Create or Destroy Water', 'Protection from Evil and Good'] },
    Sage:       { cantrips: ['Sacred Flame', 'Guidance', 'Thaumaturgy'],  spells: ['Detect Magic', 'Detect Evil and Good', 'Command'] },
    Soldier:    { cantrips: ['Sacred Flame', 'Guidance', 'Toll the Dead'], spells: ['Guiding Bolt', 'Bless', 'Shield of Faith'] },
    Hermit:     { cantrips: ['Sacred Flame', 'Guidance', 'Resistance'],   spells: ['Detect Evil and Good', 'Protection from Evil and Good', 'Inflict Wounds'] },
  },
  Druid: {
    Acolyte:    { cantrips: ['Druidcraft', 'Guidance'],       spells: ['Cure Wounds', 'Detect Poison and Disease', 'Speak with Animals'] },
    Criminal:   { cantrips: ['Druidcraft', 'Poison Spray'],   spells: ['Entangle', 'Charm Person', 'Fog Cloud'] },
    'Folk Hero':{ cantrips: ['Druidcraft', 'Shillelagh'],     spells: ['Cure Wounds', 'Goodberry', 'Thunderwave'] },
    Outlander:  { cantrips: ['Druidcraft', 'Produce Flame'],  spells: ['Speak with Animals', 'Longstrider', 'Entangle'] },
    Sage:       { cantrips: ['Druidcraft', 'Guidance'],       spells: ['Detect Magic', 'Detect Poison and Disease', 'Faerie Fire'] },
    Soldier:    { cantrips: ['Druidcraft', 'Thorn Whip'],     spells: ['Entangle', 'Thunderwave', 'Cure Wounds'] },
    Hermit:     { cantrips: ['Druidcraft', 'Resistance'],     spells: ['Detect Magic', 'Fog Cloud', 'Speak with Animals'] },
  },
  Sorcerer: {
    Acolyte:    { cantrips: ['Fire Bolt', 'Mage Hand', 'Light', 'Prestidigitation'],         spells: ['Shield', 'False Life'] },
    Criminal:   { cantrips: ['Fire Bolt', 'Mage Hand', 'Minor Illusion', 'Friends'],         spells: ['Disguise Self', 'Charm Person'] },
    'Folk Hero':{ cantrips: ['Fire Bolt', 'Shocking Grasp', 'Mage Hand', 'Prestidigitation'], spells: ['Thunderwave', 'Shield'] },
    Outlander:  { cantrips: ['Fire Bolt', 'Ray of Frost', 'Mage Hand', 'Poison Spray'],      spells: ['Fog Cloud', 'Mage Armor'] },
    Sage:       { cantrips: ['Fire Bolt', 'Mage Hand', 'Minor Illusion', 'Prestidigitation'], spells: ['Detect Magic', 'Comprehend Languages'] },
    Soldier:    { cantrips: ['Fire Bolt', 'Shocking Grasp', 'Chill Touch', 'Mage Hand'],     spells: ['Magic Missile', 'Shield'] },
    Hermit:     { cantrips: ['Chill Touch', 'Ray of Frost', 'Mage Hand', 'Prestidigitation'], spells: ['False Life', 'Fog Cloud'] },
  },
  Warlock: {
    Acolyte:    { cantrips: ['Eldritch Blast', 'Toll the Dead'],   spells: ['Hex', 'Armor of Agathys'] },
    Criminal:   { cantrips: ['Eldritch Blast', 'Minor Illusion'],  spells: ['Hex', 'Arms of Hadar'] },
    'Folk Hero':{ cantrips: ['Eldritch Blast', 'Toll the Dead'],   spells: ['Hex', 'Hellish Rebuke'] },
    Outlander:  { cantrips: ['Eldritch Blast', 'Chill Touch'],     spells: ['Hex', 'Armor of Agathys'] },
    Sage:       { cantrips: ['Eldritch Blast', 'Mage Hand'],       spells: ['Hex', 'Comprehend Languages'] },
    Soldier:    { cantrips: ['Eldritch Blast', 'Toll the Dead'],   spells: ['Hex', 'Hellish Rebuke'] },
    Hermit:     { cantrips: ['Eldritch Blast', 'Chill Touch'],     spells: ['Hex', 'Arms of Hadar'] },
  },
  Wizard: {
    Acolyte:    { cantrips: ['Fire Bolt', 'Mage Hand', 'Light'],          spells: ['Detect Magic', 'Identify', 'Shield'] },
    Criminal:   { cantrips: ['Minor Illusion', 'Mage Hand', 'Prestidigitation'], spells: ['Disguise Self', 'Charm Person', 'Grease'] },
    'Folk Hero':{ cantrips: ['Fire Bolt', 'Mage Hand', 'Mending'],        spells: ['Shield', 'Magic Missile', 'Burning Hands'] },
    Outlander:  { cantrips: ['Fire Bolt', 'Ray of Frost', 'Mage Hand'],   spells: ['Fog Cloud', 'Detect Magic', 'Find Familiar'] },
    Sage:       { cantrips: ['Fire Bolt', 'Mage Hand', 'Prestidigitation'], spells: ['Detect Magic', 'Identify', 'Comprehend Languages'] },
    Soldier:    { cantrips: ['Fire Bolt', 'Shocking Grasp', 'Mage Hand'], spells: ['Magic Missile', 'Shield', 'Burning Hands'] },
    Hermit:     { cantrips: ['Chill Touch', 'Mage Hand', 'Minor Illusion'], spells: ['False Life', 'Detect Magic', 'Find Familiar'] },
  },
}

export const SPELLCASTING_CLASSES = new Set(Object.keys(SPELL_ASSIGNMENTS))

// Spells added or substituted based on subclass choice.
// Cleric: domain spells are always prepared — appended to known list.
// Warlock: patron's signature level-1 spell replaces the background second spell; Hex stays.
export const SUBCLASS_SPELLS = {
  Cleric: {
    Life:      ['Bless', 'Cure Wounds'],
    Light:     ['Burning Hands', 'Faerie Fire'],
    Knowledge: ['Command', 'Identify'],
    Nature:    ['Animal Friendship', 'Speak with Animals'],
    Tempest:   ['Fog Cloud', 'Thunderwave'],
    Trickery:  ['Charm Person', 'Disguise Self'],
    War:       ['Divine Favor', 'Shield of Faith'],
  },
  Warlock: {
    'The Archfey':       ['Sleep'],
    'The Fiend':         ['Burning Hands'],
    'The Great Old One': ['Dissonant Whispers'],
  },
}

export function applySubclassSpells(cls, subclass, cantrips, spells) {
  const additions = SUBCLASS_SPELLS[cls]?.[subclass] ?? []
  if (!additions.length) return { cantrips, spells }
  if (cls === 'Cleric') {
    return { cantrips, spells: [...new Set([...spells, ...additions])] }
  }
  if (cls === 'Warlock') {
    return { cantrips, spells: ['Hex', ...additions] }
  }
  return { cantrips, spells }
}
