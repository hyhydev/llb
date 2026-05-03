"use client";

import { characterJSON } from "@/data/characters";
import { stageJSON } from "@/data/stages";
import { getAvailablePoses } from "@/lib/character";
import type { StagedCharacter } from "@/lib/stagedCharacters";

const CHARACTER_NAMES = Object.keys(characterJSON) as (keyof typeof characterJSON)[];
const STAGE_NAMES = Object.keys(stageJSON) as (keyof typeof stageJSON)[];

import type { SpecialState } from "@/lib/stagedCharacters";

interface Props {
  stageName: keyof typeof stageJSON;
  stagedCharacters: StagedCharacter[];
  onStageChange: (name: keyof typeof stageJSON) => void;
  onAdd: (characterName: keyof typeof characterJSON) => void;
  onRemove: (id: string) => void;
  onPoseChange: (id: string, pose: string) => void;
  onToggleFacing: (id: string) => void;
  onToggleRole: (id: string) => void;
  onSpecialChange: (id: string, patch: Partial<SpecialState>) => void;
}

export function CharacterPanel({
  stageName,
  stagedCharacters,
  onStageChange,
  onAdd,
  onRemove,
  onPoseChange,
  onToggleFacing,
  onToggleRole,
  onSpecialChange,
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
                  <button
                    onClick={() => onToggleRole(sc.id)}
                    className={`w-full rounded px-2 py-0.5 text-xs font-medium ${
                      sc.role === "attacker"
                        ? "bg-red-700 hover:bg-red-600 text-white"
                        : "bg-blue-700 hover:bg-blue-600 text-white"
                    }`}
                  >
                    {sc.role === "attacker" ? "attacker" : "defender"}
                  </button>
                  <SpecialControls sc={sc} onSpecialChange={onSpecialChange} />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

// ── Per-character special controls ──────────────────────────────────────────

function Btn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-1.5 py-0.5 text-xs ${active ? "bg-violet-600 text-white" : "bg-zinc-600 hover:bg-zinc-500 text-zinc-200"}`}
    >
      {children}
    </button>
  );
}

function SpecialControls({
  sc,
  onSpecialChange,
}: {
  sc: StagedCharacter;
  onSpecialChange: (id: string, patch: Partial<SpecialState>) => void;
}) {
  const { special } = sc;
  const patch = (p: Partial<SpecialState>) => onSpecialChange(sc.id, p);

  if (sc.characterName === "Jet") {
    return (
      <div className="flex gap-1 flex-wrap">
        <Btn active={!!special.jetBubble} onClick={() => patch({ jetBubble: !special.jetBubble })}>
          bubble
        </Btn>
      </div>
    );
  }

  if (sc.characterName === "DustAndAshes") {
    return (
      <div className="flex gap-1 flex-wrap">
        <Btn active={!!special.ashesLeft} onClick={() => patch({ ashesLeft: !special.ashesLeft })}>
          ashes ←
        </Btn>
        <Btn active={!!special.ashesRight} onClick={() => patch({ ashesRight: !special.ashesRight })}>
          ashes →
        </Btn>
      </div>
    );
  }

  if (sc.characterName === "Doombox") {
    const hasReticle = special.reticlePosition != null;
    return (
      <div className="flex gap-1 flex-wrap">
        <Btn
          active={hasReticle}
          onClick={() => patch({ reticlePosition: hasReticle ? null : { x: sc.position.x + 200, y: sc.position.y } })}
        >
          reticle
        </Btn>
      </div>
    );
  }

  if (sc.characterName === "Grid") {
    const teleports = special.gridTeleports ?? [];
    const grid = characterJSON["Grid"];
    const maxT = grid.maxTeleports ?? 2;
    return (
      <div className="flex flex-col gap-1">
        {teleports.length < maxT && (
          <div className="flex gap-1 flex-wrap">
            <span className="text-zinc-400 text-xs self-center">teleport:</span>
            {[
              { label: "→", dir: { x: 1, y: 0 } },
              { label: "←", dir: { x: -1, y: 0 } },
              { label: "↑", dir: { x: 0, y: -1 } },
            ].map(({ label, dir }) => (
              <Btn key={label} active={false} onClick={() => patch({ gridTeleports: [...teleports, { direction: dir, spike: false }] })}>
                {label}
              </Btn>
            ))}
          </div>
        )}
        {teleports.length > 0 && (
          <div className="flex gap-1">
            <span className="text-zinc-400 text-xs self-center">step {teleports.length}:</span>
            <Btn
              active={teleports[teleports.length - 1].spike}
              onClick={() => {
                const next = [...teleports];
                next[next.length - 1] = { ...next[next.length - 1], spike: !next[next.length - 1].spike };
                patch({ gridTeleports: next });
              }}
            >
              spike
            </Btn>
            <Btn active={false} onClick={() => patch({ gridTeleports: teleports.slice(0, -1) })}>
              undo
            </Btn>
          </div>
        )}
      </div>
    );
  }

  if (sc.characterName === "Sonata") {
    return (
      <div className="flex gap-1 flex-wrap items-center">
        <span className="text-zinc-400 text-xs">step:</span>
        {([1, 2, 3] as const).map((s) => (
          <Btn
            key={s}
            active={special.sonataStep === s}
            onClick={() => patch({ sonataStep: special.sonataStep === s ? undefined : s })}
          >
            {s}
          </Btn>
        ))}
      </div>
    );
  }

  if (sc.characterName === "Candyman") {
    return (
      <div className="flex gap-1 flex-wrap">
        <Btn active={!!special.candySpecial} onClick={() => patch({ candySpecial: !special.candySpecial })}>
          candy ball
        </Btn>
      </div>
    );
  }

  if (sc.characterName === "Nitro") {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex gap-1 flex-wrap">
          <Btn active={!!special.cuffEnabled} onClick={() => patch({ cuffEnabled: !special.cuffEnabled, cuffFullPull: true, cuffHalfPull: false })}>
            cuff
          </Btn>
        </div>
        {special.cuffEnabled && (
          <div className="flex gap-1 flex-wrap">
            <Btn active={!!special.cuffFullPull} onClick={() => patch({ cuffFullPull: !special.cuffFullPull })}>
              full pull
            </Btn>
            <Btn active={!!special.cuffHalfPull} onClick={() => patch({ cuffHalfPull: !special.cuffHalfPull })}>
              half pull
            </Btn>
          </div>
        )}
      </div>
    );
  }

  if (sc.characterName === "Toxic") {
    const hasSpray = special.sprayPosition != null;
    return (
      <div className="flex gap-1 flex-wrap">
        <Btn
          active={hasSpray}
          onClick={() => patch({ sprayPosition: hasSpray ? null : { x: sc.position.x + 150, y: sc.position.y } })}
        >
          spray
        </Btn>
      </div>
    );
  }

  return null;
}
