// Browser smoke test: serves the built game, plays it headless (keyboard + bots), saves screenshots,
// and fails on any console error. Usage: npm run build && npm run smoke
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = 5199;
const url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));

async function waitForServer() {
  for (let i = 0; i < 60; i++) {
    try { if ((await fetch(url)).ok) return; } catch { /* not up yet */ }
    await wait(250);
  }
  throw new Error('preview server did not start');
}

function launchOpts() {
  const candidates = [
    process.env.CHROME_PATH,
    '/opt/pw-browsers/chromium',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
  ].filter(Boolean);
  const exe = candidates.find(p => existsSync(p));
  if (!exe) throw new Error('No Chromium-based browser found; set CHROME_PATH');
  return { executablePath: exe, headless: true, args: ['--autoplay-policy=no-user-gesture-required'] };
}

const errors = [];
let browser;
try {
  await waitForServer();
  browser = await chromium.launch(launchOpts());
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));

  // 1) Menu + keyboard join flow.
  await page.goto(url + '?mode=free');
  for (let i = 0; i < 80; i++) { if (await page.evaluate(() => !!window.__game?.scene.isActive('menu')).catch(() => false)) break; await wait(150); }
  await wait(400);
  for (let i = 0; i < 5; i++) { // Keyboard Left joins (quick tap on purpose); retry if the page swallowed it while starting up
    await page.keyboard.press('Space');
    await wait(150);
    if (await page.evaluate(() => window.__game.scene.getScene('menu').slots.some(s => s.kind === 'kb' && s.index === 0))) break;
  }
  await wait(100);
  await page.keyboard.press('KeyB'); // add bots
  await wait(100);
  await page.keyboard.press('KeyB');
  await wait(300);
  const menu = () => page.evaluate(() => { const m = window.__game.scene.getScene('menu'); return { diff: m.difficulty, pick: m.picks[0] }; });
  const d0 = await menu();
  await page.keyboard.press('Digit2');
  await wait(100);
  const d1 = await menu();
  console.log('difficulty key check:', d0.diff, '->', d1.diff);
  if (d1.diff === d0.diff) throw new Error('2 did not change bot difficulty');
  await page.keyboard.press('KeyD');
  await wait(100);
  if ((await menu()).pick === d1.pick) throw new Error('D did not change the kaiju');
  if ((await menu()).diff !== d1.diff) throw new Error('D changed difficulty instead of the kaiju');
  const r0 = await page.evaluate(() => window.__game.scene.getScene('menu').rounds);
  await page.keyboard.press('KeyR');
  await wait(100);
  const r1 = await page.evaluate(() => window.__game.scene.getScene('menu').rounds);
  console.log('rounds key check:', r0, '->', r1);
  if (r1 === r0) throw new Error('R did not change the number of rounds');
  await page.screenshot({ path: 'smoke-1-menu.png' });
  await page.keyboard.press('Digit1');
  await wait(2200); // countdown

  // 2) Human plays a bit: walk, charge + throw, dash, swipe.
  const pos = () => page.evaluate(() => { const p = window.__game.scene.getScene('game').world.players[0]; return { x: p.x, y: p.y }; });
  for (let i = 0; i < 40; i++) { if (await page.evaluate(() => window.__game.scene.getScene('game').world.phase === 'play')) break; await wait(100); }
  const before = await pos();
  const key = before.y > 382 ? 'KeyW' : 'KeyS'; // walk towards the middle (spawns can be right by an edge)
  await page.keyboard.down(key);
  await wait(300);
  await page.keyboard.up(key);
  const after = await pos();
  console.log('keyboard move check:', JSON.stringify({ before, after }));
  if (Math.abs(after.y - before.y) < 20) throw new Error('keyboard movement did not reach the player');
  await page.keyboard.down('KeyD');
  await wait(400);
  await page.keyboard.down('Space');
  await wait(350);
  await page.screenshot({ path: 'smoke-2-charging.png' });
  await page.keyboard.up('Space');
  await page.keyboard.up('KeyD');
  await wait(120);
  await page.screenshot({ path: 'smoke-3-throw.png' });
  await page.keyboard.down('KeyS');
  await page.keyboard.press('ShiftLeft');
  await wait(300);
  await page.keyboard.up('KeyS');
  await page.keyboard.press('KeyF');
  await wait(2500);
  await page.screenshot({ path: 'smoke-4-midgame.png' });
  const human = await page.evaluate(() => {
    const s = window.__game.scene.getScene('game');
    return { slot0: s.slots[0].kind, players: s.world.players.length, thrown: s.world.cutlery.some(c => c.owner === 0 && c.holder !== 0) || s.world.players[0].holding === null };
  });
  console.log('human check:', JSON.stringify(human));
  const target = await page.evaluate(() => window.__game.scene.getScene('game').world.opts.target);
  if (target !== r1) throw new Error(`match uses ${target} rounds, menu said ${r1}`);
  console.log('match uses the chosen rounds:', target);
  if (human.slot0 !== 'kb' || human.players !== 3) throw new Error('keyboard player did not join');

  // 3) Bot-only demo match for a while (hazards, kaiju etc.).
  await page.goto(url + '?demo=4');
  for (let i = 0; i < 6; i++) {
    await wait(3000);
    await page.screenshot({ path: `smoke-5-demo-${i}.png` });
  }
  const state = await page.evaluate(() => {
    const g = window.__game;
    const s = g.scene.getScene('game');
    const w = s.world;
    return { round: w.round, phase: w.phase, scores: w.players.map(p => p.score), kos: w.players.map(p => p.kos) };
  });
  console.log('demo state after ~18s:', JSON.stringify(state));

  // 4) Force the showcase moments: a kaiju transformation and the giant hand.
  await page.goto(url + '?demo=4');
  await wait(2600);
  await page.evaluate(() => {
    const w = window.__game.scene.getScene('game').world;
    for (const p of w.players) p.meter = 100;
    w.handTimer = 0.3;
  });
  await wait(1100);
  await page.screenshot({ path: 'smoke-6-hand-warn.png' });
  await wait(450);
  await page.screenshot({ path: 'smoke-7-hand-sweep.png' });
  const kaiju = await page.evaluate(() => window.__game.scene.getScene('game').world.players.some(p => p.kaijuT > 0 || !p.alive));
  console.log('kaiju/ko happened:', kaiju);
} finally {
  await browser?.close();
  server.kill();
}
if (errors.length) {
  console.error('Console errors:\n' + errors.join('\n'));
  process.exit(1);
}
console.log('SMOKE OK (screenshots: smoke-*.png)');
