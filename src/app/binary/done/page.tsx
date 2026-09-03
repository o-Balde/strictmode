import type { Metadata } from "next";
import { BinarySummary } from "@components";

export const metadata: Metadata = {
  title: "Binary Deck Completed",
  robots: { index: false, follow: false },
};

export default function BinaryDonePage() {
  return <BinarySummary />;
}
