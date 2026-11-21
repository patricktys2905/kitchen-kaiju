// 🛎 "Room Service": the fourth Story campaign. The Grand Hotel's kitchen needs a champion; every floor is a
// different job. Uses the newer goals: 👑 zone, 🛡 protect, ⏱ survive, and a two-boss finale.
// EASY TO CUSTOMISE: chapters, lines, tips, captions all live here.
// Species: 0 Gobzilla 1 Squidgeon 2 Crabbage 4 Mothball 5 Toastbat 8 Chocomunch 9 Bubblegumbo 11 Pizzaraptor 12 Sloba 13 Avocadrake
//          14 Salmonster 15 Hotchog 16 Minturtle 17 Pengwhip 18 Velvaroo
// Tables:  0 Sunday Roast 1 Dinner for Four 4 Birthday Bash 6 Diner Griddle 7 Ice Cream Parlour 9 Bakery Bench 11 Breakfast Rush 17 Pancake Stack
import type { Chapter, Line } from './chapters';
import type { Cutscene } from './cutscenes';

export const ROOM_CHAPTERS: Chapter[] = [
  {
    title: 'Check-In', table: 0, rounds: 2, goal: 'zone', zoneHold: 15,
    rivals: [{ species: 2, level: 'easy' }, { species: 12, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'The Grand Hotel needs a new head of Room Service. The job goes to whoever rules the kitchen… floor by floor.' },
      { speaker: 0, text: 'Snip snip! The front desk plate is MINE. Take a number!' },
      { speaker: 1, text: 'I\'ve been in the queue for… zzz… three days.' },
    ],
    tip: 'KING OF THE PLATE: stand ALONE in the gold circle. If two of you are in it, nobody scores. Shove them out!',
    win: { speaker: 0, text: 'Checked out… by a newcomer. Breakfast is on the first floor. Good luck getting a seat.' },
    meanwhile: 'Meanwhile, on the top floor, a manager in a slice-of-toast suit reads your name on the guest list. And smiles.',
  },
  {
    title: 'Breakfast Buffet', table: 11, rounds: 2, goal: 'crumbs',
    rivals: [{ species: 11, level: 'normal' }, { species: 8, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'All-you-can-eat? Challenge ACCEPTED. RAWR!' },
      { speaker: 1, text: 'I am a golem. Of chocolate. I eat until I am a BIGGER golem.' },
    ],
    tip: 'CRUMB RACE: grab crumbs and don\'t get knocked out, or you drop half! Toasters fire across the table.',
    win: { speaker: 0, text: 'Out-eaten at a BUFFET?! I need a lie-down. Housekeeping is upstairs.' },
    meanwhile: 'Meanwhile, every toaster in the hotel pops at once. A note pops out: "Welcome. Enjoy your stay. — The Manager."',
  },
  {
    title: 'Housekeeping', table: 9, rounds: 2, goal: 'protect',
    rivals: [{ species: 16, level: 'normal', ally: true }, { species: 4, level: 'easy' }, { species: 5, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'I\'m on cleaning duty, but I\'m sloooow. Those two keep knocking me off my cart!' },
      { speaker: 1, text: 'The sheets are SO soft. And the lamp is SO bright. Must… sit… on cart.' },
      { speaker: 2, text: 'Toast doesn\'t do chores. Toast does CHAOS.' },
    ],
    tip: 'PROTECT: Minturtle (green ring) must stay on the table. If he\'s knocked out, you lose the round!',
    win: { speaker: 0, text: 'All clean! Thank you, champ. The pool is next. Watch out for the lifeguard… he\'s a fish.' },
    meanwhile: 'Meanwhile, the Night Manager moves a chess piece shaped like you up one floor.',
  },
  {
    title: 'Pool Party', table: 7, rounds: 3, boss: true, bossBelly: 80,
    rivals: [{ species: 14, level: 'normal', boss: true }, { species: 1, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'No running by the pool! No throwing! No… actually, throwing is fine. I LOVE throwing.' },
      { speaker: 1, text: 'Eight arms, one rubber ring. I\'m on lifeguard duty too!' },
    ],
    tip: 'BOSS: Salmonster starts almost ready to go KAIJU, and the floor is slippery. Brake early, strike late!',
    win: { speaker: 0, text: 'I\'ve been… gutted. The elevator\'s that way. It\'s always full of trouble.' },
    meanwhile: 'Meanwhile, Salmonster sulks on a pool float. Squidgeon gently paddles him around in circles.',
  },
  {
    title: 'Elevator Brawl', table: 1, rounds: 2, goal: 'survive', surviveFor: 40,
    rivals: [{ species: 13, level: 'normal' }, { species: 17, level: 'normal' }, { species: 9, level: 'easy' }],
    intro: [
      { speaker: 'chef', text: 'Going up! The elevator is small, the guests are grumpy, and the ride is forty seconds long.' },
      { speaker: 0, text: 'Elevator etiquette: no talking, no eye contact, no CHAMPIONS.' },
      { speaker: 1, text: 'Push the button for the top floor. Then push the champ OUT.' },
    ],
    tip: 'SURVIVE: stay on the table for 40 seconds. You don\'t have to win, just don\'t fall!',
    win: { speaker: 0, text: 'Ding! Your floor. Mine too, sadly. There\'s a wedding on the next one.' },
    meanwhile: 'Meanwhile, the Night Manager cancels the wedding cake order. Then re-orders it. Twice as big.',
  },
  {
    title: 'The Wedding Cake', table: 4, rounds: 3, goal: 'zone', zoneHold: 18,
    rivals: [{ species: 18, level: 'normal' }, { species: 0, level: 'normal' }, { species: 12, level: 'easy' }],
    intro: [
      { speaker: 0, text: 'The middle of the table is where the cake goes. And where I go. Hop off!' },
      { speaker: 1, text: 'I\'m the best man. The best man gets the BEST spot.' },
      { speaker: 2, text: 'Are we there yet? Is the cake there yet? zzz.' },
    ],
    tip: 'KING OF THE PLATE: hold the middle alone for 18 seconds. Wind gusts blow everyone around, use them!',
    win: { speaker: 0, text: 'You crashed a wedding AND won it. Room Service is calling… it sounds urgent.' },
    meanwhile: 'Meanwhile, a room-service trolley rolls out of the kitchen on its own. Something is hiding under the cloche.',
  },
  {
    title: 'Room Service Rush', table: 6, rounds: 3, goal: 'protect',
    rivals: [{ species: 9, level: 'normal', ally: true }, { species: 15, level: 'tough' }, { species: 13, level: 'normal' }],
    intro: [
      { speaker: 0, text: 'I\'m carrying the Night Manager\'s breakfast. If I drop it, we\'re BOTH fired! Keep me safe!' },
      { speaker: 1, text: 'Hot dog delivery, coming through! Those trays are MINE.' },
    ],
    tip: 'PROTECT: Bubblegumbo (green ring) must stay on the table. The burners flare, keep him off them!',
    win: { speaker: 0, text: 'Delivered! Top floor, room 1. He\'s expecting you. He\'s ALWAYS been expecting you.' },
    meanwhile: 'Meanwhile, on the top floor, the Night Manager straightens his crust and calls his best guest.',
  },
  {
    title: 'The Night Manager', table: 17, rounds: 3, boss: true,
    rivals: [{ species: 5, level: 'normal', boss: true }, { species: 18, level: 'normal', boss: true }],
    intro: [
      { speaker: 0, text: 'Welcome to the top floor. I am the NIGHT MANAGER. Nobody leaves my hotel a champion.' },
      { speaker: 1, text: 'And I\'m his favourite guest. Two crowns, one champ. Do the maths.' },
      { speaker: 0, text: 'Your check-out time is… NOW!' },
    ],
    tip: 'FINAL BOSSES: Toastbat AND Velvaroo both start ready to go KAIJU. Split them up, and mind the spatula!',
    win: { speaker: 0, text: '…Fine. The job is yours. Head of Room Service. Please don\'t trash the lobby. Again.' },
  },
];

export const ROOM_ENDING: Line[] = [
  { speaker: 'chef', text: 'You are the new HEAD OF ROOM SERVICE at the Grand Hotel. Your first order? A very big snack.' },
  { speaker: 'chef', text: 'Toastbat hands over the golden key card. Velvaroo asks for extra towels.' },
  { speaker: 'chef', text: 'Feast, Seconds, Night Market AND Room Service. (Go for 3 stars, or try the new side stories!)' },
];

export const ROOM_OPENING: Cutscene = { key: 'room-open', noVideo: true, heading: 'ROOM SERVICE', caption: 'The Grand Hotel needs a champion. Floor by floor, table by table.' };
export const ROOM_END_CUT: Cutscene = { key: 'room-end', noVideo: true, heading: 'CHECKED IN FOR GOOD', caption: 'Head of Room Service. The key card is gold. Obviously.' };
export const ROOM_CUTS: Cutscene[] = [];
