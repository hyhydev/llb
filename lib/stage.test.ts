import { describe, it, expect } from "vitest";
import { clampToStage, stageBoundsFrom } from "./stage";

// Outskirts: canvasSize=[1240,510], canvasOffset=[43,33]
// Playable bounds: left=43, top=33, right=43+1240=1283, bottom=33+510=543
const bounds = { left: 43, top: 33, right: 1283, bottom: 543 };
const char = { width: 100, height: 150 };

describe("clampToStage without hurtbox (sprite bounds)", () => {
  it("returns position unchanged when inside bounds", () => {
    const pos = { x: 500, y: 200 };
    expect(clampToStage(pos, bounds, char)).toEqual(pos);
  });

  it("clamps to left edge", () => {
    // min x = bounds.left + halfW = 43 + 50 = 93
    expect(clampToStage({ x: 0, y: 200 }, bounds, char)).toEqual({ x: 93, y: 200 });
  });

  it("clamps to right edge", () => {
    // max x = bounds.right - halfW = 1283 - 50 = 1233
    expect(clampToStage({ x: 1400, y: 200 }, bounds, char)).toEqual({ x: 1233, y: 200 });
  });

  it("clamps to top edge", () => {
    // min y = bounds.top + halfH = 33 + 75 = 108
    expect(clampToStage({ x: 500, y: 0 }, bounds, char)).toEqual({ x: 500, y: 108 });
  });

  it("clamps to bottom edge", () => {
    // max y = bounds.bottom - halfH = 543 - 75 = 468
    expect(clampToStage({ x: 500, y: 700 }, bounds, char)).toEqual({ x: 500, y: 468 });
  });
});

describe("clampToStage with hurtbox", () => {
  // sprite 100×150, hurtbox at [20, 15, 40, 120]
  // hurtL=20, hurtR=60, hurtBottom=135, halfW=50, halfH=75
  const hurtbox = [20, 15, 40, 120] as const;

  it("allows sprite to extend left of stage when hurtbox fits", () => {
    // min x = bounds.left + halfW - hurtL = 43 + 50 - 20 = 73
    // (20px further left than sprite-only clamping)
    expect(clampToStage({ x: 0, y: 200 }, bounds, char, hurtbox)).toEqual({ x: 73, y: 200 });
  });

  it("allows sprite to extend right of stage when hurtbox fits", () => {
    // max x = bounds.right + halfW - hurtR = 1283 + 50 - 60 = 1273
    // (40px further right than sprite-only clamping)
    expect(clampToStage({ x: 1400, y: 200 }, bounds, char, hurtbox)).toEqual({ x: 1273, y: 200 });
  });

  it("aligns hurtbox bottom to stage floor", () => {
    // hurtBottom=135, feetFromCenter=135-75=60, max y = 543 - 60 = 483
    expect(clampToStage({ x: 500, y: 700 }, bounds, char, hurtbox)).toEqual({ x: 500, y: 483 });
  });

  it("position inside bounds unchanged", () => {
    const pos = { x: 500, y: 200 };
    expect(clampToStage(pos, bounds, char, hurtbox)).toEqual(pos);
  });

  it("hurtbox spanning full sprite width matches no-hurtbox behaviour", () => {
    const fullHurtbox = [0, 0, 100, 150] as const;
    expect(clampToStage({ x: 0, y: 700 }, bounds, char, fullHurtbox)).toEqual(
      clampToStage({ x: 0, y: 700 }, bounds, char),
    );
  });
});

describe("stageBoundsFrom", () => {
  it("derives bounds from canvasSize and canvasOffset", () => {
    const stage = { canvasSize: [1240, 510] as [number, number], canvasOffset: [43, 33] as [number, number] };
    expect(stageBoundsFrom(stage)).toEqual({ left: 43, top: 33, right: 1283, bottom: 543 });
  });

  it("handles zero x-offset (full width is playable)", () => {
    const stage = { canvasSize: [1492, 522] as [number, number], canvasOffset: [0, 92] as [number, number] };
    expect(stageBoundsFrom(stage)).toEqual({ left: 0, top: 92, right: 1492, bottom: 614 });
  });
});
