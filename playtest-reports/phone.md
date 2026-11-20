# Playtest evaluation — The Phone Player (phone, landscape 1000x462, touch)

**Fun score: 7.3 / 10** (the loop is fun and the touch controls work, but small-screen text and a few real overlaps keep it well under 9: tiny Gallery/Help/Records text, a perk screen that covers the match receipt, a Pantry toast over the shop, and no phone-safe way out of some screens)

> Harness limits first: hold-THROW (`/tap?label=THROW&hold=1.2`) did NOT release a throw (still holding the ladle afterwards). STOMP via `/tap` also did not fire the first time (belly stayed 100), but `/act?cmd=stomp` did, so I treat both as harness limits and not game bugs. All bot-driven play used `/act`, so "feel" of the thumb controls is judged from screenshots and from the on-screen layout only.

## What I did
- About 118 harness commands, 54 screenshots. Every one was opened with Read. Paths: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7111\shot-1.png` to `shot-54.png`. `shot-43.png` was lost when a long background loop was stopped.
- Title (tap-card hint), **1-minute Practice** (all 8 steps, PRACTICE COMPLETE +20, end card FIRST MATCH / STORY / MENU), Story map + opening cutscene + chapter-1 scene + chef chat, **Story ch 1** (lost one try on RETRY screen, then won with a bot, 2 stars, receipt with "📜 Meanwhile…").
- **Party Modes ▸ Team Feast** (setup screen, + BOT x3, played 4 rounds, lost 1–3, results + receipt). Pantry (weekly orders, buy flow), Records (stats, GOALS, PIN), Gallery (card detail, Move Lab with Crabbage, KAIJU power), Challenges (Gauntlet Starters, 5 waves incl. a boss wave, perk screens, pause/QUIT), Daily preview card, Help BASICS and EXTRAS, Settings (toggled BIG TOUCH BUTTONS), Table Workshop (placed pancakes, tried ✏ NAME).
- Matches: Practice x2 (one in Move Lab), Story ch1 x2, Team Feast x1, Gauntlet 5 waves. Roughly 25 minutes of game time. `/errors` was `none` at start, middle and end.
- Not played: Online, Crumb Rush/Hot Dumpling/Golden Spoon/Cup runs, Trials, Dessert Course, Spicy.

## What worked for me
- **The title and Practice teach touch well.** "👋 NEW HERE? 1-MINUTE PRACTICE ▶" sits in the middle; the Practice hint bar reads "tap DASH", "THROW: hold THROW, then let go" (phone wording, no keys). The on-screen buttons are big and clearly placed (THROW big bottom right, SWIPE above it, DASH bottom left, STOMP turns red when the belly is full). STOMP greys out until belly full, which reads well. `shot-3.png`.
- **"BELLY FULL! TAP STOMP → KAIJU"** floating banner is the single best phone hint in the game. `shot-3.png`.
- **KAIJU HUD seconds ("KAIJU 6s!", "KAIJU 4s!")** work and are easy to read in the top bar. `shot-5.png`, `shot-37.png`.
- **Pantry buys ask one item at a time** ("TOFFEE COLOUR? tap again to buy for 28"), and the coin total updates. `shot-28.png`.
- **Gallery** now shows "You vs it: 1–1" on Crabbage. Cards are big tap targets. Move Lab starts with belly full ("STOMP READY") and the bottom hint "MOVE LAB: Crabbage: STOMP to go KAIJU, then THROW / SWIPE for Claw Snap · MENU to leave" is exactly right for phone. `shot-36.png`, `shot-37.png`.
- **Records ▸ GOALS** is genuinely useful: every collection plus the 4 closest achievements with PIN, and the pin shows on the title NEXT UP card and the match receipt ("📌 Crumb Muncher: 80/100"). `shot-30.png`, `shot-33.png`, `shot-44.png`.
- **Daily preview card** is clear and has one START and one 🌶️ SPICY (HARD rivals · +40 🪙) button, plus BACK. `shot-49.png`.
- **Help BASICS picture cards** are easy to skim and use phone wording ("Drag the LEFT side to move"). `shot-50.png`.
- **Team Feast live "🔴 RED 0 – 0 BLUE 🔵"** is large, centred and readable. `shot-23.png`.
- Gauntlet boss wave paid 🏆 Gauntlet Runner +30 🪙 with a toast; Challenges title card now says "Gauntlet (best 5)". Pause menu has a "Tap QUIT again" confirm, which is good for thumbs. `shot-47.png`.
- Story is charming: Crabbage cutscene, "Meanwhile, a bamboo steamer lid lifts an inch…", defeat card with "What beat you: Thrown cutlery got you. DASH sideways…" is a good teach moment. `shot-16.png`, `shot-19.png`.
- Whole session (title → Story → Party → Gallery → Pantry → Challenges → Daily → Help → Settings → Workshop) was reachable with taps only.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the small-screen text actually readable (biggest item).** What: raise the minimum rendered size of body text on phone. Where: Gallery detail panel (`shot-34.png`, `shot-35.png`: description, KAIJU power, Mastery and Rewards lines are about 40% the size of the title and hard to read at 462 px tall), Records stat rows and "Rank pts…" footnote, Help EXTRAS (`shot-51.png`, wall of text), Challenges footer (`shot-38.png`), Goals "next:" lines (`shot-30.png`), Story chapter card hint lines ("★★★ no rounds lost…", `shot-10.png`), pill labels on the Story header (DESSERT / SECOND HELPINGS sub-lines), Workshop CHEESEWHEEL label. How: one phone floor of about 14 px at 1280 base (about 5 px at 1000-wide display ≈ 11–12 CSS px) for anything the player must read; collapse extra lines into tap-to-expand. Impact +0.6.
2. **Fix the Gauntlet perk-screen overlap.** What: the 🧾 THIS MATCH receipt grows upward and slides UNDER the perk card #1 ("THIS MATC" is cut off). Where: Gauntlet "WAVE N CLEARED!" perk pick when the receipt has 5+ lines (`shot-44.png`). How: on the perk screen, either cap the receipt at 3 lines with "+2 more" or move perk cards up; the receipt must never share pixels with a button. Impact +0.4.
3. **Give every screen a phone-reachable way out.** Where: the Gauntlet perk screen has no MENU or Escape equivalent (only EXIT FULL SCREEN shows, and Escape did nothing, `shot-44.png`/`shot-45.png`); you must pick a perk and then start the next wave to pause and QUIT. How: show ✕ MENU (or a small "END RUN") on the between-wave perk screen, and ✕ MENU/PAUSE on the Practice-complete card. Impact +0.3.
4. **Stop the toast from covering content.** Where: Pantry first-visit "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" lands dead centre across the shop cards and the "Win 5 matches" progress bar, hiding "1/5" and the PEACH price (`shot-27.png`, `shot-28.png`). How: spawn FIRST SERVICE / achievement toasts at the top (where "Gauntlet Runner! +30" already sits), 2.5 s, never over cards. Impact +0.3.
5. **Declutter the Party Modes setup bar.** Where: `shot-21.png`. 12 pills plus PLAY plus a three-line info block in two rows; UNDO-style tiny gaps, PLAY is orange but small and lands in the bottom row. How: make PLAY big and fixed bottom-right; fold TABLE / ROUNDS / POWER-UPS / HAZARDS / TWIST / 🎲 into one "⚙ MATCH RULES" pill that opens a sheet; keep + BOT / − BOT / MODE / PLAY visible. Impact +0.4.
6. **Results screens: make the winner, the buttons and the receipt not fight.** Where: Team Feast results (`shot-25.png`): the stats box sits on the winning kaiju's art, receipt panel, SHARE button and the tiny bottom ticker ("Most KOs… Crumb Monster… Condiment Hoarder") all share the bottom-left; the ticker is small and runs over the table frame. How: right-aligned column "RESULT" (top), centre buttons REMATCH/MENU, receipt as a collapsible "🧾 THIS MATCH ▾" chip (collapsed by default, auto-expands when something new unlocked). Impact +0.3.
7. **Remove keyboard wording on phone.** Where: Practice finish line "🎉 All done! Esc → pause → QUIT" (`shot-6.png` text); Settings "⌨ KEYBOARD CONTROLS" button; "tap a card to start" hint on the title is placed over the sushi mascot. How: "All done! Tap ✕ MENU"; hide the keyboard button on touch devices or move it under "Advanced"; place the hint above the cards, not over art. Impact +0.2.
8. **Make the player kaiju easier to spot on a phone.** Where: in a 4-kaiju Team Feast the kaiju are about 60 px wide on a 462 px-tall screen and the ▼ YOU marker disappears after the countdown (`shot-23.png`). How: a small persistent ring or arrow under your kaiju in every match (not only the first 2 s), and a slightly larger sprite scale on phones (+15%). Impact +0.3.
9. **Gauntlet heart count must be clear and stable.** Where: header read ❤❤❤ at wave 5 and "GAUNTLET ❤ WAVE 6" after clearing wave 5 without being hit (`shot-42.png` vs `shot-46.png`). If a perk or a boss reset is meant to do that, say so on the perk screen ("Hearts: 3 → 1?"); if not, it is a bug. Impact +0.2.
10. **Larger tap targets on tight rows.** Workshop UNDO/CLEAR and SLOT/NAME touch each other, all four are under 55 px high at 1000 px wide (`shot-53.png`); Records PAGE/GOALS and the Goals × are small. Impact +0.2.

## 🔍 Every issue I saw (exhaustive)
| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Gauntlet perk pick | "🧾 THIS MATCH" receipt is partly hidden under perk card 1 ("THIS MATC" cut off) when 5 lines long | shot-44.png | Cap lines or move perks up; receipts never under buttons |
| 2 | major | Gallery detail | Description, power, Mastery bar and Rewards lines are tiny on phone; MOVE LAB / SHINY labels tiny | shot-34.png, shot-35.png | Raise min size, hide Rewards behind "▾ more" |
| 3 | major | Gauntlet perk pick | No MENU/QUIT control on screen and Escape does nothing; you cannot leave between waves | shot-44.png, shot-45.png | Show ✕ MENU on perk screen |
| 4 | major | Help ▸ EXTRAS | Long wall of small text, no icons for hazards/twists, 4 hazards on one run-on paragraph | shot-51.png | Picture cards like BASICS, 1 line each, tap for detail |
| 5 | major | Party setup | 12 pills + info lines; PLAY is not prominent; info line text sits on busy art and loses contrast | shot-21.png | Group rules into one sheet, strong PLAY, dark plate behind info |
| 6 | major | Team Feast results | Stats box overlaps the winner kaiju art; receipt panel + SHARE + ticker crowd bottom-left; ticker tiny | shot-25.png | Re-layout as above |
| 7 | major | Pantry (first visit) | "FIRST SERVICE ✔ Visit the Pantry: +25" banner lands across shop cards and hides Weekly Order "1/5" and a price | shot-27.png, shot-28.png | Top-of-screen toast |
| 8 | minor | Practice finish | Hint says "Esc → pause → QUIT" (keyboard wording on a phone) | shot-6.png | "Tap ✕ MENU" |
| 9 | minor | Practice end card | "Skipped this step: try it in a real match!" and "✔ DASH" faded text still floats over the end card behind the buttons | shot-7.png | Clear toasts before the card |
| 10 | minor | Practice end card | The phone controls stay live (THROW, DASH...) under the FIRST MATCH / STORY / MENU card | shot-7.png | Hide controls while a card is up, or dim them |
| 11 | minor | Practice (step 3 and 6) | Hint bar top-left (≈ 600 px wide) covers about a fifth of the table's top edge; at step 3 it covered the top-left cup | shot-3.png | Move hint above the arena or shrink to 1 line |
| 12 | minor | Practice | Tutorial step "THROW: hold THROW, then let go" cannot be completed by the bot harness; not a game fault | - | n/a (harness) |
| 13 | minor | Title | "tap a card to start" sits on top of the sushi mascot, low contrast | shot-8.png | Put above cards on a dark pill |
| 14 | minor | Title | CHALLENGES card text wraps to 2 lines ("Gauntlet (best 5) · 🎯 Trials 0★"), taller than its siblings and touching the card edge | shot-48.png | Shorten to "Best wave 5 · 0★" |
| 15 | minor | Title NEXT UP | 4-line panel grows over the strawberry and fork art and pushes into the mid-screen | shot-48.png | Keep to 3 lines (FIRST SERVICE, pin, one unlock) |
| 16 | minor | Story map | Chapter card bottom text "★★★ no rounds lost · ★★ lost one · ★ any win" sits on the card border; SCENE button also straddles the border | shot-10.png | Add 8 px bottom padding |
| 17 | minor | Story map | Header pills DESSERT ("finish the Feast or 🎟 Chef's Pass") and SPICY text are very small; snake layout (4 top right, then 5,6,7 going left, then 8) reads oddly | shot-10.png | Larger sub-lines, ordered numbering left→right |
| 18 | minor | Story map (after chef chat) | Chef dialogue is shown a second time before chapter 1 plays ("THE HEAD CHEF… SKIP CHAT") | shot-13.png | Show once per chapter |
| 19 | minor | Story ch 1 intro | Chef tip "Shove rivals off the table edge with a dash" differs from the chapter-card tip (fine) but the pre-match text "Round 1 · Sunday Roast 💡…" overlaps the countdown digit | shot-39.png (same pattern) | Place tip below countdown |
| 20 | minor | Team Feast / all matches | "▼ YOU" marker only shows in the first moments; with 4 kaiju the player is hard to find | shot-23.png | Keep a ring/arrow |
| 21 | minor | Match HUD | "INSTANT REPLAY" and "FAST FORWARD ×3" banners stack closely and sit on the table | shot-24.png | More spacing, smaller |
| 22 | minor | Match HUD (phone) | Right-hand column (PAUSE, MENU, EMOTE, FULL SCREEN) is 4 equal buttons; MENU sits right under PAUSE so a thumb slip quits the match (no confirm in Practice/Move Lab) | shot-2.png | Put MENU behind PAUSE only, or confirm |
| 23 | minor | Pause menu | "⚠ Tap QUIT again to really end the Cup / run" touches the PAUSED title | shot-47.png | Move warning below buttons |
| 24 | minor | Pause menu | Phone controls (THROW/DASH...) stay visible beside the pause card | shot-46.png | Hide while paused |
| 25 | minor | Results (Team Feast) | Spoon seconds / crumbs shown in ticker only for the top kaiju; the tiny ticker is nearly unreadable | shot-25.png | Per-player columns in the results box |
| 26 | minor | Records | "Rank pts: 2 per achievement + 1 per kaiju Mastery level." runs to the panel's right border; first stat row crowds the "YOUR STATS" header | shot-29.png | Wrap/shrink and add spacing |
| 27 | minor | Records | Progress counters inconsistent in size ("1/10" big; "36/100", "36/400", "36/1000" noticeably smaller) | shot-29.png | One size |
| 28 | minor | Records ▸ GOALS | "next: Beat Story chapter…" sub-lines are smaller than their headings and nearly touch the next heading ("Tables 13/18") | shot-30.png | Add spacing |
| 29 | minor | Records ▸ GOALS | Close × is a small target in the top-right corner of the card | shot-30.png | 48 px target |
| 30 | minor | Gallery | Gobzilla Jr. (own kaiju) shows Matches/Wins but no "You vs it" (fine) yet other kaiju cards show 0 matches and the 📊 line is fine; but the Mastery bar next to the title wraps | shot-34.png | OK, minor spacing |
| 31 | minor | Gallery | Colour row has 21 tiny chips (≈ 28 px wide each): hard to hit with a thumb | shot-34.png | 2 rows or horizontal scroll with bigger chips |
| 32 | minor | Settings | "Saved on this device · tap to change" is at the very bottom edge; "⌨ KEYBOARD CONTROLS" is irrelevant on a phone | shot-52.png | Hide on touch |
| 33 | minor | Settings | BIG TOUCH BUTTONS: OFF by default on a phone-sized screen; I had to find it | shot-52.png | Default ON for touch-only devices |
| 34 | minor | Workshop | UNDO / CLEAR and SLOT / NAME touch each other, small targets; CHEESEWHEEL label is about half the size of its siblings | shot-53.png | Spacing, shorter label ("CHEESE") |
| 35 | minor | Workshop | ✏ NAME gave no visible response in the harness (title stayed "My Table 1"); a native `prompt()` may be blocked or invisible | shot-54.png | Use an in-game text field |
| 36 | minor | Daily card | Four info lines in small type, empty gap above buttons; "You play SLOBA vs…" long line is tiny | shot-49.png | Chips for opponents |
| 37 | polish | Challenges card | Footer is a dense 3-line paragraph hugging the bottom border | shot-38.png | Make it a collapsible "How checkpoints work" |
| 38 | polish | Gauntlet hearts | Header showed ❤❤❤ at wave 5 and ❤ at wave 6 without a hit (see item 9 above) | shot-42.png, shot-46.png | Explain or fix |
| 39 | polish | Move Lab | Dummy starts in the opposite corner (about 195+ px away); brief said it should be close, still a short walk but KAIJU burns about 3 s getting there | shot-36.png | Spawn dummy a screen-third away |
| 40 | polish | Move Lab | Giant Crabbage clips against the top bar when near the top wall | shot-37.png | Camera padding |
| 41 | polish | Story map | "Chapters 0/12 · 0% of everything · ★ 0/36 · 🌶️ 0/12 · 🎁 0/13" header line is small and packed | shot-10.png | Two chips |
| 42 | polish | Defeat card | Defeat card text is a good size but the chef quote repeats the chapter-card tip word for word ("Hold THROW to charge…") | shot-16.png | Show only "What beat you" |

## 🔠 Text and layout check (do this on EVERY screen you visit)
- **Title** (`shot-1.png`, `shot-8.png`, `shot-48.png`): no text overlaps text. "tap a card to start" overlaps the sushi art (low contrast). CHALLENGES card wraps to 2 lines after a Gauntlet run. NEXT UP panel grows to 4 lines. Otherwise OK, all six cards fully tappable.
- **Practice HUD** (`shot-2.png` to `shot-7.png`): hint bar covers part of the table; end card leaves faded toast text behind it and controls stay live. Otherwise OK.
- **Story map** (`shot-10.png`, `shot-13.png`): chapter-card bottom text and SCENE button sit on the card border; header sub-lines too small. Cutscenes (`shot-9.png`, `shot-11.png`) OK (SKIP button reachable).
- **Defeat / Chapter Clear cards** (`shot-16.png`, `shot-19.png`): OK; Chapter Clear receipt text is small but not clipped.
- **Party Modes setup** (`shot-21.png`): crowded button bar, info text on busy art. No actual overlap between buttons. Needs decluttering.
- **Team Feast match + results** (`shot-23.png`, `shot-24.png`, `shot-25.png`): HUD OK. Results: stats box overlaps the winning kaiju, receipt + SHARE crowd corner, ticker tiny and on the table frame.
- **Pantry** (`shot-27.png`, `shot-28.png`): toast overlaps cards and progress bar (problem). Rest OK.
- **Records** (`shot-29.png`): "Rank pts…" footnote touches panel edge; mixed number sizes. **Goals sheet** (`shot-30.png`, `shot-33.png`): tight spacing, small × target.
- **Gallery** (`shot-34.png`, `shot-35.png`): detail text too small; colour chips tiny. **Move Lab** (`shot-36.png`, `shot-37.png`): OK; hint along bottom is readable.
- **Challenges card** (`shot-38.png`): footer cramped. **Gauntlet match + perk pick** (`shot-39.png` to `shot-44.png`): receipt hidden under perk card (problem). **Pause** (`shot-46.png`, `shot-47.png`): warning touches title.
- **Daily card** (`shot-49.png`): OK, small text.
- **Help BASICS** (`shot-50.png`): OK. **EXTRAS** (`shot-51.png`): readable but a dense wall.
- **Settings** (`shot-52.png`): OK; footer on the bottom edge.
- **Workshop** (`shot-53.png`, `shot-54.png`): buttons touching, one tiny label.
- Nothing was cut off at the screen edge on the 1000x462 canvas apart from the items above. No JavaScript errors.

## The single biggest structural problem
On a phone, the game is designed at 1280x720 and drawn into 462 px of height, so every "second tier" line of text (descriptions, footnotes, rewards, hints, receipts) lands at about 5 px in physical terms. The big headline text is great, but the information a player needs to decide (what does this kaiju do, what is this reward, what did I earn) is exactly the tiny stuff. The minimum text size work in this round helped on some screens, but Gallery, Help EXTRAS, Records and the Story card still show clearly tiny text, and the receipts and toasts are placed with desktop room in mind. That keeps a phone player squinting and sometimes unable to read a button label that is under another panel.

The second issue is "layers": toasts, receipts, hint bars and on-screen controls all draw wherever there is room on a 16:9 desktop and then collide on a short screen. There needs to be one phone-safe layout rule: top strip for toasts, one corner for the receipt, controls hidden whenever a card or menu is up.

## Big change proposals (2–3, most important first)
### Proposal 1: Phone Text Tiers + "tap to expand" cards
- **Problem it solves:** tiny body text on Gallery, Help, Records, Story card, Challenges footer.
- **How it would work (detailed design):** Define 3 text tiers on touch devices: Title (as now), Body (min 14 px at the 1280 base, about 11 CSS px at 1000 wide), Fine print (hidden by default behind a "ⓘ" chip). Every card gets a one-line summary at Body size and an ⓘ that opens a full-height sheet with the long text at larger size. Gallery: name, one-line power ("Seed Spray: spits seeds that shove rivals"), "You vs it: 1–1", Mastery bar; ⓘ opens Rewards list and trait. Help EXTRAS: 12 icon cards (4 power-ups, 4 hazards, 4 twist groups) with 1 line each; tap for the full text. Records: stat rows at Body size, "Rank pts" moved into ⓘ. Story card: one line of tip, stars legend becomes ⓘ.
- **Example moment:** I tap CRABBAGE in the Gallery and read "Claw Snap: a short, strong snap that bats cutlery. Quick on its feet. You vs it: 1–1." without squinting; I tap ⓘ only if I want reward details.
- **Rewards / progression hooks:** none needed; improves discoverability of Mastery and Shiny.
- **Risks and edge cases:** screens get taller; need scroll in sheets; translations. Keep desktop layout unchanged.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: One phone-safe "layer rule" (toasts, receipts, controls)
- **Problem it solves:** the perk-screen receipt under the buttons, the Pantry toast over cards, controls visible under cards/pause, SHARE crowding results.
- **How it would work (detailed design):** (a) All toasts (FIRST SERVICE, achievements, +coins) spawn in one slot at the top centre under the HUD (y about 100–150), max 1 at a time, queue the rest, 2.5 s. (b) Receipts ("🧾 THIS MATCH") are a chip at the left-bottom that shows 3 lines max and "+N more ▾"; when a card/perk row is up, the chip docks above it, not below. (c) Whenever a card, results screen, perk pick or pause menu is up, the on-screen THROW/DASH/SWIPE/STOMP/EMOTE/PAUSE column fades out and is replaced by a single ✕ MENU (so every state has an exit). (d) SHARE moves into the results button row as a third button.
- **Example moment:** I clear wave 5; the perk screen shows 3 perk cards, a clean 3-line receipt chip above them, and a ✕ MENU at the right edge; I pick Mustard Coat and nothing is covered.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** toast queue must never hide a "NEW KAIJU" unlock (put unlocks in the receipt too, as now); hiding the controls on pause must not break "hold" inputs.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: "Quick Match" sheet for Party setup on phones
- **Problem it solves:** 12 pills + info lines on one screen is too much to read and tap at 462 px tall.
- **How it would work (detailed design):** Party Modes opens to: mode picker (◀ TEAM FEAST ▶), the 6 seat cards, three big buttons: + BOT, − BOT, ▶ PLAY (large, bottom-right, orange). A single "⚙ RULES" pill opens a bottom sheet with Table, Rounds, Power-ups, Hazards, Twist, 🎲, Cup, 📱 Phones as pads, each as a full-width row with its explanation under it, all text at Body size. The summary line becomes: "4 players · first to 3 · ⏱ ≈ 3 min" (single line on a dark plate).
- **Example moment:** I host game night on a phone: pick Team Feast, tap + BOT three times, tap PLAY; the rules sheet is only opened when I want to change something.
- **Rewards / progression hooks:** show "13/20 kaiju" in the sheet, not on the setup screen.
- **Risks and edge cases:** keyboard/desktop users want the pills visible; only collapse on touch/short screens.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **TRY IT / Practice free warm-up:** Practice paid +20 once and ended on a clear "PRACTICE COMPLETE" card with FIRST MATCH / STORY / MENU, good flow. Move Lab from the Gallery did not change my setup. The leftover "Esc → pause → QUIT" wording is the only mismatch for phone.
- **Gallery detail / Shiny / records:** panel no longer blank and the ✨ SHINY button shows ("300 🪙 · needs Lv 3"). The "📊 You vs it: 1–1" line is there on Crabbage. Text is too small on a phone (issue 2).
- **Receipt of every unlock:** Team Feast receipt listed token gain, Mastery, "NEW KAIJU: Bubblegumbo (Gallery)", "Play any Party Mode ✔ +25", knocked-out-by and a tip: complete. Gauntlet receipt listed "Gauntlet Runner +30" and "Midnight colour!". Complete but crowded.
- **Cup locks / Daily preview / Giant Hand warning:** Daily preview card opens with START / SPICY / BACK as promised. Cup not tested. Giant Hand is explained in Help BASICS, not seen in a match.
- **Gauntlet:** boss wave (wave 4) cleared and I got a ❤ and +30 🪙 "Gauntlet Runner". Challenges now shows "(best 5)". Checkpoint unlock: MAINS opened after wave 4. "NEW BEST/NEW RUN" not tested after dying. Heart count dropped 3 → 1 between wave 5 and 6, unexplained (issue 38).
- **Fighting:** KAIJU HUD seconds are visible and clear. I could not time the 7 s or the 1.4 s shield by feel in the harness (Gauntlet HUD showed a 🛡️ icon on my card at wave 5 start, which is a nice cue). Move Lab dummy is nearer than before but still across the table.
- **Story:** "📜 Meanwhile…" line appears on the chapter-clear card and is charming. Tip is on the chapter card; however the defeat card repeats the same quote. Progress reads "Chapters 1/12".
- **Records ▸ GOALS:** great and PIN shows on title and receipts; the small text and tight spacing are the only problems.
- **Party:** setup shows "⏱ ≈ 2 min" (3 min with 4 players, it scaled up). Team Feast live RED–BLUE score is readable. Results showed crumbs eaten ("26 crumbs eaten"). Spoon seconds only apply to Golden Spoon (not played). Phones-as-Pads: seen as a pill only.
- **Help:** BASICS picture cards are the best phone screen in the game; EXTRAS is useful but a text wall.
- **Phones:** minimum text size is better but not enough (see biggest problem). Kid Mode not tested. BIG TOUCH BUTTONS exists but defaults OFF.
- **Workshop:** pancake placed and described ("SYRUP STACK: sticky! Kaiju touching it slow right down"); 6 slots shown ("SLOT 1/6"). ✏ NAME did not visibly respond in the harness.

## Bugs that block play
- None found. No JavaScript errors (`/errors` = none at start, middle, end).
- Caveat on the perk screen: there is no on-screen way to leave until you pick a perk (not a blocker, but it traps a player who wants to quit).
- Harness-only: hold-THROW and `/tap?label=STOMP` did not register once; both treated as harness limits.
