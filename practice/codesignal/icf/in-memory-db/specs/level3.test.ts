import { describe, expect, it } from "vitest";
import { InMemoryDBImpl } from "../src/simulation";

describe("Level 3: timestamps and TTL", () => {
  it("keeps a field for exactly ttl: alive at start + ttl - 1, gone at start + ttl", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "token", "abc", 10, 5);
    expect(db.getAt("A", "token", 10)).toBe("abc");
    expect(db.getAt("A", "token", 14)).toBe("abc");
    expect(db.getAt("A", "token", 15)).toBeNull();
  });

  it("never expires a field set without a ttl", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "name", "Ada", 1);
    expect(db.getAt("A", "name", 1_000_000)).toBe("Ada");
  });

  it("clears an old ttl when the field is set again without one", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "f", "short", 1, 5);
    db.setAt("A", "f", "forever", 3);
    expect(db.getAt("A", "f", 100)).toBe("forever");
  });

  it("starts a new ttl when the field is set again with one", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "f", "v1", 1, 5);
    db.setAtWithTtl("A", "f", "v2", 4, 10);
    expect(db.getAt("A", "f", 8)).toBe("v2");
    expect(db.getAt("A", "f", 14)).toBeNull();
  });

  it("cannot delete what has already expired", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "f", "v", 1, 5);
    expect(db.deleteAt("A", "f", 6)).toBe(false);

    db.setAtWithTtl("A", "g", "v", 7, 5);
    expect(db.deleteAt("A", "g", 8)).toBe(true);
    expect(db.getAt("A", "g", 9)).toBeNull();
  });

  it("leaves expired fields out of scans", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "name", "Ada", 1);
    db.setAtWithTtl("A", "nonce", "42", 2, 3);
    db.setAtWithTtl("A", "note", "hi", 3, 100);

    expect(db.scanAt("A", 4)).toEqual(["name(Ada)", "nonce(42)", "note(hi)"]);
    expect(db.scanAt("A", 5)).toEqual(["name(Ada)", "note(hi)"]);
    expect(db.scanByPrefixAt("A", "n", 5)).toEqual(["name(Ada)", "note(hi)"]);
    expect(db.scanByPrefixAt("A", "no", 200)).toEqual([]);
  });
});
