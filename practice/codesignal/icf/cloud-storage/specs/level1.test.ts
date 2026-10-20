import { describe, expect, it } from "vitest";
import { CloudStorageImpl } from "../src/simulation";

describe("Level 1: add, get, delete files", () => {
  it("adds a file once", () => {
    const storage = new CloudStorageImpl();
    expect(storage.addFile("/dir/a.txt", 100)).toBe(true);
    expect(storage.addFile("/dir/a.txt", 200)).toBe(false);
    expect(storage.getFileSize("/dir/a.txt")).toBe(100);
  });

  it("returns null for a missing file", () => {
    expect(new CloudStorageImpl().getFileSize("/nope")).toBeNull();
  });

  it("deletes a file and returns its size", () => {
    const storage = new CloudStorageImpl();
    storage.addFile("/a", 42);
    expect(storage.deleteFile("/a")).toBe(42);
    expect(storage.getFileSize("/a")).toBeNull();
    expect(storage.deleteFile("/a")).toBeNull();
  });

  it("frees the name for reuse after a delete", () => {
    const storage = new CloudStorageImpl();
    storage.addFile("/a", 1);
    storage.deleteFile("/a");
    expect(storage.addFile("/a", 2)).toBe(true);
    expect(storage.getFileSize("/a")).toBe(2);
  });

  it("stores a zero-byte file", () => {
    const storage = new CloudStorageImpl();
    expect(storage.addFile("/empty", 0)).toBe(true);
    expect(storage.getFileSize("/empty")).toBe(0);
    expect(storage.deleteFile("/empty")).toBe(0);
  });
});
