"use client";

import { useRef } from "react";
import { stageJSON } from "@/data/stages";
import { characterJSON } from "@/data/characters";
import { clampToStage, stageBoundsFrom } from "@/lib/stage";
import { computeBallPath } from "@/lib/simulation";
import { getValidAnglesForPose } from "@/lib/character";
import { BallPathLayer } from "@/components/BallPathLayer";
import type { BallPathEntry } from "@/components/BallPathLayer";
import type { StagedCharacter } from "@/lib/stagedCharacters";

interface Props {
  stageName: keyof typeof stageJSON;
  stagedCharacters: StagedCharacter[];
  onMoveCharacter: (id: string, position: { x: number; y: number }) => void;
}

export function Stage({ stageName, stagedCharacters, onMoveCharacter }: Props) {
  const stage = stageJSON[stageName];
  const [imgW, imgH] = stage.imageSize;
  const bounds = stageBoundsFrom(stage);

  const dragging = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function toSVGPoint(e: React.PointerEvent): { x: number; y: number } {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (imgW / rect.width),
      y: (e.clientY - rect.top) * (imgH / rect.height),
    };
  }

  function onPointerDown(e: React.PointerEvent<SVGImageElement>, sc: StagedCharacter) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = toSVGPoint(e);
    dragging.current = { id: sc.id, offsetX: pt.x - sc.position.x, offsetY: pt.y - sc.position.y };
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return;
    const sc = stagedCharacters.find((c) => c.id === dragging.current!.id);
    if (!sc) return;
    const character = characterJSON[sc.characterName];
    const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
    const [charW, charH] = poseData.imgSize;
    const pt = toSVGPoint(e);
    const raw = { x: pt.x - dragging.current.offsetX, y: pt.y - dragging.current.offsetY };
    onMoveCharacter(sc.id, clampToStage(raw, bounds, { width: charW, height: charH }));
  }

  function onPointerUp() {
    dragging.current = null;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${imgW} ${imgH}`}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: "none", width: "100%", height: "auto", display: "block" }}
    >
      <image
        href={`/stages/${stageName}.jpg`}
        x={0}
        y={0}
        width={imgW}
        height={imgH}
        preserveAspectRatio="none"
      />
      {stagedCharacters.map((sc) => {
        const character = characterJSON[sc.characterName];
        const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
        const [charW, charH] = poseData.imgSize;
        const validAngles = getValidAnglesForPose(character, sc.pose);
        const ballPathEntries: BallPathEntry[] = validAngles.map((a) => ({
          path: computeBallPath(a, sc.position, bounds, { reflections: 5 }),
          angleName: a.name,
          color: character.color,
          strokeColor: character.strokeColor,
        }));
        const mirrorTransform =
          sc.facing === "left"
            ? `translate(${sc.position.x}, 0) scale(-1, 1) translate(${-sc.position.x}, 0)`
            : undefined;

        return (
          <g key={sc.id}>
            <BallPathLayer entries={ballPathEntries} />
            <image
              href={`/characters/${character.img_name}_${poseData.name}_r.png`}
              x={sc.position.x - charW / 2}
              y={sc.position.y - charH / 2}
              width={charW}
              height={charH}
              transform={mirrorTransform}
              onPointerDown={(e) => onPointerDown(e, sc)}
              style={{ cursor: "grab" }}
            />
          </g>
        );
      })}
    </svg>
  );
}
