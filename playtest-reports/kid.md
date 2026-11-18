# Playtest evaluation: The 9-Year-Old

**Fun score: 7.0 / 10** (the matches are funny and pretty and the characters are great; but there is a lot of reading before and after fights, losing gives me nothing, and nothing makes me want to come back tomorrow)

> Harness port 7109. Screenshots are in C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r6-7109\ (shot-1 to shot-21).

## What I did
- Title screen, then Free Play (me vs 1 Crabbage bot, NORMAL): won 3-0. Got +18 Chef Tokens (shot-4).
- Pantry (shot-6): looked at Weekly Orders and the shop. I had 18 tokens and everything costs 120 or more.
- Story chapter 1: went through the Opening cutscene, then a chapter cutscene, then Head Chef dialogue, then the match. Won 3 stars. Got +42 tokens and Mastery Lv 2 (shot-11).
- Story chapter 2 (3 players): went KAIJU once (shot-14), used the KAIJU power, then ran away on purpose to see losing. Got the DEFEATED card (shot-17).
- Gallery (shot-18) and Gauntlet (shot-19 to shot-21): cleared wave 1, picked a perk, lost on wave 2. Score 130, grade D, +56 tokens.
- About 70 harness commands. /errors was empty at the start, the middle and the end.

## What worked for me (briefly)
- Going KAIJU is the best moment in the game. Big strawberry dinosaur, red and yellow stomp rings, "KAIJU MODE!". I would do it every round (shot-14).
- Instant Replay with "GOBZILLA skewered CRABBAGE" is funny and I want to see it again (shot-3).
- The art and the cast are great. The results screens with the huge kaiju screaming in the corner are the best thing in the game (shot-4, shot-21).
- Crabbage saying "Not even ONE round for me?!" after losing 3 stars is exactly the kind of joke I like.
- Matches are short, so I never got bored inside one.
- The Pantry with the Weekly Orders bars is easy to read: big words, big bars (shot-6).

## The single biggest structural problem
**The game is built for people who read, and the fun part is buried under the reading part.** To play my very first Story fight I had to get through three things: an Opening cutscene with a Skip button, a "Crabbage is feelin..." chapter cutscene, and a Head Chef dialogue box that I have to skip with S. Only then did DIG IN! show up. After the fight, the results are small lines of text (the receipt card at the bottom left of shot-4 and shot-21 is tiny, and the chapter-clear text in shot-11 is small). I never looked at it. When I lost chapter 2, the card said "So close! You took a round off them. What beat you: A KAIJU flattened you. Step out of the ring before each stomp, then punish the dizzy shrink." That is 3 sentences, with words like "punish" and "shrink" and no picture.

Losing is also the moment a kid quits. The defeat card gave me a lecture and two buttons, and there was no receipt: no tokens, no mastery, nothing for trying. A 9-year-old who loses twice in a row on chapter 2 closes the game. COMEBACK HELP exists in Settings, but I never noticed it fire in Story. What is missing is a **loop that works with no reading** and **always gives something for trying**.

## Big change proposals (2–3, most important first)

### Proposal 1: "Kid Mode" (picture-first flow, help after losing, and a Sticker Book)
- **Problem it solves:** Three screens of reading before the first fight (Opening, chapter cutscene, Head Chef dialogue). Tiny receipt text. A defeat card full of words (shot-17) with zero reward. Gauntlet dumped me straight into a fight with no setup or explanation (shot-19), then ended with "GRADE D", which feels like a school report.
- **How it would work (detailed design):**
  1. A **KID MODE toggle** on the first-launch screen and in Settings (plus one big button reachable from the title so a parent can set it in one tap). It changes five things.
  2. **Cutscenes and dialogue become one comic panel with one short line.** Each of the 12 chapters gets 1 panel, at most 8 words ("Crabbage is grumpy!"). Dialogue is limited to 1 line of about 40 characters. Max ONE tap between pressing PLAY and DIG IN! (today there are 3 gates).
  3. **Results show icons, not sentences.** One row of 3 big chips (at least 28px text): 🪙 +18, a mastery bar that animates filling, and ONE emoji for "what beat you" (stomping foot = KAIJU, fork = cutlery, falling arrow = edge). The longer tip is behind a "?" tap.
  4. **Defeat always pays.** A lost Story chapter or Gauntlet wave gives +10 🪙 "Brave Cook" tokens plus a sad-face-to-happy-face meter that fills 1 pip per loss on that chapter. At 3 pips the game offers **"Make it easier?"** with a big green button (rivals do 25% less damage, you start with a 50% belly, star cap 1, marked "helped"). At 5 pips it offers a buddy: a friendly second bot on your side for that chapter only.
  5. **Sticker Book (the reason to come back tomorrow).** Every match gives 1 sticker from a pool of 120 (kaiju faces, silly foods, cutlery heroes). A win gives a shiny one; going KAIJU gives a "giant" one. The book has 12 pages of 10 stickers with a progress bar. Completing a page gives a free colour style (the Gallery shows 4/19 colours, shot-18, and the first shop colour costs 120 tokens which is about 7 matches).
- **Example moment:** I open the game. Big button "KID MODE: ON". I tap Story. One panel: grumpy Crabbage on a chicken, "Crabbage is grumpy!" I tap once. DIG IN! I lose twice on chapter 2. The defeat card shows a big stomping foot, +10 🪙 and 1 of 3 sad faces filled. I lose a third time. "Make it easier?" I tap the green button and win. A sticker of a giant Bloblin pops with a loud sound. I want to peel the next one.
- **Rewards / progression hooks:** 120 stickers (about 3 weeks at 5 matches a day), one free colour per page, a kaiju outfit for every 5 pages. Stickers show in the Gallery next to the colours; a parent sees "Pages 3/12" on the title.
- **Risks and edge cases:** Helped chapters must not give 3 stars or the real unlocks. Stickers must be 100% earned, never bought (avoid loot-box feel). Kid Mode must not hide the real game from older players, so it is a toggle. The buddy bot must not steal kills that count for Weekly Orders. Voice lines are a stretch goal; ship panels and icons first.
- **Size:** L. Touches: title and Settings, story cutscene flow, defeat and results cards, receipt, Gallery, save data (sticker book).
- **Score impact for me:** +1.2. It removes my biggest frustration (reading, and getting nothing for losing) and adds a daily pull.

### Proposal 2: "Kaiju Closet": level-ups that change how my kaiju looks
- **Problem it solves:** Mastery is only a text line (Lv 2 Line Cook, 44/100 XP in shot-18 and shot-4). I got a level-up and felt nothing (shot-11, small line). Colours cost 120 to 400 tokens, which is 7 to 22 matches for one recolour (shot-6). Nothing I earn changes how my kaiju looks while I play, and nothing is silly.
- **How it would work (detailed design):**
  1. Each kaiju gets a **Closet** with ONE accessory slot (chef hat, party hat, tiny cape, spoon crown, sunglasses, fork tail-tip). It shows in the match, on the Gallery card and in the results art.
  2. **Mastery levels unlock accessories**: Lv 2 = hat 1, Lv 3 = hat 2, Lv 5 = a sparkle-crumb dash trail, Lv 8 = a victory dance that plays in the winner banner (shot-4), Lv 10 = golden version. Lv 1 to Lv 3 is only about 150 XP, so the first unlocks arrive in the first hour.
  3. **A cheap shelf in the Pantry for 20 to 60 🪙**: silly sound packs (burp, boing, trumpet) for the stomp, victory poses, confetti colours. The first purchase must be affordable after the very first match (I had 18 🪙 and could buy nothing, shot-6).
  4. **A daily Kid Order** next to the weekly ones, with icons: "Go KAIJU once", "Win without picking up cutlery", "Dash 10 times". "Knock out 20 rivals" (shot-6) is a long grind for a kid.
- **Example moment:** I hit Lv 3 on Gobzilla. A box pops open: "NEW! Chef Hat". I tap it, and Gobzilla Jr. wears a chef hat in the next match. When I go KAIJU the hat grows too. My friend sees it in the winner banner and asks how I got it.
- **Rewards / progression hooks:** 6 accessories x 20 kaiju = 120 things to collect, each tied to a mastery level, so every kaiju is worth playing. "Ten kaiju at Lv 3" becomes a Records goal.
- **Risks and edge cases:** Accessories must not hide the coloured player ring (visible in shot-3). Art cost: start with 3 shared accessories that fit every kaiju. Online: cosmetic only, so no balance issue.
- **Size:** M (L if every accessory is hand drawn). Touches: Mastery, Gallery, Pantry, match sprites, results banner.
- **Score impact for me:** +0.8. Every level-up becomes a toy I would show a friend.

### Proposal 3: Gauntlet "Plate Path" with a guaranteed first win and cupcakes instead of grades
- **Problem it solves:** I tapped GAUNTLET and was in a fight at once with a one-line banner (shot-19). I did not know what a wave, course or perk meant. I cleared wave 1, picked a perk (shot-20), lost on wave 2 and got "GRADE D" (shot-21). A "D" says I am bad. The hearts in "Next: wave 2" looked white, so I could not tell how many lives I had.
- **How it would work (detailed design):**
  1. A new **Gauntlet start screen** shows a path of 4 plates (Starters, Mains, Desserts, Seconds) with the course boss at the end of each, my 3 big red hearts and any Lunchbox/Lifeline I own. One big PLAY button.
  2. **Plate 1 is a trainer** for the first 3 runs ever: one easy bot, hearts do not drop. Winning turns the plate gold with confetti.
  3. Replace letter grades with **1 to 5 cupcakes**. Never a D. My run (wave 1 cleared, score 130) would be "Yum, 2 cupcakes!".
  4. Perk picker uses big icons and 3-word labels, with the cards kept clear of the giant kaiju art and the receipt card.
  5. **Friend Run:** a second kid joins with a controller; co-op with 3 shared hearts. It turns Gauntlet into a couch mode.
- **Example moment:** I tap Gauntlet. A path of plates and a cheerful "Let's eat!" Plate 1 is easy and I win, the plate gets a gold star. I pick the ghost perk with one tap. On plate 2 I lose a heart: a big heart cracks with a funny "ow". I finish with 3 cupcakes and 56 tokens, and want a 4th cupcake.
- **Rewards / progression hooks:** Cupcakes saved per course; 15 cupcakes in a course unlocks a Gauntlet-only costume. A "Best run" cupcake badge on the title screen's Gauntlet button.
- **Risks and edge cases:** Guaranteed wins must not inflate Records or Daily medals. Co-op shared hearts need rebalancing for 2 players. Phones: tap targets at least 48px.
- **Size:** M. Touches: Gauntlet flow, new setup screen, results screen, perk picker, Records.
- **Score impact for me:** +0.5. It turns the scariest-looking mode into one I would try twice.

## How the new features from this round felt
- **Chef Tokens:** +18 per match, +42 per chapter, +56 per Gauntlet run is a fine rate, but the first buy costs 120. I had 154 tokens after about 30 minutes. A kid wants a reward in the first 5 minutes (Proposal 2).
- **Kaiju Mastery:** Text only. Level-ups are silent (the small "Mastery Lv 2 Line Cook" line in shot-11). Needs a pop-up, a sound and a toy.
- **Weekly Orders and PANTRY:** The clearest screen in the game (shot-6). "New every Monday" is a long wait for a kid; add a daily order.
- **Receipt card:** Tiny text at the bottom left (shot-4, shot-21), and I did not read it. It does NOT appear on the DEFEATED card in Story (shot-17), so I got no tokens there and losing felt like a punishment.
- **Gauntlet courses, lives, perks:** I did not understand lives. I never reached a course boss or a twist wave. Score and grade D felt bad (Proposal 3).
- **Daily medals, BRUTAL bots, Spicy:** Not touched; too hard and too wordy for my profile. The Spicy button says "clear it first" and looks locked.
- **Comeback help:** I lost several rounds in a row on chapter 2 and noticed nothing. Make it visible ("Your belly starts fuller!" with a picture) when it triggers.
- **House Rules:** Seen on the Free Play setup only; a kid would skip it.
- **Story "What beat you":** Right idea, wrong format (3 sentences). Use a picture plus 5 words. It also said "So close! You took a round off them" even though I was just running away.
- **Clarity:** The "Hold THROW to charge" hint in the chapter card and the in-match tips are good. The "BELLY FULL! PRESS E / Y → KAIJU" prompt was easy to follow, and the red stomp rings looked great (shot-14).

## Bugs that block play
- No blocking bugs. /errors returned `none` at the start, the middle and the end.
- Text-fit and overlap issues I saw (not blocking):
  - **Gauntlet wave-clear screen (shot-20):** the giant kaiju art at the right overlaps the right edge of the "Full Belly" perk card, and the receipt card at the bottom left overlaps the left edge of the "Sugar Rush" card.
  - **Gauntlet over screen (shot-21):** the two result lines ("You cleared 1 wave... NEW BEST!" and "Score 130 · GRADE D · perks: Full Belly") sit over a busy pink tablecloth and cake and are hard to read in places (white text with a thin outline).
  - **Defeat card (shot-17):** text fits, but there is a large empty gap between "DEFEATED" and the first line.
  - Nothing was cut off at the box edges in the screens I checked (Pantry, Gallery, chapter clear, defeat).

## Small notes (max 5, one line each)
- "Next: wave 2 · ❤❤" shows white hearts; use full red and empty grey hearts so lives are readable.
- The Skip button on the first cutscene is small; the S key works but is not shown.
- The title "NEXT UP" line is long and small (three goals in one line); show one goal with a big icon.
- Gallery has 4 "???" silhouettes with no hint for how to unlock them; add a one-word hint.
- Spicy button should show a lock icon and "beat chapter 1 first" instead of grey text.
