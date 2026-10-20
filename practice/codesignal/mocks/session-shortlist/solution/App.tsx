import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { API, MAX_SELECTED, TRACKS, type ApiSession, type Session, type Track } from "../contract";

/**
 * WORKSHOP SHORTLIST: reference solution, all four levels.
 *
 * Three kinds of state, kept apart from the start:
 *   - server data:  `sessions`, replaced wholesale by each successful load
 *   - user intent:  `selectedIds`, a set of ids, never a flag inside a session
 *   - view:         `track` and `query`; what is visible is DERIVED, never stored
 * Level 3 replaces where `sessions` comes from and Level 4 adds view state,
 * and neither has to touch the selection logic written in Level 2.
 */
type TrackFilter = "All" | Track;

const FILTERS: readonly TrackFilter[] = ["All", ...TRACKS];

export default function App() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(() => new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [track, setTrack] = useState<TrackFilter>("All");
  const [query, setQuery] = useState("");

  // Level 3. Only the newest request may write state: a slow response from an
  // older load (or from StrictMode's double-mounted effect) is dropped.
  const latestRequest = useRef(0);
  const load = useCallback(async () => {
    const requestId = ++latestRequest.current;
    setIsLoading(true);
    setError(null);
    try {
      const next = await fetchSessions();
      if (requestId !== latestRequest.current) return;
      setSessions(next);
      setSelectedIds((current) => keepStillSelectable(current, next));
    } catch {
      // Previous sessions and selections stay on screen.
      if (requestId === latestRequest.current) setError("Failed to load sessions");
    } finally {
      if (requestId === latestRequest.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  // Level 2. The guard lives in the updater, so it reads the newest selection
  // even if two clicks land before a re-render.
  const toggle = (session: Session) =>
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(session.id)) {
        next.delete(session.id);
        return next;
      }
      if (session.seatsRemaining <= 0 || next.size >= MAX_SELECTED) return current;
      next.add(session.id);
      return next;
    });

  // Level 4
  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return sessions.filter(
      (session) =>
        (track === "All" || session.track === track) &&
        (needle === "" || session.title.toLowerCase().includes(needle)),
    );
  }, [sessions, track, query]);

  const clearVisible = () => {
    const visibleIds = new Set(visible.map((session) => session.id));
    setSelectedIds((current) => new Set([...current].filter((id) => !visibleIds.has(id))));
  };

  // Counts every selection, including ones the filters are hiding.
  const atLimit = selectedIds.size >= MAX_SELECTED;
  const filtering = track !== "All" || query.trim() !== "";

  return (
    <section>
      <header>
        <p data-testid="selected-summary">{selectedIds.size} selected</p>
        <button type="button" data-testid="refresh-btn" disabled={isLoading} onClick={() => void load()}>
          Refresh catalogue
        </button>
      </header>

      <div>
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            data-testid={`filter-${option}`}
            aria-pressed={track === option}
            onClick={() => setTrack(option)}
          >
            {option}
          </button>
        ))}
        <input
          type="search"
          data-testid="search-input"
          aria-label="Search sessions"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="button" data-testid="clear-visible-btn" onClick={clearVisible}>
          Clear visible selections
        </button>
      </div>

      {isLoading ? <p data-testid="status-msg">Loading...</p> : null}
      {error ? (
        <div>
          <p data-testid="error-msg" role="alert">
            {error}
          </p>
          <button type="button" data-testid="retry-btn" onClick={() => void load()}>
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && visible.length === 0 ? (
        <p data-testid="empty-msg">{filtering ? "No sessions match your filters" : "No sessions available"}</p>
      ) : null}

      <ul>
        {visible.map((session) => {
          const selected = selectedIds.has(session.id);
          const full = session.seatsRemaining === 0;
          return (
            <li key={session.id} data-testid={`session-card-${session.id}`}>
              <h3>{session.title}</h3>
              <span>{session.track}</span>
              <span data-testid={`seats-${session.id}`}>{seatsLabel(session.seatsRemaining)}</span>
              <button
                type="button"
                data-testid={`toggle-btn-${session.id}`}
                disabled={!selected && (full || atLimit)}
                onClick={() => toggle(session)}
              >
                {selected ? "Selected" : full ? "Full" : "Select"}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function seatsLabel(seats: number): string {
  if (seats === 0) return "Full";
  return seats === 1 ? "1 seat left" : `${seats} seats left`;
}

/** After a reload, keep only selections that still exist and still have room. */
function keepStillSelectable(selected: ReadonlySet<string>, sessions: readonly Session[]): ReadonlySet<string> {
  const open = new Set(sessions.filter((session) => session.seatsRemaining > 0).map((session) => session.id));
  return new Set([...selected].filter((id) => open.has(id)));
}

async function fetchSessions(): Promise<Session[]> {
  const response = await fetch(API.sessions);
  if (!response.ok) throw new Error(`GET ${API.sessions} failed with ${response.status}`);
  return normalize((await response.json()) as ApiSession[]);
}

/** Map the API's field names onto ours, rejecting a payload we cannot trust. */
function normalize(payload: readonly ApiSession[]): Session[] {
  const seen = new Set<string>();
  return payload.map((item) => {
    if (!item.session_id || seen.has(item.session_id)) throw new Error(`Duplicate session ${item.session_id}`);
    if (!Number.isInteger(item.available_spots) || item.available_spots < 0) {
      throw new Error(`Invalid seat count for ${item.session_id}`);
    }
    seen.add(item.session_id);
    return {
      id: item.session_id,
      title: item.session_title,
      track: item.category,
      seatsRemaining: item.available_spots,
    };
  });
}
