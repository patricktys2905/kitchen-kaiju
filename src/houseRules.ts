// 💾 House Rules: save your favourite setup (mode, rounds, twist, power-ups, hazards, table, bot level) in 3 slots,
// and share it as a short code. EASY TO CUSTOMISE: SLOTS, and the fields in HouseRules.
export interface HouseRules {
  party: boolean; mode: string; rounds: number; mutator: string; powerups: boolean; hazards: boolean; table: number; difficulty: string; catchUp?: boolean;
}
export const SLOTS = 3;
const KEY = 'kk-house-rules-v1';

export function loadRules(): (HouseRules | null)[] {
  try { const a = JSON.parse(localStorage.getItem(KEY) ?? '[]') as (HouseRules | null)[]; return Array.from({ length: SLOTS }, (_, i) => a[i] ?? null); } catch { return Array(SLOTS).fill(null); }
}
export function saveRules(slot: number, r: HouseRules): void {
  const a = loadRules(); a[slot] = r;
  try { localStorage.setItem(KEY, JSON.stringify(a)); } catch { /* blocked */ }
}
/** A shareable code like "KK1-…" (base64 of the rules). */
export const rulesCode = (r: HouseRules): string => 'KK1-' + btoa(JSON.stringify([r.party ? 1 : 0, r.mode, r.rounds, r.mutator, r.powerups ? 1 : 0, r.hazards ? 1 : 0, r.table, r.difficulty]));
export function parseCode(code: string): HouseRules | null {
  try {
    const a = JSON.parse(atob(code.trim().replace(/^KK1-/, ''))) as [number, string, number, string, number, number, number, string];
    if (!Array.isArray(a) || a.length < 8) return null;
    return { party: !!a[0], mode: String(a[1]), rounds: Math.max(1, Math.min(9, Number(a[2]) || 3)), mutator: String(a[3]), powerups: !!a[4], hazards: !!a[5], table: Number(a[6]) || -1, difficulty: String(a[7]) };
  } catch { return null; }
}
export const rulesSummary = (r: HouseRules): string => `${r.mode === 'classic' ? 'Classic' : r.mode} · first to ${r.rounds}${r.mutator !== 'none' ? ' · ⚡' + r.mutator : ''}${r.powerups ? '' : ' · no power-ups'}${r.hazards ? '' : ' · no hazards'} · ${r.difficulty} bots`;
