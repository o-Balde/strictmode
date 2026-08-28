import type { Metadata } from "next";
import { TopicPicker } from "@/components/topics/topic-picker";

export const metadata: Metadata = {
  title: "Topic Practice & Subject Directory",
  description:
    "Explore 760+ React and TypeScript technical interview questions across 16 specialized topics including Hooks, Rendering, Generics, Next.js RSC, and Performance.",
  alternates: {
    canonical: "/topics",
  },
  openGraph: {
    title: "Topic Practice & Subject Directory | StrictMode",
    description:
      "Explore 760+ React and TypeScript technical interview questions across 16 specialized topics.",
    url: "/topics",
  },
};

export default function TopicsPage() {
  return <TopicPicker />;
}
