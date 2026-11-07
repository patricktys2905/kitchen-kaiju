// Instant replay: keeps the last few seconds of the match as compact snapshots, then plays the moment
// of the final knockout back in slow motion. EASY TO CUSTOMISE: the numbers below (REPLAY.enabled = false turns it off).
import { makeSnapshot, type Snapshot } from './net/snapshot';
import type { World } from './sim/world';

export const REPLAY = {
  enabled: true,
  keep: 2.4, // seconds of history kept
  before: 1.6, // seconds before the final knockout to start from
  after: 0.5, // seconds after it
  speed: 0.4, // playback speed (0.4 = slow motion)
  every: 1 / 30, // seconds between recorded frames
  minPlayers: 2,
};

export class ReplayBuffer {
  private frames: { t: number; s: Snapshot }[] = [];
  private acc = 0;
  private t = 0;
  lastKoT = -1;

  record(w: World, dt: number): void {
    this.t += dt;
    this.acc += dt;
    if (this.acc < REPLAY.every) return;
    this.acc = 0;
    this.frames.push({ t: this.t, s: makeSnapshot(w) });
    while (this.frames.length && this.frames[0].t < this.t - REPLAY.keep - REPLAY.after) this.frames.shift();
  }

  markKo(): void {
    this.lastKoT = this.t;
  }

  /** Frames around the last knockout (oldest first), or [] if there's nothing worth showing. */
  clip(): { t: number; s: Snapshot }[] {
    if (this.lastKoT < 0) return [];
    const from = this.lastKoT - REPLAY.before, to = this.lastKoT + REPLAY.after;
    const out = this.frames.filter(f => f.t >= from && f.t <= to);
    return out.length > 6 ? out : [];
  }

  reset(): void {
    this.frames = [];
    this.lastKoT = -1;
  }
}
