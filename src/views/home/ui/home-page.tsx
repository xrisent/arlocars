import { AboutUsSection } from "@/widgets/about-us";
import { HeroSection } from "@/widgets/hero";
import { SellCarSection } from "@/widgets/sell-car";
import { ServicesBanner } from "@/widgets/services-banner";
import { SolutionCards } from "@/widgets/solution-cards";

export const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <SellCarSection />
      <ServicesBanner />
      <SolutionCards />
      <AboutUsSection />
    </main>
  );
};
