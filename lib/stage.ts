export interface Point {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

/**
 * Clamps a character's center position so the sprite stays within the stage.
 */
export function clampToStage(pos: Point, stage: Size, character: Size): Point {
  const halfW = character.width / 2;
  const halfH = character.height / 2;
  return {
    x: Math.max(halfW, Math.min(stage.width - halfW, pos.x)),
    y: Math.max(halfH, Math.min(stage.height - halfH, pos.y)),
  };
}
