"use client";

/**
 * A toy REST API over an in-memory /posts collection, following the usual
 * conventions: status codes, Location on create, 204 on delete, 405 with an
 * Allow header for an unsupported method. "Send again" shows idempotency.
 */
import { useState } from "react";
import { cn } from "@lib";
import { DEMO_LABEL, DemoButton, Segmented } from "./ui";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
interface Post {
  id: number;
  title: string;
  draft: boolean;
}
interface Exchange {
  id: number;
  request: string;
  status: number;
  statusText: string;
  headers: string[];
  body: string | null;
}

const STATUS_TEXT: Record<number, string> = {
  200: "OK",
  201: "Created",
  204: "No Content",
  400: "Bad Request",
  404: "Not Found",
  405: "Method Not Allowed",
};

const INITIAL: Post[] = [
  { id: 1, title: "Hello", draft: false },
  { id: 2, title: "Second post", draft: true },
];

function handle(posts: Post[], nextId: number, method: Method, path: string, body: string) {
  const json = (value: unknown) => JSON.stringify(value);
  const respond = (status: number, payload: unknown = null, headers: string[] = []) => ({
    status,
    headers: payload === null ? headers : ["Content-Type: application/json", ...headers],
    body: payload === null ? null : json(payload),
  });
  const parseBody = (): Partial<Post> | null => {
    try {
      const value: unknown = JSON.parse(body);
      return typeof value === "object" && value !== null ? (value as Partial<Post>) : null;
    } catch {
      return null;
    }
  };

  const match = /^\/posts(?:\/(\d+))?$/.exec(path);
  if (!match) return { posts, nextId, response: respond(404, { error: "No such resource" }) };
  const id = match[1] === undefined ? null : Number(match[1]);

  if (id === null) {
    if (method === "GET") return { posts, nextId, response: respond(200, posts) };
    if (method === "POST") {
      const data = parseBody();
      if (!data?.title) return { posts, nextId, response: respond(400, { error: "title is required" }) };
      const post = { id: nextId, title: data.title, draft: Boolean(data.draft) };
      return { posts: [...posts, post], nextId: nextId + 1, response: respond(201, post, [`Location: /posts/${post.id}`]) };
    }
    return { posts, nextId, response: respond(405, { error: `${method} is not supported on a collection` }, ["Allow: GET, POST"]) };
  }

  const existing = posts.find((post) => post.id === id);
  if (method === "POST") return { posts, nextId, response: respond(405, { error: "POST to the collection instead" }, ["Allow: GET, PUT, PATCH, DELETE"]) };
  if (!existing) return { posts, nextId, response: respond(404, { error: `post ${id} not found` }) };
  if (method === "GET") return { posts, nextId, response: respond(200, existing) };
  if (method === "DELETE") return { posts: posts.filter((post) => post.id !== id), nextId, response: respond(204) };

  const data = parseBody();
  if (!data) return { posts, nextId, response: respond(400, { error: "body must be JSON" }) };
  if (method === "PUT") {
    if (!data.title) return { posts, nextId, response: respond(400, { error: "PUT replaces the whole post: title is required" }) };
    const replaced = { id, title: data.title, draft: Boolean(data.draft) };
    return { posts: posts.map((post) => (post.id === id ? replaced : post)), nextId, response: respond(200, replaced) };
  }
  const patched = { ...existing, ...data, id };
  return { posts: posts.map((post) => (post.id === id ? patched : post)), nextId, response: respond(200, patched) };
}

const BODY_DEFAULT: Record<Method, string> = {
  GET: "",
  DELETE: "",
  POST: '{ "title": "New post" }',
  PUT: '{ "title": "Replaced" }',
  PATCH: '{ "draft": false }',
};

export function RestExplorer() {
  const [posts, setPosts] = useState(INITIAL);
  const [nextId, setNextId] = useState(3);
  const [method, setMethod] = useState<Method>("GET");
  const [path, setPath] = useState("/posts");
  const [body, setBody] = useState("");
  const [history, setHistory] = useState<Exchange[]>([]);
  const hasBody = method === "POST" || method === "PUT" || method === "PATCH";

  function send() {
    const result = handle(posts, nextId, method, path, body);
    setPosts(result.posts);
    setNextId(result.nextId);
    setHistory((current) => [
      { id: Date.now() + Math.random(), request: `${method} ${path}${hasBody ? ` ${body}` : ""}`, statusText: STATUS_TEXT[result.response.status] ?? "", ...result.response },
      ...current.slice(0, 7),
    ]);
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Segmented
          label="Method"
          value={method}
          options={(["GET", "POST", "PUT", "PATCH", "DELETE"] as const).map((value) => ({ value, label: value }))}
          onChange={(next) => {
            setMethod(next);
            setBody(BODY_DEFAULT[next]);
          }}
        />
        <div className="flex flex-wrap gap-1">
          {["/posts", "/posts/1", "/posts/2", "/posts/99"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setPath(option)}
              className={cn("rounded-md border px-2 py-1 font-mono text-[11.5px]", option === path ? "border-flame text-paper" : "border-line-2 text-stone hover:text-bone")}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <code className="text-paper font-mono text-[13px]">
          {method} {path}
        </code>
        {hasBody ? (
          <input
            value={body}
            onChange={(event) => setBody(event.target.value)}
            spellCheck={false}
            aria-label="Request body (JSON)"
            className="border-line-3 bg-well text-paper min-w-0 flex-1 rounded-md border px-2.5 py-1.5 font-mono text-[12px] outline-none focus:border-flame"
          />
        ) : null}
        <DemoButton tone="primary" onClick={send}>
          {history.length > 0 && history[0].request.startsWith(`${method} ${path}`) ? "Send again" : "Send"}
        </DemoButton>
      </div>
      <div className="grid gap-3 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-2">
          <span className={DEMO_LABEL}>responses, newest first</span>
          {history.length === 0 ? <p className="text-slate m-0 font-mono text-[12px]">Send a request.</p> : null}
          {history.map((exchange) => (
            <div key={exchange.id} className="border-line-3 bg-surface rounded-md border px-3 py-2 font-mono text-[11.5px]">
              <div className="text-stone break-all">{exchange.request}</div>
              <div className={cn("font-semibold", exchange.status < 300 ? "text-mint-soft" : "text-rust")}>
                {exchange.status} {exchange.statusText}
              </div>
              {exchange.headers.map((header) => (
                <div key={header} className="text-slate">
                  {header}
                </div>
              ))}
              {exchange.body ? <div className="text-bone mt-0.5 break-all">{exchange.body}</div> : null}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <span className={DEMO_LABEL}>server state</span>
          <pre className="border-line-2 bg-well text-[var(--code-string)] m-0 rounded-md border px-3 py-2 font-mono text-[11.5px] whitespace-pre-wrap">
            {JSON.stringify(posts, null, 1)}
          </pre>
          <p className="text-ash m-0 text-[12px]/[1.55]">
            Send DELETE /posts/1 twice: 204, then 404, but the state is the same, which is what idempotent means. POST twice creates two posts.
          </p>
        </div>
      </div>
    </div>
  );
}
