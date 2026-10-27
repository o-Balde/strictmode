import type { Metadata } from "next";
import type { RenderedReviewSection } from "@data";
import { QuickReview } from "@/components/quick-review";
import sheet from "@/generated/quick-review.json";

const sections = sheet.sections as RenderedReviewSection[];
const total = sections.reduce((count, section) => count + section.questions.length, 0);

export const metadata: Metadata = {
  title: "Quick Review: Front-End Interview Questions with Interactive Demos",
  description: `${total} short front-end interview questions with thirty-second answers, worked examples and interactive demos: JavaScript, React, CSS, HTML, accessibility, Node.js and security.`,
  alternates: {
    canonical: "/quick-review",
  },
  openGraph: {
    title: "Quick Review | StrictMode",
    description: `${total} front-end interview questions with thirty-second answers and interactive demos.`,
    url: "/quick-review",
  },
};

export default function QuickReviewPage() {
  return <QuickReview sections={sections} />;
}
