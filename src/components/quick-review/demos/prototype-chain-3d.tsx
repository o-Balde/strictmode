"use client";

/**
 * The prototype chain as a stack of platforms, built from real objects with
 * Object.getPrototypeOf. Look up a property and a marker drops down the
 * chain until a level owns it (Object.hasOwn), or falls off the end at null.
 */
import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Edges, OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";
import { cn } from "@lib";
import { CodeView, DEMO_LABEL, DemoButton, Segmented } from "./ui";
import { LabelAnchor, useSceneLabels, type PlaceLabel } from "./scene-label";
import { HEX, useInView } from "./use-in-view";

class Animal {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound`;
  }
  static create(name: string) {
    return new this(name);
  }
}
class Dog extends Animal {
  bark() {
    return "Woof";
  }
}

interface Scenario {
  label: string;
  code: string;
  root: object;
  /** Names for objects the chain passes through. */
  names: Map<object, string>;
  presets: string[];
}

function buildScenarios(): Record<string, Scenario> {
  const rex = new Dog("Rex");
  const animal = {
    speak(this: { name: string }) {
      return `${this.name} makes a sound`;
    },
  };
  const dog: { name?: string } = Object.create(animal);
  dog.name = "Rex";
  const list = [1, 2, 3];
  const dictionary: Record<string, string> = Object.create(null);
  dictionary.theme = "dark";
  const common = [
    [Object.prototype, "Object.prototype"],
    [Function.prototype, "Function.prototype"],
    [Array.prototype, "Array.prototype"],
  ] as const;
  return {
    class: {
      label: "class Dog extends Animal",
      code: `class Animal {\n  constructor(name) { this.name = name; }\n  speak() { … }\n  static create(name) { … }\n}\nclass Dog extends Animal {\n  bark() { … }\n}\nconst rex = new Dog("Rex");`,
      root: rex,
      names: new Map<object, string>([[rex, "rex"], [Dog.prototype, "Dog.prototype"], [Animal.prototype, "Animal.prototype"], ...common]),
      presets: ["name", "bark", "speak", "toString", "create", "constructor", "missing"],
    },
    static: {
      label: "the class itself (static side)",
      code: `class Animal {\n  static create(name) { … }\n}\nclass Dog extends Animal { … }\n\n// Dog is a function object: its own chain\n// runs through Animal, not Animal.prototype.`,
      root: Dog,
      names: new Map<object, string>([[Dog, "Dog (the class)"], [Animal, "Animal (the class)"], ...common]),
      presets: ["create", "bark", "name", "call", "toString", "missing"],
    },
    create: {
      label: "Object.create(animal)",
      code: `const animal = {\n  speak() { … },\n};\nconst dog = Object.create(animal);\ndog.name = "Rex";`,
      root: dog,
      names: new Map<object, string>([[dog, "dog"], [animal, "animal"], ...common]),
      presets: ["name", "speak", "hasOwnProperty", "missing"],
    },
    array: {
      label: "an array",
      code: `const list = [1, 2, 3];`,
      root: list,
      names: new Map<object, string>([[list, "list"], ...common]),
      presets: ["length", "0", "map", "toString", "hasOwnProperty", "missing"],
    },
    null: {
      label: "Object.create(null)",
      code: `const dictionary = Object.create(null);\ndictionary.theme = "dark";`,
      root: dictionary,
      names: new Map<object, string>([[dictionary, "dictionary"], ...common]),
      presets: ["theme", "toString", "hasOwnProperty"],
    },
  };
}

interface Level {
  name: string;
  keys: string[];
  object: object | null;
}

function chainOf(scenario: Scenario): Level[] {
  const levels: Level[] = [];
  for (let current: object | null = scenario.root; current !== null; current = Object.getPrototypeOf(current) as object | null) {
    const keys = Object.getOwnPropertyNames(current);
    levels.push({ name: scenario.names.get(current) ?? "(anonymous object)", keys, object: current });
  }
  levels.push({ name: "null", keys: [], object: null });
  return levels;
}

const STEP_SECONDS = 0.5;
const levelY = (index: number, count: number) => ((count - 1) / 2 - index) * 1.15;

function Platforms({ levels, found, running, place }: Readonly<{ levels: Level[]; found: number; running: boolean; place: PlaceLabel }>) {
  const marker = useRef<Mesh>(null);
  const startedAt = useRef<number | null>(null);
  const [reached, setReached] = useState(-1);
  const stops = found === -1 ? levels.length - 1 : found;

  useFrame(() => {
    if (!marker.current) return;
    if (!running) {
      marker.current.visible = false;
      return;
    }
    // A new lookup remounts this component, so the first frame is the start of the drop.
    startedAt.current ??= performance.now();
    const progress = Math.min(stops, (performance.now() - startedAt.current) / 1000 / STEP_SECONDS);
    marker.current.visible = true;
    const from = levelY(Math.floor(progress), levels.length);
    const to = levelY(Math.min(stops, Math.floor(progress) + 1), levels.length);
    marker.current.position.y = from + (to - from) * (progress % 1) + 0.32;
    const index = Math.floor(progress);
    if (index !== reached) setReached(index);
  });

  return (
    <group rotation={[0.35, -0.45, 0]}>
      {levels.map((level, index) => {
        const isNull = level.object === null;
        const hit = reached >= stops && index === stops;
        const passed = running && index < Math.min(reached + 1, stops) && !hit;
        const color = hit ? (found === -1 ? HEX.flame : HEX.mint) : passed ? HEX.stone : isNull ? HEX.surface : HEX.plate;
        return (
          <group key={`${level.name}-${index}`} position={[0, levelY(index, levels.length), 0]}>
            <mesh>
              <boxGeometry args={[isNull ? 1.2 : 2.6, 0.1, isNull ? 1.2 : 1.6]} />
              <meshStandardMaterial color={color} emissive={hit ? color : "#000000"} emissiveIntensity={0.3} transparent opacity={isNull ? 0.6 : 0.92} />
              <Edges color={HEX.edge} />
            </mesh>
            <LabelAnchor position={[isNull ? -0.6 : -1.3, 0.06, isNull ? 0.6 : 0.8]} index={index} place={place} />
          </group>
        );
      })}
      <mesh ref={marker} visible={false}>
        <sphereGeometry args={[0.14, 20, 20]} />
        <meshStandardMaterial color={HEX.amber} emissive={HEX.amber} emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
}

export function PrototypeChain3D({ initial = "class" }: Readonly<{ initial?: "class" | "static" }>) {
  const [scenarios] = useState(buildScenarios);
  const [id, setId] = useState<string>(initial);
  const scenario = scenarios[id];
  const levels = useMemo(() => chainOf(scenario), [scenario]);
  const [property, setProperty] = useState(scenario.presets[0]);
  /** Counts lookups; 0 means none has run yet for this object. */
  const [run, setRun] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef);
  const { place, labelRef } = useSceneLabels();

  const found = levels.findIndex((level) => level.object !== null && Object.hasOwn(level.object, property));
  const value = found === -1 ? undefined : (levels[found].object as Record<string, unknown>)[property];
  const rootName = levels[0].name.split(" ")[0];

  function lookUp(name: string) {
    setProperty(name);
    setRun((count) => count + 1);
  }

  return (
    <div className="flex flex-col gap-3">
      <Segmented
        label="Object"
        value={id}
        options={Object.entries(scenarios).map(([value, candidate]) => ({ value, label: candidate.label }))}
        onChange={(next) => {
          setId(next);
          setProperty(scenarios[next].presets[0]);
          setRun(0);
        }}
      />
      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="flex min-w-0 flex-col gap-2">
          <CodeView code={scenario.code} />
          <span className={DEMO_LABEL}>look up a property on {rootName}</span>
          <div className="flex flex-wrap gap-1.5">
            {scenario.presets.map((name) => (
              <DemoButton key={name} onClick={() => lookUp(name)} className={cn("font-mono", name === property && "border-flame text-paper")}>
                .{name}
              </DemoButton>
            ))}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const input = new FormData(event.currentTarget).get("property");
              if (typeof input === "string" && input.trim()) lookUp(input.trim());
            }}
            className="flex gap-1.5"
          >
            <input name="property" placeholder="any property name" spellCheck={false} className="border-line-3 bg-well text-paper min-w-0 flex-1 rounded-md border px-2.5 py-1.5 font-mono text-[12.5px] outline-none focus:border-flame" />
            <DemoButton type="submit">Look up</DemoButton>
          </form>
          <p className="text-bone m-0 font-mono text-[12.5px]" aria-live="polite">
            {rootName}.{property} →{" "}
            {found === -1 ? (
              <span className="text-rust">undefined: no level owns it, the search ended at null</span>
            ) : (
              <span className="text-mint-soft">
                found on {levels[found].name}
                {found === 0 ? " (an own property)" : ` (${found} step${found === 1 ? "" : "s"} down)`}:{" "}
                {typeof value === "function" ? "ƒ" : JSON.stringify(value) ?? String(value)}
              </span>
            )}
          </p>
        </div>
        <div ref={wrapRef} className="border-line-3 bg-ink relative h-80 overflow-hidden rounded-lg border" role="img" aria-label={`Prototype chain of ${rootName}: ${levels.map((level) => level.name).join(" → ")}`}>
          <Canvas camera={{ position: [0, 0.6, 8.5], fov: 44 }} dpr={[1, 2]} frameloop={inView ? "always" : "never"}>
            <color attach="background" args={[HEX.ink]} />
            <ambientLight intensity={0.75} />
            <directionalLight position={[3, 8, 6]} intensity={1.3} />
            <Platforms key={`${id}-${run}`} levels={levels} found={found} running={run > 0} place={place} />
            <OrbitControls enablePan={false} enableZoom={false} />
          </Canvas>
          {levels.map((level, index) => {
            const shown = level.keys.slice(0, 5);
            return (
              <div key={`${id}-${index}`} ref={labelRef(index)} data-align="left" className="pointer-events-none absolute top-0 left-0 max-w-56 rounded bg-black/75 px-1.5 py-1 font-mono text-[10px] leading-tight text-white">
                <div className="font-semibold">{level.name}</div>
                {shown.length ? (
                  <div className="text-white/60">
                    {shown.join(", ")}
                    {level.keys.length > shown.length ? ` … +${level.keys.length - shown.length}` : ""}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Each platform lists a few of its own property names, read with Object.getOwnPropertyNames. A write such as{" "}
        <code className="prep-code">rex.speak = …</code> would add an own property on the top level and shadow the one below, without
        touching the prototype.
      </p>
    </div>
  );
}
