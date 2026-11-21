import { describe, expect, it } from 'vitest';
import { buy, DUNGEON, enterRoom, finishFight, makeFloor, newRun, openRooms, relicFx, takeRelic } from '../src/dungeon';

describe('🗝 Dinner Dungeon', () => {
  it('every floor map ends at one boss and every room can be reached', () => {
    for (let seed = 1; seed < 40; seed++) for (let f = 0; f < 3; f++) {
      const rooms = makeFloor(seed, f);
      const last = rooms.filter(r => r.col === DUNGEON.cols - 1);
      expect(last.map(r => r.kind)).toEqual(['boss']);
      for (const r of rooms) {
        if (r.col > 0) expect(rooms.some(x => x.next.includes(r.id))).toBe(true);
        if (r.col < DUNGEON.cols - 1) expect(r.next.length).toBeGreaterThan(0);
      }
      expect(rooms.some(r => r.kind === 'treasure')).toBe(true);
    }
  });

  it('winning rooms pays coins and moves you along; losing all lives ends the run', () => {
    const run = newRun(0, 123);
    const first = openRooms(run)[0];
    finishFight(run, first.id, true, 2);
    expect(run.at).toBe(first.id);
    expect(run.coins).toBe(DUNGEON.coins.fight + 2 * DUNGEON.coins.ko);
    expect(openRooms(run).every(r => r.col === 1)).toBe(true);
    for (let i = 0; i < DUNGEON.lives; i++) finishFight(run, openRooms(run)[0].id, false, 0);
    expect(run.over).toBe('lost');
  });

  it('beating a boss moves to the next floor, and the third boss wins the run', () => {
    const run = newRun(0, 9);
    for (let f = 0; f < 3; f++) {
      const boss = run.rooms.find(r => r.kind === 'boss')!;
      finishFight(run, boss.id, true, 0);
    }
    expect(run.over).toBe('won');
  });

  it('relics stack and the shop sells them', () => {
    const run = newRun(0, 5);
    takeRelic(run, 'boots'); takeRelic(run, 'arm');
    expect(relicFx([...run.relics, 'boots']).speed).toBeCloseTo(1.12 * 1.12);
    const shop = run.rooms.find(r => r.kind === 'shop') ?? run.rooms[1];
    enterRoom(run, shop.id);
    if (!run.shop) run.shop = { offers: ['soda'], bought: [], healed: false };
    run.coins = 100;
    const id = run.shop.offers[0];
    expect(buy(run, id)).toBe(true);
    expect(run.relics).toContain(id);
    expect(run.coins).toBe(100 - DUNGEON.prices.relic);
    expect(buy(run, id)).toBe(false); // only once
  });
});
