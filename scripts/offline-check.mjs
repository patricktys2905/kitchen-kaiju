// Verifies the installable build works with no connection: first visit online, then reload offline.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
const PORT = 5197, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
let browser, ok = false;
try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch {} await wait(250); }
  browser = await chromium.launch({ executablePath: exe, headless: true });
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  await page.goto(url);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await wait(1500);
  const manifest = await page.evaluate(async () => { const l = document.querySelector('link[rel=manifest]'); return l ? (await fetch(l.href)).json() : null; });
  console.log('manifest:', manifest?.name, manifest?.display, manifest?.icons?.length, 'icons');
  await ctx.setOffline(true);
  await page.reload();
  await wait(1500);
  ok = await page.evaluate(() => !!window.__game && window.__game.scene.isActive('menu'));
  console.log(ok ? 'OFFLINE OK: game loaded with no network' : 'OFFLINE FAILED');
} finally { await browser?.close(); server.kill(); }
process.exit(ok ? 0 : 1);
