import { describe, expect, it } from "vitest";
import { BankingSystemImpl } from "../src/simulation";

const DAY = 86_400_000;

describe("Level 4: merging and balance history", () => {
  it("combines balances and spending, and retires the second id", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.createAccount(3, "acc3");
    bank.deposit(4, "acc1", 500);
    bank.deposit(5, "acc2", 700);
    bank.transfer(6, "acc2", "acc3", 200);

    expect(bank.mergeAccounts(7, "acc1", "acc2")).toBe(true);
    expect(bank.deposit(8, "acc1", 0)).toBe(1000);
    expect(bank.deposit(9, "acc2", 10)).toBeNull();
    expect(bank.topSpenders(10, 1)).toEqual(["acc1(200)"]);
  });

  it("refuses merges that cannot happen", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    expect(bank.mergeAccounts(2, "acc1", "acc1")).toBe(false);
    expect(bank.mergeAccounts(3, "acc1", "ghost")).toBe(false);
    expect(bank.mergeAccounts(4, "ghost", "acc1")).toBe(false);
  });

  it("moves payments and their pending cashback to the surviving account", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc2", 1000);
    bank.pay(10, "acc2", 1000); // cashback 20 due at 10 + DAY
    bank.mergeAccounts(20, "acc1", "acc2");

    expect(bank.getPaymentStatus(30, "acc1", "payment1")).toBe("IN_PROGRESS");
    expect(bank.getPaymentStatus(31, "acc2", "payment1")).toBeNull();
    expect(bank.deposit(10 + DAY, "acc1", 0)).toBe(20);
    expect(bank.getPaymentStatus(10 + DAY + 1, "acc1", "payment1")).toBe("CASHBACK_RECEIVED");
  });

  it("lets a merged-away id be created again, from zero", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc2", 50);
    bank.mergeAccounts(4, "acc1", "acc2");

    expect(bank.createAccount(5, "acc2")).toBe(true);
    expect(bank.deposit(6, "acc2", 0)).toBe(0);
  });

  it("answers what the balance was at any earlier moment", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(10, "acc1");
    bank.deposit(20, "acc1", 100);
    bank.deposit(30, "acc1", 50);
    bank.createAccount(31, "acc2");
    bank.transfer(40, "acc1", "acc2", 120);

    expect(bank.getBalance(50, "acc1", 5)).toBeNull();
    expect(bank.getBalance(51, "acc1", 10)).toBe(0);
    expect(bank.getBalance(52, "acc1", 25)).toBe(100);
    expect(bank.getBalance(53, "acc1", 30)).toBe(150);
    expect(bank.getBalance(54, "acc1", 40)).toBe(30);
    expect(bank.getBalance(55, "acc2", 39)).toBe(0);
  });

  it("places cashback in history when it fell due, not when it was noticed", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.deposit(2, "acc1", 1000);
    bank.pay(100, "acc1", 1000);

    const later = 100 + 3 * DAY;
    expect(bank.getBalance(later, "acc1", 100 + DAY - 1)).toBe(0);
    expect(bank.getBalance(later + 1, "acc1", 100 + DAY)).toBe(20);
  });

  it("remembers a merged-away account until the merge, then nothing, then its new life", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc2", 70);
    bank.mergeAccounts(10, "acc1", "acc2");
    bank.createAccount(20, "acc2");

    expect(bank.getBalance(30, "acc2", 9)).toBe(70);
    expect(bank.getBalance(31, "acc2", 10)).toBeNull();
    expect(bank.getBalance(32, "acc2", 15)).toBeNull();
    expect(bank.getBalance(33, "acc2", 20)).toBe(0);
    expect(bank.getBalance(34, "acc1", 10)).toBe(70);
  });
});
