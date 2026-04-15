import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo.config";
import {
  OrganizationSchema,
  ContactPageSchema,
  LocalBusinessSchema,
} from "@/components/seo/jsonLd";
import ContactPageClient from "@/components/ContactPage";

export const metadata: Metadata = generatePageMetadata("contact");

export default function ContactPage() {
  return (
    <>
      <OrganizationSchema />
      <ContactPageSchema />
      <LocalBusinessSchema />
      <ContactPageClient />
    </>
  );
}