import { memo, lazy, Suspense } from "react";
import { MemoizedNavbar } from "@/components/navbar";
import { MemoizedHeroSection } from "@/components/hero-section";

const AboutSection = lazy(() => import("@/components/about-section").then(m => ({ default: m.MemoizedAboutSection })));
const ServicesSection = lazy(() => import("@/components/services-section").then(m => ({ default: m.MemoizedServicesSection })));
const SolutionsSection = lazy(() => import("@/components/solutions-section").then(m => ({ default: m.MemoizedSolutionsSection })));
const WhyChooseSection = lazy(() => import("@/components/why-choose-section").then(m => ({ default: m.MemoizedWhyChooseSection })));
const ProcessSection = lazy(() => import("@/components/process-section").then(m => ({ default: m.MemoizedProcessSection })));
const ContactSection = lazy(() => import("@/components/contact-section").then(m => ({ default: m.MemoizedContactSection })));
const Footer = lazy(() => import("@/components/footer").then(m => ({ default: m.MemoizedFooter })));

const SectionLoader = memo(function SectionLoader() {
  return (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-yellow-500/30 border-t-yellow-500 animate-spin" />
    </div>
  );
});

function Home() {
  return (
    <div className="min-h-screen relative z-10 noise-overlay" data-testid="page-home">
      <MemoizedNavbar />
      <main>
        <MemoizedHeroSection />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SolutionsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <WhyChooseSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default memo(Home);
