// 🎨 Kaiju colour styles: recolour a sprite's pixels in place (runs once per texture, in the browser and in scripts).
// EASY TO CUSTOMISE: add or edit styles in COLOURS (see src/colours.ts for names and unlocks).

export interface Recipe {
  hue?: number; // target hue in degrees (the kaiju's main colour is turned to this); undefined = keep hues
  sat?: number; // saturation multiplier
  light?: number; // lightness multiplier
  glow?: number; // 0..1: push bright areas brighter (shiny styles)
}

/** Only colours within this many degrees of the main hue are recoloured fully, fading out by RANGE_FADE (secondary colours stay as drawn). */
export const RANGE = 40, RANGE_FADE = 30;

function rgb2hsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255; g /= 255; b /= 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx === mn) return [0, 0, l];
  const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn);
  let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function hsl2rgb(h: number, s: number, l: number): [number, number, number] {
  h = ((h % 360) + 360) % 360 / 360;
  if (s === 0) { const v = Math.round(l * 255); return [v, v, v]; }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q;
  const f = (t: number) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 0.5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; };
  return [Math.round(f(h + 1 / 3) * 255), Math.round(f(h) * 255), Math.round(f(h - 1 / 3) * 255)];
}

/** The sprite's main hue (saturation-weighted average on the colour wheel). */
export function mainHue(px: Uint8ClampedArray | Uint8Array): number {
  let x = 0, y = 0;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] < 200) continue;
    const [h, s, l] = rgb2hsl(px[i], px[i + 1], px[i + 2]);
    if (l < 0.18 || l > 0.9) continue; // outlines and highlights
    const w = s * s;
    x += Math.cos((h * Math.PI) / 180) * w;
    y += Math.sin((h * Math.PI) / 180) * w;
  }
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

/** Recolours RGBA pixels in place. Dark outlines and the eyes' whites/blacks are left alone. */
export function recolor(px: Uint8ClampedArray | Uint8Array, rc: Recipe, baseHue = mainHue(px)): void {
  const shift = rc.hue === undefined ? 0 : rc.hue - baseHue;
  for (let i = 0; i < px.length; i += 4) {
    if (px[i + 3] === 0) continue;
    let [h, s, l] = rgb2hsl(px[i], px[i + 1], px[i + 2]);
    if (l < 0.14 || s < 0.12) continue; // outlines, eyes, white cream stay as drawn
    // how much of the main body colour this pixel is (1 = main colour, 0 = a different part like cream or a bun)
    const dh = Math.abs(((h - baseHue + 540) % 360) - 180);
    const k = rc.hue === undefined ? 1 : dh <= RANGE ? 1 : dh >= RANGE + RANGE_FADE ? 0 : 1 - (dh - RANGE) / RANGE_FADE;
    const k2 = rc.hue === undefined ? 1 : Math.max(k, 0.35); // brightness/saturation tweaks still apply a little everywhere
    h += shift * k;
    s = Math.min(1, s * (1 + ((rc.sat ?? 1) - 1) * k2));
    l = Math.min(0.97, l * (1 + ((rc.light ?? 1) - 1) * k2));
    if (rc.glow) l = Math.min(0.97, l + (l > 0.5 ? (l - 0.5) * rc.glow * k2 : 0));
    const [r, g, b] = hsl2rgb(h, s, l);
    px[i] = r; px[i + 1] = g; px[i + 2] = b;
  }
}
