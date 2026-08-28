import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Question payloads are immutable content addressed by question id, and
        // every deployment serves its own copy of public/, so a redeploy that
        // changes a question naturally serves the new file. Long CDN caching is
        // safe, and it is what keeps reading a question off the function path.
        //
        // Not in development: the payloads are rewritten on every build, and a
        // cached copy would keep serving the previous run's question.
        source: "/q/:id.json",
        headers: [
          {
            key: "Cache-Control",
            value: isProd
              ? "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400"
              : "no-store",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
