import type { MetadataRoute } from "next";
import { TOPIC_METADATA } from "@/data";

const BASE_URL = "https://strictmode.bermeo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/topics`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/path`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/progress`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const topicRoutes: MetadataRoute.Sitemap = Object.keys(TOPIC_METADATA).map(
    (subject) => ({
      url: `${BASE_URL}/topics/${subject}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })
  );

  return [...staticRoutes, ...topicRoutes];
}
