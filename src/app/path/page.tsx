import type { Metadata } from "next";
import { cookies } from "next/headers";
import { HUD_COOKIE, parseHudCookie } from "@/lib/progress";
import { PathHome } from "@/components/home/path-home";

export const metadata: Metadata = {
  title: "Single-Focus Path Mode",
  description:
    "Targeted single-focus repetition drills for React and TypeScript interview preparation.",
  alternates: {
    canonical: "/path",
  },
};

/** Direct link to the single-focus home, regardless of the stored preference. */
export default async function PathPage() {
  const store = await cookies();
  return <PathHome initialHud={parseHudCookie(store.get(HUD_COOKIE)?.value)} />;
}
