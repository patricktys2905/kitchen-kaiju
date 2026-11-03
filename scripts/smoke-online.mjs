// Online smoke test: a desktop HOST and a phone GUEST (two separate browsers) play over the real
// PeerJS matchmaking server. Checks join, kaiju pick, start, state sync, guest input reaching the host,
// and the guest being told when the host leaves. Needs internet. Usage: npm run build && npm run smoke:online
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = 5287, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const errors = [];
const wait = ms => new Promise(r => setTimeout(r, ms));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
function check(cond, msg) { if (!cond) { console.error('page errors so far:', JSON.stringify(errors.slice(0, 6), null, 1)); throw new Error('CHECK FAILED: ' + msg); } console.log('ok -', msg); }
async function until(fn, ms = 20000, step = 250) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = await fn().catch(() => null); if (v) return v; await wait(step); } return null; }

let b1, b2;
try {
  for (let i = 0; i < 60; i++) { try { if ((await (await fetch(url)).text()).includes('Kitchen Kaiju')) break; } catch { /* starting */ } await wait(250); }
  if (!(await (await fetch(url)).text()).includes('Kitchen Kaiju')) throw new Error('port ' + PORT + ' is serving something else');
  b1 = await chromium.launch({ executablePath: exe, headless: true });
  b2 = await chromium.launch({ executablePath: exe, headless: true });
  const host = await (await b1.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
  const gctx = await b2.newContext({ viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true });
  const guest = await gctx.newPage();
  for (const [name, pg] of [['host', host], ['guest', guest]]) {
    pg.on('pageerror', e => errors.push(`${name}: ${e}`));
    pg.on('console', m => { if (m.type() === 'error') errors.push(`${name}: ${m.text()}`); });
  }

  // Host opens a room
  const menuReady = pg => until(() => pg.evaluate(() => !!window.__game && window.__game.scene.isActive('menu')));
  await host.goto(url); await menuReady(host); await wait(300);
  check(await until(async () => { await host.keyboard.press('KeyO'); return host.evaluate(() => !!document.getElementById('lobby')); }, 10000, 600), 'O opens the online lobby');
  await host.getByText('Host a game').click();
  const code = await until(async () => { const t = await host.locator('#lobby .code').textContent(); return /^[A-Z]{4}$/.test(t ?? '') ? t : null; });
  check(code, `host opened room ${code}`);
  await until(() => host.getByText(/Room .* is open/).isVisible());

  // Phone joins with the code
  await guest.goto(url); await menuReady(guest); await wait(300);
  await guest.getByText('🌐 ONLINE').tap();
  await guest.getByText('Join a game').tap();
  await guest.fill('#lb-code', code);
  await guest.fill('#lb-name', 'Phone');
  await guest.getByText('Join', { exact: true }).tap();
  check(await until(() => guest.getByText("You're in!").isVisible()), 'phone joined the room');
  check(await until(() => host.getByText('Phone', { exact: false }).first().isVisible()), 'host sees the phone player');

  // Phone changes its kaiju; host's lobby reflects it
  const before = await host.locator('#lobby .seat').nth(1).locator('.k').textContent();
  await guest.locator('#lobby .seat').nth(1).locator('button[data-pick="1"]').tap();
  check(await until(async () => (await host.locator('#lobby .seat').nth(1).locator('.k').textContent()) !== before), 'phone picked a different kaiju');

  // Start
  await host.getByText('Start match').click();
  const inGame = pg => pg.evaluate(() => window.__game.scene.isActive('game'));
  check(await until(() => inGame(host)) && await until(() => inGame(guest)), 'both devices are in the match');
  await wait(2500); // countdown

  // State sync: the phone sees the same kaiju where the host has them
  const hostState = () => host.evaluate(() => window.__game.scene.getScene('game').world.players.map(p => ({ x: p.x, y: p.y, alive: p.alive, name: p.name })));
  const guestState = () => guest.evaluate(() => window.__game.scene.getScene('game').world.players.map(p => ({ x: p.x, y: p.y, alive: p.alive, name: p.name })));
  const [hs, gs] = [await hostState(), await guestState()];
  check(hs.length === 4 && gs.length === 4, 'bots filled the empty seats (4 kaiju on both screens)');
  check(hs.every((p, i) => p.name === gs[i].name), 'same kaiju line-up on both screens');
  const drift = Math.max(...hs.map((p, i) => Math.hypot(p.x - gs[i].x, p.y - gs[i].y)));
  check(drift < 120, `positions in sync (max drift ${drift.toFixed(0)}px)`);

  // Guest input reaches the host: drag the phone joystick towards the table centre
  await host.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.opts.hazards = false; w.players[1].invT = 1e9; });
  const g0 = (await hostState())[1];
  const dir = g0.x < 640 ? 1 : -1;
  const cdp = await gctx.newCDPSession(guest);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: 140, y: 260, id: 1 }] });
  for (let i = 1; i <= 6; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: 140 + dir * i * 12, y: 260, id: 1 }] }); await wait(16); }
  await wait(900);
  await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
  const g1 = (await hostState())[1];
  check((g1.x - g0.x) * dir > 40, `phone's joystick moved its kaiju on the host (dx=${(g1.x - g0.x).toFixed(0)})`);
  await host.screenshot({ path: 'smoke-online-host.png' });
  await guest.screenshot({ path: 'smoke-online-guest.png' });

  // Host leaves -> phone is told
  await host.keyboard.press('Escape');
  check(await until(() => guest.evaluate(() => window.__game.scene.getScene('game')?.netNotice || window.__game.scene.isActive('menu')), 8000), 'phone was told the host left');
} finally {
  await b1?.close(); await b2?.close();
  server.kill();
}
const real = errors.filter(e => !/Could not connect to peer|Lost connection/.test(e));
if (real.length) { console.error('Console errors:\n' + real.join('\n')); process.exit(1); }
console.log('ONLINE SMOKE OK (screenshots: smoke-online-*.png)');
