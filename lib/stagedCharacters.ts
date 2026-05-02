import { characterJSON } from "@/data/characters";

export interface StagedCharacter {
  id: string;
  characterName: keyof typeof characterJSON;
  pose: string;
  facing: "left" | "right";
  position: { x: number; y: number };
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
    },
  ];
}

export function removeCharacter(list: StagedCharacter[], id: string): StagedCharacter[] {
  return list.filter((c) => c.id !== id);
}

export function updateCharacter(
  list: StagedCharacter[],
  id: string,
  patch: Partial<Pick<StagedCharacter, "pose" | "facing" | "position">>,
): StagedCharacter[] {
  return list.map((c) => (c.id === id ? { ...c, ...patch } : c));
}
