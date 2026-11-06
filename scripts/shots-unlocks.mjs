// Screenshots of the unlockable tables + the Story rewards screen. Usage: npm run build && node scripts/shots-unlocks.mjs
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';

const PORT = 5293;
const url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const errors = [];
let browser;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch { /* */ } await wait(250); }
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const save = (stars) => JSON.stringify({ unlocked: 12, stars, pick: 16, endingSeen: false, cuts: ['cut-open'] });
  for (const [table, stars] of [[12, Array(12).fill(3)], [13, Array(12).fill(3)], [14, Array(12).fill(3)]]) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on('pageerror', e => errors.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.addInitScript(s => localStorage.setItem('kk-story-v1', s), save(stars));
    await page.goto(`${url}?mode=free&demo=6&table=${table}`);
    await wait(9000);
    await page.screenshot({ path: `art-src/shot-table-${table}.png` });
    await page.close();
  }
  // rewards screen with a part-way save (4 chapters -> Minturtle earned)
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('pageerror', e => errors.push(String(e)));
  await page.addInitScript(s => localStorage.setItem('kk-story-v1', s), save([3, 2, 3, 3, 2, 2, 3, 3, 3, 3, 3, 3]));
  await page.goto(`${url}?mode=story`);
  await wait(2500);
  await page.mouse.click(745, 676);
  await wait(800);
  await page.screenshot({ path: 'art-src/shot-rewards.png' });
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
} finally {
  await browser?.close();
  server.kill();
}
