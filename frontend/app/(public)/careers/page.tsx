import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";
import { OrganizationSchema, WebPageSchema } from "@/components/seo/jsonLd";
import PageHeader from "@/components/ui/PageHeader";
import CareersPage from "@/components/CareersPage";
import Button from "@/components/Button";

export const metadata: Metadata = generatePageMetadata("careers");

export default function Careers() {
  return (
    <>
      <OrganizationSchema />
      <WebPageSchema
        name="Careers at Oganiru Technologies"
        description="What it's like to work at Oganiru Technologies, how we hire, and how to reach us when there are no open roles."
        path="/careers"
        datePublished="2024-01-01"
      />

      <PageHeader
        eyebrow="Careers"
        title={
          <>
            Build the future{" "}
            <span className="bg-gradient-to-r from-emerald-300 to-emerald-400 bg-clip-text text-transparent">
              with Oganiru
            </span>
          </>
        }
        lead="We're a small engineering studio based in Nigeria, building systems for clients across Africa that have to survive contact with the real world. Here's what the work is like, how we hire, and where things stand right now."
      >
        <Button href="/contact" size="lg" withArrow>
          Send us your work
        </Button>
      </PageHeader>

      <CareersPage />
    </>
  );
}
