// Preview every kaiju in every colour style: npx vite-node scripts/colour-sheet.ts [rage]
import sharp from 'sharp';
import { recolor, mainHue } from '../src/render/recolor';
import { BODY_HUE, COLOURS } from '../src/colours';
const rage = process.argv.includes('rage') ? '-rage' : '';
const C = 110, comps: sharp.OverlayOptions[] = [];
for (let k = 0; k < 20; k++) {
  const { data, info } = await sharp(`public/art/kaiju-${k}${rage}.webp`).resize(C, C, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const base = BODY_HUE[k] ?? mainHue(data);
  for (const [j, c] of COLOURS.entries()) {
    const px = Buffer.from(data);
    if (c.recipe) recolor(px, c.recipe, base);
    comps.push({ input: await sharp(px, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer(), left: j * C, top: k * C });
  }
}
await sharp({ create: { width: C * COLOURS.length, height: C * 20, channels: 3, background: '#5a3a24' } }).composite(comps).png().toFile(`art-src/.colours${rage}.png`);
console.log(`art-src/.colours${rage}.png`, COLOURS.map(c => c.name).join(' | '));
