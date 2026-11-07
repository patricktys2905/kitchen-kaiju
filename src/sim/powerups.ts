// Condiment power-ups that appear on the table. EASY TO CUSTOMISE: names, colours, durations and
// spawn rate below; set a kind's `enabled: false` to remove it, or POWERUPS.enabled = false to turn them all off by default.

export type PowerKind = 'hotsauce' | 'mustard' | 'gravy' | 'sugar';

export interface PowerDef {
  name: string;
  short: string; // HUD tag
  desc: string;
  color: number;
  css: string;
  enabled: boolean;
}

export const POWER_DEFS: Record<PowerKind, PowerDef> = {
  hotsauce: { name: 'HOT SAUCE', short: '🌶️', desc: 'Run much faster for a few seconds', color: 0xe8281e, css: '#ff6a4a', enabled: true },
  mustard: { name: 'MUSTARD SHIELD', short: '🛡️', desc: 'Blocks the next hit (not falls or the giant hand)', color: 0xf2c418, css: '#ffd24a', enabled: true },
  gravy: { name: 'GRAVY BOAT', short: '🍲', desc: 'Fills your belly halfway towards KAIJU', color: 0x8a5a2e, css: '#e0a060', enabled: true },
  sugar: { name: 'SUGAR RUSH', short: '🍬', desc: 'Dash and swipe with almost no cooldown', color: 0xf6f0ff, css: '#ffffff', enabled: true },
};

export const POWERUPS = {
  enabled: true, // default for Free Play (Story never has them)
  every: [9, 15] as [number, number], // seconds between spawns (random in range)
  max: 2, // at most this many on the table at once
  lifetime: 12, // seconds before an untouched one fizzles away
  hotsauceTime: 6,
  hotsauceSpeed: 1.4,
  mustardTime: 12, // the shield lasts this long if nothing hits you
  gravyMeter: 50, // belly % added
  sugarTime: 6,
  sugarCooldown: 0.12, // dash/swipe cooldown cap while sugared
};

export const enabledPowers = (): PowerKind[] => (Object.keys(POWER_DEFS) as PowerKind[]).filter(k => POWER_DEFS[k].enabled);
