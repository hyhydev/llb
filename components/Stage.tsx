"use client";

import { useState, useRef } from "react";
import { stageJSON } from "@/data/stages";
import { characterJSON } from "@/data/characters";
import { clampToStage, stageBoundsFrom } from "@/lib/stage";
import { computeBallPath } from "@/lib/simulation";
import { BallPathLayer } from "@/components/BallPathLayer";
import type { BallPathEntry } from "@/components/BallPathLayer";

interface Props {
  stageName: keyof typeof stageJSON;
  characterName: keyof typeof characterJSON;
  pose?: string;
  action?: string;
}

export function Stage({ stageName, characterName, pose = "swing", action }: Props) {
  const stage = stageJSON[stageName];
  const character = characterJSON[characterName];
  const [stageW, stageH] = stage.canvasSize;
  const [imgW, imgH] = stage.imageSize;
  const [offsetX, offsetY] = stage.canvasOffset;

  const poseData = character.poses.find((p) => p.name === pose) ?? character.poses[0];
  const [charW, charH] = poseData.imgSize;

  const bounds = stageBoundsFrom(stage);
  const charSize = { width: charW, height: charH };

  const [pos, setPos] = useState({
    x: (bounds.left + bounds.right) / 2,
    y: (bounds.top + bounds.bottom) / 2,
  });

  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  function toSVGPoint(e: React.PointerEvent): { x: number; y: number } {
    const rect = svgRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (stageW / rect.width),
      y: (e.clientY - rect.top) * (stageH / rect.height),
    };
  }

  function onPointerDown(e: React.PointerEvent<SVGImageElement>) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragging.current = true;
    const pt = toSVGPoint(e);
    dragOffset.current = { x: pt.x - pos.x, y: pt.y - pos.y };
  }

  function onPointerMove(e: React.PointerEvent<SVGSVGElement>) {
    if (!dragging.current) return;
    const pt = toSVGPoint(e);
    const raw = { x: pt.x - dragOffset.current.x, y: pt.y - dragOffset.current.y };
    setPos(clampToStage(raw, bounds, charSize));
  }

  function onPointerUp() {
    dragging.current = false;
  }

  const ballPathEntries: BallPathEntry[] = action
    ? character.angles
        .filter((a) => (a.validWhen as readonly string[]).includes(action))
        .map((a) => ({
          path: computeBallPath(a, pos, bounds, { reflections: 5 }),
          angleName: a.name,
          color: character.color,
          strokeColor: character.strokeColor,
        }))
    : [];

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${stageW} ${stageH}`}
      width={stageW}
      height={stageH}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ touchAction: "none", maxWidth: "100%", height: "auto" }}
    >
      <image
        href={`/stages/${stageName}.jpg`}
        x={-offsetX}
        y={-offsetY}
        width={imgW}
        height={imgH}
        preserveAspectRatio="none"
      />
      <BallPathLayer entries={ballPathEntries} />
      <image
        href={`/characters/${character.img_name}_${poseData.name}_r.png`}
        x={pos.x - charW / 2}
        y={pos.y - charH / 2}
        width={charW}
        height={charH}
        onPointerDown={onPointerDown}
        style={{ cursor: "grab" }}
      />
    </svg>
  );
}
