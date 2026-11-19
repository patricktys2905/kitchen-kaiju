# Playtest evaluation: The Challenge Seeker (challenger)

**Fun score: 6.5 / 10.** The challenge hubs (Gauntlet, Trials, Daily) are well-signposted and the fights are good, but the hardest content (Spicy, Dessert Course) is gated behind the full Story, the Daily is a one-shot with no depth, and the difficulty has no "wall" worth chasing (HARD duel is beatable in 4 s; BRUTAL is a hard spike).

> Screenshot paths below are relative to `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r9-7108\` (files `shot-N.png`).

## What I did
- About 105 harness commands, roughly 40 matches/rounds-sets. New save (0 matches, 4 kaiju locked).
- Screens visited: Title, Challenges popup, Trials list, Gauntlet (Starters waves 1-4 and Mains wave 5), Daily (Hot Dumpling, 3 attempts' worth of rounds), Story map (Grand Feast; Second Helpings/Dessert/Spicy checked, all locked), Free Play setup (cycled all 5 bot levels), Party Modes setup + PHONES AS PADS room, Records (pages 1 and 2), Pantry (bought Lifeline with the double tap), Gallery.
- Trials played: Hard Duel (1 star after a 3-2 win; lost the 3-star try 2-3 to a Giant Hand flick), Brutal Bot (lost 0-3 twice, once manually, once with `auto:hard`), Thin Ice (1 star).
- Gauntlet: cleared waves 1-4 (boss Salmonster at wave 4 cost me a heart), picked perks each wave, unlocked MAINS checkpoint, died to wave 5 Turbo.
- Daily: lost (Hot Dumpling, 3 rivals normal/easy/easy). Could not win in 2 tries.
- Could NOT reach Spicy chapters, Second Helpings or the Dessert Course (all locked, need Story clears). I judged them from the lock text only.
- `/errors`: none at start, middle and end.

## What worked for me
- **"You went out" banner** works exactly as promised: `"You went out at 8s: the Giant Hand"` (shot-8/9). Tells me the cause and time. Great for learning.
- **Giant Hand telegraph** (red lane + arrows, shot-8) is readable, and the end-of-match "Knocked out by: swipe, cutlery, the Giant Hand" tally is excellent feedback.
- **Challenges popup** is clean and explains checkpoints (shot-2, shot-20). MAINS unlock after a boss-wave clear works and persists.
- **Trials**: 8 fixed, clearly named fights with the 3-star rules written out; star criteria are on each card and repeated on the result card (shot-3, shot-6, shot-10). "SO CLOSE! TRY AGAIN?" and 1/START retry make retrying instant.
- **Gauntlet perks** (Mustard Coat, Hot Feet, Ghost Start, Sugar Rush, Full Belly) give real build choices between waves (shot-13, 16).
- **Boss wave banner** ("BOSS: SALMONSTER") with crown above the boss (shot-15).
- **Pantry second-tap** works: `"Lifeline? tap again to buy for 245"` then `OWNED`; Lifeline (+1 heart per Gauntlet run) is a smart challenger sink.
- **Daily rival levels** shown in the countdown: `3 rivals (normal, easy, easy)`. Bots gentler is felt.
- **Free Play bot level line** explains each level (TOUGH / HARD / BRUTAL / EASY) (shot-29).
- New kaiju and achievement toasts fire (shot-6, 16, 28).

## 🧾 Exactly what would make this a 9/10 for me
1. **Open the hard content to a challenger from the start.** *What:* a "Skip the queue" path so Spicy / Dessert / Second Helpings can be reached without clearing 12 Story chapters. *Where:* Story map (shot-27 shows SPICY, DESSERT and SECOND HELPINGS all locked, DESSERT says "finish the Grand Feast"). *How:* add a **Challenge Ladder** unlock (Trials stars or Gauntlet waves open Spicy chapters 1-4; e.g. 6 Trial stars opens Spicy ch1-3, 12 stars opens Dessert preview). Or a "Prove yourself" boss-rush gate. *Impact +1.0.*
2. **A real Daily challenge with a reason to return.** *What:* Daily currently = a random party mode with fixed bots and a streak. *How:* give each Daily a *named modifier* and a **par target** (e.g. "win without a KAIJU", "win in under 90 s", "KO the boss first") with bronze/silver/gold medals shown BEFORE starting. Show today's best-of-friends or a local best time list. Rematch must keep the same seed. *Impact +0.8.*
3. **Raise the ceiling and smooth the ramp of Gauntlet.** *What:* wave 4 boss (3 rivals, boss starts STOMP READY) then wave 5 Turbo with 3 ladle rivals is a cliff; waves 1-3 are trivial (4 s KOs). *How:* waves 1-3 should already include 2 rivals plus a twist; wave 5+ should introduce one new rule at a time (Turbo alone, then Turbo + hazards). Show an on-screen "NEXT: wave 5 = TURBO, 3 rivals" preview on the perk screen. *Impact +0.7.*
4. **Make HARD/BRUTAL read as skill, not luck.** *What:* a hand flick killed me on the deciding round of Hard Duel (shot-8) and my `auto:hard` bot lost 0-3 to BRUTAL (shot-11). *How:* a short "tell" sound + 0.4 s screen-edge flash when the hand targets you (the lane telegraph alone is easy to miss mid-fight); and a "BRUTAL does X: faster dash, 0.3 s reaction" tooltip instead of "everything HARD does, faster". *Impact +0.5.*
5. **Show the Mastery reward ladder as words.** *What:* the Gallery line `Rewards: ✔✨ ✔⭐ 🔒🪙 🔒🍽 🔒👑 🔒✨` is unreadable (shot-35). *How:* a 6-slot row with the level number and reward name under each (Lv2 Colour, Lv3 Shiny...). *Impact +0.3.*
6. **Fix the Daily fail tip.** *What:* after a failed Daily the panel says `Tough bots? Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings` (shot-24) but Daily has fixed rivals and I can't change the level. *How:* replace with a Daily-specific tip ("Hot Dumpling: DASH away, pass it on") and the best-of today leaderboard. *Impact +0.2.*
7. **Show the heart-loss and checkpoint moments.** *What:* clearing wave 4 shows no "MAINS CHECKPOINT UNLOCKED" and no heart-lost message; the Lifeline perk is never shown in the run. *How:* a gold toast on boss-clear ("Checkpoint: MAINS unlocked. Next run can start at wave 5") and a visible "❤ lost, 2 left, retry wave 4" screen. *Impact +0.3.*
8. **Trials: show your best and rounds lost on the card result.** Result card says `(you: 3)` KOs but not whether the "no round lost" star was missed. Add "Rounds lost: 2" and "Best: ★★ " lines. *Impact +0.2.*
9. **Fix the small layout items listed in the table** (BELLY FULL prompt over YOU marker, room modal against screen edges, CHALLENGES tile wrap). *Impact +0.2.*

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story map | Spicy (`🌶️ SPICY: clear it first`), Dessert (`finish the Grand Feast`), Second Helpings (`clear chapter 6 to open`) all locked; a challenge-first player cannot reach the hardest content | shot-27 | Add a challenge-based unlock path (Trials stars / Gauntlet waves) |
| 2 | major | Daily | Single random party-mode match, fixed bots, no medal targets shown before start; no reason to retry except a streak | shot-22, 24 | Named modifier + par targets + local best list |
| 3 | major | Gauntlet | Difficulty cliff: waves 1-3 trivial (4 s KOs, hard bot dies at once), wave 4 boss with 3 rivals, wave 5 Turbo + 3 ladle rivals | shot-15, 21 | Smooth the ramp, preview next wave |
| 4 | major | Gauntlet | No toast/message when boss wave clears that checkpoint MAINS unlocked; I only found it later in the popup | shot-16, 20 | Add "CHECKPOINT UNLOCKED" toast |
| 5 | major | Trials: Brutal Bot | `auto:hard` bot loses 0-3 to BRUTAL; no practice route (no way to try BRUTAL in Free Play before the Trial except BOT LEVEL menu) | shot-11 | Offer "practice this Trial with a checkpoint" or show a how-to-beat tip |
| 6 | minor | Daily fail panel | Tip `Tough bots? Set BOT LEVEL to EASY` is wrong for Daily (cannot change) | shot-24 | Daily-specific tip |
| 7 | minor | Trial result | `★★★ also 4+ knockouts (you: 3)` omits whether a round was lost; one line, hard to parse | shot-6 | Show "Rounds lost: N" |
| 8 | minor | Trial result | After a win with 1 star, no pointer to what the missing stars need beyond the long line | shot-6 | Split into checkmarks: ★ ✔ ★★ ✖ ★★★ ✖ |
| 9 | minor | Gallery detail | Mastery rewards shown as emoji only `✔✨ ✔⭐ 🔒🪙 🔒🍽 🔒👑 🔒✨`; levels and names unclear | shot-35 | Labelled ladder |
| 10 | minor | Gallery detail | Name shows `GOBZILLA JR.` while tile, HUD and trials show `GOBZILLA` | shot-35 vs shot-5 | Consistent name |
| 11 | minor | Free Play setup | BRUTAL described only as `everything HARD does, faster` | shot-29/30 | State actual numbers (reaction, dash cooldown) |
| 12 | minor | Party setup | BOT LEVEL pill present but no explanation line like Free Play has; default EASY | shot-36 | Reuse the level explanation |
| 13 | minor | Match HUD (boss wave) | `BELLY FULL! PRESS E / Y → KAIJU` prompt overlaps the `▼ YOU` marker | shot-15 | Offset prompt above marker |
| 14 | minor | Countdown | Large countdown "1" and the 3-line intro text sit on top of the table props (ketchup, pancake); `TWIST: TURBO` banner at top fades behind the ketchup bottle and is hard to read | shot-21 | Dark plate behind intro text; move top banner off props |
| 15 | minor | Challenges popup (title) | After a best wave, the CHALLENGES tile text wraps to 2 lines (`Gauntlet (best 4) · 🎯 / Trials 1★`) and pushes the title up, different from other tiles | shot-20 | Shorten to `Best 4 · 1★` |
| 16 | minor | PHONES AS PADS room | Modal fills the full 720 px height: title at top and `Waiting for at least one friend to join...` text touch the screen edges; `/look` lists no text for the room (not screen-reader visible) | shot-37 | Add margin or scroll, expose text |
| 17 | minor | Gauntlet perk screen | Perk cards do not show their `1 / 2 / 3` key (title says it, cards don't); bottom cards overlap table props | shot-13, 16 | Put the number badge on each card |
| 18 | minor | Gauntlet | Hearts in HUD top-right are white/outlined `❤❤` (hard to tell lost from kept); no heart-lost message between waves | shot-15, 18 | Red full / grey empty hearts + message |
| 19 | minor | Instant replay | Pressing Escape during INSTANT REPLAY in a Daily match needed 2 presses before the pause menu appeared | (no shot) | Pause should work during replay |
| 20 | minor | Pause menu in Gauntlet | `✖ QUIT (ends the Cup / run)` says "Cup" in a Gauntlet or Daily; the confirm line `Tap QUIT again to really end the Cup / run` is generic | shot-18 | Use context wording ("end your Gauntlet run: wave 5") |
| 21 | minor | Perk screen | Escape does nothing while the perk screen is showing (cannot pause or quit) | shot-17 | Allow pause/quit on perk screen |
| 22 | polish | Records p1 | `Rank pts` note at bottom-left and `Next up` pin line at bottom are 2 lines of small (11-12 px) text | shot-31 | Increase size |
| 23 | polish | Round-end banner | `GOBZILLA ★☆☆ PIZZARAPTOR ★★★` score line is small beneath a huge title; first-to-3 pips hard to read at a glance | shot-9 | Larger pips |
| 24 | polish | Trial start | Player kaiju is random-looking (Gobzilla in some trials, Norigon in Brutal Bot); not shown on the Trials card | shot-11 | Show/choose kaiju per Trial |
| 25 | polish | Story map | Snake layout (4 / 5-8 reversed / 9-12) with a connector line is easy to misread | shot-27 | Number arrows |
| 26 | polish | Story map | Opening video autoplays over the story screen when entering Story the first time and my first PLAY click did not start chapter 1 (screen stayed on `story`) | shot-26 | Click PLAY twice was needed; make PLAY work through the video |
| 27 | polish | Title | NEXT UP box overlaps the strawberry kaiju's fork and is semi-transparent; text 12-14 px | shot-1 | Darker panel |
| 28 | polish | Pantry | Lifeline card shows only `245 🪙 −30% today`; original price missing | shot-33 | Show strike-through 350 |
| 29 | polish | Pantry weekly orders | All 3 orders `paid` instantly and the order toast said `Order done: Win 5 matches` without the payout amount in the post-match list | shot-16 | Add `+40 🪙` to the post-match line |
| 30 | polish | Free Play | `15/20 kaiju` unlocked after ~12 matches; the locked-4/2 start is fast to open for a challenge player | shot-29 | Fine; consider slower reveal |

## 🔠 Text and layout check
- Title screen: OK (NEXT UP box sits over fork art, readable). shot-1
- Challenges popup: OK; CHALLENGES tile wraps to 2 lines after progress (item 15). shot-2, shot-20
- Trials list: OK, no overlap, all 8 cards aligned. shot-3
- Match HUD (1v1, 3 rivals, 4 rivals): OK except BELLY FULL / YOU overlap (item 13). shot-5, shot-15
- Round-end banner: OK, small score line (item 23). shot-9
- Trial result (clear / fail): OK, text sits over table art but readable. shot-6, shot-10, shot-11
- Gauntlet perk pick: OK; cards overlap table props but legible. shot-13, shot-16
- Countdown intro text: text over props, top TWIST banner faded (item 14). shot-21
- Pause menu: OK. shot-18
- Daily fail result: OK; THIS MATCH panel crowds near SHARE button but does not overlap. shot-24
- Free Play setup: OK. shot-29
- Party Modes setup: OK, 11 pills in one row, none overlap. shot-36
- PHONES AS PADS room: modal touches top/bottom screen edges (item 16). shot-37
- Records page 1: OK; small footer text. shot-31
- Pantry: OK. shot-33
- Gallery: OK; reward row cryptic (item 9). shot-35
- Story map: OK (opening video overlays first). shot-26, shot-27

## The single biggest structural problem
The hardest content is locked behind the longest path, and the content that is open to a challenge player (Gauntlet, Trials, Daily) is not tuned as a coherent ladder. I reach wave 4 in minutes with a 4-second KO, then hit a Turbo wall. The Daily has nothing to chase beyond "win once". As a result the first hour as a challenge seeker is "easy, easy, easy, wall, locked, locked".

What is missing is a **progression spine for challengers**: a clear ladder (Trials stars -> Gauntlet courses -> Spicy -> Dessert) with visible next targets and rewards, and difficulty that rises one rule at a time. The pieces exist (stars, checkpoints, perks, medals) but they are siloed.

## Big change proposals (2-3, most important first)

### Proposal 1: Challenge Ladder (unlock Spicy and Dessert through challenges)
- **Problem it solves:** hardest content is out of reach for a challenger (item 1), and Trial stars do nothing but pay 20 coins.
- **How it would work (detailed design):** A new "LADDER" bar on the Challenges popup with 5 rungs: 3 Trial stars = Spicy ch1-2 open; 8 stars = Spicy ch3-6 open; Gauntlet wave 8 = Dessert Course preview (first 3 courses); 16 stars = Spicy ch7-12; Gauntlet wave 12 = full Dessert. Each rung shows a lock icon, requirement, and reward (colour / title / coins). Story locks on the Story map change from "clear it first" to "3 Trial stars (you: 1)", clickable to jump to Trials. Story progress still unlocks the same chapters, whichever comes first.
- **Example moment:** I three-star Hard Duel, see "Spicy ch1 unlocked" toast, tap it, and land on the Story map with ch1 Spicy highlighted.
- **Rewards / progression hooks:** titles ("Spice Runner"), colour unlocks, Chef Rank points per rung.
- **Risks and edge cases:** players skipping Story story beats; mark those chapters with a "story spoiler?" confirm and keep comic panels.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Daily Gauntlet Brief
- **Problem it solves:** Daily is one random match with no goal (item 2) and a wrong tip (item 6).
- **How it would work (detailed design):** Title tile shows today's title, e.g. "TODAY: HOT DUMPLING · NO KAIJU · 2 hearts". Launch screen (new, 1 page): modifier list, rival levels (already shown), 3 medal conditions (Bronze play, Silver win, Gold win without losing a round or under 90 s), and your best result today with a seed code. Result screen shows medal earned and a retry button that keeps the seed. 3 daily tries tracked; local best list for the week; share card with the seed.
- **Example moment:** I read "Gold: win in under 90 s", retry the same seed three times, and get Gold on try 3.
- **Rewards / progression hooks:** daily medals feed Chef Rank and a weekly "3 golds" Pantry order.
- **Risks and edge cases:** rotation of modes (Hot Dumpling is chaotic for gold targets); keep rival levels gentle as shipped.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 3: Gauntlet "Next Wave" Briefing and heart screen
- **Problem it solves:** cliff at wave 4-5 (item 3), no checkpoint/heart feedback (items 4, 18).
- **How it would work (detailed design):** On the perk screen add a right-hand strip "NEXT: WAVE 5 - MAINS - 3 rivals - TURBO twist - boss no" plus the course unlock progress; after a boss wave, gold banner "MAINS CHECKPOINT UNLOCKED"; red hearts with a lost-heart animation and "2 left" text; waves 1-3 get 2 rivals and a twist. Add a per-run recap (waves, KOs, perks) on game over with "start from MAINS" button.
- **Example moment:** I see "TURBO next" and pick Sugar Rush deliberately.
- **Rewards / progression hooks:** recap contributes to Gauntlet Master/Runner achievements, shows best-run record.
- **Risks and edge cases:** do not over-warn; keep boss reveal surprise optional.
- **Size:** S-M
- **Score impact for me:** +0.7

## How this round's new features felt
- **Fairness: bots don't attack for 1.4 s:** not noticeable as unfair either way; hard bot dies in 4 s early in Gauntlet, so the early game feels too easy rather than too tough.
- **Round-end "how you went out":** excellent (shot-9). Keep. Would like "and who" too.
- **Free Play bot-level explanation:** good (shot-29/30); BRUTAL wording vague; missing in Party setup.
- **Daily countdown rival levels:** good, honest (`normal, easy, easy`). Daily bots do feel gentler, but the Daily is still chaotic Hot Dumpling and I lost twice.
- **Giant Hand vs KAIJU dodge:** the lane telegraph is clear, but it killed my deciding round in Hard Duel while I was unarmed; DASH timing is hard to see during a fight. I could not verify KAIJU immunity directly.
- **Toasts:** achievement and NEW KAIJU toasts appear top right and are legible (shot-6, 16, 28); I never saw more than 1-2 at once.
- **Pantry orders payout / second tap:** second tap works and states the price; orders show `+40 🪙 paid` in Pantry but the post-match line omits the payout.
- **New-save locks (4 kaiju, 2 tables):** by 12 matches I had 15/20 kaiju and 14/18 tables; it feels paced and rewarding with fast toasts.
- **Story comic panels / PHASE 2 banner / Kid Mode calm starts:** not reached (Story locked).
- **Phones as Pads:** QR room appears with a big code `ZLWZ` and QR (shot-37); readable, tight to screen edges; PARTY CUP switch shows ON/OFF.
- **Gallery reach/cooldown and Mastery ladder:** reach/cooldown text appears (`reach 207 · every 1.6 s`) and is useful; the ladder is cryptic emoji (item 9).
- **Fixes from last round:** quit confirmation resets worked in my Gauntlet pause (first tap warned, second quit). Escape in instant replay needed two presses (item 19).
- **Text/layout:** only minor issues listed above; no cut-off text found.

## Bugs that block play
- None blocking. `/errors` returned `none` at start, middle and end.
- Non-blocking oddities: Escape during instant replay/perk screen does not open pause (items 19, 21); Story PLAY click did not start chapter 1 on first click while the opening video was showing (item 26).
