// Contact sheet: every kaiju wearing a few hats, using the game's placement maths.
// Usage: node scripts/hat-sheet.mjs [hat,hat,...] [out.png]   (reads HAT_FIT/HAT_SCALE/HEADS from src)
import fs from 'node:fs';
import sharp from 'sharp';
const hatsSrc = fs.readFileSync('src/hats.ts', 'utf8');
const fit = {};
for (const m of hatsSrc.matchAll(/(\w+): \[(-?[\d.]+), (-?[\d.]+)\]/g)) fit[m[1]] = [+m[2], +m[3]];
const HAT_SCALE = +(hatsSrc.match(/HAT_SCALE = ([\d.]+)/)?.[1] ?? 1.2);
const heads = fs.existsSync('src/render/heads.json') ? JSON.parse(fs.readFileSync('src/render/heads.json', 'utf8')) : {};
const hats = (process.argv[2] ?? 'party,chef,top,crown,viking,wizard').split(',');
const out = process.argv[3] ?? 'art-src/.hats-sheet.png';
const R = 40, H = 3.1 * R, CW = 150, CH = 210;
const comps = [];
for (let k = 0; k < 20; k++) for (const [j, hid] of hats.entries()) {
  const key = `kaiju-${k}${process.env.RAGE ? '-rage' : ''}`, meta = await sharp(`public/art/${key}.webp`).metadata();
  const s = H / meta.height, w = Math.round(meta.width * s), h = Math.round(H);
  const ox = Math.round(CW / 2 - w / 2), oy = CH - 20 - h;
  comps.push({ input: await sharp(`public/art/${key}.webp`).resize(w, h).toBuffer(), left: (j + k % 2 * hats.length) * CW + ox, top: Math.floor(k / 2) * CH + oy });
  const hd = heads[key] ?? (process.env.RAGE ? [0.5, 0, 1] : [0.5, 0, 1]);
  const hx = (j + k % 2 * hats.length) * CW + ox + hd[0] * w, hy = Math.floor(k / 2) * CH + oy + hd[1] * h;
  const [fw, dy] = fit[hid] ?? [1.3, 0.3];
  const hatW = Math.round(fw * HAT_SCALE * R * (hd[2] ?? 1));
  const hm = await sharp(`public/art/hat-${hid}.webp`).metadata();
  const hatH = Math.round(hm.height * hatW / hm.width);
  const L = Math.round(hx - hatW / 2), T = Math.round(hy + dy * R * (hd[2] ?? 1) - hatH);
  if (L >= 0 && T >= 0) comps.push({ input: await sharp(`public/art/hat-${hid}.webp`).resize(hatW, hatH).toBuffer(), left: L, top: T });
}
await sharp({ create: { width: CW * hats.length * 2, height: CH * 10, channels: 3, background: '#5a3a24' } }).composite(comps).png().toFile(out);
console.log(out);
