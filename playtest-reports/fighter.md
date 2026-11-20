# Playtest evaluation — The Fighter (round 11, port 7102)

**Fun score: 7.0 / 10** (the core brawl, KAIJU powers and Move Lab are great, but HARD bots feel like 1-hit-kill lotteries, the harness-visible depth tools (parry, dash timing, cutlery stats) are not taught or measurable, and nothing tracks fighting mastery beyond KO counts)

## What I did
- ~115 harness commands, about 10 matches/rounds-sets, 0 errors in /errors at start, middle and end (`none`).
- Title -> Free Play: HARD 3-way (Gobzilla vs Squidgeon + Bluebeary): lost 0-3 rounds (KO'd by cutlery x2, KAIJU squash x2, swipe). HARD 1v1 vs Hotchog: lost 0-3 twice (once myself, once with `auto:hard` driving, so even the reference bot loses). NORMAL 1v1 vs Hotchog: lost 2-3 (round 4 and round 2 wins). Mixed result: HARD is brutal, NORMAL is a fair fight.
- Gallery: opened Gobzilla and Squidgeon cards (📊 "You vs it: 0–1" visible), Move Lab with Squidgeon (STOMP then Ink Cloud, KAIJU timer 5.7 s -> 2 s on the HUD, dummy 178 px away, squashed Dumplord).
- Records ▸ GOALS panel and achievements page 1; Help: BASICS, CUTLERY, EXTRAS tabs.
- Challenges: Gauntlet picker (only STARTERS unlocked), TRIALS list (8 fights), played Bare Knuckles (Fists Only; lost 0-2 to a KAIJU Crabbage squash) and Brutal Bot (won 3-0 with `auto:hard`, ★★☆, +113 🪙 and 3 achievements on the receipt).
- Daily preview card (Crumb Rush, SPICY button), Story ch 1 (★★) and ch 2 (cleared, NEW KAIJU Sloba), started ch 3 then quit via the pause menu double-tap QUIT; Party Modes: Team Feast 4 players (live RED 0 – 0 BLUE banner); Pantry; Settings.
- Did not reach the Gauntlet waves, bosses (ch 4), Spicy, Workshop, Online, Party Cup.

## What worked for me
- The KAIJU loop is a real decision: crumbs -> stomp -> 7 s of power. The HUD countdown ("KAIJU 7s!", "KAIJU 2s!") finally makes KAIJU time readable (shot-11, shot-22).
- Move Lab is excellent: dummy stands close (dist 178 and 20), a squash KO happened within 3 s, the tip line says "STOMP to go KAIJU, then THROW / SWIPE for Ink Cloud" (shot-11).
- Gallery detail now shows "You vs it: 0–1" and "Mastery Lv 1 Rookie (0/60 XP)" plus the reward ladder (shot-9). The ✨ Shiny tag shows with "300 🪙 · needs Lv 3".
- Trials list is the best fighter content in the game: Hard Duel, Bare Knuckles, Two Crowns, Dinner Rush, Brutal Bot, Chef's Table. Each tells you the star goal in plain words.
- Result screen receipt is rich and honest: coins, mastery XP, achievements with coin values, a "Knocked out by: 🦖 a KAIJU x2, 🍴 cutlery x2, 👋 swipe" breakdown and a relevant tip (shot-6, shot-19, shot-37). The "Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP" tip after a loss is considerate.
- Instant replay, "STOLEN!" popups, Round banner "GOBZILLA ★★ SQUIDGEON ☆☆ BLOBLIN ☆☆" and the Team Feast live score are readable and punchy (shot-29, shot-33).
- Records ▸ GOALS is clear and gives a real "path to 100%" with PIN buttons (shot-13).
- Bot level pill is clear: EASY / NORMAL / TOUGH / HARD / BRUTAL with a one-line description of what HARD does ("leads its throws, dodges and parries").

## 🧾 Exactly what would make this a 9/10 for me
1. **Make HARD/BRUTAL beatable by reaction, not luck: add a visible wind-up/tell before every bot throw and swipe.** Where: all matches. Behaviour: every bot throw shows a 0.25 s lean/flash and a thin aim line (like the Cleaver's red line) on HARD and below; on BRUTAL no aim line but the lean stays. Right now I was KO'd at ~1.5 s into a round (3-way HARD round 4) and ~3.5 s in the 1v1 with nothing I could react to. Score impact **+0.8**.
2. **Teach and surface the parry and the dash-sidestep as core skills.** Where: Help ▸ BASICS (picture card "PARRY: swipe a flying fork to send it back" exists but has no timing numbers), Practice, and the loss tips. Behaviour: add a Practice drill "Parry 3 throws in a row" paying +20 🪙 once, and show a "PARRIED!" popup + a counter on the receipt ("Parries 2, dodges 4"). Score impact **+0.6**.
3. **Fighting mastery record and goals.** Where: Records and GOALS. Add stats and achievements for parries, KAIJU-squash KOs, KOs while the rival is dizzy, win without ever eating a crumb, beat BRUTAL, plus a per-kaiju "best KAIJU streak" in the Gallery. The 4 closest achievements I was shown (World Tour, Crumb Muncher, Size Matters, Second Breakfast) were all grind items; none were skill goals. Score impact **+0.6**.
4. **Show real numbers for cutlery and KAIJU powers.** Where: Help ▸ CUTLERY and Gallery detail. The cutlery tab says "quick · medium range" with no numbers; the Gallery power line has "reach 207 · every 1.6 s" (good) but nothing about damage, cooldown or what it counters. Add speed, range px, wind-up and "beats / loses to" per cutlery, and a small tier/matchup hint per power. Score impact **+0.5**.
5. **Let me pick my kaiju (and bot kaiju) in Trials and show the matchup before the fight.** Where: Trials. I was handed Chocomunch for Bare Knuckles and Norigon for Brutal Bot with no choice and no preview of the opponent. Add a pre-fight card (rival kaiju + power + bot level + my kaiju with a "change" arrow). Score impact **+0.4**.
6. **A dedicated fighter practice mode (Dummy Range) with hit data.** Where: Gallery Move Lab and Help. Add toggles: dummy fights back (NORMAL/HARD), damage readout in px of knockback, KAIJU-time bar, reset. Score impact **+0.4**.
7. **Fix the "alone at 100 belly" trap: STOMP prompt.** Where: in match. When belly hits 100 show a pulsing "STOMP NOW (E)" above my kaiju and a belly bar glow; in the 3-way HARD match I reached 100 belly and was KO'd 3 s later without ever stomping (two rounds). Score impact **+0.3**.
8. **Clean up result-screen overlap** (see issues #1 and #2): the big KAIJU art covers "(you: 3)" and the Gobzilla card overlaps text. Score impact **+0.2**.
9. **Daily and Spicy Daily need a fighting variant.** The Daily I saw was CRUMB RUSH only; the SPICY button just changes rival level on the same crumb mode. A fighter wants a Daily that is a duel/boss. Score impact **+0.2**.
10. **Gauntlet checkpoint info for a fighter:** a bot-level ramp preview ("Wave 4 boss: HARD Hotchog") on the picker. Score impact **+0.2**.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | minor | Trial result (Brutal Bot) | The live KAIJU Norigon and the giant mascot art overlap the right edge of the result panel; "(you: 3)" and "+40 🪙 for 2 new stars!" sit right against the creature | art-src/.playtest/r11-7102/shot-37.png | Move mascot art behind the panel or clip the panel to 70% width |
| 2 | polish | Free Play result | Giant Bluebeary art overlaps the right end of the leaderboard panel rim and receipt box runs very close to REMATCH | art-src/.playtest/r11-7102/shot-6.png | Slightly shrink receipt box / mascot |
| 3 | minor | Gallery detail | Last reward line "🔒 gold frame · 🔒 crown · 🔒 Shiny" touches the bottom border of the panel when the power description wraps to 3 lines (Squidgeon) | art-src/.playtest/r11-7102/shot-9.png | Raise panel height or reduce line spacing |
| 4 | minor | Gallery | After Move Lab -> Esc the selection resets to Gobzilla instead of the kaiju I tested | art-src/.playtest/r11-7102/shot-8.png | Remember last selected card |
| 5 | major | Free Play (HARD) | In 3-way HARD I was KO'd about 1.5 s after round start (round 4) and by a KAIJU squash right after I stomped; no tell on bot throws, shield (1.4 s) ends right before the first cutlery arrives | art-src/.playtest/r11-7102/shot-5.png | Telegraph throws; extend shield to 1.8 s on HARD and above or delay bot first throw |
| 6 | major | Free Play 1v1 HARD | Even `auto:hard` (the reference bot) lost 0-3 to Hotchog, so HARD 1v1 is a 0-3 wall for a human; the next level BRUTAL (Trial) was beatable 3-0 with the same helper. The difficulty ladder is inconsistent between modes | art-src/.playtest/r11-7102/shot-17.png | Use the same bot brain per level in Trials and Free Play, or tune Hotchog's swipe-aggression |
| 7 | major | In match | Belly 100 with no "STOMP NOW" prompt; harness showed me sitting at belly 100 and dying twice before stomping | n/a (events log) | Add a pulsing prompt and glow at belly 100 |
| 8 | minor | Trials | Kaiju is assigned (Chocomunch, Norigon) without a pre-fight screen and without letting me choose | art-src/.playtest/r11-7102/shot-22.png | Pre-fight card with kaiju picker |
| 9 | minor | Trials list | Stars are "☆☆☆" for every trial but there is no hint which trial is easiest to start with or recommended order | art-src/.playtest/r11-7102/shot-21.png | Mark recommended order / difficulty chips |
| 10 | minor | Gauntlet picker | STARTERS card is selected but it is not obvious that clicking it starts a run (no START button); MAINS/DESSERTS/SECONDS show "🔒 clear wave 4/8/12" | art-src/.playtest/r11-7102/shot-20.png | Add a "▶ START" button under the selected card |
| 11 | minor | Challenges card | Footer is three small dense lines ("Checkpoints… · Best wave: 0 · 🗓 This week: 0 (beat it: +25 🪙) · 👑 boss waves: +30 🪙 and a 🤍") at roughly 14 px; hard to scan | art-src/.playtest/r11-7102/shot-20.png | Split into separate rows with icons, 16 px |
| 12 | minor | Help ▸ CUTLERY | Only vague words ("quick · medium range"); no numbers or matchups; Rolling Pin and Ladle both read "slow · HEAVY" with no difference | art-src/.playtest/r11-7102/shot-15.png | Add speed/range/damage bars |
| 13 | minor | Help ▸ BASICS | Nothing about KAIJU power duration (7 s), parry timing, or the 1.4 s round-start shield | art-src/.playtest/r11-7102/shot-14.png | Add a "FIGHTING TIPS" card |
| 14 | minor | Help ▸ EXTRAS | Text is small (~14 px) and dense; big empty gap between Power-ups and Hazards; hazards have no icons unlike power-ups | art-src/.playtest/r11-7102/shot-16.png | Icons + 16 px + tighten layout |
| 15 | polish | Help ▸ BASICS | Picture cards are good but the bottom half of the screen is empty and CONTROLS text is small | art-src/.playtest/r11-7102/shot-14.png | Use space for a KAIJU-power card |
| 16 | minor | Pantry | The "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" toast is drawn across the middle of the screen, covering the "Win 5 matches 2/5" progress text and the Peach/Blueberry cards | art-src/.playtest/r11-7102/shot-34.png | Show toast at the top or bottom |
| 17 | polish | Pantry | No shop item or order for fighters (no cutlery skins, no KAIJU trails); orders are all "knock out / win / KAIJU" grinds | art-src/.playtest/r11-7102/shot-34.png | Add fighting-style cosmetics |
| 18 | minor | Records ▸ GOALS | "Closest achievements" were all grind items; no skill goals, no PIN for kaiju-specific mastery | art-src/.playtest/r11-7102/shot-13.png | Add skill achievements (see checklist 3) |
| 19 | polish | Records page | Footer text "👉 Next up: World Tour (42%) … Click any locked one to 📌 pin it" is two crammed lines at the bottom right | art-src/.playtest/r11-7102/shot-12.png | Move pin hint into a tooltip |
| 20 | minor | Records | "Matches won 0" but I cleared Story ch 1 and 2 and a Trial afterwards; achievements "First Bite: Win a match" was not on the story chapter receipt and the title still says "Win a match → Lime colour" after ch 1 clear | art-src/.playtest/r11-7102/shot-27.png | Confirm Story wins count as matches or explain in the achievement text |
| 21 | minor | Daily card | Daily is Crumb Rush (non-fighting); SPICY button only raises rival level | art-src/.playtest/r11-7102/shot-24.png | Add combat Dailies |
| 22 | polish | Team Feast HUD | "RED 0 – 0 BLUE" banner sits on top of the table edge/mat, overlapping the top throw lane near a basket | art-src/.playtest/r11-7102/shot-33.png | Move into the HUD bar |
| 23 | minor | Pause menu | Escape pressed 4 times in a row ended in a paused game (toggle) with no obvious state on screen; QUIT needs two taps ("Tap QUIT again") which is OK but the warning appears above PAUSED title far from the button | art-src/.playtest/r11-7102/shot-23.png | Put the warning under QUIT |
| 24 | polish | Story map | Row 2 reads right-to-left (8,7,6,5) so numbers look out of order; chapter dialogue pops over the map hiding the grid | art-src/.playtest/r11-7102/shot-26.png | Use a snake arrow line or number badges |
| 25 | polish | New kaiju reveal | Reveal fades in with the previous receipt visible behind it, text overlaps (Squidgeon quote behind SLOBA) for a moment | art-src/.playtest/r11-7102/shot-30.png | Fully dim background before showing the card |
| 26 | minor | Free Play | Stomp did not fire when belly was 85 (harness) and the HUD gives no hint that 100 is needed vs 85 | n/a | Show "85/100" on belly bar |
| 27 | polish | Free Play setup | Seats reset to fewer players after returning from a match (1v1 after I'd set up 3) | art-src/.playtest/r11-7102/shot-4.png | Remember last roster |
| 28 | polish | Story clear panel | Fine, but "Meanwhile…" line is small (~14 px) and under the tip line | art-src/.playtest/r11-7102/shot-27.png | Bigger text + italic |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- Title: OK (art-src/.playtest/r11-7102/shot-1.png). "NEXT UP" box small text but readable; tiny version label bottom right.
- Free Play setup (desktop): OK, no overlap (shot-4.png).
- Free Play result / Trial result: mascot art overlaps panel edges (shot-6.png, shot-37.png); otherwise readable.
- In-match HUD: OK (shot-5, 11, 22, 29, 33). Team Feast score banner sits over the table (shot-33).
- Gallery: OK overall; detail panel bottom line touches border on 3-line power text (shot-9.png).
- Move Lab: OK, footer tip readable (shot-11.png).
- Records: OK (shot-12.png); GOALS modal OK (shot-13.png).
- Help BASICS / CUTLERY / EXTRAS: no overlap; EXTRAS text small (shot-14/15/16).
- Challenges modal: OK but small text lines (shot-20.png). Trials list: text recorded in /look, no overlap seen (shot-21.png not opened beyond screen text; listing fit).
- Daily preview: OK (shot-24.png).
- Story map + dialogue + chapter clear + new kaiju reveal: OK, reveal has a transient overlap (shot-26/27/30).
- Pantry: toast covers cards and progress text (shot-34.png).
- Settings: OK (shot-35.png).
- Pause menu: OK (shot-23.png).

## The single biggest structural problem
The fight has no readable skill ceiling at the top difficulty. HARD bots lead their throws, dodge and parry, but give no telegraph, so a KO feels like it came from nowhere (I was KO'd about 1.5 s into a round, and even the helper bot lost 0-3 to Hotchog). Meanwhile the game cannot show me what I did right: no parry count, no dodge count, no "why I died" beyond a source icon. A fighter's motivation is to see themselves improve; right now the only measurable progress is grind totals (KOs, crumbs, matches).

The loop of crumbs -> STOMP -> power is the actual depth, but it is under-explained (no STOMP-now prompt at 100 belly, no counter-play guide like "step out of the ring before each stomp" until the post-match tip) and the Gallery/Help give almost no numbers to reason about matchups.

## Big change proposals (2–3, most important first)
### Proposal 1: Telegraphs + a "Combat Report" after every loss
- **Problem it solves:** HARD feels like lottery; losses teach nothing.
- **How it would work:** (a) every bot throw/swipe has a 0.25 s windup tell (lean + small flash, aim line on HARD and below); BRUTAL removes the line but keeps the lean. (b) After any KO of me, a 1.5 s "replay slice" of the last 2 s plays with a caption ("Fork thrown from the left, you were dashing right"). (c) The receipt gets a "Combat Report" row: Parries, Dodges, Throws hit/thrown, KAIJU time used (x/7 s), crumbs eaten before first stomp.
- **Example moment:** I die at 1.5 s in round 4; the report says "Hit by a Ladle while holding nothing. Tip: grab a fork first (3 forks within 200 px)."
- **Rewards / progression hooks:** Skill achievements (Parry master, Dodge streak) pay coins; Records lists lifetime parry %.
- **Risks and edge cases:** Telegraphs must not make EASY bots trivial; cap replay slice to avoid slowing party play (only show in solo seat).
- **Size:** M
- **Score impact for me:** +1.2

### Proposal 2: Kaiju Dojo (fighter practice + matchup chart)
- **Problem it solves:** I have no place to learn matchups or measure KAIJU timing.
- **How it would work:** Extend Move Lab into a Dojo from the Gallery: pick my kaiju and a dummy kaiju, dummy level (passive/NORMAL/HARD), buttons: reset, slow-mo 50%, show hitboxes. HUD shows power cooldown and KAIJU seconds as bars. A Matchup page lists every kaiju vs every kaiju win rate from my own record (the 📊 "You vs it" data, tabulated), with a "strong against / weak against" tag.
- **Example moment:** Seed Spray reach 207 vs Ink Cloud reach 198 shown as bars; I see that I out-range Squidgeon by 9 px.
- **Rewards / progression hooks:** Complete 5 Dojo drills for 40 🪙 and a "Black Belt" colour; mastery XP for drills.
- **Risks and edge cases:** Data presentation must stay one screen; Dojo should not grant unlimited XP.
- **Size:** L
- **Score impact for me:** +0.8

### Proposal 3: Fighter's Daily and Ladder
- **Problem it solves:** No reason to come back to combat; the Daily I saw was Crumb Rush.
- **How it would work:** Daily alternates fighting formats (Duel, Fists Only, Boss Rush). A season ladder (5 rungs: NORMAL -> BRUTAL) in Free Play 1v1 tracks win streaks per bot level; each rung gives a cosmetic frame.
- **Example moment:** "Today: Duel vs Hotchog (HARD) — win without losing a round: +40 🪙."
- **Rewards / progression hooks:** Ladder frames and Pantry items; weekly order "win 3 HARD duels".
- **Risks and edge cases:** Ladder must not stall new players; keep EASY rungs.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **TRY IT warm-up / Move Lab:** Great. Dummy close, KAIJU does not run out of range, 5.7 s -> 2 s HUD, a squash KO in 3 s. Escape returns me to the Gallery but resets selection to Gobzilla (small bug).
- **Gallery detail, ✨ Shiny, 📊 record:** Panel is no longer blank; "You vs it: 0–1" and the mastery ladder show. Bottom reward line crowds the border when the power text wraps (shot-9).
- **Achievements on receipt:** Yes, three achievements (Crumb Muncher, On a Roll, Clean Sweep) with +30 🪙 each plus a colour unlock; very satisfying (shot-37).
- **Gauntlet / boss wave +30 🪙, weekly best:** Visible on the Challenges card, but small text and I did not run a wave (budget).
- **Daily preview card / SPICY DAILY:** Clean card with medals and streak; SPICY +40 🪙 button is clear (shot-24), but the format is Crumb Rush, not combat.
- **KAIJU 7 s HUD and shorter dizzy:** Readable and fair; the HUD "KAIJU 6s!" is the clearest new feature for a fighter. I could not measure the dizzy spell precisely.
- **1.4 s shield:** Round start felt safe, but on HARD the first cutlery arrives right after it ends.
- **Story "📜 Meanwhile…", tip on chapter card, "Chapters N/12":** Meanwhile line shows on the clear panel (shot-27): "a bamboo steamer lid lifts an inch… then quietly settles again" — a nice hook. "Chapters 0/12" reads fine on the map.
- **Records ▸ GOALS + mastery bar:** Clear and good (shot-13), but no skill goals.
- **Party Team Feast live score:** Works (shot-33), banner sits on the table.
- **Help BASICS cards / EXTRAS tab:** Clear picture cards; EXTRAS is text-dense.
- **Text size:** Mostly fine on desktop; Challenges footer and Help EXTRAS are the smallest.
- **Pantry:** First visit +25 🪙 is announced, but the toast covers content (shot-34).

## Bugs that block play
- None blocking. /errors stayed `none` throughout.
