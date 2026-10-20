import type { Session } from "../contract";
import sessions from "../sessions.json";

/**
 * WORKSHOP SHORTLIST: your workspace. Level 1 starts here.
 *
 * The static markup below is the designer's template for one card. Render
 * every session from sessions.json with it, following the Level 1 spec on the
 * prep page. Keep every data-testid and every string exactly as specified.
 *
 *   npm run level -- session-shortlist 1
 *   npm run dev → ?mock=session-shortlist
 */
const catalogue = sessions as Session[];

export default function App() {
  void catalogue;

  return (
    <section>
      <p data-testid="selected-summary">0 selected</p>
      <ul>
        <li data-testid="session-card-s0">
          <h3>Session title</h3>
          <span>Track</span>
          <span data-testid="seats-s0">10 seats left</span>
          <button type="button" data-testid="toggle-btn-s0">
            Select
          </button>
        </li>
      </ul>
    </section>
  );
}
