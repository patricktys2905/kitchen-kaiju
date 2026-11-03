// App icons from the Gobzilla sprite on a wood tile (overrides the SVG-rendered ones).
import sharp from 'sharp';
const sprite = 'public/art/kaiju-0.webp';
async function icon(size, file, pad, rounded) {
  const r = rounded ? Math.round(size * 0.19) : 0;
  const bg = Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#9a6438"/>
    ${[0.25, 0.5, 0.75].map(f => `<rect y="${size * f}" width="${size}" height="${Math.max(2, size * 0.012)}" fill="#84522c"/>`).join('')}</svg>`);
  const inner = Math.round(size * (1 - pad * 2));
  const fg = await sharp(sprite).resize({ width: inner, height: inner, fit: 'inside' }).toBuffer();
  const m = await sharp(fg).metadata();
  let img = sharp(bg).composite([{ input: fg, left: Math.round((size - m.width) / 2), top: Math.round((size - m.height) / 2 + size * 0.02) }]);
  if (rounded) img = sharp(await img.png().toBuffer()).composite([{ input: Buffer.from(`<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#fff"/></svg>`), blend: 'dest-in' }]);
  await img.png().toFile(file);
  console.log('wrote', file);
}
await icon(192, 'public/icons/icon-192.png', 0.08, true);
await icon(512, 'public/icons/icon-512.png', 0.08, true);
await icon(512, 'public/icons/maskable-512.png', 0.18, false);
await icon(180, 'public/icons/apple-touch-icon.png', 0.08, false);
