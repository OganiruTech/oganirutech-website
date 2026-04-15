// components/seo/JsonLd.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Drop-in JSON-LD structured data components (schema.org).
// Each component renders a <script type="application/ld+json"> tag.
// Usage: import the relevant component and place it inside your page's <head>
// OR anywhere in the page body (Google reads it either way in Next.js).
// ─────────────────────────────────────────────────────────────────────────────

import { siteConfig } from "@/lib/seo.config";

// ─── 1. Organization Schema (use on every page via root layout) ───────────────
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.png`,
      width: 200,
      height: 60,
    },
    description: siteConfig.description,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: siteConfig.address.country,
      addressRegion: siteConfig.address.region,
      addressLocality: siteConfig.address.locality,
    },
    sameAs: [
      siteConfig.socials.twitter,
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "English",
      areaServed: ["NG", "GH", "KE", "ZA"],
    },
    knowsAbout: [
      "Software Development",
      "Web Development",
      "Mobile App Development",
      "Brand Identity Design",
      "Digital Transformation",
      "Technology Consulting",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 2. WebSite Schema with SiteLinksSearchBox (Home page) ────────────────────
export function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-NG",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 3. WebPage Schema (generic — used on Home, Products, Careers) ────────────
export function WebPageSchema({
  name,
  description,
  path,
  datePublished = "2024-01-01",
  dateModified,
}: {
  name: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${siteConfig.url}${path}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    datePublished,
    dateModified: dateModified ?? new Date().toISOString().split("T")[0],
    inLanguage: "en-NG",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        ...(path !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name,
                item: url,
              },
            ]
          : []),
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 4. ContactPage Schema ────────────────────────────────────────────────────
export function ContactPageSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact#webpage`,
    url: `${siteConfig.url}/contact`,
    name: "Contact Oganiru Technologies",
    description:
      "Get in touch with the Oganiru Technologies team for projects, partnerships, and inquiries.",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#organization` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Contact",
          item: `${siteConfig.url}/contact`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 5. LocalBusiness Schema (boosts local SEO in Nigeria / Africa) ───────────
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SoftwareApplication", "ProfessionalService"],
    "@id": `${siteConfig.url}/#localbusiness`,
    name: siteConfig.name,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    description: siteConfig.description,
    priceRange: "$$",
    currenciesAccepted: "NGN, USD",
    paymentAccepted: "Bank Transfer, Crypto",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      addressCountry: "NG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 4.8156,
      longitude: 7.0498,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
    sameAs: [
      siteConfig.socials.twitter,
      siteConfig.socials.facebook,
      siteConfig.socials.instagram,
    ],
    areaServed: [
      { "@type": "Country", name: "Nigeria" },
      { "@type": "Continent", name: "Africa" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Platform Development",
            description: "Custom web applications and platforms built for scale",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "iOS and Android apps engineered for growth",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Brand Identity Design",
            description: "Brand systems that command authority and inspire trust",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Digital Strategy & Consulting",
            description:
              "Ideation, market intelligence, and scalable digital business models",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── 6. FAQPage Schema (add to Contact or Home page) ─────────────────────────
export function FAQSchema() {
  const faqs = [
    {
      question: "What services does Oganiru Technologies offer?",
      answer:
        "We offer web and mobile platform development, brand identity design, digital strategy consulting, market intelligence, and digital marketing systems for African businesses.",
    },
    {
      question: "Where is Oganiru Technologies based?",
      answer:
        "We are based in Port Harcourt, Rivers State, Nigeria, and serve clients across Africa and globally.",
    },
    {
      question: "How quickly does Oganiru respond to inquiries?",
      answer:
        "Our typical response time is within 24 hours during business hours (Monday–Friday, 9 AM–6 PM WAT).",
    },
    {
      question: "Does Oganiru work with early-stage startups?",
      answer:
        "Yes. We work with startups from the ideation stage through to launch and scale, providing strategy, branding, and technical development.",
    },
    {
      question: "What technologies does Oganiru build with?",
      answer:
        "We build with modern web and mobile technologies including React, Next.js, Node.js, and cloud-native infrastructure designed for African market conditions.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}