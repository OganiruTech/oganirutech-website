// app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router dynamic sitemap. Generates /sitemap.xml automatically.
// Place this file at: app/sitemap.ts
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo.config";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const now = new Date();

  // Static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ── Dynamic routes ────────────────────────────────────────────────────────
  // If you add blog posts, product detail pages, or job listings, fetch them
  // here and spread them into the return array. Example:
  //
  // const posts = await fetchBlogPosts();
  // const blogRoutes = posts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: "monthly" as const,
  //   priority: 0.6,
  // }));
  //
  // return [...staticRoutes, ...blogRoutes];

  return staticRoutes;
}