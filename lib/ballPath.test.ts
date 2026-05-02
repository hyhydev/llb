import { describe, it, expect } from "vitest";
import { reflectionPoints, labelAnchor } from "./ballPath";
import type { BallPath } from "./simulation";

function seg(x1: number, y1: number, x2: number, y2: number) {
  return { start: { x: x1, y: y1 }, end: { x: x2, y: y2 } };
}

describe("reflectionPoints", () => {
  it("returns empty array for a path with no bounces", () => {
    const path: BallPath = { segments: [seg(50, 50, 200, 100)] };
    expect(reflectionPoints(path)).toEqual([]);
  });

  it("returns one point for a single reflection", () => {
    const path: BallPath = {
      segments: [seg(50, 50, 100, 0), seg(100, 0, 150, 50)],
    };
    expect(reflectionPoints(path)).toEqual([{ x: 100, y: 0 }]);
  });

  it("returns N-1 points for N segments", () => {
    const path: BallPath = {
      segments: [
        seg(0, 0, 100, 0),
        seg(100, 0, 100, 100),
        seg(100, 100, 0, 100),
        seg(0, 100, 0, 0),
      ],
    };
    const pts = reflectionPoints(path);
    expect(pts).toHaveLength(3);
    expect(pts[0]).toEqual({ x: 100, y: 0 });
    expect(pts[1]).toEqual({ x: 100, y: 100 });
    expect(pts[2]).toEqual({ x: 0, y: 100 });
  });
});

describe("labelAnchor", () => {
  it("returns the midpoint of the first segment", () => {
    const path: BallPath = { segments: [seg(0, 0, 100, 80)] };
    expect(labelAnchor(path)).toEqual({ x: 50, y: 40 });
  });

  it("uses only the first segment even when multiple exist", () => {
    const path: BallPath = {
      segments: [seg(0, 0, 200, 100), seg(200, 100, 400, 50)],
    };
    expect(labelAnchor(path)).toEqual({ x: 100, y: 50 });
  });
});
