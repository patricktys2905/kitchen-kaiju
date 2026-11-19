# Playtest evaluation: The Story Fan (profile 3 "story"), round 10

**Fun score: 7.5 / 10** (charming cast, art, dialogue and Story Log; but chapter 3 is a sudden wall after two free chapters, the story drip between fights is thin, and chapter-clear screens bury the nicest content)

## What I did
- Port 7103, about 125 harness commands, screenshots in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r10-7103\` (shot-1 .. shot-35, all opened).
- Title -> STORY -> Grand Feast map -> OPENING cutscene -> ch1 dialogue (Crabbage, Head Chef) -> ch1 won 2-0 (3 stars) by hand.
- Ch2 won by hand (3 stars). New kaiju reveal (Sloba).
- Ch3 Leftovers: LOST 3 matches (by hand, by auto:normal, by an autoplay hard), then cleared with auto:hard acts for 2 stars. Reward: Smoothie Bar table.
- Ch4 Boss of the Belt (Norigon): intro cutscene and dialogue, won with auto:hard 2-0 (3 stars). New kaiju Minturtle.
- Ch5 and ch6 via /autoplay hard (2 stars then 3 stars). Freezer Shelf table. Second Helpings unlocked.
- Opened Story Log, Story Rewards (8/13), Second Helpings map and its intro cutscene, CHALLENGES (Chef's Pass line), title NEXT UP box.
- About 9 story matches (ch1 W, ch2 W, ch3 L, L, L, then W, ch4 W, ch5 W, ch6 W) plus one stray Free Play match launched by autoplay. Did not reach ch7+ or the Dessert Course. /errors: "none" at start, middle and end.

## What worked for me
- Character writing is the best part: Crabbage's "Not even ONE round for me?!", Norigon's "...Even I answer to someone. A quiet one, in the steamer.", every rival's closing quote. The foreshadowing made me want to reach ch8.
- Each chapter has an illustrated intro cutscene (shot-4, 12, 26) with a typewriter caption; the opening and Second Helpings intro (shot-2, 33) are lovely.
- The Head Chef golden spoon teaches one mechanic per chapter (THROW, DASH shove, STOMP). Teaching order is right.
- Chapter Clear card (shot-11, 25): stars, rival quote, flavour line ("Not a single round dropped. Chef's kiss!"), tokens, and a next-chapter hook ("Squidgeon is already sharpening the cutlery...").
- Defeat card (shot-17) explains WHAT beat you (the Giant Hand) and how to counter it. Genuinely useful.
- Story Log (shot-31) is a great recap and ends with "Next: Short Order Showdown. Bluebeary is waiting...".
- Story Rewards (shot-32) gives concrete goals ("Collect 30 stars ... you have 16/30").
- Second Helpings unlocks with a "now open!" button and the title tile says "Ch 7/12 · Seconds open!".
- KAIJU warning ring (shot-20, 24) reads clearly: white outer ring, yellow reach ring, red fill.

## 🧾 Exactly what would make this a 9/10 for me
1. **Smooth the ch2-to-ch3 difficulty cliff.** Where: Story ch3 Leftovers (and any early 2-rival chapter). Ch1 and ch2 are won with a single "attack" command (3 stars), then ch3 beat me three times in a row, including once with a hard-level autoplayer. The two "easy" bots KO each other but Toastbat goes KAIJU by about 11 s and squashes me, and the Giant Hand arrives around 15-19 s. How: make ch3 one easy + one very easy rival, or delay bot KAIJU until 20 s, and have the Head Chef warn "Giant Hand at about 15 s: STOMP when your belly is full". Impact +0.6.
2. **Show the chapter tip once, and do not cover the card.** Where: story map after Play (shot-7, 13, 15). The Head Chef box covers the rival card and PLAY button, and its line is the same sentence as the italic tip on the card and again on the Defeat card. Skip the intro dialogue on Retry. Impact +0.3.
3. **Let the Chapter Clear story beat be read.** Where: Chapter Clear modal. The full-screen NEW KAIJU / NEW TABLE reveals (shot-14, 28, 30) sit over the rival quote and "Chapter N unlocked" line, so they get tapped through. Show the reveal after the card or inside it. Impact +0.3.
4. **More story between fights.** Where: Grand Feast ch1-6. Each chapter gives one quote and one cutscene sentence. Add a recurring thread (the quiet one in the steamer) with a visible "Clue 1/3" in the Story Log that pays off at the boss chapters. Impact +0.5.
5. **Make bosses feel like events.** Where: ch4/8/12. Norigon "starts every round ready to go KAIJU" but the fight was no tougher than ch3 and had no unique hazard or title card. Add a boss intro card, one boss-only hazard, and a "Boss beaten" reward line. Impact +0.4.
6. **Honest progress numbers.** Where: map header and clear card. After 6 of 12 chapters, "Story 35% complete" (star-based) surprises; ch3 shows 2 stars but not which round was lost. Label the % and show "Lost 1 round". Impact +0.2.
7. **Fix the story/autoplay inconsistency.** Where: /autoplay after a story Retry reported "winner YOU" but the map still said "Not cleared yet" for ch3, and the next autoplay match was a Free Play match (Hotchog). Credit the chapter or say it was Free Play. Impact +0.2.
8. **Clean up in-match overlaps.** Where: KAIJU activation (shot-20) "+20 FIRST SERVICE ✓" toast overlaps the "KAIJU!" banner; Instant Replay (shot-24) banner overlaps the faded "DOUBLE SKEWER!" and second callout. Queue toasts, hide callouts in replay. Impact +0.1.
9. **Story Rewards text.** Where: shot-32. "Chef's Nightmare (TABLE)" touches the card edge; "(6/8 cleared)" is ambiguous. Say "Clear ch 8 (you have cleared 6)". Impact +0.1.
10. **Warn about the Giant Hand when the belly is full.** Where: in match. Players are told to eat crumbs, then punished at belly 100 without stomping. Show a "STOMP NOW!" prompt when belly hits 100. Impact +0.3.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Story ch3 Leftovers | Difficulty cliff: ch1/ch2 trivial, ch3 with two "easy" bots beat me 3 times (and an autoplay hard once). Toastbat goes KAIJU about 11 s and squashes; bots also KO each other which makes it a chaotic 3-way. | shot-16, 19, 21 | Soften ch3 or add a recommendation line. |
| 2 | major | In match, Giant Hand | At belly 100 without stomping, the Giant Hand grabs you; I was KO'd by it three times (including while KAIJU had just ended, "went out at 19s: the Giant Hand"). Only the Defeat card explains it. | shot-17, 21 | "STOMP NOW" prompt and hand shadow warning. |
| 3 | major | Defeat -> Retry | Retry replays the full intro dialogue (3-4 Space presses) every time. 4 attempts = a lot of repetition. | shot-17 | Skip dialogue on retry. |
| 4 | minor | Story map after Play | Head Chef box covers the rival card and PLAY button; same sentence as the italic tip, repeated on the Defeat card. | shot-7, 13, 15, 17 | Show once. |
| 5 | minor | Chapter Clear modal | NEW KAIJU / NEW TABLE reveal covers the clear card; quote and unlock line dimmed behind it. | shot-14, 28, 30 | Reveal after card or inside it. |
| 6 | minor | Match, KAIJU activation | "+20 FIRST SERVICE ✓" toast overlaps the "KAIJU!" banner. | shot-20 | Offset the toast. |
| 7 | minor | Instant Replay | "INSTANT REPLAY" banner with faded "DOUBLE SKEWER!" and a second callout overlapping on the kaiju. | shot-24 | Hide callouts in replay. |
| 8 | minor | Story Rewards | "Chef's Nightmare (TABLE)" runs up to the right edge of its card. | shot-32 | Wrap or shrink. |
| 9 | minor | Story Rewards | "(6/8 cleared)", "(6/10 cleared)", "(6/12 cleared)" ambiguous. | shot-32 | Clear wording. |
| 10 | minor | Map header | "Story 35% complete" after 6 of 12 chapters cleared. | shot-31 | Label as star %. |
| 11 | minor | Chapter Clear | ch3 and ch5 show 2 stars with no mention of which round was lost. | shot-25, 29 | Show "1 round lost". |
| 12 | minor | Story / autoplay | After Retry then /autoplay: "winner YOU" but ch3 "Not cleared yet", and a Free Play match began. | shot-22, 23 | Make the flow consistent. |
| 13 | minor | Defeat match end | "NEW KAIJU: Bubblegumbo!" toast pops at top right on the DEFEATED screen, competing with the loss tip. | shot-16 | Show on the map instead. |
| 14 | minor | Chapter Clear (ch3) | "Smoothie Bar (TABLE)" preview is a tiny thumbnail (about 80x45). | shot-25 | Bigger preview. |
| 15 | polish | Title NEXT UP | Small text (about 12 px) over the busy art; still lists "Finish the 1-minute Practice" at Story ch 7. | shot-1, 34 | One goal, larger. |
| 16 | polish | Cutscene captions | Typewriter caption one short line at a time ("CRABBAGE IS F"), so at slow reading the full sentence is easy to miss. | shot-4, 12, 26, 33 | Tap to finish line. |
| 17 | polish | Story map | Locked chapter tiles are very dark; hard to tell what's ahead. | shot-13, 15 | Lighten locked tiles. |
| 18 | polish | Challenges | Chef's Pass line at the bottom is small, one long line. | shot-35 | Progress bar. |
| 19 | polish | Story Log | Dense small text, no portraits. | shot-31 | Add rival portraits. |
| 20 | polish | Chapter Clear (ch5) | Praise line says "6 knockouts!" while star result is 2 of 3; no explanation. | shot-29 | Add rounds summary. |

## 🔠 Text and layout check
- Title (shot-1, 34): OK. NEXT UP box small but not overlapping.
- Story map (shot-2, 23, 31, 33): OK. Header buttons clear; the locked Second Helpings text fits.
- Story dialogue overlays (shot-6, 7, 13, 15): box covers rival card and PLAY (by design) but the repeated sentence is redundant (issue 4).
- Cutscenes (shot-2, 4, 12, 26, 33): OK; caption legible.
- In-match HUD (shot-8, 20, 24): shot-20 toast over KAIJU banner; shot-24 replay banner over callouts.
- Chapter Clear / Defeat (shot-11, 17, 25, 29): OK, nothing cut off. Reveal overlays (shot-14, 28, 30) dim the card behind.
- Story Log (shot-31): OK.
- Story Rewards (shot-32): "Chef's Nightmare (TABLE)" touches card edge.
- Challenges (shot-35): OK.
- Match end overlays (shot-10, 16): OK.

## The single biggest structural problem
The story has no dramatic pacing between its charming parts. Ch1 and ch2 are free (one "attack" command wins 3 stars), then ch3 suddenly needs KAIJU timing, the Giant Hand and 3-way fights that the Head Chef only half-teaches. As a story fan I lost four times and replayed the intro dialogue each time. The narrative reward (rival quote, unlock line) is buried under reveals, and the plot between chapters is thin. It works as an arcade ladder but not yet as a story people read.

## Big change proposals (2–3, most important first)
### Proposal 1: Ch3 learning ramp with Giant Hand rehearsal
- **Problem it solves:** the ch2-to-ch3 cliff and unexplained Giant Hand deaths.
- **How it would work (detailed design):** ch3 round 1 is "Chef's Rehearsal": one easy rival, the Giant Hand telegraphed at 12 s with a big "STOMP!" prompt when belly is full. Round 2 adds the second rival. Retry skips dialogue. After two losses offer "Casual helping" (rival aggression -30%, capped at 2 stars).
- **Example moment:** belly hits 100, a hand shadow appears and the HUD flashes "STOMP!"; you go KAIJU and win the round.
- **Rewards / progression hooks:** "Hand Dodger" achievement.
- **Risks and edge cases:** too hand-holdy for veterans; show only on the first attempt.
- **Size:** S
- **Score impact for me:** +0.7

### Proposal 2: Story beats with a running mystery
- **Problem it solves:** thin narrative between fights.
- **How it would work (detailed design):** a "Clue" system. Each cleared chapter adds one clue line to the Story Log under "The Quiet One in the Steamer" (from Norigon's hint). 3 clues per act; collecting them unlocks a short cutscene before ch8 and ch12. The clear card shows "NEW CLUE: ...".
- **Example moment:** after ch5: "NEW CLUE 2/3: Bubblegumbo smelled steam on the boss's breath."
- **Rewards / progression hooks:** Gallery lore entries; a Story Log "Mystery" tab.
- **Risks and edge cases:** needs writing; keep each clue under 100 characters.
- **Size:** M
- **Score impact for me:** +0.6

### Proposal 3: Proper boss events
- **Problem it solves:** bosses (ch4, 8, 12) play like normal fights.
- **How it would work (detailed design):** boss title card, a boss-only table hazard (conveyor surge, steamer blast), a two-phase final round, and a "Boss beaten" reward banner on the clear card.
- **Example moment:** Norigon's belt reverses at 20 s.
- **Rewards / progression hooks:** boss badge, boss rematch under Spicy.
- **Risks and edge cases:** balance on Hard.
- **Size:** L
- **Score impact for me:** +0.5

## How this round's new features felt
- **🦖 KAIJU warning:** the ring (shot-20) is readable and the layered rings explain reach; bots waiting 1.8 s helped ch1-2. The "First Service" toast overlapped the banner. The Hand still kills too fast for ch3.
- **🎟 Chef's Pass:** CHALLENGES shows "0/12 Trial ★ or Gauntlet wave 0/8 → opens Spicy on any reached chapter + the Dessert Course early" clearly but small. Story map says "SPICY: clear it (or Chef's Pass)" and "DESSERT: finish the Feast or Chef's Pass", good wording.
- **🎓 First-timer:** did not do Practice; title "FIRST SERVICE 3/6" updated as I played (nice).
- **Text and layout:** toast/banner overlap, replay callout overlap and rewards text edge noted above. Kid Mode and phone not tested.
- Not touched: Party Cup, Gallery shiny buy, Records pin, Workshop, Daily, Twist picker, Gauntlet.

## Bugs that block play
- None blocking. Non-blocking: ch3 autoplay/retry did not register the clear (issue 12). No JavaScript errors (/errors "none" at start, middle and end).
