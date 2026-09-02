import type { Metadata } from "next";
import { BinarySummary } from "@/components/binary/binary-summary";

export const metadata: Metadata = {
  title: "Binary Deck Completed",
  robots: { index: false, follow: false },
};

export default function BinaryDonePage() {
  return <BinarySummary />;
}
