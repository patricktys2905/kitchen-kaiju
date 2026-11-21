// Story campaigns. The Story map plays one at a time; each has its own chapters, cutscenes, ending and save.
// EASY TO CUSTOMISE: add a campaign here (the 📚 CAMPAIGNS picker on the Story map lists them all).
import { CHAPTERS, ENDING, type Chapter, type Line } from './chapters';
import { CHAPTER_CUTS, ENDING_CUT, OPENING, type Cutscene } from './cutscenes';
import { NIGHT_CHAPTERS, NIGHT_CUTS, NIGHT_END_CUT, NIGHT_ENDING, NIGHT_OPENING } from './night';
import { loadStory } from './save';
import { SECONDS_CHAPTERS, SECONDS_CUTS, SECONDS_END_CUT, SECONDS_ENDING, SECONDS_OPENING } from './seconds';
import { SIDE_AFTER_CHAPTER, SIDE_STORIES, sideCut } from './side';

export type CampaignId = string; // 'main' | 'seconds' | 'night' | 'side-…'

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
  side?: boolean; // 📕 a short side story
  hero?: number; // side stories: the kaiju it's about
}

export const CAMPAIGNS: Record<CampaignId, Campaign> = {
  main: { id: 'main', title: 'THE GRAND FEAST', tagline: 'conquer every table to win the Golden Spoon', chapters: CHAPTERS, cuts: CHAPTER_CUTS, opening: OPENING, endingCut: ENDING_CUT, ending: ENDING, saveKey: 'kk-story-v1' },
  seconds: { id: 'seconds', title: 'SECOND HELPINGS', tagline: 'the back of the fridge wants a rematch', chapters: SECONDS_CHAPTERS, cuts: SECONDS_CUTS, opening: SECONDS_OPENING, endingCut: SECONDS_END_CUT, ending: SECONDS_ENDING, saveKey: 'kk-story2-v1' },
  night: { id: 'night', title: 'THE NIGHT MARKET', tagline: 'someone stole the Golden Spoon', chapters: NIGHT_CHAPTERS, cuts: NIGHT_CUTS, opening: NIGHT_OPENING, endingCut: NIGHT_END_CUT, ending: NIGHT_ENDING, saveKey: 'kk-story3-v1' },
};
for (const s of SIDE_STORIES) CAMPAIGNS[s.id] = { id: s.id, title: s.title, tagline: s.tagline, chapters: s.chapters, cuts: [], opening: sideCut(s, false), endingCut: sideCut(s, true), ending: s.ending, saveKey: `kk-${s.id}-v1`, side: true, hero: s.hero };

/** Order on the 📚 CAMPAIGNS picker. */
export const CAMPAIGN_ORDER: CampaignId[] = ['main', 'seconds', 'night', ...SIDE_STORIES.map(s => s.id)];

/** Second Helpings opens once chapter 6 of The Grand Feast is cleared. EASY TO CHANGE. */
export const SECONDS_AFTER_CHAPTER = 6;
export function secondsUnlocked(): boolean {
  const main = loadStory();
  return main.endingSeen || (main.stars[SECONDS_AFTER_CHAPTER - 1] ?? 0) > 0;
}

/** 🌙 The Night Market opens after the Grand Feast ending (or the Second Helpings ending). */
export function nightUnlocked(): boolean {
  return loadStory().endingSeen || loadCampaign(CAMPAIGNS.seconds).endingSeen;
}

/** 📕 Side stories open once Grand Feast chapter SIDE_AFTER_CHAPTER is cleared. */
export function sideUnlocked(): boolean {
  const main = loadStory();
  return main.endingSeen || (main.stars[SIDE_AFTER_CHAPTER - 1] ?? 0) > 0;
}

/** Can this campaign be played yet? And if not, why (for the picker). */
export function campaignLock(id: CampaignId): string | null {
  if (id === 'main') return null;
  if (id === 'seconds') return secondsUnlocked() ? null : `clear Grand Feast ch${SECONDS_AFTER_CHAPTER}`;
  if (id === 'night') return nightUnlocked() ? null : 'finish the Grand Feast';
  return sideUnlocked() ? null : `clear Grand Feast ch${SIDE_AFTER_CHAPTER}`;
}

export const loadCampaign = (c: Campaign) => loadStory(c.saveKey, c.chapters.length);
