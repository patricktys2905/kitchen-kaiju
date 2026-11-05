// Tiny synth SFX: no audio files needed for the shapes-first build.
let ac: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuf: AudioBuffer | null = null;

export function unlockAudio(): void {
  if (ac) {
    if (ac.state === 'suspended') void ac.resume();
    return;
  }
  try {
    ac = new AudioContext();
    master = ac.createGain();
    master.gain.value = 0.7;
    master.connect(ac.destination);
    const n = ac.sampleRate;
    noiseBuf = ac.createBuffer(1, n, ac.sampleRate);
    const ch = noiseBuf.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = Math.random() * 2 - 1;
  } catch {
    ac = null;
  }
}

function tone(freq: number, dur: number, type: OscillatorType = 'square', vol = 0.06, slide = 0, delay = 0): void {
  if (!ac || !master) return;
  const t = ac.currentTime + delay;
  const o = ac.createOscillator(), g = ac.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, t);
  if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, freq + slide), t + dur);
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + dur + 0.02);
}

function noise(dur: number, vol = 0.15, filter = 2000, delay = 0): void {
  if (!ac || !master || !noiseBuf) return;
  const t = ac.currentTime + delay;
  const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter();
  s.buffer = noiseBuf;
  f.type = 'lowpass';
  f.frequency.value = filter;
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  s.connect(f).connect(g).connect(master);
  s.start(t, Math.random() * 0.5);
  s.stop(t + dur + 0.02);
}

export const sfx = {
  join: (i: number) => tone(440 + i * 110, 0.12, 'triangle', 0.07),
  leave: () => tone(300, 0.1, 'triangle', 0.05, -120),
  throw: () => { noise(0.12, 0.08, 3500); tone(500, 0.1, 'triangle', 0.04, 400); },
  clink: () => { tone(2400, 0.06, 'square', 0.03); tone(3600, 0.08, 'sine', 0.03); },
  thwock: () => { tone(180, 0.09, 'square', 0.06, -80); noise(0.05, 0.08, 1200); },
  pickup: () => { tone(880, 0.06, 'triangle', 0.05); tone(1320, 0.08, 'triangle', 0.05, 0, 0.05); },
  steal: () => { tone(660, 0.06, 'square', 0.04); tone(990, 0.06, 'square', 0.04, 0, 0.06); tone(1320, 0.1, 'square', 0.04, 0, 0.12); },
  catch: () => { tone(1200, 0.05, 'square', 0.05); tone(1800, 0.12, 'triangle', 0.06, 0, 0.04); },
  swipe: () => noise(0.1, 0.1, 5000),
  dash: () => { noise(0.14, 0.06, 1800); tone(220, 0.1, 'sine', 0.04, 260); },
  bump: () => { tone(120, 0.12, 'sine', 0.1, -40); noise(0.08, 0.1, 800); },
  boing: () => { tone(260, 0.18, 'sine', 0.09, 520); tone(520, 0.12, 'triangle', 0.04, 300); },
  eat: () => tone(300 + Math.random() * 200, 0.04, 'square', 0.025),
  meterFull: () => { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.12, 'triangle', 0.05, 0, i * 0.06)); },
  kaiju: () => { tone(90, 0.7, 'sawtooth', 0.12, 120); tone(60, 0.8, 'square', 0.06, 40); noise(0.5, 0.12, 600); },
  stomp: () => { tone(55, 0.25, 'sine', 0.18, -20); noise(0.18, 0.12, 400); },
  shrink: () => tone(500, 0.3, 'sine', 0.06, -380),
  ko: () => { noise(0.35, 0.16, 2500); tone(700, 0.3, 'square', 0.05, -550); },
  fall: () => tone(800, 0.6, 'sine', 0.07, -700),
  handWarn: () => { tone(220, 0.15, 'square', 0.06); tone(220, 0.15, 'square', 0.06, 0, 0.3); tone(220, 0.15, 'square', 0.06, 0, 0.6); },
  handSweep: () => noise(0.5, 0.18, 900),
  spawn: () => tone(700, 0.08, 'sine', 0.04, 300),
  windWarn: () => { noise(0.9, 0.06, 500); tone(180, 0.6, 'sine', 0.04, 120); },
  windGust: () => { noise(1.4, 0.2, 700); noise(1.2, 0.08, 2500, 0.1); },
  toasterWarn: () => { tone(500, 0.08, 'square', 0.04); tone(500, 0.08, 'square', 0.04, 0, 0.3); tone(500, 0.08, 'square', 0.04, 0, 0.6); tone(800, 0.1, 'square', 0.05, 0, 0.95); },
  toasterPop: () => { tone(900, 0.06, 'square', 0.06); tone(400, 0.15, 'triangle', 0.08, 500); noise(0.1, 0.1, 3000); },
  burnerWarn: () => { tone(260, 1.2, 'sawtooth', 0.03, 160); noise(1.2, 0.04, 900); },
  burnerFlare: () => { noise(0.7, 0.22, 1800); tone(110, 0.5, 'sawtooth', 0.08, -40); },
  cleaverWarn: () => { tone(900, 0.06, 'square', 0.05); tone(900, 0.06, 'square', 0.05, 0, 0.35); tone(1200, 0.08, 'square', 0.05, 0, 0.7); },
  cleaverChop: () => { tone(70, 0.35, 'square', 0.16, -40); noise(0.3, 0.2, 1500); tone(2400, 0.2, 'sine', 0.04, -1800); },
  count: () => tone(440, 0.12, 'square', 0.05),
  go: () => { tone(880, 0.25, 'square', 0.06); tone(1320, 0.25, 'triangle', 0.04); },
  roundWin: () => { [660, 880, 990].forEach((f, i) => tone(f, 0.18, 'triangle', 0.07, 0, i * 0.12)); },
  matchWin: () => { [523, 659, 784, 1046, 784, 1046].forEach((f, i) => tone(f, 0.2, 'triangle', 0.07, 0, i * 0.13)); },
};
