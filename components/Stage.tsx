"use client";

import { useRef } from "react";
import { stageJSON } from "@/data/stages";
import { characterJSON } from "@/data/characters";
import { clampToStage, stageBoundsFrom } from "@/lib/stage";
import { computeBallPath } from "@/lib/simulation";
import type { DefenderBoxes } from "@/lib/simulation";
import { getValidAnglesForPose } from "@/lib/character";
import { BallPathLayer } from "@/components/BallPathLayer";
import type { BallPathEntry } from "@/components/BallPathLayer";
import type { StagedCharacter } from "@/lib/stagedCharacters";
import type { Box } from "@/data/types";

function clampToHitboxUnion(
  pt: { x: number; y: number },
  hitboxes: Box[],
): { x: number; y: number } {
  for (const [x, y, w, h] of hitboxes) {
    if (pt.x >= x && pt.x <= x + w && pt.y >= y && pt.y <= y + h) return pt;
  }
  let best = pt;
  let bestDist = Infinity;
  for (const [x, y, w, h] of hitboxes) {
    const cx = Math.max(x, Math.min(x + w, pt.x));
    const cy = Math.max(y, Math.min(y + h, pt.y));
    const d = Math.hypot(cx - pt.x, cy - pt.y);
    if (d < bestDist) { bestDist = d; best = { x: cx, y: cy }; }
  }
  return best;
}

interface Props {
  stageName: keyof typeof stageJSON;
  stagedCharacters: StagedCharacter[];
  onMoveCharacter: (id: string, position: { x: number; y: number }) => void;
  onMoveBall: (id: string, ballPosition: { x: number; y: number }) => void;
}

type DragTarget =
  | { kind: "character"; id: string; offsetX: number; offsetY: number }
  | { kind: "ball"; id: string };

export function Stage({ stageName, stagedCharacters, onMoveCharacter, onMoveBall }: Props) {
  const stage = stageJSON[stageName];
  const [imgW, imgH] = stage.imageSize;
  const bounds = stageBoundsFrom(stage);

  const dragging = useRef<DragTarget | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  function toSVGPoint(e: React.PointerEvent): { x: number; y: number } {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (imgW / rect.width),
      y: (e.clientY - rect.top) * (imgH / rect.height),
    };
  }

  function onCharacterPointerDown(e: React.PointerEvent<SVGImageElement>, sc: StagedCharacter) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const pt = toSVGPoint(e);
    dragging.current = { kind: "character", id: sc.id, offsetX: pt.x - sc.position.x, offsetY: pt.y - sc.position.y };
  }

  function onBallPointerDown(e: React.PointerEvent<SVGCircleElement>, sc: StagedCharacter) {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = { kind: "ball", id: sc.id };
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return;
    const pt = toSVGPoint(e);

    if (dragging.current.kind === "character") {
      const sc = stagedCharacters.find((c) => c.id === dragging.current!.id);
      if (!sc) return;
      const character = characterJSON[sc.characterName];
      const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
      const [charW, charH] = poseData.imgSize;
      const hurtbox = poseData.hurtboxes[0] as readonly [number, number, number, number] | undefined;
      const d = dragging.current as Extract<DragTarget, { kind: "character" }>;
      const raw = { x: pt.x - d.offsetX, y: pt.y - d.offsetY };
      onMoveCharacter(sc.id, clampToStage(raw, bounds, { width: charW, height: charH }, hurtbox));
    } else {
      const sc = stagedCharacters.find((c) => c.id === dragging.current!.id);
      if (!sc || sc.role !== "attacker") return;
      const character = characterJSON[sc.characterName];
      const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
      const [charW, charH] = poseData.imgSize;
      // Convert stage coords to right-facing sprite-local (hitboxes are stored right-facing)
      const rawLocalX = pt.x - sc.position.x + charW / 2;
      const localX = sc.facing === "left" ? charW - rawLocalX : rawLocalX;
      const localY = pt.y - sc.position.y + charH / 2;
      const hitboxes = poseData.hitboxes as Box[];
      if (hitboxes.length > 0) {
        onMoveBall(sc.id, clampToHitboxUnion({ x: localX, y: localY }, hitboxes));
      }
    }
  }

  function onPointerUp() {
    dragging.current = null;
  }

  // Collect all defenders' boxes in stage coordinates
  const defenderBoxes: DefenderBoxes = { hitboxes: [], hurtboxes: [] };
  for (const sc of stagedCharacters) {
    if (sc.role !== "defender") continue;
    const character = characterJSON[sc.characterName];
    const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
    const [charW, charH] = poseData.imgSize;
    const ox = sc.position.x - charW / 2;
    const oy = sc.position.y - charH / 2;
    for (const [x, y, w, h] of poseData.hitboxes) {
      defenderBoxes.hitboxes.push([ox + x, oy + y, w, h]);
    }
    for (const [x, y, w, h] of poseData.hurtboxes) {
      defenderBoxes.hurtboxes.push([ox + x, oy + y, w, h]);
    }
  }
  const hasDefender = defenderBoxes.hitboxes.length > 0 || defenderBoxes.hurtboxes.length > 0;

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
        const mirrorTransform =
          sc.facing === "left"
            ? `translate(${sc.position.x}, 0) scale(-1, 1) translate(${-sc.position.x}, 0)`
            : undefined;

        // Ball paths only for attackers with a ball position
        let ballPathEntries: BallPathEntry[] = [];
        let ballStagePos: { x: number; y: number } | null = null;
        if (sc.role === "attacker" && sc.ballPosition) {
          const mirrored = sc.facing === "left";
          ballStagePos = mirrored
            ? { x: sc.position.x + charW / 2 - sc.ballPosition.x, y: sc.position.y - charH / 2 + sc.ballPosition.y }
            : { x: sc.position.x - charW / 2 + sc.ballPosition.x, y: sc.position.y - charH / 2 + sc.ballPosition.y };
          const validAngles = getValidAnglesForPose(character, sc.pose);
          ballPathEntries = validAngles.map((a) => {
            const effectiveAngle = mirrored ? { ...a, degrees: 180 - a.degrees } : a;
            return {
              path: computeBallPath(effectiveAngle, ballStagePos!, bounds, { reflections: 5 }, hasDefender ? defenderBoxes : undefined),
              angleName: a.name,
              color: character.color,
              strokeColor: character.strokeColor,
            };
          });
        }

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
              onPointerDown={(e) => onCharacterPointerDown(e, sc)}
              style={{ cursor: "grab" }}
            />
            {ballStagePos && (
              <circle
                cx={ballStagePos.x}
                cy={ballStagePos.y}
                r={8}
                fill="white"
                stroke={character.strokeColor}
                strokeWidth={2}
                onPointerDown={(e) => onBallPointerDown(e, sc)}
                style={{ cursor: "crosshair" }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
