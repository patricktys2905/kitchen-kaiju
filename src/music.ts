// Background music, synthesised live (no audio files). EASY TO CUSTOMISE: edit TRACKS below.
// Each track is a tempo plus looping patterns written as note names ('C4', 'G#3') or '-' for a rest,
// one entry per 8th note. Bass, lead and drums ('k' kick, 's' snare, 'h' hat) loop independently.
import { getSettings, onSettings } from './settings';

export interface Track {
  bpm: number;
  lead: string[];
  bass: string[];
  drums: string[];
  leadWave?: OscillatorType;
}

const r = (s: string) => s.trim().split(/\s+/);

export const TRACKS: Record<string, Track> = {
  // Title / menus: a cheeky dinner-party waltz-ish bounce.
  menu: {
    bpm: 112,
    lead: r('E5 - G5 - C6 - G5 - A5 - G5 E5 -  D5 - E5 - G5 - - -   E5 - G5 - C6 - B5 - A5 - G5 - E5 -  D5 E5 D5 C5 - - - -'),
    bass: r('C3 - - - G2 - - -  A2 - - - E2 - - -  F2 - - - C3 - - -  G2 - - - G2 - - -'),
    drums: r('k - h - s - h -  k - h - s - h h'),
    leadWave: 'triangle',
  },
  // In a match: faster and punchier.
  battle: {
    bpm: 148,
    lead: r('A4 - C5 - E5 - C5 -  D5 - F5 - A5 - F5 -  E5 - G#5 - B5 - G#5 -  A5 - E5 - C5 - - -'),
    bass: r('A2 - A2 - A2 - A2 -  D3 - D3 - D3 - D3 -  E3 - E3 - E3 - E3 -  A2 - A2 - E2 - E2 -'),
    drums: r('k - h k s - h -  k - h k s - h s'),
    leadWave: 'square',
  },
  // Story map: gentle and curious.
  story: {
    bpm: 96,
    lead: r('C5 - E5 - G5 - - -  A5 - G5 - E5 - - -  F5 - E5 - D5 - - -  G4 - - - - - - -'),
    bass: r('C3 - - - - - - -  A2 - - - - - - -  F2 - - - - - - -  G2 - - - - - - -'),
    drums: r('k - - - h - - -  s - - - h - - -'),
    leadWave: 'sine',
  },
};

let ac: AudioContext | null = null;
let out: GainNode | null = null;
let current: string | null = null;
let step = 0;
let nextT = 0;
let timer: ReturnType<typeof setInterval> | null = null;
let noise: AudioBuffer | null = null;

const freq = (n: string): number => {
  const m = /^([A-G])(#?)(\d)$/.exec(n);
  if (!m) return 0;
  const semis = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[m[1] as 'C'] + (m[2] ? 1 : 0) + (Number(m[3]) + 1) * 12;
  return 440 * 2 ** ((semis - 69) / 12);
};

/** Called once audio is unlocked (needs the shared AudioContext). */
export function initMusic(ctx: AudioContext): void {
  if (ac) return;
  ac = ctx;
  out = ac.createGain();
  out.gain.value = getSettings().music * 0.5;
  out.connect(ac.destination);
  noise = ac.createBuffer(1, ac.sampleRate * 0.3, ac.sampleRate);
  const ch = noise.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  onSettings(s => { if (out && ac) out.gain.setTargetAtTime(s.music * 0.5, ac.currentTime, 0.1); });
  if (current) start();
}

/** Switch to a track by name ('menu', 'battle', 'story'), or null for silence. */
export function playMusic(name: string | null): void {
  if (name === current) return;
  current = name;
  if (ac) start();
}

function start(): void {
  if (timer) clearInterval(timer);
  timer = null;
  if (!ac || !current || !TRACKS[current]) return;
  step = 0;
  nextT = ac.currentTime + 0.1;
  timer = setInterval(schedule, 40);
}

function note(f: number, t: number, dur: number, type: OscillatorType, vol: number): void {
  if (!ac || !out || !f) return;
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type;
  o.frequency.value = f;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function drum(kind: string, t: number): void {
  if (!ac || !out || !noise) return;
  if (kind === 'k') {
    const o = ac.createOscillator(), g = ac.createGain();
    o.frequency.setValueAtTime(120, t);
    o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.15);
    o.connect(g).connect(out);
    o.start(t); o.stop(t + 0.16);
    return;
  }
  const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
  s.buffer = noise;
  f.type = kind === 'h' ? 'highpass' : 'bandpass';
  f.frequency.value = kind === 'h' ? 7000 : 1800;
  g.gain.setValueAtTime(kind === 'h' ? 0.08 : 0.22, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + (kind === 'h' ? 0.04 : 0.12));
  s.connect(f).connect(g).connect(out);
  s.start(t); s.stop(t + 0.15);
}

function schedule(): void {
  if (!ac || !current) return;
  const tr = TRACKS[current];
  const eighth = 60 / tr.bpm / 2;
  // keep scheduling a little ahead of the clock; skip ahead if the tab was asleep
  if (nextT < ac.currentTime - 0.5) nextT = ac.currentTime + 0.05;
  if (getSettings().music <= 0) { nextT = ac.currentTime + 0.1; return; }
  while (nextT < ac.currentTime + 0.25) {
    const l = tr.lead[step % tr.lead.length], b = tr.bass[step % tr.bass.length], d = tr.drums[step % tr.drums.length];
    if (l && l !== '-') note(freq(l), nextT, eighth * 1.6, tr.leadWave ?? 'square', 0.07);
    if (b && b !== '-') note(freq(b), nextT, eighth * 1.8, 'triangle', 0.16);
    if (d && d !== '-') drum(d, nextT);
    nextT += eighth;
    step++;
  }
}
