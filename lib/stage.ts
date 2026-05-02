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
 * Clamps a character's center position so the sprite stays within the playable stage bounds.
 * groundAnchorY: y-position of the character's feet within the sprite (from top).
 * Defaults to the sprite bottom so callers without hurtbox data get the old behaviour.
 */
export function clampToStage(
  pos: Point,
  bounds: Bounds,
  character: Size,
  groundAnchorY: number = character.height,
): Point {
  const halfW = character.width / 2;
  const halfH = character.height / 2;
  const feetFromCenter = groundAnchorY - halfH;
  return {
    x: Math.max(bounds.left + halfW, Math.min(bounds.right - halfW, pos.x)),
    y: Math.max(bounds.top + halfH, Math.min(bounds.bottom - feetFromCenter, pos.y)),
  };
}
