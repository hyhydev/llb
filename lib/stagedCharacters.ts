import { characterJSON } from "@/data/characters";
import type { ActiveAngle, Box, Character } from "@/data/types";
import { MAX_REFLECTIONS_DEFAULT } from "./constants";

function hitboxUnionCentroid(hitboxes: Box[]): { x: number; y: number } | null {
  if (hitboxes.length === 0) return null;
  const minX = Math.min(...hitboxes.map(([x]) => x));
  const maxX = Math.max(...hitboxes.map(([x, , w]) => x + w));
  const minY = Math.min(...hitboxes.map(([, y]) => y));
  const maxY = Math.max(...hitboxes.map(([, y, , h]) => y + h));
  return { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
}

function characterData(name: keyof typeof characterJSON): Character {
  return characterJSON[name] as unknown as Character;
}

function isAngleValidForPose(character: Character, angleName: string, poseName: string): boolean {
  if (angleName === "down") {
    return character.angles.some(
      (a) => (a.name === "air-down" || a.name === "ground-down") && a.validWhen.includes(poseName),
    );
  }
  return character.angles.some((a) => a.name === angleName && a.validWhen.includes(poseName));
}

function getMaxReflectionsForAngle(character: Character, angleName: string): number {
  if (angleName === "down") {
    const variant =
      character.angles.find((a) => a.name === "air-down") ??
      character.angles.find((a) => a.name === "ground-down");
    return variant?.maxReflections ?? MAX_REFLECTIONS_DEFAULT;
  }
  const angle = character.angles.find((a) => a.name === angleName);
  return angle?.maxReflections ?? MAX_REFLECTIONS_DEFAULT;
}

export interface GridTeleport {
  direction: { x: number; y: number };
  spike: boolean;
}

export interface SpecialState {
  jetBubble?: boolean;
  sonataStep?: 1 | 2 | 3;
  gridTeleports?: GridTeleport[];
  reticlePosition?: { x: number; y: number } | null;
  sprayPosition?: { x: number; y: number } | null;
  ashesLeft?: boolean;
  ashesRight?: boolean;
  cuffEnabled?: boolean;
  cuffHalfPull?: boolean;
  cuffFullPull?: boolean;
  candySpecial?: boolean;
}

export interface StagedCharacter {
  id: string;
  characterName: keyof typeof characterJSON;
  pose: string;
  facing: "left" | "right";
  position: { x: number; y: number };
  role: "attacker" | "defender";
  ballPosition: { x: number; y: number } | null;
  special: SpecialState;
  activeAngles: ActiveAngle[];
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
  const character = characterData(characterName);
  return [
    ...list,
    {
      id: nextId(),
      characterName,
      pose: character.poses[0].name,
      facing: "right",
      position,
      role: "attacker",
      ballPosition: hitboxUnionCentroid(character.poses[0].hitboxes as Box[]),
      special: {},
      activeAngles: [],
    },
  ];
}

export function removeCharacter(list: StagedCharacter[], id: string): StagedCharacter[] {
  return list.filter((c) => c.id !== id);
}

export function addAngleToCharacter(
  list: StagedCharacter[],
  id: string,
  angleName: string,
): StagedCharacter[] {
  return list.map((c) => {
    if (c.id !== id) return c;
    if (c.activeAngles.some((a) => a.name === angleName)) return c;
    return { ...c, activeAngles: [...c.activeAngles, { name: angleName, reflectionCount: 1 }] };
  });
}

export function removeAngleFromCharacter(
  list: StagedCharacter[],
  id: string,
  angleName: string,
): StagedCharacter[] {
  return list.map((c) => {
    if (c.id !== id) return c;
    return { ...c, activeAngles: c.activeAngles.filter((a) => a.name !== angleName) };
  });
}

export function updateAngleCount(
  list: StagedCharacter[],
  id: string,
  angleName: string,
  count: number,
): StagedCharacter[] {
  return list.map((c) => {
    if (c.id !== id) return c;
    const character = characterData(c.characterName);
    const max = getMaxReflectionsForAngle(character, angleName);
    const clamped = Math.max(1, Math.min(count, max));
    return {
      ...c,
      activeAngles: c.activeAngles.map((a) =>
        a.name === angleName ? { ...a, reflectionCount: clamped } : a,
      ),
    };
  });
}

type CharacterPatch = Partial<Pick<StagedCharacter, "pose" | "facing" | "position" | "role" | "ballPosition">> & {
  special?: Partial<SpecialState>;
};

export function updateCharacter(
  list: StagedCharacter[],
  id: string,
  patch: CharacterPatch,
): StagedCharacter[] {
  return list.map((c) => {
    if (c.id !== id) return c;
    const updated: StagedCharacter = { ...c, ...patch, special: { ...c.special, ...patch.special } };
    if ("pose" in patch && patch.pose !== undefined) {
      const character = characterData(c.characterName);
      const newPose = character.poses.find((p) => p.name === patch.pose);
      updated.ballPosition = newPose ? hitboxUnionCentroid(newPose.hitboxes as Box[]) : null;
      updated.activeAngles = c.activeAngles.filter((a) =>
        isAngleValidForPose(character, a.name, patch.pose!),
      );
    } else if ("role" in patch) {
      if (patch.role === "defender") {
        updated.ballPosition = null;
      } else if (patch.role === "attacker") {
        const character = characterData(c.characterName);
        const currentPose = character.poses.find((p) => p.name === updated.pose);
        updated.ballPosition = currentPose ? hitboxUnionCentroid(currentPose.hitboxes as Box[]) : null;
      }
    }
    return updated;
  });
}
