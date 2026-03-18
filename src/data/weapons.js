// Standard PHB starting weapons per class.
// proficiencies: weapon categories the class can use.
// starting: the default first-choice weapons for chargen display.

export const CLASS_WEAPONS = {
  Barbarian: {
    proficiencies: ['Simple weapons', 'Martial weapons'],
    starting: ['Greataxe', 'Two handaxes'],
  },
  Bard: {
    proficiencies: ['Simple weapons', 'Hand crossbow', 'Longsword', 'Rapier', 'Shortsword'],
    starting: ['Rapier', 'Dagger'],
  },
  Cleric: {
    proficiencies: ['Simple weapons'],
    starting: ['Mace', 'Light crossbow'],
  },
  Druid: {
    proficiencies: ['Clubs', 'Daggers', 'Darts', 'Javelins', 'Maces', 'Quarterstaffs', 'Scimitars', 'Sickles', 'Slings', 'Spears'],
    starting: ['Scimitar'],
  },
  Fighter: {
    proficiencies: ['Simple weapons', 'Martial weapons'],
    starting: ['Longsword', 'Shield', 'Light crossbow'],
  },
  Monk: {
    proficiencies: ['Simple weapons', 'Shortsword'],
    starting: ['Shortsword', '10 darts'],
  },
  Paladin: {
    proficiencies: ['Simple weapons', 'Martial weapons'],
    starting: ['Longsword', 'Shield', 'Five javelins'],
  },
  Ranger: {
    proficiencies: ['Simple weapons', 'Martial weapons'],
    starting: ['Two shortswords', 'Longbow', '20 arrows'],
  },
  Rogue: {
    proficiencies: ['Simple weapons', 'Hand crossbow', 'Longsword', 'Rapier', 'Shortsword'],
    starting: ['Rapier', 'Shortbow', '20 arrows', 'Two daggers'],
  },
  Sorcerer: {
    proficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
    starting: ['Light crossbow', '20 bolts', 'Two daggers'],
  },
  Warlock: {
    proficiencies: ['Simple weapons'],
    starting: ['Light crossbow', '20 bolts', 'Two daggers'],
  },
  Wizard: {
    proficiencies: ['Daggers', 'Darts', 'Slings', 'Quarterstaffs', 'Light crossbows'],
    starting: ['Quarterstaff'],
  },
}
