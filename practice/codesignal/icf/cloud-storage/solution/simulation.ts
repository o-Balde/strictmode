import type { CloudStorage } from "../contract";

/**
 * CLOUD STORAGE: reference solution, all four levels.
 *
 * Every file records its owner from Level 1 on ("admin" until users exist),
 * and a user's usage is computed from the files rather than kept as a second
 * counter that can drift. Level 3's capacity check, Level 3's merge and
 * Level 4's restore all become questions about `files`.
 */
const ADMIN = "admin";

interface StoredFile {
  size: number;
  owner: string;
}

interface User {
  capacity: number;
  backup: Map<string, number> | null;
}

export class CloudStorageImpl implements CloudStorage {
  private files = new Map<string, StoredFile>();
  private users = new Map<string, User>([[ADMIN, { capacity: Number.POSITIVE_INFINITY, backup: null }]]);

  addFile(name: string, size: number): boolean {
    return this.addFileBy(ADMIN, name, size) !== null;
  }

  getFileSize(name: string): number | null {
    return this.files.get(name)?.size ?? null;
  }

  deleteFile(name: string): number | null {
    const file = this.files.get(name);
    if (!file) return null;
    this.files.delete(name);
    return file.size;
  }

  getNLargest(prefix: string, n: number): string {
    return [...this.files]
      .filter(([name]) => name.startsWith(prefix))
      .sort(([nameA, a], [nameB, b]) => b.size - a.size || (nameA < nameB ? -1 : nameA > nameB ? 1 : 0))
      .slice(0, n)
      .map(([name, file]) => `${name}(${file.size})`)
      .join(", ");
  }

  addUser(userId: string, capacity: number): boolean {
    if (this.users.has(userId)) return false;
    this.users.set(userId, { capacity, backup: null });
    return true;
  }

  addFileBy(userId: string, name: string, size: number): number | null {
    const user = this.users.get(userId);
    if (!user || this.files.has(name)) return null;
    const remaining = user.capacity - this.usage(userId);
    if (size > remaining) return null;
    this.files.set(name, { size, owner: userId });
    return remaining - size;
  }

  mergeUser(userId1: string, userId2: string): number | null {
    if (userId1 === userId2 || userId1 === ADMIN || userId2 === ADMIN) return null;
    const keep = this.users.get(userId1);
    const absorb = this.users.get(userId2);
    if (!keep || !absorb) return null;

    for (const file of this.files.values()) {
      if (file.owner === userId2) file.owner = userId1;
    }
    keep.capacity += absorb.capacity;
    this.users.delete(userId2);
    return keep.capacity - this.usage(userId1);
  }

  backupUser(userId: string): number | null {
    const user = this.users.get(userId);
    if (!user || userId === ADMIN) return null;
    user.backup = new Map(this.ownedBy(userId).map(([name, file]) => [name, file.size]));
    return user.backup.size;
  }

  restoreUser(userId: string): number | null {
    const user = this.users.get(userId);
    if (!user || userId === ADMIN) return null;

    for (const [name] of this.ownedBy(userId)) this.files.delete(name);
    let restored = 0;
    for (const [name, size] of user.backup ?? []) {
      if (this.files.has(name)) continue;
      this.files.set(name, { size, owner: userId });
      restored += 1;
    }
    return restored;
  }

  private ownedBy(userId: string): [string, StoredFile][] {
    return [...this.files].filter(([, file]) => file.owner === userId);
  }

  private usage(userId: string): number {
    return this.ownedBy(userId).reduce((total, [, file]) => total + file.size, 0);
  }
}
