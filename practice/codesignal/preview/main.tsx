import { StrictMode, type ComponentType, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { serve, type Routes } from "../shared/mock-server";
import { GROCERIES } from "../widgets/nested-checkboxes/tree";
import "./preview.css";

/**
 * The live preview, like the pane on the right of CodeSignal's IDE.
 *
 *   /?mock=task-board              your workspace
 *   /?mock=task-board&solution     the reference solution
 *   /?widget=otp-input             a widget drill
 *   &latency=1500                  slow the mock API down (ms, default 400)
 *   &chaos=0.3                     fail 30% of API requests with a 500
 *
 * It renders inside <StrictMode>, as Vite's and CRA's templates do: effects
 * mount, unmount and mount again in development, so a fetch-on-mount that is
 * not idempotent shows up here as duplicated rows.
 */
const params = new URLSearchParams(window.location.search);
const variant = params.has("solution") ? "solution" : "src";
const latency = Number(params.get("latency") ?? 400);
const chaos = Number(params.get("chaos") ?? 0);

type RouteModule = { routes?: Routes; createRoutes?: () => Routes };

const mockApps = import.meta.glob<{ default: ComponentType }>("../mocks/*/{src,solution}/App.tsx");
const mockServers = import.meta.glob<RouteModule>("../mocks/*/server.ts");
const widgetModules = import.meta.glob<Record<string, unknown>>("../widgets/*/{src,solution}/*.tsx");

/** The bug hunt talks to the ledger's API. */
const SERVER_OF: Record<string, string> = { "ledger-bugs": "ledger" };

const WIDGET_FILES: Record<string, string> = {
  typewriter: "Typewriter",
  "otp-input": "OtpInput",
  "nested-checkboxes": "CheckboxTree",
  "progress-queue": "ProgressQueue",
  autocomplete: "Autocomplete",
};

const FRAMEWORKS = ["react", "redux", "remix", "recoil", "angular", "astro", "svelte", "solid", "vue", "vite"];

const WIDGET_ROUTES: Routes = {
  "GET /api/flag": () => ({ text: "Welcome to the final round. Type carefully." }),
};

const WIDGET_DEMOS: Record<string, (module: Record<string, unknown>) => ReactNode> = {
  typewriter: (module) => {
    const TypewriterFromUrl = module.TypewriterFromUrl as ComponentType<{ url: string }>;
    return <TypewriterFromUrl url="/api/flag" />;
  },
  "otp-input": (module) => {
    const OtpInput = module.OtpInput as ComponentType<{ onComplete: (code: string) => void }>;
    return <OtpInput onComplete={(code) => console.info("onComplete", code)} />;
  },
  "nested-checkboxes": (module) => {
    const CheckboxTree = module.CheckboxTree as ComponentType<{ nodes: typeof GROCERIES }>;
    return <CheckboxTree nodes={GROCERIES} />;
  },
  "progress-queue": (module) => {
    const ProgressQueue = module.ProgressQueue as ComponentType;
    return <ProgressQueue />;
  },
  autocomplete: (module) => {
    const Autocomplete = module.Autocomplete as ComponentType<{
      search: (query: string, signal: AbortSignal) => Promise<string[]>;
    }>;
    return <Autocomplete search={fakeSearch} />;
  },
};

function fakeSearch(query: string, signal: AbortSignal): Promise<string[]> {
  return new Promise((resolve, reject) => {
    // Shorter queries answer slower, so typing fast produces out-of-order answers.
    const timer = setTimeout(
      () => resolve(FRAMEWORKS.filter((name) => name.startsWith(query.toLowerCase()))),
      1200 / query.length,
    );
    signal.addEventListener("abort", () => {
      clearTimeout(timer);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

function installMockApi(routes: Routes) {
  const realFetch = window.fetch.bind(window);
  window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
    const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
    const url = new URL(href, window.location.href);
    if (!url.pathname.startsWith("/api/")) return realFetch(input, init);

    await new Promise((resolve) => setTimeout(resolve, latency));
    if (Math.random() < chaos) {
      console.info(`[mock api] ${init?.method ?? "GET"} ${url.pathname}${url.search} → 500 (chaos)`);
      return new Response(JSON.stringify({ error: "chaos" }), { status: 500 });
    }
    const response = await serve(routes, input, init);
    console.info(`[mock api] ${init?.method ?? "GET"} ${url.pathname}${url.search} → ${response.status}`);
    return response;
  };
}

async function main() {
  const root = createRoot(document.getElementById("root")!);
  const mock = params.get("mock");
  const widget = params.get("widget");

  if (mock) {
    const load = mockApps[`../mocks/${mock}/${variant}/App.tsx`];
    const serverModule = mockServers[`../mocks/${SERVER_OF[mock] ?? mock}/server.ts`];
    if (!load) return root.render(<Index message={`No mock called "${mock}".`} />);
    if (serverModule) {
      const server = await serverModule();
      installMockApi(server.createRoutes?.() ?? server.routes ?? {});
    }
    const { default: App } = await load();
    return root.render(
      <StrictMode>
        <Banner name={mock} />
        <App />
      </StrictMode>,
    );
  }

  if (widget) {
    const file = WIDGET_FILES[widget];
    const load = file ? widgetModules[`../widgets/${widget}/${variant}/${file}.tsx`] : undefined;
    if (!load) return root.render(<Index message={`No previewable widget called "${widget}".`} />);
    installMockApi(WIDGET_ROUTES);
    const module = await load();
    return root.render(
      <StrictMode>
        <Banner name={widget} />
        {WIDGET_DEMOS[widget](module)}
      </StrictMode>,
    );
  }

  root.render(<Index />);
}

function Banner({ name }: { name: string }) {
  return (
    <p className="preview-banner">
      {name} · {variant === "solution" ? "reference solution" : "your workspace"} · API latency {latency}ms
      {chaos > 0 ? ` · ${Math.round(chaos * 100)}% failures` : ""}
    </p>
  );
}

function Index({ message }: { message?: string }) {
  const mocks = [...new Set(Object.keys(mockApps).map((path) => path.split("/")[2]))];
  return (
    <main className="preview-index">
      {message ? <p className="preview-error">{message}</p> : null}
      <h1>CodeSignal practice preview</h1>
      <h2>Mocks</h2>
      <ul>
        {mocks.map((name) => (
          <li key={name}>
            <a href={`?mock=${name}`}>{name}</a> · <a href={`?mock=${name}&solution`}>solution</a>
          </li>
        ))}
      </ul>
      <h2>Widgets</h2>
      <ul>
        {Object.keys(WIDGET_FILES).map((name) => (
          <li key={name}>
            <a href={`?widget=${name}`}>{name}</a> · <a href={`?widget=${name}&solution`}>solution</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

void main();
