import type { Metadata } from "next";
import UnderDevelopment from "@/components/UnderDevelopment";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <UnderDevelopment />;
}
