# Playtest evaluation — The Tinkerer

**Fun score: 7 / 10** (a lot of knobs that really work, and a Workshop that is a delight, but several twists/hazards read weakly on screen and some config state is confusing)

## What I did
- Settings: changed SFX volume, screen shake, name tags, Kaiju Powers (Classic mode); opened Keyboard Controls and rebound Throw to T, then Move Right to T (swap worked), then Reset.
- Table Workshop: placed props (bowl, candle, bumper, cheesewheel), removed one, hit the 12-prop cap, cycled Surface and Hazard (Giant hand), saved ("Table Maker unlocked!"), then PLAY IT and played 1.5 rounds on it.
- Free Play: cycled all 10 twists (Frenzy, Turbo, Boomerangs, Giant Cutlery, Ice Rink, Snack Attack, Fists Only, Bouncy Castle, Mirror Moves, Mini Kaiju). Actually played Boomerangs, Giant Cutlery, Ice Rink, Fists Only, Mini Kaiju. Toggled Power-ups and Hazards off and on, and the First-to cycle (1/3/5/7/10).
- Party Modes: Team Feast screen, Crumb Rush (most of a round), Hot Dumpling (one round). Seen the Party Cup description.
- About 12 matches/rounds in total, about 90 calls, 17 screenshots. /errors: none.

## What matched my goals / what was fun
- The Workshop is the star: tap-to-place is instant, start spots are shown, the prop count and cap are clear, the table renders in-game exactly as built (my bowl line-up is clearly visible in play), and the Giant Hand hazard really fires (Crabbage got flicked).
- Keyboard rebinding is clean: "a key already in use swaps over" with a clear message, plus a Reset button.
- Setup screens are compact: the whole configuration is a row of cycle buttons and the headline text updates live ("CLASSIC · POWER-UPS: ON · HAZARDS: ON · ⚡ ICE RINK"). 10 twists is a good amount of variety.
- Classic mode (Kaiju Powers OFF) really does change the game (powerReady / kaijuPowersOn: false reflected in state).
- Crumb Rush's picnic blanket with the ant line and Hot Dumpling's griddle are distinct and readable; round-end text ("The HOT DUMPLING popped on GOBZILLA!") is clear.

## What took too long / was tedious
- First-to default 3 and cycle order 1/3/5/7/10 means testing twists takes many rounds; there is no quick "1 round" preset button visible beyond cycling.
- Cycling twists is click-through only; no list/description until you choose one (the description appears only on some screens).
- Workshop has only 3 slots and no undo for a mis-click (only tap-to-remove or CLEAR).

## What was over too quickly / too shallow
- Rounds on small tables end in about 10-15 seconds with bots, so a twist barely has time to show itself.
- Ice Rink was not visibly icy on the wooden table or the griddle (no sheen / tint), so I could not tell it was on beyond the label. Fists Only with the bot-attack command left everything doing nothing for 8 seconds; a short on-screen prompt "no cutlery this round, shove!" would help.
- Table Workshop has no scale/rotate for props and only 20 props; hazards are one-per-table choice.

## Confusing or unclear
- Settings changes and mode config appear shared between Free Play and Party Modes (twist ICE RINK carried into Party, powerups OFF carried), so it's easy to start a mode with hidden twists. Party Modes also silently inherited "TABLE: ALL / MY TABLE 1".
- Clicking "click or THROW to join" seats in Party Modes, then returning to Free Play, left me in a 2-seat match where I was no longer the player I started as (my "YOU" became Squidgeon, 2 players only). I could not tell if that was intended.
- The 🎲 RANDOM button changed mode/table and also seemed to clear the twist; unclear what it randomises.
- Quit from the pause menu lands on the setup screen (not the title), fine but surprising the first time. Escape right after the round-end screen toggled pause rather than leaving.
- Hot Dumpling: "shove" as I issued it did not pass the dumpling to a rival (I popped it myself); the pass mechanic is not explained in the HUD beyond "HOT! PASS IT!".

## Bugs found
- Possible: seat assignment changed after visiting Party Modes seat-join buttons then Free Play (steps: Free Play -> play; Party Modes -> click all 4 seats -> play Crumb Rush/Dumpling -> quit -> MODES -> Free Play -> play: match had 2 players, and "you" was Squidgeon). Might be my own seat clicks, not a game flaw.
- Possible visual: ICE RINK twist has no visible surface change (screenshots shot-11.png, shot-14.png).
- No JavaScript errors (/errors: none).
- Workshop: clicking on a white start-spot circle with a prop selected did not obviously reject or place; not verified either way.

## Top 3 changes that would raise my score
1. Make twists visible: ice sheen, bouncy-castle surface, mirror-moves icon in HUD, and a 2-second banner at round start that says what the twist does.
2. Separate Free Play and Party Modes config, or show a "carried-over settings" summary on the start screen; clarify the seat/you assignment and what RANDOM changes.
3. Expand the Workshop: more slots, prop rotate/mirror, undo, and a "test round" button with 1 bot and first-to-1 so tinkering loops are tight.
