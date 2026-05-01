import type { Stage } from "./types";

export const stageJSON = {
  "Outskirts": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33]
  },
  "Stadium": {
    canvasSize: [1230, 540],
    canvasOffset: [48, 4]
  },
  "Desert": {
    canvasSize: [1130, 510],
    canvasOffset: [98, 33]
  },
  "Elevator": {
    canvasSize: [1492, 522],
    canvasOffset: [0, 92]
  },
  "Factory": {
    canvasSize: [1400, 542],
    canvasOffset: [21, 58]
  },
  "Streets": {
    canvasSize: [1320, 515],
    canvasOffset: [3, 29]
  },
  "Sewer": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33]
  },
  "Pool": {
    canvasSize: [1210, 575],
    canvasOffset: [58, 0]
  },
  "Subway": {
    canvasSize: [1050, 510],
    canvasOffset: [138, 33]
  },
  "Room": {
    canvasSize: [1100, 550],
    canvasOffset: [113, 20]
  }
} as const satisfies Record<string, Stage>;
