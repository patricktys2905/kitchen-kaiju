# Playtest evaluation: The Story Fan (profile "story", port 7103)

**Fun score: 6.5 / 10** (charming art, dialogue and receipts, but ch2 to ch3 is a cliff, the Giant Hand decides too many chapters, and the story has almost no between-chapter narrative.)

> Screenshot folder: `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r8-7103\` (shot-N.png). Paths below are `shot-N.png` in that folder.

## What I did
- About 105 harness commands, fresh save.
- Title, then STORY map, then:
  - 📜 STORY LOG (empty state), locked 🔒 SECOND HELPINGS / 🔒 DESSERT tabs, locked chapter 2 panel, 🎁 REWARDS panel, ⚙ SETTINGS (turned KID MODE on).
  - Opening cutscene (🎬 OPENING auto-plays on first entry), chapter 1 intro cutscene (🎬 SCENE), the Head Chef pre-match chat.
- Chapter 1 (The First Course): won 2-0, ★★★.
- Chapter 2 (Dinner for Four): won 2-0, ★★★.
- Chapter 3 (Leftovers, first to 3, Toastbat easy + Mothball normal): lost 5 times, 3 times with manual commands and "auto:normal"/"auto:hard", twice more with KID MODE on. Cleared on the 6th try only with /autoplay level=easy.
- Chapter 4 (Boss of the Belt, Norigon): lost twice (manual and autoplay easy). Saw the PHASE 2 HUD tag.
- About 14 story matches in total (3 wins, 11 losses/rounds-heavy defeats). `/errors` was "none" at start, middle and end.
- Never reached Second Helpings (needs ch 6) or the Dessert Course: the campaign gate stopped me.

## What worked for me
- The cutscene art is lovely (shot-7: Crabbage on the roast chicken). Pre-match chat with a big golden-spoon Head Chef portrait is charming (shot-9).
- Chapter Clear modal (shot-12/30) is well built: ★★★, rival portrait and a rival quote ("Fine... but the boss of the Sushi Bar eats newcomers for breakfast"), unlock teaser, tokens/XP, NEXT / REPLAY / MAP with NEXT focused.
- Receipts on the clear/lose screens carry orders, achievements, First Service, colours ("First Bite +30 🪙 · 🎨 Lime colour!").
- Defeat modal explains WHY you lost ("What beat you: The Giant Hand got you. It grabs the fullest belly: STOMP first, or DASH...", shot-20). The best teaching moment in the story.
- Story map is clear: 12 nodes, boss crowns with red outlines, ★ / 🌶️ / 🎁 progress line, locked tabs say how to open them.
- RETRY does not replay the pre-match chat. Good.
- Boss HUD card carries "👑 PHASE 2: FURIOUS!" (shot-32); the boss crown is visible on the table.
- Rewards panel shows mystery silhouettes with exact conditions and progress ("2/4 cleared").

## 🧾 Exactly what would make this a 9/10 for me
1. **Smooth ch2 to ch4 difficulty (+1.0).** Where: Story ch3 "Leftovers" (and 5, 6 by extrapolation). Ch1 and ch2 are all-easy rivals (I won every round); ch3 jumps to first-to-3 with a *normal* Mothball who goes KAIJU 3x per match, plus a Giant Hand every ~7 s. I lost 5 matches and one tutorial-style chapter should never need 6 tries. Make ch3 "easy + easy" (or Mothball easy), keep first-to-3 only from ch5. Add an auto-offer after 2 losses: "Rivals soften a little for this chapter? YES / NO" (gentler rivals, ★ cap at ★★).
2. **Make the Giant Hand fair and teach it before it matters (+0.8).** Where: ch3 onwards. The hand KO'd me in at least 8 of my rounds, including *right after STOMP* (events: "YOU went KAIJU", "YOU knocked out (hand)"), and in the boss fight. In ch3 it first appears with no tutorial. Add (a) a tip in ch2's chat, (b) a screen-edge red arrow and a 1.0 s "!" over the targeted kaiju when the hand is chosen, (c) KAIJU form immune to the hand (or at least 1.5 s grace after STOMP), (d) a one-time ch3 intro line "The Hand takes whoever's fullest. Dash sideways when its shadow lands."
3. **A real story between chapters (+0.8).** Where: after chapter clear. The only narrative is a one-line rival quote and a generic "Chef's kiss" line; the chapter intro cutscenes are 1-2 captions. Add a 3-6 panel comic beat after each boss (4, 8, 12) and a rival banter line per chapter that changes with stars and with whether you lost first. Show the story so far in 📜 STORY LOG with the art thumbnails (it is a text-only empty page now, shot-4).
4. **Fix the clipped Rewards row (+0.2).** Where: 🎁 REWARDS panel, bottom-left entry "Collect 30 stars... replay chapters for ★★★" is cut by the CLOSE button (shot-28). Move the panel up or shrink the rows.
5. **Boss fight tuning and telegraphs (+0.6).** Where: ch4. "Gentler" boss still beat me twice (once even at easy auto). The PHASE 2 trigger is not announced in the match (no banner, no sound cue visible, aura invisible when overlapped; shot-32). Add a 1.5 s centre banner "NORIGON IS FURIOUS!", a red screen pulse, and a hit-pause; give the player a visible boss HP/round-wins bar.
6. **Kid Mode must make story visibly easier (+0.5).** Where: Settings / Story. With KID MODE ON, ch3 rivals dropped to "easy" but I still lost 0-3 because the hand/KAIJU deck remained. Kid Mode should also disable or slow the Hand, give the player a starting shield, and say so in the Settings blurb ("Story: easier rivals, slower Hand, 1-line chats").
7. **Variety in the clear modal (+0.3).** Where: Chapter Clear. "Not a single round dropped. Chef's kiss!" and "Not even ONE round for me?!" repeat verbatim on every ★★★ clear (ch1, ch3). Write 4-5 variants per star tier and make the rival's line chapter-specific.
8. **Show the star result in the in-match end banner (+0.2).** Where: match end overlay (shot-11). "CHAPTER CLEAR!" shows no stars until you press Enter; show ★★★ right there.
9. **Let me see how many tries it takes (+0.1).** Where: defeat modal. Add "Attempt 3 · best 1 round" so the repeated loss feels like progress.
10. **Chapter-select polish (+0.2).** Where: story map right panel. Make SCENE not overlap the panel border (shot-5), disable or blur SCENE on locked chapters to avoid spoilers, and make the lock text "Clear chapter 1 first" instead of "Beat the chapter before to unlock this one."

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story ch3 Leftovers | Difficulty cliff: ch1/ch2 all-easy, ch3 is first-to-3 with a normal Mothball going KAIJU 3x per match; lost 5 matches before the 6th, only the easy auto-bot won | shot-17, shot-21 | Mothball easy in ch3; first-to-3 only later; soften after 2 losses |
| 2 | major | Matches (ch3, ch4) | Giant Hand KO'd me constantly, including right after STOMP ("YOU went KAIJU", "YOU knocked out (hand)") | shot-24 | KAIJU immune or 1.5 s grace; clearer warning; ch2 tip |
| 3 | major | Defeat modal in ch3 / Kid Mode | With KID MODE ON the loss text was still "The Giant Hand got you!" at 0-3; kid mode doesn't address the hand | shot-27 | Kid Mode slows Hand + shield |
| 4 | major | Ch4 boss | Lost twice (one at easy auto); boss still hard for "gentler"; no clear signal of what to do | shot-32, shot-34 | Boss HP bar, tips, gentler ph2 |
| 5 | minor | Boss HUD | "PHASE 2: FURIOUS!" only on HUD card; the "red aura" is not visible in my frame, no banner/flash in match | shot-32 | Centre banner + red pulse |
| 6 | minor | Rewards panel | Last row "(you have 6/30): replay chapters for ★★★" is cut off under the CLOSE button | shot-28 | Shift panel up / smaller rows |
| 7 | minor | Chapter Clear modal | Canned lines repeat every ★★★ clear: "Not a single round dropped. Chef's kiss!" and "Not even ONE round for me?!" (appended even when rival is Mothball with different tone) | shot-12, shot-30 | Variants per rival/chapter |
| 8 | minor | Match end overlay | "CHAPTER CLEAR!" shows no star count; stars only appear after Enter | shot-11 | Show ★★★ under title |
| 9 | minor | Story map right panel | 🎬 SCENE button touches/overlaps the panel border and crowds "Not cleared yet"; button text sits at the edge | shot-5, shot-6 | Move left 12 px, shrink |
| 10 | minor | Locked chapter panel | SCENE button still enabled on locked chapter 2 (spoiler); "Beat the chapter before to unlock this one." is awkward | shot-6 | Hide SCENE; "Clear chapter 1 to unlock" |
| 11 | minor | Round-end plate | "GOBZILLA ★★★ TOASTBAT ★★★ MOTHBALL ★★★" (in text) reads as three identical blocks; filled/empty stars are hard to parse in the plate and the first-to value isn't stated | shot-17 | Use "GOBZILLA 0 · TOASTBAT 1 · MOTHBALL 2 (first to 3)" |
| 12 | minor | Settings | KID MODE blurb says "Story: easier rivals, 1-line chats, bigger result text"; the brief says Free Play/Party/Daily too: blurb incomplete or inconsistent | shot-25 | Update blurb |
| 13 | minor | In-match HUD | Name shows "GOBZILLA" but story map/picker says "GOBZILLA JR."; inconsistent | shot-10, shot-3 | Use one name |
| 14 | minor | In-match HUD | Round goal ("first to 2/3") never shown during a match; only "ROUND 1 · SUNDAY ROAST" | shot-10 | "ROUND 1 · first to 2" |
| 15 | minor | Story map | Clicking the locked 🔒 SECOND HELPINGS / 🔒 DESSERT tabs does nothing at all (no shake, no toast) | shot-5 | Toast/shake on click |
| 16 | minor | Story ch3 | Chat tip "Eat crumbs... STOMP to go KAIJU... immune to cutlery!" does not mention it is not immune to the Giant Hand | shot-20 | Add "the Hand still grabs" |
| 17 | polish | Story Log | Empty state is one text line in a huge empty panel, no art or hint of what it will hold | shot-4 | Show greyed chapter slots |
| 18 | polish | Chapter Clear modal | Two body lines ("Chef's kiss" and the unlock line) with emoji are tight and slightly off-centre relative to each other | shot-12 | Add 8 px spacing; centre both |
| 19 | polish | Cutscene | Typewriter captions are only 1-2 short lines; first-time Enter skips the whole scene while Space advances the chat (inconsistent keys) | shot-7, shot-16 | One key for advance, one for skip, show hint |
| 20 | polish | Defeat modal | Long text block; same quote repeated from the chapter panel under the hint | shot-20 | Show only the hint |
| 21 | polish | Story Rewards | Mystery silhouettes: kaiju shapes recognisable (turtle) which spoils the surprise | shot-28 | Darker silhouettes |
| 22 | polish | Pre-match chat | Appears every first launch of a chapter incl. ch1 where it repeats the map panel quote word for word | shot-9 | Use different tip text |
| 23 | polish | Chapter Clear (ch3) | "Norigon is already sharpening the cutlery…" -> boss gets no dramatic teaser tone (same template as ch2 "Squidgeon") | shot-30 | Special boss teaser |
| 24 | polish | Story map | No indication that the next chapter is auto-selected after NEXT; map selection stayed on the old chapter after a clear | shot-12 | Auto-select next |

## 🔠 Text and layout check
- Title screen: OK (long NEXT UP line is truncated in `/look` but renders in a banner; not shown in a shot, not verified).
- Story map (shot-3, shot-5, shot-6): no overlap; SCENE button touches the right panel border (issue 9); locked-tab hint text small but readable.
- Story Log modal (shot-4): OK, but nearly empty.
- Rewards modal (shot-28): PROBLEM, last row cut off by CLOSE (issue 6).
- Cutscene opening and chapter intro (shot-2, shot-7, shot-16): OK, caption text and SKIP button clear.
- Pre-match chat (shot-9): OK; golden-spoon portrait overlaps the map behind it by design.
- In-match HUD (shot-10, shot-24, shot-31, shot-32): OK; HUD cards for 3 kaiju fit; "PHASE 2: FURIOUS!" fits on the card.
- Round-end plate (shot-17): OK but ambiguous (issue 11).
- Chapter Clear / Defeat modals (shot-12, shot-20, shot-30): OK, no overflow; dense text but readable.
- Match-end overlay with receipt (shot-11): OK; receipt box clear of the SHARE button.
- Settings (shot-25): OK, all 12 buttons fit, none overlap.
- Not checked: Free Play, Party, Gauntlet, Pantry, Gallery, Online (outside my profile).

## The single biggest structural problem
The story campaign is a series of matches wrapped in a thin shell. The difficulty curve is not a curve (ch2 all-easy, ch3 spike) and the thing that decides most matches is the Giant Hand, a system the story never teaches before it punishes. A story fan wants to feel like the plot is advancing; instead I got stuck retrying ch3 and ch4 and the only narrative reward was a one-line quote. The 9/10 depends on fixing the ramp AND giving every chapter a payoff beat.

## Big change proposals (2-3, most important first)
### Proposal 1: Story difficulty ramp with "Chef Help"
- **Problem it solves:** the ch3 and ch4 walls (11 defeats in 14 matches for me).
- **How it would work:**
  1. Define a per-chapter target win-rate for an average player: ch1 95%, ch2 90%, ch3 80%, ch4 boss 60%.
  2. Rival levels per chapter: ch1 easy; ch2 easy+easy; ch3 easy+easy; ch4 easy+normal boss; ch5 normal; ch6 normal x2; ch7-ch12 ramp to tough/hard.
  3. After 2 consecutive defeats on a chapter, the defeat modal gets a third button "CHEF HELP": next try rivals one level lower and the Hand 30% slower (★ capped at ★★). It resets on clear.
  4. The Hand: introduced in ch2 with a scripted, harmless demo round (it grabs a bot).
- **Example moment:** I lose ch3 twice; the modal offers "🍽 CHEF HELP: rivals go easy this try". I win, get ★★, and the chapter clear says "Replay without help for ★★★".
- **Rewards / progression hooks:** ★★★ needs no help; Chef Help cannot unlock star rewards.
- **Risks and edge cases:** players abusing help for stars (cap), save data for the toggle.
- **Size:** M
- **Score impact for me:** +1.2

### Proposal 2: Chapter story beats (comic panels + rival banter)
- **Problem it solves:** campaign feels like matches with captions.
- **How it would work:** after each chapter clear show 3 panels (art generated in the existing painted style) with 3 lines of dialogue; bosses get 6 panels and a finale cutscene on ch12. The STORY LOG fills with the panels as thumbnails ("The story so far"), tapping reopens the scene. Rival quotes depend on stars and on whether you lost first.
- **Example moment:** After Norigon: panel 1 Norigon bowing, panel 2 Salmonster stealing the crown, panel 3 teaser of the Big Melt.
- **Rewards / progression hooks:** collecting all panels = a Story Album achievement and a colour.
- **Risks and edge cases:** art cost (12 chapters x 3 panels); can start with the 3 bosses.
- **Size:** L
- **Score impact for me:** +0.9

### Proposal 3: Boss fights with readable phases
- **Problem it solves:** ch4 boss is opaque; phase 2 is easy to miss.
- **How it would work:** boss has a visible 3-pip health row under its HUD card; on phase 2 a centre banner "NORIGON IS FURIOUS!" (1.5 s), 0.3 s hit-pause, red vignette pulse, and a persistent red aura ring; the Hand targets the boss less often during phase 2; a pre-boss chat gives one concrete tip ("Norigon dashes after the one with the biggest belly. Keep it at 50").
- **Example moment:** boss falls to its last pip, banner, aura, player dashes under the Hand and wins.
- **Rewards / progression hooks:** "Boss untouched in phase 1" ★ bonus and a boss colour.
- **Risks and edge cases:** screen clutter on phones; honour REDUCED EFFECTS.
- **Size:** M
- **Score impact for me:** +0.6

## How this round's new features felt
- **TOUGH bot level:** not directly visible in story (labels were easy/normal); I did not touch it.
- **Giant Hand dodge:** I tried one DASH at the shadow, results inconclusive in my harness commands (events list the KO but I could not time it). The warning shadow (shot-24) is visible but it hits within about 0.5 s of appearing; a story newbie will not dodge it. Hand KOs happened right after STOMP in ch3, which feels unfair.
- **Hand KO credit:** not observed.
- **Kid Mode:** works for rival levels (ch3 rivals changed to "easy", chats shortened, pre-match chat skipped), but did not make me win; blurb mentions Story while the brief says Free Play/Party/Daily.
- **Shiny forms:** not touched.
- **Party Cup:** not touched.
- **📜 STORY LOG:** present on the map; empty at 0% (shot-4). Need to clear ch1 to see content; I did not reopen it after clears, so I cannot judge the filled state.
- **Locked Second Helpings/Dessert tabs:** good: "clear chapter 6 to open" / "finish the Grand Feast". Clicking them gives no feedback.
- **Boss PHASE 2 HUD card:** present ("🌶️🛡️ 👑 PHASE 2: FURIOUS!") but the red aura is not noticeable and no banner (shot-32).
- **Chapter 4 boss gentler:** I still lost twice; "gentler" is not obvious.
- **TWIST picker, Workshop UNDO:** not touched.
- **Phone layout:** not touched.
- **YOU marker:** "▼ YOU" clear in shot-10 and shot-31.
- **Plates behind result text:** readable (shot-17), but the star row is hard to parse.
- **Receipts:** carry achievements, colours, orders and First Service (shot-11). Good.
- **BRUTAL / Move Lab / Mastery cosmetics / Trials / Pantry:** not touched.

## Bugs that block play
- None crashed; `/errors` stayed "none".
- Soft block: ch3 (Leftovers) and ch4 (Boss of the Belt) are very hard for a first-time story player; 5 defeats at ch3 and 2 at ch4 with no safety valve. Second Helpings and Dessert Course were therefore unreachable in my session.
