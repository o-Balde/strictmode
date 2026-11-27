import { java, js, list, output, p, say, sql, table, trap } from "../interview-prep/blocks";
import type { PrepSection } from "../interview-prep";

/**
 * Every query below runs against this schema. The outputs were checked by
 * running the queries, not written by hand.
 */
const SCHEMA = `
CREATE TABLE client (
  id      INTEGER PRIMARY KEY,
  name    TEXT NOT NULL,
  email   TEXT NOT NULL
);
CREATE TABLE account (
  id        INTEGER PRIMARY KEY,
  client_id INTEGER NOT NULL REFERENCES client(id),
  type      TEXT NOT NULL,            -- TFSA, RRSP, NON_REGISTERED...
  balance   NUMERIC(12, 2) NOT NULL
);
-- client:  (1, Ana, ana@x.ca) (2, Ben, ben@x.ca) (3, Chloé, chloe@x.ca) (4, Dev, ana@x.ca)
-- account: (10, 1, TFSA, 5000) (11, 1, RRSP, 12000) (12, 2, TFSA, 800) (13, 3, NON_REGISTERED, 12000)
`;

export const SB_SQL: PrepSection = {
  id: "sb-sql",
  track: "data",
  title: "SQL, PostgreSQL and Azure SQL",
  blurb:
    "Candidates report one easy SQL question in Scotiabank's Codility test, and 'second highest salary' in adjacent roles. Every query here runs against the same two tables: clients and their accounts.",
  questions: [
    {
      id: "sb-sql-joins",
      question: "Explain INNER, LEFT and FULL joins with clients and accounts.",
      level: "junior",
      short:
        "An INNER JOIN keeps only rows that match on both sides. A LEFT JOIN keeps every row from the left table, with NULLs where there is no match on the right. A FULL OUTER JOIN keeps unmatched rows from both sides. RIGHT JOIN is LEFT JOIN with the tables swapped, and most people just write LEFT.",
      body: [
        sql(SCHEMA, { caption: "The schema used by every question in this section" }),
        sql(`
SELECT c.name, a.type, a.balance
FROM client c
LEFT JOIN account a ON a.client_id = c.id
ORDER BY c.id, a.id;
`),
        output(`
name   | type           | balance
-------+----------------+--------
Ana    | TFSA           |  5000.00
Ana    | RRSP           | 12000.00
Ben    | TFSA           |   800.00
Chloé  | NON_REGISTERED | 12000.00
Dev    | NULL           |     NULL
`),
        p("With an INNER JOIN, Dev disappears because Dev has no accounts. Ana appears twice because a join gives one row per matching pair. That is why counting after a join often double-counts."),
        trap("Putting a condition on the right-hand table in `WHERE` (`WHERE a.type = 'TFSA'`) silently turns a LEFT JOIN into an INNER JOIN, because the NULL rows fail the test. Put it in the `ON` clause to keep the unmatched rows."),
      ],
    },
    {
      id: "sb-sql-no-accounts",
      question: "Find the clients who have no accounts.",
      level: "junior",
      short:
        "Use an anti-join: `NOT EXISTS`, or `LEFT JOIN ... WHERE a.id IS NULL`. Both are correct and both are fast with an index on `account.client_id`. Avoid `NOT IN (subquery)`: if the subquery returns a NULL, it returns no rows at all.",
      body: [
        sql(`
SELECT c.id, c.name
FROM client c
WHERE NOT EXISTS (SELECT 1 FROM account a WHERE a.client_id = c.id);
`),
        output(`
id | name
---+-----
4  | Dev
`),
      ],
    },
    {
      id: "sb-sql-group-having",
      question: "Total balance per client, only for clients holding over $10,000. WHERE vs HAVING?",
      level: "junior",
      short:
        "`GROUP BY` the client and `SUM` the balances. `WHERE` filters rows **before** grouping, and `HAVING` filters groups **after** aggregation, so a condition on `SUM(...)` goes in `HAVING`. The logical order of a query is FROM/JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT, which is also why `WHERE` can't use a `SELECT` alias.",
      body: [
        sql(`
SELECT c.name, SUM(a.balance) AS total, COUNT(*) AS accounts
FROM client c
JOIN account a ON a.client_id = c.id
GROUP BY c.id, c.name
HAVING SUM(a.balance) > 10000
ORDER BY total DESC;
`),
        output(`
name   | total    | accounts
-------+----------+---------
Ana    | 17000.00 | 2
Chloé  | 12000.00 | 1
`),
      ],
    },
    {
      id: "sb-sql-second-highest",
      question: "Find the second-highest account balance.",
      level: "junior",
      short:
        "Decide what to do with ties first. If 'second highest' means the second distinct value, the answer here is 5000, because two accounts share 12000. Use `DENSE_RANK()`, or `MAX` of the values below the `MAX`. A plain `ORDER BY balance DESC LIMIT 1 OFFSET 1` returns the second **row**, which is 12000 again.",
      body: [
        sql(`
-- 1. Window function: also generalises to "the Nth highest"
SELECT DISTINCT balance
FROM (
  SELECT balance, DENSE_RANK() OVER (ORDER BY balance DESC) AS rnk
  FROM account
) ranked
WHERE rnk = 2;

-- 2. Subquery: works on any SQL dialect
SELECT MAX(balance) AS second_highest
FROM account
WHERE balance < (SELECT MAX(balance) FROM account);
`),
        output(`
balance
-------
5000.00
`),
        trap("Not asking about ties or NULLs. Say out loud what the query returns when there is no second value: the subquery version returns NULL, and the window version returns no rows."),
      ],
    },
    {
      id: "sb-sql-top-per-group",
      question: "Return each client's largest account.",
      level: "intermediate",
      short:
        "This is the top-N-per-group pattern. `ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY balance DESC)` numbers each client's accounts, and you keep row 1. Use `RANK` instead to keep ties. PostgreSQL also has `DISTINCT ON (client_id)`.",
      body: [
        sql(`
SELECT client_id, id AS account_id, type, balance
FROM (
  SELECT a.*, ROW_NUMBER() OVER (PARTITION BY client_id ORDER BY balance DESC, id) AS rn
  FROM account a
) t
WHERE rn = 1
ORDER BY client_id;
`),
        output(`
client_id | account_id | type           | balance
----------+------------+----------------+---------
1         | 11         | RRSP           | 12000.00
2         | 12         | TFSA           |   800.00
3         | 13         | NON_REGISTERED | 12000.00
`),
      ],
    },
    {
      id: "sb-sql-running-balance",
      question: "Compute a running balance over an account's transactions.",
      level: "intermediate",
      short:
        "Use a window aggregate: `SUM(amount) OVER (PARTITION BY account_id ORDER BY posted_at, id)`. Unlike `GROUP BY`, a window keeps every row and adds the cumulative value beside it. Add a unique tiebreaker to the `ORDER BY` so transactions with the same timestamp come out in a stable order.",
      body: [
        sql(`
-- txn: (1, 10, '2026-11-01', 5000) (2, 10, '2026-11-03', -200) (3, 10, '2026-11-03', 150)
SELECT id, posted_at, amount,
       SUM(amount) OVER (PARTITION BY account_id ORDER BY posted_at, id) AS running_balance
FROM txn
WHERE account_id = 10
ORDER BY posted_at, id;
`),
        output(`
id | posted_at  | amount  | running_balance
---+------------+---------+----------------
1  | 2026-11-01 | 5000.00 | 5000.00
2  | 2026-11-03 | -200.00 | 4800.00
3  | 2026-11-03 |  150.00 | 4950.00
`),
      ],
    },
    {
      id: "sb-sql-duplicates",
      question: "Find duplicate client emails, then delete the duplicates but keep one.",
      level: "junior",
      short:
        "`GROUP BY email HAVING COUNT(*) > 1` finds them. To remove all but the lowest id, delete each row that has a lower-id twin, or number the rows with `ROW_NUMBER()` in a CTE and delete everything numbered above 1. Run it in a transaction, check it as a `SELECT` first, and add a `UNIQUE` constraint afterwards so it can't happen again.",
      body: [
        sql(`
SELECT email, COUNT(*) AS n
FROM client
GROUP BY email
HAVING COUNT(*) > 1;

DELETE FROM client c
WHERE EXISTS (
  SELECT 1 FROM client older
  WHERE older.email = c.email AND older.id < c.id
);

ALTER TABLE client ADD CONSTRAINT client_email_unique UNIQUE (email);
`),
        output(`
email    | n
---------+---
ana@x.ca | 2
`),
        p("In a real bank you would not delete a client row. Two records with one email is a data-quality issue for a merge process, with an audit trail. Saying that earns more credit than the query."),
      ],
    },
    {
      id: "sb-sql-indexes",
      question: "How do indexes work, and when do they hurt?",
      level: "intermediate",
      short:
        "A B-tree index keeps a column's values sorted, with pointers to the rows, so lookups, ranges and `ORDER BY` take O(log n) instead of a full table scan. A composite index on `(client_id, posted_at)` serves queries that filter on `client_id`, or on both columns, but not `posted_at` alone: the leftmost-prefix rule. Indexes cost space and slow down every INSERT and UPDATE, so add them for real query patterns and confirm with `EXPLAIN ANALYZE`.",
      body: [
        sql(`
CREATE INDEX idx_txn_account_posted ON txn (account_id, posted_at DESC);

EXPLAIN ANALYZE
SELECT * FROM txn WHERE account_id = 10 ORDER BY posted_at DESC LIMIT 50;
-- look for "Index Scan using idx_txn_account_posted", not "Seq Scan" + "Sort"
`),
        list(
          "An index on a column wrapped in a function (`WHERE lower(email) = ...`) only helps if the index is on the same expression.",
          "A low-selectivity column (a boolean flag) rarely benefits. A partial index (`WHERE status = 'PENDING'`) can.",
          "Foreign-key columns usually need an index, which Postgres doesn't create for you, or joins and cascading deletes scan the whole table.",
        ),
      ],
    },
    {
      id: "sb-sql-normalization",
      question: "What is normalisation? When would you denormalise?",
      level: "junior",
      short:
        "Normalisation removes duplicated data so each fact lives in one place. 1NF: atomic values, no repeating groups. 2NF: no column depends on only part of a composite key. 3NF: no column depends on another non-key column. That prevents update anomalies, such as an address changed in one table and not another. Denormalise deliberately for read-heavy reporting, or for snapshots that must not change, such as the client's details as they were at account opening.",
      body: [
        p("Onboarding has a good example. The application keeps a **snapshot** of what the client declared at submission. The live client profile can change later, but the record of what they declared then must not. That isn't sloppy duplication: the snapshot records a different fact."),
      ],
    },
    {
      id: "sb-sql-acid",
      question: "What do ACID and isolation levels mean in practice?",
      level: "intermediate",
      short:
        "**Atomicity:** all of a transaction happens, or none of it. **Consistency:** constraints hold before and after. **Isolation:** concurrent transactions don't see each other's half-done work. **Durability:** once committed, it survives a crash. The isolation levels trade safety for concurrency. PostgreSQL defaults to READ COMMITTED, which prevents dirty reads but still allows non-repeatable reads and lost updates. Fix those with row locks, optimistic versions, or SERIALIZABLE with a retry.",
      body: [
        table(
          ["Level", "Dirty read", "Non-repeatable read", "Phantom"],
          ["READ UNCOMMITTED", "Possible (not in Postgres)", "Possible", "Possible"],
          ["READ COMMITTED (Postgres default)", "No", "Possible", "Possible"],
          ["REPEATABLE READ", "No", "No", "Possible in the standard; not in Postgres"],
          ["SERIALIZABLE", "No", "No", "No (may abort: retry)"],
        ),
        p("SQL Server and Azure SQL also default to READ COMMITTED, implemented with locks unless you turn on snapshot isolation (RCSI)."),
      ],
    },
    {
      id: "sb-sql-locking",
      question: "Optimistic vs pessimistic locking: which would you use for a client profile?",
      level: "intermediate",
      short:
        "**Pessimistic:** lock the row while you work on it (`SELECT ... FOR UPDATE`). It suits short, high-contention critical sections such as a balance update. **Optimistic:** don't lock. Keep a `version` column, and make the update conditional on the version you read. If someone else changed the row first, zero rows update, and you tell the user to reload. A profile edited in a form for minutes needs optimistic locking. You can't hold a database lock while someone types.",
      body: [
        sql(`
-- Optimistic: what JPA's @Version generates
UPDATE client_profile
SET email = 'ana.new@x.ca', version = version + 1
WHERE id = 1 AND version = 7;   -- 0 rows updated: someone changed it first → HTTP 409/412

-- Pessimistic: hold the row for the length of the transaction
BEGIN;
SELECT balance FROM account WHERE id = 10 FOR UPDATE;
UPDATE account SET balance = balance - 200 WHERE id = 10;
COMMIT;
`),
        p("Over HTTP, optimistic locking maps to an `ETag` sent back as `If-Match`. A stale version gets `412 Precondition Failed`."),
      ],
    },
    {
      id: "sb-sql-injection",
      question: "How do you prevent SQL injection?",
      level: "junior",
      short:
        "Never build SQL by joining strings with user input. Use parameterised queries or prepared statements, so the value is sent separately from the SQL text and can't change the query's structure. ORMs do this for you unless you write raw SQL with string concatenation. Add least-privilege database users, and allow-list any identifier you can't parameterise, such as a sort column.",
      body: [
        java(
          `
// "x' OR '1'='1" becomes part of the query
String q = "SELECT * FROM client WHERE email = '" + email + "'";
`,
          { caption: "Vulnerable", tone: "bad" },
        ),
        java(
          `
PreparedStatement ps = conn.prepareStatement("SELECT * FROM client WHERE email = ?");
ps.setString(1, email);
`,
          { caption: "Parameterised", tone: "good" },
        ),
        js(
          `
// node-postgres: $1 is sent separately from the SQL text
const { rows } = await pool.query("SELECT id, name FROM client WHERE email = $1", [email]);

const SORTABLE = new Set(["name", "created_at"]); // identifiers can't be parameters: allow-list them
const column = SORTABLE.has(sort) ? sort : "created_at";
`,
          { caption: "Node", tone: "good" },
        ),
      ],
    },
    {
      id: "sb-sql-postgres-vs-azure",
      question: "What differs between PostgreSQL and Azure SQL (SQL Server) day to day?",
      level: "junior",
      short:
        "Both are relational and ACID, and the core SQL is the same. The dialects differ. Pagination is `LIMIT/OFFSET` in Postgres and `OFFSET ... FETCH` or `TOP` in T-SQL. Auto-increment is `GENERATED AS IDENTITY` or `SERIAL` against `IDENTITY(1,1)`. Postgres has native `JSONB`, arrays and `UUID`, while T-SQL has `NVARCHAR`, `UNIQUEIDENTIFIER` and JSON functions over text. Azure SQL is a managed SQL Server, and can authenticate apps with Entra ID managed identities instead of passwords.",
      body: [
        table(
          ["Task", "PostgreSQL", "Azure SQL (T-SQL)"],
          ["First 10 rows", "`LIMIT 10`", "`SELECT TOP 10` / `OFFSET 0 ROWS FETCH NEXT 10 ROWS ONLY`"],
          ["Auto id", "`id BIGINT GENERATED ALWAYS AS IDENTITY`", "`id BIGINT IDENTITY(1,1)`"],
          ["UUID", "`uuid` + `gen_random_uuid()`", "`UNIQUEIDENTIFIER` + `NEWID()`"],
          ["Now (UTC)", "`now()` (timestamptz)", "`SYSUTCDATETIME()`"],
          ["Upsert", "`INSERT ... ON CONFLICT DO UPDATE`", "`MERGE` (or update, then insert)"],
          ["String concat", "`||` or `concat()`", "`+` or `CONCAT()`"],
        ),
      ],
    },
  ],
};

export const SB_MONGO: PrepSection = {
  id: "sb-mongo",
  track: "data",
  title: "MongoDB and NoSQL",
  blurb: "'Basic NoSQL (MongoDB)': know when a document store fits, how to model documents, and how to read an aggregation pipeline.",
  questions: [
    {
      id: "sb-mongo-vs-sql",
      question: "SQL or MongoDB: how do you choose?",
      level: "junior",
      short:
        "Choose relational when the data is strongly related, needs joins and constraints, and has to be correct under concurrent writes: accounts, ledgers, positions. Choose a document store when each record is read and written as one self-contained unit with a shape that varies or changes often: an onboarding draft whose questions differ by account type, form configuration, or activity feeds. MongoDB has multi-document transactions, but designs that lean on them are fighting the model.",
      body: [
        table(
          ["", "PostgreSQL / Azure SQL", "MongoDB"],
          ["Schema", "Declared and enforced", "Flexible (optional JSON Schema validation)"],
          ["Relationships", "Foreign keys, joins", "Embedding or references; `$lookup`"],
          ["Transactions", "Core strength", "Supported, but costlier"],
          ["Scaling", "Mostly vertical; read replicas", "Horizontal sharding built in"],
          ["Fits", "Accounts, ledgers, KYC records", "Drafts, configs, content, event views"],
        ),
      ],
    },
    {
      id: "sb-mongo-modeling",
      question: "Embed or reference? Show an aggregation.",
      level: "intermediate",
      short:
        "Embed data that is read together and owned by the parent, as a draft owns its answers. Reference data that is shared, large, or grows without limit (a client has many transactions), because a document is capped at 16 MB. Index the fields you query on. An aggregation pipeline is a list of stages: `$match`, `$group`, `$sort`, `$project` and so on. Put `$match` early so it can use an index.",
      body: [
        js(`
// One onboarding draft per document: read and saved together
const draft = {
  _id: "app-123",
  clientId: "c-1",
  accountType: "TFSA",
  step: "employment",
  answers: { employer: "Acme", occupation: "Engineer", annualIncomeBand: "100-150k" },
  updatedAt: new Date("2026-11-20T15:00:00Z"),
};

// Drafts abandoned per step in the last 30 days: where do clients drop off?
const since = new Date(Date.now() - 30 * 24 * 3600 * 1000);
const pipeline = [
  { $match: { status: "DRAFT", updatedAt: { $gte: since } } },
  { $group: { _id: "$step", abandoned: { $sum: 1 } } },
  { $sort: { abandoned: -1 } },
];
// db.applications.aggregate(pipeline)
// db.applications.createIndex({ status: 1, updatedAt: -1 })
`),
        say("I'd keep the system of record relational and use a document store where the shape is genuinely flexible."),
      ],
    },
  ],
};
