// Story mode walkthrough: title -> STORY -> chapter 1 -> dialogue -> match (forced win) -> result -> chapter 2 unlocked.
// Runs on desktop (keyboard) and on an emulated phone (taps). Usage: npm run build && npm run smoke:story
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';

const PORT = 5292, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const errors = [];
function check(c, m) { if (!c) { console.error('page errors:', errors.slice(0, 5)); throw new Error('CHECK FAILED: ' + m); } console.log('ok -', m); }
async function until(fn, ms = 15000) { const t0 = Date.now(); while (Date.now() - t0 < ms) { const v = await fn().catch(() => null); if (v) return v; await wait(200); } return null; }
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));

let b;
try {
  for (let i = 0; i < 60; i++) { try { if ((await (await fetch(url)).text()).includes('Kitchen Kaiju')) break; } catch {} await wait(250); }
  b = await chromium.launch({ executablePath: exe, headless: true });
  for (const phone of [false, true]) {
    const ctx = await b.newContext(phone ? { viewport: { width: 844, height: 390 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true } : { viewport: { width: 1280, height: 720 } });
    const pg = await ctx.newPage();
    const tag = phone ? 'phone' : 'desktop';
    pg.on('pageerror', e => errors.push(`${tag}: ${e}`));
    pg.on('console', m => { if (m.type() === 'error') errors.push(`${tag}: ${m.text()}`); });
    const active = k => pg.evaluate(key => window.__game?.scene.isActive(key), k);
    // tap/click at game coordinates (1280x720 canvas, scaled to fit)
    const tapAt = async (x, y) => {
      const box = await pg.locator('canvas').boundingBox();
      const px = box.x + (x / 1280) * box.width, py = box.y + (y / 720) * box.height;
      if (phone) await pg.touchscreen.tap(px, py); else await pg.mouse.click(px, py);
      await wait(250);
    };
    await pg.goto(url);
    check(await until(() => active('title')), `${tag}: opens on the title screen`);
    await wait(900);
    await pg.screenshot({ path: `smoke-story-${tag}-1-title.png` });
    await tapAt(170, 640); // STORY card
    check(await until(() => active('story')), `${tag}: STORY opens the chapter map`);
    await wait(500);
    await pg.screenshot({ path: `smoke-story-${tag}-2-map.png` });
    await tapAt(1070, 640); // PLAY
    await wait(600);
    await pg.screenshot({ path: `smoke-story-${tag}-3-dialogue.png` });
    for (let i = 0; i < 12 && !(await active('game')); i++) { await tapAt(640, 360); await tapAt(640, 360); await wait(150); }
    check(await until(() => active('game')), `${tag}: dialogue leads into the chapter 1 match`);
    const setup = await pg.evaluate(() => { const s = window.__game.scene.getScene('game'); return { n: s.world.players.length, table: s.world.layout.name, target: s.world.opts.target }; });
    check(setup.n === 2 && setup.table === 'Sunday Roast' && setup.target === 2, `${tag}: chapter 1 = you vs 1 rival, Sunday Roast, first to 2 (${JSON.stringify(setup)})`);
    // win quickly: knock out the rival whenever a round is playing
    for (let i = 0; i < 40 && !(await active('story')); i++) {
      await pg.evaluate(() => { const w = window.__game.scene.getScene('game')?.world; if (w && w.phase === 'play') w.players.slice(1).forEach(p => w.ko(p, 0, 'swipe')); });
      await wait(400);
    }
    check(await until(() => active('story'), 20000), `${tag}: winning returns to the story screen`);
    await wait(1400);
    await pg.screenshot({ path: `smoke-story-${tag}-4-result.png` });
    const save = await pg.evaluate(() => JSON.parse(localStorage.getItem('kk-story-v1')));
    check(save.unlocked === 2 && save.stars[0] === 3, `${tag}: chapter 1 cleared with 3 stars, chapter 2 unlocked`);
    await ctx.close();
  }
} finally {
  await b?.close();
  server.kill();
}
if (errors.length) { console.error('Console errors:\n' + errors.join('\n')); process.exit(1); }
console.log('STORY SMOKE OK (screenshots: smoke-story-*.png)');
