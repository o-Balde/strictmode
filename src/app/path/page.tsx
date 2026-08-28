import { cookies } from "next/headers";
import { HUD_COOKIE, parseHudCookie } from "@/lib/progress";
import { PathHome } from "@/components/home/path-home";

/** Direct link to the single-focus home, regardless of the stored preference. */
export default async function PathPage() {
  const store = await cookies();
  return <PathHome initialHud={parseHudCookie(store.get(HUD_COOKIE)?.value)} />;
}
