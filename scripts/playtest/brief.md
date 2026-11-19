# Playtest brief (round 9): read this fully before playing

You are an AI playtester for **Kitchen Kaiju**, a couch party brawler. Food kaiju throw cutlery, shove each other off a table,
eat crumbs to fill their belly, then STOMP to go giant (KAIJU mode, with a per-kaiju power).
The game has:
- **Story:** The Grand Feast (12 chapters), Second Helpings (6), then the Dessert Course.
- **Free Play** and **Party Modes:** Team Feast, Crumb Rush, Hot Dumpling, Golden Spoon, and the Party Cup.
- **CHALLENGES:** Gauntlet with course checkpoints, and Trials.
- **Daily**, Spicy chapters, and Online.
- **Extras:** Gallery (with Move Lab), Records, Pantry (shop + weekly orders), Settings, Table Workshop.

## How you play
You play the REAL built game through a local HTTP harness. The game is frozen between your commands.
- Your server: `http://localhost:<PORT>` (your port is in your task). Start with `curl -s "http://localhost:<PORT>/help"`.
- `/look` lists every visible text with [x,y] positions. In phone mode it also lists `phoneControls`.
- `/shot` saves a screenshot. **Open EVERY screenshot with your Read tool and look closely**, especially at text and buttons.
- Use `/act` to drive matches, and `/autoplay` to grind progress you need for your goals.
- Phone mode only: use `/tap?label=...` for the on-screen controls.
- Check `/errors` at the start, middle and end.
- **Budget: 90–130 harness commands.** Play like your profile would, but cover a lot: this is the most thorough round yet.
- Do NOT edit any game files and do NOT stop or restart the server. Only write your report file.

## New since the last round (round 9: judge these in depth where your profile would touch them)
1. **Fairness:**
   - Bots don't attack for the first 1.4 s of a round.
   - The round-end banner says how and when YOU went out.
   - Free Play setup explains each BOT LEVEL.
   - The Daily countdown names its rivals' levels.
   - Daily bots are gentler.
   - Story ch3 is gentler.
   - A KAIJU can't be flicked by the Giant Hand. DASH as the hand arrives to dodge it.
2. **Feedback:**
   - 🏆 Achievement toasts (top right) after matches.
   - 🎁 NEW KAIJU / NEW TABLE toasts.
   - Pantry orders show their payout.
   - SHINY and Pantry buys ask for a second tap, show a price, and say why they're refused.
3. **🌱 New saves start with 4 kaiju and 2 tables locked** behind early goals (win 1, play 3, clear ch2, win 5, clear ch3, play 8). You're a new save, so judge whether this feels good.
4. **🗯 Story comic panels** after the ch4 and ch8 bosses (and Second Helpings ch4). Also a big PHASE 2 banner, and Kid Mode gives calm starts in Story.
5. **📱 PHONES AS PADS** (Party Modes setup, last button): opens a couch room with a big QR code so phones become controllers. The 🏆 PARTY CUP switch is ON/OFF.
6. **Gallery:** each power shows its reach and cooldown, and a full Mastery reward ladder (✔/🔒) including ✨Shiny.
7. **Fixes from last round:**
   - The quit confirmation resets when you resume.
   - Double twists are kept after a match.
   - Kid Mode bots are always easy.
   - The Practice SWIPE step works.
   - The phone TWIST button opens the picker.
   - At most 3 pop-ups on screen at once.
   - Team Feast results are grouped by team.
8. **Text and layout:** audited on desktop AND phone again. **Prove us wrong:** report any overlap, cut-off text or stacked buttons with the screenshot path.

## What we want from you: EXTREME, SPECIFIC feedback aimed at 9/10
The goal is **9/10 from every profile**. Your report must make it obvious exactly what stands between the game and a 9 for you.
- Fill in **"Exactly what would make this a 9/10 for me"** as a complete checklist.
- Fill in **"Every issue I saw"** as an exhaustive table: no cap, every screen, every small thing.
- Do the **text and layout check** on every screen you visit.
- Give **2–3 big proposals** with full designs, grounded in what you actually saw.

## Your report
Write it to `C:\Users\Pat\kitchen-kaiju\playtest-reports\<profile-id>.md`. Follow
`C:\Users\Pat\kitchen-kaiju\scripts\playtest\sheet-template.md` exactly. Score honestly; the release bar is 9.0.
When done, reply with:
- your score
- your top 5 "what would make it 9" items
- your count of issues by severity
- any text or layout problems you found, with screenshot paths
