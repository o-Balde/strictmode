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
        explanation: "Correct. Because it fires before paint, `useLayoutEffect` allows measuring element dimensions and applying immediate style adjustments without the user seeing an intermediate flicker."
      },
      {
        id: "B",
        text: "`useLayoutEffect` runs 10 seconds after page load to fetch non-critical analytics.",
        isCorrect: false,
        explanation: "`useLayoutEffect` runs synchronously immediately after DOM mutation before browser paint."
      },
      {
        id: "C",
        text: "`useLayoutEffect` is used exclusively for server-side HTML rendering without client JS.",
        isCorrect: false,
        explanation: "`useLayoutEffect` causes warnings in SSR because server environments have no DOM layout to measure."
      },
      {
        id: "D",
        text: "`useLayoutEffect` disables all CSS animations across the entire browser tab.",
        isCorrect: false,
        explanation: "`useLayoutEffect` is a lifecycle hook for layout measurements and synchronized DOM updates."
      }
    ],
    correctAnswer: "A",
    explanation: "useLayoutEffect fires synchronously immediately after React performs DOM mutations and before the browser paints the screen. This allows measuring DOM layout dimensions or making immediate DOM adjustments synchronously to prevent visual flicker before the user sees the frame.",
    interviewLine: "Interview takeaway: Clearly articulate the underlying mechanism, lifecycle role, and performance trade-offs of useLayoutEffect runs before the browser paints.",
    misconception: "Common misconception: misunderstanding the execution lifecycle, reactivity triggers, or edge cases of useLayoutEffect runs before the browser paints.",
    hints: [
      "useLayoutEffect runs before the browser paints. Reach for it only to measure or mutate the DOM, when useEffect would show a flicker."
    ],
    source: "interviewbit-70",
    estimatedMinutes: 4,
    bestPracticeRef: "https://react.dev/reference/react/useLayoutEffect"
  }
];
