/**
 * Build-time syntax highlighting.
 *
 * Shiki runs once per build, in scripts/build-index.ts, and the markup is
 * emitted alongside each question. Highlighting 5 snippets costs ~171 ms of CPU;
 * the whole bank of 370 costs ~394 ms. Doing it per request meant paying more
 * than the entire bank costs, on every drill, forever — so it moved to the
 * build and out of the request path entirely.
 *
 */
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";
import type { CodeLanguage } from "@/data/types";

/**
 * Dracula's syntax hues on this app's own ground.
 *
 * A code snippet is source code, so it is set like an editor. The Homebrew
 * terminal skin is reserved for console output — the options of an
 * output-prediction question — so the two surfaces never look alike.
 *
 * The hues are Dracula's exactly; the background stays #0c0b0a rather than
 * Dracula's cool #282a36, so the well belongs to the warm palette around it
 * instead of reading as a pasted screenshot.
 */
const STRICTMODE_DRACULA: ThemeRegistration = {
  name: "strictmode-dracula",
  type: "dark",
  colors: {
    "editor.background": "#0c0b0a",
    "editor.foreground": "#f8f8f2",
  },
  settings: [
    { settings: { background: "#0c0b0a", foreground: "#f8f8f2" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#6272a4", fontStyle: "italic" },
    },
    {
      scope: [
        "keyword",
        "storage",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "keyword.operator",
        "keyword.operator.new",
        "keyword.operator.expression",
        "variable.language",
      ],
      settings: { foreground: "#ff79c6" },
    },
    {
      scope: ["string", "string.quoted", "string.template", "constant.character"],
      settings: { foreground: "#f1fa8c" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.language.boolean",
        "constant.language.null",
        "constant.other",
      ],
      settings: { foreground: "#bd93f9" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: { foreground: "#50fa7b" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "support.class",
        "entity.other.inherited-class",
        "meta.type.parameters",
      ],
      settings: { foreground: "#8be9fd", fontStyle: "italic" },
    },
    { scope: ["entity.name.tag", "punctuation.definition.tag"], settings: { foreground: "#ff79c6" } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#50fa7b", fontStyle: "italic" } },
    { scope: ["variable.parameter"], settings: { foreground: "#ffb86c", fontStyle: "italic" } },
    { scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: "#f8f8f2" } },
    { scope: ["punctuation"], settings: { foreground: "#f8f8f2" } },
  ],
};

const LANGS = ["tsx", "typescript", "javascript", "jsx", "css", "json"] as const;

let instance: Promise<Highlighter> | null = null;

function highlighter(): Promise<Highlighter> {
  instance ??= createHighlighter({
    themes: [STRICTMODE_DRACULA],
    langs: [...LANGS],
  });
  return instance;
}

const LANG_MAP: Record<CodeLanguage, string> = {
  tsx: "tsx",
  jsx: "jsx",
  typescript: "typescript",
  javascript: "javascript",
  css: "css",
  json: "json",
};

/**
 * Returns highlighted HTML for a snippet. Falls back to escaped plain text if
 * the grammar chokes — a snippet that will not parse should still be readable.
 */
export async function highlight(
  code: string,
  language: CodeLanguage = "typescript",
): Promise<string> {
  const lang = LANG_MAP[language] ?? "typescript";
  try {
    const hl = await highlighter();
    return hl.codeToHtml(code, {
      lang,
      theme: "strictmode-dracula",
      structure: "inline",
    });
  } catch {
    return escapeHtml(code);
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
