"use client";

/**
 * Accessibility demos: a WCAG contrast checker, a page whose landmarks are
 * computed from its real elements, the DOM next to the accessibility tree it
 * produces, focus after a client-side route change, and alt text.
 */
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { cn } from "@lib";
import { CodeView, DEMO_LABEL, DemoButton, Panel, Segmented, Switch } from "./ui";

// ── Contrast ─────────────────────────────────────────────────────────────────

type Rgb = [number, number, number];

function parseHex(hex: string): Rgb | null {
  const match = /^#?([\da-f]{3}|[\da-f]{6})$/i.exec(hex.trim());
  if (!match) return null;
  const digits = match[1].length === 3 ? [...match[1]].map((digit) => digit + digit).join("") : match[1];
  return [0, 2, 4].map((at) => Number.parseInt(digits.slice(at, at + 2), 16)) as Rgb;
}

const toHex = (rgb: Rgb) => `#${rgb.map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;

/** WCAG 2 relative luminance. */
export function luminance([r, g, b]: Rgb): number {
  const linear = (channel: number) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

/** Moves the foreground towards black or white, whichever reaches the target first. */
function fixForeground(foreground: Rgb, background: Rgb, target: number): Rgb | null {
  const candidates = [0, 255].map((end) => {
    for (let step = 1; step <= 100; step++) {
      const mixed = foreground.map((channel) => channel + ((end - channel) * step) / 100) as Rgb;
      if (contrastRatio(mixed, background) >= target) return { rgb: mixed, step };
    }
    return null;
  });
  const found = candidates.filter((candidate): candidate is { rgb: Rgb; step: number } => candidate !== null);
  if (found.length === 0) return null;
  return found.sort((a, b) => a.step - b.step)[0].rgb;
}

const CHECKS = [
  { label: "Normal text, AA", min: 4.5 },
  { label: "Large text, AA", min: 3 },
  { label: "UI components, AA", min: 3 },
  { label: "Normal text, AAA", min: 7 },
  { label: "Large text, AAA", min: 4.5 },
];

export function ContrastChecker() {
  const [foreground, setForeground] = useState("#777777");
  const [background, setBackground] = useState("#ffffff");
  const fg = parseHex(foreground);
  const bg = parseHex(background);
  const ratio = fg && bg ? contrastRatio(fg, bg) : null;
  const fix = fg && bg && ratio !== null && ratio < 4.5 ? fixForeground(fg, bg, 4.5) : null;

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-3">
        {(
          [
            ["text", foreground, setForeground],
            ["background", background, setBackground],
          ] as const
        ).map(([label, value, set]) => (
          <div key={label} className="flex items-center gap-2">
            <input type="color" aria-label={`${label} colour picker`} value={parseHex(value) ? toHex(parseHex(value) as Rgb) : "#000000"} onChange={(event) => set(event.target.value)} className="h-9 w-12 cursor-pointer rounded border-0 bg-transparent" />
            <label className="flex flex-col gap-0.5">
              <span className={DEMO_LABEL}>{label}</span>
              <input value={value} onChange={(event) => set(event.target.value)} spellCheck={false} className="border-line-3 bg-well text-paper w-28 rounded-md border px-2 py-1 font-mono text-[12.5px] outline-none focus:border-flame" />
            </label>
          </div>
        ))}
        <div className="flex flex-wrap gap-1.5">
          {[
            ["#777777", "#ffffff"],
            ["#767676", "#ffffff"],
            ["#e4572e", "#12100f"],
            ["#ffffff", "#e4572e"],
            ["#8c847d", "#12100f"],
          ].map(([text, back]) => (
            <DemoButton key={text + back} onClick={() => { setForeground(text); setBackground(back); }} className="font-mono">
              {text} on {back}
            </DemoButton>
          ))}
        </div>
        {fix ? (
          <DemoButton tone="primary" onClick={() => setForeground(toHex(fix))} className="self-start">
            Nearest AA text colour: {toHex(fix)}
          </DemoButton>
        ) : null}
      </div>
      <div className="flex flex-col gap-3">
        <div className="rounded-lg border border-black/20 p-4" style={{ background: bg ? toHex(bg) : undefined, color: fg ? toHex(fg) : undefined }}>
          <p className="m-0 text-[15px]">Normal text: the quick brown fox.</p>
          <p className="m-0 mt-1 text-[24px] leading-tight font-semibold">Large text, 24px</p>
          <span className="mt-2 inline-block rounded border-2 px-2 py-0.5 text-[13px]" style={{ borderColor: fg ? toHex(fg) : undefined }}>
            A bordered control
          </span>
        </div>
        <p className="text-paper m-0 font-mono text-[20px] font-semibold" aria-live="polite">
          {ratio === null ? "enter two hex colours" : `${(Math.floor(ratio * 100) / 100).toFixed(2)} : 1`}
        </p>
        <ul className="m-0 grid list-none grid-cols-1 gap-1 p-0 sm:grid-cols-2">
          {CHECKS.map((check) => {
            const pass = ratio !== null && ratio >= check.min;
            return (
              <li key={check.label} className="flex items-center justify-between gap-2 text-[12.5px]">
                <span className="text-stone">
                  {check.label} <span className="text-slate font-mono">≥ {check.min}</span>
                </span>
                <span className={cn("font-mono font-semibold", pass ? "text-mint-soft" : "text-rust")}>{pass ? "pass" : "fail"}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// ── Landmarks ────────────────────────────────────────────────────────────────

const SECTIONING = new Set(["article", "aside", "main", "nav", "section"]);

function accessibleName(element: Element): string {
  const labelledBy = element.getAttribute("aria-labelledby");
  if (labelledBy) {
    const text = labelledBy
      .split(/\s+/)
      .map((id) => element.ownerDocument.getElementById(id)?.textContent?.trim() ?? "")
      .join(" ")
      .trim();
    if (text) return text;
  }
  return element.getAttribute("aria-label")?.trim() ?? "";
}

/** The landmark role HTML-AAM maps an element to, or null when it is not a landmark. */
export function landmarkRole(element: Element): string | null {
  const tag = element.localName;
  const insideSectioning = () => {
    for (let parent = element.parentElement; parent; parent = parent.parentElement) {
      if (SECTIONING.has(parent.localName)) return true;
    }
    return false;
  };
  if (tag === "header") return insideSectioning() ? null : "banner";
  if (tag === "footer") return insideSectioning() ? null : "contentinfo";
  if (tag === "nav") return "navigation";
  if (tag === "main") return "main";
  if (tag === "aside") return "complementary";
  if (tag === "search") return "search";
  if (tag === "section" || tag === "form") return accessibleName(element) ? (tag === "section" ? "region" : "form") : null;
  return null;
}

export function PageOutline() {
  const [headerInMain, setHeaderInMain] = useState(false);
  const [labelSection, setLabelSection] = useState(false);
  const [labelNavs, setLabelNavs] = useState(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const [landmarks, setLandmarks] = useState<{ role: string; name: string; tag: string; element: HTMLElement }[]>([]);
  const [all, setAll] = useState<{ tag: string; role: string | null; element: HTMLElement }[]>([]);
  const [hovered, setHovered] = useState<HTMLElement | null>(null);
  const outlined = useRef<HTMLElement | null>(null);
  /** Outlines one region at a time by toggling a data attribute on the real element. */
  const highlight = (element: HTMLElement | null) => {
    if (outlined.current) delete outlined.current.dataset.qrHover;
    if (element) element.dataset.qrHover = "true";
    outlined.current = element;
    setHovered(element);
  };

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;
    const elements = [...page.querySelectorAll<HTMLElement>("header, footer, nav, main, aside, section, article, search")];
    setAll(elements.map((element) => ({ tag: element.localName, role: landmarkRole(element), element })));
    setLandmarks(
      elements.flatMap((element) => {
        const role = landmarkRole(element);
        return role ? [{ role, name: accessibleName(element), tag: element.localName, element }] : [];
      }),
    );
  }, [headerInMain, labelSection, labelNavs]);

  const roleOf = (element: HTMLElement | null) => all.find((entry) => entry.element === element);
  const region = (extra: string) =>
    cn(
      "border-line-3 relative rounded-md border border-dashed px-2 pt-5 pb-2 transition-colors",
      "data-[qr-hover=true]:border-flame data-[qr-hover=true]:bg-flame/10",
      extra,
    );
  const tagLabel = "pointer-events-none absolute top-1 left-2 font-mono text-[10px]";
  const hover = {
    onMouseOver: (event: React.MouseEvent<HTMLElement>) => {
      event.stopPropagation();
      highlight(event.currentTarget);
    },
    onMouseLeave: () => highlight(null),
  };
  const SiteHeader = (
    <header {...hover} tabIndex={-1} className={region("bg-surface-4/60")}>
      <span className={tagLabel}>header</span>
      <span className="text-paper text-[12px] font-semibold">Acme</span>
      <nav {...hover} aria-label={labelNavs ? "Primary" : undefined} tabIndex={-1} className={region("mt-1")}>
        <span className={tagLabel}>nav</span>
        <span className="text-stone text-[11px]">Home · Shop · Blog</span>
      </nav>
    </header>
  );

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5">
          <Switch label="put the site header inside <main>" checked={headerInMain} onChange={setHeaderInMain} />
          <Switch label="give the section a heading id (aria-labelledby)" checked={labelSection} onChange={setLabelSection} />
          <Switch label="label the two navs" checked={labelNavs} onChange={setLabelNavs} />
        </div>
        <div ref={pageRef} className="bg-surface flex flex-col gap-2 rounded-lg p-2 text-[12px]" onMouseLeave={() => highlight(null)}>
          {headerInMain ? null : SiteHeader}
          <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_8rem]">
            <main {...hover} tabIndex={-1} className={region("")}>
              <span className={tagLabel}>main</span>
              {headerInMain ? SiteHeader : null}
              <article {...hover} tabIndex={-1} className={region("mt-1")}>
                <span className={tagLabel}>article</span>
                <header {...hover} className={region("")}>
                  <span className={tagLabel}>header</span>
                  <h3 className="text-paper m-0 text-[12px]">Post title</h3>
                </header>
                <section {...hover} aria-labelledby={labelSection ? "qr-outline-heading" : undefined} tabIndex={-1} className={region("mt-1")}>
                  <span className={tagLabel}>section</span>
                  <h4 id="qr-outline-heading" className="text-bone m-0 text-[11.5px]">
                    Ingredients
                  </h4>
                </section>
                <footer {...hover} className={region("mt-1")}>
                  <span className={tagLabel}>footer</span>
                  <span className="text-stone text-[11px]">Tags · Share</span>
                </footer>
              </article>
            </main>
            <aside {...hover} tabIndex={-1} className={region("")}>
              <span className={tagLabel}>aside</span>
              <span className="text-stone text-[11px]">Related</span>
            </aside>
          </div>
          <footer {...hover} tabIndex={-1} className={region("")}>
            <span className={tagLabel}>footer</span>
            <nav {...hover} aria-label={labelNavs ? "Footer" : undefined} tabIndex={-1} className={region("")}>
              <span className={tagLabel}>nav</span>
              <span className="text-stone text-[11px]">About · Contact</span>
            </nav>
          </footer>
        </div>
        <p className="text-bone m-0 min-h-5 font-mono text-[12px]" aria-live="polite">
          {hovered ? `<${hovered.localName}> → ${roleOf(hovered)?.role ?? "no landmark (generic)"}` : "Hover a region to see its role."}
        </p>
      </div>
      <Panel title={`Landmarks a screen reader lists (${landmarks.length})`}>
        <ul className="m-0 flex list-none flex-col gap-1 p-0">
          {landmarks.map((landmark, index) => {
            const duplicate = landmarks.filter((other) => other.role === landmark.role).length > 1 && !landmark.name;
            return (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => {
                    landmark.element.focus();
                    highlight(landmark.element);
                  }}
                  className="hover:bg-surface-4 flex w-full items-baseline justify-between gap-2 rounded px-1.5 py-1 text-left"
                >
                  <span className="font-mono text-[12px]">
                    <span className="text-[var(--code-function)]">{landmark.role}</span>
                    {landmark.name ? <span className="text-bone"> &quot;{landmark.name}&quot;</span> : null}
                  </span>
                  <span className={cn("font-mono text-[10.5px]", duplicate ? "text-rust" : "text-slate")}>
                    {duplicate ? "unlabelled duplicate" : `<${landmark.tag}>`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <p className="text-ash m-0 mt-2 text-[11.5px]/[1.55]">
          Only top-level headers and footers become banner and contentinfo; a section is a region only when it has a name.
        </p>
      </Panel>
    </div>
  );
}

// ── Accessibility tree ───────────────────────────────────────────────────────

interface AxNode {
  role: string;
  name?: string;
  note?: string;
  children?: AxNode[];
}

const TREES: { id: string; label: string; dom: string; tree: AxNode[]; note: string }[] = [
  {
    id: "buttons",
    label: "button vs div",
    dom: `<button>Save</button>
<div class="btn" onclick="save()">Save</div>
<div role="button" tabindex="0">Save</div>`,
    tree: [
      { role: "button", name: "Save", note: "focusable, Enter and Space work" },
      { role: "text", name: "Save", note: "just text: not focusable, no role" },
      { role: "button", name: "Save", note: "focusable, but you must add the key handlers" },
    ],
    note: "The div with a click handler is invisible as a control: keyboard and screen reader users can't find or press it.",
  },
  {
    id: "images",
    label: "images",
    dom: `<img src="chart.png" alt="Sales doubled from March to June">
<img src="divider.png" alt="">
<img src="IMG_2041.jpg">`,
    tree: [
      { role: "image", name: "Sales doubled from March to June" },
      { role: "(removed)", note: 'alt="" marks it decorative' },
      { role: "image", name: "", note: "no name: some screen readers read the file name instead" },
    ],
    note: "An empty alt removes the image from the tree; a missing alt leaves an unnamed image behind.",
  },
  {
    id: "labels",
    label: "form labels",
    dom: `<label for="email">Email</label>
<input id="email" type="email">

<input type="text" placeholder="Search">

<span>Phone</span>
<input type="tel">`,
    tree: [
      { role: "text", name: "Email" },
      { role: "textbox", name: "Email", note: "named by its <label>" },
      { role: "textbox", name: "Search", note: "placeholder is a weak fallback name" },
      { role: "text", name: "Phone" },
      { role: "textbox", name: "", note: "no name: the span isn't associated" },
    ],
    note: "A label must be associated (for/id, or wrapping the input) to name it; text that only sits nearby doesn't count.",
  },
  {
    id: "hidden",
    label: "hidden content",
    dom: `<p>Visible to everyone</p>
<p aria-hidden="true">Visual only</p>
<p hidden>Hidden from everyone</p>
<p class="sr-only">Screen reader only</p>`,
    tree: [
      { role: "paragraph", children: [{ role: "text", name: "Visible to everyone" }] },
      { role: "(removed)", note: "aria-hidden removes it, but it is still visible" },
      { role: "(removed)", note: "hidden (display: none) removes it for everyone" },
      { role: "paragraph", children: [{ role: "text", name: "Screen reader only" }], note: "visually clipped, still in the tree" },
    ],
    note: "aria-hidden hides from assistive technology only; display: none and hidden hide from everyone; an sr-only class hides visually only.",
  },
  {
    id: "structure",
    label: "headings and lists",
    dom: `<h2>Plans</h2>
<div class="title">Pricing</div>
<ul>
  <li>Free</li>
  <li>Pro</li>
</ul>`,
    tree: [
      { role: "heading", name: "Plans", note: "level 2" },
      { role: "text", name: "Pricing", note: "styled like a heading, but it isn't one" },
      {
        role: "list",
        note: "2 items",
        children: [
          { role: "listitem", name: "Free" },
          { role: "listitem", name: "Pro" },
        ],
      },
    ],
    note: "Screen reader users jump by heading and hear list sizes; neither exists unless the markup says so.",
  },
];

function AxTree({ nodes }: Readonly<{ nodes: readonly AxNode[] }>) {
  return (
    <ul className="m-0 flex list-none flex-col gap-1 p-0">
      {nodes.map((node, index) => (
        <li key={index} className="font-mono text-[12px]">
          <span className={node.role === "(removed)" ? "text-slate line-through" : node.role === "text" ? "text-stone" : "text-[var(--code-function)]"}>
            {node.role}
          </span>
          {node.name !== undefined ? <span className={node.name ? "text-paper" : "text-rust"}> {node.name ? `"${node.name}"` : "(no name)"}</span> : null}
          {node.note ? <span className="text-ash font-sans text-[11.5px]"> · {node.note}</span> : null}
          {node.children ? (
            <div className="border-line-3 mt-1 ml-2 border-l pl-3">
              <AxTree nodes={node.children} />
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

export function AccessibilityTree() {
  const [id, setId] = useState(TREES[0].id);
  const scenario = TREES.find((tree) => tree.id === id) ?? TREES[0];

  return (
    <div className="flex flex-col gap-3">
      <Segmented label="Snippet" value={id} options={TREES.map((tree) => ({ value: tree.id, label: tree.label }))} onChange={setId} />
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={DEMO_LABEL}>the DOM</span>
          <CodeView code={scenario.dom} />
        </div>
        <div className="flex min-w-0 flex-col gap-1.5">
          <span className={DEMO_LABEL}>what the accessibility tree exposes</span>
          <div className="border-line-3 bg-surface rounded-md border px-3 py-2.5">
            <AxTree nodes={scenario.tree} />
          </div>
        </div>
      </div>
      <p className="text-bone m-0 text-[13px]/[1.6]">{scenario.note}</p>
      <p className="text-ash m-0 text-[11.5px]">
        Simplified from what Chrome&apos;s Accessibility panel shows; open DevTools → Elements → Accessibility on any page to see the real
        tree.
      </p>
    </div>
  );
}

// ── Focus on route change ────────────────────────────────────────────────────

const ROUTES = [
  { id: "home", title: "Home", body: "Welcome back. Pick a section above." },
  { id: "products", title: "Products", body: "Twelve products, sorted by popularity." },
  { id: "about", title: "About", body: "A small team making small tools." },
];

function describeElement(element: Element | null): string {
  if (!element || element === document.body) return "the page body: focus was lost";
  const name = element.getAttribute("aria-label") ?? element.textContent?.trim().slice(0, 30) ?? "";
  const role = element.localName === "a" ? "link" : /^h[1-6]$/.test(element.localName) ? `heading level ${element.localName[1]}` : element.localName;
  return `${role} "${name}"`;
}

export function RouteFocus() {
  const [route, setRoute] = useState(ROUTES[0]);
  const [manage, setManage] = useState(true);
  const [focusReport, setFocusReport] = useState("Click a link in the mini app.");
  const [announcement, setAnnouncement] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);
  const navigations = useRef(0);

  // Runs after each navigation only; toggling the switch must not move focus.
  const afterNavigation = useEffectEvent(() => {
    if (manage) {
      headingRef.current?.focus();
      setAnnouncement(`${route.title} page`);
    }
  });
  useEffect(() => {
    if (navigations.current === 0) return;
    afterNavigation();
    const timer = window.setTimeout(() => setFocusReport(`After navigating, focus is on: ${describeElement(document.activeElement)}`), 50);
    return () => window.clearTimeout(timer);
  }, [route]);

  return (
    <div className="flex flex-col gap-3">
      <Switch label="move focus to the new page's heading" checked={manage} onChange={setManage} />
      <div className="border-line-3 bg-surface overflow-hidden rounded-lg border">
        <nav aria-label="Mini app" className="border-line bg-surface-4 flex gap-4 border-b px-3 py-2">
          {ROUTES.map((candidate) => (
            <a
              key={candidate.id}
              href={`#route-${candidate.id}`}
              aria-current={candidate.id === route.id ? "page" : undefined}
              onClick={(event) => {
                event.preventDefault();
                navigations.current += 1;
                setAnnouncement("");
                setRoute(candidate);
              }}
              className={cn("text-[13px] underline-offset-4 focus-visible:outline-2 focus-visible:outline-flame", candidate.id === route.id ? "text-paper underline" : "text-clay hover:underline")}
            >
              {candidate.title}
            </a>
          ))}
        </nav>
        <div className="px-4 py-4">
          <h1 ref={headingRef} tabIndex={-1} className="text-parchment m-0 mb-1 text-[20px] font-semibold focus:outline-2 focus:outline-offset-2 focus:outline-flame">
            {route.title}
          </h1>
          <p className="text-stone m-0 text-[13px]">{route.body}</p>
        </div>
      </div>
      <p className="text-bone m-0 font-mono text-[12px]" aria-live="polite">
        {focusReport}
      </p>
      <div role="status" className="sr-only">
        {announcement}
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Try it with the keyboard: Tab to a link and press Enter. Without focus management, the next Tab continues from the old link, and a
        screen reader announces nothing about the new page.
      </p>
    </div>
  );
}

// ── Alt text ─────────────────────────────────────────────────────────────────

const CHART_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="120" viewBox="0 0 240 120"><rect width="240" height="120" fill="#1e1b19"/><g fill="#e4572e">${[30, 42, 55, 71, 90, 108]
  .map((height, index) => `<rect x="${20 + index * 36}" y="${110 - height}" width="24" height="${height}" rx="3"/>`)
  .join("")}</g></svg>`;
const CHART_URL = `data:image/svg+xml,${encodeURIComponent(CHART_SVG)}`;
const BROKEN_URL = "data:image/png;base64,broken";

type AltMode = "missing" | "empty" | "redundant" | "descriptive";
const ALT: Record<AltMode, string | undefined> = {
  missing: undefined,
  empty: "",
  redundant: "Image of a chart",
  descriptive: "Sales doubled between March and June",
};
const ANNOUNCED: Record<AltMode, string> = {
  missing: "“chart-q2, image”: with no alt, many screen readers fall back to the file name",
  empty: "(nothing: the image is skipped as decorative)",
  redundant: "“Image of a chart, image”: says nothing useful, and says image twice",
  descriptive: "“Sales doubled between March and June, image”",
};

export function AltText() {
  const [mode, setMode] = useState<AltMode>("descriptive");
  const [loads, setLoads] = useState(true);

  return (
    <div className="grid gap-4 md:grid-cols-[auto_minmax(0,1fr)]">
      <div className="border-line-3 bg-surface grid h-[136px] w-[256px] place-items-center rounded-md border p-2 text-[12px] text-bone">
        {/* eslint-disable-next-line @next/next/no-img-element -- the demo is about the plain img element and its alt */}
        <img key={`${mode}-${loads}`} src={loads ? CHART_URL : BROKEN_URL} alt={ALT[mode]} width={240} height={120} className="max-w-full" />
      </div>
      <div className="flex flex-col gap-3">
        <Segmented
          label="alt attribute"
          value={mode}
          options={[
            { value: "missing", label: "no alt" },
            { value: "empty", label: 'alt=""' },
            { value: "redundant", label: '"Image of…"' },
            { value: "descriptive", label: "descriptive" },
          ]}
          onChange={setMode}
        />
        <Switch label="the image loads" checked={loads} onChange={setLoads} />
        <code className="text-bone font-mono text-[12px] break-all">
          &lt;img src=&quot;chart-q2.png&quot;{ALT[mode] === undefined ? "" : ` alt="${ALT[mode]}"`}&gt;
        </code>
        <div>
          <div className={DEMO_LABEL}>a screen reader announces</div>
          <p className={cn("m-0 mt-1 text-[13px]", mode === "descriptive" ? "text-mint-soft" : mode === "empty" ? "text-stone" : "text-peach")}>{ANNOUNCED[mode]}</p>
        </div>
        <p className="text-ash m-0 text-[12px]/[1.6]">
          Turn loading off: the browser itself shows the alt text in place of a broken image (the frame on the left is real rendering).
          The empty alt is right only when the chart is decoration, and here it isn&apos;t.
        </p>
      </div>
    </div>
  );
}
