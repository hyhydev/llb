"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { CharacterPanel } from "@/components/CharacterPanel";
import { characterJSON } from "@/data/characters";
import { stageJSON } from "@/data/stages";
import {
  addCharacter,
  removeCharacter,
  updateCharacter,
  type StagedCharacter,
  type SpecialState,
} from "@/lib/stagedCharacters";

const Stage = dynamic(() => import("@/components/Stage").then((m) => ({ default: m.Stage })), {
  ssr: false,
});

const DEFAULT_CENTER = { x: 662, y: 372 };

export default function Home() {
  const [stageName, setStageName] = useState<keyof typeof stageJSON>("Outskirts");
  const [stagedCharacters, setStagedCharacters] = useState<StagedCharacter[]>([]);

  function handleAdd(characterName: keyof typeof characterJSON) {
    setStagedCharacters((prev) => addCharacter(prev, characterName, DEFAULT_CENTER));
  }

  function handleRemove(id: string) {
    setStagedCharacters((prev) => removeCharacter(prev, id));
  }

  function handlePoseChange(id: string, pose: string) {
    setStagedCharacters((prev) => updateCharacter(prev, id, { pose }));
  }

  function handleToggleFacing(id: string) {
    setStagedCharacters((prev) => {
      const sc = prev.find((c) => c.id === id);
      if (!sc) return prev;
      return updateCharacter(prev, id, { facing: sc.facing === "right" ? "left" : "right" });
    });
  }

  function handleMoveCharacter(id: string, position: { x: number; y: number }) {
    setStagedCharacters((prev) => updateCharacter(prev, id, { position }));
  }

  function handleToggleRole(id: string) {
    setStagedCharacters((prev) => {
      const sc = prev.find((c) => c.id === id);
      if (!sc) return prev;
      return updateCharacter(prev, id, { role: sc.role === "attacker" ? "defender" : "attacker" });
    });
  }

  function handleMoveBall(id: string, ballPosition: { x: number; y: number }) {
    setStagedCharacters((prev) => updateCharacter(prev, id, { ballPosition }));
  }

  function handleSpecialChange(id: string, patch: Partial<SpecialState>) {
    setStagedCharacters((prev) => updateCharacter(prev, id, { special: patch }));
  }

  return (
    <div className="flex h-screen bg-zinc-900 overflow-hidden">
      <CharacterPanel
        stageName={stageName}
        stagedCharacters={stagedCharacters}
        onStageChange={setStageName}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onPoseChange={handlePoseChange}
        onToggleFacing={handleToggleFacing}
        onToggleRole={handleToggleRole}
        onSpecialChange={handleSpecialChange}
      />
      <main className="flex-1 min-w-0 flex items-center justify-center overflow-auto p-4">
        <Stage
          stageName={stageName}
          stagedCharacters={stagedCharacters}
          onMoveCharacter={handleMoveCharacter}
          onMoveBall={handleMoveBall}
          onSpecialPositionChange={handleSpecialChange}
        />
      </main>
    </div>
  );
}
