import Hero from "@/components/Hero";
import ImpactHighlight from "@/components/ImpactHighlight";
import ProcessTimeline from "@/components/ProcessTimeline";
import ProductsSection from "@/components/ProductsSection";
import CareerSection from "@/components/CareerSection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProcessTimeline />
      <ProductsSection />
      <CareerSection />
    </>
  );
}