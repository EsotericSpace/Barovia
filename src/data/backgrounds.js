export const BACKGROUNDS = {
  Acolyte: {
    desc: "You have spent your life in service to a temple or to a god, and act as an intermediary between the realm of the holy and the mortal world, performing sacred rites in order to conduct worshipers into the presence of the divine.",
    feature: "Shelter of the Faithful",
    featureDesc:
      "As an acolyte, you command respect from those who share your faith. You and your companions can receive free healing and care at temples or shrines, though you must provide any material components needed for spells.",
    profs: ["Insight", "Religion"],
    equip: [
      "Holy symbol", "Prayer book", "5 sticks of incense", "Vestments", "Set of common clothes", "15 gp"],
    personality: [
      "I idolize a particular hero of my faith and constantly refer to their deeds.",
      "I can find common ground between the fiercest enemies, always seeking peace.",
      "I see omens in every event and action. The gods try to speak to us.",
      "Nothing can shake my optimistic attitude.",
      "I quote (or misquote) sacred texts and proverbs in almost every situation.",
      "I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.",
      "I've enjoyed fine food, drink, and high society among my temple's elite. Rough living grates on me.",
      "I've spent so long in the temple that I have little practical experience dealing with people in the outside world."
    ],
    ideal: [
      "Tradition. Ancient rites of worship must be preserved.",
      "Charity. I always help those in need, no matter the cost.",
      "Change. We must help bring about what the gods are driving toward.",
      "Power. I hope to one day rise to the top of my faith's hierarchy.",
      "Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well.",
      "Aspiration. I seek to prove myself worthy of my god's favor by matching my actions against their teachings."
    ],
    bond: [
      "I would die to recover an ancient relic of my faith.",
      "I will get revenge on the corrupt temple hierarchy who branded me a heretic.",
      "I owe my life to the priest who took me in when my parents died.",
      "Everything I do is for the common people.",
      "I will do anything to protect the temple where I served.",
      "I seek to preserve a sacred text that my enemies consider heretical and seek to destroy."
    ],
    flaw: [
      "I judge others harshly, and myself even more severely.",
      "I put too much trust in those who wield power in my temple.",
      "My piety sometimes leads me to blindly trust those who profess faith.",
      "I am inflexible in my thinking.",
      "I am suspicious of strangers and expect the worst of them.",
      "Once I pick a goal, I become obsessed with it to the detriment of everything else in my life."
    ],
  },

  Criminal: {
    desc: "You have an experienced history of breaking the law, and have contacts within the criminal underworld. You have survived up to this point by flouting the rules and regulations of society.",
    feature: "Criminal Contact",
    featureDesc:
      "You know how to find the people who exist in the margins. Given time in any settlement, you can identify who knows more than they say and what a favor is worth.",
    profs: ["Deception", "Stealth"],
    equip: [
      "Crowbar", "Thieves' tools", "Dark clothes with hood", "Gaming dice", "Belt pouch", "15 gp"],
    personality: [
      "I always have a plan for when things go wrong.",
      "I am always calm, no matter the situation.",
      "The first thing I do in a new place is note the locations of everything valuable.",
      "I would rather make a new friend than a new enemy.",
      "I am incredibly slow to trust. Those who seem the fairest often have the most to hide.",
      "I don't pay attention to the risks in a situation. Never tell me the odds.",
      "The best way to get me to do something is to tell me I can't do it.",
      "I blow up at the slightest insult."
    ],
    ideal: [
      "Honor. I don't steal from others in the trade.",
      "Freedom. Chains are meant to be broken.",
      "Charity. I steal from the wealthy so that I can help people in need.",
      "Greed. I will do whatever it takes to become wealthy.",
      "People. I'm loyal to my friends, not to any ideals, and everyone else can take a trip down the Styx for all I care.",
      "Redemption. There's a spark of good in everyone."
    ],
    bond: [
      "I'm paying off an old debt to a generous benefactor.",
      "My ill-gotten gains go to support my family.",
      "Something important was taken from me and I aim to steal it back.",
      "I will become the greatest thief that ever lived.",
      "I'm guilty of a terrible crime. I hope I can redeem myself for it.",
      "Someone I loved died because of I mistake I made. That will never happen again."
    ],
    flaw: [
      "When I see something valuable, I can only think of how to steal it.",
      "When forced to choose between money and friends, I usually choose money.",
      "If there's a plan, I'll forget it. If I don't forget it, I'll ignore it.",
      "I have a tell that reveals when I'm lying.",
      "I turn tail and run when things look bad.",
      "An innocent person is in prison for a crime that I committed. I'm okay with that."
    ],
  },

  Entertainer: {
    desc: "You thrive in front of an audience and know how to entrance them, entertain them, and even inspire them. The road has been your stage for as long as you can remember.",
    feature: "By Popular Demand",
    featureDesc:
      "You can always find a place to perform and receive modest lodging and food in exchange. Those who've seen your act remember you. Taverns and inns are open to you.",
    profs: ["Acrobatics", "Performance"],
    equip: ["Musical instrument", "Favor from an admirer", "Costume", "15 gp"],
    personality: [
      "I know a story relevant to almost every situation.",
      "Whenever I come to a new place, I collect local songs and tales.",
      "I'm a hopeless romantic, always searching for that special someone.",
      "Nobody stays angry at me for long, since I can defuse any tension with the right word.",
      "I love a good insult, even one directed at me.",
      "I get bitter if I'm not the center of attention.",
      "I'll settle for nothing less than perfection.",
      "I change my mood or my mind as quickly as I change key in a song."
    ],
    ideal: [
      "Beauty. When I perform, I make the world better than it was.",
      "Tradition. The old songs and stories carry real wisdom. They should be preserved.",
      "Creativity. The world needs new ideas and bold action.",
      "Greed. I'm only in it for the money and fame.",
      "People. I like seeing the smiles on people's faces when I perform. That's enough.",
      "Honesty. Art should reflect the soul; it should come from within and reveal who we really are."
    ],
    bond: [
      "My instrument is my most prized possession, and it reminds me of someone I love.",
      "Someone stole my most prized possession, and someday I'll get it back.",
      "I want to be famous, whatever it takes.",
      "I idolize a hero of the old songs and measure my deeds against theirs.",
      "I will do anything to prove myself superior to my hated rival.",
      "I would do anything for the other members of my old troupe."
    ],
    flaw: [
      "I'll do anything to win fame and renown.",
      "I'm a sucker for a pretty face.",
      "A scandal prevents me from ever going home again. That kind of trouble seems to follow me around.",
      "I once satirized a noble who still wants my head. It was worth it.",
      "I have trouble keeping my true feelings hidden. My sharp tongue lands me in trouble.",
      "Despite my best efforts, I am unreliable to my friends."
    ],
  },

  "Folk Hero": {
    desc: "You come from a humble background, but you are destined for more. The people of your home village regard you as their champion. You stood against a tyrant, a monster, or some other threat and won.",
    feature: "Rustic Hospitality",
    featureDesc:
      "Since you come from the ranks of common folk, you fit in among them easily. They will shelter you from those who hunt you, share their food, and hide you, though they won't risk their lives for you.",
    profs: ["Animal Handling", "Survival"],
    equip: ["Artisan's tools", "Shovel", "Iron pot", "Common clothes", "10 gp"],
    personality: [
      "I judge people by their actions, not their words.",
      "If someone is in trouble, I'm always ready to help.",
      "When I set my mind to something, I follow through no matter what.",
      "I have a strong sense of fair play and seek equitable solutions.",
      "I'm confident in my own abilities and do what I can to instill confidence in others.",
      "Thinking is for other people. I prefer action.",
      "I misuse long words in an attempt to sound smarter.",
      "I get bored easily. When am I going to get on with my destiny?"
    ],
    ideal: [
      "Respect. People deserve dignity regardless of their station.",
      "Fairness. No one is above the law.",
      "Freedom. Tyrants must not oppress the people.",
      "Might. If I become strong, I can take what I want. What I deserve.",
      "Sincerity. There's no good in pretending to be something I'm not.",
      "Destiny. Nothing and no one can steer me away from my higher calling."
    ],
    bond: [
      "I have a family somewhere, but no idea where they are now.",
      "I worked the land, I love the land, and I will protect the land.",
      "A proud noble once gave me a beating. I will avenge myself on bullies.",
      "My tools are symbols of my past and I carry them always.",
      "I protect those who cannot protect themselves.",
      "I wish my childhood sweetheart had come with me to pursue my destiny."
    ],
    flaw: [
      "The tyrant who rules my land will stop at nothing to see me killed.",
      "I'm convinced of my destiny and blind to my shortcomings.",
      "People from my past know my shameful secret, so I can never go home.",
      "I have a weakness for the vices of the city, especially hard drink.",
      "Secretly, I believe that things would be better if I were a tyrant lording over the land.",
      "I have trouble trusting my allies."
    ],
  },

  "Haunted One": {
    desc: "You are haunted by something so terrible that you dare not speak of it. You’ve tried to bury it and run away from it, to no avail. The burden has taken its toll, isolating you from most people and making you question your sanity.",
    feature: "Heart of Darkness",
    featureDesc:
      "Those who look into your eyes can see that you have faced unimaginable horror and that you are no stranger to darkness. Commoners will extend you every courtesy and do their utmost to help you and will even take up arms to fight alongside you, should you find yourself facing an enemy alone.",
    profs: ["Arcana", "Survival"],
    equip: ["Crowbar", "Hammer", "3 wooden stakes", "Flask of holy water", "Steel mirror", "Manacles", "Tinderbox", "5 torches", "5 days' rations", "A trinket of special significance", "Common clothes", "1 sp"],
    personality: [
      "I don't run from evil. Evil runs from me.",
      "I like to read and memorize poetry. It keeps me calm and brings me fleeting moments of happiness.",
      "I spend money freely and live life to the fullest, knowing that tomorrow I might die.",
      "I live for the thrill of the hunt.",
      "I don’t talk about the thing that torments me. I’d rather not burden others with my curse.",
      "I expect danger around every corner.",
      "I refuse to become a victim, and I will not allow others to be victimized.",
      "I put no trust in divine beings."
    ],
    ideal: [
      "Selflessness. I try to help those in need, no matter what the personal cost.",
      "Determination. I’ll stop the spirits that haunt me or die trying.",
      "Greater Good. I kill monsters to make the world a safer place, and to exorcise my own demons.",
      "Freedom. I have a dark calling that puts me above the law.",
      "Logic. I like to know my enemy’s capabilities and weaknesses before rushing into battle.",
      "Destruction. I’m a monster that destroys other monsters, and anything else that gets in my way."
    ],
    bond: [
      "I keep my thoughts and discoveries in a journal. My journal is my legacy.",
      "I would sacrifice my life and my soul to protect the innocent.",
      "My torment drove away the person I love. I strive to win back the love I’ve lost.",
      "A terrible guilt consumes me. I hope that I can find redemption through my actions.",
      "There’s evil in me, I can feel it. It must never be set free.",
      "I have a child to protect. I must make the world a safer place for them."
    ],
    flaw: [
      "I have certain rituals that I must follow every day. I can never break them.",
      "I assume the worst in people.",
      "I feel no compassion for the dead. They’re the lucky ones.",
      "I have an addiction.",
      "I am a purveyor of doom and gloom who lives in a world without hope.",
      "I talk to spirits that no one else can see."
    ],
  },

  Hermit: {
    desc: "You lived in seclusion – either in a sheltered community such as a monastery, or entirely alone – for a formative part of your life. In your time apart from society, you found quiet, solitude, and perhaps some of the answers you were looking for.",
    feature: "Discovery",
    featureDesc:
      "The quiet seclusion of your extended hermitage gave you access to a unique and powerful discovery. The exact nature of this revelation depends on the nature of your seclusion.",
    profs: ["Medicine", "Religion"],
    equip: ["Scroll case with your notes", "Winter blanket", "Common clothes", "Herbalism kit", "5 gp"],
    personality: [
      "I've been isolated for so long that I rarely speak, preferring gestures and the occasional grunt.",
      "I am utterly serene, even in the face of disaster.",
      "The leader of my community had something wise to say on every topic, and I am eager to share that wisdom.",
      "I feel tremendous empathy for all who suffer.",
      "I'm oblivious to etiquette and social expectations.",
      "I connect everything that happens to me to a grand, cosmic plan.",
      "I often get lost in my own thoughts and contemplation, becoming oblivious to my surroundings.",
      "I am working on a grand philosophical theory and love sharing my ideas."
    ],
    ideal: [
      "Greater Good. My gifts are meant to be shared with all, not used for my own benefit.",
      "Logic. Emotions must not cloud logical thinking.",
      "Free Thinking. Inquiry and curiosity are the pillars of progress.",
      "Power. Solitude and contemplation are paths toward mystical or magical power.",
      "Live and Let Live. Meddling in the affairs of others only causes trouble.",
      "Self-Knowledge. If you know yourself, there's nothing left to know."
    ],
    bond: [
      "Nothing is more important than the others in my hermitage or order.",
      "I entered seclusion to hide from those who might still be hunting me.",
      "I'm still seeking the enlightenment I pursued in seclusion. It eludes me.",
      "I entered seclusion because I loved someone I could never have.",
      "Should my discovery come to light, it could bring ruin to the world.",
      "My isolation gave me great insight into a great evil that only I can destroy."
    ],
    flaw: [
      "Now that I've returned to the world, I enjoy its delights a little too much.",
      "I harbor dark, bloodthirsty thoughts that my isolation and meditation failed to quell.",
      "I am dogmatic in my thoughts and philosophy.",
      "I let my need to win arguments overshadow friendships and harmony.",
      "I'd risk too much to uncover a lost bit of knowledge.",
      "I like keeping secrets and won't share them with anyone."
    ],
  },

  Noble: {
    desc: "You were born into wealth and privilege, schooled in courtly manners and the art of power. You carry a noble title, and your family owns land, collects taxes, and wields significant political influence.",
    feature: "Position of Privilege",
    featureDesc:
      "Thanks to your noble birth, people are inclined to think the best of you. You are welcome in high society, and people assume you have the right to be wherever you are. Other people of high birth treat you as a member of the same social sphere.",
    profs: ["History", "Persuasion"],
    equip: ["Fine clothes", "Signet ring", "Scroll of pedigree", "25 gp"],
    personality: [
      "My eloquent flattery makes everyone I talk to feel like the most interesting person in the room.",
      "The common folk love me for my kindness and generosity.",
      "No one could doubt by looking at my regal bearing that I am a cut above the unwashed masses.",
      "I take great pains to always look my best and follow the latest fashions.",
      "I don't like to get my hands dirty, and I won't be caught dead in unsuitable accommodations.",
      "Despite my noble birth, I do not place myself above other folk.",
      "My favor, once lost, is lost forever.",
      "If you do me an injury, I will crush you, ruin your name, and salt your fields."
    ],
    ideal: [
      "Respect. Respect is due to me because of my position, but all people regardless of station deserve to be treated with dignity.",
      "Responsibility. It is my duty to protect and care for the people beneath me.",
      "Independence. I must prove that I can handle myself without the coddling of my family.",
      "Power. If I can attain enough power, no one can tell me what to do.",
      "Family. Blood runs thicker than water.",
      "Noble Obligation. I must prove that my house deserves its position."
    ],
    bond: [
      "I will face any challenge to win the approval of my family.",
      "My house's alliance with another family must be maintained at all costs.",
      "Nothing is more important than the other members of my family.",
      "I am in love with the heir of a family my family despises.",
      "My loyalty to my sovereign is unwavering.",
      "The common folk must see me as a hero of the people."
    ],
    flaw: [
      "I secretly believe that everyone is beneath me.",
      "I hide a scandalous secret that could ruin my family forever.",
      "I too often hear veiled insults and threats in every word addressed to me.",
      "I have an insatiable desire for carnal pleasures.",
      "In fact, the world does revolve around me.",
      "By my words and actions, I often bring shame to my family."
    ],
  },

  Outlander: {
    desc: "You grew up in the wilds, far from civilization and the comforts of town and technology. The wilds are in your blood. Even in places where you don't know the specific features of the terrain, you know the ways of the wild.",
    feature: "Wanderer",
    featureDesc:
      "You have an excellent memory for maps and geography, and can recall the general layout of terrain, settlements, and features around you. You can find food and fresh water for yourself and up to five others each day, as long as the land offers any at all.",
    profs: ["Athletics", "Survival"],
    equip: [
      "Staff", "Hunting trap", "Trophy from a kill", "Traveler's clothes", "10 gp"
    ],
    personality: [
      "I'm driven by a wanderlust that led me from home.",
      "I watch over my friends as if they were newborn pups.",
      "I once ran twenty-five miles without stopping to warn my clan. I'd do it again.",
      "I have a lesson for every situation, drawn from nature.",
      "I place no stock in wealthy or well-mannered folk.",
      "I'm always picking things up, absently fiddling with them, and sometimes accidentally breaking them.",
      "I feel far more comfortable around animals than people.",
      "I was, in fact, raised by wolves."
    ],
    ideal: [
      "Change. Life is like the seasons, in constant change.",
      "Greater Good. Each person must make the most happiness for the whole tribe.",
      "Honor. If I dishonor myself, I dishonor my whole clan.",
      "Might. The strongest are meant to rule.",
      "Nature. The natural world is more important than civilization.",
      "Glory. I must earn glory in battle, for myself and my clan."
    ],
    bond: [
      "My family is the most important thing in my life, even when far from me.",
      "An injury to the wilderness of my home is an injury to me.",
      "I will bring wrath down on those who destroyed my homeland.",
      "I am the last of my tribe and must ensure their stories live on.",
      "I suffer awful visions of a coming disaster and will do anything to prevent it.",
      "It is my duty to provide children to sustain my tribe."
    ],
    flaw: [
      "I am too enamored of ale, wine, and other intoxicants.",
      "There's no room for caution in a life lived to the fullest.",
      "I nurse a silent resentment toward anyone who's wronged me.",
      "I am slow to trust outsiders.",
      "Violence is my answer to almost any challenge.",
      "Don't expect me to save those who can't save themselves."
    ],
  },

  Sage: {
    desc: "You spent years learning the lore of the multiverse. You scoured manuscripts, memorized spells, and pestered every expert you could find. Your efforts have made you a master in your fields of study.",
    feature: "Researcher",
    featureDesc:
      "When you attempt to learn or recall a piece of lore, if you do not know that information, you often know where and from whom you can obtain it. The DM may rule that some lore is simply too obscure or too dangerous to locate easily.",
    profs: ["Arcana", "History"],
    equip: [
      "Bottle of black ink", "Quill", "Small knife", "Letter from a dead colleague", "10 gp",
    ],
    personality: [
      "I use polysyllabic words that convey the impression of great erudition.",
      "I've read every book in the world's greatest libraries — or like to boast I have.",
      "I'm used to helping those not as smart as me, and I explain everything patiently.",
      "There's nothing I like more than a good mystery.",
      "I'm willing to listen to every side of an argument before I make my own judgment.",
      "I… speak… slowly… when talking… to idiots,… which… almost… everyone… is… compared… to me.",
      "I am horribly, horribly awkward in social situations.",
      "I'm convinced that people are always trying to steal my secrets."
    ],
    ideal: [
      "Knowledge. The path to self-improvement is through knowledge.",
      "Beauty. What is beautiful points us toward what is true.",
      "Logic. Emotions must not cloud logical thinking.",
      "No Limits. Nothing should fetter the infinite possibility inherent in all existence.",
      "Power. Knowledge is the path to power and domination.",
      "Self-Improvement. Study betters oneself and those around you."
    ],
    bond: [
      "It is my duty to protect my students.",
      "I have an ancient text holding terrible secrets that must not fall to wrong hands.",
      "I work to preserve a library, university, or monastery.",
      "My life's work is a series of tomes on a specific field of lore.",
      "I've been searching my whole life for the answer to a certain question.",
      "I sold my soul for knowledge. I hope to do great deeds and win it back."
    ],
    flaw: [
      "I am easily distracted by the promise of information.",
      "Most people run from demons. I stop and take notes.",
      "Unlocking an ancient mystery is worth the price of a civilization.",
      "I overlook obvious solutions in favor of complicated ones.",
      "I speak without really thinking through my words, invariably insulting others.",
      "I can't keep a secret to save my life, or anyone else's."
    ],
  },

  Soldier: {
    desc: "War has been your life for as long as you care to remember. You trained as a youth, studied the use of weapons and armor, learned basic survival techniques, including how to stay alive on the battlefield.",
    feature: "Military Rank",
    featureDesc:
      "You have a rank from your service days. You can invoke your rank to requisition simple equipment, gain access to friendly military encampments, and receive a respectful hearing from officers.",
    profs: ["Athletics", "Intimidation"],
    equip: ["Insignia of rank", "Trophy from a fallen enemy", "Bone dice", "Common clothes", "10 gp"],
    personality: [
      "I'm always polite and respectful.",
      "I'm haunted by memories of war. I can't get the images of violence out of my mind.",
      "I've lost too many friends, and I'm slow to make new ones.",
      "I have a cautionary tale for almost every combat situation.",
      "I can stare down a hell hound without flinching.",
      "I enjoy being strong and like breaking things.",
      "I have a crude sense of humor.",
      "I face problems head-on. A simple, direct solution is the best path to success."
    ],
    ideal: [
      "Greater Good. Our lot is to lay down our lives in defense of others.",
      "Responsibility. I do what I must and obey just authority.",
      "Independence. When people follow orders blindly, they embrace tyranny.",
      "Might. In life as in war, the stronger force wins.",
      "Live and Let Live. Ideals aren't worth killing over or going to war for.",
      "Nation. My city, nation, or people are all that matter."
    ],
    bond: [
      "I would still lay down my life for the people I served with.",
      "Someone saved my life on the battlefield. I will never leave a friend behind.",
      "My honor is my life.",
      "I'll never forget the crushing defeat my company suffered or the enemies who dealt it.",
      "Those who fight beside me are those worth dying for.",
      "I fight for those who cannot fight for themselves.",
    ],
    flaw: [
      "The monstrous enemy we faced in battle still leaves me quivering with fear.",
      "I have little respect for anyone who is not a proven warrior.",
      "I made a terrible mistake in battle that cost lives — I would do anything to keep it secret.",
      "My hatred of my enemies is blinding and unreasoning.",
      "I obey the law, even if the law causes misery.",
      "I'd rather eat my armor than admit when I'm wrong."
    ],
  },

  Urchin: {
    desc: "You grew up on the streets alone, orphaned, and poor, You had no one to watch over you or to provide for you, so you learned to provide for yourself. You've survived despite all odds, and did so through cunning, strength, speed, or some combination of each.",
    feature: "City Secrets",
    featureDesc:
      "You know the flow to cities and can find passages through that others would miss. When you are not in combat, you (and companions you lead) can travel between any two locations in the city twice as fast as your speed would normally allow.",
    profs: ["Sleight of Hand", "Stealth"],
    equip: ["Small knife", "Thieves' tools", "Map of home city", "Token from your parents", "Common clothes", "10 gp"],
    personality: [
      "I hide scraps of food and trinkets away in my pockets.",
      "I ask a lot of questions.",
      "I like to squeeze into small places where no one else can get to me.",
      "I sleep with my back to a wall or tree, with everything I own wrapped in a bundle in my arms.",
      "I eat like a pig and have bad manners.",
      "I think anyone who's nice to me is hiding evil intent.",
      "I don't like to bathe.",
      "I bluntly say what other people are hinting at or hiding."
    ],
    ideal: [
      "Respect. All people, rich or poor, deserve respect.",
      "Community. We have to take care of each other, because no one else is going to do it.",
      "Change. The low are lifted up, and the high and mighty are brought down.",
      "Retribution. The rich need to be shown what life and death are like in the gutters.",
      "People. I help the people who help me-that's what keeps us alive.",
      "Aspiration. I'm going to prove that I'm worthy of a better life."
    ],
    bond: [
      "My home city is mine, and I'll fight to defend it.",
      "I sponsor an orphanage to keep others from enduring what I did.",
      "I owe my survival to someone who isn't alive to see what I've become.",
      "I owe a debt I can never repay to the person who took pity on me.",
      "I escaped my life of poverty by robbing an important person, and I'm wanted for it.",
      "No one else should have to grow up the way I did."
    ],
    flaw: [
      "If I'm outnumbered, I will run away from a fight.",
      "Gold seems like a lot of money to me, and I'll do just about anything for more of it.",
      "I will never fully trust anyone other than myself.",
      "I'd rather kill someone in their sleep then fight fair.",
      "It's not stealing if I need it more than someone else.",
      "People who can't take care of themselves get what they deserve."
    ],
  },
};
