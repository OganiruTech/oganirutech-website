// app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────
// Next.js App Router robots.txt generator. Generates /robots.txt automatically.
// Place this file at: app/robots.ts
// ─────────────────────────────────────────────────────────────────────────────

import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all crawlers full access
        userAgent: "*",
        allow: "/",
        // Block any private/internal routes you may add later
        disallow: [
          "/api/",
          "/dashboard/",
          "/admin/",
          "/_next/",
        ],
      },
      {
        // GPTBot (OpenAI) — allow (good for AI-sourced traffic)
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        // CCBot (Common Crawl) — disallow to protect your content
        userAgent: "CCBot",
        disallow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}