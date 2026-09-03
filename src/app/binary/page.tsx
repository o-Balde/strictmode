import type { Metadata } from "next";
import { BinaryGame } from "@components";

export const metadata: Metadata = {
  title: "Binary Cards",
  description: "Ten fast React and TypeScript true-or-false cards.",
  robots: { index: false, follow: false },
};

export default function BinaryPage() {
  return <BinaryGame />;
}
