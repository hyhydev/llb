import type { BallPath, Point } from "./simulation";

export function reflectionPoints(path: BallPath): Point[] {
  return path.segments.slice(0, -1).map((s) => s.end);
}

export function labelAnchor(path: BallPath): Point {
  const first = path.segments[0];
  return {
    x: (first.start.x + first.end.x) / 2,
    y: (first.start.y + first.end.y) / 2,
  };
}
