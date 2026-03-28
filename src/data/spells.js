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

export const SPELL_DESCRIPTIONS = {
  // Cantrips
  'Chill Touch':      'Ranged spell attack, 120 ft. 1d8 necrotic damage. Target can\'t regain HP until your next turn. Undead have disadvantage on attacks against you.',
  'Druidcraft':       'Minor nature effects: predict weather, cause a flower to bloom, light a campfire, or create a harmless sensory effect.',
  'Eldritch Blast':   'Ranged spell attack, 120 ft. 1d10 force damage. Extra beams at levels 5, 11, and 17.',
  'Fire Bolt':        'Ranged spell attack, 120 ft. 1d10 fire damage. Ignites flammable objects.',
  'Friends':          'Advantage on Charisma checks against one non-hostile creature for 1 minute. It knows you used magic afterward.',
  'Guidance':         'Touch a willing creature. It adds 1d4 to one ability check before the spell ends.',
  'Light':            'Touch an object. It sheds bright light in a 20 ft radius for 1 hour. A hostile creature can resist.',
  'Mage Hand':        'Spectral hand, 30 ft range. Manipulate objects, open containers, retrieve items. Can\'t attack or carry more than 10 lbs.',
  'Mending':          'Repair a single break or tear in an object. Magical breaks are not mended.',
  'Minor Illusion':   'Create a sound or an image within 30 ft for 1 minute. Investigation check to see through it.',
  'Poison Spray':     '10 ft range. Target makes CON save or takes 1d12 poison damage.',
  'Prestidigitation': 'Minor magical tricks: clean or soil, chill or warm, produce a trinket, create a mark, or light a small flame.',
  'Produce Flame':    'Conjure a flame that sheds light 10 ft. Hurl it as a ranged spell attack (30 ft) for 1d8 fire damage.',
  'Ray of Frost':     'Ranged spell attack, 60 ft. 1d8 cold damage. Target\'s speed reduced by 10 ft until your next turn.',
  'Resistance':       'Touch a willing creature. It adds 1d4 to one saving throw before the spell ends.',
  'Sacred Flame':     'Target within 60 ft makes DEX save or takes 1d8 radiant damage. No benefit from cover.',
  'Shillelagh':       'Bonus action. Your club or quarterstaff becomes magical: use your spellcasting modifier for attacks and deals 1d8 damage.',
  'Shocking Grasp':   'Melee spell attack. 1d8 lightning damage. Target can\'t take reactions until its next turn. Advantage against metal armor.',
  'Thaumaturgy':      'Minor miracles: amplify your voice, cause tremors, change eye color, make flames flicker, or open an unlocked door.',
  'Thorn Whip':       'Melee spell attack, 30 ft reach. 1d6 piercing damage. Pull a Large or smaller target 10 ft toward you.',
  'Thunderclap':      '5 ft radius burst. Creatures must make CON save or take 1d6 thunder damage. Audible 100 ft away.',
  'Toll the Dead':    'Target within 60 ft makes WIS save or takes 1d8 necrotic damage. Deals 1d12 instead if the target is already missing HP.',
  'Vicious Mockery':  'Target within 60 ft makes WIS save or takes 1d4 psychic damage and has disadvantage on its next attack roll.',
  // Level 1 spells
  'Animal Friendship':                  'One beast with INT 3 or lower makes WIS save or is charmed for 24 hours.',
  'Armor of Agathys':                   'Gain 5 temporary HP. Any creature that hits you in melee takes 5 cold damage while the temp HP last.',
  'Arms of Hadar':                      '10 ft burst. STR save or 2d6 necrotic damage, can\'t take reactions until next turn. Half damage on success.',
  'Bane':                               'Up to 3 creatures make CHA saves or subtract 1d4 from attack rolls and saving throws for 1 minute. Concentration.',
  'Bless':                              'Up to 3 creatures add 1d4 to attack rolls and saving throws for 1 minute. Concentration.',
  'Burning Hands':                      '15 ft cone. DEX save or 3d6 fire damage, half on success. Ignites flammable objects.',
  'Charm Person':                       'CHA save (with advantage if in combat). Target is charmed for 1 hour or until harmed. Knows afterward.',
  'Command':                            'WIS save. Give a one-word command: Approach, Drop, Flee, Grovel, or Halt. Target obeys on its next turn.',
  'Comprehend Languages':               '1 hour. Understand any spoken language and any written text you touch. Can be cast as ritual.',
  'Create or Destroy Water':            'Create or destroy 10 gallons of water in an open container, or extinguish nonmagical flames in a 30 ft cube.',
  'Cure Wounds':                        'Touch. Restore 1d8 + spellcasting modifier HP.',
  'Detect Evil and Good':               'Sense aberrations, celestials, elementals, fey, fiends, and undead within 30 ft for 10 minutes. Concentration.',
  'Detect Magic':                       'Sense the presence of magic within 30 ft and see its aura for 10 minutes. Concentration. Can be cast as ritual.',
  'Detect Poison and Disease':          'Sense poisons, poisonous creatures, and diseases within 30 ft for 10 minutes. Concentration. Can be cast as ritual.',
  'Disguise Self':                      'Change your appearance until dispelled or another spell is cast. Doesn\'t hold up to physical inspection.',
  'Dissonant Whispers':                 'WIS save. 3d6 psychic damage on fail and must use its reaction to flee. Half damage and no movement on success.',
  'Divine Favor':                       'Bonus action. Your weapon attacks deal an extra 1d4 radiant damage for 1 minute. Concentration.',
  'Entangle':                           '20 ft square of grasping vines, 90 ft range. DEX save or restrained for 1 minute. Difficult terrain. Concentration.',
  'Faerie Fire':                        '20 ft cube. DEX save or outlined in colored light for 1 minute. Attacks against lit creatures have advantage. Concentration.',
  'False Life':                         'Gain 1d4 + 4 temporary HP for 1 hour.',
  'Find Familiar':                      'Summon a spirit as a Tiny animal. Share its senses, deliver touch spells through it. Can be cast as ritual.',
  'Fog Cloud':                          '20 ft radius of heavy fog, 120 ft range. Heavily obscured for 1 hour or until dispersed by wind. Concentration.',
  'Goodberry':                          'Create up to 10 berries. Each restores 1 HP and provides a day\'s nourishment. Berries last 24 hours.',
  'Grease':                             '10 ft square slick surface. DEX save or fall prone. Difficult terrain for 1 minute.',
  'Guiding Bolt':                       'Ranged spell attack, 120 ft. 4d6 radiant damage. Next attack roll against the target before your next turn has advantage.',
  'Healing Word':                       'Bonus action. Restore 1d4 + spellcasting modifier HP to a creature within 60 ft.',
  'Hellish Rebuke':                     'Reaction when you take damage. The attacker makes DEX save or takes 2d10 fire damage, half on success.',
  'Heroism':                            'Willing creature is immune to frightened and gains temporary HP equal to your spellcasting modifier at the start of each turn. Concentration.',
  'Hex':                                'Bonus action, 90 ft. Curse a target: your attacks deal extra 1d6 necrotic damage to it and it has disadvantage on a chosen ability. Concentration.',
  'Identify':                           'Learn a magic item\'s properties, charges, and curses. Also detect whether a creature is under a spell. Can be cast as ritual.',
  'Inflict Wounds':                     'Melee spell attack. 3d10 necrotic damage.',
  'Longstrider':                        'Touch. Target\'s speed increases by 10 ft for 1 hour.',
  'Mage Armor':                         'Touch an unarmored willing creature. Its AC becomes 13 + DEX modifier for 8 hours.',
  'Magic Missile':                      'Three darts automatically hit, each dealing 1d4 + 1 force damage. Can target the same or different creatures.',
  'Protection from Evil and Good':      'Touch. Protected against aberrations, celestials, elementals, fey, fiends, and undead for 10 minutes. Concentration.',
  'Shield':                             'Reaction when hit by an attack or targeted by Magic Missile. +5 AC until your next turn. Immune to Magic Missile.',
  'Shield of Faith':                    'Bonus action. A creature within 60 ft gains +2 AC for 10 minutes. Concentration.',
  'Sleep':                              'Roll 5d8. Creatures at or below the total HP threshold fall unconscious for 1 minute, lowest HP first. No effect on undead.',
  'Speak with Animals':                 'For 10 minutes, communicate with beasts. They share what they perceive and remember, in limited terms.',
  'Thunderwave':                        '15 ft cube originating from you. CON save or 2d8 thunder damage and pushed 10 ft back. Half on success. Audible 300 ft.',
}

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
