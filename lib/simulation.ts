import type { Angle } from "@/data/types";

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

export interface BallPath {
  segments: Segment[];
}

const MAX_REFLECTIONS = 10;
const EPSILON = 0.5;

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
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
  options: { reflections: number }
): BallPath {
  const maxReflections = Math.min(options.reflections, MAX_REFLECTIONS);
  const segments: Segment[] = [];
  let pos = { ...start };
  let degrees = angle.degrees;

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

    segments.push({ start: { ...pos }, end: { ...end } });

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

  return { segments };
}
