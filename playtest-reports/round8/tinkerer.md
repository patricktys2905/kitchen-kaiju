# Playtest evaluation — The Tinkerer

**Fun score: 7.0 / 10** (the tinkering toolbox is wide and mostly works: 11 singles + 7 doubles of twists, a 12-prop Workshop, rebinding, House Rules. But the tools never explain themselves, a few silently drop my choices, and the pickers do not show what a choice actually does.)

> This round the bar is **9/10 from EVERY profile**. Everything below is from the real game over the harness (port 7107). Screenshots live in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r8-7107\` (written `shot-N.png`).

## What I did
About 105 harness commands, roughly 55 minutes of play-equivalent. `/errors` was `none` at the start, in the middle and at the end.
- **Title** (shot-1). Read the NEXT UP box.
- **Settings** (shot-2): toggled COMEBACK HELP, KID MODE, REDUCED EFFECTS, NAME TAGS and PLAYER NUMBERS. Opened BACK UP / MOVE SAVE (shot-8).
- **Keyboard Controls** (shot-3):
  - Rebound THROW to J.
  - Tried the reserved key G, which is refused.
  - Esc-cancelled a rebind.
  - Set Left THROW to ↑, which is Right's key (swap/steal wording).
  - RESET TO DEFAULT.
- **Table Workshop** (shot-9/10/11):
  - Placed props up to the 12/12 cap.
  - Removed props by tapping them on the table.
  - Used UNDO.
  - Cycled SURFACE and cycled HAZARD through all six options.
  - Used COPY CODE, SAVE, NEXT SLOT and PLAY IT.
  - Played my table with 4 players.
- **Free Play**:
  - Opened the TWIST picker (shot-16).
  - Picked a double (FISTS ONLY + ICE RINK) and a single (BOOMERANGS).
  - Cycled BOT LEVEL through EASY, NORMAL, TOUGH, HARD and BRUTAL.
  - Cycled TABLE through all 18 plus My Tables and "ALL".
  - Toggled POWER-UPS and HAZARDS.
  - Used RANDOM.
  - Opened HOUSE RULES (shot-20) and saved a slot.
  - Copied a setup code.
- **Party Modes** (shot-23/24): cycled all 5 modes, Party Cup ON/OFF and CUP LENGTH. Played Crumb Rush with the SNACK ATTACK twist.
- **Gallery**: bought a Shiny for Gobzilla, tried it on Crabbage, and opened Move Lab (stomp + power, Esc leaves).
- **Pantry**, **Records** (page 1), **Challenges and Trials** (played "Thin Ice", the ICE RINK + TURBO double twist).
- **Daily** (Hot Dumpling), **Help** (all 4 tabs), **Story map** (opening cutscene, STORY LOG, locked tabs).
- **Matches:** 5 full matches (2 Free Play, 1 Crumb Rush, 1 Trial, 1 Daily; I won none), 1 Workshop match (quit from the pause menu), 1 Move Lab session. I played a handful of rounds by hand with `/act`; the rest went through `/autoplay`.

## What worked for me
- **The TWIST picker is excellent.** It is one grid, with singles first and then ⚡⚡ doubles in pink, a clear ✖, and descriptions on every single (shot-16). I could try 5 twist combos in under a minute.
- **The twist is never hidden in a match.** A ⚡ label sits bottom-right (shot-18, shot-38), and the Free Play footer explains the active twist in a sentence.
- **Workshop controls are discoverable.**
  - UNDO works, and "Removed." appears as feedback.
  - The 12-prop cap is shown as `N/12`.
  - SURFACE, HAZARD and a "Giant hand" badge show on the preview.
  - Placing on a start-spot circle is quietly refused, which is sensible.
  - "Saved! 🏆 Table Maker unlocked!" is a nice reward beat.
- **Key rebinding is careful.**
  - "G is used by the menus. Pick another key."
  - "A key already in use swaps over."
  - "Press the new key (Esc to cancel)."
  - "Back to the default keys."
  - The remap UI is the most polished tinkering screen in the game.
- **House Rules** (3 slots + share code) is a great idea. The summary line "Classic · first to 3 · ⚡fists · tough bots" is readable.
- **Move Lab** is a great sandbox. A single Esc leaves, and the HUD hint "STOMP to go KAIJU, then THROW / SWIPE for Claw Snap" tells you exactly what to do.
- **Name Tags + Player Numbers** make 4-player matches much easier to follow; the YOU marker is clear.
- **Fun detail:** the table-per-hazard descriptions ("Hot cheese splats down from the pot. Dodge the shadows; the puddles are sticky!") are fun to read while cycling tables.
- **Settings page** layout is clean: no overlap, descriptions under every toggle (shot-2).
- **Receipt** (shot-26) reads well, and the Story map opening scene is lovely (shot-45).

## 🧾 Exactly what would make this a 9/10 for me
1. **Show a twist's effect in the picker for doubles and give each twist a live preview.** (+0.7)
   - **Where:** TWIST picker in Free Play and Party Modes (shot-16).
   - **How it should behave:**
     - Every ⚡⚡ card currently shows only "ICE RINK + TURBO", the same words as its title.
     - Each double needs a one-line effect, for example "Slippery + faster: braking takes ~2× longer".
     - Hovering or tapping a card should show a 3-second looping thumbnail of the effect.
     - The single cards that use a smaller font (FISTS ONLY, BOUNCY CASTLE, MIRROR MOVES, MINI KAIJU) must use one font size.
2. **Fix the lost double twist and tell me why a twist is not applied.** (+0.6)
   - **Where:** Free Play menu after a match.
   - **How it should behave:**
     - After I played "⚡⚡ FISTS ONLY + ICE RINK" and returned to the menu, the TWIST button read just "FISTS ONLY" and the header "⚡ FISTS ONLY" (shot-20 vs shot-17). The second twist was dropped.
     - The HOUSE RULES slot saved the single only.
     - Twists must persist exactly across rematch, menu and house rules.
     - `/state` also reports a single `twist: "ice"` during the Thin Ice double-twist Trial.
3. **Make the Workshop real: visible surfaces, a hazard preview, and a test mode.** (+0.7)
   - **Where:** Table Workshop.
   - **How it should behave:**
     - Switching SURFACE (Sunday Roast to Dinner for Four) changes only a label; the table art is identical (shot-9 vs shot-10).
     - Show the real surface art, an animated hazard preview (the hand's shadow, the cleaver lanes, the wind arrows), and the hazard name in a badge that does not sit on a start spot (shot-10: the "Giant hand" badge covers the top-right start circle).
     - Add a "▶ TEST (1 player + dummies)" button, so I do not need to launch a 4-player match.
     - Add prop sizes/rotation and a way to place a bumper to bounce cutlery.
4. **Add a "tinker" home: one screen to build a ruleset.** (+0.6)
   - **Where:** Free Play and Party Modes.
   - **How it should behave:**
     - Today there are 8 to 10 buttons in a row (BOT LEVEL / TABLE / FIRST TO / TWIST / POWER-UPS / HAZARDS / RANDOM / ONLINE).
     - Power-ups and hazards are on/off only.
     - Add per-type power-up toggles and a hazard-frequency slider (Off / Rare / Normal / Frantic).
     - Add a damage/knockback slider and a match timer.
     - Show the whole setup as one summary card with a share-code button always visible. Right now the code is only inside HOUSE RULES.
     - See Proposal 1.
5. **RANDOM must not wipe my seats, and must say what it rolled.** (+0.4)
   - **Where:** Free Play and Party Modes.
   - **How it should behave:**
     - Pressing 🎲 RANDOM cleared my 4 seats (shot-23 shows "click or THROW to join" in all six slots) and gave me a 2-player match.
     - It also turned POWER-UPS and HAZARDS off in my first press (header read "POWER-UPS: OFF · HAZARDS: OFF" only because I had already toggled them; it never re-rolled them).
     - RANDOM should re-roll table + twist only, keep seats, bot level and toggles, and show a toast "Rolled: SUSHI BAR + BOOMERANGS".
     - Add a 🔒 lock beside each setting so I can pin the table and re-roll only the twist.
6. **Shiny purchase flow needs price, preview and feedback.** (+0.4)
   - **Where:** Gallery, SHINY button (shot-28/29/30).
   - **How it should behave:**
     - The button only says "✨ SHINY" with no cost and no requirement ("300 🪙 + Mastery Lv 3").
     - Clicking it on a Lv 1 kaiju (Crabbage, shot-30) does nothing and prints no message.
     - Clicking on a Lv 3 kaiju bought it instantly with no confirmation, no price shown and no art change in the big panel; the strawberry looks identical afterwards.
     - The balance went from 300 to 25, which looks like 275, not 300 (or the +25 order reward landed first; either way it is unexplained).
     - Show a coloured pop-up, "Buy ✨ Shiny Gobzilla for 300 🪙?", then swap the panel art to the shiny and add a visible ON/OFF "WEAR" state.
7. **Help must document the tinkering features.** (+0.3)
   - **Where:** HOW TO PLAY, MODES tab (shot-42) and TABLES tab (shot-41).
   - **How it should behave:**
     - The TWISTS paragraph contains the unfilled placeholders "[X]" and "[G]": "Free Play / Party Modes [X]" and "([G] or tap the mode to change)".
     - It never mentions ⚡⚡ doubles, the TWIST picker, power-ups, individual hazards, the Workshop or House Rules.
     - It is also set in a tiny font.
     - Replace it with an illustrated TWISTS page (one card per twist) and a POWER-UPS page.
     - The TABLES tab is cut off at the bottom of the screen (see the issue table).
8. **Power-ups and hazards are invisible to a tinkerer.** (+0.3)
   - **Where:** Free Play, in-match, and Help.
   - **How it should behave:**
     - I could never find out what the power-ups are. They are not listed in Help, the Gallery or the Records page.
     - Add a "POWER-UPS" card in Help with icons, durations and effects, and a first-pickup tooltip in a match ("⚡ SPEED: 5 s").
     - Show the active power-up as a countdown chip on the HUD card.
9. **Fix the opaque square sprites behind emotes and icons.** (+0.2)
   - **Where:** in-match.
   - **How it should behave:**
     - Emote bubbles and status icons draw on a pale rectangle: a yellow square beside SQUIDGEON (shot-19), a 🔥 on a white square above Norigon (shot-25), and a 😱 on a white square (shot-38).
     - They should be transparent PNGs or have rounded bubble backgrounds.
10. **Make the key-binding screen the model for the rest.** (+0.2)
    - **Where:** Keyboard Controls and Free Play seat card.
    - **How it should behave:**
      - The seat card says "Keys left · A / D" while the real left scheme is W A S D + SPACE etc.; make it "WASD + SPACE".
      - Show the live key names on the Free Play card after a remap.
      - Add a "Test keys" strip that lights each action as I press it.
      - Add a duplicate-key warning that names which action lost its key (currently only "A key already in use swaps over.").

## 🔍 Every issue I saw (exhaustive)
Severity: **blocker / major / minor / polish**.

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Free Play menu after a match | Double twist "⚡⚡ ONLY + RINK" (FISTS ONLY + ICE RINK) reverted to "TWIST FISTS ONLY" and header "⚡ FISTS ONLY" after Match, then Menu. | shot-17 (before), shot-20 (after) | Keep both twist ids through the match, the menu and house rules; add a regression test. |
| 2 | minor | Free Play and Party headers | Header shows a single "⚡ ICE RINK + TURBO" while the TWIST button shows "⚡⚡ RINK + TURBO". The bolt count and the naming disagree ("RINK + TURBO" vs "ICE RINK + TURBO"). | (TWIST button text in `/look`) | Use one canonical name and the same ⚡⚡ marker everywhere. |
| 3 | major | Table Workshop, SURFACE | Changing surface (Sunday Roast to Dinner for Four) only changes the label. The preview art is identical. | shot-9 vs shot-10 | Render each surface's real art on the preview. |
| 4 | minor | Table Workshop, preview | The "✋ Giant hand" badge sits over the top-right white start-spot circle. | shot-10 | Move the badge to the bottom-right or inside the corner away from start spots. |
| 5 | minor | Table Workshop | The hazard has no preview. Only a text badge shows (Wind gusts, Cleaver, Hot cheese, Spatula, Giant hand all look alike on the preview). | shot-10, shot-11 | Draw a representative hazard marker or animation. |
| 6 | minor | Table Workshop help line | "tap a prop to remove it" is ambiguous. It means the prop on the table, but the palette is the other tappable thing. | shot-9 | Say "tap a placed prop on the table to remove it." |
| 7 | minor | Table Workshop | The 12/12 cap gives no message when I tap to place a 13th prop. It silently does nothing. | (13th placement at x=900,y=300 removed instead, "Removed.") | Show "Table full (12/12): remove one first." |
| 8 | minor | Table Workshop | Tapping an existing prop while the same prop type is selected removes it, so I cannot place two props close together without accidentally deleting one. | shot-11 | Add an explicit erase mode or hold-to-remove. |
| 9 | minor | Table Workshop, PLAY IT | A 4-player match starts straight away with no player-count choice, and 11 cups sit on and around start areas, crowding the spawn mats (shot-12: cups visibly overlap the count-in text). | shot-12 | Add a player-count selector and keep a clear zone around start spots. |
| 10 | minor | Quit from a Workshop test match | Quitting from the pause menu lands on the Free Play menu, not back in the Workshop. | shot-15 | Return to the Workshop. |
| 11 | polish | Match countdown, custom table | The "Round 1 · My Table 1" caption sits over cups and is hard to read. | shot-12 | Put a dark plate behind the count-in text on busy tables. |
| 12 | minor | Pause menu | "SEED SPRAY!" kaiju-power banner overlaps the "PAUSED" title. | shot-14 | Hide in-world banners while paused, or draw PAUSED above them. |
| 13 | minor | Free Play and Party seat card | Seat card says "Keys left · A / D" but the left scheme is W A S D + SPACE. | shot-15, shot-24 | "WASD + SPACE" (read live from the bindings). |
| 14 | polish | Free Play seat card | Name mismatch: card says "GOBZILLA JR." and the match HUD says "GOBZILLA". | shot-15 vs shot-12 | Pick one name. |
| 15 | major | Free Play, RANDOM | 🎲 RANDOM cleared my seats ("click or THROW to join" ×6) and the next PLAY started a 2-player match (me vs Bubblegumbo). | shot-23, shot-22 | RANDOM keeps seats; rolls table + twist only; show a toast of what changed. |
| 16 | minor | Free Play and Party footer after RANDOM | The footer says "Click a seat (or press THROW on a keyboard / gamepad) to join" with PLAY still visible, so it is unclear whether PLAY works with zero players. | shot-23 | Disable PLAY with a hint when no seats are filled. |
| 17 | minor | Free Play | Default BOT LEVEL was EASY on first open (after I only toggled and un-toggled KID MODE). Unclear whether Kid Mode left it on. | shot-15 | Show the reason ("Kid Mode on") or reset to NORMAL when Kid Mode is switched off. |
| 18 | minor | Settings, KID MODE | Description says "Story: easier rivals, 1-line chats, bigger result text" but the brief says it now also eases Free Play, Party and Daily bots. The description does not match. | shot-2 | "Easier rivals everywhere (Story, Free Play, Party, Daily)…". |
| 19 | polish | Free Play and Party, bottom text | When a twist is active the footer line replaces the useful "4 at the table · click empty seats…" hint. The setup status disappears. | shot-24 | Show both lines or a 2-line footer. |
| 20 | minor | TWIST picker | All ⚡⚡ cards repeat their title as description ("ICE RINK + TURBO"). There is no effect text. | shot-16 | Add a one-line effect. |
| 21 | polish | TWIST picker | Inconsistent description font sizes: FISTS ONLY and MIRROR MOVES use a smaller font than neighbours; BOUNCY CASTLE wraps to two lines. | shot-16 | Normalise to one size; shorten copy. |
| 22 | polish | TWIST picker | Cards for TURBO / BOOMERANGS have no icon, no "recommended with" hint, and doubles have no explanation of why those pairs exist. | shot-16 | Add icons; group doubles under a "COMBOS" header with a short reason. |
| 23 | minor | TWIST picker | Only 7 doubles are offered, hand-picked. I cannot make my own pair (for example MIRROR MOVES + FISTS ONLY). | shot-16 | Allow picking any 2 singles (mark clashing ones). |
| 24 | polish | Trials list | Chef's Table description is set in a visibly smaller font than the other cards and uses "boom-rang twist" while elsewhere it is "BOOMERANGS". | shot-36 | Same font size, same twist name. |
| 25 | polish | Trials list | "Bare Knuckles" card text runs nearly edge to edge of its card (x≈65 to x≈615 of 55 to 625). | shot-36 | Wrap earlier or enlarge the card padding. |
| 26 | polish | Thin Ice Trial result | "SO CLOSE! TRY AGAIN?" shown after losing with 1 KO (goal 4+) and not coming close. | shot-38 | Choose the message from the real margin. |
| 27 | minor | Trials, Thin Ice | The table was Leftovers and not visibly icy (ICE RINK + TURBO); the twist is only a small bottom-right label. | shot-37, shot-38 | Add a frost tint or ice sheen overlay when ICE RINK is active. |
| 28 | polish | Match HUD | The ⚡ twist label in the bottom-right corner is small. | shot-18, shot-38 | Flash a large banner for 2 s at "Round 1". |
| 29 | minor | In-match | Player colours clash: Gobzilla (P1, pink) and Bubblegumbo (P2, pink) look nearly identical in a 2-player Free Play. | shot-22 | Force distinct team colours or outline one in white. |
| 30 | minor | In-match, name tags | The "BLOBLIN" name tag overlaps the P1 badge ("P" cut off) when two kaiju are adjacent with NAME TAGS + PLAYER NUMBERS both on. | shot-18 | Stack tags with collision avoidance. |
| 31 | minor | In-match, effects | Emote and status sprites draw on a pale rectangle: yellow square next to SQUIDGEON; 🔥 on a white box above Norigon; 😱 on a white square. | shot-19, shot-25, shot-38 | Use transparent sprites. |
| 32 | polish | Result screen | "1 / START rematch · Esc menu" text duplicates the REMATCH / MENU buttons, and it is keyboard-centric text on a touch UI. | shot-19, shot-26 | Hide the text when buttons are visible. |
| 33 | polish | Result screen | REMATCH / MENU appear a moment after the text, so a screenshot taken at the first frame has no buttons. | shot-26 vs shot-27 | Show buttons together with the title or add a short slide-in. |
| 34 | polish | Result receipt | Receipt box is tall (y 360 to 645) and covers the left table area plus a start pad. | shot-26 | Collapse to 3 lines with an "expand" toggle. |
| 35 | minor | Hot Dumpling and Crumb Rush results | The standings use "rounds" and "KOs" for the dumpling/crumb modes; "10 KOs in Hot Dumpling" is not meaningful. | shot-44 | Mode-specific columns (crumbs; dumplings passed). |
| 36 | polish | Daily result | Tip "Tough bots? Set BOT LEVEL to EASY…" appears on a Daily that has a fixed level. | shot-44 | Suppress the tip for fixed-difficulty modes. |
| 37 | polish | Daily result | "Bronze daily medal (for playing today: win for 🥈)" shows an emoji where a name would read better; "DAILY CHALLENGE FAILED" is harsh for a participation medal. | shot-44 | "Not cleared yet: try again" and "win for Silver". |
| 38 | polish | Daily count-in | The two banner lines sit on the picnic pattern with only an outline; the crumbs run through the text. | shot-43 | Dark plate behind. |
| 39 | major | Gallery, SHINY | No price, no requirement, no confirmation, no art change. The balance went 300 to 25 (≈275), not the stated 300. | shot-28/29 | See checklist 6. |
| 40 | major | Gallery, SHINY on Lv 1 kaiju | Clicking SHINY on Crabbage (Lv 1) does nothing, with no "needs Mastery Lv 3". | shot-30 | Show the requirement on the button and as a toast. |
| 41 | minor | Gallery | "Mastery ★★★★★★★ Lv 3" prints 7 stars; the pale stars blend in and the line wraps ("(48/160 XP) · next: 🪙 Gold name in matches"). | shot-28 | Use a small progress bar and a reward chip. |
| 42 | minor | Gallery colour row | 18 padlocks with no requirement visible until selected; the unlock hint is the tiny text at the far right ("Classic (wearing) · works on every kaiju"). | shot-28 | Hover/tap tooltip and a legend line. |
| 43 | polish | Gallery | "???" silhouettes (4 kaiju) have no unlock hint. | shot-28 | Add "Clear Story ch 4" etc. |
| 44 | polish | Gallery | "Matches: 3 · Wins: 0" counters are not clearly per-kaiju vs. global. | shot-28 | Label "with Gobzilla". |
| 45 | polish | Pantry | A completed weekly order ("✔ Go KAIJU 8 times 8/8") shows no payout or claim line; the "pays 40" text is a general line. | shot-33 | Show "+40 🪙 paid" on the card. |
| 46 | polish | Pantry | Footer note "Colours you buy appear in the 📖 KAIJU Gallery…" is small and low contrast. | shot-33 | Larger or brighter. |
| 47 | polish | Pantry | Shop "(not enough yet)" is a long suffix that crowds the price line; shows no "need N more". | shot-33 | "40 🪙 · need 15 more". |
| 48 | minor | Records | "Line Cook at 14 pts (you: 8)" is in the display font at a larger size than the other values and sits close to the "Next rank" label. | shot-34 | Same font as the other stat values; shorten to "Line Cook (8/14)". |
| 49 | polish | Records | Locked achievements show a padlock and no hint of the reward until read; "Click any locked one to 📌 pin it" text is small, one line, and runs wide. | shot-34 | Two shorter lines. |
| 50 | minor | Help, TABLES tab | The list runs past the bottom screen edge: "Diner Griddle" description is cut after "Do not be standing on", and "Candy Shop … (0/10" is cut. | shot-41 | Shrink rows or scroll. |
| 51 | minor | Help, MODES tab | TWISTS heading has unfilled placeholders: "(Free Play / Party Modes [X] · online lobby)" and "([G] or tap the mode to change)". | shot-42 | Fill the real key names (or remove). |
| 52 | minor | Help, MODES tab | The TWISTS paragraph is a wall of tiny text; it omits ⚡⚡ doubles, the picker, power-ups and hazards. | shot-42 | See checklist 7. |
| 53 | polish | Help, BASICS | The Controls block lists default keys and does not reflect rebinds. | shot-39 | Read the live bindings. |
| 54 | polish | Help, BASICS | MOVES is a dense 8-line paragraph at about 13 px. | shot-39 | Split into cards with icons. |
| 55 | polish | Settings | BACK UP / MOVE SAVE opens an HTML overlay that `/look` does not list. Hence it is invisible to screen readers and the harness. | shot-8 | Expose it to accessibility. |
| 56 | polish | Settings, BACK UP | The long KK1- code is a wall of text in a tiny box; no QR option. | shot-8 | Offer a QR or a file download. |
| 57 | polish | Settings | NAME TAGS and PLAYER NUMBERS are separate and both draw near the same spot. | shot-18 | Merge into "Labels: off / names / numbers / both". |
| 58 | minor | Settings | No sliders or presets: SOUND and MUSIC are 5-pip toggles with no live preview sound. | shot-2 | Slider, with a sample click. |
| 59 | polish | Keyboard Controls | "Left player RIGHT = ↑. A key already in use swaps over." shows a stolen key but does not say which action lost it. | (status line) | "…swapped with Right player MOVE UP." |
| 60 | polish | Keyboard Controls | No gamepad or phone remap on this screen even though the Help lists them. | shot-3 | Add tabs: KEYBOARD / GAMEPAD. |
| 61 | polish | Free Play, HOUSE RULES | Slot summary omits table, power-ups, hazards and seat count ("Classic · first to 3 · ⚡fists · tough bots"). | shot-20 | Include all settings. |
| 62 | polish | Free Play, HOUSE RULES | "Code: KK1-… (copied)" replaces "Esc closes" in the same line and is long. | (status line) | Put it in a text field with a copy button. |
| 63 | polish | Party Modes | Party Cup help line at y≈661 sits just above KEYS / HOUSE RULES (y≈690), and is long and small: crowded footer. | shot-23, shot-24 | Wrap in a box or move it above PLAY. |
| 64 | polish | Party Modes | "First to 3" is shown for Crumb Rush, which is timed. | shot-24 | Replace with "TIME 60 s" for timed modes. |
| 65 | polish | Party Modes | Header "◀ CRUMB RUSH ▶" has arrows that look clickable but the mode is changed with the MODE button. | shot-24 | Make them work, or remove. |
| 66 | polish | Story map | Tab order: "🔒 DESSERT" sits left of "🔒 SECOND HELPINGS", the opposite of the campaign order. | shot-46 | SECOND HELPINGS first. |
| 67 | polish | Story map | "SCENE" button touches the right edge of the chapter card. | shot-46 | Inset 8 px. |
| 68 | polish | Story map | Entering Story forces the Opening cutscene first, and there is no way to see the map without pressing SKIP. | shot-45 | Play once per save, then go straight to the map. |
| 69 | polish | Title | The NEXT UP box text is long and truncated in `/look`; it is a 3-line list. | shot-1 | Fine in render; shorten the first item. |
| 70 | polish | Title | The "◀ ▶ choose · ENTER / A / tap to start" hint sits very close to the practice button and is low contrast over the art. | shot-1 | Dark plate. |
| 71 | polish | Table cycling | Cycling TABLE passes through My Table 2, My Table 3 and "ALL 18" before reaching the main tables, and the order is hard to predict. | (table cycle) | Group Workshop tables at the end. |
| 72 | polish | Free Play | "BOT LEVEL" cycles EASY → NORMAL → TOUGH → HARD → BRUTAL → EASY; there is no way to go backwards or pick directly. | (bot cycle) | Right-click or a dropdown. |
| 73 | polish | Free Play | Each seat's bot difficulty says "(tap)" but I could not tell whether it changes per seat. | shot-15 | Say "tap to change this bot". |
| 74 | polish | Workshop | COPY CODE copies and shows "Table code copied: send it to a friend! KKT1-eyJuYW1l…" in the same help line, replacing the instructions. | (workshop) | Toast. |
| 75 | polish | Workshop | Slots are named "My Table 1/2/3" with no rename. | (slots) | Rename. |
| 76 | polish | Instant replay | "BLUEBEARY skewered YOU" appears in the replay while "YOU" is the camera's own viewpoint; the replay ghost at the left edge is hard to spot. | shot-37 | Highlight the replayed kaiju with a ring. |
| 77 | minor | Giant Hand dodge | I tried to get a Giant Hand in a Sunday Roast match; within about 12 s of play it never appeared and `/state` `dangers` was always empty. Could not verify the DASH-dodge claim. | (state dumps) | Add a hand-warning ring plus a "DASH NOW" cue; make Move Lab able to spawn it. |
| 78 | polish | Power-ups | Never saw a power-up described anywhere (Help, Gallery, Records). | n/a | See checklist 8. |

## 🔠 Text and layout check
- **Title** (shot-1): OK. The NEXT UP box is readable. The "◀ ▶ choose…" hint is low contrast over art (issue 70).
- **Settings** (shot-2): OK. Nothing overlaps; all descriptions fit. The BACK UP modal (shot-8) is OK visually but not exposed to `/look`.
- **Keyboard Controls** (shot-3): OK.
- **Table Workshop** (shot-9/10/11): hazard badge overlaps a start-spot circle (shot-10). Otherwise OK, and the left button stack has no overlaps.
- **Workshop match / custom table** (shot-12/13): the count-in caption sits over cups (issue 11).
- **Pause menu** (shot-14): "SEED SPRAY!" banner overlaps the "PAUSED" title.
- **Free Play menu** (shot-15, shot-24): OK, but the bottom text lines are cramped (issue 63 on Party Modes).
- **TWIST picker** (shot-16): no overlap or cut-off; inconsistent description fonts (issue 21).
- **In-match HUD** (shot-18, 22, 25, 37): OK, apart from the name-tag/P-badge overlap (issue 30) and the pale-box sprites (issue 31).
- **Result screens** (shot-19, 26, 27, 38, 44): OK, no text overlap or cut-off. The receipt overlaps the table area (issue 34). Pale emote boxes visible (issue 31).
- **Party Modes** (shot-23/24): bottom Party Cup line is tight against KEYS / HOUSE RULES (not overlapping).
- **House Rules modal** (shot-20): OK.
- **Gallery** (shot-28/29/30): OK. Mastery stars line wraps (issue 41).
- **Pantry** (shot-33): OK; small footer text.
- **Records** (shot-34): OK; the "Line Cook at 14 pts" value is oversized (issue 48).
- **Trials** (shot-36): OK, but Chef's Table is in a smaller font and Bare Knuckles is edge to edge.
- **Help: BASICS, CUTLERY, MODES** (shot-39, 40, 42): OK, but the Modes tab has literal "[X]" and "[G]" placeholders.
- **Help: TABLES** (shot-41): PROBLEM. Rows are cut off at the bottom edge of the screen ("Diner Griddle", "Candy Shop").
- **Daily** (shot-43, 44): OK; the count-in lines sit on a busy pattern.
- **Story map** (shot-45, 46): OK. Tab order is odd and SCENE touches the card edge.

## The single biggest structural problem
The game is a good set of rules with a weak, scattered way to **author and understand** them. Twists, hazards, power-ups, tables, house rules and keys each live in a different screen, with different feedback, and several lose or hide my choice. A tinkerer needs a single loop of "change something, see what it does, test it, save it, share it". Today:
- the double twist is dropped after a match;
- the Workshop surface change is invisible;
- RANDOM wipes my seats;
- the Shiny purchase gives no visible result;
- power-ups cannot be inspected at all.

That makes experimenting feel risky rather than fun, which is what caps my score at 7.

## Big change proposals (2-3, most important first)
### Proposal 1: The Rule Lab (one screen to build, test and share a ruleset)
- **Problem it solves:** Tinkering is split across 8 to 10 small buttons plus HOUSE RULES, and the choices are unreliable (issues 1, 15, 20, 61).
- **How it would work (detailed design):**
  - **Entry:** a "🧪 RULE LAB" tile on Free Play and Party Modes, next to PLAY.
  - **Layout:** two columns.
    - The left column is a scrolling list of rule cards (Twist A, Twist B, Table, Hazard frequency, Power-ups with per-type toggles, Bot level per seat, Round target, Timer, Knockback x0.5 to x2, Belly fill rate).
    - The right column is a live 6-second looping demo of the current ruleset (two bots on the chosen table), so every change is visible immediately.
  - **Twist slots:** two slots, so any single pairs with any other. Clashing pairs are greyed out with the reason ("Fists Only has no cutlery to be Giant").
  - **Footer:** a one-line summary, "Ice Rink + Turbo · Sushi Bar · Hazards: Frantic · Hand: ON", plus SAVE (3 slots), COPY CODE, PLAY NOW and a "RESET TO DEFAULT" with an UNDO.
  - **Persistence:** everything is stored once in one object, so menu, rematch, house rules and online lobby all read the same data (fixes issue 1).
- **Example moment:** I choose MIRROR MOVES + BOOMERANGS, set hazard frequency to Frantic, and watch two bots stumble in the demo. I press COPY CODE, paste it in chat, and a friend opens the exact same rules in their lobby.
- **Rewards / progression hooks:**
  - A "Rule Smith" achievement for saving 3 rulesets.
  - A "Tried 10 twists" achievement.
  - A daily "Community ruleset" slot that reuses shared codes.
- **Risks and edge cases:**
  - Unbalanced combos (Fists Only + Boomerangs) need a validity table.
  - Online hosts must override guest settings.
  - Keep the old buttons as shortcuts for casual players.
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 2: Workshop 2.0 (surfaces, hazards and tests made visible)
- **Problem it solves:** The Workshop sets labels that look like they do nothing (issues 3, 4, 5, 9, 10).
- **How it would work (detailed design):**
  - **Surface and hazard preview:** SURFACE renders the real table art in the preview. HAZARD plays a 2-second looped animation: the hand shadow, the cleaver lanes, the wind arrows, the cheese splat, the spatula square.
  - **Test mode:** "▶ TEST" runs a 1-player sandbox with two target dummies and a 15-second hazard cycle, so I can check the layout. Esc returns to the Workshop (fixes issue 10).
  - **Prop palette:** rotate with R, scale with the mouse wheel, and a lock icon to stop accidental removal. Add a "Spawn-safe radius" overlay that shades a ring around each start spot, so props cannot crowd the mats.
  - **Sharing:** COPY CODE shows the code in a box with a "Preview image" (a rendered PNG). Names are editable.
- **Example moment:** I build "Cup Maze" with 11 cups and a Cleaver hazard, hit TEST, see the cleaver lanes cross my cup lines, and move two cups before ever starting a real match.
- **Rewards / progression hooks:** "Table Maker" already unlocks on first save; add "Table Tester" for 10 test sessions and a table-of-the-week featured code.
- **Risks and edge cases:** Requires extra rendering for each hazard; keep it low-res.
- **Size:** M
- **Score impact for me:** +0.7

### Proposal 3: Power-up Codex and visible Shiny shop
- **Problem it solves:** I cannot see what power-ups do (issues 77, 78) and the Shiny purchase has no price, no preview and no feedback (issues 39, 40).
- **How it would work (detailed design):**
  - **Codex:** a new Gallery tab "⚡ POWER-UPS" with one card per power-up (icon, effect, duration, rarity, "seen 12 times").
  - **First pickup:** on the first pickup of each power-up in a match, a 1-second tooltip "SPEED +30% for 5 s" appears over the kaiju.
  - **Shiny shop:** the SHINY button reads "✨ SHINY · 300 🪙 · needs Lv 3 (you: Lv 1)" and stays greyed with the reason when locked. A confirmation sheet shows a before/after of the kaiju (the shiny art swaps into the big panel) and the balance "300 → 0". After buying, a toggle "WEAR ✨" appears.
- **Example moment:** I pick up a glowing icon and read "⚡ SPEED +30% for 5 s". I open the Codex, see "Seen 3 / 8", and a hint for the missing ones.
- **Rewards / progression hooks:** A "Power Collector" achievement for seeing all power-ups; shiny cosmetics visible in the matches become a goal.
- **Risks and edge cases:** Needs the shiny art assets; confirm no accidental purchases on touch.
- **Size:** M
- **Score impact for me:** +0.5

## How this round's new features felt
- **TWIST picker (touched, loved most):** a real improvement over a cycling button, and it lists every twist and the doubles in one view. It needs per-double descriptions, consistent fonts and the persistence fix (issues 1, 20, 21).
- **Workshop UNDO and surface/hazard preview (touched):** UNDO works, and the hazard badge shows. The preview does not actually draw the surface, and the badge overlaps a start spot (issues 3, 4).
- **Tough bot level (touched):** the cycle EASY → NORMAL → TOUGH → HARD → BRUTAL is clear. I could not feel the difference in 1 or 2 auto-played matches; the receipt's "Tough bots? Set BOT LEVEL to EASY" tip came up, which is friendly.
- **Kid Mode (touched):** the toggle works, but the description still describes only Story (issue 18).
- **Shiny forms (touched):** purchasing works but has no price, confirmation or visible change (issues 39, 40).
- **Party Cup (touched):** the ON/OFF switch and CUP LENGTH 3/6 clearly update the explanatory line. I did not run the Cup itself in this session. Quit-twice-prompt untested.
- **Story (touched):** STORY LOG and the locked-tab hints ("clear chapter 6 to open", "finish the Grand Feast") are present. The Dessert/Second Helpings order is odd (issue 66). I did not play a chapter, so the boss PHASE 2 and chapter-4 tuning are untested.
- **Move Lab (touched):** the Esc-to-leave works and the on-screen hint is good.
- **Receipts (touched):** achievements, orders, medals and tips show clearly (shot-26, shot-44). First Service shows on the title as a 0/6 to 4/6 counter.
- **Phone layout, Giant Hand dodge, hand KO attribution (not touched):** I played in desktop mode and never saw the hand in about 12 s of Sunday Roast (issue 77).

## Bugs that block play
- None blocked play. `/errors` returned `none` at the start, middle and end.
- Near-blockers for a tinkerer:
  - the double twist is lost after a match (issue 1);
  - RANDOM clears all seats (issue 15);
  - the Help TABLES tab clips at the bottom (issue 50).
