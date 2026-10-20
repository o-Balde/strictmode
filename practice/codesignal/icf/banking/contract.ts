/**
 * Banking system. Every call carries a `timestamp` in milliseconds; timestamps
 * strictly increase from one call to the next. Amounts are whole numbers.
 * Implement the levels in order and do not change these signatures.
 */
export interface BankingSystem {
  // ── Level 1: accounts, deposits, transfers ───────────────────────────────
  /** Creates an empty account. False if the id is already taken. */
  createAccount(timestamp: number, accountId: string): boolean;
  /** Adds money. The new balance, or null if the account does not exist. */
  deposit(timestamp: number, accountId: string, amount: number): number | null;
  /**
   * Moves money between two accounts. The source's new balance, or null when
   * either account is missing, both ids are the same, or the source cannot
   * cover the amount.
   */
  transfer(timestamp: number, sourceAccountId: string, targetAccountId: string, amount: number): number | null;

  // ── Level 2: ranking ─────────────────────────────────────────────────────
  /**
   * The `n` accounts that spent the most, as `"accountId(outgoing)"`.
   * Outgoing = successful transfers out + successful payments (Level 3).
   * Highest first; ties by account id ascending. Fewer than n accounts →
   * all of them. Accounts that spent nothing are included with (0).
   */
  topSpenders(timestamp: number, n: number): string[];

  // ── Level 3: payments with cashback ──────────────────────────────────────
  /**
   * Withdraws `amount`. Returns a payment id, "payment1", "payment2", ...
   * numbered across the whole system and counting successful payments only, or
   * null when the account is missing or cannot cover the amount. 2% of the amount, rounded down, is credited back
   * to the account at `timestamp + 86_400_000` (24 h). Cashback that falls due
   * at or before a call's timestamp is credited before that call does anything.
   */
  pay(timestamp: number, accountId: string, amount: number): string | null;
  /**
   * "IN_PROGRESS" until the payment's cashback is credited, then
   * "CASHBACK_RECEIVED". Null when the account does not exist, the payment does
   * not exist, or the payment belongs to a different account.
   */
  getPaymentStatus(timestamp: number, accountId: string, payment: string): string | null;

  // ── Level 4: merging and history ─────────────────────────────────────────
  /**
   * Folds account 2 into account 1: balance, outgoing total, payments and
   * pending cashback all move to account 1, and account 2 stops existing (its
   * id may be created again later). False when the ids are equal or either is
   * missing.
   */
  mergeAccounts(timestamp: number, accountId1: string, accountId2: string): boolean;
  /**
   * The balance `accountId` had at `timeAt` (after everything that happened at
   * `timeAt`), where timeAt <= timestamp. Null if no account had that id then.
   */
  getBalance(timestamp: number, accountId: string, timeAt: number): number | null;
}
