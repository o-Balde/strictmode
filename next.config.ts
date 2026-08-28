import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Question payloads are immutable content addressed by question id, and
        // every deployment serves its own copy of public/, so a redeploy that
        // changes a question naturally serves the new file. Long CDN caching is
        // safe, and it is what keeps reading a question off the function path.
        source: "/q/:id.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=31536000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
