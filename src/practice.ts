// Practice checklist. EASY TO CUSTOMISE: reorder/reword steps, or add one with a `done` test on game events.
import type { GameEvent } from './sim/world';

export interface PracticeStep {
  text: string; // what to do
  keys: string; // how (keyboard · pad · touch)
  done: (e: GameEvent, moved: number) => boolean; // `moved` = how far you have walked (px)
}

export const PRACTICE_STEPS: PracticeStep[] = [
  { text: 'Walk around the table', keys: 'WASD / stick / drag left side', done: (_e, moved) => moved > 250 },
  { text: 'THROW your cutlery', keys: 'hold & let go: SPACE / A / THROW', done: e => e.type === 'throw' && e.id === 0 },
  { text: 'Pick your cutlery back up', keys: 'walk over it', done: e => e.type === 'pickup' && e.id === 0 },
  { text: 'Knock out the dummy', keys: 'hit it with a throw or a swipe', done: e => e.type === 'ko' && e.by === 0 },
  { text: 'SWIPE up close', keys: 'F / X / SWIPE', done: e => e.type === 'swipe' && e.id === 0 },
  { text: 'DASH', keys: 'L-SHIFT / B / DASH', done: e => e.type === 'dash' && e.id === 0 },
  { text: 'Eat crumbs until your belly is full', keys: 'walk over crumbs', done: e => e.type === 'meterFull' && e.id === 0 },
  { text: 'STOMP to go KAIJU and squash the dummy', keys: 'E / Y / STOMP', done: e => e.type === 'kaiju' && e.id === 0 },
];

/** Practice setup: you vs one dummy that never moves or fights back. */
export const PRACTICE = { dummySpecies: 6, table: 0, hazards: false, powerups: false };
