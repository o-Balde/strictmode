import { describe, expect, it } from "vitest";
import { BankingSystemImpl } from "../src/simulation";

function seeded() {
  const bank = new BankingSystemImpl();
  for (const [index, id] of ["acc3", "acc1", "acc2", "acc4"].entries()) bank.createAccount(index + 1, id);
  bank.deposit(10, "acc1", 1000);
  bank.deposit(11, "acc2", 1000);
  bank.deposit(12, "acc3", 1000);
  return bank;
}

describe("Level 2: topSpenders", () => {
  it("ranks by outgoing transfers, highest first", () => {
    const bank = seeded();
    bank.transfer(20, "acc1", "acc2", 300);
    bank.transfer(21, "acc3", "acc1", 500);
    bank.transfer(22, "acc2", "acc4", 100);

    expect(bank.topSpenders(30, 3)).toEqual(["acc3(500)", "acc1(300)", "acc2(100)"]);
  });

  it("breaks ties by account id", () => {
    const bank = seeded();
    bank.transfer(20, "acc3", "acc4", 200);
    bank.transfer(21, "acc1", "acc4", 200);

    expect(bank.topSpenders(30, 2)).toEqual(["acc1(200)", "acc3(200)"]);
  });

  it("returns every account, including non-spenders, when n is larger", () => {
    const bank = seeded();
    bank.transfer(20, "acc2", "acc1", 50);
    expect(bank.topSpenders(30, 10)).toEqual(["acc2(50)", "acc1(0)", "acc3(0)", "acc4(0)"]);
  });

  it("does not count deposits, incoming money or refused transfers", () => {
    const bank = seeded();
    bank.deposit(20, "acc4", 5000);
    bank.transfer(21, "acc4", "acc4", 10);
    bank.transfer(22, "acc1", "acc2", 999_999);

    expect(bank.topSpenders(30, 4)).toEqual(["acc1(0)", "acc2(0)", "acc3(0)", "acc4(0)"]);
  });
});
