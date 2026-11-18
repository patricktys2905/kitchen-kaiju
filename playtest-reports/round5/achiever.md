# Playtest evaluation — The Achiever

**Fun score: 6.5 / 10** (a clear, well-signposted checklist with a good "next up" nudge, but 34 flat achievements, a single-session unlock curve, and no layer above the checklist; I had 10/34 after about 20 matches and nothing told me what the "long game" was.)

## What I did
- Title: read the NEXT UP banner ("Clear Story ch 4 -> Minturtle -> Win a match -> Lime colour"). Records page 1 and 2 (all 34 achievements), Gallery (kaiju grid, colour row, locked-item progress), Free Play setup, Party Modes setup (cycled MODE through Team Feast / Crumb Rush / Hot Dumpling / Golden Spoon / Classic), Story chapter select, Daily, Gauntlet, Table Workshop, Pause menu.
- Matches: about 20 counted by Records (10 won): 1 manual Free Play (died while eating crumbs), 7 via /autoplay (Free Play, Hot Dumpling, 2x Golden Spoon), Story ch1 (3 stars, driven with auto:hard), Gauntlet waves 1-5 (cleared, quit in wave 6), Daily (won).
- Records went 0/34 -> 5/34 (after 5 autoplay matches) -> 6 -> 10/34 at the end. Gauntlet Runner (Midnight colour) popped a toast, which I liked.
- Real-time cost: /autoplay was about 52 s per match (5 matches = 4 min 22 s). Gauntlet waves were around 1 min each.
- /errors: none at start, middle and end.

## What worked for me (briefly)
- The "NEXT UP" line on the title and "Next up: X (40%)" at the bottom of Records are exactly what an achiever needs; they never left me stuck.
- Locked colours in the Gallery tell me the real counter ("Lava: Size Matters: Go KAIJU 10 times (0/10)"), and locked kaiju say "0/4 cleared". That is clear.
- The achievement->colour pairing is a good carrot (Records shows the colour next to the goal text).
- The Gauntlet-Runner unlock toast named both the achievement and the colour.
- Stats page is compact and readable; "Tables visited 17/18" gave a satisfying counter.

## The single biggest structural problem
The achievement layer is a flat list of 34 one-off checkboxes, and it has no depth, no tiers and no long-term loop. I was trying to answer "what is the whole job and how long will it take?". The page shows 0/34 and one "Next up" at a time; it does not show progress bars on the other 33, so I could not plan a route. Most of the list is also consumed by normal play with no intent: after about 20 matches (about 15 minutes of my time, mostly autoplay) I had 10/34, and several unlocked as a side effect (World Tour, "Tables visited" 18/18 after about 20 matches vs a goal of 12). Meanwhile the hardest-looking goals are pure counters (Win 50 matches, Eat 1,000 crumbs, Score 250 knockouts) which /autoplay does for me, so the achiever's "skill" and "plan" decisions vanish and the grind is just waiting at about 50 s per match.

Why it matters for me: an achiever wants a visible mountain with several tiers, goals that ask me to do something different (not just more), and a reason the 34th checkbox is more meaningful than the 3rd. Today the first 15 are quick and the last 10 (Ghost Pepper, Clean Plate, Cup Champion, Regular streak of 3 days) are gated behind the content, not mastery. There is no completion payoff past a colour.

## Big change proposals (2-3, most important first)

### Proposal 1: Tiered achievements with a Trophy Room (Bronze / Silver / Gold) and a Master Chef rank
- **Problem it solves:** Records shows a flat 0/34 with only one visible progress percentage (the "Next up" line). I could not see how far I was on "Win 50 matches" or "Eat 1,000 crumbs" except through the Gallery colour tooltip, and counters with a single threshold (Win 10, Win 50) have no middle. Also, "Regular Diner" gives a colour but "Head of the Table" (50 wins) gives nothing, so the hardest counters have the weakest payoffs.
- **How it would work (detailed design):**
  - Convert every counter achievement into a 3-tier ladder: Bronze / Silver / Gold. Wins 10 / 50 / 200. Crumbs 100 / 1,000 / 5,000. Knockouts 25 / 250 / 1,000. KAIJU 10 / 50 / 200. Matches finished 25 / 100 / 400. Gauntlet waves 5 / 10 / 20. Daily streak 3 / 7 / 30 days. Spicy chapters 1 / 6 / 12. This turns about 14 of the 34 into about 40 stars with no new content.
  - Records page 1 becomes a Trophy Room: each row shows the icon, the name, three pips, and a thin progress bar toward the next pip ("Win matches 14/50"). Rows sort by closeness to completion by default, with a toggle (Closest / Category / Unlocked). A "PIN" button (max 3) puts pinned goals on the title screen NEXT UP banner and in the match-end results screen.
  - Each tier gives an increasing reward: Bronze = coins/stars towards the Master Chef rank (below), Silver = a profile banner/emote, Gold = a colour or a cosmetic (hat, trail, victory pose). Existing colour rewards move to the tier where they currently sit (Lime on Bronze First Bite, Ocean on Silver Wins).
  - Master Chef rank: each pip is 1 point (about 100 points total). Rank titles at 10 / 25 / 50 / 75 / 100 points (Dishwasher, Line Cook, Sous Chef, Head Chef, Master Chef). Shown on the title screen under the logo and on the Gallery header next to "Collection 68%".
  - Replace the Gallery "Collection %" with two numbers: Collection (items) and Mastery (pips).
- **Example moment:** After a Hot Dumpling match, the results screen says: "Pinned: Crumb Muncher 100/100 SILVER UNLOCKED! (+1 rank point) ... Win matches 14/50 (3 left to Silver 6/10 pip)". I tap Records, see Bottomless Belly 740/1,000 at the top because it sorts by closeness, and I choose Crumb Rush for the next match on purpose.
- **Rewards / progression hooks:** rank titles, banners, Gold-tier cosmetics. Gives achievers a multi-month ladder (Gold tiers of 200 wins and 5,000 crumbs are many hours at about 1 min/match) and lets lighter players stop at Bronze.
- **Risks and edge cases:** pure-grind Gold tiers could encourage botted farming; cap counters that count in autoplay-like conditions (only count matches with at least 2 human or a rival at Normal+). Save migration: existing 34 booleans map to Bronze. Phone layout needs a one-column row with pips under the name. Local-device stats are shared by everyone on the device (the Records page says so), so Trophy Room should be per-profile or per-device with a clear label.
- **Size:** M (Records screen, achievement definitions, save format, title banner, results screen). No new gameplay.
- **Score impact for me:** +1.2, because it gives the long ladder and the visible progress I most missed, and costs no new gameplay.

### Proposal 2: Weekly Order Tickets (rotating objective cards that ask for different play, not more play)
- **Problem it solves:** Nearly all current achievements fall out of ordinary play or autoplay. While grinding with /autoplay I got 5/34 in 5 matches without making any decisions. There are only 3 repeatable things (Daily win, Gauntlet waves, Spicy) and the Daily is a single match: when I won it, the screen said "DAILY CHALLENGE COMPLETE!" and then nothing more to do until tomorrow. I want reasons to play specific styles.
- **How it would work (detailed design):**
  - New "ORDERS" button on the title screen (next to Daily) and a badge showing unclaimed orders.
  - Each Monday a ticket of 5 orders appears (rolled from a pool of about 60), plus a Weekend special. Orders have a difficulty tier: 2 Easy, 2 Medium, 1 Hard. Examples: Easy "Eat 60 crumbs in Crumb Rush"; Medium "Win a match without throwing any cutlery", "Go KAIJU and knock out 2 rivals before it ends", "Win a Golden Spoon round while holding the spoon for 10 s straight"; Hard "Clear a Gauntlet wave 4 on one life", "Win a Free Play match at Hard with the twist ON".
  - Each order has a progress bar, is claimed from the Orders screen, and gives Chef Tokens (Easy 1, Medium 2, Hard 4). Finishing all 5 gives a bonus of 5 tokens and a weekly stamp.
  - Tokens spend at a small Pantry shop on rotating cosmetic colours/hats (not stat items), so the rewards are cosmetic only. 12 stamps = a Gold Fork trophy shown in the Trophy Room (links to Proposal 1).
  - Orders are completed in any mode (including Story, Free Play, Party) so the player picks the path. Autoplay (bot in my seat) must not count, so the grind is real play.
- **Example moment:** Monday I open Orders: "Win a match without throwing any cutlery (2 tokens)". I pick Gobzilla, play Free Play, shove everyone off, win, and a banner shows "ORDER COMPLETE: No-Throw Chef". Then I notice "Gauntlet wave 4 on one life" and plan around the Extra Life perk, choosing perks differently from my autopilot choices.
- **Rewards / progression hooks:** weekly return reason; tokens buy items so there is a sink; stamps feed the Trophy Room.
- **Risks and edge cases:** pool needs tracking hooks for about 20 event types (KOs, spoon-hold, no-throw, dazed hits). Orders that are impossible with the chosen setup (e.g. "win Crumb Rush" with 1 human and no bots) need to be re-rolled; offer 1 free re-roll per week. Offline devices: date uses the device clock (Daily already does). Family devices: per-profile.
- **Size:** L (event bus for new stats, Orders screen, pool data, token wallet, shop screen).
- **Score impact for me:** +1.0, because it makes the achievements deeper than "do the thing 50 times" and gives me a weekly reason to open the game.

### Proposal 3: Mastery tracks per kaiju (a Kaiju Mastery page in the Gallery)
- **Problem it solves:** Achievements like Mix It Up (win with 8 different kaiju) hint at per-kaiju goals, but the Gallery per-kaiju panel only shows "Matches: 0 - Wins: 0". With 20 kaiju, each with a unique KAIJU power I rarely saw used (I saw Seed Spray fire once), there is no goal that asks me to learn them.
- **How it would work (detailed design):**
  - In the Gallery detail panel (the pink-bordered box), add a Mastery strip under the stats: 5 levels per kaiju (Level 1-5) filled by XP from matches with that kaiju (win 10 XP, KO 1 XP, KAIJU power hit 2 XP; Level thresholds 20 / 60 / 120 / 200 / 300 XP, about 5-8 matches per early level).
  - Each level has one mini-challenge unique to the kaiju's power, shown as 3 small chips: e.g. Gobzilla "Seed Spray 3 rivals into the void in one match", Squidgeon "Win a round while someone is inked". Completing a chip is a star (max 15 per kaiju, 300 across the cast).
  - Rewards: Level 3 = kaiju-specific colour (a signature recolour, separate from the 15 global colours); Level 5 = a gold name plate and a victory taunt. Cast-wide: 10 kaiju at Level 3 = global achievement "Menagerie".
  - Gallery grid shows a small level pip under each portrait, so the whole collection state is visible at a glance, in the same screen where Gallery progress already shows "16/20".
- **Example moment:** I open the Gallery, see Bluebeary at Level 1 with an empty chip "Berry Mines: knock 2 rivals out with mines in one round". I pick Bluebeary in Free Play, plant mines at the edge, win the round, and the chip fills with a +2 XP toast. This gets me using Berry Mines instead of letting the bot do it.
- **Rewards / progression hooks:** 20 kaiju x 5 levels gives a long tail; signature colours give each kaiju its own reason to be picked after the main roster is unlocked; plays into the Fighter profile too.
- **Risks and edge cases:** 20 unique chip sets is a lot of authoring (60 chips); start with generic chips (KOs, KAIJU time, wins) and add power-specific ones for the first 6. Balance: stronger kaiju will level faster, so use XP per match not per win. Bots in my seat via autoplay must not grant XP.
- **Size:** L (Gallery UI, per-kaiju save data, chip tracking, colour art for 20 signature recolours).
- **Score impact for me:** +0.8, because it creates 300 stars of goal depth with tangible variety, but is the most content-heavy of the three.

## How the new features from this round felt
- **STOMP coach:** I saw "FIRST BITE! STOMP READY!" in match 1, which is clear, but I was knocked out the next second, so I could not judge the bounce prompt in context. For achievers who need "Go KAIJU 10 times", it is useful. The bigger version would be a Records line that counts KAIJU uses after the coach fades.
- **KAIJU counterplay (ring / dizzy):** Screenshot 7 (Story ch1 round 2) showed overlapping stomp rings from two KAIJU at once, which were readable. I did not get to check the 0.75 s dizzy. Hard to judge from autoplay.
- **Gallery progress:** The best new thing for me. "Lava: Size Matters: Go KAIJU 10 times (0/10)" and "0/4 cleared" are exactly what I need. Bigger version: show the same counters inside Records on every achievement row (it only shows them for locked colours in the Gallery, so I had to click each lock). 3 new early colours (Lemon, Sky, Lava) are good: Lava needs only KAIJU x10 and arrived on its own after about 8 matches (39 KAIJU uses by 20 matches).
- **Gauntlet lives:** Worked, and the "Next: wave N - heart count" line is clear. Waves are one round each and are about 1 min, so reaching 5 waves took about 8 min in total with auto:hard. The perks (Extra Life, Sugar Rush, Mustard Coat, Full Belly) are a good start but wave 6 felt like wave 3; no boss or modifier waves. The Gauntlet-Runner colour is a fair payoff, but Gauntlet Master (10 waves) gives no colour.
- **Party / Golden Spoon:** The HUD (spoon timer 0/15s, "BLOBLIN HAS THE GOLDEN SPOON", "BACK IN 2") is clear, but I lost both autoplayed Golden Spoon matches, so "Spoon Fed" (Lemon) stays locked: the achievement requires winning a mode where my bot lost to Normal bots, which is a real gate. CUP LENGTH is clear (6 GAMES), but "Cup Champion" achievement has no hint of the 3-game version counting. Clicking MODE cycles through a long list; I landed on Hot Dumpling by accident.

## Bugs that block play
- None that block play. /errors was "none" at the start, middle and end.
- Observation (not blocking): the Gauntlet HUD hearts looked inconsistent with the perk screen: the Wave 1 retry showed "Next: wave 2 - 2 hearts", then the Extra Life perk brought it back to 3. It seems correct, but the wave number plus hearts line at "[1264,11] GAUNTLET hearts WAVE 2" was easy to misread. Screenshot: art-src/.playtest/r5-7101/shot-10.png.

## Small notes (max 5, one line each)
- Records achievement rows show no progress numbers; only the "Next up" row and Gallery lock tooltips do.
- "World Tour: Play on 12 different tables" was already beaten by "Tables visited 18/18" after about 20 matches; bump it to all 18.
- /autoplay is about 50 s per match; a "skip ahead" or 2x speed bot mode would make grind testing practical.
- Mid-match Pause menu has no "Records" or "Quit to Records" shortcut; Quit goes to Title and loses the Gauntlet run silently.
- Title NEXT UP banner shows the 90%-style number only for some goals ("Ocean colour (90%)"), not for Story chapter targets.
