import type { InMemoryDB } from "../contract";

/**
 * IN-MEMORY DATABASE: your workspace (Industry Coding Framework, TypeScript).
 *
 * Read contract.ts for each method's rules. Implement Level 1 first, run its
 * specs, then move on: the next level's rules assume the earlier ones.
 *
 *   npm run level -- in-memory-db 1
 */
export class InMemoryDBImpl implements InMemoryDB {
  set(key: string, field: string, value: string): void {}

  get(key: string, field: string): string | null {
    return null;
  }

  delete(key: string, field: string): boolean {
    return false;
  }

  scan(key: string): string[] {
    return [];
  }

  scanByPrefix(key: string, prefix: string): string[] {
    return [];
  }

  setAt(key: string, field: string, value: string, timestamp: number): void {}

  setAtWithTtl(key: string, field: string, value: string, timestamp: number, ttl: number): void {}

  deleteAt(key: string, field: string, timestamp: number): boolean {
    return false;
  }

  getAt(key: string, field: string, timestamp: number): string | null {
    return null;
  }

  scanAt(key: string, timestamp: number): string[] {
    return [];
  }

  scanByPrefixAt(key: string, prefix: string, timestamp: number): string[] {
    return [];
  }

  backup(timestamp: number): number {
    return 0;
  }

  restore(timestamp: number, timestampToRestore: number): void {}
}
