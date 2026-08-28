/**
 * Shared motion vocabulary.
 *
 * Two rules hold everywhere: nothing here gates input (an answer keypress
 * lands whether or not a transition is mid-flight), and every duration
 * collapses under prefers-reduced-motion, which is handled globally in
 * globals.css plus MotionConfig's reducedMotion="user".
 */
import type { Transition, Variants } from "motion/react";

export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

export const spring: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.7 };
export const softSpring: Transition = { type: "spring", stiffness: 240, damping: 28 };

/** Cards and panels arriving. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.34, ease: EASE_OUT } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.18, ease: EASE_IN_OUT } },
};

/** Parent of a staggered list — options, queue rows, topic cards. */
export function stagger(step = 0.04, delay = 0.05): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
    exit: {},
  };
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.12 } },
};

/** The question card swapping for the next one. */
export const questionSwap: Variants = {
  hidden: { opacity: 0, x: 24, filter: "blur(3px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.32, ease: EASE_OUT } },
  exit: { opacity: 0, x: -24, filter: "blur(3px)", transition: { duration: 0.2, ease: EASE_IN_OUT } },
};

/** Feedback panel unfolding under the answered question. */
export const unfold: Variants = {
  hidden: { opacity: 0, height: 0 },
  show: {
    opacity: 1,
    height: "auto",
    transition: { height: { duration: 0.36, ease: EASE_OUT }, opacity: { duration: 0.24, delay: 0.06 } },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.18 } },
};
