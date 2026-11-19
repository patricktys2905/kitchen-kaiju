# Playtest evaluation: The Challenge Seeker (challenger, port 7108)

**Fun score: 6.5 / 10** (the hard modes are well built and the Gauntlet and Trials have good hooks, but the Daily is unwinnable for a fresh save, the Story and Dessert content a challenge seeker wants is locked behind a linear grind, and nothing explains what separates TOUGH / HARD / BRUTAL.)

> This round the bar is **9/10 from EVERY profile**. Everything below is aimed at that.

## What I did
About 115 harness commands, about 45 minutes of game time, on a fresh save. Screenshots are in `C:\Users\Pat\kitchen-kaiju\art-src\.playtest\r8-7108\shot-N.png`.
- **Title** (shot-1): NEXT UP box, mode buttons.
- **Challenges popup** (shot-2): Gauntlet course picker, locked Mains/Desserts/Seconds, Trials button.
- **Trials list** (shot-3): 8 trials, all open from the start.
  - Hard Duel: played twice, lost 2-3 and 1-3 (both times "SO CLOSE!").
  - Brutal Bot: lost 1-3.
- **Daily** (Hot Dumpling, 4 players, shots 10-13): played 2 matches. Lost 0 rounds to 3, then lost 2 to 3 in a second try with a hard bot driving. Got the Bronze medal.
- **Story map** (shots 14-18): opening cinema, SKIP, STORY LOG (empty), locked DESSERT / SECOND HELPINGS tabs, locked SPICY button.
  - I never got into a Story chapter. The PLAY click only redrew the map and my next command started Free Play. The Story is gated per chapter, so I could not reach Spicy or Dessert.
- **Free Play setup** (shots 19-21): cycled BOT LEVEL through every level (NORMAL, TOUGH, HARD, BRUTAL, EASY) and opened the TWIST picker.
- **Party Modes setup** (shot-22): switched the Party Cup ON and played Cup game 1/6. Placings were 5/3/2/1. I quit and restarted the Cup, and used the pause menu double-QUIT (shot-27).
- **Table Workshop** (shot-28): placed props, cycled hazard and surface, UNDO, PLAY IT with the Giant Hand hazard (shot-29).
- **Gauntlet** (shots 31-33): Starters, cleared wave 1, picked a perk (shot-32), died on wave 2. GAUNTLET OVER, Score 130, Grade D, NEW BEST.
- **Gallery** (shots 34-35): bought a Shiny form. **Pantry** (shot-36), **Records** (shot-37), **Settings** (shot-38).
- Matches played: 12. Won: 1 (through the bot-driven Free Play grind and a Gauntlet wave). `/errors` checked at start, middle and end: always "none".

## What worked for me
- The **Gauntlet** is the best challenge loop in the game.
  - The score and grade ladder (C 350 · B 650 · A 1000 · S 1500) gives a clear target (shot-33).
  - The "PICK A PERK FOR THE NEXT WAVE (1 / 2 / 3)" screen is exciting.
  - The "NEW BEST!" callout is satisfying.
  - Checkpoints by course make later runs less tedious.
- **Trials** read as a real challenge list: each has a name, a fixed rival line-up, and a clear 3-star rule (win / without losing a round / hit KO goal). All 8 are open from the start, which is right for me.
- Lose screens show **what killed me** ("Knocked out by: cutlery x2, a KAIJU") plus a coaching tip (receipt in shot-7, shot-13). That makes losses feel fair.
- The **Daily** pays something even on a loss (Bronze medal for playing, "win for silver") and allows unlimited REMATCH. Good streak hook.
- The tough Hard bot is clever. It went KAIJU twice and used the Giant Hand against me, so it feels like an opponent and not random noise.
- The **TWIST picker** (shot-21) is clear and complete: every single plus ⚡⚡ doubles in one grid. The double names are colour-coded pink.
- The **Party Cup** switch is clear: PARTY CUP ON/OFF button, the 6-game line explained under it, and a standings screen after each game (shot-24).
- The **Cup quit warning** works from the pause menu: "Tap QUIT again to really end it".
- The Gauntlet "start from checkpoint" idea keeps retries cheap.

## 🧾 Exactly what would make this a 9/10 for me
1. **Make the Daily winnable and legible.**
   - **What:** show the Daily's bot level and rules before it starts (a preview card), and tune it to TOUGH at most for new players.
   - **Where:** DAILY button on the title, then the match.
   - **How it should behave:** a pre-match card shows "Hot Dumpling · 3 bots · TOUGH · 1 / START". The bots should match the displayed level. A fresh save should be able to win the Daily at least 1 in 4 tries. Add a "daily modifier" line (for example "Boomerangs today") so each day feels different. Daily is currently a 4-seat free-for-all. I lost 0-3 on try 1 and 2-3 on try 2, and the bots scored 6 KOs against my 0.
   - **Score impact:** +0.8.
2. **Open a real hard-content ladder on day one.**
   - **What:** let me open Spicy chapters, the Dessert Course and Second Helpings from a "challenge pass" (for example clear any 5 Trial stars, or win a TOUGH match). Do not require clearing the whole linear Story first.
   - **Where:** Story map tabs (shot-15).
   - **How it should behave:** the locked tabs currently say "clear chapter 6 to open" and "finish the Grand Feast". Spicy says "clear it first". Add a second unlock route: "or 6 Trial stars". Show progress, for example "3/6 ★".
   - **Score impact:** +0.8.
3. **Explain the difficulty ladder.**
   - **What:** replace the bare "BOT LEVEL TOUGH" cycle button with a picker that says what each level does.
   - **Where:** Free Play and Party Modes setup (shot-19, shot-22), plus the Trials list.
   - **How it should behave:** EASY / NORMAL / TOUGH / HARD / BRUTAL, each with one line (for example "TOUGH: reacts in 0.4s, dodges Giant Hand about 50%, never goes KAIJU first"). Show a sample "you beat this bot level 3 of 10 times" stat in Records. Today the player cannot tell TOUGH from HARD except by losing.
   - **Score impact:** +0.7.
4. **Fix the "SO CLOSE!" lose text.**
   - **What:** make the lose headline match the score gap.
   - **Where:** Trials and match-end.
   - **How it should behave:** I lost 1-3 and 0-3 and still got "SO CLOSE! TRY AGAIN?" (shot-8). Use "SO CLOSE!" only when I lost by 1 round or when I led. Otherwise use "ROUGH ONE" or "THEY WERE STRONGER: here's what to change".
   - **Score impact:** +0.3.
5. **Show the Shiny price and requirement on the button, and ask before spending.**
   - **What:** change "✨ SHINY" to "✨ SHINY · 300 🪙 · Mastery Lv 3", and add a confirm.
   - **Where:** Gallery (shot-34, shot-35).
   - **How it should behave:** one click spent 300 tokens (494 to 219 after the earlier Pantry spend) with no price shown and no confirm, and the preview art did not visibly change. Show the shiny sprite in the preview the moment it is owned, plus an "EQUIPPED" tag.
   - **Score impact:** +0.4.
6. **Make weekly orders and Daily feel like a week-long reason to return.**
   - **What:** harder weekly orders and a daily/weekly leaderboard or "beat your best".
   - **Where:** Pantry (shot-36), Daily result screen.
   - **How it should behave:** two of three weekly orders (Knock out 20 rivals, Go KAIJU 8 times) completed in my first ~10 matches. Add one "stretch" order (for example "Win a Gauntlet to Mains" or "Get 2 Trial stars") that pays 80 🪙. Record the best Daily rounds and show it as "best 2 rounds · beat it".
   - **Score impact:** +0.5.
7. **Fix the Party Cup quit path from the results screen.**
   - **What:** the MENU button on the cup standings screen quits the Cup silently.
   - **Where:** Cup standings (shot-24).
   - **How it should behave:** the pause menu asks twice, but MENU on the standings screen dropped me back to Party Modes with no warning, and the next PLAY started "GAME 1/6" again, losing all standings. Ask once ("End the Cup? Your points are lost") or relabel it.
   - **Score impact:** +0.3.
8. **Make hard feedback visible: show the Giant Hand telegraph.**
   - **What:** a clear warning ring plus text when the hand is coming for me.
   - **Where:** matches with the Giant Hand hazard.
   - **How it should behave:** a "✋ INCOMING" marker 1.0 s before the hand lands, with the dodge window drawn (DASH now). I could not verify the DASH dodge through the harness (the hand appeared too briefly between 0.3-0.8 s ticks). Twice I was KO'd by it standing still and could not tell from the screen it was about to hit me. The Gauntlet tip "the giant hand goes for whoever has the fullest belly" is great and should be shown more.
   - **Score impact:** +0.4.
9. **Fix the stale Kid Mode text and the wrong tip.**
   - **What:** Settings says "KID MODE: Story: easier rivals, 1-line chats, bigger result text" but the brief says Kid Mode now gives easy bots in Free Play, Party and the Daily too.
   - **Where:** Settings (shot-38) and the lose-screen tip (shot-13).
   - **How it should behave:** the description must list all four places. The Daily lose tip says "Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings", but the Daily has no bot-level control, and Comeback Help does not apply to the Daily (its Settings text says "Free Play / Party"). Point to KID MODE for the Daily.
   - **Score impact:** +0.3.
10. **Fix every small layout item in the issue table below** (item 1 to 4 are the most visible). +0.5 combined.

## 🔍 Every issue I saw (exhaustive)

| # | Severity | Screen | What's wrong (exact text/element) | Screenshot | Suggested fix |
|---|---|---|---|---|---|
| 1 | major | Daily (Hot Dumpling) | Fresh-save Daily vs 3 bots is lost 0-3 (first try) and 2-3 (second). Bot level is not shown anywhere before the match. "Hard but fair" is not met. | shot-13 | Preview card with bot level; cap at TOUGH; consider team or co-op Daily |
| 2 | major | Story map | Chapters 2-12 locked, Spicy locked "clear it first", Dessert "finish the Grand Feast", Second Helpings "clear chapter 6 to open". A challenge seeker has no hard Story content for the first hour. | shot-15 | Alternative unlock via Trial stars or a "skip ahead" challenge |
| 3 | major | Story map | Clicking PLAY on chapter 1 (1070,640) only redrew the map and did not start the chapter in the harness (the cinema was still running from the OPENING screen). Then autoplay started a Free Play with Toastbat as "YOU". Could be a harness quirk, but "GOBZILLA JR. RULES THE TABLE" with "TOASTBAT (YOU)" is confusing. | shot-14 | Confirm PLAY starts the chapter; keep the player's name consistent |
| 4 | major | Gallery | SHINY button shows no price or level requirement, and spent 300 🪙 on one click with no confirm. Preview art showed no visible change after purchase. | shot-34, shot-35 | Label "✨ SHINY · 300 🪙 · Lv 3"; confirm; swap preview to shiny |
| 5 | major | Cup standings | MENU on the standings screen quits the Cup with no warning, and the next PLAY starts GAME 1/6 again. The brief says quitting a Cup asks twice (only the pause menu does). | shot-24 | Ask on MENU too |
| 6 | minor | Lose screen | "SO CLOSE! TRY AGAIN?" is shown after 1-3 and 0-3 losses. | shot-8 | Vary text by score gap |
| 7 | minor | Free Play and Party setup | BOT LEVEL button cycles NORMAL, TOUGH, HARD, BRUTAL, EASY with no explanation of what changes. | shot-19, shot-20 | Add one-line description per level; show it below "Bot difficulty:" |
| 8 | minor | Trials list | The Chef's Table card's text is shrunk and visibly smaller than the other cards. Bare Knuckles line is nearly edge-to-edge. | shot-3 | Allow 2-line wrapping or shorter text |
| 9 | minor | Challenges popup | The popup's Gauntlet starters are "locked: clear wave 4 / 8 / 12", but the Gauntlet's wave-2 jump to 2 rivals killed me in under one round with no preview of what wave 2 is. The "Next: wave 2" card shows only hearts. | shot-2, shot-32 | Show "Next: wave 2 · 2 rivals · Kaiju Frenzy" |
| 10 | minor | Trials 3-star rule | "★★★ also hit the knockout goal" shows "(you: 2)" but the goal is only shown in the trial list. | shot-7 | Show "goal 4+, you: 2" together |
| 11 | minor | Settings | KID MODE description says only "Story: easier rivals, 1-line chats, bigger result text"; the brief says it also affects Free Play, Party and the Daily. | shot-38 | Update text |
| 12 | minor | Daily lose screen | Tip "Set BOT LEVEL to EASY, or switch on COMEBACK HELP in Settings" does not apply to the Daily (no bot-level control, and Comeback Help is Free Play / Party only per Settings). | shot-13 | Point to KID MODE |
| 13 | minor | Records | "Next rank" value "Line Cook at 14 pts (you: 9)" is a larger font than the other stat values and almost touches its label. "Chef Rank / Prep Cook" uses a different font size from rows above. | shot-37 | Same font and right-align |
| 14 | minor | Pantry | Footnote "Colours you buy appear in the Gallery. Gauntlet items work on every new run." is tiny and low contrast. | shot-36 | Raise contrast or size |
| 15 | minor | Pantry | The "Lifeline" shop tile shows "-30% today" with the tag and "(not enough yet)" crammed on the same line as the price. | shot-36 | Put price and sale tag on separate lines |
| 16 | minor | Pantry | Shiny forms (the new 300 🪙 item) are not mentioned at all in the shop or Chef Tokens explainer. | shot-36 | Add a "Shiny forms: Gallery" pointer |
| 17 | minor | Pause menu | The "Tap QUIT again to really end it" warning at the bottom is dim and sits against the table edge and bottom frame. | shot-27 | Larger bright text near the QUIT button |
| 18 | minor | Locked tabs | Clicking the locked DESSERT / SECOND HELPINGS tab gave no visible reaction in my screenshot (shot-18); the text only says how to open it on the tab itself. | shot-18 | Toast "Clear chapter 6 to open (3/6)" |
| 19 | minor | Gallery | The Mastery line wraps awkwardly: "Mastery ★★★☆☆☆ Lv 3 Sous Chef (4/160 XP)" then a second line starts with "· next: Gold name in matches". | shot-34 | Break before "next:" and drop the leading dot |
| 20 | minor | Gallery | Name inconsistency: the Gallery calls the kaiju "GOBZILLA JR." but match HUDs and results say "GOBZILLA". | shot-34 vs shot-33 | Use one name |
| 21 | minor | Hot Dumpling HUD | The mode is called "HOT DUMPLING" but I could not see who holds the dumpling from the HUD; the pop was only in the bottom ticker. | shot-12 | Show a bomb icon on the holder's card |
| 22 | polish | Daily countdown | The challenge banner "DAILY CHALLENGE · win this match to clear today..." is centred across the table and overlaps the countdown "1", the ant trail, and a spawn mat. | shot-11 | Move the banner to the bottom |
| 23 | polish | Round-end banner | For a 4-player round the stars row "SALMONSTER ☆☆☆ PIZZARAPTOR ★★☆ SLOBA ☆☆☆ DUMPLORD ☆☆☆" wraps to two lines; the wrapped name looks orphaned. | shot-12 | Use a 2x2 grid or short names |
| 24 | polish | Free Play | Subtitle "Tiny monsters. Giant dinner." under "FREE PLAY" and "PARTY MODES" is replaced by mode text but Free Play reuses the title tagline. | shot-19 | Use mode-specific line |
| 25 | polish | Party Modes | After Party Cup is switched ON the header still says "◀ TEAM FEAST ▶", though the Cup starts with CLASSIC. | shot-22 | Show "CUP: starts with CLASSIC" |
| 26 | polish | Party Modes | Bottom hint "🏆 Party Cup = 6 games: CLASSIC → CRUMB RUSH ... switch it ON, then PLAY" sits at y=661, almost touching the KEYS / HOUSE RULES buttons; the sentence is clipped by the screen width. | shot-22 | Wrap to two lines above the buttons |
| 27 | polish | Twist picker | MIRROR MOVES and FISTS ONLY descriptions are in a much smaller font than the other cards. Doubles are abbreviated ("ONLY + RINK", "KAIJU + CASTLE", "MOVES + TURBO") and "KAIJU" means MINI KAIJU. | shot-21 | Use full names or wrap |
| 28 | polish | Match-end | The "THIS MATCH" receipt covers a spawn mat and part of the table; on Daily it overlaps the "Knocked out by" text at the bottom left. | shot-13 | Keep the receipt clear of the table or collapse it |
| 29 | polish | Story map | The SCENE button touches the panel's right border; "★★★ no rounds lost · ★★ lost one · ★ any win" is small. | shot-15 | Add 8 px of padding |
| 30 | polish | Story log | Empty log is a very large dark panel with one line of text. | shot-16 | Add a pictured example entry |
| 31 | polish | Gauntlet | Perk descriptions have no numbers: "Dash and swipe recharge fast", "Move faster every wave". | shot-32 | Add "-30% cooldown", "+5% per wave" |
| 32 | polish | Records | Achievement "Crumb Muncher" and "First Bite" use a gold frame but there is no "claim" or reward readout. | shot-37 | Show "+30 🪙 earned" |
| 33 | polish | Workshop | The hazard button shows "⚠ HAZARD ▶" with no current value; the name is only in the header line, and the new surface and hazard show in the SLOT 1/3 header text only, not as an icon on the preview. | shot-28 | Add an icon on the table preview |
| 34 | polish | Gauntlet over | "You cleared 1 wave (reached 🥗 STARTERS)": the course name makes it sound like I reached Starters as a new place. | shot-33 | "Best course: Starters" |
| 35 | polish | Trials result | The instant "INSTANT REPLAY" banner at the top of the table is large and sits over the table during live play of the next round. | shot-6 | Smaller, dimmer banner |

## 🔠 Text and layout check
Checked at 1280x720 on desktop (not phone mode).
- **Title** (shot-1): OK. The NEXT UP box is tight to the candlestick but legible; the version text in the corner is tiny but is not meant to be read.
- **Challenges popup** (shot-2): OK. Locked buttons are dim but readable.
- **Trials list** (shot-3): minor. Chef's Table text is smaller than the others and Bare Knuckles' second line almost touches its card edge (issue 8).
- **In-match HUD, 2-player** (shot-6): OK. The replay banner sits over the table (issue 35).
- **Trial lose screen** (shot-7, shot-8): OK. No overlap. Receipt sits over the table but not over the text. The title is very large but clear.
- **Daily countdown** (shot-11): overlap. The challenge banner overlaps the countdown number and ant lane (issue 22).
- **Daily round-end** (shot-12): the 4-player star row wraps to two lines (issue 23). Otherwise OK.
- **Daily result** (shot-13): OK. The ranked list is clear; the receipt overlaps a spawn mat only.
- **Story map** (shot-15): minor. SCENE button touches the panel edge (issue 29). Locked-tab text is small but fits.
- **Story log** (shot-16): OK, but very empty.
- **Free Play setup** (shot-19): OK. Every seat card text fits.
- **Twist picker** (shot-21): minor. Small descriptions on two cards (issue 27).
- **Party Modes setup** (shot-22): minor. The Cup line crowds the KEYS and HOUSE RULES buttons (issue 26). All 10 option buttons fit with no overlap.
- **Cup standings** (shot-24): OK.
- **Pause menu** (shot-27): the bottom warning text is dim (issue 17).
- **Workshop** (shot-28): OK. The label "Sunday Roast" on the preview is readable.
- **Gauntlet perk pick** (shot-32): OK. All three perk cards fit.
- **Gauntlet over** (shot-33): OK.
- **Gallery** (shot-34, shot-35): minor. The Mastery text wraps awkwardly (issue 19). The SHINY button's tick text is fine.
- **Pantry** (shot-36): minor. Footnote is low contrast (issue 14). Lifeline tile is crowded (issue 15).
- **Records** (shot-37): minor. "Next rank" row font mismatch (issue 13).
- **Settings** (shot-38): OK. No overlap. Text of every row fits its button.
- **Phone mode**: not tested (this harness instance was desktop).

## The single biggest structural problem
There is **no scalable, self-selected difficulty ladder that a challenge seeker can reach on day one**. The hard content is split into four disconnected places with four different gates. The Gauntlet is good but one-note and ends quickly (wave 2 for me). Trials are open but each is one fixed fight with no progression between them. The Daily is the one that comes back every day but is too hard for a new save, with no preview. And the Story's Spicy, Second Helpings and Dessert are locked behind a linear 12-chapter grind. The result is that the one thing I wanted, hard content with a clear goal and a reason to return, is spread thin and mostly gated. The bot levels (TOUGH / HARD / BRUTAL) are not explained, so I could not tell what I was choosing.

The return loop is also thin. Records, weekly orders and achievements pay small tokens, but there is nothing like a leaderboard, rank ladder or "challenge of the week" that makes me return tomorrow. Weekly orders were finished in my first session.

## Big change proposals (2-3, most important first)
### Proposal 1: Challenge Ladder (one place for all hard content)
- **Problem it solves:** hard content is scattered (Trials, Gauntlet, Daily, Spicy, Dessert) and gated differently; I could not see "what is next".
- **How it would work (detailed design):**
  - The CHALLENGES popup becomes a ladder screen with 5 rungs: Trials, Gauntlet to Mains, Daily streak 3, Spicy 3 chapters, Dessert Course.
  - Each rung shows a star cost (Trial ★ total) and a reward.
  - A header "CHALLENGE RANK" goes from Bronze to Platinum by total ★ earned across Trials, Gauntlet grade, Daily and Spicy.
  - Spicy chapters and Dessert open at Silver rank (12 ★), so they no longer need the full Story.
  - Each rung shows one line of what the bot level means ("TOUGH: dodges the hand about half the time").
  - Flow: Title, CHALLENGES, ladder, pick a rung, preview card (rivals, rules, bot level, rewards), 1 / START.
- **Example moment:** I win my first Hard Duel for 1 star, the ladder shows "Silver in 9 ★", and "Spicy Ch 1 unlocks at Silver". I immediately want one more Trial.
- **Rewards / progression hooks:** rank badge shown on the title and in results; a cosmetic per rank (Silver spoon colour, Gold name). 20 🪙 per star stays.
- **Risks and edge cases:** Story-first players see Spicy open before the Story, so label it clearly; keep Story rewards separate.
- **Size:** L
- **Score impact for me:** +1.0

### Proposal 2: Daily Challenge v2 (preview, modifiers, personal best)
- **Problem it solves:** the Daily starts with no preview, was too hard (0-3 and 2-3 losses), and has no sense of "beat yesterday".
- **How it would work (detailed design):**
  - Before the match a card shows: mode, table, modifier of the day (one twist), bot level (TOUGH by default, HARD after you have 3 medals), and your best.
  - Tiered medals: Bronze for playing, Silver for 1 round, Gold for the win, with a visible rule line.
  - Each retry changes the bots' start spots, not their strength.
  - After 3 failed tries, offer "Practice mode: EASY bots, no medal" so a new player can still learn the modifier.
  - Results show "best rounds 2 (today)" and a 7-day streak ribbon.
- **Example moment:** "Today: Hot Dumpling + Mini Kaiju. You: TOUGH. Best: 2 rounds. 1 / START". I see I almost won, so I retry.
- **Rewards / progression hooks:** streak bonus 10 🪙 per day up to 7; cosmetic at a 7-day streak; weekly "perfect week" order.
- **Risks and edge cases:** fairness across devices (same seed); time-zone rollover; players farming Practice.
- **Size:** M
- **Score impact for me:** +0.8

### Proposal 3: Bot level cards plus post-loss coaching
- **Problem it solves:** TOUGH / HARD / BRUTAL are unexplained, and "SO CLOSE!" appears regardless of score.
- **How it would work (detailed design):**
  - Tapping BOT LEVEL opens a picker like the TWIST one: five cards (EASY to BRUTAL) each with a one-line behaviour and your win rate against it ("won 1 of 4").
  - Lose screens pick the headline from the score gap (1 round behind: "SO CLOSE!", otherwise "THEY OUTPLAYED YOU") and the coaching tip from the top cause of death (for example "Giant Hand x2: DASH as it reaches you").
  - After 3 straight losses on the same fight, the lose screen suggests dropping a level or switching on COMEBACK HELP / KID MODE, with the button right there.
- **Example moment:** I lose to Pizzaraptor twice to the Giant Hand. The screen says "The Giant Hand got you twice. DASH just as it reaches you" and highlights the DASH button.
- **Rewards / progression hooks:** per-level win-rate stat in Records; an achievement for beating each level.
- **Risks and edge cases:** the cause-of-death tally must handle ties; do not nag too early.
- **Size:** S-M
- **Score impact for me:** +0.5

## How this round's new features felt
- **TOUGH bot level:** exists and is selectable (NORMAL, TOUGH, HARD, BRUTAL, EASY cycle) but is not explained anywhere, so I cannot judge fairness by description. In play the Hard bot in Hard Duel beat me 3-2 then 3-1; I could not feel a difference in the 4-player Daily.
- **Giant Hand dodge:** I could not confirm the DASH dodge through the harness. The hand appeared for less than a 0.3-0.8 s tick between my samples, and I got hit by it standing still (`YOU knocked out (hand)`). The Gauntlet tip "the giant hand goes for whoever has the fullest belly" is a nice hint. The hand needs a visible telegraph (proposal item 8).
- **Hand KOs count for the last hitter:** result screens list "Knocked out by: the Giant Hand" without crediting a player, so I could not verify the credit. The line is clear though.
- **Kid Mode:** Settings still describes it as Story-only (issue 11), so the new Free Play / Party / Daily behaviour is not discoverable.
- **Shiny forms:** works, but no price or level shown on the button, no confirmation, and no visible preview change (issue 4). A 300 🪙 purchase must feel special.
- **Party Cup:** ON/OFF switch is clear. Standings screen (shot-24) is good. The pause quit asks twice (good). MENU on the standings quits with no warning (issue 5). The "TEAM FEAST" header still showing with Cup ON is confusing (issue 25).
- **Story log / locked tabs / Boss phase 2:** log works but is empty on a fresh save. Locked tabs say how to open them, which is good, but I could not reach a boss, so Phase 2 and the gentler chapter 4 boss are not judged.
- **TWIST picker:** the best new addition for me. Every twist and double in one grid.
- **Workshop UNDO / surface and hazard on preview:** UNDO works (props 2 to 1). Surface and hazard change shows only in the header text, not as an icon (issue 33). The Giant Hand hazard worked in a match.
- **Phone layout (table at left edge):** not tested.
- **YOU marker / plates / receipts:** receipts are good (achievements and First Service-style lines appear: "🏆 First Bite +30 🪙 · 🎨 Lime colour!"). Plates behind result text are readable (shot-7, shot-13).
- **BRUTAL:** the Brutal Bot Trial is the right "hardest bot in the game" fight; I lost 1-3 and the reasons were clear. Good.
- **Mastery cosmetics, Trials, Move Lab, Pantry:** Mastery text is informative but the wrapped line is awkward (issue 19). I did not enter the Move Lab. Pantry orders were easy (issue in item 6).

## Bugs that block play
- None that fully block play. `/errors` returned "none" at the start, middle and end.
- Near-blockers worth fixing first: the Cup standings MENU silently ending the Cup (issue 5), and the Story chapter PLAY click that did not start the chapter in the harness (issue 3).
