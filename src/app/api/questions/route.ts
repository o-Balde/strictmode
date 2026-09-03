/**
 * Fallback QuestionSource adapter.
 *
 * Questions are normally read as static JSON from /q/, written at build time.
 * This handler exists for the one case that cannot: a client left open across a
 * deploy asking for an id the current build no longer emits. It does no
 * highlighting — that happens at build — so it stays a lookup and a serialise.
 */
import { NextResponse } from "next/server";
import { QUESTIONS_BY_ID, TOPIC_METADATA, type QuizQuestion } from "@data";
import type { QuestionPayload } from "@lib";

/** A drill is 5; review lists ask for a few more. */
const MAX_IDS = 40;

function toPayload(q: QuizQuestion): QuestionPayload {
  const options = q.options ?? [];
  return {
    id: q.id,
    title: q.title,
    prompt: q.prompt,
    level: q.level,
    type: q.type,
    category: q.category,
    subject: q.subject,
    subjectTitle: TOPIC_METADATA[q.subject]?.title ?? q.subject,
    tags: q.tags,
    codeSnippet: q.codeSnippet ?? null,
    // No markup: the caller renders plain text when a snippet arrives unhighlighted.
    codeHtml: null,
    codeLanguage: q.codeLanguage ?? "typescript",
    explanation: q.explanation,
    interviewLine: q.interviewLine,
    misconception: q.misconception,
    hints: q.hints ?? [],
    estimatedMinutes: q.estimatedMinutes,
    correctAnswer: q.correctAnswer ?? options.find((o) => o.isCorrect)?.id ?? "",
    options: options.map((o) => ({
      id: o.id,
      text: o.text,
      isCorrect: o.isCorrect,
      explanation: o.explanation,
    })),
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const ids = (body as { ids?: unknown })?.ids;
  if (!Array.isArray(ids) || ids.some((i) => typeof i !== "string")) {
    return NextResponse.json({ error: "ids must be a string array" }, { status: 400 });
  }
  if (ids.length === 0) return NextResponse.json({ questions: [] });
  if (ids.length > MAX_IDS) {
    return NextResponse.json({ error: `at most ${MAX_IDS} ids` }, { status: 400 });
  }

  // Preserve the caller's order — it is the drill order.
  const questions = (ids as string[])
    .map((id) => QUESTIONS_BY_ID.get(id))
    .filter((q): q is QuizQuestion => Boolean(q))
    .map(toPayload);

  return NextResponse.json(
    { questions },
    { headers: { "cache-control": "public, max-age=3600, immutable" } },
  );
}
