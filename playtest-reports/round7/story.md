# Playtest evaluation: The Story Fan

**Fun score: 7.0 / 10** (the story presentation is charming and the reward beats land, but the Chapter 4 boss is a wall, there are no visible PHASE 2 or KID MODE cues, and a few result-card layouts collide.)

> This round the bar is **9/10 from EVERY profile**. Everything below is from the real build `v2026-11-18-5508c16`, harness port 7103.

## What I did
- Title, then STORY (The Grand Feast). Played chapters 1, 2, 3, 4 (boss), 5 and 6 in order, using the pre-chapter chats, post-chapter cards and the "Rewards" panel.
- Matches played: 17 (Records said 13 at the point I checked it, after chapter 5; I played 4 more). Won: 8 (chapters 1, 2, 3, 4, 5 and 6 were all cleared, plus 2 rounds won at the boss that did not complete a match).
- Chapter 4 boss "Boss of the Belt" (Norigon + Salmonster): **5 defeats, 1 win on the 6th try**. I turned on KID MODE after defeat 3, and used the "HELPING HAND" button on tries 5 and 6.
- Opened: Settings (shot-26), Records (shot-33), Pantry (shot-34), Story Rewards panel (shot-24), the unlock cards for Minturtle (shot-30) and the Freezer Shelf table (shot-37), and the kaiju picker (Q/E).
- Not reached: Second Helpings and the Dessert Course are locked behind the whole Grand Feast. I got to Ch 7 of 12, so I could not judge them or the end-game story.
- About 17 matches. Harness commands were over the budget, at roughly 200 curl calls, because chapter 4 needed so many retries.
- `/errors` at start, middle and end: **none**.

## What worked for me
- The charming story framing: an auto-played OPENING cinematic, then a Head Chef speech, then a per-chapter "SCENE" with an illustrated typewriter-text card (shot-4: Crabbage on the roast, "CRABBAGE IS FE..."). It feels like a proper cartoon.
- Rival banter on the result cards is genuinely funny and varied: "Ink-credible... We'll be back. Probably wobblier." (Squidgeon), "Worst. Birthday. Ever. *pop*" (Bubblegumbo), "Not even ONE round for me?!" (Crabbage after a flawless win).
- Chapter result card: 1-3 stars, rival portrait, line of dialogue, a "4 knockouts! The whole kitchen is talking" recap, the next rival teased ("Toastbat is already sharpening the cutlery...") and "Chapter N unlocked!". The card gives a clear forward pull.
- Defeat card is excellent coaching: "What beat you: Thrown cutlery got you. DASH sideways from a charge line, or SWIPE to parry it." and "A KAIJU flattened you. Step out of the ring before each stomp, then punish the dizzy shrink." It names the actual killer. It is also the best teaching text in the game.
- "HELPING HAND" button (green) appears after repeated defeats on the same chapter and starts me with a full belly ("STOMP READY!"). It is a good, dignified assist and it did get me through.
- Reward reveals are lovely: "NEW KAIJU! Minturtle" (shot-30) with the power name, and "NEW TABLE! Freezer Shelf" (shot-37).
- Boss intro banner "BOSS: NORIGON" with a crown in the countdown (shot-29), a crown above the boss in the match, and a crown icon on the map tile. Bosses are clearly flagged.
- Title screen shows story progress ("Ch 6/12 · ★ 10") and "Story 23% complete · ★ 10/36 · 🌶️ 0/12 · 🎁 1/7" on the map.
- Pre-chapter tips are teachable and spaced out: "Hold THROW to charge...", "DASH into a rival near the edge...", "Watch for the wind arrows: walk INTO the gust...".
- Chapters 1-3 ramp gently (1 easy rival, 2 easy rivals, then a normal rival with best-of-3).

## 🧾 Exactly what would make this a 9/10 for me
1. **Smooth the Chapter 4 boss wall.**
   - **what:** Reduce the spike from "chapter 3" to "Boss of the Belt" and make the boss telegraph a fair way to win.
   - **where:** Story, chapter 4 (Boss of the Belt, first to 2, Norigon + Salmonster).
   - **how:** Norigon "starts every round ready to go KAIJU" (the chapter tip). In my 6 tries he won most rounds by KAIJU-squashing or knocking me off the conveyor. For the first 3 attempts, cut his round-start KAIJU to 50% of rounds, or delay his first stomp until 6 s into the round. Keep the helper offer, but show HELPING HAND after the **2nd** defeat (it appeared after my 3rd+) and add a visible "How to beat him" bullet list on the map panel (conveyor, stay outside the stomp ring).
   - **score impact:** +0.6
2. **Make "PHASE 2" actually visible.**
   - **what:** A full-screen phase-change moment when a boss loses a round.
   - **where:** Boss chapters (4, 8, 12 and the Second Helpings bosses).
   - **how:** Boss lost a round, then a 1.5 s freeze, a crown-flash, a banner "PHASE 2: NORIGON IS FURIOUS!", the health pip turns red, and the boss gets one new behaviour (e.g. faster stomps). I won round 1 against Norigon four times and saw no banner, no `/look` text and no visual change. If it exists it is invisible, which negates its value.
   - **score impact:** +0.5
3. **Fix the clipped result card.**
   - **what:** The "Chef Tokens / Mastery" line and "Chapter N unlocked!" line are hidden behind the NEXT / REPLAY / MAP buttons when the card has a reward row.
   - **where:** Chapter clear card after a new-kaiju or new-table unlock (shot-31).
   - **how:** Increase card height by about 50 px or move the buttons to y=630, so every line is readable.
   - **score impact:** +0.3
4. **Show what KID MODE does.**
   - **what:** KID MODE gave me no cue.
   - **where:** Settings and the defeat card.
   - **how:** With KID MODE ON the defeat card (shot-28) still had 3 paragraphs of text (the brief promises "1-line chats, bigger result text"). Make the result-card text ~120% size, one line of coaching only, and show a small "KID MODE" tag on the story map header, so a parent can see it is on. Also confirm rivals really are easier (I still lost the boss 3 times after turning it on).
   - **score impact:** +0.3
5. **Surface the later campaigns.**
   - **what:** A teaser for Second Helpings and the Dessert Course on the story map.
   - **where:** Story map, bottom or "MODES" button.
   - **how:** Add a greyed 2nd tab "SECOND HELPINGS 🔒 Clear The Grand Feast" with a single locked silhouette, so a Story fan knows there is more than 12 chapters (the title only says "12 chapters"). Today MODES just returns to the title, so I had no sense there was a sequel.
   - **score impact:** +0.3
6. **Cutscene pacing control.**
   - **what:** Let me re-read dialogue and slow the typewriter without a skip-only choice.
   - **where:** Pre-chapter chat boxes and the SCENE cards.
   - **how:** Add a "◀ BACK" line (back one line) and make clicking while text is typing finish the line first (instead of advancing). Chat boxes showed "SKIP CHAT (S)" but no way to go back.
   - **score impact:** +0.2
7. **Make the chapter reward numbers consistent.**
   - **what:** One authoritative token total per chapter.
   - **where:** In-match banners, chapter result card, THIS MATCH panel.
   - **how:** Ch1 showed "FIRST SERVICE ... +25 🪙", the THIS MATCH panel "+20 Chef Tokens (45)", plus "First Bite +30 🪙". Show one line: "+20 match +25 First Service +30 First Bite = +75 🪙 (total 75)". The result card said "(45)" after those, so the total looks wrong to the player.
   - **score impact:** +0.2
8. **Give every story chapter a "why this fight matters" line.**
   - **what:** Story beats between rival intros (1 line per chapter is almost all gag banter).
   - **where:** Pre-chapter chat for chapters 2-12.
   - **how:** A single recurring thread (the Head Chef's golden spoon, who stole the recipe, etc.) with one new revealed fact per chapter, and a recap on the map ("Previously: ...").
   - **score impact:** +0.4
9. **Fix the map's reading order.**
   - **what:** Chapter tiles run 1-4 left to right, then 5-8 right to left, then 9-12 left to right (snake).
   - **where:** Story map. Add numbers on the connecting line or arrows, because pressing "right" from ch 5 goes to ch 6 on the left and down from ch 4 goes to 5.
   - **score impact:** +0.1
10. **Fix the star-total mismatch.**
    - **what:** One star goal.
    - **where:** Rewards panel ("Collect 30 Story stars (you have 6/30)") versus the map header "★ 6/36".
    - **how:** The 30-star reward threshold should be visible in the map header ("★ 6/36 (30 unlocks a kaiju)"), not a different denominator.
    - **score impact:** +0.1

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story ch 4 (Boss of the Belt) | Difficulty spike: 5 defeats in a row (Norigon starts every round ready to go KAIJU; conveyor knocks me off). Chapters 1-3 won easily, then a wall | art-src/.playtest/r7-7103/shot-18.png | Soften first-attempt boss, see checklist 1 |
| 2 | major | Story match, boss | No visible PHASE 2 indicator after I won round 1 against Norigon (4 times); nothing in `/look` and nothing visible in screenshots | art-src/.playtest/r7-7103/shot-21.png | Full-screen banner plus new behaviour, see checklist 2 |
| 3 | major | Chapter clear card with unlock | "Chef Tokens / Mastery" line and "Chapter 5 unlocked!" are hidden behind NEXT / REPLAY / MAP buttons (text at y 575 vs buttons at 575-640) | art-src/.playtest/r7-7103/shot-31.png | Taller card or buttons lower |
| 4 | major | Defeat card, KID MODE ON | KID MODE had no visible effect: still 3 paragraphs, same text size, rivals still beat me | art-src/.playtest/r7-7103/shot-28.png | Make the effect visible, see checklist 4 |
| 5 | minor | Defeat card | HELPING HAND only appears after the 3rd+ loss; on defeats 1-2 the player has no hint it exists | art-src/.playtest/r7-7103/shot-19.png | Show a "Stuck? A helping hand unlocks after 1 more loss" hint after defeat 2 |
| 6 | minor | Story map right panel | "🎬 SCENE" button overlaps the "Best: ★★★ / Not cleared yet" row and touches the panel border at x≈1248 | art-src/.playtest/r7-7103/shot-36.png | Move SCENE to the header row of the panel |
| 7 | minor | Story map | Chapter tile stars: ch5 tile shows ★★ lit but the panel says "Best: ★★★" (tile appears to show 2 stars) | art-src/.playtest/r7-7103/shot-36.png | Make tile and panel read the same value |
| 8 | minor | Rewards panel | "Collect 30 Story stars (you have 6/30)" but map header says "★ 6/36" | art-src/.playtest/r7-7103/shot-24.png | One denominator, or explain both |
| 9 | minor | Rewards panel | The three table rewards (Freezer Shelf, Candy Shop, Chef's Nightmare) have blank black thumbnails, but the kaiju rewards have silhouettes | art-src/.playtest/r7-7103/shot-24.png | Add dark table-swatch silhouettes |
| 10 | minor | Story chat box | Tip box shows heading "TIP" and body "TIP: BOSS: Norigon starts..." (double "TIP") | art-src/.playtest/r7-7103/shot-17.png | Remove the body prefix |
| 11 | minor | Story chat box, ch 4 | Salmonster says "Bow before the boss of the belt!" but the boss is Norigon (Salmonster is a plain "easy" rival). Mothball earlier says "the boss of the Sushi Bar" | art-src/.playtest/r7-7103/shot-14.png | Name the boss in the line, or let Norigon speak |
| 12 | minor | Chapter clear card, ch 3 | Mothball's win line starts with "Fine..." and ends "That was close, though. Next time!" (the line is one canned reply even when I won 3-0 or lost rounds) | n/a (look text) | Pick the line by outcome (close vs. flawless) |
| 13 | minor | Chapter clear card | Recap line "4 knockouts! The whole kitchen is talking." is the same string for different chapters (4 KOs in ch2, ch5, ch1 style) | art-src/.playtest/r7-7103/shot-31.png | More variants including crumbs, stomps, comebacks |
| 14 | minor | In-match result (ch1) | "FIRST SERVICE ... +25 🪙" banner, "+20 Chef Tokens (45)" and "First Bite +30" give totals that do not add up on screen | art-src/.playtest/r7-7103/shot-7.png | One summed line |
| 15 | minor | Chapter clear card | Stars card does not show which star requirement I missed (2 stars: "lost one round"). It does on the map but not on the clear card | art-src/.playtest/r7-7103/shot-10.png | Add "★★ lost 1 round: replay for ★★★" under the stars |
| 16 | minor | Story map | Snake layout (5-8 right to left) makes number order confusing; ch8 appears under ch1 | art-src/.playtest/r7-7103/shot-36.png | Arrows or consistent LTR rows |
| 17 | minor | Title, NEXT UP text | "NEXT UP / FIRST SERVICE" text is small, centred over the fork/spoon art and low contrast; one line is cut at the right by the art | art-src/.playtest/r7-7103/shot-35.png | Put it in a dark pill |
| 18 | minor | Title | Story button subtitle says "12 chapters", then "Ch 6/12 · ★ 10": nothing mentions Second Helpings or the Dessert Course | art-src/.playtest/r7-7103/shot-1.png | Add "+ 2 more campaigns" tease |
| 19 | minor | Story map, MODES button | "◀ MODES" goes to the title, not a campaign picker, so Second Helpings is undiscoverable from here | art-src/.playtest/r7-7103/shot-3.png | Add campaign tabs |
| 20 | polish | Opening cinematic | The auto-played cinematic starts almost black for several seconds (title "THE GRAND FEAST" faint, characters barely visible) and only the SKIP button is clear | art-src/.playtest/r7-7103/shot-2.png | Brighter fade-in, skip hint |
| 21 | polish | Opening chat box | The Head Chef speech box has a large empty gap under the title and the spoon art overlaps the chapter tile art | art-src/.playtest/r7-7103/shot-5.png | Tighten the box |
| 22 | polish | Countdown tip | The in-match tip line ("Dash INTO a flying fork to catch it. Free cutlery!") crosses a coffee cup and the table runner, and sits right below "Round 1 · Sunday Roast" | art-src/.playtest/r7-7103/shot-6.png | Move tip to a dark strip |
| 23 | polish | Boss countdown | "BOSS: NORIGON" banner sits on top of a soy-sauce dish, slightly noisy | art-src/.playtest/r7-7103/shot-29.png | Add a dark backing plate |
| 24 | polish | Result screen (in-match) | "THIS MATCH" panel is long (Knocked out by..., tip) and runs over the table bottom-left; award line along the bottom is very long | art-src/.playtest/r7-7103/shot-18.png | Cap lines, wrap awards |
| 25 | polish | New-table reveal | "NEW TABLE!" shows only a flat ice texture rectangle with no props, so it's far less exciting than the kaiju card | art-src/.playtest/r7-7103/shot-37.png | Show a mini table render |
| 26 | polish | Defeat card | Large empty space between "DEFEATED" and the text (where stars sit on the win card) | art-src/.playtest/r7-7103/shot-11.png | Put a rival portrait or tip icon there |
| 27 | polish | Kaiju picker | Name shows "GOBZILLA JR." on the picker but "GOBZILLA" in match HUD | art-src/.playtest/r7-7103/shot-25.png | Use one name |
| 28 | polish | Story map | Scene replay is hidden behind a small "SCENE" button; chapters 1-3 give a "Scene" but there is no "Previously" gallery | art-src/.playtest/r7-7103/shot-3.png | Add a Story Log |
| 29 | polish | Story, auto-bots | `auto:normal` lost chapter 3 repeatedly (normal bots vs 2 easy/normal rivals, first to 3): ch3 feels harder than ch4's intro suggests for casual players | n/a | Ch3 first to 2 or only 1 normal rival |

## 🔠 Text and layout check

| Screen | Result |
|---|---|
| Title | Mostly OK. NEXT UP text is small and low-contrast over art (art-src/.playtest/r7-7103/shot-35.png). Six bottom buttons fit. |
| Opening cinematic | OK but very dark at start (art-src/.playtest/r7-7103/shot-2.png). |
| Story map (chapter 1) | SCENE button overlaps the "Not cleared yet / Best" row and touches the panel edge (shot-3.png, shot-36.png). Rest OK. |
| Head Chef chat | OK; some empty space (shot-5.png). |
| Boss chat (Salmonster) | OK (shot-14.png). Double "TIP" (shot-17.png). |
| Chapter intro scene card | OK (shot-4.png). |
| Match countdown | Tip line crosses table props (shot-6.png). |
| Match result, win | OK; THIS MATCH panel overlaps the table (shot-7.png). |
| Chapter clear card (no unlock) | OK (shot-8.png, shot-10.png). |
| Chapter clear card (with unlock) | **PROBLEM:** token/mastery line and "Chapter N unlocked!" hidden behind the buttons (shot-31.png). |
| Defeat card | OK (shot-11.png, shot-19.png). Kid mode variant with HELPING HAND OK (shot-28.png). |
| Boss countdown banner | OK (shot-29.png). |
| New kaiju card | OK (shot-30.png). |
| New table card | OK but sparse (shot-37.png). |
| Story Rewards panel | OK (shot-24.png), blank table thumbnails. |
| Settings | OK, nothing clipped (shot-26.png). |
| Records | OK, 5/34 achievements; page 1 readable (shot-33.png). |
| Pantry | OK (shot-34.png); weekly orders (3 of 3) done after 13 matches. |
| Kaiju picker | OK (shot-25.png). |

I did not visit: Free Play, Party Modes, Challenges, Gallery, Daily, Online, Workshop (not a Story Fan target).

## The single biggest structural problem
The campaign has a charming wrapper but the **difficulty curve has no ramp into bosses**. Chapters 1-3 are easy (I cleared them with 3 stars and 2 stars), then the Chapter 4 boss is a different game: a rival who is KAIJU from the first second, on a moving conveyor. The coaching text exists (the defeat card is excellent), but the player has to lose several times to see the HELPING HAND, and PHASE 2 is invisible. A story player who can't beat the boss never sees the story. This one chokepoint caps my score more than any visual bug.

A second structural gap: Story chapters are mostly rival banter and star-gating. There is no running plot (what happens between Head Chef's opening and the finale), so the pull comes from rewards and not curiosity.

## Big change proposals (2-3, most important first)

### Proposal 1: Boss "Learning Mode"
- **Problem it solves:** Chapter 4 wall (5 losses), invisible Phase 2.
- **How it would work (detailed design):**
  - Bosses get a 3-step introduction. Attempt 1: Norigon's first KAIJU is delayed to the 8 s mark; a banner "WATCH: he goes KAIJU soon!" shows 3 s before.
  - After defeat 1, the defeat card shows a one-screen "BOSS NOTES" panel: stomp ring radius, safe zone, conveyor direction, and a bright arrow on the map panel.
  - After defeat 2, HELPING HAND is offered (full belly, as now). After defeat 3, offer "KID-STYLE rival" for one try (rival uses easy AI), without scoring penalty on stars cap at 2.
  - When a boss loses a round: PHASE 2 banner, 1.5 s slow-mo, the boss gets one new move (shorter stomp cooldown, or a new thrown item), crown pulses red.
- **Example moment:** I knock Norigon off the conveyor in round 1. Time freezes, he roars, "PHASE 2: NORIGON IS FURIOUS!" appears, and now his stomp ring flashes red. I know what changed, so round 2 is a puzzle, not a coin flip.
- **Rewards / progression hooks:** A "Boss Slayer" achievement (beat a boss with no Helping Hand), bonus +30 🪙 on first no-help win.
- **Risks and edge cases:** Delaying KAIJU alters the boss identity; keep it only on attempts 1-2. Kid mode should start at the "attempt 2" tuning.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: "The Story So Far": a through-line plus Story Log
- **Problem it solves:** Chapters feel like separate fights; no reason to care about ch 7-12.
- **How it would work (detailed design):**
  - Add a recurring mystery: who stole the Golden Spoon's ribbon? Each chapter's pre-chat reveals one clue (Chocomunch saw a shadow, Bubblegumbo found a bow, etc.). Total of 12 clue cards.
  - A "STORY LOG" button on the map (next to REWARDS) opens a scrapbook with each chapter's scene thumbnail, the clue, and a replay-scene button (replaces the tiny SCENE button).
  - The map shows "Previously: ..." (one line) above the panel when you return after a day.
  - The Grand Feast finale reveals the culprit, who is the teaser for Second Helpings.
- **Example moment:** After chapter 6, a clue card slides in ("Avocadrake: 'The ribbon smelled like... vanilla.'"). The log fills with a new polaroid. I want to know whose scent it was.
- **Rewards / progression hooks:** Log completion pays a cosmetic (a ribbon aura on the Golden Spoon avatar); 12/12 clues unlock a sticker in Gallery.
- **Risks and edge cases:** Needs ~12 new lines of writing and 12 small thumbnails (can reuse scene art). Must stay skippable and one line in KID MODE.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Campaign hub on the story screen
- **Problem it solves:** Second Helpings and the Dessert Course are undiscoverable; MODES goes back to the title.
- **How it would work (detailed design):** A tab strip at the top of the story screen: THE GRAND FEAST | SECOND HELPINGS 🔒 | DESSERT COURSE 🔒. Locked tabs show a one-line unlock condition and a blurred preview; clicking a locked tab opens a small popup "Clear The Grand Feast ch 12 to open (7/12)". The title's STORY card shows "Ch 7/12 · next: Short Order Showdown".
- **Example moment:** At ch 6 I tap the locked tab and see a blurred strawberry silhouette plus "Beat the boss of the Grand Feast". I now have a long-term goal.
- **Rewards / progression hooks:** Each tab shows its own star counter and reward count.
- **Risks and edge cases:** Must keep the map readable on phones (tabs are small).
- **Size:** S
- **Score impact for me:** +0.4

## How this round's new features felt
- **Story (bosses PHASE 2):** The feature does not show. I won round 1 against Norigon four times; no banner, no `/look` text, no visible change. Judging as absent until it is shown.
- **KID MODE:** I turned it on in Settings (shot-26: "KID MODE: ON, Story: easier rivals, 1-line chats, bigger result text") and replayed the boss. The defeat card (shot-28) was the same size with the same 3 paragraphs, and I lost twice more. The helping hand did help. I cannot tell what KID MODE changed.
- **First Service checklist:** Visible on the title with progress (0/6 then 3/6) and a concrete next step ("Clear Story ch 6 → Freezer Shelf", "Win 10 matches → Ocean colour (50%)"). It paid +25 🪙 on a chapter-1 clear. Good, but the text is small and low contrast.
- **Progression / Mastery / Chef Rank:** Mastery went Lv 1 to Lv 4 Head Chef after about 17 matches (shown on every result card); Records shows "Chef Rank: Prep Cook, Next: Line Cook at 14 pts (13)". Achievements pay 30 🪙 and receipts list them ("First Bite +30 🪙 · 🎨 Lime colour!", "Leftovers Cleared +30 🪙 · 🎨 Toasty colour!"). I liked the clear receipts.
- **Pantry daily deal:** Visible: "Lifeline 🪙 245 TODAY 30% OFF (was 350)". Weekly orders were all completed during normal story play, which feels too fast. I did not see a payout line for them, only a ✔.
- **Double twists, Party Cup, Gauntlet, Trials, Move Lab, Workshop:** not touched.
- **Text and layout audit:** found one real problem in my path (chapter clear card with an unlock, shot-31.png) plus smaller overlaps (SCENE button, countdown tip).

## Bugs that block play
- None that fully block play. `/errors` reported none throughout.
- Closest to blocking: the Chapter 4 boss (5 defeats before success), see issue 1, and invisible Phase 2, see issue 2.
