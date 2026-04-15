import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";
import { OrganizationSchema, WebPageSchema } from "@/components/seo/jsonLd";
import UnderDevelopment from "@/components/UnderDevelopment";

export const metadata: Metadata = generatePageMetadata("careers");

export default function CareersPage() {
  return (
    <>
      <OrganizationSchema />
      <WebPageSchema
        name="Careers at Oganiru Technologies"
        description="Join the team building the digital future of Africa. Open roles in engineering, design, and product at Oganiru Technologies."
        path="/careers"
        datePublished="2024-01-01"
      />
      <UnderDevelopment />
    </>
  );
}