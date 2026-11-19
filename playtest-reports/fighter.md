# Playtest evaluation: The Fighter (profile "fighter", port 7102)

**Fun score: 6.5 / 10** (the core loop is readable and the new Move Lab, TOUGH level and parry/dodge tips are great, but I have almost no tools to improve at fighting: no power stats, no bot-behaviour info, round deaths in 1-3 seconds feel luck-driven, and nothing tells me *why* I lost beyond a vague KO list.)

> Bar this round is 9/10 from every profile. All screenshot paths are relative to `C:\Users\Pat\kitchen-kaiju\` (the harness saves them to `art-src/.playtest/r8-7102/shot-N.png`).
> Caveat: I drove matches through the `/act` harness (attack / shove / crumbs / stomp / power / auto:level), which is coarse (no real aiming, no manual dodge timing). Some "I got KO'd in 2 s" findings may be partly my coarse control, but the bots' speed was still visibly high (see issues 1, 2).

## What I did
- About 110 harness commands over roughly 7 Free Play / Trial / Party matches and many menu screens.
- Screens visited: Title, Free Play setup (cycled BOT LEVEL NORMAL > TOUGH > HARD > BRUTAL > EASY), Free Play matches at TOUGH (2 full matches: lost 0-3 on 5 rounds, then 2-3 on 7 rounds), Results/receipt screens, Records (page 1), Kaiju Gallery (Gobzilla, Bubblegumbo), Move Lab (entered, STOMP + power, Esc leaves), SHINY button (clicked), Pantry, Challenges panel, Trials list, Trial "Hard Duel" (played, lost 1-3 to HARD Pizzaraptor, "SO CLOSE!" screen), Story map (opening cinema auto-played, SKIP, STORY LOG), Settings, Party Modes setup (PARTY CUP toggle ON/OFF, started a Cup, pause, QUIT-twice), Free Play at BRUTAL (lost 1-?; one BRUTAL KO via edge shove), How To Play (Basics tab).
- Matches played: 2 TOUGH Free Plays, 1 Trial, 1 Party Cup game (quit at the countdown), 1 BRUTAL 1v1 (abandoned at 1-1 then 1-3), plus a started-and-quit extra. Won 0 matches; won 3 rounds in total across TOUGH (2) and Trial (1) and 1 round at BRUTAL (edge shove).
- Not covered (ran out of budget): Gauntlet run, Daily, Spicy chapters, phone mode, Workshop, Online, Records page 2, actual shiny purchase (button gave no feedback, see issue 12).
- `/errors` checked at start, middle and end: **none**.

## What worked for me
- **BOT LEVEL ladder** EASY / NORMAL / TOUGH / HARD / BRUTAL is exactly what a fighter wants; the label shows on both the pill and the "Bot difficulty:" line, and each bot seat says "Bot: TOUGH (tap)".
- **Receipt tips are specific and useful**: "Knocked out by: cutlery x3, swipe, a KAIJU" and "DASH sideways when you see a charge line, or SWIPE to parry it back." (`art-src/.playtest/r8-7102/shot-9.png`, `shot-12.png`). The "Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings." tip is kind.
- **Move Lab** is a great learning tool: one click from the Gallery gives a practice dummy, a clear bottom banner "MOVE LAB: Gobzilla Jr.: STOMP to go KAIJU, then THROW / SWIPE for Seed Spray · Esc to leave", the YOU marker, and Esc returns to the Gallery (`shot-16.png`).
- **KAIJU mode HUD** is readable: the belly bar turns into a red KAIJU timer, the card says "KAIJU MODE!", big range rings show the area (`shot-10.png`). "STOMP READY!" shows on the HUD card.
- **FAST FORWARD x3 - only bots left** banner after I died keeps pace up (`shot-7.png`).
- **Shove-off-edge is a real skill play**: a single well-timed dash shove KO'd a BRUTAL Chocomunch (`events: CHOCOMUNCH knocked out by YOU (fall)`). That feels fair and satisfying.
- **Round-end plate and result plate** are readable and do not cover the buttons (REMATCH / MENU stay visible) (`shot-8.png`, `shot-12.png`, `shot-22.png`).
- **Trial descriptions** state the exact opponent, bot level, and the 3-star KO goal ("You: GOBZILLA vs PIZZARAPTOR (hard) · ★★★ = 4+ KOs") (`shot-20.png`). Every trial is a different kind of fight (Bare Knuckles, Two Crowns, Brutal Bot...): great depth for a fighter.
- **Quit asks twice** in a Party Cup and the pause label says "QUIT (ends the Cup / run)" (`shot-30.png`).
- **How To Play** states the Giant Hand rule clearly: "The Giant Hand grabs the FULLEST belly: STOMP first, or DASH just as it reaches you to slip under it." (`shot-35.png`).

## 🧾 Exactly what would make this a 9/10 for me
1. **Post-match "why you lost" breakdown with replay/KO cause per round** (+1.0)
   - **what:** replace the one-line "Knocked out by: cutlery x2, a KAIJU, fell off, the Giant Hand" with a per-round row: round #, time of death (e.g. 0:03), cause, killer, and what you were doing (holding nothing / belly 85 / dashing).
   - **where:** every results screen (Free Play, Party, Trials), plus Trial "SO CLOSE" screen.
   - **how:** a 5-line table under the ranking, e.g. `R1 0:03 skewered by Bubblegumbo (you were unarmed, belly 0)`. A "WATCH" button replays the last KO (INSTANT REPLAYS already exists, so reuse it). Show round time and "who got first grab" as a stat.
2. **Make round openings fair: guaranteed no-kill window or visible spawn-grab race** (+0.8)
   - **what:** on TOUGH/HARD/BRUTAL I was killed 1-3 s after GO in at least 6 rounds (`R1 BRUTAL: roundTime 1`, `R3 TOUGH: roundTime 2`, `Hard Duel R2: 3 s`). The throw race at the start decides the round.
   - **where:** all Classic rounds; Trials at HARD/BRUTAL most.
   - **how:** 1.5 s spawn shield for everyone OR bots' reaction delay of 0.5 s on first grab at TOUGH, 0.3 s at HARD; show a short "GRAB!" ring on the nearest cutlery in the countdown for all players. Keep BRUTAL instant.
3. **Per-kaiju power stat card in the Gallery** (+0.7)
   - **what:** the Gallery only says "Seed Spray: Spits strawberry seeds that shove rivals in front". I want numbers.
   - **where:** Gallery bottom panel and Move Lab banner.
   - **how:** a row `RANGE 180 · DURATION 5 s · COOLDOWN 3 s · SHOVE FORCE ●●○ · COUNTER: dash sideways` for every kaiju, with a "best used when" line. Fighters can then plan matchups; Trial descriptions can link to the power.
4. **Bot personality / "tell" info so BRUTAL feels beatable** (+0.6)
   - **what:** bots at all levels look identical and the difference between TOUGH, HARD and BRUTAL is invisible; I could not tell what to learn.
   - **where:** Free Play setup (BOT LEVEL pill), Trials cards, a "SCOUT" line in the countdown.
   - **how:** one-line bot sheet per level (reaction time, how often it dodges the hand, whether it shoves, aims lead). On the countdown, show the rival's trait line: "CHOCOMUNCH (BRUTAL): rushes cutlery, rarely dashes, fears edges." Add a tiny difficulty icon next to rival names on the HUD.
5. **Visible Giant Hand telegraph and dodge feedback** (+0.5)
   - **what:** the hand is a headline fairness feature, but I never saw it in `/state` dangers, and when it killed me the only feedback was "YOU knocked out (hand)" (events) and "the Giant Hand" on the receipt.
   - **where:** in-match HUD and receipt.
   - **how:** a red shadow + warning icon over the target 1.0 s before the grab, a "DODGED!" popup (+ small token reward, first 5 per match) when the dash window is hit, and "Hand KO credited to X" in the kill feed so players learn the new rule.
6. **Matches that end sensibly in 3-player Free Play** (+0.4)
   - **what:** a first-to-3 with 3 players dragged to 7 rounds (`Free Play #2: BUBBLEGUMBO 3 / GOBZILLA 2 / AVOCADRAKE 2`). Spread results make me feel like an observer.
   - **how:** show a "match point" marker, and scale rounds needed (or use sudden death) for 3+ players; show the round number out of a max ("ROUND 5 · MATCH POINT: AVOCADRAKE").
7. **Fix the unclear/low-contrast bits** (+0.3): see issues 3, 5, 6, 8, 9, 10 below.
8. **A fighter-focused progression track** (+0.5): "Beat HARD Duel without losing a round", "Parry 10 throws", "Dodge the Giant Hand 5 times", "Win a round with no cutlery" achievements, Mastery XP breakdown and per-kaiju KO stats in Records.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play at BRUTAL / TOUGH, Trial Hard Duel | Rounds routinely end in 1-3 s of play. E.g. BRUTAL R1 `roundTime 1`, TOUGH R3 `roundTime 2`, Hard Duel R2 `3 s`. The first cutlery grab decides, with no counterplay window. | `shot-22.png` (final of Hard Duel) | Spawn shield or reaction delay for bots on first grab (see checklist 2). |
| 2 | major | In-match | No clear "who hit me / what hit me" at death except a tiny kill-feed line ("AVOCADRAKE skewered GOBZILLA", bottom center, ~14 px) that fades quickly. | `shot-7.png` | Bigger, longer kill feed; show a freeze-frame/outline on the killer for 0.7 s. |
| 3 | minor | Party Cup quit confirm | The confirm hint "TAP QUIT AGAIN TO REALLY END IT" is dark brown on the dark table edge, very low contrast and at the very bottom of the screen (y=692). Also the QUIT button itself does not change text/colour on the first press. | `shot-31.png` | Make the QUIT button turn red and say "SURE? TAP AGAIN"; put the hint in a white plate. |
| 4 | minor | Trial result "SO CLOSE! TRY AGAIN?" | I lost 1-3 (one round of three), "you: 1" KO, and it still says "SO CLOSE!". Misleading for a clear loss. | `shot-22.png` | Pick the headline by score margin (1 round away = "SO CLOSE", else "TOUGH ONE - TRY AGAIN"). |
| 5 | minor | Kid Mode setting | Description still reads "Story: easier rivals, 1-line chats, bigger result text" but this round Kid Mode also sets easy bots in Free Play, Party and Daily. The player can't tell. | `shot-26.png` | Update copy: "easier rivals everywhere (Story, Free Play, Party, Daily)...". |
| 6 | minor | Free Play result plate, round-win plate | The star row "GOBZILLA ☆☆☆ BUBBLEGUMBO ★★☆ AVOCADRAKE ★★★" is small white text; filled and empty stars are hard to tell apart in the shot, and names aren't colour-coded on the plate. | `shot-8.png` | Colour each name in its kaiju colour, use bigger gold filled stars. |
| 7 | minor | HUD name vs Gallery name | HUD says "GOBZILLA", the setup/gallery/Move Lab banner say "GOBZILLA JR." and the title text "Gobzilla Jr.". Inconsistent. | `shot-3.png`, `shot-14.png` | Use one name everywhere. |
| 8 | minor | Party Modes setup (bottom text) | The Party Cup explainer "🏆 Party Cup = 6 games: CLASSIC → CRUMB RUSH → HOT DUMPLING → TEAM FEAST → GOLDEN SPOON → CLASSIC · places score 5/3/2/1 · final ×2 · switch it ON, then PLAY" sits at y=661, only a few px above the KEYS / HOUSE RULES buttons (top y~670) and runs 1170 px wide, nearly touching both screen edges. | `shot-27.png` | Move it above the PLAY button or split it in 2 lines with more spacing. |
| 9 | minor | Pantry footer | "Colours you buy appear in the 📖 KAIJU Gallery. Gauntlet items work on every new run." is ~11 px, dim grey on dark; very hard to read. | `shot-18.png` | Raise to 14 px and brighter. |
| 10 | minor | Trials list | Description lines are auto-shrunk unevenly: "Chef's Table" text is clearly smaller than the other cards, and "Bare Knuckles" text almost touches the card edges. | `shot-20.png` | Wrap onto 2 lines at a fixed size instead of shrinking; widen padding. |
| 11 | minor | Gallery info panel | The Mastery line wraps awkwardly: "Mastery ★★★★★★★ Lv 2 Line Cook (0/100 XP) · next: ⭐ Star on your HUD card" breaks with a leading "· next:" on the second line. No power numbers anywhere (see checklist 3). | `shot-14.png`, `shot-17.png` | Put "NEXT:" on its own line, add the stat row. |
| 12 | major | Gallery SHINY button | Clicking ✨ SHINY with 93-118 tokens and Mastery Lv 1-2 does nothing visible (no toast, no tooltip, no state in `/look`). A player can't tell if it is locked, how much it costs (300 🪙) or what Mastery is needed (Lv 3). | `shot-17.png` | Show a panel/toast "SHINY: 300 🪙 + Mastery Lv 3 (you: Lv 2, 118 🪙)" and grey the button when locked. |
| 13 | minor | Records / Pantry tokens | Chef Tokens jumped 93 > 118 (+25) after I entered the Move Lab and returned, with no receipt or toast. The title "FIRST SERVICE" counter also moved 2/6 > 3/6 while still listing "Finish the 1-minute Practice (+20 🪙)" in NEXT UP. Likely the practice goal counted the Move Lab. | `shot-18.png`, title `/look` text | Show a "+20 🪙 First Service" toast and refresh the NEXT UP line; make clear whether Move Lab counts as Practice. |
| 14 | minor | Records | "Next rank: Prep Cook at 6 pts (you: 1)" when I'm Mastery Lv 2 with 0 achievements: the pts formula "2 per achievement + 1 per kaiju Mastery level" is unclear (does Lv 2 give 1 or 2 pts?). | `shot-13.png` | Show the breakdown "Mastery 1 + achievements 0". |
| 15 | polish | Records | Stats column is big but lacks fighter stats: no per-kaiju KOs, no parries, dodges, hand dodges, KO causes, round-win rate by bot level. | `shot-13.png` | Add a "COMBAT" tab. |
| 16 | polish | Results receipt | "Knocked out by" shows only counts of causes (cutlery x2, a KAIJU, fell off, the Giant Hand); not who or when. | `shot-12.png` | See checklist 1. |
| 17 | polish | Free Play 1v1 | The default "First to 5" appears for a 2-seat game (`firstTo: 5`) but the pill said FIRST TO 3 earlier, and I was not told it changed. | `/state` firstTo=5 | Show "FIRST TO 5 (1v1)" on the countdown. |
| 18 | polish | Story opening | Opening cinematic auto-plays on entering the Story; the word-by-word subtitle ("one") appears centered at the very bottom over a dark plate; there's a SKIP button but no "play once" memory seen. | `shot-23.png` | Remember "seen" and skip automatically after the first time. |
| 19 | polish | Story map | Locked tabs now explain how to open ("clear chapter 6 to open", "finish the Grand Feast"): good, but the text is tiny (about 11 px) under the tab labels, partly dim. | `shot-25.png` (behind modal) | Increase size. |
| 20 | polish | Pause menu | `/look` does not list pause button labels as buttons in some cases (in Party Cup pause no pause texts at all appeared in `/look`), only visible in screenshots. Accessibility/automation gap. | `shot-30.png` | Expose pause texts. |
| 21 | polish | Pause menu in Cup | "RESTART" is offered during a Party Cup game; unclear what it restarts (the game? the Cup?). | `shot-30.png` | Label "RESTART GAME (keeps Cup)". |
| 22 | polish | Trial countdown HUD | No on-screen reminder of the Trial goal (e.g. "HARD DUEL · ★★★ = 4+ KOs") or KO counter against the goal during play. | `shot-21.png` | Add "KOs 1/4" to the HUD card. |
| 23 | polish | Free Play match intro | The tip "Spoons and Pizza Cutters bounce off walls: aim at the edges." overlaps visually with a plate of grapes and cutlery art behind it (white text with a dark outline; readable but busy). | `shot-4.png` | Place tip on a plate. |
| 24 | polish | How To Play | The Basics tab is a dense wall of ~14 px text with no numbers (no throw ranges, no hand timing, no KAIJU duration; I measured KAIJU lasting ~5 s). | `shot-35.png` | Add a short stats table and diagrams. |
| 25 | polish | Free Play seats | After adding bots I can't pick their kaiju without extra clicks (bots are random and unnamed in setup: "click: add a bot"). | `shot-3.png` | Allow picking the matchup so I can practice specific counters. |

## 🔠 Text and layout check
- Title: OK. NEXT UP plate is readable; top-right buttons small but fine (`shot-1.png`).
- Free Play setup: OK, no overlaps (`shot-2.png`, `shot-3.png`). "TWIST NONE", "HAZARDS ON" pills are fine.
- Match HUD and countdown: OK; names, belly bars, stars and weapon names fit. Kill-feed line at the bottom small (issue 2) (`shot-4.png`, `shot-7.png`).
- Round end plate and Results (3-player): OK; plates sit behind the text and buttons REMATCH / MENU are clear. Receipt box bottom-left is dense but fits (`shot-9.png`, `shot-12.png`).
- Records page 1: OK; the right-aligned "PREP COOK AT 6 PTS (YOU: 1)" is long but stays inside the panel (`shot-13.png`).
- Gallery: OK except the Mastery wrap (issue 11) (`shot-14.png`, `shot-17.png`).
- Move Lab: OK (`shot-16.png`).
- Pantry: OK; footer too small (issue 9) (`shot-18.png`).
- Challenges panel: OK (`shot-19.png`).
- Trials: text shrink inconsistency (issue 10) (`shot-20.png`).
- Trial countdown: OK (`shot-21.png`). Trial result "SO CLOSE" screen: OK layout, wording issue 4 (`shot-22.png`).
- Story map + opening cinematic: OK (`shot-23.png`). Story log modal: OK; empty state text sits small top-left of a big empty panel (`shot-25.png`).
- Settings: OK, no overlaps (`shot-26.png`).
- Party Modes setup: bottom explainer cramped (issue 8) (`shot-27.png`).
- Pause menu: OK; quit-confirm hint low contrast (issue 3) (`shot-30.png`, `shot-31.png`).
- How To Play: OK but dense (issue 24) (`shot-35.png`).
- Not checked: Daily, Workshop, Online, Records page 2, Spicy, Gauntlet in-run, phone mode.

## The single biggest structural problem
There is no way to *learn* the fighting. The game gives me one-line tips and a Move Lab, but nothing explains how the bot levels differ, what each KAIJU power really does (range, duration, cooldown), or why a specific round was lost. Combined with fast round openings (1-3 s kills on TOUGH and above), the outcome often feels decided by who grabs the first cutlery, not by skill. A fighter needs feedback loops: a clear cause-of-death report, a visible hand telegraph with dodge reward, and numbers I can optimise against.

Secondary: three-player first-to-3 matches grow to 7 rounds without any visible "match point" structure, which makes it feel unfocused, and the Trial/Gauntlet content (the most fighter-relevant) is hidden behind CHALLENGES with no goal tracking in the HUD.

## Big change proposals (2-3, most important first)
### Proposal 1: Fight Report + Instant Lesson
- **Problem it solves:** I don't understand losses; the receipt gives counts of causes only.
- **How it would work:** after every round (collapsible) and every match, show a "FIGHT REPORT" with a timeline strip: each KO as an icon at its second (0:03 skewered, 0:11 squashed by KAIJU, 0:19 Giant Hand). Below it, 1-3 auto-generated lessons chosen from rules, e.g. "You died with 0 cutlery within 3 s in 2 rounds: grab first, or dash toward the edge-side cutlery", "Belly was 85 when the Hand came: STOMP first or DASH at its landing ring", "3 deaths to throws: you dashed 0 times; SWIPE parries within 0.3 s". A WATCH button replays the last KO of each round (reusing INSTANT REPLAYS). Records keeps a COMBAT tab with the same causes aggregated per kaiju.
- **Example moment:** Hard Duel loss: report says "ROUND 2 · 0:03 · you were unarmed, rival had the Fork (grabbed at 0:01). TIP: the fork spawn near you is 110 px away: go for the knife." Next try I know what to change.
- **Rewards / progression hooks:** "Parry 10 throws", "Dodge the Hand 5 times", "Survive 20 s in a round" achievements and Mastery XP for dodges.
- **Risks and edge cases:** text volume on small screens; 4-6 player matches need the report limited to "you". Keep it skippable and collapsed by default after the first time.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Bot Scouting and Tuned Openings
- **Problem it solves:** TOUGH/HARD/BRUTAL feel like different speeds of the same coin flip; opening races decide rounds.
- **How it would work:** (a) Give each bot level a published profile: reaction time (TOUGH 0.45 s, HARD 0.3 s, BRUTAL 0.15 s), dodge chance for the Giant Hand (40/70/95%), and aim error. (b) Add a 1.5 s "spawn shield" for everyone in rounds, with the round countdown "GO!" releasing it; BRUTAL gets no delay but also no shield bonus. (c) On the countdown screen, show a SCOUT card per rival: "CHOCOMUNCH · BRUTAL · rushes cutlery, rarely dashes" with 2-3 weakness tags (edge-shove, parry, hand bait). (d) The setup screen's BOT LEVEL pill shows a tooltip with the profile.
- **Example moment:** before a Brutal Bot Trial the card says "fearless but predictable: shoves at the edge, never dodges the hand." I bait the Giant Hand with a fuller belly and win the round.
- **Rewards / progression hooks:** Trial 3rd star gets a golden "Scouted" frame once all bots are beaten at BRUTAL; new achievement "Beat each bot level with each KAIJU power".
- **Risks and edge cases:** balance (must retune TOUGH/HARD); online mode must not be affected.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 3: Arena Training Dojo (extends Move Lab)
- **Problem it solves:** Move Lab only lets me test the power on a dummy; I can't practise dodges, parries, Giant Hand timing, or edge shoves.
- **How it would work:** Gallery > MOVE LAB gets a menu: POWER (current), PARRY (a bot fires telegraphed throws; counter shows hits parried), HAND DODGE (hand grabs every 8 s, counter shows dodges), EDGE SHOVE (bot hugging the edge). Each drill has a 3-star target (e.g. 5 parries in a row) and a coin reward the first time (20 🪙). The power drill displays the live numbers from checklist item 3 (range ring, cooldown bar).
- **Example moment:** I clear Hand Dodge x5 and unlock the achievement; then the real Giant Hand is easy.
- **Rewards / progression hooks:** drill stars count toward Mastery XP; Trials lock/unlock hints ("Recommended drill: PARRY").
- **Risks and edge cases:** needs scripting bots in the practice mode; must keep Esc leaves behaviour.
- **Size:** L
- **Score impact for me:** +0.6

## How this round's new features felt
- **TOUGH bot level:** a solid step; at TOUGH I still lost 0-3 and 2-3 in matches while winning a few rounds, which is the right place to start. But the jump to HARD/BRUTAL is large and the setup screen gives no description (just the name), and the BRUTAL 1v1 killed me in ~1 s of play once. BRUTAL feels cheap rather than smart in openings. Needs the profile text (checklist 4).
- **Giant Hand dodge:** the rule is explained well in How To Play ("DASH just as it reaches you to slip under it"), and I did get "YOU knocked out (hand)" once, plus the receipt line "the Giant Hand". I could not verify the dodge itself (it never appeared in `/state` dangers during my windows), and there's no telegraph or "DODGED!" feedback that I could see via text. Hand KOs counted for last hitter wasn't visible in the kill feed.
- **Hand KO credit:** can't confirm from the events log ("YOU knocked out (hand)"); the kill feed doesn't say who is credited.
- **Kid Mode easy bots:** didn't test, but the Settings copy is out of date (issue 5).
- **Shiny forms:** the SHINY button gives no visible response when locked (issue 12); couldn't evaluate in matches.
- **Party Cup ON/OFF:** works; the toggle label "🏆 PARTY CUP ON" is clear and the explainer exists, but the explainer layout is cramped (issue 8). Quit-twice works, but the confirm hint is low contrast (issue 3). First game header "🏆 PARTY CUP · GAME 1/6 · CLASSIC · Chef's Board" is clear.
- **Story:** STORY LOG empty state is clear ("Nothing yet! Clear chapter 1 and your story starts here."); locked tabs give reasons. The Opening cinematic auto-played on entry. Did not reach a boss (PHASE 2) or chapter 4.
- **Tinkering (TWIST picker, Workshop UNDO):** not touched.
- **Phone:** not touched.
- **YOU marker:** present in matches (`▼ YOU` in `/look`, `shot-16.png`), and it's helpful; during the first countdown it's absent (`shot-3.png`, `shot-21.png`) which is the moment I'd want it.
- **Plates behind result text:** worked well (`shot-8.png`, `shot-12.png`, `shot-22.png`).
- **Receipts:** carried tokens, mastery level/XP, First Service and a tip; they said nothing about achievements this time (none unlocked). Good.
- **Move Lab: Esc leaves:** confirmed, returns to the Gallery.
- **BRUTAL retune:** one BRUTAL bot was beatable with an edge shove, but it killed me at the round start repeatedly.
- **Trials:** very strong concept (eight fixed fights, goal listed). Missing in-match goal tracking and a recommended loadout.
- **Pantry:** weekly orders ("Knock out 20 rivals 4/20") are fighter-friendly; the shop is colour-only for fighters (no combat items besides Gauntlet perks).

## Bugs that block play
- None found. `/errors` returned `none` at start, middle and end.
- Not a blocker but notable: the Gallery SHINY button silently does nothing when locked (issue 12).
