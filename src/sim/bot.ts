// Bot brains: read the World, return a PlayerInput like a human controller would.
import { P, RULES, TABLE } from './constants';
import { CUTLERY } from './cutlery';
import { circRect } from './math';
import { Rng } from './rng';
import { NO_INPUT, type Player, type PlayerInput, type World } from './world';

export type Difficulty = 'easy' | 'normal' | 'hard';
export const DIFFICULTIES: Difficulty[] = ['easy', 'normal', 'hard'];

interface Tuning {
  aimErr: number; // radians, rolled once per throw
  lead: number; // 0 = aims where you are, 1 = predicts where you'll be
  lag: number; // seconds: sees targets where they were this long ago
  turn: number; // rad/s the aim can swing while lining up
  throwRate: number; // throw attempts per second when a shot is open
  hold: [number, number]; // charge time range (longer = more visible telegraph)
  range: number; // only throws inside this distance
  dodge: number; // chance to dash away from close cutlery
  react: number; // distance it notices incoming cutlery
  swipe: number; // swipes per second while in reach
  shove: number; // chance per second to dash-shove a rival near the edge
  greed: number; // pull towards crumbs
}

const TUNING: Record<Difficulty, Tuning> = {
  easy:   { aimErr: 0.6,  lead: 0,   lag: 0.45, turn: 1.8, throwRate: 0.45, hold: [0.4, 0.75], range: 340, dodge: 0.15, react: 110, swipe: 0.5, shove: 0.4, greed: 0.6 },
  normal: { aimErr: 0.18, lead: 0.6, lag: 0.15, turn: 5,   throwRate: 1.5,  hold: [0.15, 0.5], range: 440, dodge: 0.4,  react: 150, swipe: 1.8, shove: 1.5, greed: 0.9 },
  hard:   { aimErr: 0.06, lead: 1,   lag: 0,    turn: 14,  throwRate: 3.2,  hold: [0.06, 0.4], range: 520, dodge: 0.75, react: 200, swipe: 5,   shove: 6,   greed: 1.1 },
};

export class BotBrain {
  private rng: Rng;
  private hold = 0;
  private strafe = 1;
  private think = 0;
  private aimA = 0;
  private aimOffset = 0;
  private time = 0;
  private history: { t: number; pos: { x: number; y: number; vx: number; vy: number }[] }[] = [];

  constructor(readonly id: number, public difficulty: Difficulty, seed: number) {
    this.rng = new Rng(seed);
  }

  decide(w: World, dt: number): PlayerInput {
    const p = w.players[this.id];
    const out: PlayerInput = { ...NO_INPUT };
    if (!p || !p.alive || w.phase !== 'play') { this.hold = 0; this.history = []; this.aimA = p?.aim ?? 0; return out; }
    const T = TUNING[this.difficulty];
    const foes = w.players.filter(o => o !== p && o.alive);
    if (!foes.length) return out;

    // Perception lag: remember recent positions and act on a slightly stale view.
    this.time += dt;
    this.history.push({ t: this.time, pos: w.players.map(q => ({ x: q.x, y: q.y, vx: q.vx, vy: q.vy })) });
    while (this.history.length > 2 && this.history[1].t <= this.time - T.lag) this.history.shift();
    const seen = this.history[0].pos;

    let tgt = foes[0], td = Infinity;
    for (const f of foes) {
      const d = Math.hypot(f.x - p.x, f.y - p.y);
      if (d < td) { td = d; tgt = f; }
    }
    const d = td || 1, ux = (tgt.x - p.x) / d, uy = (tgt.y - p.y) / d;
    let mx = 0, my = 0;
    const add = (x: number, y: number, k: number) => { mx += x * k; my += y * k; };

    this.think -= dt;
    if (this.think <= 0) {
      this.think = this.rng.range(0.8, 2.2);
      if (this.rng.next() < 0.5) this.strafe *= -1;
    }

    if (p.kaijuT > 0) {
      add(ux, uy, 1.6); // stomp them
    } else {
      // Run from enemy kaiju.
      for (const f of foes) {
        if (f.kaijuT <= 0) continue;
        const fd = Math.hypot(f.x - p.x, f.y - p.y) || 1;
        if (fd < 340) add((p.x - f.x) / fd, (p.y - f.y) / fd, 2.5 * (1 - fd / 340) + 0.6);
      }
      if (p.holding === null) {
        // Find something to throw. Anything loose is fair game.
        let best: { x: number; y: number } | null = null, bd = Infinity;
        for (const c of w.cutlery) {
          if (c.state !== 'stuck' && c.state !== 'returning') continue;
          const cd = Math.hypot(c.x - p.x, c.y - p.y);
          if (cd < bd) { bd = cd; best = c; }
        }
        if (best) add((best.x - p.x) / (bd || 1), (best.y - p.y) / (bd || 1), 1.6);
        else if (d < 300) add(-ux, -uy, 1);
        // Unarmed: shove enemies off the table edge.
        const edgeGap = Math.min(tgt.x - TABLE.x, TABLE.x + TABLE.w - tgt.x, tgt.y - TABLE.y, TABLE.y + TABLE.h - tgt.y);
        if (edgeGap < 90 && d < 170 && tgt.kaijuT <= 0) {
          add(ux, uy, 3);
          if (p.dashCD <= 0 && d < 110 && this.rng.next() < dt * T.shove) out.dash = !p.prev.dash;
        }
      } else {
        const want = 230;
        if (d > want + 70) add(ux, uy, 1);
        else if (d < want - 70 && d > 70) add(-ux, -uy, 1);
        add(-uy * this.strafe, ux * this.strafe, 0.7);
        if (d < p.r + tgt.r + P.swipeReach - 6 && tgt.kaijuT <= 0 && this.rng.next() < dt * T.swipe) { // swipes per second while in reach
          out.swipe = !p.prev.swipe; // aim below points at the target; the arc is wide enough
        }
      }
      // Snack on nearby crumbs.
      if (p.meter < 100) {
        let cb: { x: number; y: number } | null = null, cbd = 170;
        for (const c of w.crumbs) {
          const cd = Math.hypot(c.x - p.x, c.y - p.y);
          if (cd < cbd) { cbd = cd; cb = c; }
        }
        if (cb) add((cb.x - p.x) / (cbd || 1), (cb.y - p.y) / (cbd || 1), T.greed);
      }
      if (p.meter >= 100 && d < 320) out.stomp = !p.prev.stomp;
    }

    // Keep away from the table edge.
    const m = 85;
    if (p.x < TABLE.x + m) add(1, 0, (m - (p.x - TABLE.x)) / 30);
    if (p.x > TABLE.x + TABLE.w - m) add(-1, 0, (m - (TABLE.x + TABLE.w - p.x)) / 30);
    if (p.y < TABLE.y + m) add(0, 1, (m - (p.y - TABLE.y)) / 30);
    if (p.y > TABLE.y + TABLE.h - m) add(0, -1, (m - (TABLE.y + TABLE.h - p.y)) / 30);

    // Slide around obstacles.
    for (const o of w.layout.obstacles) {
      const h = o.shape === 'circle'
        ? (() => { const dx = p.x - o.x, dy = p.y - o.y, dd = Math.hypot(dx, dy) || 1; return dd < o.r + p.r + 24 ? { nx: dx / dd, ny: dy / dd } : null; })()
        : circRect(p.x, p.y, p.r + 24, o.x, o.y, o.w, o.h);
      if (h) add(h.nx, h.ny, 0.9);
    }

    // Dodge incoming cutlery.
    for (const c of w.cutlery) {
      if (c.state !== 'flying') continue;
      if (c.owner === p.id && !c.bounced) continue;
      const cx = p.x - c.x, cy = p.y - c.y, cd = Math.hypot(cx, cy) || 1;
      if (cd > T.react) continue;
      const closing = (c.vx * cx + c.vy * cy) / cd;
      if (closing < 200) continue;
      const px = -c.vy, py = c.vx, pl = Math.hypot(px, py) || 1, side = px * cx + py * cy > 0 ? 1 : -1;
      add((px / pl) * side, (py / pl) * side, 2.6);
      if (cd < 110 && p.dashCD <= 0 && this.rng.next() < T.dodge) out.dash = !p.prev.dash;
    }

    // Get out of the giant hand's lane.
    if (w.hand) {
      const gap = p.y - w.hand.y;
      if (Math.abs(gap) < RULES.handBand / 2 + p.r + 24) {
        let dir = gap >= 0 ? 1 : -1;
        if (p.y + dir * 120 > TABLE.y + TABLE.h || p.y + dir * 120 < TABLE.y) dir = -dir;
        add(0, dir, 4);
        if (w.hand.state === 'sweep' && p.dashCD <= 0) { mx = 0; my = dir; out.dash = !p.prev.dash; }
      }
    }

    out.mx = mx;
    out.my = my;

    // Aim: at the (possibly stale) target, with partial lead, a per-throw error, and a limited turn speed.
    const held = w.cutleryById(p.holding);
    const spd = held ? CUTLERY[held.kind].speed : 760;
    const s = seen[tgt.id] ?? tgt;
    const lead = (d / spd) * T.lead;
    const want = Math.atan2(s.y + s.vy * lead - p.y, s.x + s.vx * lead - p.x) + this.aimOffset;
    let diff = want - this.aimA;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    this.aimA += Math.max(-T.turn * dt, Math.min(T.turn * dt, diff));
    out.aimX = Math.cos(this.aimA);
    out.aimY = Math.sin(this.aimA);

    // Throw: hold for a random charge (the visible telegraph), then release.
    if (this.hold > 0) {
      this.hold -= dt;
      out.throw = this.hold > 0;
    } else if (p.holding !== null && p.kaijuT <= 0 && d < T.range && tgt.kaijuT <= 0 && clearShot(w, p, tgt) && this.rng.next() < dt * T.throwRate) {
      this.hold = this.rng.range(T.hold[0], T.hold[1]);
      this.aimOffset = (this.rng.next() - 0.5) * 2 * T.aimErr;
      out.throw = true;
    }
    return out;
  }
}

function clearShot(w: World, a: Player, b: Player): boolean {
  for (let i = 1; i < 14; i++) {
    const t = i / 14, x = a.x + (b.x - a.x) * t, y = a.y + (b.y - a.y) * t;
    for (const o of w.layout.obstacles) {
      if (o.shape === 'circle' ? Math.hypot(x - o.x, y - o.y) < o.r + 6 : x > o.x - 6 && x < o.x + o.w + 6 && y > o.y - 6 && y < o.y + o.h + 6) return false;
    }
  }
  return true;
}
