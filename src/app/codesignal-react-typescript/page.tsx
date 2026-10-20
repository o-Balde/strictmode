import type { Metadata } from "next";
import type { RenderedCodesignalSheet } from "@data";
import { CodesignalPrep } from "@/components/codesignal";
import sheet from "@/generated/codesignal.json";

const codesignal = sheet as RenderedCodesignalSheet;

export const metadata: Metadata = {
  title: "CodeSignal React + TypeScript Assessment Practice",
  description: `Practise for CodeSignal's React and TypeScript assessments: the 4-level, 90-minute format, how the DOM-driven grader works, timed mocks with locked levels, a bug hunt, widget drills and ${codesignal.totalChecks} runnable specs.`,
  alternates: {
    canonical: "/codesignal-react-typescript",
  },
  openGraph: {
    title: "CodeSignal React + TypeScript Assessment Practice | StrictMode",
    description: "The format, the grader, timed level-locked mocks and runnable specs for CodeSignal's React/TypeScript assessments.",
    url: "/codesignal-react-typescript",
  },
};

export default function CodesignalReactTypescriptPage() {
  return <CodesignalPrep sheet={codesignal} />;
}
