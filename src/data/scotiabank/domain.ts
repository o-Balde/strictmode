import { list, p, table } from "../interview-prep/blocks";
import type { Fact } from "../codesignal";

/**
 * The wealth-onboarding domain in enough depth to talk about it credibly, with
 * what each rule means for the software. The rules come from the regulators'
 * own documents; the software consequences are this page's reasoning.
 */
export const DOMAIN: Fact[] = [
  {
    title: "Who GWE builds for",
    body: [
      p("Scotia Wealth Management brings together ScotiaMcLeod (full-service brokerage with investment advisors), Scotia Private Investment Counsel, private banking and trust services. It is the third-largest wealth business in Canada. Most onboarding is **advisor-assisted**: an advisor meets the client and opens accounts with them. The bank's priority is to make that 'streamlined', 'digital' and 'end-to-end', for clients and advisors alike."),
      table(
        ["Account", "What it is", "Onboarding wrinkle"],
        ["TFSA", "Tax-free savings account", "Minimum age is the age of majority, which is 18 or 19 depending on the province"],
        ["RRSP / RRIF", "Retirement savings / income", "A spouse can be named as beneficiary or annuitant; contribution room is tracked by CRA"],
        ["FHSA", "First Home Savings Account (since 2023)", "Eligibility: first-time home buyer, a resident, 18 or older"],
        ["RESP", "Education savings for a child", "A subscriber plus beneficiaries; government grants"],
        ["Non-registered (cash / margin)", "A taxable investment account", "A margin account adds a credit and suitability review"],
        ["Joint / corporate / trust", "Several holders, or an entity", "Several identities, beneficial ownership, signing authority"],
      ),
    ],
    confidence: "official",
    sources: ["ar-2024", "ar-2025"],
  },
  {
    title: "Know your client and suitability (CIRO and CSA Client Focused Reforms)",
    body: [
      list(
        "Collect enough KYC information: personal and financial circumstances, investment needs and objectives, knowledge, time horizon, and **risk tolerance and risk capacity, assessed separately**. The overall risk profile generally reflects the **lower** of the two.",
        "Document how the profile was derived, and get the **client's confirmation**.",
        "Update KYC at least every **12 months** for managed accounts and every **36 months** otherwise, and sooner after a significant change (job loss, retirement, divorce). A note saying only 'no changes' isn't enough.",
      ),
      table(
        ["Rule", "What it means for the software"],
        ["Tolerance and capacity are separate", "Two fields, plus a derived `overallRisk = min(tolerance, capacity)` stored with an explanation"],
        ["Client confirmation", "A `confirmedAt` timestamp and the channel (e-signature, advisor attestation) on each profile version"],
        ["Periodic updates", "A scheduler that emits a `KycReviewDue` event at 12 or 36 months; a `SignificantChangeReported` event reopens the review"],
        ["Evidence of a real interaction", "Versioned, append-only KYC records. Never overwrite; keep who changed what, when and why"],
        ["Questionnaire changes over time", "A versioned questionnaire and scoring rules, so an old profile can be explained against the rules in force at the time"],
      ),
    ],
    confidence: "official",
    sources: ["csa-ciro-31-368"],
  },
  {
    title: "Verifying identity (FINTRAC)",
    body: [
      list(
        "**Government photo ID.** For a remote client, technology must authenticate the document, and a live video or selfie must match the face to it. Just seeing someone on video isn't enough.",
        "**Credit file.** A Canadian credit bureau file at least three years old.",
        "**Dual-process.** Two independent, reliable sources confirming name and address, name and date of birth, or name and a financial account.",
        "**Reliance on an affiliate or another regulated entity**, under a written agreement.",
      ),
      p("For each method you must record what was used: the document type, number, issuing jurisdiction and expiry, or the bureau and file number, plus the date of verification. **The software stores evidence, not a boolean.** Identity vendors' callbacks need signature verification and idempotent handling, because they will be retried."),
    ],
    confidence: "official",
    sources: ["fintrac-id"],
  },
  {
    title: "Screening, records and retention",
    body: [
      list(
        "Determine whether the client is a **politically exposed person** (PEP) or a head of an international organization, screen against **sanctions** lists, and ask whether they act **on behalf of a third party**. For corporations and trusts, capture **beneficial ownership**.",
        "Keep the account records: the application, the operating agreement, a signature record for each authorized person, and the **intended use of the account**.",
        "Keep most records for **at least five years after the account closes** (not after it opens), and be able to produce them for the regulator quickly.",
      ),
      p("In code, this becomes steps in the onboarding state machine (screening, third-party determination, beneficial owners), e-signature artifacts stored with a hash and a signing log, and a retention policy keyed on the account's closure date."),
    ],
    confidence: "official",
    sources: ["fintrac-records", "fintrac-pep"],
  },
  {
    title: "OSFI B-13 and B-10: rules a developer feels",
    body: [
      table(
        ["Expectation", "How it shows up in your day"],
        ["Security built into the SDLC, Agile included", "Threat-model the feature; security stories in the backlog"],
        ["No single person develops, approves and deploys a change", "PR review by someone else; pipeline approvals; change tickets"],
        ["Static and/or dynamic scans before release", "Fortify and BlackDuck findings block the merge until fixed"],
        ["Privileged credentials in a vault; least privilege", "Key Vault or Secret Manager, managed identities, no shared passwords"],
        ["Strong cryptography and key management", "TLS everywhere, encryption at rest, keys rotated by the platform"],
        ["Centralised logging; root-cause analysis after incidents", "Structured logs to Splunk; blameless post-mortems"],
        ["B-10: cloud concentration and exit plans", "Portable containers, Terraform, no unnecessary lock-in"],
      ),
    ],
    confidence: "official",
    sources: ["osfi-b13", "osfi-b10"],
  },
  {
    title: "The account-opening flow, end to end",
    body: [
      table(
        ["State", "Entered when", "Event published"],
        ["`DRAFT`", "The client or advisor starts; saved after every step", "none (drafts stay inside the service)"],
        ["`SUBMITTED`", "An idempotent submit passes server validation", "`ApplicationSubmitted`"],
        ["`ID_VERIFIED`", "The identity method succeeds, with its evidence stored", "`IdentityVerified`"],
        ["`SCREENED`", "Sanctions and PEP screening clear, or a human clears a match", "`ScreeningCompleted`"],
        ["`IN_REVIEW`", "Suitability or compliance review is needed (margin, a PEP, a mismatch)", "`ReviewRequested`"],
        ["`SIGNED`", "Agreements are e-signed", "`AgreementsSigned`"],
        ["`OPEN`", "The book-of-record system creates the account", "`AccountOpened`"],
        ["`REJECTED` / `WITHDRAWN`", "Any step fails for good, or the client stops", "`ApplicationClosed`"],
      ),
      list(
        "Each transition is checked on the server (allowed from the current state, and by this user's role), written to an audit record, and published through a **transactional outbox**.",
        "Downstream consumers (CRM, statements, the welcome email, analytics) are **idempotent**, keyed on `eventId`.",
        "Book-of-record and vendor calls are slow and sometimes run in batches. Use asynchronous commands with correlation ids, retries with backoff, dead-letter topics, and a manual-review queue as the fallback.",
        "Advisor 'on behalf of' actions carry both identities in the token and in the audit trail.",
      ),
    ],
    confidence: "inferred",
    sources: [],
  },
  {
    title: "Privacy, language and accessibility",
    body: [
      list(
        "**Privacy:** PIPEDA federally, plus Quebec's Law 25 for Quebec residents. Collect only what the purpose needs, get consent, control access to sensitive fields (SIN, date of birth, income, ID images), and keep data for a limited time.",
        "**Language:** clients are served in English and French. Every label, error and email needs both, so build on i18n from the first commit.",
        "**Accessibility:** the bank's 2026–2029 plan commits to WCAG 2.1 AA and EN 301 549. For a wizard that means labels, an error summary, focus management between steps, no timeouts without a warning, and no CAPTCHA-only gates.",
      ),
    ],
    confidence: "official",
    sources: ["accessibility-plan"],
  },
  {
    title: "Worth a sentence: open banking",
    body: [
      p("Canada's consumer-driven banking framework, confirmed in Budget 2025 with the Bank of Canada as overseer, starts with clients sharing their data through accredited, standardised APIs, and moves later to 'write' access such as payment initiation. For onboarding, that could eventually mean clients pre-filling applications with verified data from another institution. It's a good forward-looking point for 'where is this heading?'."),
    ],
    confidence: "official",
    sources: ["cdb-finance"],
  },
];
