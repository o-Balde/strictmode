import type { BankingSystem } from "../contract";

/**
 * BANKING SYSTEM: your workspace (Industry Coding Framework, TypeScript).
 *
 * Read contract.ts for each method's rules. Implement Level 1 first, run its
 * specs, then move on. Design Level 1 knowing that payments, merges and
 * balance history are coming: the earlier the data model can hold them, the
 * less you rewrite later.
 *
 *   npm run level -- banking 1
 */
export class BankingSystemImpl implements BankingSystem {
  createAccount(timestamp: number, accountId: string): boolean {
    return false;
  }

  deposit(timestamp: number, accountId: string, amount: number): number | null {
    return null;
  }

  transfer(timestamp: number, sourceAccountId: string, targetAccountId: string, amount: number): number | null {
    return null;
  }

  topSpenders(timestamp: number, n: number): string[] {
    return [];
  }

  pay(timestamp: number, accountId: string, amount: number): string | null {
    return null;
  }

  getPaymentStatus(timestamp: number, accountId: string, payment: string): string | null {
    return null;
  }

  mergeAccounts(timestamp: number, accountId1: string, accountId2: string): boolean {
    return false;
  }

  getBalance(timestamp: number, accountId: string, timeAt: number): number | null {
    return null;
  }
}
