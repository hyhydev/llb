"use client";

import { characterJSON } from "@/data/characters";
import { stageJSON } from "@/data/stages";
import { getAvailablePoses } from "@/lib/character";
import type { StagedCharacter } from "@/lib/stagedCharacters";

const CHARACTER_NAMES = Object.keys(characterJSON) as (keyof typeof characterJSON)[];
const STAGE_NAMES = Object.keys(stageJSON) as (keyof typeof stageJSON)[];

interface Props {
  stageName: keyof typeof stageJSON;
  stagedCharacters: StagedCharacter[];
  onStageChange: (name: keyof typeof stageJSON) => void;
  onAdd: (characterName: keyof typeof characterJSON) => void;
  onRemove: (id: string) => void;
  onPoseChange: (id: string, pose: string) => void;
  onToggleFacing: (id: string) => void;
}

export function CharacterPanel({
  stageName,
  stagedCharacters,
  onStageChange,
  onAdd,
  onRemove,
  onPoseChange,
  onToggleFacing,
}: Props) {
  return (
    <div className="flex flex-col gap-4 p-4 w-64 bg-zinc-800 text-zinc-100 overflow-y-auto h-full text-sm">
      <section>
        <label className="block text-xs text-zinc-400 mb-1 uppercase tracking-wide">Stage</label>
        <select
          value={stageName}
          onChange={(e) => onStageChange(e.target.value as keyof typeof stageJSON)}
          className="w-full bg-zinc-700 rounded px-2 py-1 text-zinc-100"
        >
          {STAGE_NAMES.map((name) => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </section>

      <section>
        <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wide">Characters</p>
        <div className="flex flex-col gap-1">
          {CHARACTER_NAMES.map((name) => {
            const character = characterJSON[name];
            return (
              <button
                key={name}
                onClick={() => onAdd(name)}
                className="flex items-center gap-2 px-2 py-1 rounded bg-zinc-700 hover:bg-zinc-600 text-left"
              >
                <span
                  className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: character.color }}
                />
                <span>{name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {stagedCharacters.length > 0 && (
        <section>
          <p className="text-xs text-zinc-400 mb-2 uppercase tracking-wide">On Stage</p>
          <div className="flex flex-col gap-2">
            {stagedCharacters.map((sc) => {
              const character = characterJSON[sc.characterName];
              const poses = getAvailablePoses(character);
              return (
                <div key={sc.id} className="bg-zinc-700 rounded p-2 flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-sm"
                        style={{ backgroundColor: character.color }}
                      />
                      {sc.characterName}
                    </span>
                    <button
                      onClick={() => onRemove(sc.id)}
                      className="text-zinc-400 hover:text-red-400 text-xs px-1"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex gap-1">
                    <select
                      value={sc.pose}
                      onChange={(e) => onPoseChange(sc.id, e.target.value)}
                      className="flex-1 bg-zinc-600 rounded px-1 py-0.5 text-zinc-100 text-xs"
                    >
                      {poses.map((pose) => (
                        <option key={pose} value={pose}>{pose}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => onToggleFacing(sc.id)}
                      className="bg-zinc-600 hover:bg-zinc-500 rounded px-2 py-0.5 text-xs"
                      title="Toggle facing"
                    >
                      {sc.facing === "right" ? "→" : "←"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
