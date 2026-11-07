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

  it('Diner Griddle: a burner glows first, then grills anyone standing on it', () => {
    const w = makeWorld(3, 'fork', { layout: 6, hazards: true });
    expect(w.layout.name).toBe('Diner Griddle');
    const z = w.layout.burners![0];
    place(w, 0, z.x, z.y);
    place(w, 1, 1100, 380);
    place(w, 2, 640, 150);
    w.burner = { state: 'warn', i: 0, t: 0 };
    run(w, 1.0);
    expect(w.players[0].alive).toBe(true); // still only glowing
    const ev = run(w, 0.6);
    expect(ev.find(e => e.type === 'ko' && e.id === 0)).toMatchObject({ cause: 'burn' });
    expect(w.players[1].alive && w.players[2].alive).toBe(true);
  });

  it('Ice Cream Parlour: on a melted puddle you keep sliding after letting go', () => {
    const slideFrom = (x: number, y: number) => {
      const w = makeWorld(2, 'fork', { layout: 7 });
      place(w, 0, x, y);
      place(w, 1, 1100, 620);
      w.players[0].vx = 260; // running at full speed, then let go
      run(w, 0.4);
      return w.players[0].x - x;
    };
    const z = makeWorld(2, 'fork', { layout: 7 }).layout.spills![0];
    expect(slideFrom(z.x - 50, z.y)).toBeGreaterThan(slideFrom(640, 470) * 3);
  });

  it('Picnic Blanket: the ant trail carries players down the blanket', () => {
    const w = makeWorld(2, 'fork', { layout: 8 });
    expect(w.layout.name).toBe('Picnic Blanket');
    place(w, 0, 640, 200);
    place(w, 1, 1100, 620);
    run(w, 1);
    expect(w.players[0].y).toBeGreaterThan(290);
  });

  it('Bakery Bench: sticky dough halves your speed', () => {
    const w = makeWorld(2, 'fork', { layout: 9 });
    expect(w.layout.name).toBe('Bakery Bench');
    const z = w.layout.stickies![0];
    place(w, 0, z.x - 30, z.y);
    place(w, 1, 1100, 620);
    run(w, 0.25, () => [{ ...NO_INPUT, mx: 1 }]);
    const onDough = w.players[0].x - (z.x - 30);
    const d = makeWorld(2, 'fork', { layout: 9 });
    place(d, 0, 640, 470);
    place(d, 1, 1100, 620);
    run(d, 0.25, () => [{ ...NO_INPUT, mx: 1 }]);
    expect(onDough).toBeLessThan((d.players[0].x - 640) * 0.65);
  });

  it('Banquet Lazy Susan: the turntable carries you around its centre', () => {
    const w = makeWorld(2, 'fork', { layout: 10 });
    const tt = w.layout.turntable!;
    place(w, 0, tt.x + 150, tt.y);
    place(w, 1, 1100, 620);
    run(w, 1);
    const p = w.players[0];
    expect(Math.hypot(p.x - tt.x, p.y - tt.y)).toBeCloseTo(150, -1); // same distance from the centre...
    expect(Math.atan2(p.y - tt.y, p.x - tt.x)).toBeGreaterThan(0.5); // ...but turned
  });

  it('Breakfast Rush: a toaster warns, then its toast knocks out whoever is in the lane', () => {
    const w = makeWorld(3, 'fork', { layout: 11, hazards: true });
    const z = w.layout.toasters![0]; // fires to the right along y = z.y
    place(w, 0, 480, z.y);
    place(w, 1, 480, 600);
    place(w, 2, 1000, 150);
    w.toaster = { state: 'warn', i: 0, t: 0 };
    run(w, 1.0);
    expect(w.players[0].alive).toBe(true); // still warning
    const ev = run(w, 0.8);
    expect(ev.find(e => e.type === 'ko' && e.id === 0)).toMatchObject({ cause: 'toast' });
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

describe('6 players', () => {
  it('every table has 6 safe, spread-out starting spots', async () => {
    const { LAYOUTS } = await import('../src/sim/layouts');
    for (const L of LAYOUTS) {
      expect(L.spawns.length, L.name).toBeGreaterThanOrEqual(6);
      L.spawns.forEach(([x, y], i) => {
        const where = `${L.name} spawn ${i} (${x},${y})`;
        expect(x > TABLE.x + 40 && x < TABLE.x + TABLE.w - 40 && y > TABLE.y + 30 && y < TABLE.y + TABLE.h - 30, where + ' on the table').toBe(true);
        for (const o of L.obstacles) {
          const clear = o.shape === 'circle' ? Math.hypot(x - o.x, y - o.y) > o.r + P.radius + 8
            : x < o.x - P.radius - 8 || x > o.x + o.w + P.radius + 8 || y < o.y - P.radius - 8 || y > o.y + o.h + P.radius + 8;
          expect(clear, `${where} clear of ${o.style}`).toBe(true);
        }
        for (const z of [...(L.burners ?? []), ...(L.spills ?? [])]) expect(Math.hypot(x - z.x, y - z.y) > z.r + P.radius, `${where} off burners/puddles`).toBe(true);
        for (const b of L.belts ?? []) expect(x > b.x - P.radius && x < b.x + b.w + P.radius && y > b.y - P.radius && y < b.y + b.h + P.radius, `${where} off belts`).toBe(false);
        L.spawns.forEach(([x2, y2], j) => { if (j !== i) expect(Math.hypot(x - x2, y - y2) > 100, `${where} apart from spawn ${j}`).toBe(true); });
      });
    }
  });

  it('six bots finish a full match', () => {
    const w = new World({ players: [0, 1, 2, 3, 4, 5].map(i => ({ name: 'B' + i })), seed: 6 });
    const bots = w.players.map((_, i) => new BotBrain(i, 'normal', 60 + i));
    let t = 0;
    while (w.phase !== 'matchEnd' && t < 1200) { w.step(DT, bots.map(b => b.decide(w, DT))); w.drainEvents(); t += DT; }
    expect(w.phase).toBe('matchEnd');
    expect(new Set(w.players.map(p => `${Math.round(p.x)},${Math.round(p.y)}`)).size).toBe(6);
  });
});

describe('online snapshots', () => {
  it('a guest world rebuilt from a snapshot matches the host world', async () => {
    const { makeSnapshot, applySnapshot } = await import('../src/net/snapshot');
    const host = new World({ players: [0, 1, 2].map(i => ({ name: 'P' + i })), seed: 11, layout: 6 });
    const bots = [0, 1, 2].map(i => new BotBrain(i, 'hard', i));
    for (let t = 0; t < 6; t += DT) host.step(DT, bots.map(b => b.decide(host, DT)));
    host.burner = { state: 'warn', i: 1, t: 0.5 };
    const snap = JSON.parse(JSON.stringify(makeSnapshot(host))); // through the wire
    const guest = new World({ players: [0, 1, 2].map(i => ({ name: 'P' + i })), seed: 99 });
    applySnapshot(guest, snap);
    expect(guest.layout.name).toBe(host.layout.name);
    expect(guest.phase).toBe(host.phase);
    expect(guest.burner).toMatchObject({ state: 'warn', i: 1 });
    guest.players.forEach((p, i) => {
      expect(p.x).toBeCloseTo(host.players[i].x, 0);
      expect(p.alive).toBe(host.players[i].alive);
      expect(p.holding).toBe(host.players[i].holding);
      expect(p.score).toBe(host.players[i].score);
    });
    expect(guest.cutlery.map(c => [c.id, c.kind, c.state])).toEqual(host.cutlery.map(c => [c.id, c.kind, c.state]));
    expect(guest.crumbs.length).toBe(host.crumbs.length);
    expect(JSON.stringify(snap).length).toBeLessThan(6000); // small enough to send ~20x a second
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

describe('kaiju look distinct', () => {
  it('no two kaiju player colours are too close to tell apart', async () => {
    const { SPECIES } = await import('../src/sim/constants');
    const lab = (hex: number) => {
      const c = [(hex >> 16) & 255, (hex >> 8) & 255, hex & 255].map(v => { v /= 255; return v > 0.04045 ? ((v + 0.055) / 1.055) ** 2.4 : v / 12.92; });
      const X = (c[0] * 0.4124 + c[1] * 0.3576 + c[2] * 0.1805) / 0.95047, Y = c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722, Z = (c[0] * 0.0193 + c[1] * 0.1192 + c[2] * 0.9505) / 1.08883;
      const f = (t: number) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116);
      return [116 * f(Y) - 16, 500 * (f(X) - f(Y)), 200 * (f(Y) - f(Z))];
    };
    for (let i = 0; i < SPECIES.length; i++) for (let j = i + 1; j < SPECIES.length; j++) {
      const a = lab(SPECIES[i].color), b = lab(SPECIES[j].color);
      expect(Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]), `${SPECIES[i].name} vs ${SPECIES[j].name}`).toBeGreaterThan(28);
    }
  });
});

describe('story mode', () => {
  it('every chapter uses a real table, real kaiju and sensible settings', async () => {
    const { CHAPTERS } = await import('../src/story/chapters');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const { SPECIES, MAX_PLAYERS } = await import('../src/sim/constants');
    expect(CHAPTERS.length).toBe(12);
    CHAPTERS.forEach((ch, i) => {
      expect(LAYOUTS[ch.table], ch.title).toBeTruthy();
      expect(ch.rivals.length + 1).toBeLessThanOrEqual(MAX_PLAYERS);
      expect(ch.rounds).toBeGreaterThanOrEqual(1);
      for (const r of ch.rivals) expect(SPECIES[r.species], ch.title).toBeTruthy();
      expect(new Set(ch.rivals.map(r => r.species)).size, `${ch.title} rivals are all different`).toBe(ch.rivals.length);
      for (const l of [...ch.intro, ch.win]) if (l.speaker !== 'chef') expect(ch.rivals[l.speaker], `${ch.title} speaker ${l.speaker}`).toBeTruthy();
      if (ch.boss) expect(ch.rivals.some(r => r.boss), `${ch.title} has a boss`).toBe(true);
      expect(i === 0 || CHAPTERS[i].rivals.length >= 1).toBe(true);
    });
  });

  it('rivals never duplicate the kaiju you picked', async () => {
    const { CHAPTERS, chapterRivals } = await import('../src/story/chapters');
    const { SPECIES } = await import('../src/sim/constants');
    for (let pick = 0; pick < SPECIES.length; pick++) for (const ch of CHAPTERS) {
      const rv = chapterRivals(ch, pick).map(r => r.species);
      expect(rv.includes(pick), `${ch.title} with pick ${pick}`).toBe(false);
      expect(new Set(rv).size).toBe(rv.length);
    }
  });

  it('stars and unlocking work', async () => {
    const { starsFor } = await import('../src/story/chapters');
    const { recordResult } = await import('../src/story/save');
    expect([starsFor(0), starsFor(1), starsFor(2), starsFor(5)]).toEqual([3, 2, 1, 1]);
    const s = { unlocked: 1, stars: [] as number[], pick: 0, endingSeen: false, cuts: [] as string[], spicy: [] as number[] };
    expect(recordResult(s, 0, false, 0)).toBe(false); // a loss unlocks nothing
    expect(s.unlocked).toBe(1);
    expect(recordResult(s, 0, true, 2)).toBe(true);
    expect(s.unlocked).toBe(2);
    recordResult(s, 0, true, 1); // a worse replay keeps the best stars
    expect(s.stars[0]).toBe(2);
    recordResult(s, 11, true, 3);
    expect(s.unlocked).toBe(12); // never past the last chapter
  });
});

describe('second helpings campaign', () => {
  it('chapters use real tables, kaiju, speakers and twists', async () => {
    const { SECONDS_CHAPTERS, SECONDS_CUTS } = await import('../src/story/seconds');
    const { CAMPAIGNS } = await import('../src/story/campaigns');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const { SPECIES, MAX_PLAYERS } = await import('../src/sim/constants');
    const { MUTATORS } = await import('../src/sim/mutators');
    expect(SECONDS_CHAPTERS.length).toBe(6);
    expect(SECONDS_CUTS.length).toBe(SECONDS_CHAPTERS.length);
    expect(CAMPAIGNS.seconds.saveKey).not.toBe(CAMPAIGNS.main.saveKey);
    SECONDS_CHAPTERS.forEach((ch, i) => {
      expect(LAYOUTS[ch.table], ch.title).toBeTruthy();
      expect(ch.rivals.length + 1).toBeLessThanOrEqual(MAX_PLAYERS);
      for (const r of ch.rivals) expect(SPECIES[r.species], ch.title).toBeTruthy();
      expect(new Set(ch.rivals.map(r => r.species)).size).toBe(ch.rivals.length);
      for (const l of [...ch.intro, ch.win]) if (l.speaker !== 'chef') expect(ch.rivals[l.speaker], `${ch.title} speaker ${l.speaker}`).toBeTruthy();
      if (ch.boss) expect(ch.rivals.some(r => r.boss)).toBe(true);
      if (ch.mutator) expect(MUTATORS.some(m => m.id === ch.mutator)).toBe(true);
      expect(SECONDS_CUTS[i].heading).toBe(`CHAPTER ${i + 1} · ${ch.title.toUpperCase()}`);
      expect(SECONDS_CUTS[i].caption.length).toBeLessThan(70);
    });
  });

  it('each clip shows exactly that chapter\'s rivals', async () => {
    const { SECONDS_CHAPTERS, SECONDS_CUTS } = await import('../src/story/seconds');
    const fs = await import('node:fs');
    const src = fs.readFileSync('scripts/make-s2-jobs.mjs', 'utf8');
    SECONDS_CHAPTERS.forEach((ch, i) => {
      const m = src.match(new RegExp(`key: '${SECONDS_CUTS[i].key}', cast: \\[([^\\]]*)\\]`));
      expect(m, `${SECONDS_CUTS[i].key} cast`).toBeTruthy();
      expect(m![1].split(',').map(Number).sort((a, b) => a - b), ch.title).toEqual(ch.rivals.map(r => r.species).sort((a, b) => a - b));
    });
  });

  it('keeps its own save, capped at its own chapter count', async () => {
    const { recordResult } = await import('../src/story/save');
    const s = { unlocked: 1, stars: [] as number[], pick: 0, endingSeen: false, cuts: [] as string[], spicy: [] as number[] };
    Object.defineProperty(s, '_n', { value: 6 });
    recordResult(s, 5, true, 3);
    expect(s.unlocked).toBe(6);
  });
});

describe('story unlockables', () => {
  it('locked kaiju and tables appear only once earned', async () => {
    const { owned, UNLOCKS, newlyEarned, isEarned } = await import('../src/story/unlocks');
    const { SPECIES } = await import('../src/sim/constants');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const fresh = { unlocked: 1, stars: [] as number[], pick: 0, endingSeen: false, cuts: [] as string[], spicy: [] as number[] };
    const o = owned(fresh);
    expect(o.kaiju.length).toBe(SPECIES.length - UNLOCKS.filter(u => u.kind === 'kaiju').length);
    expect(o.tables.length).toBe(LAYOUTS.length - UNLOCKS.filter(u => u.kind === 'table').length);
    for (const u of UNLOCKS) expect(u.kind === 'kaiju' ? SPECIES[u.index] : LAYOUTS[u.index]).toBeTruthy();
    for (const i of [12, 13, 14]) expect(LAYOUTS[i].locked).toBe(true);
    const after = { ...fresh, stars: [3, 3, 3, 3] };
    expect(newlyEarned(fresh, after).map(u => u.index)).toEqual([16]); // beat the first boss -> Minturtle
    expect(owned(after).kaiju).toContain(16);
    const all = { ...fresh, stars: Array(12).fill(3) };
    expect(UNLOCKS.every(u => isEarned(u, all))).toBe(true);
    expect(owned(all).kaiju.length).toBe(SPECIES.length);
    expect(owned(all).tables.length).toBe(LAYOUTS.length);
  });

  it('the freezer shelf is slippery: you keep sliding after letting go', () => {
    const slide = (layout: number) => {
      const w = makeWorld(1, 'fork', { layout });
      w.layout = { ...w.layout, obstacles: [] }; // copy: LAYOUTS is shared
      place(w, 0, 300, 360);
      run(w, 0.6, () => [{ ...NO_INPUT, mx: 1 }]);
      const x0 = w.players[0].x;
      run(w, 0.6, () => [NO_INPUT]);
      return w.players[0].x - x0;
    };
    expect(slide(12)).toBeGreaterThan(slide(0) * 3);
  });

  it('gumdrops bounce kaiju away', () => {
    const w = makeWorld(1, 'fork', { layout: 13 });
    place(w, 0, 640 - 36 - P.radius - 30, 382);
    const ev = run(w, 0.8, () => [{ ...NO_INPUT, mx: 1 }]);
    expect(ev.some(e => e.type === 'bumper')).toBe(true);
    expect(w.players[0].x).toBeLessThan(640 - 36);
  });
});

describe('story cutscenes', () => {
  it('one punny cutscene per chapter, headings match the chapter titles', async () => {
    const { CHAPTERS } = await import('../src/story/chapters');
    const { CHAPTER_CUTS, ALL_CUTS } = await import('../src/story/cutscenes');
    expect(CHAPTER_CUTS.length).toBe(CHAPTERS.length);
    CHAPTER_CUTS.forEach((c, i) => {
      expect(c.key).toBe(`cut-${i}`);
      expect(c.heading).toBe(`CHAPTER ${i + 1} · ${CHAPTERS[i].title.toUpperCase()}`);
      expect(c.caption.length).toBeLessThan(70); // fits one caption line
    });
    expect(new Set(ALL_CUTS.map(c => c.key)).size).toBe(ALL_CUTS.length);
    const fs = await import('node:fs');
    for (const c of ALL_CUTS) {
      expect(fs.existsSync(`public/art/${c.key}.webp`), `${c.key} still`).toBe(true);
      if (!c.noVideo) expect(fs.existsSync(`public/video/${c.key}.mp4`), `${c.key} clip`).toBe(true);
    }
  });
});

describe('cutscene casts', () => {
  it('every chapter clip shows exactly that chapter\'s rivals', async () => {
    const { CHAPTERS } = await import('../src/story/chapters');
    const fs = await import('node:fs');
    const src = fs.readFileSync('scripts/make-cut-jobs.mjs', 'utf8');
    CHAPTERS.forEach((ch, i) => {
      const m = src.match(new RegExp(`key: 'cut-${i}', cast: \\[([^\\]]*)\\]`));
      expect(m, `cut-${i} cast`).toBeTruthy();
      const cast = m![1].split(',').map(Number).sort((a, b) => a - b);
      expect(cast, ch.title).toEqual(ch.rivals.map(r => r.species).sort((a, b) => a - b));
    });
  });
});

describe('party modes', () => {
  it('Team Feast: teammates cannot hurt each other, and the last team standing scores together', () => {
    const w = makeWorld(4, 'knife', { mode: 'teams' });
    expect(w.players.map(p => p.team)).toEqual([0, 1, 0, 1]);
    expect(w.friends(0, 2)).toBe(true);
    expect(w.friends(0, 1)).toBe(false);
    place(w, 0, 400, 360); place(w, 2, 520, 360); place(w, 1, 900, 200); place(w, 3, 900, 520);
    w.players[0].aim = 0;
    run(w, 1, t => [tap(1, 0, t)]);
    expect(w.players[2].alive).toBe(true); // the knife flew straight through a teammate
    w.ko(w.players[1], 0, 'swipe');
    w.ko(w.players[3], 0, 'swipe');
    run(w, 0.1);
    expect(w.phase).toBe('roundEnd');
    expect([w.players[0].score, w.players[2].score, w.players[1].score]).toEqual([1, 1, 0]);
  });

  it('Crumb Rush: crumbs are points, knocked-out kaiju come back, most crumbs wins when time runs out', async () => {
    const { MODE_RULES } = await import('../src/sim/modes');
    const w = makeWorld(2, 'fork', { mode: 'crumbRush' });
    w.players[0].pts = 6;
    w.ko(w.players[0], 1, 'swipe');
    expect(w.players[0].pts).toBe(3); // dropped half
    expect(w.crumbs.length).toBeGreaterThanOrEqual(3);
    expect(w.phase).toBe('play'); // no round end on a knockout
    run(w, MODE_RULES.crumbRush.respawnDelay + 0.2);
    expect(w.players[0].alive).toBe(true);
    w.crumbs = [];
    w.players[0].pts = 3; w.players[1].pts = 5;
    w.roundT = MODE_RULES.crumbRush.roundTime;
    run(w, 0.05);
    expect(w.phase).toBe('roundEnd');
    expect(w.winner).toBe(1);
  });

  it('Hot Dumpling: someone always carries it, touching passes it, and it pops on the carrier', () => {
    const w = makeWorld(3, 'fork', { mode: 'hotDumpling', hazards: false });
    run(w, 0.05);
    expect(w.hot).not.toBeNull();
    const first = w.hot!.id, other = (first + 1) % 3;
    w.hot!.cd = 0;
    place(w, first, 500, 360); place(w, other, 530, 360);
    run(w, 0.02);
    expect(w.hot!.id).toBe(other);
    w.hot!.fuse = 0.01;
    run(w, 0.05);
    expect(w.players[other].alive).toBe(false);
  });
});

describe('stats, achievements and settings', () => {
  it('achievements unlock once from stats', async () => {
    const { ACHIEVEMENTS, checkAchievements } = await import('../src/stats');
    expect(new Set(ACHIEVEMENTS.map(a => a.id)).size).toBe(ACHIEVEMENTS.length);
    const s = { matches: 1, wins: 1, roundsWon: 3, kos: 0, crumbs: 0, kaijuForms: 0, pops: 0, streak: 1, bestStreak: 1, gauntlet: 0, cups: 0, blends: 0, twistWins: 0, modeWins: { teams: 1 }, kaijuWins: { 0: 1 }, kaijuPlays: { 0: 1 }, tables: [0], achieved: [] as string[] };
    expect(checkAchievements(s).map(a => a.id).sort()).toEqual(['first-win', 'teams']);
    expect(checkAchievements(s)).toEqual([]); // never twice
  });

  it('every settings row has a default and level settings start on a valid step', async () => {
    const { DEFAULTS, LEVELS, SETTINGS_ROWS } = await import('../src/settings');
    for (const r of SETTINGS_ROWS) {
      expect(DEFAULTS[r.key], r.key).not.toBeUndefined();
      if (r.kind === 'level') expect(LEVELS).toContain(DEFAULTS[r.key]);
    }
  });

  it('every music track is playable note data', async () => {
    const { TRACKS } = await import('../src/music');
    for (const [name, t] of Object.entries(TRACKS)) {
      for (const n of [...t.lead, ...t.bass]) expect(n === '-' || /^[A-G]#?\d$/.test(n), `${name}: ${n}`).toBe(true);
      for (const d of t.drums) expect(['-', 'k', 's', 'h']).toContain(d);
    }
  });
});

describe('condiment power-ups', () => {
  it('spawn on the table, get picked up, and do their thing', async () => {
    const { POWERUPS } = await import('../src/sim/powerups');
    const w = makeWorld(2, 'fork', { powerups: true });
    run(w, POWERUPS.every[1] + 0.5);
    expect(w.items.length).toBeGreaterThan(0);
    const p = w.players[0];
    w.items = [{ id: 999, kind: 'mustard', x: 500, y: 360, t: 0 }];
    place(w, 0, 500, 360);
    run(w, 0.02);
    expect(p.shieldT).toBeGreaterThan(0);
    w.ko(p, 1, 'cutlery');
    expect(p.alive).toBe(true); // the shield took the hit
    expect(p.shieldT).toBe(0);
    w.items = [{ id: 998, kind: 'gravy', x: 500, y: 360, t: 0 }];
    p.meter = 0;
    run(w, 0.02);
    expect(p.meter).toBe(POWERUPS.gravyMeter);
  });

  it('hot sauce makes you faster', () => {
    const dist = (sauce: boolean) => {
      const w = makeWorld(1, 'fork', { powerups: true });
      w.layout = { ...w.layout, obstacles: [] };
      place(w, 0, 300, 360);
      if (sauce) w.players[0].speedT = 5;
      run(w, 0.5, () => [{ ...NO_INPUT, mx: 1 }]);
      return w.players[0].x - 300;
    };
    expect(dist(true)).toBeGreaterThan(dist(false) * 1.25);
  });

  it('online snapshots carry party-mode and power-up state', async () => {
    const { makeSnapshot, applySnapshot } = await import('../src/net/snapshot');
    const host = makeWorld(3, 'fork', { mode: 'hotDumpling', powerups: true });
    run(host, 0.05);
    host.items = [{ id: 5, kind: 'sugar', x: 400, y: 300, t: 1 }];
    host.players[1].pts = 4; host.players[2].shieldT = 3;
    const guest = new World({ players: [0, 1, 2].map(i => ({ name: 'P' + i })), mode: 'hotDumpling' });
    applySnapshot(guest, JSON.parse(JSON.stringify(makeSnapshot(host))));
    expect(guest.items.map(i => i.kind)).toEqual(['sugar']);
    expect(guest.hot?.id).toBe(host.hot?.id);
    expect(guest.players[1].pts).toBe(4);
    expect(guest.players[2].shieldT).toBe(3);
  });
});

describe('gauntlet', () => {
  it('waves get harder: more rivals, then tougher ones, with a boss every 5th', async () => {
    const { waveSetup } = await import('../src/gauntlet');
    const w1 = waveSetup(1), w5 = waveSetup(5), w20 = waveSetup(20);
    expect(w1).toEqual({ rivals: 1, levels: ['easy'], boss: false });
    expect(w5.boss).toBe(true);
    expect(w5.rivals).toBeGreaterThan(w1.rivals);
    expect(w20.rivals).toBe(5);
    expect(w20.levels[0]).toBe('hard');
    for (let n = 1; n < 30; n++) expect(waveSetup(n + 1).rivals).toBeGreaterThanOrEqual(waveSetup(n).rivals);
  });
});

describe('hats', () => {
  it('every hat unlock points at a real achievement and ids are unique', async () => {
    const { HATS } = await import('../src/hats');
    const { ACHIEVEMENTS } = await import('../src/stats');
    expect(new Set(HATS.map(h => h.id)).size).toBe(HATS.length);
    for (const h of HATS) if (h.unlock) expect(ACHIEVEMENTS.some(a => a.id === h.unlock), h.id).toBe(true);
  });
});

describe('practice', () => {
  it('never ends a round and brings knocked-out kaiju back', async () => {
    const { MODE_RULES } = await import('../src/sim/modes');
    const w = makeWorld(2, 'fork', { mode: 'practice' });
    w.ko(w.players[1], 0, 'swipe');
    run(w, 0.2);
    expect(w.phase).toBe('play');
    run(w, MODE_RULES.practice.respawnDelay + 0.2);
    expect(w.players[1].alive).toBe(true);
  });
});

describe('daily challenge', () => {
  it('is the same all day, changes between days, and only uses base kaiju/tables', async () => {
    const { dailySetup } = await import('../src/daily');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const a = dailySetup('2026-11-07'), b = dailySetup('2026-11-07'), c = dailySetup('2026-11-08');
    expect(a).toEqual(b);
    expect(JSON.stringify(a)).not.toEqual(JSON.stringify(c));
    for (let d = 1; d <= 28; d++) {
      const s = dailySetup(`2026-02-${String(d).padStart(2, '0')}`);
      expect(LAYOUTS[s.table].locked).toBeFalsy();
      expect([s.you, ...s.rivals].every(k => k < 16)).toBe(true);
      expect(new Set([s.you, ...s.rivals]).size).toBe(4);
    }
  });
});

describe('rare cutlery', () => {
  it('pizza cutters and rolling pins turn up as table pickups and survive snapshots', async () => {
    const { RARE_KINDS } = await import('../src/sim/cutlery');
    const { makeSnapshot, applySnapshot } = await import('../src/net/snapshot');
    const seen = new Set<string>();
    for (let seed = 1; seed <= 25 && RARE_KINDS.some(k => !seen.has(k)); seed++) {
      const w = new World({ players: [{ name: 'a' }, { name: 'b' }], seed, hazards: false, layout: 0 });
      for (let t = 0; t < 240; t += 1 / 60) {
        w.step(1 / 60, []);
        for (const e of w.drainEvents()) if (e.type === 'spawnCutlery') seen.add(e.kind);
        w.cutlery = w.cutlery.filter(c => c.owner !== null); // clear pickups so more keep spawning
      }
    }
    for (const k of RARE_KINDS) expect(seen.has(k), k).toBe(true);
    const host = makeWorld(2);
    host.newCutlery('rollingpin', 500, 300);
    host.newCutlery('pizzacutter', 600, 300);
    const guest = new World({ players: [{ name: 'a' }, { name: 'b' }] });
    applySnapshot(guest, JSON.parse(JSON.stringify(makeSnapshot(host))));
    expect(guest.cutlery.map(c => c.kind)).toContain('rollingpin');
    expect(guest.cutlery.map(c => c.kind)).toContain('pizzacutter');
  });
});

describe('smoothie bar blender', () => {
  it('rumbles, then pulls kaiju in and blends anyone who reaches the blades', async () => {
    const { RULES } = await import('../src/sim/constants');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const li = LAYOUTS.findIndex(l => l.blender);
    expect(li).toBeGreaterThanOrEqual(0);
    const w = new World({ players: [{ name: 'a' }, { name: 'b' }], seed: 3, layout: li, crumbSpawns: false, pickupSpawns: false });
    while (w.phase !== 'play') w.step(DT, []);
    const z = LAYOUTS[li].blender!;
    place(w, 0, z.x + 200, z.y); place(w, 1, 160, 150);
    w.layout = { ...w.layout, obstacles: [] };
    const ev = run(w, RULES.blenderFirst + RULES.blenderWarn + 0.1);
    expect(ev.some(e => e.type === 'blenderWarn')).toBe(true);
    expect(ev.some(e => e.type === 'blenderSpin')).toBe(true);
    const before = Math.hypot(w.players[0].x - z.x, w.players[0].y - z.y);
    const ev2 = run(w, RULES.blenderSpin - 0.2);
    const ko = ev2.find(e => e.type === 'ko' && e.id === 0);
    expect(ko && ko.type === 'ko' && ko.cause).toBe('blend');
    expect(before).toBeGreaterThan(z.r);
  });
});

describe('keyboard remapping', () => {
  it('binding a key that is already used swaps the two actions', async () => {
    const store: Record<string, string> = {};
    const G = globalThis as Record<string, unknown>;
    G.location ??= { search: '' }; G.window ??= {}; G.navigator ??= { maxTouchPoints: 0 };
    (globalThis as { localStorage?: unknown }).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; } };
    const { bind, keyFor, resetKeybinds } = await import('../src/keybinds');
    resetKeybinds();
    expect(keyFor(0, 'throw')).toBe('Space');
    bind(0, 'throw', 'KeyF'); // F was swipe
    expect(keyFor(0, 'throw')).toBe('KeyF');
    expect(keyFor(0, 'swipe')).toBe('Space');
    bind(1, 'emote', 'KeyQ'); // Q was the left player's emote
    expect(keyFor(1, 'emote')).toBe('KeyQ');
    expect(keyFor(0, 'emote')).toBe('Semicolon');
    resetKeybinds();
    expect(keyFor(0, 'swipe')).toBe('KeyF');
    delete (globalThis as { localStorage?: unknown }).localStorage;
  });
});

describe('dessert course', () => {
  it('every course uses a real table and real kaiju, ending on a boss', async () => {
    const { COURSES } = await import('../src/story/dessert');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const { SPECIES, MAX_PLAYERS } = await import('../src/sim/constants');
    expect(COURSES.length).toBe(4);
    for (const c of COURSES) {
      expect(LAYOUTS[c.table], c.title).toBeTruthy();
      expect(c.rivals.length + 1).toBeLessThanOrEqual(MAX_PLAYERS);
      for (const r of c.rivals) expect(SPECIES[r.species], c.title).toBeTruthy();
      expect(new Set(c.rivals.map(r => r.species)).size).toBe(c.rivals.length);
    }
    expect(COURSES[COURSES.length - 1].rivals.some(r => r.boss)).toBe(true);
  });
});

describe('party cup', () => {
  it('awards points by placing (ties share the better place) and skips modes that need more players', async () => {
    const { placePoints, cupGames, CUP } = await import('../src/cup');
    expect(placePoints([{ score: 2, kos: 5 }, { score: 0, kos: 1 }, { score: 1, kos: 0 }])).toEqual([CUP.points[0], CUP.points[2], CUP.points[1]]);
    expect(placePoints([{ score: 2, kos: 3 }, { score: 2, kos: 3 }])).toEqual([CUP.points[0], CUP.points[0]]);
    expect(cupGames(2).some(g => g.mode === 'hotDumpling')).toBe(false);
    expect(cupGames(4).length).toBe(CUP.games.length);
  });
});

describe('fondue night cheese', () => {
  it('warns, splats (knocking out anyone under it) and leaves a sticky puddle', async () => {
    const { RULES } = await import('../src/sim/constants');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const li = LAYOUTS.findIndex(l => l.hazards.includes('cheese'));
    expect(li).toBeGreaterThanOrEqual(0);
    const w = new World({ players: [{ name: 'a' }, { name: 'b' }], seed: 5, layout: li, crumbSpawns: false, pickupSpawns: false });
    while (w.phase !== 'play') w.step(DT, []);
    place(w, 0, 300, 600); place(w, 1, 1000, 160);
    const ev = run(w, RULES.cheeseFirst + 0.05);
    const warn = ev.find(e => e.type === 'cheeseWarn');
    expect(warn).toBeTruthy();
    const d = w.cheeseDrops[0];
    const target = w.players.find(p => Math.hypot(p.x - d.x, p.y - d.y) < RULES.cheeseAim + 5)!;
    place(w, target.id, d.x, d.y);
    const ev2 = run(w, RULES.cheeseWarn);
    expect(ev2.some(e => e.type === 'cheeseSplat')).toBe(true);
    expect(ev2.some(e => e.type === 'ko' && e.cause === 'cheese' && e.id === target.id)).toBe(true);
    expect(w.puddles.length).toBeGreaterThan(0);
    expect(w.onSticky(d.x, d.y)).toBe(true);
  });
});

describe('mutators', () => {
  it('frenzy fills bellies, snack triples crumbs, boomerang brings every throw back, ice is slippery', () => {
    const fr = makeWorld(2, 'fork', { mutator: 'frenzy' });
    expect(fr.players.every(p => p.meter === 100)).toBe(true);
    const sn = makeWorld(1, 'fork', { mutator: 'snack' });
    sn.crumbs = [{ id: 77, x: sn.players[0].x, y: sn.players[0].y, variant: 0 }];
    run(sn, 0.02);
    expect(sn.players[0].meter).toBe(3 * P.crumbValue);
    const bo = makeWorld(2, 'fork', { mutator: 'boomerang' });
    place(bo, 0, 400, 360); place(bo, 1, 1100, 160);
    bo.layout = { ...bo.layout, obstacles: [] };
    const ev = run(bo, 2.5, t => [tap(1, 0, t)]);
    expect(ev.some(e => e.type === 'catch' && e.id === 0)).toBe(true);
    const slide = (mutator: 'ice' | 'none') => {
      const w = makeWorld(1, 'fork', { mutator });
      w.layout = { ...w.layout, obstacles: [] };
      place(w, 0, 300, 360);
      run(w, 0.6, () => [{ ...NO_INPUT, mx: 1 }]);
      const x0 = w.players[0].x;
      run(w, 0.6, () => [NO_INPUT]);
      return w.players[0].x - x0;
    };
    expect(slide('ice')).toBeGreaterThan(slide('none') * 3);
  });
});

describe('quick tips', () => {
  it('only shows tips that fit the mode and the table', async () => {
    const { randomTip, TIPS } = await import('../src/tips');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const sushi = LAYOUTS.find(l => l.name === 'Sushi Bar')!;
    const modeOnly = TIPS.filter(t => t.mode).map(t => t.text), tableOnly = TIPS.filter(t => t.table).map(t => t.text);
    for (let i = 0; i < 200; i++) {
      const tip = randomTip('classic', sushi);
      expect(modeOnly).not.toContain(tip);
      expect(tableOnly.filter(t => !t.includes('giant hand'))).not.toContain(tip);
    }
    const blender = LAYOUTS.find(l => l.blender)!;
    const seen = new Set(Array.from({ length: 200 }, () => randomTip('classic', blender)));
    expect([...seen].some(t => t.includes('blender'))).toBe(true);
  });
});

describe('kaiju voices', () => {
  it('every kaiju has its own voice', async () => {
    const { VOICES } = await import('../src/audio');
    const { SPECIES } = await import('../src/sim/constants');
    expect(VOICES.length).toBeGreaterThanOrEqual(SPECIES.length);
    expect(new Set(VOICES.slice(0, SPECIES.length).map(v => `${v.pitch}/${v.wave}`)).size).toBe(SPECIES.length);
  });
});

describe('pancake stack spatula', () => {
  it('marks a square, then flips (knocks out) whoever is in it', async () => {
    const { RULES } = await import('../src/sim/constants');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const li = LAYOUTS.findIndex(l => l.hazards.includes('spatula'));
    expect(li).toBeGreaterThanOrEqual(0);
    const w = new World({ players: [{ name: 'a' }, { name: 'b' }], seed: 9, layout: li, crumbSpawns: false, pickupSpawns: false });
    while (w.phase !== 'play') w.step(DT, []);
    const ev = run(w, RULES.spatulaFirst + 0.05);
    expect(ev.some(e => e.type === 'spatulaWarn')).toBe(true);
    const sp = w.spatula!;
    place(w, 0, sp.x, sp.y);
    place(w, 1, sp.x + RULES.spatulaSize, sp.y + RULES.spatulaSize > 640 ? sp.y - RULES.spatulaSize : sp.y + RULES.spatulaSize);
    const ev2 = run(w, RULES.spatulaWarn);
    expect(ev2.some(e => e.type === 'ko' && e.id === 0 && e.cause === 'flip')).toBe(true);
    expect(w.players[1].alive).toBe(true);
  });
});

describe('save backup', () => {
  it('exports every kk- key into one code and imports it back', async () => {
    const store: Record<string, string> = {};
    const ls = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; }, key: (i: number) => Object.keys(store)[i] ?? null, get length() { return Object.keys(store).length; } };
    const G = globalThis as Record<string, unknown>;
    G.localStorage = new Proxy(ls, { ownKeys: () => Object.keys(store), getOwnPropertyDescriptor: (_t, k) => (k in store ? { enumerable: true, configurable: true, value: store[k as string] } : Object.getOwnPropertyDescriptor(ls, k)) });
    G.btoa ??= (s: string) => Buffer.from(s, 'binary').toString('base64');
    G.atob ??= (s: string) => Buffer.from(s, 'base64').toString('binary');
    const { exportSave, importSave } = await import('../src/backup');
    store['kk-story-v1'] = JSON.stringify({ unlocked: 5, stars: [3, 3, 2, 1] });
    store['kk-hat'] = 'chef';
    store['other-app'] = 'x';
    const code = exportSave();
    expect(code.startsWith('KK1-')).toBe(true);
    for (const k of Object.keys(store)) delete store[k];
    expect(importSave(code)).toBe(2);
    expect(store['kk-hat']).toBe('chef');
    expect(JSON.parse(store['kk-story-v1']).unlocked).toBe(5);
    expect(store['other-app']).toBeUndefined();
    expect(importSave('nonsense')).toBe(0);
    delete G.localStorage;
  });
});

describe('table workshop', () => {
  it('custom tables are appended after the built-in ones and never used by the Daily', async () => {
    const store: Record<string, string> = {};
    (globalThis as Record<string, unknown>).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; } };
    const { saveCustom, BASE_COUNT, loadCustom, applyCustomTables } = await import('../src/custom');
    const { LAYOUTS } = await import('../src/sim/layouts');
    const { dailySetup } = await import('../src/daily');
    saveCustom([{ name: 'Test Table', surface: 0, hazard: 'wind', props: [{ style: 'gumdrop', x: 640, y: 382, r: 32 }] }]);
    expect(LAYOUTS.length).toBe(BASE_COUNT + 1);
    expect(LAYOUTS[BASE_COUNT].custom).toBe(true);
    expect(LAYOUTS[BASE_COUNT].spawns.length).toBe(6);
    const w = new World({ players: [{ name: 'a' }, { name: 'b' }], layout: BASE_COUNT, hazards: true });
    expect(w.layout.name).toBe('Test Table');
    for (let d = 1; d <= 28; d++) expect(LAYOUTS[dailySetup(`2026-03-${String(d).padStart(2, '0')}`).table].custom).toBeFalsy();
    saveCustom([]);
    expect(loadCustom().length).toBe(0);
    applyCustomTables();
    expect(LAYOUTS.length).toBe(BASE_COUNT);
    delete (globalThis as Record<string, unknown>).localStorage;
  });
});

describe('more twists', () => {
  it('fists only: no cutlery anywhere; tiny: smaller kaiju; bouncy: knocked into the edge you bounce back', () => {
    const fi = makeWorld(3, 'fork', { mutator: 'fists', pickupSpawns: true });
    expect(fi.cutlery.length).toBe(0);
    run(fi, 30);
    expect(fi.cutlery.length).toBe(0);
    const ti = makeWorld(2, 'fork', { mutator: 'tiny' });
    run(ti, 0.5);
    expect(ti.players[0].r).toBeLessThan(P.radius * 0.8);
    const bo = makeWorld(2, 'fork', { mutator: 'bouncy' });
    place(bo, 0, TABLE.x + 40, 380);
    bo.players[0].kx = -2000;
    run(bo, 0.5);
    expect(bo.players[0].alive).toBe(true);
    expect(bo.players[0].x).toBeGreaterThan(TABLE.x);
    const nb = makeWorld(2, 'fork');
    place(nb, 0, TABLE.x + 40, 380);
    nb.players[0].kx = -2000;
    run(nb, 0.5);
    expect(nb.players[0].alive).toBe(false); // without the twist that shove is a fall
  });
});
