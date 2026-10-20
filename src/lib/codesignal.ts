/**
 * Practice state for the CodeSignal page: the mock-assessment clock, which
 * level of each mock is unlocked, and the ticked checklist items.
 *
 * Kept apart from the progress record on purpose: none of it is a drill, and
 * none of it should touch the streak. Every change is a pure transition here;
 * the store in codesignal-store only persists and broadcasts the result.
 */
export const PRACTICE_STORAGE_KEY = "strictmode.codesignal.v1";

/** The framework's maximum allowed time. */
export const ASSESSMENT_MS = 90 * 60 * 1000;

/** Stop adding features with this much left; the rest is for a green submit. */
export const WRAP_UP_MS = 3 * 60 * 1000;

export type PracticePlanId = "frontend" | "icf";

export interface PracticeClock {
  plan: PracticePlanId;
  /** Time banked by earlier runs of the clock. */
  bankedMs: number;
  /** Epoch ms when the clock last started; null while stopped. */
  runningSince: number | null;
}

export interface PracticeState {
  version: 1;
  clock: PracticeClock;
  /** Highest unlocked level per mock id (1 = only Level 1). */
  unlocked: Record<string, number>;
  /** Ticked item indexes per checklist id. */
  checked: Record<string, number[]>;
}

export function emptyPractice(): PracticeState {
  return {
    version: 1,
    clock: { plan: "frontend", bankedMs: 0, runningSince: null },
    unlocked: {},
    checked: {},
  };
}

export function loadPractice(): PracticeState {
  if (typeof window === "undefined") return emptyPractice();
  try {
    const raw = window.localStorage.getItem(PRACTICE_STORAGE_KEY);
    if (!raw) return emptyPractice();
    const parsed = JSON.parse(raw) as Partial<PracticeState>;
    if (parsed.version !== 1) return emptyPractice();
    return { ...emptyPractice(), ...parsed };
  } catch {
    // Private mode or corrupt JSON: practise without persistence.
    return emptyPractice();
  }
}

export function savePractice(state: PracticeState): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(PRACTICE_STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable: the page still works for this visit */
  }
}

// ── Clock ──────────────────────────────────────────────────────────────────

export function clockElapsed(clock: PracticeClock, now: number): number {
  const running = clock.runningSince === null ? 0 : Math.max(0, now - clock.runningSince);
  return Math.min(ASSESSMENT_MS, clock.bankedMs + running);
}

export function startClock(state: PracticeState, now: number): PracticeState {
  if (state.clock.runningSince !== null || state.clock.bankedMs >= ASSESSMENT_MS) return state;
  return { ...state, clock: { ...state.clock, runningSince: now } };
}

export function pauseClock(state: PracticeState, now: number): PracticeState {
  if (state.clock.runningSince === null) return state;
  return { ...state, clock: { ...state.clock, bankedMs: clockElapsed(state.clock, now), runningSince: null } };
}

export function resetClock(state: PracticeState): PracticeState {
  return { ...state, clock: { ...state.clock, bankedMs: 0, runningSince: null } };
}

export function choosePlan(state: PracticeState, plan: PracticePlanId): PracticeState {
  return { ...state, clock: { ...state.clock, plan } };
}

export interface Checkpoint {
  label: string;
  /** Minutes from the start at which this phase should be done. */
  endsAt: number;
}

/** "0:15–0:40" → 40. A plan step's `at` is a range of h:mm times. */
export function checkpointMinutes(range: string): number {
  const end = range.split(/[–-]/).pop()?.trim() ?? "0:00";
  const [hours, minutes] = end.split(":").map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

/** The phase the clock is in: the first checkpoint not yet passed. */
export function currentCheckpoint(checkpoints: readonly Checkpoint[], elapsedMs: number): number {
  const minutes = elapsedMs / 60_000;
  const index = checkpoints.findIndex((checkpoint) => minutes < checkpoint.endsAt);
  return index === -1 ? checkpoints.length - 1 : index;
}

// ── Mocks and checklists ───────────────────────────────────────────────────

export function unlockedLevel(state: PracticeState, mockId: string): number {
  return state.unlocked[mockId] ?? 1;
}

export function unlockNextLevel(state: PracticeState, mockId: string, levels: number): PracticeState {
  const next = Math.min(levels + 1, unlockedLevel(state, mockId) + 1);
  return { ...state, unlocked: { ...state.unlocked, [mockId]: next } };
}

/** levels + 1 means the debrief and solution are open too. */
export function unlockAll(state: PracticeState, mockId: string, levels: number): PracticeState {
  return { ...state, unlocked: { ...state.unlocked, [mockId]: levels + 1 } };
}

export function relockMock(state: PracticeState, mockId: string): PracticeState {
  const unlocked = { ...state.unlocked };
  delete unlocked[mockId];
  return { ...state, unlocked };
}

export function toggleChecklistItem(state: PracticeState, listId: string, index: number): PracticeState {
  const current = state.checked[listId] ?? [];
  const next = current.includes(index) ? current.filter((item) => item !== index) : [...current, index];
  return { ...state, checked: { ...state.checked, [listId]: next } };
}
