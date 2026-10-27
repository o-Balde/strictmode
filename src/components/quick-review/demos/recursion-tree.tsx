"use client";

/**
 * The call tree of fib(n), recorded by actually running an instrumented
 * fib, then laid out with d3-hierarchy. With memoization on, repeated calls
 * become cache hits and the tree collapses to a near-straight line.
 */
import { useEffect, useMemo, useState } from "react";
import { hierarchy, tree } from "d3-hierarchy";
import { cn } from "@lib";
import { DemoButton, Slider, Switch } from "./ui";

interface CallNode {
  id: number;
  n: number;
  result: number;
  cached: boolean;
  /** Order in which the call started. */
  order: number;
  children: CallNode[];
}

function traceFib(n: number, memo: boolean): { root: CallNode; calls: number; hits: number } {
  const cache = new Map<number, number>();
  let order = 0;
  let calls = 0;
  let hits = 0;
  const call = (k: number): CallNode => {
    const node: CallNode = { id: order, n: k, result: 0, cached: false, order: order++, children: [] };
    calls += 1;
    if (memo && cache.has(k)) {
      hits += 1;
      node.cached = true;
      node.result = cache.get(k) ?? 0;
      return node;
    }
    if (k < 2) {
      node.result = k;
    } else {
      const left = call(k - 1);
      const right = call(k - 2);
      node.children.push(left, right);
      node.result = left.result + right.result;
    }
    if (memo) cache.set(k, node.result);
    return node;
  };
  const root = call(n);
  return { root, calls, hits };
}

const WIDTH = 720;
const LEVEL = 54;

export function RecursionTree() {
  const [n, setN] = useState(5);
  const [memo, setMemo] = useState(false);
  const [shown, setShown] = useState(Infinity);
  const [playing, setPlaying] = useState(false);
  const { root, calls, hits } = useMemo(() => traceFib(n, memo), [n, memo]);

  const layout = useMemo(() => {
    const nodes = hierarchy(root, (node) => node.children);
    const height = (nodes.height + 1) * LEVEL;
    tree<CallNode>().size([WIDTH - 40, height - LEVEL])(nodes);
    return { nodes, height };
  }, [root]);

  useEffect(() => {
    if (!playing) return;
    if (shown >= calls) return;
    const timer = window.setTimeout(() => {
      setShown(shown + 1);
      if (shown + 1 >= calls) setPlaying(false);
    }, 320);
    return () => window.clearTimeout(timer);
  }, [playing, shown, calls]);

  const visible = (order: number) => order < shown;
  const descendants = layout.nodes.descendants();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Slider
          label="n"
          value={n}
          min={1}
          max={memo ? 12 : 8}
          onChange={(next) => {
            setN(next);
            setShown(Infinity);
            setPlaying(false);
          }}
          className="w-48"
        />
        <Switch
          label="memoize"
          checked={memo}
          onChange={(next) => {
            setMemo(next);
            if (!next) setN((current) => Math.min(current, 8));
            setShown(Infinity);
            setPlaying(false);
          }}
        />
        <DemoButton
          onClick={() => {
            setShown(1);
            setPlaying(true);
          }}
        >
          Replay the calls in order
        </DemoButton>
      </div>
      <p className="text-bone m-0 font-mono text-[12.5px]">
        fib({n}) = {root.result} · <span className="text-flame">{calls} calls</span>
        {memo ? <span className="text-mint-soft"> · {hits} cache hits</span> : null}
        {!memo && n > 1 ? <span className="text-slate"> · roughly φⁿ: each extra n multiplies the work by about 1.6</span> : null}
      </p>
      <div className="scrollbar-hairline overflow-x-auto">
        <svg viewBox={`0 -24 ${WIDTH} ${layout.height + 16}`} className="w-full min-w-120" role="img" aria-label={`Call tree for fib(${n}) with ${calls} calls`}>
          <g transform="translate(20, 0)">
            {layout.nodes.links().map((link) => (
              <line
                key={`${link.source.data.id}-${link.target.data.id}`}
                x1={link.source.x}
                y1={link.source.y}
                x2={link.target.x}
                y2={link.target.y}
                className={cn("stroke-line-3 transition-opacity", visible(link.target.data.order) ? "opacity-100" : "opacity-0")}
                strokeWidth={1.5}
              />
            ))}
            {descendants.map((node) => {
              const { data } = node;
              const on = visible(data.order);
              const repeated = !memo && descendants.filter((other) => other.data.n === data.n).length > 1 && data.n > 1;
              return (
                <g key={data.id} transform={`translate(${node.x}, ${node.y})`} className={cn("transition-opacity", on ? "opacity-100" : "opacity-0")}>
                  <circle
                    r={descendants.length > 40 ? 11 : 14}
                    className={cn(
                      data.cached ? "fill-mint-deep stroke-mint" : repeated ? "fill-flame-deep stroke-flame" : "fill-surface-4 stroke-line-3",
                    )}
                    strokeWidth={1.5}
                  />
                  <text textAnchor="middle" dominantBaseline="central" className="fill-paper font-mono text-[10px]">
                    {data.n}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Each circle is one call to fib(k), labelled with k. Orange circles repeat work already done somewhere else in the tree; green ones are answered from the cache.
      </p>
    </div>
  );
}
