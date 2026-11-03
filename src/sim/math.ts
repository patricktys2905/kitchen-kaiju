export const TAU = Math.PI * 2;
export const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
export const dist = (ax: number, ay: number, bx: number, by: number) => Math.hypot(bx - ax, by - ay);

/** Smallest signed difference between two angles, in [-PI, PI]. */
export function angleDiff(a: number, b: number): number {
  let d = (a - b) % TAU;
  if (d > Math.PI) d -= TAU;
  if (d < -Math.PI) d += TAU;
  return d;
}

export interface Hit {
  nx: number;
  ny: number;
  pen: number;
}

/** Circle vs axis-aligned rect. Returns push-out normal + depth, or null. */
export function circRect(cx: number, cy: number, r: number, x: number, y: number, w: number, h: number): Hit | null {
  const px = clamp(cx, x, x + w), py = clamp(cy, y, y + h);
  const dx = cx - px, dy = cy - py, d2 = dx * dx + dy * dy;
  if (d2 >= r * r) return null;
  if (d2 === 0) {
    const l = cx - x, ri = x + w - cx, t = cy - y, b = y + h - cy, m = Math.min(l, ri, t, b);
    if (m === l) return { nx: -1, ny: 0, pen: l + r };
    if (m === ri) return { nx: 1, ny: 0, pen: ri + r };
    if (m === t) return { nx: 0, ny: -1, pen: t + r };
    return { nx: 0, ny: 1, pen: b + r };
  }
  const d = Math.sqrt(d2);
  return { nx: dx / d, ny: dy / d, pen: r - d };
}

/** Circle vs circle. Normal points from (ox,oy) towards (cx,cy). */
export function circCircle(cx: number, cy: number, r: number, ox: number, oy: number, or: number): Hit | null {
  const dx = cx - ox, dy = cy - oy, d = Math.hypot(dx, dy);
  if (d >= r + or) return null;
  if (d === 0) return { nx: 1, ny: 0, pen: r + or };
  return { nx: dx / d, ny: dy / d, pen: r + or - d };
}
