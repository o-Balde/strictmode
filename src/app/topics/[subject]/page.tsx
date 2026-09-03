import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOPIC_METADATA, type QuestionSubject } from "@data";
import { SubjectView } from "@components";

/**
 * The subject list is fixed at build time, so every one of these pages is
 * prerendered. Without this the route is server-rendered on demand — a function
 * invocation per topic view, for a page whose server output never varies.
 */
export function generateStaticParams() {
  return Object.keys(TOPIC_METADATA).map((subject) => ({ subject }));
}

interface SubjectPageProps {
  params: Promise<{ subject: string }>;
}

export async function generateMetadata({
  params,
}: Readonly<SubjectPageProps>): Promise<Metadata> {
  const { subject } = await params;
  const meta = TOPIC_METADATA[subject as QuestionSubject];
  if (!meta) return {};

  return {
    title: `${meta.title} Drills`,
    description: `Practice ${meta.title} questions: ${meta.description}. Master frontend engineering concepts with spaced repetition reps.`,
    alternates: {
      canonical: `/topics/${subject}`,
    },
    openGraph: {
      title: `${meta.title} Drills | StrictMode`,
      description: `Practice ${meta.title} questions: ${meta.description}.`,
      url: `/topics/${subject}`,
    },
  };
}

export default async function SubjectPage({
  params,
}: Readonly<SubjectPageProps>) {
  const { subject } = await params;
  if (!(subject in TOPIC_METADATA)) notFound();
  return <SubjectView subject={subject as QuestionSubject} />;
}
