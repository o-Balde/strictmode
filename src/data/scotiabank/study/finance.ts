import { concept, java, js, json, output, pair, qa, sql, table, trap } from "./authoring";
import type { StudyTopic } from "./types";

export const FINANCE: StudyTopic = {
  id: "finance",
  short: "Financial services",
  title: "The financial services domain",
  jd: "Understanding of the financial services domain (asset)",
  weight: "asset",
  summary:
    "GWE builds client and account onboarding for Scotia Wealth Management, which means identity verification, know-your-client rules, suitability, document handling, approvals and audit. The posting lists domain knowledge as an asset. Being able to say why money is never a `double`, why every payment endpoint is idempotent, and what KYC means for a form and a database sets an entry-level answer apart.",
  concepts: [
    concept("Client onboarding in wealth management", "Turning a prospect into a client with an account: collect identity and personal details, verify identity, complete the know-your-client profile, check suitability, sign agreements and disclosures, screen against sanctions and politically exposed persons lists, get approvals, open and fund the account."),
    concept("Know your client (KYC)", "Registered firms must know each client's identity, financial circumstances, investment knowledge, investment needs and objectives, risk profile and time horizon (Canada's NI 31-103 and CIRO rules), keep it current, and use it to judge whether every recommendation is **suitable**."),
    concept("Anti-money laundering and FINTRAC", "Under Canada's proceeds of crime law, firms must verify clients' identity by approved methods, keep records (generally for at least five years), screen for sanctions, and report suspicious transactions and large cash transactions of $10,000 or more to FINTRAC."),
    concept("Banking regulators: OSFI B-13 and B-10", "OSFI, the federal regulator of banks, sets expectations for technology and cyber risk (Guideline B-13, in force since January 2024: secure development, change management, resilience) and for third-party risk (B-10: cloud and vendor arrangements)."),
    concept("Privacy and personal information", "Federal privacy law (PIPEDA), and Quebec's Law 25 for Quebec residents, require consent, purpose limitation and safeguards for personal information. For developers: collect only what's needed, encrypt it, restrict access, keep it out of logs, and honour retention and deletion rules."),
    concept("Money as exact decimals", "Binary floating point (`double`, JavaScript `number`) can't represent amounts like 0.10 exactly, so totals drift. Use `BigDecimal` in Java, `numeric`/`decimal` in SQL, `Decimal128` in MongoDB, or integer minor units (cents); round only at defined points, with a stated rounding mode."),
    concept("Currencies", "Store the currency with every amount (ISO 4217 codes such as `CAD`, `USD`), never add amounts in different currencies, and know each currency's minor units: CAD has two decimals, JPY none. Exchange happens at a recorded rate and time."),
    concept("Idempotency", "Networks time out and clients retry, so every operation that moves money or creates something must be safe to repeat: the client sends an idempotency key, and the server records it atomically with the result, returning the original result on a retry."),
    concept("Double-entry ledger", "Every transaction is recorded as balanced entries, at least one debit and one credit, that sum to zero across accounts. Entries are append-only: a mistake is corrected with a reversing entry, never by editing history. Balances are derived from entries, or checked against them."),
    concept("Reconciliation", "Regularly comparing two records of the same thing (the ledger against the custodian, or the bank's records against a partner's file) and investigating breaks. Systems are designed to make reconciliation possible: stable IDs, timestamps, totals."),
    concept("Audit trails", "A tamper-evident, append-only record of who did what, to which record, when, from where, and why, including the before and after values. Kept for the required retention period and protected from the people it audits."),
    concept("Maker-checker and segregation of duties", "Sensitive actions need two people: one prepares (maker), another approves (checker), and the system enforces that they differ. Similarly, developers can't deploy their own unreviewed code to production or read production client data at will."),
    concept("Settlement", "Trading a security and settling it (exchanging the cash and the security) are separate steps. Canada and the US moved to **T+1** settlement, one business day after the trade, in May 2024. Systems track pending versus settled states."),
    concept("PCI DSS", "The card industry's data security standard (version 4.0.1). Reduce its scope by not handling card numbers at all: use a payment provider's hosted fields or tokens, never store the security code, and encrypt and segment anything in scope."),
    concept("Canadian account types", "Non-registered accounts, plus registered ones with tax rules and contribution limits: **RRSP** (retirement, tax-deferred), **TFSA** (tax-free savings), **FHSA** (first home, since 2023), **RESP** (education), and **RRIF** (retirement income). Onboarding logic varies by type: eligibility, beneficiaries, limits."),
    concept("Resilience: RTO and RPO", "**Recovery time objective**: how long a service may be down. **Recovery point objective**: how much data may be lost, measured in time. Critical banking systems have tight targets, met with multi-zone deployments, replicated databases and tested failover."),
  ],
  parts: [
    {
      id: "finance-money",
      title: "Money in code",
      blocks: [
        js(`
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

// integer minor units are exact
const pricesInCents = [10, 20];
const totalCents = pricesInCents.reduce((sum, cents) => sum + cents, 0);
console.log(totalCents === 30, (totalCents / 100).toFixed(2));

// format only at the edge, for display
console.log(new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(1234567.891));
`, { caption: "Why amounts are never plain JavaScript numbers" }),
        output(`
0.30000000000000004
false
true 0.30
$1,234,567.89
`),
        sql(`
CREATE TABLE ledger_entries (
  id          bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  journal_id  uuid NOT NULL,             -- groups the legs of one transaction
  account_id  text NOT NULL,
  amount      numeric(14, 2) NOT NULL CHECK (amount <> 0), -- into the account positive, out negative
  currency    char(3) NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- a $250 transfer from chequing to a TFSA: two legs that sum to zero, committed together
BEGIN;
INSERT INTO ledger_entries (journal_id, account_id, amount, currency) VALUES
  ('0193f6a2-7c1e-7d4b-9a1f-3c2b5e8d4f10', 'tfsa-42', 250.00, 'CAD'),
  ('0193f6a2-7c1e-7d4b-9a1f-3c2b5e8d4f10', 'chequing-42', -250.00, 'CAD');
COMMIT;

-- a control that must always return no rows
SELECT journal_id FROM ledger_entries GROUP BY journal_id, currency HAVING SUM(amount) <> 0;
`, { caption: "An append-only ledger: balances come from entries, and every journal balances" }),
        sql(`
CREATE TABLE idempotency_keys (
  key           text PRIMARY KEY,
  request_hash  text NOT NULL,   -- the same key with a different body is a client bug: reject it
  status        text NOT NULL,   -- IN_PROGRESS or DONE
  response      jsonb,           -- stored when the request completes
  created_at    timestamptz NOT NULL DEFAULT now()
);
-- 1. insert the key in the same transaction as the payment; a conflict means 'seen before'
-- 2. seen and DONE: return the stored response; seen and IN_PROGRESS: answer 409 and retry later
-- 3. delete keys after a retention window, such as 24 hours
`, { caption: "Idempotency keys for a payment API" }),
        json(`
{
  "eventId": "0193f6a2-8d40-7a11-b2c5-6e7f8a9b0c1d",
  "occurredAt": "2026-11-27T15:42:08.311Z",
  "actor": { "type": "employee", "id": "e-48213", "role": "advisor" },
  "action": "KYC_PROFILE_UPDATED",
  "subject": { "type": "client", "id": "c-90211" },
  "changes": { "riskTolerance": { "from": "MEDIUM", "to": "HIGH" } },
  "reason": "Annual KYC review",
  "correlationId": "req-7f3c9a",
  "source": { "service": "onboarding-api", "ip": "10.20.4.17" }
}
`, { caption: "An audit event: who, what, to what, when, why, before and after, and no unnecessary personal data" }),
        trap("Logging the whole request body to debug onboarding puts social insurance numbers, dates of birth and ID images into Splunk. Log IDs and outcomes; mask or omit personal data."),
      ],
    },
    {
      id: "finance-before-after",
      title: "Before and after",
      pairs: [
        pair("`double` to `BigDecimal`", "Java's `BigDecimal`", "Build from strings (`new BigDecimal(\"0.10\")`), not from doubles, which carry the binary error in. Choose the rounding mode deliberately: banker's rounding (`HALF_EVEN`) avoids bias over many operations. Compare with `compareTo`, since `equals` also compares scale.", {
          before: java(`
double balance = 0.10 + 0.20;            // 0.30000000000000004
double interest = balance * 0.0325;      // and the error compounds
`),
          after: java(`
BigDecimal balance = new BigDecimal("0.10").add(new BigDecimal("0.20")); // 0.30, exactly
BigDecimal interest = balance.multiply(new BigDecimal("0.0325"))
        .setScale(2, RoundingMode.HALF_EVEN);
boolean same = balance.compareTo(new BigDecimal("0.3")) == 0;            // true
`),
        }),
        pair("Editing a balance to recording entries", "Double-entry bookkeeping", "Overwriting a balance loses the history, races under concurrency, and can't be reconciled. Ledger entries are an append-only record from which any balance at any moment can be recomputed and audited.", {
          before: sql(`
UPDATE accounts SET balance = balance - 250.00 WHERE id = 'chequing-42';
UPDATE accounts SET balance = balance + 250.00 WHERE id = 'tfsa-42';
-- why did it change, who did it, and what was it yesterday?
`),
          after: sql(`
INSERT INTO ledger_entries (journal_id, account_id, amount, currency) VALUES
  ('0193f6a2-7c1e-7d4b-9a1f-3c2b5e8d4f10', 'chequing-42', -250.00, 'CAD'),
  ('0193f6a2-7c1e-7d4b-9a1f-3c2b5e8d4f10', 'tfsa-42', 250.00, 'CAD');

SELECT SUM(amount) AS balance FROM ledger_entries WHERE account_id = 'tfsa-42';
`),
        }),
      ],
    },
    {
      id: "finance-rules",
      title: "The rules, and what they mean for the code",
      blocks: [
        table(
          ["Rule", "Who", "What it means in the code"],
          ["Know your client and suitability (NI 31-103, CIRO rules)", "Securities regulators, CIRO", "Required, validated KYC fields; versioned profiles; periodic review dates; recommendations checked against the profile"],
          ["Identity verification, records, reporting (PCMLTFA)", "FINTRAC", "Approved ID methods recorded with source and date; records kept at least five years; sanctions and PEP screening; alerts feeding reports"],
          ["Technology and cyber risk (Guideline B-13)", "OSFI", "Secure SDLC, scanning, change approval, access control, logging and monitoring, tested recovery"],
          ["Third-party and cloud risk (Guideline B-10)", "OSFI", "Vendor and cloud services assessed, contracts and exit plans, data location known"],
          ["Privacy (PIPEDA, Quebec Law 25)", "Privacy commissioners", "Consent captured and stored, minimal data, encryption, access logs, retention and deletion"],
          ["Card data (PCI DSS 4.0.1)", "Card brands", "No card numbers in your systems if avoidable: hosted fields and tokens"],
        ),
      ],
    },
  ],
  questions: [
    qa("Why shouldn't you use `float` or `double` for money?", "They're binary floating point, so most decimal fractions can't be represented exactly: `0.1 + 0.2` is `0.30000000000000004`, and errors accumulate across interest and totals. Use `BigDecimal` with explicit scale and rounding, `numeric` columns, or integer cents."),
    qa("What is idempotency, and why does it matter in payments?", "An idempotent operation has the same effect whether it runs once or many times. Payment requests are retried after timeouts, so without it a client can be charged twice. The client sends a unique key; the server records it atomically with the payment and returns the stored result on a repeat."),
    qa("What is double-entry bookkeeping?", "Every transaction is recorded as at least two entries, debits and credits, that balance to zero, so money is never created or lost by a bug without the books showing it. Entries are immutable; corrections are new reversing entries; balances are sums of entries."),
    qa("How do you prevent a client from withdrawing the same money twice?", "In the database: a conditional update or row lock inside a transaction, so two withdrawals can't both see the old balance; an idempotency key so a retried request isn't a second withdrawal; and a ledger that a reconciliation job checks. Tests should cover concurrent requests."),
    qa("What is KYC, and how does it affect onboarding software?", "Know your client: the firm must collect and keep current each client's identity, financial situation, investment knowledge, objectives, risk profile and time horizon, and use them to assess suitability. In software: required and validated fields, versioned profiles with review dates, audit of every change, and checks before an account or trade proceeds."),
    qa("What is AML, and who is FINTRAC?", "Anti-money laundering: the controls that stop criminals using the financial system, such as verifying identity, screening against sanctions and politically exposed persons lists, monitoring transactions and reporting suspicious ones. FINTRAC is Canada's financial intelligence unit, which receives those reports and supervises compliance."),
    qa("What should an audit log contain?", "Who (the authenticated user or service), what action, on which record, when (UTC), from where, why if there's a reason, and the before and after values, with a correlation ID. Append-only, tamper-evident, access controlled, and retained as required, without unnecessary personal data."),
    qa("How do you handle personal data in logs and test environments?", "Log identifiers and outcomes, never full requests with SINs, dates of birth or ID images; mask what must appear. Test environments use synthetic or properly masked data, not production copies. Access to production data is restricted, approved and logged."),
    qa("What is maker-checker?", "A control where one person initiates a sensitive change (a large transfer, a limit change, an override) and a different, authorised person approves it before it takes effect. The system enforces the two roles and records both."),
    qa("What does T+1 mean?", "Trades settle one business day after the trade date: cash and securities change hands then. Canada and the US moved from T+2 to T+1 in May 2024. Systems show pending and settled positions separately and must process trades faster."),
    qa("How does PCI DSS affect a web app taking card payments?", "It sets security requirements for any system that stores, processes or transmits card data. The best design keeps card numbers out of your systems entirely: the payment provider's hosted fields send them straight to the provider, and you store only a token. Never store the CVV."),
    qa("Why do banks favour correctness and auditability over speed?", "A wrong balance, a lost transaction or an unexplained change causes direct financial harm, regulatory penalties and lost trust, while a few hundred milliseconds rarely matters. So designs lean on transactions, idempotency, immutable records and reconciliation, and optimise within those constraints."),
    qa("What are RTO and RPO?", "The recovery time objective is how quickly a service must be restored after a failure; the recovery point objective is how much recent data may be lost, as a time window. They drive the architecture: zone redundancy, database replication, backups and rehearsed failover."),
    qa("What would you check before opening an account in code?", "That the identity verification passed and is recorded, the KYC profile is complete and current, sanctions and PEP screening came back clear or were reviewed, the account type's eligibility rules pass (age, residency, contribution room), the agreements were accepted, and required approvals exist, each step audited and safe to retry."),
  ],
  news: [
    { text: "OSFI's Guideline B-13 on technology and cyber risk management has applied to federally regulated banks since 1 January 2024.", url: "https://www.osfi-bsif.gc.ca/en/guidance/guidance-library/technology-cyber-risk-management" },
  ],
  docs: [
    { label: "FINTRAC guidance for securities dealers", url: "https://fintrac-canafe.canada.ca/re-ed/sec-eng" },
    { label: "CIRO, the investment industry regulator", url: "https://www.ciro.ca/" },
    { label: "PCI Security Standards Council document library", url: "https://www.pcisecuritystandards.org/document_library/" },
    { label: "ISO 20022 financial messaging", url: "https://www.iso20022.org/" },
  ],
  bank: ["domain", "sb-design"],
};
