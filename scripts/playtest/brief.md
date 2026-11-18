# Playtest brief (round 7): read this fully before playing

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

## New since the last round (judge these in depth where your profile would touch them)
1. **Progression:**
   - Mastery levels unlock cosmetics for each kaiju: dash sparkles, ⭐ HUD star, gold name, gold Gallery frame, crown aura.
   - Chef Rank ladder with thresholds (Records, Pantry).
   - Achievements pay 30 🪙. 📌 Pin one in Records by clicking it.
   - A daily 30%-off Pantry deal, and cheap colours.
   - Receipts list new achievements.
2. **🍽 First Service:** a 6-step first-hour checklist on the title. Practice now ends with a card (FIRST MATCH / STORY / MENU).
3. **CHALLENGES** (the title card that replaced GAUNTLET):
   - Gauntlet course checkpoints.
   - **🎯 TRIALS:** 8 fixed hard fights with 1–3 stars each.
   - **🥋 MOVE LAB:** in the Gallery, practise any kaiju's KAIJU power.
4. **⚡⚡ Double twists:** the TWIST button cycles through combos after the single twists.
5. **🏆 Party Cup:**
   - Each game names its winner.
   - The final is worth ×2 points.
   - The champion goes on a Cup Shelf, and there's a NEW CUP button.
6. **Story:**
   - Bosses get a PHASE 2 after losing a round.
   - **🧸 KID MODE** in Settings: easier rivals, one-line chats, bigger result text.
7. **Workshop:** COPY CODE and PASTE CODE share codes.
8. **Text and layout:** every screen was audited on desktop AND phone so nothing overlaps or runs out of its box. **Prove us wrong:** report any overlap, cut-off text or stacked buttons with the screenshot path.

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
