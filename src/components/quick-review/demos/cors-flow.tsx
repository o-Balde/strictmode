"use client";

/**
 * A model of the browser's CORS checks, following the Fetch standard: when a
 * request is "simple", when a preflight is sent, and which response header
 * makes it fail. Pick the request on the left and the server's configuration
 * on the right; the exchange is drawn as a sequence diagram.
 */
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@lib";
import { DEMO_LABEL, Panel, Segmented, Switch } from "./ui";

export type Method = "GET" | "POST" | "PUT" | "DELETE";
export type ContentType = "none" | "text/plain" | "application/x-www-form-urlencoded" | "application/json";
export type ExtraHeader = "none" | "Authorization" | "X-Request-Id";
export type AllowOrigin = "exact" | "*" | "other" | "missing";
export type AllowMethods = "GET, POST" | "GET, POST, PUT, DELETE" | "*";
export type AllowHeaders = "none" | "Content-Type" | "Content-Type, Authorization, X-Request-Id" | "*";

export interface CorsRequest {
  method: Method;
  contentType: ContentType;
  header: ExtraHeader;
  credentials: boolean;
}

export interface CorsServer {
  origin: AllowOrigin;
  methods: AllowMethods;
  headers: AllowHeaders;
  credentials: boolean;
}

const ORIGIN = "https://app.example";
const SAFELISTED_METHODS: readonly Method[] = ["GET", "POST"];
const SAFELISTED_CONTENT_TYPES: readonly ContentType[] = ["none", "text/plain", "application/x-www-form-urlencoded"];

export interface Message {
  from: "browser" | "server";
  title: string;
  headers: string[];
}

export interface CorsOutcome {
  preflight: boolean;
  why: string;
  messages: Message[];
  allowed: boolean;
  reason: string;
}

/** The non-safelisted request headers the request carries, by name. */
function unsafeHeaders(request: CorsRequest): string[] {
  const names: string[] = [];
  if (!SAFELISTED_CONTENT_TYPES.includes(request.contentType)) names.push("content-type");
  if (request.header !== "none") names.push(request.header.toLowerCase());
  return names;
}

function originAllowed(server: CorsServer, credentials: boolean): string | null {
  if (server.origin === "missing") return "the response has no Access-Control-Allow-Origin header";
  if (server.origin === "other") return `Access-Control-Allow-Origin names a different origin, not ${ORIGIN}`;
  if (server.origin === "*" && credentials) return "with credentials, Access-Control-Allow-Origin may not be *: it must name the origin";
  if (credentials && !server.credentials) return "with credentials, the response must also send Access-Control-Allow-Credentials: true";
  return null;
}

const originHeader = (server: CorsServer) =>
  server.origin === "missing" ? null : `Access-Control-Allow-Origin: ${server.origin === "exact" ? ORIGIN : server.origin === "*" ? "*" : "https://other.example"}`;

export function evaluateCors(request: CorsRequest, server: CorsServer): CorsOutcome {
  const headers = unsafeHeaders(request);
  const methodSafe = SAFELISTED_METHODS.includes(request.method);
  const preflight = !methodSafe || headers.length > 0;
  const why = preflight
    ? [!methodSafe ? `${request.method} is not a CORS-safelisted method` : null, headers.length ? `it sends ${headers.join(" and ")}, which ${headers.length === 1 ? "is" : "are"} not safelisted` : null]
        .filter(Boolean)
        .join("; ")
    : "a GET or POST with only safelisted headers and content type is sent directly";

  const responseHeaders = [originHeader(server), server.credentials ? "Access-Control-Allow-Credentials: true" : null].filter(
    (header): header is string => header !== null,
  );
  const requestHeaders = [
    `Origin: ${ORIGIN}`,
    request.contentType !== "none" ? `Content-Type: ${request.contentType}` : null,
    request.header !== "none" ? `${request.header}: …` : null,
    request.credentials ? "Cookie: session=…" : null,
  ].filter((header): header is string => header !== null);

  const messages: Message[] = [];
  if (preflight) {
    messages.push({
      from: "browser",
      title: `OPTIONS /api/items (preflight)`,
      headers: [
        `Origin: ${ORIGIN}`,
        `Access-Control-Request-Method: ${request.method}`,
        ...(headers.length ? [`Access-Control-Request-Headers: ${headers.join(", ")}`] : []),
      ],
    });
    messages.push({
      from: "server",
      title: "204 No Content",
      headers: [...responseHeaders, `Access-Control-Allow-Methods: ${server.methods}`, ...(server.headers === "none" ? [] : [`Access-Control-Allow-Headers: ${server.headers}`])],
    });

    const originProblem = originAllowed(server, request.credentials);
    if (originProblem) return { preflight, why, messages, allowed: false, reason: `Preflight failed: ${originProblem}. The real request is never sent.` };

    const methods = server.methods.split(", ");
    const wildcardMethods = methods.includes("*") && !request.credentials;
    if (!methodSafe && !methods.includes(request.method) && !wildcardMethods) {
      const extra = methods.includes("*") ? " (* is not a wildcard when credentials are included)" : "";
      return { preflight, why, messages, allowed: false, reason: `Preflight failed: ${request.method} is not in Access-Control-Allow-Methods${extra}. The real request is never sent.` };
    }

    const allowedHeaders = server.headers === "none" ? [] : server.headers.toLowerCase().split(", ");
    const wildcardHeaders = allowedHeaders.includes("*") && !request.credentials;
    const missing = headers.filter(
      (name) => !allowedHeaders.includes(name) && !(wildcardHeaders && name !== "authorization"),
    );
    if (missing.length) {
      const note = missing.includes("authorization") && allowedHeaders.includes("*") ? " (Authorization is never covered by *)" : "";
      return { preflight, why, messages, allowed: false, reason: `Preflight failed: ${missing.join(", ")} not in Access-Control-Allow-Headers${note}. The real request is never sent.` };
    }
  }

  messages.push({ from: "browser", title: `${request.method} /api/items`, headers: requestHeaders });
  messages.push({ from: "server", title: "200 OK", headers: [...responseHeaders, "Content-Type: application/json"] });

  const originProblem = originAllowed(server, request.credentials);
  if (originProblem) {
    return {
      preflight,
      why,
      messages,
      allowed: false,
      reason: `The request reached the server and it answered, but the browser hides the response from your script: ${originProblem}.`,
    };
  }
  return { preflight, why, messages, allowed: true, reason: "The browser hands the response to your script." };
}

export function CorsFlow() {
  const reduced = useReducedMotion();
  const [request, setRequest] = useState<CorsRequest>({ method: "GET", contentType: "none", header: "none", credentials: false });
  const [server, setServer] = useState<CorsServer>({ origin: "exact", methods: "GET, POST", headers: "Content-Type", credentials: false });
  const outcome = evaluateCors(request, server);
  const patchRequest = (patch: Partial<CorsRequest>) => setRequest((current) => ({ ...current, ...patch }));
  const patchServer = (patch: Partial<CorsServer>) => setServer((current) => ({ ...current, ...patch }));
  const runKey = JSON.stringify([request, server]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3 md:grid-cols-2">
        <Panel title={`Request from ${ORIGIN}`}>
          <div className="flex flex-col gap-2.5">
            <Segmented label="Method" value={request.method} options={(["GET", "POST", "PUT", "DELETE"] as const).map((value) => ({ value, label: value }))} onChange={(method) => patchRequest({ method })} />
            <Segmented
              label="Content-Type"
              value={request.contentType}
              options={[
                { value: "none", label: "no body" },
                { value: "text/plain", label: "text/plain" },
                { value: "application/x-www-form-urlencoded", label: "form" },
                { value: "application/json", label: "JSON" },
              ]}
              onChange={(contentType) => patchRequest({ contentType })}
            />
            <Segmented
              label="Extra header"
              value={request.header}
              options={[
                { value: "none", label: "no extra header" },
                { value: "Authorization", label: "Authorization" },
                { value: "X-Request-Id", label: "X-Request-Id" },
              ]}
              onChange={(header) => patchRequest({ header })}
            />
            <Switch label='credentials: "include" (send cookies)' checked={request.credentials} onChange={(credentials) => patchRequest({ credentials })} />
          </div>
        </Panel>
        <Panel title="Server at https://api.example">
          <div className="flex flex-col gap-2.5">
            <Segmented
              label="Access-Control-Allow-Origin"
              value={server.origin}
              options={[
                { value: "exact", label: ORIGIN },
                { value: "*", label: "*" },
                { value: "other", label: "other origin" },
                { value: "missing", label: "missing" },
              ]}
              onChange={(origin) => patchServer({ origin })}
            />
            <Segmented
              label="Access-Control-Allow-Methods"
              value={server.methods}
              options={(["GET, POST", "GET, POST, PUT, DELETE", "*"] as const).map((value) => ({ value, label: value }))}
              onChange={(methods) => patchServer({ methods })}
            />
            <Segmented
              label="Access-Control-Allow-Headers"
              value={server.headers}
              options={[
                { value: "none", label: "none" },
                { value: "Content-Type", label: "Content-Type" },
                { value: "Content-Type, Authorization, X-Request-Id", label: "all three" },
                { value: "*", label: "*" },
              ]}
              onChange={(headers) => patchServer({ headers })}
            />
            <Switch label="Access-Control-Allow-Credentials: true" checked={server.credentials} onChange={(credentials) => patchServer({ credentials })} />
          </div>
        </Panel>
      </div>

      <p className="text-bone m-0 text-[13px]">
        <span className={cn("font-mono text-[12px]", outcome.preflight ? "text-peach" : "text-mint-soft")}>
          {outcome.preflight ? "Preflight needed" : "Simple request"}
        </span>
        : {outcome.why}.
      </p>

      <div className="border-line-2 bg-surface-2 relative rounded-lg border px-3 py-3 sm:px-5">
        <div className="mb-2 flex justify-between font-mono text-[11.5px]">
          <span className="text-paper">Browser</span>
          <span className="text-paper">api.example</span>
        </div>
        <div className="relative flex flex-col gap-2.5">
          <span aria-hidden className="bg-line-3 absolute inset-y-0 left-0 w-px" />
          <span aria-hidden className="bg-line-3 absolute inset-y-0 right-0 w-px" />
          <AnimatePresence initial={false} mode="popLayout">
            {outcome.messages.map((message, index) => (
              <motion.div
                key={`${runKey}-${index}`}
                initial={reduced ? false : { opacity: 0, x: message.from === "browser" ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduced ? 0 : index * 0.25, duration: 0.25 }}
                className={cn("flex", message.from === "browser" ? "justify-start pr-6 sm:pr-24" : "justify-end pl-6 sm:pl-24")}
              >
                <div className={cn("min-w-0 rounded-md border px-3 py-2", message.from === "browser" ? "border-binary-line bg-binary-deep" : "border-line-3 bg-surface-4")}>
                  <div className={cn("font-mono text-[12px] font-semibold", message.from === "browser" ? "text-binary-soft" : "text-paper")}>
                    {message.from === "browser" ? "→ " : "← "}
                    {message.title}
                  </div>
                  {message.headers.map((header) => (
                    <div key={header} className="text-stone font-mono text-[11px] break-all">
                      {header}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className={cn("rounded-lg border px-3.5 py-2.5", outcome.allowed ? "border-mint-line bg-mint-deep" : "border-rust-line bg-rust-bg")} aria-live="polite">
        <div className={cn(DEMO_LABEL, outcome.allowed ? "text-mint-soft" : "text-rust")}>{outcome.allowed ? "allowed" : "blocked by CORS"}</div>
        <p className="text-bone m-0 text-[13px]/[1.6]">{outcome.reason}</p>
      </div>
    </div>
  );
}
