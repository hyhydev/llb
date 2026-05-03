import type { ActiveAngle, Character, Angle } from "@/data/types";

export function getValidAnglesForPose(character: Character, pose: string): Angle[] {
  return character.angles.filter((a) => a.validWhen.includes(pose));
}

export function getAvailablePoses(character: Character): string[] {
  return character.poses.map((p) => p.name);
}

/** Returns angle names valid for the given pose, with air-down/ground-down unified as "down",
 *  excluding any names already in activeAngles. Preserves characters.ts order. */
export function getPickableAngles(character: Character, pose: string, activeAngles: ActiveAngle[]): string[] {
  const active = new Set(activeAngles.map((a) => a.name));
  const seen = new Set<string>();
  const result: string[] = [];
  for (const a of character.angles) {
    if (!a.validWhen.includes(pose)) continue;
    const name = a.name === "air-down" || a.name === "ground-down" ? "down" : a.name;
    if (seen.has(name)) continue;
    seen.add(name);
    if (!active.has(name)) result.push(name);
  }
  return result;
}
