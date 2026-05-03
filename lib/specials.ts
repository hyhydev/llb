import type { Pose } from "@/data/types";
import type { StageBounds } from "./simulation";
import { clampToStage } from "./stage";

export interface Point {
  x: number;
  y: number;
}

export interface CuffPositions {
  /** Nitro's center position at full pull (only Nitro moves to ball) */
  fullPull: Point;
  /** Nitro's center position at half pull (both Nitro and ball converge) */
  halfPull: Point;
  /** Ball release point after full pull */
  fullPullBallRelease: Point;
  /** Ball release point after half pull */
  halfPullBallRelease: Point;
}

/**
 * Computes the stage position Grid lands on after one teleport step.
 * Uses the same hurtbox clamping as character dragging.
 */
export function computeGridTeleportDestination(
  position: Point,
  direction: { x: number; y: number },
  distance: number,
  stageBounds: StageBounds,
  poseData: Pose,
): Point {
  const raw = {
    x: position.x + direction.x * distance,
    y: position.y + direction.y * distance,
  };
  const [imgW, imgH] = poseData.imgSize;
  const hurtbox = poseData.hurtboxes[0] as readonly [number, number, number, number] | undefined;
  return clampToStage(raw, stageBounds, { width: imgW, height: imgH }, hurtbox);
}

interface NitroCharData {
  nitroPullSpeed: number;
  ballPullSpeed: number;
  afterCuffReleaseOffset: readonly [number, number];
}

/**
 * Simulates Nitro's cuff pull physics to find full-pull and half-pull positions.
 *
 * Full pull: only Nitro moves toward the ball (the wall-slam scenario).
 * Half pull: both Nitro and the ball move toward each other simultaneously.
 *
 * Returns null if the ball position is invalid or simulation fails to converge.
 */
export function computeNitroCuffPositions(
  characterPosition: Point,
  facing: "left" | "right",
  swingPose: Pose,
  ballPosition: Point,
  stageBounds: StageBounds,
  character: NitroCharData,
): CuffPositions | null {
  const [imgW, imgH] = swingPose.imgSize;
  const hurtbox = swingPose.hurtboxes[0] as readonly [number, number, number, number];
  const sprite = { width: imgW, height: imgH };

  const pullLeft = characterPosition.x > ballPosition.x;
  const pullDir = pullLeft ? -1 : 1;
  const afterOffset: Point = {
    x: character.afterCuffReleaseOffset[0] * pullDir,
    y: character.afterCuffReleaseOffset[1],
  };

  // --- Full pull: only Nitro moves toward ball ---
  let nitroCenter: Point = { ...characterPosition };
  let fullPullCenter: Point | null = null;

  for (let i = 0; i < 200; i++) {
    const delta = { x: ballPosition.x - nitroCenter.x, y: ballPosition.y - nitroCenter.y };
    const dist = Math.hypot(delta.x, delta.y);
    if (dist < character.nitroPullSpeed) {
      nitroCenter = { ...ballPosition };
    } else {
      nitroCenter = {
        x: nitroCenter.x + (delta.x / dist) * character.nitroPullSpeed,
        y: nitroCenter.y + (delta.y / dist) * character.nitroPullSpeed,
      };
    }
    const clamped = clampToStage(nitroCenter, stageBounds, sprite, hurtbox);
    nitroCenter = clamped;

    // Check if ball is within Nitro's hurtbox
    const hurtLeft = clamped.x - imgW / 2 + hurtbox[0];
    const hurtRight = hurtLeft + hurtbox[2];
    const hurtTop = clamped.y - imgH / 2 + hurtbox[1];
    const hurtBottom = hurtTop + hurtbox[3];

    if (
      ballPosition.x >= hurtLeft &&
      ballPosition.x <= hurtRight &&
      ballPosition.y >= hurtTop &&
      ballPosition.y <= hurtBottom
    ) {
      fullPullCenter = clamped;
      break;
    }

    // Also stop if we hit the wall (clamped position matches unclamped)
    const raw = {
      x: characterPosition.x + ((characterPosition.x > ballPosition.x ? -1 : 1) * character.nitroPullSpeed * (i + 1)),
      y: characterPosition.y,
    };
    const rawDist2 = Math.hypot(nitroCenter.x - ballPosition.x, nitroCenter.y - ballPosition.y);
    const prevDist = Math.hypot(characterPosition.x - ballPosition.x, characterPosition.y - ballPosition.y);
    if (rawDist2 >= prevDist && i > 0) break; // not converging — bail
  }

  if (!fullPullCenter) return null;

  // --- Half pull: both Nitro and ball move toward each other ---
  nitroCenter = { ...characterPosition };
  let ballCenter: Point = { ...ballPosition };
  let halfPullCenter: Point | null = null;

  for (let i = 0; i < 200; i++) {
    const delta = { x: ballCenter.x - nitroCenter.x, y: ballCenter.y - nitroCenter.y };
    const dist = Math.hypot(delta.x, delta.y);
    if (dist < 1) {
      halfPullCenter = clampToStage(nitroCenter, stageBounds, sprite, hurtbox);
      break;
    }
    const nitroDelta = { x: (delta.x / dist) * character.nitroPullSpeed, y: (delta.y / dist) * character.nitroPullSpeed };
    const ballDelta = { x: -(delta.x / dist) * character.ballPullSpeed, y: -(delta.y / dist) * character.ballPullSpeed };

    nitroCenter = clampToStage(
      { x: nitroCenter.x + nitroDelta.x, y: nitroCenter.y + nitroDelta.y },
      stageBounds, sprite, hurtbox,
    );
    ballCenter = {
      x: Math.max(stageBounds.left, Math.min(stageBounds.right, ballCenter.x + ballDelta.x)),
      y: Math.max(stageBounds.top, Math.min(stageBounds.bottom, ballCenter.y + ballDelta.y)),
    };

    const hurtLeft = nitroCenter.x - imgW / 2 + hurtbox[0];
    const hurtRight = hurtLeft + hurtbox[2];
    const hurtTop = nitroCenter.y - imgH / 2 + hurtbox[1];
    const hurtBottom = hurtTop + hurtbox[3];

    if (
      ballCenter.x >= hurtLeft &&
      ballCenter.x <= hurtRight &&
      ballCenter.y >= hurtTop &&
      ballCenter.y <= hurtBottom
    ) {
      halfPullCenter = nitroCenter;
      break;
    }
  }

  if (!halfPullCenter) return null;

  const clampBall = (p: Point): Point => ({
    x: Math.max(stageBounds.left, Math.min(stageBounds.right, p.x)),
    y: Math.max(stageBounds.top, Math.min(stageBounds.bottom, p.y)),
  });

  return {
    fullPull: fullPullCenter,
    halfPull: halfPullCenter,
    fullPullBallRelease: clampBall({ x: fullPullCenter.x + afterOffset.x, y: fullPullCenter.y + afterOffset.y }),
    halfPullBallRelease: clampBall({ x: halfPullCenter.x + afterOffset.x, y: halfPullCenter.y + afterOffset.y }),
  };
}
