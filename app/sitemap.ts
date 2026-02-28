import { MetadataRoute } from "next";
import { posts } from "./blog/data";

const BASE = "https://thevoiceofcash.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const blogUrls = posts.map((p) => ({
    url: `${BASE}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/consultation`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    ...blogUrls,
  ];
}
