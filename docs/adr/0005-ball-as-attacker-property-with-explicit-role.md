# Ball is modelled as an attacker-owned property, not a free stage entity

In the game the ball is a free-floating stage entity. For the simulation tool we model it as a property of a staged character with the `attacker` role — a draggable position within the character's active hitbox union that acts as the ball path origin. Character roles (`attacker` | `defender`) are explicit fields on `StagedCharacter` rather than inferred from ball presence, because the tool must support both multi-attacker free exploration (multiple characters with balls, comparing angles) and the single-attacker/single-defender puzzle format. Treating role as implicit — "has a ball = attacker" — would have prevented the multi-attacker use case without any compensating simplification.

## Considered options

- **Ball as implicit attacker signal** — simpler model, ball presence implies attacker role. Rejected: prevents placing multiple attackers simultaneously, which is a core free-tool use case.
- **Ball as free stage entity** — more faithful to the game. Rejected: disconnects ball paths from the character who hit them, complicates the simulation interface, and loses the "tagged" ownership semantic that makes ball paths meaningful.
