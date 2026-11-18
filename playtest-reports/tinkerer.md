# Playtest evaluation — The Tinkerer

**Fun score: 7 / 10** (Huge amount of knobs and they all work; the round-to-round action is fun but short on depth, and the Workshop is thinner than the rest of the customisation.)

## What I did
- Title -> Settings: changed SFX/Music volume, Screen Shake, Name Tags; opened Keyboard Controls, rebound Throw to T, then Reset to Default (worked). Did not toggle Kaiju Powers or Reduced Effects in a match.
- Table Workshop: placed cup/sundae/teapot/lollipop (6 props), cycled surface (Sunday Roast -> Leftovers) and hazard (wind gusts), tried placing on a start spot (refused), saved and played it. Used slot 2: 6 cakes in a row, Sushi Bar surface + Hot cheese hazard, saved and played it. Cycled all 16 surfaces and 7 hazards (None, Giant hand, Wind, Cleaver, Hot cheese, Spatula).
- Free Play: cycled all 10 twists (Kaiju Frenzy, Turbo, Boomerangs, Giant Cutlery, Ice Rink, Snack Attack, Fists Only, Bouncy Castle, Mirror Moves, Mini Kaiju), First-To (1/3/5/7/10), Power-ups and Hazards on/off, all 13+ tables' descriptions.
- Matches played (all first-to-1 or 3): Free Play My Table 1 (classic, 2 rounds, wind) ; Boomerangs (won); Chef's Board + Ice Rink (lost); Chef's Board + Kaiju Frenzy with power-ups/hazards off (won); Party Modes Crumb Rush 2-player (lost); My Table 2 (lost). Roughly 4 wins/3 losses by bot/auto play with some manual /act. About 80 calls.
- Party Modes screen: Team Feast / Crumb Rush / Hot Dumpling / Classic / Party Cup selector, seats, RANDOM button seen (RANDOM, ONLINE, Party Cup not played).

## What matched my goals / what was fun
- Twist descriptions are one-liners that appear instantly when you cycle, and each one visibly changes the match (Kaiju Frenzy: everyone goes KAIJU within seconds of the start - chaos; Ice Rink shows slide streaks).
- Table descriptions are charming and tell you the hazard ("Get out of the red!"), plus warning banners like "GUST INCOMING!".
- The Workshop is easy to grasp: pick prop, tap table, tap prop to remove, start circles shown, 3 slots, Play It goes straight into a match, and the saved table appears in Free Play as "MY TABLE 1". Surface x hazard combos (16 x 7) give a lot of variety cheaply.
- Keyboard rebinding is clear ("Press the new key (Esc to cancel)") and Reset works.
- The top bar tells you what each kaiju holds and powers/KO feed lines ("CRABBAGE skewered BLOBLIN") are readable.

## What took too long / was tedious
- Classic rounds can stall into a long two-player dance (round 1 of the first match ran past 70s with two kaiju trading pickups before anyone landed a hit). No sudden-death/shrink pressure.
- Cycling a 16-table, 10-twist list by clicking one button repeatedly is slow; no back arrow or pick-from-list on the Free Play setup buttons (First-To skips 3->5->7->10->1 so overshooting costs several clicks).
- Workshop hazard/surface cycling is forward-only too (17 clicks to get back a step).

## What was over too quickly / too shallow
- Workshop: only 18 props, max 12, no rotation/size, props can't be moved (remove and re-place), no names, no preview of the hazard, no sharing. The props mostly seem to be obstacles; I couldn't tell what each one does (cup, bumper, pot, pancakes) - no tooltips. "Bumper" and "Cheesewheel" suggest special behaviour that is undocumented.
- Twists are all single-toggle; you can't stack two (e.g. Mini + Boomerang), and no custom-rules mode combining twist + power-up pool.
- Power-ups: I only saw a "Mustard shield" and Condiment Hoarder stat; no list of what power-ups exist or option to enable specific ones.

## Confusing or unclear
- Free Play setup showed 4 seats (Seats 5-6 "add a bot") but a 5th bot (MOTHBALL) appeared in the next match after I pressed Enter on the setup screen; I'm not sure Enter = add bot (may be my harness input) - worth checking.
- Table setting "ALL 16" then picked "My Table 1" for Crumb Rush round 1 - custom tables apparently are in the rotation; fine, but unexpected.
- Wind gusts on my custom table knocked me out ("YOU knocked out (wind)") 3 times in a Crumb Rush 2-player match with no obvious way to brace; the "Brace!" hint exists on the table description but wasn't clear how to do it.
- Match-end screen text says "1 / START rematch . Esc menu"; REMATCH/MENU buttons were not always listed/clickable right after the match ended (could be a harness timing issue).
- Escape inside a match is a pause menu, and a second Escape does not leave - I pressed it several times and stayed in-game; fine, but surprising after menus where Escape always goes back.

## Bugs found
- None from /errors (reported "none" at the end).
- Possible: 5th bot appearing after an Enter keypress on Free Play setup (see above).
- Possible: Workshop placement refuses props closer than ~100px silently (14 clicks 50px apart placed only 6 props) with no feedback why the others were rejected.
- Screenshots: art-src/.playtest4/7107/shot-2.png (workshop), shot-7.png (chef's board + ice), shot-9.png (custom table 2).

## Top 3 changes that would raise my score
1. Deepen the Workshop: prop tooltips/behaviour list, rotate/drag, more slots, ability to place two hazards, and visible feedback when a placement is rejected.
2. Setup UX: previous/next arrows (or a pick list) for tables, twists and First-To; let me stack twists and pick which power-ups are in the pool.
3. Add late-round pressure (sudden death / shrinking table / hazard speed-up) so classic rounds never stall into minute-long standoffs.
