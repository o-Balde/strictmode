import { describe, expect, it } from "vitest";
import { InMemoryDBImpl } from "../src/simulation";

describe("Level 2: scan and scanByPrefix", () => {
  it("lists every field as field(value), sorted by field", () => {
    const db = new InMemoryDBImpl();
    db.set("A", "b", "2");
    db.set("A", "c", "3");
    db.set("A", "a", "1");
    expect(db.scan("A")).toEqual(["a(1)", "b(2)", "c(3)"]);
  });

  it("returns an empty list for a missing record", () => {
    expect(new InMemoryDBImpl().scan("nope")).toEqual([]);
  });

  it("sorts in plain string order, not locale order", () => {
    const db = new InMemoryDBImpl();
    db.set("A", "alpha", "1");
    db.set("A", "Zeta", "2");
    db.set("A", "beta", "3");
    expect(db.scan("A")).toEqual(["Zeta(2)", "alpha(1)", "beta(3)"]);
  });

  it("keeps only the fields that start with the prefix", () => {
    const db = new InMemoryDBImpl();
    db.set("user", "age", "36");
    db.set("user", "name", "Ada");
    db.set("user", "address", "London");
    expect(db.scanByPrefix("user", "a")).toEqual(["address(London)", "age(36)"]);
    expect(db.scanByPrefix("user", "ad")).toEqual(["address(London)"]);
    expect(db.scanByPrefix("user", "z")).toEqual([]);
    expect(db.scanByPrefix("ghost", "a")).toEqual([]);
  });

  it("reflects updates and deletes", () => {
    const db = new InMemoryDBImpl();
    db.set("A", "x", "1");
    db.set("A", "y", "2");
    db.set("A", "x", "9");
    db.delete("A", "y");
    expect(db.scan("A")).toEqual(["x(9)"]);

    db.delete("A", "x");
    expect(db.scan("A")).toEqual([]);
  });
});
