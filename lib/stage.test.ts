import { describe, it, expect } from "vitest";
import { clampToStage, stageBoundsFrom } from "./stage";

const bounds = { left: 43, top: 33, right: 1197, bottom: 477 };
const char = { width: 100, height: 150 };

describe("clampToStage", () => {
  it("returns position unchanged when inside bounds", () => {
    const pos = { x: 500, y: 200 };
    expect(clampToStage(pos, bounds, char)).toEqual(pos);
  });

  it("clamps to left edge", () => {
    expect(clampToStage({ x: 0, y: 200 }, bounds, char)).toEqual({ x: 93, y: 200 });
  });

  it("clamps to right edge", () => {
    expect(clampToStage({ x: 1300, y: 200 }, bounds, char)).toEqual({ x: 1147, y: 200 });
  });

  it("clamps to top edge", () => {
    expect(clampToStage({ x: 500, y: 0 }, bounds, char)).toEqual({ x: 500, y: 108 });
  });

  it("clamps to bottom edge", () => {
    expect(clampToStage({ x: 500, y: 600 }, bounds, char)).toEqual({ x: 500, y: 402 });
  });
});

describe("stageBoundsFrom", () => {
  it("derives bounds from canvasSize and canvasOffset", () => {
    const stage = { canvasSize: [1240, 510] as [number, number], canvasOffset: [43, 33] as [number, number] };
    expect(stageBoundsFrom(stage)).toEqual({ left: 43, top: 33, right: 1197, bottom: 477 });
  });

  it("handles zero offset (full canvas is playable)", () => {
    const stage = { canvasSize: [1492, 522] as [number, number], canvasOffset: [0, 92] as [number, number] };
    expect(stageBoundsFrom(stage)).toEqual({ left: 0, top: 92, right: 1492, bottom: 430 });
  });
});
