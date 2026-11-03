// Phone smoke test: emulates a landscape phone with real multi-touch (CDP touch events) and checks the
// touch menu, joystick, drag-to-aim throw, simultaneous move+dash, and the portrait rotate prompt.
// Usage: npm run build && npm run smoke:phone
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = 5198;
const url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));

const errors = [];
let browser;
function check(cond, msg) { if (!cond) throw new Error('CHECK FAILED: ' + msg); console.log('ok -', msg); }

try {
  for (let i = 0; i < 60; i++) { try { if ((await fetch(url)).ok) break; } catch { /* starting */ } await wait(250); }
  browser = await chromium.launch({ executablePath: exe, headless: true });
  const ctx = await browser.newContext({ viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));
  const cdp = await ctx.newCDPSession(page);
  const touch = (type, points) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: points });
  const center = async sel => { const b = await (typeof sel === 'string' ? page.locator(sel) : sel).first().boundingBox(); return { x: b.x + b.width / 2, y: b.y + b.height / 2 }; };
  const tapEl = async sel => { const c = await center(sel); await touch('touchStart', [{ x: c.x, y: c.y, id: 9 }]); await wait(60); await touch('touchEnd', []); await wait(120); };
  const world = () => page.evaluate(() => {
    const w = window.__game.scene.getScene('game').world;
    return { phase: w.phase, p0: { x: w.players[0].x, y: w.players[0].y, holding: w.players[0].holding, dashCD: w.players[0].dashCD }, n: w.players.length,
      flying: w.cutlery.filter(c => c.state === 'flying' && c.owner === 0).length };
  });

  await page.goto(url);
  await wait(900);
  await page.screenshot({ path: 'smoke-phone-1-menu.png' });
  const slots = await page.evaluate(() => window.__game.scene.getScene('menu').slots.map(s => s.kind));
  check(slots[0] === 'touch', 'touch player auto-seated on first visit');

  await tapEl(page.getByText('+ BOT')); // add 2 bots
  await tapEl(page.getByText('+ BOT'));
  await tapEl(page.getByText('▶ PLAY'));
  await wait(2300);
  let s = await world();
  check(s.n === 3 && s.phase === 'play', 'match started from touch buttons with 2 bots');
  check(await page.locator('#b-throw').isVisible(), 'touch controls visible in game');

  // Joystick: drag right for 0.6s.
  const before = s.p0;
  await touch('touchStart', [{ x: 120, y: 260, id: 1 }]);
  for (let i = 1; i <= 6; i++) { await touch('touchMove', [{ x: 120 + i * 12, y: 260, id: 1 }]); await wait(16); }
  await wait(500);
  s = await world();
  check(s.p0.x - before.x > 40 || !s.p0, `joystick moved player right (dx=${(s.p0.x - before.x).toFixed(0)})`);

  // While still holding the joystick, press DASH with a second finger (multi-touch).
  const dash = await center('#b-dash');
  await touch('touchStart', [{ x: 192, y: 260, id: 1 }, { x: dash.x, y: dash.y, id: 2 }]);
  await wait(80);
  s = await world();
  check(s.p0.dashCD > 0, 'dash fired while moving (two fingers)');
  await touch('touchEnd', [{ x: 192, y: 260, id: 1 }]);
  await touch('touchEnd', []);
  await wait(200);

  // Throw: press THROW, drag up-left to aim, release.
  s = await world();
  if (s.p0.holding === null) { await wait(1500); s = await world(); }
  const thr = await center('#b-throw');
  await touch('touchStart', [{ x: thr.x, y: thr.y, id: 3 }]);
  await wait(150);
  await touch('touchMove', [{ x: thr.x - 40, y: thr.y - 40, id: 3 }]);
  await wait(250);
  await page.screenshot({ path: 'smoke-phone-2-aiming.png' });
  await touch('touchEnd', []);
  await wait(50);
  s = await world();
  check(s.flying > 0 || s.p0.holding === null, 'drag-aimed throw launched cutlery');
  await wait(1500);
  await page.screenshot({ path: 'smoke-phone-3-play.png' });

  // Pause button.
  await tapEl(page.getByText('❚❚ PAUSE'));
  const paused = await page.evaluate(() => window.__game.scene.getScene('game').paused);
  check(paused === true, 'pause button pauses');
  await tapEl(page.getByText('❚❚ PAUSE'));

  // Portrait -> rotate prompt.
  await page.setViewportSize({ width: 390, height: 844 });
  await wait(300);
  check(await page.locator('#tc-rotate').isVisible(), 'portrait shows "turn your phone" prompt');
  await page.screenshot({ path: 'smoke-phone-4-portrait.png' });
} finally {
  await browser?.close();
  server.kill();
}
if (errors.length) { console.error('Console errors:\n' + errors.join('\n')); process.exit(1); }
console.log('PHONE SMOKE OK (screenshots: smoke-phone-*.png)');
