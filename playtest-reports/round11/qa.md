# Playtest evaluation — The QA Tester (profile 10, round 11, port 7110)

**Fun score: 8.0 / 10** (very stable: 0 JavaScript errors across ~115 commands and a lot of Escape / double-click / mid-countdown abuse. What holds it below 9 is a handful of overlaps, one Escape-routing bug, a few mislabelled or hidden states, and tiny text on dense screens.)

## What I did
- ~115 harness commands. /errors checked at the start, middle and end: always `none`.
- Title, then Story map (ch 1 cutscene with Escape to skip, played ch 1 vs Crabbage and won 3 stars, Chapter Clear card, Escape and Enter spam on the map).
- In-match pause: Esc, RESUME, RESTART, MUSIC / SOUND, QUIT (two-tap confirm), Esc to cancel the confirm, Esc during the 3-2-1 countdown.
- Records (stats, GOALS modal, PIN, Esc while the modal is open), Settings (sound/music sliders, Keyboard Controls rebind with a conflicting key, Reset), Help (all 5 tabs), Pantry (confirm-to-buy, Esc cancel), Workshop (12 prop cap, place on a start spot, toggle-remove, SAVE, PLAY IT, NAME).
- Free Play (6 seats, twist cycle to a double twist, House Rules modal, 6-kaiju MINI KAIJU + KAIJU FRENZY match, KAIJU timer and powers), Gallery (Gobzilla, Squidgeon, Crabbage, a locked card, Move Lab), Party Modes (PLAY with zero seats joined, Party Cup lock, PHONES AS PADS bots-only), Daily card, Challenges card, Trials, Online card.
- Matches: Story ch 1 won 2-0, Workshop 6-kaiju match (quit), Team Feast 1v1 (quit), Cup game 1 (quit), plus 1 autoplay match to see the receipt.

## What worked for me
- Rock solid: zero JS errors despite Esc during cutscene, countdown, pause confirm, modals and the lobby.
- QUIT needs two taps, and Esc safely cancels it. Pantry buys ask once ("Lilac colour? tap again to buy for 70") and Esc cancels.
- Keyboard rebind to an already-used key swaps the two bindings and says so ("A key already in use swaps over."). Reset gives a "Back to the default keys." message.
- The Workshop clamps to 12 props with a clear message, refuses props on start spots, and tapping a prop removes it. The Table Maker unlock fired on first SAVE.
- Party Cup really locks MODE (shows "CUP PICKS") and FIRST TO ("CUP SETS IT") and greys them out. The live RED–BLUE score shows in Team Feast. PHONES AS PADS starts with bots only.
- KAIJU HUD shows seconds left ("KAIJU 4s!"). The Gallery shows "📊 You vs it: 1–0" and the detail panel no longer goes blank. GOALS modal is clear and PIN toggles to PINNED. The Daily preview card and the SPICY button are clear.
- Help BASICS picture cards and the new EXTRAS tab are good.

## 🧾 Exactly what would make this a 9/10 for me
1. **Esc must close the top modal, not the whole screen.** Where: Records with the GOALS modal open (Esc jumped to the title). Should: Esc closes the modal only; a second Esc leaves. Apply the same rule to every overlay (House Rules already does it right). +0.3
2. **Fix the toast and banner overlaps.** Pantry "FIRST SERVICE ✔ Visit the Pantry: +25" sits in the middle of the screen over the Weekly Orders "1/5" counter and over the Peach/Blueberry cards. Put toasts in one reserved strip (for example y=690 or top-centre) that never covers interactive content, and auto-dismiss in under 3 s. +0.3
3. **Stop text overflowing panels.** Gallery detail panel: when the power text wraps to 3 lines (Squidgeon), "Rewards (Lv 2-6)…gold frame · crown · Shiny" runs onto or past the bottom border (y≈686). Allow 3 lines or shrink the art block. Online room modal: the last line ("Press DPZT…") is cut off by the screen bottom. +0.3
4. **Make the match-start state consistent.** Team Feast with twist NONE starts both kaiju at belly 100 ("STOMP READY!" and "BELLY FULL! PRESS E → KAIJU" at second 0). Free Play and Story start at ~25. Either explain it (a "Team Feast: everyone starts full" line on setup) or make it match. +0.2
5. **Do not leak setup between modes.** (a) Workshop PLAY IT permanently sets Free Play's TABLE to "MY TABLE 1" (I only noticed on opening Free Play). (b) Party setup with the Cup ON still shows RED TEAM / BLUE TEAM seat labels from Team Feast; Cup game 1 is Classic. (c) PLAY with zero seats joined silently creates 2 bots with no message. Show the real state: Cup ON means neutral seat colours, and an empty-seat PLAY should say "Added 1 bot" or disable PLAY. +0.2
6. **Raise the minimum font size on dense screens.** Help MODES TWISTS paragraph, the Help EXTRAS power-up icons, the post-match THIS MATCH receipt and the bottom awards line (~12–13 px on a 1280 canvas) are below the "minimum text size" promise. Aim for 16 px or more, and let the receipt scroll or paginate. +0.2
7. **Fix HUD and power-effect crowding in 6-player matches.** The first HUD card (Gobzilla) is clipped at the left screen edge (x=0) with 6 players. When two KAIJU powers fire together, labels ("SEED SPRAY!" / "WOBBLE WAVE!") overprint each other. Stagger or queue the callouts and inset the HUD by ≥12 px. +0.2
8. **Fix the glyphs and labels.** The Workshop NAME icon renders as a dash ("▬ NAME"). The twist button says "KAIJU + FRENZY" while the description says "MINI KAIJU + KAIJU FRENZY" (the button drops "MINI"). The NAME button gives no visible prompt in the harness; make it an in-canvas text entry or show the status. +0.1
9. **Keep state when coming back.** After Move Lab → Esc, the Gallery selection resets to Gobzilla instead of the kaiju I was viewing. Title says "Ch 2/12" while the Story screen says "Chapters 1/12" (next vs cleared, so label it "Next: Ch 2" or show the same number). +0.1

## 🔍 Every issue I saw (exhaustive)
Screenshot paths are under C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7110\.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Records > GOALS modal | Esc with the GOALS modal open leaves Records entirely (straight to the title) instead of closing the modal | shot-13.png | Esc closes the top overlay first |
| 2 | major | Pantry | Toast "FIRST SERVICE ✔ Visit the Pantry: +25" is drawn over the "1/5" counter and over the Peach and Blueberry card text. It stayed in the frozen frame; I could not confirm how long it shows live | shot-24.png | Reserve a toast lane; do not overlap content |
| 3 | major | Gallery detail (Squidgeon) | 3-line power text pushes "Rewards (Lv 2-6)…gold frame · crown · Shiny" to the panel's bottom edge, nearly through the border | shot-43.png | Taller panel or smaller art, or 2-line clamp with a tooltip |
| 4 | major | Online room (Phones as Pads) | Last line "Press DPZT…" is cut by the bottom of the screen; there is no scroll | shot-51.png | Shrink the modal contents or make it scroll |
| 5 | minor | Team Feast round start | Both kaiju start at belly 100 with twist NONE ("STOMP READY!", "BELLY FULL! PRESS E → KAIJU" at 0 s). Other modes start at ~25 | shot-49.png | Explain it or fix it |
| 6 | minor | Workshop > Free Play | Workshop PLAY IT permanently changes Free Play's TABLE to "MY TABLE 1 — Your own table" | shot-34.png | Restore the previous table when the practice match ends, as TRY IT does |
| 7 | minor | Party setup, Cup ON | Seats still show RED TEAM / BLUE TEAM although Cup game 1 is Classic | shot-50.png | Hide the team colours when the mode is not Team Feast |
| 8 | minor | Party setup | PLAY with no seat joined starts a 2-bot match with no message | shot-49.png | Message "Added a bot" or require 1 player |
| 9 | minor | Free Play 6-kaiju match | HUD card 1 (GOBZILLA) is clipped on the left edge. HUD is cramped at 6 players | shot-40.png | Inset by 12 px, reduce card width |
| 10 | minor | In match, double KAIJU powers | "SEED SPRAY!" and "WOBBLE WAVE!" callouts overlap, and ring effects hide the kaiju sprites completely | shot-41.png | Stagger callouts, cap the rings |
| 11 | minor | Free Play setup | TWIST button text "⚡⚡ KAIJU + FRENZY" does not match the description "MINI KAIJU + KAIJU FRENZY" | shot-35.png | Use the same names |
| 12 | minor | Workshop | NAME shows as "▬ NAME" (emoji glyph missing). Pressing it shows no prompt or text field in the harness, so I could not confirm that naming works | shot-29.png | Use an in-canvas text input; a safe icon |
| 13 | minor | Post-match panel | THIS MATCH receipt is ~12 px with many items packed together, and it covers part of the table and art | shot-53.png | Larger text, paginate; make it scrollable so every achievement fits |
| 14 | minor | Post-match | Bottom awards line ("Most KOs … Butterfingers …") is ~12 px and runs along the table edge | shot-53.png | Raise size, wrap to 2 lines |
| 15 | minor | Help > MODES | Twists paragraph is much smaller (~12 px) than the rest of the page | shot-22.png | Same size as the other text; split into lines |
| 16 | polish | Help > EXTRAS | Power-up icons are tiny, and there is a large empty gap between POWER-UPS and HAZARDS on the left column | shot-23.png | Bigger icons; fill or shrink the gap |
| 17 | polish | Gallery | After Move Lab → Esc the selection resets to Gobzilla | shot-45.png | Keep the selected kaiju |
| 18 | polish | Title vs Story | "Ch 2/12" on the title card vs "Chapters 1/12" on the Story map | shot-9.png | One wording |
| 19 | polish | Pause during countdown | The "TWIST: MINI KAIJU + KAIJU FRENZY" banner sits behind the PAUSED title and tangles with it | shot-38.png | Hide the banner while paused |
| 20 | polish | Story map | Chapter 1 thumbnail is a plain plank with a white bar (looks unfinished) | shot-8.png | Real thumbnails |
| 21 | polish | Chapter clear card | Receipt lines are small (~13 px) compared with the headline | shot-8.png | Raise size |
| 22 | polish | Online (DOM overlays) | The Play Online and room modals use a different font from the canvas screens, and /look returns no texts for them | shot-57.png | Use the game font; expose text |
| 23 | polish | Settings | The first row (SOUND EFFECTS) is highlighted and looks larger than the others | shot-15.png | Use an outline highlight only |
| 24 | polish | Records | GOALS says "Tables 13/18" while the stats say "Tables played on 1/18" (different meanings, similar names) | shot-11.png | Rename "Tables played on" to "Tables played" |

## 🔠 Text and layout check
- Title: OK (shot-9.png). NEXT UP card text is small but readable.
- Story map: OK; Chapter Clear card OK apart from small receipt lines (shot-8.png).
- Cutscene: OK (typing text, SKIP button clear) (shot-2.png).
- Pause overlay: OK (shot-4.png); during countdown the twist banner tangles with PAUSED (shot-38.png).
- Records: OK (shot-10.png); GOALS modal OK (shot-11.png, shot-13.png).
- Settings: OK (shot-15.png). Keyboard Controls: OK (shot-16.png, shot-17.png).
- Help BASICS: OK (shot-19.png). CUTLERY: OK (shot-20.png). TABLES: OK (shot-21.png). MODES: small twist text (shot-22.png). EXTRAS: tiny icons and an empty gap (shot-23.png).
- Pantry: PROBLEM, toast overlaps the content (shot-24.png). The confirm state is OK (shot-25.png).
- Workshop: OK except the NAME glyph (shot-27.png to shot-29.png).
- Free Play setup: OK (shot-34.png). House Rules modal: OK (shot-35.png).
- In-match 6-kaiju: PROBLEM, left HUD clipped, callouts overlap (shot-40.png, shot-41.png).
- Gallery: PROBLEM on 3-line power text (shot-43.png). Gobzilla OK (shot-42.png). Crabbage OK (shot-45.png). Locked card OK (shot-44.png).
- Party Modes setup: OK (shot-48.png); Cup ON shows stale team labels (shot-50.png).
- Online room: PROBLEM, bottom line cut (shot-51.png). Online intro: OK (shot-57.png).
- Post-match: PROBLEM, small receipt text over the table (shot-53.png).
- Daily card: OK (shot-54.png). Challenges: OK (shot-55.png). Trials: OK (shot-56.png).
- Not checked: Spicy chapters, Dessert Course, Gauntlet runs, Kid Mode, a phone-sized layout.

## The single biggest structural problem
Overlays are not a single managed stack. Esc, toasts and banners each behave per screen: Esc jumps out of Records past its modal, the Pantry toast lands on top of live counters, the pause screen shares space with the twist banner, and DOM modals (Online) sit outside the canvas text system. A central overlay/toast manager (one layer order, one Esc-pops-top rule, one reserved toast lane) would remove most of what I found in this round.

The second problem is that the game carries state silently between modes (the Workshop table into Free Play, Team Feast seat colours into the Cup, the full belly at start in Team Feast). Each one is small, but a QA tester cannot predict what the next screen will look like.

## Big change proposals (2–3, most important first)
### Proposal 1: Central overlay stack and toast lane
- **Problem it solves:** Esc leaving Records past the GOALS modal, the Pantry toast over content, the banner under PAUSED, the cut-off Online room modal.
- **How it would work (detailed design):** one layer stack. Opening a modal pushes it. Esc and the Back button pop only the top layer; with an empty stack Esc goes back one screen. Toasts live in a fixed 32 px lane at y=688 (centre), queue one at a time, 2.5 s each, never over buttons. Banners (twist, tips) hide while any layer is above the table. DOM modals register as layers and expose their text to /look.
- **Example moment:** In Records I open GOALS, press Esc and the modal closes. I press Esc again and I am on the title. The Pantry "+25" toast slides along the bottom while the orders stay readable.
- **Rewards / progression hooks:** none; pure polish.
- **Risks and edge cases:** modals that need a confirm before closing (QUIT) must keep their own step; gamepad B should pop the stack too.
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 2: Layout audit harness in CI
- **Problem it solves:** each round still finds overflow (Gallery panel, Online room, receipt).
- **How it would work (detailed design):** a script that visits every screen at 1280x720, a phone size and Kid Mode, then for each text object checks bounds against its parent box and the screen, flags text under 14 px, and flags overlapping text boxes. It saves a screenshot for each failure and fails the build. Ship with the longest strings (3-line powers, the longest kaiju name, 6 players, 4-digit coins).
- **Example moment:** the Squidgeon power text is flagged before release because the Rewards line goes past the panel's bottom.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** emoji width differs between fonts; whitelist decorative text.
- **Size:** M
- **Score impact for me:** +0.3

### Proposal 3: Honest setup summary line
- **Problem it solves:** leaked state (Workshop table, Cup team seats, full belly in Team Feast, 0-seat PLAY).
- **How it would work (detailed design):** every setup screen shows a one-line "THIS MATCH:" summary (mode, table, rounds, who is playing, starting belly rule, twist) and PLAY is disabled with a hint when the summary is invalid. Practice and Workshop PLAY IT run with a temporary setup and restore the saved one afterwards.
- **Example moment:** after trying my Workshop table, Free Play still says "TABLE: SUNDAY ROAST".
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** online hosts need to share the same summary.
- **Size:** S
- **Score impact for me:** +0.2

## How this round's new features felt
- **TRY IT / Move Lab:** the Move Lab dummy stood close (dist ~190), and KAIJU did not run away. Setup was not changed. One flaw: the Gallery selection reset after Esc. The Workshop PLAY IT did change Free Play's table.
- **Gallery detail and Shiny:** the panel no longer goes blank; the SHINY button shows "300 🪙 · needs Lv 3". "You vs it: 1–0" showed up for Crabbage. The long-text overflow is the remaining flaw.
- **Receipt:** it lists the Table Maker unlock, tokens, XP, the pinned achievement and a tip, but is tiny and overlaps the table.
- **Cup lock:** works, with clear "CUP PICKS" and "CUP SETS IT" labels. Stale team labels remain.
- **Gauntlet / Trials / Challenges:** the cards are clear ("boss waves: +30 and a heart", weekly best +25). I did not play a Gauntlet run.
- **Daily preview card and SPICY DAILY:** clear, with "HARD rivals · +40" shown.
- **Giant Hand warning:** I did not see a Giant Hand in the matches I played, so I cannot judge it.
- **KAIJU 7 s:** HUD countdown ("KAIJU 4s!", "KAIJU 1s!") works. A short dizzy state followed in Team Feast.
- **Round-start shield:** I did not test it directly.
- **Story:** "Chapters N/12" shows, and the "Meanwhile…" line appears on the clear card. The tip is on the chapter card. Both read well.
- **Records GOALS:** excellent; PIN and PINNED work and the next step per collection is useful.
- **Party:** the time estimate shows on setup (and updates with seats), the live RED–BLUE score shows, Phones-as-Pads starts with bots only (the lobby text is cut off).
- **Help:** BASICS picture cards and the EXTRAS tab are good.
- **Workshop:** 6 slots shown; 12-prop cap works; tomatoes drawn as bumpers; NAME could not be verified.
- **Phone / Kid Mode text:** not tested (desktop only).

## Bugs that block play
- None. Nothing froze, nothing errored, and I could always get back to the title.
