import { describe, expect, it } from "vitest";
import { InMemoryDBImpl } from "../src/simulation";

describe("Level 4: backup and restore", () => {
  it("counts the records that hold at least one live field", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "f", "1", 1);
    db.setAtWithTtl("B", "f", "1", 2, 3);
    db.setAt("C", "f", "1", 3);
    db.deleteAt("C", "f", 4);
    expect(db.backup(10)).toBe(1);
  });

  it("restores the database as it was at the backup", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "name", "Ada", 1);
    db.backup(2);
    db.setAt("A", "name", "Grace", 3);
    db.setAt("B", "x", "1", 4);
    db.deleteAt("A", "name", 5);

    db.restore(6, 2);
    expect(db.getAt("A", "name", 7)).toBe("Ada");
    expect(db.getAt("B", "x", 7)).toBeNull();
  });

  it("uses the latest backup at or before the requested time", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "v", "first", 1);
    db.backup(10);
    db.setAt("A", "v", "second", 15);
    db.backup(20);
    db.setAt("A", "v", "third", 25);

    db.restore(30, 25);
    expect(db.getAt("A", "v", 31)).toBe("second");
    db.restore(40, 19);
    expect(db.getAt("A", "v", 41)).toBe("first");
    db.restore(50, 20);
    expect(db.getAt("A", "v", 51)).toBe("second");
  });

  it("re-anchors each ttl at the restore time with the time it had left", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "token", "abc", 1, 10); // expires at 11
    db.backup(5); // 6 left
    db.restore(100, 5); // now expires at 106

    expect(db.getAt("A", "token", 105)).toBe("abc");
    expect(db.getAt("A", "token", 106)).toBeNull();
  });

  it("does not bring back a field that had expired by the backup", () => {
    const db = new InMemoryDBImpl();
    db.setAtWithTtl("A", "gone", "x", 1, 2);
    db.setAt("A", "kept", "y", 2);
    db.backup(5);
    db.restore(6, 5);
    expect(db.scanAt("A", 7)).toEqual(["kept(y)"]);
  });

  it("is not affected by changes made after the backup was taken", () => {
    const db = new InMemoryDBImpl();
    db.setAt("A", "f", "before", 1);
    db.backup(2);
    db.setAt("A", "f", "after", 3);
    db.restore(4, 2);
    db.setAt("A", "f", "changed again", 5);
    db.restore(6, 2);
    expect(db.getAt("A", "f", 7)).toBe("before");
  });
});
