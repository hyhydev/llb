import { describe, it, expect } from "vitest";
import { characterJSON } from "@/data/characters";
import { getValidAnglesForPose, getAvailablePoses, getPickableAngles } from "./character";

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

describe("getPickableAngles", () => {
  it("returns angle names valid for the pose", () => {
    const toxic = characterJSON["Toxic"];
    const pickable = getPickableAngles(toxic, "swing", []);
    expect(pickable).toContain("up");
  });

  it("unifies air-down and ground-down as 'down'", () => {
    const toxic = characterJSON["Toxic"];
    const pickable = getPickableAngles(toxic, "swing", []);
    expect(pickable).toContain("down");
    expect(pickable).not.toContain("air-down");
    expect(pickable).not.toContain("ground-down");
  });

  it("excludes already-active angles", () => {
    const toxic = characterJSON["Toxic"];
    const pickable = getPickableAngles(toxic, "swing", [{ name: "up", reflectionCount: 1 }]);
    expect(pickable).not.toContain("up");
  });

  it("excludes already-active 'down' when unified", () => {
    const toxic = characterJSON["Toxic"];
    const pickable = getPickableAngles(toxic, "swing", [{ name: "down", reflectionCount: 1 }]);
    expect(pickable).not.toContain("down");
  });

  it("returns empty array when no angles are valid for the pose", () => {
    const toxic = characterJSON["Toxic"];
    expect(getPickableAngles(toxic, "halfcrouch", [])).toEqual([]);
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
