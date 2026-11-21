import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { addSeasonXp, currentSeason, loadSeason, rankedResult, rankOf, RANKS, SEASON, saveSeason, type SeasonSave } from '../src/seasons';

const fresh = (rp = 0): SeasonSave => ({ id: '2026-11', xp: 0, paidTier: 0, rp, best: rp, played: 0, wins: 0, streak: 0, history: [] });
let store: Record<string, string> = {};

describe('🏅 seasons & ranks', () => {
  beforeEach(() => { store = {}; (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; } }; });
  afterEach(() => { delete (globalThis as { localStorage?: unknown }).localStorage; });

  it('season XP fills tiers and pays each tier once', () => {
    const s = fresh();
    let paid = 0;
    for (let i = 0; i < 4; i++) paid += addSeasonXp(s, { won: true, kos: 0 }).tokens; // 4 × 30 XP = 120: tier 1
    expect(paid).toBe(SEASON.tierTokens(1));
    s.xp = 0; // the tier is never paid twice
    expect(addSeasonXp(s, { won: true, kos: 50 }).tokens).toBe(0);
  });

  it('ranked wins climb the ladder, losses drop RP, and the bottom is safe', () => {
    const s = fresh();
    expect(rankedResult(s, false).delta).toBe(0); // nothing to lose at the bottom
    for (let i = 0; i < 4; i++) rankedResult(s, true);
    expect(rankOf(s.rp).min).toBeGreaterThanOrEqual(RANKS[1].min);
    const before = s.rp;
    rankedResult(s, false);
    expect(s.rp).toBe(before + SEASON.rp.loss);
    expect(s.best).toBe(before);
  });

  it('a new month starts a new season from half the RP and pays the best rank', () => {
    saveSeason({ ...fresh(300), best: 460, played: 10 });
    const { s, rolled } = loadSeason(new Date(2026, 11, 3)); // December
    expect(s.id).toBe('2026-12');
    expect(s.rp).toBe(150);
    expect(rolled?.rank.name).toBe(rankOf(460).name);
    expect(s.history[0]).toEqual({ id: '2026-11', best: 460 });
    expect(currentSeason(new Date(2026, 11, 4)).id).toBe('2026-12'); // same month: no second rollover
  });
});
