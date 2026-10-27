"use client";

/**
 * React demos that are plain React: what you see is React itself keeping or
 * discarding state, running effects, catching errors and re-rendering
 * consumers. Nothing is simulated.
 */
import {
  Component,
  createContext,
  memo,
  use,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, DemoConsole, Panel, Segmented, Switch, line, type ConsoleLine } from "./ui";

// ── Keys ─────────────────────────────────────────────────────────────────────

let nextItemId = 4;
let nextInstance = 1;

function Row({ label }: Readonly<{ label: string }>) {
  // Each component instance gets a number when it mounts; a remount shows a new one.
  const [instance] = useState(() => nextInstance++);
  return (
    <li className="border-line-3 bg-surface flex items-center gap-3 rounded-md border px-3 py-1.5">
      <span className="text-paper w-20 font-mono text-[12.5px]">{label}</span>
      <input placeholder="type a note" aria-label={`Note for ${label}`} className="border-line-3 bg-well text-paper min-w-0 flex-1 rounded border px-2 py-1 text-[12.5px] outline-none focus:border-flame" />
      <span className="text-slate font-mono text-[11px]">instance #{instance}</span>
    </li>
  );
}

type KeyMode = "id" | "index" | "random";

export function ReactKeys() {
  const [items, setItems] = useState([
    { id: 1, label: "Milk" },
    { id: 2, label: "Eggs" },
    { id: 3, label: "Bread" },
  ]);
  const [mode, setMode] = useState<KeyMode>("index");
  // Bumped by every action, so "random" keys are new on every update, as Math.random() keys would be.
  const [generation, setGeneration] = useState(0);
  const act = (update: (current: typeof items) => typeof items) => {
    setItems(update);
    setGeneration((value) => value + 1);
  };
  const names = ["Apples", "Rice", "Tea", "Salt", "Oats", "Jam"];
  const fresh = () => ({ id: nextItemId++, label: names[nextItemId % names.length] });

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          label="Key"
          value={mode}
          options={[
            { value: "id", label: "key={item.id}" },
            { value: "index", label: "key={index}" },
            { value: "random", label: "a new key every render" },
          ]}
          onChange={setMode}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        <DemoButton onClick={() => act((current) => [fresh(), ...current])}>Add to the top</DemoButton>
        <DemoButton onClick={() => act((current) => [...current, fresh()])}>Add to the bottom</DemoButton>
        <DemoButton onClick={() => act((current) => current.slice(1))} disabled={items.length === 0}>
          Remove the first
        </DemoButton>
        <DemoButton onClick={() => act((current) => [...current].reverse())}>Reverse</DemoButton>
        <DemoButton onClick={() => act((current) => current)}>Re-render</DemoButton>
      </div>
      <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
        {items.map((item, index) => (
          <Row key={mode === "id" ? item.id : mode === "index" ? index : `${generation}-${index}`} label={item.label} />
        ))}
      </ul>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Type a note in the first two rows, then add to the top. With the index as key, the notes (DOM state) and instance numbers stay in
        place while the labels shift under them. With ids they travel with their item; with random keys every row remounts on every
        render, even &quot;Re-render&quot;.
      </p>
    </div>
  );
}

// ── Lifecycle ────────────────────────────────────────────────────────────────

function useLog() {
  const [lines, setLines] = useState<ConsoleLine[]>([]);
  const push = useCallback((text: string, tone?: ConsoleLine["tone"]) => {
    // Effects can log during commit; defer the state update so it never runs inside one.
    queueMicrotask(() => setLines((current) => [...current.slice(-30), line(text, tone)]));
  }, []);
  return { lines, push, clear: () => setLines([]) };
}

/**
 * A log that lives outside React state. The child below logs while it renders,
 * so the log must not re-render its parent: only the console subscribes.
 */
function createLogStore() {
  let lines: ConsoleLine[] = [];
  const listeners = new Set<() => void>();
  let queued = false;
  const notify = () => {
    if (queued) return;
    queued = true;
    queueMicrotask(() => {
      queued = false;
      listeners.forEach((listener) => listener());
    });
  };
  return {
    push(text: string, tone?: ConsoleLine["tone"]) {
      lines = [...lines.slice(-40), line(text, tone)];
      notify();
    },
    clear() {
      lines = [];
      notify();
    },
    subscribe(listener: () => void) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    snapshot: () => lines,
  };
}
type LogStore = ReturnType<typeof createLogStore>;

const NO_LINES: ConsoleLine[] = [];

function StoreConsole({ store, title }: Readonly<{ store: LogStore; title: string }>) {
  const lines = useSyncExternalStore(store.subscribe, store.snapshot, () => NO_LINES);
  return <DemoConsole lines={lines} title={title} />;
}

function ChatRoom({ roomId, log }: Readonly<{ roomId: string; log: LogStore["push"] }>) {
  const [draft, setDraft] = useState("");
  useLayoutEffect(() => {
    log(`useLayoutEffect setup (before paint) · componentDidMount/Update`, "dim");
    return () => log(`useLayoutEffect cleanup`, "dim");
  });
  useEffect(() => {
    log(`useEffect([roomId]) setup: connect to "${roomId}" · componentDidMount, or Update when roomId changed`, "accent");
    return () => log(`useEffect([roomId]) cleanup: disconnect from "${roomId}" · componentWillUnmount, or before the next setup`, "warn");
  }, [roomId, log]);
  log(`render ChatRoom (roomId="${roomId}") · render()`);
  return (
    <div className="border-line-3 bg-surface flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
      <span className="text-paper font-mono text-[12.5px]">#{roomId}</span>
      <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="state update: type here" aria-label="Message draft" className="border-line-3 bg-well text-paper min-w-0 flex-1 rounded border px-2 py-1 text-[12.5px] outline-none focus:border-flame" />
    </div>
  );
}

export function LifecycleLog() {
  const [mounted, setMounted] = useState(true);
  const [roomId, setRoomId] = useState("general");
  const [, setTick] = useState(0);
  const [store] = useState(createLogStore);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        <DemoButton onClick={() => setMounted((value) => !value)}>{mounted ? "Unmount" : "Mount"} the child</DemoButton>
        <DemoButton onClick={() => setRoomId((value) => (value === "general" ? "random" : "general"))} disabled={!mounted}>
          Change the roomId prop
        </DemoButton>
        <DemoButton onClick={() => setTick((value) => value + 1)}>Re-render the parent</DemoButton>
        <DemoButton onClick={store.clear}>Clear log</DemoButton>
      </div>
      {mounted ? <ChatRoom roomId={roomId} log={store.push} /> : <p className="text-slate m-0 font-mono text-[12px]">(unmounted)</p>}
      <StoreConsole store={store} title="lifecycle, in order" />
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Each line names the hook event and the class method it replaces. A parent re-render renders the child and re-runs the effect with
        no dependency list, but not the one keyed on roomId. In development, React StrictMode also mounts, unmounts and remounts once on
        the first mount, so the first lines appear twice there.
      </p>
    </div>
  );
}

// ── Lifting state ────────────────────────────────────────────────────────────

const toF = (c: string) => (c === "" || Number.isNaN(Number(c)) ? "" : String(Math.round(((Number(c) * 9) / 5 + 32) * 10) / 10));
const toC = (f: string) => (f === "" || Number.isNaN(Number(f)) ? "" : String(Math.round((((Number(f) - 32) * 5) / 9) * 10) / 10));

function OwnStateInput({ label, initial }: Readonly<{ label: string; initial: string }>) {
  const [value, setValue] = useState(initial);
  return <TemperatureField label={label} value={value} onChange={setValue} />;
}

function TemperatureField({ label, value, onChange }: Readonly<{ label: string; value: string; onChange: (value: string) => void }>) {
  return (
    <label className="flex items-center gap-2">
      <span className="text-ash w-6 text-[12.5px]">{label}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} inputMode="decimal" className="border-line-3 bg-well text-paper w-28 rounded-md border px-2.5 py-1.5 font-mono text-[13px] outline-none focus:border-flame" />
    </label>
  );
}

export function LiftState() {
  const [lifted, setLifted] = useState(false);
  const [celsius, setCelsius] = useState("20");

  return (
    <div className="flex flex-col gap-3">
      <Segmented
        label="Where the state lives"
        value={lifted ? "lifted" : "own"}
        options={[
          { value: "own", label: "each input owns its state" },
          { value: "lifted", label: "lifted to the parent" },
        ]}
        onChange={(value) => setLifted(value === "lifted")}
      />
      <div className="grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
          {lifted ? (
            <>
              <TemperatureField label="°C" value={celsius} onChange={setCelsius} />
              <TemperatureField label="°F" value={toF(celsius)} onChange={(f) => setCelsius(toC(f))} />
            </>
          ) : (
            <>
              <OwnStateInput label="°C" initial="20" />
              <OwnStateInput label="°F" initial="68" />
            </>
          )}
        </div>
        <pre className="border-line-4 bg-well text-bone m-0 overflow-x-auto rounded-md border px-3 py-2 font-mono text-[11.5px]/[1.6]">
          {lifted
            ? `function Converter() {\n  const [celsius, setCelsius] = useState("20");\n  return <>\n    <Field value={celsius} onChange={setCelsius} />\n    <Field value={toF(celsius)} onChange={f => setCelsius(toC(f))} />\n  </>;\n}`
            : `function Field({ initial }) {\n  const [value, setValue] = useState(initial);\n  // each Field has its own copy: they can't agree\n}`}
        </pre>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Type in either box. With state in each input, the two drift apart. Lifted, there is one value (Celsius) in the parent and the
        other is derived from it during render, so they can&apos;t disagree.
      </p>
    </div>
  );
}

// ── Error boundaries ─────────────────────────────────────────────────────────

class Boundary extends Component<{ children: React.ReactNode; onCatch: (message: string) => void }, { error: string | null }> {
  state = { error: null as string | null };

  static getDerivedStateFromError(error: unknown) {
    return { error: error instanceof Error ? error.message : String(error) };
  }

  componentDidCatch(error: unknown) {
    this.props.onCatch(`componentDidCatch: ${error instanceof Error ? error.message : String(error)}`);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="border-rust-line bg-rust-bg rounded-md border px-3 py-2">
          <p className="text-rust m-0 text-[13px] font-medium">Fallback UI: something went wrong in this widget.</p>
          <p className="text-stone m-0 font-mono text-[11.5px]">{this.state.error}</p>
          <button type="button" onClick={() => this.setState({ error: null })} className="text-clay mt-1 text-[12px] underline">
            Try again (reset the boundary)
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function Fragile({ log }: Readonly<{ log: (text: string, tone?: ConsoleLine["tone"]) => void }>) {
  const [broken, setBroken] = useState(false);
  if (broken) throw new Error("render failed: cannot read properties of undefined (reading 'name')");
  return (
    <div className="border-line-3 bg-surface flex flex-wrap items-center gap-2 rounded-md border px-3 py-2">
      <span className="text-paper text-[13px]">A widget inside the boundary</span>
      <DemoButton tone="danger" onClick={() => setBroken(true)}>
        Throw during render
      </DemoButton>
      <DemoButton
        tone="danger"
        onClick={() => {
          try {
            throw new Error("handler failed");
          } catch (error) {
            log(`event handler threw "${(error as Error).message}": the boundary never sees it, so the handler must catch it`, "warn");
          }
        }}
      >
        Throw in a click handler
      </DemoButton>
    </div>
  );
}

export function ErrorBoundaryDemo() {
  const { lines, push } = useLog();
  return (
    <div className="flex flex-col gap-3">
      <div className="border-binary-line rounded-lg border border-dashed p-2">
        <span className={cn(DEMO_LABEL, "mb-1 block")}>&lt;ErrorBoundary&gt;</span>
        <Boundary onCatch={(message) => push(message, "error")}>
          <Fragile log={push} />
        </Boundary>
      </div>
      <p className="text-bone m-0 text-[12.5px]">This text is outside the boundary, so it survives whatever happens inside it.</p>
      <DemoConsole lines={lines} />
      <p className="text-ash m-0 text-[12px]/[1.6]">
        A render error is caught: the boundary swaps in its fallback and logs through componentDidCatch. An error in an event handler
        happens outside rendering, so boundaries don&apos;t catch it; here the handler catches it itself, which is what real handlers must do
        (or set state so the next render throws).
      </p>
    </div>
  );
}

// ── Portals ──────────────────────────────────────────────────────────────────

function Tooltip({ anchor, viaPortal, onClose }: Readonly<{ anchor: HTMLElement | null; viaPortal: boolean; onClose: () => void }>) {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  useLayoutEffect(() => {
    if (!viaPortal || !anchor) return;
    const update = () => {
      const rect = anchor.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    };
    update();
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [anchor, viaPortal]);

  const body = (
    <div
      role="tooltip"
      className={cn(
        "border-flame bg-surface-4 text-paper z-50 w-64 rounded-lg border px-3 py-2.5 text-[12.5px] shadow-xl",
        viaPortal ? "fixed" : "absolute top-12 left-3",
      )}
      style={viaPortal && position ? { top: position.top, left: position.left } : undefined}
    >
      A tooltip with plenty of text in it, so it reaches past the bottom of its card.
      <button type="button" onClick={onClose} className="text-clay mt-1.5 block text-[12px] underline">
        Close
      </button>
    </div>
  );
  return viaPortal ? createPortal(body, document.body) : body;
}

export function PortalDemo() {
  const [open, setOpen] = useState(false);
  const [viaPortal, setViaPortal] = useState(false);
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null);
  const { lines, push } = useLog();

  return (
    <div className="flex flex-col gap-3">
      <Switch label="render the tooltip through createPortal(…, document.body)" checked={viaPortal} onChange={setViaPortal} />
      <div
        onClick={() => push("click reached the card's onClick: React bubbles through the component tree, even from a portal")}
        className="border-line-3 bg-surface relative h-24 overflow-hidden rounded-lg border p-3"
      >
        <span className={cn(DEMO_LABEL, "block")}>a card with overflow: hidden</span>
        <button ref={setAnchor} type="button" onClick={() => setOpen((value) => !value)} className="bg-flame text-ink mt-1 rounded-md px-3 py-1.5 text-[12.5px] font-semibold">
          {open ? "Hide" : "Show"} tooltip
        </button>
        {open ? <Tooltip anchor={anchor} viaPortal={viaPortal} onClose={() => setOpen(false)} /> : null}
      </div>
      <DemoConsole lines={lines} empty="Open the tooltip and click inside it." />
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Inline, the tooltip is clipped by the card. Through a portal its DOM moves to the end of &lt;body&gt;, outside the card, so nothing
        clips it; yet clicking it still triggers the card&apos;s onClick, because React events follow the React tree, not the DOM.
      </p>
    </div>
  );
}

// ── Context re-renders ───────────────────────────────────────────────────────

/** Commit counts per component, kept outside React so counting never causes a render of its own. */
const commits = new Map<string, number>();
const commitListeners = new Set<() => void>();
let commitVersion = 0;
function countCommit(name: string) {
  commits.set(name, (commits.get(name) ?? 0) + 1);
  commitVersion += 1;
  queueMicrotask(() => commitListeners.forEach((listener) => listener()));
}
function useCommitCounts() {
  return useSyncExternalStore(
    (listener) => {
      commitListeners.add(listener);
      return () => commitListeners.delete(listener);
    },
    () => commitVersion,
    () => 0,
  );
}

function useCommitted(name: string) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    countCommit(name);
    const element = ref.current;
    if (!element) return;
    element.dataset.flash = "true";
    const timer = window.setTimeout(() => delete element.dataset.flash, 350);
    return () => window.clearTimeout(timer);
  });
  return ref;
}

type Theme = "dark" | "light";
const ThemeContext = createContext<{ theme: Theme } | null>(null);

const box = "rounded-md border border-line-3 px-2.5 py-1.5 transition-colors duration-300 data-[flash=true]:border-flame data-[flash=true]:bg-flame/15";

const ThemedButton = memo(function ThemedButton() {
  const value = use(ThemeContext);
  const ref = useCommitted("ThemedButton");
  return (
    <div ref={ref} className={box}>
      <span className="font-mono text-[11.5px] text-[var(--code-function)]">ThemedButton</span>{" "}
      <span className="text-ash text-[11px]">reads the context: theme = {value?.theme}</span>
    </div>
  );
});

const Toolbar = memo(function Toolbar() {
  const ref = useCommitted("Toolbar");
  return (
    <div ref={ref} className={box}>
      <span className="text-paper font-mono text-[11.5px]">Toolbar</span> <span className="text-ash text-[11px]">memo, no context</span>
      <div className="mt-1.5">
        <ThemedButton />
      </div>
    </div>
  );
});

const Sidebar = memo(function Sidebar() {
  const ref = useCommitted("Sidebar");
  return (
    <div ref={ref} className={box}>
      <span className="text-paper font-mono text-[11.5px]">Sidebar</span> <span className="text-ash text-[11px]">memo, no context</span>
    </div>
  );
});

const STABLE: Record<Theme, { theme: Theme }> = { dark: { theme: "dark" }, light: { theme: "light" } };

/** Subscribes to the counts on its own, so updating them never re-renders the tree being measured. */
function CommitCounts() {
  useCommitCounts();
  return (
    <Panel title="commits per component">
      <ul className="m-0 flex list-none flex-col gap-1 p-0 font-mono text-[12px]">
        {["Toolbar", "Sidebar", "ThemedButton"].map((name) => (
          <li key={name} className="flex justify-between">
            <span className="text-stone">{name}</span>
            <span className="text-paper tabular-nums">{commits.get(name) ?? 0}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export function ContextRenders() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [, setTick] = useState(0);
  const [inline, setInline] = useState(false);
  const value = inline ? { theme } : STABLE[theme];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <DemoButton tone="primary" onClick={() => setTheme((current) => (current === "dark" ? "light" : "dark"))}>
          Change the theme
        </DemoButton>
        <DemoButton onClick={() => setTick((current) => current + 1)}>Re-render App (same theme)</DemoButton>
        <Switch label="value={{ theme }} (new object every render)" checked={inline} onChange={setInline} />
      </div>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_12rem]">
        <ThemeContext value={value}>
          <div className="border-line-2 flex flex-col gap-1.5 rounded-lg border p-2">
            <span className="text-paper font-mono text-[11.5px]">App &lt;ThemeContext value=…&gt;</span>
            <Toolbar />
            <Sidebar />
          </div>
        </ThemeContext>
        <CommitCounts />
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Changing the theme re-renders only ThemedButton: memo stops Toolbar and Sidebar, and context reaches past them. Re-rendering App
        with the same theme renders nothing below it, until the inline object is switched on: then the value is a new object every time,
        and the consumer re-renders on every App render.
      </p>
    </div>
  );
}

// ── Refs ─────────────────────────────────────────────────────────────────────

export function RefsLab() {
  const inputRef = useRef<HTMLInputElement>(null);
  const clicks = useRef(0);
  const [shown, setShown] = useState<number | null>(null);
  const [renders, setRenders] = useState(0);
  const [size, setSize] = useState<{ width: number; height: number } | null>(null);

  const measure = useCallback((node: HTMLTextAreaElement | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setSize({ width: Math.round(entry.contentRect.width), height: Math.round(entry.contentRect.height) });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <Panel title="1 · reach a DOM node">
        <div className="flex flex-col gap-2">
          <input ref={inputRef} placeholder="Search" className="border-line-3 bg-well text-paper rounded-md border px-2.5 py-1.5 text-[12.5px] outline-none focus:border-flame" />
          <DemoButton onClick={() => inputRef.current?.focus()}>inputRef.current.focus()</DemoButton>
        </div>
      </Panel>
      <Panel title="2 · a value that doesn't render">
        <div className="flex flex-col gap-2">
          <DemoButton onClick={() => (clicks.current += 1)}>clicks.current += 1</DemoButton>
          <DemoButton onClick={() => setShown(clicks.current)}>Read clicks.current</DemoButton>
          <DemoButton onClick={() => setRenders((value) => value + 1)}>Update state ({renders})</DemoButton>
          <p className="text-bone m-0 font-mono text-[12px]">last read: {shown ?? "—"}</p>
          <p className="text-ash m-0 text-[11.5px]/[1.5]">The first button changes the ref and nothing re-renders. The value is there whenever you read it.</p>
        </div>
      </Panel>
      <Panel title="3 · callback ref with cleanup">
        <div className="flex flex-col gap-2">
          <textarea ref={measure} defaultValue="Drag my corner to resize me." className="border-line-3 bg-well text-paper h-16 min-h-10 w-full min-w-24 resize rounded-md border px-2.5 py-1.5 text-[12px] outline-none" />
          <p className="text-bone m-0 font-mono text-[12px]">{size ? `${size.width} × ${size.height}px` : "measuring…"}</p>
          <p className="text-ash m-0 text-[11.5px]/[1.5]">The callback runs when the node attaches and returns a cleanup (React 19) that disconnects the observer.</p>
        </div>
      </Panel>
    </div>
  );
}
