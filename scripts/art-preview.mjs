// Contact sheet of processed sprites on a dark + wood background, to eyeball cut-out quality.
// Usage: node scripts/art-preview.mjs [filter-regex]  -> art-src/preview.png
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = path.resolve('public/art');
const re = new RegExp(process.argv[2] ?? '.');
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.webp') && !f.startsWith('bg-') && re.test(f));
const cell = 220, cols = 5, rows = Math.ceil(files.length / cols);
const tiles = [];
for (const [i, f] of files.entries()) {
  const img = await sharp(path.join(DIR, f)).resize({ width: cell - 20, height: cell - 20, fit: 'inside' }).toBuffer();
  const meta = await sharp(img).metadata();
  const x = (i % cols) * cell, y = Math.floor(i / cols) * cell;
  tiles.push({ input: img, left: x + Math.round((cell - meta.width) / 2), top: y + Math.round((cell - meta.height) / 2) });
}
// alternate dark / wood cells so fringes show up on both
const bg = [];
for (let i = 0; i < rows * cols; i++) {
  const color = i % 2 ? { r: 154, g: 100, b: 56 } : { r: 26, g: 18, b: 13 };
  bg.push({ input: { create: { width: cell, height: cell, channels: 3, background: color } }, left: (i % cols) * cell, top: Math.floor(i / cols) * cell });
}
await sharp({ create: { width: cols * cell, height: rows * cell, channels: 3, background: '#000' } })
  .composite([...bg, ...tiles]).png().toFile('art-src/preview.png');
console.log(`preview of ${files.length} sprites -> art-src/preview.png`);
