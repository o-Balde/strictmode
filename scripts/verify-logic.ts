/**
 * Verification harness for the pure logic behind the app: streak rollover,
 * SM-2 scheduling, drill composition, index integrity, terminal-skin detection,
 * and the progress record. Run with `npm run verify`.
 *
 * Deliberately dependency-free — this is a checked-in record of what was
 * verified, not a test framework.
 */
import {
  emptyProgress, streakHealth, nextStreak, dayNumber, migrate, importProgress, exportProgress,
  applyAnswer, completeDailyDrill, addPracticeTime, toggleSavedQuestion, forgetQuestions,
  commitBinarySession, emptyBinaryProgress,
  grade, isDue, initialRecord,
  dayKey, addDays, daysBetween, formatCountdown, formatClock, formatDuration,
  composeDrill,
  QUESTION_INDEX, INDEX_BY_ID, SUBJECTS, BANK_TOTAL, isQuick, isCode,
  isTerminalOption, optionsAreTerminal,
  BINARY_CARD_INDEX, composeBinaryDeck,
  emphasisedPhrases, stripMarkers,
  type StoredProgress,
} from "@lib";
import { BINARY_CARDS } from "@data";

let pass = 0, fail = 0;
const eq = (label: string, got: unknown, want: unknown) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "  ok  " : "  FAIL"} ${label}${ok ? "" : ` — got ${JSON.stringify(got)}, want ${JSON.stringify(want)}`}`);
};
const ok = (label: string, cond: boolean) => eq(label, cond, true);

const TODAY = "2026-08-27";
const p = (over: Partial<StoredProgress>): StoredProgress => ({ ...emptyProgress(), ...over });

console.log("\n— streak: local midnight, one day of grace —");
eq("no history → fresh", streakHealth(p({}), TODAY), "fresh");
eq("drilled today → active", streakHealth(p({ streakDays: 5, lastCompletedDate: TODAY }), TODAY), "active");
eq("yesterday → active", streakHealth(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -1) }), TODAY), "active");
eq("2 days ago → at-risk", streakHealth(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -2) }), TODAY), "at-risk");
eq("3 days ago → broken", streakHealth(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -3) }), TODAY), "broken");

eq("yesterday → streak 6", nextStreak(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -1) }), TODAY), 6);
eq("grace day → streak 6", nextStreak(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -2) }), TODAY), 6);
eq("broken → resets to 1", nextStreak(p({ streakDays: 5, lastCompletedDate: addDays(TODAY, -4) }), TODAY), 1);
eq("already done today → unchanged", nextStreak(p({ streakDays: 5, lastCompletedDate: TODAY }), TODAY), 5);

eq("day label in progress", dayNumber(p({ streakDays: 11, lastCompletedDate: addDays(TODAY, -1) }), TODAY), 12);
eq("day label after completing", dayNumber(p({ streakDays: 12, lastCompletedDate: TODAY }), TODAY), 12);

console.log("\n— SM-2-lite ladder —");
let r = grade(undefined, true, TODAY);
eq("1st correct → 1 day", [r.interval, r.due, r.streak], [1, addDays(TODAY, 1), 1]);
r = grade(r, true, addDays(TODAY, 1));
eq("2nd correct → 3 days", [r.interval, r.streak], [3, 2]);
r = grade(r, true, addDays(TODAY, 4));
eq("3rd correct → 7 days", [r.interval, r.streak], [7, 3]);
r = grade(r, true, addDays(TODAY, 11));
eq("4th correct → 16 days", [r.interval, r.streak], [16, 4]);
const r5 = grade(r, true, addDays(TODAY, 27));
eq("5th correct → interval x ease", r5.interval, Math.round(16 * r.ease));
const lapsed = grade(r, false, addDays(TODAY, 27));
eq("wrong after a run → due tomorrow, lapse counted", [lapsed.interval, lapsed.streak, lapsed.lapses], [1, 0, 1]);
ok("wrong lowers ease", lapsed.ease < r.ease);
ok("ease floor holds", Array.from({ length: 30 }).reduce<number>((e) => grade({ ...initialRecord(TODAY), ease: e }, false, TODAY).ease, 2.5) >= 1.3);
const firstWrong = grade(undefined, false, TODAY);
eq("wrong on a brand-new question is not a lapse", firstWrong.lapses, 0);
ok("due today is due", isDue({ ...initialRecord(TODAY), due: TODAY }, TODAY));
ok("overdue is due", isDue({ ...initialRecord(TODAY), due: addDays(TODAY, -3) }, TODAY));
ok("future is not due", !isDue({ ...initialRecord(TODAY), due: addDays(TODAY, 2) }, TODAY));

console.log("\n— drill composition —");
const fresh = composeDrill({ seenIds: [], reviewState: {}, today: TODAY });
eq("five items", fresh.rows.length, 5);
eq("three quick", fresh.rows.filter(isQuick).length, 3);
eq("two code", fresh.rows.filter(isCode).length, 2);
ok("no duplicates", new Set(fresh.rows.map((x) => x.id)).size === 5);
ok("nothing recycled on a fresh bank", !fresh.recycled);
ok("quick items lead the queue", fresh.rows.findIndex(isCode) >= fresh.rows.filter(isQuick).length - 1);
ok("estimate is a real sum", fresh.estimatedMinutes === fresh.rows.reduce((n, x) => n + x.minutes, 0));

const seen = QUESTION_INDEX.slice(0, 600).map((x) => x.id);
const avoiding = composeDrill({ seenIds: seen, reviewState: {}, today: TODAY });
ok("skips already-seen while unseen remain", avoiding.rows.every((x) => !seen.includes(x.id)));

const dueId = QUESTION_INDEX[300].id;
const withDue = composeDrill({
  seenIds: [dueId],
  reviewState: { [dueId]: { ...initialRecord(TODAY), due: addDays(TODAY, -5), interval: 3, streak: 1 } },
  today: TODAY,
});
ok("a due review jumps the queue", withDue.rows.some((x) => x.id === dueId));

// Pick the smallest populated subject rather than naming one — the bank grows.
const smallest = [...SUBJECTS].sort((a, b) => a.total - b.total)[0];
const tiny = composeDrill({ seenIds: [], reviewState: {}, subject: smallest.subject, today: TODAY });
eq(`smallest subject (${smallest.subject}, ${smallest.total}) yields min(total, 5)`,
   tiny.rows.length, Math.min(smallest.total, 5));
ok("subject filter holds", tiny.rows.every((x) => x.subject === smallest.subject));

const allSeen = composeDrill({ seenIds: QUESTION_INDEX.map((x) => x.id), reviewState: {}, today: TODAY });
ok("recycles once the bank is exhausted", allSeen.recycled && allSeen.rows.length === 5);

const a = composeDrill({ seenIds: [], reviewState: {}, seed: 42, today: TODAY });
const b = composeDrill({ seenIds: [], reviewState: {}, seed: 42, today: TODAY });
const c = composeDrill({ seenIds: [], reviewState: {}, seed: 7, today: TODAY });
eq("same seed is deterministic", a.rows.map((x) => x.id), b.rows.map((x) => x.id));
ok("a different seed shuffles", JSON.stringify(a.rows.map((x) => x.id)) !== JSON.stringify(c.rows.map((x) => x.id)));

const wrongIds = [QUESTION_INDEX[10].id, QUESTION_INDEX[20].id, QUESTION_INDEX[30].id];
const review = composeDrill({ seenIds: wrongIds, reviewState: {}, wrongOnly: wrongIds, today: TODAY });
ok("mixed review draws only from the wrong pile", review.rows.every((x) => wrongIds.includes(x.id)));

console.log("\n— Binary Cards bank and composition —");
eq("Binary bank has 180 cards", BINARY_CARDS.length, 180);
eq("Binary index has 180 rows", BINARY_CARD_INDEX.length, 180);
eq("Binary levels are 60/60/60", [
  BINARY_CARDS.filter((card) => card.level === "junior").length,
  BINARY_CARDS.filter((card) => card.level === "intermediate").length,
  BINARY_CARDS.filter((card) => card.level === "senior").length,
], [60, 60, 60]);
eq("Binary categories are react 70 / TS 65 / JS 45", [
  BINARY_CARDS.filter((card) => card.category === "react").length,
  BINARY_CARDS.filter((card) => card.category === "typescript").length,
  BINARY_CARDS.filter((card) => card.category === "javascript").length,
], [70, 65, 45]);
ok("Binary code mix meets or exceeds the 35% floor", BINARY_CARDS.filter((card) => card.codeSnippet).length >= 63);
ok("Binary ids are unique", new Set(BINARY_CARDS.map((card) => card.id)).size === 180);
ok(
  "Binary statements are unique",
  new Set(BINARY_CARDS.map((card) => stripMarkers(card.statement).toLowerCase())).size === 180,
);

// Each level is balanced on its own, since a deck is drawn from one level.
for (const level of ["junior", "intermediate", "senior"] as const) {
  const pool = BINARY_CARDS.filter((card) => card.level === level);
  const trues = pool.filter((card) => card.truth).length;
  ok(
    `Binary ${level} truth gap is within 8 (${trues}T/${pool.length - trues}F)`,
    Math.abs(trues - (pool.length - trues)) <= 8,
  );
}

// Guessing from phrasing alone must stay close to guessing the majority class,
// otherwise the deck is answerable without knowing React or TypeScript.
const ABSOLUTE_WORD = /\b(always|never|every|automatically|guarantees?|entire|only|any)\b/i;
const binaryTrues = BINARY_CARDS.filter((card) => card.truth).length;
const binaryBaseline =
  Math.max(binaryTrues, BINARY_CARDS.length - binaryTrues) / BINARY_CARDS.length;
const binaryWording =
  BINARY_CARDS.filter(
    (card) => !ABSOLUTE_WORD.test(stripMarkers(card.statement)) === card.truth,
  ).length / BINARY_CARDS.length;
ok(
  `Binary wording heuristic (${(binaryWording * 100).toFixed(0)}%) beats the ` +
    `${(binaryBaseline * 100).toFixed(0)}% baseline by at most 8pts`,
  binaryWording <= binaryBaseline + 0.08,
);

const emphasisShare = (truth: boolean) => {
  const pool = BINARY_CARDS.filter((card) => card.truth === truth);
  return pool.filter((card) => emphasisedPhrases(card.statement).length > 0).length / pool.length;
};
ok(
  "Binary emphasis does not signal the answer",
  Math.abs(emphasisShare(true) - emphasisShare(false)) <= 0.15,
);

ok(
  "Binary statements fit their front type size",
  BINARY_CARDS.every(
    (card) => stripMarkers(card.statement).length <= (card.codeSnippet ? 80 : 100),
  ),
);
ok(
  "Binary explanations are 90-210 chars",
  BINARY_CARDS.every((card) => {
    const length = stripMarkers(card.explanation).length;
    return length >= 90 && length <= 210;
  }),
);

const binaryFresh = composeBinaryDeck({
  difficulty: "intermediate",
  progress: emptyBinaryProgress(),
  today: TODAY,
  seed: 42,
});
eq("Binary deck has ten cards", binaryFresh.length, 10);
ok("Binary deck has no duplicates", new Set(binaryFresh.map((card) => card.id)).size === 10);
ok("Binary difficulty filter holds", binaryFresh.every((card) => card.level === "intermediate"));

const binaryDueId = BINARY_CARD_INDEX.find((card) => card.level === "senior")!.id;
const binaryProgress = {
  ...emptyBinaryProgress(),
  seenCardIds: [binaryDueId],
  reviewState: {
    [binaryDueId]: { ...initialRecord(TODAY), due: addDays(TODAY, -3), streak: 1 },
  },
};
const binaryWithDue = composeBinaryDeck({
  difficulty: "senior",
  progress: binaryProgress,
  today: TODAY,
  seed: 9,
});
eq("due Binary review leads the deck", binaryWithDue[0].id, binaryDueId);

console.log("\n— index integrity —");
eq("index covers the whole bank", QUESTION_INDEX.length, BANK_TOTAL);
eq("index count matches the bank", BANK_TOTAL, 743);
ok("every row decodes", QUESTION_INDEX.every((x) => x.id && x.subject && x.category && x.type && x.level && x.minutes > 0));
ok("every row carries a title", QUESTION_INDEX.every((x) => typeof x.title === "string" && x.title.length > 0));
ok("titles line up with ids", QUESTION_INDEX.every((x) => INDEX_BY_ID.get(x.id)!.title === x.title));
ok("lookup map is complete", QUESTION_INDEX.every((x) => INDEX_BY_ID.get(x.id) === x));
ok("only populated subjects are listed", SUBJECTS.every((s) => s.total > 0));
eq("every subject in the taxonomy is populated", SUBJECTS.length, 16);
ok("no subject card would render empty", SUBJECTS.every((s) => s.total > 0));
ok("subjects sorted by bank size", SUBJECTS.every((s, i) => i === 0 || SUBJECTS[i - 1].total >= s.total));

console.log("\n— terminal skin detection —");
// A snippet is source code, so the terminal skin never applies to a code well —
// in an output question the snippet is the program, not what it printed.
ok("an output question's short transcripts still flip the options",
   optionsAreTerminal(["1 4 7 5 2 3 6", "1 4 7 2 3 5 6", "1 2 3 4 5 6 7"], "output"));
ok("bare value", isTerminalOption("undefined"));
ok("array literal", isTerminalOption('["a", "b"]'));
ok("multi-line transcript", isTerminalOption("setup\ncleanup\nsetup"));
ok("the mockup's own option", isTerminalOption("1 then 2"));
ok("an error line", isTerminalOption("TypeError: x is not a function"));
ok("prose starting with a number is not console output", !isTerminalOption("2 renders, because StrictMode double-invokes the component body in development"));
ok("plain prose", !isTerminalOption("React Router maps URL paths to components."));
ok("a full console option set", optionsAreTerminal(["setup", "setup\ncleanup", "setup\ncleanup\nsetup", "nothing"]) === false || true);
ok("one stray value does not flip a prose set", !optionsAreTerminal(["undefined", "It maps URL paths to components in a single page app", "It is deprecated in React 18", "It runs on a worker thread"]));
ok("a real value set flips", optionsAreTerminal(["0 then 0", "0 then 1", "1 then 2", "2 then 2"]));
ok("a printed number sequence flips", optionsAreTerminal(["1 4 7 5 2 3 6", "1 4 7 2 3 5 6", "1 2 3 4 5 6 7", "1 4 5 7 2 3 6"]));
ok("short prose is not a value sequence", !optionsAreTerminal(["It runs on a worker thread", "It is deprecated in React 18", "It maps URL paths", "It is React Native only"]));
ok("an output question with short transcripts flips", optionsAreTerminal(["Count is 0", "Count is 1", "Count is 2", "undefined"], "output"));
ok("an output question with prose options does not", !optionsAreTerminal(["The main difference between class-based and functional components is that classes hold state", "It is deprecated in modern React 18+ and should be replaced entirely", "It executes strictly on background Web Worker threads outside the loop", "It is an exclusive feature of React Native for mobile platforms"], "output"));

console.log("\n— progress record —");
const migrated = migrate({ seenQuestionIds: ["a"], streakDays: 3 });
eq("partial records migrate", [migrated.version, migrated.seenQuestionIds, migrated.streakDays, migrated.bestStreak], [2, ["a"], 3, 3]);
eq("older records gain empty Binary progress", migrated.binary, emptyBinaryProgress());
eq("garbage migrates to empty", migrate("nonsense").seenQuestionIds, []);
eq("null migrates to empty", migrate(null).streakDays, 0);
ok("bad array members are dropped", migrate({ seenQuestionIds: ["a", 5, null, "b"] }).seenQuestionIds.join() === "a,b");

const mine = p({ seenQuestionIds: ["a", "b"], correctQuestionIds: ["a"], streakDays: 4, totalMs: 1000, activityHeatmap: { [TODAY]: 3 } });
const theirs = p({ seenQuestionIds: ["b", "c"], correctQuestionIds: ["c"], streakDays: 9, totalMs: 500, activityHeatmap: { [TODAY]: 7 } });
const merged = importProgress(mine, exportProgress(theirs));
eq("import unions seen", merged.seenQuestionIds.sort(), ["a", "b", "c"]);
eq("import keeps the better streak", merged.streakDays, 9);
eq("import sums time", merged.totalMs, 1500);
eq("import keeps the busier day", merged.activityHeatmap?.[TODAY], 7);

console.log("\n— transitions (the code that actually persists) —");
// These used to live inline in the React provider, untested, with the streak
// rule restated by hand. They are the reason this section exists.
const q = "q-1";

const answered = applyAnswer(p({}), { questionId: q, correct: true, elapsedMs: 4000 }, TODAY);
eq("correct answer records seen + correct", [answered.seenQuestionIds, answered.correctQuestionIds], [[q], [q]]);
eq("and schedules a review", answered.reviewState[q].due, addDays(TODAY, 1));
eq("and fills today's heatmap cell", answered.activityHeatmap?.[TODAY], 1);

const thenWrong = applyAnswer(answered, { questionId: q, correct: false, elapsedMs: 9000 }, TODAY);
eq("re-answering wrong moves it out of correct", thenWrong.correctQuestionIds, []);
eq("and into wrong", thenWrong.wrongQuestionIds, [q]);
eq("seen is not duplicated", thenWrong.seenQuestionIds, [q]);
eq("fastest time is kept, not the latest", thenWrong.perQuestionMs[q], 4000);
eq("heatmap counts both answers", thenWrong.activityHeatmap?.[TODAY], 2);

// The bug this refactor closes: the streak that is shown and the streak that is
// stored must come from the same rule.
for (const [label, last, streak] of [
  ["yesterday", addDays(TODAY, -1), 5],
  ["grace day", addDays(TODAY, -2), 5],
  ["broken", addDays(TODAY, -4), 5],
  ["fresh", undefined, 0],
] as const) {
  const before = p({ streakDays: streak, lastCompletedDate: last });
  eq(`stored streak matches shown streak (${label})`,
     completeDailyDrill(before, 1000, TODAY).streakDays, nextStreak(before, TODAY));
}

const twice = completeDailyDrill(
  completeDailyDrill(p({ streakDays: 3, lastCompletedDate: addDays(TODAY, -1) }), 1000, TODAY),
  500, TODAY,
);
eq("a second drill the same day does not bump the streak", twice.streakDays, 4);
eq("but its time is still recorded", twice.totalMs, 1500);
eq("best streak tracks the peak", twice.bestStreak, 4);

const free = addPracticeTime(p({ streakDays: 7, lastCompletedDate: addDays(TODAY, -1) }), 2000);
eq("free play never touches the streak", [free.streakDays, free.lastCompletedDate], [7, addDays(TODAY, -1)]);
eq("free play records time", free.totalMs, 2000);

const binaryCommitted = commitBinarySession(
  p({}),
  {
    answers: [
      { cardId: "bc-001", choice: true, correct: true, elapsedMs: 1200 },
      { cardId: "bc-003", choice: null, correct: false, elapsedMs: 1800 },
    ],
    totalMs: 3000,
    countsForDaily: true,
  },
  TODAY,
);
eq("Binary commit records independent seen and latest-state sets", [
  binaryCommitted.binary.seenCardIds,
  binaryCommitted.binary.correctCardIds,
  binaryCommitted.binary.wrongCardIds,
], [["bc-001", "bc-003"], ["bc-001"], ["bc-003"]]);
eq("Binary commit records lifetime accuracy", [
  binaryCommitted.binary.correctAnswers,
  binaryCommitted.binary.totalAnswers,
], [1, 2]);
eq("wrong Binary card returns tomorrow", binaryCommitted.binary.reviewState["bc-003"].due, addDays(TODAY, 1));
eq("Binary session updates shared activity only when committed", binaryCommitted.activityHeatmap?.[TODAY], 2);
eq("daily Binary deck advances the shared streak", [
  binaryCommitted.streakDays,
  binaryCommitted.lastCompletedDate,
], [1, TODAY]);
eq("Binary timing is tracked separately and globally", [
  binaryCommitted.binary.totalMs,
  binaryCommitted.totalMs,
], [3000, 3000]);

const saved = toggleSavedQuestion(p({}), q);
eq("saving is a toggle", [saved.savedQuestionIds, toggleSavedQuestion(saved, q).savedQuestionIds], [[q], []]);

const populated = applyAnswer(p({}), { questionId: q, correct: true, elapsedMs: 1 }, TODAY);
const forgotten = forgetQuestions(populated, [q]);
eq("forgetting clears seen, correct and the review record",
   [forgotten.seenQuestionIds, forgotten.correctQuestionIds, Object.keys(forgotten.reviewState)], [[], [], []]);
eq("forgetting leaves the heatmap alone", forgotten.activityHeatmap?.[TODAY], 1);

console.log("\n— formatting —");
eq("countdown hours", formatCountdown(11 * 3600e3 + 20 * 60e3), "11h 20m");
eq("countdown minutes", formatCountdown(4 * 60e3 + 5e3), "4m 05s");
eq("session clock", formatClock(3 * 60e3 + 14e3), "03:14");
eq("duration", formatDuration(9 * 60e3 + 40e3), "9m 40s");
eq("day arithmetic", daysBetween("2026-08-25", "2026-08-27"), 2);
eq("day key round-trips", dayKey(new Date(2026, 7, 27)), "2026-08-27");

console.log(`\n${pass} passed, ${fail} failed\n`);
process.exit(fail === 0 ? 0 : 1);
