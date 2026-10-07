import type { Metadata } from "next";
import type { RenderedPrepSection } from "@data";
import { InterviewPrep } from "@components";
import sheet from "@/generated/interview-prep.json";

const sections = sheet.sections as RenderedPrepSection[];
const total = sections.reduce((count, section) => count + section.questions.length, 0);

export const metadata: Metadata = {
  title: "React & TypeScript Interview Questions and Answers",
  description: `${total} React and TypeScript interview questions with the answer to give, worked code examples and the follow-ups that come next. Hooks, rendering, generics, Server Components, live coding.`,
  alternates: {
    canonical: "/interview-prep",
  },
  openGraph: {
    title: "React & TypeScript Interview Questions and Answers | StrictMode",
    description: `${total} interview questions with answers, worked examples and follow-ups.`,
    url: "/interview-prep",
  },
};

export default function InterviewPrepPage() {
  return <InterviewPrep sections={sections} />;
}
