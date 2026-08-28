import type { Metadata } from "next";
import { SessionSummary } from "@/components/session/session-summary";

export const metadata: Metadata = {
  title: "Drill Completed",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DrillDonePage() {
  return <SessionSummary />;
}
