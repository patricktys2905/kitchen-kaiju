# Playtest evaluation — qa ("The QA Tester")

**Fun score: 7 / 10** (solid, stable, charming party brawler; only small polish bugs, zero JS errors in ~120 calls; I tested more than I played with feel, and my matches were bot-driven)

## What I did
- Screens visited: Title, Settings (all toggles, mid-flow changes then verified in a match: player numbers + name tags appeared), Help (Basics/Cutlery/Tables/Modes) + Practice, Gallery (twice, plus after unlocking Minturtle), Records (before/after progress, page 2), Workshop (place props, save, hazard cycle, slots, PLAY IT), Online (host/join dialogs only; Escape and Back), Free Play setup (every setting button, KEYS panel), Party Modes, Daily (Hot Dumpling, Fondue Night), Gauntlet (waves 1-4, perk picker x3), Story ch1-4 incl. boss dialog and cutscenes.
- ~11 matches played/auto-played (8 won), ~2.5 hours-equivalent of poking. /errors was "none" after every risky action (Escape spam, pause toggles, quitting mid-match, rapid screen switching).

## Re-checks requested
- Records header vs "Next up": FIXED. "ACHIEVEMENTS 0/32" no longer collides; "Next up" line sits at the bottom and correctly picked First Bite (0%), later Regular Diner (80%) (highest-progress locked achievement). Page 2 keeps the same "Next up" line (fine).
- Gallery colour swatches, second visit: OK. Swatches render in colour on 1st, 2nd and 3rd visit; the 3rd (after unlocking) correctly counted 3/11.
- Results screens: single column, "(YOU)" marker present on every one (Free Play, Party, Story). Minor: marker sits tight against the dash ("BLOBLIN (YOU)—") and background props/kaiju can overlap the "1 / START rematch" line.
- Practice panel position: bottom-left, small, not blocking play. Counter and hint advance. Note: hint stayed on "SWIPE up close" at 4/8, 5/8, 6/8 and 7/8 because I did other steps first (steps seem order-independent, only the first uncompleted is shown). Fine, but the hint never changed while the count moved, which looked stuck.
- Gauntlet WAVE label: present top right ("GAUNTLET WAVE 2 · BANQUET LAZY SUSAN") and in the banner. OK. Perk icons shown in HUD under name. OK.
- Setup screen: setting buttons all cycle correctly (bot level, table, first to, twist, power-ups, hazards); KEYS panel is clear and readable; Escape closes the panel first, then second Escape leaves. PLAY works.
- NEW KAIJU celebration after Story chapter 4: NOT SEEN. I cleared chapter 4 (Boss of the Belt) via autoplay; Minturtle did unlock (Rewards 1/7, Gallery 17/20, "Playable now"), but pressing ENTER on CHAPTER CLEAR went straight to the story map and then chapter 5's intro cutscene; no NEW KAIJU screen/toast appeared in /look or screenshots. Could be a harness artefact (autoplay/key skipping) but I cannot confirm it exists. Please verify manually.

## What matched my goals / what was fun
- Extremely stable: no JS errors anywhere. Pause toggling, quit-from-pause, Escape from cutscenes all behave.
- Settings take effect immediately and persist. Setup screen is clear. Story rewards modal is clean. Perk picker is a good, readable moment, and Gauntlet cards in the title update ("Best wave 3").
- Records feel rewarding (progress bars on every locked achievement).

## What took too long / was tedious
- Story intro cutscenes + boss dialog before every chapter need an extra Space/Esc; replays have the same wait (SKIP exists, OK).

## What was over too quickly / too shallow
- Gauntlet waves 1-2 vs 1-2 weak rivals are over in seconds; perk choice is the interesting part.

## Confusing or unclear
- Free Play "PLAY" with zero players joined silently starts a 2-bot spectator match (PIZZARAPTOR vs HOTCHOG, no human). Probably should require a seat or say "watch mode".
- Free Play / Party Modes share settings state: twist MINI KAIJU, powerups OFF and a table picked in Free Play were already set when I opened Party Modes (it opened in Team Feast with Smoothie Bar). Surprising.
- Workshop "PLAY IT" appears to leave "MY TABLE 1" as the selected table: my next Free Play match (table previously Smoothie Bar) started on MY TABLE 1 without my choosing it.
- Quitting a Workshop PLAY IT match lands in the Free Play setup, not back in the Workshop.
- Gallery: locked kaiju detail text reads "Unlock: Collect 30 stars in Story mode  Left: normal look · right: KAIJU MODE" (the left/right caption is for the art that is not shown when locked).
- Naming: HUD says "GOBZILLA", results/gallery say "GOBZILLA JR."

## Bugs found
1. **Story: SCENE button overlaps star legend.** Title > STORY (skip opening) > chapter 1. The "🎬 SCENE" button at ~[1172,560] covers the end of the "★★★ no rounds lost · ★★ lost one · ★ any win" text at [1000,572]. Screenshot: art-src/.playtest3/7110/shot-12.png.
2. **Gauntlet perk picker: toast hidden behind cards.** Win Gauntlet wave 1 > "PICK A PERK" screen. An achievement toast ("🏆 WORLD TOUR: Play on 12 different tables", [640,598]) renders underneath the perk cards and is partly visible between them. Screenshot: shot-30.png.
3. **Escape on the perk picker abandons the whole Gauntlet run.** Clear wave 1, press Escape at "PICK A PERK" > straight to Title, run lost, no pause/confirm (Escape in normal waves opens pause). Easy to hit by accident.
4. **Free Play PLAY with no players** starts bot-vs-bot match (see Confusing).
5. **Workshop table leaks into Free Play** (see Confusing): Workshop > save > PLAY IT > Escape > QUIT > back to title > Free Play > join 2 seats > PLAY: round banner "ROUND 1 · MY TABLE 1".
6. **Online dialogs ignore Escape.** Title > ONLINE > Join a Game, press Escape: dialog stays (only the BACK button works). Might be an input-focus harness effect.
7. Minor: duplicate kaiju in one Free Play match (two MOTHBALLs among 4 seats in a random-bot match; results list "MOTHBALL" twice, confusing). Repro: finish a Free Play autoplay match from a fresh start screen; screenshot shot-17.png.
8. Minor: unsaved Workshop edits (hazard type) survive slot switching without being saved, with no indicator.
- /errors: "none" throughout.

## Top 3 changes that would raise my score
1. Fix the small overlaps (Story SCENE button vs star legend; perk picker covering toasts) and make Escape on the perk picker pause/confirm instead of ending the run.
2. Keep Free Play / Party / Workshop settings and tables separate, and make PLAY require at least one human (or label it "Spectate").
3. Verify the NEW KAIJU celebration actually fires after chapter 4 (and shows before the next cutscene).
