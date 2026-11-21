// 🏅 SEASONS & RANKS. A season is one calendar month (your device's clock).
// SEASON TRACK: every match you finish earns season XP; each tier pays Chef Tokens once.
// RANKED: you + 3 bots, best of 3. Win: + rank points (RP); lose: - RP. Your rank picks how tough the bots are.
// A new season starts the ladder again from half your RP, and pays a bonus for the best rank you reached.
// Stored on this device only (no server). EASY TO CUSTOMISE: SEASON, RANKS, THEMES.
import { addTokens } from './meta';
import type { Difficulty } from './sim/bot';

export const SEASON = {
  xp: { play: 10, win: 20, ko: 2, ranked: 15 }, // season XP per match (ranked matches add a bit extra)
  tierXp: 100, // XP per tier
  tiers: 20,
  tierTokens: (tier: number) => (tier % 5 === 0 ? 100 : 30), // 🪙 for reaching each tier (every 5th is big)
  rp: { win: 25, loss: -15, streakBonus: 5, streakCap: 3, placeWin: 40 }, // placement: first 3 ranked games
  carry: 0.5, // RP kept into a new season
};

export interface Rank { name: string; icon: string; min: number; bots: Difficulty[]; seasonTokens: number }
/** Ladder, lowest first. `bots` = the three rivals' levels at this rank. */
export const RANKS: Rank[] = [
  { name: 'BRONZE SPOON', icon: '🥉', min: 0, bots: ['easy', 'normal', 'normal'], seasonTokens: 50 },
  { name: 'SILVER SPOON', icon: '🥈', min: 100, bots: ['normal', 'normal', 'tough'], seasonTokens: 100 },
  { name: 'GOLD SPOON', icon: '🥇', min: 250, bots: ['normal', 'tough', 'tough'], seasonTokens: 175 },
  { name: 'PLATINUM PLATE', icon: '🍽', min: 450, bots: ['tough', 'tough', 'hard'], seasonTokens: 250 },
  { name: 'DIAMOND DISH', icon: '💎', min: 700, bots: ['tough', 'hard', 'hard'], seasonTokens: 350 },
  { name: 'MASTER CHEF', icon: '👑', min: 1000, bots: ['hard', 'hard', 'brutal'], seasonTokens: 500 },
];
export const rankOf = (rp: number): Rank => RANKS.slice().reverse().find(r => rp >= r.min) ?? RANKS[0];
export const nextRank = (rp: number): Rank | null => RANKS.find(r => r.min > rp) ?? null;

/** Each month has a name (12, then they repeat). */
export const THEMES = [
  '❄ FROZEN FEAST', '💘 SWEETHEART SUPPER', '🍀 LUCKY LUNCH', '🐣 EGG HUNT', '🌸 PICNIC SEASON', '☀ BARBECUE SUMMER',
  '🍉 MELON MADNESS', '🏖 BEACH BUFFET', '🍎 HARVEST HELPINGS', '🎃 SPOOKY SNACKS', '🍂 GRAVY TRAIN', '🎄 FESTIVE FEAST',
];

export interface SeasonSave {
  id: string; // 'YYYY-MM'
  xp: number;
  paidTier: number; // tiers already paid
  rp: number;
  best: number; // best RP this season
  played: number; // ranked games this season
  wins: number;
  streak: number;
  history: { id: string; best: number }[]; // past seasons
}

export const seasonId = (d = new Date()): string => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
export const seasonName = (id: string): string => THEMES[(Number(id.slice(5)) - 1) % 12] ?? 'SEASON';
export function daysLeft(d = new Date()): number {
  const end = new Date(d.getFullYear(), d.getMonth() + 1, 1);
  return Math.max(1, Math.ceil((end.getTime() - d.getTime()) / 86400000));
}

const KEY = 'kk-season-v1';
const blank = (id: string, rp = 0): SeasonSave => ({ id, xp: 0, paidTier: 0, rp, best: rp, played: 0, wins: 0, streak: 0, history: [] });

/** The current season's save. A new month rolls it over: returns the end-of-season payout for the old one. */
export function loadSeason(now = new Date()): { s: SeasonSave; rolled: { from: string; rank: Rank; tokens: number } | null } {
  const id = seasonId(now);
  let s: SeasonSave;
  try { s = JSON.parse(localStorage.getItem(KEY) ?? 'null') ?? blank(id); } catch { s = blank(id); }
  if (s.id === id) return { s, rolled: null };
  const rank = rankOf(s.best);
  const played = s.played > 0;
  const next: SeasonSave = { ...blank(id, Math.floor(s.rp * SEASON.carry)), history: [...s.history, { id: s.id, best: s.best }].slice(-12) };
  saveSeason(next);
  return { s: next, rolled: played ? { from: s.id, rank, tokens: rank.seasonTokens } : null };
}
export function saveSeason(s: SeasonSave): void { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* blocked */ } }

export const tierOf = (xp: number): number => Math.min(SEASON.tiers, Math.floor(xp / SEASON.tierXp));

/** Season XP for a finished match. Returns tokens to pay for newly reached tiers, and a line for the receipt. */
export function addSeasonXp(s: SeasonSave, m: { won: boolean; kos: number; ranked?: boolean }): { tokens: number; line: string } {
  const gain = SEASON.xp.play + (m.won ? SEASON.xp.win : 0) + m.kos * SEASON.xp.ko + (m.ranked ? SEASON.xp.ranked : 0);
  const before = tierOf(s.xp);
  s.xp += gain;
  const after = tierOf(s.xp);
  let tokens = 0;
  for (let t = Math.max(before, s.paidTier) + 1; t <= after; t++) tokens += SEASON.tierTokens(t);
  s.paidTier = Math.max(s.paidTier, after);
  const line = after > before
    ? `🏅 Season tier ${after}! +${tokens} 🪙`
    : after >= SEASON.tiers ? `🏅 Season track complete! (+${gain} XP)` : `🏅 +${gain} season XP · tier ${after} → ${after + 1}: ${s.xp % SEASON.tierXp}/${SEASON.tierXp}`;
  return { tokens, line };
}

/** RP change for a ranked match (placement games count extra; a streak adds a little). */
export function rankedResult(s: SeasonSave, won: boolean): { delta: number; line: string; promoted: Rank | null; demoted: Rank | null } {
  const before = rankOf(s.rp);
  s.played++;
  let delta: number;
  if (won) {
    s.wins++;
    s.streak = Math.max(1, s.streak + 1);
    delta = (s.played <= 3 ? SEASON.rp.placeWin : SEASON.rp.win) + Math.min(SEASON.rp.streakCap, s.streak - 1) * SEASON.rp.streakBonus;
  } else {
    s.streak = 0;
    delta = before === RANKS[0] && s.rp < RANKS[1].min / 2 ? 0 : SEASON.rp.loss; // no losses at the very bottom
  }
  s.rp = Math.max(0, s.rp + delta);
  s.best = Math.max(s.best, s.rp);
  const after = rankOf(s.rp);
  const promoted = after.min > before.min ? after : null, demoted = after.min < before.min ? after : null;
  const line = promoted ? `⬆ PROMOTED: ${after.icon} ${after.name}!` : demoted ? `⬇ Down to ${after.icon} ${after.name}` : `${after.icon} ${after.name} · ${s.rp} RP (${delta >= 0 ? '+' : ''}${delta})`;
  return { delta, line, promoted, demoted };
}

/** The season save, with any end-of-season payout already paid (and remembered for the Season screen). */
export function currentSeason(now = new Date()): SeasonSave {
  const { s, rolled } = loadSeason(now);
  if (rolled) {
    addTokens(rolled.tokens);
    try { localStorage.setItem('kk-season-roll', JSON.stringify(rolled)); } catch { /* blocked */ }
  }
  return s;
}
/** The last season's result, shown once on the Season screen. */
export function takeSeasonRoll(): { from: string; rank: Rank; tokens: number } | null {
  try { const r = JSON.parse(localStorage.getItem('kk-season-roll') ?? 'null'); localStorage.removeItem('kk-season-roll'); return r; } catch { return null; }
}

/** Your best Ranked RP in any season (for unlocks). Reads the save without rolling it over. */
export function bestRp(): number {
  try { const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as SeasonSave | null; return s ? Math.max(s.best, ...s.history.map(h => h.best)) : 0; } catch { return 0; }
}
