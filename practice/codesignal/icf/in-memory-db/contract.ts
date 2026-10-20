/**
 * In-memory database. A record is identified by a `key` and holds `field` →
 * `value` pairs, all strings. Implement the levels in order; later levels must
 * keep earlier behaviour intact. Do not change these signatures.
 */
export interface InMemoryDB {
  // ── Level 1: basic operations ────────────────────────────────────────────
  /** Inserts the field into the record (creating the record), or updates it. */
  set(key: string, field: string, value: string): void;
  /** The field's value, or null when the record or the field does not exist. */
  get(key: string, field: string): string | null;
  /** Removes the field. True if it existed, false otherwise. */
  delete(key: string, field: string): boolean;

  // ── Level 2: scans ───────────────────────────────────────────────────────
  /**
   * Every field of the record as `"field(value)"`, sorted by field name
   * (plain string order). An empty list when the record does not exist.
   */
  scan(key: string): string[];
  /** Like `scan`, keeping only fields whose name starts with `prefix`. */
  scanByPrefix(key: string, prefix: string): string[];

  // ── Level 3: timestamps and TTL ──────────────────────────────────────────
  // Every call now carries a timestamp. Timestamps strictly increase across
  // calls, and the specs never mix these methods with Levels 1–2 on one instance.
  /** `set` at a moment in time; the field never expires (this clears any old TTL). */
  setAt(key: string, field: string, value: string, timestamp: number): void;
  /** `set` with a time to live: the field exists for timestamps in [timestamp, timestamp + ttl). */
  setAtWithTtl(key: string, field: string, value: string, timestamp: number, ttl: number): void;
  /** `delete` at a moment in time. An expired field counts as not existing. */
  deleteAt(key: string, field: string, timestamp: number): boolean;
  /** `get` at a moment in time. An expired field counts as not existing. */
  getAt(key: string, field: string, timestamp: number): string | null;
  /** `scan` at a moment in time, leaving out expired fields. */
  scanAt(key: string, timestamp: number): string[];
  /** `scanByPrefix` at a moment in time, leaving out expired fields. */
  scanByPrefixAt(key: string, prefix: string, timestamp: number): string[];

  // ── Level 4: backup and restore ──────────────────────────────────────────
  /**
   * Saves the whole database as it is at `timestamp`, remembering how much
   * time each expiring field has left. Returns how many records hold at least
   * one live field.
   */
  backup(timestamp: number): number;
  /**
   * Replaces the database with the latest backup taken at or before
   * `timestampToRestore` (one always exists). A field that had `r` ms left
   * when it was backed up now expires at `timestamp + r`.
   */
  restore(timestamp: number, timestampToRestore: number): void;
}
