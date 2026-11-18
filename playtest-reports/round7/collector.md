# Playtest evaluation — The Collector

**Fun score: 7.5 / 10** (unlocks are charming and arrive fast, but the collection is over-quick, the end of the chase has no sink or goal, and the remaining 7 colours and the last kaiju are hidden behind unclear or off-profile requirements.)

> This round the bar is **9/10 from EVERY profile**. Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7105\` (shot-N.png).

## What I did
- About 115 harness commands, roughly 35 minutes of game time (most of it autoplay on `hard`).
- Screens visited: Title, Records (pages 1, 2, 3), Gallery (many times, incl. locked-kaiju and locked-colour detail, colour wearing), Move Lab (Squidgeon, Gobzilla), Pantry (x4 visits, bought all 7 colours/perks), Story map (Grand Feast and Second Helpings), Story Rewards popup, chapter-clear cards, New Kaiju / New Table celebrations, ending cutscene, Free Play setup, pause menu.
- Matches: about 26 played (Story ch 1-12 of Grand Feast, 3 chapters of Second Helpings, about 8 Free Play), roughly 17 won. Chapters 3, 5, 10, 12 needed 2-3 attempts at `hard` autoplay.
- Progress at the end: kaiju **19/20**, tables **18/18**, colours **13/21**, achievements **14/34**, Chef Rank **Head Chef** (36/52 to Executive), Gobzilla Mastery **Lv 6 Legend MAX** (22 matches), 670 tokens unspent with everything in the Pantry owned.
- Collection time: **every table and 19 of 20 kaiju in about 35 minutes**. The 20th kaiju (Tacowl) was stuck at 29/30 Story stars; I could not get the last star in 6 replays.
- `/errors` checked at start, middle, end: **none** (clean).

## What worked for me
- The reveal moments are great: **NEW KAIJU!** (Pengwhip, shot-39) and **NEW TABLE!** (Freezer Shelf, shot-37) are full-screen celebrations with name and power, plus "Playable now in Free Play, Party Modes and Online".
- Gallery silhouettes plus "Unlock: Beat Story chapter 4: Boss of the Belt (0/4 cleared)" give every locked kaiju a clear, honest goal (shot-5). Story Rewards popup (shot-14) lists all 7 rewards with progress.
- Colour swatches preview live on the big kaiju art and the line "Mango (wearing) · works on every kaiju" is clear (shot-27).
- Pantry colours are cheap (40 / 70 / 120 / 180 / 240) and I owned several by match 6. The 30%-off deal is visible (shot-24, shot-34).
- Each achievement tells you its colour reward right on the row (Records shot-2/3). Pinning with a click works and shows a 📌 (shot-36), and the title "NEXT UP" repeats the pin.
- Receipts list new achievements and colours ("🏆 Size Matters +30 🪙 · 🎨 Lava colour!", shot-25).
- Mastery levels pop quickly with token payouts (Lv 2 = +89, Lv 3 = +123 tokens).

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the collection a long-tail chase, not a 35-minute checklist.**
   - **what**: add a second tier to every collectible so "done" is not reachable in one evening.
   - **where**: Gallery + Records + Pantry.
   - **how**: add per-kaiju "Golden / Shiny" variants unlocked by Mastery Lv 6 + one specific feat (e.g. 10 KOs with its KAIJU power); add 6 more tables (seasonal / from Trials stars); add a "Complete the set" Gallery page (Collection % must be able to exceed the current cap). Target 8-10 hours for 100 percent.
   - **score impact**: +0.7
2. **Give tokens a sink after the Pantry is bought out.**
   - **what**: I ended with 1,445 tokens, bought all 8 items, and still held 670 with nothing to spend them on.
   - **where**: Pantry.
   - **how**: add a rotating "Specials" shelf (4 items, refresh daily): per-kaiju outfit tints, name-plate frames, victory poses, table cloth patterns. Price 150-600. Tokens should stay worth earning at match 100.
   - **score impact**: +0.5
3. **Fix the Story-star unlock for the 20th kaiju (and say what counts).**
   - **what**: "Collect 30 Story stars (you have 29/30)" is ambiguous; Second Helpings stars did not count (Records "Story stars" and the unlock stayed 29 after earning ★ in Second Helpings ch1-3).
   - **where**: Gallery locked card, Story Rewards, Story header.
   - **how**: either count both campaigns or write "30 Grand Feast stars (36 available)" everywhere. Show **which chapters are below 3 stars** in the header ("Best: ★★☆ — 7 chapters not at ★★★"). Add a "★ finder" button that jumps to the nearest chapter with missing stars. Also lower-friction stars: a 3-star replay at `hard` bot was luck-based for me (0 of 6 tries).
   - **score impact**: +0.4
4. **Show the 7 remaining colour goals as one list, with progress, in the Gallery.**
   - **what**: 8 locked colour swatches are just 🔒. Hover/click shows one hint at 10px at the far right ("🔒 Ocean: "Regular Diner": Win 10 matches (3/10)").
   - **where**: Gallery "YOUR COLOUR" row.
   - **how**: under the row show the colour name under each swatch (small text), grey a locked swatch with the silhouette tint of the colour instead of a padlock, and make clicking a locked swatch open a bigger card with progress bar and a "PIN IT" button. Put 13/21 next to "YOUR COLOUR".
   - **score impact**: +0.4
5. **Let me see my collection by kaiju (a per-kaiju page with all 6 mastery perks).**
   - **what**: Gallery shows "Mastery ★★★★★★ Lv 6 Legend MAX" but not which perks (dash sparkles, HUD star, gold name, gold frame, crown aura) I own or what the next one does for lower levels beyond one "next:" line; at MAX nothing is listed.
   - **where**: Gallery detail panel.
   - **how**: row of 5 perk icons, lit when earned, tooltip text. Add a "Collection shelf" screen of kaiju trophies by Mastery level.
   - **score impact**: +0.4
6. **Choose my kaiju in Free Play/Story and keep it (and the colour) between matches.**
   - **what**: after `/autoplay`, Free Play assigned me a different kaiju almost every match (Avocadrake, Pizzaraptor, Squidgeon, Norigon...). A collector wants to level one favourite, so this cost me mastery XP (Gobzilla 39 XP after 1 win; rest spread thin).
   - **where**: Free Play setup seat 1.
   - **how**: persist "last used kaiju + colour" and show a star by the seat; button "RANDOM SEAT" only if tapped.
   - **score impact**: +0.3
7. **Make the Pantry daily deal stable and useful for collectors.**
   - **what**: the 30%-off tag moved between Lifeline, Silverware, Lifeline between visits on the same day (shot-11, shot-24, shot-34) and on a colour only once. Also the price I paid for a colour did not match the displayed price (I paid 126 for Blueberry because the deal had silently moved to it; the card showed 180 when I clicked).
   - **where**: Pantry.
   - **how**: seed the deal from the date only, show a countdown ("ends in 6h"), and prefer an unowned **colour** so a collector benefits. A purchase must never change which item is on sale.
   - **score impact**: +0.3
8. **Fix the clipped receipt on the unlock card.**
   - **what**: on the chapter-clear card with an UNLOCKED block, the tokens/Mastery line is cut off behind the NEXT / REPLAY / MAP buttons (shot-33).
   - **where**: Story chapter-clear card (ch 4, 8, 12, 6, 10).
   - **how**: grow the card height when a reward block is present, or move the receipt above the reward.
   - **score impact**: +0.2
9. **Explain the token windfalls.**
   - **what**: tokens jumped from 0 to 25 after my first Move Lab visit with no message; chapter 1 paid +20 (70 total), etc. I could not tell what paid me.
   - **where**: Receipts and Records "Chef Tokens".
   - **how**: always itemise "+20 first win, +30 achievement, +40 weekly order, +75 mastery up" in the receipt, including Move Lab and weekly-order claims (I completed all 3 weekly orders, 40 each, with no on-screen payout notice).
   - **score impact**: +0.2
10. **Add a "Collection" hub on the title (or at the top of the Gallery) with the single next goal.**
    - **what**: the title NEXT UP is a stack of 4 small lines over the artwork and mixes a first-hour checklist with a pin and unlocks.
    - **where**: Title.
    - **how**: a clear "COLLECTION 85%" chip that opens the Gallery, shows the nearest unlock with a progress bar, and lets me pin it.
    - **score impact**: +0.2

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Chapter-clear card with UNLOCK (kaiju/table) | The "+20 Chef Tokens … Mastery Lv …" receipt line is clipped by the NEXT / REPLAY / MAP buttons; "Chapter N unlocked!" line is hidden | `shot-33.png` | Make card taller or shift receipt above |
| 2 | major | Pantry | The "TODAY 30% OFF" tag jumps between Lifeline, Silverware and Lifeline within one day; a purchase silently moves the deal, and I was charged a different price (126 vs 180) than shown | `shot-11.png`, `shot-24.png`, `shot-34.png` | Deterministic daily deal, announce changes |
| 3 | major | Gallery / Story Rewards | "Collect 30 Story stars (you have 29/30)" does not say it only counts Grand Feast; Second Helpings ★ did not count. Last star unobtainable after 6 retries at hard autoplay | `shot-49.png` | Clarify, show missing-star chapters, count both |
| 4 | major | Whole-game pacing | 19/20 kaiju, 18/18 tables, 13/21 colours, Lv 6 MAX Gobzilla in about 35 minutes of play; collection feels over before it starts | `shot-44.png` | Add second tier of collectibles |
| 5 | major | Pantry | After buying all 8 items I still held 670 tokens (1,445 at peak); no sink | `shot-54.png` | Rotating specials shelf, outfits, poses |
| 6 | minor | Match result (Free Play) | New "🍽 FIRST SERVICE … ✓ +20 🪙" toast is covered by the giant "BUBBLEGUMBO RULES THE TABLE" title, so you only see "FIRST S… ✓ +20" | `shot-20.png` | Delay the toast or place it under the title |
| 7 | minor | Gallery | Locked colour swatches are only padlocks; the unlock hint is tiny text at the far right (x=1036, about 10px) and wraps in 2 lines | `shot-6.png` | Name under swatch, bigger hint card |
| 8 | minor | Gallery | After clicking a colour swatch, the kaiju detail panel disappears until a kaiju is clicked again (shot with only MOVE LAB visible) | `shot-26.png` | Keep the selected kaiju panel |
| 9 | minor | Gallery | "Collection 56% 🐉 16/20 · 🍽 15/18 · 🎨 2/21" is crammed in the top-right corner at about 11px, close to the screen edge, hard to read | `shot-4.png` | Larger, bar graphic, left of BACK or under the title |
| 10 | minor | Gallery | Mastery line at MAX ("★★★★★★ Lv 6 Legend MAX") shows no list of perks earned, and below MAX only one "next:" perk | `shot-44.png` | 5 perk icons lit/unlit |
| 11 | minor | Gallery / Free Play | Locked kaiju silhouettes reveal the whole creature (turtle, penguin, kangaroo, owl) so there is no mystery, but the name is "???" | `shot-5.png` | Either true silhouette without detail or reveal names |
| 12 | minor | Free Play | My seat kaiju is re-rolled to a random one each match (Avocadrake, Pizzaraptor, Squidgeon, Norigon…); mastery spread thin; colour is global so it does not matter, but identity does | `shot-21.png` | Remember last choice |
| 13 | minor | Pantry | Weekly orders all showed ✓ 20/20, 5/5, 8/8 but there is no "+40 🪙 claimed" message; I could not tell if or when I was paid | `shot-34.png` | Payout toast / claim button |
| 14 | minor | Receipt / tokens | Chef Tokens went 0 → 25 after the first Move Lab (no explanation); Records showed 0 before that and 25 after | `shot-11.png` | Itemise every payout |
| 15 | minor | Pantry | Only 6 colours are sold while the Gallery has 21 slots; 8 colours need achievements the Collector cannot target quickly (Team Feast, Hot Dumpling, Golden Spoon, Gauntlet, Spicy, Daily x3) | `shot-3.png` | Show the "other" colours with their goal |
| 16 | minor | Records | "Tables visited 0/18" vs. achievement "World Tour: Play on 12 different tables 0/12": different numbers for the same idea; at the start there are only 15 tables visible | `shot-2.png` | Align labels or hide locked tables from the count |
| 17 | minor | Story chapter 3 clear card | Mothball says "the boss of the Sushi Bar eats newcomers" but the next chapter is "Boss of the Belt" (table named Sushi Bar in ch4 screen) | `shot-32.png` | Use consistent names |
| 18 | minor | Title | "NEXT UP" is 4 stacked lines of about 12px text drawn over the character art (the last line crosses the elephant's trunk), low contrast and easy to miss | `shot-53.png` | Put on a dark pill with a progress bar |
| 19 | minor | Title | STORY card text "Ch 12/12 · 🍽 Seconds open!" wraps to two lines and nearly touches the card edge | `shot-53.png` | Shorten to "Ch 12/12 · Seconds open" |
| 20 | minor | Title | FIRST SERVICE stayed at 4/6 with "Finish the 1-minute Practice (+20 🪙)" as the first item after I had used Move Lab practice for two sessions; unclear what counts | `shot-53.png` | Say which step is done and what is missing |
| 21 | polish | Story map | "SCENE" button hangs on the border of the chapter panel (right edge x=1248 vs panel edge 1250) and sits right next to "Not cleared yet" text | `shot-13.png` | Pad inside panel |
| 22 | polish | Story map | Locked chapter tiles show a padlock with no hint of what unlocks them (just 🔒 and name) | `shot-13.png` | Tooltip: "Clear chapter 3" |
| 23 | polish | Story dialogue | Typewriter text can be read cut ("…and the legendary GOLDE") if you take a screenshot mid-type; needs a tap to complete | `shot-17.png` | Fine, but show full text when paused |
| 24 | polish | Ending cutscene | Caption "The Golden Spoo" is still typing when the first screenshot is taken; the "SKIP" button stays visible (ok) | `shot-40.png` | None, only note |
| 25 | polish | Chapter clear card | Stars row: the first star is drawn larger than the other two (animation frame) which looks like a sizing bug in a still | `shot-33.png` | Finish animation before input |
| 26 | polish | New-table celebration | The table preview is a flat pale-blue rectangle, not the table art, so the reward feels cheap | `shot-37.png` | Show the real table thumbnail |
| 27 | polish | Match result | Faded "DIZZY! HIT IT NOW!" in-world text still floats behind the result panel at the top-left | `shot-25.png` | Clear world text at match end |
| 28 | polish | Pantry | Lifeline card text wraps to 3 lines ("(not enough yet)" on its own line) and touches the card edge when the deal tag is shown | `shot-11.png` | Shorter label / put deal tag above |
| 29 | polish | Records | Shows 3 pages of achievements via a PAGE ▶ button, but no page count ("1/3") | `shot-2.png` | Page indicator |
| 30 | polish | Pantry | "Colours you buy appear in the 📖 KAIJU Gallery." footer is about 10px, very faint | `shot-11.png` | Larger, brighter |
| 31 | polish | Gallery | Move Lab button label "try its power" is about 9px | `shot-4.png` | Slightly bigger |
| 32 | polish | Gallery | I cannot buy colours or see prices from the Gallery; I had to go back to the title and open Pantry | `shot-6.png` | "Buy in Pantry" link on locked store colours |
| 33 | polish | Pause menu | Clicks aimed at other screens toggled "SOUND: OFF" in a paused story match without any feedback (my fault, but the pause buttons are large and easy to hit) | n/a | Fine, just note |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | Mostly OK. NEXT UP text is small and overlays the artwork (issue 18), Story card text tight (issue 19) | `shot-1.png`, `shot-53.png` |
| Records page 1 | OK: no overlap, nothing cut off. "Prep Cook at 6 pts (0)" is close to its row edge but fits | `shot-2.png` |
| Records page 2 | OK | `shot-3.png` |
| Records after unlocks (pin shown) | OK | `shot-36.png` |
| Gallery (kaiju selected) | OK but top-right Collection line is tiny and tight to the edge (issue 9); colour hint is small (issue 7) | `shot-4.png`, `shot-27.png` |
| Gallery locked kaiju | OK | `shot-5.png` |
| Gallery locked colour | OK, but hint wraps and is tiny | `shot-6.png` |
| Gallery (no kaiju selected) | Detail panel missing (issue 8) | `shot-26.png` |
| Gallery with all kaiju but one | OK | `shot-44.png` |
| Move Lab (in match) | OK. Banner "MOVE LAB: …" fits inside the table width, nothing overlaps the HUD | `shot-7.png`, `shot-8.png` |
| Pantry (start) | OK; Lifeline card is tight (issue 28) | `shot-11.png` |
| Pantry (after purchases) | OK | `shot-24.png`, `shot-34.png` |
| Story map (Grand Feast) | OK; SCENE button hugs panel edge (issue 21) | `shot-13.png` |
| Story Rewards popup | OK | `shot-14.png` |
| Story dialogue box | OK; text is typewriter (issue 23) | `shot-17.png` |
| Chapter-clear card (plain) | OK | `shot-19.png`, `shot-32.png` |
| Chapter-clear card with UNLOCK | **Problem**: receipt line overlapped/clipped by buttons | `shot-33.png` |
| NEW KAIJU / NEW TABLE overlays | OK, names and powers fit; table preview is a flat rectangle | `shot-39.png`, `shot-37.png` |
| Second Helpings map | OK | `shot-45.png` |
| Ending cutscene | OK | `shot-40.png` |
| Match result (Free Play) | **Problem**: FIRST SERVICE toast hidden by the title (issue 6); leftover DIZZY text in corner (issue 27). The THIS MATCH receipt box is fine | `shot-20.png`, `shot-25.png` |
| Defeat screen | OK | `shot-28.png` |
| Free Play setup | OK; pills and seat cards fit | `shot-21.png` |
| Pause menu | OK | text list in /look only |

## The single biggest structural problem
The collection is finished long before it feels earned, and what is left is hidden. Nineteen of twenty kaiju, all 18 tables, and a max-level kaiju arrived in about 35 minutes, almost entirely from walking the Story with an autoplay bot. After that, the Collector has no sink for tokens (670 idle with every Pantry item owned), no second tier of collectibles, and the last kaiju and 8 colours depend on mode-specific achievements (Team Feast, Hot Dumpling, Spicy, Daily, Gauntlet) that the Gallery does not lay out as a plan. The Story-star condition for the final kaiju is also ambiguous and effectively luck-based at high bot level.

Fixing this means a second layer rather than slower unlocks: shiny/golden variants, seasonal tables, an outfit shop, and a Gallery page that shows every missing item with its exact requirement and a pin button. That would turn "I'm done" into "I have a list."

## Big change proposals (2-3, most important first)

### Proposal 1: Shiny Set (second tier of collecting)
- **Problem it solves:** The collection ends in about 35 minutes; nothing to chase afterwards. Mastery Lv 6 is hit in 22 matches and then means nothing.
- **How it would work (detailed design):**
  - Every kaiju gets a **Shiny** form: a distinct palette plus particle effect, shown in Gallery with a ✨ badge.
  - Unlock per kaiju requires BOTH Mastery Lv 6 AND a signature feat (e.g. Gobzilla: "10 KOs with Seed Spray"; Squidgeon: "blind 15 rivals with Ink Cloud"; shown in the Gallery panel as a checklist with progress bars).
  - A Gallery page "SHINY 3/20" with 20 slots; empty slots show the feat text.
  - Shiny forms are equippable like colours (a toggle under YOUR COLOUR), and appear in matches for everyone online.
  - Collection % becomes: kaiju 40% + tables 20% + colours 20% + shinies 20%, so 100% needs everything.
- **Example moment:** I hit Lv 6 on Gobzilla. The Gallery panel says "SHINY GOBZILLA: 4/10 KOs with Seed Spray." Two matches later a gold-edged "✨ SHINY UNLOCKED" overlay plays and the Gallery tile gets a sparkle frame.
- **Rewards / progression hooks:** +100 tokens each; a "Shiny Hunter" achievement at 5, 10, 20 (paying 30 / 60 / 150 tokens); crown aura becomes the Shiny frame for Lv 6.
- **Risks and edge cases:** feats must be trackable in bot matches and Online; must not require Story only; keep feats under about 5 matches of grind per kaiju so it stays fun. Shared colour palettes could clash with a custom colour: Shiny overrides, with a toggle.
- **Size:** L
- **Score impact for me:** +0.9

### Proposal 2: Pantry Specials and Token Sink
- **Problem it solves:** I ended with 670 tokens, all items owned; tokens stop mattering at match 20.
- **How it would work (detailed design):**
  - A second Pantry tab, "SPECIALS", refreshing daily at midnight with 4 items drawn from 24 (outfit hats, name-plate frames, victory poses, tablecloth patterns, HUD emblems), priced 150-600 tokens.
  - A "Gold Shelf" (permanent) for 800-2,000 token cosmetics (animated name effects).
  - The 30% deal is seeded by date only, always lands on an unowned item, shows "ends in 6h 12m", and never moves after a purchase.
  - Each purchase gets a toast ("Bought Chef's Hat for Gobzilla: equip in Gallery").
  - Gallery gets an "OUTFIT" row below YOUR COLOUR, showing owned items, with a link to Pantry for unowned ones.
- **Example moment:** Day 3: I open the Pantry, the Specials tab shows "Wizard Hat 200 🪙 · 30% OFF · ends in 4h". I buy it, equip it in the Gallery on Squidgeon, and see it in the next match.
- **Rewards / progression hooks:** Chef Rank adds points per cosmetic owned; a "Wardrobe" achievement at 10 / 20 items.
- **Risks and edge cases:** art cost (about 24 items); online sync of cosmetics; kid mode must hide nothing important; refunding duplicates as tokens.
- **Size:** M (art is the bulk)
- **Score impact for me:** +0.7

### Proposal 3: Collector's Ledger (every missing item in one screen)
- **Problem it solves:** I had to cross-reference Gallery, Records, Story Rewards and Pantry to know what was missing; the last kaiju's star requirement was ambiguous.
- **How it would work (detailed design):**
  - New Gallery tab "LEDGER" with 4 sections: Kaiju, Tables, Colours, Shinies.
  - Each missing item is a row: icon, name, exact requirement, progress bar, PIN button, and a "GO" button that jumps to the right screen (Story chapter, Party Mode setup, Pantry item).
  - Header shows "Next best: Tacowl — need 1 more Grand Feast ★ (Leftovers is ★★☆)", sorted by closeness.
  - Pinned items show on the title as a single line with a progress bar.
- **Example moment:** I open LEDGER; the top row is "Tacowl 29/30 ★ — GO: Leftovers (best ★★☆)". One tap jumps to the chapter.
- **Rewards / progression hooks:** completing a section pays a bonus (200 tokens, a badge); 100% unlocks a "Completionist" title.
- **Risks and edge cases:** needs a single data model for requirements, some are mode-specific (Online, Party Cup); keep copy short for kid mode.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **Progression (mastery, Chef Rank, achievements, daily deal, cheap colours, receipts):** Mastery is fun and fast (Lv 6 in 22 matches, payouts of 75-123 tokens on level-ups) but too fast; the perks are not itemised in the Gallery. Chef Rank climbs fine (Dishwasher → Head Chef), but "pts" is never explained (Records says "Prep Cook at 6 pts (0)"). Achievements paying 30 🪙 and pinning work and feel good; receipts that list achievements and colours are the best part. The daily deal is the weakest: it moves and does not target colours (see issue 2). Cheap colours are well priced.
- **🍽 First Service:** I never saw it complete; it stuck at 4/6 and its first line ("Finish the 1-minute Practice") did not seem to count my Move Lab runs. I did not play the 1-minute practice card, so I cannot judge the end card.
- **CHALLENGES / Trials / Gauntlet:** not visited (title says "🎯 Trials 0★"). As a collector, Trials and Gauntlet matter because Midnight is a Gauntlet-wave colour; I could not judge them.
- **🥋 Move Lab:** works well and fast: I could try Squidgeon's Ink Cloud in two clicks, and the banner explains the controls. The practise belly is infinite ("BELLY FULL! PRESS E / Y → KAIJU"), which is exactly right. It would be better if locked kaiju could be previewed here too (a lab for a locked kaiju would be a strong teaser).
- **⚡⚡ Double twists:** not touched (Free Play showed TWIST NONE).
- **🏆 Party Cup:** not touched. The achievements Cup Champion (Party Cup) and the Better Together colour (Team Feast) are on my 7-colour list, so the Gallery should say how to start a Cup.
- **Story (Phase 2, Kid mode):** I did not see a PHASE 2 banner (the bosses of ch4, ch8 and ch12 were beaten without losing a round in my runs; ch12 took 3 tries but I did not read the screen mid-fight). Kid Mode not tried.
- **Workshop:** not visited.
- **Text and layout:** one confirmed overlap (unlock-card receipt behind buttons, shot-33) and one hidden toast (shot-20); the rest of the visited screens are clean.

## Bugs that block play
- None blocked play. `/errors` returned `none` at start, middle and end.
- Not a blocker but close: the 20th kaiju (Tacowl) was not obtainable in my session (29/30 Story stars, 6 retries without a 3-star run), and the requirement text does not say which campaign counts.
