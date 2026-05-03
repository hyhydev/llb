import { describe, it, expect } from "vitest";
import { computeGridTeleportDestination, computeNitroCuffPositions } from "./specials";
import { characterJSON } from "@/data/characters";
import type { StageBounds } from "./simulation";

const bounds: StageBounds = { left: 43, top: 33, right: 1283, bottom: 543 };

// Grid swing pose — used for horizontal teleports
const gridSwing = characterJSON["Grid"].poses.find((p) => p.name === "swing")!;

describe("computeGridTeleportDestination", () => {
  it("moves the character right by teleportDistance", () => {
    const dest = computeGridTeleportDestination(
      { x: 500, y: 300 },
      { x: 1, y: 0 },
      330,
      bounds,
      gridSwing,
    );
    expect(dest.x).toBe(830);
    expect(dest.y).toBe(300);
  });

  it("moves the character left by teleportDistance", () => {
    const dest = computeGridTeleportDestination(
      { x: 500, y: 300 },
      { x: -1, y: 0 },
      330,
      bounds,
      gridSwing,
    );
    expect(dest.x).toBe(170);
    expect(dest.y).toBe(300);
  });

  it("clamps to stage right boundary using hurtbox", () => {
    // Character at x=1200, moving right 330 would put hurtbox outside bounds
    const dest = computeGridTeleportDestination(
      { x: 1200, y: 300 },
      { x: 1, y: 0 },
      330,
      bounds,
      gridSwing,
    );
    // Grid swing hurtbox: [62, 0, 70, 160], imgSize [217, 166]
    // clampToStage max x = bounds.right + imgW/2 - (hurtX + hurtW)
    //                     = 1283 + 108.5 - 132 = 1259.5
    expect(dest.x).toBeLessThanOrEqual(1283 + 217 / 2 - (62 + 70));
    expect(dest.x).toBeGreaterThan(1200);
  });

  it("clamps to stage left boundary using hurtbox", () => {
    const dest = computeGridTeleportDestination(
      { x: 100, y: 300 },
      { x: -1, y: 0 },
      330,
      bounds,
      gridSwing,
    );
    expect(dest.x).toBeGreaterThanOrEqual(43);
  });
});

// Nitro swing pose
const nitroSwing = characterJSON["Nitro"].poses.find((p) => p.name === "swing")!;
const nitroChar = characterJSON["Nitro"];

describe("computeNitroCuffPositions", () => {
  it("returns null when ball is not in stage bounds", () => {
    const result = computeNitroCuffPositions(
      { x: 500, y: 300 },
      "right",
      nitroSwing,
      { x: -999, y: -999 },
      bounds,
      nitroChar,
    );
    expect(result).toBeNull();
  });

  it("full pull moves Nitro toward the ball", () => {
    const charPos = { x: 400, y: 300 };
    const ballPos = { x: 800, y: 300 };
    const result = computeNitroCuffPositions(charPos, "right", nitroSwing, ballPos, bounds, nitroChar);
    expect(result).not.toBeNull();
    expect(result!.fullPull.x).toBeGreaterThan(charPos.x);
  });

  it("half pull is between original position and full pull", () => {
    const charPos = { x: 400, y: 300 };
    const ballPos = { x: 800, y: 300 };
    const result = computeNitroCuffPositions(charPos, "right", nitroSwing, ballPos, bounds, nitroChar);
    expect(result).not.toBeNull();
    expect(result!.halfPull.x).toBeGreaterThan(charPos.x);
    expect(result!.halfPull.x).toBeLessThan(result!.fullPull.x);
  });

  it("full pull result is clamped to stage bounds", () => {
    // Ball near right wall — Nitro should be clamped
    const charPos = { x: 400, y: 300 };
    const ballPos = { x: bounds.right - 5, y: 300 };
    const result = computeNitroCuffPositions(charPos, "right", nitroSwing, ballPos, bounds, nitroChar);
    expect(result).not.toBeNull();
    // Nitro swing hurtbox: [66, 8, 65, 148], imgSize [225, 163]
    // clampToStage max x = bounds.right + imgW/2 - (hurtX + hurtW)
    //                     = 1283 + 112.5 - 131 = 1264.5
    expect(result!.fullPull.x).toBeLessThanOrEqual(1283 + 225 / 2 - (66 + 65));
  });
});
