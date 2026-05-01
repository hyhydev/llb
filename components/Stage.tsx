"use client";

import { useState, useRef } from "react";
import { stageJSON } from "@/data/stages";
import { characterJSON } from "@/data/characters";
import { clampToStage } from "@/lib/stage";

interface Props {
  stageName: keyof typeof stageJSON;
  characterName: keyof typeof characterJSON;
  pose?: string;
}

export function Stage({ stageName, characterName, pose = "swing" }: Props) {
  const stage = stageJSON[stageName];
  const character = characterJSON[characterName];
  const [stageW, stageH] = stage.canvasSize;

  const poseData = character.poses.find((p) => p.name === pose) ?? character.poses[0];
  const [charW, charH] = poseData.imgSize;

  const [pos, setPos] = useState({ x: stageW / 2, y: stageH / 2 });
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const stageSize = { width: stageW, height: stageH };
  const charSize = { width: charW, height: charH };

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
    setPos(clampToStage(raw, stageSize, charSize));
  }

  function onPointerUp() {
    dragging.current = false;
  }

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
        x={0}
        y={0}
        width={stageW}
        height={stageH}
      />
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
