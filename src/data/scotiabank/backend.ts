import { java, js, list, p, say, steps, table, trap, ts, yaml } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_NODE: PrepSection = {
  id: "sb-node",
  track: "backend",
  title: "Node.js",
  blurb:
    "Node often runs the backend-for-frontend layer next to Java microservices. The questions are about the event loop, middleware, streams, and running cleanly in a container.",
  drill: "event-loop",
  questions: [
    {
      id: "sb-node-event-loop",
      question: "How does Node handle many concurrent requests on one thread?",
      level: "intermediate",
      short:
        "JavaScript runs on one thread, but I/O doesn't block it. Node hands network and file work to the operating system and libuv's thread pool, and keeps running other callbacks while it waits. That makes Node very good at I/O-bound work (APIs, proxies, BFFs) and poor at CPU-bound work, which blocks every request on that process. Move CPU-heavy work to `worker_threads` or to another service.",
      body: [
        list(
          "The loop phases: **timers** → **pending callbacks** → **poll** (I/O) → **check** (`setImmediate`) → **close**. After each callback, Node drains the `process.nextTick` queue, then the promise microtasks.",
          "A synchronous `JSON.parse` of a 50 MB file, a tight loop, or `bcrypt.hashSync` stalls every in-flight request.",
          "Scale out with more processes or containers (Cloud Run instances, Kubernetes replicas), not more threads.",
        ),
        js(`
// In a CommonJS script this prints: sync, nextTick, promise, then timeout and immediate.
// The timeout/immediate order isn't guaranteed from the main module; inside an I/O callback,
// immediate always comes first. ES modules run nextTick after promise callbacks.
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
console.log("sync");
`),
      ],
    },
    {
      id: "sb-node-express",
      question: "How does Express middleware work? How do you handle errors in it?",
      level: "intermediate",
      short:
        "Middleware are functions `(req, res, next)` that run in the order you register them. Each one either ends the response or calls `next()` to pass control on. An error handler has four parameters, `(err, req, res, next)`, and is registered last. Express 5 forwards rejected promises from async handlers to it; Express 4 needs a wrapper or `next(err)`.",
      body: [
        ts(`
import express, { type NextFunction, type Request, type Response } from "express";
import { randomUUID } from "node:crypto";

const app = express();
app.use(express.json({ limit: "100kb" })); // body parser, with a size limit

app.use((req, res, next) => {
  const id = req.header("x-correlation-id") ?? randomUUID(); // trace one request across services
  res.setHeader("x-correlation-id", id);
  next();
});

app.post("/applications", async (req, res) => {
  const application = await createApplication(req.body); // Express 5 catches a rejection here
  res.status(201).location(\`/applications/\${application.id}\`).json(application);
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err); // a structured logger, without PII, in real code
  res.status(500).json({ title: "Internal error" }); // never leak the stack trace to clients
});

app.listen(Number(process.env.PORT ?? 8080));
`),
        trap("Registering the error handler before the routes, or calling `next()` after you've already sent a response, which throws 'headers already sent'."),
      ],
    },
    {
      id: "sb-node-streams",
      question: "How would you export a large statement CSV without running out of memory?",
      level: "intermediate",
      short:
        "Stream it. Read rows from a database cursor, transform each row into a CSV line, and pipe the result into the HTTP response. Use `stream.pipeline`, which handles backpressure (it pauses the reader when the client is slow) and cleans up on error. Memory stays flat, whatever the file size.",
      body: [
        ts(`
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";

async function exportStatement(res: NodeJS.WritableStream, rows: AsyncIterable<{ date: string; amountCents: number }>) {
  res.write("date,amount\\n");
  const toCsv = new Transform({
    objectMode: true,
    transform(row: { date: string; amountCents: number }, _enc, done) {
      done(null, \`\${row.date},\${(row.amountCents / 100).toFixed(2)}\\n\`);
    },
  });
  await pipeline(rows, toCsv, res); // backpressure and error cleanup handled for you
}
`),
      ],
    },
    {
      id: "sb-node-modules",
      question: "CommonJS vs ES modules?",
      level: "junior",
      short:
        "CommonJS uses `require` and `module.exports`, loads synchronously, and was Node's original system. ES modules use `import` and `export`: they are static, so bundlers can tree-shake them, they support top-level `await`, and they are the standard in browsers. Node picks the system from `\"type\": \"module\"` in `package.json` or from the `.mjs` / `.cjs` extension.",
      body: [
        list(
          "In ESM, `__dirname` doesn't exist. Use `import.meta.dirname` (Node 20.11 and later) or `fileURLToPath(import.meta.url)`.",
          "Recent Node versions can `require()` a synchronous ES module, which makes mixing the two less painful than it used to be.",
        ),
      ],
    },
    {
      id: "sb-node-shutdown",
      question: "Your Node service runs on Cloud Run or Kubernetes. How should it start and stop?",
      level: "intermediate",
      short:
        "Listen on the port in the `PORT` environment variable. Report healthy only once it can serve traffic. On `SIGTERM`, stop accepting new connections, finish the requests in flight, close database pools and message consumers, then exit, before the platform's grace period runs out and it sends `SIGKILL`. Treat an unhandled rejection or exception as fatal: log it and let the platform restart the instance.",
      body: [
        ts(`
import http from "node:http";

const server = http.createServer(handler);
server.listen(Number(process.env.PORT ?? 8080));

process.on("SIGTERM", () => {
  server.close(async () => {
    await db.end(); // close pools and consumers
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 9_000).unref(); // a hard stop before the grace period ends
});
`),
      ],
    },
    {
      id: "sb-node-vs-java",
      question: "Node or Spring Boot: when would you pick which?",
      level: "intermediate",
      short:
        "Node suits I/O-heavy, JSON-in-JSON-out work, BFFs that combine several APIs for one screen, and teams that want one language with the React front end. Spring Boot suits core domain services: strong typing everywhere, mature transactions and JPA, Spring Security, and a long history in banks. Many banks use both, with Node at the edge and Java in the core.",
      body: [
        table(
          ["", "Node.js", "Spring Boot (Java)"],
          ["Concurrency", "Event loop, async I/O", "Thread per request, or virtual threads (Java 21) / reactive"],
          ["Best at", "BFF, API aggregation, real-time", "Domain logic, transactions, integrations"],
          ["Ecosystem", "npm, fast iteration", "Spring Data/Security/Kafka, enterprise libraries"],
          ["Watch out for", "CPU-bound work, dependency sprawl", "Startup time and memory (matters on Cloud Run)"],
        ),
        say("I'd go with the team's standard. Consistency across services matters more than how either language looks on paper."),
      ],
    },
  ],
};

export const SB_JAVA: PrepSection = {
  id: "sb-java",
  track: "backend",
  title: "Core Java (8+)",
  blurb:
    "The posting asks for Java 8+. Bank interviews still test classic core Java: OOP, collections, the `equals`/`hashCode` contract, Java 8 streams, exceptions, `BigDecimal` and basic concurrency. Be able to write a small class on a whiteboard without an IDE.",
  questions: [
    {
      id: "sb-java-oop",
      question: "Explain the four pillars of OOP with a bank-account example.",
      level: "junior",
      short:
        "**Encapsulation:** the balance is private and changes only through methods that enforce the rules. **Abstraction:** callers use `deposit` and `withdraw` without knowing how they work. **Inheritance:** a `SavingsAccount` reuses the code in `Account`. **Polymorphism:** the same `monthlyFee()` call behaves differently for each subclass.",
      body: [
        java(`
public abstract class Account {
    private final String id;
    private BigDecimal balance = BigDecimal.ZERO;

    protected Account(String id) { this.id = id; }

    public void deposit(BigDecimal amount) {
        if (amount.signum() <= 0) throw new IllegalArgumentException("Deposit must be positive");
        balance = balance.add(amount);
    }

    public void withdraw(BigDecimal amount) {
        if (amount.compareTo(balance) > 0) throw new InsufficientFundsException(id, amount);
        balance = balance.subtract(amount);
    }

    public BigDecimal getBalance() { return balance; }

    public abstract BigDecimal monthlyFee(); // each subclass decides
}

public class ChequingAccount extends Account {
    public ChequingAccount(String id) { super(id); }
    @Override public BigDecimal monthlyFee() { return new BigDecimal("4.95"); }
}

public class SavingsAccount extends Account {
    public SavingsAccount(String id) { super(id); }
    @Override public BigDecimal monthlyFee() { return BigDecimal.ZERO; }
}
`),
        say("I prefer composition to inheritance once a hierarchy goes deeper than one level. A fee policy injected into the account is easier to test than three subclasses."),
      ],
      followUps: [
        {
          q: "Overloading vs overriding?",
          a: "Overloading is several methods with the same name and different parameters, chosen at compile time. Overriding is a subclass replacing a superclass method with the same signature, chosen at runtime from the object's actual type.",
        },
      ],
    },
    {
      id: "sb-java-interface-abstract",
      question: "Interface vs abstract class (since Java 8)?",
      level: "junior",
      short:
        "An interface defines a capability. A class can implement many interfaces, and since Java 8 an interface can have `default` and `static` methods, but it has no instance state. An abstract class is a partial implementation: it can have fields, constructors and protected members, and a class can extend only one. Use an interface for the contract, and an abstract class to share state and code within one family of classes.",
      body: [
        java(`
public interface FeePolicy {
    BigDecimal feeFor(Account account);

    default boolean isWaived(Account account) { // Java 8 default method
        return feeFor(account).signum() == 0;
    }
}
`),
      ],
    },
    {
      id: "sb-java-equals-hashcode",
      question: "What is the `equals`/`hashCode` contract, and what breaks if you ignore it?",
      level: "intermediate",
      short:
        "Objects that are equal must return the same hash code. If you override `equals` but not `hashCode`, two equal keys usually land in different `HashMap` buckets, so `map.get(equalKey)` returns `null` and a `HashSet` keeps duplicates. Don't use mutable fields in either method: changing one after insertion makes the entry impossible to find.",
      body: [
        java(`
public final class AccountId {
    private final String institution;
    private final String number;

    public AccountId(String institution, String number) {
        this.institution = institution;
        this.number = number;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AccountId)) return false;
        AccountId other = (AccountId) o;
        return institution.equals(other.institution) && number.equals(other.number);
    }

    @Override
    public int hashCode() {
        return Objects.hash(institution, number);
    }
}

// Java 16+: a record generates equals, hashCode and toString for you
public record AccountKey(String institution, String number) {}
`),
        trap("Comparing strings with `==`. It compares references, so two equal strings built at runtime are not `==`. Use `equals`."),
      ],
    },
    {
      id: "sb-java-strings",
      question: "Why are Strings immutable? `String` vs `StringBuilder`?",
      level: "junior",
      short:
        "Immutability makes strings safe to share between threads, safe to use as `HashMap` keys (the hash can be cached), and safe to intern in the string pool. It also means a value checked for security can't change afterwards. Each `+` in a loop creates a new object, so build strings in loops with `StringBuilder`, which is mutable and not synchronised. `StringBuffer` is the synchronised legacy version.",
      body: [
        java(`
StringBuilder csv = new StringBuilder("date,amount\\n");
for (Transaction t : transactions) {
    csv.append(t.date()).append(',').append(t.amount().toPlainString()).append('\\n');
}
String result = csv.toString();
`),
      ],
    },
    {
      id: "sb-java-collections",
      question: "Walk through the main collections. How does `HashMap` work?",
      level: "intermediate",
      short:
        "`ArrayList` is a resizable array: O(1) access by index. Prefer it to `LinkedList` almost every time. `HashMap` gives O(1) average get and put: it hashes the key to a bucket, and since Java 8 a crowded bucket turns from a linked list into a balanced tree. `LinkedHashMap` keeps insertion order. `TreeMap` keeps keys sorted, in O(log n). For concurrent access, use `ConcurrentHashMap`, not `Hashtable`.",
      body: [
        table(
          ["Need", "Use", "Note"],
          ["Ordered list, index access", "`ArrayList`", "Amortised O(1) append"],
          ["Unique items", "`HashSet` / `LinkedHashSet`", "Needs a correct `hashCode`"],
          ["Key → value", "`HashMap`", "Allows one null key, not thread-safe"],
          ["Sorted keys, range queries", "`TreeMap`", "`subMap`, `floorKey`"],
          ["Queue / stack", "`ArrayDeque`", "Faster than `Stack` and `LinkedList`"],
          ["Priority", "`PriorityQueue`", "A min-heap by default"],
          ["Shared between threads", "`ConcurrentHashMap`", "Atomic `computeIfAbsent` and `merge`"],
        ),
        p("A `HashMap` resizes when its size passes capacity × load factor (default 16 × 0.75). Iterating over a collection while changing it throws `ConcurrentModificationException`. Use `iterator.remove()` or `removeIf` instead."),
      ],
    },
    {
      id: "sb-java-streams",
      question: "Use Java 8 streams to total transactions by account.",
      level: "junior",
      short:
        "Streams describe a pipeline over a collection. Intermediate operations (`filter`, `map`, `sorted`) are lazy, and a terminal operation (`collect`, `reduce`, `forEach`) runs the pipeline. `Collectors.groupingBy` with a downstream collector covers most 'summarise by' questions. Lambdas implement functional interfaces such as `Predicate`, `Function` and `Supplier`.",
      body: [
        java(`
record Txn(String account, BigDecimal amount, LocalDate date) {}

Map<String, BigDecimal> balances = txns.stream()
    .collect(Collectors.groupingBy(
        Txn::account,
        TreeMap::new, // sorted keys
        Collectors.reducing(BigDecimal.ZERO, Txn::amount, BigDecimal::add)));

List<String> bigDepositAccounts = txns.stream()
    .filter(t -> t.amount().compareTo(new BigDecimal("10000")) >= 0) // large deposits get extra review
    .map(Txn::account)
    .distinct()
    .sorted()
    .collect(Collectors.toList());

Optional<Txn> latest = txns.stream().max(Comparator.comparing(Txn::date));
String when = latest.map(t -> t.date().toString()).orElse("no activity");

// "Sum a list with the Stream API" (a reported question)
int total = List.of(3, 5, 8).stream().mapToInt(Integer::intValue).sum();             // 16
BigDecimal sum = amounts.stream().reduce(BigDecimal.ZERO, BigDecimal::add);           // money
`),
        trap("Calling `Optional.get()` without checking. Use `orElse`, `orElseThrow` or `map`, and don't use `Optional` for fields or parameters."),
      ],
    },
    {
      id: "sb-java-exceptions",
      question: "Checked vs unchecked exceptions, and how do you handle them well?",
      level: "junior",
      short:
        "The compiler makes you catch or declare a **checked** exception (`IOException`, `SQLException`). **Unchecked** exceptions extend `RuntimeException` and usually mean a bug or a broken business rule. Catch an exception only where you can do something about it. Use try-with-resources for anything closeable. Wrap low-level exceptions in domain ones, keeping the cause.",
      body: [
        java(`
public class InsufficientFundsException extends RuntimeException {
    public InsufficientFundsException(String accountId, BigDecimal requested) {
        super("Insufficient funds in " + accountId + " for " + requested.toPlainString());
    }
}

try (Connection conn = dataSource.getConnection();
     PreparedStatement ps = conn.prepareStatement("SELECT balance FROM account WHERE id = ?")) {
    ps.setString(1, accountId);
    try (ResultSet rs = ps.executeQuery()) {
        return rs.next() ? rs.getBigDecimal(1) : BigDecimal.ZERO;
    }
} catch (SQLException e) {
    throw new DataAccessFailure("Could not read balance for " + accountId, e); // keep the cause
}
`),
        trap("`catch (Exception e) {}`, which swallows the error, and logging the same exception at every layer. Log it once, where you handle it."),
      ],
    },
    {
      id: "sb-java-bigdecimal",
      question: "How do you represent money in Java?",
      level: "junior",
      short:
        "Use `BigDecimal`, never `double`. Build it from a `String` (`new BigDecimal(\"0.10\")`), because `new BigDecimal(0.1)` copies the binary error in. Always pass a scale and a `RoundingMode` when dividing. `equals` compares scale too, so `2.0` doesn't equal `2.00`; compare amounts with `compareTo`.",
      body: [
        java(`
BigDecimal a = new BigDecimal("0.10");
BigDecimal b = new BigDecimal("0.20");
System.out.println(a.add(b));                                     // 0.30
System.out.println(new BigDecimal(0.1));                          // 0.1000000000000000055511151231257827...
System.out.println(new BigDecimal("2.0").equals(new BigDecimal("2.00")));        // false
System.out.println(new BigDecimal("2.0").compareTo(new BigDecimal("2.00")) == 0); // true

BigDecimal monthly = new BigDecimal("100.00")
    .divide(new BigDecimal("3"), 2, RoundingMode.HALF_EVEN); // 33.33; without a scale this throws
`),
        p("`HALF_EVEN`, banker's rounding, rounds ties to the nearest even digit, so rounding errors don't pile up in one direction over many transactions. Ask which mode the domain requires. Some calculations are set by regulation."),
      ],
    },
    {
      id: "sb-java-concurrency",
      question: "Two threads withdraw from the same account at once. What goes wrong, and how do you fix it?",
      level: "intermediate",
      short:
        "Check-then-act is a race condition. Both threads read the same balance, both pass the funds check, and both subtract, so the account can go overdrawn. In one JVM, make the check and the update atomic with `synchronized`, a `ReentrantLock` or an atomic class. Across several instances of a service, the fix belongs in the database: a conditional `UPDATE`, a row lock, or optimistic locking.",
      body: [
        java(`
public class Account {
    private BigDecimal balance;

    public synchronized void withdraw(BigDecimal amount) { // one thread at a time per account
        if (amount.compareTo(balance) > 0) throw new InsufficientFundsException("id", amount);
        balance = balance.subtract(amount);
    }
}
`, { caption: "Single JVM: lock the critical section", tone: "good" }),
        java(`
// Many instances: let the database decide, atomically
int updated = jdbc.update(
    "UPDATE account SET balance = balance - ? WHERE id = ? AND balance >= ?",
    amount, accountId, amount);
if (updated == 0) throw new InsufficientFundsException(accountId, amount);
`, { caption: "Distributed: a conditional update", tone: "good" }),
        list(
          "`volatile` gives visibility between threads, not atomicity. `count++` on a volatile field is still a race.",
          "Use `ExecutorService` or `CompletableFuture` rather than creating raw `Thread`s. Java 21's virtual threads make blocking I/O cheap.",
          "A deadlock needs locks taken in different orders. Always lock accounts in a fixed order, for example by id.",
        ),
      ],
    },
    {
      id: "sb-java-jvm",
      question: "Heap vs stack, and what does the garbage collector do?",
      level: "intermediate",
      short:
        "Each thread has its own **stack**, holding method frames, local primitives and references. Objects live on the shared **heap**. The garbage collector frees heap objects that nothing reachable from the GC roots refers to any more. Most objects die young, so collectors are generational. G1 is the default, and ZGC suits low-pause needs. Java can still leak memory through references you forget to drop, such as a static cache that only grows.",
      body: [
        list(
          "`StackOverflowError` usually means recursion that never stops. `OutOfMemoryError: Java heap space` means too much live data, or a leak.",
          "In containers, size the heap relative to the container's memory limit (`-XX:MaxRAMPercentage=75`) rather than with a fixed `-Xmx`.",
        ),
      ],
    },
    {
      id: "sb-java-immutability",
      question: "What does `final` mean, and how do you make a class immutable?",
      level: "junior",
      short:
        "On a variable, `final` means it is assigned once. On a method, it can't be overridden. On a class, it can't be extended. An immutable class is `final`, has `private final` fields set in the constructor, has no setters, makes defensive copies of mutable inputs and outputs, and returns a new instance for every change. Records give you most of this in one line.",
      body: [
        java(`
public record Money(BigDecimal amount, Currency currency) {
    public Money {
        Objects.requireNonNull(amount);
        Objects.requireNonNull(currency);
        amount = amount.setScale(currency.getDefaultFractionDigits(), RoundingMode.HALF_EVEN);
    }

    public Money plus(Money other) {
        if (!currency.equals(other.currency)) throw new IllegalArgumentException("Currency mismatch");
        return new Money(amount.add(other.amount), currency); // returns a new value, never mutates
    }
}
`),
      ],
    },
    {
      id: "sb-java-solid",
      question: "What are the SOLID principles? Give one example you've applied.",
      level: "junior",
      short:
        "**S**ingle responsibility: one reason to change. **O**pen/closed: extend behaviour without editing tested code. **L**iskov substitution: a subclass can stand in for its parent. **I**nterface segregation: small, focused interfaces. **D**ependency inversion: depend on abstractions, which Spring injects. Have one concrete story ready, such as replacing a `switch` on account type with a strategy per type.",
      body: [
        java(`
public interface KycCheck { CheckResult run(Applicant applicant); }

@Component class SanctionsScreening implements KycCheck { /* ... */ }
@Component class IdentityVerification implements KycCheck { /* ... */ }
@Component class PepScreening implements KycCheck { /* politically exposed persons */ }

@Service
class KycService {
    private final List<KycCheck> checks; // Spring injects every implementation

    KycService(List<KycCheck> checks) { this.checks = checks; }

    List<CheckResult> screen(Applicant applicant) {
        return checks.stream().map(check -> check.run(applicant)).toList(); // add a check without editing this class
    }
}
`),
      ],
    },
    {
      id: "sb-java-patterns",
      question: "Singleton vs Factory: what are they, and where do you meet them in Spring?",
      level: "junior",
      short:
        "A **Singleton** makes sure a class has one instance with a global access point. A **Factory** puts object creation behind a method, so callers ask for 'an account of type X' without knowing which concrete class comes back. In Spring you rarely hand-write either: beans are singletons by default, managed by the container, and `@Bean` methods are factories. Hand-written singletons hide dependencies and make testing hard. Scotiabank co-op candidates report this question.",
      body: [
        java(`
// Singleton, thread-safe and lazy: the holder idiom
public final class ExchangeRates {
    private ExchangeRates() {}
    private static class Holder { static final ExchangeRates INSTANCE = new ExchangeRates(); }
    public static ExchangeRates getInstance() { return Holder.INSTANCE; }
}

// Factory: callers depend on the interface, not on the concrete class
public final class AccountFactory {
    public static Account create(AccountType type, String id) {
        return switch (type) {
            case TFSA -> new TfsaAccount(id);
            case RRSP -> new RrspAccount(id);
            case NON_REGISTERED -> new CashAccount(id);
        };
    }
}
`),
        list(
          "Other patterns worth one sentence each: **Builder** (Lombok `@Builder`, `RestClient.builder()`), **Strategy** (a `KycCheck` per rule), **Observer** (Spring events, Kafka consumers), **Adapter** (wrapping a vendor API), **Proxy** (how `@Transactional` works).",
        ),
      ],
    },
  ],
};

export const SB_SPRING: PrepSection = {
  id: "sb-spring",
  track: "backend",
  title: "Spring Boot",
  blurb:
    "The posting says 'Spring Boot basics', so expect dependency injection, the standard annotations, a controller → service → repository flow, validation, exception handling and `@Transactional`. Be ready to sketch a REST endpoint from memory.",
  questions: [
    {
      id: "sb-spring-what",
      question: "What does Spring Boot add on top of Spring?",
      level: "junior",
      short:
        "Opinionated defaults. **Starters** (`spring-boot-starter-web`, `-data-jpa`, `-security`) pull in compatible dependency sets. **Auto-configuration** creates beans based on what's on the classpath and what you've configured. It runs with an **embedded server** (Tomcat) as a fat JAR, has **externalised config** with profiles, and **Actuator** adds health checks and metrics. You write business code instead of XML.",
      body: [
        list(
          "`@SpringBootApplication` combines `@Configuration`, `@EnableAutoConfiguration` and `@ComponentScan`.",
          "To see why a bean was or wasn't auto-configured, run with `--debug` for the condition evaluation report.",
          "Override any auto-configured bean by declaring your own. Auto-config backs off.",
        ),
      ],
    },
    {
      id: "sb-spring-di",
      question: "What are dependency injection and IoC? Why constructor injection?",
      level: "junior",
      short:
        "With inversion of control, the Spring container creates your objects (beans) and wires their dependencies, so classes don't construct their own collaborators. Constructor injection makes dependencies explicit, allows `final` fields, makes a class easy to unit test with plain `new`, and fails at startup if something is missing. Field injection with `@Autowired` hides dependencies, and you can't test it without Spring or reflection.",
      body: [
        java(`
@Service
public class OnboardingService {
    private final ClientRepository clients;
    private final KycClient kyc;
    private final ApplicationEventPublisher events;

    // A single constructor needs no @Autowired
    public OnboardingService(ClientRepository clients, KycClient kyc, ApplicationEventPublisher events) {
        this.clients = clients;
        this.kyc = kyc;
        this.events = events;
    }
}
`),
        table(
          ["Scope", "Lifetime"],
          ["singleton (default)", "One instance per container, so it must be stateless or thread-safe"],
          ["prototype", "A new instance every time it is injected"],
          ["request / session", "One per HTTP request or session (web apps)"],
        ),
      ],
    },
    {
      id: "sb-spring-annotations",
      question: "Which Spring annotations should you know?",
      level: "junior",
      short:
        "Stereotypes: `@Component`, `@Service`, `@Repository` (which also translates persistence exceptions) and `@RestController`. Configuration: `@Configuration`, `@Bean`, `@Value`, `@ConfigurationProperties`, `@Profile`. Web: `@RequestMapping` and `@GetMapping`/`@PostMapping`, `@PathVariable`, `@RequestParam`, `@RequestBody`, `@Valid`. Data: `@Entity`, `@Id`, `@Transactional`. Errors: `@RestControllerAdvice` and `@ExceptionHandler`.",
      body: [
        p("`@RestController` is `@Controller` plus `@ResponseBody`: return values are written as JSON by Jackson instead of being resolved as view names."),
      ],
    },
    {
      id: "sb-spring-rest-endpoint",
      question: "Write a REST endpoint to open an account, with validation.",
      level: "junior",
      short:
        "Keep the controller thin. It takes a validated request DTO, calls the service, and maps the result to a response DTO with the right status and a `Location` header. Business rules live in the service, persistence in a repository, and entities never go out over the wire.",
      body: [
        java(`
public record OpenAccountRequest(
        @NotBlank String clientId,
        @NotNull AccountType type,          // TFSA, RRSP, FHSA, NON_REGISTERED...
        @NotNull @Size(min = 3, max = 3) String currency) {}

public record AccountResponse(String id, AccountType type, String currency, String status) {}

@RestController
@RequestMapping("/api/v1/accounts")
public class AccountController {
    private final AccountService service;

    public AccountController(AccountService service) { this.service = service; }

    @PostMapping
    public ResponseEntity<AccountResponse> open(
            @RequestHeader("Idempotency-Key") String idempotencyKey,
            @Valid @RequestBody OpenAccountRequest request) {
        AccountResponse created = service.open(request, idempotencyKey);
        return ResponseEntity.created(URI.create("/api/v1/accounts/" + created.id())).body(created);
    }

    @GetMapping("/{id}")
    public AccountResponse get(@PathVariable String id) {
        return service.get(id); // throws AccountNotFoundException → 404 in the advice below
    }
}
`),
        p("`@Valid` triggers Bean Validation (Jakarta). A failure throws `MethodArgumentNotValidException`, which Spring turns into a 400. Customise that response in a `@RestControllerAdvice`."),
      ],
    },
    {
      id: "sb-spring-errors",
      question: "How do you handle errors consistently across a Spring API?",
      level: "intermediate",
      short:
        "Put one `@RestControllerAdvice` in charge of mapping exceptions to HTTP responses. Use RFC 9457 Problem Details (`ProblemDetail`, built into Spring 6) so every error has the same shape: type, title, status, detail, plus your own fields such as a correlation id. Map domain exceptions to 404, 409 or 422, validation errors to 400, and everything unexpected to a generic 500.",
      body: [
        java(`
@RestControllerAdvice
public class ApiErrors {

    @ExceptionHandler(AccountNotFoundException.class)
    ProblemDetail notFound(AccountNotFoundException e) {
        return ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.getMessage());
    }

    @ExceptionHandler(InsufficientFundsException.class)
    ProblemDetail insufficientFunds(InsufficientFundsException e) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.UNPROCESSABLE_ENTITY);
        problem.setTitle("Insufficient funds");
        return problem;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ProblemDetail invalid(MethodArgumentNotValidException e) {
        ProblemDetail problem = ProblemDetail.forStatus(HttpStatus.BAD_REQUEST);
        problem.setProperty("errors", e.getBindingResult().getFieldErrors().stream()
                .map(f -> Map.of("field", f.getField(), "message", String.valueOf(f.getDefaultMessage())))
                .toList());
        return problem;
    }
}
`),
        trap("Returning `e.getMessage()` from unexpected exceptions. It can leak SQL, internal hostnames or personal data. Log the details with a correlation id and send the client something generic."),
      ],
    },
    {
      id: "sb-spring-jpa",
      question: "How do Spring Data JPA and `@Transactional` work? What are the classic traps?",
      level: "intermediate",
      short:
        "Spring Data generates repository implementations from interfaces and method names. `@Transactional` works through a proxy: the method runs inside a transaction that commits on return and rolls back on unchecked exceptions. The traps: calling a `@Transactional` method from the same class skips the proxy, so there's no transaction. Checked exceptions don't roll back by default. Lazy relationships cause N+1 queries.",
      body: [
        java(`
public interface AccountRepository extends JpaRepository<AccountEntity, UUID> {
    List<AccountEntity> findByClientIdAndStatus(UUID clientId, AccountStatus status);

    @Query("select a from AccountEntity a join fetch a.holders where a.clientId = :clientId") // avoids N+1
    List<AccountEntity> findWithHolders(@Param("clientId") UUID clientId);
}

@Service
public class TransferService {
    @Transactional // both updates commit together, or neither does
    public void transfer(UUID from, UUID to, BigDecimal amount) {
        AccountEntity source = accounts.findById(from).orElseThrow();
        AccountEntity target = accounts.findById(to).orElseThrow();
        source.debit(amount);
        target.credit(amount);
        // dirty checking: JPA flushes the changes on commit, no save() call needed
    }
}
`),
        list(
          "**N+1:** loading 50 accounts and then touching `account.getHolders()` in a loop runs 51 queries. Fix it with `join fetch`, an `@EntityGraph`, or a DTO projection.",
          "**Optimistic locking:** a `@Version` column makes a concurrent update fail with `OptimisticLockException` instead of silently overwriting the other change.",
          "Keep transactions short, and never call a slow remote API inside one.",
        ),
      ],
    },
    {
      id: "sb-spring-config",
      question: "How do you manage configuration and secrets across environments?",
      level: "intermediate",
      short:
        "Put defaults in `application.yml` and override them per environment with profiles (`application-dev.yml`) and environment variables. Bind related settings to a typed, validated `@ConfigurationProperties` record. Secrets never go in the repository: on Azure, pull them from Key Vault (Spring Cloud Azure); on GCP, from Secret Manager. The pod or app reaches them with a managed identity or workload identity, not with a stored password.",
      body: [
        yaml(
          `
spring:
  datasource:
    url: jdbc:postgresql://\${DB_HOST}:5432/onboarding
    username: \${DB_USER}
    password: \${DB_PASSWORD}   # injected at runtime from Key Vault / Secret Manager
  kafka:
    bootstrap-servers: \${KAFKA_BOOTSTRAP}
onboarding:
  kyc:
    base-url: https://kyc.internal.example
    timeout: 2s
`,
          { caption: "application.yml" },
        ),
        java(`
@ConfigurationProperties(prefix = "onboarding.kyc")
@Validated
public record KycProperties(@NotNull URI baseUrl, @NotNull Duration timeout) {}
`),
      ],
    },
    {
      id: "sb-spring-security",
      question: "How would you secure a Spring Boot API with OAuth2 and JWT?",
      level: "intermediate",
      short:
        "Make the service an OAuth2 **resource server**. Spring Security validates the bearer JWT on every request: signature against the issuer's JWKS, issuer, audience, expiry. Then it maps scopes or roles to authorities. Authorise per endpoint, and check object ownership in the service layer: a valid token for client A must not read client B's account.",
      body: [
        java(`
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain api(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // stateless API with bearer tokens, no cookies
            .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health/**").permitAll()
                .requestMatchers(HttpMethod.POST, "/api/v1/accounts").hasAuthority("SCOPE_accounts.write")
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth -> oauth.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
`),
        yaml(`
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://login.example.com/tenant-id/v2.0   # keys are fetched from the issuer's JWKS
          audiences: api://onboarding-service
`),
      ],
    },
    {
      id: "sb-spring-actuator",
      question: "What is Spring Boot Actuator for?",
      level: "junior",
      short:
        "It adds production endpoints: `/actuator/health` (with separate `liveness` and `readiness` groups for Kubernetes and Cloud Run probes), `/actuator/info`, and `/actuator/metrics` or `/prometheus` through Micrometer. Expose only what you need, and put everything except health behind authentication.",
      body: [
        list(
          "**Liveness** answers 'is the process stuck?': a failure restarts the container.",
          "**Readiness** answers 'can it take traffic now?': a failure takes the pod out of the load balancer without killing it. Use it while warming up, or while the database is down.",
          "Micrometer plus OpenTelemetry gives you metrics and traces, with correlation ids across microservices.",
        ),
      ],
    },
    {
      id: "sb-spring-testing",
      question: "How do you test a Spring Boot service?",
      level: "intermediate",
      short:
        "Unit-test services with plain JUnit 5 and Mockito: fast, no Spring context. Use slice tests for one layer each: `@WebMvcTest` with `MockMvc` for controllers, `@DataJpaTest` for repositories. Keep a few `@SpringBootTest` integration tests, run against real dependencies in Testcontainers (Postgres, Kafka) rather than H2, which behaves differently from Postgres.",
      body: [
        java(`
@WebMvcTest(AccountController.class)
class AccountControllerTest {
    @Autowired MockMvc mvc;
    @MockitoBean AccountService service; // Spring Boot 3.4+; @MockBean on older versions

    @Test
    void rejectsMissingClientId() throws Exception {
        mvc.perform(post("/api/v1/accounts")
                .header("Idempotency-Key", "k-1")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\\"type\\":\\"TFSA\\",\\"currency\\":\\"CAD\\"}"))
           .andExpect(status().isBadRequest());
    }
}
`),
      ],
    },
    {
      id: "sb-spring-http-clients",
      question: "How does a Spring service call another service safely?",
      level: "intermediate",
      short:
        "Use `RestClient` (Spring 6.1+) or `WebClient`; `RestTemplate` is in maintenance mode. Always set connect and read timeouts. Retry only idempotent calls, with exponential backoff and jitter. Wrap each dependency in a circuit breaker (Resilience4j), so a slow KYC vendor can't use up all your threads. Pass the correlation id and the caller's token downstream.",
      body: [
        java(`
@Bean
RestClient kycRestClient(KycProperties props) {
    var factory = new SimpleClientHttpRequestFactory();
    factory.setConnectTimeout((int) Duration.ofSeconds(1).toMillis());
    factory.setReadTimeout((int) props.timeout().toMillis());
    return RestClient.builder().baseUrl(props.baseUrl().toString()).requestFactory(factory).build();
}

@CircuitBreaker(name = "kyc", fallbackMethod = "pendingReview")
@Retry(name = "kyc")
public KycResult verify(Applicant applicant) {
    return kyc.post().uri("/verifications").body(applicant).retrieve().body(KycResult.class);
}

KycResult pendingReview(Applicant applicant, Throwable cause) {
    return KycResult.manualReview(); // degrade gracefully: send to a human, don't fail onboarding
}
`),
        steps(
          "Timeout: never wait forever.",
          "Retry: only if the call is idempotent, a few times, with backoff and jitter.",
          "Circuit breaker: stop calling a dependency that keeps failing, and recover through half-open probes.",
          "Fallback: a degraded but safe answer.",
        ),
      ],
    },
  ],
};
