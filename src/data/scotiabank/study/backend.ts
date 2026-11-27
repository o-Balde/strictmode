import { concept, java, js, json, output, pair, qa, table, trap, xml, yaml } from "./authoring";
import type { StudyTopic } from "./types";

export const NODE: StudyTopic = {
  id: "node",
  short: "Node.js",
  title: "Node.js",
  jd: "Back-End: Node.js",
  weight: "core",
  summary:
    "Node.js runs JavaScript on the server: Google's V8 engine plus libuv, a library that does I/O without blocking. One thread can serve thousands of connections as long as nothing hogs it. Interviews probe exactly that: the event loop, what blocks it, streams for big data, Express middleware, and error handling. Candidates have reported being asked to build a small GET/POST API live.",
  concepts: [
    concept("Runtime: V8 and libuv", "V8 compiles and runs the JavaScript; libuv provides the event loop, asynchronous networking, and a small thread pool. Node's own APIs (`fs`, `http`, `crypto`, `stream`) sit on top, exposed as `node:` modules."),
    concept("Single thread, non-blocking I/O", "Your JavaScript runs on one main thread. Network I/O is handled by the operating system's async mechanisms (epoll, kqueue, IOCP), so a waiting request costs almost nothing. A slow loop or synchronous call, though, blocks every other request."),
    concept("Event loop phases", "Each turn runs **timers** (`setTimeout`), **pending callbacks**, **poll** (new I/O events), **check** (`setImmediate`) and **close** callbacks. Between callbacks, Node empties the `process.nextTick` queue first, then the promise microtasks."),
    concept("The libuv thread pool", "Work the OS can't do asynchronously runs on a pool of 4 threads by default (`UV_THREADPOOL_SIZE`): file system calls, `dns.lookup`, `crypto.pbkdf2`, `zlib`. Too many slow tasks there queue up behind each other."),
    concept("CPU-bound work", "Hashing, image processing or parsing a huge JSON file blocks the loop. Options: `worker_threads` for CPU work in the same process, child processes for separate programs, or moving it to a queue and a separate service."),
    concept("Streams and backpressure", "Readable, writable, duplex and transform streams process data chunk by chunk, so a 2 GB file uses a few kilobytes of memory. **Backpressure** pauses a fast reader when the writer can't keep up; `stream.pipeline` wires it up and forwards errors."),
    concept("`Buffer`", "A fixed-size chunk of raw bytes outside the JavaScript heap, a subclass of `Uint8Array`. Files, sockets and crypto all deal in buffers; converting to a string needs an encoding (`utf8`, `base64`, `hex`)."),
    concept("`EventEmitter`", "The publish-subscribe pattern under most Node APIs: `on(event, listener)` and `emit(event, ...args)`. Streams, servers and sockets are emitters. An `error` event with no listener crashes the process."),
    concept("Express middleware", "A request passes through a chain of `(req, res, next)` functions: parse the body, log, authenticate, validate, then the route handler. Each one either responds or calls `next()`. An error middleware has four parameters, `(err, req, res, next)`, and is registered last."),
    concept("Errors in Node", "**Operational** errors (a timeout, a missing file, bad input) are expected: handle them and return a clear response. **Programmer** errors (an undefined property) are bugs: log them and let the process restart. An unhandled promise rejection ends the process by default."),
    concept("Modules and packages", "`package.json` declares dependencies with semver ranges (`^1.4.0` allows minor updates, `~1.4.0` only patches); `package-lock.json` pins the exact tree so every install is identical; `\"type\": \"module\"` makes `.js` files ES modules."),
    concept("Configuration and graceful shutdown", "Read configuration from environment variables (twelve-factor), never from committed files. On `SIGTERM`, which Cloud Run and Kubernetes send before stopping a container, stop accepting requests, finish the in-flight ones, close connections, then exit."),
    concept("Built-ins that replaced packages", "Global `fetch` (Node 18), the `node:test` runner (stable in Node 20), `--watch` mode (stable in Node 22), `--env-file` for `.env` files, and running `.ts` files directly by stripping types (on by default since Node 23.6 and 22.18)."),
  ],
  parts: [
    {
      id: "node-compare",
      title: "Side by side",
      blocks: [
        table(
          ["API", "Runs", "Use it for"],
          ["`process.nextTick(fn)`", "Right after the current operation, before promise callbacks", "Rarely: deferring within an API so callers can attach listeners"],
          ["`queueMicrotask(fn)` / `promise.then`", "After the current task, before any I/O or timer", "Follow-up work on resolved values"],
          ["`setImmediate(fn)`", "In the check phase, after the I/O just polled", "Yielding to I/O between chunks of work"],
          ["`setTimeout(fn, 0)`", "In the timers phase of a later loop turn, after at least 1 ms", "Delays; not for ordering"],
        ),
        table(
          ["", "Node.js", "Java with Spring MVC", "Java 21 with virtual threads"],
          ["Requests handled by", "One event-loop thread, callbacks and promises", "A thread per request from a pool (often 200)", "A cheap virtual thread per request"],
          ["Waiting on I/O costs", "Almost nothing", "A blocked OS thread", "Almost nothing: the virtual thread is unmounted"],
          ["CPU-heavy work", "Blocks everyone: move to workers", "Uses multiple cores naturally", "Uses multiple cores naturally"],
          ["Code style", "`async`/`await`", "Plain blocking code", "Plain blocking code"],
          ["Shared-memory concurrency bugs", "Rare (one thread)", "Possible: locks, `volatile`, concurrent collections", "Possible, same tools"],
        ),
      ],
    },
    {
      id: "node-before-after",
      title: "Before and after: older Node to current Node",
      pairs: [
        pair("Error-first callbacks to `fs/promises` and `await`", "Node 10 (`fs/promises`), 14.8 (top-level `await`)", "One `try`/`catch` instead of an `if (err)` at every level, and no way to forget an error branch.", {
          before: js(`
const fs = require("fs");

fs.readFile("statement.csv", "utf8", function (err, text) {
  if (err) return console.error(err);
  fs.writeFile("statement.json", JSON.stringify(parse(text)), function (err) {
    if (err) return console.error(err);
    console.log("done");
  });
});
`),
          after: js(`
import { readFile, writeFile } from "node:fs/promises";

try {
  const text = await readFile("statement.csv", "utf8");
  await writeFile("statement.json", JSON.stringify(parse(text)));
  console.log("done");
} catch (err) {
  console.error(err);
}
`),
        }),
        pair("HTTP client packages to built-in `fetch`", "Node 18, stable in Node 21", "The same `fetch` as the browser, with no dependency. `fetch` doesn't reject on HTTP errors, so check `response.ok`, and always set a timeout.", {
          before: js(`
const axios = require("axios");

axios.get("https://api.example.com/rates").then((response) => console.log(response.data));
`),
          after: js(`
const response = await fetch("https://api.example.com/rates", { signal: AbortSignal.timeout(5000) });
if (!response.ok) throw new Error(\`Rates request failed: \${response.status}\`);
console.log(await response.json());
`),
        }),
        pair("Reading a whole file into memory to a stream pipeline", "Node 15 (`stream/promises`)", "Memory stays flat whatever the file size, backpressure slows the reader to the writer's pace, and an error in any step rejects the one `await`.", {
          before: js(`
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";

const csv = await readFile("transactions.csv"); // 2 GB in memory at once
await writeFile("transactions.csv.gz", gzipSync(csv)); // and blocks the loop while compressing
`),
          after: js(`
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

await pipeline(createReadStream("transactions.csv"), createGzip(), createWriteStream("transactions.csv.gz"));
`),
        }),
        pair("Express 4 `try`/`catch` in every route to Express 5", "Express 5 (2024)", "Express 5 forwards a rejected promise to the error middleware itself. In Express 4, a missing `next(err)` left the request hanging until it timed out.", {
          before: js(`
app.get("/clients/:id", async (req, res, next) => {
  try {
    res.json(await clients.find(req.params.id));
  } catch (err) {
    next(err);
  }
});
`),
          after: js(`
app.get("/clients/:id", async (req, res) => {
  res.json(await clients.find(req.params.id));
});

// registered last: four parameters make it an error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal error" });
});
`),
        }),
        pair("Dev-tool packages to built-in flags", "Node 20 (`node:test`), 22 (`--watch`), 23.6 / 22.18 (`.ts` files)", "Fewer dependencies to patch, which security scanners like BlackDuck care about. Type stripping only removes types: it doesn't type-check, so `tsc --noEmit` still runs in CI.", {
          before: json(`
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "test": "jest"
  },
  "devDependencies": { "nodemon": "^3.1.0", "ts-node": "^10.9.0", "jest": "^29.7.0" }
}
`),
          after: json(`
{
  "scripts": {
    "dev": "node --watch --env-file=.env src/server.ts",
    "test": "node --test",
    "typecheck": "tsc --noEmit"
  }
}
`),
        }),
      ],
    },
    {
      id: "node-run",
      title: "Run it in your head, then check",
      blocks: [
        js(`
import { stat } from "node:fs";

stat(".", () => {
  setTimeout(() => console.log("timeout"), 0);
  setImmediate(() => console.log("immediate"));
  process.nextTick(() => console.log("nextTick"));
  Promise.resolve().then(() => console.log("promise"));
});
`, { caption: "Inside an I/O callback, the order is fixed" }),
        output(`
nextTick
promise
immediate
timeout
`),
        trap("At the top level of a script, `setTimeout(fn, 0)` vs `setImmediate` order depends on timing. Inside an I/O callback, `setImmediate` always runs first, because the check phase comes right after poll."),
      ],
    },
  ],
  questions: [
    qa("Is Node.js single-threaded?", "Your JavaScript runs on one thread, the event loop. Node itself isn't: libuv keeps a thread pool for file system, DNS and some crypto work, the OS handles network I/O asynchronously, and you can start `worker_threads` for CPU-heavy code."),
    qa("Explain the Node event loop.", "A loop of phases: timers, pending callbacks, poll (waiting for I/O), check (`setImmediate`) and close callbacks. Between callbacks, Node drains `process.nextTick` callbacks and then promise microtasks. Code is fast as long as each callback finishes quickly."),
    qa("`process.nextTick` vs `setImmediate` vs `setTimeout(fn, 0)`?", "`nextTick` runs right after the current operation, before promises and any I/O; overusing it can starve the loop. `setImmediate` runs in the check phase after I/O. `setTimeout(fn, 0)` runs in the timers phase of a later turn, after at least a millisecond."),
    qa("How do you handle CPU-intensive work in Node?", "Keep it off the event loop: `worker_threads` for work inside the service, a child process for an external program, or a job queue with a separate worker service. Break up long loops if you must stay on the main thread."),
    qa("What are streams, and why use them?", "Interfaces for processing data piece by piece: readable, writable, duplex and transform. Memory stays constant regardless of size, and processing starts before all the data arrives. Use `stream.pipeline` so backpressure and errors are handled."),
    qa("What is middleware in Express?", "Functions with `(req, res, next)` that run in order for each request: body parsing, CORS, logging, authentication, validation. Each one ends the response or calls `next()`. Error middleware takes `(err, req, res, next)` and is registered after the routes."),
    qa("How do you handle errors in an Express API?", "Validate input and return `400` for bad requests; throw typed errors (`NotFoundError`) from services; let one error middleware map them to status codes and a consistent JSON body, logging the stack server-side only. Express 5 forwards rejected promises automatically."),
    qa("CommonJS vs ES modules in Node?", "CommonJS (`require`) loads synchronously at run time; ES modules (`import`) are linked statically, support top-level `await` and are the standard. Choose with `\"type\": \"module\"` or `.mjs`/`.cjs`. Recent Node can even `require()` an ES module."),
    qa("How do you secure a Node API?", "Validate every input with a schema; use parameterised queries; authenticate with verified JWTs or sessions; authorise each resource; set security headers (helmet), CORS and rate limits; keep secrets in a vault, not the repo; run `npm audit` or a scanner; never return stack traces to clients."),
    qa("What do `package-lock.json` and the `^` and `~` ranges do?", "`^1.4.2` accepts any 1.x.y from 1.4.2 up; `~1.4.2` accepts only 1.4.x patches. The lockfile records the exact versions actually installed, so `npm ci` reproduces the same tree on every machine and in CI. Commit it."),
    qa("How would you scale a Node service?", "Keep it stateless (sessions and caches in Redis or a database), then run more instances behind a load balancer: containers on Cloud Run or Kubernetes. Use the cluster module only on a single big machine. Profile and cache before adding instances."),
    qa("What is graceful shutdown?", "On `SIGTERM`, stop accepting new connections (`server.close()`), let in-flight requests finish, close database pools and message consumers, then exit, with a forced exit after a timeout. Orchestrators like Cloud Run and Kubernetes send `SIGTERM` before killing a container."),
    qa("How would you find a memory leak in Node?", "Watch heap usage grow in metrics, take heap snapshots a few minutes apart (`--inspect` with Chrome DevTools, or `--heapsnapshot-signal`), and compare what's retained. Usual causes: unbounded caches, listeners never removed, closures holding big objects, global arrays."),
    qa("What are worker threads?", "Threads running JavaScript in the same process, each with its own event loop and heap, communicating by messages or `SharedArrayBuffer`. They're for CPU-bound work. For I/O they don't help, since async I/O is already non-blocking."),
  ],
  news: [
    { text: "Node.js 24 became LTS in October 2025 and Node.js 26 in October 2026; Node.js 20 reached end of life in April 2026.", url: "https://nodejs.org/en/about/previous-releases" },
    { text: "Type stripping is stable: `node app.ts` runs TypeScript that uses only erasable syntax, ignoring `tsconfig.json`, so import paths need their file extensions.", url: "https://nodejs.org/api/typescript.html" },
  ],
  docs: [
    { label: "Node.js API documentation", url: "https://nodejs.org/docs/latest/api/" },
    { label: "The Node.js event loop", url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick" },
    { label: "Express 5 guide", url: "https://expressjs.com/en/guide/routing.html" },
  ],
  bank: ["sb-node", "sb-builds"],
};

export const JAVA: StudyTopic = {
  id: "java",
  short: "Java",
  title: "Java 8 and later",
  jd: "Back-End: Java (Java 8+)",
  weight: "core",
  summary:
    "\"Java 8+\" in a posting means the modern, functional style that Java 8 (2014) introduced: lambdas, streams, `Optional`, `java.time`. Interviewers still start with the classics, such as OOP, collections, `equals`/`hashCode` and exceptions, then move to streams and to what later releases added. Java 25 (September 2025) is the current long-term support release.",
  concepts: [
    concept("JDK, JRE and JVM", "The **JVM** runs bytecode; the **JRE** is the JVM plus the standard library; the **JDK** adds the compiler (`javac`) and tools. `javac` compiles `.java` to bytecode, and the JVM's JIT compiler turns hot code into machine code at run time."),
    concept("Heap and stack", "Each thread has a **stack** of frames holding local variables and references. Objects live on the shared **heap**, which the garbage collector manages. A `StackOverflowError` is runaway recursion; an `OutOfMemoryError` is a heap that can't fit more live objects."),
    concept("Garbage collection", "The JVM frees objects no longer reachable from live references. Most collectors are generational, because most objects die young. G1 is the default; ZGC targets sub-millisecond pauses on large heaps. Leaks in Java are objects still referenced, often by a static map or cache."),
    concept("The four pillars of OOP", "**Encapsulation**: hide state behind methods. **Abstraction**: expose what something does, not how. **Inheritance**: reuse and specialise through `extends`. **Polymorphism**: one interface, many implementations, chosen at run time. Prefer composition over deep inheritance."),
    concept("Interfaces and abstract classes", "An interface is a contract a class can implement many of; since Java 8 it can carry `default` and `static` methods. An abstract class can hold state and constructors, but a class extends only one. Program to interfaces."),
    concept("`equals` and `hashCode`", "`==` compares references; `equals` compares meaning. Override both together: equal objects must have equal hash codes, or `HashMap` and `HashSet` lose track of them. Records generate both correctly."),
    concept("Strings", "`String` is immutable and literals are interned in a pool, so strings are safe to share and to use as map keys. Concatenating in a loop creates garbage; use `StringBuilder`. Compare with `equals`, never `==`."),
    concept("Collections", "`List` (ordered, duplicates: `ArrayList`), `Set` (unique: `HashSet`, sorted `TreeSet`), `Map` (key to value: `HashMap`, ordered `LinkedHashMap`, sorted `TreeMap`), `Deque` (`ArrayDeque` for stacks and queues). `HashMap` gets and puts are O(1) on average."),
    concept("Generics and type erasure", "Generics check types at compile time (`List<Account>`), then are erased, so at run time it's just a `List`. That's why you can't write `new T()` or check `instanceof List<String>`. Wildcards: `? extends T` to read, `? super T` to write."),
    concept("Checked and unchecked exceptions", "Checked exceptions (`IOException`) must be caught or declared; unchecked ones (`RuntimeException` and subclasses such as `IllegalArgumentException`) needn't be. `try`-with-resources (Java 7) closes anything `AutoCloseable` automatically."),
    concept("Lambdas and functional interfaces", "A lambda is a short implementation of an interface with one abstract method: `Predicate<T>` (test), `Function<T, R>` (transform), `Consumer<T>` (use), `Supplier<T>` (produce), `Comparator<T>`. Method references (`Account::getBalance`) are shorter still."),
    concept("Streams", "A pipeline over a collection: a source, **lazy** intermediate operations (`filter`, `map`, `sorted`) and one **terminal** operation (`collect`, `sum`, `toList`) that triggers the work. Streams don't modify the source and can be used only once."),
    concept("`Optional`", "A container that may be empty, used as a **return type** to say 'there might be no result'. Chain `map`, `filter` and `orElse` instead of null checks. Don't use it for fields or parameters, and never call `get()` without checking."),
    concept("Concurrency basics", "`synchronized` gives mutual exclusion and visibility; `volatile` gives visibility only; atomic classes (`AtomicLong`) give lock-free counters; `ConcurrentHashMap` is a thread-safe map; `ExecutorService` manages thread pools; `CompletableFuture` composes async results."),
    concept("Virtual threads (Java 21)", "Lightweight threads managed by the JVM, not the OS. Millions can exist, and a virtual thread blocked on I/O frees its carrier thread. Blocking code scales like async code, which suits a service calling databases and APIs."),
    concept("Records, sealed types and pattern matching", "A `record` is an immutable data class with constructor, accessors, `equals`, `hashCode` and `toString` generated (Java 16). `sealed` restricts which classes can implement a type (17). Pattern matching in `instanceof` and `switch` (16, 21) makes branching on those types exhaustive and cast-free."),
  ],
  parts: [
    {
      id: "java-versions",
      title: "Version by version, Java 8 to Java 25",
      intro: "LTS (long-term support) releases are the ones banks run. Knowing roughly what arrived when lets you say \"on Java 17 I'd use a record here\" with confidence.",
      blocks: [
        table(
          ["Release", "What arrived"],
          ["Java 8 (2014, LTS)", "Lambdas, streams, `Optional`, `java.time`, default methods in interfaces, `CompletableFuture`"],
          ["Java 9 (2017)", "Modules (JPMS), `List.of`/`Set.of`/`Map.of`, JShell"],
          ["Java 10 (2018)", "`var` for local variables"],
          ["Java 11 (2018, LTS)", "`HttpClient`, `String.isBlank`/`strip`/`lines`/`repeat`, `Files.readString`, running a single `.java` file directly"],
          ["Java 14 (2020)", "Switch expressions, helpful `NullPointerException` messages"],
          ["Java 15 (2020)", "Text blocks (`\"\"\"`)"],
          ["Java 16 (2021)", "Records, pattern matching for `instanceof`, `Stream.toList()`"],
          ["Java 17 (2021, LTS)", "Sealed classes and interfaces"],
          ["Java 21 (2023, LTS)", "Virtual threads, record patterns, pattern matching for `switch`, sequenced collections (`getFirst`, `getLast`)"],
          ["Java 22 (2024)", "Unnamed variables `_`, the foreign function and memory API"],
          ["Java 25 (2025, LTS)", "Compact source files and instance `main` methods, module import declarations, flexible constructor bodies, scoped values"],
        ),
      ],
    },
    {
      id: "java-before-after",
      title: "Before and after: Java 7 to modern Java",
      pairs: [
        pair("Anonymous classes to lambdas and method references", "Java 8", "The comparator states what to sort by; the boilerplate is gone.", {
          before: java(`
Collections.sort(accounts, new Comparator<Account>() {
    @Override
    public int compare(Account a, Account b) {
        return a.getBalance().compareTo(b.getBalance());
    }
});
`),
          after: java(`
accounts.sort(Comparator.comparing(Account::getBalance));
`),
        }),
        pair("Loops with `if` and `add` to streams", "Java 8, `toList()` in Java 16", "Each step names its intent: keep, transform, sort. On Java 8 to 15, end with `collect(Collectors.toList())` instead.", {
          before: java(`
List<String> owners = new ArrayList<>();
for (Account account : accounts) {
    if (account.getBalance().signum() > 0) {
        owners.add(account.getOwner().toUpperCase());
    }
}
Collections.sort(owners);
`),
          after: java(`
List<String> owners = accounts.stream()
        .filter(account -> account.getBalance().signum() > 0)
        .map(account -> account.getOwner().toUpperCase())
        .sorted()
        .toList();
`),
        }),
        pair("Nested null checks to `Optional`", "Java 8", "The method's return type now says the client may not exist, and the chain stops at the first empty step.", {
          before: java(`
Client client = clientDao.findById(id); // may return null
String city = "Unknown";
if (client != null && client.getAddress() != null && client.getAddress().getCity() != null) {
    city = client.getAddress().getCity();
}
`),
          after: java(`
String city = clientRepository.findById(id) // Optional<Client>
        .map(Client::getAddress)
        .map(Address::getCity)
        .orElse("Unknown");
`),
        }),
        pair("`Date` and `Calendar` to `java.time`", "Java 8", "The old types are mutable, count months from zero, and `SimpleDateFormat` isn't thread-safe. `java.time` types are immutable and say what they mean: a date, an instant, a zoned time.", {
          before: java(`
Calendar calendar = Calendar.getInstance();
calendar.add(Calendar.DAY_OF_MONTH, 30);
Date due = calendar.getTime();
SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
String text = format.format(due);
`),
          after: java(`
LocalDate due = LocalDate.now().plusDays(30);
String text = due.format(DateTimeFormatter.ISO_LOCAL_DATE);
Instant createdAt = Instant.now(); // store instants, in UTC
ZonedDateTime inToronto = createdAt.atZone(ZoneId.of("America/Toronto"));
`),
        }),
        pair("Spelled-out types to `var`", "Java 10", "`var` is local type inference, not dynamic typing: the variable is still a `HashMap<String, List<Transaction>>`. Use it when the right-hand side makes the type obvious.", {
          before: java(`
Map<String, List<Transaction>> byAccount = new HashMap<String, List<Transaction>>();
`),
          after: java(`
var byAccount = new HashMap<String, List<Transaction>>();
`),
        }),
        pair("Hand-written value classes to records", "Java 16", "Constructor, accessors, `equals`, `hashCode` and `toString` are generated, and the compact constructor still validates. Records are immutable, which suits DTOs and money values.", {
          before: java(`
final class Money {
    private final BigDecimal amount;
    private final String currency;

    Money(BigDecimal amount, String currency) {
        this.amount = amount;
        this.currency = currency;
    }

    BigDecimal getAmount() { return amount; }
    String getCurrency() { return currency; }

    // plus equals, hashCode and toString: another twenty lines
}
`),
          after: java(`
record Money(BigDecimal amount, String currency) {
    Money {
        Objects.requireNonNull(currency, "currency");
        if (amount.scale() > 2) throw new IllegalArgumentException("At most two decimals");
    }
}
`),
        }),
        pair("`instanceof` and a cast to pattern matching", "Java 16", "The test and the cast become one step, so the variable can't be cast to the wrong type.", {
          before: java(`
if (payment instanceof CardPayment) {
    CardPayment card = (CardPayment) payment;
    authorize(card.getToken());
}
`),
          after: java(`
if (payment instanceof CardPayment card) {
    authorize(card.getToken());
}
`),
        }),
        pair("`switch` statements to switch expressions", "Java 14", "Arrows can't fall through, cases can be grouped, and a switch over an enum without `default` must cover every constant or it won't compile.", {
          before: java(`
String label;
switch (type) {
    case CHEQUING:
        label = "Chequing";
        break;
    case SAVINGS:
        label = "Savings";
        break;
    default:
        label = "Registered";
}
`),
          after: java(`
String label = switch (type) {
    case CHEQUING -> "Chequing";
    case SAVINGS -> "Savings";
    case TFSA, RRSP -> "Registered";
};
`),
        }),
        pair("Open class hierarchies to sealed types and pattern `switch`", "Java 17 (`sealed`), Java 21 (pattern `switch`)", "The compiler knows every permitted payment type, so the `switch` needs no `default`, and adding a new type breaks the build until every switch handles it.", {
          before: java(`
abstract class Payment {}
class CardPayment extends Payment {}
class EftPayment extends Payment {}

class Fees {
    static BigDecimal fee(Payment payment) {
        if (payment instanceof CardPayment) return new BigDecimal("0.30");
        if (payment instanceof EftPayment) return BigDecimal.ZERO;
        throw new IllegalStateException("Unknown payment"); // anyone can add a subclass
    }
}
`),
          after: java(`
sealed interface Payment permits CardPayment, EftPayment {}
record CardPayment(String token) implements Payment {}
record EftPayment(String institution, String transit, String account) implements Payment {}

class Fees {
    static BigDecimal fee(Payment payment) {
        return switch (payment) {
            case CardPayment card -> new BigDecimal("0.30");
            case EftPayment eft -> BigDecimal.ZERO;
        };
    }
}
`),
        }),
        pair("Concatenated strings to text blocks", "Java 15", "SQL, JSON and messages read as they will be sent, with no escaped newlines or quotes.", {
          before: java(`
String query = "SELECT a.id, a.balance\\n" +
        "FROM account a\\n" +
        "WHERE a.client_id = ?\\n" +
        "ORDER BY a.opened_at";
`),
          after: java(`
String query = """
        SELECT a.id, a.balance
        FROM account a
        WHERE a.client_id = ?
        ORDER BY a.opened_at
        """;
`),
        }),
        pair("Unmodifiable wrappers to collection factories", "Java 9", "One call, and truly immutable. They reject `null` elements, and `Map.of` rejects duplicate keys.", {
          before: java(`
List<String> currencies = Collections.unmodifiableList(Arrays.asList("CAD", "USD"));
Map<String, Integer> limits = new HashMap<>();
limits.put("CAD", 10000);
limits.put("USD", 7500);
limits = Collections.unmodifiableMap(limits);
`),
          after: java(`
List<String> currencies = List.of("CAD", "USD");
Map<String, Integer> limits = Map.of("CAD", 10_000, "USD", 7_500);
`),
        }),
        pair("`finally` blocks to try-with-resources", "Java 7", "Still asked in Java 8 interviews: the resource closes even when an exception is thrown, and a failure in `close()` doesn't hide the original one.", {
          before: java(`
BufferedReader reader = null;
try {
    reader = Files.newBufferedReader(Paths.get("statement.csv"));
    System.out.println(reader.readLine());
} finally {
    if (reader != null) reader.close();
}
`),
          after: java(`
try (BufferedReader reader = Files.newBufferedReader(Path.of("statement.csv"))) {
    System.out.println(reader.readLine());
}
`),
        }),
        pair("A fixed thread pool to virtual threads", "Java 21", "Two hundred platform threads cap you at two hundred concurrent blocking calls. A virtual thread per task makes waiting on I/O nearly free; keep a semaphore if a downstream system needs a limit.", {
          before: java(`
ExecutorService pool = Executors.newFixedThreadPool(200);
for (String id : accountIds) {
    pool.submit(() -> fetchStatement(id)); // blocks one OS thread per call
}
pool.shutdown();
`),
          after: java(`
try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
    for (String id : accountIds) {
        executor.submit(() -> fetchStatement(id));
    }
} // close() waits for the tasks
`),
        }),
        pair("A class with `static main` to a compact source file", "Java 25", "For scripts and teaching: no class declaration, an instance `main`, and `IO.println`. Production services keep normal classes.", {
          before: java(`
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, Scotiabank");
    }
}
`),
          after: java(`
void main() {
    IO.println("Hello, Scotiabank");
}
`),
        }),
      ],
    },
    {
      id: "java-compare",
      title: "Side by side",
      blocks: [
        table(
          ["Collection", "Order", "Lookup", "Use it for"],
          ["`ArrayList`", "Insertion", "By index O(1); `contains` O(n)", "The default list"],
          ["`LinkedList`", "Insertion", "By index O(n)", "Rarely; `ArrayDeque` is usually better"],
          ["`HashMap` / `HashSet`", "None", "O(1) average", "Lookups by key, uniqueness"],
          ["`LinkedHashMap`", "Insertion (or access)", "O(1) average", "Predictable iteration, simple LRU caches"],
          ["`TreeMap` / `TreeSet`", "Sorted", "O(log n)", "Ranges, ordered keys, `floorKey`"],
          ["`ArrayDeque`", "Insertion", "Ends O(1)", "Stacks and queues"],
          ["`ConcurrentHashMap`", "None", "O(1) average, thread-safe", "Shared maps between threads"],
        ),
        table(
          ["", "Interface", "Abstract class"],
          ["How many per class", "Many", "One"],
          ["State (fields)", "Constants only", "Yes"],
          ["Constructors", "No", "Yes"],
          ["Method bodies", "`default`, `static` and `private` methods", "Any"],
          ["Use it for", "A capability or contract: `Comparable`, `PaymentGateway`", "Shared state and code for closely related classes"],
        ),
        table(
          ["", "Checked", "Unchecked"],
          ["Extends", "`Exception`", "`RuntimeException`"],
          ["Must be caught or declared", "Yes", "No"],
          ["Examples", "`IOException`, `SQLException`", "`IllegalArgumentException`, `NullPointerException`"],
          ["Meant for", "Recoverable conditions the caller should handle", "Bugs and violated preconditions"],
        ),
      ],
    },
    {
      id: "java-run",
      title: "A stream, run",
      blocks: [
        java(`
record Tx(String type, BigDecimal amount) {}

List<Tx> transactions = List.of(
        new Tx("debit", new BigDecimal("40.00")),
        new Tx("credit", new BigDecimal("100.00")),
        new Tx("debit", new BigDecimal("15.50")));

Map<String, BigDecimal> totals = transactions.stream()
        .collect(Collectors.groupingBy(Tx::type, TreeMap::new,
                Collectors.reducing(BigDecimal.ZERO, Tx::amount, BigDecimal::add)));

int debits = transactions.stream().mapToInt(tx -> tx.type().equals("debit") ? 1 : 0).sum();
System.out.println(totals + ", " + debits + " debits");
`, { caption: "Group and sum with BigDecimal, never double" }),
        output(`
{credit=100.00, debit=55.50}, 2 debits
`),
        trap("`Arrays.asList` returns a fixed-size list backed by the array: `add` throws `UnsupportedOperationException`. `List.of` is fully immutable."),
      ],
    },
  ],
  questions: [
    qa("JDK vs JRE vs JVM?", "The JVM executes bytecode and manages memory; the JRE is the JVM plus the standard libraries needed to run programs; the JDK is the JRE plus the compiler and tools to build them. Since Java 11 you install a JDK."),
    qa("Heap vs stack?", "Each thread's stack holds method frames: local variables, primitives and references, freed when the method returns. The heap holds every object, is shared between threads, and is cleaned by the garbage collector."),
    qa("How does garbage collection work?", "The JVM finds objects reachable from roots (stacks, static fields) and reclaims the rest. Collectors are generational because most objects die young: young collections are frequent and cheap, old-generation ones rarer. G1 is the default; ZGC keeps pauses tiny on big heaps."),
    qa("What are the four pillars of OOP? What is abstraction?", "Encapsulation, abstraction, inheritance and polymorphism. Abstraction means exposing what an object does and hiding how: a `PaymentGateway` interface with `charge()`, whether it talks to Visa or Interac behind it."),
    qa("Interface vs abstract class?", "A class can implement many interfaces but extend one class. Interfaces define a contract and, since Java 8, can provide `default` methods; abstract classes can also hold state and constructors. Use interfaces for capabilities, abstract classes for shared implementation in a family."),
    qa("Why override `equals` and `hashCode` together?", "Hash-based collections find an object by `hashCode`, then confirm with `equals`. If two equal objects have different hash codes, a `HashSet` can hold both and a `HashMap` can't find the key. Records and IDE-generated methods keep them consistent."),
    qa("How does `HashMap` work?", "It hashes the key to a bucket in an array. Collisions in a bucket form a linked list, turned into a balanced tree past 8 entries. When it's 75% full it doubles and rehashes. Gets and puts are O(1) on average. It isn't thread-safe: use `ConcurrentHashMap`."),
    qa("Why are strings immutable?", "So they can be shared safely: interned literals, map keys whose hash never changes, thread safety with no locks, and security (a checked file path or URL can't change afterwards). Build strings in loops with `StringBuilder`."),
    qa("`==` vs `equals()`?", "`==` checks whether two references point at the same object (or compares primitive values). `equals()` checks logical equality as the class defines it. Strings, `BigDecimal` and boxed numbers must be compared with `equals`, or `compareTo` for `BigDecimal` values like `2.0` and `2.00`."),
    qa("Checked vs unchecked exceptions?", "Checked exceptions extend `Exception` and must be caught or declared: conditions a caller can reasonably handle, like `IOException`. Unchecked ones extend `RuntimeException` and signal bugs or broken preconditions. Spring code mostly uses unchecked exceptions plus one global handler."),
    qa("What is a functional interface?", "An interface with exactly one abstract method, so a lambda or method reference can implement it: `Runnable`, `Comparator`, `Predicate`, `Function`, `Supplier`, `Consumer`. `@FunctionalInterface` makes the compiler enforce it."),
    qa("Intermediate vs terminal stream operations?", "Intermediate operations (`filter`, `map`, `sorted`, `distinct`) return a new stream and are lazy: nothing runs until a terminal operation (`collect`, `toList`, `sum`, `forEach`, `findFirst`) pulls data through. A stream can be consumed only once."),
    qa("How do you sum a list with the Stream API?", "`amounts.stream().mapToInt(Integer::intValue).sum()` for integers. For money, `BigDecimal` values: `amounts.stream().reduce(BigDecimal.ZERO, BigDecimal::add)`. `Collectors.summingInt` does the same inside a `groupingBy`."),
    qa("How should `Optional` be used?", "As a return type for 'maybe no result', consumed with `map`, `filter`, `orElse`, `orElseThrow` or `ifPresent`. Not for fields, parameters or collections (return an empty list instead), and never call `get()` without checking."),
    qa("`synchronized` vs `volatile` vs atomic classes?", "`synchronized` gives mutual exclusion and memory visibility for a block. `volatile` only guarantees visibility, so readers see the latest write, without atomic compound actions. `AtomicInteger` and friends do atomic read-modify-write without locks, good for counters."),
    qa("What are virtual threads, and when would you use them?", "JVM-managed lightweight threads in Java 21. Blocking I/O parks the virtual thread instead of an OS thread, so a service can handle huge numbers of concurrent blocking calls with plain, readable code. They don't make CPU-bound work faster."),
    qa("What's a record, and when would you use one?", "A concise immutable data carrier (Java 16): the compiler generates the constructor, accessors, `equals`, `hashCode` and `toString`. Use it for DTOs, query results, events and value objects such as `Money`. Not for JPA entities, which need mutability and a no-argument constructor."),
    qa("Overloading vs overriding?", "Overloading means same name, different parameter lists, in one class, resolved at compile time. Overriding means a subclass replaces an inherited method with the same signature, resolved at run time: that's polymorphism. Mark overrides with `@Override`."),
    qa("What's new in Java since 8 that you'd actually use?", "`var`, collection factories (`List.of`), text blocks, records, switch expressions, pattern matching, sealed types, `Stream.toList()`, the `HttpClient`, and virtual threads in 21. Java 25, the current LTS, added compact source files and scoped values."),
  ],
  news: [
    { text: "Java 25 (16 September 2025) is the current LTS. It finalised compact source files and instance `main` methods, module import declarations, flexible constructor bodies and scoped values.", url: "https://openjdk.org/projects/jdk/25/" },
  ],
  docs: [
    { label: "Java SE documentation (Oracle)", url: "https://docs.oracle.com/en/java/javase/" },
    { label: "Java Language Specification", url: "https://docs.oracle.com/javase/specs/" },
    { label: "dev.java: learn Java", url: "https://dev.java/learn/" },
  ],
  bank: ["sb-java"],
};

export const SPRING: StudyTopic = {
  id: "spring",
  short: "Spring Boot",
  title: "Spring Boot",
  jd: "Back-End: Spring Boot basics",
  weight: "core",
  summary:
    "Spring is the framework most bank Java services run on; Spring Boot is the opinionated setup on top that makes a production-ready REST service a few annotations away. \"Basics\" in the posting means: dependency injection, the layers of a REST service, configuration and profiles, data access with JPA and transactions, validation, and global error handling.",
  concepts: [
    concept("Inversion of control and dependency injection", "Objects don't create their dependencies; the Spring container creates them and passes them in. Code depends on interfaces, so tests can pass in fakes, and wiring lives in one place."),
    concept("Beans and the application context", "A bean is an object the container creates and manages. The `ApplicationContext` finds beans through component scanning (`@Component` and friends) and `@Bean` methods, resolves their dependencies, and handles their lifecycle."),
    concept("Constructor injection", "The recommended way to inject: dependencies are constructor parameters stored in `final` fields. The object is never half-built, is easy to test with plain `new`, and too many parameters signal a class doing too much."),
    concept("Bean scopes", "**singleton** (default: one instance per container, so beans must be stateless or thread-safe), **prototype** (a new instance per injection), and in web apps **request** and **session**."),
    concept("Stereotype annotations", "`@Component` marks any bean; `@Service` business logic; `@Repository` data access, which also translates database exceptions; `@Controller` returns views; `@RestController` = `@Controller` + `@ResponseBody`, returning JSON."),
    concept("`@SpringBootApplication`", "Combines `@Configuration` (this class can define beans), `@EnableAutoConfiguration` (configure what's on the classpath) and `@ComponentScan` (find beans in this package and below)."),
    concept("Auto-configuration and starters", "A starter (`spring-boot-starter-web`, `-data-jpa`, `-security`) brings a tested set of dependencies. Auto-configuration then creates sensible beans when it sees a class on the classpath and no bean of your own, such as a `DataSource` when a JDBC driver is present."),
    concept("Externalised configuration and profiles", "Settings come from `application.yml`, environment variables, command-line arguments and secret stores, in a defined order of precedence. Profiles (`dev`, `prod`) switch sets of settings; `@ConfigurationProperties` binds them to a typed class."),
    concept("The request path in Spring MVC", "The `DispatcherServlet` receives the request, finds the matching `@GetMapping` or `@PostMapping`, binds path variables, query parameters and the JSON body (via Jackson), runs validation, calls the controller, and serialises the return value."),
    concept("Validation", "Annotate DTO fields with Bean Validation constraints (`@NotBlank`, `@Email`, `@Positive`, `@Size`) and the controller parameter with `@Valid`. A failing request becomes a `400` before your code runs."),
    concept("Global exception handling", "A `@RestControllerAdvice` class with `@ExceptionHandler` methods maps exceptions to responses in one place. Spring 6 supports `ProblemDetail`, the standard JSON error format of RFC 9457."),
    concept("Spring Data JPA", "Declare an interface extending `JpaRepository<Client, UUID>` and Spring implements it: CRUD, paging, derived queries such as `findByEmail`, and `@Query` for JPQL. Hibernate maps entities to tables underneath."),
    concept("`@Transactional`", "Wraps a method in a database transaction: commit on success, roll back on an unchecked exception. It works through a proxy, so a call from another method in the same class bypasses it, and it only applies to public methods called from outside."),
    concept("The N+1 query problem", "Loading 100 clients and then touching each one's lazy `accounts` fires 1 + 100 queries. Fix it with a fetch join (`JOIN FETCH`), an `@EntityGraph`, batch fetching, or a DTO projection query."),
    concept("Spring Security", "A chain of servlet filters in front of the controllers. For APIs it's usually an OAuth2 resource server: it validates the JWT bearer token against the issuer's keys and maps scopes or roles to authorities for `@PreAuthorize`."),
    concept("Actuator", "Production endpoints: `/actuator/health` (with liveness and readiness groups for Kubernetes and Cloud Run probes), metrics through Micrometer, and info. Expose only what you need and secure the rest."),
    concept("Testing slices", "`@WebMvcTest` loads only the web layer, used with `MockMvc` and mocked services; `@DataJpaTest` loads only JPA; `@SpringBootTest` loads everything, often with Testcontainers for a real PostgreSQL."),
  ],
  parts: [
    {
      id: "spring-annotations",
      title: "Annotations at a glance",
      blocks: [
        table(
          ["Annotation", "What it does"],
          ["`@SpringBootApplication`", "Entry point: configuration, auto-configuration and component scan"],
          ["`@RestController`, `@RequestMapping`", "A JSON controller and its base path"],
          ["`@GetMapping`, `@PostMapping`, `@PutMapping`, `@PatchMapping`, `@DeleteMapping`", "Map an HTTP method and path to a method"],
          ["`@PathVariable`, `@RequestParam`, `@RequestBody`", "Bind `/clients/{id}`, `?page=2` and the JSON body"],
          ["`@Valid`", "Run Bean Validation on the argument"],
          ["`@Service`, `@Repository`, `@Component`", "Register a bean, with its role"],
          ["`@Configuration` + `@Bean`", "Define beans in code, typically for third-party classes"],
          ["`@Value`, `@ConfigurationProperties`", "Inject one setting, or bind a group of settings to a class"],
          ["`@Profile(\"prod\")`", "Create the bean only when that profile is active"],
          ["`@Transactional`", "Run the method in a transaction"],
          ["`@Entity`, `@Id`, `@OneToMany`", "JPA mapping"],
          ["`@RestControllerAdvice`, `@ExceptionHandler`", "Global error handling"],
          ["`@PreAuthorize(\"hasAuthority('SCOPE_accounts.read')\")`", "Method-level authorisation"],
        ),
        table(
          ["", "Spring MVC", "Spring WebFlux"],
          ["Model", "Blocking, thread per request (virtual threads optional)", "Non-blocking, event loop (Reactor)"],
          ["Return types", "Plain objects, `ResponseEntity`", "`Mono`, `Flux`"],
          ["Database access", "JDBC, JPA", "R2DBC, reactive drivers"],
          ["Choose it when", "Almost always: simpler code, every library works", "Streaming, very high concurrency, a fully reactive stack"],
        ),
      ],
    },
    {
      id: "spring-layers",
      title: "The layers of a small REST service",
      intro: "Controller for HTTP, service for rules and transactions, repository for data. Keep entities out of the API: map them to DTOs.",
      blocks: [
        java(`
@RestController
@RequestMapping("/api/clients")
class ClientController {
    private final ClientService service;

    ClientController(ClientService service) {
        this.service = service;
    }

    @PostMapping
    ResponseEntity<ClientDto> create(@Valid @RequestBody NewClientRequest request) {
        ClientDto created = service.create(request);
        return ResponseEntity.created(URI.create("/api/clients/" + created.id())).body(created);
    }

    @GetMapping("/{id}")
    ClientDto get(@PathVariable UUID id) {
        return service.get(id);
    }
}

record NewClientRequest(@NotBlank String name, @Email String email) {}
record ClientDto(UUID id, String name, String email) {}

@Service
class ClientService {
    private final ClientRepository clients;

    ClientService(ClientRepository clients) {
        this.clients = clients;
    }

    @Transactional
    ClientDto create(NewClientRequest request) {
        if (clients.existsByEmail(request.email())) throw new DuplicateClientException(request.email());
        Client saved = clients.save(new Client(request.name(), request.email()));
        return new ClientDto(saved.getId(), saved.getName(), saved.getEmail());
    }

    @Transactional(readOnly = true)
    ClientDto get(UUID id) {
        Client client = clients.findById(id).orElseThrow(() -> new ClientNotFoundException(id));
        return new ClientDto(client.getId(), client.getName(), client.getEmail());
    }
}

interface ClientRepository extends JpaRepository<Client, UUID> {
    boolean existsByEmail(String email);
}
`, { caption: "Controller, service, repository" }),
        yaml(`
spring:
  application:
    name: onboarding-service
  datasource:
    url: jdbc:postgresql://\${DB_HOST}:5432/onboarding
    username: \${DB_USER}
    password: \${DB_PASSWORD} # injected from Key Vault or Secret Manager, never committed
  jpa:
    open-in-view: false
management:
  endpoint:
    health:
      probes:
        enabled: true # /actuator/health/liveness and /readiness
---
spring:
  config:
    activate:
      on-profile: dev
  datasource:
    url: jdbc:postgresql://localhost:5432/onboarding
`, { caption: "application.yml with a dev profile" }),
      ],
    },
    {
      id: "spring-before-after",
      title: "Before and after: older Spring to Spring Boot 3 and 4",
      pairs: [
        pair("XML bean definitions to auto-configuration", "Spring Boot 1 (2014)", "Boot builds the `DataSource` from the driver on the classpath and the properties; your own classes are found by component scanning. You write configuration only for what's specific to you.", {
          before: xml(`
<beans xmlns="http://www.springframework.org/schema/beans">
  <bean id="dataSource" class="com.zaxxer.hikari.HikariDataSource">
    <property name="jdbcUrl" value="jdbc:postgresql://localhost/onboarding" />
  </bean>
  <bean id="clientRepository" class="com.example.JdbcClientRepository">
    <constructor-arg ref="dataSource" />
  </bean>
  <bean id="clientService" class="com.example.ClientService">
    <constructor-arg ref="clientRepository" />
  </bean>
</beans>
`),
          after: yaml(`
# application.yml: the rest is @Service, @Repository and auto-configuration
spring:
  datasource:
    url: jdbc:postgresql://localhost/onboarding
    username: \${DB_USER}
    password: \${DB_PASSWORD}
`),
        }),
        pair("Field injection to constructor injection", "Spring 4.3 (implicit constructor injection)", "Final fields, no reflection needed to test it, and the dependency list is visible in one place. A single constructor needs no `@Autowired`.", {
          before: java(`
@Service
public class OnboardingService {
    @Autowired
    private ClientRepository clients;

    @Autowired
    private KycClient kyc;
}
`),
          after: java(`
@Service
public class OnboardingService {
    private final ClientRepository clients;
    private final KycClient kyc;

    public OnboardingService(ClientRepository clients, KycClient kyc) {
        this.clients = clients;
        this.kyc = kyc;
    }
}
`),
        }),
        pair("`try`/`catch` in every controller to `@RestControllerAdvice` and `ProblemDetail`", "Spring 6 / Spring Boot 3 (`ProblemDetail`)", "Controllers express the happy path; one class maps exceptions to standard RFC 9457 error bodies.", {
          before: java(`
@GetMapping("/clients/{id}")
public ResponseEntity<?> get(@PathVariable UUID id) {
    try {
        return ResponseEntity.ok(service.get(id));
    } catch (ClientNotFoundException e) {
        return ResponseEntity.status(404).body(Map.of("error", e.getMessage()));
    }
}
`),
          after: java(`
@GetMapping("/clients/{id}")
public ClientDto get(@PathVariable UUID id) {
    return service.get(id);
}

@RestControllerAdvice
class ApiErrors {
    @ExceptionHandler(ClientNotFoundException.class)
    ProblemDetail notFound(ClientNotFoundException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }
}
`),
        }),
        pair("`RestTemplate` to `RestClient`", "Spring Framework 6.1 / Spring Boot 3.2", "A fluent, readable client with the same message converters. `RestTemplate` is in maintenance mode.", {
          before: java(`
RestTemplate rest = new RestTemplate();
KycResult result = rest.postForObject("https://kyc.internal/checks", request, KycResult.class);
`),
          after: java(`
RestClient kyc = RestClient.builder().baseUrl("https://kyc.internal").build();

KycResult result = kyc.post()
        .uri("/checks")
        .body(request)
        .retrieve()
        .body(KycResult.class);
`),
        }),
        pair("A hand-written retry loop to `@Retryable`", "Spring Framework 7 / Spring Boot 4", "Retries with exponential backoff are now built into Spring itself, enabled with `@EnableResilientMethods`; `maxRetries = 2` means three attempts in total. Only retry idempotent calls.", {
          before: java(`
public KycResult check(KycRequest request) throws InterruptedException {
    for (int attempt = 1; ; attempt++) {
        try {
            return kyc.submit(request);
        } catch (KycUnavailableException e) {
            if (attempt == 3) throw e;
            Thread.sleep(200L * attempt);
        }
    }
}
`),
          after: java(`
@Retryable(maxRetries = 2, delay = 200, multiplier = 2, includes = KycUnavailableException.class)
public KycResult check(KycRequest request) {
    return kyc.submit(request);
}
`),
        }),
        pair("`javax.*` to `jakarta.*`", "Spring Boot 3 (November 2022)", "Java EE moved to the Eclipse Foundation as Jakarta EE and its packages were renamed. Spring Boot 3 also raised the baseline to Java 17, which Spring Boot 4 keeps.", {
          before: java(`
import javax.persistence.Entity;
import javax.validation.constraints.NotBlank;
`),
          after: java(`
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotBlank;
`),
        }),
      ],
    },
  ],
  questions: [
    qa("What is dependency injection, and why does Spring use it?", "Instead of a class creating its collaborators, they're passed in, and Spring's container builds and wires them. Classes depend on interfaces, tests can pass fakes, and swapping an implementation is configuration, not a code change."),
    qa("Spring vs Spring Boot?", "Spring Framework provides the container, MVC, data access and transactions. Spring Boot adds auto-configuration, starter dependencies, an embedded server and production features like Actuator, so a service runs as `java -jar` with almost no setup."),
    qa("What does `@SpringBootApplication` do?", "It combines `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`: the class can define beans, Boot configures what's on the classpath, and Spring scans its package and sub-packages for components."),
    qa("Constructor vs field injection?", "Constructor injection makes dependencies explicit and `final`, so the object is always fully built, and tests can call `new` without Spring. Field injection hides dependencies and needs reflection. Spring recommends constructor injection."),
    qa("What are bean scopes?", "Singleton (the default: one shared instance per context, so keep it stateless), prototype (a new instance each time it's injected), and request or session scopes in web apps. Most beans should be stateless singletons."),
    qa("`@Component` vs `@Service` vs `@Repository`?", "All register a bean. `@Service` and `@Repository` document the layer, and `@Repository` also translates database exceptions into Spring's `DataAccessException` hierarchy. `@RestController` is for HTTP endpoints returning data."),
    qa("How does auto-configuration work?", "Boot ships configuration classes guarded by conditions such as `@ConditionalOnClass` and `@ConditionalOnMissingBean`. If a library is on the classpath and you haven't defined that bean yourself, Boot creates a sensible default. The `--debug` flag prints the conditions report."),
    qa("How do you handle exceptions globally?", "A `@RestControllerAdvice` class with `@ExceptionHandler` methods mapping each exception type to a status and body, ideally `ProblemDetail` (RFC 9457). Validation failures become `400`, missing resources `404`, conflicts `409`, everything else a logged `500` without internals."),
    qa("How does `@Transactional` work, and what are its pitfalls?", "Spring wraps the bean in a proxy that begins a transaction before the method and commits after, rolling back on unchecked exceptions. Pitfalls: calling it from another method of the same class bypasses the proxy, checked exceptions don't roll back by default, and long transactions hold locks."),
    qa("What's the N+1 problem, and how do you fix it?", "One query loads a list, then a lazy association triggers one extra query per row. Spot it in SQL logs; fix it with `JOIN FETCH`, `@EntityGraph`, batch fetching, or a DTO projection that selects exactly the columns needed."),
    qa("How do you validate a request body?", "Put Bean Validation annotations on the DTO (`@NotBlank`, `@Email`, `@Positive`) and `@Valid` on the `@RequestBody` parameter. Spring returns `400` with the field errors; customise the body in your controller advice."),
    qa("What are profiles?", "Named sets of configuration and beans, such as `dev`, `test` and `prod`, activated with `spring.profiles.active`. Use them for environment differences; keep secrets out of the files and inject them from a vault or environment variables."),
    qa("How would you secure a Spring REST API with JWTs?", "Add the OAuth2 resource server starter and set the issuer URI. Spring fetches the issuer's public keys (JWKS), validates the signature, expiry, issuer and audience on every request, and maps scopes to authorities used by `requestMatchers` rules or `@PreAuthorize`."),
    qa("How do you test a Spring Boot service?", "Unit-test services with plain JUnit and Mockito. Use `@WebMvcTest` and `MockMvc` for controllers (status codes, validation, JSON), `@DataJpaTest` for repositories, and a few `@SpringBootTest` integration tests against a real database with Testcontainers."),
    qa("What does Actuator give you?", "Operational endpoints: health with liveness and readiness probes, metrics through Micrometer (exported to Prometheus, Dynatrace and others), info, and environment details. Expose health publicly for the platform and keep the rest internal."),
    qa("What changed in Spring Boot 4?", "Released November 2025 with Spring Framework 7: still a Java 17 baseline with Java 25 support, Jakarta EE 11, Jackson 3, auto-configuration split into smaller modules, built-in API versioning, and built-in resilience annotations such as `@Retryable` and `@ConcurrencyLimit`."),
  ],
  news: [
    { text: "Spring Boot 4.0 and Spring Framework 7.0 shipped in November 2025: Java 17 baseline, Jakarta EE 11, Jackson 3, modular auto-configuration, API versioning, and `@Retryable` and `@ConcurrencyLimit` built in.", url: "https://spring.io/blog/2025/11/20/spring-boot-4-0-0-available-now/" },
    { text: "Free support for Spring Boot 3.5, the last 3.x line, ended in June 2026, so new services start on Boot 4.", url: "https://spring.io/projects/spring-boot#support" },
  ],
  docs: [
    { label: "Spring Boot reference", url: "https://docs.spring.io/spring-boot/index.html" },
    { label: "Spring Framework reference", url: "https://docs.spring.io/spring-framework/reference/" },
    { label: "Spring Data JPA reference", url: "https://docs.spring.io/spring-data/jpa/reference/" },
  ],
  bank: ["sb-spring", "sb-java"],
};
