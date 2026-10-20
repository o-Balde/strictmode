/**
 * A tiny in-memory API.
 *
 * Each mock declares its endpoints as a route table in its `server.ts`. The
 * specs serve that table through a stubbed `fetch`; the preview serves it
 * through a patched `window.fetch` with some latency. Either way your app calls
 * plain `fetch("/api/...")`, exactly as it would against CodeSignal's endpoint.
 *
 * It behaves like the real thing where candidates get caught out: a 4xx/5xx
 * still RESOLVES (check `response.ok`), only a dropped connection rejects, and
 * an aborted request rejects with an `AbortError`.
 */
export interface MockRequest {
  method: string;
  url: URL;
  params: Record<string, string>;
  body: unknown;
}

export interface MockReply {
  status?: number;
  /** Sent as JSON. */
  body?: unknown;
  /** Sent as text/plain instead of `body`. */
  text?: string;
  /** Rejects the fetch itself, the way a dropped connection does. */
  networkError?: boolean;
}

export type Handler = (request: MockRequest) => MockReply | Promise<MockReply>;

/** Keys look like `"GET /api/users/:id"`. */
export type Routes = Record<string, Handler>;

export const ok = (body: unknown): MockReply => ({ status: 200, body });

export const fail = (status = 500, body: unknown = { error: "Internal Server Error" }): MockReply => ({
  status,
  body,
});

export const offline = (): MockReply => ({ networkError: true });

export interface ParsedRequest {
  method: string;
  url: URL;
  body: unknown;
  signal?: AbortSignal | null;
}

export function parseRequest(input: RequestInfo | URL, init?: RequestInit): ParsedRequest {
  const href = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const method = (init?.method ?? (typeof input === "object" && "method" in input ? input.method : "GET")).toUpperCase();
  const body = typeof init?.body === "string" && init.body !== "" ? JSON.parse(init.body) : undefined;
  return { method, url: new URL(href, "http://localhost"), body, signal: init?.signal };
}

export async function serve(routes: Routes, input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  const request = parseRequest(input, init);
  throwIfAborted(request.signal);

  const match = matchRoute(routes, request.method, request.url.pathname);
  const pending = match
    ? Promise.resolve(match.handler({ method: request.method, url: request.url, params: match.params, body: request.body }))
    : Promise.resolve(fail(404, { error: `No route for ${request.method} ${request.url.pathname}` }));

  const reply = await raceAbort(pending, request.signal);
  if (reply.networkError) throw new TypeError("Failed to fetch");

  if (reply.text !== undefined) {
    return new Response(reply.text, { status: reply.status ?? 200, headers: { "Content-Type": "text/plain" } });
  }
  return new Response(reply.body === undefined ? null : JSON.stringify(reply.body), {
    status: reply.status ?? 200,
    headers: { "Content-Type": "application/json" },
  });
}

function matchRoute(routes: Routes, method: string, pathname: string) {
  for (const [key, handler] of Object.entries(routes)) {
    const [routeMethod, pattern] = key.split(" ");
    if (routeMethod !== method) continue;
    const params = matchPath(pattern, pathname);
    if (params) return { handler, params };
  }
  return null;
}

function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const want = pattern.split("/");
  const have = pathname.split("/");
  if (want.length !== have.length) return null;

  const params: Record<string, string> = {};
  for (let index = 0; index < want.length; index += 1) {
    if (want[index].startsWith(":")) params[want[index].slice(1)] = decodeURIComponent(have[index]);
    else if (want[index] !== have[index]) return null;
  }
  return params;
}

function abortError() {
  return new DOMException("The operation was aborted.", "AbortError");
}

function throwIfAborted(signal: AbortSignal | null | undefined) {
  if (signal?.aborted) throw abortError();
}

function raceAbort<T>(promise: Promise<T>, signal: AbortSignal | null | undefined): Promise<T> {
  if (!signal) return promise;
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(abortError());
    signal.addEventListener("abort", onAbort, { once: true });
    promise.then(
      (value) => {
        signal.removeEventListener("abort", onAbort);
        if (signal.aborted) reject(abortError());
        else resolve(value);
      },
      (error: unknown) => {
        signal.removeEventListener("abort", onAbort);
        reject(error);
      },
    );
  });
}
