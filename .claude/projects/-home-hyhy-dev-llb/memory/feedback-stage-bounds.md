---
name: Stage bounds and background image rendering
description: How canvasOffset is used for stage bounds and background image positioning in SVG
type: feedback
---

Use `canvasOffset` to define the playable stage bounds: `{ left: ox, top: oy, right: w-ox, bottom: h-oy }`. The helper `stageBoundsFrom(stage)` in `lib/stage.ts` derives this.

**Why:** The original `main.js` uses `canvasOffset` only for CSS background-position, but the user wants it used for the playable bounds (character clamp + ball path simulation). Fixes character being draggable into the decorative border area of stage images.

**How to apply:** Always call `stageBoundsFrom(stage)` to get bounds when clamping character position or calling `computeBallPath`. Never use `canvasSize` directly as bounds.

Stage background images are rendered at `x=-canvasOffset[0]`, `y=-canvasOffset[1]` with their natural `imageSize` dimensions (stored in `data/stages.ts`). SVG viewport clips the excess automatically.
