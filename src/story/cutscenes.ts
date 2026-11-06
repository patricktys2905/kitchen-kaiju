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
  heading: 'CHAMPION OF THE FEAST',
  caption: 'The Golden Spoon is yours! Now… who’s doing the dishes?',
};

/** One per chapter, same order as CHAPTERS. */
export const CHAPTER_CUTS: Cutscene[] = [
  { key: 'cut-0', heading: 'CHAPTER 1 · THE FIRST COURSE', caption: 'Crabbage is feeling a little… crabby.' },
  { key: 'cut-1', heading: 'CHAPTER 2 · DINNER FOR FOUR', caption: 'Two’s company. Four’s a food fight.' },
  { key: 'cut-2', heading: 'CHAPTER 3 · LEFTOVERS', caption: 'Nobody puts leftovers in a corner.' },
  { key: 'cut-3', heading: 'CHAPTER 4 · BOSS OF THE BELT', caption: 'Norigon runs this joint. Better roll with it.' },
  { key: 'cut-4', heading: 'CHAPTER 5 · PARTY CRASHERS', caption: 'Not invited. Came anyway. Ate the cake. Typical.' },
  { key: 'cut-5', heading: 'CHAPTER 6 · ON THE CHOPPING BLOCK', caption: 'Things are about to get… dicey.' },
  { key: 'cut-6', heading: 'CHAPTER 7 · SHORT ORDER SHOWDOWN', caption: 'Order up! Today’s special: you, extra crispy.' },
  { key: 'cut-7', heading: 'CHAPTER 8 · THE BIG MELT', caption: 'Bloblin has a cold heart and a short fuse. Chill.' },
  { key: 'cut-8', heading: 'CHAPTER 9 · PICNIC PANIC', caption: 'Ants in their pants. Grapes in their… everything.' },
  { key: 'cut-9', heading: 'CHAPTER 10 · PROVING THE DOUGH', caption: 'Let’s see who rises to the occasion.' },
  { key: 'cut-10', heading: 'CHAPTER 11 · ROUND AND ROUND', caption: 'The lazy Susan spins. So does Onigori. Wheee.' },
  { key: 'cut-11', heading: 'CHAPTER 12 · THE GRAND FEAST', caption: 'Dumplord has waited all night. He’s stuffed… with rage.' },
];

export const ALL_CUTS: Cutscene[] = [OPENING, ...CHAPTER_CUTS, ENDING_CUT];
