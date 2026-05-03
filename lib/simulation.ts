import type { Angle, Box } from "@/data/types";

export interface Point {
  x: number;
  y: number;
}

export interface StageBounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface Segment {
  start: Point;
  end: Point;
}

export type TerminationKind = "hitbox" | "hurtbox";

export interface BallPath {
  segments: Segment[];
  termination?: { kind: TerminationKind; box: Box };
}

export interface DefenderBoxes {
  hitboxes: Box[];
  hurtboxes: Box[];
}

const MAX_REFLECTIONS = 10;
const EPSILON = 0.5;

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function rayBoxIntersectT(start: Point, dx: number, dy: number, box: Box): number {
  const [bx, by, bw, bh] = box;
  let tMin = -Infinity;
  let tMax = Infinity;
  if (Math.abs(dx) > 1e-9) {
    const t1 = (bx - start.x) / dx;
    const t2 = (bx + bw - start.x) / dx;
    tMin = Math.max(tMin, Math.min(t1, t2));
    tMax = Math.min(tMax, Math.max(t1, t2));
  } else if (start.x < bx || start.x > bx + bw) {
    return Infinity;
  }
  if (Math.abs(dy) > 1e-9) {
    const t1 = (by - start.y) / dy;
    const t2 = (by + bh - start.y) / dy;
    tMin = Math.max(tMin, Math.min(t1, t2));
    tMax = Math.min(tMax, Math.max(t1, t2));
  } else if (start.y < by || start.y > by + bh) {
    return Infinity;
  }
  return tMin > tMax || tMax <= 0 ? Infinity : Math.max(tMin, 0);
}

function rotatePoint(p: Point, degrees: number): Point {
  const rad = toRad(degrees);
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { x: p.x * cos - p.y * sin, y: p.x * sin + p.y * cos };
}

function rayToBounds(start: Point, degrees: number, bounds: StageBounds): Point {
  const rad = toRad(degrees);
  const dx = Math.cos(rad);
  const dy = Math.sin(rad);

  let minT = Infinity;

  if (dx > 0) minT = Math.min(minT, (bounds.right - start.x) / dx);
  else if (dx < 0) minT = Math.min(minT, (bounds.left - start.x) / dx);

  if (dy > 0) minT = Math.min(minT, (bounds.bottom - start.y) / dy);
  else if (dy < 0) minT = Math.min(minT, (bounds.top - start.y) / dy);

  return { x: start.x + dx * minT, y: start.y + dy * minT };
}

function reflectDegrees(
  degrees: number,
  end: Point,
  bounds: StageBounds
): { degrees: number; cornerHit: boolean } {
  const hitSides =
    end.x >= bounds.right - EPSILON || end.x <= bounds.left + EPSILON;
  const hitFloorCeiling =
    end.y >= bounds.bottom - EPSILON || end.y <= bounds.top + EPSILON;

  if (hitSides && hitFloorCeiling) {
    return { degrees: degrees + 180, cornerHit: true };
  } else if (hitSides) {
    return { degrees: degrees * -1 + 180, cornerHit: false };
  } else {
    return { degrees: degrees * -1, cornerHit: false };
  }
}

export function computeBallPath(
  angle: Angle,
  start: Point,
  stageBounds: StageBounds,
  options: { reflections: number },
  defender?: DefenderBoxes
): BallPath {
  const maxReflections = Math.min(options.reflections, MAX_REFLECTIONS);
  const segments: Segment[] = [];
  let pos = { ...start };
  let degrees = angle.degrees;
  let termination: BallPath["termination"];

  let velocity = { x: 0, y: 0 };
  let turnRate = 0;
  let turnDir = 1;

  if ((angle.bunt || angle.pong) && angle.initialSpeed !== undefined) {
    velocity = rotatePoint({ x: angle.initialSpeed, y: 0 }, degrees);
    if (angle.pong && angle.turnRate !== undefined) {
      turnRate = angle.turnRate * 1.55;
      turnDir = velocity.x < 0 ? -1 : 1;
    }
  }

  for (let i = 0; i <= maxReflections; i++) {
    let end: Point;

    let buntHitCeiling = false;
    let buntHitBoundary = false;
    if (angle.bunt) {
      const buntStep = angle.buntStep ?? 100;
      const gravity = angle.gravity ?? 18;
      const maxGravity = angle.maxGravity ?? 15;
      end = { ...pos };
      for (let b = 0; b < buntStep; b++) {
        const wasUpwards = velocity.y < 0;
        const nx = end.x + velocity.x;
        const ny = end.y + velocity.y;
        velocity = {
          ...velocity,
          y: Math.min(velocity.y + gravity / 60, maxGravity),
        };
        // Clip to stage boundary and track which boundary was hit
        if (ny < stageBounds.top) {
          const t = (stageBounds.top - end.y) / (ny - end.y);
          end = { x: end.x + t * (nx - end.x), y: stageBounds.top + 1 };
          velocity = { ...velocity, y: 0 };
          buntHitCeiling = true;
          buntHitBoundary = true;
          break;
        }
        if (ny > stageBounds.bottom) {
          const t = (stageBounds.bottom - end.y) / (ny - end.y);
          end = { x: end.x + t * (nx - end.x), y: stageBounds.bottom };
          buntHitBoundary = true;
          break;
        }
        if (nx > stageBounds.right) {
          const t = (stageBounds.right - end.x) / (nx - end.x);
          end = { x: stageBounds.right, y: end.y + t * (ny - end.y) };
          buntHitBoundary = true;
          break;
        }
        if (nx < stageBounds.left) {
          const t = (stageBounds.left - end.x) / (nx - end.x);
          end = { x: stageBounds.left, y: end.y + t * (ny - end.y) };
          buntHitBoundary = true;
          break;
        }
        end = { x: nx, y: ny };
        if (wasUpwards && velocity.y >= 0) break;
      }
    } else if (angle.pong) {
      const pongStep = angle.pongStep ?? 2;
      end = { ...pos };
      for (let p = 0; p < pongStep; p++) {
        end = { x: end.x + velocity.x, y: end.y + velocity.y };
        turnRate = Math.max(0, turnRate - 6 / 60);
        degrees += turnRate * turnDir;
        velocity = rotatePoint(velocity, turnRate * turnDir);
      }
    } else {
      end = rayToBounds(pos, degrees, stageBounds);
    }

    if (defender && !angle.bunt && !angle.pong) {
      const rad = toRad(degrees);
      const dx = Math.cos(rad);
      const dy = Math.sin(rad);
      let bestT = Infinity;
      let bestKind: TerminationKind | undefined;
      let bestBox: Box | undefined;
      for (const box of defender.hitboxes) {
        const t = rayBoxIntersectT(pos, dx, dy, box);
        if (t < bestT) { bestT = t; bestKind = "hitbox"; bestBox = box; }
      }
      for (const box of defender.hurtboxes) {
        const t = rayBoxIntersectT(pos, dx, dy, box);
        if (t < bestT) { bestT = t; bestKind = "hurtbox"; bestBox = box; }
      }
      const segDist = Math.hypot(end.x - pos.x, end.y - pos.y);
      if (bestT < segDist) {
        end = { x: pos.x + dx * bestT, y: pos.y + dy * bestT };
        termination = { kind: bestKind!, box: bestBox! };
      }
    }

    segments.push({ start: { ...pos }, end: { ...end } });

    if (termination) break;

    if (angle.bunt) {
      // Ceiling hit: reset velocity and continue. Floor/side hit: stop.
      if (buntHitBoundary && !buntHitCeiling) break;
      i--;
    } else if (angle.pong) {
      const hitsBoundary =
        end.x >= stageBounds.right - EPSILON ||
        end.x <= stageBounds.left + EPSILON ||
        end.y >= stageBounds.bottom - EPSILON ||
        end.y <= stageBounds.top + EPSILON;
      if (hitsBoundary) break;
      i--;
    } else if (i < maxReflections) {
      const { degrees: reflected, cornerHit } = reflectDegrees(
        degrees,
        end,
        stageBounds
      );
      degrees = reflected;
      if (cornerHit) i++;
    }

    pos = { ...end };
  }

  return termination ? { segments, termination } : { segments };
}
