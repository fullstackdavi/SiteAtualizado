import { memo } from "react";
import { MemoizedNavbar } from "@/components/navbar";
import { MemoizedHeroSection } from "@/components/hero-section";
import { MemoizedAboutSection } from "@/components/about-section";
import { MemoizedServicesSection } from "@/components/services-section";
import { MemoizedSolutionsSection } from "@/components/solutions-section";
import { MemoizedWhyChooseSection } from "@/components/why-choose-section";
import { MemoizedProcessSection } from "@/components/process-section";
import { MemoizedContactSection } from "@/components/contact-section";
import { MemoizedFooter } from "@/components/footer";

function Home() {
  return (
    <div className="min-h-screen relative z-10 noise-overlay" data-testid="page-home">
      <MemoizedNavbar />
      <main>
        <MemoizedHeroSection />
        <MemoizedAboutSection />
        <MemoizedServicesSection />
        <MemoizedSolutionsSection />
        <MemoizedWhyChooseSection />
        <MemoizedProcessSection />
        <MemoizedContactSection />
      </main>
      <MemoizedFooter />
    </div>
  );
}

export default memo(Home);
