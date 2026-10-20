/**
 * Cloud storage. Files have unique names and a size in bytes. Implement the
 * levels in order and do not change these signatures.
 */
export interface CloudStorage {
  // ── Level 1: files ───────────────────────────────────────────────────────
  /** Stores a file. False if a file with that name already exists. */
  addFile(name: string, size: number): boolean;
  /** The file's size, or null if it does not exist. */
  getFileSize(name: string): number | null;
  /** Deletes the file and returns its size, or null if it does not exist. */
  deleteFile(name: string): number | null;

  // ── Level 2: queries ─────────────────────────────────────────────────────
  /**
   * The `n` largest files whose names start with `prefix`, formatted as
   * `"name1(size1), name2(size2)"`: largest first, ties by name ascending.
   * An empty string when nothing matches.
   */
  getNLargest(prefix: string, n: number): string;

  // ── Level 3: users and capacity ──────────────────────────────────────────
  // Files added with addFile belong to the built-in user "admin", who has no
  // capacity limit and cannot be added, merged, backed up or restored.
  /** Adds a user with a capacity in bytes. False if the user already exists. */
  addUser(userId: string, capacity: number): boolean;
  /**
   * Stores a file owned by `userId`. Returns the user's remaining capacity, or
   * null if the user does not exist, the name is taken, or it does not fit.
   */
  addFileBy(userId: string, name: string, size: number): number | null;
  /**
   * Moves every file of user 2 to user 1, adds user 2's capacity to user 1's,
   * and removes user 2 (and any backup of theirs). Returns user 1's remaining
   * capacity, or null when the ids are equal, either user is missing, or either
   * is "admin".
   */
  mergeUser(userId1: string, userId2: string): number | null;

  // ── Level 4: backups ─────────────────────────────────────────────────────
  /**
   * Saves the user's current files (names and sizes), replacing any earlier
   * backup. Returns how many files were saved, or null if the user is missing.
   */
  backupUser(userId: string): number | null;
  /**
   * Deletes all the user's files, then brings back the files from their
   * latest backup, skipping any whose name now belongs to another user. With
   * no backup, the user simply ends up with no files. Returns how many files
   * were restored, or null if the user is missing.
   */
  restoreUser(userId: string): number | null;
}
