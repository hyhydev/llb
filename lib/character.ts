import type { Character, Angle } from "@/data/types";

export function getValidAnglesForPose(character: Character, pose: string): Angle[] {
  return character.angles.filter((a) => a.validWhen.includes(pose));
}

export function getAvailablePoses(character: Character): string[] {
  return character.poses.map((p) => p.name);
}
