# Playtest evaluation - qa (The QA Tester)

**Fun score: 7 / 10** (polished, charming and stable - zero JS errors in ~110 calls - but several results/dialog screens have missing or dead controls, and the ice twist barely reads)

## What I did
- Visited every title screen: Story (ch1-4 cleared, boss ch4 + NEW KAIJU), Free Play (twist cycle, ICE RINK match), Online (Host/Join dialog, empty-code validation, Back), Party Modes (PLAY with nobody joined, mode cycling, Hot Dumpling), Daily, Gauntlet (perk picker, game over recap), Settings (toggled music/effects/name tags, Keyboard Controls rebind + swap, Back Up button), Help (all 4 tabs + Practice), Gallery, Records, Workshop (props, hazard, save, Play It).
- About 12 matches (mostly via autoplay), Escape/pause/quit at odd moments, /errors checked after every risky action: **always "none"**.
- Screenshots: art-src/.playtest4/7110/shot-1..45.png.

## What matched my goals / what was fun
- Rock solid: no JS errors, no soft-locks, Escape from Story/Settings/Controls/Help/Practice always goes one level back sensibly.
- Pause menu music toggle persisted into Settings (consistent state across screens). Keyboard rebind: Esc cancels, duplicate key swaps with a clear message. Join dialog gives a friendly "Room codes are 4 letters." error.
- PLAY with nobody joined in Party Modes does not break: spawns Gobzilla + one bot and plays Team Feast 1v1 (fine, though odd - see Confusing).
- Head Chef line on Chapter Clear WORKS ("Not a single round dropped. Chef's kiss!" / "A hard-fought plate. Well served. Next course: ..."). It is small text under the rival quote, cramped but readable.
- Story SCENE button: works (replays the chapter intro dialogue). It sits just left/above the star legend; they no longer overlap but the legend text sits on the panel's bottom border and SCENE nearly touches "Not cleared yet" (cramped).
- NEW KAIJU celebration after ch4 fires, shows Minturtle + Shell Spin power + "Playable now in Free Play, Party Modes and Online".
- Title NEXT UP tracker updates correctly: "Story ch 4 -> Minturtle -> Lime colour" became "Score 25 knockouts -> Grape (72%)" then "ch 6 -> Freezer Shelf -> Ocean (80%)" after ch4. Nice.
- Gallery locked cards show clear unlock hints; Records achievements with progress bars read nicely; Workshop is a delightful bonus (Table Maker achievement toast).

## What took too long / was tedious
- Story chapter flow needs many presses: NEXT -> map -> PLAY -> 2-3 chat boxes -> TIP box before every match. Space advances line-by-line; the advertised S "SKIP CHAT" did nothing for me (see bugs).
- Gauntlet after game over has no visible way forward (see bugs).

## What was over too quickly / too shallow
- Gauntlet wave 1 vs 1 easy rival is trivial; fun starts at wave 2+.
- Practice has 8 steps but I could only verify 4 (harness cannot swipe).

## Confusing or unclear
- Party Modes PLAY with zero seats joined silently makes you a human + 1 bot; a "join first" hint or at least a toast would help.
- Help tabs: BASICS stays highlighted (focus ring) when TABLES/MODES is the selected tab, so two tabs look active.
- Table list in Help shows 3 locked tables, but the free-play card says "16/20 kaiju" while Story is only 20% - fine, but the Gallery "Collection 68%" at the same time as Story 5% (pre-existing save) is confusing to judge.
- "Back Up / Move Save" button: clicking it produced no visible change in /look (probably an HTML dialog the harness cannot see) - unverified.

## Bugs found
1. **Results screens missing REMATCH / MENU buttons (Hot Dumpling, Daily, Gauntlet game over).** Repro: Party Modes -> MODE to HOT DUMPLING -> PLAY -> let match finish with you NOT winning (I used /autoplay and lost). Results show only the text "1 / START rematch - Esc menu" and NO REMATCH/MENU buttons (shot-16, shot-19). Clicking where the buttons were in Free Play (510,624) does nothing. Digit1 and Esc do work, so keyboard/pad users are fine, touch/mouse-only users are stuck. In Free Play (where I won) the buttons DID appear (shot-11), so buttons appear inconsistently. Same on Daily "DAILY CHALLENGE FAILED" (shot-19).
2. **Gauntlet "GAUNTLET OVER" recap has no buttons and no hint at all** (not even the "1 / START rematch" line). Repro: Gauntlet, clear wave 1, pick a perk, then lose wave 2 (/autoplay level=easy). Screen shows score + stats only (shot-24). Enter silently restarts a new Gauntlet; Esc pauses/quits. A mouse/touch player has no visible way out. The perk-picker run history is only a line of text.
3. **Escape does nothing on the Gauntlet perk picker.** Repro: finish Gauntlet wave 1, wait for "PICK A PERK" cards, press Escape twice - nothing happens (no pause, no exit); only 1/2/3 or clicking a card proceeds (shot-23). You cannot pause or quit while choosing.
4. **"SKIP CHAT (S)" key does nothing in Story pre-match dialogue.** Repro: Story -> select chapter -> PLAY/ENTER -> rival chat box appears with "SKIP CHAT (S)"; press KeyS several times - text unchanged, still in chat. Clicking the SKIP CHAT label works, Space advances a line. (May be a harness key-event issue, but Escape/Space/Digit keys all work, so likely real.)
5. **Ice Rink twist is nearly invisible and has no announcement.** Repro: Free Play -> TWIST to ICE RINK -> PLAY. Countdown shows only "DIG IN!" and a tiny "ICE RINK" label bottom-right; table is plain wood with a few faint white streaks, no blue/ice tint (shot-13, shot-14). No twist banner appeared during countdown or play (other twists likewise gave only a small corner tag in the HUD).
6. **NEW KAIJU overlay is semi-transparent / cluttered.** After clearing story ch4 the celebration card is drawn over the still-visible Chapter Clear card; the "Norigon: ..." quote, "A hard-fought plate... Next course" line and NEXT/REPLAY/MAP buttons ghost through behind the turtle (shot-43/44; still the same 2s later). Could be a frozen-fade artifact of the harness, but it did not clear during /act.
7. **Dismissing the NEW KAIJU overlay with Space immediately started a match** (Story Boss Norigon, Sushi Bar round 1) rather than just closing the card (shot-45) - an accidental extra press launches a fight; Esc/click at the centre did not close it. Repro: clear Story ch4, when NEW KAIJU card shows press Space. Selected chapter on the map afterwards was 5, but the match launched was the ch4 boss table, so NEXT may also be picking the wrong chapter - needs a human check.
8. **Bottom stat line on results overflows.** "Most KOs / Crumb Monster / Butterfingers / Survivor" wraps to 2 lines and sits on the table border / under REMATCH-MENU row in 4-player Free Play (shot-11) and Daily (shot-19).
9. **Help tab highlight stuck on BASICS** while another tab is selected (shot-29).
10. Join dialog: Escape does not close it (only BACK does) (shot-39).

/errors output: "none" at every check.

## Top 3 changes that would raise my score
1. Make the results/game-over buttons (REMATCH, MENU) appear on EVERY end screen incl. Gauntlet and Daily/loss, and let Esc work on the perk picker.
2. Give twists a real banner + visible look (ice tint, shine) and fix the NEW KAIJU overlay opacity/dismiss behaviour so the card is clean and a stray Space does not start a match.
3. Fix SKIP CHAT (S) and cut Story pre-match friction (one-press skip of all dialogue + tip).
