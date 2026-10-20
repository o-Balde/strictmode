import { describe, expect, it } from "vitest";
import { BankingSystemImpl } from "../src/simulation";

const DAY = 86_400_000;

function withMoney() {
  const bank = new BankingSystemImpl();
  bank.createAccount(1, "acc1");
  bank.createAccount(2, "acc2");
  bank.deposit(3, "acc1", 10_000);
  bank.deposit(4, "acc2", 10_000);
  return bank;
}

describe("Level 3: payments with cashback", () => {
  it("numbers successful payments across the whole system", () => {
    const bank = withMoney();
    expect(bank.pay(10, "acc1", 999_999)).toBeNull();
    expect(bank.pay(11, "ghost", 10)).toBeNull();
    expect(bank.pay(12, "acc1", 100)).toBe("payment1");
    expect(bank.pay(13, "acc2", 100)).toBe("payment2");
    expect(bank.pay(14, "acc1", 100)).toBe("payment3");
  });

  it("withdraws the amount and counts it as spending", () => {
    const bank = withMoney();
    bank.pay(10, "acc1", 1000);
    expect(bank.deposit(11, "acc1", 0)).toBe(9000);
    expect(bank.topSpenders(12, 1)).toEqual(["acc1(1000)"]);
  });

  it("credits 2% cashback exactly 24 hours later, not before", () => {
    const bank = withMoney();
    bank.pay(100, "acc1", 1000);

    expect(bank.deposit(100 + DAY - 1, "acc1", 0)).toBe(9000);
    expect(bank.getPaymentStatus(100 + DAY - 1, "acc1", "payment1")).toBe("IN_PROGRESS");
    expect(bank.deposit(100 + DAY, "acc1", 0)).toBe(9020);
    expect(bank.getPaymentStatus(100 + DAY + 1, "acc1", "payment1")).toBe("CASHBACK_RECEIVED");
  });

  it("credits cashback before anything else at its timestamp", () => {
    const bank = withMoney();
    bank.pay(100, "acc1", 9500); // leaves 500; cashback 190 due at 100 + DAY
    expect(bank.transfer(100 + DAY, "acc1", "acc2", 690)).toBe(0);
  });

  it("rounds cashback down", () => {
    const bank = withMoney();
    bank.pay(100, "acc1", 149); // 2.98 → 2
    expect(bank.deposit(100 + DAY, "acc1", 0)).toBe(10_000 - 149 + 2);
  });

  it("does not count cashback as spending or as negative spending", () => {
    const bank = withMoney();
    bank.pay(100, "acc1", 1000);
    expect(bank.topSpenders(100 + DAY + 5, 1)).toEqual(["acc1(1000)"]);
  });

  it("only reports a payment to the account that made it", () => {
    const bank = withMoney();
    bank.pay(10, "acc1", 100);
    expect(bank.getPaymentStatus(11, "acc2", "payment1")).toBeNull();
    expect(bank.getPaymentStatus(12, "acc1", "payment9")).toBeNull();
    expect(bank.getPaymentStatus(13, "ghost", "payment1")).toBeNull();
  });
});
