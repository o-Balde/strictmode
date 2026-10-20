import type { CloudStorage } from "../contract";

/**
 * CLOUD STORAGE: your workspace (Industry Coding Framework, TypeScript).
 *
 * Read contract.ts for each method's rules. Implement Level 1 first, run its
 * specs, then move on.
 *
 *   npm run level -- cloud-storage 1
 */
export class CloudStorageImpl implements CloudStorage {
  addFile(name: string, size: number): boolean {
    return false;
  }

  getFileSize(name: string): number | null {
    return null;
  }

  deleteFile(name: string): number | null {
    return null;
  }

  getNLargest(prefix: string, n: number): string {
    return "";
  }

  addUser(userId: string, capacity: number): boolean {
    return false;
  }

  addFileBy(userId: string, name: string, size: number): number | null {
    return null;
  }

  mergeUser(userId1: string, userId2: string): number | null {
    return null;
  }

  backupUser(userId: string): number | null {
    return null;
  }

  restoreUser(userId: string): number | null {
    return null;
  }
}
