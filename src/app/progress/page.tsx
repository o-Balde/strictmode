import type { Metadata } from "next";
import { ProgressView } from "@/components/progress-view";

export const metadata: Metadata = {
  title: "Your Practice Progress & Retention",
  description:
    "Track your daily streaks, SM-2 review retention, topic mastery breakdown, and practice heatmap on StrictMode.",
  alternates: {
    canonical: "/progress",
  },
};

export default function ProgressPage() {
  return <ProgressView />;
}
