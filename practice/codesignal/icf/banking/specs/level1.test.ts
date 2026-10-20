import { describe, expect, it } from "vitest";
import { BankingSystemImpl } from "../src/simulation";

describe("Level 1: accounts, deposits, transfers", () => {
  it("creates an account once", () => {
    const bank = new BankingSystemImpl();
    expect(bank.createAccount(1, "acc1")).toBe(true);
    expect(bank.createAccount(2, "acc1")).toBe(false);
    expect(bank.createAccount(3, "acc2")).toBe(true);
  });

  it("deposits into an existing account and returns the new balance", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    expect(bank.deposit(2, "acc1", 500)).toBe(500);
    expect(bank.deposit(3, "acc1", 250)).toBe(750);
    expect(bank.deposit(4, "ghost", 100)).toBeNull();
  });

  it("transfers and returns the source's new balance", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc1", 1000);

    expect(bank.transfer(4, "acc1", "acc2", 300)).toBe(700);
    expect(bank.deposit(5, "acc2", 0)).toBe(300);
  });

  it("allows a transfer of the whole balance", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc1", 100);
    expect(bank.transfer(4, "acc1", "acc2", 100)).toBe(0);
  });

  it("refuses transfers that cannot happen, changing nothing", () => {
    const bank = new BankingSystemImpl();
    bank.createAccount(1, "acc1");
    bank.createAccount(2, "acc2");
    bank.deposit(3, "acc1", 100);

    expect(bank.transfer(4, "acc1", "acc1", 10)).toBeNull();
    expect(bank.transfer(5, "acc1", "ghost", 10)).toBeNull();
    expect(bank.transfer(6, "ghost", "acc1", 10)).toBeNull();
    expect(bank.transfer(7, "acc1", "acc2", 101)).toBeNull();
    expect(bank.deposit(8, "acc1", 0)).toBe(100);
    expect(bank.deposit(9, "acc2", 0)).toBe(0);
  });
});
