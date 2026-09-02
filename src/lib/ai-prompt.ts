import type { BinaryAnswer, BinaryCardPayload } from "@/data/binary-types";
import type { QuestionPayload } from "@/lib/question-payload";

/**
 * Copies text to the user's clipboard using the modern Clipboard API
 * with a fallback for restricted browser contexts.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === "undefined") return false;

  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // Fallback if clipboard API throws (e.g. iframe permission or older context)
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-999999px";
    textArea.style.top = "-999999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch {
    return false;
  }
}

/**
 * Formats a binary (True/False) card into a targeted Markdown prompt
 * optimized for pasting into an AI (ChatGPT, Claude, Gemini).
 */
export function formatBinaryCardPrompt(
  card: BinaryCardPayload,
  lastAnswer?: BinaryAnswer | null,
): string {
  const parts: string[] = [];

  parts.push(
    `I am studying ${card.category.toUpperCase()} (${card.level} level) and came across this True/False question:`,
  );
  parts.push("");
  parts.push(`**Statement:**`);
  parts.push(`> ${card.statement}`);
  parts.push("");

  if (card.codeSnippet) {
    const lang = card.codeLanguage || (card.category === "react" ? "tsx" : "typescript");
    parts.push(`**Code:**`);
    parts.push("```" + lang);
    parts.push(card.codeSnippet);
    parts.push("```");
    parts.push("");
  }

  parts.push(`**Correct Truth:** ${card.truth ? "TRUE" : "FALSE"}`);

  if (lastAnswer) {
    const userChoice =
      lastAnswer.choice === null
        ? "Skipped / Don't know"
        : lastAnswer.choice
          ? "True"
          : "False";
    const status = lastAnswer.correct ? "Correct" : "Incorrect";
    parts.push(`**My Answer:** ${userChoice} (${status})`);
  }

  parts.push("");
  parts.push(`**Author's Explanation:**`);
  parts.push(`> ${card.explanation}`);
  parts.push("");
  parts.push(`**Request:**`);
  parts.push(
    `Please explain this concept in depth so I can master it:\n` +
      `1. Why is the statement ${card.truth ? "TRUE" : "FALSE"}? Break down the mechanics step-by-step.\n` +
      `2. How does this behave at runtime vs. compile-time / type-checker level?\n` +
      `3. What are common misconceptions, edge cases, or traps related to this?\n` +
      `4. Provide clear, minimal code examples illustrating the nuance.`,
  );

  return parts.join("\n");
}

/**
 * Formats multiple binary cards (e.g. missed cards on summary screen)
 * into a single comprehensive AI study guide prompt.
 */
export function formatBinaryCardsListPrompt(cards: BinaryCardPayload[]): string {
  const parts: string[] = [];

  parts.push(
    `I am reviewing questions I missed during my practice session. Please help me understand each one in depth:`,
  );
  parts.push("");

  cards.forEach((card, index) => {
    parts.push(`### Question ${index + 1} (${card.category.toUpperCase()} - ${card.level})`);
    parts.push(`**Statement:**`);
    parts.push(`> ${card.statement}`);
    parts.push("");

    if (card.codeSnippet) {
      const lang = card.codeLanguage || (card.category === "react" ? "tsx" : "typescript");
      parts.push(`**Code:**`);
      parts.push("```" + lang);
      parts.push(card.codeSnippet);
      parts.push("```");
      parts.push("");
    }

    parts.push(`**Truth:** ${card.truth ? "TRUE" : "FALSE"}`);
    parts.push(`**Explanation:** ${card.explanation}`);
    parts.push("");
    parts.push("---");
    parts.push("");
  });

  parts.push(
    `For each question above, please explain why the truth value is what it is, highlight the core mental model or pitfall, and provide a quick illustrative example.`,
  );

  return parts.join("\n");
}

/**
 * Formats a standard multiple-choice question into a targeted AI prompt.
 */
export function formatQuestionPrompt(
  question: QuestionPayload,
  selectedOptionId?: string | null,
): string {
  const parts: string[] = [];

  parts.push(
    `I am studying ${question.subjectTitle} (${question.category} - ${question.level} level) and need help understanding this question:`,
  );
  parts.push("");
  parts.push(`**Question:**`);
  parts.push(`> ${question.prompt}`);
  parts.push("");

  if (question.codeSnippet) {
    parts.push(`**Code Snippet:**`);
    parts.push("```" + (question.codeLanguage || "typescript"));
    parts.push(question.codeSnippet);
    parts.push("```");
    parts.push("");
  }

  parts.push(`**Options:**`);
  question.options.forEach((opt) => {
    const isCorrect = opt.id === question.correctAnswer;
    const isChosen = opt.id === selectedOptionId;
    const markers: string[] = [];
    if (isCorrect) markers.push("CORRECT ANSWER");
    if (isChosen) markers.push("MY CHOICE");
    const markerStr = markers.length > 0 ? ` [${markers.join(", ")}]` : "";
    parts.push(`- **${opt.id}:** ${opt.text}${markerStr}`);
  });
  parts.push("");

  parts.push(`**Author's Explanation:**`);
  parts.push(`> ${question.explanation}`);
  parts.push("");

  if (question.misconception) {
    parts.push(`**Common Trap / Misconception:**`);
    parts.push(`> ${question.misconception}`);
    parts.push("");
  }

  parts.push(`**Request:**`);
  parts.push(
    `Please break down this problem for me:\n` +
      `1. Why is option (${question.correctAnswer}) the right answer?\n` +
      `2. Why are the distractors wrong?\n` +
      `3. What is the fundamental concept or runtime/compiler behavior behind this?`,
  );

  return parts.join("\n");
}
