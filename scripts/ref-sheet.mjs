// Builds a reference image (existing characters side by side on magenta) to paste into Gemini for style matching.
// Usage: node scripts/ref-sheet.mjs out.png name1 name2 ...   (names from public/art)
import sharp from 'sharp';
const [out, ...names] = process.argv.slice(2);
const cell = 320, tiles = [];
for (const [i, n] of names.entries()) {
  const img = await sharp(`public/art/${n}.webp`).resize({ width: cell - 30, height: cell - 30, fit: 'inside' }).png().toBuffer();
  const m = await sharp(img).metadata();
  tiles.push({ input: img, left: i * cell + Math.round((cell - m.width) / 2), top: Math.round((cell - m.height) / 2) });
}
await sharp({ create: { width: cell * names.length, height: cell, channels: 3, background: '#ff00ff' } }).composite(tiles).png().toFile(out);
console.log('wrote', out);
