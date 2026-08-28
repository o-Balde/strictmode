"use client";

/**
 * Where questions come from.
 *
 * Callers ask for question bodies by id and know nothing else — not whether
 * they arrive from the CDN, a function, or a cache. That seam is what let
 * highlighting move out of the request path without touching a single caller.
 *
 * Two adapters, both in use:
 *
 *   staticSource  — one immutable JSON file per question under /q/, written at
 *                   build time with the Shiki markup already rendered. Served by
 *                   the CDN: no function invocation, no Active CPU.
 *   routeSource   — the /api/questions handler. Reached only when a static file
 *                   is missing, which happens when a client left open across a
 *                   deploy asks for an id the new build no longer emits.
 */
import type { QuestionPayload } from "./question-payload";

export interface QuestionSource {
  getQuestions(ids: string[]): Promise<QuestionPayload[]>;
}

/**
 * Content is immutable and content-addressed by id, so cache it hard in
 * production. In development the payloads are rewritten on every build, and a
 * forced cache would keep serving the previous run's question.
 */
const STATIC_FETCH: RequestInit = {
  cache: process.env.NODE_ENV === "production" ? "force-cache" : "no-store",
};

export const staticSource: QuestionSource = {
  async getQuestions(ids) {
    const settled = await Promise.allSettled(
      ids.map(async (id) => {
        const res = await fetch(`/q/${encodeURIComponent(id)}.json`, STATIC_FETCH);
        if (!res.ok) throw new Error(`static payload ${id}: ${res.status}`);
        return (await res.json()) as QuestionPayload;
      }),
    );
    // A missing file is not a failed drill — fall back for just those ids.
    const missing = ids.filter((_, i) => settled[i].status === "rejected");
    const recovered = missing.length ? await routeSource.getQuestions(missing) : [];
    const byId = new Map<string, QuestionPayload>();
    for (const r of settled) if (r.status === "fulfilled") byId.set(r.value.id, r.value);
    for (const q of recovered) byId.set(q.id, q);

    // Preserve the caller's order — it is the drill order.
    return ids.map((id) => byId.get(id)).filter((q): q is QuestionPayload => Boolean(q));
  },
};

export const routeSource: QuestionSource = {
  async getQuestions(ids) {
    const res = await fetch("/api/questions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ids }),
    });
    if (!res.ok) throw new Error(`questions ${res.status}`);
    const data = (await res.json()) as { questions: QuestionPayload[] };
    return data.questions ?? [];
  },
};

export const questionSource: QuestionSource = staticSource;
