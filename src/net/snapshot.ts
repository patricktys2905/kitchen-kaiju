// Compact game-state snapshots for online play. The host's World is the only real simulation;
// guests copy snapshots into a local World that is used purely for rendering.
import type { CutleryKind } from '../sim/cutlery';
import { LAYOUTS } from '../sim/layouts';
import type { Cutlery, CutleryState, Phase, World } from '../sim/world';
import type { PowerKind } from '../sim/powerups';
const POWERS: PowerKind[] = ['hotsauce', 'mustard', 'gravy', 'sugar'];

const KINDS: CutleryKind[] = ['fork', 'spoon', 'knife', 'chopstick', 'ladle', 'spork', 'pizzacutter', 'rollingpin']; // append only (online compatibility)
const STATES: CutleryState[] = ['held', 'flying', 'stuck', 'returning'];
const PHASES: Phase[] = ['countdown', 'play', 'roundEnd', 'matchEnd'];
const r1 = (v: number) => Math.round(v * 10) / 10;
const r3 = (v: number) => Math.round(v * 1000) / 1000;

export interface Snapshot {
  ph: number; pt: number; rt: number; rd: number; li: number; wn: number;
  p: number[][];
  c: number[][];
  cr: number[][];
  h: number[] | null;
  w: number[] | null;
  cl: number[] | null;
  b: number[] | null;
  ts: number[][];
  to: number[] | null;
  ta: number;
  it?: number[][]; // power-ups [id, kind, x, y, age]
  hd?: number[] | null; // hot dumpling [holder, fuse, cooldown]
  bl?: number[] | null; // blender [state 0 warn / 1 spin, t, blade angle]
  cd?: number[][]; // falling cheese [x, y, t]
  pu?: number[][]; // cheese puddles [x, y, r, t]
  sp?: number[] | null; // spatula [state 0 warn / 1 flip, x, y, t]
}

export function makeSnapshot(w: World): Snapshot {
  return {
    ph: PHASES.indexOf(w.phase), pt: r3(w.phaseT), rt: r1(w.roundT), rd: w.round, li: w.layoutIndex, wn: w.winner ?? -1,
    p: w.players.map(p => [
      r1(p.x), r1(p.y), r1(p.vx + p.kx), r1(p.vy + p.ky), r3(p.aim), r1(p.r), p.alive ? 1 : 0, p.holding ?? -1,
      p.charging ? 1 : 0, r3(p.charge), r3(p.dashT), r3(p.swipeT), r1(p.meter), r3(p.kaijuT), r3(p.invT), p.score, p.kos,
      p.team, p.pts, r1(p.respawnT), r1(p.speedT), r1(p.shieldT), r1(p.sugarT),
    ]),
    c: w.cutlery.map(c => [
      c.id, KINDS.indexOf(c.kind), STATES.indexOf(c.state), r1(c.x), r1(c.y), r3(c.angle), r3(c.spin), c.owner ?? -1, c.holder ?? -1, r1(c.vx), r1(c.vy),
    ]),
    cr: w.crumbs.map(c => [r1(c.x), r1(c.y), c.variant, c.id]),
    h: w.hand ? [w.hand.state === 'warn' ? 0 : 1, r1(w.hand.y), w.hand.dir, r3(w.hand.t), r1(w.hand.x)] : null,
    w: w.wind ? [w.wind.state === 'warn' ? 0 : 1, r3(w.wind.dir), r3(w.wind.t)] : null,
    cl: w.cleaver ? [w.cleaver.state === 'warn' ? 0 : 1, r1(w.cleaver.x), r3(w.cleaver.t)] : null,
    b: w.burner ? [w.burner.state === 'warn' ? 0 : 1, w.burner.i, r3(w.burner.t)] : null,
    ts: w.toasts.map(t => [r1(t.x), r1(t.y), r1(t.vx), r1(t.vy), r3(t.spin)]),
    to: w.toaster ? [w.toaster.i, r3(w.toaster.t)] : null,
    ta: r3(w.turnAngle),
    it: w.items.map(i => [i.id, POWERS.indexOf(i.kind), r1(i.x), r1(i.y), r1(i.t)]),
    hd: w.hot ? [w.hot.id, r1(w.hot.fuse), r1(w.hot.cd)] : null,
    cd: w.cheeseDrops.map(d => [r1(d.x), r1(d.y), r3(d.t)]),
    sp: w.spatula ? [w.spatula.state === 'warn' ? 0 : 1, r1(w.spatula.x), r1(w.spatula.y), r3(w.spatula.t)] : null,
    pu: w.puddles.map(z => [r1(z.x), r1(z.y), r1(z.r), r1(z.t)]),
    bl: w.blender ? [w.blender.state === 'warn' ? 0 : 1, r3(w.blender.t), r3(w.bladeAngle)] : null,
  };
}

/** Copies a snapshot into a (render-only) World. Returns true when the table changed. */
export function applySnapshot(w: World, s: Snapshot): boolean {
  const tableChanged = w.layoutIndex !== s.li || w.round !== s.rd;
  w.phase = PHASES[s.ph];
  w.phaseT = s.pt;
  w.roundT = s.rt;
  w.round = s.rd;
  w.layoutIndex = s.li;
  w.layout = LAYOUTS[s.li] ?? LAYOUTS[0];
  w.winner = s.wn < 0 ? null : s.wn;
  s.p.forEach((a, i) => {
    const p = w.players[i];
    if (!p) return;
    [p.x, p.y, p.vx, p.vy, p.aim, p.r] = a;
    p.kx = p.ky = 0;
    p.alive = a[6] === 1;
    p.holding = a[7] < 0 ? null : a[7];
    p.charging = a[8] === 1;
    [p.charge, p.dashT, p.swipeT, p.meter, p.kaijuT, p.invT, p.score, p.kos] = a.slice(9);
    if (a.length > 17) [p.team, p.pts, p.respawnT, p.speedT, p.shieldT, p.sugarT] = a.slice(17);
  });
  w.cutlery = s.c.map(a => ({
    id: a[0], kind: KINDS[a[1]], state: STATES[a[2]], x: a[3], y: a[4], angle: a[5], spin: a[6],
    owner: a[7] < 0 ? null : a[7], holder: a[8] < 0 ? null : a[8], vx: a[9], vy: a[10],
    traveled: 0, maxRange: 0, speed: 0, bouncesLeft: 0, bounced: false, boomerang: false, stuckT: 0, temp: false, dead: false,
  } satisfies Cutlery));
  w.crumbs = s.cr.map(a => ({ x: a[0], y: a[1], variant: a[2], id: a[3] }));
  w.hand = s.h ? { state: s.h[0] ? 'sweep' : 'warn', y: s.h[1], dir: s.h[2] > 0 ? 1 : -1, t: s.h[3], x: s.h[4], target: null } : null;
  w.wind = s.w ? { state: s.w[0] ? 'gust' : 'warn', dir: s.w[1], t: s.w[2] } : null;
  w.cleaver = s.cl ? { state: s.cl[0] ? 'chop' : 'warn', x: s.cl[1], t: s.cl[2] } : null;
  w.burner = s.b ? { state: s.b[0] ? 'flare' : 'warn', i: s.b[1], t: s.b[2] } : null;
  w.toasts = (s.ts ?? []).map(a => ({ x: a[0], y: a[1], vx: a[2], vy: a[3], spin: a[4] }));
  w.toaster = s.to ? { state: 'warn', i: s.to[0], t: s.to[1] } : null;
  w.turnAngle = s.ta ?? 0;
  w.items = (s.it ?? []).map(a => ({ id: a[0], kind: POWERS[a[1]], x: a[2], y: a[3], t: a[4] }));
  w.hot = s.hd ? { id: s.hd[0], fuse: s.hd[1], cd: s.hd[2] } : null;
  w.blender = s.bl ? { state: s.bl[0] ? 'spin' : 'warn', t: s.bl[1] } : null;
  if (s.bl) w.bladeAngle = s.bl[2];
  w.cheeseDrops = (s.cd ?? []).map(a => ({ x: a[0], y: a[1], t: a[2] }));
  w.spatula = s.sp ? { state: s.sp[0] ? 'flip' : 'warn', x: s.sp[1], y: s.sp[2], t: s.sp[3] } : null;
  w.puddles = (s.pu ?? []).map(a => ({ x: a[0], y: a[1], r: a[2], t: a[3] }));
  return tableChanged;
}

/** Between snapshots, keep things moving on the guest (dead reckoning). */
export function extrapolate(w: World, dt: number): void {
  for (const p of w.players) {
    if (!p.alive) continue;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
  for (const c of w.cutlery) {
    if (c.state === 'flying') { c.x += c.vx * dt; c.y += c.vy * dt; c.spin += dt * 28; }
  }
  for (const t of w.toasts) { t.x += t.vx * dt; t.y += t.vy * dt; t.spin += dt * 9; }
  const tt = w.layout.turntable;
  if (tt) w.turnAngle += tt.spin * dt;
}
