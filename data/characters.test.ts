import { describe, it, expect } from "vitest";
import { characterJSON } from "./characters";

const CHARACTER_NAMES = [
  "Toxic", "Latch", "Raptor", "Jet", "Nitro",
  "Doombox", "Grid", "Switch", "Candyman", "Sonata",
  "Dice", "DustAndAshes",
] as const;

describe("characterJSON", () => {
  it("exports all characters", () => {
    expect(Object.keys(characterJSON)).toEqual(CHARACTER_NAMES);
  });

  it.each(CHARACTER_NAMES)("%s has required fields", (name) => {
    const char = characterJSON[name];
    expect(typeof char.color).toBe("string");
    expect(typeof char.strokeColor).toBe("string");
    expect(typeof char.img_name).toBe("string");
    expect(typeof char.baseHeight).toBe("number");
    expect(Array.isArray(char.poses)).toBe(true);
    expect(char.poses.length).toBeGreaterThan(0);
    expect(Array.isArray(char.angles)).toBe(true);
    expect(char.angles.length).toBeGreaterThan(0);
  });

  it.each(CHARACTER_NAMES)("%s poses each have name, imgSize, hurtboxes, hitboxes", (name) => {
    for (const pose of characterJSON[name].poses) {
      expect(typeof pose.name).toBe("string");
      expect(Array.isArray(pose.imgSize)).toBe(true);
      expect(pose.imgSize).toHaveLength(2);
      expect(Array.isArray(pose.hurtboxes)).toBe(true);
      expect(Array.isArray(pose.hitboxes)).toBe(true);
    }
  });

  it.each(CHARACTER_NAMES)("%s angles each have name, degrees, validWhen", (name) => {
    for (const angle of characterJSON[name].angles) {
      expect(typeof angle.name).toBe("string");
      expect(typeof angle.degrees).toBe("number");
      expect(Array.isArray(angle.validWhen)).toBe(true);
      expect(angle.validWhen.length).toBeGreaterThan(0);
    }
  });
});
