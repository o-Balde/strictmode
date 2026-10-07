import { list, p, say, steps, table, trap, ts, tsx } from "./blocks";
import type { PrepSection } from "./types";

export const REACT_ECOSYSTEM: PrepSection = {
  id: "react-ecosystem",
  track: "react",
  title: "Routing, testing and production concerns",
  blurb:
    "Everything around the components: getting between pages, proving the code works, and keeping it secure and usable. Real projects are mostly this, and interviewers know it.",
  drill: "system-architecture",
  questions: [
    {
      id: "eco-router",
      question: "How does client-side routing work? Walk through React Router's main pieces.",
      level: "intermediate",
      short:
        "A client-side router intercepts navigation, updates the URL with the History API without a page reload, and renders the components that match the new URL. React Router gives you route definitions, links, nested layouts, and hooks to read params and navigate in code.",
      body: [
        tsx(
          `
import {
  BrowserRouter,
  Link,
  NavLink,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="users/:userId" element={<UserPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Layout() {
  return (
    <>
      <nav>
        <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
          Home
        </NavLink>
      </nav>
      <Outlet /> {/* the matched child route renders here */}
    </>
  );
}

function UserPage() {
  const { userId } = useParams(); // from the path: /users/42
  const [searchParams, setSearchParams] = useSearchParams(); // from the query: ?tab=posts
  const navigate = useNavigate();
  const tab = searchParams.get("tab") ?? "profile";

  return (
    <>
      <h1>
        User {userId}, {tab}
      </h1>
      <button onClick={() => setSearchParams({ tab: "posts" })}>Posts</button>
      <button onClick={() => navigate("/", { replace: true })}>Back home</button>
    </>
  );
}

function Home() {
  return <Link to="/users/42?tab=posts">Open user 42</Link>;
}

function NotFound() {
  return <h1>Page not found</h1>;
}
`,
          { caption: "React Router" },
        ),
        table(
          ["Piece", "Purpose"],
          ["`<BrowserRouter>` / `createBrowserRouter`", "Connects the app to the browser's URL and history"],
          ["`<Route path element>`", "Maps a URL pattern to a component; nesting gives nested layouts"],
          ["`<Outlet>`", "Where a parent route renders its matched child"],
          ["`<Link>`, `<NavLink>`", "Navigation without a reload; `NavLink` knows whether it is active"],
          ["`useParams`, `useSearchParams`", "Read dynamic segments and the query string"],
          ["`useNavigate`, `<Navigate>`", "Navigate from code, or by rendering"],
          ["`path=\"*\"`", "The catch-all for a 404 page"],
        ),
        list(
          "`BrowserRouter` uses real paths (`/users/42`) through the History API, so the server must return the app for every route. `HashRouter` keeps the route after a `#`, which works on any static host but gives uglier URLs and is not sent to the server.",
          "`navigate(to)` pushes a history entry; `navigate(to, { replace: true })` replaces the current one, so Back does not return to it.",
          "Data routers (`createBrowserRouter`) add loaders and actions, so data is fetched in parallel with the route's code instead of after it renders.",
        ),
      ],
      followUps: [
        {
          q: "How is this different from traditional server routing?",
          a: "Traditionally every navigation is a request for a new HTML document. A client router keeps one document, swaps components, and fetches only data. Transitions are faster and state survives, but the first load is heavier and you take on scroll restoration, focus management and loading states.",
        },
        {
          q: "How do you pass data from one route to another?",
          a: "Through the URL when it should survive a refresh or be shareable: path params and search params. Through `navigate(to, { state })` for transient data such as 'where did you come from'. Through a shared store or cache for anything larger.",
        },
        {
          q: "How do you code-split by route?",
          a: "Wrap route components in `lazy` with a Suspense boundary, or use the router's `lazy` route option, which also loads the route's loader in parallel.",
        },
      ],
      docs: "https://reactrouter.com/home",
    },
    {
      id: "eco-protected-routes",
      question: "How do you implement protected routes and redirect back after login?",
      level: "intermediate",
      short:
        "Wrap the private routes in a layout route that checks the auth state. If there is no user, it renders a redirect to the login page and records where the user was heading. After a successful login, navigate to that saved location with `replace`, so the login page does not stay in the history.",
      body: [
        tsx(
          `
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

type Auth =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "authenticated"; user: { name: string } };

declare function useAuth(): Auth & { signIn(email: string, password: string): Promise<void> };

export function RequireAuth() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.status === "loading") return <p>Checking your session</p>; // do not redirect yet
  if (auth.status === "anonymous") {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return <Outlet />;
}

export function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(formData: FormData) {
    await auth.signIn(String(formData.get("email")), String(formData.get("password")));

    const from: unknown = location.state?.from;
    // Only follow a path inside this app: never a full URL supplied from outside.
    const target = typeof from === "string" && from.startsWith("/") && !from.startsWith("//") ? from : "/";
    navigate(target, { replace: true });
  }

  return (
    <form action={handleLogin}>
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button>Sign in</button>
    </form>
  );
}

// <Route element={<RequireAuth />}>
//   <Route path="/dashboard" element={<Dashboard />} />
//   <Route path="/settings" element={<Settings />} />
// </Route>
`,
          { caption: "A guard as a layout route" },
        ),
        list(
          "Handle the loading state explicitly. On a refresh the session is unknown for a moment; redirecting during that moment bounces a signed-in user to the login page.",
          "`replace` on both redirects keeps Back from trapping the user between the guard and the login page.",
          "Validate the return path. A `returnTo` parameter that accepts any URL is an open redirect, which phishing relies on.",
        ),
        trap(
          "A route guard is user experience, not security. All the JavaScript for the protected page is already in the user's browser, and anyone can call the API directly. The server must check authentication and authorisation on every request.",
        ),
      ],
      followUps: [
        {
          q: "How do you handle role-based access?",
          a: "The same guard with a role check, rendering a 'not authorised' page instead of a redirect when the user is signed in but lacks permission. Hide navigation the user cannot use, and still enforce everything on the server.",
        },
      ],
      docs: "https://reactrouter.com/home",
    },
    {
      id: "eco-auth",
      question: "How do you handle authentication in a single-page app? Where do you store the token?",
      level: "senior",
      short:
        "Prefer a session held in an `HttpOnly`, `Secure`, `SameSite` cookie, which JavaScript cannot read and so an XSS bug cannot steal. On load, ask the server who the user is and keep the answer in memory. Tokens in `localStorage` are convenient and readable by any script on the page.",
      body: [
        table(
          ["Storage", "Survives refresh", "Readable by JavaScript (XSS)", "Sent automatically (CSRF)", "Verdict"],
          ["`localStorage` / `sessionStorage`", "Yes", "Yes", "No", "Avoid for anything that grants access"],
          ["In memory", "No", "Only while the page is open", "No", "Good for a short-lived access token, with a refresh cookie"],
          ["`HttpOnly` cookie", "Yes", "No", "Yes", "Recommended; add `SameSite` and CSRF protection for mutations"],
        ),
        tsx(`
interface User {
  id: string;
  name: string;
}

type AuthState =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "authenticated"; user: User };

const AuthContext = createContext<AuthState>({ status: "loading" });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;

    // The browser attaches the session cookie; the app never sees the token.
    fetch("/api/me", { credentials: "include" })
      .then((res) => (res.ok ? (res.json() as Promise<User>) : null))
      .then((user) => {
        if (ignore) return;
        setState(user ? { status: "authenticated", user } : { status: "anonymous" });
      })
      .catch(() => {
        if (!ignore) setState({ status: "anonymous" });
      });

    return () => {
      ignore = true;
    };
  }, []);

  return <AuthContext value={state}>{children}</AuthContext>;
}

export const useAuthState = () => useContext(AuthContext);
`),
        list(
          "**Short-lived access, long-lived refresh.** The access credential expires in minutes; a refresh credential in an `HttpOnly` cookie renews it silently.",
          "**Handle 401 centrally.** One place in the HTTP client attempts a refresh, retries the request once, and signs the user out if that fails.",
          "**Sign out everywhere.** Clear server-side session state, and notify other tabs with a `storage` event or `BroadcastChannel`.",
          "**The three states matter.** Rendering as if anonymous while the session is still being checked causes a flash of the login screen on every refresh.",
        ),
      ],
      followUps: [
        {
          q: "If cookies are sent automatically, what stops CSRF?",
          a: "`SameSite=Lax` or `Strict` stops the browser attaching the cookie to cross-site requests, which covers most cases. For anything that changes state, add a CSRF token or check the `Origin` header, and never mutate on a GET.",
        },
        {
          q: "With server rendering, where does the check happen?",
          a: "On the server, per request: read the session cookie, and redirect before any HTML is produced. The client never renders a protected page for an anonymous user at all.",
        },
      ],
      docs: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/Cookies#security",
    },
    {
      id: "eco-security",
      question: "What are the main security concerns in a React app? How does React help with XSS?",
      level: "senior",
      short:
        "Cross-site scripting is the main one. React escapes every value you render with `{}`, so user content is displayed as text and not executed. The protection ends wherever you bypass it: `dangerouslySetInnerHTML`, user-controlled URLs, and anything that writes to the DOM directly.",
      body: [
        tsx(
          `
import DOMPurify from "dompurify";

export function Comment({ text, html, website }: { text: string; html: string; website: string }) {
  let safeHref: string | undefined;
  try {
    const url = new URL(website);
    if (url.protocol === "http:" || url.protocol === "https:") safeHref = url.href;
  } catch {
    safeHref = undefined; // not a valid absolute URL
  }

  return (
    <article>
      {/* Safe: rendered as text, even if it contains <script> or an onerror attribute. */}
      <p>{text}</p>

      {/* Dangerous by design. Only ever pass HTML you have sanitised. */}
      <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />

      {/* A user-supplied href can be "javascript:...". Allow known protocols only. */}
      {safeHref && (
        <a href={safeHref} rel="noopener noreferrer" target="_blank">
          Website
        </a>
      )}
    </article>
  );
}
`,
          { caption: "The three places XSS gets in" },
        ),
        table(
          ["Threat", "Defence"],
          ["XSS through injected HTML", "Avoid `dangerouslySetInnerHTML`; sanitise with DOMPurify when rich text is required"],
          ["XSS through URLs", "Validate the protocol of any user-supplied `href` or `src`"],
          ["XSS in general", "A Content Security Policy that blocks inline scripts and unknown origins"],
          ["Token theft", "Keep credentials in `HttpOnly` cookies, out of reach of scripts"],
          ["CSRF", "`SameSite` cookies, CSRF tokens, checking `Origin` on mutations"],
          ["Leaked secrets", "Anything in the client bundle is public; keep API keys on the server"],
          ["Supply chain", "Lock files, audits, minimal dependencies, Subresource Integrity for third-party scripts"],
          ["Server Functions and API routes", "Authenticate, authorise and validate inside every one"],
        ),
        say(
          "The client is not a security boundary. Validation and permission checks in React exist for the user's convenience; the server has to repeat every one of them.",
        ),
      ],
      followUps: [
        {
          q: "Why is it called `dangerouslySetInnerHTML`, and why the `__html` object?",
          a: "The awkward name and shape are deliberate friction: you cannot use it by accident, and it stands out in code review and in a search of the codebase.",
        },
        {
          q: "Is an environment variable in a React app secret?",
          a: "Not if it is exposed to the browser. Variables with a public prefix (`NEXT_PUBLIC_`, `VITE_`) are inlined into the bundle at build time and readable by anyone.",
        },
      ],
      docs: "https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html",
    },
    {
      id: "eco-testing",
      question: "How do you test React components?",
      level: "intermediate",
      short:
        "With React Testing Library on top of a runner such as Vitest or Jest. You render the component, find elements the way a user would (by role, label and text), interact with them, and assert on what is displayed. You test behaviour, not implementation, so the tests survive refactoring.",
      body: [
        tsx(
          `
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { SignupForm } from "./SignupForm";

test("submits the email the user typed", async () => {
  const user = userEvent.setup();
  const onSignup = vi.fn();
  render(<SignupForm onSignup={onSignup} />);

  await user.type(screen.getByLabelText(/email/i), "ada@example.com");
  await user.click(screen.getByRole("button", { name: /sign up/i }));

  expect(onSignup).toHaveBeenCalledWith("ada@example.com");
});

test("shows an error for an invalid email", async () => {
  const user = userEvent.setup();
  render(<SignupForm onSignup={vi.fn()} />);

  await user.type(screen.getByLabelText(/email/i), "not-an-email");
  await user.click(screen.getByRole("button", { name: /sign up/i }));

  expect(screen.getByRole("alert")).toHaveTextContent(/valid email/i);
});
`,
          { caption: "SignupForm.test.tsx" },
        ),
        table(
          ["Query", "Returns when missing", "Use for"],
          ["`getBy...`", "Throws", "Elements that should be there now"],
          ["`queryBy...`", "`null`", "Asserting that something is not there"],
          ["`findBy...`", "Rejects after a timeout", "Elements that appear asynchronously"],
        ),
        list(
          "**Query priority:** `getByRole` first, then `getByLabelText`, `getByPlaceholderText`, `getByText`; `getByTestId` only as a last resort. If you cannot find an element by role or label, a screen reader user cannot either.",
          "**`userEvent` over `fireEvent`:** it simulates the full sequence of events a real interaction produces (focus, key down, input, key up).",
          "**What to test:** what the user sees and can do. Not state variables, not which hooks were called, not component internals.",
        ),
        table(
          ["Layer", "Tool", "Proportion"],
          ["Static", "TypeScript, ESLint", "Always on"],
          ["Unit", "Vitest / Jest for pure functions, reducers, hooks", "Some"],
          ["Integration", "Testing Library: several components working together", "Most"],
          ["End to end", "Playwright or Cypress against a running app", "A few critical journeys"],
        ),
      ],
      followUps: [
        {
          q: "Why not test implementation details?",
          a: "Such tests fail when you refactor without changing behaviour, and pass when behaviour breaks in a way they did not look at. They cost maintenance and give false confidence.",
        },
        {
          q: "What were shallow rendering and Enzyme?",
          a: "Enzyme rendered a component one level deep and let tests reach into its state and instance. It encouraged implementation-detail tests and was never updated for modern React. `react-test-renderer` is deprecated as of React 19. Testing Library is the standard.",
        },
        {
          q: "What is snapshot testing, and is it useful?",
          a: "It serialises rendered output to a file and fails when the output changes. It is cheap to write and catches unintended changes, but large snapshots are approved without being read. Keep them small and prefer explicit assertions.",
        },
      ],
      docs: "https://testing-library.com/docs/react-testing-library/intro/",
    },
    {
      id: "eco-testing-async",
      question: "How do you test asynchronous behaviour, API calls, hooks, and components that need providers?",
      level: "intermediate",
      short:
        "Await `findBy` queries for things that appear later. Mock the network at the HTTP level with Mock Service Worker, so the component's real fetching code runs. Test a custom hook through `renderHook`. And wrap the component in the providers it needs with a small custom render function.",
      body: [
        tsx(
          `
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { afterAll, afterEach, beforeAll, expect, test } from "vitest";
import { Profile } from "./Profile";

const server = setupServer(
  http.get("/api/user", () => HttpResponse.json({ name: "Ada" })),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("shows the user once loaded", async () => {
  render(<Profile />);

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
  expect(await screen.findByRole("heading", { name: "Ada" })).toBeInTheDocument();
});

test("shows an error when the request fails", async () => {
  server.use(http.get("/api/user", () => new HttpResponse(null, { status: 500 })));
  render(<Profile />);

  expect(await screen.findByRole("alert")).toHaveTextContent(/something went wrong/i);
});
`,
          { caption: "Async UI with a mocked network" },
        ),
        tsx(
          `
import { act, render, renderHook } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";
import { expect, test } from "vitest";
import { ThemeProvider } from "./theme";
import { useCounter } from "./useCounter";

test("increments", () => {
  const { result } = renderHook(() => useCounter(5));

  act(() => result.current.increment()); // state updates must be wrapped in act

  expect(result.current.count).toBe(6);
});

// One place that knows which providers the app needs.
function renderWithProviders(ui: ReactElement) {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <ThemeProvider theme="dark">{children}</ThemeProvider>
  );
  return render(ui, { wrapper });
}
`,
          { caption: "Hooks and providers" },
        ),
        table(
          ["Situation", "Approach"],
          ["Content appears after a request", "`await screen.findBy...`"],
          ["Something should disappear", "`await waitForElementToBeRemoved(...)`"],
          ["Debounce, timers", "Fake timers, advanced explicitly"],
          ["HTTP", "MSW handlers; override per test for error cases"],
          ["Context, router, store, query client", "A `wrapper` with real providers and test data"],
          ["A third-party module you cannot run", "`vi.mock` / `jest.mock` that one module"],
        ),
        trap(
          "Mocking your own `fetchUser` function means the test never exercises the URL, the parsing or the error handling. Intercepting at the network layer tests all of it, and the same handlers can power local development.",
        ),
      ],
      followUps: [
        {
          q: "What is the `act` warning?",
          a: "It means a state update happened in your test outside of `act`, usually because something asynchronous finished after the test stopped waiting. The fix is to await the resulting change with `findBy` or `waitFor`, not to wrap things in `act` until the warning stops.",
        },
        {
          q: "How do you test a component connected to Redux?",
          a: "Render it inside a real `<Provider>` with a real store created for that test and preloaded with the state you need. Mock stores test that an action was dispatched, which is an implementation detail.",
        },
      ],
      docs: "https://testing-library.com/docs/dom-testing-library/api-async/",
    },
    {
      id: "eco-accessibility",
      question: "How do you make a React application accessible?",
      level: "intermediate",
      short:
        "Mostly by using the right HTML: real buttons, links, labels, headings and landmarks give you keyboard support and screen reader semantics for free. Then manage focus where React changes the page without a navigation, and reach for ARIA only to describe what HTML cannot.",
      body: [
        tsx(
          `
function Toolbar({ onSave }: { onSave: () => void }) {
  return (
    <>
      {/* Not focusable, no keyboard activation, announced as nothing. */}
      <div className="btn" onClick={onSave}>
        Save
      </div>

      {/* Focusable, activates with Enter and Space, announced as "Save, button". */}
      <button type="button" onClick={onSave}>
        Save
      </button>
    </>
  );
}
`,
          { caption: "The most common mistake" },
        ),
        tsx(`
function EmailField({ error }: { error?: string }) {
  const id = useId();

  return (
    <div>
      <label htmlFor={id}>Email</label>
      <input
        id={id}
        type="email"
        aria-invalid={error !== undefined}
        aria-describedby={error ? id + "-error" : undefined}
      />
      {error && (
        <p id={id + "-error"} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
`),
        list(
          "**Semantics:** one `<h1>`, headings in order, `<nav>`, `<main>`, lists as lists, tables as tables. A fragment avoids wrapper divs that would break them.",
          "**Keyboard:** everything reachable with Tab, operable with Enter or Space, with a visible focus ring. Never remove outlines without replacing them.",
          "**Focus management:** move focus into a dialog when it opens and back to the trigger when it closes; move focus to the new page's heading on client-side navigation.",
          "**Dynamic updates:** announce asynchronous results with a live region (`role=\"status\"` or `aria-live`).",
          "**Images:** meaningful `alt` text; `alt=\"\"` for decoration.",
          "**Motion and colour:** honour `prefers-reduced-motion`; keep sufficient contrast; never signal with colour alone.",
        ),
        table(
          ["Tool", "Catches"],
          ["`eslint-plugin-jsx-a11y`", "Missing labels and alt text, invalid ARIA, click handlers on non-interactive elements"],
          ["Testing Library role queries", "Whether elements are exposed with the right role and name"],
          ["axe (browser extension, `jest-axe`, Playwright)", "Automated audit of rendered pages"],
          ["A keyboard and a screen reader", "Everything the automated tools miss, which is most of it"],
        ),
      ],
      followUps: [
        {
          q: "What is the first rule of ARIA?",
          a: "Do not use ARIA if a native element does the job. ARIA changes what is announced, not how the element behaves: `role=\"button\"` on a div does not make it focusable or respond to the keyboard.",
        },
        {
          q: "What does a client-side router break for accessibility?",
          a: "A full page load moves focus to the top and announces the new title. A client-side transition does neither unless you do it: update `document.title`, and move focus or announce the change.",
        },
      ],
      docs: "https://www.w3.org/WAI/ARIA/apg/patterns/",
    },
    {
      id: "eco-i18n",
      question: "How do you internationalise a React app?",
      level: "intermediate",
      short:
        "Keep every user-facing string out of the components, in message catalogues keyed by ID, one per locale. Use a library that implements ICU MessageFormat for plurals and interpolation, and the browser's `Intl` APIs for dates, numbers and currencies. Never build sentences by concatenating strings.",
      body: [
        tsx(
          `
import { FormattedDate, FormattedMessage, FormattedNumber, useIntl } from "react-intl";

export function CartSummary({ count, total, updatedAt }: { count: number; total: number; updatedAt: Date }) {
  const intl = useIntl();

  return (
    <section>
      {/* Declarative: a component for text that renders as an element. */}
      <FormattedMessage
        id="cart.items"
        defaultMessage="{count, plural, =0 {Your cart is empty} one {# item} other {# items}}"
        values={{ count }}
      />
      <FormattedNumber value={total} style="currency" currency="EUR" />
      <FormattedDate value={updatedAt} dateStyle="medium" />

      {/* Imperative: for attributes, which need a plain string. */}
      <input
        placeholder={intl.formatMessage({ id: "cart.coupon", defaultMessage: "Coupon code" })}
        aria-label={intl.formatMessage({ id: "cart.coupon", defaultMessage: "Coupon code" })}
      />
      <small>{intl.locale}</small>
    </section>
  );
}
`,
          { caption: "With react-intl (FormatJS)" },
        ),
        ts(`
// The platform does the formatting; no library needed for this part.
const price = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(1234.5);
const date = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(2026, 0, 31));
const ago = new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-1, "day"); // "yesterday"
const rule = new Intl.PluralRules("ru").select(3); // "few": not every language has just one/other
`),
        list(
          "**Plurals and gender** vary by language, which is why you use ICU messages and not `count === 1 ? ... : ...`.",
          "**Word order** changes too, so translate whole sentences with placeholders, never fragments glued together.",
          "**Layout:** text expands (German is often a third longer than English), and right-to-left languages need `dir=\"rtl\"` and logical CSS properties (`margin-inline-start`).",
          "**Loading:** ship only the active locale's catalogue; load others on demand.",
          "**Locale source:** the URL (`/pt/...`) is best for SEO and sharing; fall back to a saved preference, then `Accept-Language`.",
        ),
        p(
          "The common libraries are `react-intl` (FormatJS), `react-i18next`, Lingui, and `next-intl` for Next.js. They differ in API, not in the underlying approach.",
        ),
      ],
      followUps: [
        {
          q: "What are the two ways of formatting in `react-intl`?",
          a: "Components (`<FormattedMessage>`, `<FormattedDate>`) for text rendered as elements, and the imperative `intl` object from `useIntl()` (`formatMessage`, `formatDate`) for anywhere a string is required: placeholders, `aria-label`, `document.title`.",
        },
        {
          q: "How do you catch untranslated strings?",
          a: "Lint against string literals in JSX, extract message IDs in CI and compare against each catalogue, and use pseudo-localisation in development to make hard-coded text and truncation visible.",
        },
      ],
      docs: "https://formatjs.github.io/docs/react-intl/",
    },
    {
      id: "eco-error-handling",
      question: "How do you handle loading and error states consistently across an app?",
      level: "senior",
      short:
        "Decide it once at the architecture level, not per component. Every asynchronous view has four states: loading, error, empty and success. Use Suspense boundaries for loading and error boundaries for failures at the route and widget level, give each error a way to retry, and report everything unexpected to a monitoring service.",
      body: [
        tsx(
          `
import { Suspense, type ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";

declare function reportError(error: unknown, info: { componentStack?: string | null }): void;

function Widget({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <ErrorBoundary
        onError={reportError}
        fallbackRender={({ resetErrorBoundary }) => (
          <div role="alert">
            <p>{title} could not be loaded.</p>
            <button onClick={resetErrorBoundary}>Try again</button>
          </div>
        )}
      >
        <Suspense fallback={<p aria-busy="true">Loading {title}</p>}>{children}</Suspense>
      </ErrorBoundary>
    </section>
  );
}
`,
          { caption: "One wrapper, used for every independent region" },
        ),
        table(
          ["Kind of failure", "Where it is handled", "What the user sees"],
          ["Render error in a widget", "The widget's error boundary", "That region's fallback; the rest of the page works"],
          ["Failed data request", "The query's error state, or the boundary", "Inline message with Retry"],
          ["Failed mutation", "The event handler or action", "Inline message or toast; the form keeps its values"],
          ["Validation", "The form", "Messages next to the fields"],
          ["Not found, not authorised", "The router", "A dedicated page"],
          ["Anything unhandled", "Root boundary, `window.onerror`, `unhandledrejection`", "A generic fallback, and a report sent"],
        ),
        list(
          "**Empty is not an error.** Zero results needs its own design, usually with a suggestion for what to do next.",
          "**Skeletons over spinners** for content regions: they reserve the layout and avoid shift.",
          "**Do not swallow errors.** An empty `catch` hides the failure from the user and from you.",
          "**Report with context:** the component stack, the route, the release version and the user's last actions.",
        ),
      ],
      followUps: [
        {
          q: "What does React 19 add for error reporting?",
          a: "`createRoot` accepts `onCaughtError`, `onUncaughtError` and `onRecoverableError` callbacks, giving one place to send errors to monitoring, whether or not a boundary caught them.",
        },
        {
          q: "Toast or inline message?",
          a: "Inline when the error relates to something on screen that the user must fix or retry. A toast for the outcome of a background action. A toast alone is easy to miss and is gone when the user looks for it.",
        },
      ],
      docs: "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary",
    },
    {
      id: "eco-debugging",
      question: "How do you debug a React application?",
      level: "junior",
      short:
        "React DevTools for the component tree: inspect and edit props, state and hooks, and see what rendered and why. The browser's own tools for everything else: breakpoints in the Sources panel, the Network tab for requests, the Performance panel for long tasks.",
      body: [
        table(
          ["Tool", "Use it to"],
          ["DevTools: Components tab", "Inspect props, state, hooks and context for any component; edit them live; jump to source"],
          ["DevTools: Profiler", "Record an interaction; see each commit, which components rendered, how long, and why"],
          ["Highlight updates", "Watch which parts of the screen re-render as you interact"],
          ["Breakpoints and `debugger`", "Step through a handler or an effect with real values"],
          ["Network tab", "Check request order, duplicates, payloads, waterfalls and cache behaviour"],
          ["Strict Mode", "Surface impure renders and missing effect cleanups early"],
          ["Error overlay and component stacks", "See which component threw and what rendered it"],
        ),
        steps(
          "**Reproduce** it reliably, and reduce it to the smallest case.",
          "**Locate** it: is the data wrong (network, state), or is the rendering of correct data wrong?",
          "**Inspect** the component's actual props and state in DevTools instead of guessing.",
          "**Explain** the bug before fixing it. A fix you cannot explain is a coincidence.",
          "**Add a test** that fails without the fix.",
        ),
        trap(
          "`console.log(state)` right after a setter shows the old value, which sends people hunting for a bug that is not there. Log during render, or inspect the component in DevTools.",
        ),
      ],
      followUps: [
        {
          q: "A component renders with the wrong data. What do you check first?",
          a: "Where the data comes from. In DevTools, look at the component's props and state, then walk up to the owner that supplied them. Most often the state was mutated, a key is wrong, or an effect holds a stale closure.",
        },
      ],
      docs: "https://react.dev/learn/react-developer-tools",
    },
  ],
};
