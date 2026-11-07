// Kitchen Kaiju simulation. Pure TypeScript: no rendering, no DOM, no Phaser.
// The renderer reads state + drains `events`; tests drive it directly.
import { P, RULES, TABLE } from './constants';
import { CUTLERY, STARTER_KINDS, type CutleryKind } from './cutlery';
import { LAYOUTS, type Layout } from './layouts';
import { angleDiff, circCircle, circRect, clamp, type Hit } from './math';
import { MODE_RULES, type GameMode } from './modes';
import { enabledPowers, POWER_DEFS, POWERUPS, type PowerKind } from './powerups';
import { Rng } from './rng';

export interface PlayerInput {
  mx: number;
  my: number;
  aimX?: number;
  aimY?: number;
  throw: boolean;
  swipe: boolean;
  dash: boolean;
  stomp: boolean;
}
const BOOMERANG_TURN = 10; // rad/s (turn radius = speed / turn)

export const NO_INPUT: PlayerInput = { mx: 0, my: 0, throw: false, swipe: false, dash: false, stomp: false };

export type KOCause = 'cutlery' | 'swipe' | 'squash' | 'fall' | 'hand' | 'wind' | 'chop' | 'burn' | 'toast' | 'boom';

export type GameEvent =
  | { type: 'throw'; id: number; kind: CutleryKind; x: number; y: number }
  | { type: 'stick'; kind: CutleryKind; x: number; y: number }
  | { type: 'vanish'; x: number; y: number }
  | { type: 'bounce'; x: number; y: number }
  | { type: 'pickup'; id: number; kind: CutleryKind; stolenFrom: number | null; x: number; y: number }
  | { type: 'catch'; id: number; from: number | null; x: number; y: number }
  | { type: 'deflect'; x: number; y: number }
  | { type: 'swipe'; id: number; x: number; y: number; angle: number }
  | { type: 'dash'; id: number; x: number; y: number }
  | { type: 'bump'; x: number; y: number }
  | { type: 'eat'; id: number; x: number; y: number }
  | { type: 'meterFull'; id: number }
  | { type: 'kaiju'; id: number; x: number; y: number }
  | { type: 'stomp'; id: number; x: number; y: number; r: number }
  | { type: 'shrink'; id: number }
  | { type: 'ko'; id: number; by: number | null; cause: KOCause; x: number; y: number }
  | { type: 'handWarn'; y: number; dir: number; target: number | null }
  | { type: 'handSweep' }
  | { type: 'windWarn'; dir: number }
  | { type: 'windGust'; dir: number }
  | { type: 'cleaverWarn'; x: number }
  | { type: 'cleaverChop'; x: number }
  | { type: 'burnerWarn'; i: number; x: number; y: number }
  | { type: 'burnerFlare'; i: number; x: number; y: number }
  | { type: 'toasterWarn'; i: number }
  | { type: 'toasterPop'; i: number; x: number; y: number }
  | { type: 'toastBreak'; x: number; y: number }
  | { type: 'bumper'; x: number; y: number }
  | { type: 'respawn'; id: number; x: number; y: number }
  | { type: 'powerSpawn'; kind: PowerKind; x: number; y: number }
  | { type: 'powerup'; id: number; kind: PowerKind; x: number; y: number }
  | { type: 'shieldPop'; id: number; x: number; y: number }
  | { type: 'hotGive'; id: number; from: number | null; x: number; y: number }
  | { type: 'hotBoom'; id: number; x: number; y: number }
  | { type: 'spawnCutlery'; kind: CutleryKind; x: number; y: number }
  | { type: 'countdown'; n: number }
  | { type: 'go' }
  | { type: 'roundStart'; round: number; layout: string }
  | { type: 'roundEnd'; winner: number | null }
  | { type: 'matchEnd'; winner: number };

export interface Player {
  id: number;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  kx: number; // knockback velocity (decays, can carry you off the table)
  ky: number;
  r: number;
  aim: number;
  alive: boolean;
  holding: number | null; // cutlery id
  charging: boolean;
  charge: number;
  dashT: number;
  dashCD: number;
  dashBumped: boolean;
  swipeT: number;
  swipeCD: number;
  swipeHit: Set<number>;
  meter: number;
  kaijuT: number;
  stepT: number;
  invT: number;
  lastHitBy: number | null;
  lastHitT: number;
  bumpT: number; // gumdrop bumper cooldown
  team: number; // Team Feast: 0 = red, 1 = blue (other modes: own id)
  pts: number; // Crumb Rush: crumbs eaten this round
  respawnT: number; // Crumb Rush: seconds until back in (0 = not waiting)
  speedT: number; // Hot Sauce time left
  shieldT: number; // Mustard Shield time left
  sugarT: number; // Sugar Rush time left
  moving: boolean;
  score: number;
  kos: number;
  prev: { throw: boolean; swipe: boolean; dash: boolean; stomp: boolean };
}

export type CutleryState = 'held' | 'flying' | 'stuck' | 'returning';

export interface Cutlery {
  id: number;
  kind: CutleryKind;
  state: CutleryState;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  spin: number;
  holder: number | null;
  owner: number | null; // last thrower; null = fresh table pickup
  traveled: number;
  maxRange: number;
  speed: number; // launch speed (boomerang keeps it constant)
  bouncesLeft: number;
  bounced: boolean;
  boomerang: boolean;
  stuckT: number;
  temp: boolean; // second chopstick: vanishes on landing
  dead: boolean;
}

export interface Crumb {
  id: number;
  x: number;
  y: number;
  variant: number;
}

/** A condiment power-up lying on the table. */
export interface PowerItem {
  id: number;
  kind: PowerKind;
  x: number;
  y: number;
  t: number; // age in seconds
}

export interface Hand {
  state: 'warn' | 'sweep';
  y: number;
  dir: 1 | -1;
  t: number;
  x: number;
  target: number | null;
}

export type Phase = 'countdown' | 'play' | 'roundEnd' | 'matchEnd';

export interface WorldOptions {
  players: { name: string }[];
  seed?: number;
  target?: number;
  hazards?: boolean;
  crumbSpawns?: boolean;
  pickupSpawns?: boolean;
  layout?: number; // force one layout
  layouts?: number[]; // pool of tables to rotate through (default: all)
  starterKind?: CutleryKind; // force everyone's starting cutlery
  mode?: GameMode; // party mode (default classic)
  teams?: number[]; // Team Feast: team per player (default: alternate seats)
  powerups?: boolean; // condiment power-ups (off unless asked for; Free Play default is POWERUPS.enabled)
}

/** Birthday Bash wind. dir is an angle (radians) the gust blows towards. */
export interface Wind {
  state: 'warn' | 'gust';
  dir: number;
  t: number;
}

/** Diner Griddle: one burner (index into layout.burners) glowing or flaring. */
export interface Burner {
  state: 'warn' | 'flare';
  i: number;
  t: number;
}

/** Breakfast Rush: the toaster (index into layout.toasters) that is about to fire. */
export interface ToasterState {
  state: 'warn';
  i: number;
  t: number;
}

/** A flying slice of toast (no owner: it hurts everyone). */
export interface Toast {
  x: number;
  y: number;
  vx: number;
  vy: number;
  spin: number;
}

/** Chef's Board cleaver: a vertical lane at x. */
export interface Cleaver {
  state: 'warn' | 'chop';
  x: number;
  t: number;
}

export class World {
  readonly rng: Rng;
  readonly opts: Required<Omit<WorldOptions, 'layout' | 'starterKind' | 'layouts' | 'mode' | 'teams' | 'powerups'>> & Pick<WorldOptions, 'layout' | 'starterKind' | 'layouts'>;
  readonly mode: GameMode;
  readonly powerups: boolean;
  items: PowerItem[] = [];
  private itemTimer = 0;
  /** Hot Dumpling: who is carrying it and how long until it pops. */
  hot: { id: number; fuse: number; cd: number } | null = null;
  players: Player[] = [];
  cutlery: Cutlery[] = [];
  crumbs: Crumb[] = [];
  hand: Hand | null = null;
  wind: Wind | null = null;
  cleaver: Cleaver | null = null;
  burner: Burner | null = null;
  toaster: ToasterState | null = null;
  toasts: Toast[] = [];
  turnAngle = 0; // Lazy Susan rotation, for drawing
  layout: Layout = LAYOUTS[0];
  layoutIndex = 0;
  phase: Phase = 'countdown';
  phaseT = 0;
  roundT = 0;
  round = 0;
  winner: number | null = null;
  events: GameEvent[] = [];
  private nextId = 1;
  private handTimer = 0;
  private windTimer = 0;
  private cleaverTimer = 0;
  private burnerTimer = 0;
  private toasterTimer = 0;
  private crumbTimer = 0;
  private pickupTimer = 0;
  private lastCount = 0;
  private layoutOrder: number[] = [];

  constructor(o: WorldOptions) {
    this.opts = {
      seed: o.seed ?? 1,
      target: o.target ?? 5,
      hazards: o.hazards ?? true,
      crumbSpawns: o.crumbSpawns ?? true,
      pickupSpawns: o.pickupSpawns ?? true,
      players: o.players,
      layout: o.layout,
      layouts: o.layouts,
      starterKind: o.starterKind,
    };
    this.mode = o.mode ?? 'classic';
    this.powerups = o.powerups ?? false; // opt-in: Free Play turns it on (see GameScene)
    this.rng = new Rng(this.opts.seed);
    const pool = o.layouts?.filter(i => i >= 0 && i < LAYOUTS.length);
    this.layoutOrder = this.rng.shuffle(pool && pool.length ? pool.slice() : LAYOUTS.map((_, i) => i));
    this.players = o.players.map((p, id) => this.makePlayer(id, p.name));
    for (const pl of this.players) pl.team = this.mode === 'teams' ? (o.teams?.[pl.id] ?? pl.id % 2) : pl.id;
    this.startRound();
  }

  // ---------------------------------------------------------------- setup
  private makePlayer(id: number, name: string): Player {
    return {
      id, name, x: 0, y: 0, vx: 0, vy: 0, kx: 0, ky: 0, r: P.radius, aim: 0, alive: true,
      holding: null, charging: false, charge: 0, dashT: 0, dashCD: 0, dashBumped: false,
      swipeT: 0, swipeCD: 0, swipeHit: new Set(), meter: 0, kaijuT: 0, stepT: 0, invT: 0,
      lastHitBy: null, lastHitT: 0, bumpT: 0, team: id, pts: 0, respawnT: 0, speedT: 0, shieldT: 0, sugarT: 0, moving: false, score: 0, kos: 0,
      prev: { throw: false, swipe: false, dash: false, stomp: false },
    };
  }

  startRound(): void {
    const li = this.opts.layout ?? this.layoutOrder[this.round % this.layoutOrder.length];
    this.layout = LAYOUTS[li];
    this.layoutIndex = li;
    this.round++;
    this.cutlery = [];
    this.crumbs = [];
    this.hand = null;
    this.winner = null;
    this.handTimer = RULES.handFirst;
    this.wind = null;
    this.cleaver = null;
    this.windTimer = RULES.windFirst;
    this.cleaverTimer = RULES.cleaverFirst;
    this.burner = null;
    this.burnerTimer = RULES.burnerFirst;
    this.toaster = null;
    this.toasts = [];
    this.toasterTimer = RULES.toasterFirst;
    this.crumbTimer = 0;
    this.pickupTimer = RULES.pickupEvery;
    this.phase = 'countdown';
    this.phaseT = 0;
    this.roundT = 0;
    this.lastCount = 0;
    this.hot = null;
    this.items = [];
    this.itemTimer = this.rng.range(POWERUPS.every[0], POWERUPS.every[1]) * 0.6;
    const spawns = this.rng.shuffle(this.layout.spawns.slice());
    for (const p of this.players) {
      const [sx, sy] = spawns[p.id % spawns.length];
      Object.assign(p, {
        x: sx, y: sy, vx: 0, vy: 0, kx: 0, ky: 0, r: P.radius,
        aim: Math.atan2(TABLE.y + TABLE.h / 2 - sy, TABLE.x + TABLE.w / 2 - sx),
        alive: true, holding: null, charging: false, charge: 0, dashT: 0, dashCD: 0, dashBumped: false,
        swipeT: 0, swipeCD: 0, meter: 0, kaijuT: 0, stepT: 0, invT: 0, lastHitBy: null, lastHitT: 0, moving: false, pts: 0, respawnT: 0, speedT: 0, shieldT: 0, sugarT: 0,
        prev: { throw: true, swipe: true, dash: true, stomp: true }, // require a fresh press after the countdown
      });
      p.swipeHit.clear();
      const c = this.newCutlery(this.opts.starterKind ?? this.rng.pick(STARTER_KINDS), sx, sy);
      c.state = 'held';
      c.holder = p.id;
      c.owner = p.id;
      p.holding = c.id;
    }
    for (let i = 0; i < RULES.startCrumbs; i++) this.spawnCrumb();
    this.emit({ type: 'roundStart', round: this.round, layout: this.layout.name });
  }

  newCutlery(kind: CutleryKind, x: number, y: number): Cutlery {
    const c: Cutlery = {
      id: this.nextId++, kind, state: 'stuck', x, y, vx: 0, vy: 0, angle: this.rng.range(0, Math.PI * 2), spin: 0,
      holder: null, owner: null, traveled: 0, maxRange: 0, speed: 0, bouncesLeft: 0, bounced: false, boomerang: false,
      stuckT: 0, temp: false, dead: false,
    };
    this.cutlery.push(c);
    return c;
  }

  player(id: number | null): Player | undefined {
    return id === null ? undefined : this.players[id];
  }
  cutleryById(id: number | null): Cutlery | undefined {
    return id === null ? undefined : this.cutlery.find(c => c.id === id);
  }
  alivePlayers(): Player[] {
    return this.players.filter(p => p.alive);
  }
  private emit(e: GameEvent): void {
    this.events.push(e);
  }
  /** Returns and clears pending events. */
  drainEvents(): GameEvent[] {
    const e = this.events;
    this.events = [];
    return e;
  }

  // ---------------------------------------------------------------- step
  step(dt: number, inputs: PlayerInput[]): void {
    this.phaseT += dt;
    if (this.phase === 'matchEnd') return;

    if (this.phase === 'countdown') {
      const n = Math.ceil((RULES.countdown - this.phaseT) / (RULES.countdown / 3));
      if (n !== this.lastCount && n >= 1) this.emit({ type: 'countdown', n });
      this.lastCount = n;
      if (this.phaseT >= RULES.countdown) {
        this.phase = 'play';
        this.phaseT = 0;
        this.emit({ type: 'go' });
      }
    }
    const live = this.phase === 'play' || this.phase === 'roundEnd';
    if (this.phase === 'play') this.roundT += dt;

    for (const p of this.players) this.updatePlayer(p, live ? inputs[p.id] ?? NO_INPUT : NO_INPUT, dt);
    this.resolvePlayerContacts();
    this.updateCutlery(dt);
    this.eatCrumbs();
    if (this.phase === 'play') this.updateMode(dt);
    if (this.phase === 'play' || this.hand || this.wind || this.cleaver || this.burner || this.toaster || this.toasts.length) {
      if (this.phase === 'play') this.spawnTimers(dt);
      this.updateHand(dt);
      this.updateWind(dt);
      this.updateCleaver(dt);
      this.updateBurner(dt);
      this.updateToasters(dt);
    }
    this.spinTurntable(dt);
    this.cutlery = this.cutlery.filter(c => !c.dead);
    this.checkRound();
  }

  // ---------------------------------------------------------------- players
  private updatePlayer(p: Player, inp: PlayerInput, dt: number): void {
    if (!p.alive) return;
    p.invT -= dt;
    p.dashCD -= dt;
    p.swipeCD -= dt;
    if (p.speedT > 0) p.speedT -= dt;
    if (p.shieldT > 0) p.shieldT -= dt;
    if (p.sugarT > 0) { p.sugarT -= dt; p.dashCD = Math.min(p.dashCD, POWERUPS.sugarCooldown); p.swipeCD = Math.min(p.swipeCD, POWERUPS.sugarCooldown); }
    p.lastHitT -= dt;
    p.bumpT -= dt;
    if (p.lastHitT <= 0) p.lastHitBy = null;
    const kaiju = p.kaijuT > 0;
    const targetR = kaiju ? P.kaijuRadius : P.radius;
    p.r += (targetR - p.r) * Math.min(1, dt * 10);

    let mx = inp.mx, my = inp.my;
    const ml = Math.hypot(mx, my);
    if (ml > 1) { mx /= ml; my /= ml; }
    if (inp.aimX !== undefined && inp.aimY !== undefined && Math.hypot(inp.aimX, inp.aimY) > 0.01) {
      p.aim = Math.atan2(inp.aimY, inp.aimX);
    } else if (ml > 0.2) {
      p.aim = Math.atan2(my, mx);
    }
    p.moving = ml > 0.2;

    const pressed = (k: 'throw' | 'swipe' | 'dash' | 'stomp') => inp[k] && !p.prev[k];

    // Dash
    if (pressed('dash') && p.dashCD <= 0 && !kaiju) {
      const a = ml > 0.2 ? Math.atan2(my, mx) : p.aim;
      p.dashT = P.dashTime;
      p.dashCD = P.dashCD;
      p.dashBumped = false;
      p.vx = Math.cos(a) * P.dashSpeed;
      p.vy = Math.sin(a) * P.dashSpeed;
      this.emit({ type: 'dash', id: p.id, x: p.x, y: p.y });
    }

    // Throw: press to start charging, release to throw.
    if (p.holding !== null && !kaiju) {
      if (inp.throw) {
        if (!p.charging && pressed('throw')) p.charging = true;
        if (p.charging) p.charge = Math.min(P.maxCharge, p.charge + dt);
      } else if (p.charging) {
        this.throwHeld(p);
      }
    } else {
      p.charging = false;
      p.charge = 0;
    }

    // Swipe
    if (pressed('swipe') && p.holding !== null && p.swipeCD <= 0 && !kaiju) {
      p.swipeT = P.swipeWindup + P.swipeTime;
      p.swipeCD = P.swipeCD;
      p.swipeHit.clear();
      p.charging = false;
      p.charge = 0;
      this.emit({ type: 'swipe', id: p.id, x: p.x, y: p.y, angle: p.aim });
    }

    // Stomp: become kaiju
    if (pressed('stomp') && p.meter >= 100 && !kaiju) this.becomeKaiju(p);

    p.prev = { throw: inp.throw, swipe: inp.swipe, dash: inp.dash, stomp: inp.stomp };

    // Movement
    const spd = P.speed * (p.charging ? P.chargeSlow : 1) * (p.kaijuT > 0 ? P.kaijuSpeed : 1) * (this.onSticky(p.x, p.y) ? RULES.stickySlow : 1) * (this.hot?.id === p.id ? MODE_RULES.hotDumpling.holderSpeed : 1) * (p.speedT > 0 ? POWERUPS.hotsauceSpeed : 1);
    if (p.dashT > 0) {
      p.dashT -= dt;
    } else {
      const k = Math.min(1, dt * (this.onSpill(p.x, p.y) ? RULES.spillGrip : this.layout.slippery ? RULES.iceGrip : 14));
      p.vx += (mx * spd - p.vx) * k;
      p.vy += (my * spd - p.vy) * k;
    }
    const kd = Math.pow(0.02, dt);
    p.kx *= kd;
    p.ky *= kd;
    p.x += (p.vx + p.kx) * dt;
    p.y += (p.vy + p.ky) * dt;

    for (const b of this.layout.belts ?? []) {
      if (p.x > b.x && p.x < b.x + b.w && p.y > b.y && p.y < b.y + b.h) { p.x += b.vx * dt; p.y += (b.vy ?? 0) * dt; }
    }
    this.pushOutOfObstacles(p);

    // Table edge: walking can't take you off, knockback can.
    const strong = Math.hypot(p.kx, p.ky) > P.fallSpeed;
    if (!strong) {
      const inset = p.r * 0.6;
      p.x = clamp(p.x, TABLE.x + inset, TABLE.x + TABLE.w - inset);
      p.y = clamp(p.y, TABLE.y + inset, TABLE.y + TABLE.h - inset);
    } else if (p.x < TABLE.x || p.x > TABLE.x + TABLE.w || p.y < TABLE.y || p.y > TABLE.y + TABLE.h) {
      this.ko(p, p.lastHitBy, p.lastHitBy === null && this.wind?.state === 'gust' ? 'wind' : 'fall');
      return;
    }

    if (p.swipeT > 0) {
      p.swipeT -= dt;
      if (p.swipeT > 0 && p.swipeT <= P.swipeTime) this.applySwipe(p); // after the wind-up
    }

    if (p.kaijuT > 0) {
      p.kaijuT -= dt;
      p.stepT -= dt;
      if (p.stepT <= 0) {
        p.stepT = P.stompEvery;
        this.stomp(p);
      }
      if (p.kaijuT <= 0) {
        p.kaijuT = 0;
        p.invT = P.shrinkInvuln;
        this.emit({ type: 'shrink', id: p.id });
      }
    }
  }

  private pushOutOfObstacles(p: Player): void {
    for (const o of this.layout.obstacles) {
      const h = o.shape === 'circle'
        ? circCircle(p.x, p.y, p.r, o.x, o.y, o.r)
        : circRect(p.x, p.y, p.r, o.x, o.y, o.w, o.h);
      if (h) {
        p.x += h.nx * h.pen;
        p.y += h.ny * h.pen;
        if (o.style === 'gumdrop' && p.bumpT <= 0) {
          p.kx += h.nx * RULES.bumperForce;
          p.ky += h.ny * RULES.bumperForce;
          p.bumpT = 0.25;
          this.emit({ type: 'bumper', x: o.x + h.nx * (o.shape === 'circle' ? o.r : 0), y: o.y + h.ny * (o.shape === 'circle' ? o.r : 0) });
        }
      }
    }
  }

  private throwHeld(p: Player): void {
    const c = this.cutleryById(p.holding);
    p.holding = null;
    const ch = p.charge / P.maxCharge;
    p.charging = false;
    p.charge = 0;
    if (!c) return;
    const def = CUTLERY[c.kind];
    const angles = def.split === 2 ? [p.aim - 0.08, p.aim + 0.08] : [p.aim];
    angles.forEach((a, i) => {
      const e = i === 0 ? c : this.newCutlery(c.kind, p.x, p.y);
      if (i > 0) e.temp = true;
      e.state = 'flying';
      e.holder = null;
      e.owner = p.id;
      e.x = p.x + Math.cos(a) * (p.r + 6);
      e.y = p.y + Math.sin(a) * (p.r + 6);
      e.vx = Math.cos(a) * def.speed * (1 + 0.5 * ch);
      e.vy = Math.sin(a) * def.speed * (1 + 0.5 * ch);
      e.angle = a;
      e.speed = def.speed * (1 + 0.5 * ch);
      e.traveled = 0;
      e.maxRange = def.range * (1 + 0.5 * ch);
      e.bouncesLeft = def.bounces;
      e.bounced = false;
      e.boomerang = false;
      e.stuckT = 0;
    });
    this.emit({ type: 'throw', id: p.id, kind: c.kind, x: p.x, y: p.y });
  }

  private applySwipe(p: Player): void {
    const reach = p.r + P.swipeReach;
    for (const q of this.players) {
      if (q === p || !q.alive || p.swipeHit.has(q.id) || this.friends(p.id, q.id)) continue;
      const d = Math.hypot(q.x - p.x, q.y - p.y);
      if (d > reach + q.r * 0.5) continue;
      if (Math.abs(angleDiff(Math.atan2(q.y - p.y, q.x - p.x), p.aim)) > P.swipeArc) continue;
      p.swipeHit.add(q.id);
      if (q.kaijuT > 0 || q.invT > 0) continue;
      this.ko(q, p.id, 'swipe');
    }
    // Parry: a swipe knocks flying enemy cutlery out of the air.
    for (const c of this.cutlery) {
      if (c.state !== 'flying' || c.owner === p.id) continue;
      const d = Math.hypot(c.x - p.x, c.y - p.y);
      if (d > reach + 6) continue;
      if (Math.abs(angleDiff(Math.atan2(c.y - p.y, c.x - p.x), p.aim)) > P.swipeArc) continue;
      this.land(c);
      this.emit({ type: 'deflect', x: c.x, y: c.y });
    }
  }

  private becomeKaiju(p: Player): void {
    const c = this.cutleryById(p.holding);
    if (c) this.dropAt(c, p.x, p.y);
    p.holding = null;
    p.charging = false;
    p.charge = 0;
    p.meter = 0;
    p.kaijuT = P.kaijuTime;
    p.stepT = 0.3;
    this.emit({ type: 'kaiju', id: p.id, x: p.x, y: p.y });
  }

  private stomp(p: Player): void {
    this.emit({ type: 'stomp', id: p.id, x: p.x, y: p.y, r: P.stompRadius });
    for (const q of this.players) {
      if (q === p || !q.alive || q.kaijuT > 0) continue;
      const dx = q.x - p.x, dy = q.y - p.y, d = Math.hypot(dx, dy) || 1, R = P.stompRadius + q.r;
      if (d > R) continue;
      const f = P.stompForce * (1 - d / R) + 220;
      q.kx += (dx / d) * f;
      q.ky += (dy / d) * f;
      q.lastHitBy = p.id;
      q.lastHitT = 2;
    }
  }

  private resolvePlayerContacts(): void {
    const ps = this.players;
    for (let i = 0; i < ps.length; i++) {
      for (let j = i + 1; j < ps.length; j++) {
        const a = ps[i], b = ps[j];
        if (!a.alive || !b.alive) continue;
        const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.001;
        if (d >= a.r + b.r) continue;
        const ak = a.kaijuT > 0, bk = b.kaijuT > 0;
        if ((ak || bk) && this.friends(a.id, b.id)) { /* teammates don't squash each other */ } else
        if (ak && !bk && b.invT <= 0 && this.phase === 'play') { this.ko(b, a.id, 'squash'); continue; }
        if (bk && !ak && a.invT <= 0 && this.phase === 'play') { this.ko(a, b.id, 'squash'); continue; }
        const nx = dx / d, ny = dy / d, push = (a.r + b.r - d) / 2;
        a.x -= nx * push; a.y -= ny * push;
        b.x += nx * push; b.y += ny * push;
        if (a.dashT > 0 && !a.dashBumped) this.bump(a, b, nx, ny);
        if (b.dashT > 0 && !b.dashBumped) this.bump(b, a, -nx, -ny);
      }
    }
  }

  private bump(from: Player, to: Player, nx: number, ny: number): void {
    from.dashBumped = true;
    to.kx += nx * P.bumpForce;
    to.ky += ny * P.bumpForce;
    to.lastHitBy = from.id;
    to.lastHitT = 2;
    this.emit({ type: 'bump', x: (from.x + to.x) / 2, y: (from.y + to.y) / 2 });
  }

  ko(p: Player, by: number | null, cause: KOCause): void {
    if (!p.alive || this.phase !== 'play') return;
    if (p.shieldT > 0 && cause !== 'fall' && cause !== 'wind' && cause !== 'hand' && cause !== 'boom') {
      p.shieldT = 0;
      p.invT = Math.max(p.invT, 0.6);
      this.emit({ type: 'shieldPop', id: p.id, x: p.x, y: p.y });
      return;
    }
    p.alive = false;
    const killer = this.player(by);
    if (killer && killer !== p) killer.kos++;
    const c = this.cutleryById(p.holding);
    if (c) this.dropAt(c, clamp(p.x, TABLE.x + 10, TABLE.x + TABLE.w - 10), clamp(p.y, TABLE.y + 10, TABLE.y + TABLE.h - 10));
    p.holding = null;
    p.charging = false;
    const n = Math.floor(p.meter / P.crumbValue);
    for (let i = 0; i < n; i++) {
      const a = this.rng.range(0, Math.PI * 2), r = this.rng.range(10, 60);
      this.addCrumb(
        clamp(p.x + Math.cos(a) * r, TABLE.x + 14, TABLE.x + TABLE.w - 14),
        clamp(p.y + Math.sin(a) * r, TABLE.y + 14, TABLE.y + TABLE.h - 14),
      );
    }
    p.meter = 0;
    p.kaijuT = 0;
    if (this.mode === 'crumbRush') {
      const lost = Math.floor(p.pts * MODE_RULES.crumbRush.dropShare);
      p.pts -= lost;
      for (let i = 0; i < lost; i++) {
        const a = this.rng.range(0, Math.PI * 2), r = this.rng.range(16, 80);
        this.addCrumb(clamp(p.x + Math.cos(a) * r, TABLE.x + 14, TABLE.x + TABLE.w - 14), clamp(p.y + Math.sin(a) * r, TABLE.y + 14, TABLE.y + TABLE.h - 14));
      }
      p.respawnT = MODE_RULES.crumbRush.respawnDelay;
    }
    this.emit({ type: 'ko', id: p.id, by: killer && killer !== p ? killer.id : null, cause, x: p.x, y: p.y });
  }

  // ---------------------------------------------------------------- cutlery
  private dropAt(c: Cutlery, x: number, y: number): void {
    c.state = 'stuck';
    c.holder = null;
    c.x = x;
    c.y = y;
    c.vx = c.vy = 0;
    c.stuckT = 0;
  }

  private land(c: Cutlery): void {
    if (c.temp) {
      c.dead = true;
      this.emit({ type: 'vanish', x: c.x, y: c.y });
      return;
    }
    c.state = 'stuck';
    c.vx = c.vy = 0;
    c.stuckT = 0;
    c.boomerang = false;
    this.emit({ type: 'stick', kind: c.kind, x: c.x, y: c.y });
  }

  private updateCutlery(dt: number): void {
    for (const c of this.cutlery) {
      if (c.dead) continue;
      switch (c.state) {
        case 'held': {
          const p = this.player(c.holder);
          if (!p || !p.alive || p.holding !== c.id) { this.dropAt(c, c.x, c.y); break; }
          const a = p.aim + 0.9;
          c.x = p.x + Math.cos(a) * (p.r + 4);
          c.y = p.y + Math.sin(a) * (p.r + 4);
          c.angle = p.aim;
          break;
        }
        case 'flying':
          this.fly(c, dt);
          break;
        case 'stuck': {
          c.stuckT += dt;
          const o = this.player(c.owner);
          if (c.stuckT > RULES.stuckReturnDelay && o && o.alive && o.holding === null && o.kaijuT <= 0) c.state = 'returning';
          break;
        }
        case 'returning': {
          const o = this.player(c.owner);
          if (!o || !o.alive || o.holding !== null || o.kaijuT > 0) { c.state = 'stuck'; c.stuckT = 0; break; }
          const dx = o.x - c.x, dy = o.y - c.y, d = Math.hypot(dx, dy) || 1;
          const s = Math.min(d, RULES.returnSpeed * dt);
          c.x += (dx / d) * s;
          c.y += (dy / d) * s;
          c.angle = Math.atan2(dy, dx);
          break;
        }
      }
      if (c.state === 'stuck') {
        for (const b of this.layout.belts ?? []) {
          if (c.x > b.x && c.x < b.x + b.w && c.y > b.y && c.y < b.y + b.h) {
            c.x = clamp(c.x + b.vx * dt, TABLE.x + 8, TABLE.x + TABLE.w - 8);
            c.y = clamp(c.y + (b.vy ?? 0) * dt, TABLE.y + 8, TABLE.y + TABLE.h - 8);
          }
        }
      }
      if (c.state === 'stuck' || c.state === 'returning') this.tryPickup(c);
    }
  }

  private tryPickup(c: Cutlery): void {
    for (const p of this.players) {
      if (!p.alive || p.holding !== null || p.kaijuT > 0) continue;
      if (Math.hypot(p.x - c.x, p.y - c.y) > p.r + 12) continue;
      const stolenFrom = c.owner !== null && c.owner !== p.id ? c.owner : null;
      c.state = 'held';
      c.holder = p.id;
      c.owner = p.id;
      p.holding = c.id;
      this.emit({ type: 'pickup', id: p.id, kind: c.kind, stolenFrom, x: c.x, y: c.y });
      return;
    }
  }

  private fly(c: Cutlery, dt: number): void {
    const def = CUTLERY[c.kind];
    const owner = this.player(c.owner);
    if (c.boomerang) {
      if (!owner || !owner.alive || c.traveled > c.maxRange * 4) { this.land(c); return; }
      // Turn towards the owner at constant speed.
      const cur = Math.atan2(c.vy, c.vx), want = Math.atan2(owner.y - c.y, owner.x - c.x);
      const turn = clamp(angleDiff(want, cur), -BOOMERANG_TURN * dt, BOOMERANG_TURN * dt);
      c.vx = Math.cos(cur + turn) * c.speed;
      c.vy = Math.sin(cur + turn) * c.speed;
    }
    const speed = Math.hypot(c.vx, c.vy);
    const steps = Math.max(1, Math.ceil((speed * dt) / 6));
    for (let i = 0; i < steps; i++) {
      const sx = (c.vx * dt) / steps, sy = (c.vy * dt) / steps;
      c.x += sx;
      c.y += sy;
      c.traveled += Math.hypot(sx, sy);
      c.angle = Math.atan2(c.vy, c.vx);
      if (def.spin) c.spin += (dt / steps) * 28;

      const hit = this.cutleryCollide(c, def.radius * 0.6);
      if (hit) {
        if (c.bouncesLeft > 0) {
          const dot = c.vx * hit.nx + c.vy * hit.ny;
          if (dot < 0) { c.vx -= 2 * dot * hit.nx; c.vy -= 2 * dot * hit.ny; }
          c.bouncesLeft--;
          c.bounced = true;
          this.emit({ type: 'bounce', x: c.x, y: c.y });
        } else {
          this.land(c);
          return;
        }
      }

      if (def.heavy) this.shoveLoose(c, sx, sy);
      if (this.cutleryHitsPlayers(c)) return;

      if (c.boomerang && owner && Math.hypot(owner.x - c.x, owner.y - c.y) < owner.r + 14) {
        if (owner.holding === null && owner.kaijuT <= 0) {
          c.state = 'held';
          c.holder = owner.id;
          c.boomerang = false;
          owner.holding = c.id;
          this.emit({ type: 'catch', id: owner.id, from: owner.id, x: c.x, y: c.y });
        } else {
          this.land(c);
        }
        return;
      }
      if (!c.boomerang && c.traveled >= c.maxRange) {
        if (def.returns) c.boomerang = true;
        else { this.land(c); return; }
      }
    }
  }

  private cutleryCollide(c: Cutlery, r: number): Hit | null {
    for (const o of this.layout.obstacles) {
      const h = o.shape === 'circle'
        ? circCircle(c.x, c.y, r, o.x, o.y, o.r)
        : circRect(c.x, c.y, r, o.x, o.y, o.w, o.h);
      if (h) {
        c.x += h.nx * h.pen;
        c.y += h.ny * h.pen;
        return h;
      }
    }
    if (c.x < TABLE.x + r) { c.x = TABLE.x + r; return { nx: 1, ny: 0, pen: 0 }; }
    if (c.x > TABLE.x + TABLE.w - r) { c.x = TABLE.x + TABLE.w - r; return { nx: -1, ny: 0, pen: 0 }; }
    if (c.y < TABLE.y + r) { c.y = TABLE.y + r; return { nx: 0, ny: 1, pen: 0 }; }
    if (c.y > TABLE.y + TABLE.h - r) { c.y = TABLE.y + TABLE.h - r; return { nx: 0, ny: -1, pen: 0 }; }
    return null;
  }

  private shoveLoose(c: Cutlery, sx: number, sy: number): void {
    for (const o of this.cutlery) {
      if (o === c || o.state !== 'stuck') continue;
      if (Math.hypot(o.x - c.x, o.y - c.y) < 26) {
        o.x = clamp(o.x + sx, TABLE.x + 8, TABLE.x + TABLE.w - 8);
        o.y = clamp(o.y + sy, TABLE.y + 8, TABLE.y + TABLE.h - 8);
      }
    }
  }

  /** Returns true when the cutlery stopped flying. */
  private cutleryHitsPlayers(c: Cutlery): boolean {
    const def = CUTLERY[c.kind];
    for (const p of this.players) {
      if (!p.alive) continue;
      const isOwner = p.id === c.owner;
      // Your own cutlery only hurts you after it ricochets (and never on a boomerang return).
      if (isOwner && (!c.bounced || c.boomerang || c.traveled < 40)) continue;
      if (!isOwner && this.friends(p.id, c.owner)) continue; // Team Feast: passes through teammates
      if (Math.hypot(p.x - c.x, p.y - c.y) > p.r + def.radius) continue;
      if (p.kaijuT > 0) {
        this.land(c);
        this.emit({ type: 'deflect', x: c.x, y: c.y });
        return true;
      }
      if (p.dashT > 0 && !isOwner) {
        if (p.holding === null && !c.temp) {
          const from = c.owner;
          c.state = 'held';
          c.holder = p.id;
          c.owner = p.id;
          c.boomerang = false;
          p.holding = c.id;
          this.emit({ type: 'catch', id: p.id, from, x: c.x, y: c.y });
        } else {
          this.land(c);
          this.emit({ type: 'deflect', x: c.x, y: c.y });
        }
        return true;
      }
      if (p.invT > 0) continue;
      this.ko(p, c.owner, 'cutlery');
      if (!def.heavy) { this.land(c); return true; }
    }
    return false;
  }

  // ---------------------------------------------------------------- crumbs & pickups
  private addCrumb(x: number, y: number): void {
    this.crumbs.push({ id: this.nextId++, x, y, variant: this.rng.int(3) });
  }

  private freeSpot(margin: number, playerGap: number): [number, number] | null {
    for (let tries = 0; tries < 40; tries++) {
      const x = this.rng.range(TABLE.x + margin, TABLE.x + TABLE.w - margin);
      const y = this.rng.range(TABLE.y + margin, TABLE.y + TABLE.h - margin);
      const blocked = this.layout.obstacles.some(o =>
        o.shape === 'circle' ? Math.hypot(x - o.x, y - o.y) < o.r + 14 : circRect(x, y, 14, o.x, o.y, o.w, o.h) !== null,
      );
      if (blocked) continue;
      if (this.players.some(p => p.alive && Math.hypot(p.x - x, p.y - y) < playerGap)) continue;
      return [x, y];
    }
    return null;
  }

  private spawnCrumb(): void {
    const s = this.freeSpot(24, 40);
    if (s) this.addCrumb(s[0], s[1]);
  }

  private updateItems(dt: number): void {
    if (!this.powerups) return;
    const kinds = enabledPowers();
    if (!kinds.length) return;
    this.itemTimer -= dt;
    if (this.itemTimer <= 0) {
      this.itemTimer = this.rng.range(POWERUPS.every[0], POWERUPS.every[1]);
      if (this.items.length < POWERUPS.max) {
        const s = this.freeSpot(50, 90);
        if (s) {
          const kind = this.rng.pick(kinds);
          this.items.push({ id: this.nextId++, kind, x: s[0], y: s[1], t: 0 });
          this.emit({ type: 'powerSpawn', kind, x: s[0], y: s[1] });
        }
      }
    }
    for (const it of this.items) it.t += dt;
    this.items = this.items.filter(it => it.t < POWERUPS.lifetime);
    for (const p of this.players) {
      if (!p.alive) continue;
      const it = this.items.find(i => Math.hypot(i.x - p.x, i.y - p.y) < p.r + 24);
      if (!it) continue;
      this.items = this.items.filter(i => i !== it);
      if (it.kind === 'hotsauce') p.speedT = POWERUPS.hotsauceTime;
      if (it.kind === 'mustard') p.shieldT = POWERUPS.mustardTime;
      if (it.kind === 'sugar') p.sugarT = POWERUPS.sugarTime;
      if (it.kind === 'gravy' && p.kaijuT <= 0) {
        const was = p.meter;
        p.meter = Math.min(100, p.meter + POWERUPS.gravyMeter);
        if (was < 100 && p.meter >= 100) this.emit({ type: 'meterFull', id: p.id });
      }
      this.emit({ type: 'powerup', id: p.id, kind: it.kind, x: it.x, y: it.y });
    }
  }

  /** Name of a power-up kind (for menus/HUD). */
  static powerName(k: PowerKind): string {
    return POWER_DEFS[k].name;
  }

  private spawnTimers(dt: number): void {
    this.updateItems(dt);
    if (this.opts.crumbSpawns) {
      this.crumbTimer -= dt;
      if (this.crumbTimer <= 0) {
        const rush = this.mode === 'crumbRush';
        this.crumbTimer = rush ? MODE_RULES.crumbRush.crumbEvery : RULES.crumbEvery;
        if (this.crumbs.length < (rush ? MODE_RULES.crumbRush.maxCrumbs : RULES.maxCrumbs)) this.spawnCrumb();
      }
    }
    if (this.opts.pickupSpawns) {
      this.pickupTimer -= dt;
      if (this.pickupTimer <= 0) {
        this.pickupTimer = RULES.pickupEvery;
        const loose = this.cutlery.filter(c => c.owner === null && c.state === 'stuck').length;
        if (loose < RULES.maxLoosePickups && this.cutlery.length < this.players.length * 2 + 2) {
          const s = this.freeSpot(40, 80);
          if (s) {
            const kind: CutleryKind = this.rng.next() < 0.15 ? 'spork' : this.rng.pick(STARTER_KINDS);
            this.newCutlery(kind, s[0], s[1]);
            this.emit({ type: 'spawnCutlery', kind, x: s[0], y: s[1] });
          }
        }
      }
    }
  }

  private eatCrumbs(): void {
    if (!this.crumbs.length) return;
    for (const p of this.players) {
      if (!p.alive || p.kaijuT > 0) continue;
      for (const cr of this.crumbs) {
        if (cr.id < 0 || Math.hypot(cr.x - p.x, cr.y - p.y) > p.r + 6) continue;
        const was = p.meter;
        p.meter = Math.min(100, p.meter + P.crumbValue);
        if (this.mode === 'crumbRush') p.pts++;
        cr.id = -1;
        this.emit({ type: 'eat', id: p.id, x: cr.x, y: cr.y });
        if (was < 100 && p.meter >= 100) this.emit({ type: 'meterFull', id: p.id });
      }
    }
    this.crumbs = this.crumbs.filter(c => c.id >= 0);
  }

  // ---------------------------------------------------------------- hazards
  private hazardOn(k: 'hand' | 'wind' | 'cleaver' | 'burner' | 'toaster'): boolean {
    return this.opts.hazards && this.layout.hazards.includes(k);
  }

  private moveCrumbsOnBelts(dt: number): void {
    const belts = this.layout.belts;
    if (!belts?.length) return;
    for (const c of this.crumbs) {
      for (const b of belts) if (c.x > b.x && c.x < b.x + b.w && c.y > b.y && c.y < b.y + b.h) { c.x += b.vx * dt; c.y += (b.vy ?? 0) * dt; }
    }
    // carried off the end of the belt
    this.crumbs = this.crumbs.filter(c => c.x > TABLE.x + 6 && c.x < TABLE.x + TABLE.w - 6 && c.y > TABLE.y + 6 && c.y < TABLE.y + TABLE.h - 6);
  }

  private updateWind(dt: number): void {
    if (!this.hazardOn('wind')) return;
    if (!this.wind) {
      if (this.phase !== 'play') return;
      this.windTimer -= dt;
      if (this.windTimer > 0) return;
      const dir = this.rng.int(4) * (Math.PI / 2); // right, down, left, up
      this.wind = { state: 'warn', dir, t: 0 };
      this.emit({ type: 'windWarn', dir });
      return;
    }
    const w = this.wind;
    w.t += dt;
    if (w.state === 'warn') {
      if (w.t >= RULES.windWarn) { w.state = 'gust'; w.t = 0; this.emit({ type: 'windGust', dir: w.dir }); }
      return;
    }
    const ax = Math.cos(w.dir) * RULES.windForce * dt, ay = Math.sin(w.dir) * RULES.windForce * dt;
    for (const p of this.players) {
      if (!p.alive) continue;
      const k = p.kaijuT > 0 ? 0.35 : 1; // big kaiju are harder to blow away
      p.kx += ax * k;
      p.ky += ay * k;
    }
    for (const c of this.cutlery) if (c.state === 'flying') { c.vx += ax * 0.3; c.vy += ay * 0.3; }
    for (const c of this.crumbs) { c.x += Math.cos(w.dir) * 160 * dt; c.y += Math.sin(w.dir) * 160 * dt; }
    this.crumbs = this.crumbs.filter(c => c.x > TABLE.x && c.x < TABLE.x + TABLE.w && c.y > TABLE.y && c.y < TABLE.y + TABLE.h);
    if (w.t >= RULES.windGust) {
      this.wind = null;
      const iv = this.roundT > RULES.suddenDeathAt ? RULES.suddenDeathInterval : RULES.windInterval;
      this.windTimer = this.rng.range(iv[0], iv[1]);
    }
  }

  onSticky(x: number, y: number): boolean {
    for (const z of this.layout.stickies ?? []) if (Math.hypot(x - z.x, y - z.y) < z.r) return true;
    return false;
  }

  /** Lazy Susan: rotate everything sitting on the turntable around its centre. */
  private spinTurntable(dt: number): void {
    const tt = this.layout.turntable;
    if (!tt || this.phase === 'countdown') return;
    const a = tt.spin * dt, c = Math.cos(a), sn = Math.sin(a);
    this.turnAngle += a;
    const turn = (o: { x: number; y: number }) => {
      const dx = o.x - tt.x, dy = o.y - tt.y;
      if (dx * dx + dy * dy > tt.r * tt.r) return;
      o.x = tt.x + dx * c - dy * sn;
      o.y = tt.y + dx * sn + dy * c;
    };
    for (const p of this.players) if (p.alive) turn(p);
    for (const cu of this.cutlery) if (cu.state === 'stuck') turn(cu);
    for (const cr of this.crumbs) turn(cr);
  }

  private updateToasters(dt: number): void {
    // flying toast
    const R = RULES.toastRadius;
    for (const t of this.toasts) {
      t.x += t.vx * dt;
      t.y += t.vy * dt;
      t.spin += dt * 9;
      let broke = t.x < TABLE.x || t.x > TABLE.x + TABLE.w || t.y < TABLE.y || t.y > TABLE.y + TABLE.h;
      for (const o of this.layout.obstacles) {
        if (o.style === 'toaster') continue; // it flies out of its own toaster
        if (o.shape === 'circle' ? Math.hypot(t.x - o.x, t.y - o.y) < o.r + R * 0.6 : circRect(t.x, t.y, R * 0.6, o.x, o.y, o.w, o.h)) broke = true;
      }
      for (const p of this.players) {
        if (!p.alive || p.invT > 0 || Math.hypot(p.x - t.x, p.y - t.y) > p.r + R) continue;
        if (p.kaijuT > 0) { broke = true; continue; } // a kaiju just eats it
        this.ko(p, null, 'toast');
        broke = true;
      }
      if (broke) { t.spin = NaN; this.emit({ type: 'toastBreak', x: t.x, y: t.y }); }
    }
    this.toasts = this.toasts.filter(t => !Number.isNaN(t.spin));

    const list = this.layout.toasters ?? [];
    if (!this.hazardOn('toaster') || !list.length) return;
    if (!this.toaster) {
      if (this.phase !== 'play') return;
      this.toasterTimer -= dt;
      if (this.toasterTimer > 0) return;
      const i = this.rng.int(list.length);
      this.toaster = { state: 'warn', i, t: 0 };
      this.emit({ type: 'toasterWarn', i });
      return;
    }
    const ts = this.toaster;
    ts.t += dt;
    if (ts.t >= RULES.toasterWarn) {
      const z = list[ts.i];
      this.toasts.push({ x: z.x, y: z.y, vx: Math.cos(z.a) * RULES.toastSpeed, vy: Math.sin(z.a) * RULES.toastSpeed, spin: 0 });
      this.emit({ type: 'toasterPop', i: ts.i, x: z.x, y: z.y });
      this.toaster = null;
      const iv = this.roundT > RULES.suddenDeathAt ? RULES.toasterSuddenDeath : RULES.toasterInterval;
      this.toasterTimer = this.rng.range(iv[0], iv[1]);
    }
  }

  onSpill(x: number, y: number): boolean {
    for (const z of this.layout.spills ?? []) if (Math.hypot(x - z.x, y - z.y) < z.r) return true;
    return false;
  }

  private updateBurner(dt: number): void {
    const list = this.layout.burners ?? [];
    if (!this.hazardOn('burner') || !list.length) return;
    if (!this.burner) {
      if (this.phase !== 'play') return;
      this.burnerTimer -= dt;
      if (this.burnerTimer > 0) return;
      // heat up the burner closest to a random kaiju, so it always matters
      const alive = this.alivePlayers();
      if (!alive.length) return;
      const t = this.rng.pick(alive);
      let i = 0, best = Infinity;
      list.forEach((z, k) => { const d = Math.hypot(z.x - t.x, z.y - t.y); if (d < best) { best = d; i = k; } });
      this.burner = { state: 'warn', i, t: 0 };
      this.emit({ type: 'burnerWarn', i, x: list[i].x, y: list[i].y });
      return;
    }
    const b = this.burner, z = list[b.i];
    b.t += dt;
    if (b.state === 'warn') {
      if (b.t >= RULES.burnerWarn) { b.state = 'flare'; b.t = 0; this.emit({ type: 'burnerFlare', i: b.i, x: z.x, y: z.y }); }
      return;
    }
    for (const p of this.players) {
      if (p.alive && Math.hypot(p.x - z.x, p.y - z.y) < z.r + p.r * 0.3) this.ko(p, null, 'burn');
    }
    this.crumbs = this.crumbs.filter(c => Math.hypot(c.x - z.x, c.y - z.y) > z.r);
    if (b.t >= RULES.burnerFlare) {
      this.burner = null;
      const iv = this.roundT > RULES.suddenDeathAt ? RULES.burnerSuddenDeath : RULES.burnerInterval;
      this.burnerTimer = this.rng.range(iv[0], iv[1]);
    }
  }

  private updateCleaver(dt: number): void {
    if (!this.hazardOn('cleaver')) return;
    if (!this.cleaver) {
      if (this.phase !== 'play') return;
      this.cleaverTimer -= dt;
      if (this.cleaverTimer > 0) return;
      const alive = this.alivePlayers();
      if (!alive.length) return;
      const target = this.rng.pick(alive);
      const half = RULES.cleaverBand / 2;
      const x = clamp(target.x + this.rng.range(-30, 30), TABLE.x + half, TABLE.x + TABLE.w - half);
      this.cleaver = { state: 'warn', x, t: 0 };
      this.emit({ type: 'cleaverWarn', x });
      return;
    }
    const c = this.cleaver;
    c.t += dt;
    if (c.state === 'warn') {
      if (c.t >= RULES.cleaverWarn) {
        c.state = 'chop';
        c.t = 0;
        this.emit({ type: 'cleaverChop', x: c.x });
        for (const p of this.players) {
          if (p.alive && Math.abs(p.x - c.x) < RULES.cleaverBand / 2 + p.r * 0.5) this.ko(p, null, 'chop');
        }
        this.crumbs = this.crumbs.filter(cr => Math.abs(cr.x - c.x) > RULES.cleaverBand / 2);
      }
      return;
    }
    if (c.t >= RULES.cleaverShow) {
      this.cleaver = null;
      const iv = this.roundT > RULES.suddenDeathAt ? RULES.cleaverSuddenDeath : RULES.cleaverInterval;
      this.cleaverTimer = this.rng.range(iv[0], iv[1]);
    }
  }

  private updateHand(dt: number): void {
    this.moveCrumbsOnBelts(dt);
    if (!this.hazardOn('hand')) return;
    const band = RULES.handBand, W = RULES.handWidth;
    if (!this.hand) {
      this.handTimer -= dt;
      if (this.handTimer > 0) return;
      const alive = this.alivePlayers();
      if (!alive.length) return;
      // The giant hand goes for the biggest threat: a kaiju, else the fullest belly.
      let target = alive.find(p => p.kaijuT > 0);
      if (!target) {
        const top = Math.max(...alive.map(p => p.meter));
        target = this.rng.pick(alive.filter(p => p.meter === top));
      }
      const y = clamp(target.y, TABLE.y + band / 2, TABLE.y + TABLE.h - band / 2);
      const dir: 1 | -1 = this.rng.next() < 0.5 ? 1 : -1;
      this.hand = { state: 'warn', y, dir, t: 0, x: 0, target: target.id };
      this.emit({ type: 'handWarn', y, dir, target: target.id });
      return;
    }
    const h = this.hand;
    h.t += dt;
    if (h.state === 'warn') {
      if (h.t >= RULES.handWarn) {
        h.state = 'sweep';
        h.t = 0;
        h.x = h.dir > 0 ? TABLE.x - 20 : TABLE.x + TABLE.w + 20;
        this.emit({ type: 'handSweep' });
      }
      return;
    }
    const prev = h.x;
    h.x += h.dir * RULES.handSpeed * dt;
    const lo = Math.min(prev, h.x, h.x - h.dir * W), hi = Math.max(prev, h.x, h.x - h.dir * W);
    for (const p of this.players) {
      if (!p.alive) continue;
      if (Math.abs(p.y - h.y) < band / 2 + p.r * 0.5 && p.x + p.r > lo && p.x - p.r < hi) this.ko(p, null, 'hand');
    }
    this.crumbs = this.crumbs.filter(c => !(Math.abs(c.y - h.y) < band / 2 && c.x > lo && c.x < hi));
    const done = h.dir > 0 ? h.x - W > TABLE.x + TABLE.w : h.x + W < TABLE.x;
    if (done) {
      this.hand = null;
      const iv = this.roundT > RULES.suddenDeathAt ? RULES.suddenDeathInterval : RULES.handInterval;
      this.handTimer = this.rng.range(iv[0], iv[1]);
    }
  }

  // ---------------------------------------------------------------- party modes
  /** True when a and b are on the same team (Team Feast only). */
  friends(a: number | null, b: number | null): boolean {
    if (this.mode !== 'teams' || a === null || b === null || a === b || MODE_RULES.teams.friendlyFire) return false;
    return this.players[a]?.team === this.players[b]?.team;
  }

  /** Seconds left in a timed round (Crumb Rush), else null. */
  timeLeft(): number | null {
    return this.mode === 'crumbRush' ? Math.max(0, MODE_RULES.crumbRush.roundTime - this.roundT) : null;
  }

  private updateMode(dt: number): void {
    if (this.mode === 'crumbRush') {
      for (const p of this.players) {
        if (p.alive || p.respawnT <= 0) continue;
        p.respawnT -= dt;
        if (p.respawnT > 0) continue;
        p.respawnT = 0;
        const s = this.freeSpot(60, 90) ?? this.layout.spawns[p.id % this.layout.spawns.length];
        Object.assign(p, { x: s[0], y: s[1], vx: 0, vy: 0, kx: 0, ky: 0, alive: true, invT: MODE_RULES.crumbRush.respawnShield, lastHitBy: null, lastHitT: 0, prev: { throw: true, swipe: true, dash: true, stomp: true } });
        if (p.holding === null) {
          const c = this.newCutlery(this.rng.pick(STARTER_KINDS), p.x, p.y);
          c.state = 'held'; c.holder = p.id; c.owner = p.id; p.holding = c.id;
        }
        this.emit({ type: 'respawn', id: p.id, x: p.x, y: p.y });
      }
    }
    if (this.mode === 'hotDumpling') {
      const R = MODE_RULES.hotDumpling;
      const alive = this.alivePlayers();
      if (alive.length < 2) return;
      if (!this.hot || !this.players[this.hot.id].alive) {
        const to = this.rng.pick(alive);
        this.hot = { id: to.id, fuse: this.hot?.fuse ?? this.rng.range(R.fuse[0], R.fuse[1]), cd: R.passCooldown };
        this.emit({ type: 'hotGive', id: to.id, from: null, x: to.x, y: to.y });
        return;
      }
      const h = this.hot, holder = this.players[h.id];
      h.fuse -= dt;
      h.cd -= dt;
      if (h.fuse <= 0) {
        this.emit({ type: 'hotBoom', id: holder.id, x: holder.x, y: holder.y });
        this.hot = null;
        holder.invT = 0;
        this.ko(holder, null, 'boom');
        return;
      }
      if (h.cd > 0) return;
      for (const q of alive) {
        if (q === holder || Math.hypot(q.x - holder.x, q.y - holder.y) > q.r + holder.r + 8) continue;
        this.hot = { id: q.id, fuse: h.fuse, cd: R.passCooldown };
        this.emit({ type: 'hotGive', id: q.id, from: holder.id, x: q.x, y: q.y });
        break;
      }
    }
  }

  // ---------------------------------------------------------------- rounds
  private endRound(winners: Player[]): void {
    this.phase = 'roundEnd';
    this.phaseT = 0;
    this.hot = null;
    this.winner = winners[0]?.id ?? null;
    for (const w of winners) w.score++;
    this.emit({ type: 'roundEnd', winner: this.winner });
  }

  private checkRound(): void {
    if (this.phase === 'play' && this.players.length > 1 && this.mode === 'crumbRush') {
      if (this.roundT >= MODE_RULES.crumbRush.roundTime) {
        const best = Math.max(...this.players.map(p => p.pts));
        const top = this.players.filter(p => p.pts === best);
        this.endRound(best > 0 && top.length === 1 ? top : []);
      }
    } else if (this.phase === 'play' && this.players.length > 1 && this.mode === 'teams') {
      const alive = this.alivePlayers();
      const teams = new Set(alive.map(p => p.team));
      if (teams.size <= 1) this.endRound(alive.length ? this.players.filter(p => p.team === alive[0].team) : []);
    } else if (this.phase === 'play' && this.players.length > 1) {
      const alive = this.alivePlayers();
      if (alive.length <= 1) {
        this.phase = 'roundEnd';
        this.phaseT = 0;
        this.winner = alive[0]?.id ?? null;
        if (alive[0]) alive[0].score++;
        this.emit({ type: 'roundEnd', winner: this.winner });
      }
    } else if (this.phase === 'roundEnd' && this.phaseT >= RULES.roundEndTime) {
      const champ = this.players.find(p => p.score >= this.opts.target);
      if (champ) {
        this.phase = 'matchEnd';
        this.phaseT = 0;
        this.winner = champ.id;
        this.emit({ type: 'matchEnd', winner: champ.id });
      } else {
        this.startRound();
      }
    }
  }
}
