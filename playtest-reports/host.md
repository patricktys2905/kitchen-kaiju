# Playtest evaluation — The Party Host (profile 6, round 10, port 7106)

**Fun score: 7.0 / 10** (the party loop is solid and the Cup is a real hit; but a 6-seat Classic match is long, the setup has no team score or mode rules shown, Online "Phones as Pads" can't start without a friend, and a handful of layout/leak bugs would embarrass me in front of guests)

## What I did
(~100 harness commands, all screenshots under `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7106\`; JS errors: none at start, middle or end)
- Title -> PARTY MODES. Joined 3 seats, toggled Party Cup ON (MODE/FIRST TO greyed), cycled CUP LENGTH (6 -> 3 games), added 3 more bots.
- **Played a full 3-game Party Cup, 6 players:** Game 1 CLASSIC (5 rounds, ~2.5 min of game time at 4 s/step), Game 2 GOLDEN SPOON (1 round), Game 3 CLASSIC FINAL x2 (6 rounds). Cup winner: Pizzaraptor 15 pts. I finished 3rd-tied. Read all three standings screens.
- Cycled all 5 party modes on the setup screen and read each description line.
- Played Hot Dumpling (6 players, 4 rounds, paused mid-round, tested QUIT confirm), Crumb Rush (4 players, 5 rounds / ~4 minutes to a first-to-3 winner), Team Feast (6 players, 5 rounds, won with TEAM RED).
- Opened 💾 HOUSE RULES (saved slot 1), ⌨ KEYS panel, ⚡ TWIST picker, switched 🧪 TRY IT on and played Ice Rink vs EASY bot.
- Online: PLAY ONLINE panel, HOST A GAME (opened a room, toggled bots-fill/Party Cup in the lobby), JOIN A GAME form; 📱 PHONES AS PADS (same lobby).
- DAILY (Hot Dumpling, medal text), CHALLENGES panel (Chef's Pass line), SETTINGS, RECORDS.
- Matches: ~7 played (3 Cup games, 1 Hot Dumpling (quit), 1 Ice Rink trial, 1 Crumb Rush, 1 Team Feast) + 1 Daily (left at countdown).

## What worked for me
- **Party Cup is the best thing here for a host.** One toggle gives a whole evening arc: "CLASSIC -> GOLDEN -> CLASSIC · final x2". The standings after each game with "(G1 +5, G2 +3 ...)" and the "Points per game: 1st +5 · 2nd +3 ..." line are exactly what a living room needs to argue about. "Next: GOLDEN SPOON · 1 / START to continue" tells me what is coming.
- The new Golden Spoon explanation ("Golden Spoon places: rounds won, then seconds holding the spoon") makes the placement understandable: it matches what I saw (Pizza 5s = 2nd, Gob 4s = 3rd, Squid 3s = 4th).
- Setup screen is quick: click an empty seat = add a bot, one click on the big PLAY. Seat cards show kaiju, power ("Seed Spray"), and "👤 YOU · Keys left · A / D" (the new YOU badge is great for a first-time guest).
- The "▼ YOU" marker over my kaiju at round start, and team-coloured HUD underlines in Team Feast, make a 6-player screen readable.
- Daily intro shows the three medals and what they pay ("play +10 · win +20 · win without losing a round +40").
- Twist picker is lovely: 15 twists with one-line descriptions, doubles in pink. TRY IT works and was fast to start.
- ⌨ KEYS panel is a complete cheat sheet (both keyboards, gamepad, setup hotkeys G/C/2/M/R/U/H/X/Z/1) and fits on one screen.
- House Rules (3 slots + copy/enter code) is a host-grade feature; saving worked first click.
- Pause menu (RESUME / RESTART / MUSIC / SOUND / QUIT with two-tap confirm) prevents accidental quits.

## 🧾 Exactly what would make this a 9/10 for me
1. **Cut a 6-player Classic round/match down to a party length.** What: Classic "First to 3" with 6 players took 5 rounds in G1 and 6 rounds in G3 with 4 DIFFERENT round winners in the first 4 rounds, and Crumb Rush "first to 3" took ~4 minutes with 4 players. Where: Party Modes + Party Cup defaults. How: scale the default FIRST TO by player count (6 players -> first to 2; 5-6 -> "best of 3 = first to 2"), and add a visible **"≈ 6 min"** estimate on the setup screen ("Cup: 3 games ≈ 12 min"). In the Cup, let games be a fixed number of ROUNDS (e.g. Classic = 3 rounds, play all, points by rounds won) so the length is predictable. Impact +0.6.
2. **Team Feast needs a visible team score and a team result.** What: during rounds the HUD shows only per-player stars; the result says "TEAM RED RULES THE TABLE" and then lists 6 players with "3 rounds" each. Add a persistent "RED 2 – BLUE 1" chip top-centre during play, and on the result a headline "RED 3 – 2 BLUE" plus "Team MVP". Where: in-match HUD + result screen. Impact +0.4.
3. **Online "📱 Phones as Pads" must be startable by a host who is alone or with bots, and must explain itself.** What: lobby has START MATCH greyed ("Waiting for at least one friend to join...") with no way to test or play bots-only; copy says both "Up to 5 friends" and "Bots fill up to 4/6 players". Fix: allow START with 0 friends ("practice with bots"), make the "up to N" numbers agree (6 seats total = host + 5), and show a live seat list ("Seat 2: waiting... Seat 3: Mia's phone") under the QR code. Impact +0.5.
4. **Fix the lobby panel overflow** (bottom line "Room RSCF ... Close the ..." is cut off at the screen edge, `shot-21.png`) and make the lobby respect Party Cup ON exactly like the setup screen does (grey out MODE / FIRST TO, show CUP LENGTH, change the blurb which still says "Pass the steaming dumpling before it pops" with the Cup on). Impact +0.3.
5. **Stop TRY IT from overwriting my Free Play and Party setup.** After one TRY IT round, Free Play became BOT LEVEL EASY / TABLE SUNDAY ROAST / FIRST TO 1 / TWIST ICE RINK, and my Party BOT LEVEL silently became EASY too (shot-31). Try-it should run on a throwaway config and restore everything on MENU, and its result screen should say "🧪 TWIST TEST: Ice Rink" with buttons TRY ANOTHER TWIST / USE IT IN MY GAME / BACK, instead of "SQUIDGEON RULES THE TABLE" + REMATCH. Impact +0.4.
6. **Pause-menu warning overlaps its title and first button** ("⚠ Tap QUIT again to leave this match" prints over the bottom of PAUSED and the top of RESUME, `shot-18.png`). Move the warning below QUIT or turn QUIT into "TAP AGAIN TO CONFIRM". Impact +0.2.
7. **Cup standings must explain ties and show the mode's own score.** G3 gave four players the same "+6" and the final had three players on 8 pts with no tie-break line; Squidgeon was 6th at 7 pts after finishing G3 level with the others. Add a small "= tied on rounds won" marker and a tie-break rule line ("tie-break: most KOs"); in Crumb Rush/Golden Spoon results show crumbs / spoon-seconds beside each name ("23 crumbs held", "15 s"). Impact +0.4.
8. **Seat cards: the team pill ("RED TEAM") sits on top of the kaiju's head** once a kaiju is picked (`shot-3.png`, BLUEBEARY seat), and when Party Cup is ON the seat still shows RED/BLUE even though the Cup mostly plays free-for-all. Move the pill to the card's top border (half outside) and hide team colours unless the current/next game is Team Feast. Impact +0.2.
9. **Team balance and seat rules on setup.** "RED 2 vs BLUE 1 (add a player or bot to even it up)" is good; add one button "⚖ AUTO-FILL BOTS" and a "SWAP TEAM" tap on a seat. Impact +0.2.
10. **Result screens should name the mode and the winning condition** ("CRUMB RUSH · most crumbs held at the bell", "HOT DUMPLING · last one not popped"). Currently Crumb Rush, Hot Dumpling and Classic all end with "<NAME> RULES THE TABLE" and the same "N rounds · N KOs" list; Gobzilla ate 123 crumbs and finished 2nd with no crumb count on the list. Impact +0.3.
11. **Always-on mode rules for guests.** Pause menu and the countdown tip should show the active mode's one-line rule (Hot Dumpling's was only in the countdown tip). Add a "?" row to the pause menu: "HOW THIS MODE WORKS". Impact +0.2.
12. **More than 2 keyboards + gamepads is the hard part of 6 players; surface it on setup.** A single "HOW EVERYONE JOINS: 2 on keyboard, N gamepads found, rest via phones" line, with 📱 PHONES AS PADS shown as the main button when 3+ humans are wanted. Impact +0.3.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Party Modes setup, Classic/Crumb Rush | 6-player Classic "First to 3" needed 5 and 6 rounds (4 different round winners in R1-R4); Crumb Rush 4-player first-to-3 took 5 rounds ~4 min. Too long for a party. | shot-7.png | Scale first-to by player count; show estimated length. |
| 2 | major | Online lobby ("YOUR ROOM") | START MATCH greyed with "Waiting for at least one friend to join..." - host can't start with only bots; /look shows no texts for this DOM screen. | shot-21.png | Allow bots-only start; list live seat roster. |
| 3 | major | Online lobby | Bottom line is cut off at the panel/screen edge ("Room RSCF ... Close the..."). | shot-21.png | Make panel scroll or shrink the QR block; keep footer inside the panel. |
| 4 | major | Online lobby with Party Cup ON | Cup ON does not grey MODE / FIRST TO; still says "Mode: HOT DUMPLING", "First to 2 Rounds" and the blurb "Pass the steaming dumpling..." (contradicts new Party Cup behaviour). No CUP LENGTH control. | shot-21.png | Mirror setup-screen logic: "MODE: CUP PICKS", "FIRST TO: CUP SETS IT", add CUP LENGTH. |
| 5 | major | Twist picker -> TRY IT | Playing a try-it round silently rewrites Free Play (BOT EASY, TABLE SUNDAY ROAST, FIRST TO 1, TWIST ICE RINK) and my Party BOT LEVEL changed to EASY. | shot-31.png | Use throwaway config; restore on exit. |
| 6 | minor | TRY IT result | Result reads "SQUIDGEON RULES THE TABLE / 1. SQUIDGEON - 1 round" + REMATCH/MENU, no link back to twist picker, no "you tried Ice Rink" confirmation or "use it" button. The round was also slow: bot sat "unarmed" for 30+ s before anyone fought. | shot-30.png | Dedicated try-it result with TRY ANOTHER / USE IT. |
| 7 | minor | Pause menu | "⚠ Tap QUIT again to leave this match" overlaps bottom of "PAUSED" and the top of RESUME button. | shot-18.png | Put warning under QUIT or relabel button. |
| 8 | minor | Party setup seat card | "RED TEAM" pill covers the head of the picked kaiju (BLUEBEARY). Also shown for Party Cup (non-team) games. | shot-3.png | Move pill to card border; hide when mode isn't Team Feast. |
| 9 | minor | Team Feast in-match HUD | No team score on screen; only per-player stars. The result headline gives no score either ("TEAM RED RULES THE TABLE" then 6 per-player lines). | shot-40.png, shot-41.png | "RED 2 - 1 BLUE" chip + "3 - 2" result. |
| 10 | minor | Cup standings | Ties (4 players at +6 in G3; 3 players at 8 pts in the final) shown without explanation or tie-break rule. | shot-12.png | Add tie marker + tie-break line. |
| 11 | minor | Cup standings | Points per game only for 4 places; in a 6-player game places 5/6 both show "+0" which hides who was 5th vs 6th. Rows for 5th/6th also don't show the mode score that decided them. | shot-9.png | Show mode score per row. |
| 12 | minor | Cup standings, text box | The long "Points per game: ..." line runs to the panel's left/right edges (about 10 px margin) and, in G2, the panel's bottom nearly touches the THIS MATCH card; THIS MATCH card overlaps the dimmed table. | shot-7.png, shot-9.png | Wrap to two lines, add padding. |
| 13 | minor | Setup screens | "FIRST TO" shows 3 on Party Modes but 2 after leaving Cup mode and re-entering, and "First to 1" in Free Play after a try-it: the same pill drifts between screens without notice. | shot-25.png | Persist per-mode and show on change. |
| 14 | minor | In-match HUD (Crumb Rush) | Grammar: "1 crumbs", "4 crumbs". | shot-33.png | Pluralise ("1 crumb"). |
| 15 | minor | Crumb Rush / Golden Spoon rounds | No round-end summary seen between rounds (phase jumps roundEnd -> countdown); can't tell who won the round or by how much until the final list. | shot-36.png | 2-second "ROUND 3: HOTCHOG 23 crumbs" banner. |
| 16 | minor | Match result (Crumb Rush) | Winner list shows "3 rounds · 11 KOs" per player but not crumbs; Gobzilla (123 crumbs eaten, 2nd) can't see why. Mothball got 12 KOs but 0 rounds - no explanation that KOs don't count in Crumb Rush. | shot-38.png | Show mode score and "KOs don't count here". |
| 17 | minor | In-match | "▼ YOU" marker only shown at round start; during Team Feast mid-round and Golden Spoon I could not tell which kaiju was mine without the HUD. | shot-40.png, shot-8.png | Keep a small pulsing marker for first 5 s of a round and on respawn; or tie to PLAYER NUMBERS. |
| 18 | polish | State API / results | The winner field returns "YOU" in some rounds and "GOBZILLA" in others, while the HUD says GOBZILLA and the seat says GOBZILLA JR. - three names for my kaiju. | /state output | Use one display name (add "(YOU)" suffix everywhere). |
| 19 | polish | Team Feast results | Rows read "RED · BUBBLEGUMBO - 3 rounds · 5 KOs": team win rounds repeated on every player; looks like 3 separate wins. | shot-41.png | Show team rounds once in the headline. |
| 20 | polish | Twist picker | Description of FISTS ONLY ("No cutlery at all: swipe, shove and stomp") and MIRROR MOVES render in a smaller font than neighbours; TRY IT pill and X are tight at the top right. | shot-27.png | Normalise font size / shorten text. |
| 21 | polish | Party setup | "Bot difficulty: NORMAL · Up to 6 players · First to 3 rounds · 12/20 kaiju (play & Story unlock more)" repeats the pills below it; the count (12/20 -> 13/20) changes mid-session without a toast. | shot-3.png | Replace with a single "6 seats · ~12 min" line. |
| 22 | polish | Online hub | Page title says "Play with friends on their own phones or computers, from anywhere" but the lobby then says "Everyone on the couch: scan with your phone camera". Two different pitches for one lobby. | shot-23.png, shot-21.png | Offer "SAME ROOM (phones as pads)" vs "REMOTE FRIENDS". |
| 23 | polish | Records | "Matches won 1" vs 6 played: no party-specific stats (Cups played, best Cup finish, modes tried), "Tables visited 12/18" vs "tables owned 13/18" use different counts. | shot-45.png | Add a Party section; align table counts. |
| 24 | polish | Daily intro | Medals listed but not marked as done/open today (all three open here, so no check marks to judge the new "still open" feature). | shot-42.png | Verify check marks after earning a medal. |
| 25 | polish | Party Cup toggle | With Cup ON the pill reads "MODE CUP PICKS" and "FIRST TO CUP SETS IT" (greyed) - clear, but a host can't see WHICH games the Cup will play without reading the 10-px footer line. | shot-3.png | Show the game sequence as chips above PLAY. |
| 26 | polish | Pause menu | No "how to play this mode" and no "controls" entry. | shot-17.png | Add HOW TO PLAY / KEYS row. |

## 🔠 Text and layout check
- **Title** (`shot-1.png`): OK. NEXT UP box text is small but readable; bottom tiles fine.
- **Party Modes setup, no seats** (`shot-2.png`): OK. 11 pills in one row are small (about 11 px text) but not overlapping.
- **Party Modes with seats + Cup ON** (`shot-3.png`): PROBLEM - "RED TEAM" pill overlaps the kaiju's head on the picked card (BLUEBEARY). Footer Cup line small but OK.
- **Countdown, Classic 6 players** (`shot-5.png`): OK; the tip line overlaps the mooncake pattern but is readable.
- **Cup standings G1 / G2** (`shot-7.png`, `shot-9.png`): minor - the "Points per game" line reaches the panel edges; THIS MATCH card overlaps the dimmed table. Text readable.
- **Cup winner screen** (`shot-12.png`): OK; tie rows unexplained (content, not layout).
- **Golden Spoon in-match** (`shot-8.png`): OK. HUD "HOLDING! 2/15s" fits.
- **Hot Dumpling in-match** (`shot-14.png`, `shot-15.png`): OK.
- **Pause menu** (`shot-17.png`, `shot-18.png`): PROBLEM - confirm warning overlaps "PAUSED" and the RESUME button (shot-18).
- **Online hub / Join form** (`shot-23.png`, `shot-24.png`): OK.
- **Online lobby "YOUR ROOM"** (`shot-19.png`, `shot-21.png`): PROBLEM - last line cut off at the bottom edge of the panel; panel taller than the 720 px viewport.
- **House Rules** (`shot-25.png`): OK.
- **Keys panel** (`shot-26.png`): OK (overlays setup pills by design; the dimmed pills show through but do not clash).
- **Twist picker** (`shot-27.png`): minor - two descriptions use smaller type; otherwise OK.
- **Ice Rink countdown / result** (`shot-28.png`, `shot-30.png`): OK; the tall THIS MATCH card with two tips is close to SHARE but not overlapping.
- **Crumb Rush in-match / result** (`shot-33.png`, `shot-38.png`): OK; grammar "1 crumbs" only.
- **Team Feast in-match / result** (`shot-39.png`, `shot-40.png`, `shot-41.png`): OK; 6-player HUD fits.
- **Daily intro** (`shot-42.png`): OK; long medals line fits, centred.
- **Challenges** (`shot-43.png`): OK; Chef's Pass line fits within the panel.
- **Settings** (`shot-44.png`): OK.
- **Records** (`shot-45.png`): OK; footer shows "Next up: Forked Up (84%)" (a pinned achievement was not set, so I could not judge the pin footer).
- Kid Mode and phone mode: not tested by this profile.

## The single biggest structural problem
**The party night has no shape you can predict.** A host wants "a 2-hour game night, everyone has a turn, ends with a winner". Here the Cup gives the arc, but each game inside it is an open-ended first-to-N with 6 kaiju, and I saw 5 and 6 rounds with four different winners in the first four rounds. Combined with a Crumb Rush match that ran about four minutes for 4 players, a 6-game Cup is plausibly 40+ minutes with no way to know that from the setup screen, and there is no "who's waiting" moment because everyone who is KO'd just watches a fast-forward. The fix is structural, not a tuning knob: fixed round counts per game, a time estimate on setup, and a visible team/cup scoreboard that persists.

Second, the 6-player part of "4-6 friends" depends on phones-as-pads, but that path currently lives in an Online lobby that can't start without a friend and has a clipped footer. The host's real flow (TV + phones) is the least polished screen in the game.

## Big change proposals (2–3, most important first)
### Proposal 1: Game-night mode with fixed length ("Party Night")
- **Problem it solves:** unpredictable length; long KO'd waits; hosts can't plan.
- **How it would work (detailed design):** On PARTY MODES add a top pill **NIGHT LENGTH: QUICK ≈10 min / STANDARD ≈20 min / LONG ≈40 min** (replaces CUP LENGTH). Each preset fixes the game list and a fixed ROUND count per game (e.g. STANDARD = Classic 3 rounds, Crumb Rush 2 rounds, Golden Spoon 2 rounds, Team Feast 3 rounds, Classic final 3 rounds x2). Points are awarded per ROUND (1st 5 / 2nd 3 / 3rd 2 / 4th 1) rather than "first to 3" so everyone always plays the same amount. Setup shows a chip row of the upcoming games with icons and the total estimate. During play, a slim top strip shows "GAME 2/5 · ROUND 1/2" and on KO a "you're out - next round in 12 s" chip with the seconds remaining so people don't wander. Between games the standings screen has a 15 s auto-continue ring with "1 / START to skip".
- **Example moment:** Host picks STANDARD with 6 seats; setup says "5 games · ≈20 min". After game 3 the standings show "Round points + game points", and "Next: TEAM FEAST - teams are shuffled for you".
- **Rewards / progression hooks:** "Party Night" achievement (finish a STANDARD night with 4+ players), per-night winner remembered in "Past champions" (already exists in Cup).
- **Risks and edge cases:** Fixed rounds can leave a tie after the last round: add a 1-round sudden-death "SUDDEN SPOON" tiebreak. Drop-out players (phone disconnect) need bot takeover.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Host's "Couch Setup" wizard (who is playing on what)
- **Problem it solves:** joining 4-6 humans with keyboards/gamepads/phones is the hardest host task; the Online lobby is clipped and can't start with bots.
- **How it would work (detailed design):** A single "WHO'S PLAYING?" step shown the first time PARTY MODES is opened with 3+ seats wanted: left half shows detected inputs (Keyboard Left, Keyboard Right, Gamepad 1-4), right half a QR code + 4-letter code for phone pads, with a live roster of 6 seats ("Seat 3: Mia's phone ✓ ready"). The host can press START with any mix, bots auto-fill the rest. Seat cards show a pill for the control type ("🎮 Pad 2", "📱 Mia"). Team Feast gets an AUTO-BALANCE button and drag/tap to SWAP TEAM. The same panel is reachable from Online -> Host and from 📱 PHONES AS PADS.
- **Example moment:** Host sees "2 keyboards + 1 pad found · 3 phones joined · 0 bots", taps ▶ PLAY, and everyone sees their own kaiju name on the TV with "▼ YOU" on their phone.
- **Rewards / progression hooks:** none needed; shortens the setup to under a minute (setup time is the host's main cost).
- **Risks and edge cases:** Phone joins mid-Cup (give the late joiner a bot's seat at the next game); host's Wi-Fi blocking WebRTC (fallback message and QR for the free relay).
- **Size:** L
- **Score impact for me:** +0.6

### Proposal 3: Persistent team scoreboard + mode-specific results
- **Problem it solves:** Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon all end with the same "RULES THE TABLE" list; team score never shown.
- **How it would work (detailed design):** A top-centre chip in every party match shows the score that matters: Team Feast "RED 2 – BLUE 1", Crumb Rush "crumbs held" bar, Golden Spoon spoon-seconds ring, Hot Dumpling "pops dodged". The results screen is built per mode: headline names the condition ("MOST CRUMBS HELD: HOTCHOG 23"), list shows the mode score and, if a Cup, the points earned, with ties explicitly marked. A "MVP" and "Moment of the match" line (largest KAIJU squash, closest spoon steal) gives the table something to talk about.
- **Example moment:** Team Feast ends "RED 3 – 2 BLUE · MVP BUBBLEGUMBO (5 KOs)", the host can read that out without squinting at six lines.
- **Rewards / progression hooks:** per-mode wins in Records (Party section).
- **Risks and edge cases:** More HUD at the top of a 6-seat strip (already full); put it under the timer.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **🏆 Party Cup (my main focus): very good.** The places count the mode's own score first and KOs second, and I could verify it: Golden Spoon placed Pizza (5s) above Gob (4s) above Squid (3s); Gobzilla with 2 pts G2 vs Bluebeary 0 pts despite a G1 win. The standings show points per game "(G1 +2, G2 +3, G3 +10)", the points-table line, a "Golden Spoon places: ..." line and the next-game line "Next: CLASSIC (FINAL · ×2 POINTS)". With the Cup on, MODE and FIRST TO grey out ("CUP PICKS", "CUP SETS IT") and the cup length pill works. Remaining gaps: ties unexplained, final mode scores not shown per row, Cup ON still shows team pills on seats, and the **Online lobby ignores all of this** (see issues 4).
- **🦖 KAIJU warning:** I saw bots go KAIJU in Classic and a pulsing reach ring around the blueberry mascot (shot-7) and in Golden Spoon a yellow/red ring around SALMONSTER (shot-8). The ring is readable and the 1.8 s bot delay made the round openers feel less like an instant massacre (first KOs in G1 came a few seconds in). I did not time the 0.5 s growth exactly.
- **🎓 First-timer badge (👤 YOU):** present on the setup seat ("👤 YOU · Keys left · A / D") and as "▼ YOU" above my kaiju at the round start. Good. It disappears mid-round (issue 17).
- **⚡ Twist picker + 🧪 TRY IT:** the picker is great; TRY IT started a 1v1 vs an EASY bot instantly. But it pollutes Free Play and Party settings (issues 5, 6).
- **📅 Daily medals:** the intro shows all three medals and rewards. I did not earn one so I could not see the "still open today" distinction.
- **🏁 Chef's Pass in CHALLENGES:** the line "CHEF'S PASS: 0/12 Trial ★ or Gauntlet wave 0/8 -> opens Spicy on any reached chapter + the Dessert Course early" fits and is clear.
- **🏅 Records footer:** shows "Next up: Forked Up (84%)" - fine without a pin; not tested pinned.
- Kid Mode, Gallery, Workshop, Gauntlet waves, first-timer Practice: not touched in this profile.

## Bugs that block play
- None blocked play in the party flow. JS errors: none (`/errors` -> none at start, middle, end).
- Near-blocker for hosts: the Online "YOUR ROOM" lobby cannot START without a friend present, so a lone host can't launch a bots-only phones-as-pads test (issue 2).
