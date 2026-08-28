"""
Gives every question a real hint and a documentation link.

The bank shipped one hint per question, all of the form "Consider the core
principles and trade-offs of <title>." That restates the question and helps
nobody. This replaces them with a rule reminder plus a canonical doc URL,
matched from the question's title and tags, falling back to its subject.

The reminder goes in `hints[0]`; the URL goes in `bestPracticeRef`, which the
type already declares and nothing was using.

Hand-authored hints are left alone.

    python3 scripts/build_hints.py
"""

import json
import re

BANK = "src/data/questions.json"
AUTHORED = {
    "tricky-typescript-12", "coderpad-typescript", "react-17-2025",
    "advanced-javascript-6", "typescript-masterclass",
}

REACT = "https://react.dev/reference/react"
MDN = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference"
MDNG = "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
TS = "https://www.typescriptlang.org/docs/handbook/2"
NEXT = "https://nextjs.org/docs/app/building-your-application"

# Rules are scoped: a React question about "ES6 classes" must not pick up the
# TypeScript classes rule, and a TypeScript question about "interfaces" must not
# pick up a React one. Within a scope, most specific first.
R = "react"    # react + nextjs
T = "ts"       # typescript
J = "js"       # javascript, applies everywhere
G = "any"      # cross-cutting: performance, architecture, tooling

SCOPES = {
    "react": {R, J, G},
    "nextjs": {R, J, G},
    "typescript": {T, J, G},
    "javascript": {J, G},
    "performance": {R, J, G},
    "system_design": {R, J, G},
    "algorithms": {J, G},
}

RULES = [
    (R, r"\buseState\b", "State is a snapshot. Setting it schedules a render, it does not change the variable you already read, so two updates from the same value collapse into one.", f"{REACT}/useState"),
    (R, r"\buseEffect\b|\bcleanup\b|\bdependency array\b", "An effect synchronises with something outside React. Ask what it subscribes to, and what its cleanup has to undo when the dependencies change.", f"{REACT}/useEffect"),
    (R, r"\buseLayoutEffect\b", "useLayoutEffect runs before the browser paints. Reach for it only to measure or mutate the DOM, when useEffect would show a flicker.", f"{REACT}/useLayoutEffect"),
    (R, r"\buseMemo\b", "Memoisation trades comparison cost for computation cost. It only pays when the computation is genuinely expensive and the inputs are genuinely stable.", f"{REACT}/useMemo"),
    (R, r"\buseCallback\b", "useCallback only helps if the child actually skips work because of it. On its own it is overhead.", f"{REACT}/useCallback"),
    (R, r"\buseRef\b|\brefs?\b|\bforwardRef\b", "Both refs and state survive a render. Only state causes one, so refs are for values the UI does not display.", f"{REACT}/useRef"),
    (R, r"\buseReducer\b", "Reach for a reducer when the next state depends on several fields at once, so the transitions live in one place instead of across many setters.", f"{REACT}/useReducer"),
    (R, r"\buseContext\b|\bcontext\b|\bprop drilling\b", "Context solves passing data down, not re-rendering. Every consumer re-renders when the value changes, so the value's identity matters.", f"{REACT}/useContext"),
    (R, r"\buseTransition\b|\buseDeferredValue\b|\bconcurren", "Concurrent features let React keep an urgent update responsive by letting a non-urgent one lag behind.", f"{REACT}/useTransition"),
    (R, r"\buseSyncExternalStore\b|\btearing\b", "Reading an external store during render can tear. useSyncExternalStore exists so React sees a consistent snapshot.", f"{REACT}/useSyncExternalStore"),
    (R, r"\bcustom hooks?\b|\brules of hooks\b", "Hooks are matched by call order, which is why they must run unconditionally at the top level of a component or another hook.", "https://react.dev/warnings/invalid-hook-call-warning"),
    (R, r"\bkeys?\b(?!.*keyof)|\breconcil", "A key is an identity claim. Change it and React unmounts the old element and mounts a new one, resetting its state.", "https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key"),
    (R, r"\bvirtual dom\b|\bfiber\b|\bdiffing\b|\breconciliation\b", "React builds a description of the UI, diffs it against the previous one, and applies only the differences to the real DOM.", "https://react.dev/learn/preserving-and-resetting-state"),
    (R, r"\bstrict\s?mode\b", "StrictMode double-invokes render and effects in development, so an effect that is not idempotent shows its seams immediately.", f"{REACT}/StrictMode"),
    (R, r"\bsuspense\b|\blazy\b|\bcode.?split", "Suspense lets a subtree declare it is not ready yet, so a fallback shows while the work is still in flight.", f"{REACT}/Suspense"),
    (R, r"\berror boundar|\bcomponentDidCatch\b", "Error boundaries catch the render path, not the interaction path. An event handler needs its own try/catch.", "https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary"),
    (R, r"\bportals?\b", "A portal moves where a node is inserted in the DOM. Context and event bubbling still follow the React tree.", f"{REACT.replace('/react','/react-dom')}/createPortal"),
    (R, r"\bmemo\b|\bre-?render", "React re-renders a component when its state or its parent renders. Skipping that needs both a memo and props that stay identical.", f"{REACT}/memo"),
    (R, r"\bcontrolled\b|\buncontrolled\b|\bform\b", "A controlled input reads its value from state, so React is the single source of truth. An uncontrolled one leaves it in the DOM.", "https://react.dev/reference/react-dom/components/input"),
    (R, r"\bsynthetic event|\bevent (handling|delegation|bubbl)", "React wraps native events in a synthetic event with one consistent API, delegated from the root.", "https://react.dev/reference/react-dom/components/common#react-event-object"),
    (R, r"\bserver components?\b|\bRSC\b|\bserver actions?\b", "A Server Component runs only on the server and ships no JavaScript. It cannot hold state or use hooks.", f"{NEXT}/rendering/server-components"),
    (R, r"\bhydrat|\bSSR\b|\bSSG\b|\bISR\b", "Hydration attaches listeners to server-rendered HTML. A mismatch between server and client output is what breaks it.", f"{NEXT}/rendering"),
    (R, r"\brout(er|ing)\b|\bnavigat", "Routing maps a URL to a component. Ask what the URL owns, and what the component owns.", f"{NEXT}/routing"),
    (R, r"\bsuper\(|\bES6 class|\bclass component|\bcomponentDid|\bcomponentWill|\blifecycle\b", "A class component's constructor must call super(props) before touching this.props, and its lifecycle methods map onto effects in a function component.", "https://react.dev/reference/react/Component"),
    (R, r"\bJSX\b|\bprops?\b|\bstate\b|\bcomponents?\b|\bReact\b|\brender", "Props flow down and are read-only; state is owned by the component that declares it. Ask which one the value should be, and who owns it.", "https://react.dev/learn/passing-props-to-a-component"),
    (R, r"\bredux\b|\bsaga\b|\bthunk\b|\bstore\b|\bstate management\b", "Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component.", "https://redux.js.org/style-guide/"),

    (T, r"\bgeneric", "A constraint is a two-way deal: you narrow what callers may pass, and in return the compiler lets you use what you have guaranteed.", f"{TS}/generics.html"),
    (T, r"\binterfaces?\b|\btype alias", "Interfaces are open and merge across declarations; type aliases are closed but can name any type, including unions.", f"{TS}/everyday-types.html"),
    (T, r"\bnarrow|\btype (guard|predicate)\b|\bdiscriminated union", "A boolean return tells the compiler nothing about the argument. A predicate does, which is what lets it narrow.", f"{TS}/narrowing.html"),
    (T, r"\bunknown\b|\bany\b", "unknown accepts anything in and permits almost nothing out until you narrow it. any switches checking off and spreads.", f"{TS}/everyday-types.html#unknown"),
    (T, r"\bnever\b|\bexhaustiv", "never is the type with no values, which is what makes it useful as a tripwire for a case you forgot to handle.", f"{TS}/narrowing.html#exhaustiveness-checking"),
    (T, r"\benum\b", "A numeric enum auto-numbers from 0 and does not reject out-of-range numbers. A union of string literals closes that hole.", "https://www.typescriptlang.org/docs/handbook/enums.html"),
    (T, r"\bdecorator", "A decorator runs when the declaration is evaluated and emits real runtime code, unlike everything else in TypeScript's syntax.", "https://www.typescriptlang.org/docs/handbook/decorators.html"),
    (T, r"\bmodules?\b|\bisolatedModules\b|\bimport type\b", "A file becomes a module the moment it has a top-level import or export. Without one, its declarations are global.", f"{TS}/modules.html"),
    (R, r"\bmapped type|\bconditional type|\binfer\b|\butility type|\bkeyof\b", "Type-level operators work on types the way functions work on values: keyof reads keys, infer captures a match, mapped types rebuild a shape.", f"{TS}/mapped-types.html"),
    (T, r"\bas const\b|\bliteral type|\bsatisfies\b", "An annotation widens a value to the annotated type; as const and satisfies both exist to stop that.", f"{TS}/everyday-types.html#literal-types"),
    (T, r"\bclass(es)?\b|\bprivate\b|\bprotected\b|\bconstructor\b|\bimplements\b|\babstract\b", "Access modifiers are erased at compile time. Only a # private field is enforced at runtime.", f"{TS}/classes.html"),
    (R, r"\btsconfig\b|\bstrict\b|\bcompiler option", "A compiler flag changes what the checker will accept. Ask which unsound pattern it is closing.", "https://www.typescriptlang.org/tsconfig"),

    (J, r"\bpromise\.?(all|allsettled|race|any|resolve)\b|\bcombinator", "all is fail-fast, allSettled always fulfils, race takes the first settlement, any takes the first success.", f"{MDN}/Global_Objects/Promise"),
    (J, r"\bpromise", "A promise settles once. Ask what happens to the other work when one of them rejects.", f"{MDN}/Global_Objects/Promise"),
    (J, r"\basync\b|\bawait\b", "await does not block the thread, but it does block the next line, which is enough to serialise independent work.", f"{MDNG}/Using_promises"),
    (J, r"\bevent loop\b|\bmicrotask\b|\bmacrotask\b|\bsetTimeout\b", "The whole microtask queue drains between every pair of macrotasks, so a promise callback always beats a timer.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"),
    (J, r"\bclosure", "A closure captures the variable, not the expression that produced its value. A primitive captured once stays a snapshot.", f"{MDNG}/Closures"),
    (J, r"\bthis\b|\bbind\b|\bcall\b|\bapply\b", "A regular function resolves this at call time from its receiver. An arrow captures it at definition time.", f"{MDN}/Operators/this"),
    (J, r"\bprototype|\binheritance\b", "Reads walk the prototype chain; writes land on the object you assigned to. Mutating a value you read is not a write.", f"{MDNG}/Inheritance_and_the_prototype_chain"),
    (J, r"\bcoercion\b|\bequality\b|\btruthy\b|\bfalsy\b|\btype conversion", "Binary + concatenates as soon as one operand is a string. Work out the unary operators and the coercions first.", f"{MDN}/Operators"),
    (J, r"\bdebounce\b|\bthrottle\b", "Debounce waits for the input to stop; throttle caps the rate. Which one you want depends on whether the last event or a steady stream matters.", f"{MDNG}/Closures"),
    (J, r"\bdesign pattern|\bobserver\b|\beventemitter\b|\bimmutab", "Ask what the pattern makes cheap to change, and what it makes expensive.", f"{MDNG}"),

    (R, r"\bperformance\b|\bweb vital|\bLCP\b|\bCLS\b|\bINP\b|\boptimi[sz]", "Measure before optimising. Ask what the user actually waits for, and whether this change moves that number.", "https://web.dev/articles/vitals"),
    (G, r"\bbundle\b|\btree.?shak|\bbarrel\b", "A barrel import can pull in a whole package. Import from the exact path and check what lands in the bundle.", f"{NEXT}/optimizing/package-bundling"),
    (G, r"\bvirtualiz|\bwindowing\b|\binfinite scroll", "Rendering only the visible rows keeps the DOM small. The cost moves to measurement and scroll bookkeeping.", "https://web.dev/articles/virtualize-long-lists-react-window"),
    (G, r"\bcach|\bfetch|\bdata fetching\b|\bstale", "Ask who owns the cache, when it is invalidated, and what the user sees while it is stale.", f"{NEXT}/caching"),
    (G, r"\baccessib|\ba11y\b|\bARIA\b|\bscreen reader", "Use the native element first. ARIA is for when no native element carries the semantics you need.", "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA"),
    (G, r"\bi18n\b|\binternational|\blocali[sz]", "Locale changes number, date and plural rules, not just strings. Never build a sentence by concatenating fragments.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"),
    (G, r"\btest|\bjest\b|\btesting library\b", "Test what the user does, not how the component stores it. Query by role, assert on output.", "https://testing-library.com/docs/queries/about/#priority"),
    (G, r"\bwebsocket|\bSSE\b|\breal.?time", "Ask whether updates flow one way or both, and what happens when the connection drops.", "https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API"),
    (G, r"\bsecurity\b|\bXSS\b|\bCSRF\b|\bCSP\b|\bauthenticat|\bauthoriz", "Never trust input at a boundary. Ask what is escaped, where, and by whom.", "https://developer.mozilla.org/en-US/docs/Web/Security"),
    (G, r"\bcomplexity\b|\bbig.?o\b|\balgorithm|\bsorting\b|\bsearch\b|\bgraph\b|\btree\b|\barray\b|\bhash", "State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"),
]

SUBJECT_FALLBACK = {
    "hooks": ("Hooks run in call order on every render. Ask what this one owns, and when React re-runs it.", f"{REACT}/hooks"),
    "rendering-keys": ("React re-renders, diffs, and commits only the differences. Ask what identity each element has between renders.", "https://react.dev/learn/render-and-commit"),
    "generics": ("A type parameter carries information from the call site to the return type. Ask what the caller keeps.", f"{TS}/generics.html"),
    "narrowing": ("Narrowing is the compiler proving which member of a union you hold. Ask what evidence it has.", f"{TS}/narrowing.html"),
    "types": ("Types are erased before the code runs. Ask what the compiler knows, and what it can only assume.", f"{TS}/everyday-types.html"),
    "state-management": ("Ask where the state genuinely belongs: the URL, a server cache, a global store, or one component.", "https://react.dev/learn/choosing-the-state-structure"),
    "server-components": ("A Server Component runs on the server and ships no JavaScript. It cannot hold state or use hooks.", f"{NEXT}/rendering/server-components"),
    "performance": ("Measure before optimising. Ask what the user actually waits for.", "https://web.dev/articles/vitals"),
    "closures": ("A closure captures the variable, not the expression that produced its value.", f"{MDNG}/Closures"),
    "event-loop": ("The whole microtask queue drains between every pair of macrotasks.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"),
    "async-await": ("await does not block the thread, but it does block the next line.", f"{MDNG}/Using_promises"),
    "design-patterns": ("Ask what the pattern makes cheap to change, and what it makes expensive.", f"{MDNG}"),
    "data-fetching": ("Ask who owns the cache, when it is invalidated, and what the user sees while it is stale.", f"{NEXT}/caching"),
    "concurrency": ("Concurrent features let React keep an urgent update responsive while a non-urgent one lags.", f"{REACT}/useTransition"),
    "system-architecture": ("Start from the constraint: how much data, how often it changes, and who reads it.", "https://web.dev/articles/vitals"),
    "data-structures": ("State the time and space cost before you optimise. A Set or Map turns a repeated scan into a lookup.", "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"),
}

COMPILED = [(sc, re.compile(p, re.I), h, u) for sc, p, h, u in RULES]

TEMPLATE = re.compile(r"^Consider the core principles|^Think about the underlying|^Recall the ")


def main():
    bank = json.load(open(BANK, encoding="utf-8"))
    matched = fallback = kept = 0

    for q in bank:
        # Match on the title only. Tags are unreliable in this bank — a plain
        # hooks question carries a "performance" tag — so a tag match sends the
        # wrong hint. Anything the title does not match falls through to the
        # question's subject, which is accurate.
        allowed = SCOPES.get(q["category"], {G})
        hit = next(
            ((h, u) for sc, rx, h, u in COMPILED
             if sc in allowed and rx.search(q["title"])),
            None,
        )
        if hit:
            matched += 1
        else:
            hit = SUBJECT_FALLBACK.get(q["subject"])
            fallback += 1
        if not hit:
            continue

        # A hand-authored hint is better than any rule, but the doc link still
        # applies, so only the hint text is preserved.
        existing = (q.get("hints") or [""])[0]
        authored = q.get("source") in AUTHORED and existing and not TEMPLATE.match(existing)
        if authored:
            kept += 1
            matched -= 1 if hit else 0
        q["hints"] = [existing] if authored else [hit[0]]
        q["bestPracticeRef"] = hit[1]

    json.dump(bank, open(BANK, "w", encoding="utf-8"), indent=2, ensure_ascii=False)
    print(f"  {matched} hints from a topic rule · {fallback} from a subject fallback · {kept} hand-authored kept")
    print(f"  {sum(1 for q in bank if q.get('bestPracticeRef'))} of {len(bank)} carry a documentation link")


if __name__ == "__main__":
    main()
