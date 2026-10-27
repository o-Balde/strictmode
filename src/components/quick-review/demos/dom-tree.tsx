"use client";

/**
 * The tree this browser's HTML parser builds from your markup. DOMParser
 * documents are inert (no scripts run, no images load), so any markup is
 * safe to try. Whitespace text nodes are real nodes; they can be hidden.
 */
import { useMemo, useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, Switch } from "./ui";

const SAMPLE = `<ul id="list">
  <li class="done">Write</li>
  <li>Review <b>carefully</b></li>
</ul>
<!-- a comment is a node too -->
<table><tr><td>The parser adds a tbody</td></tr></table>`;

interface Row {
  key: string;
  depth: number;
  node: Node;
}

function rows(root: Node, showWhitespace: boolean): Row[] {
  const out: Row[] = [];
  const walk = (node: Node, depth: number, key: string) => {
    if (!showWhitespace && node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) return;
    out.push({ key, depth, node });
    node.childNodes.forEach((child, index) => walk(child, depth + 1, `${key}.${index}`));
  };
  walk(root, 0, "0");
  return out;
}

const TYPE_NAME: Record<number, string> = {
  [Node.ELEMENT_NODE]: "Element",
  [Node.TEXT_NODE]: "Text",
  [Node.COMMENT_NODE]: "Comment",
  [Node.DOCUMENT_NODE]: "Document",
};

function label(node: Node): { text: string; tone: string } {
  if (node instanceof Element) {
    const id = node.id ? `#${node.id}` : "";
    const classes = node.classList.length ? `.${[...node.classList].join(".")}` : "";
    return { text: `<${node.localName}${id}${classes}>`, tone: "text-[var(--code-keyword)]" };
  }
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    return { text: text.trim() ? JSON.stringify(text) : `whitespace ${JSON.stringify(text)}`, tone: text.trim() ? "text-[var(--code-string)]" : "text-slate" };
  }
  if (node.nodeType === Node.COMMENT_NODE) return { text: `<!--${node.textContent}-->`, tone: "text-[var(--code-comment)]" };
  return { text: node.nodeName, tone: "text-bone" };
}

export function DomTree() {
  const [markup, setMarkup] = useState(SAMPLE);
  const [showWhitespace, setShowWhitespace] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const body = useMemo(() => new DOMParser().parseFromString(markup, "text/html").body, [markup]);
  const list = rows(body, showWhitespace);
  const chosen = list.find((row) => row.key === selected)?.node;
  const elements = list.filter((row) => row.node.nodeType === Node.ELEMENT_NODE).length;

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className={DEMO_LABEL}>markup</span>
          <textarea
            value={markup}
            onChange={(event) => setMarkup(event.target.value)}
            rows={9}
            spellCheck={false}
            className="border-line-3 bg-well text-paper rounded-md border px-3 py-2 font-mono text-[12px]/[1.7] outline-none focus:border-flame"
          />
        </label>
        <Switch label="show whitespace text nodes" checked={showWhitespace} onChange={setShowWhitespace} />
        <p className="text-ash m-0 text-[12px]">
          {list.length} nodes, of which {elements} are elements. Try an unclosed tag, or a <code className="prep-code">&lt;p&gt;</code> inside another{" "}
          <code className="prep-code">&lt;p&gt;</code>.
        </p>
      </div>
      <div className="flex min-w-0 flex-col gap-2">
        <div className="border-line-3 bg-surface scrollbar-hairline max-h-80 overflow-auto rounded-md border py-1.5">
          <ul className="m-0 list-none p-0 font-mono text-[12px]/[1.75]">
            {list.map((row) => {
              const { text, tone } = label(row.node);
              return (
                <li key={row.key}>
                  <button
                    type="button"
                    onClick={() => setSelected(row.key)}
                    className={cn("block w-full truncate px-2 text-left hover:bg-surface-4", selected === row.key && "bg-flame-deep")}
                    style={{ paddingLeft: 8 + row.depth * 16 }}
                  >
                    <span className={tone}>{text}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {chosen ? (
          <dl className="border-line-2 bg-surface-2 m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-0.5 rounded-md border px-3 py-2 font-mono text-[11.5px]">
            <dt className="text-ash">nodeType</dt>
            <dd className="text-bone m-0">
              {chosen.nodeType} ({TYPE_NAME[chosen.nodeType] ?? chosen.nodeName})
            </dd>
            <dt className="text-ash">parentNode</dt>
            <dd className="text-bone m-0">{chosen.parentNode?.nodeName.toLowerCase() ?? "null"}</dd>
            <dt className="text-ash">childNodes</dt>
            <dd className="text-bone m-0">{chosen.childNodes.length}</dd>
            {chosen instanceof Element ? (
              <>
                <dt className="text-ash">children</dt>
                <dd className="text-bone m-0">{chosen.children.length} (elements only)</dd>
              </>
            ) : null}
          </dl>
        ) : (
          <p className="text-slate m-0 text-[12px]">Pick a node to see its properties.</p>
        )}
      </div>
    </div>
  );
}
