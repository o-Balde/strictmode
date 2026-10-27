"use client";

/**
 * Two demos that need a document of their own: `rem` is relative to the
 * root element and media queries to the viewport, and neither can be changed
 * on this page without changing the page. A same-origin iframe gives each
 * demo its own root and its own viewport, and the values shown are read back
 * from it with getComputedStyle and matchMedia.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, Slider } from "./ui";

const FRAME_BASE = "margin:0;font-family:ui-sans-serif,system-ui,sans-serif;background:#181615;color:#cfc7c0";

// ── em vs rem ────────────────────────────────────────────────────────────────

function nest(unit: "em" | "rem", factor: number, depth: number): string {
  let html = "";
  for (let level = depth; level >= 1; level--) {
    html = `<div class="box ${unit}" data-level="${level}" style="font-size:${factor}${unit}">level ${level}: ${factor}${unit}${html}</div>`;
  }
  return html;
}

export function EmRem() {
  const [root, setRoot] = useState(16);
  const [factor, setFactor] = useState(1.2);
  const [depth, setDepth] = useState(3);
  const [sizes, setSizes] = useState<{ em: number[]; rem: number[] }>({ em: [], rem: [] });
  const frameRef = useRef<HTMLIFrameElement>(null);

  const srcDoc = `<!doctype html><html style="font-size:${root}px"><head><style>
    body{${FRAME_BASE};padding:10px;display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:1rem}
    .box{border:1px solid #3a3431;border-radius:6px;padding:4px 6px 6px;margin-top:4px;line-height:1.25}
    .em{border-color:#e4572e} .rem{border-color:#8b91ff}
    h3{font:600 12px ui-monospace,monospace;margin:0 0 4px;color:#8c847d}
  </style></head><body>
    <section><h3>font-size: ${factor}em (each level)</h3>${nest("em", factor, depth)}</section>
    <section><h3>font-size: ${factor}rem (each level)</h3>${nest("rem", factor, depth)}</section>
  </body></html>`;

  const measure = useCallback(() => {
    const doc = frameRef.current?.contentDocument;
    if (!doc) return;
    const read = (unit: "em" | "rem") =>
      [...doc.querySelectorAll<HTMLElement>(`.${unit}`)].map((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    setSizes({ em: read("em"), rem: read("rem") });
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="root <html> font-size" value={root} min={10} max={24} unit="px" onChange={setRoot} />
        <Slider label="factor" value={factor} min={0.8} max={1.6} step={0.1} onChange={(value) => setFactor(Math.round(value * 10) / 10)} />
        <Slider label="nesting depth" value={depth} min={1} max={4} onChange={setDepth} />
      </div>
      <iframe ref={frameRef} title="em and rem, nested" srcDoc={srcDoc} onLoad={measure} className="border-line-3 h-72 w-full rounded-md border" />
      <div className="scrollbar-hairline overflow-x-auto">
        <table className="w-full min-w-96 border-collapse text-left font-mono text-[12px]">
          <thead>
            <tr className="text-ash">
              <th className="py-1 pr-3 font-medium">level</th>
              <th className="py-1 pr-3 font-medium">{factor}em computes to</th>
              <th className="py-1 font-medium">{factor}rem computes to</th>
            </tr>
          </thead>
          <tbody>
            {sizes.em.map((size, index) => (
              <tr key={index} className="border-line border-t">
                <td className="text-stone py-1 pr-3">{index + 1}</td>
                <td className="text-flame py-1 pr-3 tabular-nums">{size.toFixed(2)}px</td>
                <td className="text-binary-soft py-1 tabular-nums">{sizes.rem[index]?.toFixed(2)}px</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Measured inside the frame with getComputedStyle. The em column multiplies at every level ({root} × {factor}
        <sup>n</sup>); the rem column stays at {root} × {factor} however deep it goes.
      </p>
    </div>
  );
}

// ── Media queries ────────────────────────────────────────────────────────────

const QUERIES = [
  "screen",
  "print",
  "(width >= 30rem)",
  "(width >= 48rem)",
  "(width >= 64rem)",
  "(orientation: portrait)",
  "(hover: hover)",
  "(pointer: coarse)",
  "(prefers-color-scheme: dark)",
  "(prefers-reduced-motion: reduce)",
];

const MEDIA_DOC = `<!doctype html><html><head><style>
  body{${FRAME_BASE};padding:12px}
  .banner{font:600 12px ui-monospace,monospace;padding:6px 8px;border-radius:6px;background:#221a16;color:#e0b9a8;margin-bottom:10px}
  .banner::after{content:"narrow: one column"}
  .grid{display:grid;gap:8px;grid-template-columns:1fr}
  .card{border:1px solid #3a3431;border-radius:6px;padding:10px;font-size:12px;background:#1e1b19}
  @media (width >= 30rem){.grid{grid-template-columns:1fr 1fr}.banner::after{content:"≥ 30rem: two columns"}}
  @media (width >= 48rem){.grid{grid-template-columns:repeat(3,1fr)}.banner::after{content:"≥ 48rem: three columns"}}
  @media (width >= 64rem){.grid{grid-template-columns:repeat(4,1fr)}.banner::after{content:"≥ 64rem: four columns"}}
  @media (orientation: portrait){.banner{background:#1c1d32;color:#b9bcff}}
</style></head><body><div class="banner"></div><div class="grid">
  <div class="card">Card 1</div><div class="card">Card 2</div><div class="card">Card 3</div><div class="card">Card 4</div>
</div></body></html>`;

export function MediaQueries() {
  const [width, setWidth] = useState(420);
  const [height, setHeight] = useState(260);
  const [matches, setMatches] = useState<boolean[]>([]);
  const [scale, setScale] = useState(1);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const evaluate = useCallback(() => {
    const view = frameRef.current?.contentWindow;
    if (!view) return;
    setMatches(QUERIES.map((query) => view.matchMedia(query).matches));
  }, []);

  // Re-read the queries once the frame has laid out at its new size.
  useEffect(() => {
    const frame = requestAnimationFrame(evaluate);
    return () => cancelAnimationFrame(frame);
  }, [width, height, evaluate]);

  // Shrink the frame visually to fit narrow screens; its viewport stays the chosen size.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, (entry?.contentRect.width ?? width) / width)));
    observer.observe(wrap);
    return () => observer.disconnect();
  }, [width]);

  const remPx = 16;

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label={`viewport width (${(width / remPx).toFixed(1)}rem)`} value={width} min={280} max={1100} step={10} unit="px" onChange={setWidth} />
        <Slider label="viewport height" value={height} min={180} max={560} step={10} unit="px" onChange={setHeight} />
      </div>
      <div ref={wrapRef} className="w-full overflow-hidden" style={{ height: height * scale }}>
        <iframe
          ref={frameRef}
          title="A page whose viewport you can resize"
          srcDoc={MEDIA_DOC}
          onLoad={evaluate}
          className="border-line-3 origin-top-left rounded-md border"
          style={{ width, height, transform: scale < 1 ? `scale(${scale})` : undefined }}
        />
      </div>
      <ul className="m-0 grid list-none gap-1.5 p-0 sm:grid-cols-2">
        {QUERIES.map((query, index) => (
          <li key={query} className="flex items-center justify-between gap-3 font-mono text-[12px]">
            <code className="text-bone">@media {query}</code>
            <span className={cn("font-semibold", matches[index] ? "text-mint-soft" : "text-slate")}>{matches[index] ? "matches" : "no"}</span>
          </li>
        ))}
      </ul>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Width, height and orientation follow the frame. Hover, pointer, colour scheme and reduced motion come from your own device and
        settings, which is exactly what those queries are for. <span className={DEMO_LABEL}>print</span> only matches when printing.
      </p>
    </div>
  );
}
