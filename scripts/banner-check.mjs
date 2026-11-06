// Screenshots the round-end and match-end banners with 6 players (longest names) and checks every text fits on screen.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright-core';
const PORT = 5290, url = `http://localhost:${PORT}/`;
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PORT), '--strictPort'], { stdio: 'pipe' });
const wait = ms => new Promise(r => setTimeout(r, ms));
const exe = [process.env.CHROME_PATH, '/opt/pw-browsers/chromium', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'].filter(Boolean).find(p => existsSync(p));
let bad = [];
for (let i = 0; i < 60; i++) { try { if ((await (await fetch(url)).text()).includes('Kitchen Kaiju')) break; } catch {} await wait(250); }
const b = await chromium.launch({ executablePath: exe, headless: true });
const pg = await b.newPage({ viewport: { width: 1280, height: 720 } });
await pg.goto(`${url}?demo=6`); await wait(3500);
for (const [phase, target] of [['roundEnd', 5], ['matchEnd', 5], ['roundEnd', 10], ['matchEnd', 10]]) {
  await pg.evaluate(([ph, target]) => {
    const s = window.__game.scene.getScene('game'), w = s.world;
    // longest names, big scores
    ['BUBBLEGUMBO', 'PIZZARAPTOR', 'HOTCHOG', 'SALMONSTER', 'CHOCOMUNCH', 'AVOCADRAKE'].forEach((n, i) => { w.players[i].name = n; w.players[i].score = 5 - (i % 5); w.players[i].kos = 12 + i; });
    w.opts.target = target; w.phase = ph; w.phaseT = 0; w.winner = 0;
    w.step = () => {}; // freeze the match so the banner stays put
  }, [phase, target]);
  await wait(700);
  await pg.screenshot({ path: `smoke-banner-${phase}-${target}.png` });
  const out = await pg.evaluate(() => {
    const s = window.__game.scene.getScene('game');
    return s.children.list.filter(o => o.type === 'Text' && o.visible && o.text).map(o => { const r = o.getBounds(); return { t: o.text.slice(0, 30), x0: r.x, x1: r.right, y0: r.y, y1: r.bottom, big: o === s.banner, sub: o === s.bannerSub }; });
  });
  // banner title vs its subtitle must not overlap
  const big = out.filter(o => o.big), sub = out.filter(o => o.sub);
  for (const a of big) for (const c of sub) if (a.y1 > c.y0 + 4 && c.y1 > a.y0 + 4) bad.push(`${phase}: title overlaps the text below it`);
  for (const o of out) if (o.x0 < 0 || o.x1 > 1280 || o.y0 < 0 || o.y1 > 720) bad.push(`${phase}: "${o.t}" (${o.x0.toFixed(0)}..${o.x1.toFixed(0)}, ${o.y0.toFixed(0)}..${o.y1.toFixed(0)})`);
}
await b.close(); server.kill();
console.log(bad.length ? 'OFF SCREEN:\n' + bad.join('\n') : 'BANNERS OK: all text on screen');
process.exit(bad.length ? 1 : 0);
