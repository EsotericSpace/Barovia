import { vallaki } from './vallaki.js'
import { krezk } from './krezk.js'
import { abbey } from './abbey.js'
import { castleRavenloft } from './castleRavenloft.js'
import { amberTemple } from './amberTemple.js'
import { deathHouse } from './deathHouse.js'
import { villageOfBarovia } from './villageOfBarovia.js'
import { tserPool } from './tserPool.js'
import { oldBonegrinder } from './oldBonegrinder.js'
import { wizardOfWines } from './wizardOfWines.js'
import { vanRichtensTower } from './vanRichtensTower.js'
import { yesterHill } from './yesterHill.js'
import { argynvostholt } from './argynvostholt.js'
import { werewolfDen } from './werewolfDen.js'
import { tsolenkaPass } from './tsolenkaPass.js'
import { ruinsOfBerez } from './ruinsOfBerez.js'

export const LOCATIONS = {
  'death-house': deathHouse,
  'village-of-barovia': villageOfBarovia,
  'tser-pool': tserPool,
  'vallaki': vallaki,
  'krezk': krezk,
  'abbey': abbey,
  'old-bonegrinder': oldBonegrinder,
  'wizard-of-wines': wizardOfWines,
  'van-richtens-tower': vanRichtensTower,
  'yester-hill': yesterHill,
  'argynvostholt': argynvostholt,
  'werewolf-den': werewolfDen,
  'tsolenka-pass': tsolenkaPass,
  'ruins-of-berez': ruinsOfBerez,
  'amber-temple': amberTemple,
  'castle-ravenloft': castleRavenloft,
}

// Default location flow — rough narrative order
// DM should use [LOCATION:slug] tag to advance
export const LOCATION_ORDER = [
  'death-house',
  'village-of-barovia',
  'tser-pool',
  'vallaki',
  'krezk',
  'abbey',
  'old-bonegrinder',
  'wizard-of-wines',
  'van-richtens-tower',
  'yester-hill',
  'argynvostholt',
  'werewolf-den',
  'tsolenka-pass',
  'ruins-of-berez',
  'amber-temple',
  'castle-ravenloft',
]