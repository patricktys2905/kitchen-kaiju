# Playtest evaluation: The Collector

**Fun score: 6.5 / 10.** The reveal moments and Gallery are charming, but the collection is mostly finished by accident within about 13 matches, and everything left over has no "build-up" or showcase.

> Port 7105, profile #5 collector. About 55 harness commands. Screenshots are in `art-src/.playtest/r6-7105/` (shot-1 to shot-22).

## What I did
- Title screen, Gallery (kaiju and colours, clicked locked entries), Pantry, Records (both pages), Table Workshop, Story map and the Story Rewards list.
- Free Play: 8 autoplay matches (2 wins, 6 losses with a bot in my seat), then 4 Story chapters on the Hard bot (ch 1 to 4, all cleared, ch 4 gave Minturtle).
- 13 matches, 8 wins, 38 KOs, 25 KAIJU forms, ★10 stories. Chef Rank went from Dishwasher to Prep Cook. Bought Peach and Matcha in the Pantry.
- Collection went 58% -> 72%. Kaiju 16/20 -> 17/20, colours 2/19 -> 9/19, tables 15/18 -> 17/18 visited. `/errors` was `none` at start, middle and end.

## What worked for me (briefly)
- The Gallery is clear: silhouettes, "???" cards and an exact unlock hint with progress ("Beat Story chapter 8: The Big Melt (0/8 cleared)", "Win 10 matches (8/10)"). The title screen "NEXT UP" line (shot at title) is a good collector hook.
- The NEW KAIJU reveal (shot-19) is great: big art, KAIJU power line, "Playable now in..." line.
- Colour swatches in the Gallery re-colour the featured kaiju live (shot-21, Grape Gobzilla), so you can see the colour before committing.
- Story chapter-clear card shows tokens and mastery in a clean single line (shot-16).

## The single biggest structural problem
**The collection has no depth and no pacing: it is a checklist that finishes itself.** I played 13 ordinary matches and got 7 colours, 1 kaiju and 17/18 tables "visited" without ever aiming at them. Tables are visited just by playing because Free Play defaults to "ALL 15, a different one every round". Colours drop from generic stats (win a match, win 10, KO 25) that any normal play hits. So the Collector never makes a *choice*, never feels a *hunt*, and there is nothing to do once the percentage bar fills. The "Collection 72%" number jumped 14 points in one sitting, which makes the remaining 28% (3 kaiju behind Story ch 8 and 12 and 30 stars, 10 colours) look like a short to-do list, not a long-term hobby.

Second half of the same problem: the new systems that should add depth are thin. Kaiju Mastery (Lv 1 Rookie to Lv 4 Head Chef, "7/240 XP" in shot-21) gives only a few tokens and a title; it never unlocks anything on the kaiju itself. Chef Tokens buy only 4 colours and 2 Gauntlet perks (total about 1,540 tokens in the whole shop), and I'd earn that in about 55 matches. Colours are one global wardrobe ("works on every kaiju"), so there are only 19 cosmetics in the entire game and the same Grape-or-Lime tint is applied to everything. A collector has no kaiju-specific rewards to chase.

## Big change proposals (2–3, most important first)

### Proposal 1: Per-kaiju Mastery rewards ("Mastery Wardrobe") with unique outfits, emotes and a gold frame
- **Problem it solves:** Mastery exists (Gallery card: "Mastery ★★★★★★ Lv 4 Head Chef (7/240 XP)") but unlocks nothing. Colours are global so there is no reason to play any specific kaiju. After 13 matches I had no reason to try anyone other than whoever the bot picked. Collection fills by accident and then stops.
- **How it would work (detailed design):**
  - Each of the 20 kaiju gets a 6-step Mastery track (existing Lv 1 to 6, XP 60 / 100 / 160 / 240 / 340 / 460). Each level grants a fixed, visible reward shown on the kaiju's Gallery card as a row of 6 slots under the stats (locked slots grey with the unlock level).
  - Lv 2: a kaiju **victory pose** (alternate results-screen art/pose). Lv 3: a **unique palette** for that kaiju only (e.g. Gobzilla "Raspberry Tart", Minturtle "Choc Chip", 20 total, drawn as a second outfit, not just a hue tint). Lv 4: a **hat/accessory** (chef hat, party hat, eyepatch; 20 distinct, 1 per kaiju). Lv 5: a **name flourish and trail** (KAIJU-mode stomp ring colour + crumb trail). Lv 6: **Gold frame** on the Gallery card plus a new one-line "title" (e.g. "Gobzilla, Seed Sovereign") shown under the name in match HUD and Online lobby.
  - Gallery screen flow: click kaiju -> card shows Mastery row. Click a slot to equip (unlocked) or see how much XP is left ("Lv 3 needs 62 more XP, about 3 matches"). Add an "OUTFIT" selector row under "YOUR COLOUR" that applies per kaiju (global colour stays as the base tint).
  - Collection % formula becomes: kaiju 30%, colours 15%, tables 15%, Mastery slots (20 x 6 = 120) 40%. So 100% needs real, spread play.
  - XP rules: match played 10, win +20, KAIJU form +5, KO +3 (cap 25 per match). The match receipt already says "Mastery Lv 2 Line Cook · 14/100 XP"; add a thin progress bar and "Next: Victory pose" so the reward is named.
- **Example moment:** I finish a loss as Minturtle. The receipt says "Mastery Lv 2 Line Cook · 94/100 XP, next: Choc-Chip palette at Lv 3 (6 XP away)". That nudges me into one more match "just to finish Minturtle". In the next win the receipt flashes "NEW: Choc-Chip Minturtle!" with the new look on the end banner.
- **Rewards / progression hooks:** 120 mastery slots, a Gold-frame ladder (20 frames) and per-kaiju titles. A Chef Rank bonus for each Gold kaiju. Brings players back to specific characters instead of whichever is auto-picked, and gives bots and friends visible flair in Party/Online.
- **Risks and edge cases:** Art cost is the big one (20 palettes, 20 hats, 20 poses, 20 flourishes); mitigate by shipping palettes + hats first (tint shader and sprite overlay) and adding the rest in later content drops. Online: outfit is cosmetic only and sent in the join packet. XP should not rise from autoplay grinding at a cheaper rate than real play, or add a "wins required" cap on Lv 5/6. Phones: the 6-slot row must fit under the stats at 1280x720 (the card is already full: it overflows if the long power line wraps to 2 lines).
- **Size:** L (art-heavy; data model is small). Touches Gallery, match receipt, results banner, HUD title, Online lobby and Records stats.
- **Score impact for me:** +1.2. It turns Mastery from a number into the long-term collecting goal and makes kaiju choice matter.

### Proposal 2: A real collecting hunt layer: "Pantry Rotation" (daily shop rotation) plus kaiju/colour/table "Sets" with set bonuses
- **Problem it solves:** The Pantry (shot-3) has exactly 6 static items and 4 colours. After about 55 matches it's empty and "Collection" stalls. Tables visited hit 17/18 in 13 matches because Free Play picks tables for you. Nothing is scarce, so nothing is exciting. The collector wants rarity, goals and pace.
- **How it would work (detailed design):**
  - **Rotating shop:** Pantry shows 3 "Today's Specials" (rerolled at local midnight, seeded by date so everyone gets the same ones) drawn from a pool of ~40 limited cosmetics (hats, table cloths, palettes, crumb trails, HUD frames). Each costs 150 to 900 tokens. A special that is not bought comes back at most every 14 days. A "Back in the Pantry" tab shows what you missed (can be bought at +50% price, so it is never gone for good).
  - **Sets:** 6 themed sets of 6 items spread across kaiju, colours and tables (e.g. "Breakfast Set": Toastbat, Gobzilla, Pancake table, Peach, Sunny-Side crumb trail, Egg hat). Gallery gets a "SETS" tab showing each set as a 2x3 grid with progress "4/6". Completing a set gives a set reward: a unique Gold-trim frame + 300 tokens + a title for the Records card.
  - **Table wall:** tables are collected by *winning* a round on them (not just visiting). Gallery gets a "TABLES" tab: 18 cards, each showing wins, best KO count and a "mastered" 3-star when you win 3 rounds there. 3 stars per table = a table decoration (a prop in the Workshop). Free Play gets a "Table: pick for me" vs "Table: hunt" option that biases toward unmastered tables.
  - **Weekly Orders** (existing, 40 tokens each, 3 orders) get a 4th "Collector order" slot: "Win a round on a table you haven't mastered", paying a **Mystery Crate** (1 random cosmetic you don't have, never a duplicate).
- **Example moment:** I open the Pantry on a Saturday. Today's Specials: "Chef Hat (Minturtle) 300, Ketchup Trail 200, Diner Checker table skin 450". I have 340. I buy the hat and Gallery opens at the Breakfast set: "5/6, one more!". The sixth piece is Today's special on Monday, so I set a reminder that I'll come back.
- **Rewards / progression hooks:** daily reason to open the title screen, set completion bonuses, a Table Wall to chase, Mystery Crates. Gives tokens a real sink (today there is nothing to buy once the 6 items are owned) so the new Chef Tokens economy has a purpose.
- **Risks and edge cases:** FOMO (soften with the "Back in the Pantry" tab). Needs a content pipeline: ~40 cosmetics. Time zone and date seeding (use UTC date to be fair for Online). Wasting tokens: add a confirm popup on any purchase over 300 (currently buying is instant with no confirmation: I bought Peach by clicking once). The token curve needs retuning: today a win is about 25 to 100 and a loss about 5, so about 20 matches earn a 400 item; leave that, but add a daily "first win bonus" (+30 tokens) so casual players see the rotation.
- **Size:** L (shop UI rework, a Sets tab and a Tables tab in the Gallery, content), M for the shop rotation alone. Touches Pantry, Gallery, Free Play setup (table picker), Weekly Orders, Records.
- **Score impact for me:** +1.0. It gives a lasting, structured reason to keep coming back and replaces the "everything is 72% in an hour" feeling.

### Proposal 3: Gallery "Showcase Shelf" and Collector's Album you can share
- **Problem it solves:** Collecting has no payoff beyond a number. Unlocking Minturtle felt great for 3 seconds (shot-19), then it just becomes another icon in a grid. A collector wants to *display* the collection and show friends. The only share is the generic "SHARE" button on the results screen.
- **How it would work (detailed design):**
  - **Showcase Shelf:** a new Gallery tab "MY SHELF". 5 shelves x 4 slots. You place any unlocked kaiju (in any owned outfit/colour), any owned table (as a miniature) and up to 6 trophies (Records achievements as medals: Gold-frame kaiju, Gauntlet grade S, Daily Gold medals, Ghost Pepper). Drag or click-to-place, same input as the Table Workshop so it is already a known pattern.
  - **Album card export:** "SHARE SHELF" creates a 1280x720 image (the same pipeline as the results SHARE button) with the shelf, Chef Rank, Collection % and a 6-character code. Anyone can type the code on the Gallery ("VISIT SHELF") to view it read-only; works offline from the code (it only encodes ids + outfits, about 100 bytes; same idea as the House Rules share codes).
  - **Idle display:** when the title screen has been idle for 30s it shows a slideshow of your shelf kaiju playing their victory pose, so the collection is the attract mode.
  - **Rewards:** a 4th shelf unlocks at 50% Collection, the 5th at 90%, with a bonus background (wallpaper options 6).
- **Example moment:** After finishing the Breakfast set I arrange Toastbat, Gobzilla and the Pancake table on my top shelf, press SHARE SHELF and send my friend the code. They type it on their Gallery and see my shelf, then ask how I got the Gold-frame Minturtle.
- **Rewards / progression hooks:** 6 wallpapers, shelf slots as milestones, social bragging, a reason to unlock "rare" things the player is proud of rather than just "everything".
- **Risks and edge cases:** Needs poses (shares assets with Proposal 1's victory poses). Code length and typos (use a checksum character). Moderation is not needed (ids only, no text). On phones, drag is awkward: use tap-to-select then tap-slot. Low value for non-collectors, so keep it in the Gallery and skip on the main menu.
- **Size:** M (new Gallery tab, share-code encode/decode, one image render). Touches Gallery, Records, title idle attract mode.
- **Score impact for me:** +0.6. Pure payoff feature; works best combined with Proposal 1.

## How the new features from this round felt
- **Chef Tokens:** the numbers are a bit uneven and uncommunicated. Wins gave +50 and +59 to +98 (story), a loss gave **+5** (shot-7), and a Story chapter ch3 gave +25 after a clean-looking win. I don't know *why* a match paid what it did; the receipt only shows the total. A line-item breakdown ("Played +5, Won +25, KOs 4x3 = +12, KAIJU +8") would make the economy readable, and a minimum of about 15 for a loss would stop it feeling punishing. Currency is okay, but the sinks are too few (Proposal 2).
- **Kaiju Mastery:** visible in the Gallery card and the receipt ("Mastery Lv 2 Line Cook · 14/100 XP"), levels up fast (Lv 2 to Lv 4 within 6 matches) and then... nothing. It is the best-seeded system for collectors and the most underused (Proposal 1).
- **Weekly Orders and the Pantry:** both are clean screens (shot-3). Orders are flat (20 KOs / 5 wins / 8 KAIJU), pay a flat 40 tokens and never change in kind, so by week 3 they are filler. The Pantry has 6 static items and no confirm on buy.
- **Receipt card (🧾):** useful in principle but cramped; it sits in the bottom-left over the table and the tip is easy to miss (shot-6 has no tip at all after a win, shot-7 has one after a loss). A tip on every receipt or none, please.
- **Chef Rank:** went Dishwasher -> Prep Cook after about 13 matches. It's a nice title but I couldn't find what the next rank needs or what ranks exist. Show a rank ladder with thresholds in Records.
- **Story rewards list:** clear (shot-11) and honest about what is locked behind which chapter. Good for planning, but it means the rest of the kaiju/table collection is on a fixed rail (about 12 chapters + 30 stars) with no alternative route.
- **Not touched:** Gauntlet runs, Daily medals, COMEBACK HELP, House Rules (not relevant to this profile beyond the Lunchbox/Lifeline Pantry items).

## Bugs that block play
- None that block play. `/errors` returned `none` at start, mid-run and end.
- Text overrun on the results screen (not blocking, but the brief asked for it): the bottom awards strip ("Most KOs ... · Crumb Monster ... · Kaiju Lover ... · Butterfingers ...") wraps onto two lines, runs over the table's bottom rim and sits directly on top of the REMATCH / MENU buttons (shot-6 and shot-7; the same strip in shot-6 ends with "Survivor: CHOCOMUNCH" on a second line right under the buttons). The strip is also drawn over table props, making it hard to read. Reproduce: finish a Free Play match with 3+ awards.
- Text overrun in the opening Story dialogue box on first entering Story: the Head Chef line is shown cut off mid-word ("...and the legendary GOLDEN S", shot-13). It may just be the typewriter mid-animation (I captured a frozen frame), but it is a tell that the frozen frame is possible, so confirm the box has room for the final text.

## Small notes (max 5, one line each)
- Gallery locked colour swatches are all identical padlocks (shot-2 / shot-21); show a dimmed preview of the colour so I know what I'm chasing.
- Free Play allows duplicate kaiju (two NORIGONs in shot-7); the results board then lists the same name twice, which is confusing.
- The results awards strip and receipt card should not overlap the table art; move them into a bottom panel.
- Pantry purchases are instant with no confirm or undo; add a confirm for anything above 200 tokens.
- Gallery "Collection 72%" should show what the percentage counts (kaiju/colours/tables weights) on hover/tap.
