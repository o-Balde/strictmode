import type { Metadata } from "next";
import { Suspense } from "react";
import { DrillLauncher } from "@components";

export const metadata: Metadata = {
  title: "Active Drill",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Static. The mode and subject live in the query string and are read on the
 * client, so this page has no server-rendered output that varies — reading
 * searchParams here would have cost a function invocation per drill start for
 * markup that is identical every time.
 */
export default function DrillPage() {
  return (
    <Suspense>
      <DrillLauncher />
    </Suspense>
  );
}
