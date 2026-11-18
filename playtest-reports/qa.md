# Playtest evaluation — The QA Tester (qa)

**Fun score: 7 / 10** (rock solid for a party brawler: zero JS errors across ~95 actions, clean flows; a few small layout/consistency nits and the Practice checklist still covering the bottom-left corner)

## What I did
- Visited: Title, Settings, Help (Basics/Cutlery/Tables/Modes tabs) + Practice, Kaiju Gallery, Records (page 1), Workshop (placed prop, changed hazard, saved, Play It), Story (map, opening cutscene, chapter-1 dialogue, played + cleared ch.1 3 stars), Free Play (6 players, My Table 1), Party Modes (Team Feast started), Daily (Hot Dumpling, played to FAILED screen), Gauntlet (cleared wave 1), Online (chooser, Join form; did not Host - network).
- Matches: Free Play 6-player first-to-3 won; Gauntlet wave 1 won; Daily lost; Story ch.1 won; Team Feast and Practice started only.
- Escape pressed on: title, settings, every menu, countdown, pause, replay, round-end, wave-cleared, results, cutscene, dialogue, Online Join form.
- Checked /errors after nearly every risky action: always "none".

## Previously reported issues: status
1. Escape in matches/pause: FIXED. Esc during countdown opens pause, Esc again resumes; Esc during instant replay skips it (Free Play); Esc on results -> menu -> title; Esc in cutscene/dialogue -> story map. Nit: Esc on the Gauntlet "WAVE 1 CLEARED!" screen drops you straight to the title with no confirm (run ends).
2. Daily/Practice returning to the right screen: FIXED. Practice QUIT -> Help; Daily QUIT/Esc -> title; Story QUIT -> Story map. Nit: Workshop "PLAY IT" then QUIT lands on Free Play menu, not Workshop.
3. Pause MUSIC/SOUND toggles keep saved levels: FIXED. Set SFX 5/5 and MUSIC 3/5 in Settings, toggled both off/on in pause (Daily), quit, reopened Settings: still SFX ■■■■■, MUSIC ■■■□□.
4. Round label vs 4th HUD card: FIXED. 4-player: label top-right, no clash. 6-player: label moves to bottom-left ("ROUND 1 · MY TABLE 1"), nothing overlaps the 6 cards.
5. Results ticker vs SHARE button: MOSTLY FIXED. SHARE is bottom-left, ticker centred at x~700, no overlap. BUT see bug B2: with long names the ticker wraps to 2 lines.
6. Practice checklist hiding the dummy: NOT FIXED. The bottom-left checklist panel still covers the corner of the table; I walked my kaiju to the bottom-left and it was almost completely hidden behind the panel (see B1). Default spawns (me top-right, dummy bottom-right) avoid it, so you only notice if anyone walks/gets shoved there.
7. Replay round pips: PARTLY. During INSTANT REPLAY the top cards show the old pips (winner shows ☆☆☆ ... after replay the same HUD shows ★☆☆). Not wrong exactly, but the pip for the round being replayed isn't shown until the replay ends. No dedicated pips on the replay overlay.

## What matched my goals / what was fun
- Stability: no JS errors, no soft-locks, no dead buttons in ~95 actions.
- Pause menu, quit destinations and settings persistence are now consistent.
- 6-player free-for-all reads well; bottom ticker + round label placement is smart.
- Story chapter clear screen, dialogue and star rewards feel polished; Records/Gallery look good.

## What took too long / was tedious
- Opening cutscene + chapter dialogue need several taps before the first throw (skippable though).
- Instant replay after every round in Gauntlet wave 1 of 2 players is a lot for a 3-second fight.

## What was over too quickly / too shallow
- Easy bots die in one or two throws; a 6-player easy match was 3 rounds in under a minute for me (the bot-controlled seat 0 harness helps, but still).

## Confusing or unclear
- Gauntlet match shows "ROUND 1 · BIRTHDAY BASH" in the HUD while the countdown says "WAVE 1"; "WAVE n" is what the player cares about.
- Hot Dumpling feed says "BUBBLEGUMBO skewered GOBZILLA" in a mode about passing a dumpling; mode-specific wording would help.
- Daily "FAILED" screen says "best 0 rounds · tries 1" with no explanation of what "win" means (win the match?).
- Esc does nothing visible on the Online "Join a game" form (may be a harness key-focus limitation since the input is focused); BACK button works.
- Records heading overlap (B3).

## Bugs found
B1. Practice checklist covers the table's bottom-left corner (Practice).
   Repro: Title -> HELP -> PRACTICE. During play, move left+down (act move:-1,1 for 4s) until the kaiju is at the lower-left corner. The "PRACTICE n/8" panel at [24,696] draws over the kaiju (only a sliver visible). Screenshot: art-src/.playtest2/7110/shot-7.png. Same applies to the dummy if it ever stands there.
B2. Results footer ticker wraps to two lines and runs into art.
   Repro: Title -> DAILY (Hot Dumpling, Norigon/Bubblegumbo/Salmonster/Gobzilla), lose the match. On the "DAILY CHALLENGE FAILED" screen the line "Most KOs: BUBBLEGUMBO · Crumb Monster: SALMONSTER (11 crumbs) · Survivor: SALMONSTER" wraps ("Survivor:" / "SALMONSTER" on second line) and the second line sits at the very bottom edge over the lemon/mat art. Screenshot: shot-24.png. Fix: shrink font/ellipsize or drop one stat when too long.
B3. Records screen: "ACHIEVEMENTS 0/29" header overlaps the "👉 Next up: First Bite (0%) — Win a match" hint line.
   Repro: Title -> RECORDS (fresh save). Texts at [500,108] and [500,128] collide; screenshot shot-9.png.
B4. Free Play results screen: a plain white rounded square (looks like a missing-icon pickup/touch-button sprite) is drawn at ~[150,220] near the top-left mat.
   Repro: Free Play, 6 players, table My Table 1, win the match. See shot-19.png. Not confirmed what it is; might be a leftover pickup (mustard shield?) with no sprite.
B5. (Minor, inconsistent) Gauntlet HUD says ROUND instead of WAVE (see Confusing).
B6. (Minor, unconfirmed) First time I entered STORY and clicked the opening-cutscene SKIP at [1190,44], the game ended on the title screen rather than the story map. I could not reproduce it a second time (later SKIP went to the chapter dialogue and map). May be harness timing, but worth checking the first-run opening skip path.
B7. (Minor) Esc on Gauntlet "WAVE CLEARED" goes to title and abandons the run with no confirm / no "continue" option; Esc during Gauntlet replay seemed not to skip it the first time (state still INSTANT REPLAY after Esc, unlike Free Play where Esc skipped it) - could be a frame timing artifact.
Console: /errors returned "none" every time.

## Top 3 changes that would raise my score
1. Fix layout collisions: Practice panel over the table corner, Records header overlap, wrapping results ticker.
2. Make the Gauntlet/Daily flow clearer: WAVE labels in the HUD, a confirm on Esc during wave-cleared, explain Daily win condition.
3. More match texture on Easy: bots that dodge/hold cutlery longer so first matches last more than one throw, and shorter replays when only 2 players.
