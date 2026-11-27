import type { Metadata } from "next";
import type { RenderedScotiabankSheet } from "@/data/scotiabank";
import { ScotiabankPrep } from "@/components/scotiabank";
import sheet from "@/generated/scotiabank.json";

const scotiabank = sheet as RenderedScotiabankSheet;

/**
 * Unlisted: no links point here, it is left out of the sitemap, and it asks not
 * to be indexed. It is also absent from robots.txt on purpose, since a
 * `Disallow` line would advertise the path to anyone reading that file.
 */
export const metadata: Metadata = {
  title: "Scotiabank Full Stack Developer interview prep",
  description:
    "Unlisted prep for Scotiabank's Full Stack Developer (Entry Level) role in Global Wealth Engineering: the interview loop, reported questions, the stack and a question bank.",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ScotiabankPage() {
  return <ScotiabankPrep sheet={scotiabank} />;
}
