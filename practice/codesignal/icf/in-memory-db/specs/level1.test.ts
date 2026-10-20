import { describe, expect, it } from "vitest";
import { InMemoryDBImpl } from "../src/simulation";

describe("Level 1: set, get, delete", () => {
  it("returns what was set", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "name", "Ada");
    expect(db.get("user1", "name")).toBe("Ada");
  });

  it("returns null for a missing record or field", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "name", "Ada");
    expect(db.get("user2", "name")).toBeNull();
    expect(db.get("user1", "email")).toBeNull();
  });

  it("overwrites an existing field", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "name", "Ada");
    db.set("user1", "name", "Grace");
    expect(db.get("user1", "name")).toBe("Grace");
  });

  it("keeps records apart", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "name", "Ada");
    db.set("user2", "name", "Grace");
    expect(db.get("user1", "name")).toBe("Ada");
    expect(db.get("user2", "name")).toBe("Grace");
  });

  it("deletes a field and reports whether it existed", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "name", "Ada");
    db.set("user1", "role", "admin");

    expect(db.delete("user1", "name")).toBe(true);
    expect(db.get("user1", "name")).toBeNull();
    expect(db.get("user1", "role")).toBe("admin");
    expect(db.delete("user1", "name")).toBe(false);
    expect(db.delete("nobody", "name")).toBe(false);
  });

  it("treats the empty string as a real value", () => {
    const db = new InMemoryDBImpl();
    db.set("user1", "nickname", "");
    expect(db.get("user1", "nickname")).toBe("");
    expect(db.delete("user1", "nickname")).toBe(true);
  });
});
