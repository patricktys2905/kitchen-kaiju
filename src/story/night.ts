// 🌙 "The Night Market": the third Story campaign. The Golden Spoon has been stolen; a trail of mustard leads
// to the market stalls that stay open till dawn. Every chapter uses a different GOAL (src/story/chapters.ts).
// EASY TO CUSTOMISE: chapters, lines, tips, captions all live here.
// Species: 0 Gobzilla 1 Squidgeon 2 Crabbage 3 Bloblin 4 Mothball 5 Toastbat 6 Dumplord 7 Norigon 8 Chocomunch 9 Bubblegumbo
//          10 Bluebeary 11 Pizzaraptor 12 Sloba 13 Avocadrake 14 Salmonster 15 Hotchog 16 Minturtle 17 Pengwhip 18 Velvaroo 19 Tacowl
// Tables:  4 Birthday Bash 5 Chef's Board 6 Diner Griddle 7 Ice Cream Parlour 8 Picnic Blanket 10 Lazy Susan 14 Chef's Nightmare 16 Fondue Night
import type { Chapter, Line } from './chapters';
import type { Cutscene } from './cutscenes';

export const NIGHT_CHAPTERS: Chapter[] = [
  {
    title: 'Opening Night', table: 8, rounds: 2, goal: 'crumbs',
    rivals: [{ species: 11, level: 'easy' }, { species: 9, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'Disaster! The Golden Spoon is GONE from its stand. A trail of mustard leads to the NIGHT MARKET…' },
      { speaker: 0, text: 'Free samples! Free samples of… getting beaten! Rawr!' },
      { speaker: 1, text: 'Ooh, a crumb race? I\'m chewing it already.' },
    ],
    tip: 'CRUMB RACE: you win with the most crumbs HELD at the end. Get knocked out and you drop half!',
    win: { speaker: 1, text: '*pop* …Fine. The mustard trail goes past the balloon stall. Follow your nose.' },
    meanwhile: 'Meanwhile, a long sausage-shaped shadow slips between the stalls… humming a jingle.',
  },
  {
    title: 'Buddy System', table: 4, rounds: 2, goal: 'team',
    rivals: [{ species: 10, level: 'normal', ally: true }, { species: 4, level: 'easy' }, { species: 5, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'Psst! I SAW who took the spoon. Help me with these two pests and I\'ll tell you!' },
      { speaker: 1, text: 'Ooh, a light! A shiny, shiny light! …wait, are we fighting?' },
      { speaker: 2, text: 'Two on two? I\'m toast. Wait. I\'m ALWAYS toast.' },
    ],
    tip: 'TEAM UP: Bluebeary is on YOUR side. Your cutlery passes through allies, so throw freely!',
    win: { speaker: 0, text: 'It had a bun… and it smelled of onions. That\'s all I saw. Berry sorry.' },
    meanwhile: 'Meanwhile, someone buys forty jars of mustard at the condiment stall. Paid in crumbs.',
  },
  {
    title: 'Finders Keepers', table: 10, rounds: 2, goal: 'spoon',
    rivals: [{ species: 8, level: 'easy' }, { species: 13, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'A Golden Spoon on the Lazy Susan! FINDERS KEEPERS!' },
      { speaker: 1, text: 'That\'s a decoy, you chocolate brick. But I\'m keeping it anyway.' },
    ],
    tip: 'SPOON GRAB: touch the spoon to hold it. Knock the holder out to make them drop it!',
    win: { speaker: 1, text: 'Guac and roll… It IS a fake. The real one\'s with the night watch. Ask the owl.' },
    meanwhile: 'Meanwhile, high on a lamp post, two big round eyes watch you hold the fake spoon.',
  },
  {
    title: 'Night Owl', table: 5, rounds: 3, boss: true, bossBelly: 70,
    rivals: [{ species: 19, level: 'normal', boss: true }, { species: 12, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'Hoo goes there? The market is closed to troublemakers. And YOU look like trouble.' },
      { speaker: 1, text: 'I\'m on night watch too… zzz… very busy… zzz.' },
      { speaker: 0, text: 'The spoon? I\'m paid to look the other way. Taco-bout a good deal!' },
    ],
    tip: 'BOSS: Tacowl starts every round with a nearly full belly. Stay off the red lane when the cleaver comes!',
    win: { speaker: 0, text: 'Hoo-kay, hoo-kay! It was the HOT DOG. Hotchog. He\'s at the back of the market, by the grills.' },
    meanwhile: 'Meanwhile, at the back of the market, someone polishes a golden spoon… and laughs a little too loudly.',
  },
  {
    title: 'Hot Potato Hour', table: 6, rounds: 3, goal: 'dumpling',
    rivals: [{ species: 14, level: 'normal' }, { species: 2, level: 'normal' }, { species: 1, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'The grill stalls play a game every midnight. The loser does the washing-up.' },
      { speaker: 0, text: 'Hot dumpling, hot dumpling! Pass it or get steamed, champ!' },
      { speaker: 1, text: 'Snip snip! I never hold it long. Pinchers are for passing!' },
    ],
    tip: 'HOT DUMPLING: touch a rival to pass it on. Don\'t be holding it when the fuse runs out!',
    win: { speaker: 0, text: 'Steamed AGAIN… Hotchog went thataway. Mind the ice cream stalls, they\'re slippery.' },
    meanwhile: 'Meanwhile, Hotchog hires three guards from the ice cream stall. "Keep the champ BUSY."',
  },
  {
    title: 'Last Stall Standing', table: 7, rounds: 2, goal: 'survive', surviveFor: 45,
    rivals: [{ species: 17, level: 'normal' }, { species: 16, level: 'normal' }, { species: 7, level: 'tough' }],
    intro: [
      { speaker: 0, text: 'The boss said keep you busy. We\'ll keep you VERY busy.' },
      { speaker: 1, text: 'Slow and steady pushes you off the table.' },
      { speaker: 2, text: 'Three on one. Norigon likes these odds.' },
    ],
    tip: 'SURVIVE: you don\'t have to win the fight, just stay on the table until the clock hits zero!',
    win: { speaker: 2, text: 'You… just… won\'t… fall. Fine. Hotchog is at the fondue stall. He has friends.' },
    meanwhile: 'Meanwhile, the fondue pot bubbles. Hotchog dips the Golden Spoon in it. Just to annoy you.',
  },
  {
    title: 'Tag Team Takedown', table: 16, rounds: 3, goal: 'team',
    rivals: [{ species: 1, level: 'normal', ally: true }, { species: 18, level: 'tough' }, { species: 3, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Squidgeon reporting for duty! Eight arms, zero fear. Mostly zero fear.' },
      { speaker: 1, text: 'Hotchog paid me in spoons. Lots of spoons. Pouch is FULL.' },
      { speaker: 2, text: 'Wobble wobble… I\'m only here for the cheese.' },
    ],
    tip: 'TEAM UP: Squidgeon is your ally. Velvaroo is tough: gang up on her together!',
    win: { speaker: 1, text: 'Out-hopped by a couple of snacks… The grill at the very back. Go. Before he eats the evidence.' },
    meanwhile: 'Meanwhile, the grills at the back of the market glow red. The Midnight Muncher is waiting.',
  },
  {
    title: 'The Midnight Muncher', table: 14, rounds: 3, boss: true,
    rivals: [{ species: 15, level: 'normal', boss: true }, { species: 19, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Well, well. The champ. You want your shiny spoon? It\'s RELISH-ing its new home.' },
      { speaker: 1, text: 'Hoo, I\'m back on his side. The pay is better. Sorry, not sorry.' },
      { speaker: 0, text: 'I\'m the MIDNIGHT MUNCHER. Nobody beats me after dark!' },
    ],
    tip: 'FINAL BOSS: Hotchog starts every round ready to go KAIJU. Burners, toasters AND the hand: keep moving!',
    win: { speaker: 0, text: 'My spoon… my beautiful spoon… Fine. Take it. Want a hot dog for the road? No? Okay.' },
  },
];

export const NIGHT_ENDING: Line[] = [
  { speaker: 'chef', text: 'The Golden Spoon is back on its stand, a little cheesy but shining.' },
  { speaker: 'chef', text: 'The whole Night Market stays open until dawn… to throw YOU a party.' },
  { speaker: 'chef', text: 'Champion of the Feast, Seconds AND the Night Market. (Go for 3 stars, or try the side stories!)' },
];

export const NIGHT_OPENING: Cutscene = { key: 'night-open', noVideo: true, heading: 'THE NIGHT MARKET', caption: 'The Golden Spoon is gone. All that\'s left… is a trail of mustard.' };
export const NIGHT_END_CUT: Cutscene = { key: 'night-end', noVideo: true, heading: 'SPOON: RECOVERED', caption: 'The market\'s open till dawn. Party on, champ.' };
/** 🎬 One still before each chapter (same order as NIGHT_CHAPTERS). EASY TO CUSTOMISE: captions here. */
export const NIGHT_CUTS: Cutscene[] = [
  { key: 'night-c0', noVideo: true, heading: 'CHAPTER 1 · OPENING NIGHT', caption: 'Free samples! The mustard trail starts right here.' },
  { key: 'night-c1', noVideo: true, heading: 'CHAPTER 2 · BUDDY SYSTEM', caption: 'Bluebeary saw everything. Bluebeary wants a favour first.' },
  { key: 'night-c2', noVideo: true, heading: 'CHAPTER 3 · FINDERS KEEPERS', caption: 'A Golden Spoon! …Is the gold supposed to peel off?' },
  { key: 'night-c3', noVideo: true, heading: 'CHAPTER 4 · NIGHT OWL', caption: 'Tacowl is on night watch. Mostly watching his wallet.' },
  { key: 'night-c4', noVideo: true, heading: 'CHAPTER 5 · HOT POTATO HOUR', caption: 'Midnight at the grills. Hot dumpling, nobody wants it.' },
  { key: 'night-c5', noVideo: true, heading: 'CHAPTER 6 · LAST STALL STANDING', caption: 'The bouncers are made of ice cream. Still scary. Ish.' },
  { key: 'night-c6', noVideo: true, heading: 'CHAPTER 7 · TAG TEAM TAKEDOWN', caption: 'Eight arms on your side. A pouch full of spoons on theirs.' },
  { key: 'night-c7', noVideo: true, heading: 'CHAPTER 8 · THE MIDNIGHT MUNCHER', caption: 'Found him. He\'s relishing every second.' },
];


