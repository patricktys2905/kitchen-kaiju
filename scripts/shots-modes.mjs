// Screenshots of each party mode in a bot match. Usage: npm run build && node scripts/shots-modes.mjs
import { spawn } from 'node:child_process';
import { chromium } from 'playwright-core';
const PORT = 5295, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const errors = [];
let browser;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch { /* */ } await wait(250); }
  browser = await chromium.launch({ executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
  for (const m of ['teams', 'crumbRush', 'hotDumpling', 'classic']) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
    page.on('pageerror', e => errors.push(`${m}: ${e}`));
    page.on('console', c => { if (c.type() === 'error') errors.push(`${m}: ${c.text()}`); });
    await page.goto(`${url}?mode=free&demo=4&gmode=${m}`);
    await wait(m === 'classic' ? 16000 : 9000);
    await page.screenshot({ path: `art-src/shot-mode-${m}.png` });
    const st = await page.evaluate(() => { const w = window.__game?.scene.getScene('game')?.world; return w && { mode: w.mode, phase: w.phase, round: w.round, pts: w.players.map(p => p.pts), hot: w.hot?.id ?? null, scores: w.players.map(p => p.score) }; });
    console.log(m, JSON.stringify(st));
    await page.close();
  }
  console.log(errors.length ? 'ERRORS:\n' + errors.join('\n') : 'no errors');
} finally { await browser?.close(); server.kill(); }
