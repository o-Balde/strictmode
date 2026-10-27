"use client";

/**
 * The same markup through this browser's two parsers: the forgiving HTML
 * parser and the strict XML parser that XHTML documents get when served as
 * application/xhtml+xml. Both results come from DOMParser.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, Panel } from "./ui";

const PRESETS = [
  { label: "valid XHTML", value: '<p class="note">Hello<br />world</p>\n<input type="checkbox" checked="checked" />' },
  { label: "unclosed tags", value: "<p>One\n<p>Two <b>bold" },
  { label: "uppercase tags", value: "<P>Shouting</P>" },
  { label: "unquoted attribute", value: "<p class=note>Hi</p>" },
  { label: "minimised attribute", value: "<input type=\"checkbox\" checked />" },
  { label: "bare ampersand", value: "<p>Fish & chips</p>" },
  { label: "misnested", value: "<b><i>bold italic</b></i>" },
];

const XHTML_NS = "http://www.w3.org/1999/xhtml";

function parseBoth(markup: string) {
  const html = new DOMParser().parseFromString(markup, "text/html").body.innerHTML;
  const xml = new DOMParser().parseFromString(`<html xmlns="${XHTML_NS}"><body>${markup}</body></html>`, "application/xhtml+xml");
  const error = xml.querySelector("parsererror");
  const body = xml.getElementsByTagNameNS(XHTML_NS, "body")[0];
  return {
    html,
    xml: error ? null : new XMLSerializer().serializeToString(body).replace(/^<body[^>]*>|<\/body>$/g, ""),
    xmlError: error?.textContent?.replace(/\s+/g, " ").trim() ?? null,
  };
}

export function HtmlVsXhtml() {
  const [markup, setMarkup] = useState(PRESETS[1].value);
  const result = useMemo(() => parseBoth(markup), [markup]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {PRESETS.map((preset) => (
          <DemoButton key={preset.label} onClick={() => setMarkup(preset.value)}>
            {preset.label}
          </DemoButton>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className={DEMO_LABEL}>markup</span>
        <textarea
          value={markup}
          onChange={(event) => setMarkup(event.target.value)}
          rows={3}
          spellCheck={false}
          className="border-line-3 bg-well text-paper rounded-md border px-3 py-2 font-mono text-[12.5px] outline-none focus:border-flame"
        />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        <Panel title="text/html: the HTML parser">
          <p className="text-mint-soft m-0 mb-1.5 text-[12px]">Always produces a document, repairing as it goes:</p>
          <pre className="text-bone m-0 font-mono text-[12px] break-all whitespace-pre-wrap">{result.html}</pre>
        </Panel>
        <Panel title="application/xhtml+xml: the XML parser" className={result.xml === null ? "border-rust-line" : undefined}>
          {result.xml === null ? (
            <>
              <p className="text-rust m-0 mb-1.5 text-[12px] font-medium">Fatal error: the browser would show this instead of the page.</p>
              <p className="text-stone m-0 font-mono text-[11.5px] break-words">{result.xmlError}</p>
            </>
          ) : (
            <>
              <p className="text-mint-soft m-0 mb-1.5 text-[12px]">Well-formed: parsed exactly as written.</p>
              <pre className={cn("text-bone m-0 font-mono text-[12px] break-all whitespace-pre-wrap")}>{result.xml}</pre>
            </>
          )}
        </Panel>
      </div>
    </div>
  );
}
