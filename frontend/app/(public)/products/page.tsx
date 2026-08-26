import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";
import { OrganizationSchema, WebPageSchema } from "@/components/seo/jsonLd";
import PageHeader from "@/components/ui/PageHeader";
import ProductsSection from "@/components/ProductsSection";
import Button from "@/components/Button";

/* This route was previously a "use client" component with an inline copy of
   UnderDevelopment and no metadata export at all — so /products shipped with
   the generic site title, no canonical, no OG tags and no structured data,
   despite sitemap.ts listing it at priority 0.9. */

export const metadata: Metadata = generatePageMetadata("products");

export default function ProductsPage() {
  return (
    <>
      <OrganizationSchema />
      <WebPageSchema
        name="Products"
        description="The digital products Oganiru Technologies is building for African businesses — currently in private testing."
        path="/products"
        datePublished="2024-01-01"
      />

      <PageHeader
        eyebrow="Products"
        title={
          <>
            Software we&apos;re building{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              on our own account
            </span>
          </>
        }
        lead="Client work teaches you which problems keep coming back. These are the ones we decided to solve properly — for inventory, operations and payments in small African businesses. The first is in private testing; nothing is publicly available yet."
      >
        <div className="flex flex-wrap gap-3.5">
          <Button href="#notify" size="lg" withArrow>
            Get launch access
          </Button>
          <Button href="/contact" size="lg" variant="outline">
            Work with us instead
          </Button>
        </div>
      </PageHeader>

      <div id="notify" className="scroll-mt-24">
        <ProductsSection showHeader={false} />
      </div>
    </>
  );
}
