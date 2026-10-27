import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/topics", "/topics/*", "/interview-prep", "/quick-review", "/codesignal-react-typescript", "/path", "/progress"],
        disallow: ["/api/", "/drill", "/drill/*", "/_next/"],
      },
    ],
    sitemap: "https://strictmode.bermeo.dev/sitemap.xml",
    host: "https://strictmode.bermeo.dev",
  };
}
