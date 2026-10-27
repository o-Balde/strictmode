"use client";

/**
 * Specified features, and whether the browser reading this implements them.
 * Every answer is this browser's own, checked by feature detection the way
 * production code should check.
 */
import { useState } from "react";
import { cn } from "@lib";

interface Feature {
  name: string;
  spec: string;
  check: string;
  test: () => boolean;
}

const supports = (rule: string) => typeof CSS !== "undefined" && CSS.supports(rule);

const FEATURES: Feature[] = [
  { name: "<dialog> element", spec: "HTML", check: "typeof HTMLDialogElement === \"function\"", test: () => typeof HTMLDialogElement === "function" },
  { name: "Popover API", spec: "HTML", check: "\"showPopover\" in HTMLElement.prototype", test: () => "showPopover" in HTMLElement.prototype },
  { name: "<search> element", spec: "HTML", check: "document.createElement(\"search\") is not HTMLUnknownElement", test: () => !(document.createElement("search") instanceof HTMLUnknownElement) },
  { name: "Invoker commands (commandfor)", spec: "HTML", check: "\"command\" in HTMLButtonElement.prototype", test: () => "command" in HTMLButtonElement.prototype },
  { name: ":has() selector", spec: "CSS Selectors 4", check: 'CSS.supports("selector(:has(a))")', test: () => supports("selector(:has(a))") },
  { name: "Container queries", spec: "CSS Containment 3", check: 'CSS.supports("container-type: inline-size")', test: () => supports("container-type: inline-size") },
  { name: "Native CSS nesting", spec: "CSS Nesting", check: 'CSS.supports("selector(&)")', test: () => supports("selector(&)") },
  { name: "Anchor positioning", spec: "CSS Anchor Positioning", check: 'CSS.supports("anchor-name: --a")', test: () => supports("anchor-name: --a") },
  { name: "text-wrap: balance", spec: "CSS Text 4", check: 'CSS.supports("text-wrap: balance")', test: () => supports("text-wrap: balance") },
  { name: "View transitions", spec: "CSS View Transitions", check: '"startViewTransition" in document', test: () => "startViewTransition" in document },
  { name: "structuredClone", spec: "HTML", check: 'typeof structuredClone === "function"', test: () => typeof structuredClone === "function" },
  { name: "Array.prototype.toSorted", spec: "ES2023", check: '"toSorted" in Array.prototype', test: () => "toSorted" in Array.prototype },
  { name: "Object.groupBy", spec: "ES2024", check: '"groupBy" in Object', test: () => "groupBy" in Object },
  { name: "Promise.withResolvers", spec: "ES2024", check: '"withResolvers" in Promise', test: () => "withResolvers" in Promise },
  { name: "Set methods (union, ...)", spec: "ES2025", check: '"union" in Set.prototype', test: () => "union" in Set.prototype },
  { name: "Iterator helpers", spec: "ES2025", check: 'typeof Iterator?.prototype?.map === "function"', test: () => typeof (globalThis as { Iterator?: { prototype?: { map?: unknown } } }).Iterator?.prototype?.map === "function" },
  { name: "Temporal", spec: "ECMAScript (Temporal)", check: '"Temporal" in globalThis', test: () => "Temporal" in globalThis },
  { name: "URLPattern", spec: "URL Pattern", check: '"URLPattern" in globalThis', test: () => "URLPattern" in globalThis },
];

export function FeatureDetect() {
  const [results] = useState(() =>
    FEATURES.map((feature) => {
      try {
        return feature.test();
      } catch {
        return false;
      }
    }),
  );
  const supported = results.filter(Boolean).length;

  return (
    <div className="flex flex-col gap-3">
      <p className="text-bone m-0 text-[13px]">
        This browser implements <span className="text-flame font-mono">{supported}</span> of the {FEATURES.length} specified features below.
      </p>
      <div className="scrollbar-hairline overflow-x-auto">
        <table className="w-full min-w-136 border-collapse text-left text-[12.5px]">
          <thead>
            <tr className="bg-surface-4 text-ash">
              <th className="px-3 py-2 font-medium">feature</th>
              <th className="px-3 py-2 font-medium">specified in</th>
              <th className="px-3 py-2 font-medium">detected with</th>
              <th className="px-3 py-2 font-medium">here</th>
            </tr>
          </thead>
          <tbody>
            {FEATURES.map((feature, index) => (
              <tr key={feature.name} className="border-line border-t">
                <td className="text-paper px-3 py-1.5">{feature.name}</td>
                <td className="text-stone px-3 py-1.5">{feature.spec}</td>
                <td className="text-slate px-3 py-1.5 font-mono text-[11px]">{feature.check}</td>
                <td className={cn("px-3 py-1.5 font-mono text-[12px] font-semibold", results[index] ? "text-mint-soft" : "text-rust")}>
                  {results[index] ? "yes" : "no"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-ash m-0 text-[12px]/[1.6]">
        Open this in another browser and the right-hand column changes; the specification column doesn&apos;t. That gap is what feature
        detection, polyfills and progressive enhancement are for.
      </p>
    </div>
  );
}
