# Playtest evaluation: The 9-Year-Old

**Fun score: 7.0 / 10** (the kaiju are adorable and the first match is instantly fun, but a normal/hard bot beat me 3-5 in Free Play, KAIJU mode felt like a gamble, and the Story starts with a wall of text and a locked-up map).

## What I did
- Title screen, then Free Play 1v1 vs a NORMAL bot, "first to 5". Played one full match (lost 3-5 after winning the first 2 rounds), roughly 8 rounds.
- Opened Story. The opening cutscene text is typed out slowly (shot-10); I skipped it with S. Played Chapter 1 (won 2-1, 2 stars), tried the STOMP coach and KAIJU mode by hand.
- Gallery (shot-16): clicked a locked kaiju and a locked colour to read the unlock text. Opened Party Modes setup (shot-17). Started the Gauntlet, won wave 1, saw the perk picker.
- /errors: none at start, middle or end. About 45 harness commands.

## What worked for me (briefly)
- The characters are great: a strawberry dinosaur, a moth and a crab with a cabbage on its head. I smiled at the roster in the Gallery.
- A round takes about 10 seconds. "Knocked out by cutlery", "skewered", "squash" and the instant replay are funny and fast.
- The STOMP coach is big, yellow and clear: "BELLY FULL! PRESS STOMP → KAIJU" (shot-12). Even I could not miss it.
- The title screen "NEXT UP" line (Clear Story ch 4, then a turtle, then a Lime colour) gives a concrete goal in one line.
- Gallery lock text says exactly what to do ("Beat Story chapter 4 (1/4 cleared)").

## The single biggest structural problem
**Losing is the loudest thing in the game, and nothing catches a kid who is losing.** In Free Play I won rounds 1 and 2, then lost 5 of the next 6 rounds to MOTHBALL, mostly to "squash" (a giant stomp) and "fall" KOs, and ended on a screen reading "MOTHBALL RULES THE TABLE" with my name second (shot-7). The default bot level is NORMAL and there is no moment where the game says "that was tough, want it easier?". There is no handicap, no comeback mechanic, and no reward for trying (I saw nothing earned from a lost match). A 9-year-old who loses like this once will leave.

The second half of the same problem: the Story is the intended "kid path", but it opens with a long typed-text cutscene, then a 12-node map where 11 are locked, and the rival hints are full sentences in small italics. I skipped almost all text. Nothing in the loop pays me for playing "badly but cheerfully".

## Big change proposals (2–3, most important first)

### Proposal 1: "Snack Meter" comeback and mercy system
- **Problem it solves:** the 3-5 Free Play loss (shot-7), the Ch.1 round where Crabbage squashed me while I was in KAIJU mode, and hard bots staying on after a loss. There is no safety net for a frustrated player.
- **How it would work (detailed design):**
  - Every player (human or bot) has a hidden **Snack Meter** from 0 to 100 that fills when they get knocked out (+25 per KO taken in a match) and drains slowly while they are winning.
  - When a player is a round or more behind AND the meter is 50+, the next round starts with them holding a **Comfort Snack**: a free power-up (random from Shield, Speed, Big Spoon), shown as a bouncing "FREE SNACK!" cookie icon over the kaiju.
  - At 100 the player also starts the round with belly at 60 (a quicker route to KAIJU).
  - After 2 lost matches in a row in Free Play or Party, a pop-up on the match-end screen with two big icon buttons, "EASIER BOTS" and "KEEP GOING". Choosing the first drops bot level one step (HARD to NORMAL to EASY). No reading needed.
  - Settings gets a toggle "Helping Hand (kid mode)", ON by default for the first 20 matches on a fresh save and for any Story chapter on its first try. The match-end screen shows "Helping hand was on" so it never feels secret.
  - Story stars are not reduced by Helping Hand (kids must not feel punished); a hidden "no help" bonus can come later for Achiever types.
- **Example moment:** I lose rounds 3, 4 and 5 against Mothball. Round 6 begins and my Gobzilla has a glowing cookie over it and holds a Shield. I block Mothball's knife, grab crumbs fast and go KAIJU first. I win the round and shout. After the match the screen says "So close! Try again?" with a big REMATCH button and an EASIER BOTS button.
- **Rewards / progression hooks:** each Helping Hand round you win anyway grants a "Comeback Cookie" in Records (collect 10 for a colour style, e.g. "Cookie Crumb"). It turns bad luck into a collectible.
- **Risks and edge cases:** experienced players may feel it is rubber-banding, so it is off in Online, Party Cup, Gauntlet, Daily and Spicy. In 6-player games only the lowest scorer gets help. Make sure bots cannot exploit it.
- **Size:** M (match state, bot-level setting, match-end screen, Settings, Records).
- **Score impact for me:** +1.0, because losing would stop being the end of fun.

### Proposal 2: "Pals" picture-first Story path with a Sticker Book
- **Problem it solves:** Story ch.1 starts with a slow typed monologue ("Tonight the Head Chef hosts the GRAND FEAST...", shot-10), the chapter card has small italic text, and I never knew why I was doing chapters. Kids skip text, so everything important must happen through pictures and play.
- **How it would work (detailed design):**
  - A first-launch one-tap question "Who is playing?" (kid icon / grown-up icon) sets a Story tab: **PALS** vs NORMAL. It can be switched any time.
  - PALS cutscenes are at most 2 speech bubbles of 8 words or fewer plus a big character emote. Tap finishes the line instantly, and bubbles auto-speed after the first view.
  - Chapter cards show 3 icons: rival portrait, a one-picture tip (a hand holding a spoon with an arrow) and a star target. The italic sentence moves behind an info button.
  - PALS rules: rivals one tier easier, 2 rounds to win for normal chapters, 3 for bosses, and a free Comfort Snack (Proposal 1) in round 1.
  - Silly sound clips (burp, "yum!", "oops") on KOs and pickups, which also help non-readers.
  - Each cleared chapter adds a sticker to a new **Sticker Book** screen (one page per world, 12 stickers). Tapping a sticker plays a 2-second silly animation of that kaiju.
- **Example moment:** I start a fresh save and tap the kid icon. The map opens with chapter 1 glowing. A Crabbage bubble says "Hi! Let's eat!" with a crab emote. I play, win, and a crab sticker slaps onto the book with a squish sound. I tap it and the crab waves its claws.
- **Rewards / progression hooks:** sticker pages (12 for Grand Feast, 6 for Second Helpings), a golden sticker for 3 stars, and a "Sticker Book 40%" line beside Collection in the Gallery.
- **Risks and edge cases:** it must not feel babyish for older siblings: call it PALS, not EASY, and keep stars comparable across tabs. Less text is also a localisation win.
- **Size:** L (cutscene content pass, Story UI tab, new Sticker Book screen, save data).
- **Score impact for me:** +0.8, mostly because I would no longer be skipping text to get to the play.

### Proposal 3: "KAIJU Moment" rampage meter and finisher
- **Problem it solves:** I went KAIJU in Ch.1 round 1 (shot-13), spent about 4.5 s firing the power at a crab, then died to a squash from Crabbage's own KAIJU. For a kid the biggest, coolest button in the game produced "I used it and lost anyway". There was no feeling of being the monster.
- **How it would work (detailed design):**
  - On going KAIJU the camera zooms in 15% and a **Rampage Meter** bar appears at the top, starting at 0. Every rival shoved and every table prop smashed (cups, gravy boat) adds to it. At 100 you trigger a **FINISHER**: a huge, screen-wide, one-button, silly per-kaiju move (Gobzilla: strawberry seed rain) that KOs everyone not behind cover.
  - KAIJU duration extends from about 4.5 s by +0.5 s per prop smashed (max 8 s), so being silly is rewarded, not only aiming.
  - Leaving KAIJU shows a big "STOMP BONUS" popup counting KOs and smashed props.
  - A KAIJU cannot be squashed by another KAIJU in the first 1.5 s (they bounce off each other with a comedic boing).
- **Example moment:** I go KAIJU, run through the gravy boat (splash), smash two cups, the Rampage bar hits 100, a big "RAWR!" appears and my seed rain knocks the crab off the table. Everyone laughs.
- **Rewards / progression hooks:** Records get "Smashed 100 props" and "Finishers: 25"; each kaiju's Gallery card names its finisher and animates it in the existing right-hand KAIJU MODE picture.
- **Risks and edge cases:** finishers can swing matches, so cap one per round, end KAIJU after it, and keep 6-player screens readable. Needs 20 finishers (start with 4 shared archetypes).
- **Size:** L (all kaiju powers, VFX, prop smashing, balance).
- **Score impact for me:** +0.7, because the best moment in the game would finally feel like the best moment.

## How the new features from this round felt
- **STOMP coach:** worked well. Big, readable, over the kaiju, doubled by "STOMP READY!" in the HUD (shot-12). "PRESS STOMP" does not say which key; show the real key or gamepad icon. A bigger version would also explain why to stomp (a tiny "can't be hurt" cue).
- **KAIJU counterplay:** the ring and dizzy window exist, but I never read them in time: I died to a squash twice in Free Play and once in Ch.1. The kid reading is "I got stomped for no reason". It needs a louder, simpler cue (a big red floor shadow and a rumble sound).
- **Gallery progress:** good for kaiju: "Unlock: Beat Story chapter 4: Boss of the Belt (1/4 cleared)". Clicking a locked colour showed no hint at all, only a row of locks. A picture of the goal plus a progress bar would suit a kid better than text.
- **Gauntlet lives:** the hearts in the top-right are very readable. The perk screen (Hot Feet / Sugar Rush / Extra Life) was clear with icons, which I liked. I only played wave 1 so I cannot judge difficulty.
- **Party / Golden Spoon / Cup length:** I only saw the setup screen (shot-17). The Party Cup explainer is a long sentence cut off at the screen edge, which a kid will not read. The CUP LENGTH button is easy to find. I did not play Golden Spoon.

## Bugs that block play
- None found. /errors was empty at the start, middle and end.

## Small notes (max 5, one line each)
- STOMP prompt should show the real key/button (E or a gamepad icon), not the word "STOMP".
- Cutscene text types slowly; tapping should finish the line instantly, and the "SKIP CHAT (S)" label is tiny.
- Free Play defaults to NORMAL bots; a brand-new save should start on EASY.
- Locked colour swatches show no hint when clicked, unlike locked kaiju.
- Party setup bottom text is one long sentence that gets cut off at the screen edge.
