import { reflectionPoints, labelAnchor } from "@/lib/ballPath";
import type { BallPath } from "@/lib/simulation";

export interface BallPathEntry {
  path: BallPath;
  angleName: string;
  color: string;
  strokeColor: string;
}

interface Props {
  entries: BallPathEntry[];
}

export function BallPathLayer({ entries }: Props) {
  return (
    <g>
      {entries.map(({ path, angleName, color, strokeColor }, i) => {
        const pts = [path.segments[0].start, ...path.segments.map((s) => s.end)];
        const points = pts.map((p) => `${p.x},${p.y}`).join(" ");

        const reflections = reflectionPoints(path);
        const anchor = labelAnchor(path);

        return (
          <g key={i}>
            <polyline
              points={points}
              stroke={strokeColor}
              strokeWidth={2}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
            />
            {reflections.map((pt, j) => (
              <circle key={j} cx={pt.x} cy={pt.y} r={5} fill={color} opacity={0.9} />
            ))}
            <text
              x={anchor.x}
              y={anchor.y - 6}
              fill={strokeColor}
              fontSize={14}
              fontWeight="bold"
              textAnchor="middle"
              style={{ pointerEvents: "none", userSelect: "none" }}
            >
              {angleName}
            </text>
          </g>
        );
      })}
    </g>
  );
}
