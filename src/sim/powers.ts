// 🌟 Kaiju powers: every kaiju plays the same normally, but in KAIJU form the THROW or SWIPE button fires its own
// signature power (on a cooldown), and each has one small everyday trait.
// EASY TO CUSTOMISE: tweak the numbers below; set KAIJU_POWERS.enabled = false (or the in-game switch) for Classic rules.

export const KAIJU_POWERS = {
  enabled: true,
  cooldown: 1.6, // default seconds between power uses (a KAIJU lasts 5 s, so about 3 uses)
};

/** What a power does. All forces are knockback speeds; stun freezes a rival in place for that many seconds. */
export type PowerSpec =
  | { kind: 'burst'; r: number; force: number; stun?: number; deflect?: boolean } // ring around the kaiju
  | { kind: 'cone'; range: number; arc: number; force: number; stun?: number; deflect?: boolean } // in front, along the aim
  | { kind: 'zone'; zone: 'sticky' | 'slick'; r: number; t: number; ahead: number } // puddle (ahead = how far in front; 0 = underfoot)
  | { kind: 'charge'; speed: number; t: number; trail?: 'sticky' | 'slick' } // a fast slide that squashes whoever it hits
  | { kind: 'blink'; dist: number; landR?: number; landForce?: number } // hop forward (optional shove on landing)
  | { kind: 'shot'; speed: number; r: number; force: number; stun?: number; range: number; back?: boolean } // projectile (back = boomerang)
  | { kind: 'mines'; n: number; r: number; force: number; t: number }; // drop mines that pop when a rival steps on them

/** Small everyday trait: multipliers (1 = normal). weight < 1 = harder to shove; > 1 = easier. */
export interface Trait {
  speed?: number;
  weight?: number;
  dashCD?: number;
  dashSpeed?: number;
  throwSpeed?: number;
  reach?: number; // extra swipe reach in pixels
  grip?: number; // grip on slippery surfaces (higher = less sliding)
}

export interface KaijuKit {
  power: string; // power name
  blurb: string; // what the power does, for menus
  trait: string; // what the trait does, for menus
  cd?: number; // cooldown override
  spec: PowerSpec;
  mods: Trait;
}

/** One per species, same order as SPECIES. */
export const KITS: KaijuKit[] = [
  /* 0 Gobzilla Jr. */ { power: 'Seed Spray', blurb: 'Spits strawberry seeds that shove rivals in front', trait: 'Balanced all-rounder', spec: { kind: 'cone', range: 230, arc: 0.55, force: 560 }, mods: {} },
  /* 1 Squidgeon */ { power: 'Ink Cloud', blurb: 'Squirts a sticky ink puddle ahead that slows rivals', trait: 'Longer swipe reach', spec: { kind: 'zone', zone: 'sticky', r: 95, t: 4, ahead: 120 }, mods: { reach: 8 } },
  /* 2 Crabbage */ { power: 'Claw Snap', blurb: 'A short, very strong snap that also bats away cutlery', trait: 'Quick on its feet', cd: 1.2, spec: { kind: 'cone', range: 140, arc: 0.8, force: 950, deflect: true }, mods: { speed: 1.05 } },
  /* 3 Bloblin */ { power: 'Wobble Wave', blurb: 'A jiggly ring that knocks everyone back and dazes them', trait: 'Hard to shove', spec: { kind: 'burst', r: 175, force: 440, stun: 0.6 }, mods: { weight: 0.88, speed: 0.97 } },
  /* 4 Mothball */ { power: 'Flutter', blurb: 'Flutters a long way forward in an instant', trait: 'Light and quick, but easy to shove', cd: 1.2, spec: { kind: 'blink', dist: 230 }, mods: { speed: 1.05, weight: 1.06 } },
  /* 5 Toastbat */ { power: 'Pop-Up', blurb: 'Pops forward like toast and lands with a shove', trait: 'Shorter dash cooldown', spec: { kind: 'blink', dist: 170, landR: 120, landForce: 500 }, mods: { dashCD: 0.88 } },
  /* 6 Dumplord */ { power: 'Steam Burst', blurb: 'A big blast of steam that pushes everyone away', trait: 'Heavy: hard to shove', spec: { kind: 'burst', r: 235, force: 640 }, mods: { weight: 0.85, speed: 0.96 } },
  /* 7 Norigon */ { power: 'Sushi Roll', blurb: 'Rolls forward at speed, flattening anyone in the way', trait: 'Faster dash', spec: { kind: 'charge', speed: 900, t: 0.45 }, mods: { dashSpeed: 1.12 } },
  /* 8 Chocomunch */ { power: 'Choc Melt', blurb: 'Melts into a big sticky puddle around itself', trait: 'Heaviest, but slow', spec: { kind: 'zone', zone: 'sticky', r: 135, t: 5, ahead: 0 }, mods: { weight: 0.8, speed: 0.93 } },
  /* 9 Bubblegumbo */ { power: 'Gum Bubble', blurb: 'Blows a gum bubble that traps the first rival it hits', trait: 'Longer swipe reach', spec: { kind: 'shot', speed: 520, r: 26, force: 200, stun: 1.5, range: 520 }, mods: { reach: 10 } },
  /* 10 Bluebeary */ { power: 'Berry Mines', blurb: 'Drops four blueberry mines that pop when rivals step on them', trait: 'Shorter dash cooldown', spec: { kind: 'mines', n: 4, r: 36, force: 820, t: 8 }, mods: { dashCD: 0.88 } },
  /* 11 Pizzaraptor */ { power: 'Slice Toss', blurb: 'Flings a pizza slice that curves back like a boomerang', trait: 'Stronger throws', spec: { kind: 'shot', speed: 640, r: 30, force: 720, range: 380, back: true }, mods: { throwSpeed: 1.1 } },
  /* 12 Sloba */ { power: 'Pearl Spill', blurb: 'Spills slippery tapioca pearls all around', trait: 'Slow but hard to shove', spec: { kind: 'zone', zone: 'slick', r: 150, t: 5, ahead: 0 }, mods: { speed: 0.94, weight: 0.88 } },
  /* 13 Avocadrake */ { power: 'Stone Toss', blurb: 'Hurls its avocado stone: a hard, straight shove', trait: 'A little heavier', spec: { kind: 'shot', speed: 760, r: 24, force: 980, range: 560 }, mods: { weight: 0.92 } },
  /* 14 Salmonster */ { power: 'Upstream', blurb: 'Surges forward, leaving a slippery trail behind', trait: 'Great grip on slippery tables', spec: { kind: 'charge', speed: 820, t: 0.5, trail: 'slick' }, mods: { grip: 2.2 } },
  /* 15 Hotchog */ { power: 'Spike Out', blurb: 'Fires its spikes in every direction, dazing rivals', trait: 'Swipes reach a bit further', spec: { kind: 'burst', r: 160, force: 520, stun: 0.8 }, mods: { reach: 6 } },
  /* 16 Minturtle */ { power: 'Shell Spin', blurb: 'Spins in its shell, shoving rivals and batting away cutlery', trait: 'Hard to shove, a bit slow', spec: { kind: 'burst', r: 150, force: 760, deflect: true }, mods: { weight: 0.85, speed: 0.95 } },
  /* 17 Pengwhip */ { power: 'Belly Slide', blurb: 'A long belly slide that flattens anyone in the way', trait: 'Great grip on ice', spec: { kind: 'charge', speed: 720, t: 0.5 }, mods: { grip: 1.8, speed: 1.03 } },
  /* 18 Velvaroo */ { power: 'Big Kick', blurb: 'A short, huge kick that launches rivals', trait: 'Shorter dash cooldown', cd: 1.4, spec: { kind: 'cone', range: 150, arc: 0.6, force: 1150 }, mods: { dashCD: 0.92 } },
  /* 19 Tacowl */ { power: 'Screech', blurb: 'A huge screech that dazes every rival nearby', trait: 'Faster throws', cd: 1.9, spec: { kind: 'burst', r: 270, force: 160, stun: 1.2 }, mods: { throwSpeed: 1.06 } },
];

export const kitOf = (species: number | undefined): KaijuKit | null => (species === undefined ? null : KITS[species] ?? null);
export const powerCooldown = (k: KaijuKit) => k.cd ?? KAIJU_POWERS.cooldown;

/** Roughly how close a rival must be for this power to be worth firing (used by bots). */
export function powerReach(k: KaijuKit): number {
  const s = k.spec;
  switch (s.kind) {
    case 'burst': return s.r * 0.9;
    case 'cone': return s.range * 0.9;
    case 'zone': return s.ahead + s.r * 0.8;
    case 'charge': return s.speed * s.t * 0.8;
    case 'blink': return s.landR ? s.dist + s.landR * 0.5 : 0; // a plain flutter is for escaping/chasing, not hitting
    case 'shot': return s.range * 0.85;
    case 'mines': return 220;
  }
}
