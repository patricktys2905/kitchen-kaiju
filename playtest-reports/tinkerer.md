# Playtest evaluation — The Tinkerer

**Fun score: 6.5 / 10** — There are lots of dials (10 twists, 16 tables, hazards, power-ups, a Workshop), but they are all single-pick toggles, and nothing I build or configure is saved, shared, ranked or rewarded.

> I used about 55 harness commands on build v2026-11-18-6da0f95.

## What I did
- Title -> SETTINGS (read all toggles/sliders), KEYBOARD CONTROLS screen (Escape from there returned to Settings, fine), then WORKSHOP.
- Workshop: placed 6 props (cups, one bumper) from 8 clicks, cycled SURFACE (Sunday Roast -> Dinner for Four), cycled HAZARD (No hazard -> Giant hand -> Wind gusts), SAVE (toast "Table Maker unlocked!"), opened slot 2/3 (empty), then PLAY IT. Played "My Table 1" with Wind gusts (I was idle and got knocked out within about 30 s; BLOBLIN won 3-0; shot-4/5).
- Free Play setup: cycled all 10 TWISTS (Kaiju Frenzy, Turbo, Boomerangs, Giant Cutlery, Ice Rink, Snack Attack, Fists Only, Bouncy Castle, Mirror Moves, Mini Kaiju), cycled all 16 TABLES, toggled power-ups/hazards, pressed RANDOM. Played Ice Rink on Breakfast Rush (shot-7: ice streaks, sliding kaiju).
- Party Modes: Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon (played it, shot-10: banner "BLOBLIN HAS THE GOLDEN SPOON", HUD "0/15s"), plus Party Cup / CUP LENGTH buttons seen. Won one Golden Spoon match (6 KOs, autoplay).
- Gauntlet: wave 1 cleared, saw the perk pick (Full Belly / Mustard Coat / Sugar Rush), hearts shown. Gallery header seen (Collection 68%, 16/20 kaiju, 15/18 tables, 5/15 colours).
- About 5 matches total (1 manual Workshop, 3 autoplay, 1 Gauntlet wave, plus manual act loops), 1-2 wins. /errors: none at start, middle and end.

## What worked for me (briefly)
- Twists genuinely change how a match feels and are labelled in the HUD (bottom right "ICE RINK"). Ice Rink and Boomerangs stood out.
- The Workshop is intuitive: tap a prop, tap the table, white circles show start spots, 3 save slots, instant PLAY IT.
- Settings rows all have a one-line explanation, and Name Tags, Player Numbers and Classic powers are good accessibility/variety options.
- Golden Spoon reads instantly (banner plus per-player "x/15s" HUD, "STOLEN!" popup). The Gauntlet 1/2/3 perk pick is a nice mini-build moment.
- Zero JS errors.

## The single biggest structural problem
**Customisation is shallow and siloed: every variety knob is a single-choice toggle, and nothing I configure persists, combines, or earns anything.** I wanted to build "my" game: Ice Rink plus Boomerangs plus Mini Kaiju on my own Workshop table with a Giant Hand, vs hard bots, and then keep that set-up. The Free Play screen allows ONE twist at a time (TWIST cycles NONE -> 10 options -> NONE). Hazards are a bare ON/OFF there, while the Workshop has a separate, different hazard list (No hazard / Giant hand / Wind gusts). 🎲 RANDOM gave no visible feedback (on the Party screen the line still read "TWIST NONE"). Match set-ups are not saved, named, shared or tracked, and the Workshop is not reachable from Gauntlet or Story. The Workshop also has no progression: its only reward ("Table Maker") fired on my first save of a nearly empty table, so after 5 minutes I had seen the whole feature.

For a tinkerer, variety is the game's best asset, but the structure gives me no way to multiply it, so the 10 twists x 16 tables x modes space is mostly unseen.

## Big change proposals (2–3, most important first)

### Proposal 1: House Rules (stackable twists, dials, presets, shareable codes)
- **Problem it solves:** One twist at a time; hazards on/off only; no saved set-ups; RANDOM gives no feedback (all on the Free Play and Party setup screens).
- **How it would work (detailed design):**
  - Replace the TWIST button with a **HOUSE RULES** button on Free Play and Party setup. It opens a full-screen panel: left column = the 10 twists as toggle chips (up to 3 active at once), right column = match dials.
  - Dials (left/right steppers): Round time (30/45/60/90 s), Belly fill speed (0.5x/1x/1.5x/2x), KAIJU duration (5/8/12 s), Cutlery spawn rate (Sparse/Normal/Plenty), Knockouts per round (1/2/3 lives), Shove strength (0.7x/1x/1.5x), Power-up frequency (Off/Rare/Normal/Chaos), Hazard (Off / Giant hand / Wind gusts / Both / Random). This also unifies the Workshop's hazard list with Free Play's.
  - Stacking rules: conflicts are blocked with a tooltip (Fists Only blocks Boomerangs and Giant Cutlery; Mini Kaiju + Giant Cutlery allowed because it is funny; Turbo + Ice Rink allowed). A "CHAOS" meter at the top sums 1-3 points per rule and shows a tag: Chill / Spicy / Unhinged / Cursed. Cap at 10.
  - Presets row at the bottom: 8 curated bundles ("Slippery Sushi" = Ice Rink + Boomerangs; "Tiny Terrors" = Mini Kaiju + Turbo + Bouncy Castle; "Bare Knuckle" = Fists Only + both hazards). Plus 5 named "My Rules" save slots.
  - Rules code: a ~10-character code (e.g. `IR-BM-MK-T45-H2`) that can be typed into Online lobby, Party setup and Daily. Online host's rules apply to everyone and show on the pre-match card.
  - RANDOM becomes "ROLL THE DICE": chips light up in sequence, then a pre-match card "Tonight's rules: ICE RINK + MINI KAIJU, 45 s" shows for 2 s.
  - A 3 s rules card is shown above the countdown in every match (today only Quick Tips are shown there).
- **Example moment:** I open House Rules, toggle Ice Rink + Mini Kaiju, set belly fill 2x; the meter reads "Unhinged 7". I save it as "Zoomies" and hit PLAY. Everyone is tiny and sliding, the belly fills in 5 s so everybody goes KAIJU (still tiny) at once. The results screen says "ZOOMIES: played 3 times, best: YOU 9 KOs". I copy the code and text it to a friend who pastes it into the Online lobby.
- **Rewards / progression hooks:** Achievements "Rule Breaker" (win with 3 twists on), "Chaos Gourmet" (win at chaos 8+), "Every Flavour" (win with each of the 10 twists; show 7/10 progress like the Gallery does). A new colour (e.g. "Sprinkle") for it. A Gallery tab "Rulebook" listing each twist with your wins. A "Rules of the Week" preset on the title NEXT UP line.
- **Risks and edge cases:** Broken combos (Turbo + Fists Only + Kaiju Frenzy = constant stomping); chaos cap plus a conflict list. Phones: chips and steppers must be big-touch. Online: validate the code version, show "update needed" for unknown ids. Gauntlet and Story keep fixed rules (grey the panel with a note). Records: only count Standard rules toward crumbs/KOs or label clearly, because "Plenty cutlery" inflates numbers.
- **Size:** L. Touches Free Play/Party setup, match config (twist becomes an array), Online lobby sync, save data (slots), Records, Gallery.
- **Score impact for me:** +1.0. It turns existing content into 100+ combinations and gives my set-ups an identity.

### Proposal 2: Workshop 2.0 — tables as first-class, shareable, rewarded content
- **Problem it solves:** I built a table in a few clicks and it vanished into a slot with no reason to return; the only feedback was "Table Maker unlocked!". 8 clicks produced 6 props with no message about the other 2. I could not use my table in Party Modes or Gauntlet, the results screen did not name it, and Wind gusts killed an idle player quickly, which suggests there is no test step. 16 props and a 12-prop cap, with no prop behaviours.
- **How it would work (detailed design):**
  - Editor depth: a tap-to-select inspector with 4 prop behaviours: SOLID (current), BOUNCY (bumper/gumdrop launch), SLIPPERY (ice patch), STICKY (jam, slows 40%). New SPAWNER prop drops one cutlery every 6 s. New HOLE prop is a KO tile.
  - Prop cap 12 -> 20, rising with Workshop level (see rewards). Table SHAPE: Rect / Round / Plus / Two islands joined by a bridge.
  - Symmetry toggle (mirror L-R, mirror 4-way) so fair 4-6 player layouts take 10 s. Undo button (none today).
  - TEST WITH BOTS: a 30 s sandbox vs 1 hard bot with a verdict line ("Spawn reach crumbs in 2 s OK / spawn 3 is trapped X"). SAVE warns on unreachable start spots.
  - Slots 3 -> 12, with an on-screen name editor.
  - Use anywhere: the TABLE selector in Free Play, Party Modes and Online gets a "MY TABLES" group. Add "Custom Gauntlet" (chain 5 of your tables) and Time Attack (KO N bots fastest) with a personal best per table.
  - Share: COPY TABLE CODE (~60 chars) and IMPORT. Online host can pick an imported table; guests download it automatically. Later: a curated "Table of the Day".
- **Example moment:** I mirror-draw a Plus table with 4 corner spawners and a bouncy centre. TEST WITH BOTS says "Spawn 3 is blocked", I move a prop. Save as "Pinball Pit", play 3 bot matches; its Workshop card shows "Played 3 · avg 52 s · your KOs 14". A friend plays it online, taps a thumbs-up, and my Workshop level bar fills.
- **Rewards / progression hooks:** Workshop Level 1-10 from matches played on own tables and thumbs-ups. L3 unlocks Spawner, L5 Hole, L8 Round shape. Gallery tab "Workshop". Achievements: "Architect" (10 tables saved), "Crowd Pleaser" (25 thumbs-ups), "Home Advantage" (beat hard bots on your own table).
- **Risks and edge cases:** Unwinnable layouts (Test run plus reachability check). Online: no free-text titles (numeric ids) to avoid moderation. Table code versioning. Phones: 20 props need big tap targets and undo. Performance: spawners + 20 props with 6 players.
- **Size:** L to XL (editor, new prop physics, spawners, code format, Online sync, test-bot sim).
- **Score impact for me:** +0.9. Today the Workshop is a 5-minute toy; with sharing, testing and levels it becomes a reason to return.

### Proposal 3: Mutator Ladder — a solo run mode built from stacked twists
- **Problem it solves:** Twists exist only as a Free Play toggle. Gauntlet is the only "run" structure and my wave 1 was a plain 1-rival fight on Picnic Blanket with no twist. There is no mode where twist variety is the content.
- **How it would work (detailed design):**
  - New title tile (or a tab inside Gauntlet): **MUTATOR LADDER**, 10 rungs, each a single round vs 1-3 bots.
  - Before each rung, pick 1 of 3 mutator cards (twists, same 1/2/3 card UI as the Gauntlet perk pick). Picked mutators STACK for the run, so rung 5 has 4 active twists. Every 3rd rung (3, 6, 9) gives the bots a boss mutator you cannot refuse.
  - Each mutator carries a Heat value (Turbo +10%, Giant Cutlery +15%, Fists Only +25%) that raises the end-of-run score multiplier. You may Skip a card for a "Pure" rung with 0% bonus.
  - A Relic every 3 rungs (reuse Ghost Start, Extra Life, Mustard Coat; add counters such as "Ice Skates: immune to Ice Rink sliding").
  - 3 lives (hearts as in Gauntlet). Rung 10 = "Chaos Final": 3 random mutators, 2 hard bots.
  - Flow: Title -> MUTATOR LADDER -> kaiju pick -> rung card -> 3 s rules card -> match -> result card (Heat %, stack icons) -> next rung ... -> run-end screen with score, time, stack list and a seed for rematch. Save-and-quit between rungs.
- **Example moment:** Rung 4. My stack is Ice Rink + Boomerangs + Mini Kaiju; offered Turbo (+10%), Giant Cutlery (+15%) or Skip. I take Giant Cutlery and a giant boomerang sails across the slippery table at tiny me. I dash, it slams a rival off the edge. Boss rung 6 gives the bots Bouncy Castle and my Extra Life relic saves the run.
- **Rewards / progression hooks:** Heat tokens at run end unlock 12 start-of-run options (starter relics, extra mutators in the pool). New colour (e.g. "Molten Lemon") at Heat 500%. A daily seed (same offers for everyone) with a local top-10. Records: best Heat, deepest rung per kaiju.
- **Risks and edge cases:** Soft-lock combos (Fists Only + Mirror Moves) need Proposal 1's conflict list. Bots must handle every twist (hard bots on Ice Rink/Boomerangs should not stand still). Target 12-15 min per run. 2-player couch co-op could share lives. Cap the multiplier so skipping is not exploitable.
- **Size:** L. Reuses the Gauntlet run engine, perk-card UI and twist system (array support from Proposal 1), Records, daily seed.
- **Score impact for me:** +0.7. It turns twist variety into a progression loop and an excuse to try them all.

## How the new features from this round felt
- **STOMP coach:** I did not get a screenshot with the bouncing prompt, so I can't judge it in depth. The Gauntlet HUD showed "STOMP READY!" on my kaiju card, and `stomp` below full belly did nothing, which is right.
- **KAIJU counterplay (ring / shrink flash / dizzy):** Not seen directly (my KAIJU never appeared in a screenshot). Bloblin used KAIJU 6x in one match, so it is frequent; a bigger version should check these cues stay readable with Mini Kaiju / Kaiju Frenzy twists and 6 players.
- **Gallery progress:** The header "Collection 68%, 16/20 · 15/18 · 5/15" is a good overview. The title NEXT UP line ("Minturtle: Score 25 knockouts -> Grape colour (60%)") changed as I played (Lime -> Lava -> Grape): a strong hook. A bigger version would add tinkerer goals to it ("Win with 3 different twists -> Sprinkle colour").
- **Gauntlet lives:** Hearts and perk cards work, but wave 1 was a plain 1v1 with no twist; Gauntlet is a natural home for mutators (Proposal 3).
- **Golden Spoon / CUP LENGTH:** Golden Spoon is clear and funny (shot-10). The Party MODE button cycles Team Feast -> Crumb Rush -> Hot Dumpling -> Golden Spoon -> Classic -> wrap, so plain Classic sits under "Party Modes", which felt odd. CUP LENGTH (6 GAMES) exists; I did not run a full cup in budget.

## Bugs that block play
- None. /errors was "none" at start, middle and end.

## Small notes (max 5, one line each)
- 🎲 RANDOM on the Party screen gives no visible feedback (TWIST still read NONE afterwards).
- Workshop: 8 placement clicks produced 6 props with no message about rejected/overlapping placements, and there is no undo.
- Workshop SAVE fired "Table Maker unlocked!" on an almost empty table.
- The Party Cup description line (y=652) is cut off at the screen edge ("... TEAM FEAST → GOL").
- The results screen after a Workshop match shows no table name or active-rules summary.
