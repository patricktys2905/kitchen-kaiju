// Story cutscenes: a short animated clip (Google Flow / Veo, from a Gemini still) before each chapter,
// plus an opening and an ending. The punny caption is drawn by the game so it always reads cleanly.
// Assets: public/video/<key>.mp4 (clip) and public/art/<key>.webp (still; poster + offline fallback).

export interface Cutscene {
  key: string;
  heading: string; // small line above the caption
  caption: string;
  noVideo?: boolean; // no usable clip: show the still with a slow zoom
  rev?: number; // bump when a clip is remade so it auto-plays once more for players who saw the old one
}

/** The id stored in the save once a cutscene has been watched. */
export const seenId = (c: Cutscene) => (c.rev ? `${c.key}#${c.rev}` : c.key);

export const OPENING: Cutscene = {
  key: 'cut-open',
  rev: 2, // new opening (Bluebeary, Gobzilla Jr., Bloblin)
  heading: 'THE GRAND FEAST',
  caption: 'One table. One Golden Spoon. Dinner is served… and so are you.',
};

export const ENDING_CUT: Cutscene = {
  key: 'cut-end',
  rev: 2, // new cast
  heading: 'CHAMPION OF THE FEAST',
  caption: 'The Golden Spoon is yours! Now… who’s doing the dishes?',
};

/** One per chapter, same order as CHAPTERS. */
export const CHAPTER_CUTS: Cutscene[] = [
  { key: 'cut-0', heading: 'CHAPTER 1 · THE FIRST COURSE', caption: 'Crabbage is feeling a little… crabby.' },
  { key: 'cut-1', heading: 'CHAPTER 2 · DINNER FOR FOUR', caption: 'Two’s company. Four’s a food fight.' },
  { key: 'cut-2', rev: 3, heading: 'CHAPTER 3 · LEFTOVERS', caption: 'Nobody puts leftovers in a corner.' },
  { key: 'cut-3', heading: 'CHAPTER 4 · BOSS OF THE BELT', caption: 'Norigon runs this joint. Better roll with it.' },
  { key: 'cut-4', heading: 'CHAPTER 5 · PARTY CRASHERS', caption: 'Not invited. Came anyway. Ate the cake. Typical.' },
  { key: 'cut-5', heading: 'CHAPTER 6 · ON THE CHOPPING BLOCK', caption: 'Things are about to get… dicey.' },
  { key: 'cut-6', rev: 4, heading: 'CHAPTER 7 · SHORT ORDER SHOWDOWN', caption: 'Order up! Today’s special: you, extra crispy.' },
  { key: 'cut-7', rev: 3, heading: 'CHAPTER 8 · THE BIG MELT', caption: 'Bloblin has a cold heart and a short fuse. Chill.' },
  { key: 'cut-8', rev: 2, heading: 'CHAPTER 9 · PICNIC PANIC', caption: 'A picnic! Sloba will get to it… eventually.' },
  { key: 'cut-9', heading: 'CHAPTER 10 · PROVING THE DOUGH', caption: 'Let’s see who rises to the occasion.' },
  { key: 'cut-10', rev: 3, // clip: Hotchog patched in place (it used to leave its bun)
    heading: 'CHAPTER 11 · ROUND AND ROUND', caption: 'The lazy Susan spins. Hotchog relishes every second.' },
  { key: 'cut-11', rev: 4, // new closed-mouth still + clip (Nov 2026)
    heading: 'CHAPTER 12 · THE GRAND FEAST', caption: 'Dumplord has waited all night. He’s stuffed… with rage.' },
];

export const ALL_CUTS: Cutscene[] = [OPENING, ...CHAPTER_CUTS, ENDING_CUT];

/** 🗯 Comic panels: a funny "after the boss fight" still, shown once after you beat each mid-campaign boss.
 * Art: public/art/comic-*.webp (scripts/make-comic-jobs.mjs). EASY TO CUSTOMISE: captions here. */
export const COMICS: Record<string, Cutscene> = {
  'main:3': { key: 'comic-ch4', noVideo: true, heading: 'MEANWHILE, ON THE CONVEYOR BELT…', caption: 'Norigon is on a roll. Downhill. Salmonster can\'t believe its eyes.' },
  'main:5': { key: 'comic-ch6', noVideo: true, heading: 'MEANWHILE, BEHIND THE BAMBOO STEAMER…', caption: 'Two eyes in the steam. Someone is taking notes on every table you clear.' },
  'main:8': { key: 'comic-ch9', noVideo: true, heading: 'LATER, IN THE DARK PANTRY…', caption: 'A round shadow tries on a golden crown. It fits. It giggles.' },
  'main:10': { key: 'comic-ch11', noVideo: true, heading: 'THE STEAMER LID LIFTS…', caption: 'It was DUMPLORD all along. The quiet one. The host. The final course.' },
  'main:7': { key: 'comic-ch8', noVideo: true, heading: 'LATER, AT THE PARLOUR…', caption: 'Bloblin is NOT sulking. Bloblin is just… setting. Mothball brings comfort.' },
  'room:3': { key: 'comic-room4', noVideo: true, heading: 'MEANWHILE, AT THE POOL…', caption: 'Salmonster sulks on a pool float. Squidgeon paddles him in gentle circles.' },
  'night:3': { key: 'comic-night4', noVideo: true, heading: 'MEANWHILE, ON THE LAMP POST…', caption: 'Tacowl counts his bribe: forty jars of mustard. Sloba sleeps on the change.' },
  'seconds:3': { key: 'comic-s4', noVideo: true, heading: 'MEANWHILE, IN THE FREEZER…', caption: 'The ice queen slipped. Minturtle offers a flipper. The crown keeps sliding.' },
};
