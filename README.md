# Drone Ops — Card Game

A drone mission card game for 2 players, playable competitively or cooperatively.
Built with [NanDECK](https://www.nandeck.com/) and tested in [Tabletop Simulator](https://www.tabletopsimulator.com/).

---

## Deck Composition

Each player has their own deck of 25 cards:

| Card Type | Count |
|---|---|
| Operator Cards | 16 |
| Mission Gear Cards | 9 (3 copies of each of 3 types) |

*More than 16 operators will be available, choose your team wisely to conquer any mission you might face*

The Mission List can be found in the rule-book. Selecting the missions will be done with a dice roll to look up. 
Or maybe each player can select 3 missions (or make up 3 missions), then alternate turns to roll a dice to see who's mission is selected.

**TBD**

---

## Core Gameplay Loop

Each turn, a player draws to a hand of four cards, then may take two actions in any order:

- **Deploy** — play one Operator card to your team,
- **Play a Gear card** — add one Gear or give an operator +2 to a skill
- **Conduct a Test Flight** — Roll a pair of dice for a random outcome


### Mission Gear

Drone missions require more than just the drone and operators. Our missioins will require one of three different Mission Gears to complete:

 - **Specialty Drone** - Sometimes you need a multi-spectral drone, or a Blue-List Drone to complete the mission. Alternatively, add +2 to either Public Safety or Industrial skills to an operator.
 - **Airspace Authorization** - Flying in controlled airspace requires an Airspace Authorization. Alternatively, add +2 to either Agriculture or Media skills to an operator.
 - **Terrain Equipment** - Sometiems you need a boat or a 4x4 to get to your study site. Alternatively, add +2 to either Environmental or Biology skills to an operator.


### Test Flight Outcomes

Conducting a test flight is always a roll of the dice. Most of the time, you'll get more experience, or you'll realize that you need to adjust the mission, but you never know what might happen.

| Roll | Action | Description| Probability |
|---|---|---|---|
| 2 | Grounded | Your drone crashed, skip your next turn | 6.25 |
| 3-4 | Change Order | Choose an active Mission. Replace once of it's skill category mission requirements with a different skill category. (Ag-Env-Bio-Safety-Industrial-Media)| 31.25 |
| 5-6 | Train Operator | Choose one of your Operators. That Operator gains 1 skill point in one of its existing skill categories | 43.75 |
| 7 | Power Cycle | Drone was acting strangely. Set aside two cards from your hand. Draw two cards. Shuffle the set aside cards into your deck. | 12.5 | 
| 8 | Call a Friend | Sounds like a fun mission. Search your deck for any Operator and put them into play. Shuffle your deck. |




### Declaring Completion

After taking actions, a player may **Declare Completion** if their team simultaneously meets all skill point and Ops Kit requirements for an active Mission.

If Completion is declared, the opponent has one full turn to respond with an Action card to disrupt it.

- If all requirements are still met after the opponent's turn — the Mission is **claimed**
- If disrupted — the game continues normally and the declaring player may attempt to declare again on a future turn

---

## Win Condition

Complete the required number of active Missions simultaneously. The number of Missions required to win escalates with Mission Creep.

- **Competitive mode** — the first player to meet the win condition wins
- **Cooperative mode** — both players work together to meet the win condition before the loss condition triggers

---

## Mission Creep

Every 4 rounds a new Mission card is added to the active pool from the shared Mission deck. As Missions accumulate, the win condition escalates:

| Active Missions | Win Condition |
|---|---|
| 1 | Complete 1 to win |
| 2 | Complete 2 simultaneously to win |
| 3 | Complete 3 simultaneously to win |
| 4 | **Loss condition triggered — all players lose** |

### Difficulty

All Mission cards are equal in difficulty. Difficulty rises naturally and predictably through Mission Creep rather than through individual card design. Early game is manageable. Late game is intense.

---

## Blank Operator Cards

The deck includes blank Operator cards for players to create custom characters. Each blank card has fields for:

- Operator name and role
- Skill category selection — choose 2 of 6
- Point distribution — 2/2, 3/1, or 4/0
- Space for a portrait or personal photo

At conventions, blank cards are distributed at registration as an icebreaker activity. Attendees fill out their own Operator card and add it to their deck, personalizing the game and growing the operator pool organically throughout the event.

---

## Example Mission Cards

### Mission: Harvest Wind

> A regional energy company has contracted a survey of their wind farm situated across active cropland in the midwest. The operation requires detailed crop health mapping across 200 acres, structural inspection of 12 turbines, and aerial photography for the company's annual report and public website.

**Skill Requirements** — 12 points across:

| Skill | Points |
|---|---|
| Agriculture | 5 |
| Industrial/Infrastructure | 4 |
| Media | 3 |

**Mission Gear Requirements:** Specialty Drone

*Federal funding requirements mandate a Blue UAS compliant aircraft. A VTOL platform is recommended for efficient coverage across the turbine corridors. Permits must include proof of insurance and USDA compliance documentation. Multispectral payload captures crop health data while RGB imaging delivers publication quality photography for stakeholder communications.*

---

### Mission: Golden Hour

> A major studio production requires aerial coverage of a car chase sequence through downtown Los Angeles at dusk. The production window is narrow — golden hour lighting lasts approximately 22 minutes. Coordination with LAPD and FAA is mandatory for flight over populated areas.

**Skill Requirements** — 12 points across:

| Skill | Points |
|---|---|
| Media | 5 |
| Public Safety | 4 |
| Industrial/Infrastructure | 3 |

**Mission Gear Requirements:** Airspace Authorization 

*Operations near LAX Class B airspace require LAANC authorization. The production permit covers temporary closure of two city blocks. A high resolution stabilized gimbal payload delivers broadcast quality footage within the tight shooting window.*

---

### Mission: Ash Line

> A federal emergency management agency has contracted a post-wildfire assessment of agricultural land adjacent to burned wilderness in Northern California. The operation maps crop loss across 500 acres, documents soil erosion risk along fire break boundaries, and provides environmental impact data to support disaster relief funding applications.

**Skill Requirements** — 12 points across:

| Skill | Points |
|---|---|
| Agriculture | 5 |
| Environmental Science | 4 |
| Public Safety | 3 |

**Ops Kit Requirements:**  Terrain Equipment 

*Post-fire terrain presents significant hazards including unstable soil, hidden ember beds, and compromised vegetation. Multispectral imaging identifies crop loss severity and soil moisture levels critical for erosion risk modeling and USDA disaster relief documentation.*
