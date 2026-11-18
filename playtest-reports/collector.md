# Playtest evaluation — The Collector

**Fun score: 6.5 / 10** (the Gallery is lovely and the "NEXT UP" line is great, but the collection is front-loaded, small, and finished fast; almost nothing is left to chase after the first few hours.)

> Fresh save. About 45 harness commands. Screenshots in `art-src/.playtest/r5-7105/` (shot-2 Gallery, shot-4 Story Rewards modal, shot-13 Records).

## What I did
- Started on a fresh save: Gallery showed **Collection 62%, 16/20 kaiju, 15/18 tables, 2/15 colours** before I had played a single match.
- Clicked every locked kaiju slot (4) and every locked colour (12) to read the unlock text and progress. Opened the Story REWARDS modal (shot-4).
- Played 8 matches in about 15 minutes (5 won): Free Play via /autoplay, one manual match (stomp coach seen), Story ch1 lost then cleared (3 stars).
- After 8 matches: Collection 68%, colours 5/15, 6/34 achievements, 16/18 tables visited, 14 times KAIJU, "Lava" unlocked as the progress hint said.
- Checked /errors at start, middle and end: none.

## What worked for me (briefly)
- The title screen "NEXT UP" chain ("Clear Story ch 4 -> Minturtle -> Lime colour") is a very good collector hook. It told me what to do next, and the percentages ticked up (Lava 40% -> 80%) between visits.
- Locked kaiju silhouettes plus a concrete requirement ("Collect 30 Story stars (you have 3/30)") and the Story Rewards modal make goals clear. I never had to guess how to unlock something.
- Colour unlock text names the achievement and its progress ("Ocean: Regular Diner: Win 10 matches (0/10)"). The Records page shows progress bars. Easy early colours (Lemon/Sky/Lava) land within the first session.
- Kaiju art in the Gallery is strong and the dual normal/KAIJU preview is a nice reward.

## The single biggest structural problem
**The collection is tiny, front-loaded and flat, so there is no long chase.** I opened the Gallery on a brand new save and it already said 62% complete: 16 of 20 kaiju and 15 of 18 tables were handed over for free. The whole remaining kaiju list is 4 silhouettes behind three story gates (ch4, ch8, ch12) plus a 30-star gate, and 3 tables. The 15 colours are one shared palette applied to every kaiju (the text says "works on every kaiju"), so a colour is worth one unlock, not one per kaiju. After 8 matches I was at 68%. A dedicated collector will see the end of every progress bar in a handful of sessions, mostly just by clearing Story, and then Gallery has nothing to do.

It also hurts the feeling of earning. Because most kaiju are free, I never felt a kaiju unlock as a prize. The four I could see locked are all "play Story" rewards, so Free Play, Party and Gauntlet players have no kaiju or table goals at all (only colours). Nothing in the collection tracks mastery of a kaiju, and there is no collection that reacts to how I play. For my profile the game needs layers beneath the unlocks: per-kaiju things to earn, rare things, and a reason to keep filling the Gallery for 20+ hours.

## Big change proposals (2–3, most important first)

### Proposal 1: Per-kaiju Mastery and Costume Slots (a second collection layer)
- **Problem it solves:** The Gallery hit 68% after 8 matches and colours are one global palette. Players with 16 of 20 kaiju free have nothing to earn per kaiju. Favourite kaiju on Records was just a label ("GOBZILLA JR.") with no reward.
- **How it would work (detailed design):**
  - Every kaiju gets a **Mastery track** with 10 levels, shown on that kaiju's Gallery card as a row of 10 pips plus "MASTERY 3/10". Mastery XP comes only from matches played as that kaiju: 20 XP per match played, +30 per win, +10 per KAIJU stomp, +5 per KO, +50 for a Story chapter clear. Level thresholds: 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000 XP (about 45 matches to max one kaiju; a casual session of 8 matches is about 1 level).
  - Each level pays out a cosmetic in that kaiju's detail panel: L2 nameplate title, L3 **kaiju-only colour** ("Gobzilla: Wasabi"), L4 victory pose, L5 trail effect for the KAIJU stomp ring, L6 unique hat (reuses the existing bow/chef-hat art), L7 second kaiju-only colour, L8 alternate KAIJU-mode glow, L9 gold nameplate, L10 "Gilded" full retexture of the kaiju (gold outline plus sparkle). That is about 6 unique cosmetics per kaiju: 20 kaiju x 6 = 120 new things to collect, while the 15 shared colours stay as they are.
  - Gallery screen changes: the kaiju grid gets a small mastery ring on each tile (empty/bronze/silver/gold). The collection header becomes "Collection 41% (kaiju 16/20, tables 15/18, colours 5/15, mastery 12/200)". The detail panel gets a MASTERY tab beside the existing preview, showing the 10 rewards as a row with locked ones greyed and the next one pulsing.
  - Hook into the existing `NEXT UP` line: it should pick whichever goal is closest, e.g. "NEXT UP: Gobzilla Jr. Mastery 3 (80 XP) -> Wasabi colour".
- **Example moment:** I play Gobzilla Jr. in Free Play, win, and the results screen shows "+50 Mastery XP, Gobzilla Jr. 3/10, 22 XP to level 4: Victory Pose". I notice the Gallery tile ring is bronze and swap to Pizzaraptor, whose ring is empty, to start another one. A single night gives 2-3 level ups spread across different kaiju.
- **Rewards / progression hooks:** 120 cosmetics, plus profile badges "Mastered 5 kaiju" (feeds Records/achievements). Ties every mode (Free Play, Party, Gauntlet, Story) into the Gallery, which today only Story feeds for kaiju.
- **Risks and edge cases:** Autoplay bots in /autoplay would farm it, so count only human-controlled seats and cap at 600 XP/day per kaiju (resets daily) to avoid grinding a single kaiju in one sitting. Shared-device households: store mastery per profile. Online: award at match end locally only (no server). Pay-to-win concerns are none since rewards are cosmetic. Art cost is the main risk (120 items); mitigate with recolours, hats and effects reusing existing sprites.
- **Size:** L (new save data, results-screen panel, Gallery UI tab, ~120 mostly reusable cosmetics, hook into player render for hats/trails).
- **Score impact for me:** +1.2. This is the single thing that turns a 3-hour collection into a 20-hour one.

### Proposal 2: Gate the kaiju and tables behind earnable milestones in every mode (a "Collection Book" with seasons)
- **Problem it solves:** 16/20 kaiju and 15/18 tables are free, and the 4 locked kaiju are all Story-only (Gallery text: ch4, ch8, ch12, 30 stars). Free Play, Party and Gauntlet fans get no kaiju/table goals. The 3 locked tables are Story-only too (Story Rewards modal: Freezer Shelf ch6, Candy Shop ch10, Chef's Nightmare ch12). Also I got no unlock celebration after wins: Lime unlocked quietly.
- **How it would work (detailed design):**
  - Start the roster smaller: **6 kaiju and 6 tables free** (Gobzilla, Squidgeon, Crabbage, Blobin, Mothball, Toastbat; 6 classic tables). Put the other 14 kaiju and 12 tables on a **Collection Book** screen, reachable from the Gallery and the title screen, laid out as a 6x5 page grid of "stickers". Each sticker has one task from a different mode so every playstyle contributes: e.g. Dumplord: "Win a Hot Dumpling match", Norigon: "Clear 5 Gauntlet waves", Chocomunch: "Win a Team Feast match", Bubblegumbo: "Win a Golden Spoon match", Bluebeary: "Score 25 knockouts", Sloba: "Win while never leaving your corner (a Crumb Rush win)", plus the existing Story gates for the last 4.
  - A task shows progress bars (like Records already does) and an "unlocked" fanfare overlay that shows the new kaiju with a "TRY NOW" button that jumps into Free Play with them selected.
  - **Weekly Book Page:** each week one extra page of 3 rotating challenge stickers (e.g. "Win with 3 different kaiju", "Go KAIJU 5 times in Party") that award a gold-framed sticker (a Gallery frame style) so returning players always have 3 new things.
  - Existing saves keep everything they already own (grandfathering).
- **Example moment:** I open the Collection Book, see Dumplord is locked, tap it and read "Win a Hot Dumpling match (0/1)". I jump into Party, Hot Dumpling, win, and the fanfare shows Dumplord's reveal. I hit TRY NOW and play him immediately.
- **Rewards / progression hooks:** Gallery % becomes meaningful: the first minute shows about 20% rather than 62%. The weekly page is a reason to come back each week.
- **Risks and edge cases:** A smaller free roster hurts the first-time group party (4-6 players want variety), so keep at least 6 kaiju free and let local guests use any kaiju the host has unlocked. Tasks from Online play must be skippable by offline families (put Online tasks only on weekly bonus pages). Telemetry: ensure no task takes more than about 3 matches.
- **Size:** M-L (Gallery/Records plumbing exists; new screen, ~30 task definitions, reveal overlay).
- **Score impact for me:** +0.8. Makes unlocks feel earned, and brings every mode into the Gallery.

### Proposal 3: Rare Drops and a Pantry Gacha-free Collection ("Leftovers" lootbox of finds)
- **Problem it solves:** Everything in the collection is deterministic and deterministic goals run out. I saw no surprise, nothing rare, nothing to show off beyond the percentage number.
- **How it would work (detailed design):**
  - After every match, a **Leftovers roll**: one item from a pool of cosmetic **crumb charms** (small icons that sit next to the player name: a pickle, a tiny fork, a gold crumb) shown on the results screen as a "You found: Pickle Charm (common)" card. Drop rates: 80% common, 15% rare, 4% epic, 1% legendary, with a pity counter (a rare guaranteed at least every 10 matches, an epic every 40). 30 charms total (16 common, 8 rare, 4 epic, 2 legendary), no duplicates in the first 20, then duplicates convert to "crumbs" (spend 50 to buy any charm you lack).
  - Charms appear on the Gallery under a CHARMS tab with a rarity-sorted grid and "found 12/30". Seasonal charms (e.g. a Halloween pumpkin) appear on set dates and are never obtainable otherwise, giving a collector reason to return.
  - Earn via any mode and any human seat; no real-money, no timers.
- **Example moment:** I finish a Crumb Rush match, the results panel flips a card face-down; it turns over to a sparkling "Golden Crumb (LEGENDARY)". The next time I enter the Gallery the CHARMS tab shows "13/30".
- **Rewards / progression hooks:** Rarity chase, completionist set bonuses (all commons = colour "Pantry"), show-off on the nameplate in Party/Online.
- **Risks and edge cases:** Randomness can feel bad, so use the pity system and the crumb-currency for duplicates. Must not appear gambling-like for the kid audience: no paid currency, no real money, keep copy friendly. Online: charms are cosmetic only and sync locally.
- **Size:** M (results panel, 30 icons, nameplate render, save).
- **Score impact for me:** +0.5. Adds variance and a long tail, but only works if Proposal 1 or 2 also exist.

## How the new features from this round felt
- **STOMP coach:** I saw "BELLY FULL! PRESS STOMP -> KAIJU" over my kaiju in Story ch1 (shot-6). It works, but in the screenshot it overlaps the "STOMP READY!" floating text so both are half-readable. It mentions "STOMP" (not the E key from the brief). Fine for a newbie, irrelevant for my profile.
- **KAIJU counterplay (ring, shrink warning, dizzy):** the harness could not show me the timing visuals, so I can't judge them in depth. I did not feel more or less in danger via /act events.
- **Gallery progress:** This is the feature closest to my profile and it is good. "you have 3/30 stars" and "0/4 cleared" are exactly what I needed, and colours show the achievement and progress. The weakness is that the progress is shown only on hover/click, with no summary view of "closest to unlocking". See Proposals 1 and 2 for the bigger version. The 3 early colours (Lemon, Sky, Lava) are not early at all: Lemon needs a Golden Spoon win, Sky a Hot Dumpling win, Lava 10 KAIJUs (this one was quick, about 14 stomps in 8 matches).
- **Gauntlet lives, Party Golden Spoon, CUP LENGTH:** not touched (not my profile). I only note that the Spoon/Dumpling/Team colours push collectors into Party Modes, which needs a group of 2+; a solo collector has no way to get Bubblegum, Sky or Lemon without bots. Check that those wins count with bots (I did not verify).

## Bugs that block play
- None blocking. `/errors` returned none at start, middle and end.
- Not blocking but odd: after /autoplay in Story, the seat's kaiju was random (e.g. HotChog, Avocadrake) rather than the one I picked on the Story map, and one Story "play" start silently ran a Free Play match instead (the result screen said "AVOCADRAKE RULES THE TABLE"). That could be harness-only, but it meant my Story chapter clears were less predictable.

## Small notes (max 5, one line each)
- Unlock moments are silent: Lime/Grape/Lava appeared in the Gallery with no toast on the results screen that I could see; add an "UNLOCKED!" card.
- Gallery shows "Collection 62%" on a fresh save; it feels like cheating the number, consider excluding free starters.
- Colour grid shows 15 padlocks with no label until clicked; add the progress to a hover/long tile caption.
- "STOMP READY!" and "BELLY FULL! PRESS STOMP" overlap above the kaiju (shot-6).
- Records "Tables visited 16/18" counts tables I could not have visited? (2 locked), so the denominator should be the unlocked count or the text should say why.
