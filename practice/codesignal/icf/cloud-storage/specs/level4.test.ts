import { describe, expect, it } from "vitest";
import { CloudStorageImpl } from "../src/simulation";

describe("Level 4: backup and restore", () => {
  it("backs up the user's files and counts them", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFileBy("u1", "/a", 10);
    storage.addFileBy("u1", "/b", 20);
    storage.addFile("/admin-only", 5);

    expect(storage.backupUser("u1")).toBe(2);
    expect(storage.backupUser("ghost")).toBeNull();
  });

  it("restores the backup, dropping files added since", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFileBy("u1", "/a", 10);
    storage.backupUser("u1");
    storage.deleteFile("/a");
    storage.addFileBy("u1", "/b", 20);

    expect(storage.restoreUser("u1")).toBe(1);
    expect(storage.getFileSize("/a")).toBe(10);
    expect(storage.getFileSize("/b")).toBeNull();
  });

  it("restores from the latest backup only", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFileBy("u1", "/v1", 10);
    storage.backupUser("u1");
    storage.addFileBy("u1", "/v2", 10);
    storage.backupUser("u1");
    storage.deleteFile("/v1");
    storage.deleteFile("/v2");

    expect(storage.restoreUser("u1")).toBe(2);
  });

  it("skips files whose name was taken by someone else meanwhile", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addUser("u2", 100);
    storage.addFileBy("u1", "/shared", 10);
    storage.addFileBy("u1", "/mine", 10);
    storage.backupUser("u1");
    storage.deleteFile("/shared");
    storage.addFileBy("u2", "/shared", 99);

    expect(storage.restoreUser("u1")).toBe(1);
    expect(storage.getFileSize("/shared")).toBe(99);
    expect(storage.getFileSize("/mine")).toBe(10);
  });

  it("leaves a user with no backup with no files", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addFileBy("u1", "/a", 10);

    expect(storage.restoreUser("u1")).toBe(0);
    expect(storage.getFileSize("/a")).toBeNull();
    expect(storage.addFileBy("u1", "/b", 100)).toBe(0);
  });

  it("discards the second user's backup on merge", () => {
    const storage = new CloudStorageImpl();
    storage.addUser("u1", 100);
    storage.addUser("u2", 100);
    storage.addFileBy("u2", "/old", 10);
    storage.backupUser("u2");
    storage.mergeUser("u1", "u2");
    storage.addUser("u2", 100);

    expect(storage.restoreUser("u2")).toBe(0);
    expect(storage.getFileSize("/old")).toBe(10);
  });
});
