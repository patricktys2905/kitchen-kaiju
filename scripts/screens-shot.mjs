// Screenshot every screen (for layout checks): node scripts/screens-shot.mjs  -> art-src/.screens/*.png
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { chromium } from 'playwright-core';
const PORT = 5301, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
for (let i = 0; i < 60; i++) { try { if ((await (await fetch(url)).text()).includes('Kitchen Kaiju')) break; } catch {} await wait(250); }
fs.mkdirSync('art-src/.screens', { recursive: true });
const b = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const pg = await (await b.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto(url); await wait(2500);
await pg.evaluate(() => localStorage.setItem('kk-story-v1', JSON.stringify({ unlocked: 12, stars: Array(12).fill(3), pick: 0, endingSeen: true, cuts: ['cut-open#2', 'cut-open', 's2-open'], spicy: [1] })));
const shots = [
  ['title', 'title', {}], ['free', 'menu', {}], ['party', 'menu', { mode: 'teams', party: true }], ['party-rush', 'menu', { mode: 'crumbRush', party: true }],
  ['story', 'story', {}], ['lobby', 'lobby', {}], ['help', 'help', {}], ['gallery', 'gallery', {}], ['records', 'records', {}], ['settings', 'settings', {}], ['controls', 'controls', {}], ['workshop', 'workshop', {}],
];
for (const [name, key, data] of shots) {
  await pg.evaluate(() => { const g = window.__game; g.scene.getScenes(true).forEach(s => s.scene.stop()); });
  await wait(300);
  await pg.evaluate(([k, d]) => window.__game.scene.start(k, d), [key, data]);
  await wait(1500);
  if (name.startsWith('party') || name === 'free') await pg.evaluate(() => { const m = window.__game.scene.getScene('menu'); if (m.slots.length < 1) m.addSlot({ kind: 'kb', index: 0 }); while (m.slots.length < 4) m.addSlot({ kind: 'bot', index: m.slots.length }); });
  await wait(500);
  await pg.screenshot({ path: `art-src/.screens/${name}.png` });
}
console.log('errors', errs);
await b.close(); server.kill();
