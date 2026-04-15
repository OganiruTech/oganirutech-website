export const siteConfig = {
  name: "Oganiru Technologies",
  shortName: "Oganiru",
  description:
    "Oganiru Technologies builds resilient digital systems — web platforms, mobile apps, and brand identities that help African businesses scale and thrive.",
  url: "https://oganiru.tech",
  ogImage: "https://oganiru.tech/og-image.png",
  twitterHandle: "@oganirutech",
  locale: "en_NG",
  themeColor: "#10b981",
  keywords: [
    "tech company Nigeria",
    "software development Africa",
    "web development Port Harcourt",
    "mobile app development Nigeria",
    "digital transformation Africa",
    "brand identity design Nigeria",
    "startup technology partner",
    "scalable digital platforms",
    "Oganiru Technologies",
  ],
  address: {
    country: "NG",
    region: "Rivers State",
    locality: "Port Harcourt",
  },
  socials: {
    twitter: "https://x.com/oganirutech",
    facebook: "https://www.facebook.com/profile.php?id=61567296328675",
    instagram: "https://instagram.com/oganirutechnologies",
  },
};

export type PageSEO = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export const pageSEO: Record<string, PageSEO> = {
  home: {
    title: "Oganiru Technologies — Building the Digital Future Africa Deserves",
    description:
      "We design and build resilient digital systems — web platforms, mobile apps, and brand identities — that help African businesses scale and thrive in a connected world.",
    path: "/",
    keywords: [
      "tech startup Africa",
      "software company Nigeria",
      "digital products Africa",
      "web and mobile development Nigeria",
    ],
  },
  contact: {
    title: "Contact Oganiru Technologies — Let's Build Something Great Together",
    description:
      "Have a project, partnership idea, or question? Reach out to the Oganiru team. We respond within 24 hours.",
    path: "/contact",
    keywords: [
      "contact Oganiru",
      "hire tech company Nigeria",
      "digital project inquiry",
      "tech partnership Africa",
    ],
  },
  products: {
    title: "Our Products — Oganiru Technologies",
    description:
      "Explore the digital products and platforms built by Oganiru Technologies to empower African businesses and communities.",
    path: "/products",
    keywords: [
      "Oganiru products",
      "African digital products",
      "SaaS Africa",
      "tech platforms Nigeria",
    ],
  },
  careers: {
    title: "Careers at Oganiru Technologies — Join the Team",
    description:
      "Join a team building the digital future of Africa. Explore open roles in engineering, design, and product at Oganiru Technologies.",
    path: "/careers",
    keywords: [
      "tech jobs Nigeria",
      "software engineer Africa",
      "careers Oganiru",
      "remote tech jobs Nigeria",
    ],
  },
};

import type { Metadata } from "next";

export function generatePageMetadata(pageKey: keyof typeof pageSEO): Metadata {
  const page = pageSEO[pageKey];

  if (!page) {
    return {
      title: siteConfig.name,
      description: siteConfig.description,
    };
  }

  const fullUrl = `${siteConfig.url}${page.path}`;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords ?? siteConfig.keywords,

    openGraph: {
      title: page.title,
      description: page.description,
      url: fullUrl,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
        },
      ],
      locale: siteConfig.locale,
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteConfig.ogImage],
      creator: siteConfig.twitterHandle,
    },

    metadataBase: new URL(siteConfig.url),
  };
}