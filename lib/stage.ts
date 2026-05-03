export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Bounds {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export function stageBoundsFrom(stage: {
  canvasSize: [number, number];
  canvasOffset: [number, number];
}): Bounds {
  const [w, h] = stage.canvasSize;
  const [ox, oy] = stage.canvasOffset;
  return { left: ox, top: oy, right: ox + w, bottom: oy + h };
}

/**
 * Clamps a character's center position so its hurtbox stays within the playable stage bounds.
 * Without a hurtbox the full sprite dimensions are used as the boundary.
 * With a hurtbox [x, y, w, h] (in sprite-local coords), only the hurtbox is constrained —
 * hitboxes and sprite overhang are free to extend outside the stage.
 */
export function clampToStage(
  pos: Point,
  bounds: Bounds,
  sprite: Size,
  hurtbox?: readonly [number, number, number, number],
): Point {
  const halfW = sprite.width / 2;
  const halfH = sprite.height / 2;

  const hurtL = hurtbox?.[0] ?? 0;
  const hurtR = hurtbox ? hurtbox[0] + hurtbox[2] : sprite.width;
  const hurtBottom = hurtbox ? hurtbox[1] + hurtbox[3] : sprite.height;
  const feetFromCenter = hurtBottom - halfH;

  return {
    x: Math.max(bounds.left + halfW - hurtL, Math.min(bounds.right + halfW - hurtR, pos.x)),
    y: Math.max(bounds.top + halfH, Math.min(bounds.bottom - feetFromCenter, pos.y)),
  };
}
