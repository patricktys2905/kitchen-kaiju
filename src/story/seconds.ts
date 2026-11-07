// 🍽 "Second Helpings": the second Story campaign. The newer tables, the unlockable kaiju as rivals, twists,
// and Velvaroo as the final boss. EASY TO CUSTOMISE: chapters, lines, tips, captions all live here.
// Species: 3 Bloblin 5 Toastbat 8 Chocomunch 9 Bubblegumbo 10 Bluebeary 12 Sloba 13 Avocadrake 15 Hotchog
//          16 Minturtle 17 Pengwhip 18 Velvaroo 19 Tacowl  ·  Tables: 12 Freezer 13 Candy 14 Nightmare 15 Smoothie 16 Fondue 17 Pancake
import type { Chapter, Line } from './chapters';
import type { Cutscene } from './cutscenes';

export const SECONDS_CHAPTERS: Chapter[] = [
  {
    title: 'Smoothie Operators', table: 15, rounds: 2,
    rivals: [{ species: 12, level: 'easy' }, { species: 13, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'The Golden Spoon is yours… but the back of the fridge wants SECOND HELPINGS.' },
      { speaker: 0, text: 'Oh… it\'s the champion. I\'d run, but… the blender\'s on. Fine.' },
      { speaker: 1, text: 'Back for seconds? Don\'t be pit-iful.' },
    ],
    tip: 'When the blender rumbles, get to the edge. Shove rivals in for an easy knockout!',
    win: { speaker: 0, text: 'Too… fast… for… me… zzz.' },
  },
  {
    title: 'Say Cheese', table: 16, rounds: 3,
    rivals: [{ species: 19, level: 'normal' }, { species: 8, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Whooo ordered the fondue? Hoo-hoo!' },
      { speaker: 1, text: 'Dip, dip, DIP you in cheese!' },
    ],
    tip: 'A shadow grows where hot cheese will land. Step out, and keep off the sticky puddles.',
    win: { speaker: 0, text: 'Hoo… I\'m properly cheesed off now.' },
  },
  {
    title: 'Flipping Out', table: 17, rounds: 3, mutator: 'tiny',
    rivals: [{ species: 15, level: 'normal' }, { species: 10, level: 'normal' }, { species: 5, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'Shrunk to snack size? Even easier to flip!' },
      { speaker: 1, text: 'Short stack, tall order.' },
    ],
    tip: 'TWIST: MINI KAIJU. Everyone is tiny and quick. Red square = spatula. Move!',
    win: { speaker: 0, text: 'I relish a good loss. …Not really.' },
  },
  {
    title: 'Cold Shoulder', table: 12, rounds: 3, boss: true,
    rivals: [{ species: 17, level: 'easy', boss: true }, { species: 16, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Welcome to MY freezer. Mind the ice. I never slip.' },
      { speaker: 1, text: 'Mint condition. Mint defeat. Yours.' },
    ],
    tip: 'BOSS: Pengwhip starts every round ready to go KAIJU. On ice, start turning early!',
    win: { speaker: 0, text: 'Brr… you\'re cooler than I thought.' },
  },
  {
    title: 'Sugar High', table: 13, rounds: 3, mutator: 'snack',
    rivals: [{ species: 9, level: 'normal' }, { species: 3, level: 'normal' }, { species: 18, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'Gumdrops! Bumpers! BUBBLES!' },
      { speaker: 2, text: 'So you\'re the champ everyone\'s talking about. Hop to it.' },
    ],
    tip: 'TWIST: SNACK ATTACK. Crumbs fill bellies 3× faster, so expect KAIJU everywhere. Bounce them into the gumdrops!',
    win: { speaker: 2, text: 'Not bad. See you in the back kitchen, champ.' },
  },
  {
    title: 'Second Helpings', table: 14, rounds: 3, boss: true,
    rivals: [{ species: 18, level: 'hard', boss: true }, { species: 15, level: 'normal' }, { species: 17, level: 'normal' }],
    intro: [
      { speaker: 'chef', text: 'The back kitchen. Burners, toasters AND the giant hand. The last course.' },
      { speaker: 0, text: 'One Golden Spoon wasn\'t enough? Then come and EARN your seconds!' },
      { speaker: 1, text: 'We\'re with the boss. Relish it.' },
    ],
    tip: 'FINAL BOSS: Velvaroo starts every round ready to go KAIJU. Watch the burners, toasters and the hand!',
    win: { speaker: 0, text: 'Knocked out of my own kitchen… You really ARE the Kitchen Kaiju.' },
  },
];

export const SECONDS_ENDING: Line[] = [
  { speaker: 'chef', text: 'Second helpings: served. Even the back of the fridge bows to you now.' },
  { speaker: 'chef', text: 'Velvaroo hands over the kitchen keys… and the dessert menu.' },
  { speaker: 'chef', text: 'You are the KITCHEN KAIJU, twice over. (Go for 3 stars, try 🌶️ Spicy, or brawl in Free Play!)' },
];

// noVideo: Veo drifted off-model in these clips (Nov 2026); the still plays instead. Remove it once a clean clip is in public/video.
export const SECONDS_OPENING: Cutscene = { key: 's2-open', noVideo: true, heading: 'SECOND HELPINGS', caption: 'You won the Golden Spoon. The back of the fridge wants a rematch.' };
export const SECONDS_END_CUT: Cutscene = { key: 's2-end', noVideo: true, heading: 'SECONDS: SERVED', caption: 'Two crowns, one kaiju. Save room for dessert!' };
export const SECONDS_CUTS: Cutscene[] = [
  { key: 's2-0', heading: 'CHAPTER 1 · SMOOTHIE OPERATORS', caption: 'Sloba is too lazy to run from the blender. Are you?' },
  { key: 's2-1', noVideo: true, heading: 'CHAPTER 2 · SAY CHEESE', caption: 'Tacowl has a gouda feeling about this.' },
  { key: 's2-2', noVideo: true, heading: 'CHAPTER 3 · FLIPPING OUT', caption: 'Everyone\'s bite-sized. The spatula is not.' },
  { key: 's2-3', heading: 'CHAPTER 4 · COLD SHOULDER', caption: 'Pengwhip rules the freezer. Chill out… or wipe out.' },
  { key: 's2-4', heading: 'CHAPTER 5 · SUGAR HIGH', caption: 'Too many sweets. Not enough self-control.' },
  { key: 's2-5', noVideo: true, heading: 'CHAPTER 6 · SECOND HELPINGS', caption: 'Velvaroo wants a rematch. And a pouch full of spoons.' },
];
