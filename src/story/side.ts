// 📕 Side stories: three short chapters about one kaiju each. They open once you've reached Grand Feast ch5
// (SIDE_AFTER_CHAPTER). EASY TO ADD: copy a block, give it a new id, add it to SIDE_STORIES.
// Species: 1 Squidgeon 2 Crabbage 3 Bloblin 4 Mothball 5 Toastbat 7 Norigon 9 Bubblegumbo 11 Pizzaraptor 13 Avocadrake 14 Salmonster
//          15 Hotchog 16 Minturtle 17 Pengwhip 18 Velvaroo 19 Tacowl
// Tables:  0 Sunday Roast 3 Sushi Bar 4 Birthday Bash 9 Bakery Bench 11 Breakfast Rush 12 Freezer Shelf 6 Diner Griddle 10 Lazy Susan
import type { Chapter, Line } from './chapters';
import type { Cutscene } from './cutscenes';

export interface SideStory {
  id: string; // campaign id: 'side-<name>'
  title: string;
  tagline: string;
  hero: number; // the kaiju this story is about (shown on the picker)
  chapters: Chapter[];
  ending: Line[];
  still: string; // art key for its opening / ending still
}

export const SIDE_STORIES: SideStory[] = [
  {
    id: 'side-norigon', title: "NORIGON'S REVENGE", tagline: 'the sushi samurai wants a rematch', hero: 7, still: 'side-norigon',
    chapters: [
      {
        title: 'Rematch on the Belt', table: 3, rounds: 2,
        rivals: [{ species: 7, level: 'normal' }],
        intro: [
          { speaker: 0, text: 'You beat me in the Grand Feast. I have trained ever since. Rice, rice, rice. Again!' },
          { speaker: 'chef', text: 'Norigon has challenged you to a duel on his own conveyor belt.' },
        ],
        tip: 'A 1-on-1 duel. The belt moves you sideways: let it carry you, don\'t fight it.',
        win: { speaker: 0, text: 'Defeated… twice. My clan will not be pleased. They are already here.' },
      },
      {
        title: 'The Sushi Clan', table: 3, rounds: 2, goal: 'survive', surviveFor: 35,
        rivals: [{ species: 14, level: 'normal' }, { species: 2, level: 'normal' }, { species: 7, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'Our honour is on the line. And on the belt. Mostly the belt.' },
          { speaker: 1, text: 'Snip! Three of us, one of you. Seems fair. To us.' },
        ],
        tip: 'SURVIVE: three rivals at once. You only need to stay on the table until time runs out.',
        win: { speaker: 2, text: '…You stood your ground. Perhaps… I have been fighting the wrong kaiju.' },
      },
      {
        title: 'Blade and Belly', table: 3, rounds: 3, goal: 'team',
        rivals: [{ species: 7, level: 'normal', ally: true }, { species: 14, level: 'tough' }, { species: 2, level: 'normal' }],
        intro: [
          { speaker: 0, text: 'The clan has thrown me out for losing. Then we fight TOGETHER. For honour. And snacks.' },
          { speaker: 1, text: 'Traitor! Seize them both!' },
        ],
        tip: 'TEAM UP: Norigon is your ally now. Clear the belt together!',
        win: { speaker: 0, text: 'You fight like a true samurai. Friends? …Friends. Now, about those snacks.' },
      },
    ],
    ending: [
      { speaker: 'chef', text: 'Norigon bows. A rival became a friend, and the Sushi Bar has a new rule: no clan, just dinner.' },
    ],
  },
  {
    id: 'side-bloblin', title: 'BLOBLIN ON ICE', tagline: 'one jelly, one freezer, one very bad idea', hero: 3, still: 'side-bloblin',
    chapters: [
      {
        title: 'Brain Freeze', table: 12, rounds: 2, goal: 'team',
        rivals: [{ species: 3, level: 'normal', ally: true }, { species: 17, level: 'easy' }, { species: 16, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'I sat in the freezer after the Big Melt. Now the penguins say I\'m THEIR jelly. Help!' },
          { speaker: 1, text: 'Finders keepers. That jelly is our ice-cube tray now.' },
        ],
        tip: 'TEAM UP: help Bloblin out of the freezer. Ice is slippery: brake early!',
        win: { speaker: 0, text: 'Wobble wobble, freedom! …oh no. They\'ve locked the freezer door.' },
      },
      {
        title: 'Slip and Slide', table: 12, rounds: 2, goal: 'survive', surviveFor: 40,
        rivals: [{ species: 17, level: 'normal' }, { species: 16, level: 'normal' }, { species: 3, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'Nobody leaves the freezer. Especially not wobbly ones.' },
          { speaker: 2, text: 'Sorry! They said they\'d give me sprinkles! I\'m weak!' },
        ],
        tip: 'SURVIVE on the ice until the clock runs out. Short taps, not long runs.',
        win: { speaker: 0, text: 'Hmph. You don\'t slip. Fine. The boss will deal with you.' },
      },
      {
        title: 'King of the Ice', table: 12, rounds: 3, boss: true, bossBelly: 80,
        rivals: [{ species: 17, level: 'normal', boss: true }, { species: 3, level: 'normal', ally: true }],
        goal: 'team',
        intro: [
          { speaker: 0, text: 'I am the KING of the freezer. Bow, or be frozen.' },
          { speaker: 1, text: 'You two vs one penguin? That\'s… actually fair for once!' },
        ],
        tip: 'BOSS TEAM UP: Pengwhip starts ready to go KAIJU. You and Bloblin take him on together.',
        win: { speaker: 0, text: 'Melted… by a jelly and a snack. Take the jelly. I\'m going back to my ice cubes.' },
      },
    ],
    ending: [
      { speaker: 'chef', text: 'Bloblin is free, and only a tiny bit frozen. He promises never to sit in a freezer again. (He will.)' },
    ],
  },
  {
    id: 'side-mothball', title: 'MOTHBALL AND THE LIGHT', tagline: 'a moth, a candle, and the shiniest spoon', hero: 4, still: 'side-mothball',
    chapters: [
      {
        title: 'Shiny!', table: 4, rounds: 2, goal: 'spoon',
        rivals: [{ species: 4, level: 'normal' }, { species: 9, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'SHINY. The spoon is SHINY. It is MINE. I must be near it. Always.' },
          { speaker: 1, text: 'She\'s been staring at it for an hour. Help.' },
        ],
        tip: 'SPOON GRAB: Mothball will never stop chasing the spoon. Grab it and keep moving!',
        win: { speaker: 0, text: 'Not… shiny enough? Then I need a BIGGER light. The birthday candles!' },
      },
      {
        title: 'Candle Panic', table: 4, rounds: 3, goal: 'dumpling',
        rivals: [{ species: 4, level: 'normal' }, { species: 5, level: 'normal' }, { species: 9, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'The candles! So bright! So warm! So… is that dumpling hot?' },
          { speaker: 1, text: 'Pass it! PASS IT! I\'m already toast, I can\'t be more toast!' },
        ],
        tip: 'HOT DUMPLING: pass it by touching a rival. Mothball gets distracted by the candles, use it!',
        win: { speaker: 0, text: 'Everything is too bright. I need… THE BRIGHTEST LIGHT IN THE KITCHEN.' },
      },
      {
        title: 'The Brightest Light', table: 6, rounds: 3, boss: true,
        rivals: [{ species: 4, level: 'normal', boss: true }, { species: 5, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'The burners! They GLOW! I will guard them forever!' },
          { speaker: 'chef', text: 'Somebody has to stop Mothball before she gets too close to the griddle.' },
        ],
        tip: 'BOSS: Mothball starts ready to go KAIJU, and the burners flare. Stay off the glowing rings!',
        win: { speaker: 0, text: 'You saved me from myself. …Can I have a night-light? A small one?' },
      },
    ],
    ending: [
      { speaker: 'chef', text: 'Mothball now sleeps next to a tiny night-light shaped like a spoon. Everyone is much calmer.' },
    ],
  },
  {
    id: 'side-pizza', title: "PIZZARAPTOR'S RUSH HOUR", tagline: 'thirty minutes or it\'s free (it\'s never free)', hero: 11, still: 'side-pizza',
    chapters: [
      {
        title: 'Hot and Fresh', table: 11, rounds: 2, goal: 'crumbs',
        rivals: [{ species: 11, level: 'normal' }, { species: 0, level: 'easy' }],
        intro: [
          { speaker: 0, text: 'Pizzaraptor Delivery! Thirty seconds or it\'s FREE! I\'m racing YOU for the tips!' },
          { speaker: 'chef', text: 'Pizzaraptor bets you can\'t out-eat him on his own breakfast route.' },
        ],
        tip: 'CRUMB RACE: grab crumbs fast and don\'t get knocked out, or you drop half!',
        win: { speaker: 0, text: 'Out-eaten?! On MY route? Okay. The lunch rush is next. Bring friends.' },
      },
      {
        title: 'Lunch Rush', table: 9, rounds: 2, goal: 'team',
        rivals: [{ species: 11, level: 'normal', ally: true }, { species: 13, level: 'normal' }, { species: 15, level: 'normal' }],
        intro: [
          { speaker: 0, text: 'Rival delivery crew! Avocado toast and hot dogs, stealing MY customers! Team up!' },
          { speaker: 1, text: 'Guac delivery is faster. Everyone knows it.' },
        ],
        tip: 'TEAM UP: you and Pizzaraptor vs the rival crew. The dough is sticky: dash out of it!',
        win: { speaker: 0, text: 'Delivered! Last stop: the BIG order. Table for… everyone.' },
      },
      {
        title: 'Extra Large', table: 10, rounds: 3, goal: 'survive', surviveFor: 50,
        rivals: [{ species: 11, level: 'tough' }, { species: 13, level: 'normal' }, { species: 15, level: 'normal' }, { species: 1, level: 'normal' }],
        intro: [
          { speaker: 0, text: 'Plot twist! The big order was a TRAP. Everyone wants the champ off the table. Including me!' },
          { speaker: 3, text: 'Eight arms say you won\'t last fifty seconds.' },
        ],
        tip: 'SURVIVE fifty seconds against four rivals on the spinning table. Ride the spin!',
        win: { speaker: 0, text: 'Fifty seconds! That\'s a delivery record. Here, a free slice. It\'s never free. Except this once.' },
      },
    ],
    ending: [
      { speaker: 'chef', text: 'Pizzaraptor names a pizza after you: the Kaiju Supreme. Extra cheese, extra chaos.' },
    ],
  },
];

/** Side stories open once Grand Feast ch5 is reached (ch4 cleared). EASY TO CHANGE. */
export const SIDE_AFTER_CHAPTER = 4;
export const sideCut = (s: SideStory, end: boolean): Cutscene => ({ key: s.still, noVideo: true, heading: end ? `${s.title}: THE END` : s.title, caption: end ? s.ending[0].text : s.tagline });
