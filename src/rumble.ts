// Rumble: gamepad vibration + phone vibration on big moments. EASY TO CUSTOMISE: strengths and lengths below.
import type { Slot } from './input';
import { getSettings } from './settings';

/** [strength 0..1, milliseconds] per kind of moment. */
export const RUMBLE = {
  ko: [0.9, 220], // you got knocked out
  hit: [0.5, 120], // you knocked someone out
  kaiju: [0.7, 350], // you went KAIJU
  blast: [0.6, 260], // big hazard nearby (cleaver, spatula, blender, cheese…)
} as const;

type Pad = Gamepad & { vibrationActuator?: { playEffect?: (t: string, p: object) => Promise<unknown> } };

/** Vibrates one player's device (gamepad, or the phone for touch / online players on this device). */
export function rumble(slot: Slot | undefined, kind: keyof typeof RUMBLE): void {
  if (!slot || !getSettings().rumble) return;
  const [strength, ms] = RUMBLE[kind];
  if (slot.kind === 'pad') {
    const pad = navigator.getGamepads?.()[slot.index] as Pad | null;
    pad?.vibrationActuator?.playEffect?.('dual-rumble', { duration: ms, strongMagnitude: strength, weakMagnitude: strength * 0.6 }).catch(() => {});
  } else if ((slot.kind === 'touch' || slot.kind === 'local') && 'vibrate' in navigator) {
    try { navigator.vibrate(Math.round(ms * strength)); } catch { /* not allowed */ }
  }
}
