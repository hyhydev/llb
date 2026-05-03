# Lethal League Blaze — Angle Tool

A tool for studying defensive positioning in *Lethal League Blaze* by simulating threats — ball paths, character repositioning, and area hazards — so players can identify where they need to be (or avoid) now and in the near future.

## Language

**Action**:
An input category a player can perform: swing, smash, spike, bunt, or special. Each action produces one or more angles. The same input always maps to the same action type regardless of character.
_Avoid_: move, attack, input

**Angle**:
A specific named ball trajectory produced by an action — e.g. "up" (swing), "spike-forward" (spike), "bunt-up" (bunt). Each angle has a direction in degrees. A single action may have multiple angles (swing has 3; smash has 1).
_Avoid_: move, attack, shot

**Bunt**:
An action with 4 directional angles whose ball cannot harm the opponent. Shown in the visualisation tool but excluded from daily puzzles since it poses no threat.
_Avoid_: lob, soft hit

**Special**:
A character-unique action that may launch the ball at an unusual angle or curve, reposition the character, create an area hazard, or any combination. Because positioning threats persist over time (a character's new position determines future attack origins), all special effects are worth showing in the tool.
_Avoid_: ability, skill, super

**Threat**:
Any simulated game element that affects where a defender needs to be — includes ball paths, character repositioning after a special, and area hazards. The tool shows threats, not just angles.
_Avoid_: attack, danger

**Ball path**:
The simulated trajectory the ball travels after being hit at a given angle, including bounces off stage boundaries and characters.
_Avoid_: trajectory, line, ray

**Reflection**:
A single bounce of the ball off a stage boundary or character hitbox, changing the ball path direction.
_Avoid_: bounce, ricochet

**Stage**:
A fixed-dimension arena with background geometry that constrains the ball path via its boundaries.
_Avoid_: map, level, arena

**Character**:
A selectable fighter placed on the stage. Each character has a set of angles, poses, hitboxes, and hurtboxes. Characters vary significantly in mobility — e.g. Doombox can fly, making aerial positions viable where they would not be for grounded characters. The defender character in a daily puzzle is assigned by puzzle generation, not chosen by the user.
_Avoid_: player, fighter, hero

**Pose**:
A character's combat stance (e.g. swing, crouch, lay). Each pose has its own sprite, hurtboxes, hitboxes, and image dimensions. The active pose determines which angles are valid (via `validWhen`) and which hitbox/hurtbox geometry is shown. Grounded poses (e.g. halfcrouch, lay) are flagged with `grounded: true`; aerial poses (e.g. spike) are not. Characters typically have 5–8 poses.
_Avoid_: animation, state, stance

**Hitbox**:
A rectangular collision region on a character that can deflect the ball. Rendered in red in the tool. A pose may have zero or more hitboxes — swing has one (the bat arc), smash has two, non-attacking poses typically have none. Hitboxes are pose-specific and stored in sprite-local coordinates `[x, y, width, height]`. Hitboxes are allowed to extend outside stage boundaries; only the hurtbox is constrained to the stage.
_Avoid_: collision box

**Hurtbox**:
A rectangular region defining the physical extent of the character — where they can be hit and how much space they occupy on the stage. Rendered in blue in the tool. Each pose has at least one hurtbox, stored in sprite-local coordinates `[x, y, width, height]`. The hurtbox is the authoritative boundary for stage clamping: when a character is dragged, only the hurtbox is required to stay within the playable bounds — the sprite and any hitbox overhang are free to extend into walls. The bottom edge of the first hurtbox (`hurtbox[1] + hurtbox[3]`) is the character's ground contact point (feet), used to align the character to the stage floor. The hurtbox is typically narrower and shorter than the full sprite due to transparent padding in the sprite image.
_Avoid_: damage box

**Sprite**:
The PNG image for a character in a given pose. Larger than the character model — there is transparent padding around the character, so the sprite dimensions do not correspond to the character's physical extent. Positions and sizes in `hurtboxes` and `hitboxes` are expressed in sprite-local coordinates, where `(0, 0)` is the sprite's top-left corner. The character is rendered centred on their stage position, so the sprite's top-left is at `pos - spriteSize / 2`. All sprites are right-facing (`_r.png`); left-facing is achieved by a horizontal SVG mirror transform around the character centre.
_Avoid_: image, texture, frame

**Facing**:
The horizontal direction a character is oriented — right (default) or left (mirrored). Mirroring is a visual-only SVG transform; it does not change hitbox or hurtbox coordinates or affect ball path calculations.
_Avoid_: direction, orientation, side

**Ball**:
The game entity that travels across the stage and is hit by characters. In the simulation tool, the ball is modelled as a property of a staged character with the attacker role — a position (in stage coordinates) draggable within the character's active hitbox, acting as the origin point for ball path simulation. The exact contact point within the hitbox matters: it determines where the ball path starts. A defender has no ball and no ball path is simulated from them. Multiple attackers can coexist in the free tool, each with their own ball; the one-ball constraint (one attacker, one defender) is a puzzle-level rule.
_Avoid_: projectile, puck, orb

**Role**:
A property of a staged character that determines whether they are hitting the ball or receiving it. An attacker has a ball and produces simulated ball paths. A defender has no ball and represents the player trying to intercept the ball path. Every staged character is either an attacker or a defender — there is no neutral role.
_Avoid_: side, team, type

**Simulation**:
The pure TypeScript function that computes a ball path from an angle's degrees, a ball position (within the attacker's hitbox union), stage bounds, and any defender hitboxes and hurtboxes — producing a series of line segments, reflection points, and an optional termination. The path terminates early at the first intersection with a defender's hitbox or hurtbox; if both are intersected at the same distance, the hitbox wins. When the path terminates, the intersected box is filled (using its existing hitbox or hurtbox color) to signal whether the defender caught the ball (hitbox) or was hit by it (hurtbox). Has no rendering dependency; used by both the visualisation tool and puzzle generation.
_Avoid_: physics, engine, renderer

**Game data**:
The static, immutable TypeScript data extracted from `angle/main.js` — character hitboxes, angle degrees, stage dimensions. Pulled from the game's source code; the game will not be updated. Treated as fixed constants, not a database concern.
_Avoid_: config, game config, assets

## Relationships

- A **Stage** provides the spatial bounds within which **ball paths** are simulated
- A **Character** has one or more **poses** and one or more **angles**, grouped by **action**
- An **angle** is only valid when the character is in specific **poses**
- A **ball path** starts from a **character**'s position and travels at the **angle**'s degrees, producing zero or more **reflections**
- A **simulation** takes an **angle**, start position, and **stage** and returns a **ball path**
- A **daily puzzle** fixes a **stage**, attacker **character**, attacker position, **action**, defender **character**, **meter** state, and **ball speed** — all from **game data**
- A **defensive submission** is scored against the **expert consensus** to produce a **score** and **tier**
- A **leaderboard** aggregates **scores** across users — daily (today's puzzle) and cumulative (all puzzles)

## Example dialogue

> **Dev:** "Should the puzzle show all three swing **angles** at once?"
> **Domain expert:** "Yes — in real play you never know which one is coming. The puzzle tests **option select**: finding the single position that covers all three simultaneously."

> **Dev:** "What if the attacker has full **meter**? Do we render the **special** paths too?"
> **Domain expert:** "No — we just show the meter indicator. It's up to the puzzle taker to know what that **threat** means for their character."

> **Dev:** "Can I pick Doombox as my defender?"
> **Domain expert:** "No — the defender **character** is assigned by the **puzzle**. Doombox can fly, so the same position means something completely different for him than a grounded character."

**Coverage**:
The act of positioning a defending character such that they can intercept (catch or block) the ball on a given ball path.
_Avoid_: block, dodge, guard

**Score**:
A user's result for a daily puzzle, expressed as a tier from 1–5 derived from the pixel distance between their submission and the expert consensus. Lower distance = higher tier. The raw pixel distance is stored and used for leaderboard ranking within the same tier.
_Avoid_: points, rating, accuracy

**Leaderboard**:
Two views of competitive rankings: daily (best tier + raw distance for today's puzzle) and cumulative (sum of tiers across all puzzles attempted). Both are derived from the same stored attempts.
_Avoid_: rankings, scoreboard, high scores

**Tier**:
A band of pixel distances mapped to a value 1–5. Thresholds (subject to tuning): ≤10px = 5, ≤30px = 4, ≤60px = 3, ≤100px = 2, ≤150px = 1. Beyond 150px = tier 1 (floor). Raw distance is stored for leaderboard tie-breaking within the same tier.
_Avoid_: rating, level, grade

**Daily puzzle**:
A scheduled scenario (one per day, shared across all users) showing a stage, character, attacker position, action (swing/smash/spike only — bunt and special excluded), all ball paths for that action simultaneously, meter state, and ball speed. The user finds the best option-select position. Evaluated against expert consensus.
_Avoid_: daily game, quiz, challenge

**Puzzle generation**:
The automated process that creates a daily puzzle by randomly selecting a stage, attacker character, attacker position, a non-bunt non-special action, defender character, meter state, and ball speed. Both characters are fixed — users cannot change them. Puzzles are generated a week ahead of their live date. Experts are notified via a Discord webhook ping to a private channel at the start of the weekend to give them several days to submit.
_Avoid_: puzzle creation, scheduling

**Option select**:
A defensive position that simultaneously covers all possible angles an attacker could throw for a given action. The goal of defensive play — and the skill the daily puzzle tests.
_Avoid_: coverage, multi-cover, hedge

**Meter**:
An integer resource (0–4 bars) that enables a character's special when full. Displayed as a UI indicator on the daily puzzle — the puzzle taker uses this information to inform their own decision about the special threat.
_Avoid_: energy, gauge, charge

**Ball speed**:
An integer value (typically 1–150, max 1000) representing how fast the ball travels. Shown in the daily puzzle because a faster ball reduces the time the defender has to reach their position.
_Avoid_: velocity, speed

**Expert**:
A skilled player personally selected by the owner to pre-submit their defensive answer for upcoming daily puzzles before those puzzles go live. Up to 5 experts submit per puzzle.
_Avoid_: contributor, moderator, reviewer

**Expert consensus**:
The canonical answer to a daily puzzle, derived from expert submissions by: (1) finding the submission with the most other submissions within 200px on both axes (the anchor), (2) removing outliers — submissions more than 200px from the anchor on either axis, (3) averaging the remaining positions. If no two experts are within 200px of each other, one submission is chosen at random. Applies to position only — pose is not averaged.
_Avoid_: correct answer, solution

**Defensive submission**:
A user's or expert's answer to a daily puzzle: a position (x, y) on the stage and a chosen pose (the action they intend to use to receive the ball — bunt, swing, spike, or smash). Both are stored. Scoring is based on position distance from the expert consensus only — pose is not scored but is revealed after submission.
_Avoid_: answer, response, guess

**Owner**:
The administrator who selects which users are experts and controls the puzzle schedule.
_Avoid_: admin, moderator

**User**:
A player authenticated via Discord OAuth who can submit a daily puzzle answer and appear on the leaderboard. Authentication is handled by BetterAuth.
_Avoid_: player, member, account

**Active angle**:
A user-selected angle with a configured reflection count, shown in the tool. When an attacker is placed on stage, no active angles exist by default — the user adds them individually from the angles valid for the current pose. Each active angle carries its own reflection count (default: 1; capped per-angle by the game data maximum). Removing or changing to an incompatible pose discards active angles that are no longer valid.
_Avoid_: visible angle, enabled angle, shown angle

**Reflection count**:
The number of bounces the user has configured for a given active angle. Controlled per active angle via +/− UI. The game allows unlimited reflections, but a per-angle cap from the game data is enforced as a practical ceiling.
_Avoid_: bounce count, bounces

**Down angle**:
A unified UI concept representing the downward swing trajectory, which resolves to either `air-down` or `ground-down` game data depending on whether the current pose is grounded (`grounded: true`). The two underlying angles have different degrees (e.g. 35° vs 25°) but are presented to the user as a single "down" choice. Switching to a grounded pose while "down" is active automatically uses the grounded-down degrees; switching to an aerial pose uses the air-down degrees.
_Avoid_: airdown, grounddown (use "down" in UI; distinguish air-down/ground-down only when referring to game data)

## Flagged ambiguities

_(none yet)_
