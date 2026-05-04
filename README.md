# Drone Ops — Card Game

A drone mission card game for 2 players, playable competitively or cooperatively.
Built with [NanDECK](https://www.nandeck.com/) and tested in [Tabletop Simulator](https://www.tabletopsimulator.com/).

---

## Deck Composition

Each player has their own deck of 50 cards:

| Card Type | Count |
|---|---|
| Operator Cards | 14 |
| Ops Kit Cards | 16 (4 copies of each of 4 types) |
| Action Cards | 20 (2 copies of each of 4 types + 12 Train Operator Cards) |

The Mission deck is shared between all players at the table.

---

## Core Gameplay Loop

Each turn, a player draws to a hand of five cards, then may play up to 2 cards in any order:

- **Deploy** — play one Operator card to your team,
- **Train Operator** - Upgrade an existing Operator
- **Play an Ops Kit card** — add one resource or credential to your active setup
- **Play an Action card** — use one action card effect

All actions are optional and can be taken in any order. A player may choose to skip any or all of them.

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
| 4 | Complete 4 simultaneously to win |
| 5 | **Loss condition triggered — all players lose** |

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

**Skill Requirements** — 9 points across:

| Skill | Points |
|---|---|
| Agriculture | 4 |
| Industrial/Infrastructure | 3 |
| Media | 2 |

**Ops Kit Requirements:** Permit · Drone Type

*Federal funding requirements mandate a Blue UAS compliant aircraft. A VTOL platform is recommended for efficient coverage across the turbine corridors. Permits must include proof of insurance and USDA compliance documentation. Multispectral payload captures crop health data while RGB imaging delivers publication quality photography for stakeholder communications.*

---

### Mission: Golden Hour

> A major studio production requires aerial coverage of a car chase sequence through downtown Los Angeles at dusk. The production window is narrow — golden hour lighting lasts approximately 22 minutes. Coordination with LAPD and FAA is mandatory for flight over populated areas.

**Skill Requirements** — 9 points across:

| Skill | Points |
|---|---|
| Media | 4 |
| Public Safety | 3 |
| Industrial/Infrastructure | 2 |

**Ops Kit Requirements:** Airspace Authorization · Permit 

*Operations near LAX Class B airspace require LAANC authorization. The production permit covers temporary closure of two city blocks. A high resolution stabilized gimbal payload delivers broadcast quality footage within the tight shooting window.*

---

### Mission: Ash Line

> A federal emergency management agency has contracted a post-wildfire assessment of agricultural land adjacent to burned wilderness in Northern California. The operation maps crop loss across 500 acres, documents soil erosion risk along fire break boundaries, and provides environmental impact data to support disaster relief funding applications.

**Skill Requirements** — 9 points across:

| Skill | Points |
|---|---|
| Agriculture | 4 |
| Environmental Science | 3 |
| Public Safety | 2 |

**Ops Kit Requirements:** Airspace Authorization · Terrain Equipment 

*Active Temporary Flight Restrictions require LAANC authorization and direct coordination with incident command. Post-fire terrain presents significant hazards including unstable soil, hidden ember beds, and compromised vegetation. Multispectral imaging identifies crop loss severity and soil moisture levels critical for erosion risk modeling and USDA disaster relief documentation.*
