import type { Stage } from "./types";

export const stageJSON = {
  "Outskirts": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33],
    imageSize: [1325, 745]
  },
  "Stadium": {
    canvasSize: [1230, 540],
    canvasOffset: [48, 4],
    imageSize: [1325, 745]
  },
  "Desert": {
    canvasSize: [1130, 510],
    canvasOffset: [98, 33],
    imageSize: [1325, 745]
  },
  "Elevator": {
    canvasSize: [1492, 522],
    canvasOffset: [0, 92],
    imageSize: [1492, 826]
  },
  "Factory": {
    canvasSize: [1400, 542],
    canvasOffset: [21, 58],
    imageSize: [1441, 810]
  },
  "Streets": {
    canvasSize: [1320, 515],
    canvasOffset: [3, 29],
    imageSize: [1326, 746]
  },
  "Sewer": {
    canvasSize: [1240, 510],
    canvasOffset: [43, 33],
    imageSize: [1325, 745]
  },
  "Pool": {
    canvasSize: [1210, 575],
    canvasOffset: [58, 0],
    imageSize: [1326, 790]
  },
  "Subway": {
    canvasSize: [1050, 510],
    canvasOffset: [138, 33],
    imageSize: [1325, 745]
  },
  "Room": {
    canvasSize: [1100, 550],
    canvasOffset: [113, 20],
    imageSize: [1326, 746]
  }
} as const satisfies Record<string, Stage>;
