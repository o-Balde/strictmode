"use client";

/**
 * The CSS box model as four stacked slabs, in DevTools' colours: margin,
 * border, padding, content. Pull them apart to see each layer, orbit to look
 * at the stack edge-on. A real element with the same CSS is rendered beside
 * the scene and measured, so the numbers are the browser's, not ours.
 */
import { useLayoutEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { cn } from "@lib";
import { DEMO_LABEL, Segmented, Slider } from "./ui";
import { LabelAnchor, useSceneLabels, type PlaceLabel } from "./scene-label";
import { HEX, useInView } from "./use-in-view";

/** Each label is pinned to a different corner of its slab, so the four never overlap. */
const LAYERS = [
  { id: "margin", color: "#f6b26b", label: "margin", corner: [-1, -1] },
  { id: "border", color: "#ffe599", label: "border", corner: [-1, 1] },
  { id: "padding", color: "#93c47d", label: "padding", corner: [1, -1] },
  { id: "content", color: "#6fa8dc", label: "content", corner: [1, 1] },
] as const;

/** Scene units per CSS pixel. */
const UNIT = 0.02;

interface Box {
  width: number;
  height: number;
  padding: number;
  border: number;
  margin: number;
  sizing: "content-box" | "border-box";
}

function layerSizes(box: Box) {
  const content =
    box.sizing === "border-box"
      ? { width: Math.max(0, box.width - 2 * (box.padding + box.border)), height: Math.max(0, box.height - 2 * (box.padding + box.border)) }
      : { width: box.width, height: box.height };
  const padding = { width: content.width + 2 * box.padding, height: content.height + 2 * box.padding };
  const border = { width: padding.width + 2 * box.border, height: padding.height + 2 * box.border };
  const margin = { width: border.width + 2 * box.margin, height: border.height + 2 * box.margin };
  return { content, padding, border, margin };
}

function Slabs({ box, spread, place }: Readonly<{ box: Box; spread: number; place: PlaceLabel }>) {
  const sizes = layerSizes(box);
  return (
    <group rotation={[-0.5, 0.6, 0]}>
      {LAYERS.map((layer, index) => {
        const size = sizes[layer.id];
        const z = index * spread;
        return (
          <group key={layer.id} position={[0, 0, z]}>
            <mesh>
              <boxGeometry args={[Math.max(0.01, size.width * UNIT), Math.max(0.01, size.height * UNIT), 0.06]} />
              <meshStandardMaterial color={layer.color} transparent opacity={layer.id === "margin" ? 0.55 : 0.9} />
            </mesh>
            <LabelAnchor
              position={[(layer.corner[0] * size.width * UNIT) / 2, (layer.corner[1] * size.height * UNIT) / 2, 0]}
              index={index}
              place={place}
            />
          </group>
        );
      })}
    </group>
  );
}

export function BoxModel3D() {
  const [box, setBox] = useState<Box>({ width: 160, height: 90, padding: 16, border: 6, margin: 20, sizing: "content-box" });
  const [spread, setSpread] = useState(0.6);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const probeRef = useRef<HTMLDivElement>(null);
  const { place, labelRef } = useSceneLabels();
  const [measured, setMeasured] = useState<{ width: number; height: number } | null>(null);
  const patch = (next: Partial<Box>) => setBox((current) => ({ ...current, ...next }));

  useLayoutEffect(() => {
    const element = probeRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    setMeasured({ width: rect.width, height: rect.height });
  }, [box]);

  const sizes = layerSizes(box);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <Slider label="width" value={box.width} min={40} max={240} unit="px" onChange={(width) => patch({ width })} />
        <Slider label="height" value={box.height} min={30} max={160} unit="px" onChange={(height) => patch({ height })} />
        <Slider label="padding" value={box.padding} min={0} max={40} unit="px" onChange={(padding) => patch({ padding })} />
        <Slider label="border" value={box.border} min={0} max={20} unit="px" onChange={(border) => patch({ border })} />
        <Slider label="margin" value={box.margin} min={0} max={40} unit="px" onChange={(margin) => patch({ margin })} />
        <Slider label="pull layers apart" value={spread} min={0} max={1.2} step={0.05} onChange={setSpread} />
      </div>
      <Segmented
        label="box-sizing"
        value={box.sizing}
        options={[
          { value: "content-box", label: "box-sizing: content-box" },
          { value: "border-box", label: "box-sizing: border-box" },
        ]}
        onChange={(sizing) => patch({ sizing })}
      />
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div ref={wrapRef} className="border-line-3 bg-ink relative h-72 overflow-hidden rounded-lg border" aria-label="Three-dimensional view of the box model layers" role="img">
          <Canvas camera={{ position: [0, 0, 9], fov: 40 }} dpr={[1, 2]} frameloop={inView ? "always" : "never"}>
            <color attach="background" args={[HEX.ink]} />
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 6, 8]} intensity={1.4} />
            <Slabs box={box} spread={spread} place={place} />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
          {LAYERS.map((layer, index) => (
            <span key={layer.id} ref={labelRef(index)} data-align={layer.corner[0] < 0 ? "left" : undefined} className="pointer-events-none absolute top-0 left-0 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-white">
              {layer.label} {Math.round(sizes[layer.id].width)}×{Math.round(sizes[layer.id].height)}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className={DEMO_LABEL}>the same CSS on a real element</span>
          <div className="bg-[#f6b26b]/40 self-start" style={{ padding: box.margin }}>
            <div
              ref={probeRef}
              style={{ width: box.width, height: box.height, padding: box.padding, borderWidth: box.border, boxSizing: box.sizing }}
              className="border-solid border-[#ffe599] bg-[#93c47d]"
            >
              <div className="size-full bg-[#6fa8dc]" />
            </div>
          </div>
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 font-mono text-[12px]">
            <dt className="text-ash">getBoundingClientRect</dt>
            <dd className="text-paper m-0">{measured ? `${measured.width.toFixed(0)} × ${measured.height.toFixed(0)}` : "…"}</dd>
            <dt className="text-ash">content area</dt>
            <dd className="text-[#6fa8dc] m-0">
              {Math.round(sizes.content.width)} × {Math.round(sizes.content.height)}
            </dd>
            <dt className="text-ash">space it takes up</dt>
            <dd className="text-[#f6b26b] m-0">
              {Math.round(sizes.margin.width)} × {Math.round(sizes.margin.height)}
            </dd>
          </dl>
          <p className={cn("m-0 text-[12px]/[1.6]", box.sizing === "border-box" ? "text-mint-soft" : "text-peach")}>
            {box.sizing === "content-box"
              ? `width: ${box.width}px sizes the content; the rendered box is ${box.width} + 2×${box.padding} + 2×${box.border} = ${sizes.border.width}px wide.`
              : `width: ${box.width}px is the whole border box; padding and border eat into the content, leaving ${sizes.content.width}px.`}
          </p>
          <p className="text-slate m-0 text-[11.5px]">Drag the scene to orbit around the stack.</p>
        </div>
      </div>
    </div>
  );
}
