# Playtest evaluation — The QA Tester

**Fun score: 7.0 / 10** (stable, no JavaScript errors in ~95 commands, and the new twist picker and Cup switch work; but I found real UI bugs, silent buttons, an armed-quit leak and several cramped layouts that stop it reaching a 9)

> Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r8-7110\` (`shot-N.png`). Abbreviated below as `shot-N`.

## What I did
- About 95 harness commands, 77 screenshots, every one opened with Read. `/errors` was "none" at start, middle and end.
- **Title:** all six top buttons (Settings, Help, Kaiju, Records, Pantry, Workshop) and the six big cards (Story, Free Play, Online, Party Modes, Daily, Challenges). Also the NEXT UP panel after progress changed it.
- **Settings:** every row read, Keyboard Controls screen, Back Up / Move Save modal (opened and closed). Escape from Controls returns to Settings.
- **Help:** all five tabs (Basics, Cutlery, Tables, Modes, Practice button seen).
- **Gallery:** selected kaiju, locked "???" kaiju, locked colour swatch, Move Lab (played a round, left with Esc), SHINY button (twice).
- **Records:** all 3 pages, pinned an achievement.
- **Pantry:** unaffordable and affordable purchase (Toffee).
- **Workshop:** place 3 props, UNDO x2, SURFACE both directions, HAZARD cycling, COPY CODE, PASTE CODE, CLEAR, NEXT SLOT, SAVE, PLAY IT (empty table).
- **Free Play setup:** every bot level (EASY, NORMAL, TOUGH, HARD, BRUTAL), TWIST picker and a ⚡⚡ double twist, KEYS panel, HOUSE RULES save slot.
- **Party Modes:** PARTY CUP OFF to ON, CUP LENGTH 6 to 3 to 6, MODE cycle, play on with 0 humans, then 1 human. Played Cup game 1 (Classic, won by a bot) and part of game 2 (Crumb Rush).
- **Pause / quit:** normal pause menu, quit in Free Play (one tap), quit in Cup and Gauntlet (double confirm), and the armed-quit bug.
- **Results screens:** Cup standings, Trial fail, Daily complete (silver medal), Free Play win, Gauntlet wave clear with perk picker.
- **Challenges:** popup, Gauntlet STARTERS (cleared wave 1), Trials list (started Hard Duel and lost).
- **Daily:** played and won.
- **Story:** map, Opening cutscene (skipped), Story Log (empty), Rewards panel, locked chapter 2, locked SECOND HELPINGS and DESSERT tabs, chapter 1 intro cutscene.
- **Online:** lobby, Host/Join dialog, Back.
- Matches played: Move Lab, Cup game 1 (full) + game 2 (partial), Trial (lost), Daily (won), a Free Play match (won), Gauntlet wave 1 (won). I did not reach Second Helpings, Dessert, Spicy chapters, or the Phone view (this harness is desktop).

## What worked for me
- No JavaScript errors anywhere, including rapid screen switching and Esc during overlays.
- The TWIST picker is clear: 11 singles and 7 ⚡⚡ doubles with descriptions; the pink doubles are easy to tell from the blue singles (shot-32). Picking a double updates the header line, the button label and a bottom explanation (shot-33).
- PARTY CUP ON/OFF is easy to flip, and CUP LENGTH changes the helper line (6 games vs 3 games).
- Quitting a Cup/Gauntlet really asks twice, and the pause button itself is relabelled "QUIT (ends the Cup / run)" (shot-42).
- Workshop UNDO works step by step, and the surface name and hazard show on the preview (shot-24).
- Locked content tells you what to do: "Beat Story chapter 4: Boss of the Belt (0/4 cleared)", "clear chapter 6 to open", "finish the Grand Feast" (shots 13, 59).
- Records are clear, and pinning an achievement shows a pin and puts it on the title NEXT UP (shots 17-18, 37).
- Pantry shows affordable items with a gold border and "OWNED" on buy. The Lifeline discount tag is clear.
- Receipts carry achievements, tokens and mastery XP. The Daily result with medal and ranking is great.
- Move Lab is explained at the bottom of the screen and Esc leaves it.

## 🧾 Exactly what would make this a 9/10 for me
1. **Fix the Gallery detail panel vanishing after Move Lab.** *Where:* Gallery, after leaving Move Lab with Esc. *Behaviour:* the selected-kaiju panel (portrait, name, power, mastery) must redraw. It showed an empty bottom half with floating MOVE LAB and SHINY buttons until another kaiju was clicked (shot-12). *Impact:* +0.4
2. **Give every silent button feedback.** *Where:* Gallery SHINY (clicked with 0 tokens and with Mastery Lv 2: nothing happens, shots 10, 15, 69), Pantry unaffordable items, Workshop PASTE CODE, Workshop SAVE. *Behaviour:* a toast of 1.5-2 s ("Needs Mastery Lv 3 and 300 🪙 (you have 294 / Lv 2)"), plus show the price and requirement ON the SHINY button ("✨ SHINY 300 🪙 · Lv 3"). *Impact:* +0.5
3. **Reset the "tap QUIT again" arm state when the pause menu closes (or after about 3 s).** *Where:* pause in Cup/Gauntlet. *Behaviour:* currently Esc to resume, later pause, and the first QUIT tap quits immediately (I lost my Cup that way, twice, and a Gauntlet run once). Arm state must clear on resume and time out. The "TAP QUIT AGAIN TO REALLY END IT" text (dark brown at the bottom) is unreadable on the cake edge (shot-42): add a plate. *Impact:* +0.4
4. **Fix the Story REWARDS modal so the CLOSE button no longer covers the last row.** *Where:* Story > REWARDS (shot-62). The 7th reward text "Collect 30 stars… replay chapters for ★★★" is cut by the CLOSE button. Move CLOSE to the modal's bottom edge or shrink the rows by 10 px. *Impact:* +0.3
5. **Give Trial and Daily result screens clickable buttons.** *Where:* the "SO CLOSE! TRY AGAIN?" screen (shot-55) and the Daily result (shot-57) only say "1 / START retry · Esc trials". A mouse or touch player has no button (clicking the text does nothing). Add RETRY / TRIALS / MENU buttons like the Cup screen has. *Impact:* +0.5
6. **Show the Trial goal during the match.** *Where:* Trial HUD. Hard Duel shows only "ROUND 1 · SUNDAY ROAST" (shot-53, shot-54), with no "TRIAL: Hard Duel · goal 4+ KOs" and no KO counter toward the ★★★ goal. Add a Trial label and "KOs 0/4". *Impact:* +0.3
7. **Clean up the stacked banners.** *Where:* in-match, bots-only phase. "FAST FORWARD x3 · only bots left" sits on top of "INSTANT REPLAY" about 8 px apart (shot-46). Put them 24 px apart or merge them into one pill. *Impact:* +0.2
8. **Make twist labels unambiguous.** *Where:* Free Play/Party TWIST button and picker. The double-twist button reads "⚡⚡ KAIJU + CASTLE" but means MINI KAIJU + BOUNCY CASTLE; "⚡⚡ KAIJU + FRENZY" means MINI KAIJU + KAIJU FRENZY (shot-32, shot-33). Use the full names (smaller font or two lines). Party shows "TWIST ⚡⚡ NONE" with a stray ⚡⚡ while Free Play shows "TWIST NONE". *Impact:* +0.2
9. **Stop Party Cup silently overwriting settings and teams.** *Where:* Party Modes after quitting a Cup. FIRST TO changed from 3 to 2 by itself, seats stayed full of the bots that PLAY auto-added, and the header still says "TEAM FEAST" while the Cup runs Classic first (shots 38-43). Restore the player's settings after the Cup, or say "Cup uses its own rules" on the screen. The helper line also still says "switch it ON, then PLAY" while the Cup is ON. *Impact:* +0.3
10. **Do not let PLAY start a Party game with zero human players.** *Where:* Party Modes. With no seats joined, PLAY auto-filled 3 bots and started a game where nobody was me (shot-40). Require at least 1 joined seat or auto-seat P1 with a message. *Impact:* +0.3
11. **Fix the cramped Party Modes footer.** *Where:* the Party Cup helper text at y=660 touches the KEYS / HOUSE RULES buttons (y=670+) (shot-39). The "RED TEAM" / "BLUE TEAM" pills also sit on top of the kaiju's head once seated (shot-43). Move the pills above the portrait or make the portrait 10% smaller. *Impact:* +0.2
12. **Keep Chef Token numbers consistent.** *Where:* Records shows "Chef Tokens 0" (shot-16) but Pantry showed "you have 25" about 4 commands later with no match played (shot-20). Later the two agreed (334). Find what paid 25 (Move Lab?) and show the earning on screen. *Impact:* +0.2
13. **Settings text: KID MODE.** *Where:* Settings. It says "Story: easier rivals, 1-line chats, bigger result text" but the brief says Kid Mode also makes Free Play, Party and Daily bots easy. Update the line. *Impact:* +0.1
14. **Duplicate kaiju in a match.** *Where:* after the Party Cup, a Free Play match had two BLUEBEARY on the table (shot-65). Block duplicates among bots, or tint the second one and label it. *Impact:* +0.2
15. **Make the smallest text bigger.** *Where:* Help > Modes twist list (~11 px, shot-8), Trials "Chef's Table" line (~11 px, shot-52), twist picker "FISTS ONLY" and "MIRROR MOVES" lines (shot-32). Use a minimum of 13 px, wrapping to 2 lines. *Impact:* +0.2

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Gallery after Move Lab | Esc from Move Lab returns to the Gallery with the bottom panel missing (no portrait, name, power text, mastery); MOVE LAB and SHINY buttons float on the background | shot-12 | Redraw the panel on return; reselect the kaiju |
| 2 | major | Pause > QUIT in Cup/Gauntlet | The "tap again" arm state survives Resume. Re-pausing later and tapping QUIT once ends the Cup/run. Reproduced 3 times (Cup x2, Gauntlet x1) | shot-42 | Clear the flag on resume; add a timeout |
| 3 | major | Story > REWARDS | CLOSE button covers the last reward's text ("…replay chapters for ★★★") | shot-62 | Move CLOSE down or shrink rows |
| 4 | major | Gallery | SHINY button does nothing when you cannot buy it, with no toast, and no price or requirement on the button (tried at 0 tokens, and at 334 tokens with Mastery Lv 2) | shot-10, 15, 69 | Toast plus price/Lv label on the button |
| 5 | major | Trial result and Daily result | Only "1 / START retry · Esc trials" text, no clickable buttons; clicking the text does nothing | shot-55, 57 | Add RETRY / BACK / MENU buttons |
| 6 | major | Party Modes | PLAY with zero joined players starts a game with 3 bots and no human; the match plays itself | shot-40 | Require 1 player or auto-join P1 |
| 7 | minor | Pantry | Buying an unaffordable item gives no message; buying an affordable one has no confirm and no "bought!" toast (only the card turns to ✔ OWNED) | shot-21, 68 | Toast with name and new balance |
| 8 | minor | Records vs Pantry | Records "Chef Tokens 0" while Pantry "you have 25" (no match played between); later both 334 | shot-16, 20 | Find the 25 source; show it |
| 9 | minor | Party Modes (Cup ON) | Helper line still says "switch it ON, then PLAY" when ON; header still says "TEAM FEAST" though the Cup starts with Classic | shot-39 | Change the helper line when ON; header "PARTY CUP" |
| 10 | minor | Party Modes after quitting Cup | FIRST TO silently changed 3 to 2; the auto-added bots stay seated; teams show "RED 2 vs BLUE 1" | shot-43 | Restore settings; clear auto-seated bots |
| 11 | minor | Party Modes | "RED TEAM" pill overlaps the top of the seated kaiju's head (Bluebeary) | shot-43 | Move pill above the art |
| 12 | minor | Party Modes | Cup helper line (y=660) touches KEYS / HOUSE RULES buttons (y=670) | shot-39 | Move text up 14 px or shorten it |
| 13 | minor | In-match (bots-only) | "FAST FORWARD x3 · only bots left" and "INSTANT REPLAY" stacked 8 px apart | shot-46 | Merge or space them |
| 14 | minor | Pause (Cup) | "TAP QUIT AGAIN TO REALLY END IT" is dark brown on the dark/pink cake edge; poorly readable | shot-42 | White text with a plate |
| 15 | minor | Twist picker/buttons | "⚡⚡ KAIJU + CASTLE" really means MINI KAIJU + BOUNCY CASTLE; "⚡⚡ KAIJU + FRENZY" = MINI KAIJU + KAIJU FRENZY | shot-32, 33 | Use full names |
| 16 | minor | Party setup | TWIST button reads "TWIST ⚡⚡ NONE" (stray ⚡⚡) when none chosen; Free Play shows "TWIST NONE" | shot-38 | Hide ⚡⚡ unless a double is picked |
| 17 | minor | Twist picker | No heading or gap between singles and doubles ("singles, then doubles" is only in the title); close ✖ nearly touches BOOMERANGS tile (ends y≈145, tile starts y≈150); the bottom third of the panel is empty | shot-32 | Add a "⚡⚡ DOUBLES" divider; move ✖ up |
| 18 | minor | Twist picker | "FISTS ONLY" and "MIRROR MOVES" description text is much smaller than the rest | shot-32 | Same font size, wrap |
| 19 | minor | Trials list | "Chef's Table" and "Bare Knuckles" subtext autoshrinks to about 11 px and nearly touches card edges | shot-52 | Wrap to 2 lines |
| 20 | minor | Trials in match | No Trial name, no KO goal, no goal counter on the HUD (only "ROUND 1 · SUNDAY ROAST") | shot-53, 54 | "TRIAL · Hard Duel · KOs 0/4" |
| 21 | minor | Trial fail | "SO CLOSE! TRY AGAIN?" shown after losing 0-3 with 0 KOs | shot-55 | Use "SO CLOSE" only if rounds were close |
| 22 | minor | Trial/Free Play receipt | A Trial gives "Play a Free Play match ✔ +20" | shot-55 | Say "any match", or exclude Trials |
| 23 | minor | Free Play after Party | Two BLUEBEARY on the same table (duplicate kaiju, same name in HUD) | shot-65 | Prevent duplicates or label |
| 24 | minor | Online dialogs | Escape does not leave the Join dialog while the input is focused (stays on lobby); /look returns no texts for the lobby (DOM overlay) | shot-73 | Handle Esc on the input; expose texts |
| 25 | minor | Workshop | UNDO and CLEAR buttons touch each other (borders ~2 px apart) | shot-22 | Add a 10 px gap |
| 26 | minor | Workshop | The "Wind gusts" badge covers the top-right start-spot circle on the preview; start-spot circles also sit under the badges | shot-24 | Move badge to the bottom-right |
| 27 | minor | Workshop | PASTE CODE gives no result; the old "Table code copied" message stays on screen | shot-26 | Show "Paste a code…" or an error |
| 28 | minor | Workshop | SURFACE names (Sunday Roast, Dinner for Four, Leftovers) show an almost identical wood preview, so the change is hard to see | shot-23, 24, 25 | Use a different preview colour per surface |
| 29 | minor | Workshop | PLAY IT starts on an empty table (0/12 props, saved while empty) with no warning | shot-28 | Warn or allow it explicitly |
| 30 | minor | Story map | The SCENE button sits on the detail panel's right border and next to "Not cleared yet"; on an uncleared chapter 1 it is offered at all | shot-59 | Move it inside the panel; hide until cleared |
| 31 | minor | Story Log | Opens as a huge empty modal ("Nothing yet! Clear chapter 1…") that is 85% blank | shot-60 | Smaller modal or a teaser entry |
| 32 | minor | Story map | Clicking the locked SECOND HELPINGS / DESSERT tabs gives no feedback beyond their own small text | shot-59 | Toast the unlock rule |
| 33 | minor | Free Play KEYS panel | "CLOSE KEYS" button overlaps the panel's bottom-left border; bottom row of key chips is 6 px from the panel edge | shot-36 | Raise panel or move the button |
| 34 | minor | Settings | KID MODE description says "Story: easier rivals…" but it also affects Free Play, Party and Daily | shot-2 | Update text |
| 35 | polish | Daily intro | The "DAILY CHALLENGE · win this match to clear today…" banner runs across the left and right start mats | shot-56 | Narrower banner or wrap |
| 36 | polish | Records | "PREP COOK AT 6 PTS (YOU: 0)" value sits 30 px from the "Next rank" label and is in a different, larger font from the other values | shot-16 | Right-align and size to match |
| 37 | polish | Records | The title's "Next up" pin footer is 2 lines of small text; pinned achievement shows only a pin icon, no "pinned" word | shot-18 | Add "PINNED" |
| 38 | polish | Pantry | Left-panel "Chef Rank / Next" text is a display font in orange, unlike the readable body font elsewhere | shot-20 | Use body font |
| 39 | polish | Gallery | 4 "???" kaiju but header shows "16/20" and "Collection 56%"; "🎨 2/21" colours slots show only 2 of 21 | shot-9 | Fine, but mention "4 locked" |
| 40 | polish | Gallery | Mastery line wraps onto 2 lines ("next: ✨ Dash sparkles") close to the panel's bottom edge | shot-9 | 4 px more padding |
| 41 | polish | Help > Basics | Very dense: the MOVES block is 6 lines of small text; PARRY and Giant Hand rules are buried | shot-5 | Split into icons or sub-tabs |
| 42 | polish | Help > Modes | Twist list is a single paragraph at ~11 px | shot-8 | One line per twist |
| 43 | polish | Match countdown | No "YOU" marker during the 3-2-1 countdown (it appears once the match starts) so you cannot tell which mat is yours | shot-28, 53 | Show marker in countdown |
| 44 | polish | Harness /state | After joining seat 4 in Party, `/state` `you` said BLUEBEARY while the human seat was GOBZILLA; /act drove a different kaiju than the one I joined as | shot-44, 46 | Check seat/controller mapping |
| 45 | polish | Gauntlet perk picker | "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)" prompt text sits on top of the pancake plate art and is hard to read | shot-76 | Add a plate behind it |
| 46 | polish | Cup game 2 | Crumb Rush HUD says "BACK IN 1" for a knocked-out player; fine, but the timer "⏱ 45" is small and sits on the red sauce bottle | shot-48 | Bigger timer on a plate |

## 🔠 Text and layout check

| Screen | Result | Screenshot |
|---|---|---|
| Title | OK. NEXT UP panel (4 lines) fits; button labels fit | shot-1, 37 |
| Settings | OK. All 13 rows fit, none cut. KID MODE text is stale | shot-2 |
| Keyboard Controls | OK | shot-3 |
| Back Up / Move Save modal | OK | shot-4 |
| Help > Basics | OK, but dense and small | shot-5 |
| Help > Cutlery | OK | shot-6 |
| Help > Tables | OK | shot-7 |
| Help > Modes | Small twist text (~11 px) | shot-8 |
| Gallery | OK, but the panel disappears after Move Lab (bug) | shot-9, 12, 13 |
| Gallery Shiny click | No feedback | shot-15 |
| Move Lab | OK; hint line fits | shot-11 |
| Records p1-p3 | OK, "Next rank" value is tight | shot-16, 17, 19 |
| Pantry | OK, tidy | shot-20, 68 |
| Workshop | UNDO/CLEAR touching; badge covers a start spot | shot-22, 24 |
| Free Play setup | OK | shot-30, 31 |
| Twist picker | Small text on two tiles; ✖ close to a tile | shot-32 |
| House Rules modal | OK | shot-34 |
| Keys panel | CLOSE KEYS overlaps the panel border | shot-36 |
| Party Modes | Footer text touches the buttons; team pill over the head | shot-38, 39, 43 |
| Pause menu | OK; the confirm text is low contrast | shot-29, 42 |
| Match HUD / countdown | OK | shot-28, 40, 44 |
| Bots-only banner | FAST FORWARD and REPLAY stacked 8 px apart | shot-46 |
| Cup results | OK; receipt tall but fits | shot-47 |
| Challenges popup | OK | shot-51 |
| Trials list | Smallest text on Chef's Table; near-edge text on Bare Knuckles | shot-52 |
| Trial fail | OK visually (no buttons) | shot-55 |
| Daily intro | Banner crosses start mats | shot-56 |
| Daily result | OK | shot-57 |
| Story map | SCENE button on the border | shot-59 |
| Story Log | OK, empty | shot-60 |
| Story Rewards | CLOSE covers the last row (cut off) | shot-62 |
| Story chapter intro | OK | shot-64 |
| Free Play result (duplicate kaiju) | OK; duplicate names | shot-65 |
| Online lobby / Join | OK; Esc not handled in input | shot-71, 72, 73 |
| Gauntlet wave clear | OK; prompt on plate art | shot-76 |

## The single biggest structural problem
The game is stable and rich, but the **feedback layer is thin**. Many buttons accept a press and do nothing visible (Shiny, unaffordable Pantry items, Paste Code), result screens for Trials and Daily offer keyboard text only, and state leaks between screens (the armed quit flag, Cup overwriting Party settings, Gallery panel loss). For a QA pass these are what make the game feel unfinished: the player cannot tell whether a tap was understood, and a few actions (quitting a Cup) can happen by accident. A shared toast system, shared result-button bar and a "reset screen state on enter/leave" rule would remove most of the list at once.

## Big change proposals (2–3, most important first)

### Proposal 1: One toast + disabled-reason system for every button
- **Problem it solves:** silent buttons (issues 4, 7, 27, 32) and the lack of purchase confirmation.
- **How it would work (detailed design):** one function `toast(text, kind)` used by every screen: a pill at the bottom-centre (y≈650) with a plate, 1.8 s, max 1 at a time, and kinds OK (green), NO (red), INFO. Rules:
  - Any press on a locked/disabled button gives a NO toast that states the exact missing thing and numbers ("Needs Mastery Lv 3 (you: Lv 2) and 300 🪙 (you: 294)").
  - Every purchase gives an OK toast with the new balance ("Toffee colour bought · 294 🪙 left"). Optionally a confirm for items over 200 🪙.
  - Buttons that can be disabled show their reason on the face: "✨ SHINY 300 🪙 · Lv 3".
  - Workshop SAVE/COPY/PASTE use the same toast, and PASTE with a bad code says "That code did not work".
- **Example moment:** Player taps SHINY on Bluebeary at Lv 2 and sees "Needs Mastery Lv 3 (you: Lv 2)". They know what to grind next.
- **Rewards / progression hooks:** makes Mastery Lv 3 a visible goal; makes the shop feel responsive.
- **Risks and edge cases:** toasts must not cover buttons on phones (place above the bottom bar); keep reduced-effects friendly (no animation).
- **Size:** S
- **Score impact for me:** +0.6

### Proposal 2: A shared result button bar and screen-state reset
- **Problem it solves:** Trial/Daily results without buttons, the armed quit leaking, Cup overwriting Party settings, Gallery panel vanishing.
- **How it would work (detailed design):**
  - Every result screen (Free Play, Party, Cup, Trial, Daily, Story, Gauntlet) shows the same bottom bar of 2-3 buttons ("▶ CONTINUE / RETRY", "☰ MENU", plus "SHARE" where present), with the keyboard hints kept as small text.
  - Add `onEnter()/onLeave()` hooks per screen that reset transient flags: quitArmed=false when the pause menu closes (plus 3 s timeout), selected-kaiju redraw on Gallery enter, and Party/Cup save the player's settings on Cup start and restore them when the Cup ends or is quit.
  - PLAY in Party needs ≥1 human seat, or auto-seats P1 and says so.
- **Example moment:** A player on a phone loses a Trial, taps RETRY, and gets back into the match without needing a keyboard. Resuming from pause and tapping QUIT later asks for confirmation again.
- **Rewards / progression hooks:** none directly; protects progress (Cup runs, Gauntlet runs) from accidental loss.
- **Risks and edge cases:** online matches have different end flow; keep them out of scope at first. Restoring settings after a Cup needs a snapshot per profile.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Layout lint pass with a minimum text size and spacing rule
- **Problem it solves:** the cramped and shrunken text spots (issues 3, 12, 13, 17-19, 25, 33, 35, 42).
- **How it would work (detailed design):** set rules: minimum 13 px for any body text, minimum 12 px between touching buttons, modal CLOSE buttons live in a reserved 64 px footer, text that does not fit wraps to a second line instead of shrinking. Add a debug overlay (key F9) that outlines every text and button box and flags any two that overlap, run on each screen in CI via the same harness `/look` data (it already returns [x,y] for each text; add widths).
- **Example moment:** a developer adds a new reward row and the lint flags that CLOSE overlaps it before it ships.
- **Rewards / progression hooks:** none; it is a polish and regression safety net.
- **Risks and edge cases:** some Canvas texts have no measured width; DOM modals need separate handling; phone layout has its own set of limits.
- **Size:** M
- **Score impact for me:** +0.4

## How this round's new features felt
- **TOUGH bot level:** the setup cycles EASY, NORMAL, TOUGH, HARD, BRUTAL in the right order and the line "Bot difficulty: TOUGH" matches. I did not play a full TOUGH match, so I cannot judge fairness. In the Trial I lost 0-3 to a HARD Pizzaraptor with an easy bot driving my seat, which is consistent with HARD being strong.
- **Giant Hand dodge / hand KO credit:** I saw "GOBZILLA got flicked by the GIANT HAND" in the log and the Help text now explains DASH. I did not test the dodge timing myself.
- **Kid Mode:** the Settings text still only mentions Story (issue 34). Not played.
- **✨ Shiny forms:** the button exists in the Gallery, but I could not buy one. It never tells you the 300 🪙 and Mastery Lv 3 requirement, and a click does nothing (issue 4). This is the biggest rough edge among the new features.
- **Party Cup ON/OFF:** works, and the label flips cleanly. CUP LENGTH 3/6 works. The Cup starts with its own table and rules ("GAME 1/6 · CLASSIC · Birthday Bash") and the standings screen is clear (shot-47). Problems: leftover Party settings (issue 10), the helper text staying stale (issue 9), and PLAY with 0 humans (issue 6). The quit double confirm works but the armed flag leaks (issue 2). I did not see the ×2 final.
- **Story:** STORY LOG exists (empty before chapter 1, huge blank modal). Locked tabs say how to open them ("clear chapter 6 to open", "finish the Grand Feast"). I did not reach the boss PHASE 2 or the gentler chapter 4.
- **TWIST picker:** a clear improvement. Doubles are distinguished by colour. Label abbreviations are confusing (issue 15) and a few lines are tiny (issue 18).
- **Workshop UNDO and the preview:** UNDO works step by step; surface and hazard show on the preview. Surface differences are hard to see (issue 28).
- **Phone layout:** not testable in this desktop harness.
- **Carried over:** the YOU marker shows once the match starts but not during the countdown (issue 43). Receipts carry achievements and First Service progress well. Move Lab Esc works. Trials are good content but lack in-match goal tracking and buttons (issues 5, 20).

## Bugs that block play
- None block play completely. The worst are: (a) the armed QUIT leaking, which can end a Cup/Gauntlet by accident; (b) the Gallery detail panel disappearing after Move Lab (recovers when another kaiju is clicked); (c) no way to retry a Trial or Daily by mouse.
