import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve modern formats to browsers that accept them. The hero alone drops
  // from ~2MB (the old uncompressed PNG) to well under 100KB in AVIF.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2400],
  },

  // Don't advertise the framework version.
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
      {
        // Fingerprinted static assets can be cached hard.
        source: "/:path*.(svg|jpg|jpeg|png|webp|avif|ico|woff2)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
