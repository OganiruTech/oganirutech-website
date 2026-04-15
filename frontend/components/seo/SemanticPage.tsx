// components/seo/SemanticPage.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Wraps page content in proper semantic HTML for SEO.
// Replaces bare <section> tags with <main>, <article>, <header> etc.
// ─────────────────────────────────────────────────────────────────────────────

import Link from "next/link";
import { siteConfig } from "@/lib/seo.config";

// ─── BreadcrumbNav ────────────────────────────────────────────────────────────
// Renders a visible + semantic breadcrumb trail.
// Pair with WebPageSchema's breadcrumb JSON-LD for full Google Rich Result.

type Crumb = { label: string; href?: string };

export function BreadcrumbNav({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="px-6 md:px-12 pt-6 pb-2 text-sm text-gray-400"
    >
      <ol
        className="flex items-center gap-2 list-none"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {crumbs.map((crumb, index) => (
          <li
            key={crumb.label}
            className="flex items-center gap-2"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {crumb.href ? (
              <Link
                href={crumb.href}
                itemProp="item"
                className="hover:text-emerald-400 transition-colors"
              >
                <span itemProp="name">{crumb.label}</span>
              </Link>
            ) : (
              <span className="text-white" itemProp="name">
                {crumb.label}
              </span>
            )}
            <meta itemProp="position" content={String(index + 1)} />
            {index < crumbs.length - 1 && (
              <span aria-hidden="true" className="text-gray-600">
                /
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── SemanticPageWrapper ──────────────────────────────────────────────────────
// Wraps your page in a <main> with proper ARIA landmark and itemScope.

export function SemanticPageWrapper({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={className}
      itemScope
      itemType="https://schema.org/WebPage"
    >
      {children}
    </main>
  );
}

// ─── SkipToContent ────────────────────────────────────────────────────────────
// Accessibility + SEO: lets keyboard/screen-reader users skip navigation.
// Place this as the VERY FIRST element inside <body> in your root layout.
//
// Usage in layout.tsx:
//   <SkipToContent />
//   <Navbar />
//   <main id="main-content">...</main>

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-2 left-2 z-[9999]
        bg-emerald-600 text-white
        px-4 py-2 rounded-lg
        font-semibold text-sm
        focus:outline-none focus:ring-2 focus:ring-emerald-400
      "
    >
      Skip to main content
    </a>
  );
}

// ─── PageSchema microdata helpers ────────────────────────────────────────────
// Sprinkle these props on your existing section/div elements to add
// inline microdata without changing your visual layout.
//
// Example: <section {...articleProps("How we build for Africa")}>
//
export const articleProps = (name: string) => ({
  itemScope: true,
  itemType: "https://schema.org/Article",
  "aria-label": name,
});

export const serviceProps = (name: string) => ({
  itemScope: true,
  itemType: "https://schema.org/Service",
  "aria-label": name,
});