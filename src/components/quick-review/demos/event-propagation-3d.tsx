"use client";

/**
 * Event propagation, recorded from real listeners and replayed in 3D.
 *
 * The 2D panel is a real nested DOM (section > ul > li > button) with real
 * capture and bubble listeners, which you switch on and off. Click anything
 * in it: the listeners record what actually fired, and the 3D scene replays
 * the event's trip down through the layers (capture), at the target, and
 * back up (bubble), stopping where stopPropagation was called.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, DemoConsole, Segmented, line, type ConsoleLine } from "./ui";
import { LabelAnchor, useSceneLabels, type PlaceLabel } from "./scene-label";
import { HEX, useInView } from "./use-in-view";

const LAYERS = [
  { id: "section", label: "section.app", size: 3.4 },
  { id: "ul", label: "ul.list", size: 2.6 },
  { id: "li", label: "li.item", size: 1.8 },
  { id: "button", label: "button.remove", size: 1.0 },
] as const;
type LayerIndex = 0 | 1 | 2 | 3;
type Phase = "capture" | "target" | "bubble";
type Stop = "off" | "capture" | "bubble";

interface Config {
  capture: boolean;
  bubble: boolean;
  stop: Stop;
}

interface Hop {
  layer: LayerIndex;
  phase: Phase;
  fired: boolean;
}

const PHASE_COLOR: Record<Phase, string> = { capture: HEX.binary, target: HEX.flame, bubble: HEX.mint };
const HOP_SECONDS = 0.55;
const layerY = (index: number) => 1.65 - index * 1.1;

function Scene({ hops, startedAt, place }: Readonly<{ hops: Hop[]; startedAt: number; place: PlaceLabel }>) {
  const ball = useRef<Mesh>(null);
  const [active, setActive] = useState(-1);

  useFrame(() => {
    if (!ball.current) return;
    if (hops.length === 0) {
      ball.current.visible = false;
      return;
    }
    const elapsed = (performance.now() - startedAt) / 1000 / HOP_SECONDS;
    const index = Math.min(hops.length - 1, Math.floor(elapsed));
    const fraction = Math.min(1, elapsed - index);
    const from = index === 0 ? layerY(-0.9) : layerY(hops[index - 1].layer);
    const to = layerY(hops[index].layer);
    ball.current.visible = true;
    ball.current.position.y = from + (to - from) * Math.min(1, fraction * 1.6);
    ball.current.position.x = hops[index].phase === "bubble" ? 0.35 : hops[index].phase === "capture" ? -0.35 : 0;
    if (index !== active && fraction > 0.6) setActive(index);
  });

  const hop = hops[active];
  return (
    <group rotation={[0.42, -0.5, 0]}>
      {LAYERS.map((layer, index) => {
        const lit = hop && hop.layer === index;
        return (
          <group key={layer.id} position={[0, layerY(index), 0]}>
            <mesh>
              <boxGeometry args={[layer.size, 0.08, layer.size]} />
              <meshStandardMaterial color={lit ? PHASE_COLOR[hop.phase] : HEX.plate} emissive={lit && hop.fired ? PHASE_COLOR[hop.phase] : "#000000"} emissiveIntensity={0.35} transparent opacity={0.9} />
              <Edges color={HEX.edge} />
            </mesh>
            <LabelAnchor position={[-layer.size / 2, 0.05, layer.size / 2]} index={index} place={place} />
          </group>
        );
      })}
      <mesh ref={ball} visible={false}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={HEX.amber} emissive={HEX.amber} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export function EventPropagation3D() {
  const [config, setConfig] = useState<Config[]>([
    { capture: true, bubble: true, stop: "off" },
    { capture: false, bubble: true, stop: "off" },
    { capture: true, bubble: true, stop: "off" },
    { capture: true, bubble: true, stop: "off" },
  ]);
  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const elements = useRef<(HTMLElement | null)[]>([]);
  const records = useRef<{ layer: LayerIndex; phase: Phase; capture: boolean; target: string; currentTarget: string }[]>([]);
  const [hops, setHops] = useState<Hop[]>([]);
  const [startedAt, setStartedAt] = useState(0);
  const [log, setLog] = useState<ConsoleLine[]>([]);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const { place, labelRef } = useSceneLabels();

  // Real listeners, attached once; they read the switches through a ref.
  useEffect(() => {
    const attached: (() => void)[] = [];
    elements.current.forEach((element, index) => {
      if (!element) return;
      const layer = index as LayerIndex;
      for (const capture of [true, false]) {
        const listener = (event: Event) => {
          const settings = configRef.current[layer];
          if (capture ? !settings.capture : !settings.bubble) return;
          const phase: Phase = event.eventPhase === Event.AT_TARGET ? "target" : capture ? "capture" : "bubble";
          const target = event.target instanceof Element ? event.target.localName : "?";
          records.current.push({ layer, phase, capture, target, currentTarget: LAYERS[layer].label });
          if (settings.stop === (capture ? "capture" : "bubble")) event.stopPropagation();
        };
        element.addEventListener("click", listener, { capture });
        attached.push(() => element.removeEventListener("click", listener, { capture }));
      }
    });
    return () => attached.forEach((detach) => detach());
  }, []);

  // React's capture listener sits at the root, so it runs before any listener in the nest. It resets
  // the record and schedules the replay for after the dispatch, which a stopPropagation can't prevent.
  function onClickCapture(event: React.MouseEvent) {
    records.current = [];
    // The deepest layer that contains the click is the target.
    let targetLayer = -1;
    elements.current.forEach((element, index) => {
      if (element?.contains(event.target as Node)) targetLayer = index;
    });
    if (targetLayer === -1) return;
    window.setTimeout(() => finish(targetLayer as LayerIndex), 0);
  }

  function finish(target: LayerIndex) {
    const settings = configRef.current;
    const path: { layer: LayerIndex; phase: Phase; stopsHere: boolean }[] = [];
    for (let layer = 0; layer < target; layer++) {
      path.push({ layer: layer as LayerIndex, phase: "capture", stopsHere: settings[layer].capture && settings[layer].stop === "capture" });
    }
    const atTarget = settings[target];
    path.push({
      layer: target,
      phase: "target",
      stopsHere: (atTarget.capture && atTarget.stop === "capture") || (atTarget.bubble && atTarget.stop === "bubble"),
    });
    for (let layer = target - 1; layer >= 0; layer--) {
      path.push({ layer: layer as LayerIndex, phase: "bubble", stopsHere: settings[layer].bubble && settings[layer].stop === "bubble" });
    }
    const stopAt = path.findIndex((hop) => hop.stopsHere);
    const visited = stopAt === -1 ? path : path.slice(0, stopAt + 1);
    const fired = records.current;
    setHops(
      visited.map((hop) => ({
        layer: hop.layer,
        phase: hop.phase,
        fired: fired.some((record) => record.layer === hop.layer && record.phase === hop.phase),
      })),
    );
    setStartedAt(performance.now());
    setLog([
      line(`click on <${LAYERS[target].label}>`, "accent"),
      ...fired.map((record) =>
        line(
          `${record.phase === "target" ? `target (${record.capture ? "capture" : "bubble"} listener)` : `${record.phase} listener`} on ${record.currentTarget}${record.layer === 0 && record.phase === "bubble" ? `: event.target is <${record.target}> (delegation works)` : ""}`,
          record.phase === "capture" ? "accent" : record.phase === "target" ? "warn" : "default",
        ),
      ),
      ...(stopAt !== -1 ? [line(`stopPropagation() on ${LAYERS[path[stopAt].layer].label}: the event goes no further`, "error")] : []),
    ]);
  }

  const patch = (index: number, next: Partial<Config>) => setConfig((current) => current.map((settings, at) => (at === index ? { ...settings, ...next } : settings)));
  const nested = useMemo(() => LAYERS, []);

  return (
    <div className="flex flex-col gap-3">
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="flex flex-col gap-2">
          <span className={DEMO_LABEL}>a real nested DOM: click any layer</span>
          <div onClickCapture={onClickCapture}>
            <section
              ref={(element) => {
                elements.current[0] = element;
              }}
              className="border-line-3 bg-surface-2 rounded-lg border p-2.5"
            >
              <span className="text-stone font-mono text-[11px]">{nested[0].label}</span>
              <ul
                ref={(element) => {
                  elements.current[1] = element;
                }}
                className="border-line-3 bg-surface-3 m-0 mt-1 list-none rounded-md border p-2.5"
              >
                <span className="text-stone font-mono text-[11px]">{nested[1].label}</span>
                <li
                  ref={(element) => {
                    elements.current[2] = element;
                  }}
                  className="border-line-3 bg-surface-4 mt-1 flex items-center justify-between rounded border p-2.5"
                >
                  <span className="text-stone font-mono text-[11px]">{nested[2].label}: Buy milk</span>
                  <button
                    ref={(element) => {
                      elements.current[3] = element;
                    }}
                    type="button"
                    className="bg-flame text-ink rounded px-2.5 py-1 font-mono text-[11px] font-semibold"
                  >
                    remove ×
                  </button>
                </li>
              </ul>
            </section>
          </div>
          <div className="flex flex-col gap-1.5">
            {LAYERS.map((layer, index) => (
              <div key={layer.id} className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-bone w-28 font-mono text-[11.5px]">{layer.label}</span>
                <label className="text-ash inline-flex items-center gap-1 text-[11.5px]">
                  <input type="checkbox" className="accent-binary" checked={config[index].capture} onChange={(event) => patch(index, { capture: event.target.checked })} />
                  capture
                </label>
                <label className="text-ash inline-flex items-center gap-1 text-[11.5px]">
                  <input type="checkbox" className="accent-mint" checked={config[index].bubble} onChange={(event) => patch(index, { bubble: event.target.checked })} />
                  bubble
                </label>
                <Segmented
                  label={`stopPropagation on ${layer.label}`}
                  value={config[index].stop}
                  options={[
                    { value: "off", label: "no stop" },
                    { value: "capture", label: "stop in capture" },
                    { value: "bubble", label: "stop in bubble" },
                  ]}
                  onChange={(stop) => patch(index, { stop })}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2">
          <div ref={wrapRef} className="border-line-3 bg-ink relative h-72 overflow-hidden rounded-lg border" role="img" aria-label="Three-dimensional replay of the event path">
            <Canvas camera={{ position: [0, 1.2, 8], fov: 42 }} dpr={[1, 2]} frameloop={inView ? "always" : "never"}>
              <color attach="background" args={[HEX.ink]} />
              <ambientLight intensity={0.7} />
              <directionalLight position={[3, 8, 5]} intensity={1.3} />
              <Scene hops={hops} startedAt={startedAt} place={place} />
              <OrbitControls enablePan={false} enableZoom={false} />
            </Canvas>
            {LAYERS.map((layer, index) => {
              const phases = hops.filter((hop) => hop.layer === index && hop.fired).map((hop) => hop.phase);
              return (
                <span key={layer.id} ref={labelRef(index)} data-align="left" className="pointer-events-none absolute top-0 left-0 rounded bg-black/70 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-white">
                  {layer.label}
                  {phases.length ? ` · ${phases.join(", ")}` : ""}
                </span>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className={cn(DEMO_LABEL, "normal-case tracking-normal")}>
              <span className="text-binary">●</span> capture (down) · <span className="text-flame">●</span> target ·{" "}
              <span className="text-mint">●</span> bubble (up)
            </span>
            <DemoButton onClick={() => elements.current[3]?.click()}>Replay a click on the button</DemoButton>
          </div>
        </div>
      </div>
      <DemoConsole lines={log} title="listeners that actually fired" empty="Click a layer of the nested DOM." />
    </div>
  );
}
