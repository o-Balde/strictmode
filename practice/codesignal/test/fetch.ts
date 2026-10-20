import { vi } from "vitest";
import { parseRequest, serve, type Routes } from "../shared/mock-server";

export interface FetchCall {
  method: string;
  /** Path plus query string, e.g. `/api/transactions?page=1`. */
  path: string;
  body: unknown;
}

/**
 * Replaces the global `fetch` with the mock's route table for one test.
 * `calls` records every request, so a spec can assert what was (not) fetched.
 */
export function stubApi(routes: Routes) {
  const calls: FetchCall[] = [];

  vi.stubGlobal(
    "fetch",
    vi.fn((input: RequestInfo | URL, init?: RequestInit) => {
      const { method, url, body } = parseRequest(input, init);
      calls.push({ method, path: url.pathname + url.search, body });
      return serve(routes, input, init);
    }),
  );

  return {
    calls,
    count: (method: string, path: string) =>
      calls.filter((call) => call.method === method && call.path === path).length,
  };
}

/** A promise you settle by hand: how a spec holds a response back to test loading states and races. */
export function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
