import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/topics", "/topics/*", "/path", "/progress"],
        disallow: ["/api/", "/drill", "/drill/*", "/_next/"],
      },
    ],
    sitemap: "https://strictmode.bermeo.dev/sitemap.xml",
    host: "https://strictmode.bermeo.dev",
  };
}
