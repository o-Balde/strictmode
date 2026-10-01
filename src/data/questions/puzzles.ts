import { QuizQuestion } from '../types';

export const PUZZLE_QUESTIONS: QuizQuestion[] = [
  {
    id: "system_design-uselayouteffect-runs-before-the-browser-paints",
    title: "useLayoutEffect runs before the browser paints.",
    prompt: "useLayoutEffect runs before the browser paints., explain the behavior and mechanism.",
    level: "senior",
    type: "puzzle",
    category: "system_design",
    subject: "hooks",
    tags: [
      "system_design",
      "hooks",
      "senior"
    ],
    codeSnippet: "useLayoutEffect(() => {\n  console.log(\"runs before paint\");\n});",
    codeLanguage: "typescript",
    options: [
      {
        id: "A",
        text: "`useLayoutEffect` executes synchronously immediately after DOM mutations but before the browser paints, enabling synchronous layout measurements and preventing visual flicker.",
        isCorrect: true,
        explanation: "Correct. The callback fires synchronously after React commits DOM changes and before the browser's paint step, so layout measurements read the new geometry and style adjustments are invisible to the user."
      },
      {
        id: "B",
        text: "`useLayoutEffect` runs 10 seconds after page load to fetch non-critical analytics.",
        isCorrect: false,
        explanation: "Tempting if you pattern-match 'non-critical' to a delayed task, but `useLayoutEffect` has no timer, no delay, and no network semantics; it is a synchronous callback in the commit phase, not a scheduled fetch."
      },
      {
        id: "C",
        text: "`useLayoutEffect` is used exclusively for server-side HTML rendering without client JS.",
        isCorrect: false,
        explanation: "Tempting if you associate 'layout' with server-side HTML generation, but `useLayoutEffect` is a client-only hook; it explicitly warns during SSR because there is no DOM to measure and no paint step to block."
      },
      {
        id: "D",
        text: "`useLayoutEffect` disables all CSS animations across the entire browser tab.",
        isCorrect: false,
        explanation: "Tempting if you conflate 'layout' with CSS, but `useLayoutEffect` is a React hook that runs a callback in the commit phase; it has no mechanism to touch the browser's animation engine or affect other components' styles."
      }
    ],
    correctAnswer: "A",
    explanation: "useLayoutEffect fires synchronously in React's commit phase, the instant the DOM mutations from the current render are applied, and before the browser composites and paints the next frame. Because the browser is blocked until every layout-effect callback returns, any read of `getBoundingClientRect`, `offsetWidth`, or `scrollHeight` inside the callback reflects the new layout, and any style or attribute writes are applied before the user ever sees the frame.\n\nIn practice this is the difference between a tooltip that appears at the correct position on first paint and one that flashes at (0, 0) before jumping into place. If you position an element with `useEffect`, the browser paints the unpositioned element first; the user sees a one-frame flicker. `useLayoutEffect` removes that window entirely.\n\nTwo edge cases an interviewer will probe: `useLayoutEffect` never runs during server-side rendering because there is no DOM and no paint step, so it logs a warning in a Next.js App Router server component. And because the callback blocks the main thread and delays paint, wrapping expensive work (fetches, subscriptions, analytics) in `useLayoutEffect` freezes the visible UI \u2014 reserve it for synchronous layout reads and writes, and use `useEffect` for everything else.",
    interviewLine: "I'd explain that useLayoutEffect runs synchronously in the commit phase, after React has applied DOM mutations but before the browser composites the next frame, so a getBoundingClientRect call inside it reads the new layout and any style writes I make are invisible to the user.",
    misconception: "Treating the timing gap as a simple 'synchronous vs asynchronous' delay rather than understanding that the critical boundary is the browser's paint step \u2014 the callback fires the instant React finishes committing DOM mutations, not after any interval.",
    hints: [
      "Focus on what happens between React's commit phase and the browser's next paint.",
      "What does the browser do with the DOM after React finishes writing to it, and where does the callback slot in relative to that?",
      "This is not a timer or a delay; it is a synchronous callback that blocks the paint pipeline."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/useLayoutEffect",
    example: {
      caption: "Notice that `getBoundingClientRect` inside `useLayoutEffect` reads the post-commit layout, so the tooltip appears at the correct position on the very first paint.",
      language: "tsx",
      code: "\"use client\";\n\nimport { useRef, useState, useLayoutEffect } from \"react\";\n\nfunction Tooltip({ text }: { text: string }) {\n  const ref = useRef<HTMLSpanElement>(null);\n  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);\n\n  useLayoutEffect(() => {\n    if (!ref.current) return;\n    const rect = ref.current.getBoundingClientRect();\n    setPos({ x: rect.left, y: rect.top - 32 });\n  }, [text]);\n\n  return (\n    <>\n      <span ref={ref}>{text}</span>\n      {pos && (\n        <div style={{ position: \"fixed\", left: pos.x, top: pos.y }}>\n          {text}\n        </div>\n      )}\n    </>\n  );\n}"
    }
  }
];
