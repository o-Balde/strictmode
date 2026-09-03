import { cookies } from "next/headers";
import { HUD_COOKIE, parseHudCookie } from "@lib";
import { HomeSwitch, Landing } from "@components";

/**
 * The landing is for a first visit only. A returning user with a streak should
 * not have to click past a marketing page every morning, so the choice is made
 * here from the mirror cookie — server-side, so there is no flash and no
 * redirect. The cookie is only ever a hint; the client reconciles against
 * localStorage once hydrated.
 */
export default async function HomePage() {
  const store = await cookies();
  const hud = parseHudCookie(store.get(HUD_COOKIE)?.value);
  const returning = Boolean(hud && hud.n > 0);

  if (!returning) return <Landing />;

  return <HomeSwitch initialHud={hud} />;
}
