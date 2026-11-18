# Playtest evaluation: The Fighter

**Fun score: 6.5 / 10** (charming, readable fights and a great Trials/Move Lab idea, but the bot difficulty is a cliff, the Giant Hand and KAIJU Frenzy decide too many rounds, and there is no depth/feedback layer to *learn* the fighting game from)

> Honest note on method: I drive the game through a coarse harness (`attack`, `crumbs`, `shove`, `power`, `auto:*`). I cannot hand-time a parry or a sideways dash, so my "skill ceiling" findings are inferred from what bots do to those canned behaviours, plus the text/screens. Where that limits a claim I say so.

## What I did
About 112 harness commands over roughly 75 minutes of game time.
- **Title**: read the First Service banner, CHALLENGES modal (Gauntlet course buttons + Trials).
- **Trials list** (all 8 cards read) and played: **Hard Duel** (lost 0-3 twice, plus once with `auto:hard` in my seat; lost 0-3 again), **Thin Ice** (won 2-0, TRIAL CLEAR 3 stars in about 15 s), **Brutal Bot** (lost 2-3, twice failed overall).
- **Free Play**: set up GOBZILLA JR. vs SLOBA, cycled every twist (singles then all 8 doubles, and back to NONE), played a full KAIJU FRENZY + SNACK ATTACK match (lost 2-3).
- **Gallery**: read power text for 10 kaiju; ran **MOVE LAB** for Gobzilla Jr. (Seed Spray KO'd the dummy) and Bubblegumbo (Gum Bubble).
- **Gauntlet Starters** wave 1: lost two lives to normal Sloba, cleared the wave, saw the perk picker.
- `/autoplay n=4 level=hard`: ran 4 matches (it silently started a 4-player Free Play instead of staying in the Gauntlet; took ~2 minutes and had to be moved to the background).
- **Records**, **Pantry**, **Settings**, **Keyboard controls**, **How to Play** (Basics + Cutlery tabs), **Story** opening cutscene and ch.1 (won R1, lost R2, in R3 when I stopped).
- Matches played: about 14 real matches/trials/waves. Won: Thin Ice trial, Gauntlet wave 1, one of four autoplay matches, ch.1 round 1. `/errors` at start, middle and end: **none**.
- Did **not** reach: story boss PHASE 2 (ch.4 is locked behind ch.1-3), Daily, Party Cup, Online, Workshop (not a fighter priority and the budget ran out).

## What worked for me
- **Fights are instantly readable.** Top-left HUD (name, belly bar, held cutlery, KOs, star pips), the kill-feed line at the bottom ("PIZZARAPTOR skewered GOBZILLA") and the **INSTANT REPLAY** banner make every death explainable. Best "why did I lose" feedback I've seen in a party game.
- **Receipt card + coaching tip** after every match ("Knocked out by: cutlery x2, fell off · DASH sideways when you see a charge line, or SWIPE to parry it back"). Context-sensitive and useful.
- **Trials are exactly what a fighter wants**: 8 fixed, named scenarios with three clear stars and a KO goal. The text "★ win · ★★ without losing a round · ★★★ also 4+ knockouts (you: 4)" shows progress live.
- **MOVE LAB** is great: a one-click sandbox with the kaiju's own hint line, instant belly refill, dummy respawns after a KO. The best new feature for me.
- **Kaiju powers are visually distinct and well named** (PEARL SPILL!, SEED SPRAY! callouts, big ring/blob art). Power descriptions in the Gallery are one clear sentence each, with a "Trait" line.
- **Double twists** work and cycle cleanly; the description line under the buttons ("KAIJU FRENZY + SNACK ATTACK: Everyone starts each round ready to go KAIJU. Crumbs fill your belly 3x faster") is exactly the right amount of text.
- **Pause menu, Settings and Keyboard Controls** are tidy; KAIJU POWERS: ON/OFF (Classic mode) is a nice fighter toggle.
- No JavaScript errors, no crashes in about 112 commands.

## 🧾 Exactly what would make this a 9/10 for me
1. **Smooth the bot difficulty cliff (+0.7).** *Where:* BOT LEVEL (Free Play, Trials, Gauntlet, Story). *Now:* NORMAL bots are trivial (Thin Ice: three stars in 15 s by spamming `attack`; ch.1 Crabbage dies to the first throw), but HARD Pizzaraptor beat me 0-3 three times in a row, including once with `auto:hard` driving my seat. Brutal Bumblegumbo was *easier* than Hard Pizzaraptor in practice (died to one chopstick throw in round 1). *Do:* add a visible level between NORMAL and HARD ("SKILLED"), and make BRUTAL clearly harder than HARD with a defined behaviour set (parry thrown cutlery, dash-dodge charge lines, bait/punish). Show each level's behaviour in a one-line tooltip on the BOT LEVEL button.
2. **Make the Giant Hand skill-based, not a coin-flip (+0.6).** *Where:* every classic table. *Now:* the hand repeatedly decided rounds (Brutal Bot R2 and R3; Frenzy match R4 "flicked by the GIANT HAND") and "SLOBA knocked out (hand)" gave me round wins that I did not earn (KOs 0 on the receipt). *Do:* (a) a 1.0 s on-screen warning ring on the target plus a sound cue and red edge tint, (b) the hand can be *dodged* with DASH, (c) credit a hand-KO to whoever last hit the victim within 4 s (receipt and KO goals), (d) it never kills the *only* two survivors in the first 10 s of a round.
3. **KAIJU FRENZY and double twists need a fairness rule (+0.5).** *Where:* Free Play TWIST. In FRENZY both sides go KAIJU at once, the 4-5 s window ends almost together, and the Giant Hand then squashes the weaker side (my 2-3 loss: "Knocked out by: a KAIJU x2, the Giant Hand"). *Do:* a 1.5 s "grace" after KAIJU ends where you cannot be KO'd by the hand, plus a clear on-screen KAIJU timer ring (not only the tiny status line) so you can time a power.
4. **A real practice dummy and frame-ish numbers in MOVE LAB (+0.4).** *Where:* Gallery to MOVE LAB. *Now:* the Dumplord "dummy" wanders around holding a knife and was 600-1000 px away when I fired Gum Bubble (no demonstrated hit). *Do:* three dummy modes (STILL / WALKS / FIGHTS BACK), an on-screen cooldown bar and damage/shove-distance readout, and a "Power replay" showing the last cast in slow motion.
5. **Per-kaiju stats and matchup records (+0.4).** *Where:* Records and Gallery. *Now:* Records shows only global counters; the Gallery shows "Matches: 3 · Wins: 0" and a Mastery line. *Do:* per-kaiju win %, KOs, power hits landed, plus a "vs bot level" grid (W-L at Easy/Normal/Hard/Brutal) so I can see where I plateau.
6. **Teach the real tech (+0.3).** *Where:* How to Play, BASICS. The text never explains parry timing (SWIPE knocks cutlery out of the air), charge lines, dazed state, or the belly-for-hand rule. Add a "TECH" tab with 6 short entries + a Practice link each (Practice menu cards for "Parry", "Dash-catch", "Charge line").
7. **Make Trials 2-star/3-star goals harder than the 1-star path (+0.3).** Thin Ice is labelled "hard" but gave 3 stars in 15 s on first try; Hard Duel is nearly un-clearable for a new account. Reorder/re-tune so card order = difficulty, and show a difficulty rating (1-5 skulls) on each card.
8. **Add replays/stat after Trials failure (+0.2).** On TRIAL FAILED, show the 3-line "what killed you" *with the exact round* and a one-tap "WATCH REPLAY" button (the INSTANT REPLAY exists but flashes past).
9. **Fix the small clarity/consistency bugs below (+0.3 in total)**: GOBZILLA vs GOBZILLA JR. naming, token counts differing between Records (101) and Pantry (126), "Esc to leave" hint in Move Lab opening Pause instead of leaving, double-twist button text being tiny, "1 / START rematch" over busy art.
10. **A ranked/ladder reason to keep fighting (+0.3).** See Proposal 1.

If all ten are done I would rate it 9.0-9.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | BOT LEVEL / Trials | Difficulty cliff: NORMAL bots die to spammed `attack` (Thin Ice 3 stars in about 15 s), HARD Pizzaraptor beat me 0-3 three times (including `auto:hard` in my seat), BRUTAL Bubblegumbo lost round 1 to one chopstick throw. Levels do not feel ordered. | art-src/.playtest/r7-7102/shot-5.png, shot-32.png | Add a mid level; define behaviours per level; QA that BRUTAL > HARD |
| 2 | major | All tables (Giant Hand) | The hand decides rounds and gives free round wins ("SLOBA knocked out (hand)", KOs 0 on my receipt) | shot-13.png | Warning ring + dodgeable + KO credit rules (see Checklist 2) |
| 3 | major | Free Play: KAIJU FRENZY (+ others) | Both seats go KAIJU together; windows end almost together; the loser gets "Knocked out by: a KAIJU x2, the Giant Hand" so Frenzy feels like luck | shot-15.png | Grace window + clear KAIJU timer ring |
| 4 | major | Move Lab | Dummy (Dumplord) wanders, holds a knife, 600-1000 px away when I used Gum Bubble; no way to *see* what the power did | shot-18.png, shot-20.png | Dummy modes, cooldown bar, slow-mo power replay |
| 5 | major | Trials: Hard Duel (first card) | First card in a list is the hardest-feeling for a fresh save (Hard rival, first to 3); Thin Ice (card 2) is trivial. Card order is not by difficulty and the level is not shown | shot-3.png | Sort by difficulty; add a skull rating on each card |
| 6 | major | HELP > BASICS | Never explains parry, charge lines, dazed state, belly = giant hand target, KAIJU timer; only generic move lines | shot-25.png | Add a TECH tab |
| 7 | minor | Title | "NEXT UP: FIRST SERVICE" line is truncated in the text dump ("...🎨 L") and is hidden behind the CHALLENGES modal; unclear if it wraps/clips on the real screen | shot-2.png | Confirm clipping, give it a 2-line box |
| 8 | minor | Records vs Pantry | Chef Tokens read 101 on Records but 126 in the Pantry a moment later (same session, no match between) | shot-21.png, shot-22.png | Single source of truth, show the same number everywhere |
| 9 | minor | Records | "Next rank: PREP COOK AT 6 PTS (1)" is cryptic: what are "pts" and where do I earn them? | shot-21.png | Say "6 Chef Points (you have 1): earn from wins, orders, achievements" |
| 10 | minor | Records / Gallery | "Gauntlet best wave 0" stayed 0 after I cleared wave 1 (checked before the clear) and "Knockouts 0" after 12 KOs in Move Lab and a Gauntlet wave. Unclear which modes count | shot-21.png | Show "(Move Lab/Practice not counted)" under STATS |
| 11 | minor | Gallery | Grid label says GOBZILLA, detail says GOBZILLA JR., in-match HUD says GOBZILLA, Trials card says GOBZILLA | shot-16.png | Pick one name |
| 12 | minor | Move Lab | Hint line says "Esc to leave" but Esc opens PAUSED (RESUME/RESTART/MUSIC/SOUND/QUIT); needs a second click to leave | shot-19.png | Make Esc exit Move Lab (or reword the hint to "Esc: pause/quit") |
| 13 | minor | Free Play setup | Double-twist label on the button shrinks to unreadable size ("TWIST ⚡⚡ KAIJU FRENZY + SNACK ATTACK" at about 7 px) | shot-10.png | Use 2 lines or a shorter name ("FRENZY + SNACKS") |
| 14 | minor | Free Play setup | Seat card tag says "Keys left · A / D" but movement is WASD (A/D alone is misleading) | shot-8.png | "Keys: WASD" |
| 15 | minor | Match end (Trial FAILED/CLEAR) | "★ win · ★★ without losing a round..." sits on the white tablecloth: white outlined text, low contrast; same for "1 / START retry · Esc trials" over gravy boat | shot-5.png, shot-32.png | Put the trial lines inside a dark panel |
| 16 | minor | Match end (4-player rank) | Ranking list ("2. AVOCADRAKE...") sits on busy blueberries/plates, outline helps but some digits blur | shot-31.png | Dark scrim behind the result list |
| 17 | minor | Match end (autoplay) | REMATCH / MENU buttons missing from the screenshot taken after autoplay; only "1 / START rematch · Esc menu" text | shot-31.png | Confirm buttons always render (may be a harness timing issue) |
| 18 | minor | Match end | Escape behaves differently by phase: from matchEnd it goes to the Trials list; from roundEnd it opens PAUSED; from PAUSED QUIT goes to Trials | shot-33.png | Make Esc consistent (always pause, or always leave) |
| 19 | minor | Pantry | "TODAY 30% OFF (was 350) (not enough yet)" wraps into 3 lines inside the Lifeline card and feels crammed | shot-22.png | Put the badge on the card's corner |
| 20 | minor | Gauntlet wave clear | Receipt box (bottom-left) sits within 6 px of the left perk card's bottom edge | shot-30.png | Move the receipt up or shrink |
| 21 | minor | Gauntlet wave clear | "Next: wave 2 · ❤" shows one heart with no number; unclear that it is "lives left 1" | shot-30.png | Show "❤ x1" |
| 22 | minor | Gauntlet | Losing a round with 3 hearts kept me on wave 1 with a reset round: the text never says that "a life = rematch of the wave" | shot-28.png | Add "Wave retry (❤ 2 left)" banner |
| 23 | minor | /autoplay | Started a 4-player Free Play instead of continuing the Gauntlet (harness doc says so), then took >120 s for n=4 | n/a | Mention in help or add a "continue mode" flag |
| 24 | minor | Story opening | Head Chef dialogue box covers the map and the huge golden spoon overlaps chapter cards 1-2 (intentional, but unreadable on the map behind) | shot-36.png | Fade the map or put the spoon beside the box |
| 25 | minor | Story opening | First line is cut off in the dialogue box ("and the legendary GOLDE" shown mid-typewriter) | shot-36.png | Wait for typewriter finish before screenshot (probably OK) |
| 26 | minor | HELP > CUTLERY | Only "quick/slow/medium" words, no numbers (range, damage, cooldown). A fighter wants real numbers | shot-26.png | Add range/cooldown numbers |
| 27 | polish | Trials list | Stars are `☆☆☆` while you have 0: with stars unfilled it is hard to know which trial is next | shot-3.png | Highlight "NEXT" |
| 28 | polish | Trials result | "+60 🪙 for 3 new stars!" is white-on-cloth again | shot-32.png | Same as #15 |
| 29 | polish | In-match HUD | KOs shows 0 for hand-KOs even when I won the round: confusing for KO goals | shot-13.png | Credit last attacker |
| 30 | polish | Free Play | "click: add a bot" cards give no bot-level label until you tap the card | shot-10.png | Show bot level on each seat |
| 31 | polish | Receipts | "Mastery Lv 2 Line Cook · 70/100 XP": one Gauntlet win jumped 8 to 70 XP; fine, but reason for the jump not shown | shot-30.png | Add "+62 XP (win, KOs, Gauntlet)" |
| 32 | polish | Records | Achievement pin hint only appears in the bottom bar at small size | shot-21.png | Move it to the header |
| 33 | polish | Settings | COMEBACK HELP defaults ON in Free Play/Party. For fighters this changes who has an advantage; it is not mentioned on the match screen | shot-23.png | Show a small "Comeback help active" tag in the match corner |
| 34 | polish | Trials | The rival is spoken "(hard)" but the table is not named ("Leftovers" appeared only after launch) | shot-3.png | Show the table on each card |

## 🔠 Text and layout check
Reviewed by opening each screenshot with Read.

- **Title + CHALLENGES modal** (shot-2.png, shot-27.png): OK. The modal does not overlap its buttons. The First Service banner is hidden behind it (normal), see issue 7.
- **Trials list** (shot-3.png): OK. Longest descriptions wrap to 2 lines inside the cards (Chef's Table, Thin Ice) with no cut-off.
- **Trial FAILED / CLEAR cards** (shot-5.png, shot-32.png): text is not cut off, but the criteria lines sit directly on a pale tablecloth. Contrast is acceptable only because of the dark outline (issues 15 and 28).
- **Free Play setup** (shot-7.png, shot-10.png): OK except the tiny double-twist button label (issue 13). Seat cards and the 8 pills are aligned with no overlap.
- **In-match HUD** (shot-4.png, shot-11.png): OK. "PRACTICE ROUND 1 · SUNDAY ROAST" wraps into 2 lines in Move Lab (shot-18.png): still inside the screen.
- **Match results (Free Play, Trial, Gauntlet, 4 players)** (shot-15.png, shot-30.png, shot-31.png): no overlaps with the receipt box, REMATCH/MENU and bottom stat line; headline readable. Minor: results text over busy art (issues 16 and 17); receipt box very close to the perk card (issue 20).
- **Pause menu** (shot-19.png): OK.
- **Gallery** (shot-16.png): OK. The collection counter in the top right is small but not clipped. Detail panel text fits; long "Mastery" line wraps cleanly.
- **Records** (shot-21.png): OK. All 11 stat rows and the 2-column achievements fit; progress bars and "0/1" values do not touch titles.
- **Pantry** (shot-22.png): OK except the crowded Lifeline card (issue 19).
- **Settings** (shot-23.png): OK, nothing overlaps. All 15 options fit.
- **Keyboard controls** (shot-24.png, text only inspected): rows aligned; I did not open the image.
- **HELP BASICS/CUTLERY** (shot-25.png, shot-26.png): OK. Controls lines are small (about 13 px) but readable.
- **Story map + opening dialogue** (shot-34.png, shot-36.png): the dialogue box and the golden spoon intentionally cover the map, so the chapter cards behind it are cut off by design; readable in itself.
- **Gauntlet perk screen** (shot-30.png): OK.
- **Not visited:** Party Cup, Daily, Online, Workshop, Story boss.

## The single biggest structural problem
There is no **learn-and-climb loop for fighting**. The game gives you excellent *after-the-fact* feedback (replay, receipt, coaching tip), but the opponent ladder is a cliff (trivial normal, nearly unbeatable hard, brutal that isn't), and two systems that are not under the player's control (Giant Hand, simultaneous KAIJU in FRENZY) decide a large share of rounds. A fighter cannot tell whether they lost to skill or to randomness, so mastery has nothing to hold on to. Add a smooth ladder with per-kaiju matchup records and the loop becomes: lose, read the receipt, try Move Lab, win the next rung.

## Big change proposals (2-3, most important first)
### Proposal 1: Ladder + Matchup Book
- **Problem it solves:** no long-term progression for a fighter; levels are disconnected; no sense of "I'm getting better".
- **How it would work:** A new CHALLENGES tab "LADDER". Each kaiju has 5 rungs: EASY, NORMAL, SKILLED (new), HARD, BRUTAL. You must beat a rung first-to-3 to unlock the next. Result goes into a **Matchup Book** per kaiju: a 20x5 grid (rival kaiju x level) of W-L records with a heat colour, and your best "stars" (no rounds lost, 4+ KOs). Records screen shows the totals ("Ladder 37/100 rungs"). Rewards: 20/40/60/100/200 Chef Tokens per new rung, plus a kaiju-specific cosmetic at BRUTAL (gold name already exists in mastery).
- **Example moment:** I lose 1-3 to Hard Pizzaraptor with Gobzilla. The receipt says "Matchup Book: GOBZILLA vs PIZZARAPTOR: 0-2 at HARD. Try SKILLED first? (play)". I tap, win, and the grid cell lights up.
- **Rewards / progression hooks:** tokens, mastery XP bonus, title ("Brutal Slayer"), and a banner in Gallery for 5 BRUTAL wins.
- **Risks and edge cases:** bot tuning for 5 levels x 20 kaiju; must not be grindy. Keep the grid per kaiju (not per rival) at the start.
- **Size:** L
- **Score impact for me:** +0.8

### Proposal 2: Fair Giant Hand + Round Telegraphs
- **Problem it solves:** rounds decided by a non-skill source; I could not tell what I should have done.
- **How it would work:** Hand now has three phases: 1) shadow on the target for 1.2 s with a red ring, 2) a 0.4 s "wind-up" with a distinct sound, 3) the slap. A DASH at the right moment sidesteps it (and the slap then stuns the hand for 1 s so everyone can shove/dive). Hand picks the fullest belly *only if* that belly is 70+; otherwise it targets nobody, so "belly management" is a conscious risk/reward (Eat to KAIJU vs be targeted). Add a 1-line receipt line: "Hand missed you, nice dash!" / "You ate too many crumbs (belly 100)". KO credit goes to the last attacker within 4 s.
- **Example moment:** In a Brutal Bot duel I hit belly 100, the red ring appears, I dash left, the hand hits the table, the bot slides into the dent, and I win the round with a free shove.
- **Rewards / progression hooks:** new achievement "Hand Dodger" (dodge 10 hands); mastery XP for dodges.
- **Risks and edge cases:** On Ice Rink the dash may overshoot; give DASH a short grace. Online latency may require a slightly longer wind-up.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Move Lab 2.0 (Training Room)
- **Problem it solves:** I couldn't practise or *measure* powers; the dummy wandered.
- **How it would work:** Same entry, plus a side panel with: DUMMY: STILL / WALKS / FIGHTS (Easy-Brutal), COOLDOWN bar for the power, "last hit: shove 213 px / daze 1.4 s" readout, and a record/replay button (slow-motion of the last cast with hitbox rings). A "Combo challenges" tab per kaiju (3 goals: e.g. "Seed Spray KO from the centre", "Ink Cloud then swipe"), awarding mastery XP.
- **Example moment:** With Bubblegumbo I set the dummy to WALKS, fire Gum Bubble, replay it in slow motion, and see I led the shot too late. Next try the bubble traps it.
- **Rewards / progression hooks:** 3 mastery XP per completed combo; one achievement "Lab Rat" (finish all 20 kaiju's first combo).
- **Risks and edge cases:** UI crowding on phones, so collapse the panel behind a button.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **Progression (Mastery, Chef Rank, Achievements):** The receipts are friendly ("Mastery Lv 2 Line Cook · 70/100 XP", "First Bite +30"), but the Chef Rank line is cryptic (issue 9) and the token numbers disagree between screens (issue 8). Mastery for the fighter has no way to see which fights contribute (issue 31).
- **First Service:** Visible on the title (1/6 then 3/6 as I played). I never got the Practice card as I skipped Practice, so cannot judge it.
- **CHALLENGES (Gauntlet checkpoints + Trials):** The modal is clear. Trials are my favourite idea this round (specific, 3-star), but difficulty ordering and tuning are off (Issues 1, 5, 7). The Gauntlet "pick a perk" screen is excellent.
- **Move Lab:** Best addition for me (see What worked); the dummy is too passive and unmeasured (issue 4), and Esc is misleading (issue 12).
- **Double twists:** Works well and descriptions are great. The button label is tiny (issue 13). Combos like "FISTS ONLY + ICE RINK" sound great for fighters; I only played FRENZY + SNACK ATTACK and found it luck-driven (issue 3).
- **Party Cup:** Not visited.
- **Story (PHASE 2 / KID MODE):** KID MODE is listed in Settings with a clear description. I did not reach a boss; the ch.1 round-1 win shows that story rivals are very easy.
- **Workshop COPY/PASTE:** Not visited.
- **Text and layout audit:** Largely holds up. The only real flaws are low-contrast result text on pale tables and the tiny double-twist label.

## Bugs that block play
- None. No JS errors (checked at start, middle, end). The only friction was `/autoplay` taking over 2 minutes and silently leaving the Gauntlet for Free Play (a harness quirk rather than a game bug).
