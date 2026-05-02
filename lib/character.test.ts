import { describe, it, expect } from "vitest";
import { characterJSON } from "@/data/characters";
import { getValidAnglesForPose, getAvailablePoses } from "./character";

describe("getValidAnglesForPose", () => {
  it("returns angles whose validWhen includes the given pose", () => {
    const toxic = characterJSON["Toxic"];
    const angles = getValidAnglesForPose(toxic, "swing");
    expect(angles.every((a) => a.validWhen.includes("swing"))).toBe(true);
    expect(angles.length).toBeGreaterThan(0);
  });

  it("excludes angles not valid for the given pose", () => {
    const toxic = characterJSON["Toxic"];
    const angles = getValidAnglesForPose(toxic, "swing");
    expect(angles.some((a) => a.validWhen.includes("smash") && !a.validWhen.includes("swing"))).toBe(false);
  });

  it("returns empty array when no angles match the pose", () => {
    const toxic = characterJSON["Toxic"];
    const angles = getValidAnglesForPose(toxic, "nonexistent-pose");
    expect(angles).toHaveLength(0);
  });
});

describe("getAvailablePoses", () => {
  it("returns all pose names for a character", () => {
    const toxic = characterJSON["Toxic"];
    const poses = getAvailablePoses(toxic);
    expect(poses).toContain("swing");
    expect(poses).toContain("smash");
    expect(poses).toContain("spike");
  });

  it("returns no duplicates", () => {
    const toxic = characterJSON["Toxic"];
    const poses = getAvailablePoses(toxic);
    expect(poses).toEqual([...new Set(poses)]);
  });

  it("works for every character", () => {
    for (const char of Object.values(characterJSON)) {
      const poses = getAvailablePoses(char);
      expect(poses.length).toBeGreaterThan(0);
    }
  });
});
