import { bash, concept, http, java, pair, qa, sql, table, trap, ts } from "./authoring";
import type { StudyTopic } from "./types";

export const APIS: StudyTopic = {
  id: "apis",
  short: "REST & microservices",
  title: "Microservices and REST APIs",
  jd: "Microservices & REST APIs: service-oriented architecture",
  weight: "core",
  summary:
    "GWE builds onboarding as many small services behind APIs. Expect to design endpoints on the spot (for clients, accounts or transfers), pick the right methods and status codes, explain idempotency, and talk about what goes wrong between services: timeouts, retries, partial failures, and tracing a request across them.",
  concepts: [
    concept("REST", "An architectural style for HTTP APIs: **resources** named by URLs (`/clients/42/accounts`), manipulated with standard methods, in representations such as JSON. Its constraints: client-server, stateless, cacheable, a uniform interface, and a layered system."),
    concept("Statelessness", "Each request carries everything needed to handle it: the token, the IDs, the data. The server keeps no session in memory between requests, so any instance can serve any request, and scaling out is just adding instances."),
    concept("Safe and idempotent methods", "**Safe** methods don't change state: `GET`, `HEAD`, `OPTIONS`. **Idempotent** methods have the same effect whether sent once or many times: the safe ones plus `PUT` and `DELETE`. `POST` is neither, so retrying it needs an idempotency key."),
    concept("`PUT` vs `PATCH`", "`PUT` replaces the whole resource with the body you send: idempotent. `PATCH` applies a partial change: only the fields sent. A JSON Merge Patch that sets fields is idempotent; an operation like 'add 10' is not."),
    concept("Idempotency keys", "The client sends a unique `Idempotency-Key` header with a `POST`. The server stores the key with the outcome, atomically; a retry with the same key gets the stored response instead of creating a second transfer. Essential for payments, where timeouts make retries inevitable."),
    concept("Status codes", "`2xx` success (`200`, `201` with a `Location` header, `202` accepted for async work, `204` no body); `3xx` redirects and `304` not modified; `4xx` the client's fault (`400`, `401`, `403`, `404`, `409`, `422`, `429`); `5xx` the server's fault (`500`, `502`, `503`, `504`)."),
    concept("Pagination", "**Offset** (`?page=3&size=50`) is simple but slow deep into a table, and skips or repeats rows when data changes. **Cursor** or keyset pagination (`?after=<last id>`) is fast at any depth and stable under inserts: the right choice for transaction histories."),
    concept("Versioning", "Breaking changes go in a new version, in the path (`/v2/clients`), a header, or a media type, and the old one is supported until clients move. Additive changes (a new optional field) need no new version, provided clients ignore fields they don't know."),
    concept("API contracts and OpenAPI", "An OpenAPI document describes endpoints, parameters, schemas and errors in YAML or JSON. Teams review it before building (design-first), generate clients and docs from it, and test that the implementation matches."),
    concept("Caching headers", "`Cache-Control` says who may cache a response and for how long; `ETag` plus `If-None-Match` lets a client revalidate and get `304 Not Modified`. Private financial data is usually `Cache-Control: no-store`."),
    concept("Monolith, SOA and microservices", "A **monolith** deploys as one unit. **SOA** splits an enterprise into reusable services, often joined by a central enterprise service bus (ESB). **Microservices** are smaller, independently deployable services, each owning its data and talking over lightweight protocols: smart endpoints, dumb pipes."),
    concept("Bounded context and database per service", "Each service owns one area of the business (onboarding, KYC, accounts) and its own data. Other services use its API or its events, never its tables. That's what makes independent deployment possible, at the price of no cross-service joins or transactions."),
    concept("API gateway and BFF", "An **API gateway** is the single entry point: routing, TLS, authentication, rate limiting, request logging. A **backend-for-frontend** is a gateway shaped for one client, such as the web app, aggregating several service calls into what one screen needs."),
    concept("Timeouts, retries and circuit breakers", "Every remote call needs a **timeout**. **Retries** handle transient failures, with exponential backoff and jitter so clients don't retry in lockstep, and only for idempotent operations. A **circuit breaker** stops calling a failing service for a while, failing fast instead of piling up threads."),
    concept("Sagas", "A business transaction across services as a sequence of local transactions, each with a **compensating action** that undoes it if a later step fails (cancel the account if the KYC check is rejected). Orchestrated by a coordinator, or choreographed through events."),
    concept("Transactional outbox", "Write the business change and the event to publish into the same database transaction (an `outbox` table); a separate relay publishes the outbox rows to Kafka or Pub/Sub. No more 'saved but never published' or 'published but rolled back'."),
    concept("Observability", "**Logs** (what happened, structured JSON), **metrics** (how much, how often, how slow) and **traces** (one request's path through every service, joined by a trace or correlation ID passed in headers, standardised by OpenTelemetry). GWE's stack names Splunk and Dynatrace."),
  ],
  parts: [
    {
      id: "apis-http",
      title: "HTTP semantics",
      blocks: [
        table(
          ["Method", "Does", "Safe", "Idempotent", "Typical success"],
          ["`GET`", "Reads a resource or collection", "Yes", "Yes", "`200 OK`"],
          ["`POST`", "Creates a resource or runs an action", "No", "No: use an idempotency key", "`201 Created` + `Location`, or `202 Accepted`"],
          ["`PUT`", "Replaces a resource entirely", "No", "Yes", "`200 OK` or `204 No Content`"],
          ["`PATCH`", "Changes part of a resource", "No", "Depends on the patch", "`200 OK`"],
          ["`DELETE`", "Removes a resource", "No", "Yes", "`204 No Content`"],
        ),
        table(
          ["Code", "Meaning", "Use it when"],
          ["`200` / `201` / `202` / `204`", "OK / Created / Accepted / No Content", "Read or update / new resource / queued for async work / success with no body"],
          ["`304`", "Not Modified", "The client's cached copy (its `ETag`) is still current"],
          ["`400`", "Bad Request", "Malformed JSON, missing or invalid fields"],
          ["`401`", "Unauthorized (really: unauthenticated)", "No token, or an expired or invalid one"],
          ["`403`", "Forbidden", "Valid identity, but not allowed to do this"],
          ["`404`", "Not Found", "No such resource, or hiding one the caller mustn't know exists"],
          ["`409`", "Conflict", "Duplicate client, version conflict, wrong state for the action"],
          ["`422`", "Unprocessable Content", "Well-formed but breaks a business rule: insufficient funds"],
          ["`429`", "Too Many Requests", "Rate limited; send `Retry-After`"],
          ["`500` / `502` / `503` / `504`", "Server error / bad gateway / unavailable / gateway timeout", "A bug / an upstream returned garbage / overloaded or down / an upstream was too slow"],
        ),
        http(`
POST /api/v1/transfers HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjIwMjYtMTEifQ...
Content-Type: application/json
Idempotency-Key: 3f1c2a9e-7b4d-4c1e-9a55-0d2b6f8e1c77

{"fromAccountId": "acc-1", "toAccountId": "acc-2", "amountCents": 2500, "currency": "CAD"}

HTTP/1.1 201 Created
Location: /api/v1/transfers/tr-9081
Content-Type: application/json

{"id": "tr-9081", "status": "PENDING"}
`, { caption: "A create with an idempotency key: a retry with the same key returns this same response" }),
        http(`
HTTP/1.1 422 Unprocessable Content
Content-Type: application/problem+json

{
  "type": "https://api.example.com/problems/insufficient-funds",
  "title": "Insufficient funds",
  "status": 422,
  "detail": "Account acc-1 has 18.00 CAD available.",
  "instance": "/api/v1/transfers"
}
`, { caption: "A standard error body (RFC 9457 Problem Details)" }),
      ],
    },
    {
      id: "apis-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Monolith", "SOA", "Microservices"],
          ["Deployed as", "One unit", "Several large services", "Many small services, each on its own"],
          ["Data", "One shared database", "Often shared databases", "A database per service"],
          ["Communication", "In-process calls", "An enterprise service bus, SOAP/XML", "REST or gRPC, plus events"],
          ["Teams", "One codebase for everyone", "Teams per service, central integration team", "A team owns a service end to end"],
          ["Strengths", "Simple to build, test and deploy at first", "Enterprise-wide reuse, integration of legacy systems", "Independent deploys and scaling, isolated failures"],
          ["Costs", "Slow deploys and tangled code as it grows", "The bus becomes a bottleneck and single point of failure", "Network failures, distributed data, operational overhead"],
        ),
        table(
          ["", "REST", "GraphQL", "gRPC"],
          ["Shape", "Resources and HTTP methods", "One endpoint, the client writes the query", "Remote procedure calls from a `.proto` contract"],
          ["Format", "JSON", "JSON", "Protocol Buffers over HTTP/2"],
          ["Strengths", "Simple, cacheable, universal", "No over- or under-fetching, typed schema", "Fast, typed, streaming, generated clients"],
          ["Weak spots", "Several round trips for one screen", "Caching, query cost control", "Browsers need a proxy; harder to inspect"],
          ["Typical use", "Public and service APIs", "Front ends aggregating many sources", "Internal service-to-service calls"],
        ),
        table(
          ["Pattern", "Problem it solves"],
          ["API gateway", "One entry point for routing, auth, TLS and rate limits"],
          ["Backend-for-frontend", "A client needs data from five services in one response"],
          ["Service discovery", "Instances come and go; callers find them by name (DNS, Kubernetes Services)"],
          ["Timeout + retry with backoff and jitter", "Transient failures, without overloading the struggling service"],
          ["Circuit breaker", "A dead dependency making every caller wait and pile up"],
          ["Bulkhead", "One slow dependency using up every thread or connection"],
          ["Saga", "A business transaction spanning several services' databases"],
          ["Transactional outbox", "Saving data and publishing its event atomically"],
          ["Idempotent consumer", "At-least-once delivery producing duplicates"],
          ["Strangler fig", "Replacing a legacy system piece by piece behind the same API"],
          ["Correlation ID / tracing", "Following one request through ten services' logs"],
        ),
      ],
    },
    {
      id: "apis-before-after",
      title: "Before and after",
      pairs: [
        pair("RPC-style URLs to resource-oriented URLs", "REST (Roy Fielding's dissertation, 2000)", "Nouns in the path, the action in the method. A `GET` that deletes is dangerous: crawlers, prefetchers and caches assume `GET` is safe.", {
          before: http(`
POST /getClientAccounts
POST /createTransfer
GET  /deleteAccount?id=42
`),
          after: http(`
GET    /clients/42/accounts
POST   /transfers
DELETE /accounts/42
`),
        }),
        pair("Offset pagination to keyset (cursor) pagination", "Any SQL database", "`OFFSET 10000` reads and throws away ten thousand rows, and a new transaction shifts every page. The keyset query uses the index directly and never skips or repeats a row.", {
          before: sql(`
SELECT id, amount_cents, created_at
FROM transactions
WHERE account_id = $1
ORDER BY created_at DESC
LIMIT 50 OFFSET 10000;
`),
          after: sql(`
-- the client sends back the last row's (created_at, id) as the cursor
SELECT id, amount_cents, created_at
FROM transactions
WHERE account_id = $1
  AND (created_at, id) < ($2, $3)
ORDER BY created_at DESC, id DESC
LIMIT 50;
`),
        }),
        pair("Retrying at once, forever, to bounded retries with backoff and jitter", "Resilience patterns", "Immediate retries from every client multiply load on a service that's already struggling. A timeout bounds each attempt, only failures that can succeed later are retried, and random jitter spreads the retries out.", {
          before: ts(`
async function getRates(): Promise<Response> {
  for (;;) {
    try {
      return await fetch("https://rates.internal/v1/rates");
    } catch {
      // try again straight away
    }
  }
}
`),
          after: ts(`
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getRates(attempts = 3): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch("https://rates.internal/v1/rates", { signal: AbortSignal.timeout(2000) });
      if (response.status < 500 || attempt >= attempts) return response;
    } catch (error) {
      if (attempt >= attempts) throw error;
    }
    const backoff = 100 * 2 ** attempt;
    await sleep(backoff / 2 + Math.random() * (backoff / 2));
  }
}
`),
        }),
      ],
    },
  ],
  questions: [
    qa("What makes an API RESTful?", "Resources identified by URLs, manipulated through the standard HTTP methods with their meanings, stateless requests, cacheable responses, and consistent representations and status codes. In practice: nouns in paths, methods for actions, correct status codes, and no server-side session."),
    qa("`PUT` vs `PATCH` vs `POST`?", "`POST` creates a resource or triggers an action, and isn't idempotent. `PUT` replaces a resource at a known URL, and is idempotent. `PATCH` changes part of it. Creating a transfer is `POST`; replacing a client's address is `PUT`; changing only the phone number is `PATCH`."),
    qa("What does idempotent mean, and how do you make a `POST` safe to retry?", "Sending a request several times has the same effect as sending it once. For `POST`, the client generates an `Idempotency-Key`; the server stores it atomically with the result and returns the stored result for a repeated key, so a timeout-and-retry never creates a second payment."),
    qa("`401` vs `403`?", "`401` means the server doesn't know who you are: missing, expired or invalid credentials, so authenticate and try again. `403` means it knows exactly who you are, and you're not allowed. Some APIs return `404` instead of `403` to avoid revealing that a resource exists."),
    qa("How would you design the endpoints for clients and accounts?", "`POST /clients`, `GET /clients/{id}`, `PATCH /clients/{id}`; `GET /clients/{id}/accounts`, `POST /accounts`, `GET /accounts/{id}`; `GET /accounts/{id}/transactions?after=<cursor>`; `POST /transfers` with an idempotency key. Plus validation, problem-details errors, versioning and auth on every route."),
    qa("How do you version an API?", "Avoid breaking changes; add optional fields instead. When a break is unavoidable, publish a new version in the path (`/v2`) or a header, run both, measure who still calls v1, and retire it with notice. Document both in OpenAPI."),
    qa("Offset vs cursor pagination?", "Offset (`page`, `size`) is easy and allows jumping to page N, but gets slow at depth and drifts when rows are inserted. A cursor (the last item's sort key) is fast at any depth and stable, but only goes forward or back. Use cursors for feeds and transaction histories."),
    qa("Microservices vs monolith: when would you choose each?", "Start with a well-structured monolith when the team and product are small: it's simpler to build, test and change. Split into services when parts need to deploy or scale independently, or different teams own them. Microservices trade code complexity for network and operational complexity."),
    qa("SOA vs microservices?", "Both build systems out of services. SOA aims at enterprise-wide reuse, often through a central ESB that routes and transforms messages, with shared data. Microservices are smaller, own their data, deploy independently, and keep the logic in the services rather than in the pipe."),
    qa("How do microservices communicate?", "Synchronously with REST or gRPC when the caller needs an answer now, with timeouts, retries and circuit breakers. Asynchronously with events through Kafka or Pub/Sub when it only needs to announce something, which decouples availability: the consumer can be down and catch up later."),
    qa("What is a circuit breaker?", "A wrapper around remote calls that counts failures. Past a threshold it opens and fails immediately, or returns a fallback, without calling the sick service; after a cool-down it lets a few test calls through (half-open) and closes again if they succeed. Resilience4j provides one for Java."),
    qa("How do you handle a transaction across services?", "Not with a distributed lock or two-phase commit. Use a saga: each service commits its local step and publishes an event; if a later step fails, earlier steps run compensating actions. Combine it with the outbox pattern and idempotent consumers so no step is lost or doubled."),
    qa("How do you debug a request failing somewhere across services?", "Find its correlation or trace ID in the gateway or error response, then follow it: the distributed trace (Dynatrace, OpenTelemetry) shows which hop failed and how long each took; the logs for that ID in Splunk show the error. Then reproduce it with the same input against that service."),
    qa("What is an API gateway, and what is a BFF?", "A gateway is the shared front door: routing, TLS termination, authentication, rate limiting and logging for every API. A backend-for-frontend is a service built for one client, aggregating and reshaping several services' data for its screens. GWE's postings mention a BFF."),
    qa("How do you make retries safe?", "Retry only transient failures (timeouts, `503`, `429` with `Retry-After`), cap the attempts, back off exponentially with jitter, set a timeout per attempt and an overall deadline, and make the operation idempotent so a duplicate does no harm."),
    qa("What should an API error response contain?", "The right status code, a stable machine-readable type or code, a human-readable message, field-level details for validation errors, and a correlation ID. Never a stack trace, SQL or internal hostnames. RFC 9457 Problem Details is the standard format."),
  ],
  news: [
    { text: "RFC 9457 (2023) replaced RFC 7807 as the standard for JSON error bodies (`application/problem+json`), and Spring's `ProblemDetail` implements it.", url: "https://www.rfc-editor.org/rfc/rfc9457" },
  ],
  docs: [
    { label: "RFC 9110: HTTP Semantics", url: "https://www.rfc-editor.org/rfc/rfc9110" },
    { label: "OpenAPI Specification", url: "https://spec.openapis.org/oas/latest.html" },
    { label: "Microservices, by Martin Fowler and James Lewis", url: "https://martinfowler.com/articles/microservices.html" },
    { label: "microservices.io pattern catalogue", url: "https://microservices.io/patterns/" },
  ],
  bank: ["sb-rest", "sb-microservices", "sb-design"],
};

export const EVENTS: StudyTopic = {
  id: "events",
  short: "Kafka & Pub/Sub",
  title: "Event streaming: Kafka and Google Pub/Sub",
  jd: "Event Streaming: Kafka or Google Pub/Sub (asset)",
  weight: "asset",
  summary:
    "Onboarding is naturally event-driven: an application submitted, an identity verified, an account opened. Each event lets several services react without calling each other. The posting lists this as an asset, so solid vocabulary goes a long way: topics, partitions, consumer groups, offsets, acknowledgements, delivery guarantees, and why consumers must be idempotent.",
  concepts: [
    concept("Event-driven architecture", "Services announce facts ('AccountOpened') to a broker instead of calling each other. Producers don't know or wait for consumers, so a slow or down consumer doesn't break the producer, and new consumers can be added without changing it."),
    concept("Queue vs publish-subscribe vs log", "A **queue** gives each message to one consumer, then deletes it. **Pub/sub** gives a copy to every subscriber. A **log** (Kafka) keeps messages in order for a retention period, and each consumer tracks its own position, so it can replay."),
    concept("Kafka topics, partitions and offsets", "A topic is split into **partitions**, each an append-only, ordered log stored on brokers. Every record has an **offset**, its position in the partition. Partitions are the unit of parallelism and ordering."),
    concept("Keys and ordering", "A producer sends a record with a key, such as an account ID; records with the same key always go to the same partition, so they're consumed in order. Kafka guarantees order **only within a partition**, never across a whole topic."),
    concept("Brokers, replication and ISR", "Each partition has a leader and follower replicas on other brokers. The **in-sync replicas** (ISR) are the followers that are caught up. With `acks=all` and `min.insync.replicas=2`, a write is confirmed only when it's safe on several machines."),
    concept("Consumer groups", "Consumers sharing a `group.id` split a topic's partitions between them: each partition is read by exactly one consumer in the group. More consumers than partitions leaves some idle. Different groups each get every message."),
    concept("Offsets and commits", "A consumer commits the offset it has processed up to. On restart or rebalance, the group resumes from the last commit. Commit **after** processing for at-least-once delivery; committing before risks losing messages."),
    concept("Rebalancing", "When consumers join, leave or crash, partitions are reassigned within the group. Kafka 4.0's new consumer protocol (KIP-848) makes rebalances incremental, so the rest of the group keeps consuming."),
    concept("Retention and compaction", "Kafka keeps records for a time or size limit whether or not they've been read. A **compacted** topic keeps at least the latest record per key, useful as a changelog of current state."),
    concept("KRaft", "Kafka's built-in consensus protocol for cluster metadata. Since Kafka 4.0 (March 2025) it's the only mode: ZooKeeper is gone, so there's one system to run instead of two."),
    concept("Pub/Sub topics and subscriptions", "A publisher sends messages to a **topic**; each **subscription** attached to it receives every message, and the subscribers of one subscription share its messages. Fully managed: no partitions or brokers to size."),
    concept("Pull, push and acknowledgement", "**Pull**: subscribers request messages (streaming pull for throughput). **Push**: Pub/Sub POSTs each message to an HTTPS endpoint, such as a Cloud Run service. Unacknowledged messages are redelivered after the **ack deadline**."),
    concept("Ordering keys and exactly-once in Pub/Sub", "Ordering is opt-in per subscription: messages with the same ordering key arrive in publish order. Exactly-once delivery is available for pull subscriptions in the same region; push subscriptions are at-least-once."),
    concept("Dead-letter topics", "After a set number of failed delivery attempts, a message is moved to a dead-letter topic instead of being retried forever. That's how a poison message (malformed, or triggering a bug) stops blocking the stream. Alert on the DLQ and replay after fixing."),
    concept("Delivery guarantees", "**At-most-once**: may lose messages, never duplicates. **At-least-once**: never loses, may duplicate: the practical default. **Exactly-once**: Kafka transactions within Kafka, Pub/Sub exactly-once delivery; end to end it still relies on idempotent consumers."),
    concept("Idempotent consumers", "Because redelivery happens, handling a message twice must have the same effect as once: record processed event IDs in the same transaction as the change, use upserts, or check state before acting."),
    concept("Schemas", "Producers and consumers agree on the event format through a schema (Avro, Protobuf or JSON Schema), usually held in a schema registry that rejects incompatible changes. Evolve by adding optional fields; never rename or remove fields in place."),
  ],
  parts: [
    {
      id: "events-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Apache Kafka", "Google Cloud Pub/Sub"],
          ["Model", "A distributed, partitioned, replicated log", "Managed messaging: topics and subscriptions"],
          ["Running it", "Brokers to size and operate, or a managed service", "Serverless: nothing to provision"],
          ["Ordering", "Per partition, by key", "Opt-in, per ordering key"],
          ["Scaling consumers", "Up to one consumer per partition in a group", "Automatic"],
          ["Retention and replay", "Configurable; consumers rewind to any offset", "Unacked messages kept 7 days by default, up to 31; seek to a time or snapshot"],
          ["Delivery", "Consumers pull; at-least-once, exactly-once with transactions", "Pull or push; at-least-once, exactly-once for regional pull"],
          ["Dead letters", "Handled by the client (for example Spring Kafka's dead-letter topic)", "Built in: a dead-letter topic and maximum attempts"],
          ["Best at", "High-throughput event streams, replay, stream processing", "Event-driven glue between Google Cloud services"],
        ),
        table(
          ["Guarantee", "How", "Risk", "Use it for"],
          ["At-most-once", "Commit or ack before processing", "Lost messages", "Metrics where a gap doesn't matter"],
          ["At-least-once", "Process, then commit or ack", "Duplicates", "The default: pair it with idempotent consumers"],
          ["Exactly-once", "Kafka transactions; Pub/Sub exactly-once delivery", "Cost, and only within the broker's scope", "Read-process-write inside Kafka"],
        ),
      ],
    },
    {
      id: "events-patterns",
      title: "Patterns in code",
      blocks: [
        ts(`
interface PaymentEvent {
  eventId: string;
  accountId: string;
  amountCents: number;
}
interface Tx {
  query(sql: string, params: unknown[]): Promise<{ rowCount: number | null }>;
}
declare const db: { transaction(work: (tx: Tx) => Promise<void>): Promise<void> };

async function handle(event: PaymentEvent): Promise<void> {
  await db.transaction(async (tx) => {
    const first = await tx.query("INSERT INTO processed_events (event_id) VALUES ($1) ON CONFLICT DO NOTHING", [event.eventId]);
    if (first.rowCount === 0) return; // a redelivery: already applied
    await tx.query("UPDATE accounts SET balance_cents = balance_cents + $1 WHERE id = $2", [event.amountCents, event.accountId]);
  });
  // only after this returns: ack the message, or commit the offset
}
`, { caption: "An idempotent consumer: the dedup record and the change commit together" }),
        sql(`
BEGIN;
UPDATE accounts SET status = 'OPEN' WHERE id = 'acc-42';
INSERT INTO outbox (id, topic, message_key, payload)
VALUES (gen_random_uuid(), 'account-events', 'acc-42', '{"type": "AccountOpened", "accountId": "acc-42"}');
COMMIT;
-- a relay, or Debezium reading the database log, publishes outbox rows and marks them sent
`, { caption: "The transactional outbox: the change and its event commit or roll back together" }),
        java(`
@KafkaListener(topics = "account-events", groupId = "kyc-service")
void onAccountEvent(AccountEvent event, Acknowledgment ack) {
    kycService.startChecks(event.accountId()); // idempotent
    ack.acknowledge(); // commit the offset only after the work succeeded
}
`, { caption: "A Spring Kafka consumer with manual acknowledgement" }),
        bash(`
gcloud pubsub topics create account-events
gcloud pubsub topics create account-events-dead-letter
gcloud pubsub subscriptions create kyc-worker \\
  --topic=account-events \\
  --ack-deadline=60 \\
  --enable-message-ordering \\
  --dead-letter-topic=account-events-dead-letter \\
  --max-delivery-attempts=5
`, { caption: "A Pub/Sub subscription with ordering and a dead-letter topic" }),
        trap("Ordering and parallelism pull against each other: more partitions mean more parallel consumers, but order holds only per key. Key by the entity whose events must stay ordered, such as the account ID."),
      ],
    },
    {
      id: "events-before-after",
      title: "Before and after",
      pairs: [
        pair("A chain of synchronous calls to one published event", "Event-driven architecture", "Opening an account no longer fails because the CRM is down, and adding a fourth reaction means adding a subscriber, not editing this code. The outbox makes the publish as reliable as the database write.", {
          before: ts(`
declare const services: Record<"kyc" | "email" | "crm", { notify(accountId: string): Promise<void> }>;

async function openAccount(accountId: string): Promise<void> {
  await services.kyc.notify(accountId);
  await services.email.notify(accountId);
  await services.crm.notify(accountId); // if this is down, opening fails
}
`),
          after: ts(`
declare const outbox: { add(topic: string, key: string, event: object): Promise<void> };

async function openAccount(accountId: string): Promise<void> {
  await outbox.add("account-events", accountId, {
    type: "AccountOpened",
    accountId,
    occurredAt: new Date().toISOString(),
  });
}
`),
        }),
      ],
    },
  ],
  questions: [
    qa("What is Kafka?", "A distributed event streaming platform: an append-only, partitioned, replicated log. Producers write events to topics, consumers read them at their own pace and can replay, and records stay for a configured retention whether read or not. Used for event-driven services, pipelines and stream processing."),
    qa("Topic vs partition?", "A topic is a named stream of events, such as `account-events`. It's split into partitions, separate ordered logs spread across brokers. Partitions give parallelism (one consumer per partition per group) and are the unit of ordering."),
    qa("How does Kafka guarantee ordering?", "Only within a partition. Records with the same key go to the same partition, so all events for one account are consumed in order. To keep that, use one key per entity, an idempotent producer, and don't process one partition's records in parallel."),
    qa("What is a consumer group?", "A set of consumers sharing a group ID that divide the topic's partitions between them, so each record is processed once by the group. Separate groups, such as KYC and notifications, each receive every record independently."),
    qa("What happens when a consumer crashes?", "It stops sending heartbeats, the group rebalances, and its partitions go to the remaining consumers, which resume from the last committed offsets. Anything processed but not committed is delivered again, which is why consumers must be idempotent."),
    qa("At-least-once vs exactly-once?", "At-least-once never loses a message but can deliver it twice: process first, then commit. Exactly-once in Kafka uses idempotent producers and transactions for read-process-write within Kafka; Pub/Sub offers it for regional pull subscriptions. Any external side effect still needs idempotency."),
    qa("How do you handle duplicate messages?", "Make the consumer idempotent: store each processed event ID in the same database transaction as the change (a unique constraint rejects the second one), use upserts and absolute values ('set status to OPEN') rather than increments, or check the current state before acting."),
    qa("Kafka vs Pub/Sub?", "Kafka is a log you size and operate (or buy managed): very high throughput, per-partition ordering, long retention and replay. Pub/Sub is serverless on Google Cloud: no partitions to manage, push or pull delivery, built-in dead-letter topics, and opt-in ordering keys. Both are at-least-once by default."),
    qa("Push vs pull subscriptions in Pub/Sub?", "Pull: your subscriber asks for messages and acknowledges them, giving flow control, high throughput and exactly-once support. Push: Pub/Sub POSTs each message to your HTTPS endpoint, such as a Cloud Run service, and treats a `2xx` as the ack: no polling code, and it scales with the endpoint."),
    qa("What is a dead-letter queue, and when is a message sent there?", "A separate topic for messages that failed processing too many times, such as malformed data or a bug, so they don't block or loop forever. Alert on it, inspect the messages, fix the cause, and replay them."),
    qa("When would you use events instead of a REST call?", "When the caller just needs to announce that something happened and doesn't need an answer now: the account opened, so KYC, email and CRM react. Use REST when the caller needs a response to continue, such as validating an address during the form."),
    qa("How do you publish an event reliably after a database write?", "With the transactional outbox: write the event to an `outbox` table in the same transaction as the business change, and have a relay publish it. Writing to the database and then calling Kafka directly can lose the event, or publish one for a rolled-back change."),
    qa("What is a poison message?", "A message that makes the consumer fail every time it's processed: bad data or a bug. Without a retry limit it's redelivered forever and can block its partition. Catch it, retry a few times with backoff, then send it to a dead-letter topic."),
  ],
  news: [
    { text: "Kafka 4.0 (March 2025) removed ZooKeeper: KRaft is the only metadata mode. It also made the new consumer rebalance protocol (KIP-848) generally available.", url: "https://kafka.apache.org/blog/2025/03/18/apache-kafka-4.0.0-release-announcement/" },
    { text: "'Queues for Kafka' (KIP-932 share groups) let several consumers share one partition with per-message acknowledgement, like a classic queue. Early access in 4.0, production-ready in 4.2.", url: "https://cwiki.apache.org/confluence/display/KAFKA/KIP-932%3A+Queues+for+Kafka" },
  ],
  docs: [
    { label: "Apache Kafka documentation", url: "https://kafka.apache.org/documentation/" },
    { label: "Google Cloud Pub/Sub documentation", url: "https://cloud.google.com/pubsub/docs" },
    { label: "Pub/Sub exactly-once delivery", url: "https://cloud.google.com/pubsub/docs/exactly-once-delivery" },
  ],
  bank: ["sb-events", "sb-microservices"],
};
