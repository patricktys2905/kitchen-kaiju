// End-to-end check of the offline-update flow: install build A, deploy build B, reopen -> must switch to B on the menu.
import { execSync, spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
const PORT = 5196, url = `http://localhost:${PORT}/`;
const wait = ms => new Promise(r => setTimeout(r, ms));
const build = v => { const env = { ...process.env }; if (v) env.KK_VERSION = v; else delete env.KK_VERSION; execSync('node node_modules/vite/bin/vite.js build', { env, stdio: 'pipe' }); };
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
const version = page => page.evaluate(() => window.__game?.scene.getScene('menu')?.children.list.find(o => o.text?.startsWith?.('v'))?.text ?? null).catch(() => null); // page may be mid-reload

build('A-test');
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
let browser, ok = false;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch {} await wait(250); }
  browser = await chromium.launch({ executablePath: exe, headless: true });
  const page = await (await browser.newContext()).newPage();
  await page.goto(url);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await wait(1500);
  console.log('installed:', await version(page));
  build('B-test'); // "deploy" a new version
  await page.reload(); // reopen the app: served from the offline cache (A), update found in background
  for (let i = 0; i < 40; i++) { await wait(500); if ((await version(page)) === 'vB-test') break; }
  const v = await version(page);
  console.log('after reopening on the menu:', v);
  ok = v === 'vB-test';
} finally { await browser?.close(); server.kill(); }
build(null); // leave a normal build behind
console.log(ok ? 'UPDATE OK: new version applied automatically on the menu' : 'UPDATE FAILED');
process.exit(ok ? 0 : 1);
