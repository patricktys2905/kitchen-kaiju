# Playtest evaluation — The Tinkerer (profile 7, round 10, port 7107)

**Fun score: 7.0 / 10** (the twist picker, Try It, hazard blurbs, key rebinding and Workshop are good, but nearly every prop does the same thing, setup choices leak or get overwritten, and some screens contradict each other)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7107\` as `shot-N.png` (N shown below).

## What I did
- About 108 harness commands, 37 screenshots, all opened and checked. `/errors` at start, middle and end: none.
- Title (shot-1), Settings (shot-2, 5), Keyboard Controls (shot-3, 4), Table Workshop (shot-6, 7), Free Play setup (shot-10), Twist picker (shot-11), House Rules (shot-16), Gallery and Move Lab (shot-19 to 21), Pantry (shot-22), Challenges and Trials (shot-23, 24), Party Modes setup and Party Cup (shot-25 to 28), Daily (shot-29, 30), Records (shot-31), Help tabs (shot-32 to 35), Practice (shot-36, 37).
- Settings: toggled Music, Name Tags, Kid Mode and Player Numbers.
- Keybinds: rebound Move right to J. A key already in use swapped over. Esc cancelled. RESET TO DEFAULT worked.
- Workshop:
  - Read the blurb for all 16 props.
  - Placed bumper and cakes, tried to place a prop on a start spot (refused), used UNDO, COPY CODE and PASTE CODE.
  - Cycled all 8 surfaces and all 6 hazards.
  - Switched slots, then PLAY IT with a Cleaver (matches below).
- Matches:
  - Workshop table, 4 players, KO'd by the cleaver.
  - Try It: Bouncy Castle (won), Fists Only (won), Mirror Moves (quit early).
  - Normal bots on Diner Griddle: went KAIJU and used the power.
  - Move Lab (stomp and power).
  - Daily Hot Dumpling (lost round 1 to a swipe).
  - Practice.
- Total: 2 recorded matches (both Try It wins) and 4 partial matches.
- Tried POWER-UPS and HAZARDS off, TABLE cycling, Party Cup on, and PHONES AS PADS (it opened a lobby with a QR code).

## What worked for me
- **Hazard blurbs in the Workshop.** Cycling HAZARD shows a clear line each time, e.g. "Cleaver: a red line warns, then a cleaver chops down across it." and "Giant hand: ... (DASH as it arrives to dodge)." The cleaver then did exactly that in the match, and the death line "You went out at 15s: the cleaver" is great feedback.
- **Prop blurbs update on tap** ("BUMPER: kicks any kaiju that touches it away hard (great near edges)", shot-6).
- **"Keep the start spots (circles) clear."** appears when you try to place on a start spot (shot-7).
- **Twist picker (shot-11).** 11 singles and 7 doubles, each with a one-line explanation. TRY IT gives a 1-round trial vs an easy bot. It also paid "Plot Twist +30" and a shiny "First Bite" popup, so trying twists is rewarded.
- **Keybinds.** The swap-on-conflict message is clear ("Left player UP = J. A key already in use swaps over."), Esc says "Cancelled." and reset works.
- **House Rules slots (shot-16).** Three slots plus a copy code, with a readable summary: "Classic · first to 1 · ⚡mirror · easy bots".
- **Practice banner (shot-37)** shows the current step and "(+6 more)". Seat is marked "▼ YOU".
- **Party Cup greys MODE and FIRST TO** and says "CUP PICKS" and "CUP SETS IT" (shot-26).
- **KAIJU warning ring.** A red ring plus a yellow growing ring, and "KAIJU! THROW / SWIPE: SEED SPRAY" (shot-17, 18). The reach is readable.
- **Lines that help understanding:** "TABLE: MY TABLE 1 — Your own table (Cleaver)." in setup, and the Daily medal line "win without losing a round +40" (shot-29).

## 🧾 Exactly what would make this a 9/10 for me
1. **Make props behave differently.** (+0.8)
   - what: 14 of 16 Workshop props read "a solid small/medium/big block"; only BUMPER differs.
   - where: Table Workshop props, plus the in-match tips.
   - how: give at least 6 props their own rule.
     - Teapot: pours a puddle slowing kaiju when hit.
     - Cake: crumb spawner, 1 crumb per 4 s.
     - Gift: pops a power-up when shoved.
     - Candle: hot, 1 s dazed burn on touch.
     - Pot: launcher or teleporter pair.
     - Lollipop: sticky.
     Keep the rest as blocks, and label each blurb with a tag, e.g. "BLOCK", "BOUNCE", "STICKY", "SPAWNER".
2. **Do not overwrite my Free Play setup after Try It.** (+0.5)
   - what: after one Try It round the setup screen kept FIRST TO 1, TWIST MIRROR MOVES, TABLE SUNDAY ROAST and dropped 3 bots (shot-16).
   - how: Try It must use a temporary config and restore the previous setup on return to the menu.
3. **Make the setup toggles real everywhere.** (+0.5)
   - what: Party setup said POWER-UPS OFF and HAZARDS OFF, but the Phones-as-Pads room showed "Power-ups: ON", "Hazards: ON" (shot-28). Also "TABLE: ALL 16" on setup, "ALL 13" in the lobby, "13/18" in Gallery and Help.
   - how: one source of truth for table counts (label "16 playable of 18; 13 owned" or one number), and carry all toggles into the lobby.
4. **Explain what HAZARDS OFF does to a table that is its hazard.** (+0.3)
   - what: "My Table 1 (Cleaver)" and "Chef's Board" blurbs promise a cleaver while HAZARDS is OFF.
   - how: when OFF, the blurb says "(hazard off)" and the Workshop PLAY IT should warn that the hazard will not run.
5. **Explain surfaces and the new twists on tap.** (+0.3)
   - what: cycling SURFACE changes the name only (8 surfaces), and the explanation line keeps the previous prop's text ("CAKE: a solid big block", shot-7). Surfaces like Ice Cream (slippery) or Bakery (sticky) are not described.
   - how: show "Surface: Picnic Blanket — ant trail carries things sideways" on cycle.
6. **More customisation depth.** (+0.5)
   - what: only 3 Workshop slots, no table rename, props limited to 12, no twist or rule combos saved with a table.
   - how: 8 slots, a rename box, 16 props, and save the twist and hazard timing with the table (see Proposal 1).
7. **Fix the layout bugs.** (+0.3)
   - Help Tables footer overlaps "Diner Griddle", and the bottom rows are cut off (shot-33).
   - The lobby's bottom line is cut (shot-28).
   - "▼ YOU" overlaps the kaiju name tag (shot-15, 37).
8. **Correct the in-game tips.** (+0.2)
   - "The giant hand goes for whoever has the fullest belly." appeared on Picnic Blanket (ants) in the Daily (shot-29) and on a Bouncy Castle Try It (shot-12). Tips should match the table's real hazard and the active twist.
9. **A keybinding that also covers menus and Help.** (+0.2)
   - Help CONTROLS lines are static text; the Settings screen has no gamepad remap at all.
10. **Make Help describe POWER-UPS and the hazards.** (+0.2)
    - Help Modes lists twists in tiny type and never explains the POWER-UPS toggle or the hazard list (shot-35).
11. **Bouncy Castle states "nobody falls off", but a swipe KO'd a rival** ("SQUIDGEON knocked out by YOU (swipe)"). Say what actually KOs on the castle, or let it KO only by fall (+0.1).
12. **Kid Mode should visibly change Settings text** (shot-5 looks identical to shot-2) (+0.1).

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Workshop props | 14 of 16 props have the identical blurb "a solid X block. Cutlery and kaiju bounce off it…" | shot-6 | Distinct behaviours, see Proposal 1 |
| 2 | major | Free Play setup after Try It | Setup keeps the Try It's FIRST TO 1, TWIST MIRROR MOVES, TABLE SUNDAY ROAST, 2 players (bots removed) | shot-16 | Restore prior setup after Try It |
| 3 | major | Party setup to Phones-as-Pads lobby | Setup had POWER-UPS OFF and HAZARDS OFF; the room shows "Power-ups: ON", "Hazards: ON" | shot-28 | Carry settings into the room |
| 4 | major | Table counts | Party setup "TABLE: ALL 16"; lobby "TABLE: ALL 13 (rotate)"; Gallery "13/18"; Records "Tables visited 3/18" | shot-25, 28, 19, 31 | One agreed count, explain "owned" vs "playable" |
| 5 | major | Help > Tables | Footer "You own 13/18 tables (Workshop tables are extra)" overlaps the "Diner Griddle" label; bottom rows cut at the screen edge | shot-33 | Move footer below the grid / allow scroll |
| 6 | minor | Party lobby (Phones as Pads) | Bottom line is clipped by the box edge ("Press START…" half visible) | shot-28 | Add padding / reduce the box |
| 7 | minor | Party setup with Cup ON | Subtitle says "Eat the most crumbs before time runs out" and the first-to line says "First to 5 rounds" while FIRST TO says "CUP SETS IT" and MODE says "CUP PICKS" | shot-26 | Show "Party Cup: 6 games, each its own rules" |
| 8 | minor | Workshop surface cycling | Info line keeps the previous prop text; surfaces are not explained | shot-7 | Show a surface description |
| 9 | minor | Workshop | Table cannot be renamed ("My Table 1/2/3"); only 3 slots; PASTE CODE showed no clear success/failure in my run (clipboard empty) | shot-6 | Rename, 8 slots, "Paste failed: no code found" message |
| 10 | minor | Workshop | First SURFACE click jumps straight past a visual preview in the corner label only | shot-6 | Preview thumbnail with name |
| 11 | minor | Match tips | "The giant hand goes for whoever has the fullest belly." shown on Picnic Blanket (ant trail) and on a Bouncy Castle Try It | shot-12, 29 | Tip must match the table's hazard |
| 12 | minor | Table descriptions | "TABLE: CHEF'S BOARD — The cleaver chops…" is shown with HAZARDS OFF without saying it will not chop | setup | Add "(hazards off)" |
| 13 | minor | Name consistency | Gallery and setup say "GOBZILLA JR."; HUD and match say "GOBZILLA" | shot-10, 19, 8 | Use one name |
| 14 | minor | Try It results | Try It rounds count toward Matches played and won (Records show 2/2 100% after two 1-round Try It wins) and pay +79 tokens | shot-13, 31 | Exclude from stats or cap rewards |
| 15 | minor | Bouncy Castle | "nobody falls off" but "SQUIDGEON knocked out by YOU (swipe)" happened | shot-12 events | Clarify or cut the KO |
| 16 | minor | Mirror Moves Try It | I could not confirm the mirroring through the harness (move:1,0 went right). Player starts at right | shot-15 | Verify the harness, add an in-match "MIRRORED" arrow cue |
| 17 | polish | Match HUD | "▼ YOU" marker overlaps the kaiju's name tag | shot-15, 37 | Offset the marker above the tag |
| 18 | polish | KAIJU moment | The "FIRST SERVICE ✓ +20" toast sits over the kaiju's top and its name | shot-17 | Move toasts to the top-right |
| 19 | polish | Twist picker | Mixed text sizes: "Left is right and up is down (players only)" and "No cutlery at all…" are visibly smaller than the other blurbs | shot-11 | Shorten the text |
| 20 | polish | Twist picker | Opening it twice quickly with Try It: the second click on the same spot silently picked a twist ("MINI KAIJU + KAIJU FRENZY") | setup | Ask for confirmation or close the picker first |
| 21 | polish | Twist picker | Last row of the grid is empty ~230 px; the picker has no scroll or category labels | shot-11 | Group Singles/Doubles with headings |
| 22 | polish | Trials | Typo "boom-rang twist" (Chef's Table) | shot-24 | "boomerang" |
| 23 | polish | Help > Modes | Twists are a tiny wall of text; POWER-UPS are not explained at all | shot-35 | Table with icons |
| 24 | polish | Help > Basics | Dense paragraphs at small size, no icons | shot-32 | Short bullets |
| 25 | polish | Settings | Kid Mode ON looks identical on Settings (text not bigger) | shot-5 | Apply Kid Mode scaling to Settings too |
| 26 | polish | Settings | No gamepad or touch remap; KEYBOARD CONTROLS is a sub-page; no per-player profile | shot-2 | Add gamepad mapping |
| 27 | polish | Pantry | "Chef Rank" block uses a different heavy font than the rest of the panel | shot-22 | Match fonts |
| 28 | polish | Daily | No preview screen: the tap starts the match immediately, no chance to see the rules before | shot-29 | Add a short rules card |
| 29 | polish | Hot Dumpling event feed | "PIZZARAPTOR went KAIJU / knocked out (boom)" is confusing: the dumpling's pop reads like a KAIJU kill | shot-30 | Say "popped by the dumpling" |
| 30 | polish | Results panel | "THIS MATCH" box sits on top of a cup and a kaiju and is dense | shot-13 | Slightly larger panel with spacing |
| 31 | polish | Challenges | Twists in the Gauntlet/Trials cannot be tuned. Trials are fixed combos | shot-24 | "Custom Trial" from Try It |

## 🔠 Text and layout check
- **Title** (shot-1): OK. "NEXT UP" box small but readable.
- **Settings** (shot-2, 5): OK. Descriptions small but readable; no overlap.
- **Keyboard Controls** (shot-3, 4): OK.
- **Workshop** (shot-6, 7): OK. The help line wraps over 2 lines; fine. The surface label on the table is small.
- **Free Play setup** (shot-10): OK. Bottom bot-difficulty lines are tiny, but legible.
- **Twist picker** (shot-11): PROBLEM — blurb font sizes vary, a big empty area under it.
- **House Rules** (shot-16): OK.
- **Gallery** (shot-19): OK. "Rewards" line small but legible.
- **Pantry** (shot-22): OK, with the font mismatch noted.
- **Challenges / Trials** (shot-23, 24): OK.
- **Party setup** (shot-25, 26): OK visually; wording is wrong (issue 7).
- **Lobby** (shot-28): PROBLEM — bottom text is cut.
- **Daily intro** (shot-29): OK, readable over the table.
- **Match HUD** (shot-8, 9, 12, 13, 15, 17, 18, 30, 37):
  - OK overall.
  - "▼ YOU" overlaps the name tag, and the toast overlaps the kaiju (shot-17).
- **Records** (shot-31): OK.
- **Help** (shot-32 to 35): Tables has the footer overlap and bottom clipping (shot-33); Basics and Modes are very small and dense.

## The single biggest structural problem
The tinkerer's toys are shallow and do not stick. The Workshop looks rich (16 props, 8 surfaces, 6 hazards) but 14 props are the same rectangle, and surfaces have no explained effect. A built table cannot be shared with its twist, and Try It overwrites the setup I had built. The variety ends up being the 11 twists plus 6 hazards. Everything else is cosmetic, so there is no reason to spend an hour tweaking.

Second, the setup state is not trustworthy: it changes behind my back and between screens (toggles lost in the lobby, three different table counts). A tinkerer relies on the screen telling the truth.

## Big change proposals (2–3, most important first)
### Proposal 1: Prop and surface "rules" (make the Workshop a rules sandbox)
- **Problem it solves:** props are visually different but all behave as blocks.
- **How it would work (detailed design):** each prop gets one of 5 tags shown in its tile and blurb: BLOCK (cover), BOUNCE (bumper), STICKY (syrup, slows 50%), SPAWNER (cake: 1 crumb per 4 s, cupcake: cutlery), TRIGGER (gift: pops a power-up when shoved, pot: swaps places with its twin). Surfaces get a modifier too: Picnic = ants carry things, Ice Cream = slippery, Bakery = slow. Show "Surface rule" on cycle. A table's score row shows "Fairness: 3 sticky, 1 bounce".
- **Example moment:** I place two pots at the corners, shove a rival in one and pop out the other side, near the edge; a bumper by the exit makes it dangerous.
- **Rewards / progression hooks:** unlock new prop rules from Mastery or Pantry; "Workshop Architect" achievement for beating 3 bots on your own table.
- **Risks and edge cases:** unfair tables (spawners next to a start spot): keep the 'clear start spot' rule and a radius for every rule; online sync of props (send props and tags in the table code).
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 2: Non-destructive "Test Lab" that remembers my setup
- **Problem it solves:** Try It clobbers the setup, and there is no one place to try twist x hazard x table.
- **How it would work (detailed design):** Try It runs a temporary config (1 round, EASY bot) and returns me to the same setup. A "TEST LAB" strip on the setup screen: pick twist, hazard, table, power-ups, then "TRY 1 ROUND", "SAVE AS HOUSE RULE", "SHARE CODE" (all on one screen). House Rules summaries include table, twist, hazard and power-up state. Add a small "recent tests" list (last 5).
- **Example moment:** I try Ice Rink + Turbo on My Table 2, like it, press SAVE and name it "Slip n Slide". Back at setup, my 4-player line-up is untouched.
- **Rewards / progression hooks:** each new twist x table combo tried counts toward "Mad Scientist" (try 20 combos, 100 tokens); tokens for Try It are capped so it cannot be grinded.
- **Risks and edge cases:** stats pollution (do not count test matches); lobbies must read the saved setup, not the temp one.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Honest setup everywhere (one config object, one summary line)
- **Problem it solves:** setup toggles vanish in the lobby; table counts disagree; Cup subtitle contradicts the buttons.
- **How it would work (detailed design):** the setup screen, the lobby and the Help screen all read from one config. A summary line under the title lists every active rule ("Classic · 4 players · Normal bots · First to 3 · Ice Rink · Power-ups off · Hazards off · Table: All 13 owned"). When a toggle makes a table's blurb wrong, the blurb appends "(hazard off)".
- **Example moment:** I switch HAZARDS OFF and the table blurb shows "Chef's Board — cleaver off". Opening the lobby shows the same line.
- **Rewards / progression hooks:** none, it is trust and polish.
- **Risks and edge cases:** Party Cup has its own rules per game; show "Cup picks".
- **Size:** S
- **Score impact for me:** +0.5

## How this round's new features felt
- **🦖 KAIJU warning ring:** good. The red pulsing ring plus the yellow ring read clearly (shot-17, 18) and the "KAIJU! THROW / SWIPE: SEED SPRAY" prompt is helpful. Bots did not squash me in the first 1.8 s. The "FIRST SERVICE ✓ +20" toast over the kaiju spoils the shot a little.
- **🏁 Gauntlet / 🎟 Chef's Pass:** I only read the Challenges and Trials screens (shot-23, 24). "CHEF'S PASS: 0/12 Trial ★ or Gauntlet wave 0/8" is clear and the Trials list is readable (not played).
- **🏆 Party Cup:** greying of MODE / FIRST TO works and the labels say "CUP PICKS" and "CUP SETS IT". But the subtitle ("Eat the most crumbs…") and the "First to 5 rounds" line still describe a single mode. I did not play a full Cup.
- **🧸 Kid Mode:** I toggled it on Settings; it did not make the Settings text bigger (shot-5), though the description claims "bigger text". Not tested elsewhere.
- **📖 Gallery:** 🪙 balance in the header is present (163, shot-19). Move Lab works (stomp and power, Esc returns to Gallery). I did not buy a Shiny.
- **🏅 Records:** pinning works and unpins on a second click; I did not see the footer change after a match. The footer text switches between "Next up" and "Pinned" (shot-31).
- **🎓 First-timer:** the Practice banner shows the current step and "(+6 more)" and the seat is marked "▼ YOU" (shot-37). The marker overlaps the name tag.
- **⚡ Twist picker + 🧪 TRY IT:** the best new feature for me. One tap gives a quick round. It is wonderful for trying twists, but it overwrote my setup, and the same-spot repeated tap silently picked a twist.
- **🛠 Workshop:** picking a prop and cycling hazards explains what each does; props themselves are mostly "solid block" (issue 1), and surfaces are not explained.
- **📅 Daily:** the medal line "play +10 · win +20 · win without losing a round +40" shows up at the start (shot-29). I did not check how it changes after earning a medal.
- **Text and layout audit:** found the Help > Tables overlap and the lobby clip (above).

## Bugs that block play
- None blocked play. No JavaScript errors in `/errors` (checked 3 times).
- The nearest to blocking: Try It overwrites the Free Play setup (issue 2) and the lobby ignores the toggles (issue 3).
