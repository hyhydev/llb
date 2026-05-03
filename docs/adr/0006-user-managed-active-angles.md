# ADR 0006 — User-managed active angles with per-angle reflection count

**Status:** Accepted

## Context

The original tool rendered every valid angle for the attacker's current pose simultaneously. With specials adding more paths (e.g. Sonata's 8-angle multi-step, Dice's pong variants), the stage became unreadably noisy. Testing specials was practically impossible because the correct paths were buried under all the others.

Two alternatives were considered:

1. **Keep show-all, add a global reflection cap** — reduce noise by limiting bounces globally. Simple but still shows irrelevant angles and gives no per-angle control.
2. **User-managed active angles** — no angles shown by default; the user explicitly adds each angle they care about and sets its reflection count independently.

## Decision

Option 2. When an attacker is placed and a pose is selected, the active angle list starts empty. The user picks angles one at a time from the angles valid for the current pose (in game-data order). Each added angle carries its own reflection count (default: 1, capped by the game data maximum per angle).

The down-angle unification (presenting `air-down` and `ground-down` as a single "down" choice that resolves based on whether the current pose is grounded) is part of this decision — it avoids exposing a game-internal distinction that is meaningless at the UI level.

## Consequences

- The stage is quiet by default; the user builds up exactly the view they need.
- Pose changes silently drop active angles that are no longer valid — acceptable given angles are cheap to re-add and the current pose is always visible.
- Special simulations (Sonata steps, Dice pong) must integrate cleanly with the active-angle model rather than auto-showing all paths.
- The down-angle resolver must be kept at the UI layer; the underlying `air-down`/`ground-down` game data entries remain unchanged.
