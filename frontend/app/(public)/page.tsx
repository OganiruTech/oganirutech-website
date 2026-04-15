import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";
import {
  OrganizationSchema,
  WebSiteSchema,
  WebPageSchema,
  LocalBusinessSchema,
  FAQSchema,
} from "@/components/seo/jsonLd";
 
import Hero from "@/components/Hero";
import ImpactHighlight from "@/components/ImpactHighlight";
import ProcessTimeline from "@/components/ProcessTimeline";
import ProductsSection from "@/components/ProductsSection";
import CareerSection from "@/components/CareerSection";
 
export const metadata: Metadata = generatePageMetadata("home");
 
export default function Home() {
  return (
    <>
      <OrganizationSchema />
      <WebSiteSchema />
      <WebPageSchema
        name="Home"
        description="Oganiru Technologies builds resilient digital systems that help African businesses scale and thrive."
        path="/"
        datePublished="2024-01-01"
      />
      <LocalBusinessSchema />
      <FAQSchema />
 
      <Hero />
      <ImpactHighlight />
      <ProcessTimeline />
      <ProductsSection />
      <CareerSection />
    </>
  );
}