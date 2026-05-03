import { describe, it, expect } from "vitest";
import {
  addCharacter,
  removeCharacter,
  updateCharacter,
  type StagedCharacter,
  type SpecialState,
} from "./stagedCharacters";

const defaultPos = { x: 0, y: 0 };

describe("addCharacter", () => {
  it("adds a character to an empty list", () => {
    const result = addCharacter([], "Toxic", defaultPos);
    expect(result).toHaveLength(1);
    expect(result[0].characterName).toBe("Toxic");
  });

  it("new character has default facing right and first available pose", () => {
    const result = addCharacter([], "Toxic", defaultPos);
    expect(result[0].facing).toBe("right");
    expect(result[0].pose).toBe("swing");
  });

  it("assigns a unique id per character added", () => {
    const first = addCharacter([], "Toxic", defaultPos);
    const second = addCharacter(first, "Latch", defaultPos);
    expect(first[0].id).not.toBe(second[1].id);
  });

  it("allows the same character to be added more than once", () => {
    const first = addCharacter([], "Toxic", defaultPos);
    const second = addCharacter(first, "Toxic", defaultPos);
    expect(second).toHaveLength(2);
    expect(second[0].id).not.toBe(second[1].id);
  });
});

describe("role and ballPosition", () => {
  it("new character defaults to role attacker", () => {
    const result = addCharacter([], "Toxic", defaultPos);
    expect(result[0].role).toBe("attacker");
  });

  it("new attacker has ballPosition at hitbox union centroid", () => {
    const result = addCharacter([], "Toxic", defaultPos);
    // Toxic swing: hitbox [85, 14, 124, 138] → centroid {x: 147, y: 83}
    expect(result[0].ballPosition).toEqual({ x: 147, y: 83 });
  });

  it("pose change resets ballPosition to centroid of new pose's hitboxes", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { pose: "smash" });
    // Toxic smash: hitboxes [34,24,110,100] and [89,93,110,138]
    // union: minX=34, maxX=199, minY=24, maxY=231 → centroid {x: 116.5, y: 127.5}
    expect(result[0].ballPosition).toEqual({ x: 116.5, y: 127.5 });
  });

  it("pose change to pose with no hitboxes sets ballPosition null", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { pose: "halfcrouch" });
    expect(result[0].ballPosition).toBeNull();
  });

  it("switching role to defender clears ballPosition", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { role: "defender" });
    expect(result[0].role).toBe("defender");
    expect(result[0].ballPosition).toBeNull();
  });

  it("switching role to attacker resets ballPosition to hitbox centroid", () => {
    let list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    list = updateCharacter(list, id, { role: "defender" });
    const result = updateCharacter(list, id, { role: "attacker" });
    expect(result[0].role).toBe("attacker");
    // Toxic swing centroid
    expect(result[0].ballPosition).toEqual({ x: 147, y: 83 });
  });
});

describe("removeCharacter", () => {
  it("removes the character with the given id", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = removeCharacter(list, id);
    expect(result).toHaveLength(0);
  });

  it("leaves other characters untouched", () => {
    let list = addCharacter([], "Toxic", defaultPos);
    list = addCharacter(list, "Latch", defaultPos);
    const idToRemove = list[0].id;
    const result = removeCharacter(list, idToRemove);
    expect(result).toHaveLength(1);
    expect(result[0].characterName).toBe("Latch");
  });
});

describe("updateCharacter", () => {
  it("updates pose for a character", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { pose: "smash" });
    expect(result[0].pose).toBe("smash");
  });

  it("updates facing for a character", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { facing: "left" });
    expect(result[0].facing).toBe("left");
  });

  it("updates position for a character", () => {
    const list = addCharacter([], "Toxic", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { position: { x: 100, y: 200 } });
    expect(result[0].position).toEqual({ x: 100, y: 200 });
  });

  it("does not mutate other characters", () => {
    let list = addCharacter([], "Toxic", defaultPos);
    list = addCharacter(list, "Latch", defaultPos);
    const result = updateCharacter(list, list[0].id, { pose: "smash" });
    expect(result[1].pose).toBe("swing");
  });
});

describe("special state", () => {
  it("addCharacter initialises special as empty object", () => {
    const result = addCharacter([], "Jet", defaultPos);
    expect(result[0].special).toEqual({});
  });

  it("updateCharacter sets a special field", () => {
    const list = addCharacter([], "Jet", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { special: { jetBubble: true } });
    expect(result[0].special.jetBubble).toBe(true);
  });

  it("updateCharacter merges special state rather than replacing", () => {
    let list = addCharacter([], "Jet", defaultPos);
    const id = list[0].id;
    list = updateCharacter(list, id, { special: { jetBubble: true } });
    const result = updateCharacter(list, id, { special: { candySpecial: true } });
    expect(result[0].special.jetBubble).toBe(true);
    expect(result[0].special.candySpecial).toBe(true);
  });

  it("updateCharacter can clear a special field by setting it to undefined", () => {
    let list = addCharacter([], "Jet", defaultPos);
    const id = list[0].id;
    list = updateCharacter(list, id, { special: { jetBubble: true } });
    const result = updateCharacter(list, id, { special: { jetBubble: undefined } });
    expect(result[0].special.jetBubble).toBeUndefined();
  });

  it("updateCharacter special patch does not affect other characters", () => {
    let list = addCharacter([], "Jet", defaultPos);
    list = addCharacter(list, "Nitro", defaultPos);
    const result = updateCharacter(list, list[0].id, { special: { jetBubble: true } });
    expect(result[1].special).toEqual({});
  });

  it("updateCharacter sets gridTeleports array", () => {
    const list = addCharacter([], "Grid", defaultPos);
    const id = list[0].id;
    const teleports = [{ direction: { x: 1, y: 0 }, spike: false }];
    const result = updateCharacter(list, id, { special: { gridTeleports: teleports } });
    expect(result[0].special.gridTeleports).toEqual(teleports);
  });

  it("updateCharacter sets sonataStep", () => {
    const list = addCharacter([], "Sonata", defaultPos);
    const id = list[0].id;
    const result = updateCharacter(list, id, { special: { sonataStep: 2 } });
    expect(result[0].special.sonataStep).toBe(2);
  });
});
