# Playtest evaluation — The Collector

**Fun score: 6.5 / 10** (Story-gated unlocks are paced well and the Gallery looks lovely, but colour rewards are invisible/unexplained, the last kaiju gate is a trickle, and later collection goals depend on modes I barely touched)

## What I did
- Title, Gallery (kaiju + colours), Records/Achievements (2 pages), Story map, Free Play, Party Modes (Team Feast screen), Gauntlet (2 waves).
- 44 matches played, 30 won (bot "hard" in my seat via /autoplay; ~6 more cancelled by harness timeouts).
- Story: cleared chapters 1-12 (several retries: ch9 x2, ch10 x3, ch12 x3 attempts; DEFEATED on the boss chapters with a bot driver), 26 stars / 36.

## Unlock tracking (how many matches each really took)
- Story chapter 4 (Boss of the Belt) -> kaiju Minturtle: 4 clear matches.
- Chapter 6 or 7 reward -> second reward kaiju (Pengwhip); ch 8 or 9 -> 3rd; reward 4/7 after ch10; ch12 -> Velvaroo + "Chef's Nightmare" table (reward 6/7). Roughly 1 reward per ~2 chapters. Whole story ~ 20 matches, ~14 wins.
- 19/20 kaiju unlocked at 26 stars. Last "???" needs 30 stars in Story (clear text in Gallery, good). I never got there (bot gets 1-2 stars most chapters).
- Colours: Gallery shows 9 swatches. First one (Classic) and Grape were wearable after 8 achievements; I did not discover which achievement gives which colour.
- Achievements: 8/29 after 20 matches, 11/29 after 37, 12/29 after 44. Lots of matches are needed for "Win 50 matches", 250 KOs, 1000 crumbs (grinding ~ 40-60 matches, fine). Tables 18/18 visited fast (Free Play rotates tables per round).
- Matches for First Bite/Regular Diner/On a Roll/World Tour came naturally with no grinding intent. 

## What matched my goals / what was fun
- Story gives a clean spine: every chapter unlocks something, boss chapters give kaiju rewards, a Rewards counter (x/7) tells me how much is left.
- Locked kaiju show a clear hint ("Unlock: Collect 30 stars in Story mode").
- Gallery detail panel shows normal + KAIJU-mode art with Matches/Wins per kaiju - nice collection-feel. Recolour (Grape) looks great (screenshot art-src/.playtest/7105/shot-9.png).
- Achievements have progress bars (14/50, 224/250). Records is a satisfying checklist with 29 entries.
- Art is charming and consistent across 20 kaiju.

## What took too long / was tedious
- Final chapter and bosses are brutal for a collector who just wants the reward; repeat attempts of ch10/ch12 (3 tries each). Needing 30 stars for the last kaiju means replaying chapters, which is a chore with full dialogue/intro scenes each time (I had to hammer Space ~5 times per chapter to skip intros).
- "Win 50 matches / 1000 crumbs / 250 KOs" are slow but OK.

## What was over too quickly / too shallow
- Kaiju unlock path is almost entirely Story; once Story is done, nothing in Free Play unlocks kaiju. Collection of kaiju is front-loaded (16 free from the start + 3 via story).
- Tables: 18/18 "visited" almost instantly in Free Play; only one table is a Story reward, so tables do not feel collectible.

## Confusing or unclear
- Colour swatches in the Gallery render as empty dark boxes (both locked and unlocked) - I cannot see what colour each is, nor which achievement unlocks which (clicking a locked one showed no unlock hint I could read). This is the biggest collector gap.
- Achievement list gives no reward icon (which colour/table does each give?).
- Rewards button click (775,676) showed nothing obvious on the Story map; reward list only visible via "UNLOCKED:" pop-ups on clear.
- Gallery selected-colour text says "Classic (wearing)" for an empty-looking box.
- Clicking Story > Play first time started a plain Free Play in autoplay (harness quirk, ignored).

## Bugs found
- /errors: none.
- Gallery "YOUR COLOUR" swatches appear unfilled (see art-src/.playtest/7105/shot-6.png, shot-8.png, shot-9.png): 9 empty rounded boxes, only a faint brown fill on the selected one. Repro: title > KAIJU gallery. May be emoji/canvas draw issue.
- Chapter 5/6/7/9 clear popups show no "UNLOCKED:" line even though the 🎁 counter increased (e.g. 1/7 -> 2/7 after ch6); unlock notice appeared only for some rewards.

## Top 3 changes that would raise my score
1. Draw the colour swatches and show, per swatch, what unlocks it (and attach the colour name to each achievement) so the colour hunt is a visible checklist.
2. Make unlock notices consistent: every reward chapter should announce exactly what it unlocked, and the Story "Rewards" button should open a visible list of all 7 rewards with their requirements.
3. Add a non-Story path to get the last kaiju/tables (e.g. milestones by matches played, Gauntlet waves) and let stars be earned more easily/skippable intros on replay so 30-star completion is not a slog.
