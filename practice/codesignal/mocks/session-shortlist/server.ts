import { ok, type Routes } from "../../shared/mock-server";
import type { ApiSession, Session } from "./contract";
import sessions from "./sessions.json";

export const toApi = (session: Session): ApiSession => ({
  session_id: session.id,
  session_title: session.title,
  category: session.track,
  available_spots: session.seatsRemaining,
});

/** What `GET /api/sessions` serves by default: sessions.json in the API's shape. */
export const API_SESSIONS: ApiSession[] = (sessions as Session[]).map(toApi);

export const routes: Routes = {
  "GET /api/sessions": () => ok(API_SESSIONS),
};
