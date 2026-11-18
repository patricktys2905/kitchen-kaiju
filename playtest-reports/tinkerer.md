# Playtest evaluation — The Tinkerer

**Fun score: 6.5 / 10** (the pieces are fun, but the toys you can tinker with are siloed, one-at-a-time, unrewarded and mostly invisible to progression)

> Coverage note: about 60 harness commands. I did NOT see the Gauntlet end screen/grade, a course boss or a twist wave (my bot run reached wave 6, then a stray keypress started a new run), and I did not open Gallery or Records. Claims below are limited to what I saw.

## What I did
- Settings (all 14 toggles read), Keyboard Controls (rebound Throw to W: it swapped with Move up, with an on-screen explanation), Table Workshop (placed props, cycled surface and hazard, slot switching, Save, PLAY IT), Free Play setup (cycled all 10 twists, all 18+3 tables, First-To 1/3/5/7/10, house rules save + share code), Party Modes setup (Team Feast, Party Cup text, power-ups toggle, RANDOM), Pantry, Gauntlet (6 waves on a bot).
- Matches: custom-table Free Play to completion (won on hard bot), Boomerangs twist on Picnic Blanket (lost to the Giant Hand), Gauntlet waves 1-6 twice. About 25 minutes of play.

## What worked for me (briefly)
- The twist list is a real asset: 10 twists with a one-line explanation on the setup screen ("BOOMERANGS: Every throw comes back to you"). Tables have good personalities (Sushi Bar, Picnic ants, Chef's Board).
- Keybinding screen is clear, with swap-on-conflict and a prompt telling you what happened.
- House Rules slots + code (KK1-base64) is a clean idea; saving a slot and copying the code both worked.
- Workshop is simple and the hand-made table played correctly (Giant hand hazard, props, start spots); "Table Maker unlocked!" is a nice hit.
- Receipt card is compact and readable (art-src/.playtest/r6-7107/shot-13.png).

## The single biggest structural problem
Customisation is a pile of independent switches, not a system. I could pick ONE twist, toggle power-ups and hazards as all-or-nothing, and choose a table, but I could not combine twists, tune any number, choose which power-ups or hazards appear, or give a workshop table its own rules. And none of it feeds progression: the Pantry sells four colours and two Gauntlet perks (shot-14), and nothing tied to the workshop or twists earns or spends anything.

For a tinkerer the fun is in building a ruleset, breaking it, and sharing it. House Rules saves a setup, but the setup is only 7 fields (the share code decodes to `[0,"classic",1,"boomerang",1,1,8,"easy"]`: mode, first-to, twist, power-ups, hazards, table, bot level). There is no depth underneath to explore, so after trying the 10 twists once there is nothing left to discover.

## Big change proposals (2-3, most important first)

### Proposal 1: Rule Lab (stackable, tunable rules, with Chaos Score)
- **Problem it solves:** Twist is a single cycle button (10 values) in Free Play and Party; power-ups/hazards are on/off (shot-9, shot-15). House Rules and codes only store 7 fields.
- **How it would work (detailed design):** Replace the TWIST / POWER-UPS / HAZARDS buttons with one "RULE LAB" button that opens a full screen with three tabs.
  - Tab 1 TWISTS: the 10 existing twists as toggle cards; up to 3 active at once (a chaos budget). Incompatible pairs greyed out with a reason (Fists Only + Boomerangs, Giant Cutlery + Mini Kaiju); roughly 8 conflict pairs to define.
  - Tab 2 DIALS: 5-step selectors: belly fill speed (0.5x to 2x), KAIJU duration (3 s to 12 s), cutlery spawn rate, power-up spawn rate, shove force, table shrink (edge moves in 0 to 30 px per round), start lives (1 to 5).
  - Tab 3 PICK-LISTS: tick which power-ups and which hazards may appear (replacing all-or-nothing toggles).
  - A live CHAOS SCORE (0-100) at the top is computed from dials and twists with a label (Chill, Spicy, Wild, Unhinged). It scales token reward from 0.5x to 2x but with a hard cap of 25 tokens per match so it cannot be farmed.
  - House Rules grows from 3 to 8 slots and the share code carries the whole Rule Lab (KK2-, versioned). Slot labels also show Chaos Score and table name.
  - Available in Free Play, Party Modes and as a custom Gauntlet. Story and Daily ignore Lab rules.
- **Example moment:** I pick Boomerangs + Ice Rink, set belly fill to 2x and shove force to 1.5x. The Lab says "Chaos 78: Wild". I save it to slot 4 as "Slippery Returns", copy the code, paste it into the family chat. My friend loads it and the setup screen shows the name.
- **Rewards / progression hooks:** Achievements for "play 10 distinct twist pairs" and "win at Chaos 80+"; Records shows "Your wildest win"; the Pantry sells extra slots and frames for shared codes.
- **Risks and edge cases:** Combinatorial balance (enforce the conflict list; ship 6 curated "Recipes" as defaults so nothing is blank). Online: only the host chooses; validate and version codes. Phones: 5-step big buttons, not drag sliders.
- **Size:** L. Touches Free Play/Party setup, House Rules codec, match-start rule application, Records, Online lobby.
- **Score impact for me:** +1.2. This is the missing depth for my profile.

### Proposal 2: Workshop 2.0 (zones, timed events, validation and sharing)
- **Problem it solves:** The workshop only places 16 props, a surface and a hazard on a table (shot-5), with 3 slots always named "My Table 1/2/3", even when empty (the Free Play table cycler offered "MY TABLE 2 — Your own table (No hazard)" for a blank one). There is no way to share a table.
- **How it would work (detailed design):**
  - Slots 3 to 12, renameable (12 chars), with a thumbnail on the table picker.
  - New tool tabs: PROPS (existing), ZONES (draw rectangles: ice, sticky, conveyor with direction, bounce pad, crumb spawner), EVENTS (timeline at 20 s / 40 s / 60 s: hazard flare, tablecloth slide, crumb shower), SPAWNS (move the 6 start circles).
  - Prop budget: a 30 point budget with props costing 1-3 (instead of 12 flat) shown as a meter beside the "0/12 props" line.
  - A TEST button (30 s solo against a dummy) and auto-validation (every start spot reachable, no prop on a start circle) with a plain-language reason on failure.
  - Share: COPY TABLE CODE / ENTER A FRIEND'S CODE (same flow as House Rules), and a "Table of the Week" in the Pantry with 3 curated codes.
  - Reward: matches on your own table pay 3 tokens (max 15/day); a Table Maker ladder (tables played by others 1 / 5 / 10) unlocks colours.
- **Example moment:** I build "Lava Lane": a conveyor along the middle, a bounce pad at each end, a hazard flare at 30 s. TEST says start spot 4 is blocked, I move it, save, copy the code and host an online room with it.
- **Rewards / progression hooks:** Table Maker ladder, "played by N" counter per slot, Pantry frames.
- **Risks and edge cases:** Griefing/unwinnable tables (validation + TEST), online sync (zones are static data inside the code, cheap), phone tap targets (existing workshop buttons are fine, props slightly small), save-size limits.
- **Size:** L. Workshop, table renderer, hazard system, online room code, Pantry.
- **Score impact for me:** +0.9.

### Proposal 3: Pot Luck (stacking-mutator run mode)
- **Problem it solves:** Gauntlet is the only run-style mode, and its 1/2/3 perk pick (Ghost Start / Sugar Rush / Mustard Coat) is the only place rules change over time. In about 12 waves I never saw a twist wave or a boss (waves 4 and 5 looked ordinary), and the same tables repeated (Dinner for Four, Fondue Night, Birthday Bash, Leftovers, Picnic, Breakfast Rush). A tinkerer wants to watch rules pile up.
- **How it would work (detailed design):** New solo/couch mode, 8 rounds vs 3 bots, 3 lives. After every round, pick 1 of 3 cards: a PLAYER perk (+10% dash, start with a spoon), a RIVAL curse (bots start with fuller bellies, bots throw twice) or a TABLE rule (any existing twist or hazard). Cards stack; a table rule must be taken every 2nd round. End screen: the final stack, a grade (S to D) and Chaos Score.
- **Example moment:** Round 3 I take Ice Rink, round 5 Boomerangs: everything slides and every throw comes back. I clear round 8 and "Ice Boomerang Ballet" is added to my Recipe Book.
- **Rewards / progression hooks:** Recipe Book (a Gallery-style collection of named combos); each new recipe pays 15 tokens once; weekly seed (same card offers for everyone) with a local best.
- **Risks and edge cases:** Overlap with Gauntlet (frame it as a build-your-chaos run, share the card UI), stacking balance, RNG fairness (always offer one safe card).
- **Size:** L. New mode, card UI, perk engine, Records.
- **Score impact for me:** +0.7.

## How the new features from this round felt
- **Chef Tokens / Pantry:** Tokens arrive (+5 for a short lost match, +20 for one Gauntlet wave) and the receipt is clear. The shop is tiny: 4 colours and 2 Gauntlet items, cheapest 120 (about 24 short matches). Nothing relates to customisation (no twist, workshop slot, prop or surface unlocks). A bigger version: Pantry tabs for COLOURS, PROPS and SURFACES, RULES (extra House Rules slots, Lab dials) and RUN ITEMS.
- **Weekly Orders:** 3 orders at 40 tokens, all generic combat counters (Knock out 20, Win 5, Go KAIJU 8). They never nudge anyone towards setup toys. Add variety orders: "Win with 2 different twists", "Win on 3 tables", "Play your own workshop table".
- **Receipt card:** Works and fits (shot-13). On my first match, played on a workshop table to the end, the results screen (shot-8) showed no receipt; I could not tell if that is intended.
- **House Rules:** Works, copy gives feedback. Too shallow (Proposal 1); slot label omits table and power-up/hazard toggles.
- **Comeback Help:** Setting is clear; I couldn't feel the effect in short matches.
- **Gauntlet:** Wave/course header and perk pick work. No twist wave or boss seen in about 12 waves, which hurts discoverability.
- **Daily medals, Mastery, Chef Rank, KAIJU stomp rings, Final-boss foreshadowing:** not tested.

## Bugs that block play
- None blocking. `/errors` returned "none" at the start, middle and end.
- Probable: the Gauntlet perk key `1` seems to start a new run when pressed on the end-of-run screen, so the defeat summary/grade can be skipped by accident (this is how I lost sight of it). Repro: in Gauntlet, lose the last life, then press Digit1. Not confirmed by a screenshot.
- No text overruns found on Settings, Controls, Workshop, Free Play, Party Modes, Pantry, House Rules or the receipt card (shots 2, 5, 9, 11, 13, 14, 15). The receipt card does cover the bottom-left crumb/gift area of the table, which is acceptable.

## Small notes (max 5, one line each)
- House Rules slot labels leave out table and power-up/hazard toggles, so different saved setups can look identical.
- Free Play TABLE cycler lists blank workshop slots ("My Table 2 / 3") as playable; hide or mark empty ones.
- Party RANDOM only re-rolled the table for me; say what it randomises.
- Workshop prop buttons give no hint of what a prop does (CHEESEWHEEL, BUMPER, POT); add a one-line tooltip.
- Keyboard Controls has no pause/menu key entry and covers only two players' sets.
