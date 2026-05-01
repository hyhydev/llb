import { describe, it, expect } from "vitest";
import { clampToStage } from "./stage";

const stage = { width: 1240, height: 510 };
const char = { width: 100, height: 150 };

describe("clampToStage", () => {
  it("returns position unchanged when inside bounds", () => {
    const pos = { x: 500, y: 200 };
    expect(clampToStage(pos, stage, char)).toEqual(pos);
  });

  it("clamps to left edge", () => {
    expect(clampToStage({ x: -20, y: 200 }, stage, char)).toEqual({ x: 50, y: 200 });
  });

  it("clamps to right edge", () => {
    expect(clampToStage({ x: 1300, y: 200 }, stage, char)).toEqual({ x: 1190, y: 200 });
  });

  it("clamps to top edge", () => {
    expect(clampToStage({ x: 500, y: -10 }, stage, char)).toEqual({ x: 500, y: 75 });
  });

  it("clamps to bottom edge", () => {
    expect(clampToStage({ x: 500, y: 600 }, stage, char)).toEqual({ x: 500, y: 435 });
  });
});
