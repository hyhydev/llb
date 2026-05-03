/** [x, y, width, height] */
export type Box = [number, number, number, number];

export interface ActiveAngle {
  name: string;
  reflectionCount: number;
}

export interface Hitbox {
  /** [x, y, width, height] */
  box: Box;
}

export interface Hurtbox {
  /** [x, y, width, height] */
  box: Box;
}

export interface TeleportAngle {
  name: string;
  degrees: number;
  maxReflections?: number;
  customOffset?: number;
}

export interface CustomTeleportPose {
  name: string;
  imgSize: [number, number];
  hurtboxes: Box[];
  hitboxes: Box[];
  teleportRelease: [number, number];
  teleportAngle: TeleportAngle;
}

export interface Pose {
  name: string;
  imgSize: [number, number];
  hurtboxes: Box[];
  hitboxes: Box[];
  canMirror?: boolean;
  fixedRelease?: [number, number];
  grounded?: boolean;
  groundOffset?: number;
  wall?: boolean;
  circle?: boolean;
  /** Grid-specific: teleport release point */
  teleportRelease?: [number, number];
  /** Grid-specific: teleport angle config */
  teleportAngle?: TeleportAngle;
  /** Grid-specific: custom teleport pose overlay */
  customTeleportPose?: CustomTeleportPose;
  /** DustAndAshes-specific: release offset for Ashes */
  ashesRelease?: [number, number];
}

export interface Angle {
  name: string;
  degrees: number;
  validWhen: string[];
  mirror?: boolean;
  customOffset?: number;
  maxReflections?: number;
  /** Nitro-specific */
  onlyCuff?: boolean;
  isCuffable?: boolean;
  /** Sonata/DustAndAshes special */
  maxDistance?: number;
  validForStep?: number[];
  /** Bunt gravity arc */
  bunt?: boolean;
  gravity?: number;
  maxGravity?: number;
  buntStep?: number;
  /** Dice pong spin */
  pong?: boolean;
  initialSpeed?: number;
  pongStep?: number;
  turnRate?: number;
  pongFollowup?: boolean;
  pongWallFollowup?: boolean;
  hidden?: boolean;
  onlyWhenReticleIsActive?: boolean;
}

export interface AshesSpecial {
  enabled: boolean;
  direction: -1 | 1;
}

export interface Character {
  color: string;
  strokeColor: string;
  img_name: string;
  baseHeight: number;
  poses: Pose[];
  angles: Angle[];
  // Optional character-specific fields
  cuffStrokeColor?: string;
  cuffReleaseOffset?: [number, number];
  cuffSpikeReleaseOffset?: [number, number];
  afterCuffReleaseOffset?: [number, number];
  nitroPullSpeed?: number;
  ballPullSpeed?: number;
  specialAngle?: number;
  teleportDistance?: number;
  maxTeleports?: number;
  teleport?: unknown[];
  candyballStrokeColor?: string;
  sonataSpecialStrokeColor?: string;
  specialButtonsCustomOffset?: number;
  sonataSpecialSteps?: unknown[];
  specialAngles?: Angle[];
  maxBubbleDistance?: number;
  minBubbleOutDistance?: number;
  maxBubbleOutDistance?: number;
  bubbleMinHeight?: number;
  bubbleStrokeColor?: string;
  bubbleOutMinStrokeColor?: string;
  bubbleOutMaxStrokeColor?: string;
  ashesSpecial?: AshesSpecial[];
  ashesPoses?: Pose[];
  specialPongFloorAngles?: Angle[];
  specialPongAngles?: Angle[];
  angleOptionsOutOfCuff?: Angle[];
}

export interface Stage {
  canvasSize: [number, number];
  canvasOffset: [number, number];
  imageSize: [number, number];
}
