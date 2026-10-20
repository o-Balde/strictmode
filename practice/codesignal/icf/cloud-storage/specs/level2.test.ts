import { describe, expect, it } from "vitest";
import { CloudStorageImpl } from "../src/simulation";

function seeded() {
  const storage = new CloudStorageImpl();
  storage.addFile("/dir/file1.txt", 10);
  storage.addFile("/dir/file2.txt", 20);
  storage.addFile("/dir/deeper/file3.txt", 20);
  storage.addFile("/other/file4.txt", 99);
  return storage;
}

describe("Level 2: getNLargest", () => {
  it("lists the largest matches first, ties by name", () => {
    expect(seeded().getNLargest("/dir", 3)).toBe("/dir/deeper/file3.txt(20), /dir/file2.txt(20), /dir/file1.txt(10)");
  });

  it("stops at n", () => {
    expect(seeded().getNLargest("/dir", 1)).toBe("/dir/deeper/file3.txt(20)");
  });

  it("returns everything that matches when n is larger", () => {
    expect(seeded().getNLargest("/other", 10)).toBe("/other/file4.txt(99)");
  });

  it("returns an empty string when nothing matches", () => {
    expect(seeded().getNLargest("/missing", 5)).toBe("");
  });

  it("forgets deleted files", () => {
    const storage = seeded();
    storage.deleteFile("/dir/file2.txt");
    expect(storage.getNLargest("/dir/f", 5)).toBe("/dir/file1.txt(10)");
  });
});
