import { characterJSON } from "@/data/characters";
import type { Box } from "@/data/types";

function hitboxUnionCentroid(hitboxes: Box[]): { x: number; y: number } | null {
  if (hitboxes.length === 0) return null;
  const minX = Math.min(...hitboxes.map(([x]) => x));
  const maxX = Math.max(...hitboxes.map(([x, , w]) => x + w));
  const minY = Math.min(...hitboxes.map(([, y]) => y));
  const maxY = Math.max(...hitboxes.map(([, y, , h]) => y + h));
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

export interface StagedCharacter {
  id: string;
  characterName: keyof typeof characterJSON;
  pose: string;
  facing: "left" | "right";
  position: { x: number; y: number };
  role: "attacker" | "defender";
  ballPosition: { x: number; y: number } | null;
}

let _nextId = 0;
function nextId(): string {
  return String(++_nextId);
}

export function addCharacter(
  list: StagedCharacter[],
  characterName: keyof typeof characterJSON,
  position: { x: number; y: number },
): StagedCharacter[] {
  const character = characterJSON[characterName];
  return [
    ...list,
    {
      id: nextId(),
      characterName,
      pose: character.poses[0].name,
      facing: "right",
      position,
      role: "attacker",
      ballPosition: hitboxUnionCentroid(character.poses[0].hitboxes),
    },
  ];
}

export function removeCharacter(list: StagedCharacter[], id: string): StagedCharacter[] {
  return list.filter((c) => c.id !== id);
}

export function updateCharacter(
  list: StagedCharacter[],
  id: string,
  patch: Partial<Pick<StagedCharacter, "pose" | "facing" | "position" | "role" | "ballPosition">>,
): StagedCharacter[] {
  return list.map((c) => {
    if (c.id !== id) return c;
    const updated = { ...c, ...patch };
    if ("pose" in patch && patch.pose !== undefined) {
      const character = characterJSON[c.characterName];
      const newPose = character.poses.find((p) => p.name === patch.pose);
      updated.ballPosition = newPose ? hitboxUnionCentroid(newPose.hitboxes) : null;
    } else if ("role" in patch) {
      if (patch.role === "defender") {
        updated.ballPosition = null;
      } else if (patch.role === "attacker") {
        const character = characterJSON[c.characterName];
        const currentPose = character.poses.find((p) => p.name === updated.pose);
        updated.ballPosition = currentPose ? hitboxUnionCentroid(currentPose.hitboxes) : null;
      }
    }
    return updated;
  });
}
