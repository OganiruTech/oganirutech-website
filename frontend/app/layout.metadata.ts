// app/layout.tsx  (root layout — replaces or merges with your existing one)
// ─────────────────────────────────────────────────────────────────────────────
// Drop this Metadata export into your root layout. If you already have a
// layout.tsx, just copy the `metadata` and `viewport` exports into it.

import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/lib/seo.config";

// ─── Root / Fallback Metadata ─────────────────────────────────────────────────
export const metadata: Metadata = {
  // ── Basics ──────────────────────────────────────────────────────────────────
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  // ── Canonical & Alternate ────────────────────────────────────────────────────
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "en-NG": siteConfig.url,
    },
  },

  // ── Open Graph ───────────────────────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Building the Digital Future Africa Deserves`,
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },

  // ── Icons ────────────────────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        // @ts-ignore — color is valid but not in Next.js types yet
        color: siteConfig.themeColor,
      },
    ],
  },

  // ── Manifest ─────────────────────────────────────────────────────────────────
  manifest: "/site.webmanifest",

  // ── Robots ───────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification (add your tokens when ready) ─────────────────────────────
  verification: {
    google: "REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN",
    // bing: "REPLACE_WITH_BING_WEBMASTER_TOKEN",
  },
};

// ─── Viewport (separate from metadata in Next.js 14+) ────────────────────────
export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ─── generateMetadata Helper ──────────────────────────────────────────────────
// Use this in any page that needs custom per-page metadata:
//
//   import { generatePageMetadata } from "@/lib/seo.config";
//   export const metadata = generatePageMetadata("contact");
//
import type { PageSEO } from "@/lib/seo.config";
import { pageSEO } from "@/lib/seo.config";

export function generatePageMetadata(pageKey: keyof typeof pageSEO): Metadata {
  const page: PageSEO = pageSEO[pageKey];
  const url = `${siteConfig.url}${page.path}`;

  return {
    title: page.title,
    description: page.description,
    keywords: [...(page.keywords ?? []), ...siteConfig.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: page.title,
      description: page.description,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: page.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: page.title,
      description: page.description,
      images: [siteConfig.ogImage],
    },
  };
}