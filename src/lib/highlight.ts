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
import type { CodeLanguage } from "@data";

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
const GROUND = "#0c0b0a";

/** One entry per `--code-*` custom property in globals.css. */
const HUE = {
  plain: "#f8f8f2",
  keyword: "#ff79c6",
  string: "#f1fa8c",
  function: "#50fa7b",
  type: "#8be9fd",
  comment: "#6272a4",
  number: "#bd93f9",
  param: "#ffb86c",
} as const;

const STRICTMODE_DRACULA: ThemeRegistration = {
  name: "strictmode-dracula",
  type: "dark",
  colors: {
    "editor.background": GROUND,
    "editor.foreground": HUE.plain,
  },
  settings: [
    { settings: { background: GROUND, foreground: HUE.plain } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: HUE.comment, fontStyle: "italic" },
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
      settings: { foreground: HUE.keyword },
    },
    {
      scope: ["string", "string.quoted", "string.template", "constant.character"],
      settings: { foreground: HUE.string },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.language.boolean",
        "constant.language.null",
        "constant.other",
      ],
      settings: { foreground: HUE.number },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call",
        "variable.function",
      ],
      settings: { foreground: HUE.function },
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
      settings: { foreground: HUE.type, fontStyle: "italic" },
    },
    { scope: ["entity.name.tag", "punctuation.definition.tag"], settings: { foreground: HUE.keyword } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: HUE.function, fontStyle: "italic" } },
    { scope: ["variable.parameter"], settings: { foreground: HUE.param, fontStyle: "italic" } },
    { scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: HUE.plain } },
    { scope: ["punctuation"], settings: { foreground: HUE.plain } },
  ],
};

const LANGS = ["tsx", "typescript", "javascript", "jsx", "css", "json", "html", "http"] as const;

let instance: Promise<Highlighter> | null = null;

function highlighter(): Promise<Highlighter> {
  instance ??= createHighlighter({
    themes: [STRICTMODE_DRACULA],
    langs: [...LANGS],
  });
  return instance;
}

const LANG_MAP: Record<CodeLanguage, (typeof LANGS)[number]> = {
  tsx: "tsx",
  jsx: "jsx",
  typescript: "typescript",
  javascript: "javascript",
  css: "css",
  json: "json",
  html: "html",
  http: "http",
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

/** `tk-k` for a keyword, `tk-ki` for an italic one: see the matching rules in globals.css. */
const TOKEN_CLASS = new Map<string, string>(
  Object.entries(HUE).map(([name, hex]) => [hex, `tk-${name === "plain" ? "x" : name[0]}`]),
);
const ITALIC = 1;

/**
 * The same highlighting as `highlight`, as markup a fraction of the size.
 *
 * `highlight` writes a `style` attribute on every token, which is right for a
 * payload holding one snippet. The prep sheet puts a couple of hundred snippets
 * in a single document, where those attributes came to over a megabyte, twice,
 * since a server-rendered page also carries its content in the RSC payload.
 * Here a token gets a short class, plain tokens get no element at all, and
 * lines end in a newline: the caller renders the result inside a <pre> whose
 * colour is `--code-plain`.
 */
export async function highlightCompact(
  code: string,
  language: CodeLanguage = "typescript",
): Promise<string> {
  const lang = LANG_MAP[language] ?? "typescript";
  try {
    const hl = await highlighter();
    const { tokens } = hl.codeToTokens(code, { lang, theme: "strictmode-dracula" });
    return tokens
      .map((line) =>
        line
          .map((token) => {
            const text = escapeHtml(token.content);
            const italic = ((token.fontStyle ?? 0) & ITALIC) !== 0;
            const base = TOKEN_CLASS.get((token.color ?? HUE.plain).toLowerCase());
            if (base === undefined) return `<span style="color:${token.color}">${text}</span>`;
            if (base === "tk-x" && !italic) return text;
            return `<span class=${base}${italic ? "i" : ""}>${text}</span>`;
          })
          .join(""),
      )
      .join("\n");
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
