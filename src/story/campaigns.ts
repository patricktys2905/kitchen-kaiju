// Story campaigns. The Story map plays one at a time; each has its own chapters, cutscenes, ending and save.
// EASY TO CUSTOMISE: add a campaign here (and a button on the Story map picks it up).
import { CHAPTERS, ENDING, type Chapter, type Line } from './chapters';
import { CHAPTER_CUTS, ENDING_CUT, OPENING, type Cutscene } from './cutscenes';
import { loadStory } from './save';
import { SECONDS_CHAPTERS, SECONDS_CUTS, SECONDS_END_CUT, SECONDS_ENDING, SECONDS_OPENING } from './seconds';

export type CampaignId = 'main' | 'seconds';

export interface Campaign {
  id: CampaignId;
  title: string;
  tagline: string;
  chapters: Chapter[];
  cuts: Cutscene[];
  opening: Cutscene;
  endingCut: Cutscene;
  ending: Line[];
  saveKey: string;
}

export const CAMPAIGNS: Record<CampaignId, Campaign> = {
  main: { id: 'main', title: 'THE GRAND FEAST', tagline: 'conquer every table to win the Golden Spoon', chapters: CHAPTERS, cuts: CHAPTER_CUTS, opening: OPENING, endingCut: ENDING_CUT, ending: ENDING, saveKey: 'kk-story-v1' },
  seconds: { id: 'seconds', title: 'SECOND HELPINGS', tagline: 'the back of the fridge wants a rematch', chapters: SECONDS_CHAPTERS, cuts: SECONDS_CUTS, opening: SECONDS_OPENING, endingCut: SECONDS_END_CUT, ending: SECONDS_ENDING, saveKey: 'kk-story2-v1' },
};

/** Second Helpings opens once chapter 6 of The Grand Feast is cleared. EASY TO CHANGE. */
export const SECONDS_AFTER_CHAPTER = 6;
export function secondsUnlocked(): boolean {
  const main = loadStory();
  return main.endingSeen || (main.stars[SECONDS_AFTER_CHAPTER - 1] ?? 0) > 0;
}

export const loadCampaign = (c: Campaign) => loadStory(c.saveKey, c.chapters.length);
