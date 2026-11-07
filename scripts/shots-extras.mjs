// Screenshots of the title + extras screens (settings, help pages, gallery, records). Usage: npm run build && node scripts/shots-extras.mjs
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
const PORT = 5296, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const errors = [];
let browser;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch { /* */ } await wait(250); }
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', c => { if (c.type() === 'error') errors.push(c.text()); });
  await page.goto(url); await wait(2500);
  await page.screenshot({ path: 'art-src/shot-x-title.png' });
  const go = async (key, shot, after) => {
    await page.evaluate(k => window.__game.scene.getScenes(true)[0].scene.start(k), key); await wait(900);
    if (after) await after();
    await page.screenshot({ path: `art-src/shot-x-${shot}.png` });
  };
  await go('settings', 'settings');
  await go('help', 'help-basics');
  for (const [i, name] of [[1, 'cutlery'], [2, 'tables'], [3, 'modes']]) {
    await page.mouse.click(340 + i * 200, 118); await wait(400);
    await page.screenshot({ path: `art-src/shot-x-help-${name}.png` });
  }
  await go('gallery', 'gallery');
  await go('records', 'records');
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
} finally { await browser?.close(); server.kill(); }
