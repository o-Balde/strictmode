/**
 * Workshop shortlist: the types and endpoints the levels refer to.
 * Read-only; your code goes in src/.
 */
export type Track = "Frontend" | "Architecture" | "AI";

export const TRACKS = ["Frontend", "Architecture", "AI"] as const satisfies readonly Track[];

/** A session as sessions.json stores it (Level 1), and as your UI should hold it. */
export interface Session {
  id: string;
  title: string;
  track: Track;
  seatsRemaining: number;
}

/** A session as `GET /api/sessions` returns it (Level 3). Same data, other names. */
export interface ApiSession {
  session_id: string;
  session_title: string;
  category: Track;
  available_spots: number;
}

export const API = {
  sessions: "/api/sessions",
} as const;

/** Level 2: nobody may shortlist more than this many sessions. */
export const MAX_SELECTED = 3;
