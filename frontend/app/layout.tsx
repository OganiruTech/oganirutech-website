import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/seo.config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SkipToContent } from "@/components/seo/SemanticPage";

/* Self-hosted variable fonts. next/font/google fetches from
   fonts.googleapis.com at build time, which makes every build depend on a
   third-party host being reachable and sends visitor requests off-domain.
   These are the same faces, served from our own origin. */

const inter = localFont({
  src: "./fonts/Inter-Variable.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

const sora = localFont({
  src: "./fonts/Sora-Variable.woff2",
  weight: "100 800",
  style: "normal",
  display: "swap",
  variable: "--font-sora",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

/* ---------------------------------------------------------------------------
   All of this previously lived in app/layout.metadata.ts, which nothing
   imported — so the icons, manifest, robots directives and the Google/Bing
   verification tokens were never actually emitted. It now ships from here.
--------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Oganiru Technologies — Building the Digital Future Africa Deserves",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,

  alternates: {
    canonical: "/",
    languages: { "en-NG": siteConfig.url },
  },

  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Oganiru Technologies — Building the Digital Future Africa Deserves",
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Building the Digital Future Africa Deserves`,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: siteConfig.twitterHandle,
    creator: siteConfig.twitterHandle,
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg" }],
  },

  manifest: "/site.webmanifest",

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

  verification: {
    google: "0KIEvcUM61aPkvB5MtOpPs66JdJgeFBx0JTD0fpyVs8",
    other: { "msvalidate.01": "F9A8EA6AEF4DC203AEC5D5A5DBA6D9F1" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // The old config capped zoom at 5x with maximumScale; leaving it uncapped
  // is the accessible default.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1F3B" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-NG" className={`${inter.variable} ${sora.variable}`}>
      <body className="flex min-h-screen flex-col bg-surface font-sans text-ink antialiased">
        <SkipToContent />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
