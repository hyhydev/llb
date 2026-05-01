import { describe, it, expect } from "vitest";
import { clampToStage, stageBoundsFrom } from "./stage";

// Outskirts: canvasSize=[1240,510], canvasOffset=[43,33]
// Playable bounds: left=43, top=33, right=43+1240=1283, bottom=33+510=543
const bounds = { left: 43, top: 33, right: 1283, bottom: 543 };
const char = { width: 100, height: 150 };

describe("clampToStage", () => {
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
