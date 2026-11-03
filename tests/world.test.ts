import { describe, expect, it } from 'vitest';
import { BotBrain } from '../src/sim/bot';
import { P, TABLE } from '../src/sim/constants';
import type { CutleryKind } from '../src/sim/cutlery';
import { NO_INPUT, World, type GameEvent, type PlayerInput } from '../src/sim/world';

const DT = 1 / 120;

function makeWorld(n = 2, kind: CutleryKind = 'fork', extra: Partial<ConstructorParameters<typeof World>[0]> = {}) {
  const w = new World({
    players: Array.from({ length: n }, (_, i) => ({ name: 'P' + i })),
    seed: 7, hazards: false, crumbSpawns: false, pickupSpawns: false, layout: 0, starterKind: kind, ...extra,
  });
  while (w.phase !== 'play') w.step(DT, []);
  w.crumbs = [];
  w.drainEvents();
  return w;
}

function place(w: World, id: number, x: number, y: number) {
  const p = w.players[id];
  p.x = x; p.y = y; p.vx = p.vy = p.kx = p.ky = 0;
}

function disarm(w: World, id: number) {
  const p = w.players[id];
  w.cutlery = w.cutlery.filter(c => c.id !== p.holding);
  p.holding = null;
}

/** Runs the sim; `inputs(t)` returns per-player input for that moment. Collects all events. */
function run(w: World, seconds: number, inputs: (t: number) => PlayerInput[] = () => []): GameEvent[] {
  const ev: GameEvent[] = [];
  for (let t = 0; t < seconds; t += DT) {
    w.step(DT, inputs(t));
    ev.push(...w.drainEvents());
  }
  return ev;
}

const tap = (aimX: number, aimY: number, t: number): PlayerInput => ({ ...NO_INPUT, aimX, aimY, throw: t < DT * 1.5 });

describe('throwing', () => {
  it('a thrown fork knocks out the target and credits the thrower', () => {
    const w = makeWorld();
    place(w, 0, 250, 150);
    place(w, 1, 700, 150);
    const ev = run(w, 1, t => [tap(1, 0, t)]);
    expect(w.players[1].alive).toBe(false);
    expect(w.players[0].kos).toBe(1);
    expect(ev.find(e => e.type === 'ko')).toMatchObject({ id: 1, by: 0, cause: 'cutlery' });
    expect(w.phase).toBe('roundEnd');
    expect(w.players[0].score).toBe(1);
  });

  it('missed cutlery sticks where it lands and anyone can steal it', () => {
    const w = makeWorld();
    place(w, 0, 250, 150);
    place(w, 1, 900, 600);
    const forkId = w.players[0].holding!;
    run(w, 0.5, t => [tap(0, -1, t)]);
    const fork = w.cutleryById(forkId)!;
    expect(fork.state).toBe('stuck');
    expect(fork.y).toBeLessThan(TABLE.y + 12);
    disarm(w, 1);
    place(w, 1, fork.x, fork.y + 10);
    const ev = run(w, 0.05);
    expect(w.players[1].holding).toBe(forkId);
    expect(ev.find(e => e.type === 'pickup')).toMatchObject({ id: 1, stolenFrom: 0 });
  });

  it('stuck cutlery slides back to its unarmed owner after the delay', () => {
    const w = makeWorld();
    place(w, 0, 250, 150);
    place(w, 1, 900, 600);
    const forkId = w.players[0].holding!;
    run(w, 0.5, t => [tap(0, -1, t)]);
    run(w, 3.4);
    expect(w.cutleryById(forkId)!.state).toBe('stuck');
    run(w, 2.5);
    expect(w.players[0].holding).toBe(forkId);
  });

  it('chopsticks fire two sticks and the spare vanishes on landing', () => {
    const w = makeWorld(2, 'chopstick');
    place(w, 0, 250, 150);
    place(w, 1, 900, 600);
    run(w, 0.02, t => [tap(0, -1, t)]);
    expect(w.cutlery.filter(c => c.state === 'flying').length).toBe(2);
    const ev = run(w, 0.6);
    expect(ev.some(e => e.type === 'vanish')).toBe(true);
    expect(w.cutlery.filter(c => c.owner === 0).length).toBe(1);
  });

  it('a spoon ricochets once and can hit its own thrower', () => {
    const w = makeWorld(3, 'spoon');
    place(w, 0, 250, 300);
    place(w, 1, 900, 600);
    place(w, 2, 1000, 200);
    const ev = run(w, 1.2, t => [tap(0, -1, t)]);
    expect(ev.some(e => e.type === 'bounce')).toBe(true);
    expect(w.players[0].alive).toBe(false);
    expect(ev.find(e => e.type === 'ko')).toMatchObject({ id: 0, by: null });
  });

  it('a spork boomerangs back into its thrower\'s hand', () => {
    const w = makeWorld(2, 'spork');
    place(w, 0, 250, 150);
    place(w, 1, 900, 600);
    const id = w.players[0].holding!;
    const ev = run(w, 2, t => [tap(1, 0, t)]);
    expect(ev.find(e => e.type === 'catch')).toMatchObject({ id: 0, from: 0 });
    expect(w.players[0].holding).toBe(id);
  });
});

describe('close combat', () => {
  it('a swipe knocks out an adjacent enemy in front', () => {
    const w = makeWorld();
    place(w, 0, 400, 150);
    place(w, 1, 450, 150);
    run(w, 0.2, () => [{ ...NO_INPUT, aimX: 1, aimY: 0, swipe: true }]);
    expect(w.players[1].alive).toBe(false);
  });

  it('dashing into an enemy fork while unarmed catches it', () => {
    const w = makeWorld();
    place(w, 0, 250, 150);
    place(w, 1, 700, 150);
    disarm(w, 1);
    const forkId = w.players[0].holding!;
    const ev = run(w, 0.8, t => [tap(1, 0, t), { ...NO_INPUT, mx: -1, dash: t >= 0.4 }]);
    expect(w.players[1].alive).toBe(true);
    expect(w.players[1].holding).toBe(forkId);
    expect(ev.find(e => e.type === 'catch')).toMatchObject({ id: 1, from: 0 });
  });

  it('walking cannot take you off the table, but knockback can', () => {
    const w = makeWorld();
    place(w, 0, 120, 300);
    place(w, 1, 900, 600);
    run(w, 1, () => [{ ...NO_INPUT, mx: -1 }]);
    expect(w.players[0].alive).toBe(true);
    expect(w.players[0].x).toBeGreaterThanOrEqual(TABLE.x);
    place(w, 1, 130, 600);
    w.players[1].kx = -900;
    w.players[1].lastHitBy = 0;
    w.players[1].lastHitT = 2;
    const ev = run(w, 0.3);
    expect(ev.find(e => e.type === 'ko')).toMatchObject({ id: 1, by: 0, cause: 'fall' });
  });
});

describe('grow meter and kaiju mode', () => {
  it('crumbs fill the meter, stomp transforms, kaiju shrugs off cutlery and squashes', () => {
    const w = makeWorld(3);
    place(w, 0, 800, 200);
    place(w, 1, 800, 550);
    place(w, 2, 1100, 600);
    for (let i = 0; i < 12; i++) w.crumbs.push({ id: 5000 + i, x: 800, y: 200, variant: 0 });
    run(w, 0.05);
    expect(w.players[0].meter).toBe(100);
    run(w, 0.05, () => [{ ...NO_INPUT, stomp: true }]);
    const k = w.players[0];
    expect(k.kaijuT).toBeGreaterThan(0);
    expect(k.holding).toBeNull();
    // P1 throws straight up at the kaiju: it should bounce off.
    const ev = run(w, 0.6, t => [NO_INPUT, tap(0, -1, t)]);
    expect(k.alive).toBe(true);
    expect(ev.some(e => e.type === 'deflect')).toBe(true);
    // Walking into a kaiju gets you squashed.
    place(w, 1, k.x, k.y + P.kaijuRadius + 10);
    run(w, 0.3, () => [NO_INPUT, { ...NO_INPUT, my: -1 }]);
    expect(w.players[1].alive).toBe(false);
  });

  it('kaiju mode runs out and you shrink back', () => {
    const w = makeWorld(3);
    place(w, 0, 640, 200);
    place(w, 1, 200, 600);
    place(w, 2, 1100, 600);
    w.players[0].meter = 100;
    const ev = run(w, P.kaijuTime + 0.5, t => [{ ...NO_INPUT, stomp: t < 0.02 }]);
    expect(ev.some(e => e.type === 'shrink')).toBe(true);
    expect(w.players[0].kaijuT).toBe(0);
  });
});

describe('giant hand', () => {
  it('warns first, then flicks everyone in its lane off the table', () => {
    const w = makeWorld(3, 'fork', { hazards: true });
    place(w, 0, 300, 300);
    place(w, 1, 900, 300);
    place(w, 2, 640, 640);
    w.players[0].meter = 40;
    w.players[1].meter = 40;
    (w as unknown as { handTimer: number }).handTimer = 0;
    const ev = run(w, 0.2);
    expect(ev.find(e => e.type === 'handWarn')).toBeTruthy();
    expect(w.players.every(p => p.alive)).toBe(true);
    const ev2 = run(w, 2.5);
    const kos = ev2.filter(e => e.type === 'ko');
    expect(kos.map(e => (e as { id: number; cause: string }).cause)).toEqual(['hand', 'hand']);
    expect(kos.map(e => (e as { id: number }).id).sort()).toEqual([0, 1]);
    expect(w.players[2].alive).toBe(true);
    expect(w.winner).toBe(2);
  });
});

describe('new tables', () => {
  it('Sushi Bar: the conveyor carries players and loose cutlery sideways', () => {
    const w = makeWorld(2, 'fork', { layout: 3 });
    expect(w.layout.name).toBe('Sushi Bar');
    place(w, 0, 500, 383);
    place(w, 1, 900, 620);
    const fork = w.cutleryById(w.players[1].holding)!;
    disarm(w, 1);
    w.cutlery.push(fork);
    Object.assign(fork, { state: 'stuck', holder: null, owner: null, x: 300, y: 383 });
    run(w, 1);
    expect(w.players[0].x).toBeGreaterThan(600);
    expect(fork.x).toBeGreaterThan(400);
  });

  it('Birthday Bash: a gust blows a player near the edge off the table', () => {
    const w = makeWorld(3, 'fork', { layout: 4, hazards: true });
    place(w, 0, 1130, 260);
    place(w, 1, 300, 600);
    place(w, 2, 640, 150);
    w.wind = { state: 'gust', dir: 0, t: 0 };
    const ev = run(w, 1.5);
    expect(ev.find(e => e.type === 'ko' && e.id === 0)).toMatchObject({ cause: 'wind' });
  });

  it('Birthday Bash: walking into the wind keeps you on the table', () => {
    const w = makeWorld(3, 'fork', { layout: 4, hazards: true });
    place(w, 0, 900, 260);
    place(w, 1, 300, 600);
    place(w, 2, 640, 150);
    w.wind = { state: 'gust', dir: 0, t: 0 };
    run(w, 1.5, () => [{ ...NO_INPUT, mx: -1 }]);
    expect(w.players[0].alive).toBe(true);
  });

  it("Chef's Board: the cleaver warns, then chops everyone in its lane", () => {
    const w = makeWorld(3, 'fork', { layout: 5, hazards: true });
    place(w, 0, 260, 380);
    place(w, 1, 1000, 380);
    place(w, 2, 640, 150);
    w.cleaver = { state: 'warn', x: 260, t: 0 };
    run(w, 0.6);
    expect(w.players[0].alive).toBe(true); // still warning
    const ev = run(w, 0.8);
    expect(ev.find(e => e.type === 'ko' && e.id === 0)).toMatchObject({ cause: 'chop' });
    expect(w.players[1].alive && w.players[2].alive).toBe(true);
  });

  it('a chosen table is used for every round', () => {
    const w = new World({ players: [{ name: 'a' }, { name: 'b' }], seed: 3, layouts: [4] });
    for (let r = 0; r < 3; r++) {
      expect(w.layout.name).toBe('Birthday Bash');
      w.startRound();
    }
  });
});

describe('match flow', () => {
  it('first to the target wins the match', () => {
    const w = makeWorld();
    w.players[0].score = 4;
    place(w, 0, 250, 150);
    place(w, 1, 700, 150);
    run(w, 1, t => [tap(1, 0, t)]);
    expect(w.phase).toBe('roundEnd');
    const ev = run(w, 3);
    expect(w.phase).toBe('matchEnd');
    expect(ev.find(e => e.type === 'matchEnd')).toMatchObject({ winner: 0 });
  });

  it('starts a fresh round on a new table when nobody has won yet', () => {
    const w = makeWorld();
    place(w, 0, 250, 150);
    place(w, 1, 700, 150);
    run(w, 1, t => [tap(1, 0, t)]);
    run(w, 3);
    expect(w.round).toBe(2);
    expect(w.players.every(p => p.alive && p.holding !== null)).toBe(true);
  });
});

describe('bots', () => {
  for (const seed of [1, 2, 3]) {
    it(`four bots finish a full match without breaking (seed ${seed})`, () => {
      const w = new World({ players: [0, 1, 2, 3].map(i => ({ name: 'B' + i })), seed });
      const bots = [0, 1, 2, 3].map(i => new BotBrain(i, (['easy', 'normal', 'hard', 'normal'] as const)[i], seed * 10 + i));
      const causes = new Set<string>();
      let t = 0;
      while (w.phase !== 'matchEnd' && t < 900) {
        w.step(DT, bots.map(b => b.decide(w, DT)));
        for (const e of w.drainEvents()) if (e.type === 'ko') causes.add(e.cause);
        for (const p of w.players) {
          expect(Number.isFinite(p.x) && Number.isFinite(p.y)).toBe(true);
        }
        t += DT;
      }
      expect(w.phase).toBe('matchEnd');
      expect(w.round).toBeGreaterThanOrEqual(5);
      expect(causes.size).toBeGreaterThanOrEqual(2);
    });
  }
});
