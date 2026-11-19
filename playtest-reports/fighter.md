# Playtest evaluation — The Fighter

**Fun score: 6.5 / 10** (the KAIJU stomp, the powers and the "step out of the ring, punish the dizzy" idea are great, but at HARD and above the fight is decided by who stomps first, rounds last about 6-12 s, and I could not read or answer most of my deaths)

> This round the bar is **9/10 from EVERY profile**. Screenshot paths are relative to `C:\Users\Pat\kitchen-kaiju\` (folder `art-src\.playtest\r9-7102\`, files `shot-N.png`).

## What I did
- About 105 harness calls (many were short loops of /act). Profile "fighter", port 7102. /errors checked at start, middle and end: always `none`.
- **Free Play, 3-player HARD (Gobzilla Jr. vs Squidgeon + Mothball):** 2 full matches, both lost (0 rounds, then 2 rounds and lost on tiebreak). About 14 rounds in total. I cycled the BOT LEVEL pill NORMAL, TOUGH, HARD, BRUTAL, EASY, NORMAL.
- **Free Play 1v1 NORMAL, Fists Only twist (Squidgeon vs Hotchog):** one lost round, then a plain 1v1 match won 3-1.
- **Gallery:** read the power text for 11 kaiju (reach and cooldown), opened locked "???" entries, ran **Move Lab** with Gobzilla (STOMP, then Seed Spray x3).
- **Daily (Hot Dumpling, 4 players, I was Salmonster):** won with `auto:hard` in my seat, Gold medal.
- **Challenges:** the Gauntlet picker (only STARTERS open) and **Trials** (8 listed). Started **Hard Duel** and lost round 1 at 2 s to a thrown knife, then quit.
- **Records** (stats + achievements page 1), **Pantry** (orders, double-tap buy of Toffee, refusal reason on Silverware), **Party Modes** (Team Feast setup, **PHONES AS PADS** room/QR), Table Workshop (opened by accident, not used), the Twist picker, the pause menu (QUIT).
- Not visited: Story, Online, Settings, Help, Spicy chapters, Dessert Course, Practice. Phone mode not used (desktop harness).
- Roughly 35 in-game minutes of rounds (rounds are short).

## What worked for me
- **KAIJU is a great fight beat.** Belly 100, STOMP, bigger body, red belly bar that drains, ring on the floor. Going giant at the right moment is a real decision, and the post-match tip ("Step out of the ring before each stomp, then hit them while they are dizzy") is good teaching. shot-5, shot-6, shot-9.
- **Each kaiju has a distinct KAIJU power** and the Gallery gives numbers: "Seed Spray (reach 207 · every 1.6 s)", "Flutter (reach 299 · every 1.2 s)", "Claw Snap (reach 126 · every 1.2 s)", "Slice Toss (reach 323)". shot-14. First time I could compare kaiju on paper.
- **Move Lab** lets me try a power right away (STOMP is pre-charged). The Seed Spray ring shows its reach nicely (shot-17).
- **Round-end banner says how and when I went out**: "You went out at 12s: a KAIJU stomp (SQUIDGEON)", "You went out at 2s: thrown cutlery (PIZZARAPTOR)". Very useful for a fighter (shot-6).
- **Kill feed and end-of-match breakdown**: "SQUIDGEON SQUASHED GOBZILLA", "Knocked out by: a KAIJU x3, fell off" plus a targeted tip.
- Instant Replay on a death and "FAST FORWARD x3 · only bots left" respect my time.
- BOT LEVEL has a one-line description under PLAY ("HARD: leads its throws, dodges and parries", "NORMAL: fair aim, dodges sometimes"). The Daily countdown names rival levels ("3 rivals (normal, easy, easy)").
- Trials are a good fighter's ladder: clear goals, 3 stars, "win without losing a round + 4 KOs", "BRUTAL ... the hardest bot in the game".
- Pantry double-tap buy works ("Toffee colour? tap again to buy for 40") and the refusal is clear ("need 111 more").
- Locked Gallery silhouettes say how to unlock ("Win 1 match in any mode (you have 0/1)", "Beat Story chapter 2 (0/2 cleared)").
- Zero JavaScript errors in the session.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make HARD/BRUTAL fights decided by skill, not by who stomps first (+1.0).**
   - **what:** A bot that reaches belly 100 first and stomps nearly always wins the round. On HARD I lost round after round to a KAIJU squash or an early cutlery pick-off.
   - **where:** Classic Free Play / Party / Trials at HARD and BRUTAL.
   - **how it should behave:** (a) Stomp has a visible 0.6 s wind-up (growing ring) during which the stomper can be interrupted by a hit or dash-shove; bots use the same wind-up. (b) After a KAIJU ends, that kaiju cannot stomp again for 8 s. (c) Bots cannot stomp in the first 4 s of a round (Mothball was KAIJU by 6-7 s in about 5 of 8 HARD rounds).
2. **Give me a way to read and answer a stomp (+0.8).**
   - **what:** The squash ring shows only as the stomp lands; the only warning is a faint ring. DASH is the answer but there is no tell for WHEN.
   - **where:** Every match with KAIJU on.
   - **how it should behave:** 0.5 s before a squash, draw a bright red circle on the floor at the exact landing radius with a rising tick sound and a "!" over the stomper. A dash out of the circle pops "DODGED!" and gives the stomper 1.5 s dizzy: the "hit them while they are dizzy" payoff the tip promises.
3. **Add a real fighting-practice space (+0.7).** Move Lab has one passive dummy that sits on a nest (shot-16/17). It needs dummy modes: "Stomps at you" (practise the dodge), "Throws at you" (practise dash/swipe parry), "Free for all"; a reach-ring toggle and a cooldown ring; a visible BACK button (only "Esc to leave" is shown).
4. **Per-kaiju stats and a Combat page in Records (+0.6).** The Gallery says only "Matches: 2 · Wins: 0". Add wins/KOs/KAIJU-KOs/dodges per kaiju, best table, and a "knocked out by" breakdown over time (cutlery, squash, fall, swipe) so I can see what I am bad at.
5. **Explain how powers differ in more than reach (+0.4).** Nine of eleven powers say "every 1.6 s" and the text is flavour. Add an icon row: reach, cooldown, effect (knock / daze / trap / dash) and a counter hint ("dodge sideways", "stay out of the ink").
6. **Show parries and dodges (+0.4).** HARD "dodges and parries", but nothing tells me when I was parried or when my swipe knocked cutlery out of the air. Add "PARRIED!" / "BLOCKED" pops and a PARRIES counter in HUD and Records.
7. **Faster return after an early death (+0.3).** After a 3-second death I wait through banner plus replay. Add "Space: next round" on the banner.
8. **Fix the minor feedback holes (+0.3):** no YOU WIN moment, no QUIT confirmation, token totals disagree, kill-feed overlap (see table).

If 1-3 are done and nothing else breaks, I would score 8.5; 4-8 bring it to 9.

## 🔍 Every issue I saw (exhaustive)
Severity: **blocker / major / minor / polish**. Shot paths are `art-src/.playtest/r9-7102/shot-N.png`.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Match, HARD bots | A HARD bot with KAIJU wins almost every round: Mothball went KAIJU by about 6-7 s and squashed me in rounds 2, 3 and 4 ("MOTHBALL SQUASHED GOBZILLA"). No counterplay is visible before the squash. | shot-8, shot-9 | Stomp wind-up tell, interruptible, early-round lockout, KAIJU cooldown (list #1, #2). |
| 2 | major | Match, HARD / Trial | Deaths at 1-3 s from a thrown knife ("You went out at 2s: thrown cutlery (PIZZARAPTOR)", "You went out at 1s: thrown cutlery (MOTHBALL)"). Bots start already holding cutlery (Mothball "holding": "knife" at roundTime 0) so the 1.4 s grace still allows a throw by about 2 s. One banner said 1 s while the state clock read about 3 s. | shot-23, shot-24 | 2.0 s grace on HARD+, show a "bots arm in 1.4" countdown, make banner time and clock agree (measure from GO!). |
| 3 | major | Match (all) | No readable warning before a KAIJU squash lands; the ring appears with the hit and is a thin outline. | shot-6 | 0.5 s red landing circle (Proposal 1). |
| 4 | major | KAIJU mode | POWER becomes usable again after about 1.6 s but there is no on-screen cooldown ring or "ready" text; I could not tell from the screen when it was usable. | shot-5, shot-17 | Cooldown ring around the KAIJU and a "POWER READY" label. |
| 5 | major | Move Lab | The only dummy (Dumplord) sits on its nest holding a ladle and never moves or fights, so reach versus movement cannot be practised. The footer says "Esc to leave" but there is no on-screen leave button. | shot-16, shot-17 | Dummy modes (walks, dodges, stomps) and a BACK button (Proposal 2). |
| 6 | major | Match end | When I **won** the 1v1 the banner read "SQUIDGEON RULES THE TABLE" with "(YOU)" in the list. There is no YOU WIN moment for the human. | shot-36 | "YOU WIN!" splash with confetti when the human wins; different headline when a bot wins. |
| 7 | minor | Pause | **QUIT has no confirmation.** Esc then one click on "QUIT" went straight to the menu mid-match (twice) and, from the Trial pause menu, to the title. The brief says a quit confirmation exists; I never saw it. | shot-24, shot-32 | First tap turns the label into "TAP AGAIN TO QUIT" (3 s), reset on RESUME. |
| 8 | minor | Match HUD | The bottom kill-feed ("SQUIDGEON SQUASHED GOBZILLA") sits on the table-rim strip and overlaps the KAIJU's ring; a second line ("MOTHBALL skewered GOBZILLA" at y=695) is almost at the screen edge. | shot-6, shot-8 | Move up to about y=650 on a dark pill, max 2 lines. |
| 9 | minor | Match-end panel | Title "RULES THE TABLE" overlaps the cereal bowl / prop art; the "THIS MATCH" box on the lower left is about 5 px from the SHARE button and its bottom touches the table frame. | shot-9, shot-36 | Darken behind the title, 12 px gap. |
| 10 | minor | Daily countdown | The line "DAILY · 3 rivals (normal, easy, easy) · win to keep your streak · Picnic Blanket" is about 890 px wide with no dark backing and crosses the ant trail and the basket; hard to read on the tablecloth. | shot-18 | Dark pill, split into 2 lines. |
| 11 | minor | Daily | Rival "Sloba" appears in the Daily even though the title says Sloba is locked until Story ch2; I was assigned Salmonster with no chance to choose my kaiju. | shot-18 | Allow guests with a "Guest" label or choose only unlocked kaiju; let me pick. |
| 12 | minor | Daily end | A REMATCH button is shown although "tries 1" and today's medal is done; unclear whether it counts. | shot-20 | Label "PRACTICE AGAIN (doesn't count)". |
| 13 | minor | Match-end panel | Token totals disagree: panel says "+215 Chef Tokens (304)", Records shows 304, Pantry then shows 329 (the panel's last line "Play any Party Mode +25" is added after the total). | shot-20, shot-25, shot-26 | Include every reward in the displayed total. |
| 14 | minor | Free Play setup | FIRST TO did not persist (re-entering Free Play showed FIRST TO 5 after 3) while BOT LEVEL did persist; the pill cycles 3, 5, 7, 10, 1, 3, so it takes many clicks to go back. | shot-30 | Persist both; add right-click/long-press for reverse. |
| 15 | minor | Free Play setup | BOT LEVEL cycles NORMAL, TOUGH, HARD, BRUTAL, EASY, NORMAL: EASY sits after BRUTAL. I accidentally got BRUTAL when aiming for the next step. | shot-3 | Order EASY, NORMAL, TOUGH, HARD, BRUTAL. |
| 16 | minor | Free Play seats | Clicking my own seat changed Gobzilla to Squidgeon with no picker; ArrowRight did nothing. Only tiny arrows on the card hint at cycling and they are not in /look. | shot-3 | Show a kaiju picker or "arrows to change" text. |
| 17 | minor | Party Modes setup | The line under the seats shows the Party Cup text, so the **bot-level description disappears** (it is shown in Free Play). | shot-27 | Show both lines. |
| 18 | minor | Party Modes setup | "CUP LENGTH 6 GAMES" stays active while "PARTY CUP OFF". Eleven small pills in one row with 12-13 px two-line labels. | shot-27 | Grey out CUP LENGTH when the cup is off. |
| 19 | minor | Phones as Pads room | The panel is full-height: "YOUR ROOM" touches the top edge and "Waiting for at least one friend to join..." sits at y=698 on the bottom edge. Two join instructions compete ("Friends tap ONLINE, Join a game and type this code" and the QR text). /look returns no texts for this screen. | shot-28 | Shrink the card by about 40 px, one instruction, expose texts to the scene list. |
| 20 | minor | Records | No combat statistics (KOs by cause, best kaiju, dodges, parries). | shot-25 | Add a Combat page (list #4). |
| 21 | minor | Records | Achievements need a PAGE button with no "page 1/3" indicator; the "Chef Rank PREP COOK" value is cramped at the right edge of the stats box. | shot-25 | Add page indicator, widen box. |
| 22 | minor | Gallery | The Mastery reward ladder is only icons ("Rewards: lock + sparkle, lock + star, ...") with no level numbers or names, so I cannot tell what the next reward is. The brief promises a full ladder with check/lock marks. | shot-14 | Show "Lv2 colour, Lv3 star..." with the current level highlighted. |
| 23 | minor | Gallery | "Matches: 2 · Wins: 0" for Gobzilla while Records shows a win (made with another kaiju); eight "???" silhouettes need a click each to learn the unlock goal. | shot-14, shot-15 | List all unlock goals in one panel. |
| 24 | minor | Gallery | Power text is a 3-line paragraph with numbers buried in the sentence; 9 of 11 powers share "every 1.6 s". | shot-14 | Separate stat row with icons. |
| 25 | minor | Move Lab countdown | The tip "The giant hand goes for whoever has the fullest belly." is shown where there is no giant hand; its bulb icon overlaps the salt shaker prop. | shot-16 | Use a Move Lab tip. |
| 26 | minor | Move Lab HUD | Top-right "PRACTICE / ROUND 1 · SUNDAY ROAST" wraps to two lines and a lone star sits by the belly bar with no meaning. | shot-17 | Show "MOVE LAB". |
| 27 | minor | Hard Duel Trial | The Trial goal ("win without losing a round + 4 KOs") is not tracked in the match HUD, so I cannot see my progress. | shot-23 | Show "KOs 0/4 · rounds lost 0" in the HUD. |
| 28 | minor | Gauntlet picker | MAINS/DESSERTS/SECONDS say "clear wave 4/8/12" with no explanation of what a wave is or how long a run lasts. | shot-21 | One line explaining waves. |
| 29 | minor | Giant Hand | The hand arrives with a shadow but I could not tell whom it targets; the "fullest belly" rule is only a tip, and it punishes the crumb-eating the game teaches (I sat at belly 85-95 when it came). | shot-10 | Pulsing target ring on the chased player. |
| 30 | minor | NORMAL 1v1 | The bot did nothing for 10-12 s in several rounds (no events) and fast-forward only applies after I die. | shot-33, shot-34 | Sudden-death cue (shrinking table) after 20 s. |
| 31 | polish | Replay | "INSTANT REPLAY" label overlaps the toaster prop at the top of the table. | shot-8 | Move over the HUD strip. |
| 32 | polish | Title | "NEXT UP" box uses small text on busy art and the third goal is cut in the text list. | shot-1 | Darker box, larger text. |
| 33 | polish | Match HUD | Eliminated players' names are about 30% opacity on a dark bar and hard to read. | shot-6, shot-20 | 60% opacity. |
| 34 | polish | Twist picker | Double twists repeat information ("RINK + TURBO" over "ICE RINK + TURBO") and "FISTS ONLY" subtitle is smaller than its siblings. | shot-30 | Same font size, one-line names. |
| 35 | polish | Trials | The header line is one very small 130-character line. | shot-22 | Split into chips. |
| 36 | polish | Pantry | All six colours are cosmetic; a fighter has nothing to buy. "-30% today" is on the price line of the Lifeline card but small. | shot-26 | Add KAIJU trails, hit flashes, Move Lab dummies. |
| 37 | polish | Navigation | After Close Room / MODES I landed on the Table Workshop by tapping the top-right area (title buttons shift when screens change); there is no "test with bots" in the Workshop beside PLAY IT. | shot-29 | Add "Test with bots". |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title** (shot-1): OK. "NEXT UP" box is small text on art (32).
- **Free Play setup** (shot-2, shot-3, shot-30): OK. No overlap or cut-off. Seat arrows are tiny (16).
- **Twist picker** (shot-30): OK; every card fits. "FISTS ONLY" subtitle is smaller (34).
- **In-match HUD (Sunday Roast, Breakfast Rush, Dinner for Four)** (shot-4, shot-5, shot-10): OK while playing; names, bars and "KAIJU MODE!" fit.
- **Round-end banner** (shot-6): kill-feed overlaps the KAIJU ring and rim (8); the banner box fits.
- **Instant replay** (shot-8): label overlaps the toaster (31).
- **Match-end panel** (shot-9, shot-20, shot-36): title overlaps prop art and THIS MATCH is cramped against SHARE (9).
- **Pause menu** (shot-24): OK. QUIT behaviour is the issue (7).
- **Gallery** (shot-14, shot-15): OK; dense power text (24); ladder unlabelled (22).
- **Move Lab** (shot-16, shot-17): bulb icon overlaps salt shaker (25); top-right label wraps (26).
- **Daily countdown** (shot-18): wide text over the ant trail (10).
- **Challenges modal** (shot-21): OK.
- **Trials** (shot-22): OK; header line tiny (35).
- **Records** (shot-25): OK; tight value box (21).
- **Pantry** (shot-26): OK; prices and tags fit on all 8 cards.
- **Party Modes setup** (shot-27): OK; pills small (18).
- **Phones as Pads room** (shot-28): touches top and bottom screen edge (19).
- **Table Workshop** (shot-29): opened by accident, only glanced at; no problem seen.
- **Not checked:** Story, Online, Settings, Help, Spicy, Dessert Course, phone layout.

## The single biggest structural problem
**Stomp-first-wins.** Every round I lost at HARD followed the same script: a bot (Mothball or Squidgeon) reaches belly 100 in 5-7 seconds, goes KAIJU with no wind-up I can see, and squashes me or the other bot; the round ends in 6-12 s. The counterplay (DASH sideways, step out of the ring) exists in tips but not on screen, so I never felt I out-played the bot, only that I ran out of time to eat crumbs. A skill-based fighter needs readable cause and effect: a tell, a dodge, a punish.

The second half of the loop is practice and feedback: Move Lab is one passive dummy, Records has no combat data, and nothing shows my play improving. There is also no ladder between "NORMAL is a walk" (I won a 1v1 3-1 doing very little) and "HARD is a wall".

## Big change proposals (2–3, most important first)
### Proposal 1: Readable Stomp (wind-up, dodge, punish)
- **Problem it solves:** KAIJU squashes arrive without a tell, so HARD rounds feel decided by whoever stomps first (issues 1, 3).
- **How it would work (detailed design):**
  1. At belly 100 pressing STOMP starts a 0.6 s ROAR. A red circle grows to the squash radius (about 150 px) with a rising tick sound and a "!" bubble over the stomper. The stomper is rooted but can be hit.
  2. A dash-shove or thrown cutlery during the roar cancels the stomp: stomper dazed 1.2 s, belly drops to 50, hitter sees "STOMP STOPPED!".
  3. A rival who DASHES out of the circle gets "DODGED!"; the stomper lands, is dizzy 1.5 s (the end-of-match tip) and takes double knock-back from the next hit.
  4. Bots at every level use the same roar; they dodge about 10% (EASY), 60% (HARD), 85% (BRUTAL) of the time.
  5. No stomps in the first 4 s of a round; 8 s lockout after a KAIJU ends.
- **Example moment:** Mothball roars, I see the red circle, dash left, "DODGED!" pops, Mothball sits dizzy and I knock it off with a thrown fork.
- **Rewards / progression hooks:** Achievements "Stomp Stopper (stop 10 stomps)" and "Dodge Master (30 dodges)", Mastery XP for dodges, tracked in Records.
- **Risks and edge cases:** Dash spam (give dash a visible 1.2 s cooldown). Mini Kaiju and Kaiju Frenzy twists need a shorter roar (0.3 s). Online latency tolerance about 100 ms.
- **Size:** M
- **Score impact for me:** +1.5

### Proposal 2: Dojo (a real fighting practice space)
- **Problem it solves:** Move Lab is one passive dummy; nothing tests dodging, parrying or matchups (issues 5, 20).
- **How it would work (detailed design):** A DOJO tile beside Gallery and Challenges. Pick my kaiju, then a drill: (a) POWER RANGE with dummies at 100/200/300 px and a live reach ring; (b) DODGE DRILL: a bot that stomps every 6 s with the Proposal 1 circle, counter "Dodges 7/10"; (c) PARRY DRILL: a bot that throws every 2 s, counter shows parries; (d) MATCHUP: any enemy kaiju (locked ones as guests) at easy/normal/hard. Each drill gives 1-3 stars (thresholds shown) and 10/20/30 tokens once.
- **Example moment:** I pick Toastbat, run the Dodge Drill and see "Dodges 7/10, 2 stars" with a replay of my two misses.
- **Rewards / progression hooks:** All 3-star drills give a "Black Belt" title and a colour.
- **Risks and edge cases:** Needs a drill-pick UI that is phone-friendly; drill bots must obey normal rules.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 3: Combat Records and Coach
- **Problem it solves:** No feedback on combat skill (issues 20, 22, 23).
- **How it would work (detailed design):** A COMBAT page in Records: KOs by cause (cutlery, swipe, fall, squash, hazard), "knocked out by" breakdown, dodges, parries, longest KAIJU streak, fastest KO. Gallery cards get W-L, KOs, KAIJU-KOs, best table and a matchup line. The match-end tip box picks a "Coach" line from your biggest cause of death ("You were squashed 3 times: dash sideways when the red circle appears").
- **Example moment:** After losing to Mothball I read the Coach line and try the dodge next match.
- **Rewards / progression hooks:** "Coach tips taken" achievement; weekly Pantry order "Dodge 15 stomps".
- **Risks and edge cases:** Extra save data; migrate old saves with zeros.
- **Size:** S-M
- **Score impact for me:** +0.5

## How this round's new features felt
- **Bots don't attack for the first 1.4 s:** noticeable, but on HARD a bot already holding a knife can still land a throw by about 2 s (issue 2). Needs a visible countdown.
- **Round-end "how and when you went out":** excellent; I used it every round. It would be better still if it gave the fix ("DASH sideways").
- **Free Play bot-level explanation:** good; missing in Party Modes (17).
- **Daily countdown names rivals' levels:** good; the line is too long (10). Daily bots felt gentle: I won 3-0 with a bot in my seat.
- **Giant Hand can't flick a KAIJU:** I could not see the difference; I only saw the shadow arrive and was not hit. No target marker (29).
- **Achievement toasts:** "Not It!! +30" and "World Tour! +30" appeared top right and looked good; the rest are listed in the THIS MATCH panel. One toast per match visible.
- **NEW KAIJU / NEW TABLE toasts:** I did not see any (I started at 12/20 kaiju and the setup screen read 14/20 after the Daily). Possibly missed.
- **Pantry orders payout, double-tap buy, refusal reasons:** worked well.
- **Locked kaiju/tables on a new save:** the NEXT UP goals and "???" cards with exact goals are a good drip; for a fighter it limits power comparison early.
- **Story comic panels / PHASE 2 banner / Kid Mode:** not touched.
- **Phones as Pads:** QR plus code is clear but the panel is tall and Start is greyed until a friend joins (19).
- **Gallery reach/cooldown and Mastery ladder:** reach and cooldown are exactly what I wanted; the ladder is unlabelled (22).
- **Fixes from last round:** double twists are in the picker; Kid Mode bots, Practice SWIPE, phone TWIST and Team Feast grouping not tested; quit confirmation not seen (7).
- **Text and layout:** one clear overlap at the match-end title and kill feed; otherwise good.

## Bugs that block play
- None. /errors was `none` at start, middle and end. The only snags were the harness `attack` command looping on "YOU pickup" while holding a knife, and QUIT without confirmation.
