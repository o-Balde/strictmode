import { list, p, say, steps, table, trap, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_MODERN: PrepSection = {
  id: "react-modern",
  track: "react",
  title: "Server rendering and modern React",
  blurb:
    "React 18 and 19, Suspense, Server Components and hydration. Interviewers use these to see whether your knowledge stopped at hooks or kept up.",
  drill: "server-components",
  questions: [
    {
      id: "modern-rendering-strategies",
      question: "What is the difference between CSR, SSR, SSG and ISR?",
      level: "intermediate",
      short:
        "They differ in where and when the HTML is produced. Client-side rendering builds the page in the browser. Server-side rendering builds it on the server for each request. Static generation builds it once at build time. Incremental static regeneration serves a static page and rebuilds it in the background when it is stale.",
      body: [
        table(
          ["", "HTML is generated", "Strengths", "Weaknesses", "Fits"],
          ["CSR", "In the browser, after the JavaScript loads", "Simple hosting; rich interactivity", "Blank until the bundle runs; weak SEO", "Dashboards, tools behind a login"],
          ["SSR", "On the server, per request", "Fast first paint; fresh, personalised content; good SEO", "Server cost; a slow data source delays the response", "Personalised or frequently changing pages"],
          ["SSG", "At build time", "Fastest; served from a CDN; cheap", "Stale until the next build; build time grows with page count", "Docs, blogs, marketing pages"],
          ["ISR", "At build time, then re-generated on a timer or on demand", "CDN speed with periodic freshness", "Someone sees the stale version; cache invalidation is yours to reason about", "Product pages, news, large catalogues"],
        ),
        steps(
          "With SSR, SSG and ISR the browser receives real HTML and can paint immediately.",
          "It then downloads the JavaScript for the page.",
          "React hydrates: it attaches event handlers to the existing HTML. Only now is the page interactive.",
        ),
        list(
          "**Streaming SSR** sends the HTML in chunks as each part becomes ready, so one slow query no longer holds back the whole page.",
          "**Server Components** change what is sent: components that never need interactivity render on the server and ship no JavaScript at all.",
          "Modern frameworks mix these per route, and even per component, so the real question is usually 'which parts of this page are static, which are per-request, and which are interactive'.",
        ),
        say(
          "I choose by asking two things about each page: does the content differ per user or per request, and how fresh must it be? Static when it can be, server-rendered when it must be, client-rendered for the parts that are purely interactive.",
        ),
      ],
      followUps: [
        {
          q: "SSR makes the page appear sooner. Does it make it interactive sooner?",
          a: "Not by itself. The HTML shows early, but nothing responds until the JavaScript has loaded and hydration finishes. That gap is why shipping less client JavaScript matters as much as rendering on the server.",
        },
        {
          q: "Why does CSR hurt SEO and performance metrics?",
          a: "The initial HTML is an empty shell. Crawlers that do not run JavaScript see nothing, and the largest contentful paint cannot happen until the bundle has downloaded, parsed and fetched its data.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/server",
    },
    {
      id: "modern-hydration",
      question: "What is hydration? What causes a hydration mismatch, and how do you fix one?",
      level: "intermediate",
      short:
        "Hydration is React taking over HTML that was rendered on the server: it renders the components again in the browser, expects the output to match what is already in the DOM, and attaches event handlers to it. A mismatch happens when the server and the first client render produce different output.",
      body: [
        tsx(
          `
function Greeting() {
  // Each of these renders one thing on the server and another in the browser.
  const time = new Date().toLocaleTimeString(); // different clock, different locale
  const width = typeof window === "undefined" ? 0 : window.innerWidth; // no window on the server
  const id = Math.random(); // different every call

  return (
    <p data-id={id}>
      {time} at {width}px
    </p>
  );
}
`,
          { caption: "Three ways to cause a mismatch", tone: "bad" },
        ),
        table(
          ["Cause", "Fix"],
          ["Dates, times, time zones, locale formatting", "Render on the client only, or pass the formatted value from the server"],
          ["`typeof window`, `localStorage`, `matchMedia` checks during render", "Read them after hydration (an effect or `useSyncExternalStore`)"],
          ["`Math.random()`, incrementing IDs", "`useId`, or generate the value on the server and pass it down"],
          ["Invalid HTML nesting (`<div>` inside `<p>`, `<a>` inside `<a>`)", "Fix the markup: the browser 'repairs' it and the DOM no longer matches"],
          ["Browser extensions that modify the page", "Nothing to fix in your code; `suppressHydrationWarning` on the affected element if it is noisy"],
        ),
        tsx(
          `
const subscribe = () => () => {};

// False during server rendering and hydration, true afterwards.
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

function LocalTime({ iso }: { iso: string }) {
  const hydrated = useHydrated();
  // The server and the first client render agree on the ISO string;
  // the localised version appears right after hydration.
  return <time dateTime={iso}>{hydrated ? new Date(iso).toLocaleTimeString() : iso}</time>;
}
`,
          { caption: "Render the same thing first, then upgrade", tone: "good" },
        ),
        trap(
          "`suppressHydrationWarning` hides the warning for one element's text and attributes; it does not repair anything. Use it for an unavoidable difference such as a timestamp, not to silence a real bug.",
        ),
      ],
      followUps: [
        {
          q: "What does React do when it finds a mismatch?",
          a: "It logs an error showing the difference and falls back to client-rendering that subtree up to the nearest Suspense boundary, throwing away the server HTML there. You lose the benefit of server rendering for that part.",
        },
        {
          q: "What is selective hydration?",
          a: "With Suspense boundaries and streaming, React hydrates the page in pieces instead of all at once, and prioritises the piece the user is interacting with. Wrapping independent sections in Suspense is what makes it possible.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/client/hydrateRoot",
    },
    {
      id: "modern-suspense",
      question: "What is Suspense?",
      level: "intermediate",
      short:
        "`<Suspense>` lets a component declare that it is not ready to render yet, and lets a parent decide what to show in the meantime. While anything inside the boundary is waiting, for lazily loaded code or for data, React shows the `fallback`; when it is ready, React swaps in the real content.",
      body: [
        tsx(`
declare function Comments(props: { postId: string }): ReactNode; // suspends while its data loads
declare function Post(props: { postId: string }): ReactNode;
declare function PostSkeleton(): ReactNode;
declare function CommentsSkeleton(): ReactNode;

function PostPage({ postId }: { postId: string }) {
  return (
    <Suspense fallback={<PostSkeleton />}>
      <Post postId={postId} />
      {/* A nested boundary: the post appears as soon as it is ready,
          without waiting for the comments. */}
      <Suspense fallback={<CommentsSkeleton />}>
        <Comments postId={postId} />
      </Suspense>
    </Suspense>
  );
}
`),
        table(
          ["What can suspend", "How"],
          ["Code", "A component created with `lazy`"],
          ["Data", "Reading a promise with `use`, or a Suspense-enabled library or framework"],
          ["Server rendering", "With streaming, each boundary's HTML is sent when its content is ready"],
        ),
        list(
          "**Loading UI becomes declarative.** No `isLoading` flags threaded through props; the boundary's position decides what is replaced by a placeholder.",
          "**Boundaries are a design decision.** Things that should appear together share a boundary; things that can pop in independently get their own.",
          "**Pair it with an error boundary.** Suspense handles 'not yet'; an error boundary handles 'failed'.",
          "**Transitions avoid flashes.** If an update inside a transition suspends, React keeps showing the current screen instead of dropping back to a fallback the user has already seen past.",
        ),
        trap(
          "A plain `fetch` inside `useEffect` does not trigger Suspense. The component has to suspend during render, which means `use`, `lazy`, or a library built for it.",
        ),
      ],
      followUps: [
        {
          q: "How does a component 'suspend'?",
          a: "It throws a promise during render (that is what `use` and `lazy` do internally). React catches it at the nearest boundary, shows the fallback, and re-renders the component when the promise settles.",
        },
        {
          q: "Where do you put boundaries?",
          a: "Around each part that has its own loading time and can make sense by itself: the route, then major panels. Too few and the whole page waits for the slowest part; too many and the page fills with spinners.",
        },
      ],
      docs: "https://react.dev/reference/react/Suspense",
    },
    {
      id: "modern-server-components",
      question: "What are React Server Components? How do they differ from Client Components, and from SSR?",
      level: "senior",
      short:
        "Server Components run only on the server, at build time or per request. They can be `async`, read databases and files directly, and none of their code is sent to the browser. Client Components, marked with `\"use client\"`, are the ones that hold state, run effects and handle events. SSR is a different thing: it turns either kind into HTML for the first paint.",
      body: [
        tsx(
          `
import { LikeButton } from "./like-button";

declare const db: { post: { findMany(): Promise<{ id: string; title: string; likes: number }[]> } };

// A Server Component: async, talks to the database, ships no JavaScript.
export default async function PostsPage() {
  const posts = await db.post.findMany();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          {post.title}
          <LikeButton postId={post.id} initialLikes={post.likes} />
        </li>
      ))}
    </ul>
  );
}
`,
          { caption: "app/posts/page.tsx" },
        ),
        tsx(
          `
"use client";

import { useState } from "react";

// A Client Component: interactive, so it is in the bundle and it hydrates.
export function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  return (
    <button data-post={postId} onClick={() => setLikes(likes + 1)}>
      {likes} likes
    </button>
  );
}
`,
          { caption: "app/posts/like-button.tsx" },
        ),
        table(
          ["", "Server Component", "Client Component"],
          ["Runs", "On the server only", "On the server for the initial HTML, then in the browser"],
          ["JavaScript sent to the browser", "None", "Yes"],
          ["`useState`, `useEffect`, event handlers", "No", "Yes"],
          ["`async` / `await` in the component", "Yes", "No (read promises with `use`)"],
          ["Direct access to a database, the file system, secrets", "Yes", "No"],
          ["Browser APIs", "No", "Yes"],
          ["May import the other kind", "Yes", "No, but it can receive Server Components as `children`"],
        ),
        list(
          "`\"use client\"` marks a boundary, not a single component: everything that file imports becomes part of the client bundle. Put it as far down the tree as you can.",
          "Props passed from a Server Component to a Client Component cross the network, so they must be serialisable: plain data, promises and JSX are fine; functions are not, with the exception of Server Functions.",
          "Server Components need a framework and bundler that support them, such as Next.js or React Router.",
        ),
        say(
          "RSC and SSR answer different questions. SSR is about the first response being HTML. RSC is about which components need to exist in the browser at all. Client Components are still server-rendered to HTML; Server Components are never hydrated.",
        ),
      ],
      followUps: [
        {
          q: "A Server Component needs something interactive deep inside it, and that interactive part needs to wrap more server content. How?",
          a: "Pass the server content as `children`. The Client Component receives already-rendered output and places it; it never imports the Server Component, so that code stays on the server.",
        },
        {
          q: "What are the benefits?",
          a: "Smaller bundles, data fetching next to the data with no client-server waterfall, secrets that never leave the server, and less to hydrate. The costs are a more complex mental model and a dependency on a framework.",
        },
        {
          q: "Can you use context in a Server Component?",
          a: "No, context is a client feature. You render a Client Component provider near the root and pass server-rendered children through it.",
        },
      ],
      docs: "https://react.dev/reference/rsc/server-components",
    },
    {
      id: "modern-react-18-19",
      question: "What changed in React 18 and React 19?",
      level: "intermediate",
      short:
        "React 18 introduced concurrent rendering and the features built on it: automatic batching, transitions and streaming server rendering with Suspense. React 19 built on that with Actions for async mutations, the `use` hook, stable Server Components, `ref` as a regular prop, and a round of removals of long-deprecated APIs.",
      body: [
        table(
          ["React 18", "What it gave you"],
          ["`createRoot` / `hydrateRoot`", "The new root API that enables concurrent features"],
          ["Automatic batching", "Updates in timeouts, promises and native handlers are grouped into one render"],
          ["`useTransition`, `useDeferredValue`", "Non-urgent updates that do not block input"],
          ["Suspense on the server", "Streaming HTML and selective hydration"],
          ["`useId`, `useSyncExternalStore`, `useInsertionEffect`", "SSR-safe IDs; safe external stores; a hook for style libraries"],
          ["Stricter Strict Mode", "Effects run twice on mount in development"],
        ),
        table(
          ["React 19", "What it gave you"],
          ["Actions", "Async functions in transitions, with pending state, errors and form resets managed by React"],
          ["`useActionState`, `useFormStatus`, `useOptimistic`", "Form state, pending status of a parent form, and optimistic UI"],
          ["`<form action={fn}>`", "A function as a form action, receiving `FormData`"],
          ["`use`", "Read a promise or a context during render, even conditionally"],
          ["Server Components and Server Functions", "Stable"],
          ["`ref` as a prop", "No `forwardRef` needed for function components"],
          ["`<Context>` as a provider", "`<ThemeContext value={...}>` instead of `.Provider`"],
          ["Document metadata", "`<title>`, `<meta>` and `<link>` rendered anywhere are hoisted to `<head>`"],
          ["Ref cleanup functions", "A callback ref can return a cleanup"],
          ["Better hydration errors", "A single message with a diff of the mismatch"],
        ),
        list(
          "**Removed in 19:** `ReactDOM.render` and `hydrate`, `findDOMNode`, string refs, legacy context, `propTypes` and `defaultProps` on function components, and `react-test-renderer/shallow`.",
          "**Since 19:** the React Compiler reached a stable release, and React 19.2 added `<Activity>` for hiding UI while keeping its state, and `useEffectEvent`.",
        ),
      ],
      followUps: [
        {
          q: "Which of these changes how you write everyday components?",
          a: "Automatic batching and `ref` as a prop are invisible improvements. Actions with `useActionState` replace the hand-written loading, error and data state around a mutation. And the compiler removes most manual memoisation.",
        },
        {
          q: "How would you upgrade an app from 17 or 18 to 19?",
          a: "Go to the latest 18.x first and clear every deprecation warning, since 19 removes what 18 warned about. Run the official codemods, replace `ReactDOM.render` with `createRoot`, update the type packages, and test under Strict Mode.",
        },
      ],
      docs: "https://react.dev/blog/2024/12/05/react-19",
    },
    {
      id: "modern-actions",
      question: "What are Actions in React 19? What do `useActionState` and `useFormStatus` do?",
      level: "senior",
      short:
        "An Action is an async function run inside a transition, typically to perform a mutation. React tracks its pending state, sends thrown errors to the nearest error boundary, and for forms resets the fields on success. `useActionState` wraps an action and gives you its latest result and pending flag; `useFormStatus` lets a child of a form read whether that form is submitting.",
      body: [
        tsx(`
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

declare function saveName(name: string): Promise<void>;

interface FormState {
  name: string;
  error: string | null;
}

// Receives the previous state and the submitted FormData; returns the next state.
async function updateName(previous: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get("name") ?? "").trim();
  if (name === "") return { ...previous, error: "Name is required" };

  try {
    await saveName(name);
    return { name, error: null };
  } catch {
    return { ...previous, error: "Could not save. Try again." };
  }
}

function SubmitButton() {
  const { pending } = useFormStatus(); // status of the nearest parent <form>
  return <button disabled={pending}>{pending ? "Saving" : "Save"}</button>;
}

export function NameForm() {
  const [state, formAction] = useActionState(updateName, { name: "", error: null });

  return (
    <form action={formAction}>
      <input name="name" defaultValue={state.name} />
      <SubmitButton />
      {state.error && <p role="alert">{state.error}</p>}
    </form>
  );
}
`),
        table(
          ["Before", "With Actions"],
          ["`const [isLoading, setIsLoading] = useState(false)`", "`isPending` from `useActionState` or `useTransition`"],
          ["`const [error, setError] = useState(null)`", "Returned as part of the action's state"],
          ["`onSubmit` + `preventDefault` + reading inputs", "`<form action={fn}>` receives `FormData`"],
          ["Passing `isSubmitting` down to the button", "`useFormStatus()` inside the button"],
          ["Resetting the form by hand", "Automatic for uncontrolled fields on success"],
        ),
        list(
          "`useActionState` returns `[state, action, isPending]`. The third value is useful when the pending UI lives in the same component as the form.",
          "`useFormStatus` only works in a component rendered inside the `<form>`, not in the component that renders the form.",
          "The action can be a Server Function, in which case the form works before JavaScript has loaded.",
        ),
      ],
      followUps: [
        {
          q: "How is this different from calling an async function in `onSubmit`?",
          a: "Functionally you can build the same thing. Actions make the pending and error handling part of React, keep the UI responsive because the update is a transition, sequence overlapping submissions, and integrate with Suspense, optimistic updates and server functions.",
        },
        {
          q: "What happens to an error thrown inside an action?",
          a: "It propagates to the nearest error boundary. For expected failures such as validation, return them as state so the form can show them inline.",
        },
      ],
      docs: "https://react.dev/reference/react/useActionState",
    },
    {
      id: "modern-optimistic",
      question: "What is an optimistic update? How does `useOptimistic` help?",
      level: "senior",
      short:
        "An optimistic update shows the expected result of an action immediately, before the server confirms it, and rolls back if the request fails. `useOptimistic` gives you a temporary copy of some state that you can update during an action; when the action finishes, React discards the temporary value and shows the real state again.",
      body: [
        tsx(`
interface Message {
  id: string;
  text: string;
  pending?: boolean;
}

interface ThreadProps {
  messages: Message[]; // the real, server-confirmed list
  sendMessage: (text: string) => Promise<void>; // resolves once messages has been updated
}

export function Thread({ messages, sendMessage }: ThreadProps) {
  const [optimisticMessages, addOptimistic] = useOptimistic(
    messages,
    (current, text: string): Message[] => [
      ...current,
      { id: "pending-" + current.length, text, pending: true },
    ],
  );

  async function submit(formData: FormData) {
    const text = String(formData.get("text") ?? "");
    addOptimistic(text); // appears at once, greyed out
    await sendMessage(text); // when this settles, the optimistic entry is dropped
  }

  return (
    <>
      <ul>
        {optimisticMessages.map((message) => (
          <li key={message.id} style={{ opacity: message.pending ? 0.5 : 1 }}>
            {message.text}
          </li>
        ))}
      </ul>
      <form action={submit}>
        <input name="text" />
      </form>
    </>
  );
}
`),
        steps(
          "The user acts. The UI updates immediately with the predicted result.",
          "The request goes out in the background.",
          "On success, the real data replaces the prediction, usually with no visible change.",
          "On failure, the prediction disappears and you tell the user what happened.",
        ),
        table(
          ["Good candidates", "Poor candidates"],
          ["Likes, reactions, follows", "Payments and anything financial"],
          ["Adding a comment or message", "Operations the server may reject for reasons the client cannot predict"],
          ["Toggling a setting, marking as read", "Destructive actions where a silent rollback would confuse"],
          ["Reordering a list", "Results that depend on server-generated data you cannot guess"],
        ),
        trap(
          "The rollback is automatic; the explanation is not. If the request fails and the item simply vanishes, the user assumes a bug. Always pair the rollback with a visible error and a way to retry.",
        ),
      ],
      followUps: [
        {
          q: "How was this done before `useOptimistic`?",
          a: "By hand: update local state, fire the request, and restore the previous value in the `catch`. Or with a query library: write the predicted value into the cache in `onMutate`, restore it in `onError`, and refetch in `onSettled`.",
        },
        {
          q: "What makes optimistic updates hard?",
          a: "Concurrent actions on the same item, temporary IDs that have to be swapped for server IDs, and keeping the prediction logic identical to what the server will do.",
        },
      ],
      docs: "https://react.dev/reference/react/useOptimistic",
    },
    {
      id: "modern-use",
      question: "What is the `use` hook, and how is it different from fetching in `useEffect`?",
      level: "senior",
      short:
        "`use` reads the value of a promise or a context during render. Given a pending promise it suspends the component, so the nearest `<Suspense>` shows its fallback, and when the promise resolves the component renders with the value. There is no loading state to manage, and unlike other hooks it can be called inside conditions and loops.",
      body: [
        tsx(`
interface Comment {
  id: string;
  body: string;
}

function Comments({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  const comments = use(commentsPromise); // suspends until resolved; throws to the error boundary if rejected

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.body}</li>
      ))}
    </ul>
  );
}

export function Post({ commentsPromise }: { commentsPromise: Promise<Comment[]> }) {
  return (
    <article>
      <h1>The post renders immediately</h1>
      <Suspense fallback={<p>Loading comments</p>}>
        <Comments commentsPromise={commentsPromise} />
      </Suspense>
    </article>
  );
}
`),
        table(
          ["", "`useEffect` + `fetch`", "`use` + Suspense"],
          ["Request starts", "After the component has rendered and committed", "Before or during render, wherever the promise was created"],
          ["Loading state", "Yours to manage", "The Suspense fallback"],
          ["Errors", "Yours to manage", "The nearest error boundary"],
          ["Server rendering", "Does not run", "Streams the result with the HTML"],
          ["Race conditions", "Yours to prevent", "The component renders with the promise it was given"],
        ),
        trap(
          "The promise must be stable across renders. Creating it inside the component that calls `use` produces a new promise on every render and suspends forever. Create it in a Server Component, a router loader or a cache, and pass it down.",
        ),
        list(
          "`use(SomeContext)` reads context like `useContext`, but may appear after an early return or inside an `if`.",
          "It cannot be called inside a `try`/`catch` block; errors are handled by error boundaries.",
        ),
      ],
      followUps: [
        {
          q: "Why pass a promise as a prop instead of awaiting it in the parent?",
          a: "Awaiting in the parent blocks the parent's render until the data arrives. Passing the promise lets the parent render and stream immediately, while only the child that needs the data waits.",
        },
      ],
      docs: "https://react.dev/reference/react/use",
    },
    {
      id: "modern-server-functions",
      question: "What are Server Functions (Server Actions), and what must you be careful about?",
      level: "senior",
      short:
        "A Server Function is an async function marked with `\"use server\"` that runs on the server but can be called from client code as if it were local. The framework turns the call into a network request. Used as a form action or inside a transition it is called a Server Action. The danger is forgetting that it is a public HTTP endpoint.",
      body: [
        tsx(
          `
"use server";

declare function getSession(): Promise<{ userId: string } | null>;
declare const db: {
  post: {
    findOwner(id: string): Promise<string | null>;
    delete(id: string): Promise<void>;
  };
};

export async function deletePost(postId: string) {
  // 1. Authenticate: who is calling?
  const session = await getSession();
  if (!session) throw new Error("Not signed in");

  // 2. Validate: arguments come from the network, whatever the types say.
  if (typeof postId !== "string" || postId === "") throw new Error("Invalid post id");

  // 3. Authorise: may this user do this to this record?
  const ownerId = await db.post.findOwner(postId);
  if (ownerId !== session.userId) throw new Error("Forbidden");

  await db.post.delete(postId);
}
`,
          { caption: "actions.ts" },
        ),
        tsx(
          `
"use client";

import { useTransition } from "react";
import { deletePost } from "./actions";

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button disabled={isPending} onClick={() => startTransition(() => deletePost(postId))}>
      Delete
    </button>
  );
}
`,
          { caption: "delete-button.tsx" },
        ),
        list(
          "**It is reachable by anyone.** A direct POST can call it with any arguments, regardless of whether your UI shows the button. Check authentication and authorisation inside every function.",
          "**TypeScript types are not validation.** The argument typed `string` can be anything at runtime. Parse it with a schema.",
          "**Do not trust what the client sends back.** Hidden form fields and values bound from a previous render can be tampered with.",
          "**Return only what the client may see.** The return value is serialised to the browser.",
        ),
        p(
          "On the positive side: there is no API route to write, the types flow end to end, and a `<form action={serverFunction}>` works before the page's JavaScript has loaded.",
        ),
      ],
      followUps: [
        {
          q: "When would you still write a regular API endpoint?",
          a: "When something other than your own React app calls it: a mobile client, a webhook, a public API. Server Functions are an implementation detail of one app, with no stable URL or contract.",
        },
      ],
      docs: "https://react.dev/reference/rsc/server-functions",
    },
    {
      id: "modern-nextjs",
      question: "What does Next.js add on top of React? How do the Pages Router and App Router differ?",
      level: "intermediate",
      short:
        "Next.js is a framework around React: file-based routing, server rendering and static generation, data fetching and caching, code splitting, image and font optimisation, and API endpoints. The Pages Router is the original model, built on per-page data functions. The App Router is built on Server Components, nested layouts and streaming.",
      body: [
        table(
          ["Pages Router (`pages/`)", "App Router (`app/`)"],
          ["`getStaticProps`", "An `async` Server Component whose data is cached"],
          ["`getServerSideProps`", "An `async` Server Component that reads request data or fetches uncached"],
          ["`getStaticPaths`", "`generateStaticParams`"],
          ["`revalidate` returned from `getStaticProps`", "Revalidation by time or by tag"],
          ["`pages/api/*`", "Route Handlers (`route.ts`)"],
          ["`_app.tsx`, `_document.tsx`", "Nested `layout.tsx` files"],
          ["Every component is a Client Component", "Server Components by default; `\"use client\"` to opt in"],
          ["`useRouter` from `next/router`", "`useRouter`, `usePathname`, `useSearchParams` from `next/navigation`"],
        ),
        tsx(
          `
import { notFound } from "next/navigation";

declare function getPost(slug: string): Promise<{ title: string; body: string } | null>;
declare function getAllSlugs(): Promise<string[]>;

// Prerender one page per post at build time.
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // params is a promise in current versions
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
`,
          { caption: "app/blog/[slug]/page.tsx" },
        ),
        list(
          "Special files define UI for a route segment: `page`, `layout`, `loading` (a Suspense fallback), `error` (an error boundary), `not-found`.",
          "A route is static unless it uses something only known at request time, such as cookies, headers or uncached data.",
          "Mutations go through Server Functions; `next/link` prefetches routes; `next/image` resizes and lazy-loads images.",
        ),
        trap(
          "Next.js changes quickly between major versions: caching defaults, async request APIs, the rename of Middleware to Proxy. In an interview, say which version you have used, and reason from the model (what is static, what is per-request, what runs on the client) instead of reciting an API from memory.",
        ),
      ],
      followUps: [
        {
          q: "When would you not use a framework?",
          a: "For an app that is entirely behind a login, has no SEO needs and is hosted as static files, a client-only Vite app is simpler to build and operate.",
        },
        {
          q: "What are the alternatives?",
          a: "React Router in framework mode (the successor to Remix), TanStack Start, and Astro for content-heavy sites. They make different choices about caching and where the server runs, on the same React foundations.",
        },
      ],
      docs: "https://nextjs.org/docs/app",
    },
  ],
};
