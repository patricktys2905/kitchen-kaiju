# Kitchen Kaiju

Tiny monsters brawl on a giant dinner table with throwable cutlery. Local multiplayer for 2–4 players (keyboards + gamepads), bots fill empty seats.

## Play

Double-click `start.cmd`, or:

```
npm install
npm run dev      # opens on http://localhost:5180
```

`?demo=4` in the URL starts a bot-only match (attract mode).

### On a phone or tablet (same Wi-Fi as the PC)

1. On the PC run `npm run dev` (or `start.cmd`). The terminal prints a **Network:** address, e.g. `http://192.168.68.200:5180/`. Allow Node through Windows Firewall (private networks) if asked.
2. Open that address on the phone and hold it sideways.
3. Touch controls: drag anywhere on the **left half** to move · **THROW**: hold to charge, drag away from the button to aim, let go to throw (without dragging it aims at the rival you're facing) · **SWIPE**, **DASH**, **STOMP** (glows when your belly is full) · PAUSE / MENU top right.
4. Menu buttons: JOIN/LEAVE (touch), + BOT, − BOT, bot difficulty, PLAY.

Tips: Android Chrome goes fullscreen on the first tap. On iPhone, use Share → **Add to Home Screen** for a full-screen launch. Bluetooth gamepads paired to the phone work too. Add `?touch=1` on a PC to try the touch UI with a mouse.

## Controls

| Action | Keyboard Left | Keyboard Right | Gamepad |
|---|---|---|---|
| Move | WASD | Arrows | Left stick / D-pad |
| Aim | (move direction) | (move direction) | Right stick |
| Throw (hold = charge) | Space | Enter / Numpad 0 | A / RT |
| Swipe | F | / / Numpad 1 | X |
| Dash | Left Shift | Right Shift / Numpad 2 | B / RB |
| Stomp (meter full) | E | . / Numpad 3 | Y / LB |

Menu: THROW joins, DASH leaves, B/N add/remove bot, D bot difficulty, 1 or START begins. In game: P pause, Esc menu.

## Rules (phases 1–2)

- Cutlery sticks where it lands. Anyone can pick up loose cutlery (stealing!). After 4s it slides back to its unarmed owner.
- Fork, Spoon (one ricochet; can hit you), Butter Knife (fast, short), Chopsticks (two at once), Ladle (slow, plows through), Spork (rare pickup, boomerangs).
- Swipe has a short telegraphed wind-up and parries flying cutlery.
- Dash bumps rivals (and off the table edge); dash into enemy cutlery while unarmed to catch it.
- Crumbs fill the belly meter → Stomp → 5s KAIJU: huge, immune to cutlery, squashes on contact, shockwave steps.
- The giant hand sweeps a lane (1.4s warning) aimed at the biggest kaiju / fullest belly. After 45s it comes much more often.
- First to 5 round wins.

## Code layout

- `src/sim/` — pure TypeScript rules engine (no Phaser). `world.ts` is the simulation, `bot.ts` the AI, `constants.ts` all tuning numbers.
- `src/render/draw.ts` — shapes-first art (swap for sprites later).
- `src/scenes/` — Phaser menu + game scenes (HUD, effects, sound hooks).
- `src/input.ts`, `src/audio.ts` — keyboard/gamepad and synth SFX.

## Checks

```
npm test          # rules tests incl. full 4-bot matches
npm run build     # typecheck + production build
npm run smoke     # headless browser playthrough + screenshots (needs Edge/Chrome)
npm run smoke:phone  # emulated phone with multi-touch: menu, joystick, aim-drag throw, dash, rotate prompt
npm run balance   # simulate 12 bot matches: pacing + KO-cause mix  (args: easy|normal|hard, players)
npx vite-node scripts/accuracy.ts   # how hard each bot level is to survive against
```
