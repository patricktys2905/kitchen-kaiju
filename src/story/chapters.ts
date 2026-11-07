// Story mode: "The Grand Feast". One chapter per table, each with rival kaiju, a little dialogue and a tip.
// Species: 0 Gobzilla 1 Squidgeon 2 Crabbage 3 Bloblin 4 Mothball 5 Toastbat 6 Dumplord 7 Norigon
//          8 Chocomunch 9 Bubblegumbo 10 Bluebeary 11 Pizzaraptor 12 Sloba 13 Avocadrake 14 Salmonster 15 Hotchog
// Tables:  0 Sunday Roast 1 Dinner for Four 2 Leftovers 3 Sushi Bar 4 Birthday Bash 5 Chef's Board 6 Diner Griddle
//          7 Ice Cream Parlour 8 Picnic Blanket 9 Bakery Bench 10 Banquet Lazy Susan 11 Breakfast Rush
import type { Difficulty } from '../sim/bot';
import { SPECIES } from '../sim/constants';

export interface Rival {
  species: number;
  level: Difficulty;
  boss?: boolean; // starts every round with a full belly (can go KAIJU straight away)
}

/** A line of dialogue. speaker: a rival index in this chapter, or 'chef' (the narrator). */
export interface Line {
  speaker: number | 'chef';
  text: string;
}

export interface Chapter {
  title: string;
  table: number;
  rounds: number; // first to this many round wins
  rivals: Rival[];
  intro: Line[];
  tip: string;
  win: Line;
  boss?: boolean;
}

export const CHAPTERS: Chapter[] = [
  {
    title: 'The First Course', table: 0, rounds: 2,
    rivals: [{ species: 2, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'Tonight the Head Chef hosts the GRAND FEAST. Rule every table in the kitchen, and the legendary GOLDEN SPOON is yours!' },
      { speaker: 0, text: 'Ha! A newcomer? This roast is MY turf. Let\'s see that throwing arm!' },
    ],
    tip: 'Hold THROW to charge, let go to fling. Missed cutlery sticks where it lands, so go and grab it!',
    win: { speaker: 0, text: 'Snip… not bad. The next table won\'t be so polite.' },
  },
  {
    title: 'Dinner for Four', table: 1, rounds: 2,
    rivals: [{ species: 1, level: 'easy' }, { species: 3, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'Four cups, two of us, one of you. Do the maths!' },
      { speaker: 1, text: 'Hehe. Wobble wobble.' },
    ],
    tip: 'DASH into a rival near the edge to shove them right off the table.',
    win: { speaker: 0, text: 'Ink-credible… We\'ll be back. Probably wobblier.' },
  },
  {
    title: 'Leftovers', table: 2, rounds: 3,
    rivals: [{ species: 5, level: 'easy' }, { species: 4, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Yawn… you woke me up. Bad idea.' },
      { speaker: 1, text: 'The bread walls are ours. Hide behind them all you like!' },
    ],
    tip: 'Eat crumbs to fill your belly, then STOMP to go KAIJU: huge, and immune to cutlery!',
    win: { speaker: 1, text: 'Fine… but the boss of the Sushi Bar eats newcomers for breakfast.' },
  },
  {
    title: 'Boss of the Belt', table: 3, rounds: 3, boss: true,
    rivals: [{ species: 7, level: 'easy', boss: true }, { species: 14, level: 'easy' }],
    intro: [
      { speaker: 1, text: 'Bow before the boss of the belt!' },
      { speaker: 0, text: 'I am NORIGON. Every roll on this bar answers to me. Kneel, or get carried away.' },
    ],
    tip: 'BOSS: Norigon starts every round ready to go KAIJU. Keep moving, and use the conveyor to escape!',
    win: { speaker: 0, text: '…Impossible. Take your win. The feast is only getting hotter.' },
  },
  {
    title: 'Party Crashers', table: 4, rounds: 3,
    rivals: [{ species: 9, level: 'normal' }, { species: 8, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'It\'s MY birthday and I\'ll pop who I want to!' },
      { speaker: 1, text: 'The cake is mine. You are not invited.' },
    ],
    tip: 'Watch for the wind arrows: walk INTO the gust, or get blown off the table.',
    win: { speaker: 0, text: 'Worst. Birthday. Ever. *pop*' },
  },
  {
    title: 'On the Chopping Block', table: 5, rounds: 3,
    rivals: [{ species: 11, level: 'normal' }, { species: 13, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Hot, cheesy, and FAST. Try to keep up!' },
      { speaker: 1, text: 'The chef\'s cleaver loves a slow kaiju. Are you slow?' },
    ],
    tip: 'Get out of the red lane before the cleaver falls!',
    win: { speaker: 1, text: 'Guac… and roll. You\'re sharper than you look.' },
  },
  {
    title: 'Short Order Showdown', table: 6, rounds: 3,
    rivals: [{ species: 10, level: 'normal' }, { species: 5, level: 'normal' }, { species: 2, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Order up! One newcomer, extra crispy.' },
      { speaker: 1, text: 'Round two. I\'m awake now.' },
      { speaker: 2, text: 'Remember me? I\'ve been practising my snips.' },
    ],
    tip: 'Burners glow before they FLARE. Step off before they go!',
    win: { speaker: 0, text: 'Hmph. Ninety seconds and you\'re still not cooked.' },
  },
  {
    title: 'The Big Melt', table: 7, rounds: 3, boss: true,
    rivals: [{ species: 3, level: 'easy', boss: true }, { species: 4, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'You laughed at my wobble. Now… you\'ll SLIDE.' },
      { speaker: 1, text: 'Bloblin has been eating nothing but sundaes. Run.' },
    ],
    tip: 'BOSS: Bloblin starts every round ready to go KAIJU. Melted puddles are slippery: stay off them!',
    win: { speaker: 0, text: '…I\'m just going to sit in the freezer for a while.' },
  },
  {
    title: 'Picnic Panic', table: 8, rounds: 3,
    rivals: [{ species: 12, level: 'normal' }, { species: 13, level: 'hard' }, { species: 14, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Mmm… picnic… nap… slurp. Oh, a fight? Fine. I\'ll get to it… eventually.' },
      { speaker: 1, text: 'Back from the chopping board, and greener than ever.' },
      { speaker: 2, text: 'And I\'m back from the sea. Hungry.' },
    ],
    tip: 'The ant trail carries everything down the blanket: use it to sneak, or to steal dropped cutlery.',
    win: { speaker: 0, text: 'Too… much… effort. You win. I\'ll be hanging off my straw.' },
  },
  {
    title: 'Proving the Dough', table: 9, rounds: 3,
    rivals: [{ species: 6, level: 'hard' }, { species: 10, level: 'normal' }, { species: 8, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Knead to win? Hah! I was BORN on a bakery bench.' },
      { speaker: 1, text: 'Fresh out of the oven and ready for a rematch.' },
      { speaker: 2, text: 'Chocolate never melts under pressure.' },
    ],
    tip: 'Sticky dough slows you to a crawl: rivals on it are easy targets. So are you.',
    win: { speaker: 0, text: 'Rise and fall… This isn\'t over. See you at the banquet.' },
  },
  {
    title: 'Round and Round', table: 10, rounds: 3,
    rivals: [{ species: 15, level: 'hard' }, { species: 7, level: 'normal' }, { species: 9, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Round and round, like a frank on the roller grill. I LIVE for this.' },
      { speaker: 1, text: 'I told you the feast gets hotter. I\'m back, and I\'m not alone.' },
      { speaker: 2, text: 'Second birthday this week. Still not inviting you.' },
    ],
    tip: 'The turntable carries you round in circles. Ride it to dodge, or get flung into a throw.',
    win: { speaker: 0, text: 'Dizzy… and to be frank, a bit sick. The Grand Feast awaits you. Good luck with HIM.' },
  },
  {
    title: 'The Grand Feast', table: 11, rounds: 3, boss: true,
    rivals: [{ species: 6, level: 'hard', boss: true }, { species: 15, level: 'normal' }, { species: 11, level: 'normal' }],
    intro: [
      { speaker: 'chef', text: 'Breakfast is served. The last table. The Golden Spoon sits on its cake stand, waiting.' },
      { speaker: 0, text: 'Every kaiju in this kitchen bows to DUMPLORD. The Golden Spoon stays with ME!' },
      { speaker: 1, text: 'We stand with the Lord. Relish the moment, it\'s your last.' },
    ],
    tip: 'FINAL BOSS: Dumplord starts every round ready to go KAIJU, and the toasters never stop. Everything you\'ve learned, now!',
    win: { speaker: 0, text: 'My… my spoon… Fine. FINE. You are the true Kitchen Kaiju.' },
  },
];

export const ENDING: Line[] = [
  { speaker: 'chef', text: 'The Head Chef lifts the GOLDEN SPOON high… and hands it to you.' },
  { speaker: 'chef', text: 'From the Sunday Roast to Breakfast Rush, every table in the kitchen bows to you.' },
  { speaker: 'chef', text: 'You are the KITCHEN KAIJU. (Replay chapters for 3 stars, or keep brawling in Free Play!)' },
];

/** The rivals actually used: if the player picked one of them, swap in a kaiju nobody is using. */
export function chapterRivals(ch: Chapter, playerSpecies: number): Rival[] {
  const used = new Set([playerSpecies, ...ch.rivals.map(r => r.species)]);
  return ch.rivals.map(r => {
    if (r.species !== playerSpecies) return r;
    const free = SPECIES.map((_, i) => i).find(i => !used.has(i)) ?? 0;
    used.add(free);
    return { ...r, species: free };
  });
}

/** 🌶️ Spicy: every rival one level tougher. EASY TO CUSTOMISE: change the bump table. */
export const SPICY_BUMP: Record<string, 'easy' | 'normal' | 'hard'> = { easy: 'normal', normal: 'hard', hard: 'hard' };

/** Stars for a win: 3 = never lost a round, 2 = lost one, 1 = otherwise. */
export function starsFor(roundsLost: number): number {
  return roundsLost <= 0 ? 3 : roundsLost === 1 ? 2 : 1;
}
