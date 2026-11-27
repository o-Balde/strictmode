import { http, java, json, list, p, say, steps, table, trap, ts } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

export const SB_REST: PrepSection = {
  id: "sb-rest",
  track: "architecture",
  title: "REST API design",
  blurb:
    "The posting says you will 'assist in developing RESTful APIs' and apply 'secure API design'. Expect HTTP semantics, status codes, and the bank-specific one: how to keep a retried request from opening two accounts.",
  questions: [
    {
      id: "sb-rest-principles",
      question: "What makes an API RESTful?",
      level: "junior",
      short:
        "Resources are nouns with URLs (`/clients/{id}/accounts`). HTTP methods carry the verbs. Every request is stateless: it holds everything needed to process it, usually a bearer token. Responses use standard status codes and media types, and say whether they can be cached. Most real APIs are 'REST-ish' rather than fully hypermedia-driven, and that's fine.",
      body: [
        http(`
GET    /api/v1/clients/c-123/accounts          → 200 list
POST   /api/v1/clients/c-123/accounts          → 201 + Location: /api/v1/accounts/a-9
GET    /api/v1/accounts/a-9                     → 200 | 404
PATCH  /api/v1/accounts/a-9   {"nickname":"…"}  → 200
DELETE /api/v1/accounts/a-9/beneficiaries/b-2   → 204
`),
        trap("Verbs in paths, as in `POST /createAccount` or `GET /getClient?id=1`. Use nouns, and let the method be the verb."),
      ],
    },
    {
      id: "sb-rest-request-lifecycle",
      question: "What happens, step by step, when the browser calls `https://api.example.com/accounts`?",
      level: "junior",
      short:
        "**DNS** resolves the host to an IP, through the browser, OS and resolver caches. **TCP** connects, or QUIC for HTTP/3. A **TLS handshake** checks the certificate and agrees on keys. The browser sends the **HTTP request** with its method, path, headers (cookies, `Authorization`) and body. It goes through a CDN or WAF, then a **load balancer** or API gateway, which checks auth and rate limits, then to a service instance, which may call a database or other services. The **response** comes back with a status, headers and a body, and connections are reused for later requests.",
      body: [
        steps(
          "DNS lookup (cached at several levels).",
          "TCP + TLS handshake (TLS 1.3: one round trip, and zero on resumption).",
          "The HTTP request goes out, perhaps after a CORS preflight if it is cross-origin with custom headers.",
          "Edge: CDN, WAF, load balancer, API gateway (Apigee is reported at Scotiabank), which validates the token and applies limits.",
          "The service: routing → controller → service → database or downstream calls, all with timeouts.",
          "The response: status, caching headers, compressed body. The browser parses it, and React re-renders.",
        ),
      ],
    },
    {
      id: "sb-rest-methods",
      question: "Which HTTP methods are safe and which are idempotent? PUT vs PATCH vs POST?",
      level: "junior",
      short:
        "**Safe** methods don't change state: GET and HEAD. **Idempotent** means sending the same request once or ten times leaves the same end state: GET, PUT and DELETE. POST and PATCH are not idempotent by default. PUT replaces a whole resource, PATCH changes part of one, and POST creates a resource or triggers an action.",
      body: [
        table(
          ["Method", "Safe", "Idempotent", "Typical use"],
          ["GET", "Yes", "Yes", "Read a resource or collection"],
          ["POST", "No", "No", "Create, or run an action (submit application)"],
          ["PUT", "No", "Yes", "Replace the whole resource at a known URL"],
          ["PATCH", "No", "Not guaranteed", "Partial update"],
          ["DELETE", "No", "Yes", "Remove (a second call returns 404 or 204, same end state)"],
        ),
        p("Idempotency is what makes retries safe. Clients, load balancers and message consumers all retry, so every write you cannot make idempotent needs an idempotency key."),
      ],
    },
    {
      id: "sb-rest-status-codes",
      question: "Which status codes would you return, and when?",
      level: "junior",
      short:
        "2xx for success: 200 OK, 201 Created with a `Location` header, 202 Accepted for async work, 204 No Content. 4xx when the client is at fault: 400 malformed, 401 not authenticated, 403 authenticated but not allowed, 404 not found, 409 conflict, 422 valid syntax that breaks a business rule, 429 rate-limited. 5xx when the server is at fault: 500 unexpected, 502 or 504 upstream failure or timeout, 503 temporarily unavailable.",
      body: [
        table(
          ["Situation in onboarding", "Status"],
          ["Application created", "201 + `Location`"],
          ["KYC check started, result comes later", "202 + a status URL"],
          ["Missing required field", "400 (or 422) with per-field errors"],
          ["No or expired token", "401 + `WWW-Authenticate`"],
          ["Advisor opening an account for a client they don't serve", "403 (or 404 to avoid confirming the account exists)"],
          ["Same idempotency key, different payload", "409 / 422"],
          ["Client is under 18 for this account type", "422"],
          ["KYC vendor timed out", "504 / 503 with `Retry-After`"],
        ),
        trap("Returning 200 with `{\"error\": ...}` in the body. Clients, monitoring and retry logic all read the status code."),
      ],
    },
    {
      id: "sb-rest-idempotency",
      question: "A client double-clicks 'Open account', or the network retries. How do you make sure only one account opens?",
      level: "intermediate",
      short:
        "Make the POST idempotent with an `Idempotency-Key` header: the client generates a UUID once per submission. The server stores the key with the request's hash and the response, under a unique constraint. A repeat with the same key gets the stored response; the same key with a different body gets a 409 or 422. Then add belt-and-braces: disable the button while the request is in flight, and add a natural unique constraint, for example one pending application per client and account type.",
      body: [
        steps(
          "The client creates `Idempotency-Key: 7f9c…` when the form mounts or on the first submit, and reuses it for every retry.",
          "In one transaction, the server inserts the key into `idempotency_keys(key PK, request_hash, status, response, created_at)`. If the key already exists, it returns the stored response, or a 409 if the original request is still in progress.",
          "The server does the work, saves the response with the key, and commits.",
          "Keys expire after a retention window, such as 24 hours.",
        ),
        http(`
POST /api/v1/accounts HTTP/1.1
Authorization: Bearer eyJ...
Idempotency-Key: 7f9c2ba4-e88f-4c1c-9f3d-1b0e5d6a2c11
Content-Type: application/json

{"clientId":"c-123","type":"TFSA","currency":"CAD"}

HTTP/1.1 201 Created
Location: /api/v1/accounts/a-9
Idempotency-Replayed: false
`),
        say("Timeouts are where duplicates come from. The client can't tell 'failed' from 'succeeded but the response was lost', so it has to be able to retry safely."),
      ],
      docs: "https://stripe.com/blog/idempotency",
    },
    {
      id: "sb-rest-pagination",
      question: "How do you paginate, filter and sort a large collection?",
      level: "intermediate",
      short:
        "Offset pagination (`?page=3&size=50`) is simple and lets users jump to a page, but deep pages get slow, and rows shift when data changes between requests. Cursor pagination (`?after=<opaque cursor>&limit=50`) uses an indexed key such as `(created_at, id)`. It is stable and fast at any depth, which is better for transaction history. Allow-list the filter and sort fields and cap the page size.",
      body: [
        http(`
GET /api/v1/accounts/a-9/transactions?limit=50&after=eyJ0cyI6IjIwMjYtMTEtMDEiLCJpZCI6OTl9

200 OK
{ "data": [ ... ], "nextCursor": "eyJ0cyI6IjIwMjYtMTAtMjgiLCJpZCI6NDJ9" }
`),
      ],
    },
    {
      id: "sb-rest-versioning",
      question: "How do you version an API without breaking clients?",
      level: "junior",
      short:
        "Make additive changes by default: new optional fields and new endpoints break nobody, as long as clients ignore fields they don't know. When a change must break something, publish a new version: in the URL (`/v2/`, the most common in banks), in a header, or in the media type. Run both versions side by side, announce the deprecation (`Deprecation` and `Sunset` headers), and remove the old one when traffic has moved.",
      body: [
        list(
          "Breaking changes: removing or renaming a field, changing a type or a meaning, making an optional field required, changing error codes.",
          "Contract tests, or an OpenAPI diff in CI, catch accidental breaking changes before they merge.",
        ),
      ],
    },
    {
      id: "sb-rest-errors",
      question: "What should an API error look like?",
      level: "junior",
      short:
        "Use one consistent, machine-readable shape. RFC 9457 Problem Details (`application/problem+json`) is the standard: `type`, `title`, `status`, `detail`, `instance`, plus your own fields such as per-field validation errors and a correlation id the user can quote to support. Never include stack traces, SQL or personal data.",
      body: [
        json(`
{
  "type": "https://api.example.com/problems/validation",
  "title": "Your request has invalid fields",
  "status": 400,
  "instance": "/api/v1/accounts",
  "correlationId": "b7d1c2e0-5a",
  "errors": [
    { "field": "currency", "message": "must be a 3-letter ISO code" },
    { "field": "type", "message": "must be one of TFSA, RRSP, FHSA, NON_REGISTERED" }
  ]
}
`),
      ],
    },
    {
      id: "sb-rest-cors",
      question: "What is CORS, and why does your React app hit CORS errors calling the API?",
      level: "junior",
      short:
        "The browser's same-origin policy blocks scripts from reading responses from another origin, meaning a different scheme, host or port. CORS lets the **server** say which origins may read its responses, through `Access-Control-Allow-*` headers. For non-simple requests (JSON bodies, `Authorization` headers), the browser first sends an `OPTIONS` preflight. Fix CORS on the server with an explicit allow-list, or avoid it by calling through a same-origin BFF.",
      body: [
        trap("`Access-Control-Allow-Origin: *` together with credentials. Browsers reject that combination, and reflecting any Origin back is a security hole. CORS isn't authentication either: a server-to-server call ignores it completely."),
      ],
    },
    {
      id: "sb-rest-openapi",
      question: "What is OpenAPI, and what is contract-first design?",
      level: "junior",
      short:
        "OpenAPI (formerly Swagger) is a YAML or JSON description of an API: paths, parameters, schemas, auth, errors. In contract-first design, the front-end and back-end teams agree on that document before coding. The front end can then build against a mock while the back end implements it, clients and types are generated from it, and CI checks that the implementation matches. With several teams sharing APIs, as GWE has, this prevents integration surprises.",
      body: [
        p("With Spring, `springdoc-openapi` generates the spec from your controllers. With TypeScript, `openapi-typescript` turns a spec into types, so the React app and the Java service agree on the shape of a `Client`."),
      ],
    },
  ],
};

export const SB_MICROSERVICES: PrepSection = {
  id: "sb-microservices",
  track: "architecture",
  title: "Microservices and service-oriented architecture",
  blurb:
    "The posting asks for an 'understanding of service-oriented architecture', and GWE's senior posting names microservices and backend-for-frontend layers. At junior level, show you understand the trade-offs and the patterns that keep a distributed system consistent.",
  drill: "system-architecture",
  questions: [
    {
      id: "sb-ms-vs-monolith",
      question: "Monolith vs microservices: what are the trade-offs?",
      level: "junior",
      short:
        "A monolith is one deployable unit: simple to build, test and run, with real transactions inside one database. It gets harder to change and scale as the team grows. Microservices split the system by business capability. Each service has its own data and its own deploys, so teams move independently and scale separately. The cost is network calls, partial failures, data spread across databases, and a lot more operational work.",
      body: [
        table(
          ["", "Monolith", "Microservices"],
          ["Deploy", "All or nothing", "Per service"],
          ["Data consistency", "ACID transactions", "Eventual; sagas and outbox"],
          ["Failure", "Process-level", "Partial; needs timeouts, retries, circuit breakers"],
          ["Team scaling", "Gets harder", "Team per service"],
          ["Ops cost", "Low", "High: CI/CD, observability, platform"],
        ),
        say("Microservices solve an organisation problem more than a technology problem. A small team usually ships faster with a well-structured modular monolith."),
      ],
    },
    {
      id: "sb-ms-sync-async",
      question: "When would services call each other synchronously, and when would they use events?",
      level: "intermediate",
      short:
        "Call synchronously (REST, gRPC) when the caller needs the answer now to continue, as when the UI asks for account details. Publish an event (Kafka, Pub/Sub) when something has happened and other services should react in their own time: `ApplicationSubmitted` starts KYC checks, `AccountOpened` triggers the welcome email, statement setup and the CRM update. Events decouple services and absorb spikes, at the cost of eventual consistency and harder debugging.",
      body: [
        list(
          "A long chain of synchronous calls multiplies latency and failure rates: five services at 99.9% each is about 99.5% end to end.",
          "Use events to fan out to many consumers, and to let a slow consumer (a nightly regulatory report) avoid slowing the user's request.",
          "Commands (`OpenAccount`) have one handler and expect an outcome. Events (`AccountOpened`) are facts that any number of consumers may hear.",
        ),
      ],
    },
    {
      id: "sb-ms-bff-gateway",
      question: "What are an API gateway and a backend-for-frontend (BFF)?",
      level: "intermediate",
      short:
        "An **API gateway** is the single entry point for traffic: it handles TLS, authentication, rate limiting, routing and logging for every API (Apigee and Azure API Management are common). A **BFF** is a thin server built for one front end, often Node or Next.js route handlers. It combines several microservice calls into the shape one screen needs, keeps tokens on the server, and strips fields the UI must not see.",
      body: [
        p("For an onboarding screen, the BFF might call the client-profile, product-eligibility and document services in parallel and return one view model, so the React app makes one request instead of five."),
      ],
    },
    {
      id: "sb-ms-saga",
      question: "Opening an account touches several services. How do you keep them consistent without a distributed transaction?",
      level: "intermediate",
      short:
        "Use a **saga**: a sequence of local transactions, each in one service. Each step publishes an event or replies to a coordinator, and each step has a **compensating action** that undoes it if a later step fails. Orchestration means a central workflow service directs the steps, which is easier to follow and audit. Choreography means each service reacts to the previous service's event, which is looser but harder to see as a whole.",
      body: [
        steps(
          "Create the application, with status SUBMITTED.",
          "Run KYC (identity, sanctions and PEP screening). If it fails, mark the application REJECTED and notify the client.",
          "Create the account in the core system. If that fails, retry; if retries run out, flag it for manual operations.",
          "Fund the account and send the welcome message. If funding fails, the compensation is to close the account and refund the client.",
        ),
        say("For onboarding I'd lean towards orchestration: a bank needs to answer 'where is this application, and why?' for audit."),
      ],
    },
    {
      id: "sb-ms-outbox",
      question: "How do you save to the database and publish an event without losing either?",
      level: "intermediate",
      short:
        "The dual-write problem: if you commit to Postgres and then publish to Kafka, a crash between the two loses the event, and publishing first can announce a change that never committed. The **transactional outbox** fixes this. Write the business row and an `outbox` row in the **same** database transaction. A separate relay (a poller, or CDC with Debezium) publishes the outbox rows and marks them sent. Delivery is at least once, so consumers must be idempotent.",
      body: [
        java(`
@Transactional
public Account open(OpenAccountRequest request) {
    Account account = accounts.save(Account.pending(request));
    outbox.save(OutboxEvent.of(
        "AccountOpened",              // type
        account.getId().toString(),   // key: keeps one account's events in order
        Map.of("accountId", account.getId(), "type", request.type(), "eventVersion", 1)));
    return account; // both rows commit together, or neither does
}
`),
      ],
    },
    {
      id: "sb-ms-resilience",
      question: "A downstream service is slow. How do you stop it taking your service down?",
      level: "intermediate",
      short:
        "Set **timeouts** on every call. **Retry** only idempotent calls, with exponential backoff and jitter. Use a **circuit breaker** to fail fast while a dependency is unhealthy. Use **bulkheads**, separate connection or thread pools per dependency, so one slow call can't use up every thread. Have a **fallback**, such as queueing the work or showing 'we'll email you when this is ready'. Without these, one slow vendor becomes a cascading outage.",
      body: [
        trap("Retrying at every layer. With three layers each retrying three times, one user click becomes 27 calls to the struggling service. Retry in one place, and add a retry budget."),
      ],
    },
    {
      id: "sb-ms-observability",
      question: "How do you debug a request that fails somewhere across five services?",
      level: "intermediate",
      short:
        "You need three signals tied together by one id. **Structured logs** carry a correlation or trace id. **Metrics** cover rate, errors and latency per endpoint. **Distributed traces** (OpenTelemetry) show which hop was slow or failed. Pass the trace id along in headers (W3C `traceparent`) and in message headers for Kafka. Then search your logging tool (Splunk is common in banks) for that id.",
      body: [
        list(
          "Log events, not prose: `{\"event\":\"kyc.timeout\",\"applicationId\":\"…\",\"vendor\":\"…\",\"ms\":2000}`.",
          "Never log a SIN, a full account number, a token or a password. Mask or tokenise them.",
          "Alert on symptoms users feel (error rate, latency SLOs), not on every exception.",
        ),
      ],
    },
    {
      id: "sb-ms-caching",
      question: "How would you implement caching?",
      level: "intermediate",
      short:
        "Start by asking what can be stale, and for how long. Then pick the layer. **HTTP caching** (`Cache-Control`, `ETag`) and a CDN suit public, static content. **Application caching** is usually cache-aside: read from Redis or an in-memory Caffeine cache; on a miss, load from the database and store the result with a TTL. Invalidate on writes, or publish an event when the data changes. Never cache personal data in a shared cache without per-user keys, and remember every cache is a consistency trade-off.",
      body: [
        java(`
@Service
public class ProductCatalog {
    @Cacheable(cacheNames = "accountTypes", key = "#province") // cache-aside via Spring's cache abstraction
    public List<AccountTypeInfo> eligibleTypes(String province) {
        return repository.findEligible(province); // only runs on a miss
    }

    @CacheEvict(cacheNames = "accountTypes", allEntries = true)
    public void refresh() {} // call when the product rules change
}
`),
        list(
          "Good candidates: reference data (account types, countries, rate tables), expensive aggregations, responses from slow vendors.",
          "Bad candidates: balances and application status (users expect them to be current), anything authorisation depends on.",
          "Failure modes: a stampede when a hot key expires (use jittered TTLs or request coalescing), stale reads, and a cache becoming the thing the system can't survive without.",
        ),
      ],
    },
    {
      id: "sb-ms-twelve-factor",
      question: "What makes a service 'cloud-native' or twelve-factor?",
      level: "junior",
      short:
        "One codebase deployed to many environments. Config in the environment, not in code. Stateless processes that can be killed and replaced at any time, with state in backing services (databases, caches, queues). Fast startup and graceful shutdown. Logs written to stdout as a stream. Dev, staging and prod kept as alike as possible. These are what let Cloud Run, App Service and Kubernetes scale and heal a service automatically.",
      body: [],
    },
  ],
};

export const SB_EVENTS: PrepSection = {
  id: "sb-events",
  track: "architecture",
  title: "Kafka and Google Pub/Sub",
  blurb:
    "Event streaming is an 'asset' in the posting, and GWE integrates its onboarding microservices through Kafka and Pub/Sub. Know the vocabulary, the ordering and delivery guarantees, and why consumers must be idempotent.",
  questions: [
    {
      id: "sb-kafka-basics",
      question: "What is Kafka? Explain topics, partitions, offsets and brokers.",
      level: "junior",
      short:
        "Kafka is a distributed, append-only log. Producers write records to a **topic**. A topic is split into **partitions**, and each partition is an ordered log stored on a **broker** and replicated to others. Each record in a partition has a sequential **offset**. Consumers read at their own pace and track their offset. Records stay for a retention period whether or not anyone has read them, so new consumers can replay history.",
      body: [
        table(
          ["Term", "Meaning"],
          ["Topic", "A named stream, e.g. `wealth.onboarding.application-events`"],
          ["Partition", "The unit of ordering and parallelism"],
          ["Key", "Decides the partition: the same key always goes to the same partition"],
          ["Offset", "A record's position in its partition; consumers commit how far they've read"],
          ["Replication factor", "Copies of each partition (commonly 3); `acks=all` waits for the in-sync replicas"],
          ["Consumer group", "Consumers sharing the work; each partition goes to one member"],
        ),
      ],
    },
    {
      id: "sb-kafka-ordering",
      question: "How do ordering and consumer groups work? Which key would you use?",
      level: "intermediate",
      short:
        "Kafka guarantees order **within a partition** only. To keep all events for one application or client in order, use that id as the record key. Within a consumer group, each partition is read by exactly one consumer, so the partition count caps how many consumers can work in parallel. Separate groups each get a full copy of the stream, so the KYC service and the notification service read the same topic independently.",
      body: [
        java(`
@Service
public class ApplicationEvents {
    private final KafkaTemplate<String, ApplicationEvent> kafka;

    public ApplicationEvents(KafkaTemplate<String, ApplicationEvent> kafka) { this.kafka = kafka; }

    public void publish(ApplicationEvent event) {
        // key = applicationId: SUBMITTED, KYC_PASSED, APPROVED for one application stay in order
        kafka.send("wealth.onboarding.application-events", event.applicationId(), event);
    }
}

@Component
public class WelcomeEmailListener {
    @KafkaListener(topics = "wealth.onboarding.application-events", groupId = "notifications")
    public void on(ApplicationEvent event) {
        if (event.type() == EventType.APPROVED) emails.sendWelcomeOnce(event.eventId(), event.clientId());
    }
}
`),
        trap("Adding partitions to a topic that is already in use. Keys get remapped to different partitions, which breaks ordering for keys that were in flight."),
      ],
    },
    {
      id: "sb-kafka-delivery",
      question: "At-most-once, at-least-once, exactly-once: what do you actually get?",
      level: "intermediate",
      short:
        "**At-most-once:** commit the offset before processing, so a crash loses the message. **At-least-once:** process first and commit after, so a crash means the message is reprocessed. This is the usual default. **Exactly-once** inside Kafka uses idempotent producers and transactions with `read_committed` consumers, but it stops at Kafka's edge. Any side effect outside Kafka (a database write, an email) needs an **idempotent consumer**.",
      body: [
        ts(`
interface Tx {
  query(sql: string, params: unknown[]): Promise<{ rowCount: number | null }>;
}
declare const db: { transaction(work: (tx: Tx) => Promise<void>): Promise<void> };

// An idempotent consumer: remember which events were processed, in the same transaction as the effect
async function handle(event: { eventId: string; applicationId: string; type: string }) {
  await db.transaction(async (tx) => {
    const inserted = await tx.query(
      "INSERT INTO processed_events (event_id) VALUES ($1) ON CONFLICT DO NOTHING",
      [event.eventId],
    );
    if (inserted.rowCount === 0) return; // a duplicate delivery: already handled
    await tx.query("UPDATE application SET status = $1 WHERE id = $2", [event.type, event.applicationId]);
  });
}
`),
        say("I assume every message can arrive twice, or out of order across keys, and design consumers so a second delivery does nothing."),
      ],
    },
    {
      id: "sb-kafka-vs-pubsub",
      question: "Kafka vs Google Pub/Sub vs a classic queue?",
      level: "intermediate",
      short:
        "Kafka is a partitioned log you run (or rent, through Confluent): replay, high throughput, ordering per partition, and consumers track their own offsets. Pub/Sub is Google's fully managed service: topics and subscriptions with no partitions to manage. Each message is acked individually with an ack deadline, delivery can be push or pull, and you opt in to ordering keys and dead-letter topics. Classic queues (RabbitMQ, Azure Service Bus) delete a message once it is consumed, and suit task distribution.",
      body: [
        table(
          ["", "Kafka", "Google Pub/Sub", "Queue (RabbitMQ / Service Bus)"],
          ["Model", "Partitioned log", "Topic → subscriptions", "Queue / exchange"],
          ["Ordering", "Per partition (key)", "Per ordering key (opt-in)", "Per queue / session"],
          ["Replay", "Yes, by offset, within retention", "Seek to a timestamp or snapshot", "Generally no"],
          ["Ack", "Commit an offset", "Ack each message before its deadline", "Ack each message"],
          ["Ops", "Brokers, partitions (or Confluent)", "Serverless", "Brokers or managed"],
          ["Push to HTTP", "No (Kafka Connect)", "Yes (e.g. to Cloud Run)", "Varies"],
        ),
        p("A common GCP pattern: Pub/Sub push subscriptions send messages over HTTP to a Cloud Run service, or trigger a Cloud Function through Eventarc. Return 2xx to ack; a non-2xx or a timeout means the message is redelivered."),
      ],
    },
    {
      id: "sb-kafka-dlq",
      question: "A message keeps failing. What do you do with it?",
      level: "intermediate",
      short:
        "Separate transient failures from permanent ones. Retry transient errors (a timeout, a 503) a few times with backoff, using retry topics, so the partition isn't blocked. Send permanent failures (bad schema, a business rule violation) and messages that have used up their retries to a **dead-letter topic**, with the error and the original metadata. Alert on dead-letter volume, and have a tool to inspect and replay messages after the fix.",
      body: [
        trap("Retrying a poison message forever in the consumer loop. That partition stops making progress, consumer lag grows, and every application after it is stuck."),
      ],
    },
    {
      id: "sb-kafka-schema",
      question: "How do you change an event's shape without breaking consumers?",
      level: "intermediate",
      short:
        "Treat events as a public contract. Use a schema (Avro, Protobuf or JSON Schema) in a schema registry with a compatibility rule, usually BACKWARD, so new consumers can still read old events. Only add optional fields with defaults. Never rename or remove fields, or change their types, in place. Put an `eventVersion` in the event. A truly breaking change gets a new event type or topic, and both are published during the migration.",
      body: [
        json(`
{
  "eventId": "2f1c9a7e-0b3d-4d7e-9a51-6c2b8e4f1a20",
  "eventType": "AccountOpened",
  "eventVersion": 2,
  "occurredAt": "2026-11-26T15:04:05Z",
  "correlationId": "b7d1c2e0-5a",
  "data": {
    "accountId": "a-9",
    "clientId": "c-123",
    "accountType": "TFSA",
    "currency": "CAD",
    "advisorId": "adv-77"
  }
}
`),
        list(
          "Carry ids, not full personal records. Consumers that need the SIN or address fetch them from the owning service, with authorisation. That keeps sensitive data out of topics that are retained for days.",
          "`eventId` makes deduplication possible, `occurredAt` keeps a timeline for audit, and `correlationId` links the event to the user's request.",
        ),
      ],
    },
    {
      id: "sb-kafka-lag",
      question: "What is consumer lag, and how do you deal with it?",
      level: "intermediate",
      short:
        "Lag is the gap between the newest offset in a partition and the offset the consumer group has committed: how far behind the consumers are. It grows when processing is slower than production, during a spike, after a slow dependency, or with a stuck poison message. Fix it by speeding up processing (batching, fewer synchronous calls), adding consumers (up to the partition count), adding partitions, or fixing the stuck message. Monitor lag per partition and alert on it.",
      body: [],
    },
  ],
};

export const SB_DESIGN: PrepSection = {
  id: "sb-design",
  track: "architecture",
  title: "Design questions for a junior full-stack role",
  blurb:
    "Juniors rarely get a full system-design round, but a senior engineer may ask you to sketch something close to the team's work. Talk through requirements first, then the data, the API, the happy path, failures, and security. These four are close to wealth onboarding.",
  drill: "system-architecture",
  questions: [
    {
      id: "sb-design-onboarding",
      question: "Design a digital account-opening flow for a wealth client.",
      level: "intermediate",
      short:
        "A resumable, multi-step React/Next.js front end over an onboarding BFF. Behind it, an application service owns the state machine (`DRAFT → SUBMITTED → KYC_PENDING → APPROVED/REJECTED → ACCOUNT_OPEN`). KYC, document, account and notification services talk to it through events. Every transition is validated on the server, written to an audit log, and published through an outbox. Personal data is encrypted, and access is checked for both the client and the advisor.",
      body: [
        steps(
          "**Clarify:** self-directed client or advisor-assisted? Which account types (TFSA, RRSP, FHSA, RESP, non-registered, joint)? Individual or joint? Volume? Does an advisor have to review it?",
          "**Front end:** a step-per-route wizard, drafts saved through `PUT /applications/{id}/draft`, an idempotent submit, EN/FR, WCAG 2.1 AA.",
          "**Application service (Spring Boot + Postgres):** the state machine, field validation, a version column for optimistic locking, an audit table.",
          "**Identity and KYC:** an identity-verification vendor, sanctions and PEP screening, suitability questions (investment knowledge, risk tolerance, time horizon). Asynchronous, through events, with manual review as a fallback.",
          "**Documents:** upload ID straight to object storage with a short-lived signed URL, then a virus scan and encryption at rest.",
          "**Account creation:** a saga step calls the core or brokerage system, retried and idempotent. Then `AccountOpened` goes out to CRM, statements and the welcome email.",
          "**Cross-cutting:** OAuth2 sign-in for clients and advisors, secrets in Key Vault, tracing, dashboards for drop-off per step.",
        ),
        say("I'd start by asking whether this is advisor-assisted or self-serve, because that changes who is authorised to do what, and what the audit has to show."),
      ],
    },
    {
      id: "sb-design-transfer",
      question: "Design an API that moves money between two accounts and never double-charges.",
      level: "intermediate",
      short:
        "`POST /transfers` with an `Idempotency-Key`. In one database transaction: lock both account rows in a fixed order (sorted by id, to avoid deadlocks), check the balance, write a **double-entry** ledger (one debit, one credit, which sum to zero), store the idempotency key and the response, and write an outbox event. Amounts are `BigDecimal` or integer minor units, with a currency. Return 201, or the stored response if the request is replayed.",
      body: [
        java(`
@Transactional
public TransferResult transfer(TransferCommand cmd) {
    Optional<TransferResult> replay = idempotency.find(cmd.idempotencyKey(), cmd.hash());
    if (replay.isPresent()) return replay.get();

    List<UUID> ids = Stream.of(cmd.from(), cmd.to()).sorted().toList(); // a fixed lock order prevents deadlock
    Map<UUID, AccountEntity> locked = accounts.lockAllById(ids);       // SELECT ... FOR UPDATE

    AccountEntity source = locked.get(cmd.from());
    if (source.getBalance().compareTo(cmd.amount()) < 0) throw new InsufficientFundsException(cmd.from().toString(), cmd.amount());

    ledger.post(cmd.transferId(), cmd.from(), cmd.amount().negate()); // debit
    ledger.post(cmd.transferId(), cmd.to(), cmd.amount());            // credit: the two entries sum to zero
    TransferResult result = TransferResult.completed(cmd.transferId());
    idempotency.save(cmd.idempotencyKey(), cmd.hash(), result);
    outbox.save(OutboxEvent.of("TransferCompleted", cmd.transferId().toString(), result));
    return result;
}
`),
      ],
    },
    {
      id: "sb-design-audit",
      question: "Compliance asks for a full audit trail of every change to a client's profile. How would you build it?",
      level: "intermediate",
      short:
        "An append-only audit store, kept separate from application logs. Record who (user, role, on behalf of whom), what (entity, field, before and after values, with sensitive fields masked), when (a UTC timestamp), where (channel, IP, correlation id) and why (the reason code). Write it in the same transaction as the change, or through the outbox, so it can't be skipped. Lock it down: nobody can edit or delete records, there is a retention policy, and reads of the audit trail are audited too.",
      body: [
        list(
          "Application logs are for debugging and get rotated. The audit trail is a business record that regulators may ask for years later.",
          "Event sourcing, storing every change as an event, gives you the history for free. A simpler `profile_history` table written by the service is usually enough.",
          "Mask in the audit record (`***-***-286`), and keep any full value only in a tightly controlled vault.",
        ),
      ],
    },
    {
      id: "sb-design-documents",
      question: "Clients upload a photo of their ID during onboarding. How do you handle it securely?",
      level: "intermediate",
      short:
        "Don't stream files through your API. The backend issues a short-lived, single-object **signed upload URL** (GCS signed URL or Azure SAS) after checking the user may upload to that application. The browser uploads directly to a private bucket. An event triggers a function that checks type and size, scans for malware, and hands the file to identity verification. Files are encrypted at rest, never public, kept only as long as required, and linked to the application by id.",
      body: [
        list(
          "Validate on the server: allow-list the MIME type, check the magic bytes, cap the size, and strip metadata (EXIF location) where it isn't needed.",
          "Serve files back only through authorised, short-lived download URLs.",
        ),
      ],
    },
  ],
};
