# Playtest evaluation — The Fighter (round 10, port 7102)

**Fun score: 6.5 / 10** (fights are fast and the 12 KAIJU powers are distinct, but HARD rounds are decided in 2-5 s, KAIJU mode is only ~4-5 s long and ends in a self-stun, and there is almost no way to practise or read a fight.)

## What I did
- Fresh save. Title -> Free Play (me + 2 HARD bots, then 1v1) -> ~4 full matches by hand (`attack`/`crumbs`/`stomp`/`power`/`shove`/`flee`) plus 2 matches with `auto:hard` driving my seat. Roughly 14 rounds played: 1 win, 5 losses at 3 players on HARD; a Trial win.
- Gallery: read the power text of all 12 unlocked kaiju (reach + cooldown), entered Move Lab as Hotchog.
- Twist picker with 🧪 TRY IT on, KAIJU FRENZY quick round vs an EASY bot (checked KAIJU warning ring).
- CHALLENGES: Trials list; played Hard Duel (cleared ★☆☆, 3 KOs, missed the 4-KO goal by one). Gauntlet Starters wave 1 (cleared, saw perk picker + next-wave preview), partway into wave 2 (lost a life).
- About 100 harness commands, ~26 screenshots, all opened. `/errors` at start, middle and end: none.
- Did not visit: Story, Party, Online, Pantry, Workshop, Records, Settings (not my profile's focus; I ran out of budget on combat).

## What worked for me
- **The power list is great fight knowledge.** The Gallery states reach and cooldown for each power ("Seed Spray ... reach 207 · every 1.6 s", "Flutter ... reach 299 · every 1.2 s", "Claw Snap ... reach 126 · every 1.2 s"). Exactly what a mastery player wants. Powers are clearly different archetypes (push, blind, dash, mines, boomerang, ring, trail).
- **KAIJU warning ring (round 10) works.** On the Frenzy round the red pulsing ring plus the yellow inner ring read instantly (art-src/.playtest/r10-7102/shot-15.png). I understood "reach" and "not yet squashing" without text.
- **Round-end tips are useful and specific** ("Knocked out by: cutlery x3 · DASH sideways when you see a charge line, or SWIPE to parry it back").
- **"You went out at 3s: thrown cutlery (SALMONSTER)" death line** is honest, immediate feedback (shot-6.png). I always knew what killed me.
- **Bots feel smart.** On HARD, bots bait: the Squidgeon bot waited until my KAIJU timer was almost out, then went KAIJU itself (I had 1.1 s left, it had a full bar). Hotchog bots kill each other too. That is real depth.
- **Gauntlet pacing is gentle and previews work.** "WAVE 1 CLEARED! Next: wave 2 · 1 rival (NORMAL) · ❤❤❤" plus a 3-perk pick (Full Belly / Ghost Start / Hot Feet) is clear (shot-25.png).
- **Trials descriptions are clear** with explicit star criteria and KO goals (shot-20.png).
- Easy-to-read match results screen with per-match rewards and tips (shot-7.png, shot-21.png).

## 🧾 Exactly what would make this a 9/10 for me
1. **Make rounds last long enough to outplay someone (HARD / BRUTAL).** *Where:* Free Play, Trials, Gauntlet, 1v1 and 3-player. *What:* in my log, rounds ended at roundTime 2 s (Pizzaraptor 1v1, thrown chopstick), 4 s, 5 s, 8 s; the first throw at spawn decides many rounds, and rounds vs HARD went 1-5 for me at 3 players. *How:* (a) give every kaiju a 1.0 s spawn shield / "no-throw" window after the 3-2-1 (bots currently wait 1.8 s, make that apply to the player's first hit too), or (b) start with no cutlery in hand and let it spawn on the table at second 2, or (c) make a first throw only knock back (not KO) if the target is above 100% belly... pick one; target average HARD round length 12-20 s. *Impact:* +1.0.
2. **Make KAIJU mode a decision, not a countdown into a self-stun.** *Where:* all modes. *What:* KAIJU lasts ~4-5 s (kaijuSecs 3.9-5.4 at start) and ends with `dazed:true` on the player; 3 times I used KAIJU and either wasted it walking to the target or was squashed/flicked while dazed (shot-16.png: Frenzy, "YOU GOT FLICKED BY THE GIANT HAND" while dazed after my KAIJU). *How:* extend KAIJU to 7 s, shorten the post-KAIJU daze from the current ~2 s to 0.8 s, and let a stomp-in-progress be cancelled by a SWIPE parry. Show the remaining KAIJU seconds as a number above the bar (it is only a bar now). *Impact:* +0.8.
3. **Fix the Move Lab so I can actually test a power.** *Where:* Gallery -> Move Lab. *What:* the dummy (Dumplord) sits on its rug 700-900 px away and walks; my power at dist 781 and dist 334 hit nothing. There is no hit readout. *How:* put the dummy 250 px in front, add a "Reset dummy" key and a floating damage/knockback distance number ("shoved 212 px"), a selectable dummy kaiju (so I can test Mothball's Flutter vs Dumplord's weight) and let me hold KAIJU indefinitely (no timer, belly auto-full) in the Lab. *Impact:* +0.6.
4. **Let me practise vs a specific bot with a replay of how I died.** *Where:* after a round / on the match-end screen. *What:* the "INSTANT REPLAY" banner exists but I cannot scrub, loop or slow it. *How:* on match end, a "WATCH LAST DEATH" button with 0.25x slow-mo and the incoming projectile path drawn. *Impact:* +0.4.
5. **Fix TRY IT leaking settings into Free Play.** *Where:* Free Play twist picker. *What:* after one TRY IT round the screen showed BOT LEVEL EASY (was HARD), FIRST TO 5 (was 3), TABLE SUNDAY ROAST (was ALL), TWIST KAIJU FRENZY (was NONE), and my 3 seats were reset (shot-18.png). *How:* TRY IT must run with its own temporary config and restore all five settings and seats afterwards. *Impact:* +0.3 (this alone would have silently ruined my HARD session).
6. **Fix overlapping banners during KAIJU kills.** *Where:* in-match death/KO. *What:* "YOU GOT FLICKED BY THE GIANT HAND" banner, "FIRST BITE!" popup, kaiju name label and INSTANT REPLAY title all land on the same 300 px (shot-16.png), unreadable. *How:* one popup at a time, queue them, and put the replay banner at screen top only. *Impact:* +0.3.
7. **Surface power stats where I fight.** *Where:* Free Play seat card and in-match HUD. *What:* the seat card shows only "🌟 Ink Cloud". *How:* add reach and cooldown ("198 px · 1.6 s") in the seat card, and a small cooldown ring on the KAIJU bar showing when the power is ready again (state has `powerReady`; the player cannot see it). *Impact:* +0.3.
8. **Add a "Spar" kaiju-matchup mode with a per-matchup win-rate.** *Where:* Records / Gallery. *What:* no stats of "my Squidgeon vs Hotchog 1-3". *How:* store matchup W/L and show it under the kaiju card ("vs Hotchog 0-2, toughest rival"). *Impact:* +0.3.
9. **Doubles in the twist picker need descriptions.** *Where:* twist picker pink cards show only "ICE RINK + TURBO" etc. (shot-13.png). *How:* add a one-line summary as singles have. *Impact:* +0.1.
10. **Gauntlet celebratory art must not cover perk card 3.** See shot-25.png. *Impact:* +0.1.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play after 🧪 TRY IT | After a quick try, setup shows BOT LEVEL EASY, FIRST TO 5, TABLE SUNDAY ROAST, TWIST KAIJU FRENZY; the 3 seats I built were emptied ("click or THROW to join"). Settings leak from TRY IT. | shot-18.png | Run TRY IT on a temporary config and restore everything |
| 2 | major | In match, 1v1/3-player HARD | Rounds end at 2-5 s; a single thrown chopstick KO'd me at roundTime 2 (Trial Hard Duel) and Round 1 vs two HARD bots at 4 s. First-throw luck dominates. | shot-6.png | Spawn shield / delay (see 9/10 item 1) |
| 3 | major | KAIJU mode | Lasts ~4-5 s, then `dazed:true`; Hotchog/Squidgeon bots deliberately wait it out then kill the dazed player. | shot-16.png | Longer KAIJU, shorter daze, show the seconds left |
| 4 | major | Move Lab | Dummy Dumplord is on its rug far away (dist 781, 434, 334); powers used at that range hit nothing; no hit feedback. KAIJU timer ends (4.6 s) before I walk to it. | shot-9.png, shot-12.png | Dummy 250 px away, infinite KAIJU in Lab, hit readout |
| 5 | minor | In match, KAIJU kill | Banner "YOU GOT FLICKED BY THE GIANT HAND", popup "FIRST BITE!", the kaiju name tag and the red ring all overlap; kaiju name label reads garbled (looks like "SQUIDGON" + overlay) | shot-16.png | Queue popups, one at a time |
| 6 | minor | In match, KAIJU start | "THROW / SWIPE: SEED SPRAY" hint and "KAIJU!" text sit over the kaiju sprite and the table rim and are low contrast | shot-15.png | Move hint above the ring on a dark pill |
| 7 | minor | In match | "REVENGE IS SWEET!" popup is shown in the same moment I am knocked out / when the bot knocked me out (Round 2 vs Salmonster, Trial round 3); the stat is misleading | shot-3.png | Only show it for the player who got the revenge KO |
| 8 | minor | Match end (Free Play) | Giant celebratory winner art (Hotchog) bleeds off the right edge of the screen and sits over the table's rug | shot-7.png | Contain the art inside the table frame |
| 9 | minor | Gauntlet wave cleared | Celebratory Gobzilla art overlaps perk card "3 · 🌶️ HOT FEET" on the right (card text is still readable) | shot-25.png | Move art up-right or behind the cards |
| 10 | minor | Trial clear | HUD stars (GOBZILLA ★★★) show round wins while the banner says "TRIAL CLEAR ★☆☆": two different star systems on the same screen | shot-21.png | Label the round pips "ROUNDS" or recolour them |
| 11 | minor | Trial clear | Banner text shows "1 / START retry · Esc trials" on a controller/touch-agnostic game; fine for keys but no on-screen hint for the RETRY button next to it | shot-21.png | Hide the key text when a mouse/pointer is used |
| 12 | minor | Twist picker | Doubles have no description line, only "ICE RINK + TURBO" | shot-13.png | Add the effect text |
| 13 | minor | Twist picker | 🧪 TRY IT toggle gives no hint whether it persists, or what bot level it uses; I only found out it uses EASY after the fact (setup now showed "EASY: slow, misses a lot") | shot-13.png, shot-18.png | Add "1 round vs an EASY bot" under the toggle |
| 14 | minor | Free Play seat card | Shows only power name ("🌟 Ink Cloud"), no reach / cooldown even though Gallery has them | shot-2.png | Add "198 px · 1.6 s" |
| 15 | minor | Free Play seat card | Clicking my own seat cycles the kaiju (Gobzilla -> Squidgeon -> ...) with only two tiny blue arrows as a hint | shot-2.png | Larger arrows or "click to change" caption |
| 16 | minor | HUD | No cooldown indicator for the KAIJU power after use; `powerReady` is exposed but the player sees only the belly bar | shot-15.png | Ring around the kaiju or icon in the HUD |
| 17 | minor | Gauntlet | Preview says "wave 2 · 1 rival (NORMAL)" but not which kaiju or which table | shot-25.png | Show "NORIGON on Picnic Blanket" |
| 18 | minor | Gauntlet | Wave 2 passed with life lost (❤❤) after about 5 auto commands; no "LIFE LOST" screen was visible to me and the game went directly to a new round at wave 2 | shot-26.png | Add a short "LOST A LIFE: 2 left" banner |
| 19 | minor | Gauntlet / Pause | Pressing Escape (even twice) in a Gauntlet round did not take me out of the game; I could not tell if pause opened (no pause text in `/look`) | shot-26.png | Verify Esc opens pause menu in Gauntlet |
| 20 | polish | Gallery | Move Lab button label "try its power" is tiny and low contrast next to the 🥋 icon | shot-8.png | Bigger caption |
| 21 | polish | Gallery | No stats about KAIJU duration (only reach and cooldown) | shot-8.png | Add "KAIJU lasts 4.6 s" |
| 22 | polish | Gallery | Locked colours (19 of 21 are 🔒) look identical; no teaser of what they are until clicked | shot-8.png | Show a silhouette of each colour |
| 23 | polish | Match end | "Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings." appears after a loss, but there is nothing between EASY and NORMAL for a fighter who wants "a bit easier"; also appears at HARD where a fighter wants to improve | shot-7.png | Add a "Practice vs this bot" button |
| 24 | polish | Trials | The kaiju I play as in a Trial is not shown on the Trials list (I played Gobzilla because of the Free Play seat) | shot-20.png | Show "You: GOBZILLA ▸ change" on each card |
| 25 | polish | Match flow | Harness `/act` auto-advances through round-end screens; the 3-2-1 countdown plus bot 1.8 s wait means ~5 s of nothing at the start of each round | n/a | Skip the "Round N · Table" tip card for repeat rounds |

## 🔠 Text and layout check
- Title screen: OK (text-only checked via /look; no overlap visible in /look order).
- Free Play setup (shot-1.png, shot-2.png, shot-18.png): OK. Text readable, pills not overlapping. Only note: "click or THROW to join" is small on the empty seats.
- Twist picker (shot-13.png): OK, no overflow. Doubles have no description (issue 12). Small text "No cutlery at all: swipe, shove and stomp" is the smallest on the page but readable.
- In-match HUD (shot-3.png, shot-15.png, shot-16.png): problem. Overlap of "YOU GOT FLICKED BY THE GIANT HAND", "FIRST BITE!" and the kaiju name tag (shot-16.png). "THROW / SWIPE: SEED SPRAY" hint over the rim (shot-15.png).
- Match-end screens (shot-6.png, shot-7.png): shot-7.png winner art clipped at the right edge (issue 8). "THIS MATCH" box OK. Bottom stats line OK.
- Trial clear (shot-21.png): OK except the two star systems (issue 10).
- Gallery (shot-8.png): OK. All 20 portraits plus colour row fit; header "Collection 46% · 🪙 62" OK.
- Move Lab (shot-9.png, shot-12.png): OK; the "SPIKE OUT!" popup is hidden behind the gravy boat in shot-12.png (mild overlap).
- Challenges modal (shot-19.png): OK. Title screen behind the modal shows the "NEXT UP" panel left of the modal edge (cosmetic).
- Trials list (shot-20.png): OK, all 8 cards fit.
- Gauntlet wave 1 (shot-23.png) and wave-cleared (shot-25.png): shot-25.png perk card 3 partly covered by art (issue 9). Wave 2 (shot-26.png): OK.
- Not checked this round: Story, Party, Online, Daily, Pantry, Records, Settings, Workshop, Kid Mode, phone mode.

## The single biggest structural problem
**There is no space between "spawn" and "dead" for combat skill to show up at HARD.** Rounds against HARD bots routinely end within 2-5 s because the first accurate throw kills (no health, no armor, one hit = out), and the 3-player match meant two bots both firing at me. Because the loop is "one hit and you are out," the only decisions I could make were "where to stand when the countdown ends" and "when to stomp." KAIJU is the supposed comeback tool, but with 4-5 s of length and a long post-KAIJU daze, it becomes something that bots wait out, and then punish.

For a mastery player, the depth is in reading and countering. The game gives me good info about powers (Gallery) but no way to try the counter-play (Move Lab dummy is out of range, no hit feedback), no replay to learn why I died, and no matchup stats. So there is no learning loop. That is why the fighter score sits at 6-7: there is plenty of surface (12 distinct powers, parry, dash, 20 kaiju), but the fights are too short and too binary to grow in.

## Big change proposals (2–3, most important first)

### Proposal 1: Opening shield and "first blood" pacing
- **Problem it solves:** HARD rounds are decided by the first throw in 2-5 s (Hard Duel round 1: dead at 2 s; 3-player Round 1: dead at 3 s). No room to outplay.
- **How it would work (detailed design):** After the 3-2-1, all players get a 1.2 s "plate shield" (blue shimmer, can move, grab and dash but cannot be hit or throw). Cutlery in hand at spawn is replaced by one random cutlery on a spot in the table centre that appears at 0.6 s (a "contest" for position). First hit on a player with belly < 50% stuns for 1 s instead of KO; second hit within 4 s KOs. The round timer starts when the shield ends. Bots' 1.8 s wait stays but moves to the shield (so they act the moment the shield drops, no longer at 1.8 s).
- **Example moment:** Hard Duel. 3-2-1, both players bob in blue shimmer, race to the centre cutlery, dash-fake, hit, parry, hit. 15-20 s round.
- **Rewards / progression hooks:** Clean-win tracking: "Won a round with the opening-contest cutlery" achievement. Trial ★★★ goals get easier to reach (more time = more KOs possible).
- **Risks and edge cases:** Slows Crumb Rush/Hot Dumpling openings; keep it off for party modes (option) and for Fists Only. Needs a rebalance of 'bots wait 1.8 s'.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: The Dojo: a real Move Lab plus matchup learning
- **Problem it solves:** I can read what a power does (Gallery) but cannot practise it or see why I lost (Move Lab dummy is at 334-781 px; no hit feedback; replay is passive).
- **How it would work (detailed design):** Gallery -> MOVE LAB becomes "DOJO" with three tabs. (1) DUMMY: infinite KAIJU, dummy 250 px away, selectable dummy kaiju and behaviour (stand, walk, throw, dodge, parry); floating numbers "shoved 212 px / dazed 1.2 s" and a hit-box overlay toggle showing reach. (2) SPAR: pick my kaiju + the bot kaiju + level (EASY..BRUTAL), first to 3, with "Reset" key. (3) REPLAY: last 10 deaths saved (8 s clips), 0.25x slow-mo and projectile path overlay. Records page shows matchup W/L ("Gobzilla vs Hotchog 1-3").
- **Example moment:** I lose to Hotchog's Spike Out three times. In the Dojo I pick Hotchog as the dummy, set "Spike Out every 1.6 s", and learn the 153 px ring can be dashed through at second 1.1.
- **Rewards / progression hooks:** "Dojo Disciple": beat the BRUTAL dummy with each of the 12 kaiju (mastery XP). Mastery Lv unlocks (crown, sparkles) already exist and tie in.
- **Risks and edge cases:** Replay storage on phones: keep input logs only, not video. Needs deterministic sim (state is already stepped by `/act`, so likely OK).
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 3: KAIJU as a committed mode with a visible clock and a short recovery
- **Problem it solves:** KAIJU lasts ~4-5 s, then dazes the user; bots bait it (Squidgeon waited until I had 1.1 s left). The mode feels like a trap.
- **How it would work (detailed design):** KAIJU 7 s, number on the bar ("KAIJU 6.2"). Power cooldown ring around the kaiju. When it ends, a 0.8 s "wobble" (can move at 60% speed, can parry) instead of a full daze. If a rival goes KAIJU while you are KAIJU, both get a 'clash' (ring vs ring) that pushes both back instead of squashing. The giant hand skips KAIJU players for the first 2 s.
- **Example moment:** I stomp at 100%, hit with Ink Cloud at 190 px, dash out of Hotchog's Spike Out, my timer hits 0 and I wobble out of the way rather than being flicked.
- **Rewards / progression hooks:** Achievements for "Clash win" and "KAIJU with 3 KOs"; mastery XP per KAIJU KO.
- **Risks and edge cases:** Changes balance across all 20 kaiju (Mothball's 299 reach Flutter gets stronger with 7 s); needs a tuning pass and Gauntlet re-check.
- **Size:** M
- **Score impact for me:** +0.8

## How this round's new features felt
- **🦖 KAIJU warning (0.5 s growth + red ring):** Good. The ring is easy to read (shot-15.png) and I felt the "can't squash yet" window. But the 0.5 s window is shorter than a reaction time: a bot that stomps next to you can still shove you before the ring fills. The hint text is hard to read over the rim. 8/10 for readability, 6/10 for fairness (the bots' 1.8 s wait at round start helps, but there is no matching grace for players).
- **🏁 Gauntlet:** Gentle ramp works: wave 1 had 1 rival, wave 2 "1 rival (NORMAL)". The wave-clear preview and perk picker are good. I did not reach wave 7 twists. Life loss in wave 2 had no banner that I could see.
- **🎟 Chef's Pass:** Shows clearly (0/12 Trial ★ or Gauntlet wave 0/8) in CHALLENGES and Trials (shot-19.png, shot-20.png). After my first star it was "Trials 1★" on the title button. Clear.
- **🏆 Party Cup / 🧸 Kid Mode / 🏅 Records pin / 📅 Daily / 🛠 Workshop:** not touched.
- **📖 Gallery:** 🪙 balance (62) in the header works (shot-8.png). The locked colours row is a wall of 🔒 icons. Tapping a locked colour to see how to earn it: not tested.
- **🎓 First-timer:** Seat says "👤 YOU · Keys left · A / D" (shot-2.png). One oddity: after TRY IT, my seat card said "👤 YOU · 🤖 Bot: EASY (tap)", looking like both a player and a bot (from the /look text, not screenshot).
- **⚡ Twist picker with 🧪 TRY IT:** Works and is a neat way to test twists, but it leaks settings (issue 1, big for me). Frenzy with an EASY bot was still a loss: the bot waited for my KAIJU to run down, then stomped. That is a nice bot behaviour but not "EASY".
- **Text and layout audit:** Found overlaps in-match (shot-16.png), clipped art (shot-7.png), art over perk card (shot-25.png).

## Bugs that block play
- None that block play. `/errors` was "none" at start, middle and end.
- Non-blocking: TRY IT overwrites the Free Play setup (bot level, first-to, table, twist, seats).
- Non-blocking: Escape did not visibly leave a Gauntlet round (possible pause only).
