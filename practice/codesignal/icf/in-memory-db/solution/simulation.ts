import type { InMemoryDB } from "../contract";

/**
 * IN-MEMORY DATABASE: reference solution, all four levels.
 *
 * The Level 1 shape already carries an expiry per field (Infinity = never).
 * That one choice turns Level 3 into "pass a timestamp through" and Level 4
 * into "copy the map": the untimed methods are the timed ones at time 0.
 */
interface Entry {
  value: string;
  expiresAt: number;
}

type Records = Map<string, Map<string, Entry>>;

interface Snapshot {
  takenAt: number;
  /** Remaining lifetime per field, so a restore can re-anchor it. */
  records: Map<string, Map<string, { value: string; remaining: number }>>;
}

const FOREVER = Number.POSITIVE_INFINITY;

export class InMemoryDBImpl implements InMemoryDB {
  private records: Records = new Map();
  private snapshots: Snapshot[] = [];

  // Level 1 and 2 are the timed operations at a moment where nothing has expired.
  set(key: string, field: string, value: string): void {
    this.setAt(key, field, value, 0);
  }

  get(key: string, field: string): string | null {
    return this.getAt(key, field, 0);
  }

  delete(key: string, field: string): boolean {
    return this.deleteAt(key, field, 0);
  }

  scan(key: string): string[] {
    return this.scanAt(key, 0);
  }

  scanByPrefix(key: string, prefix: string): string[] {
    return this.scanByPrefixAt(key, prefix, 0);
  }

  setAt(key: string, field: string, value: string, timestamp: number): void {
    this.write(key, field, { value, expiresAt: FOREVER });
  }

  setAtWithTtl(key: string, field: string, value: string, timestamp: number, ttl: number): void {
    this.write(key, field, { value, expiresAt: timestamp + ttl });
  }

  deleteAt(key: string, field: string, timestamp: number): boolean {
    if (this.live(key, field, timestamp) === undefined) return false;
    const record = this.records.get(key)!;
    record.delete(field);
    if (record.size === 0) this.records.delete(key);
    return true;
  }

  getAt(key: string, field: string, timestamp: number): string | null {
    return this.live(key, field, timestamp)?.value ?? null;
  }

  scanAt(key: string, timestamp: number): string[] {
    return this.scanByPrefixAt(key, "", timestamp);
  }

  scanByPrefixAt(key: string, prefix: string, timestamp: number): string[] {
    const record = this.records.get(key);
    if (!record) return [];
    return [...record]
      .filter(([field, entry]) => field.startsWith(prefix) && entry.expiresAt > timestamp)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
      .map(([field, entry]) => `${field}(${entry.value})`);
  }

  backup(timestamp: number): number {
    const records: Snapshot["records"] = new Map();
    for (const [key, record] of this.records) {
      const alive = new Map<string, { value: string; remaining: number }>();
      for (const [field, entry] of record) {
        if (entry.expiresAt > timestamp) alive.set(field, { value: entry.value, remaining: entry.expiresAt - timestamp });
      }
      if (alive.size > 0) records.set(key, alive);
    }
    this.snapshots.push({ takenAt: timestamp, records });
    return records.size;
  }

  restore(timestamp: number, timestampToRestore: number): void {
    // Snapshots are taken in time order, so the last match is the latest one.
    // (Array#findLast would read better, but it needs lib ES2023.)
    const snapshot = [...this.snapshots].reverse().find((candidate) => candidate.takenAt <= timestampToRestore);
    if (!snapshot) return;
    this.records = new Map(
      [...snapshot.records].map(([key, fields]) => [
        key,
        new Map([...fields].map(([field, { value, remaining }]) => [field, { value, expiresAt: timestamp + remaining }])),
      ]),
    );
  }

  private write(key: string, field: string, entry: Entry) {
    let record = this.records.get(key);
    if (!record) {
      record = new Map();
      this.records.set(key, record);
    }
    record.set(field, entry);
  }

  private live(key: string, field: string, timestamp: number): Entry | undefined {
    const entry = this.records.get(key)?.get(field);
    return entry && entry.expiresAt > timestamp ? entry : undefined;
  }
}
