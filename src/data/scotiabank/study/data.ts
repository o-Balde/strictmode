import { concept, js, output, pair, qa, sql, table, trap } from "./authoring";
import type { StudyTopic } from "./types";

export const DATABASES: StudyTopic = {
  id: "databases",
  short: "Databases",
  title: "Databases: PostgreSQL, Azure SQL and MongoDB",
  jd: "Databases: SQL (PostgreSQL, Azure SQL), basic NoSQL (MongoDB)",
  weight: "core",
  summary:
    "The posting names two relational databases and one document database. PostgreSQL and Azure SQL share standard SQL but differ in dialect and features. MongoDB stores JSON-like documents and trades joins for flexible, nested data. Expect to write a join or aggregate live, explain indexes and transactions, and say when you'd choose a document store over a relational one.",
  concepts: [
    concept("Relational model", "Data in **tables** of rows and columns, each row identified by a **primary key**, tables linked by **foreign keys**. Constraints (`NOT NULL`, `UNIQUE`, `CHECK`, foreign keys) let the database itself refuse bad data."),
    concept("Normalisation", "Organise tables so each fact is stored once. **1NF**: atomic values, no repeating groups. **2NF**: no column depends on only part of a composite key. **3NF**: no column depends on another non-key column. It prevents update anomalies; denormalise deliberately for read-heavy reporting."),
    concept("Joins", "`INNER JOIN`: only rows matching on both sides. `LEFT JOIN`: every row from the left, with `NULL`s where nothing matches, so `LEFT JOIN ... WHERE right.id IS NULL` finds rows with no match. `FULL JOIN`, `CROSS JOIN` and self-joins complete the set."),
    concept("Aggregation", "`GROUP BY` folds rows into groups for `COUNT`, `SUM`, `AVG`, `MIN` and `MAX`. `WHERE` filters rows before grouping; `HAVING` filters groups after. Every selected column must be grouped or aggregated."),
    concept("Subqueries and CTEs", "A subquery is a query inside another; a CTE (`WITH name AS (...)`) names one so a complex query reads top to bottom. `WITH RECURSIVE` walks hierarchies such as an organisation chart or account household."),
    concept("Window functions", "Calculations across related rows that keep every row: `ROW_NUMBER()`, `RANK()`, running totals with `SUM(...) OVER (PARTITION BY account ORDER BY date)`, `LAG` for the previous row. Ideal for 'latest per group' and running balances."),
    concept("Indexes", "A B-tree index makes lookups, ranges and sorting on its columns fast (O(log n) instead of a full scan) but costs storage and slows writes. A composite index on `(client_id, opened_at)` serves queries filtering on `client_id`, the leftmost column first."),
    concept("Query plans", "`EXPLAIN` (`EXPLAIN ANALYZE` in PostgreSQL, the execution plan in SQL Server) shows how the database will run a query: sequential scan or index scan, join method, row estimates. The first tool for a slow query."),
    concept("ACID transactions", "**Atomicity**: all or nothing. **Consistency**: constraints hold before and after. **Isolation**: concurrent transactions don't see each other's partial work. **Durability**: once committed, it survives a crash (the write-ahead log)."),
    concept("Isolation levels", "**Read committed** (the default in PostgreSQL and Azure SQL) sees only committed data, but a re-read can change. **Repeatable read** keeps a stable snapshot. **Serializable** behaves as if transactions ran one at a time, and may abort one to guarantee it."),
    concept("MVCC and locking", "PostgreSQL keeps row versions (multi-version concurrency control), so readers don't block writers. Azure SQL Database does the same through **read committed snapshot**, on by default. Writers still lock the rows they change; deadlocks are detected and one transaction is rolled back."),
    concept("Pessimistic and optimistic locking", "**Pessimistic**: lock the row when reading it (`SELECT ... FOR UPDATE`; `WITH (UPDLOCK)` in T-SQL) so others wait. **Optimistic**: no lock; a `version` column, and an update that only succeeds if the version hasn't changed. JPA's `@Version` does the optimistic kind."),
    concept("PostgreSQL", "An open-source relational database known for standards compliance and extensions: `jsonb` with GIN indexes, arrays, full-text search, PostGIS, `pgvector`. Managed on Google Cloud as Cloud SQL or AlloyDB, and on Azure as Azure Database for PostgreSQL."),
    concept("Azure SQL", "Microsoft's managed SQL Server engine in the cloud, queried with **T-SQL**. Azure SQL Database (a single database or elastic pool, provisioned or serverless, Hyperscale for large data) or Managed Instance (near-full SQL Server compatibility). Patching, backups and high availability are handled for you."),
    concept("MongoDB documents", "Data stored as **BSON** documents (binary JSON with extra types such as `Decimal128`, dates and `ObjectId`) in **collections**. Documents in one collection can differ in shape, and a schema validator (`$jsonSchema`) can still enforce one."),
    concept("Embed vs reference", "**Embed** data that's read together and bounded in size: a client's addresses inside the client document, updated atomically in one write. **Reference** by ID when the related data is large, unbounded or shared: a client's transactions belong in their own collection."),
    concept("The aggregation pipeline", "MongoDB's query language for reporting: a list of stages such as `$match` (filter), `$group` (aggregate), `$sort`, `$limit`, `$project` (shape) and `$lookup` (a left join to another collection), each feeding the next."),
    concept("Replica sets and sharding", "A **replica set** is a primary plus secondaries with automatic failover: high availability. **Sharding** splits a collection across servers by a **shard key**, which must spread writes evenly and match common queries: horizontal scale."),
    concept("Transactions in MongoDB", "Single-document writes are always atomic, which is why good document design embeds what changes together. Multi-document ACID transactions exist (since 4.0, sharded since 4.2) but cost more; needing them constantly suggests a relational model."),
    concept("CAP and BASE", "During a network partition, a distributed database must choose between **consistency** (refuse or wait) and **availability** (answer, possibly stale). BASE (basically available, soft state, eventually consistent) describes systems leaning to availability. MongoDB lets you tune this per operation with read and write concerns."),
    concept("Connection pools, ORMs and migrations", "Open connections are expensive, so apps reuse a pool (HikariCP in Spring). ORMs (Hibernate, Prisma) map rows to objects; watch for N+1 queries. Schema changes go through versioned migrations (Flyway, Liquibase) run by the pipeline, never by hand."),
    concept("Money in databases", "Store amounts as `numeric(14, 2)` in PostgreSQL, `decimal(14, 2)` in Azure SQL, or `Decimal128` in MongoDB, or as integer minor units (cents). Never `float`, `real` or `double`, which can't represent most decimal fractions exactly."),
  ],
  parts: [
    {
      id: "databases-compare",
      title: "Side by side",
      blocks: [
        table(
          ["", "Relational (SQL)", "Document (NoSQL)"],
          ["Data shape", "Tables with a fixed schema", "Flexible JSON-like documents"],
          ["Relationships", "Foreign keys and joins", "Embedding, or references with `$lookup`"],
          ["Schema changes", "Migrations (`ALTER TABLE`)", "Per document; validators optional"],
          ["Transactions", "Multi-row ACID by design", "Single-document atomic; multi-document when needed"],
          ["Scaling", "Vertical first, read replicas, then partitioning", "Horizontal sharding built in"],
          ["Strong at", "Integrity, ad-hoc queries, reporting, money", "Varied or nested data, fast evolving models, high write volume"],
          ["Examples here", "Accounts, ledgers, KYC records", "Onboarding forms in progress, document metadata, audit events"],
        ),
        table(
          ["", "PostgreSQL", "Azure SQL", "MongoDB"],
          ["Engine", "Open-source PostgreSQL", "Microsoft SQL Server, managed", "MongoDB, self-hosted or Atlas"],
          ["Language", "SQL, with PL/pgSQL for functions", "T-SQL", "MQL and the aggregation pipeline"],
          ["Default isolation", "Read committed, with MVCC", "Read committed snapshot (row versioning)", "Snapshot inside transactions; read and write concerns"],
          ["JSON", "`jsonb`, indexable with GIN", "Native `json` type (GA 2025) and JSON functions", "Native: everything is a document"],
          ["Generated IDs", "`GENERATED ... AS IDENTITY`, `uuidv7()`", "`IDENTITY(1,1)`, `NEWSEQUENTIALID()`", "`ObjectId`, generated client-side"],
          ["Scale out", "Read replicas, partitioning, Citus", "Read replicas, Hyperscale, elastic pools", "Sharding"],
          ["Managed on Google Cloud / Azure", "Cloud SQL, AlloyDB / Azure Database for PostgreSQL", "Cloud SQL for SQL Server / Azure SQL", "Atlas on either cloud"],
        ),
        table(
          ["Task", "PostgreSQL", "Azure SQL (T-SQL)", "MongoDB"],
          ["First 10 rows", "`LIMIT 10`", "`SELECT TOP (10)`", "`.limit(10)`"],
          ["Page 3 of 20", "`LIMIT 20 OFFSET 40`", "`OFFSET 40 ROWS FETCH NEXT 20 ROWS ONLY`", "`.skip(40).limit(20)`"],
          ["Auto-increment key", "`bigint GENERATED ALWAYS AS IDENTITY`", "`bigint IDENTITY(1,1)`", "`_id: ObjectId()` by default"],
          ["Current time", "`now()`", "`SYSUTCDATETIME()`", "`new Date()`, or `$$NOW` in a pipeline"],
          ["Concatenate strings", "`first || ' ' || last`", "`CONCAT(first, ' ', last)`", "`{ $concat: [\"$first\", \" \", \"$last\"] }`"],
          ["Case-insensitive match", "`ILIKE 'smith%'`", "`LIKE 'smith%'` (collations are case-insensitive by default)", "`{ name: /^smith/i }`"],
          ["Return the inserted row", "`INSERT ... RETURNING *`", "`INSERT ... OUTPUT INSERTED.*`", "`insertOne` returns `insertedId`"],
          ["Insert or update", "`INSERT ... ON CONFLICT ... DO UPDATE`", "`MERGE`", "`updateOne(filter, update, { upsert: true })`"],
          ["Read a JSON field", "`details->>'employer'`", "`JSON_VALUE(details, '$.employer')`", "`\"details.employer\"`"],
          ["Boolean column", "`boolean`", "`bit`", "`bool`"],
          ["Quote an identifier", "`\"Order\"`", "`[Order]`", "Not needed"],
        ),
        table(
          ["Isolation level", "Dirty read", "Non-repeatable read", "Phantom read"],
          ["Read uncommitted", "Possible (PostgreSQL treats it as read committed)", "Possible", "Possible"],
          ["Read committed", "No", "Possible", "Possible"],
          ["Repeatable read", "No", "No", "Possible in the standard; not in PostgreSQL"],
          ["Serializable", "No", "No", "No: may abort a transaction, so retry"],
        ),
        table(
          ["", "Embed", "Reference"],
          ["Shape", "`{ name, addresses: [ ... ] }`", "`{ clientId }` in another collection"],
          ["Read", "One query returns everything", "A second query or `$lookup`"],
          ["Write", "Atomic in one document", "Several documents: a transaction if they must agree"],
          ["Use when", "One-to-few, read together, bounded", "One-to-many unbounded, shared, or large"],
          ["Watch", "The 16 MB document limit, ever-growing arrays", "Extra round trips"],
        ),
      ],
    },
    {
      id: "databases-three",
      title: "Same task, three databases",
      intro: "The schema: clients, and accounts that belong to them. Read each version and notice what changes and what doesn't.",
      blocks: [
        sql(`
CREATE TABLE accounts (
  id         uuid PRIMARY KEY DEFAULT uuidv7(), -- PostgreSQL 18
  client_id  uuid NOT NULL REFERENCES clients (id),
  type       text NOT NULL CHECK (type IN ('CHEQUING', 'SAVINGS', 'TFSA', 'RRSP')),
  status     text NOT NULL DEFAULT 'OPEN',
  balance    numeric(14, 2) NOT NULL DEFAULT 0,
  details    jsonb,
  opened_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX accounts_client_idx ON accounts (client_id, opened_at DESC);
`, { caption: "PostgreSQL: create the table" }),
        sql(`
CREATE TABLE accounts (
  id         uniqueidentifier NOT NULL PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
  client_id  uniqueidentifier NOT NULL REFERENCES clients (id),
  type       varchar(10) NOT NULL CHECK (type IN ('CHEQUING', 'SAVINGS', 'TFSA', 'RRSP')),
  status     varchar(10) NOT NULL DEFAULT 'OPEN',
  balance    decimal(14, 2) NOT NULL DEFAULT 0,
  details    json NULL,
  opened_at  datetimeoffset NOT NULL DEFAULT SYSDATETIMEOFFSET()
);
CREATE INDEX accounts_client_idx ON accounts (client_id, opened_at DESC);
`, { caption: "Azure SQL: the same table in T-SQL" }),
        js(`
db.createCollection("accounts", {
  validator: {
    $jsonSchema: {
      required: ["clientId", "type", "balance"],
      properties: {
        type: { enum: ["CHEQUING", "SAVINGS", "TFSA", "RRSP"] },
        balance: { bsonType: "decimal" },
      },
    },
  },
});
db.accounts.createIndex({ clientId: 1, openedAt: -1 });
db.accounts.insertOne({
  clientId: ObjectId("665f1c2e9b1e8a3d4c2b1a00"),
  type: "TFSA",
  status: "OPEN",
  balance: NumberDecimal("0.00"),
  openedAt: new Date(),
});
`, { caption: "MongoDB (mongosh): a validated collection, an index, a document" }),
        sql(`
SELECT c.name, SUM(a.balance) AS total
FROM clients c
JOIN accounts a ON a.client_id = c.id
WHERE a.status = 'OPEN'
GROUP BY c.id, c.name
HAVING SUM(a.balance) > 10000
ORDER BY total DESC
LIMIT 5;
`, { caption: "PostgreSQL: top five clients with over $10,000 in open accounts" }),
        sql(`
SELECT TOP (5) c.name, SUM(a.balance) AS total
FROM clients AS c
JOIN accounts AS a ON a.client_id = c.id
WHERE a.status = 'OPEN'
GROUP BY c.id, c.name
HAVING SUM(a.balance) > 10000
ORDER BY total DESC;
`, { caption: "Azure SQL: TOP instead of LIMIT, the rest is identical" }),
        js(`
db.accounts.aggregate([
  { $match: { status: "OPEN" } },
  { $group: { _id: "$clientId", total: { $sum: "$balance" } } },
  { $match: { total: { $gt: NumberDecimal("10000") } } },
  { $sort: { total: -1 } },
  { $limit: 5 },
  { $lookup: { from: "clients", localField: "_id", foreignField: "_id", as: "client" } },
  { $project: { _id: 0, name: { $first: "$client.name" }, total: 1 } },
]);
`, { caption: "MongoDB: the same report as an aggregation pipeline" }),
        sql(`
INSERT INTO kyc_status (client_id, status, updated_at)
VALUES ($1, 'VERIFIED', now())
ON CONFLICT (client_id)
DO UPDATE SET status = EXCLUDED.status, updated_at = EXCLUDED.updated_at;
`, { caption: "PostgreSQL: insert or update in one atomic statement" }),
        sql(`
MERGE kyc_status WITH (HOLDLOCK) AS target
USING (VALUES (@clientId, 'VERIFIED')) AS source (client_id, status)
ON target.client_id = source.client_id
WHEN MATCHED THEN
  UPDATE SET status = source.status, updated_at = SYSUTCDATETIME()
WHEN NOT MATCHED THEN
  INSERT (client_id, status, updated_at) VALUES (source.client_id, source.status, SYSUTCDATETIME());
`, { caption: "Azure SQL: MERGE, with HOLDLOCK to make it safe under concurrency" }),
        js(`
db.kycStatus.updateOne(
  { clientId: ObjectId("665f1c2e9b1e8a3d4c2b1a00") },
  { $set: { status: "VERIFIED", updatedAt: new Date() } },
  { upsert: true },
);
`, { caption: "MongoDB: an upsert" }),
      ],
    },
    {
      id: "databases-locking",
      title: "Concurrency: two withdrawals at once",
      blocks: [
        sql(`
-- pessimistic: lock the row until COMMIT; a concurrent withdrawal waits its turn
BEGIN;
SELECT balance FROM accounts WHERE id = $1 FOR UPDATE;
UPDATE accounts SET balance = balance - 100.00 WHERE id = $1;
COMMIT;

-- optimistic: no lock; succeed only if nobody changed the row since we read it
UPDATE accounts
SET balance = 400.00, version = version + 1
WHERE id = $1 AND version = 7; -- 0 rows updated: someone else won, so re-read and retry
`, { caption: "PostgreSQL; in T-SQL the pessimistic read is `SELECT ... FROM accounts WITH (UPDLOCK, ROWLOCK)`" }),
        trap("Reading the balance, checking it in application code, then writing a new value is a race: two requests can both read $500 and both withdraw. Either lock the row, use a conditional update (`WHERE balance >= 100`), or check a version."),
      ],
    },
    {
      id: "databases-run",
      title: "A window function, run",
      intro: "Checked against a real database when this page was written. Predict the result first.",
      blocks: [
        sql(`
-- accounts: (a1, c1, CHEQUING, 2024-03-01), (a2, c1, TFSA, 2025-06-15),
--           (a3, c2, SAVINGS, 2023-11-20), (a4, c2, RRSP, 2023-11-20)
SELECT client_id, id, type, opened_at
FROM (
  SELECT a.*, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY opened_at DESC, id DESC) AS rn
  FROM accounts a
) ranked
WHERE rn = 1
ORDER BY client_id;
`, { caption: "The newest account per client" }),
        output(`
client_id | id | type  | opened_at
c1        | a2 | TFSA  | 2025-06-15
c2        | a4 | RRSP  | 2023-11-20
`),
      ],
    },
    {
      id: "databases-before-after",
      title: "Before and after",
      pairs: [
        pair("Implicit comma joins to explicit `JOIN`", "SQL-92", "The join condition sits next to the join instead of mixed in with the filters, and forgetting it is visible instead of silently producing a cross join.", {
          before: sql(`
SELECT c.name, a.balance
FROM clients c, accounts a
WHERE c.id = a.client_id
  AND a.status = 'OPEN';
`),
          after: sql(`
SELECT c.name, a.balance
FROM clients c
JOIN accounts a ON a.client_id = c.id
WHERE a.status = 'OPEN';
`),
        }),
        pair("`SERIAL` to identity columns and UUIDv7", "PostgreSQL 10 (identity), 18 (`uuidv7()`)", "Identity columns are standard SQL and stop accidental manual inserts into the key. UUIDv7 values are time-ordered, so they index almost as well as integers and can be generated anywhere without coordination.", {
          before: sql(`
CREATE TABLE clients (
  id serial PRIMARY KEY,
  name text NOT NULL
);
`),
          after: sql(`
CREATE TABLE clients (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  public_id uuid NOT NULL UNIQUE DEFAULT uuidv7(),
  name text NOT NULL
);
`),
        }),
        pair("Check-then-insert to an atomic upsert", "PostgreSQL 9.5 (`ON CONFLICT`)", "Two requests can both see 'no row' and both insert, or one fails on the unique constraint. One statement does it atomically.", {
          before: sql(`
-- application code: if this returns nothing...
SELECT 1 FROM kyc_status WHERE client_id = $1;
-- ...then insert, otherwise update
INSERT INTO kyc_status (client_id, status) VALUES ($1, 'VERIFIED');
`),
          after: sql(`
INSERT INTO kyc_status (client_id, status) VALUES ($1, 'VERIFIED')
ON CONFLICT (client_id) DO UPDATE SET status = EXCLUDED.status;
`),
        }),
        pair("A correlated subquery to a window function", "SQL:2003 window functions", "The subquery runs once per row; the window function sorts each client's accounts once. It's also easier to change to 'top 3 per client'.", {
          before: sql(`
SELECT a.client_id, a.id, a.opened_at
FROM accounts a
WHERE a.opened_at = (
  SELECT MAX(b.opened_at) FROM accounts b WHERE b.client_id = a.client_id
); -- ties return two rows per client
`),
          after: sql(`
SELECT client_id, id, opened_at
FROM (
  SELECT a.*, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY opened_at DESC, id DESC) AS rn
  FROM accounts a
) ranked
WHERE rn = 1;
`),
        }),
        pair("JSON in a text column to `jsonb` with an index", "PostgreSQL 9.4 (`jsonb`)", "`jsonb` is parsed once, validated on insert, and indexable, so queries into semi-structured onboarding answers stay fast.", {
          before: sql(`
CREATE TABLE applications (id bigint PRIMARY KEY, answers text);
SELECT id FROM applications WHERE answers LIKE '%"employment":"self-employed"%';
`),
          after: sql(`
CREATE TABLE applications (id bigint PRIMARY KEY, answers jsonb NOT NULL);
CREATE INDEX applications_answers_idx ON applications USING gin (answers);
SELECT id FROM applications WHERE answers @> '{"employment": "self-employed"}';
`),
        }),
      ],
    },
  ],
  questions: [
    qa("SQL vs NoSQL: when would you choose MongoDB?", "Relational when data is structured and related, integrity matters, and you need ad-hoc queries and multi-row transactions: accounts, ledgers, KYC records. MongoDB when documents are naturally nested and read whole, their shape varies or evolves quickly, and you need easy horizontal scale: draft onboarding applications, document metadata, event logs."),
    qa("PostgreSQL vs Azure SQL?", "Both are mature relational databases with ACID transactions and standard SQL. PostgreSQL is open source, with rich types (`jsonb`, arrays) and extensions, and runs anywhere. Azure SQL is Microsoft's managed SQL Server, queried with T-SQL, tightly integrated with Azure (Entra authentication, Hyperscale, geo-replication). Day to day the SQL differs mostly in dialect: `LIMIT` vs `TOP`, `ON CONFLICT` vs `MERGE`."),
    qa("Explain the types of joins.", "`INNER JOIN` keeps rows that match on both sides. `LEFT JOIN` keeps every left row, with `NULL`s where nothing matches; `RIGHT JOIN` is the mirror image. `FULL JOIN` keeps both sides. `CROSS JOIN` pairs every row with every row. A self-join joins a table to itself, such as employees to their managers."),
    qa("`WHERE` vs `HAVING`?", "`WHERE` filters individual rows before grouping and can't use aggregates. `HAVING` filters groups after `GROUP BY`, using aggregates: `HAVING SUM(balance) > 10000`. Filter as much as possible in `WHERE`, which is cheaper."),
    qa("What is an index, and what does it cost?", "A separate sorted structure, usually a B-tree, that lets the database find rows by a column without scanning the table: lookups, ranges, sorts and joins get much faster. It costs disk space and makes every insert, update and delete slower, so index what your queries filter and join on, not everything."),
    qa("How do you choose the column order in a composite index?", "Equality-filtered columns first, then range or sort columns: `(client_id, opened_at)` serves `WHERE client_id = ? ORDER BY opened_at`. The index helps queries that use its leftmost columns, so it can't serve a query filtering only on `opened_at`."),
    qa("What does ACID mean?", "Atomicity: a transaction applies completely or not at all. Consistency: it moves the database from one valid state to another, with every constraint holding. Isolation: concurrent transactions don't see each other's uncommitted work. Durability: once committed, it survives crashes."),
    qa("What are isolation levels?", "Trade-offs between correctness and concurrency. Read committed (the default in PostgreSQL and Azure SQL) prevents dirty reads; repeatable read gives a stable snapshot; serializable prevents every anomaly by aborting conflicting transactions, which the application must retry."),
    qa("Explain normalisation.", "Structuring tables so each fact lives in one place: atomic columns (1NF), every column depending on the whole key (2NF) and nothing but the key (3NF). It prevents update anomalies, like a client's address differing between rows. Reporting tables are often denormalised on purpose for speed."),
    qa("Find the second highest balance.", "`SELECT MAX(balance) FROM accounts WHERE balance < (SELECT MAX(balance) FROM accounts);` or, with ties handled explicitly, `DENSE_RANK() OVER (ORDER BY balance DESC)` and filter for rank 2. `LIMIT 1 OFFSET 1` breaks when the top value is duplicated."),
    qa("How do you stop two concurrent withdrawals from overdrawing an account?", "Make the database enforce it: a conditional update (`UPDATE accounts SET balance = balance - $2 WHERE id = $1 AND balance >= $2`, then check the row count), or lock the row with `SELECT ... FOR UPDATE` inside a transaction, or use optimistic locking with a version column and retry. Never read, check in code, then write unguarded."),
    qa("How would you speed up a slow query?", "Measure first: `EXPLAIN ANALYZE` to see the plan, row counts and where time goes. Typical fixes: add or adjust an index for the filter and sort, select only needed columns, remove N+1 patterns, rewrite a correlated subquery, keep statistics up to date, or paginate with keysets. Then measure again."),
    qa("Embed or reference in MongoDB?", "Embed data that's owned by the parent, read together and bounded, such as a client's addresses: one read, atomic updates. Reference data that grows without limit, is shared, or is queried on its own, such as transactions: separate collection plus `clientId`. Design from the application's queries."),
    qa("What are a replica set and sharding?", "A replica set is a primary with secondary copies; if the primary fails, a secondary is elected: availability and durability. Sharding partitions a collection across replica sets by a shard key: write and storage scale. A bad shard key, such as a timestamp, sends all writes to one shard."),
    qa("What is the CAP theorem?", "A distributed data store can't guarantee consistency, availability and partition tolerance at the same time; since network partitions happen, during one you choose between consistent answers (refuse or wait) and available ones (answer, maybe stale). Banks usually pick consistency for balances."),
    qa("Does MongoDB support transactions?", "Yes. Single-document operations are always atomic, and multi-document ACID transactions exist since 4.0 (sharded clusters since 4.2), with snapshot isolation. They cost more than single-document writes, so the usual advice is to model data so most changes touch one document."),
    qa("Primary key vs foreign key vs unique constraint?", "A primary key uniquely identifies each row and can't be null; one per table. A foreign key requires a value to exist as a key in another table, keeping relationships valid. A unique constraint forbids duplicates in other columns, such as email."),
    qa("`DELETE` vs `TRUNCATE` vs `DROP`?", "`DELETE` removes chosen rows, logged row by row, fires triggers, and can roll back. `TRUNCATE` empties a whole table quickly, resetting storage. `DROP` removes the table itself, structure and all."),
    qa("`UNION` vs `UNION ALL`?", "Both stack the results of two queries with matching columns. `UNION` removes duplicates, which needs a sort or hash; `UNION ALL` keeps everything and is faster. Use `UNION ALL` unless you need de-duplication."),
    qa("Why never store money as `float`?", "Binary floating point can't represent most decimal fractions exactly, so `0.1 + 0.2` isn't `0.3` and sums drift by cents. Use `numeric`/`decimal` with a fixed scale, `Decimal128` in MongoDB, or integer minor units, and `BigDecimal` in Java."),
  ],
  news: [
    { text: "PostgreSQL 18 (September 2025) added asynchronous I/O, `uuidv7()`, virtual generated columns, skip scans on multicolumn B-tree indexes, `OLD` and `NEW` in `RETURNING`, and OAuth authentication.", url: "https://www.postgresql.org/about/news/postgresql-18-released-3142/" },
    { text: "PostgreSQL 19 (19 November 2026) adds `REPACK (CONCURRENTLY)` to reorganise tables without long locks, `INSERT ... ON CONFLICT DO SELECT`, and `WAIT FOR LSN` for read-your-writes on replicas.", url: "https://www.postgresql.org/about/news/postgresql-19-released-3449/" },
    { text: "Azure SQL Database's native `json` data type (May 2025) and `vector` type (June 2025) are generally available.", url: "https://learn.microsoft.com/en-us/sql/t-sql/data-types/json-data-type" },
  ],
  docs: [
    { label: "PostgreSQL documentation", url: "https://www.postgresql.org/docs/current/" },
    { label: "Azure SQL documentation", url: "https://learn.microsoft.com/en-us/azure/azure-sql/" },
    { label: "T-SQL reference", url: "https://learn.microsoft.com/en-us/sql/t-sql/language-reference" },
    { label: "MongoDB manual", url: "https://www.mongodb.com/docs/manual/" },
    { label: "MongoDB data modelling", url: "https://www.mongodb.com/docs/manual/data-modeling/" },
  ],
  bank: ["sb-sql", "sb-mongo"],
};
