import rawIndex from "@/generated/binary-card-index.json";
import type { QuestionLevel } from "@/data/types";
import type {
  ActiveBinarySession,
  BinaryCardIndexRow,
  BinaryCardPayload,
  BinarySessionResult,
} from "@/data/binary-types";
import type { BinaryProgress } from "@/lib/progress";
import { compareDue, isDue } from "@/lib/scheduler";
import { dayKey } from "@/lib/dates";

export const BINARY_DECK_SIZE = 10;
export const BINARY_BANK_SIZE = 180;
export const ACTIVE_BINARY_SESSION_KEY = "strictmode.binary.active.v1";
export const BINARY_RESULT_KEY = "strictmode.binary.lastResult.v1";

export const BINARY_CARD_INDEX = rawIndex as BinaryCardIndexRow[];
export const BINARY_INDEX_BY_ID = new Map(
  BINARY_CARD_INDEX.map((row) => [row.id, row]),
);

export interface ComposeBinaryDeckOptions {
  difficulty: QuestionLevel;
  progress: BinaryProgress;
  today?: string;
  seed?: number;
}

/** Due reviews lead, then unseen cards, then seen cards when the pool recycles. */
export function composeBinaryDeck({
  difficulty,
  progress,
  today = dayKey(),
  seed = Math.floor(Math.random() * 2 ** 31),
}: ComposeBinaryDeckOptions): BinaryCardIndexRow[] {
  const pool = BINARY_CARD_INDEX.filter((row) => row.level === difficulty);
  const seen = new Set(progress.seenCardIds);
  const random = rng(seed);
  const picked: BinaryCardIndexRow[] = [];
  const taken = new Set<string>();

  const take = (rows: BinaryCardIndexRow[]) => {
    for (const row of rows) {
      if (picked.length >= BINARY_DECK_SIZE) break;
      if (taken.has(row.id)) continue;
      taken.add(row.id);
      picked.push(row);
    }
  };

  take(
    pool
      .filter((row) => isDue(progress.reviewState[row.id], today))
      .sort((a, b) =>
        compareDue(progress.reviewState[a.id], progress.reviewState[b.id]),
      ),
  );
  take(shuffle(pool.filter((row) => !seen.has(row.id)), random));
  take(shuffle(pool.filter((row) => seen.has(row.id)), random));

  return picked;
}

export async function getBinaryCards(
  ids: string[],
): Promise<BinaryCardPayload[]> {
  const cards = await Promise.all(
    ids.map(async (id) => {
      const response = await fetch(`/b/${encodeURIComponent(id)}.json`, {
        cache: "force-cache",
      });
      if (!response.ok) throw new Error(`binary card ${id}: ${response.status}`);
      return (await response.json()) as BinaryCardPayload;
    }),
  );
  const byId = new Map(cards.map((card) => [card.id, card]));
  return ids.map((id) => byId.get(id)).filter((card): card is BinaryCardPayload => Boolean(card));
}

export function loadActiveBinarySession(
  today = dayKey(),
): ActiveBinarySession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ACTIVE_BINARY_SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as ActiveBinarySession;
    if (!isValidActiveSession(session) || session.day !== today) {
      window.localStorage.removeItem(ACTIVE_BINARY_SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    window.localStorage.removeItem(ACTIVE_BINARY_SESSION_KEY);
    return null;
  }
}

export function saveActiveBinarySession(session: ActiveBinarySession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACTIVE_BINARY_SESSION_KEY, JSON.stringify(session));
  } catch {
    /* The current in-memory session remains playable if storage is unavailable. */
  }
}

export function clearActiveBinarySession(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACTIVE_BINARY_SESSION_KEY);
}

export function storeBinaryResult(result: BinarySessionResult): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(BINARY_RESULT_KEY, JSON.stringify(result));
  } catch {
    /* Summary navigation still succeeds; it will render its empty fallback. */
  }
}

export function readBinaryResult(): BinarySessionResult | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(BINARY_RESULT_KEY);
    return raw ? (JSON.parse(raw) as BinarySessionResult) : null;
  } catch {
    return null;
  }
}

function isValidActiveSession(value: unknown): value is ActiveBinarySession {
  if (!value || typeof value !== "object") return false;
  const session = value as Partial<ActiveBinarySession>;
  return (
    session.version === 1 &&
    typeof session.day === "string" &&
    ["junior", "intermediate", "senior"].includes(session.difficulty ?? "") &&
    typeof session.countsForDaily === "boolean" &&
    Array.isArray(session.cardIds) &&
    session.cardIds.length === BINARY_DECK_SIZE &&
    session.cardIds.every((id) => typeof id === "string") &&
    typeof session.index === "number" &&
    session.index >= 0 &&
    session.index < BINARY_DECK_SIZE &&
    Array.isArray(session.answers) &&
    typeof session.showingExplanation === "boolean"
  );
}

function rng(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value = (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(items: T[], random: () => number): T[] {
  const output = [...items];
  for (let index = output.length - 1; index > 0; index--) {
    const swapWith = Math.floor(random() * (index + 1));
    [output[index], output[swapWith]] = [output[swapWith], output[index]];
  }
  return output;
}
