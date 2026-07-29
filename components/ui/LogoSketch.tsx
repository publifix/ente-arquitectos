"use client";

import { LOGO_SRC } from "@/lib/assets";

function polarPt(cx: number, cy: number, r: number, deg: number): [number, number] {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx: number, cy: number, r: number, a0: number, a1: number): string {
  const [x1, y1] = polarPt(cx, cy, r, a0);
  const [x2, y2] = polarPt(cx, cy, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)},${y1.toFixed(2)} A ${r},${r} 0 ${large} 1 ${x2.toFixed(2)},${y2.toFixed(2)}`;
}

function segT(progress: number, a: number, b: number, ease: (t: number) => number): number {
  let t = (progress - a) / (b - a);
  if (t < 0) t = 0;
  if (t > 1) t = 1;
  return ease(t);
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOutSine = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2;

function DrawPath({ d, t, width = 2 }: { d: string; t: number; width?: number }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-ink)"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - t}
      opacity={t > 0 ? 1 : 0}
    />
  );
}

export function LogoSketch({ progress }: { progress: number }) {
  const ease = easeOutCubic;
  const cx = 200,
    cy = 200,
    R_OUT = 150,
    R_IN = 105;
  const gapStart = -15,
    gapEnd = 65;
  const tail = polarPt(cx, cy, 175, 55);
  const outEnd = polarPt(cx, cy, R_OUT, gapEnd);
  const inStart = polarPt(cx, cy, R_IN, gapEnd);
  const ladderAngles = [195, 213, 231, 249];
  const stackedArcsR = [115, 130, 145];
  const fanCenter: [number, number] = [258, 202];
  const fanAngles = [98, 118, 138, 158, 178];

  // El boceto ocupa progress 0 → 0.78; la fusión con el logo real, 0.78 → 1
  const P = 0.78;
  const sp = (a: number, b: number): [number, number] => [a * P, b * P];

  const paths: { key: string; d: string; t: number; width?: number }[] = [];
  let w: [number, number];

  w = sp(0.0, 0.08);
  paths.push({ key: "crossV", d: `M 200,42 L 200,358`, t: segT(progress, w[0], w[1], ease), width: 1.4 });
  w = sp(0.03, 0.11);
  paths.push({ key: "crossH", d: `M 42,200 L 358,200`, t: segT(progress, w[0], w[1], ease), width: 1.4 });
  w = sp(0.1, 0.34);
  paths.push({ key: "outer", d: arcPath(cx, cy, R_OUT, gapEnd, gapStart + 360), t: segT(progress, w[0], w[1], ease), width: 2 });
  w = sp(0.32, 0.38);
  paths.push({
    key: "tail",
    d: `M ${outEnd[0].toFixed(2)},${outEnd[1].toFixed(2)} L ${tail[0].toFixed(2)},${tail[1].toFixed(2)} L ${inStart[0].toFixed(2)},${inStart[1].toFixed(2)}`,
    t: segT(progress, w[0], w[1], ease),
    width: 2,
  });
  w = sp(0.36, 0.55);
  paths.push({ key: "inner", d: arcPath(cx, cy, R_IN, gapEnd, gapStart + 360), t: segT(progress, w[0], w[1], ease), width: 2 });

  ladderAngles.forEach((a, i) => {
    const p1 = polarPt(cx, cy, R_IN, a),
      p2 = polarPt(cx, cy, R_OUT, a);
    const s0 = 0.5 + i * 0.025,
      e0 = s0 + 0.05;
    const ww = sp(s0, e0);
    paths.push({
      key: `ladder${a}`,
      d: `M ${p1[0].toFixed(2)},${p1[1].toFixed(2)} L ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`,
      t: segT(progress, ww[0], ww[1], ease),
      width: 1.4,
    });
  });

  const d1 = polarPt(cx, cy, R_IN, 315),
    d2 = polarPt(cx, cy, R_OUT, 315);
  w = sp(0.6, 0.64);
  paths.push({
    key: "divider315",
    d: `M ${d1[0].toFixed(2)},${d1[1].toFixed(2)} L ${d2[0].toFixed(2)},${d2[1].toFixed(2)}`,
    t: segT(progress, w[0], w[1], ease),
    width: 1.4,
  });

  fanAngles.forEach((a, i) => {
    const p2 = polarPt(fanCenter[0], fanCenter[1], 52, a);
    const s0 = 0.62 + i * 0.02,
      e0 = s0 + 0.05;
    const ww = sp(s0, e0);
    paths.push({
      key: `fan${a}`,
      d: `M ${fanCenter[0]},${fanCenter[1]} L ${p2[0].toFixed(2)},${p2[1].toFixed(2)}`,
      t: segT(progress, ww[0], ww[1], ease),
      width: 1.4,
    });
  });
  w = sp(0.72, 0.76);
  paths.push({
    key: "fanArc",
    d: arcPath(fanCenter[0], fanCenter[1], 52, fanAngles[0], fanAngles[fanAngles.length - 1]),
    t: segT(progress, w[0], w[1], ease),
    width: 1.4,
  });

  stackedArcsR.forEach((r, i) => {
    const s0 = 0.74 + i * 0.035,
      e0 = s0 + 0.06;
    const ww = sp(s0, e0);
    paths.push({ key: `stack${r}`, d: arcPath(cx, cy, r, 98, 172), t: segT(progress, ww[0], ww[1], ease), width: 1.4 });
  });

  w = sp(0.84, 0.92);
  paths.push({ key: "tower", d: `M 176,268 L 176,148 L 196,128 L 196,268`, t: segT(progress, w[0], w[1], ease), width: 2 });
  w = sp(0.9, 0.93);
  paths.push({ key: "ground", d: `M 176,268 L 122,298`, t: segT(progress, w[0], w[1], ease), width: 1.4 });
  w = sp(0.9, 0.96);
  paths.push({
    key: "chevron",
    d: `M 288,255 L 300,240 L 304,258 L 316,240 L 320,258`,
    t: segT(progress, w[0], w[1], ease),
    width: 1.4,
  });

  w = sp(0.96, 1.0);
  const dotT = segT(progress, w[0], w[1], ease);

  // Fusión: el boceto se desvanece mientras aparece el logo real (SIN
  // cambio de fondo — el fondo se mantiene blanco/cream todo el tiempo,
  // decisión de producto ya confirmada). El logo real se renderiza con
  // filter brightness(0) para forzar el color a ink/#000000, ya que el
  // PNG fuente es de tono claro.
  const fuseT = segT(progress, P, 1.0, easeInOutSine);

  return (
    <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ display: "block" }}>
      <g opacity={1 - fuseT}>
        {paths.map((p) => (
          <DrawPath key={p.key} d={p.d} t={p.t} width={p.width} />
        ))}
        <circle cx={200} cy={292} r={10 * dotT} fill="var(--color-ink)" opacity={dotT} />
      </g>
      <image
        href={LOGO_SRC}
        x={50}
        y={50}
        width={300}
        height={300}
        opacity={fuseT}
        preserveAspectRatio="xMidYMid meet"
        style={{ filter: "brightness(0)" }}
      />
    </svg>
  );
}
