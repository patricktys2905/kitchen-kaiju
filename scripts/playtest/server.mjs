// 🧪 Playtest harness: lets an AI agent play the REAL game (built version) one decision at a time.
// The game is frozen between commands. Each agent runs its own server (own browser + own save data).
// Usage: node scripts/playtest/server.mjs <port> <outDir>     (needs `npm run build` first)
// Then: curl "http://localhost:<port>/help"
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import { chromium } from 'playwright-core';

const PORT = Number(process.argv[2] ?? 7100), OUT = process.argv[3] ?? `art-src/.playtest/${PORT}`;
const PREVIEW = PORT + 1000;
fs.mkdirSync(OUT, { recursive: true });
const wait = ms => new Promise(r => setTimeout(r, ms));
const preview = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', String(PREVIEW), '--strictPort'], { stdio: 'ignore' });
for (let i = 0; i < 80; i++) { try { if ((await (await fetch(`http://localhost:${PREVIEW}/`)).text()).includes('Kitchen Kaiju')) break; } catch {} await wait(250); }
const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/opt/pw-browsers/chromium'].find(p => fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe, headless: true });
const pg = await (await browser.newContext({ viewport: { width: 1280, height: 720 } })).newPage();
const errors = [];
pg.on('pageerror', e => errors.push(String(e.message).slice(0, 200)));
await pg.goto(`http://localhost:${PREVIEW}/`);
await wait(3000);
let shotN = 0;

// ---------------------------------------------------------------- in-page helpers
const freeze = () => pg.evaluate(() => window.__game.loop.sleep());
const thaw = () => pg.evaluate(() => window.__game.loop.wake());

async function summary() {
  return pg.evaluate(() => {
    const g = window.__game, act = g.scene.getScenes(true).map(s => s.scene.key);
    const top = g.scene.getScenes(true).slice(-1)[0];
    const texts = [];
    for (const s of g.scene.getScenes(true)) for (const o of s.children.list) {
      if (o.type !== 'Text' || !o.visible || o.alpha < 0.2 || !o.text?.trim()) continue;
      texts.push(`[${Math.round(o.x)},${Math.round(o.y)}] ${o.text.replace(/\s+/g, ' ').slice(0, 140)}`);
    }
    return { scenes: act, screen: top?.scene.key, texts: texts.slice(0, 80) };
  });
}

async function matchState() {
  return pg.evaluate(() => {
    const s = window.__game.scene.getScene('game');
    if (!s || !s.scene.isActive() || !s.world) return null;
    const w = s.world, me = w.players[0], R = v => Math.round(v);
    const SP = s.species;
    return {
      phase: w.phase, round: w.round, firstTo: w.opts.target, mode: w.mode, twist: w.mutator, table: w.layout.name, roundTime: R(w.roundT),
      you: me && { kaiju: w.players[0].name, x: R(me.x), y: R(me.y), alive: me.alive, holding: w.cutleryById(me.holding)?.kind ?? null, belly: R(me.meter), kaijuSecs: +me.kaijuT.toFixed(1), powerReady: me.kaijuT > 0 ? me.powerCD <= 0 : null, dazed: me.stunT > 0, score: me.score, kos: me.kos },
      rivals: w.players.slice(1).map((p, i) => ({ seat: i + 1, kaiju: p.name, alive: p.alive, dist: me ? R(Math.hypot(p.x - me.x, p.y - me.y)) : null, holding: w.cutleryById(p.holding)?.kind ?? null, isKaiju: p.kaijuT > 0, belly: R(p.meter), score: p.score })),
      looseCutleryNearby: w.cutlery.filter(c => c.state === 'stuck').map(c => ({ kind: c.kind, dist: me ? R(Math.hypot(c.x - me.x, c.y - me.y)) : null })).sort((a, b) => a.dist - b.dist).slice(0, 3),
      crumbsOnTable: w.crumbs.length,
      dangers: [w.hand && 'giant hand', w.wind && 'wind', w.cleaver && 'cleaver', w.burner && 'burner', w.toaster && 'toaster', w.blender && 'blender', w.cheeseDrops.length && 'falling cheese', w.spatula && 'spatula'].filter(Boolean),
      edgeDistance: me ? R(Math.min(me.x - 100, 1180 - me.x, me.y - 90, 670 - me.y)) : null,
      winner: w.winner === null ? null : w.winner === 0 ? 'YOU' : w.players[w.winner].name,
      kaijuPowersOn: !!me?.kit, yourPower: me?.kit ? `${me.kit.power}: ${me.kit.blurb}` : null,
    };
  });
}

/** Installs a driver for seat 0: a high-level command executed every sim step. */
async function drive(cmd) {
  return pg.evaluate(cmd => {
    const s = window.__game.scene.getScene('game');
    if (!s?.world) return false;
    const w = s.world;
    const NO = { mx: 0, my: 0, throw: false, swipe: false, dash: false, stomp: false };
    let t = 0, prev = {};
    const level = cmd.startsWith('auto') ? (cmd.split(':')[1] || 'normal') : null;
    const brain = level ? new window.__BotBrain(0, level, 777) : null;
    s.bots[0] = {
      decide(w, dt) {
        t += dt;
        if (brain) return brain.decide(w, dt);
        const me = w.players[0], out = { ...NO };
        if (!me || !me.alive) return out;
        const foes = w.players.filter(p => p !== me && p.alive && !(w.mode === 'teams' && p.team === me.team));
        const near = (arr) => arr.reduce((b, o) => { const d = Math.hypot(o.x - me.x, o.y - me.y); return d < b.d ? { o, d } : b; }, { o: null, d: 1e9 });
        const f = near(foes);
        const to = (x, y, k = 1) => { const dx = x - me.x, dy = y - me.y, d = Math.hypot(dx, dy) || 1; out.mx += dx / d * k; out.my += dy / d * k; };
        // stay away from the edges unless told otherwise
        const cx = 640, cy = 380, ed = Math.min(me.x - 100, 1180 - me.x, me.y - 90, 670 - me.y);
        if (ed < 70) to(cx, cy, 1.5);
        const [verb, arg] = cmd.split(':');
        const press = k => { out[k] = !prev[k]; };
        if (verb === 'attack' && f.o) {
          out.aimX = f.o.x - me.x; out.aimY = f.o.y - me.y;
          if (me.kaijuT > 0) { to(f.o.x, f.o.y, 1.4); if (f.d < 220) press('swipe'); }
          else if (me.holding !== null) {
            if (f.d < 70) press('swipe'); else if (f.d < 420) { out.throw = (t % 0.9) < 0.45; } else to(f.o.x, f.o.y);
            if (f.d < 200) to(me.x - (f.o.x - me.x), me.y - (f.o.y - me.y), 0.5);
          } else {
            const c = near(w.cutlery.filter(c => c.state === 'stuck'));
            if (c.o) to(c.o.x, c.o.y); else { to(f.o.x, f.o.y); if (f.d < 90) press('dash'); }
          }
        } else if (verb === 'grab') { const c = near(w.cutlery.filter(c => c.state === 'stuck')); if (c.o) to(c.o.x, c.o.y, 1.3); }
        else if (verb === 'crumbs') { const c = near(w.crumbs); if (c.o) to(c.o.x, c.o.y, 1.3); }
        else if (verb === 'flee' && f.o) { to(me.x - (f.o.x - me.x), me.y - (f.o.y - me.y)); if (f.d < 120) press('dash'); }
        else if (verb === 'stomp') { press('stomp'); }
        else if (verb === 'power' && f.o) { out.aimX = f.o.x - me.x; out.aimY = f.o.y - me.y; to(f.o.x, f.o.y); press('swipe'); }
        else if (verb === 'dash') { const [dx, dy] = (arg || '1,0').split(',').map(Number); out.mx = dx; out.my = dy; press('dash'); }
        else if (verb === 'move') { const [dx, dy] = (arg || '0,0').split(',').map(Number); out.mx = dx; out.my = dy; }
        else if (verb === 'shove' && f.o) { to(f.o.x, f.o.y, 1.3); if (f.d < 110) press('dash'); }
        prev = { throw: out.throw, swipe: out.swipe, dash: out.dash, stomp: out.stomp };
        return out;
      },
    };
    return true;
  }, cmd);
}

async function collectEvents(fn) {
  await pg.evaluate(() => { const s = window.__game.scene.getScene('game'); window.__evlog = []; if (s?.world && !s.__wrapped) { const d = s.world.drainEvents.bind(s.world); s.world.drainEvents = () => { const e = d(); for (const x of e) if (['ko', 'roundEnd', 'matchEnd', 'kaiju', 'power', 'powerPick', 'pickup'].includes(x.type)) window.__evlog.push(x); return e; }; s.__wrapped = true; } });
  await fn();
  return pg.evaluate(() => {
    const s = window.__game.scene.getScene('game'), n = id => (id === 0 ? 'YOU' : s?.world?.players[id]?.name ?? `#${id}`);
    return (window.__evlog ?? []).slice(-25).map(e => e.type === 'ko' ? `${n(e.id)} knocked out${e.by !== null && e.by !== undefined ? ' by ' + n(e.by) : ''} (${e.cause})` : e.type === 'roundEnd' ? `ROUND OVER (winner: ${e.winner === null ? 'nobody' : n(e.winner)})` : e.type === 'matchEnd' ? `MATCH OVER (winner: ${n(e.winner)})` : e.type === 'kaiju' ? `${n(e.id)} went KAIJU` : e.type === 'power' ? `${n(e.id)} used a KAIJU power` : `${n(e.id)} ${e.type}`);
  });
}

// ---------------------------------------------------------------- HTTP API
const HELP = `Kitchen Kaiju playtest API (the game is FROZEN between your commands). All GET.
/look                     -> what screen you're on + every visible text with [x,y] position (1280x720 coords)
/shot                     -> saves a screenshot, returns its file path (open it with your Read tool to see the screen)
/click?x=..&y=..          -> click/tap at game coords, then /look
/key?k=Enter              -> press a key (Enter, Escape, Space, ArrowLeft, Digit1, KeyM, ...), then /look
/state                    -> in a match: phase, round, you, rivals, nearby cutlery, dangers, edge distance
/act?cmd=..&secs=1.5      -> in a match: run the game for secs (0.3-4) with you doing cmd, returns events + state.
   cmds: attack (grab cutlery, then throw/swipe at nearest rival) | grab | crumbs (eat crumbs to fill belly)
         flee | shove (dash into nearest rival) | stomp (go KAIJU when belly=100) | power (KAIJU power at nearest)
         dash:dx,dy | move:dx,dy (e.g. move:-1,0.5) | auto:easy|normal|hard (a bot plays for you)
   Rounds/matches advance by themselves; between rounds just /act again. After a match use /look and click buttons.
/autoplay?n=3&level=normal -> plays your NEXT n matches quickly with a bot in your seat (for grinding progress);
                              start each match yourself first (from a setup screen) or it starts Free Play for you.
/errors                   -> any JavaScript errors seen so far (report them as bugs!)`;

const handlers = {
  async help() { return HELP; },
  async look() { return JSON.stringify(await summary(), null, 1); },
  async shot() { const f = `${OUT}/shot-${++shotN}.png`; await pg.screenshot({ path: f }); return f; },
  async click(q) {
    await thaw();
    const box = await pg.locator('canvas').boundingBox();
    await pg.mouse.click(box.x + (+q.x / 1280) * box.width, box.y + (+q.y / 720) * box.height);
    await wait(900);
    await freeze();
    return JSON.stringify(await summary(), null, 1);
  },
  async key(q) { await thaw(); await pg.keyboard.press(q.k ?? 'Enter'); await wait(900); await freeze(); return JSON.stringify(await summary(), null, 1); },
  async state() { const s = await matchState(); return s ? JSON.stringify(s, null, 1) : 'Not in a match. Use /look.'; },
  async act(q) {
    const secs = Math.max(0.3, Math.min(4, +(q.secs ?? 1.5)));
    if (!(await drive(q.cmd ?? 'attack'))) return 'Not in a match. Use /look.';
    const ev = await collectEvents(async () => { await thaw(); await wait(secs * 1000); await freeze(); });
    const st = await matchState();
    return JSON.stringify({ events: ev, state: st ?? '(match finished — use /look)' }, null, 1);
  },
  async autoplay(q) {
    const n = Math.max(1, Math.min(10, +(q.n ?? 1))), level = q.level ?? 'normal', results = [];
    for (let k = 0; k < n; k++) {
      let st = await matchState();
      if (!st || st.phase === 'matchEnd') {
        await thaw();
        await pg.evaluate(() => { const g = window.__game; g.scene.getScenes(true).forEach(s => s.scene.stop()); });
        await wait(300);
        await pg.evaluate(() => window.__game.scene.start('game', { slots: [{ kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }], difficulty: 'normal', species: [0, 1, 2, 3].map(() => Math.floor(Math.random() * 16)), tables: null, rounds: 3 }));
        await wait(1500);
      }
      await pg.evaluate(() => { window.__kkSpeed = 6; });
      await thaw();
      for (let i = 0; i < 240; i++) {
        await drive(`auto:${level}`);
        await wait(500);
        st = await matchState();
        if (!st || st.phase === 'matchEnd') break;
      }
      await pg.evaluate(() => { window.__kkSpeed = 1; });
      await wait(400);
      await freeze();
      results.push(st ? `match ${k + 1}: winner ${st.winner}, your KOs ${st.you?.kos}` : `match ${k + 1}: left the match screen`);
    }
    return results.join('\n') + '\n' + JSON.stringify(await summary(), null, 1);
  },
  async errors() { return errors.length ? errors.join('\n') : 'none'; },
};

http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'), name = u.pathname.slice(1) || 'help', q = Object.fromEntries(u.searchParams);
  try {
    const body = handlers[name] ? await handlers[name](q) : `unknown command. ${HELP}`;
    res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }); res.end(body);
  } catch (e) { res.writeHead(500); res.end(`error: ${e.message}`); }
}).listen(PORT, () => console.log(`playtest server on http://localhost:${PORT} (out: ${OUT})`));
await freeze();
process.on('SIGTERM', async () => { await browser.close(); preview.kill(); process.exit(0); });
