// 🔎 Text-fit audit: visits every screen/state of the built game and flags text that runs off screen,
// spills out of its button, or overlaps other text. Usage: npm run build && node scripts/text-audit.mjs
// Screenshots of flagged screens go to art-src/.audit/. EASY TO EXTEND: add states to STATES below.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import { chromium } from 'playwright-core';

const wait = ms => new Promise(r => setTimeout(r, ms));
// TOUCH=1 audits the phone layout (?touch, phone-shaped screen, on-screen controls) into art-src/.audit-touch
const TOUCH = !!process.env.TOUCH;
// KID=1 audits with Kid Mode on (bigger text) into art-src/.audit-kid
const KID = !!process.env.KID;
const OUT = KID ? 'art-src/.audit-kid' : TOUCH ? 'art-src/.audit-touch' : 'art-src/.audit';
fs.mkdirSync(OUT, { recursive: true });
const pv = spawn(process.execPath, ['node_modules/vite/bin/vite.js', 'preview', '--port', KID ? '7346' : TOUCH ? '7343' : '7340', '--strictPort'], { stdio: 'ignore' });
await wait(2500);
const exe = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', '/opt/pw-browsers/chromium'].find(p => fs.existsSync(p));
const browser = await chromium.launch({ executablePath: exe, headless: true });
const pg = await (await browser.newContext(TOUCH ? { viewport: { width: 1000, height: 462 }, deviceScaleFactor: 1, hasTouch: true, isMobile: true } : { viewport: { width: 1280, height: 720 } })).newPage();
const errs = []; pg.on('pageerror', e => errs.push(e.message));
await pg.goto(`http://localhost:${KID ? 7346 : TOUCH ? 7343 : 7340}/` + (TOUCH ? '?touch' : '')); await wait(6000);

// a lived-in save so locked/unlocked/progress texts all show up
await pg.evaluate((KIDMODE) => {
  localStorage.setItem('kk-meta-v1', JSON.stringify({ tokens: 1260, earned: 2000, xp: { 0: 200, 3: 950 }, week: '', orders: {}, done: [], kaijuWonThisWeek: [], owned: ['peach'], dailyMedal: { date: '', medal: 0 } }));
  if (KIDMODE) localStorage.setItem('kk-settings-v1', JSON.stringify({ kidMode: true }));
  localStorage.setItem('kk-stats-v1', JSON.stringify({ matches: 12, wins: 5, roundsWon: 20, kos: 33, crumbs: 400, kaijuForms: 6, pops: 2, streak: 1, bestStreak: 3, gauntlet: 4, cups: 0, blends: 1, twistWins: 0, flawless: 0, bestRampage: 1, modeWins: { teams: 1 }, kaijuWins: { 0: 3 }, kaijuPlays: { 0: 8, 1: 4 }, tables: [0, 1, 2], achieved: ['first-win', 'teams'] }));
}, KID);
await pg.reload(); await wait(6000); // the game reads the save and settings at boot

const issues = [];
let shotN = 0;
async function audit(name) {
  await wait(250);
  const found = await pg.evaluate(() => {
    const g = window.__game, out = [];
    const texts = [], buttons = [], dom = [];
    const inter = (a, b) => { const ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x), iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y); return ix > 2 && iy > 2 ? ix * iy : 0; };
    const inside = (a, b, m = 3) => a.x >= b.x - m && a.y >= b.y - m && a.x + a.w <= b.x + b.w + m && a.y + a.h <= b.y + b.h + m;
    for (const s of g.scene.getScenes(true)) for (const o of s.children.list) {
      // buttons = interactive zones that are switched on (Button.setVisible(false) disables them)
      if (o.type === 'Zone' && o.input?.enabled && o.visible !== false) { const b = o.getBounds(); if (b.width > 8 && b.height > 8 && b.width * b.height < 0.6 * 1280 * 720 && !buttons.some(q => q.x === b.x && q.y === b.y && q.w === b.width && q.h === b.height)) buttons.push({ x: b.x, y: b.y, w: b.width, h: b.height, d: o.depth }); continue; }
      if (o.type !== 'Text' || !o.visible || o.alpha < 0.25 || !o.text?.trim()) continue;
      const b = o.getBounds();
      if (b.width < 2) continue;
      // trim the text's own padding so glow/shadow padding doesn't count as overlap
      const p = o.padding ?? {}, sx = o.scaleX, sy = o.scaleY;
      const box = { x: b.x + (p.left ?? 0) * sx, y: b.y + (p.top ?? 0) * sy, w: b.width - ((p.left ?? 0) + (p.right ?? 0)) * sx, h: b.height - ((p.top ?? 0) + (p.bottom ?? 0)) * sy };
      const ww = o.style?.wordWrapWidth;
      if (ww && box.w > ww * sx + 6) out.push(`TOO WIDE FOR ITS BOX "${o.text.replace(/\s+/g, ' ').slice(0, 50)}" (${Math.round(box.w)} > ${Math.round(ww * sx)})`);
      texts.push({ t: o.text.replace(/\s+/g, ' ').slice(0, 60), ...box, d: o.depth });
    }
    // 📱 the phone's HTML controls (FULL SCREEN, joystick, THROW/SWIPE/DASH/STOMP, pills) in game coordinates
    const cv = document.querySelector('canvas')?.getBoundingClientRect();
    if (cv) for (const el of document.querySelectorAll('#tc .layer.on .btn, #tc .layer.on .small, #tc .layer.on .pill, #tc .layer.on #joybase, #tc .layer.on .fsbtn')) {
      const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
      if (!r.width || !r.height || cs.display === 'none' || cs.visibility === 'hidden' || Number(cs.opacity) < 0.2) continue;
      dom.push({ t: (el.textContent || el.id || 'control').trim().slice(0, 20), x: (r.left - cv.left) * 1280 / cv.width, y: (r.top - cv.top) * 720 / cv.height, w: r.width * 1280 / cv.width, h: r.height * 720 / cv.height });
    }
    for (const a of texts) {
      if (a.x < -2 || a.y < -2 || a.x + a.w > 1282 || a.y + a.h > 722) out.push(`OFF-SCREEN "${a.t}" [${Math.round(a.x)},${Math.round(a.y)} ${Math.round(a.w)}x${Math.round(a.h)}]`);
    }
    // text × text
    for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
      const a = texts[i], b = texts[j];
      if (Math.abs(a.d - b.d) > 3) continue; // different layers (e.g. a panel over the screen) are fine
      const k = inter(a, b) / Math.min(a.w * a.h, b.w * b.h);
      if (k > 0.08) out.push(`TEXT OVERLAP "${a.t}" × "${b.t}" (${Math.round(k * 100)}%)`);
    }
    // button × button (two clickable things on top of each other)
    for (let i = 0; i < buttons.length; i++) for (let j = i + 1; j < buttons.length; j++) {
      const a = buttons[i], b = buttons[j];
      if (Math.abs(a.d - b.d) > 6) continue; // an overlay panel's buttons sit above the screen's on purpose
      const k = inter(a, b) / Math.min(a.w * a.h, b.w * b.h);
      if (k > 0.04) out.push(`BUTTON OVERLAP [${Math.round(a.x)},${Math.round(a.y)} ${Math.round(a.w)}x${Math.round(a.h)}] × [${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.w)}x${Math.round(b.h)}] (${Math.round(k * 100)}%)`);
    }
    // text half on / half off a button (labels sit fully inside their own button)
    for (const t of texts) for (const b of buttons) {
      if (t.d < b.d - 6 || t.d > b.d + 8) continue;
      const a = inter(t, b);
      if (a > 0.1 * t.w * t.h && !inside(t, b)) out.push(`TEXT CROSSES A BUTTON EDGE "${t.t}"`);
    }
    // phone controls covering game text or buttons
    for (const c of dom) {
      for (const t of texts) if (inter(c, t) > 0.02 * Math.min(c.w * c.h, t.w * t.h)) out.push(`PHONE CONTROL "${c.t}" COVERS TEXT "${t.t}"`);
      for (const b of buttons) if (inter(c, b) > 0.15 * Math.min(c.w * c.h, b.w * b.h)) out.push(`PHONE CONTROL "${c.t}" COVERS A BUTTON [${Math.round(b.x)},${Math.round(b.y)}]`);
    }
    for (let i = 0; i < dom.length; i++) for (let j = i + 1; j < dom.length; j++) if (inter(dom[i], dom[j]) > 4) out.push(`PHONE CONTROLS OVERLAP "${dom[i].t}" × "${dom[j].t}"`);
    return [...new Set(out)];
  });
  if (process.env.ALL) await pg.screenshot({ path: `${OUT}/all-${String(++shotN).padStart(3, '0')}-${name.replace(/[^a-z0-9]+/gi, '-')}.png` });
  if (found.length) {
    const file = `${OUT}/${name.replace(/[^a-z0-9]+/gi, '-')}.png`;
    await pg.screenshot({ path: file });
    issues.push({ name, file, found });
  }
  console.log(`${found.length ? '✗' : '✓'} ${name}${found.length ? '  (' + found.length + ')' : ''}`);
}
const start = async (key, data = {}, ms = TOUCH ? 2600 : 1500) => {
  await pg.evaluate(([k, d]) => {
    const g = window.__game, sc = g.scene.getScene(k);
    for (const s of g.scene.getScenes(true)) if (s.scene.key !== k) s.scene.stop();
    if (sc && sc.scene.isActive()) sc.scene.restart(d); else g.scene.start(k, d);
  }, [key, data]);
  await wait(ms);
  // wait until the scene is really running and has drawn things (never audit an empty screen)
  for (let i = 0; i < 30; i++) { const ok = await pg.evaluate(k => { const s = window.__game.scene.getScene(k); return !!s && s.scene.isActive() && s.children.list.length > 5; }, key); if (ok) break; await wait(300); }
  await wait(300);
};
const scene = k => `window.__game.scene.getScene('${k}')`;

await start('title', {}, 2500); await audit('title');
for (const s of ['settings', 'help', 'controls', 'padcontrols', 'records', 'pantry', 'workshop', 'lobby', 'trials']) { await start(s); await audit(s); }
// records page 2
await start('records'); await pg.evaluate(() => { const r = window.__game.scene.getScene('records'); r.buttons[0]?.press(); }); await audit('records page 2');
// help pages (press every button that looks like a page/tab)
await start('help'); for (let k = 0; k < 6; k++) { const n = await pg.evaluate(k => { const h = window.__game.scene.getScene('help'); const b = h.buttons[k]; if (!b) return null; b.press(); return b.label.text; }, k); if (n === null) break; await audit(`help tab ${n}`); }
// gallery: every kaiju + colour hover
await start('gallery');
for (let i = 0; i < 20; i++) { await pg.evaluate(i => { const s = window.__game.scene.getScene('gallery'); s.nav.index = i; s.showDetail(i, false); }, i); await audit(`gallery kaiju ${i}`); }
for (let k = 0; k < 19; k++) { const ok = await pg.evaluate(k => { const s = window.__game.scene.getScene('gallery'); if (!s.colIcons?.[k]) return false; s.nav.index = 20 + k; return true; }, k); if (!ok) break; await wait(80); await audit(`gallery colour ${k}`); }
// setup screens
await start('menu', {}, 1800); await audit('free play setup');
await start('menu', { party: true, mode: 'teams' }, 1800); await audit('party setup');
for (const m of ['crumbRush', 'hotDumpling', 'goldenSpoon', 'king', 'football', 'horde']) { await start('menu', { party: true, mode: m }, 1500); await audit(`party setup ${m}`); }
await start('menu', { party: true, mode: 'teams', slots: [0, 1, 2, 3, 4, 5].map(i => ({ kind: 'bot', index: i })), species: [0, 1, 2, 3, 4, 5] }, 1800); await audit('party setup 6 seats');
await pg.mouse.click(262, 690); await wait(500); await audit('house rules panel');
await start('menu', {}, 1500); await pg.mouse.click(92, 690); await wait(400); await audit('keys panel');
await start('menu', { party: true, mode: 'teams' }, 1500); await pg.evaluate(() => window.__game.scene.getScene('menu').toggleTwists()); await wait(400); await audit('twist picker');
await pg.evaluate(() => { const m = window.__game.scene.getScene('menu'); const b = m.twistUi.find(u => u.label && /TRY IT/.test(u.label.text)); b?.press(); }); await wait(300); await audit('twist picker try it');
await start('menu', {}, 1500); await pg.evaluate(() => window.__game.scene.getScene('menu').toggleTables()); await wait(400); await audit('table picker');
await start('menu', {}, 1500); await pg.evaluate(() => window.__game.scene.getScene('menu').toggleBots()); await wait(400); await audit('bot level picker');
await start('menu', { party: true, mode: 'teams' }, 1500); await pg.evaluate(() => { const M = window.__game.scene.getScene('menu').constructor; M.cupOn = true; }); await wait(500); await audit('party setup cup on'); await pg.evaluate(() => { const M = window.__game.scene.getScene('menu').constructor; M.cupOn = false; });
await start('story', {}, 2000); await pg.evaluate(() => window.__game.scene.getScene('story').showLog()); await wait(400); await audit('story log');
await start('story', {}, 2000); await pg.evaluate(() => window.__game.scene.getScene('story').showRewards()); await wait(400); await audit('story rewards');
// story
await start('story', {}, 2500); await audit('story map');
await start('story', { campaign: 'seconds' }, 2500); await audit('story map seconds');
await start('story', { campaign: 'night' }, 2500); await pg.evaluate(() => { const s = window.__game.scene.getScene('story'); if (s.mode === 'cut') s.endCut(); }); await wait(600); await audit('story map night');
await start('story', { campaign: 'side-pizza' }, 2500); await pg.evaluate(() => { const s = window.__game.scene.getScene('story'); if (s.mode === 'cut') s.endCut(); }); await wait(600); await audit('story map side story');
await start('story', {}, 2500); await pg.evaluate(() => { const s = window.__game.scene.getScene('story'); if (s.mode === 'cut') s.endCut(); s.showCampaigns(); }); await wait(600); await audit('story campaigns picker');
await start('story', { campaign: 'room' }, 2500); await pg.evaluate(() => { const s = window.__game.scene.getScene('story'); if (s.mode === 'cut') s.endCut(); }); await wait(600); await audit('story map room');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); g.scene.start('game', { slots: [{ kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }], difficulty: 'easy', species: [0, 1, 2], tables: [0], rounds: 2, zone: { x: 640, y: 382, r: 115, hold: 15 } }); }); await wait(4500); await audit('king of the plate HUD');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); g.scene.start('game', { slots: [{ kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }], difficulty: 'easy', species: [0, 16, 2], tables: [9], rounds: 2, mode: 'teams', teams: [0, 0, 1], vip: 1 }); }); await wait(4500); await audit('protect HUD');
// story dialogue + result cards
await start('story', {}, 2500); await pg.evaluate(() => { const s = window.__game.scene.getScene('story'); s.sel = 3; const ch = s.camp.chapters[3]; s.lines = [...ch.intro, { speaker: 'chef', text: 'TIP: ' + ch.tip }]; s.startDialogue(ch.rivals.map(r => r.species), () => {}); s.lineShown = 999; }); await wait(1500); await audit('story dialogue');
await start('story', { result: { chapter: 0, won: true, stars: 2, campaign: 'main', myRounds: 2, myKos: 3, myKaiju: 1, receipt: ['🪙 +32 Chef Tokens (1292)', '⬆ Mastery Lv 3 Sous Chef · 40/160 XP'] } }, 3000); await pg.keyboard.press('Escape'); await wait(800); await audit('story result win');
await start('story', { result: { chapter: 3, won: false, stars: 0, campaign: 'main', myRounds: 1, myKos: 1, myKaiju: 0, myOut: 'kaiju' } }, 3000); await audit('story result defeat');
await start('story', { result: { chapter: 1, won: false, stars: 0, campaign: 'seconds', myRounds: 0, myKos: 0, myKaiju: 0, myOut: 'fall' } }, 3000); await audit('seconds result defeat');
// matches
const six = { slots: [{ kind: 'kb', index: 0 }, ...[1, 2, 3, 4, 5].map(i => ({ kind: 'bot', index: i }))], difficulty: 'easy', species: [0, 1, 2, 3, 4, 5], rounds: 3 };
for (const mode of ['classic', 'teams', 'crumbRush', 'hotDumpling', 'goldenSpoon', 'king', 'football', 'horde']) {
  await start('game', { ...six, mode, party: mode !== 'classic' }, 700); await audit(`${mode} countdown`);
  await wait(2500); await audit(`${mode} play HUD`);
  await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.endRound([w.players[1]]); }); await wait(600); await audit(`${mode} round end`);
  await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(4000); await audit(`${mode} match end`);
}
await start('game', { ...six, mode: 'classic', cup: { game: 0, points: [0, 0, 0, 0, 0, 0] } }, 3000);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(4000); await audit('cup game result');
await start('game', { ...six, mode: 'crumbRush', rounds: 1, cup: { game: 2, points: [5, 3, 2, 1, 0, 0], hist: [[5, 0, 0, 1, 0, 0], [0, 3, 2, 0, 0, 0]] } }, 3000);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players.forEach((p, i) => { p.pts = 10 - i; }); w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(4000); await audit('cup crumb rush history');
// challenges chooser on the title
await start('title', {}, 1500); await pg.evaluate(() => { const t = window.__game.scene.getScene('title'); t.challenges(0); }); await audit('challenges chooser');
await start('title', {}, 1500); await pg.evaluate(() => { window.__game.scene.getScene('title').dailyCard(); }); await wait(300); await audit('daily preview card');
await pg.evaluate(() => { localStorage.setItem('kk-name', 'Pat'); const t = window.__game.scene.getScene('title'); t.friendBoard(); }); await wait(400); await audit('daily friend board');
await start('records', {}, 2500); await pg.evaluate(() => { window.__game.scene.getScene('records').toggleGoals(); }); await wait(800); await audit('records goals board');
// 🗝 Dinner Dungeon: start screen, map, pantry and shop overlays
await pg.evaluate(() => localStorage.removeItem('kk-dungeon-v1')); await start('dungeon', {}, 1500); await audit('dungeon start');
await pg.evaluate(() => { const d = window.__game.scene.getScene('dungeon'); d.buttons.find(b => b.label.text.includes('START')).o.onClick(); }); await wait(1500); await audit('dungeon map');
await pg.evaluate(() => { const r = JSON.parse(localStorage.getItem('kk-dungeon-v1')); r.relics = ['holster', 'boots', 'piggy', 'doggybag', 'mustard', 'breakfast']; r.treasure = ['scoopbelt', 'sugar', 'mitts']; localStorage.setItem('kk-dungeon-v1', JSON.stringify(r)); window.__game.scene.getScene('dungeon').scene.restart({ msg: '💔 Lost the room. 2 lives left. Try a different path?' }); }); await wait(1200); await audit('dungeon pantry');
await pg.evaluate(() => { const r = JSON.parse(localStorage.getItem('kk-dungeon-v1')); r.treasure = undefined; r.coins = 80; r.shop = { offers: ['soda', 'gravy', 'magnet'], bought: ['gravy'], healed: false }; localStorage.setItem('kk-dungeon-v1', JSON.stringify(r)); window.__game.scene.getScene('dungeon').scene.restart({}); }); await wait(1200); await audit('dungeon shop');
await pg.evaluate(() => localStorage.removeItem('kk-dungeon-v1'));
// trial result + move lab + cup final
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; g.scene.start('game', GS.trialData('crowd')); }); await wait(3500); await audit('trial countdown');
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[0].score = w.opts.target - 1; w.endRound([w.players[0]]); }); await wait(4000); await audit('trial result');
await pg.evaluate(six => { const g = window.__game; g.scene.getScene('game').scene.restart({ ...six, mode: 'classic', party: true, cup: { game: 5, points: [10, 8, 6, 4, 2, 0] } }); }, six); await wait(3500);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[2].score = w.opts.target - 1; w.endRound([w.players[2]]); }); await wait(4000); await audit('cup final');
await pg.evaluate(() => { const g = window.__game; const GS = g.scene.getScene('game').constructor; g.scene.getScene('game').scene.restart(GS.labData(3)); }); await wait(3500); await audit('move lab');
await pg.evaluate(() => { const g = window.__game; const GS = g.scene.getScene('game').constructor; g.scene.getScene('game').scene.restart({ ...GS.practiceData(0), from: 'title' }); }); await wait(2500); await pg.evaluate(() => { const gs = window.__game.scene.getScene('game'); gs.practice.done = gs.practice.done.map(() => true); gs.practiceDone(); }); await wait(1500); await audit('practice complete card');
// gauntlet / daily / pause
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; g.scene.start('game', GS.gauntletWave(5, 0, { kind: 'kb', index: 0 })); }); await wait(700); await audit('gauntlet countdown');
await wait(2500); await audit('gauntlet HUD');
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(3500); await audit('gauntlet life lost');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; g.scene.start('game', GS.gauntletWave(4, 0, { kind: 'kb', index: 0 })); }); await wait(3000);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[0].score = w.opts.target - 1; w.endRound([w.players[0]]); }); await wait(3500); await audit('gauntlet wave cleared');
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; }); 
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; const d = GS.gauntletWave(7, 0, { kind: 'kb', index: 0 }); d.gauntlet.lives = 1; d.gauntlet.perks = ['belly', 'shield', 'ghost']; g.scene.start('game', d); }); await wait(3500);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(4000); await audit('gauntlet over');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; g.scene.start('game', GS.dailyData()); }); await wait(700); await audit('daily countdown');
await wait(2500); await pg.keyboard.press('Escape'); await wait(500); await audit('pause menu');
await pg.keyboard.press('Escape'); await wait(300);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; w.players[1].score = w.opts.target - 1; w.endRound([w.players[1]]); }); await wait(4000); await audit('daily result');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); const GS = g.scene.getScene('game').constructor; g.scene.start('game', { ...GS.practiceData(0), from: 'title' }); }); await wait(3000); await audit('practice');
await pg.evaluate(() => { const g = window.__game; for (const s of g.scene.getScenes(true)) s.scene.stop(); g.scene.start('game', { slots: [{ kind: 'kb', index: 0 }, { kind: 'bot', index: 0 }, { kind: 'bot', index: 0 }], difficulty: 'easy', species: [0, 1, 2], tables: [0], rounds: 3 }); }); await wait(4500);
await pg.evaluate(() => { const w = window.__game.scene.getScene('game').world; const p = w.players[1]; p.meter = 100; w.becomeKaiju(p); }); await wait(120); await audit('kaiju growing ring');
await start('workshop', {}, 1500); await pg.evaluate(() => { const ws = window.__game.scene.getScene('workshop'); ws.cycleHazard(); ws.cycleHazard(); ws.cycleHazard(); ws.cycleHazard(); }); await wait(300); await audit('workshop hazard info');

fs.writeFileSync(`${OUT}/report.json`, JSON.stringify(issues, null, 1));
console.log(`\n${issues.length} screen(s) with problems · JS errors: ${errs.length ? errs.join(' | ') : 'none'}`);
for (const i of issues) { console.log(`\n## ${i.name}  (${i.file})`); for (const f of i.found.slice(0, 12)) console.log('  - ' + f); }
await browser.close(); pv.kill();
