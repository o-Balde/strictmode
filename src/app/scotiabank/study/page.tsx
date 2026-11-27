import type { Metadata } from "next";
import type { RenderedStudySheet } from "@/data/scotiabank/study";
import { ScotiabankStudy } from "@/components/scotiabank";
import sheet from "@/generated/scotiabank-study.json";

const study = sheet as RenderedStudySheet;

/**
 * Unlisted like /scotiabank: only that page links here, it's left out of the
 * sitemap and robots.txt, and it asks not to be indexed.
 */
export const metadata: Metadata = {
  title: "Scotiabank Full Stack Developer: concept review and flashcards",
  description:
    "Unlisted concept review for Scotiabank's Full Stack Developer (Entry Level) role: every technology in the posting explained, compared and turned into flashcards.",
  alternates: { canonical: null },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
};

export default function ScotiabankStudyPage() {
  return <ScotiabankStudy sheet={study} />;
}
