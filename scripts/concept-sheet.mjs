// Labelled contact sheet of kaiju concepts (art-src/raw/concept-N.png) -> art-src/concepts-sheet.png
import fs from 'node:fs';
import sharp from 'sharp';
const C = JSON.parse(fs.readFileSync('art-src/concepts.json', 'utf8'));
const cell = 340, cols = 4, rows = Math.ceil(C.length / cols), lab = 56;
const comps = [];
for (const [i, [name]] of C.entries()) {
  const x = (i % cols) * cell, y = Math.floor(i / cols) * (cell + lab);
  // knock out the magenta background so the sheet looks like the game
  const { data, info } = await sharp(`art-src/raw/concept-${i + 1}.png`).resize(cell - 20, cell - 20, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let p = 0; p < data.length; p += 4) { const r = data[p], g = data[p + 1], b = data[p + 2]; if (r > 170 && b > 170 && g < 110) data[p + 3] = 0; }
  const img = await sharp(data, { raw: info }).png().toBuffer();
  comps.push({ input: { create: { width: cell, height: cell + lab, channels: 3, background: i % 2 ? '#3a2412' : '#2a1a0e' } }, left: x, top: y });
  comps.push({ input: img, left: x + Math.round((cell - info.width) / 2), top: y + 6 });
  const svg = `<svg width="${cell}" height="${lab}" xmlns="http://www.w3.org/2000/svg"><text x="${cell / 2}" y="38" font-family="Arial Black, Arial" font-weight="900" font-size="26" fill="#ffe9c7" text-anchor="middle">${i + 1}. ${name}</text></svg>`;
  comps.push({ input: Buffer.from(svg), left: x, top: y + cell });
}
await sharp({ create: { width: cols * cell, height: rows * (cell + lab), channels: 3, background: '#000' } }).composite(comps).png().toFile('art-src/concepts-sheet.png');
console.log('art-src/concepts-sheet.png');
