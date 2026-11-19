// 🎟 Chef's Pass: a challenge route into the hard Story content. Earn it with Trial stars OR a deep Gauntlet run,
// and Spicy works on every chapter you've reached (not only cleared ones) and the 🍰 Dessert Course opens early.
// EASY TO CUSTOMISE: the two thresholds below.
import { gauntletBest } from './gauntlet';
import { totalTrialStars } from './trials';

export const CHEFS_PASS = { trialStars: 12, gauntletWave: 8 };

export function chefsPass(): boolean {
  return totalTrialStars() >= CHEFS_PASS.trialStars || gauntletBest() >= CHEFS_PASS.gauntletWave;
}

/** Progress line for the Challenges screens. */
export function chefsPassText(): string {
  if (chefsPass()) return "🎟 CHEF'S PASS earned: 🌶️ Spicy works on every chapter you've reached, and the 🍰 Dessert Course is open";
  return `🎟 CHEF'S PASS: ${totalTrialStars()}/${CHEFS_PASS.trialStars} Trial ★ or Gauntlet wave ${gauntletBest()}/${CHEFS_PASS.gauntletWave} → opens 🌶️ Spicy on any reached chapter + the 🍰 Dessert Course early`;
}
