import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import SkillsSection from "@/components/SkillsSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import TestimonialsSection from "@/components/TestimonialsSection";
import MegaFooter from "@/components/MegaFooter";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <SkillsSection />
      <PortfolioGrid />
      <TestimonialsSection />
      <MegaFooter />
    </>
  );
}
