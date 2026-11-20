# Playtest brief (round 11): read this fully before playing

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

## New since the last round (round 11: judge these in depth where your profile would touch them)
1. **Round 10 fixes:**
   - 🧪 TRY IT is a free warm-up: it doesn't change your setup or pay rewards.
   - The Gallery detail panel no longer goes blank, and the ✨ Shiny tag shows.
   - EVERY achievement and unlock earned in a match is on the receipt.
   - The Cup locks MODE / FIRST TO.
   - Gauntlet NEW BEST is real, NEW RUN starts from your checkpoint, and a boss wave gives a ❤.
   - The Daily opens a preview card.
   - The Giant Hand warns you every time.
   - Pantry buys ask one item at a time.
   - The first Pantry visit's +25 🪙 is announced.
2. **🥊 Fighting:**
   - KAIJU lasts 7 s (the HUD shows seconds left), and the dizzy spell after it is shorter.
   - Rounds start with a 1.4 s shield.
   - The Move Lab dummy stands close, and KAIJU doesn't run out there.
   - Each Gallery card shows 📊 your record vs that kaiju.
3. **🏁 Challenges:**
   - Boss waves are the hardest of their course and pay +30 🪙.
   - 🗓 Weekly Gauntlet best (+25 🪙 for beating it).
   - 🌶️ SPICY DAILY (HARD rivals, +40 🪙 once a day) on the Daily card.
4. **📖 Story:**
   - A "📜 Meanwhile…" mystery line after each chapter clear.
   - The tip is shown on the chapter card (not repeated by the chef).
   - Progress reads "Chapters N/12".
5. **🎯 Records ▸ GOALS:** your path to 100%, with every collection's next step and the 4 closest achievements (📌 PIN). The Gallery shows a mastery bar.
6. **🎉 Party:**
   - Setup shows ⏱ ≈ N min.
   - Results show crumbs eaten and spoon seconds.
   - Team Feast shows a live RED–BLUE score.
   - A Phones-as-Pads room can start with bots only.
7. **❓ Help:** BASICS is now picture cards. A new EXTRAS tab explains power-ups, twists and hazards.
8. **📱 Phones:** a minimum text size everywhere, and phone wording in Practice and Help. **🧸 Kid Mode:** text at least 18 px.
9. **🛠 Workshop:**
   - 🥞 Pancakes are sticky, 🧁 cupcakes bake crumbs, and 🍅 tomatoes are soft bumpers.
   - 6 slots, and ✏ NAME a table.
10. **Text and layout:** audited on desktop, phone AND Kid Mode. **Prove us wrong:** report any overlap, cut-off text or stacked buttons with the screenshot path.

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
