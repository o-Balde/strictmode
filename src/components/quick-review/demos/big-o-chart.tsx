"use client";

/**
 * How the common complexity classes grow, drawn with d3-scale and d3-shape.
 * The log scale is the honest view: on a linear axis everything below n² is
 * squashed flat against the bottom.
 */
import { useMemo, useState } from "react";
import { scaleLinear, scaleLog } from "d3-scale";
import { line } from "d3-shape";
import { cn } from "@lib";
import { Segmented, Slider } from "./ui";

const CLASSES = [
  { id: "1", label: "O(1)", f: () => 1, stroke: "stroke-mint", text: "text-mint" },
  { id: "log", label: "O(log n)", f: (n: number) => Math.max(1, Math.log2(n)), stroke: "stroke-mint-soft", text: "text-mint-soft" },
  { id: "n", label: "O(n)", f: (n: number) => n, stroke: "stroke-binary", text: "text-binary" },
  { id: "nlog", label: "O(n log n)", f: (n: number) => Math.max(1, n * Math.log2(n)), stroke: "stroke-clay", text: "text-clay" },
  { id: "n2", label: "O(n²)", f: (n: number) => n * n, stroke: "stroke-salmon", text: "text-salmon" },
  { id: "2n", label: "O(2ⁿ)", f: (n: number) => 2 ** n, stroke: "stroke-flame", text: "text-flame" },
] as const;

const W = 640;
const H = 300;
const M = { top: 12, right: 16, bottom: 30, left: 56 };

const format = (value: number) =>
  value >= 1e15 ? value.toExponential(1) : Math.round(value).toLocaleString("en-US");

export function BigOChart() {
  const [maxN, setMaxN] = useState(32);
  const [scale, setScale] = useState<"log" | "linear">("log");

  const chart = useMemo(() => {
    const ns = Array.from({ length: 120 }, (_, i) => 1 + ((maxN - 1) * i) / 119);
    const yMax = scale === "log" ? Math.max(10, 2 ** maxN) : maxN * maxN * 1.05;
    const x = scaleLinear().domain([1, maxN]).range([M.left, W - M.right]);
    const range = [H - M.bottom, M.top];
    const y =
      scale === "log"
        ? scaleLog().domain([1, yMax]).range(range).clamp(true)
        : scaleLinear().domain([0, yMax]).range(range).clamp(true);
    const paths = CLASSES.map((complexity) => ({
      ...complexity,
      d: line<number>()
        .x((n) => x(n))
        .y((n) => y(Math.max(1, complexity.f(n))))(ns) ?? "",
    }));
    return { x, y, paths, ticks: y.ticks(5) };
  }, [maxN, scale]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Slider label="n up to" value={maxN} min={4} max={64} onChange={setMaxN} className="w-52" />
        <Segmented
          label="Y axis"
          value={scale}
          options={[
            { value: "log", label: "log scale" },
            { value: "linear", label: "linear scale" },
          ]}
          onChange={setScale}
        />
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={`Growth of complexity classes up to n = ${maxN}`}>
        {chart.ticks.map((tick) => (
          <g key={tick}>
            <line x1={M.left} x2={W - M.right} y1={chart.y(tick)} y2={chart.y(tick)} className="stroke-line" />
            <text x={M.left - 6} y={chart.y(tick)} textAnchor="end" dominantBaseline="middle" className="fill-slate font-mono text-[10px]">
              {tick >= 1e6 ? tick.toExponential(0) : tick.toLocaleString("en-US")}
            </text>
          </g>
        ))}
        {chart.x.ticks(6).map((tick) => (
          <text key={tick} x={chart.x(tick)} y={H - 10} textAnchor="middle" className="fill-slate font-mono text-[10px]">
            {tick}
          </text>
        ))}
        {chart.paths.map((path) => (
          <path key={path.id} d={path.d} className={cn("fill-none", path.stroke)} strokeWidth={2} />
        ))}
      </svg>
      <div className="scrollbar-hairline overflow-x-auto">
        <table className="w-full min-w-120 border-collapse text-left font-mono text-[12px]">
          <thead>
            <tr className="text-ash">
              <th className="py-1 pr-3 font-medium">class</th>
              <th className="py-1 pr-3 font-medium">steps at n = {maxN}</th>
              <th className="py-1 font-medium">at n = 1,000</th>
            </tr>
          </thead>
          <tbody>
            {CLASSES.map((complexity) => (
              <tr key={complexity.id} className="border-line border-t">
                <td className={cn("py-1 pr-3", complexity.text)}>{complexity.label}</td>
                <td className="text-bone py-1 pr-3 tabular-nums">{format(complexity.f(maxN))}</td>
                <td className="text-bone py-1 tabular-nums">{complexity.id === "2n" ? "≈ 1.07e+301" : format(complexity.f(1000))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
