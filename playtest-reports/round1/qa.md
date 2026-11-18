# Playtest evaluation — qa (The QA Tester)

**Fun score: 6.5 / 10** (charming, polished, stable art and menus, but state leaks between modes, a few overlap bugs, and early-game deaths to the Giant Hand feel unfair; no JS errors at all, which is great)

## What I did
- ~105 curl calls. Visited: Title, Settings (all toggles, Keyboard Controls rebind, Back up/Move save), Help (Basics/Cutlery/Tables/Modes, Practice), Gallery, Records, Workshop (placed/removed props, Play It), Story (chapter 1 played and cleared, 3 stars, intro/chapter cutscenes), Free Play, Party Modes (cycled all 4 modes, played Hot Dumpling), Daily, Gauntlet (lost wave 1), Online (Host/Join HTML panels, bad room code).
- Matches: ~4 manual/bot-assisted (1 Story loss, 1 Story win), plus Hot Dumpling, Daily, Gauntlet, Practice, and 2 autoplay matches.
- Escape/pause at odd moments: mid-countdown, mid-match, mid-cutscene, paused, results screens. /errors was "none" after every action.

## What matched my goals / what was fun
- Zero JavaScript errors across heavy abuse (rapid clicks across title buttons, Escape/Space spam, mid-match settings toggles, restart from pause).
- Art and UI are very good: title, gallery, workshop, settings, chapter-clear card look professional.
- Keybinding rebind with automatic swap on conflict works; Back up / move save works; Online panel rejects a bad code with a clear message ("Room codes are 4 letters.").
- Practice checklist, round tips under countdown, and "GAUNTLET OVER / CHAPTER CLEAR" screens are clear.

## What took too long / was tedious
- Story ch.1 start needs many Space presses (opening video, chapter video, 3-4 dialog boxes) before the first match, every time you replay it (SKIP exists, but Escape sometimes backs out instead).
- Hot Dumpling / Daily / bot-only starts with no human join are silently allowed (confusing when "you" is a bot).

## What was over too quickly / too shallow
- Rounds against an easy bot were over in ~9s (see Giant Hand note); little time to learn.
- Gauntlet wave 1 already ended in ~8s for a hard-bot player.

## Confusing or unclear
- HUD says "Esc menu" but Escape instantly quits the match (see bug 3) rather than opening a menu; P opens the real pause menu.
- Help tab highlighting: on the Help screen after clicking CUTLERY both BASICS and CUTLERY look selected (BASICS has the keyboard focus ring).
- The Gallery shows a faint empty dark colour-swatch row ("YOUR COLOUR"), no indication why they are blank (locked?).

## Bugs found
1. **Pause menu overlaps the INSTANT REPLAY banner** - Free Play with 2 bots (Digit1), let a round end (instant replay plays), press P during the replay. Pause menu is drawn with "INSTANT REPLAY" banner still on screen above RESUME, plus ghost "FIRST BITE!" text behind the menu (screenshot art-src/.playtest/7110/shot-23.png).
2. **Pause menu SOUND/MUSIC toggles overwrite the saved slider settings** - Settings default SFX ■■■■□, Music ■■□□□. Start a match, P, click MUSIC then SOUND (both OFF), quit. Settings now shows SOUND EFFECTS □□□□□ OFF and MUSIC □□□□□ OFF; re-enabling in Settings goes to ■□□□□ (1/5), the previous levels (4/5 and 2/5) are lost.
3. **Escape in a match / on the pause menu quits to menu with no confirm and no resume** - start any match, press Escape: back to Story/Free Play immediately (a lost Story round; Esc on the pause menu also quits instead of resuming). The HUD hint "Esc menu" suggests a menu that never appears.
4. **Top-right "HOT DUMPLING - ROUND 1 - FONDUE NIGHT" title collides with the 4th player's HUD card** - Daily (click DAILY on title) with 4 players; the round label text starts inside the Norigon HUD panel (shot-29.png).
5. **Mode/roster state leaks between screens** - (a) Title > DAILY, play, press Escape: you land on PARTY MODES (not Title) with Daily's roster (Bubblegumbo/Salmonster/Gobzilla Jr./Norigon with pencil marks on bot difficulty) preloaded. (b) Later Free Play showed "First to 3 rounds" and a bot roster from Daily/autoplay. (c) Help > PRACTICE then Escape also returns to PARTY MODES instead of Help.
6. **Story: first Escape after leaving a match does nothing** - Start Story ch.1, lose or win, return to chapter map, press Escape: stays on the map; a second Escape goes to Title (also needed to skip the first-visit opening video).
7. **Practice dummy (Dumplord) is hidden under the tutorial checklist panel** (top-right, ~1100,135) so "Knock out the dummy" objective target is occluded; also long item "STOMP to go KAIJU and squash the dummy" wraps to column 0 with no indent (shot-52/54).
8. **Results screen: scrolling ticker runs under the SHARE button** - finish any 4-player match (autoplay?n=1): bottom ticker "Most KOs / Crumb Monster..." is clipped at the left by the SHARE button; ticker text overlaps it (shot-57.png). Leaderboard text sits on busy table art (white on cream) and is hard to read.
9. **Chapter-1 intro video caption reads "CRAB" and Chapter 2 caption "TWO'"** (shot-11, shot-44) - captions look truncated/mid-word; and the opening video has a low-contrast "THE GRAND FEAST" caption baked behind the plate (shot-7).
10. **Story ch.1 (tutorial, "easy") killed by GIANT HAND at ~9s in both rounds** when standing still/using the harness "attack" command; hazard arrives with no on-screen warning I could see in /look, in the very first stage. Round 2 HUD also showed 5 empty pip stars for a "first to 2" chapter (shot-17.png) while round 1 showed 2 pips. (May be harness-induced, but pips mismatch looks real.)
11. **Gallery info panel text exists in the DOM/scene (/look lists "GOBZILLA JR. A strawberry lizard... Trait/Matches" at y=470-518) but nothing is drawn there** in the screenshot (shot-2.png) - panel is blank/under the colour row.
12. Minor: Workshop prop placement near the table edge (e.g. cupcake at 1200,360) silently does nothing; no feedback why.
- Harness limitations I did NOT count as bugs: /look doesn't list overlay/canvas texts (Chapter Clear card, SHARE button), /act "events" always empty, game frozen between commands, Online HTML screens.

## Top 3 changes that would raise my score
1. Fix the state leaks: Escape/Back from Daily and Practice must return to where you came from, and Daily/autoplay rosters/rounds must not overwrite Free Play/Party Modes setup.
2. Make Escape behave: Esc in a match should open pause (or ask to confirm quitting), Esc on the pause menu should resume; pause toggles should be per-session and not overwrite saved volume levels.
3. Clean up HUD/overlay polish: round-label vs 4th HUD card, INSTANT REPLAY over the pause menu, results ticker under SHARE, practice panel covering the dummy; plus telegraph the Giant Hand earlier in the opening chapters.
