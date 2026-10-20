import type { BankingSystem } from "../contract";

/**
 * BANKING SYSTEM: reference solution, all four levels.
 *
 * Every public method starts with `settle(timestamp)`, from Level 1 on, even
 * though nothing is pending until Level 3. And every balance change goes
 * through `setBalance`, which appends to a history, even though nothing reads
 * it until Level 4. Two private methods written early, and the last two
 * levels add features instead of rewriting the class.
 */
const CASHBACK_DELAY = 86_400_000;
const CASHBACK_RATE = 0.02;

interface Account {
  balance: number;
  outgoing: number;
}

interface Payment {
  accountId: string;
  cashbackReceived: boolean;
}

interface PendingCashback {
  dueAt: number;
  accountId: string;
  amount: number;
  paymentId: string;
}

/** Balance after each change; null marks the moment the id stopped existing. */
type History = { at: number; balance: number | null }[];

export class BankingSystemImpl implements BankingSystem {
  private accounts = new Map<string, Account>();
  private payments = new Map<string, Payment>();
  /** Kept in due order: payments are made in time order and the delay is fixed. */
  private pending: PendingCashback[] = [];
  private history = new Map<string, History>();
  private paymentCount = 0;

  createAccount(timestamp: number, accountId: string): boolean {
    this.settle(timestamp);
    if (this.accounts.has(accountId)) return false;
    this.accounts.set(accountId, { balance: 0, outgoing: 0 });
    this.record(accountId, timestamp, 0);
    return true;
  }

  deposit(timestamp: number, accountId: string, amount: number): number | null {
    this.settle(timestamp);
    const account = this.accounts.get(accountId);
    if (!account) return null;
    return this.setBalance(accountId, account, account.balance + amount, timestamp);
  }

  transfer(timestamp: number, sourceAccountId: string, targetAccountId: string, amount: number): number | null {
    this.settle(timestamp);
    if (sourceAccountId === targetAccountId) return null;
    const source = this.accounts.get(sourceAccountId);
    const target = this.accounts.get(targetAccountId);
    if (!source || !target || source.balance < amount) return null;

    source.outgoing += amount;
    this.setBalance(targetAccountId, target, target.balance + amount, timestamp);
    return this.setBalance(sourceAccountId, source, source.balance - amount, timestamp);
  }

  topSpenders(timestamp: number, n: number): string[] {
    this.settle(timestamp);
    return [...this.accounts]
      .sort(([idA, a], [idB, b]) => b.outgoing - a.outgoing || (idA < idB ? -1 : idA > idB ? 1 : 0))
      .slice(0, n)
      .map(([id, account]) => `${id}(${account.outgoing})`);
  }

  pay(timestamp: number, accountId: string, amount: number): string | null {
    this.settle(timestamp);
    const account = this.accounts.get(accountId);
    if (!account || account.balance < amount) return null;

    account.outgoing += amount;
    this.setBalance(accountId, account, account.balance - amount, timestamp);

    this.paymentCount += 1;
    const paymentId = `payment${this.paymentCount}`;
    this.payments.set(paymentId, { accountId, cashbackReceived: false });
    this.pending.push({
      dueAt: timestamp + CASHBACK_DELAY,
      accountId,
      amount: Math.floor(amount * CASHBACK_RATE),
      paymentId,
    });
    return paymentId;
  }

  getPaymentStatus(timestamp: number, accountId: string, payment: string): string | null {
    this.settle(timestamp);
    const record = this.payments.get(payment);
    if (!this.accounts.has(accountId) || !record || record.accountId !== accountId) return null;
    return record.cashbackReceived ? "CASHBACK_RECEIVED" : "IN_PROGRESS";
  }

  mergeAccounts(timestamp: number, accountId1: string, accountId2: string): boolean {
    this.settle(timestamp);
    if (accountId1 === accountId2) return false;
    const keep = this.accounts.get(accountId1);
    const absorb = this.accounts.get(accountId2);
    if (!keep || !absorb) return false;

    keep.outgoing += absorb.outgoing;
    this.setBalance(accountId1, keep, keep.balance + absorb.balance, timestamp);

    for (const payment of this.payments.values()) {
      if (payment.accountId === accountId2) payment.accountId = accountId1;
    }
    for (const cashback of this.pending) {
      if (cashback.accountId === accountId2) cashback.accountId = accountId1;
    }

    this.accounts.delete(accountId2);
    this.record(accountId2, timestamp, null);
    return true;
  }

  getBalance(timestamp: number, accountId: string, timeAt: number): number | null {
    this.settle(timestamp);
    const changes = this.history.get(accountId) ?? [];
    let balance: number | null = null;
    for (const change of changes) {
      if (change.at > timeAt) break;
      balance = change.balance;
    }
    return balance;
  }

  /** Credits every cashback due at or before `timestamp`, at the moment it fell due. */
  private settle(timestamp: number) {
    while (this.pending.length > 0 && this.pending[0].dueAt <= timestamp) {
      const cashback = this.pending.shift()!;
      const account = this.accounts.get(cashback.accountId);
      if (account) this.setBalance(cashback.accountId, account, account.balance + cashback.amount, cashback.dueAt);
      const payment = this.payments.get(cashback.paymentId);
      if (payment) payment.cashbackReceived = true;
    }
  }

  private setBalance(accountId: string, account: Account, balance: number, at: number): number {
    account.balance = balance;
    this.record(accountId, at, balance);
    return balance;
  }

  private record(accountId: string, at: number, balance: number | null) {
    const changes = this.history.get(accountId);
    if (changes) changes.push({ at, balance });
    else this.history.set(accountId, [{ at, balance }]);
  }
}
