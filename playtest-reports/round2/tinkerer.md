# Playtest evaluation — The Tinkerer

**Fun score: 7.5 / 10** (huge, cheerful pile of knobs that mostly work, but the knobs are mostly "modifiers" rather than depth, and the workshop is thin)

## What I did
- Settings: changed SFX/music volume, Player Numbers, Name Tags; opened Keyboard Controls and tried to rebind Swipe.
- Table Workshop: placed cheesewheel, bumper, candle, removed a prop by tapping it, cycled SURFACE (Sunday Roast -> Dinner for Four) and HAZARD (none / Giant hand / Wind gusts), saved, PLAY IT. Played a full custom-table match (won round 1, 3 KOs).
- Free Play: cycled all 10 twists with X (Frenzy, Turbo, Boomerangs, Giant Cutlery, Ice Rink, Snack Attack, Fists Only, Bouncy Castle, Mirror Moves, Mini Kaiju), all 16 tables with M (read every blurb), toggled power-ups (U) and hazards (H).
- Played rounds: custom table + Wind, Boomerangs, Ice Rink on Ice Cream Parlour (killed by the giant hand), Crumb Rush, Hot Dumpling, Fists Only. Went full cycle crumbs -> STOMP -> KAIJU -> power (Seed Spray) once.
- ~8 matches/rounds, about 95 calls. /errors: none.

## What matched my goals / what was fun
- Massive variety for the setup screen: 16 tables each with a one-line hazard blurb, 10 twists, 4 party modes, per-toggle power-ups/hazards. Combining table + twist (ice parlour + Ice Rink) is exactly my kind of fun.
- Workshop UI is simple and works: select prop, tap table, tap prop to remove, surface/hazard cyclers, 3 slots, PLAY IT jumps straight into a match on my table. It reads clearly (start-spot circles are a nice touch). Custom table appears in the Free Play table picker too.
- Settings are clear with a one-line explanation each; KAIJU POWERS off = "Classic" is a great tinker option. Player Numbers (colour-blind) is thoughtful.
- Hot Dumpling and Crumb Rush are genuinely different rules, not reskins; Hot Dumpling's "FAST FORWARD x3, only bots left" is a lovely touch.
- Art is gorgeous and readable (screenshots of Ice Cream Parlour and the workshop).

## What took too long / was tedious
- Twist cycling with X is a blind cycle through 11 states; no picker, no descriptions on the setup screen, so I had to start a match to learn what "Snack Attack" or "Mirror Moves" does.
- Party mode switching only via tiny arrows at the title line; I found it by guessing coordinates.
- Going KAIJU needs ~100 belly and about 10+ seconds of crumb eating, and the kaiju state lasts only ~3-6 s; rounds are mostly over before I could try power variety. Tinkering with kaiju powers is hard to do deliberately.

## What was over too quickly / too shallow
- Rounds on small/hazard tables end in 8-25 seconds, so I rarely saw table hazards in action (the Ice Parlour giant hand killed me once; Wind on my custom table was barely visible). Hazards deserve a "hazard preview/sandbox" mode.
- Workshop: only 16 props, 12 prop cap, no resizing/rotating, no naming, no hazard options beyond a cycler, no sharing/export. Props mostly just obstacles or bumpers; no description of what each prop DOES (cup? candle? pot?) - I had to guess. Surfaces are cosmetic-ish.
- Power-ups: I saw a shield icon (Crumb Rush) and pickups, but there is no list/glossary of power-ups, so I could not tinker with them intentionally. Settings only offers ON/OFF, not which ones.
- No per-twist or per-hazard intensity settings (e.g. round time, KO count, crumbs needed) beyond "rounds".

## Confusing or unclear
- Title screen says "Up to 6 players" but only keyboard-left is human; fine, but the footer of the setup screen is dense (many keys), and chips like X/Z/O/1 are not obvious as "twist / random / online / play".
- Which key chips are clickable vs informational (the first bots appear pre-added, 4 of 6 seats).
- Workshop: no feedback when tapping a start-spot circle (prop silently refuses to place); no hint why.
- Pause menu: QUIT from a round goes back to the setup menu, but a stray /act afterwards seemed to dismiss the pause (probably harness).

## Bugs found
- Possible: In Settings > Keyboard Controls, clicking "Swipe: F" showed "press a key" but the harness key press KeyG did not rebind (stayed "Swipe: F"). Could be a harness quirk (keydown synthetic event), please re-verify by hand.
- Round-end banner text overlaps the star tally on the cream tablecloth (shot-4: "GOBZILLA WINS THE ROUND" with the score line crammed right under it, partially over a bumper) - low priority.
- Menu mode arrows on Party Modes: clicking right of the label (x=800) cycles forward, left (x=480) also moved forward at first? (Team Feast -> Crumb Rush on a left click) - may be wrong direction; minor.
- /errors: none.
- Screenshots: art-src/.playtest2/7107/shot-3.png (workshop), shot-9.png (ice parlour), shot-11.png (crumb rush), shot-12.png (hot dumpling).

## Top 3 changes that would raise my score
1. Add descriptions/previews to the setup screen: a twist picker with one-line blurbs (like the table blurbs) and a power-up/hazard glossary, with per-item toggles.
2. Deepen the Workshop: prop descriptions, rotate/scale, more props/hazards, name tables, bigger prop cap, and a "test sandbox" where I can place hazards and rewatch them without a bot fight.
3. Make KAIJU/power experimentation easier to reach (faster belly fill in a practice option, or a "Kaiju Lab" mode) so tinkerers can see each of the 20 powers and twist combos without 25 seconds of setup per round.
