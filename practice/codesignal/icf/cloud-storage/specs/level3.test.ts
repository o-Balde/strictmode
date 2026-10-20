import { describe, expect, it } from "vitest";
import { CloudStorageImpl } from "../src/simulation";

describe("Level 3: users and capacity", () => {
  it("adds a user once", () => {
    const storage = new CloudStorageImpl();
    expect(storage.addUser("u1", 100)).toBe(true);
    expect(storage.addUser("u1", 500)).toBe(false);
  });

  it("charges files to their owner and returns the capacity left", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    expect(storage.addFileBy("u1", "/u1/a", 30)).toBe(70);
    expect(storage.addFileBy("u1", "/u1/b", 70)).toBe(0);
    expect(storage.addFileBy("u1", "/u1/c", 1)).toBeNull();
  });

  it("refuses unknown users and taken names", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFile("/shared", 5);
    expect(storage.addFileBy("ghost", "/x", 1)).toBeNull();
    expect(storage.addFileBy("u1", "/shared", 1)).toBeNull();
  });

  it("gives the space back when a file is deleted", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFileBy("u1", "/a", 60);
    storage.deleteFile("/a");
    expect(storage.addFileBy("u1", "/b", 100)).toBe(0);
  });

  it("never limits admin's files", () => {
    const storage = new CloudStorageImpl();
    expect(storage.addFile("/huge", 10 ** 12)).toBe(true);
  });

  it("merges files and capacity into the first user", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addUser("u2", 50);
    storage.addFileBy("u1", "/a", 40);
    storage.addFileBy("u2", "/b", 30);

    expect(storage.mergeUser("u1", "u2")).toBe(80);
    expect(storage.addFileBy("u2", "/c", 1)).toBeNull();
    expect(storage.addFileBy("u1", "/c", 80)).toBe(0);
    expect(storage.getFileSize("/b")).toBe(30);
  });

  it("refuses merges that cannot happen", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 10);
    expect(storage.mergeUser("u1", "u1")).toBeNull();
    expect(storage.mergeUser("u1", "ghost")).toBeNull();
    expect(storage.mergeUser("u1", "admin")).toBeNull();
    expect(storage.mergeUser("admin", "u1")).toBeNull();
  });

  it("lets a merged-away user id be added again", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 10);
    storage.addUser("u2", 10);
    storage.mergeUser("u1", "u2");
    expect(storage.addUser("u2", 5)).toBe(true);
    expect(storage.addFileBy("u2", "/x", 5)).toBe(0);
  });
});
