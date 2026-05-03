import { describe, it, expect } from "vitest";
import { computeBallPath } from "./simulation";
import type { StageBounds } from "./simulation";

const bounds: StageBounds = { left: 10, top: 10, right: 90, bottom: 90 };

describe("computeBallPath", () => {
  describe("reflections", () => {
    it("reflects off a side wall (horizontal flip)", () => {
      // 30° (shallow, hits right wall well before bottom)
      const path = computeBallPath(
        { name: "t", degrees: 30, validWhen: [] },
        { x: 50, y: 50 },
        bounds,
        { reflections: 1 }
      );
      expect(path.segments).toHaveLength(2);
      // first segment ends on the right wall
      expect(path.segments[0].end.x).toBeCloseTo(90);
      // second segment goes left (end.x < start.x)
      expect(path.segments[1].end.x).toBeLessThan(path.segments[1].start.x);
    });

    it("reflects off floor/ceiling (vertical flip)", () => {
      // 45° down-right hits bottom wall, reflects to -45° (up-right)
      const path = computeBallPath(
        { name: "t", degrees: 45, validWhen: [] },
        { x: 10, y: 50 },
        bounds,
        { reflections: 1 }
      );
      expect(path.segments).toHaveLength(2);
      // first segment ends on the bottom wall
      expect(path.segments[0].end.y).toBeCloseTo(90);
      // second segment goes upward (end.y < start.y)
      expect(path.segments[1].end.y).toBeLessThan(path.segments[1].start.y);
    });

    it("corner hit counts as two reflections", () => {
      // 45° down-right from top-left area hits bottom-right corner exactly
      const cornerBounds = { left: 0, top: 0, right: 40, bottom: 40 };
      const path = computeBallPath(
        { name: "t", degrees: 45, validWhen: [] },
        { x: 0, y: 0 },
        cornerBounds,
        { reflections: 1 }
      );
      // corner uses the 1 remaining bounce budget, no further segments
      expect(path.segments).toHaveLength(1);
      expect(path.segments[0].end.x).toBeCloseTo(40);
      expect(path.segments[0].end.y).toBeCloseTo(40);
    });

    it("caps reflections at 10", () => {
      // straight horizontal shot — would bounce forever between walls
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 50, y: 50 },
        bounds,
        { reflections: 999 }
      );
      expect(path.segments.length).toBeLessThanOrEqual(11); // 10 reflections + 1
    });

    it("segments are connected end-to-end", () => {
      const path = computeBallPath(
        { name: "t", degrees: 45, validWhen: [] },
        { x: 50, y: 50 },
        bounds,
        { reflections: 3 }
      );
      for (let i = 0; i < path.segments.length - 1; i++) {
        expect(path.segments[i].end.x).toBeCloseTo(path.segments[i + 1].start.x);
        expect(path.segments[i].end.y).toBeCloseTo(path.segments[i + 1].start.y);
      }
    });
  });

  describe("bunt arc", () => {
    const buntAngle = {
      name: "bunt",
      degrees: -90,
      validWhen: ["bunt"],
      bunt: true,
      initialSpeed: 9.6,
      gravity: 18,
      maxGravity: 15,
      buntStep: 100,
      maxReflections: 1,
    };

    it("produces multiple segments (curved path, not a straight line)", () => {
      const path = computeBallPath(buntAngle, { x: 50, y: 50 }, bounds, {
        reflections: 5,
      });
      expect(path.segments.length).toBeGreaterThan(1);
    });

    it("segments are connected end-to-end", () => {
      const path = computeBallPath(buntAngle, { x: 50, y: 50 }, bounds, {
        reflections: 5,
      });
      for (let i = 0; i < path.segments.length - 1; i++) {
        expect(path.segments[i].end.x).toBeCloseTo(path.segments[i + 1].start.x);
        expect(path.segments[i].end.y).toBeCloseTo(path.segments[i + 1].start.y);
      }
    });

    it("terminates when ball reaches a stage boundary", () => {
      const path = computeBallPath(buntAngle, { x: 50, y: 50 }, bounds, {
        reflections: 5,
      });
      const last = path.segments[path.segments.length - 1].end;
      const hitsBoundary =
        last.x >= bounds.right - 1 ||
        last.x <= bounds.left + 1 ||
        last.y >= bounds.bottom - 1 ||
        last.y <= bounds.top + 1;
      expect(hitsBoundary).toBe(true);
    });
  });

  describe("pong arc", () => {
    // Pong uses realistic speed (34px/step) so needs a stage-sized canvas
    const pongBounds: StageBounds = { left: 10, top: 10, right: 1220, bottom: 500 };
    const pongAngle = {
      name: "spin-forward",
      degrees: 20,
      validWhen: ["smash"],
      pong: true,
      initialSpeed: 34,
      pongStep: 2,
      turnRate: 4.2,
      maxReflections: 1,
    };

    it("produces multiple segments (curved path)", () => {
      const path = computeBallPath(pongAngle, { x: 200, y: 250 }, pongBounds, {
        reflections: 5,
      });
      expect(path.segments.length).toBeGreaterThan(1);
    });

    it("segments are connected end-to-end", () => {
      const path = computeBallPath(pongAngle, { x: 200, y: 250 }, pongBounds, {
        reflections: 5,
      });
      for (let i = 0; i < path.segments.length - 1; i++) {
        expect(path.segments[i].end.x).toBeCloseTo(path.segments[i + 1].start.x);
        expect(path.segments[i].end.y).toBeCloseTo(path.segments[i + 1].start.y);
      }
    });

    it("terminates when ball reaches a stage boundary", () => {
      const path = computeBallPath(pongAngle, { x: 200, y: 250 }, pongBounds, {
        reflections: 5,
      });
      const last = path.segments[path.segments.length - 1].end;
      const hitsBoundary =
        last.x >= pongBounds.right - 1 ||
        last.x <= pongBounds.left + 1 ||
        last.y >= pongBounds.bottom - 1 ||
        last.y <= pongBounds.top + 1;
      expect(hitsBoundary).toBe(true);
    });
  });

  describe("pong wall termination", () => {
    const wb: StageBounds = { left: 10, top: 10, right: 300, bottom: 500 };
    const straight = (degrees: number) => ({
      name: "spin",
      degrees,
      validWhen: [] as string[],
      pong: true as const,
      initialSpeed: 34,
      pongStep: 2,
      turnRate: 0,
      maxReflections: 1,
    });

    it("pong ball hitting the right wall sets termination kind to 'wall'", () => {
      const path = computeBallPath(straight(0), { x: 50, y: 250 }, wb, { reflections: 1 });
      expect(path.termination?.kind).toBe("wall");
    });

    it("pong ball hitting the left wall sets termination kind to 'wall'", () => {
      const path = computeBallPath(straight(180), { x: 250, y: 250 }, wb, { reflections: 1 });
      expect(path.termination?.kind).toBe("wall");
    });

    it("pong ball hitting the floor has no termination", () => {
      const path = computeBallPath(straight(90), { x: 150, y: 50 }, wb, { reflections: 1 });
      expect(path.termination).toBeUndefined();
    });

    it("pong ball hitting the ceiling has no termination", () => {
      const path = computeBallPath(straight(270), { x: 150, y: 450 }, wb, { reflections: 1 });
      expect(path.termination).toBeUndefined();
    });
  });

  describe("defender termination", () => {
    it("path terminates at first intersection with a defender hurtbox", () => {
      // 0° rightward from x=10 y=50; hurtbox spans x=60-80 y=40-60
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 10, y: 50 },
        bounds,
        { reflections: 5 },
        { hurtboxes: [[60, 40, 20, 20]], hitboxes: [] }
      );
      expect(path.segments).toHaveLength(1);
      expect(path.segments[0].end.x).toBeCloseTo(60);
      expect(path.segments[0].end.y).toBeCloseTo(50);
      expect(path.termination?.kind).toBe("hurtbox");
    });

    it("path terminates at hitbox when hitbox is closer than hurtbox", () => {
      // hitbox at x=55, hurtbox at x=65; ball travels right
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 10, y: 50 },
        bounds,
        { reflections: 5 },
        { hitboxes: [[55, 40, 10, 20]], hurtboxes: [[65, 40, 10, 20]] }
      );
      expect(path.segments[0].end.x).toBeCloseTo(55);
      expect(path.termination?.kind).toBe("hitbox");
    });

    it("hitbox wins when hitbox and hurtbox are at the same distance", () => {
      // both start at x=60, same left edge
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 10, y: 50 },
        bounds,
        { reflections: 5 },
        { hitboxes: [[60, 40, 20, 20]], hurtboxes: [[60, 40, 20, 20]] }
      );
      expect(path.termination?.kind).toBe("hitbox");
    });

    it("no termination when defender is not in the path", () => {
      // ball travels right, defender is above the path
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 10, y: 50 },
        bounds,
        { reflections: 0 },
        { hitboxes: [[60, 10, 20, 20]], hurtboxes: [] }
      );
      expect(path.termination).toBeUndefined();
    });
  });

  describe("straight lines", () => {
    it("upward shot (-90°) hits the top boundary", () => {
      const path = computeBallPath(
        { name: "t", degrees: -90, validWhen: [] },
        { x: 50, y: 50 },
        bounds,
        { reflections: 0 }
      );
      expect(path.segments).toHaveLength(1);
      expect(path.segments[0].end.x).toBeCloseTo(50);
      expect(path.segments[0].end.y).toBeCloseTo(10);
    });

    it("rightward shot (0°) hits the right boundary", () => {
      const path = computeBallPath(
        { name: "t", degrees: 0, validWhen: [] },
        { x: 50, y: 50 },
        bounds,
        { reflections: 0 }
      );
      expect(path.segments).toHaveLength(1);
      expect(path.segments[0].start).toEqual({ x: 50, y: 50 });
      expect(path.segments[0].end.x).toBeCloseTo(90);
      expect(path.segments[0].end.y).toBeCloseTo(50);
    });
  });
});
