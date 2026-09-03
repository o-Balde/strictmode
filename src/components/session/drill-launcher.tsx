"use client";

/** Reads the drill's query parameters on the client so /drill can stay static. */
import { useSearchParams } from "next/navigation";
import type { QuestionSubject } from "@data";
import { DrillRunner } from "@components";
import type { SessionMode } from "@hooks";

const MODES: SessionMode[] = ["daily", "extra", "free"];

export function DrillLauncher() {
  const params = useSearchParams();
  const raw = params.get("mode");
  const mode: SessionMode = MODES.includes(raw as SessionMode) ? (raw as SessionMode) : "daily";
  const subject = (params.get("subject") as QuestionSubject | null) ?? undefined;

  return <DrillRunner mode={mode} subject={subject} reviewOnly={params.get("review") === "1"} />;
}
