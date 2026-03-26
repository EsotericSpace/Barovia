export const tserPool = {
  id: 'tser-pool',
  name: 'Tser Pool Encampment',
  type: 'wilderness',
  avgLevel: [2, 3],
  status: 'available',
  nearby: ['village-of-barovia', 'vallaki'],
  levelTriggers: [
    { level: 4, milestone: 'tarokka-reading', condition: "receiving Madam Eva's tarokka reading at Tser Pool" },
  ],
  summary: `A Vistani encampment on the banks of a still mountain lake. Madam Eva holds court here — the most genuine prophet in Barovia, and one of the oldest living things in the valley. The camp is safe. The reading she gives is not.`,
  entry: `TSER POOL ENCAMPMENT (avg level 2–3)

ATMOSPHERE
The camp sits on a bend in the Svalich Road, beside a dark lake that reflects nothing. Colorful wagons, firelight, the smell of woodsmoke and roasting meat. Music drifts through the trees. After the Village of Barovia, it feels almost warm. That warmth is real — and it should unsettle the player, because nothing else here has been.

STORY
The party comes here for Madam Eva's reading. She already knows they're coming. She may already know why. The reading she gives will shape the entire campaign — it fixes the location of the three artifacts and their ally. Narrate it with weight.

KEY NPCS
Madam Eva — Ancient Vistana seer. Sits in the largest tent, surrounded by silk and candlelight. Her cards are always out. She is not performing mysticism — she is receiving it. She speaks in riddles not by choice but because the truth doesn't arrive in plain language. She will not be rushed. She will not be threatened. She has seen worse than whatever the player brings.

Arturi Radanavich — Young Vistana man, Eva's great-grandnephew. Acts as a gatekeeper. Can be charmed, persuaded, or bypassed entirely — Eva usually lets people through before Arturi finishes objecting.

GENERAL
The camp is safe from Strahd's direct interference — Vistani hospitality is one of the few conventions he honors. The players can rest here, trade, and ask questions. Vistani here are curious about outsiders but loyal to their own.

THE READING
Fire [TAROKKA] when Madam Eva lays the cards. She draws five: three from the common deck (left, top, right) and two from the high deck (bottom, center). Narrate each card dramatically as she turns it — the public text is what she says aloud. Do not reveal the secret text. The player will have to find what the cards point to.

After the reading, Eva says nothing more about the artifacts. If pressed, she says only: "The cards have spoken. Whether you listen is your own affair."`
}
