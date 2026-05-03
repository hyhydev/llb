"use client";

import { characterJSON } from "@/data/characters";
import { computeGridTeleportDestination, computeNitroCuffPositions } from "@/lib/specials";
import { computeBallPath } from "@/lib/simulation";
import type { StageBounds } from "@/lib/simulation";
import type { StagedCharacter } from "@/lib/stagedCharacters";
import type { Angle, Pose, CustomTeleportPose } from "@/data/types";
import { BallPathLayer } from "@/components/BallPathLayer";
import type { BallPathEntry } from "@/components/BallPathLayer";

interface Props {
  sc: StagedCharacter;
  stageBounds: StageBounds;
}

function spriteLocalToStage(
  localX: number,
  localY: number,
  charPos: { x: number; y: number },
  imgW: number,
  imgH: number,
  facing: "left" | "right",
): { x: number; y: number } {
  const stageX = facing === "left"
    ? charPos.x + imgW / 2 - localX
    : charPos.x - imgW / 2 + localX;
  return { x: stageX, y: charPos.y - imgH / 2 + localY };
}

export function SpecialsLayer({ sc, stageBounds }: Props) {
  const character = characterJSON[sc.characterName];
  const poseData = character.poses.find((p) => p.name === sc.pose) ?? character.poses[0];
  const [imgW, imgH] = poseData.imgSize;
  const { special } = sc;

  // ── Jet bubble ──────────────────────────────────────────────────────────────
  if (sc.characterName === "Jet" && special.jetBubble) {
    const cx = sc.position.x;
    const cy = sc.position.y;
    const jet = characterJSON["Jet"];
    const innerR = jet.maxBubbleDistance ?? 230;
    const outMinR = (jet.minBubbleOutDistance ?? 1472) / 6;
    const outMaxR = (jet.maxBubbleOutDistance ?? 3220) / 6;
    return (
      <g opacity={0.6}>
        <circle cx={cx} cy={cy} r={innerR} fill="none" stroke={jet.bubbleStrokeColor} strokeWidth={2} strokeDasharray="6 3" />
        <circle cx={cx} cy={cy} r={outMinR} fill="none" stroke={jet.bubbleOutMinStrokeColor} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle cx={cx} cy={cy} r={outMaxR} fill="none" stroke={jet.bubbleOutMaxStrokeColor} strokeWidth={1.5} strokeDasharray="4 4" />
      </g>
    );
  }

  // ── Dust/Ashes ───────────────────────────────────────────────────────────────
  if (sc.characterName === "DustAndAshes" && (special.ashesLeft || special.ashesRight)) {
    const dust = characterJSON["DustAndAshes"];
    const ashesPose = dust.ashesPoses?.[0] as Pose | undefined;
    if (!ashesPose) return null;
    const [aw, ah] = ashesPose.imgSize;
    const ashesRelease = ashesPose.ashesRelease as [number, number] | undefined;

    const renderAshes = (facing: "left" | "right") => {
      const mirrorTransform =
        facing === "left"
          ? `translate(${sc.position.x}, 0) scale(-1, 1) translate(${-sc.position.x}, 0)`
          : undefined;

      const ballPaths: BallPathEntry[] = [];
      if (ashesRelease && dust.specialAngles) {
        const hb = ashesPose.hurtboxes[0] as [number, number, number, number];
        const floorX = facing === "left"
          ? sc.position.x + aw / 2 - hb[0] - hb[2] / 2
          : sc.position.x - aw / 2 + hb[0] + hb[2] / 2;
        const floorY = sc.position.y - ah / 2 + hb[1] + hb[3];
        const releaseX = facing === "left"
          ? floorX - ashesRelease[0]
          : floorX + ashesRelease[0];
        const releaseY = floorY + ashesRelease[1];
        const releasePos = { x: releaseX, y: releaseY };

        for (const a of dust.specialAngles) {
          const deg = facing === "left" ? (180 - a.degrees) : a.degrees;
          ballPaths.push({
            path: computeBallPath({ ...a, degrees: deg }, releasePos, stageBounds, { reflections: 3 }),
            angleName: a.name,
            color: dust.color,
            strokeColor: dust.strokeColor,
          });
        }
      }

      return (
        <g key={facing}>
          <BallPathLayer entries={ballPaths} />
          <image
            href={`/characters/dust_swing_r.png`}
            x={sc.position.x - aw / 2}
            y={sc.position.y - ah / 2}
            width={aw}
            height={ah}
            opacity={0.55}
            transform={mirrorTransform}
          />
        </g>
      );
    };

    return (
      <g>
        {special.ashesLeft && renderAshes("left")}
        {special.ashesRight && renderAshes("right")}
      </g>
    );
  }

  // ── Doombox reticle ──────────────────────────────────────────────────────────
  if (sc.characterName === "Doombox" && special.reticlePosition) {
    const db = characterJSON["Doombox"];
    const specialAngle = db.specialAngle ?? 15;
    const rp = special.reticlePosition;
    const dir = sc.facing === "left" ? -1 : 1;
    const snipes = [
      { name: "snipe", mult: 0 },
      { name: "up-snipe", mult: 1 },
      { name: "down-snipe", mult: -1 },
    ];
    const entries: BallPathEntry[] = snipes.map(({ name, mult }) => {
      const deg = dir > 0 ? mult * specialAngle : 180 - mult * specialAngle;
      return {
        path: computeBallPath({ name, degrees: deg, validWhen: [] }, rp, stageBounds, { reflections: 2 }),
        angleName: name,
        color: db.color,
        strokeColor: db.strokeColor,
      };
    });
    return (
      <g>
        <BallPathLayer entries={entries} />
        <circle cx={rp.x} cy={rp.y} r={14} fill="none" stroke={db.strokeColor} strokeWidth={2} opacity={0.8} />
        <line x1={rp.x - 14} y1={rp.y} x2={rp.x + 14} y2={rp.y} stroke={db.strokeColor} strokeWidth={1.5} opacity={0.8} />
        <line x1={rp.x} y1={rp.y - 14} x2={rp.x} y2={rp.y + 14} stroke={db.strokeColor} strokeWidth={1.5} opacity={0.8} />
      </g>
    );
  }

  // ── Grid teleport ────────────────────────────────────────────────────────────
  if (sc.characterName === "Grid" && special.gridTeleports && special.gridTeleports.length > 0) {
    const grid = characterJSON["Grid"];
    const dist = grid.teleportDistance ?? 330;
    const elements: React.ReactNode[] = [];
    let currentPos = sc.position;

    for (let step = 0; step < special.gridTeleports.length; step++) {
      const teleport = special.gridTeleports[step];
      const { direction, spike } = teleport;

      // Pose at destination depends on direction
      let ghostPoseName = "swing";
      if (spike) ghostPoseName = "spike";
      else if (direction.y < 0) ghostPoseName = "smash";

      const ghostPose = grid.poses.find((p) => p.name === ghostPoseName) ?? grid.poses[0];
      const customTp: CustomTeleportPose | undefined =
        "customTeleportPose" in ghostPose ? (ghostPose.customTeleportPose as CustomTeleportPose) : undefined;
      const renderImgSize = customTp?.imgSize ?? ghostPose.imgSize;

      const destPos = computeGridTeleportDestination(currentPos, direction, dist, stageBounds, ghostPose);
      const [gw, gh] = renderImgSize;

      const ghostFacing: "left" | "right" =
        direction.x > 0 ? "right" : direction.x < 0 ? "left" : sc.facing;
      const mirrorTransform =
        ghostFacing === "left"
          ? `translate(${destPos.x}, 0) scale(-1, 1) translate(${-destPos.x}, 0)`
          : undefined;

      // Ball path from teleport release point (prefer customTeleportPose data, then pose data)
      const teleportRelease = customTp?.teleportRelease ??
        ("teleportRelease" in ghostPose ? (ghostPose.teleportRelease as [number, number]) : undefined);
      const teleportAngle = customTp?.teleportAngle ??
        ("teleportAngle" in ghostPose ? (ghostPose.teleportAngle as CustomTeleportPose["teleportAngle"]) : undefined);
      if (teleportRelease && teleportAngle) {
        const hb = ghostPose.hurtboxes[0] as [number, number, number, number];
        const releasePos = ghostFacing === "left"
          ? {
              x: destPos.x + gw / 2 - hb[0] - teleportRelease[0],
              y: destPos.y - gh / 2 + hb[1] + teleportRelease[1],
            }
          : {
              x: destPos.x - gw / 2 + hb[0] + teleportRelease[0],
              y: destPos.y - gh / 2 + hb[1] + teleportRelease[1],
            };
        const deg = ghostFacing === "left" ? 180 - teleportAngle.degrees : teleportAngle.degrees;
        const ballPath = computeBallPath(
          { ...teleportAngle, degrees: deg, validWhen: [] },
          releasePos,
          stageBounds,
          { reflections: teleportAngle.maxReflections ?? 2 },
        );
        elements.push(
          <BallPathLayer key={`path-${step}`} entries={[{ path: ballPath, angleName: teleportAngle.name, color: grid.color, strokeColor: grid.strokeColor }]} />
        );
      }

      elements.push(
        <image
          key={`ghost-${step}`}
          href={`/characters/grid_${ghostPoseName}_r.png`}
          x={destPos.x - gw / 2}
          y={destPos.y - gh / 2}
          width={gw}
          height={gh}
          opacity={0.5}
          transform={mirrorTransform}
        />
      );

      currentPos = destPos;
    }

    return <g>{elements}</g>;
  }

  // ── Sonata multi-step ────────────────────────────────────────────────────────
  if (sc.characterName === "Sonata" && special.sonataStep && sc.ballPosition) {
    const sonata = characterJSON["Sonata"];
    const step = special.sonataStep;
    const validAngles = (sonata.specialAngles as Angle[] ?? []).filter((a) =>
      (a.validForStep as number[] | undefined)?.includes(step) && (a.validWhen as string[]).includes(sc.pose)
    );
    const mirrored = sc.facing === "left";
    const ballStagePos = mirrored
      ? { x: sc.position.x + imgW / 2 - sc.ballPosition.x, y: sc.position.y - imgH / 2 + sc.ballPosition.y }
      : { x: sc.position.x - imgW / 2 + sc.ballPosition.x, y: sc.position.y - imgH / 2 + sc.ballPosition.y };
    const entries: BallPathEntry[] = validAngles.map((a) => {
      const deg = mirrored ? 180 - a.degrees : a.degrees;
      return {
        path: computeBallPath({ ...a, degrees: deg }, ballStagePos, stageBounds, { reflections: a.maxReflections ?? 1 }),
        angleName: a.name,
        color: sonata.color,
        strokeColor: sonata.sonataSpecialStrokeColor ?? sonata.strokeColor,
      };
    });
    return <BallPathLayer entries={entries} />;
  }

  // ── Nitro cuff ───────────────────────────────────────────────────────────────
  if (sc.characterName === "Nitro" && special.cuffEnabled && sc.ballPosition) {
    const nitro = characterJSON["Nitro"];
    const swingPose = nitro.poses[0];
    const [sw, sh] = swingPose.imgSize;
    const mirrored = sc.facing === "left";
    const ballStagePos = mirrored
      ? { x: sc.position.x + imgW / 2 - sc.ballPosition.x, y: sc.position.y - imgH / 2 + sc.ballPosition.y }
      : { x: sc.position.x - imgW / 2 + sc.ballPosition.x, y: sc.position.y - imgH / 2 + sc.ballPosition.y };

    const cuff = computeNitroCuffPositions(
      sc.position,
      sc.facing,
      swingPose,
      ballStagePos,
      stageBounds,
      nitro,
    );
    if (!cuff) return null;

    const elements: React.ReactNode[] = [];

    const renderPull = (
      pullPos: { x: number; y: number },
      ballRelease: { x: number; y: number },
      key: string,
      opacity: number,
    ) => {
      const pullLeft = sc.position.x > ballStagePos.x;
      const pullFacing: "left" | "right" = pullLeft ? "left" : "right";
      const mirrorTransform =
        pullFacing === "left"
          ? `translate(${pullPos.x}, 0) scale(-1, 1) translate(${-pullPos.x}, 0)`
          : undefined;
      const outAngles = nitro.angleOptionsOutOfCuff ?? [];
      const entries: BallPathEntry[] = outAngles.map((a) => {
        const deg = pullFacing === "left" ? 180 - a.degrees : a.degrees;
        return {
          path: computeBallPath({ ...a, degrees: deg, validWhen: [] }, ballRelease, stageBounds, { reflections: 2 }),
          angleName: a.name,
          color: nitro.color,
          strokeColor: nitro.cuffStrokeColor ?? nitro.strokeColor,
        };
      });
      return (
        <g key={key} opacity={opacity}>
          <BallPathLayer entries={entries} />
          <image
            href="/characters/nitro_swing_r.png"
            x={pullPos.x - sw / 2}
            y={pullPos.y - sh / 2}
            width={sw}
            height={sh}
            opacity={0.5}
            transform={mirrorTransform}
          />
          <circle cx={ballRelease.x} cy={ballRelease.y} r={7} fill={nitro.cuffStrokeColor ?? "#aaa"} opacity={0.8} />
        </g>
      );
    };

    if (special.cuffFullPull) {
      elements.push(renderPull(cuff.fullPull, cuff.fullPullBallRelease, "full", 0.85));
    }
    if (special.cuffHalfPull) {
      elements.push(renderPull(cuff.halfPull, cuff.halfPullBallRelease, "half", 0.6));
    }
    return <g>{elements}</g>;
  }

  // ── Toxic spray ──────────────────────────────────────────────────────────────
  if (sc.characterName === "Toxic" && special.sprayPosition) {
    const sp = special.sprayPosition;
    const blazePose = characterJSON["Toxic"].poses.find((p) => p.name === "blaze");
    if (!blazePose) return null;
    const [bw, bh] = blazePose.imgSize;
    return (
      <g opacity={0.5}>
        <image
          href="/characters/toxic_blaze_r.png"
          x={sp.x - bw / 2}
          y={sp.y - bh / 2}
          width={bw}
          height={bh}
        />
      </g>
    );
  }

  return null;
}
