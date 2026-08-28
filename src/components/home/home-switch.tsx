"use client";

/**
 * Chooses between the two session-home directions the mockup proposes: 1b's
 * command-line dashboard (default) and 1c's single-focus path. The preference
 * lives in the progress record so it survives reloads.
 */
import { AnimatePresence, motion } from "motion/react";
import type { HudCookie } from "@/lib/progress";
import { useProgress } from "@/components/progress-provider";
import { Dashboard } from "@/components/home/dashboard";
import { PathHome } from "@/components/home/path-home";

export function HomeSwitch({ initialHud }: { initialHud: HudCookie | null }) {
  const { progress, hydrated } = useProgress();
  // Before hydration the cookie is all we have; it is enough to pick a layout.
  const variant = hydrated ? progress.homeVariant : "dashboard";

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={variant}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      >
        {variant === "path" ? (
          <PathHome initialHud={initialHud} />
        ) : (
          <Dashboard initialHud={initialHud} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
