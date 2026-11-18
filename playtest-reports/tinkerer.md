# Playtest evaluation — The Tinkerer

**Fun score: 7.5 / 10** (a wonderfully deep toy box: 18 tables, 10 singles + 8 double twists, a working Workshop, clean Settings. But the toys are hard to *find, preview, and combine*, and the tinkerer gets no payoff for tinkering.)

> Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r7-7107\` (shot-N.png). Harness commands used: about 108.

## What I did
- Title (shot-1, shot-27): read the First Service / NEXT UP text.
- **Settings** (shot-2): toggled SFX volume, MUSIC volume, SCREEN SHAKE, REDUCED EFFECTS, KAIJU POWERS (off), KID MODE (on), NAME TAGS, BIG TOUCH BUTTONS. Read all 12 descriptions. Opened **BACK UP / MOVE SAVE** modal (shot-7).
- **Keyboard Controls** (shot-4, shot-5): rebound Move up to I (swap behaviour tested), Throw to E (swapped with Stomp), then RESET TO DEFAULT twice.
- **Table Workshop** (shot-8, 9, 10, 11): placed 6 props, cycled SURFACE and HAZARD, COPY CODE, PASTE CODE, SAVE (got "Table Maker unlocked"), cycled all 3 slots, PLAY IT (shot-12, a real match on my table with 4 players).
- **Free Play setup** (shot-18, 19, 22, 23, 25): cycled TWIST through all 19 states (none, 10 singles, 8 doubles), cycled TABLE through all 18 + 3 custom + ALL, toggled POWER-UPS / HAZARDS / FIRST TO, added bots to 6 seats, HOUSE RULES (saved slot 1, COPY AS CODE).
- Matches: custom table (3 rounds), Boomerangs + Giant Cutlery 6-player (shot-20, 21), Fondue Night 6-player Giant Cutlery (shot-26), Move Lab on Gobzilla (shot-34, 35), Trial "Thin Ice" (Ice Rink + Turbo) full clear (shot-38, 40), Team Feast with auto-filled bots (shot-42). Roughly 5 matches started, 1 finished; the rest I quit from the pause menu to save budget.
- Records (2 pages, pinned Rampage) shot-28/29/30; Pantry (bought Toffee colour) shot-31/32; Gallery + Move Lab shot-33; Challenges popup shot-36; Trials shot-37; Party Modes shot-41.
- `/errors`: checked at start, middle, end. **Always "none"** (no JS errors).

## What worked for me
- **Table variety is the star.** 18 tables each with a one-line rules blurb ("Smoothie Bar: the giant blender whirs to life and SUCKS everything in. Run!") and a real, visible mechanic. Fondue Night (shot-26) looks superb and the hazard cheese reads clearly.
- **Double twists are a great idea**: 8 pre-built combos like MINI KAIJU + BOUNCY CASTLE. Twist banner + bottom-right badge during the match make it obvious what's on (shot-20, 38).
- **Workshop does what it says**: place props, 3 slots, surface and hazard pickers, SAVE, PLAY IT really plays the table with the right hazard (the giant hand killed me at 10 s on my table, and the tip even said it goes for the fullest belly). COPY CODE confirms with the code string (shot-10).
- **House Rules** (shot-25) saving a whole setup in 3 slots + a copyable code is exactly what a tinkerer wants.
- **Settings screen is clean** (shot-2): 12 toggles, every one has a plain-English sub-line, nothing overlapping.
- **Key rebinding is thoughtful**: duplicate keys swap with an explanatory line ("A key already in use swaps over."); RESET works.
- **Trials** (shot-37) give the twists a purpose: each is a fixed hard fight with a stated rule set and ★★★ goal.
- **Receipt after a match** lists tokens, mastery, achievements, pinned achievement progress (shot-40): good feedback loop.
- Zero JS errors over about 108 commands, including fast screen swaps and mid-match Escape.

## 🧾 Exactly what would make this a 9/10 for me
1. **Twist/hazard/prop preview and a proper picker (largest gap).** *What:* replace the cycle-only TWIST pill with a picker panel. *Where:* Free Play, Party Modes, Trials intro. *How:* tapping TWIST opens a grid of all 19 (10 singles, 8 doubles) with icon, name, one-line rule and a ★ "played" tick; tap to select, tap two singles to build a custom double. Pill keeps showing the name. Today I had to click 18 times to see them all, there is no way to go back, and I cannot choose which double I want. *Impact: +0.6*
2. **Make the Workshop a real creative tool.** *What:* (a) show the chosen SURFACE and HAZARD on the canvas (shot-9: "Dinner for Four surface" and "Giant hand" changed only the text line, the table drawing stayed "Sunday Roast"); (b) show what each prop does (hover/long-press tooltip "BUMPER: bounces kaiju"; "TOMATO: splats"); (c) raise the 12-prop cap or explain it; (d) add UNDO and drag-to-move; (e) give PASTE CODE visible feedback ("Table loaded!" or "Invalid code"). *Impact: +0.5*
3. **Double twists must persist and be saveable.** *What:* after I played BOOMERANGS + GIANT CUTLERY and quit, Free Play came back with the twist reset to the single "BOOMERANGS", and the next click went to GIANT CUTLERY (shot-22). *How:* keep the exact twist choice (including doubles) across matches and in House Rules; the House Rules slot summary ("CLASSIC · FIRST TO 5 · ⚡ GIANT · no power-ups · easy bots", shot-25) should also name the table and hazards. *Impact: +0.3*
4. **Reward tinkering.** *What:* a "Mad Scientist" meter: each new twist, double, table, or custom-table played adds a stamp; 10/19 twists = a colour, all 18 tables = a title. Today Tables visited reads 1/18 while World Tour reads 2/12 (shot-28), and nothing celebrates trying twists. *How:* Records tab "TWIST LOG" with the 19 twists + wins under each. *Impact: +0.4*
5. **Settings need a Reset-to-defaults and sliders that behave.** SFX/MUSIC are 5-pip cycles with no way to see what "■■■■■" will do until you tap; add a short preview blip and a RESET ALL button. KAIJU POWERS: OFF should visibly warn in Move Lab (see issue #17). *Impact: +0.2*
6. **Tell the player *why* hazards/tips apply.** Tip "The giant hand goes for whoever has the fullest belly" shows on every table, including Leftovers (shot-38) whose blurb never mentions a hand. Either tips should match the table's real hazard or the blurb should list the base hazard. *Impact: +0.15*
7. **Fix the small layout inconsistencies** (long twist names shrinking to tiny text in the pill, 3-line Trials descriptions crowding, title NEXT UP legibility, Pantry Lifeline wrapping). See issues table. *Impact: +0.3*
8. **A "custom match" screen that lets one tap randomise only the things I unlock** (🎲 RANDOM exists, but it gives no preview or lock-a-setting option). *Impact: +0.15*

## 🔍 Every issue I saw (exhaustive)
Severity: blocker / major / minor / polish.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play, TWIST pill | Cycle-only; 19 states, one direction, no way to go back or jump to a given double. Needed 18 clicks to reach the last double. | shot-19 | Picker grid (proposal 1); right-click / long-press = previous. |
| 2 | major | Free Play after a match | Double twist lost: set "BOOMERANGS + GIANT CUTLERY", played, quit; setup now shows "BOOMERANGS" only. | shot-19 vs shot-22 | Persist full twist state incl. doubles. |
| 3 | major | Workshop | Choosing SURFACE ("Dinner for Four") or HAZARD ("Giant hand") changes only the caption; the canvas keeps the Sunday Roast table with no hazard indicator. | shot-9 | Redraw canvas with the surface; overlay hazard zones (e.g. red hand lane). |
| 4 | major | Workshop PASTE CODE | Clicking gives no visible response at all (no prompt, toast or error). Cannot tell if the feature works. | shot-11 | Toast "Paste a table code" / "Loaded!" / "That code isn't valid." |
| 5 | major | Workshop props | 16 props, zero explanation of what any does (BUMPER, POT, TOMATO, LOLLIPOP, MELON). Hint only says "tap one, then tap the table". | shot-8 | Tooltip / info line under palette when a prop is selected. |
| 6 | minor | Workshop | 12-prop cap is never explained; only "6/12 props" in the caption. No message at 12. | shot-9 | "Table full (12/12)" toast. |
| 7 | minor | Workshop | No UNDO, no drag-to-move; to reposition you must tap-remove and re-place. Start-spot circles accept no props but give no hint why (clicking one did nothing). | shot-9 | Add UNDO and drag. |
| 8 | minor | Workshop | Column header "PROPS (tap one, then tap the table)" is jammed against the top of the CUP tile (about 6 px gap) and starts left of the tile grid. | shot-8 | Add 10 px margin / shift tiles down. |
| 9 | minor | Workshop | After SAVE, the slot is not visible as "saved" in the caption (still "SLOT 1/3: My Table 1"); saved vs unsaved state is unclear. NEXT SLOT button label is a folder icon "📂 NEXT SLOT" with no current-slot preview. | shot-9 | Show "saved ✓" and thumbnail. |
| 10 | minor | Workshop | Slots are not renamable: all "My Table N". | shot-8 | Rename field. |
| 11 | polish | Workshop | Saved table's in-match banner reads "ROUND 1 · MY TABLE 1": no author or custom marker. | shot-12 | Add 🛠 badge. |
| 12 | minor | Free Play, TWIST pill | Double twist name shrinks to tiny unreadable text inside the pill ("BOOMERANGS + GIANT CUTLERY"). | shot-19 | Abbreviate ("BOOM + GIANT") or 2-line pill / tooltip. |
| 13 | polish | Free Play header | "⚡ BOOMERANGS + GIANT CUTLERY" uses a single bolt; the pill uses ⚡⚡ (inconsistent). | shot-19 | Use ⚡⚡ both places. |
| 14 | polish | Free Play | "TABLE MY TABLE 1" pill and the "TABLE: MY TABLE 1 — Your own table (Giant hand)." line say the same thing twice. Pill label "TABLE / MY TABLE 1" fine, but the thumbnail beside the line is a tiny wooden swatch that doesn't match the real table. | shot-18 | Show real table preview image. |
| 15 | minor | Free Play seat 1 | Label "GOBZILLA JR." in setup, "GOBZILLA" in match HUD, Gallery list and name tags. Naming inconsistent. | shot-18 vs shot-20 | Pick one name. |
| 16 | minor | Free Play seat 1 | Under the kaiju, "Keys left · A / D" suggests only A/D; the real scheme is WASD (I rebound keys, but this hint did not reflect it either). | shot-18 | Show the actual bound keys, or "WASD". |
| 17 | major | Settings -> Gallery Move Lab | With KAIJU POWERS: OFF the Move Lab still promises "THROW / SWIPE for Seed Spray" (shot-35); I could not see a power fire and the setting is not mentioned. | shot-35 | Force powers on in Move Lab or show "Powers are OFF in Settings". |
| 18 | minor | Move Lab | KAIJU form ends within about 5 s (kaijuSecs 3.1 → 1.5 after 1.5 s). Too short to practise a power. | shot-35 | Infinite kaiju time in Move Lab. |
| 19 | minor | Settings | Title text "SOUND EFFECTS: ■■■■■": after tapping once from 4 pips it went to 5, tapping again wraps to 0 presumably; no on-screen hint of wrap and no test sound described. | shot-2 | Use "−/+" or slider + preview blip. |
| 20 | minor | Settings | Pause-menu MUSIC toggle ("🎵 MUSIC: ON → OFF") is separate from Settings MUSIC level (■■■□□); unclear relation (does OFF reset the 3 pips?). | shot-17 | One source of truth or label "mute". |
| 21 | polish | Settings | No RESET ALL / defaults button for the 12 toggles. | shot-2 | Add button. |
| 22 | polish | Settings | Keyboard Controls: after rebinding, both "Move up" and "Move down" rows keep the highlighted (selected) outline simultaneously. | shot-5 | Clear selection after bind. |
| 23 | polish | Keyboard Controls | Swapping duplicate keys gave "Move up: S" after I set Move down to I (the old Down key moved to Up). Explained only by a small footer line "Left player DOWN = I. A key already in use swaps over." which doesn't name what changed. | shot-5 | "S moved to Move up." |
| 24 | minor | Keyboard Controls | Only 2 keyboard layouts; no gamepad remap, no per-player third layout. Tinkerers want more. | shot-4 | Gamepad mapping page. |
| 25 | minor | Backup / Move Save modal | `/look` doesn't list modal text (harness limitation), but visually OK. Code box is a dense scrolling wall of text; the "Paste" box shows no hint of success. | shot-7 | Show "Loaded!" + confirm dialog before overwrite. |
| 26 | minor | House Rules | Slot summary omits table and hazards ("CLASSIC · FIRST TO 5 · ⚡ GIANT · no power-ups · easy bots") though I had set Fondue Night and Hazards ON. | shot-25 | Include table + hazards. |
| 27 | polish | House Rules | The "(copied)" code line sits very close to the bottom border of the dialog. | shot-25 | 12 px more bottom padding. |
| 28 | minor | In-match intro | Round intro stacks 3 text lines (title, twist description, tip) over the table, crossing the soup bowl/cup; the 3rd line is long: "TWIST: ICE RINK + TURBO — Every table is slippery. The whole game runs faster" nearly spans the whole width (x 82–1235 in the BOOMERANG case). | shot-20, shot-38 | Shorten twist descriptions to <= 60 chars; put on a dark plate. |
| 29 | minor | In-match intro | Faded duplicate "⚡ TWIST: …" text at y=122 appears behind/above the first line at the same time as the 3-line stack. | shot-20, shot-38 | Remove duplicate. |
| 30 | minor | In-match tip | "The giant hand goes for whoever has the fullest belly." shown on Leftovers (blurb says only bread and soup) and on every table; looks like a generic tip. | shot-38 | Tie tips to the table. |
| 31 | polish | 6-player HUD | Seat cards run to the very edge (first card touches x=0 on the left, last on x=1250). | shot-20, shot-26 | 8 px safe margin. |
| 32 | polish | In-match HUD | "KOs 0" and "Chopsticks" label fine, but when armed with cutlery the held item icon is tiny. | shot-20 | Bigger weapon icon. |
| 33 | minor | Title | "NEXT UP / FIRST SERVICE 1/6" block is small light text on a busy photo background with no backing panel; low contrast, three lines at ~13 px. | shot-27 | Dark rounded panel + larger text. |
| 34 | minor | Title | "FIRST SERVICE 2/6" shows after I have not finished the 1-minute Practice, but item 1 is still the Practice. Which steps count is unclear (I only did a Free Play and Gallery). | shot-27 | Show a tick-list (6 icons) with each step name. |
| 35 | minor | Title | PARTY MODES card subtitle "Teams · Rush · Dumpling" wraps to 2 lines, pushing its title up so it's misaligned with the other 5 cards. | shot-27 | Shorten ("Teams · Rush · Cup"). |
| 36 | polish | Title | "◀ ▶ choose · ENTER / A / tap to start" hint is grey on the art, low contrast. | shot-27 | Add shadow/pill. |
| 37 | major | Records | Chef Tokens showed 🪙 20 after I unlocked Table Maker (+30), and Pantry then showed 45 and 5 after a purchase; the Records stat is stale. | shot-30 vs shot-31 | Refresh on enter; pay the achievement immediately and show a toast "+30". |
| 38 | minor | Records | "ACHIEVEMENTS 1/34" but nothing visibly unlocked on page 1; the only unlocked (Table Maker) is on page 2. No sort option "unlocked first". | shot-28, shot-30 | Sort unlocked/near-done first, or filter tabs. |
| 39 | minor | Records | "Tables visited 1/18" vs achievement "World Tour 2/12" (counts custom tables?). Inconsistent. | shot-28 | Count the same set. |
| 40 | minor | Records | "Chef Rank / Next rank: Prep Cook at 6 pts (2)" — what are "pts" and how do I earn them? Never explained on Records or Pantry. | shot-28, shot-31 | Tooltip: "1 pt per achievement, +1 per 5 wins…". |
| 41 | polish | Records | Footer is two dense lines of 13 px text; "Next up: Rampage (33%)" and the pin instruction share one run-on line. | shot-30 | Split into two rows. |
| 42 | polish | Records | "Plot Twist: Win a match with a twist on" unlocked only at the end of a won twist match; no mention that Trials with twists count. Fine, but the Trial clear was needed. | shot-40 | Clarify. |
| 43 | minor | Pantry | LIFELINE card wraps to 3 lines ("245 🏷 TODAY 30% OFF (was 350) (not enough yet)") and fills its box to the bottom edge; neighbours have 2 lines. | shot-31 | Put the deal tag on its own banner line / smaller. |
| 44 | polish | Pantry | Left panel text wall "Earn 🪙 Chef Tokens from every match: playing, winning…" is long and small; Chef Rank footer is bold small caps cramped at the bottom of the panel. | shot-31 | Add spacing; shorten. |
| 45 | polish | Pantry | Weekly orders still show 0/20 knockouts when Records shows 3 KOs; unfinished matches don't count (reasonable but unexplained). | shot-31 | "Counts when a match ends." |
| 46 | minor | Gallery | Top-right "Collection 58% / 16/20 · 15/18 · 3/21" is tiny and tight against the right edge; icons unlabelled. | shot-33 | Larger, labelled chips. |
| 47 | minor | Gallery | Colour row: 21 pills, most locked padlocks with no names/unlock hints visible without hovering. | shot-33 | Show name + requirement under selected pill. |
| 48 | polish | Gallery | Mastery line "Mastery ★☆☆☆☆☆ Lv 1 Rookie (0/60 XP) · next: ✨ Dash sparkles" wraps and orphans "sparkles". | shot-33 | Shorten or widen box. |
| 49 | polish | Gallery | Move Lab button label "🥋 MOVE LAB / try its power" is 10 px; secondary text hard to read. | shot-33 | Bigger. |
| 50 | polish | Challenges popup | "Seconds / clear wave 12" vs "Best wave: 0": no hint how to unlock the first checkpoint (wave 4 of Starters). Text in the footer is small. | shot-36 | Add "Reach wave 4 to unlock MAINS". |
| 51 | minor | Trials | Three-line descriptions (Thin Ice, Two Crowns, Chef's Table) crowd their cards; text sits within 6 px of the border. Cards on the left have different heights/padding than the right (title y=150 vs 141). | shot-37 | Fixed card height + 2-line copy. |
| 52 | polish | Trials | Typo-style hyphenation "a boom-rang twist" vs "BOOMERANGS" everywhere else. | shot-37 | Use "Boomerangs". |
| 53 | minor | Trial result | "TRIAL CLEAR ★☆☆" text block lies directly over the soup bowl and table centre; mid-line "+20 🪙 for 1 new star!" is partly over the bowl rim. | shot-40 | Dark scrim behind result text. |
| 54 | polish | Trial result | Receipt panel (bottom left) overlaps the table mat and bread, and sits only 24 px from screen edge; SHARE button touches the receipt panel's bottom. | shot-40 | 16 px gap. |
| 55 | polish | Trial result | Receipt says "THIS MATCH +25 Chef Tokens (70)" – good; but "Mastery Lv 1 Rookie · 53/60 XP" also fine. No bug; only noting the instruction "1 / START retry · Esc trials" is keyboard-only language on a result with RETRY/MENU buttons. | shot-40 | Drop duplicate. |
| 56 | polish | Party Modes | Bottom stack: join hint + Party Cup description line crowd the PLAY button and the KEYS/HOUSE RULES buttons (two 13 px lines within about 30 px). | shot-41 | More spacing. |
| 57 | polish | Party Modes | The two long lines at y=652 are truncated in `/look` ("GOL…"), visually fits at x=181–1100. OK; note only that text is small. | shot-41 | Bigger. |
| 58 | minor | Party Modes | PLAY with zero players joined silently starts a match with auto-filled bots (Gobzilla RED, Chocomunch BLUE...). No confirmation. Good for convenience but unexpected given the "click a seat to join" copy. | shot-42 | Toast "Filled seats with bots". |
| 59 | minor | Pause menu | Same pause buttons as Practice/Move Lab; no "Settings" or "twist info" entry; can't check which twist is active apart from corner badge. | shot-17 | Add INFO row. |
| 60 | polish | Pause menu | In Move Lab, pause shows RESTART, not "Pick another kaiju". | (not shot) | Add "GALLERY". |
| 61 | polish | Round-end | After a round end, "BLOBLIN skewered themselves / BLOBLIN skewered CRABBAGE" – kill feed shows two stacked lines with identical colour; hard to read at the bottom edge (y=672/695 touching the edge). | shot-16 (replay) | Move up. |
| 62 | polish | Instant replay | Replay banner sits over the red hand lane; fine, but the lane and arrows clash with the "INSTANT REPLAY" text. | shot-16 | Lower banner opacity. |
| 63 | polish | Settings | Description text under each toggle is 11 px; "Free Play / Party: whoever is behind starts rounds with a fuller belly" is tiny and nearly touches the box edge. | shot-2 | Slightly larger or shorter text. |
| 64 | polish | Free Play | Hazards ON/OFF and Power-ups ON/OFF only toggle; there's no per-hazard control (only "No hazard" via tables), so a tinkerer cannot e.g. keep the hand but remove the blender. | shot-18 | Hazard picker per table. |

## 🔠 Text and layout check
- **Title** (shot-1, shot-27): top-right small buttons readable but small (about 10 px). NEXT UP text low contrast on busy art; PARTY MODES subtitle wraps and misaligns. No overlaps. Problems listed (#33-36).
- **Settings** (shot-2): OK. No overlap/cut-off. Sub-lines small (11 px) (#63).
- **Keyboard Controls** (shot-4, 5): OK; duplicate selected highlight (#22).
- **Back up / Move save modal** (shot-7): OK. The modal covers settings correctly, buttons not overlapping.
- **Workshop** (shot-8–11): header label jammed against CUP tile (#8); long copied-code text is truncated with "…" (OK); buttons not stacked.
- **Free Play setup** (shot-18, 19, 22): OK except double-twist pill text tiny (#12) and the TABLE swatch.
- **House Rules dialog** (shot-23, 25): OK; "(copied)" line close to bottom (#27).
- **Match intro** (shot-12, 20, 38): 3-line stack over table props; faded duplicate twist line (#28, #29).
- **In-match HUD** (shot-14, 16, 26): 6-player HUD touches the left/right edges (#31). Otherwise OK.
- **Pause menu** (shot-17): OK.
- **Move Lab** (shot-35): OK; banner at the top readable.
- **Records p1/p2** (shot-28, 30): OK; footer cramped (#41).
- **Pantry** (shot-31): Lifeline text 3 lines to card bottom (#43); left panel cramped (#44).
- **Gallery** (shot-33): top-right collection tiny (#46); mastery line wraps (#48).
- **Challenges popup** (shot-36): OK.
- **Trials** (shot-37): 3-line descriptions crowded (#51).
- **Trial result / receipt** (shot-40): text over bowl and receipt at edge (#53, #54).
- **Party Modes** (shot-41): OK, crowded bottom stack (#56).
- **Team Feast match** (shot-42): started (not examined in detail beyond the HUD list "RED · Chopsticks / BLUE · unarmed", which reads fine).

## The single biggest structural problem
**The customisation systems are islands with no discovery or payoff.** Twists, tables, hazards, props, house rules and keybinds are each good in isolation, but there's no place to *see* them (no twist gallery, no hazard preview in the Workshop, no prop descriptions), the main control for twists is a one-way cycle button, and the one thing a Tinkerer wants most (combining and sharing weird rules) loses state (double twists reset after a match, PASTE CODE does nothing visible). Nothing records that I tried 12 of 19 twists, so the game never says "nice, keep going". A great variety of content is hidden behind controls that don't invite experimentation.

## Big change proposals (2–3, most important first)
### Proposal 1: The Mutator Lab (twist picker + custom doubles + Twist Log)
- **Problem it solves:** 19 twists reachable only by repeated clicking; no preview; doubles are a fixed list; doubles reset after a match; no reward for trying them.
- **How it would work (detailed design):** Tapping TWIST (Free Play, Party Modes, Trials intro) opens a modal "🧪 MUTATOR LAB". Left: grid of 10 single-twist cards (icon, name, one-line rule, ✓ if played, ★ if won with it). Right: "YOUR MIX" with two slots. Tap a card to fill slot A, tap another for slot B (max two; the 8 curated doubles are shown as "Chef's Specials" presets with an extra badge). Bottom: LIVE PREVIEW (a 3-second looping mini-table clip or icon sequence) and warnings such as "Ice Rink + Bouncy Castle: may be chaotic". Buttons: USE MIX, RANDOM MIX, CANCEL. Selection persists in the setup, in House Rules slots and in the code string. Quick hotkeys: left/right changes slot, R random.
- **Example moment:** I pick MINI KAIJU + ICE RINK, press USE MIX, play, and on the result screen the receipt says "🧪 New mix! Mini Kaiju + Ice Rink (3/45 mixes)".
- **Rewards / progression hooks:** Twist Log in Records: 10 singles + 45 possible pairs; 10 different twists played = a colour; 20 mixes = a title; first win under a mix +10 🪙; weekly order "Win with 3 different twists".
- **Risks and edge cases:** Some pairs conflict (Fists Only + Giant Cutlery) — grey out with a reason; balance; online sync (host decides). Trials must pin their twist (locked).
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 2: Workshop 2.0 (visual surface/hazard, prop info, share, undo)
- **Problem it solves:** surface/hazard choice is text-only; props unexplained; PASTE has no feedback; no undo/drag; 12-prop cap unexplained; no way to test quickly.
- **How it would work (detailed design):** Canvas redraws the selected surface and overlays the hazard's footprint (hand lane, blender circle, cleaver lanes). Palette gets a one-line description of the selected prop in the grey strip under it (e.g. "BUMPER: bounces anything that touches it", "POT: slows kaiju standing on it"). Toolbar: UNDO, REDO, drag-to-move (long-press), MIRROR (symmetry button that places props on all four sides, good for fair tables). Prop counter turns red at 12/12 with a toast. COPY CODE puts a code in the clipboard and shows a QR-free short code ("KKT1-…"); PASTE CODE opens an input modal with LOAD and a result line (valid, or "Not a table code"). Slots become named (tap the name to rename) and show a thumbnail. PLAY IT launches with a 2-bot test, and the pause menu has "BACK TO WORKSHOP".
- **Example moment:** I place 4 bumpers in a ring, choose Smoothie Bar surface + Blender hazard, see the blender circle overlaid in the middle, hit PLAY IT, find a prop in the blender zone is silly, press BACK TO WORKSHOP and drag it.
- **Rewards / progression hooks:** Table Maker already pays 30 🪙; add "Table Tinkerer" (use 8 different props), "Fair Play" (a table played 10 times), and a shop entry for new props (Pantry) so props are earned.
- **Risks and edge cases:** Overlay clutter on small screens; code size; blocking props covering start spots (validate).
- **Size:** M
- **Score impact for me:** +0.5

### Proposal 3: House Rules as shareable "Rule Cards" with a Daily Tinker
- **Problem it solves:** House Rules only save locally, summaries omit table/hazards, no social loop for tinkerers.
- **How it would work (detailed design):** Each slot becomes a card: name (editable), emoji, summary of ALL settings (mode, table, twist mix, hazards, power-ups, first-to, bot level). A "TINKER OF THE DAY" slot on the title offers a random but fair set of rules (one mix, one table, one hazard flag) with a +20 🪙 reward for the first win. Cards export as codes and can be tapped from Online lobbies.
- **Example moment:** Friday: I open Daily Tinker, "Smoothie Bar + Fists Only + Mirror Moves, first to 2", win, get a card stamped "Friday Mix #12" that I save into slot 2.
- **Rewards / progression hooks:** Mix stamps feed Twist Log; weekly "Tinker 5 days in a row" order.
- **Risks and edge cases:** Needs deterministic seed by date; keep daily within balanced bounds.
- **Size:** S-M
- **Score impact for me:** +0.3

## How this round's new features felt
- **Progression (mastery, Chef Rank, achievements, pin, daily deal):** Pinning (Records, shot-30) is smooth and shows on the title NEXT UP and in the receipt (shot-40), which feels great. Chef Rank is opaque ("6 pts (2)"); no explanation of pts (#40). Table Maker's +30 🪙 was not reflected in Records (#37). Daily 30% deal visible on Lifeline but wraps awkwardly (#43). Cheap colours (Toffee at 40) are a good first purchase; I bought it with the first tokens and it showed "✔ OWNED".
- **🍽 First Service:** Idea is good, but the block on the title is small and hard to read (#33), and it's unclear which actions tick it (#34).
- **CHALLENGES / Trials / Move Lab:** Trials are the best use of twists so far ("Thin Ice" = Ice Rink + Turbo plays fast and well, got ★ clear then +20 🪙). The ★★ and ★★★ rules are clearly stated both before and after (shot-37/40). Move Lab is a nice idea but the short KAIJU time and Powers-OFF interplay undermine it (#17, #18).
- **⚡⚡ Double twists:** Content is fantastic and fits the tinkerer identity, but selecting is clunky, tiny pill text, and doubles reset after a match (#1, #2, #12).
- **🏆 Party Cup:** I only looked at the setup (shot-41): the cup line ("6 games: CLASSIC → CRUMB RUSH → HOT DUMPLING → TEAM FEAST → GOLDEN SPOON → CLASSIC · points 5/3/2/1") is clear but cramped; I did not play a cup.
- **Story / Kid Mode:** I only toggled KID MODE in Settings ("Story: easier rivals, 1-line chats, bigger result text"); description is clear, no layout problems.
- **Workshop COPY / PASTE CODE:** COPY works and confirms (shot-10); PASTE has no visible response (#4).
- **Text and layout audit:** Mostly clean (Settings, Keyboard, Challenges popup, Records all clean); issues are mainly the density of small text and a few cramped cards, listed above.

## Bugs that block play
- None. 0 JS errors (`/errors` = "none" at start, middle and end). Nearest-to-blocking: PASTE CODE gives no feedback (#4) and double twists reset after a match (#2).
