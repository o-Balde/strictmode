import { notFound } from "next/navigation";
import { TOPIC_METADATA } from "@/data";
import type { QuestionSubject } from "@/data/types";
import { SubjectView } from "@/components/topics/subject-view";

/**
 * The subject list is fixed at build time, so every one of these pages is
 * prerendered. Without this the route is server-rendered on demand — a function
 * invocation per topic view, for a page whose server output never varies.
 */
export function generateStaticParams() {
  return Object.keys(TOPIC_METADATA).map((subject) => ({ subject }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject } = await params;
  if (!(subject in TOPIC_METADATA)) notFound();
  return <SubjectView subject={subject as QuestionSubject} />;
}
