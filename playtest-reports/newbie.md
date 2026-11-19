# Playtest evaluation — The First-Timer (newbie), round 10

**Fun score: 7.5 / 10** (charming art and a genuinely good Practice, but a first-timer still hits a wall of text in How to Play, a Practice that does not "count", Daily dropping me into an unexplained 4-player mode, and a few number/label mismatches. Fun arrives in about 2 minutes, which is good, but not yet 9.)

Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7104\` (shot-N.png). Harness commands used: about 105. `/errors` at the start, middle and end: always `none`.

## What I did
- Title screen: read NEXT UP box, looked at every button (shot-1).
- HELP: Basics, Cutlery, Tables, Modes tabs (shot-2, 3, 5; Tables seen via text list only, shot-4).
- 1-minute Practice (all 8 steps; finished, +20 coins): shots 6, 7, 8, 10, 11, 13.
- "FIRST MATCH" vs one EASY bot, first to 3: won 3-0 (shot-17). Got Lime + Cherry colours, a NEW KAIJU (Chocomunch), +81 tokens.
- Free Play setup (shot-19), Twist picker (shot-20) with TRY IT ON: Ice Rink, 1 round, won, +74 tokens (shot-21, 22).
- Story: opening cutscene, Chapter 1 pre-chat, played and cleared Chapter 1 (2 stars), Chapter Clear screen (shot-25..30).
- Gallery (shot-32), tapped a locked colour (shot-33). Records (shot-34). Pantry (shot-35, 36). Settings (shot-37, 48). Challenges popup (shot-38). Daily (shot-39..42): played, got knocked out in 5 s. Party Modes with Party Cup ON (shot-44, 45). Workshop (shot-46). Online lobby (shot-47). Toggled Kid Mode on and back off (shot-48, 49).
- Matches: 3 real matches played (all won, 9 rounds won) plus 1 Daily (lost round 1, abandoned via QUIT), plus 1 Try-It round. About 25 minutes of game time.

## What worked for me
- The title screen is lovely and the six big buttons are clear. The 👋 "NEW HERE? 1-MINUTE PRACTICE ▶" button is exactly what a first-timer needs and is the most prominent thing on the screen.
- Practice is excellent: bottom-left prompt "PRACTICE 1/8 👉 THROW your cutlery: hold & let go: SPACE / A / THROW then: Pick your cutlery back up (+5 more)" shows the current step with its keys plus the next one. The "▼ YOU" marker (shot-7) and "BELLY FULL! PRESS E / Y → KAIJU" (shot-10) are great.
- The post-practice screen (shot-13) with FIRST MATCH / STORY / MENU, each with a one-line subtitle, is a perfect on-ramp.
- Result screen (shot-17) is celebratory and clear: tokens, XP, achievements and colours unlocked in one box.
- Story map (shot-26) is clear: stars, locks, boss crowns, "★★★ no rounds lost · ★★ lost one · ★ any win", and clear locked-reasons ("clear chapter 6 to open").
- Locked Gallery colour explains how to earn it ("Ocean: Regular Diner: Win 10 matches (3/10)", shot-33). Records have progress bars and a "Next up" footer.
- Pantry two-tap buy ("tap again to buy for 40") prevents accidents (shot-36). Pause menu QUIT also needs a second tap.
- Story pre-chat text is short and funny ("Crabbage is feeling a little... crabby.").

## 🧾 Exactly what would make this a 9/10 for me
1. **Make Practice count for the "FIRST SERVICE" checklist and Records.** Where: Practice + title NEXT UP box + Records. Practice step 6 made me go KAIJU and squash the dummy, yet NEXT UP still says "FIRST SERVICE 4/6: Go KAIJU (eat crumbs, then STOMP)" after three matches, and Records says "Times gone KAIJU 0". Behaviour: finishing the Practice KAIJU step ticks the First Service "Go KAIJU" item and counts once in Records; or rename the item "Go KAIJU in a real match". Impact +0.4.
2. **Replace the Basics wall of text with a 5-icon "cheat card".** Where: HELP > Basics (shot-2). The MOVES block is a 6-line paragraph at about 14 px; PARRY, Giant Hand, belly and edges are all crammed in. Behaviour: max 5 rows, one icon + one line each (THROW, SWIPE, DASH, STOMP, "knock them off"), with details behind "more". Keep PARRY/Giant Hand for a later "Advanced" tab. Impact +0.5.
3. **Daily must show a preview screen before starting.** Where: title DAILY card (shot-39). One click dropped me straight into a 4-player HOT DUMPLING countdown with no way to cancel, no mode explanation, and bots that killed me in 5 s. Behaviour: show a card (mode, rules in one line, 3 rivals and levels, medals) with START and BACK; hide DAILY's mode name behind "(new players: try Practice first)" until 3 matches are won, or at least start with easy bots for accounts under 5 wins. Impact +0.5.
4. **Fix the token total mismatch.** Result screen said "+50 Chef Tokens (270)", Gallery and Records said 270, Pantry said 295. The +25 "Clear Story chapter 1" reward is credited but not shown in the total on the result. One number everywhere. Impact +0.2.
5. **One name per kaiju.** Gallery grid and in-match HUD say "GOBZILLA", Free Play seat, Gallery detail and the result banner say "GOBZILLA JR." ("GOBZILLA JR. RULES THE TABLE" while the scoreboard line says "GOBZILLA (YOU)"). A first-timer will think they are two kaiju. Pick one. Impact +0.2.
6. **Explain Gauntlet / Trials / Daily for newcomers.** Where: title cards and CHALLENGES popup (shot-38). "Gauntlet · 🎯 Trials 0★" and "STARTERS from wave 1" have no one-line description. Add "Gauntlet: endless waves of bots, how far can you get?" and "Trials: 8 special fights, 3 stars each". Impact +0.3.
7. **Add a controls reminder to the pause menu and the first real match.** Pause (shot-42) has RESUME/RESTART/MUSIC/SOUND/QUIT only. Add the 5 key hints (or a "?" button to HELP). Impact +0.3.
8. **Make quick key taps register in Practice.** KeyF and ShiftLeft taps via /key did not tick SWIPE (step 4) or DASH; only the harness dash-by-act worked. SWIPE was finally ticked by using the KAIJU power. Verify short taps (the brief claims "quick key taps never get lost") and tick SWIPE on any swipe animation. Impact +0.3.
9. **Kid Mode "bigger text" must be visible on Settings and Title.** See below. Impact +0.1 (for me), larger for kids.
10. **Small layout polish** (Free Play subtitle behind cutlery, tiny top-right buttons, Chapter 1 cutscene caption, tiny "TWIST" descriptions). See issue table. Impact +0.2.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Title NEXT UP | After completing Practice (which includes going KAIJU), box still says "FIRST SERVICE 4/6: Go KAIJU (eat crumbs, then STOMP)". Records "Times gone KAIJU: 0". | shot-31, shot-38 | Count Practice KAIJU for the checklist, or reword the step to "in a real match". |
| 2 | major | Daily | Clicking DAILY starts the match immediately (HOT DUMPLING, 4 kaiju, 3 bots incl. a "normal") with no preview and no back button; an unexplained mode for a first-timer. I was knocked out at 5 s. | shot-39, shot-40 | Add a confirm/preview card; easier first Daily. |
| 3 | major | HELP > Basics | Dense paragraph text (about 14 px, 6 lines for MOVES, plus PARRY / Giant Hand). Hard to absorb for a new player. | shot-2 | 5-row icon cheat card; move advanced items to their own tab. |
| 4 | minor | Result / Pantry | Token total mismatch: result "(270)", Gallery 270, Records 270, Pantry "SHOP · you have 295". | shot-30, 32, 34, 35 | Include the +25 chapter reward in the shown total. |
| 5 | minor | Naming | GOBZILLA vs GOBZILLA JR. in different places. | shot-17, 19, 32 | One name. |
| 6 | minor | Practice | SWIPE step (4/8) never ticked from an F key tap; step prompt then showed SWIPE for steps 4, 5, 6, 7 ("SWIPE up close ... then DASH (+1 more)"), apparently while DASH and STOMP completed first. The "(+N more)" count and ordering look wrong to a newbie. | shot-10, shot-11 | Tick steps in any order and show which are done; accept any swipe. |
| 7 | minor | Practice | The dummy keeps playing behind the "PRACTICE COMPLETE" overlay (rival back on the field at 975,340 in shot-13). | shot-13 | Freeze the field once complete. |
| 8 | minor | Practice | My kaiju got stuck against the gravy boat in the middle (move:-1,0 gave x=723 repeatedly) with no feedback. | shot-8 | A newbie will think controls are broken; add slide-around-obstacle or a "blocked" cue. |
| 9 | minor | Practice | The "▼ YOU" marker is present at the start (shot-7) but it is not shown in every frame (not visible in shot-8, 10) | shot-8 | Keep YOU marker visible during the whole Practice. |
| 10 | minor | Story | Pressing PLAY plays the opening cutscene (when first opening Story), then another cutscene (Crabbage), then a Head Chef dialogue, then two Crabbage lines: 4 skip points before the first fight. | shot-25, 28, 29 | Offer one "SKIP ALL" for first-timers; do not auto-play the Opening on first Story entry. |
| 11 | minor | Story cutscene | Chapter 1 caption "THE GRAND FEAST" at the bottom is tiny and sits on the plate/strawberry, low contrast. | shot-25 | Larger caption with shadow or a separate title card. |
| 12 | minor | Chapter Clear | Chapter clear shows no buttons; I had to press Space and then the next chapter's cutscene started ("CHAPTER 2 · DINNER FOR FOUR") with no "Continue / Map / Menu" choice. Stars earned (2) are only visible as small ★★ in the HUD. | shot-30 | Show stars earned and NEXT CHAPTER / MAP buttons. |
| 13 | minor | Chapter Clear | The "THIS MATCH" box and SHARE button cover the lower-left of the table and the kaiju tails; fine but the 36 px text is small. | shot-30 | Acceptable; bump text slightly. |
| 14 | minor | Gallery | All locked colour swatches look identical (padlock). Cannot tell what a colour looks like or which is which without tapping each. | shot-32 | Show a greyed colour preview under the lock. |
| 15 | minor | Gallery | Earning hint for a locked colour is tiny, at far right (x=1036, about 11 px), easily missed. | shot-33 | Show it in a banner under the swatch row. |
| 16 | minor | Gallery | Header "Collection 53% · 🪙 270 / 🐉 14/20 · 🍽 13/18 · 🎨 4/21": wraps to two lines, the second line is tiny. | shot-32 | Stack deliberately or shrink fewer items. |
| 17 | minor | Free Play | Subtitle "Tiny monsters. Giant dinner." is partly hidden behind a fork prop. Setup is otherwise clear. | shot-19 | Move subtitle or the decoration. |
| 18 | minor | Free Play | "13/20 kaiju" vs Party Modes "14/20 kaiju" a minute later (I had unlocked one) is fine, but "play & Story unlock more" is vague. | shot-19, 44 | Say how (e.g. "win matches"). |
| 19 | minor | Twist picker | Descriptions use different font sizes (FISTS ONLY / MIRROR MOVES descriptions are about 11 px while others are 14 px); the double ⚡⚡ titles use "MOVES + TURBO" abbreviations ("ONLY + RINK") that mean nothing. | shot-20 | Equal sizes; use full names. |
| 20 | minor | Twist picker | TRY IT is OFF by default and its explanation is not shown; a first-timer wouldn't know that tapping a twist otherwise sets it for the match. | shot-20 | Show a one-line caption: "TRY IT: tap a twist to play one quick round". |
| 21 | minor | Try It | A 1-round Try It game still pays tokens (+74) and counts a "match" (Plot Twist achievement); may be exploitable for grinding. | shot-24 | Reduce or pay 0. |
| 22 | minor | Party Modes | With Cup ON, the subtitle at the top still shows the stale description ("Eat the most crumbs before time runs out") although MODE reads "CUP PICKS". Confusing about which mode is live. | shot-45 | Show "Party Cup: 6 games, mode changes each game". |
| 23 | minor | Party Modes | All 6 seats empty ("click or THROW to join"); a newcomer must join before PLAY works (no hint on PLAY button). | shot-44 | Auto-seat the player or grey PLAY with the reason. |
| 24 | polish | Title | Top-right buttons (SETTINGS, HELP, KAIJU...) have 9-10 px text: hard to read. "KAIJU" button label hides that it is the Gallery. | shot-1 | Bigger text, rename "KAIJU" to "GALLERY". |
| 25 | polish | Title | NEXT UP box is a 3-line dense block with an icon-less second and third line; the 3rd line truncates "Ocean colour (30%)" only in some states. | shot-1, 49 | Fine; a progress bar would read faster. |
| 26 | polish | Title | "Ch 2/12 · ★ 3" on the Story card is OK but "Today: HOT DUMPLING" assumes the player knows the mode. | shot-31 | Add "(new!)" / short description on hover. |
| 27 | polish | Daily match | The intro text on the red checkered Picnic Blanket (2 lines of gold text plus a tip) is hard to read: outlined but the 3 lines overlap the central ant trail and kaiju (shot-39). | shot-39 | Put intro text on a dark panel. |
| 28 | polish | Instant Replay | Replay plays after I was eliminated, labelled "FAST FORWARD x3 · only bots left", with floating "Hot Dumpling! STOMP READY!" and "STOLEN!" labels overlapping each other. | shot-40 | Skip replay in lost rounds, or clean stacked labels. |
| 29 | polish | Pause | Escape did not open pause during the instant replay (first Escape did nothing). | shot-41 | Allow pause or skip during replay. |
| 30 | polish | Online | The Play Online dialog uses a different (rounder, plainer) font and button style than every other screen; `/look` cannot see any of its text. | shot-47 | Use the game font for consistency. |
| 31 | polish | Kid Mode | With Kid Mode ON, Settings and Title look identical in size (checked Settings, Title). | shot-48, 49 vs 37, 1 | Increase Settings labels/subtitles and title card subtitles, as the brief promises. |
| 32 | polish | Settings | Setting descriptions are 12 px; and "Saved on this device · ENTER / click to change" is tiny at the bottom. | shot-37 | Bigger sub-labels. |
| 33 | polish | Story map | Level order snakes (row 1 left to right, row 2 right to left): 8 is under 1, 5 is under 4. Numbers are clear but the path lines are faint. | shot-26 | Make connectors brighter or add arrows. |
| 34 | polish | Records | Footer line "Next up: ... Click any locked one to pin it ..." is long and tiny; the column label "PAGE ▶" is easy to miss. | shot-34 | Shorten; make PAGE a numbered pager. |
| 35 | polish | Result screen | "GOBZILLA JR. RULES THE TABLE" title overlaps nothing but the kaiju art at right covers the table; "NEW KAIJU: Chocomunch!" toast at the top-right while the "NEW KAIJU (Gallery)" line is in the box (double). | shot-17 | Fine; tell the player where to find it (button to Gallery). |

## 🔠 Text and layout check
- Title (shot-1, 31, 49): OK, except tiny top-right button text (issue 24) and subtitle in the Kid Mode state unchanged.
- HELP Basics (shot-2): no overlap or cut-off, but text is small and dense (issue 3). Cutlery (shot-3): OK. Tables (text only, shot-4, not opened): list fits; 3rd column starts at 936. Modes (shot-5): OK but the Twists paragraph is very small (about 11 px).
- Practice HUD (shot-6, 7, 10): OK. Bottom-left prompt fits its box.
- Practice complete (shot-13): OK; dummy playing behind (issue 7).
- Free Play setup (shot-19): subtitle partly behind a fork (issue 17). No other overlap.
- Twist picker (shot-20): OK, inconsistent font sizes (issue 19).
- Ice Rink intro (shot-21): OK; the tip text is readable.
- Result screens (shot-17, 30): OK; no overlap. Box covers a part of the table but not controls.
- Story map (shot-26): OK. Pre-chat dialogue (shot-29): OK (the portrait spoon overlaps chapter tiles but is intentional).
- Story cutscene (shot-25): caption tiny (issue 11). Cutscene 2 (shot-28): OK.
- Gallery (shot-32, 33): OK; tiny hint and header (issues 15, 16).
- Records (shot-34): OK.
- Pantry (shot-35, 36): OK.
- Settings (shot-37): OK, text small.
- Challenges popup (shot-38): OK, no overlap.
- Daily intro (shot-39): text legible but busy (issue 27). Replay (shot-40): labels overlap (issue 28). Pause (shot-42): OK.
- Party Modes (shot-44, 45): OK.
- Workshop (shot-46): OK; the description under the table fits.
- Online (shot-47): OK, different font (issue 30).
- No stacked buttons or cut-off text at the screen edges found on desktop.

## The single biggest structural problem
The game teaches itself very well in Practice and then stops teaching: after the first match, new modes (Daily, Party, Gauntlet, Twists) throw you in with only a name. A first-timer's first 5 minutes are an excellent 9-ish; minutes 5 to 20 are a 6-7 because every new door (Daily, Challenges) has no preview, no plain-language description, and the NEXT UP checklist does not agree with what you already did. The progression "what should I do next?" needs to be one consistent, trustworthy system.

## Big change proposals (2–3, most important first)
### Proposal 1: "First Service" guided path with trustworthy checklist
- **Problem it solves:** NEXT UP says "Go KAIJU" after I already did; Daily / Challenges unexplained; no feeling of a plan after Practice.
- **How it would work (detailed design):** A persistent 6-step card on the title: 1 Practice, 2 Win a match, 3 Go KAIJU in a match, 4 Clear Story ch 1, 5 Try a Twist (TRY IT), 6 Play Daily. Each step shows a tick, a coin value and a "GO" button that jumps straight to the right screen with the right setup (e.g. step 3 opens Free Play vs EASY with "KAIJU FRENZY" twist). Steps 5 and 6 unlock only after step 2. All counters share one source (Practice, Records and NEXT UP all read the same flags). When all 6 are done the card collapses into a "CHEF'S TABLE: NEXT GOALS" card with the pinned achievement.
- **Example moment:** After the first match, the card pulses on step 3 "Go KAIJU in a real match [GO]", one tap, I'm in a quick match with FRENZY and a hint arrow on E.
- **Rewards / progression hooks:** +20 coins per step (already in place), +60 bonus and a Gallery colour on finishing all 6.
- **Risks and edge cases:** Players who skip Practice; steps completed out of order (tick whenever done).
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 2: Preview cards for every new mode door (Daily, Challenges, Party)
- **Problem it solves:** DAILY immediately starts a 4-player Hot Dumpling; CHALLENGES jargon ("Gauntlet", "STARTERS", "Checkpoints").
- **How it would work (detailed design):** Tapping Daily/Gauntlet/Trials/Party opens a half-screen card: mode name, one sentence, a 3-icon rules strip ("pass the dumpling / 3 bots / 3 rounds"), difficulty chip, reward chips, and START / BACK. First time only, a 10-second animated mini-demo or a still with arrows. The Daily card also says "Practice it first" if the player has under 3 wins.
- **Example moment:** Tap DAILY: "Today: HOT DUMPLING. Don't be holding it when it pops! 3 rounds vs 3 bots. Medals: 🥉 play +10 🥈 win +20 🥇 flawless +40. [START] [BACK]".
- **Rewards / progression hooks:** none new; reduces early quits.
- **Risks and edge cases:** More taps for experienced players: show the card only until the mode has been played once, or skip with Shift/held button.
- **Size:** S
- **Score impact for me:** +0.5

### Proposal 3: Icon-based "Cheat card" Help
- **Problem it solves:** Basics page is a text wall.
- **How it would work (detailed design):** Basics = 5 large rows with an icon of the on-screen button/key and a 6-word rule: THROW (hold, release) / SWIPE (close smack) / DASH (dodge and shove) / STOMP (full belly = go giant) / "Last kaiju on the table wins". "More ▼" expands PARRY, Giant Hand, hazards. Keys shown per device automatically (keyboard / gamepad / phone) instead of listing all four.
- **Example moment:** A friend can read the Help in 10 seconds while the others wait.
- **Rewards / progression hooks:** none.
- **Risks and edge cases:** Needs icons per device; a toggle to show the list view for experts.
- **Size:** S-M
- **Score impact for me:** +0.4

## How this round's new features felt
- **🎓 First-timer (Practice, YOU marker):** Strong. Seat marked "▼ YOU", prompt shows the step with keys plus next step ("then: ..."), table counts agreed (13/18 tables everywhere I saw them; 13/20 vs 14/20 kaiju was a real unlock). Remaining issues: Practice counters/ordering (issue 6), KAIJU not counting in NEXT UP (issue 1), dummy keeps playing behind the finish overlay (issue 7). I could not verify "quick taps never get lost" through the harness: F and Shift taps did not tick SWIPE / DASH (issue 8 in the list above).
- **🦖 KAIJU warning:** I went KAIJU in Practice and Daily. The "BELLY FULL! PRESS E / Y → KAIJU" text is great. I did not see the red ring in a real fight, so I cannot judge it. Not seen in match.
- **🏁 Gauntlet / 🎟 Chef's Pass:** Only touched the popup (shot-38). The Chef's Pass line ("0/12 Trial ★ or Gauntlet wave 0/8 → opens 🌶️ Spicy on any reached chapter + the 🍰 Dessert Course early") is accurate but jargon-heavy for a newcomer; Story screen shows "🔒 DESSERT finish the Feast or 🎟 Chef's Pass" which does help. Did not play Gauntlet.
- **🏆 Party Cup:** Cup ON greys MODE ("CUP PICKS") and FIRST TO ("CUP SETS IT"): clear (shot-45). The subtitle stayed on the old mode description (issue 22). Did not play it.
- **🧸 Kid Mode:** Toggled; Settings and Title looked the same size to me (issue 31), so the "bigger text everywhere" was not visible on these two screens. Did not test in a match or Story chat.
- **📖 Gallery:** 🪙 balance shows in header (shot-32) and the locked-colour hint works (shot-33), though small. Did not buy a Shiny (needs Lv 3).
- **🏅 Records:** Footer follows pinned/next achievement ("Next up: Too Hot to Handle (60%)"), good.
- **⚡ Twist picker with TRY IT:** Works as described: one round vs an EASY bot with a clear intro banner "TWIST: ICE RINK — Every table is slippery" (shot-21). Pays 74 tokens and counts as a match (issue 21). TRY IT being OFF by default and unexplained (issue 20).
- **🛠 Workshop:** Picking CUP shows "a solid medium block. Cutlery and kaiju bounce off it, so it's cover from throws · tap the table to place it · tap a prop to remove it · white circles = start spots": good. Did not cycle hazard.
- **📅 Daily:** The medals text (play +10 / win +20 / win without losing a round +40) is shown in the intro, but only for ~3 s over a busy table (issue 27); no open-medals indicator seen before starting since there is no preview (issue 2).
- **🧾 Result screens / Chapter Clear:** Rewards list is clear; Chapter Clear lacks next-step buttons (issue 12).
- **Text and layout audit:** No overlap, cut-off or stacked buttons on desktop; the only issues are small-text and decoration overlaps listed above.

## Bugs that block play
- None blocked play. JavaScript errors: none (`/errors` returned `none` at start, middle and end).
