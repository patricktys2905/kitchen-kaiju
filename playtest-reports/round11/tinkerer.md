# Playtest evaluation — The Tinkerer (profile 7, round 11, port 7107)

**Fun score: 7.3 / 10** (the customisation layer is wide and mostly works: 10 twists, 9 fixed doubles, 6 Workshop slots, remappable keys, TRY IT. But the twist system is shallow and not discoverable, the Workshop cannot test, share or reward, and several "settings" do not visibly do what they say.)

> Bar this round is 9/10 from every profile. Everything below is specific to what I opened and pressed. Screenshots are under `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r11-7107\` (called `shot-N.png`).

## What I did
About 125 harness commands, 44 screenshots, all opened with Read. /errors was `none` at start, middle and end.
- **Title** (shot-1), then **Settings** (shot-2). I changed SFX volume, REDUCED EFFECTS and KID MODE, then restored them.
- **Keyboard Controls** (shot-3, shot-4). I rebound Throw to G (refused: "G is used by the menus"). I rebound Throw to A, which swapped with Move left. Z was also refused ("Z is used by the menus"). I used RESET TO DEFAULT.
- **Help** tabs BASICS, EXTRAS, CUTLERY, MODES, TABLES (shots 5, 6, 7, 8, 9).
- **Table Workshop** (shots 10, 11, 12). I placed pancakes, cupcake and bumper, cycled SURFACE, HAZARD and SLOT, hit NAME, saved, and pressed PLAY IT.
- **Matches played, about 5 and 2 partial:**
  - Free Play on My Table 1 (Leftovers surface, Giant hand): classic, 4 players, won 3-0 and earned the First Bite achievement.
  - Free Play with MINI KAIJU + KAIJU FRENZY on a random table: lost the round.
  - A TRY IT warm-up of BOOMERANGS.
  - A Gallery Move Lab session with Squidgeon.
  - A Team Feast room started with bots only.
  - The Trial "Bare Knuckles" (Fists Only).
- **Free Play setup:** full twist picker (shot-20), TRY IT, power-up and hazard toggles, and table cycling through the 6 Workshop slots.
- **Gallery** (shots 27, 28), **Move Lab** (shot-30), **Pantry** (shots 31, 32), **Records and GOALS** (shots 33, 34).
- **Party Modes** setup with the Party Cup lock (shots 35, 36), and the **Phones-as-Pads room** (shot-37).
- **Daily preview card** (shot-39), **Challenges** and **Trials** list (shots 40, 41).
- **Kid Mode** on Help EXTRAS (shot-43).

## What worked for me
- **Keyboard rebinding is correct and forgiving.**
  - Reserved keys are refused with a reason.
  - A key already in use swaps instead of silently duplicating ("A key already in use swaps over").
  - RESET works and says "Back to the default keys."
- **The twist picker is clear.** It has singles and ⚡⚡ doubles, each with a one-line rule, and the current one is outlined green (shot-20).
- **TRY IT is a genuine free warm-up.** It launched a 2-player Sunday Roast match with the twist banner "TWIST: BOOMERANGS: Every throw comes back to you". Thrown cutlery really did come back, shown as repeated pickups. After QUIT my Free Play setup was unchanged (twist still MINI+KAIJU FRENZY, no rewards). That is exactly what the brief promised.
- **Mini Kaiju + Frenzy** looks and plays different: tiny kaiju, "STOMP READY!" on all four HUD cards at round start, and a chaotic everyone-goes-KAIJU round (shot-25).
- **Fists Only** really removes cutlery (`holding: null`). The Trials list is a good showcase of twist combos (Thin Ice, Pocket Monsters, Chef's Table).
- **Workshop props are charming and their descriptions are readable and explain behaviour:**
  - 🥞 "sticky! Kaiju touching it slow right down"
  - 🧁 "bakes a crumb next to itself every few seconds"
  - Bumper "kicks any kaiju that touches it away hard"
  - SLOT switching keeps a draft (5 props survived a slot round-trip).
  - 6 slots and ✏ NAME exist; "Saved! 🏆 Table Maker unlocked!" is a nice hook.
- **Party Cup locks MODE and FIRST TO:** the labels change to "MODE CUP PICKS" and "FIRST TO CUP SETS IT" (shot-36).
- **The Phones-as-Pads room starts with bots only:** "Start (bots fill the seats)" works, and Team Feast showed a live "🔴 RED 0 – 0 BLUE 🔵" banner (shot-38).
- **Match receipt lists every unlock:** First Bite +30, Lime colour, NEW KAIJU Chocomunch, and the FIRST SERVICE step (shot-17).
- **Goals screen** (shot-34) is a real "path to 100%" with next steps per collection.
- **Gallery** shows "You vs it: 1–0" per kaiju (shot-28), and the detail panel no longer goes blank.
- **KAIJU timer** in the HUD ("KAIJU 3s!") works, and the shield rounds feel fair.
- **Pantry** asks one item at a time ("Toffee colour? tap again to buy for 28").

## 🧾 Exactly what would make this a 9/10 for me
1. **Free-form twist stacking.**
   - **What:** let me combine any 2 (or 3) twists myself, plus per-twist sliders.
   - **Where:** Free Play and Party twist picker, and the Workshop (a "house twist" on a table).
   - **How:** the picker (shot-20) offers 9 fixed pre-made ⚡⚡ pairs (Rink+Turbo, Kaiju+Castle, ...). Replace this with multi-select (tap up to 3 singles, with a "this combo is unstable" warning for clashes like Fists + Giant Cutlery). Add a magnitude where it makes sense: Turbo 1.25×/1.5×/2×, Snack Attack 2×/3×/5×. Add 🎲 "random twist each round" and "twist ramps up per round".
   - **Score impact:** +0.7.
2. **Workshop must show what the surface and hazard really do, and let me test fast.**
   - **What:** a surface change must change the preview, and there should be a one-tap test with no bots-and-wait.
   - **Where:** Workshop.
   - **How:** I cycled SURFACE to "Leftovers" and the status line read "Leftovers surface", but the preview kept the Sunday Roast wood and the tag still showed an unrelated name (shot-12). The in-match table also looked identical to Sunday Roast with a Sunday Roast tablecloth (shot-14). Render the real surface art, and draw the hazard's footprint (Giant hand row, cleaver lane) on the preview. Add ▶ TEST: 1 player vs a dummy, restart on Esc, so I can iterate in under 5 seconds. PLAY IT must also let me pick player count and twist.
   - **Score impact:** +0.6.
3. **More depth in the Workshop.**
   - **What:** a real set of building tools.
   - **How:** only 20 props and 12 per table. Add: rotate and flip, resize (S/M/L), drag-move, symmetry mirror (4-player tables want it), a "randomise props" button, a table shape (round, long, L), and tile-style props (a conveyor strip, a puddle, a trampoline). Expose per-prop tuning for the Bumper (kick strength) and Cupcake (bake rate).
   - **Score impact:** +0.6.
4. **Share and discover custom tables.**
   - **What:** make COPY CODE / PASTE CODE visible as a feature, with a preview and a code gallery.
   - **How:** after COPY CODE show a toast with the code string and "Copied". After PASTE, show a preview with Accept/Reject before it overwrites the slot (I did not test paste, but there is no sign of confirmation in the UI). Add online room support for custom tables, "daily custom table of the day", and a Workshop achievement ladder beyond "Table Maker". The Records screen shows "Tables played on 0/18" and Goals shows "Tables 13/18" as two different things; custom tables never count (see issue 9).
   - **Score impact:** +0.4.
5. **Make twist and power-up discoverability a first-class screen.**
   - **What:** a "Rules Lab" or encyclopedia, usable from Gallery, that tracks which twists, hazards, power-ups and cutlery I have tried.
   - **How:** Help EXTRAS is a text wall (shot-6) with a big empty block under Power-ups and no icons for twists or hazards. Make EXTRAS picture cards like BASICS (shot-5), each with a "TRY IT" button, a ✓ once tried, and a Records goal ("Try all 10 twists"). The Help hazards list omits Conveyor, Ice puddles, Wind direction art, and Workshop tools.
   - **Score impact:** +0.5.
6. **Settings needs more tinkering depth and a preview.**
   - **What:** more knobs, grouped, with a live test.
   - **How:** Settings is a flat list of 13 toggles (shot-2). Add grouping headers (Audio / Visual / Gameplay / Accessibility). Add: round time, belly-fill rate, KAIJU duration, bot aggression, a screen-shake slider (it is only ON/OFF), a colour-blind palette (only "Player numbers" exists), and a "reset to defaults" button. Add per-seat key labels shown in HOUSE RULES. Add a "mutator sandbox" where numbers are editable (house-rules cards).
   - **Score impact:** +0.5.
7. **Fix the text and layout slips (list in the table below).**
   - **What:** the Pantry toast, Gallery rewards clipping, lobby bottom line, Workshop chip overlap.
   - **How:** see issues 1-5.
   - **Score impact:** +0.3.
8. **Put the effect of a twist on-screen during the match.**
   - **What:** twists are shown as a tiny "⚡ MINI KAIJU + KAIJU FRENZY" label in the bottom-right (shot-25) and a 2-second banner. Add a pause-menu "ACTIVE RULES" list and a stronger colour treatment per twist (ice shimmer, mirror tint).
   - **Score impact:** +0.3.
9. **Keyboard rebinding for the menus and presets.**
   - **What:** let me rebind menu keys, save two profiles ("Couch" / "Solo"), and show conflicts as a list rather than only a one-line message that vanishes.
   - **Score impact:** +0.2.
10. **Make TRY IT understandable in the picker.**
    - **What:** the button reads "🧪 TRY IT: OFF". Say "TRY IT: tap a twist to play a free 30 s warm-up" and make the warm-up end itself with a "Keep this twist?" prompt.
    - **Where:** twist picker (shot-20) and the warm-up end.
    - **How:** the warm-up has no time limit and no end prompt; I had to Esc then QUIT then confirm QUIT again.
    - **Score impact:** +0.2.

## 🔍 Every issue I saw (exhaustive)
Severity: blocker / major / minor / polish.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | minor | Pantry | The toast "🍽 FIRST SERVICE ✔ Visit the 🛒 Pantry: +25 🪙" sits mid-screen over the "Win 5 matches" progress number ("1/5") and over the Peach colour card's price line. It stays there while I tap other things. | shot-31.png | Pin toasts to the top or bottom strip, or auto-dismiss in ~2 s. |
| 2 | minor | Gallery detail panel | Last line of "Rewards (Lv 2-6): ... 🔒 gold frame · 🔒 crown · 🔒 Shiny" runs to y≈686 and touches the panel's bottom border on a long power description (Squidgeon). | shot-28.png | Shorten the power text, or enlarge the panel and cap its lines. |
| 3 | minor | Workshop preview | The "✋ Giant hand" hazard chip (top right of the table) covers the top-right start-spot circle. | shot-12.png | Move the chip to the bottom-left row, or inside the title line. |
| 4 | minor | Phones-as-Pads lobby | A bottom line ("Room DHXP..." style text) is cut off by the panel and screen edge. The lobby also says both "Start (bots fill the seats)" and "Waiting for at least one friend to join...", which contradict each other. | shot-37.png | Shorten the lobby, reserve a footer line, and drop the waiting message when bots can start. |
| 5 | minor | Workshop | Surface change is not shown in the preview: status line says "Leftovers surface" but the art stays Sunday Roast wood with a fringed tablecloth, and the in-match table also looked like Sunday Roast. | shot-12.png, shot-14.png | Render the real surface texture in preview and match. |
| 6 | minor | Workshop | Prop palette labels (CUP, BOWL, CANDLE, ... "CHEESEWHEEL") are ≈11 px; "CHEESEWHEEL" almost fills its tile. | shot-10.png | 13+ px, shorten to "CHEESE". |
| 7 | minor | Workshop | There is no way to test or save without leaving: PLAY IT is a full 4-player match. The surface/hazard/props also say nothing about balance (a bumper placed near the edge could trap the start spot). | shot-12.png | Add ▶ TEST, and mark unsafe prop placements near start spots. |
| 8 | minor | Workshop | ✏ NAME does nothing visible in the harness (no text field appeared). I could not confirm the naming flow. The slot is still "My Table 1" afterwards. | shot-12.png | Use an in-canvas text field, not a browser prompt; show "Name saved". |
| 9 | minor | Records / Goals | "Tables played on 0/18" (Records) vs "Tables 13/18" (Goals, owned) are two different counters, and my 2+ matches on custom tables don't count towards either. | shot-33.png, shot-34.png | Rename "Tables played on" to "Tables tried", and count Workshop tables. |
| 10 | minor | Twist picker | Twist doubles are 9 fixed pairs only, so I cannot build my own (e.g. Fists + Boomerangs). The ⚡⚡ pairs are visually identical to each other except for the names. | shot-20.png | Multi-select, or a "build a double" tab. |
| 11 | minor | Twist picker | Description fonts are inconsistent: "Fists Only" and "Mirror Moves" descriptions are visibly smaller (≈12 px) than "Everyone starts each round ready to go KAIJU" (≈15 px). | shot-20.png | Fixed size, 2 lines per card. |
| 12 | minor | Twist picker | "🧪 TRY IT: OFF" gives no hint of what it does; a first-timer would not know it is a free warm-up. | shot-20.png | Add a subtitle. |
| 13 | minor | TRY IT warm-up | It never ends: no timer, no "Keep this twist?" prompt, and quitting needs Esc then QUIT then a second QUIT confirm (3 actions). A big empty space also holds "Practice Round 1" text. | shot-23.png, shot-24.png | Auto end at 45 s with "Use this twist ▶ / Try another". |
| 14 | minor | Free Play setup | Tables cycle through 6 Workshop slots even when empty ("MY TABLE 2 — Your own table (No hazard)", 0 props). Skipping 5 empties costs 5 clicks. | n/a (look text) | Skip empty slots in the table cycle. |
| 15 | polish | Free Play setup | Name mismatch: the setup card says "GOBZILLA JR." while the HUD, victory text and results say "GOBZILLA". | shot-18.png, shot-17.png | Pick one. |
| 16 | polish | Free Play / Party | Twist "MINI KAIJU + KAIJU FRENZY" selection kept two clicks mixing: my repeated clicks at the same coordinate (picker opens/closes) quietly changed the twist without any confirmation toast. | shot-19.png | Show "Twist set: ..." toast on pick. |
| 17 | polish | Help EXTRAS | Big empty block under POWER-UPS (y≈290-360) and only 4 power-ups; no picture icons for twists/hazards (unlike BASICS). | shot-6.png | Picture cards, fill the gap. |
| 18 | polish | Help TABLES | Locked tables are dimmed to near-unreadable, and 18 tables in one page need a bigger scale. | shot-9.png? (TABLES screen is shot-8.png) | Higher contrast for locked rows. |
| 19 | polish | Help EXTRAS | Missing Workshop props, Conveyor, Ice puddles, Daily/Spicy, and "Move Lab" help. | shot-6.png | Add a tab or section. |
| 20 | polish | Settings | 13 toggles in a flat 2-column list with no section titles; sliders for SFX/music show only 5 blocks (■■■■□). KID MODE description crams four effects in one line. | shot-2.png | Group; allow drag. |
| 21 | polish | Settings | "REDUCED EFFECTS" and "SCREEN SHAKE" are independent toggles; it is unclear which wins when both are on. | shot-2.png | Note it or link them. |
| 22 | polish | Keyboard Controls | No on-screen list of the reserved keys; a player has to guess ("G is used by the menus", "Z is used by the menus"). | shot-4.png | Show reserved keys. |
| 23 | polish | Keyboard Controls | Rebind feedback is a single grey line at the bottom (y 696, ≈14 px); easy to miss. | shot-3.png | Flash the row. |
| 24 | polish | Match results | The "THIS MATCH" receipt box sits over a kaiju at the bottom-left of the playfield and wraps close to the SHARE button. | shot-17.png | Move receipt to a side panel. |
| 25 | polish | Match results | "1 / START rematch · Esc menu" keyboard text shown even in mouse use; slight crowding with rank table. | shot-17.png | Context-aware prompt. |
| 26 | polish | Party Modes | First open of PARTY MODES lands on TEAM FEAST with 0 players joined and no PLAY target explained. | shot-35.png | Auto-join the first player. |
| 27 | polish | Party Modes | Setup chips are 11 buttons in one row; labels ("CUP LENGTH 6 GAMES") are small (~12 px). | shot-35.png | Two rows, 14 px. |
| 28 | polish | Daily preview | The card has a big empty gap between "Win streak" and the buttons, and it gives no hint of twists, hazards or power-ups. | shot-39.png | Show the rule set icons. |
| 29 | polish | Daily preview | "You play SLOBA" and "Table: Smoothie Bar" use content I have not unlocked. Not explained. | shot-39.png | Mark as "borrowed for today". |
| 30 | polish | Pause menu | The 2-step QUIT confirm is only a small line at y=150 above "PAUSED" (≈14 px) that is easy to miss. | shot-24.png | Turn QUIT red and say "TAP AGAIN TO QUIT". |
| 31 | polish | In-match HUD | The active twist label is bottom-right, 14 px, low contrast over the dark table edge. | shot-25.png | Larger chip next to the round title. |
| 32 | polish | Move Lab | Ink Cloud's blind/daze is invisible on a dummy; the dummy ended up 703 units away after two powers with no confirming message. | shot-30.png | Show an on-screen "BLINDED" tag. |
| 33 | polish | Trials | Trial cards give goals but not the twist's name chip, so I couldn't tell which Trials use which twists at a glance. | shot-41.png | Add a ⚡ chip. |
| 34 | polish | Workshop | "COPY CODE / PASTE CODE" are not described and their result was not visible; no confirmation. | shot-10.png | Toast and preview. |

(No issue was a blocker; one is major in effect for my profile: #5/#7, the Workshop being untestable and visually inaccurate. Counts by severity are at the end of this report.)

## 🔠 Text and layout check
- **Title** (shot-1): OK. The NEXT UP box is small (≈14 px) but readable.
- **Settings** (shot-2): OK. No overlap; subtitles ≈13 px.
- **Keyboard Controls** (shots 3, 4): OK; the feedback line at the bottom is small but fits.
- **Help BASICS** (shot-5): OK. The control summary text is ≈15 px and fits; the "Keyboard right: ... · /  swipe · R-SHIFT dash" line is fine.
- **Help CUTLERY** (shot-7): OK.
- **Help TABLES** (shot-8): OK. Locked rows are low contrast.
- **Help MODES** (shot-9): The TWISTS block at the bottom is ≈12 px and dense, but not cut off.
- **Help EXTRAS** (shot-6): large unused gap, no overlap. In Kid Mode (shot-43) the text is larger and all fits with no cut-off. Good.
- **Workshop** (shots 10, 11, 12): chip overlaps a start circle (issue 3). Palette labels small (issue 6). Everything else fits; the long hint line under the table wraps to 2 lines but stays inside.
- **Free Play setup** (shot-18): OK. The bottom hint two lines at y=652/660 sit close but do not overlap.
- **Twist picker** (shot-20): OK, no overflow; inconsistent font sizes (issue 11).
- **In-match HUD** (shots 14, 15, 25): OK. "BELLY FULL! PRESS E → KAIJU" overlays the table, fine.
- **Results** (shot-17): receipt overlaps a kaiju image (issue 24).
- **Gallery** (shots 27, 28): last reward line touches the panel border (issue 2). Otherwise OK.
- **Pantry** (shots 31, 32): toast over progress and card (issue 1).
- **Records** (shot-33): OK. Goals overlay (shot-34): OK, all text inside the box.
- **Party Modes** (shot-35): OK, small chip text.
- **Phones-as-Pads lobby** (shot-37): bottom text cut off (issue 4).
- **Daily preview** (shot-39): OK.
- **Challenges / Trials** (shots 40, 41): OK.
- **Pause** (shot-23): OK.

## The single biggest structural problem
The twist and customisation systems are broad but shallow, and they are not wired into progression. There are 10 twists and 9 hard-coded pair combos, and I could not make my own combinations. The Workshop's surface, hazard and props cannot be tested quickly, and the preview does not show the surface or hazard. Nothing rewards experimenting beyond one achievement ("Table Maker"). A Tinkerer wants a loop of "change a rule, test it in seconds, see the numbers, share it". Right now the loop is "change a rule, leave the screen, play a full 3-round match".

The second part is discoverability. Twists are explained in 3 different places (Help EXTRAS, Help MODES, the picker) as plain text, and there is no record of which I have tried. The game has all the pieces (TRY IT, Trials as twist showcases, Goals, Gallery mastery) but they are not joined.

## Big change proposals (2–3, most important first)
### Proposal 1: Rule Lab (a twist builder and tester)
- **Problem it solves:** I can't combine twists freely or test them in seconds; TRY IT warm-ups never end and give no feedback.
- **How it would work (detailed design):**
  - Free Play and Party get a RULES button (replacing TWIST). The screen has three columns.
  - Left column: the 10 twists as toggle cards with icons. Max 3 active; clashing ones (Fists Only with Giant Cutlery) grey out with a reason.
  - Middle column: sliders for the active twists (Turbo speed, Snack Attack multiplier, Ice friction, Bouncy bounce).
  - Right column: ▶ TEST (a 30 s 1v1 against a dummy on the chosen table) and a "stability score" showing, for example, "Wild" or "Balanced".
  - Presets are saved as "House Rules" slots, and these slots are exactly the existing 💾 HOUSE RULES button.
  - After TEST ends, a "Keep these rules?" prompt appears. Nothing changes the setup until I choose Keep. No coins and no unlocks from TEST, as now.
- **Example moment:** I switch on Mirror Moves + Ice Rink, set Ice to 150%, TEST for 30 s, laugh, and tap Keep. Then I name it "Chaos Skate" and play 4 players.
- **Rewards / progression hooks:** "Tried all 10 twists" and "Built 5 rule sets" achievements; Goals shows "Twists tried 6/10"; a weekly "rule set of the week" order in the Pantry.
- **Risks and edge cases:** combo balance; online rooms need the host's rules in the lobby (it already has a Twist chip); Mirror Moves "players only" stays flagged.
- **Size:** M
- **Score impact for me:** +1.0

### Proposal 2: Workshop 2.0 (accurate preview, test, rotate, share)
- **Problem it solves:** the preview does not show the surface or hazard; no fast test; no rotate, resize or mirror; sharing is invisible.
- **How it would work (detailed design):**
  - The preview renders the real surface art and the hazard's footprint: a Giant hand row band, a cleaver lane, ice puddles.
  - New tool row: ROTATE, RESIZE (S/M/L), MIRROR (left-right or 4-way), RANDOMISE, and drag-move.
  - ▶ TEST drops a single kaiju with 2 dummy bots for 45 s with R to reset and Esc to go back (props cannot be deleted in the test).
  - The NAME button opens an in-canvas keyboard dialog (and keyboard input).
  - COPY CODE shows the code in a modal; PASTE CODE shows a preview with Accept or Reject.
  - Each slot shows a thumbnail in the SLOT picker.
  - 12 props becomes 16 with an upgrade at Chef Rank (a goal).
- **Example moment:** I build a 4-way mirrored bumper arena, test it in 45 s, notice a bumper traps a start spot, nudge it, name it "Pinball", copy the code into the group chat.
- **Rewards / progression hooks:** "Table Maker" stays; add "Table Tester" (play 5 matches on your own tables), "Shared a table", "Played a friend's table". The Records stat for custom tables is counted under "Tables tried".
- **Risks and edge cases:** unsafe placements (blocked spawn, unreachable crumbs) need a validator that explains why; save-code size; online play needs the table data sent to guests.
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 3: The Rules Almanac (discover, try, and track)
- **Problem it solves:** Help EXTRAS is a text wall, the same twist text appears in three places, and the game doesn't record what I've tried.
- **How it would work (detailed design):**
  - Replace the Help EXTRAS tab and part of MODES with one Almanac tab (also linked from the Gallery) made of picture cards: 4 power-ups, 6 hazards, 10 twists, 8 cutlery, 5 modes.
  - Each card has an icon, a 1-line rule, a ✓ (tried) badge, and a ▶ TRY button which launches the existing TRY IT warm-up with that single element.
  - Hazards and power-ups need new tiny warm-ups (a 1v1 on a table where it appears 3 times in 30 s).
  - Progress shows as "Almanac 14/33" in Goals, and each completed section pays +15 🪙.
- **Example moment:** In Help I tap the Hot Cheese card, a warm-up drops 3 blobs, I get squashed, the card shows a ✓, and Goals says "Almanac 15/33".
- **Rewards / progression hooks:** Chef's Pass-like unlock ("Almanac complete" gives a colour); a weekly order "try 3 new elements".
- **Risks and edge cases:** warm-up scenarios for each hazard need careful scripting; cards must stay readable in Kid Mode (18 px minimum).
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **TRY IT as a free warm-up:** works exactly as promised (no setup change, no rewards). It needs an end condition and a better label (issues 12, 13).
- **Gallery detail and ✨ Shiny:** the panel no longer goes blank and the Shiny button shows "300 🪙 · needs Lv 3". One long power text pushes the rewards line to the border (issue 2).
- **Match receipt:** every unlock was on it (First Bite, Lime, Chocomunch, FIRST SERVICE step). Good.
- **Cup locks MODE / FIRST TO:** labels switch to "CUP PICKS" and "CUP SETS IT". Good.
- **Daily preview card:** opens a proper card with Spicy and Back. It is still thin on rule details (issue 28).
- **Pantry:** one-item confirmation works; the first-visit +25 🪙 is announced, but as an overlapping toast (issue 1).
- **KAIJU 7 s with HUD seconds:** the countdown ("KAIJU 3s!") reads well. The 7 s length feels right for solo play but all-four-KAIJU rounds under FRENZY get chaotic (shot-25 onward).
- **Round-start shield:** I didn't notice any unfairness on spawn.
- **Move Lab:** the dummy stands close and KAIJU doesn't run out. Ink Cloud's effect is hard to see (issue 32).
- **Gallery 📊 record:** "You vs it: 1–0" shown per kaiju. Nice.
- **Records ▸ GOALS:** readable and useful; the 📌 PIN buttons are clear. "Tables" naming clash (issue 9).
- **Party:** setup shows "⏱ ≈ 2 min". I didn't see a results screen for Party. Team Feast live RED–BLUE score worked. The bots-only room started (issue 4 about its text).
- **Help:** BASICS picture cards look great (shot-5). The new EXTRAS tab explains power-ups, twists and hazards but is text only (issue 17).
- **Text size and Kid Mode:** Help EXTRAS in Kid Mode (shot-43) has larger text with no overflow.
- **Workshop:** 🥞 sticky, 🧁 bakes and 🍅 bumper descriptions are present and clear. 6 slots and NAME exist, but I could not see NAME work (issue 8), and surface/hazard are not previewed (issue 5).
- **Not touched:** Story ("Meanwhile…" lines), Gauntlet boss waves and weekly best, Spicy Daily (+40), Gauntlet NEW RUN and the Giant Hand warning in a Gauntlet.

## Bugs that block play
- None. /errors stayed `none` through the whole session.
- Not blockers, but the things I'd fix first are the Workshop surface preview not changing (issue 5) and the lobby text cut-off (issue 4).

---
**Issue count by severity:** blocker 0 · major 0 · minor 14 · polish 20 (34 total).
