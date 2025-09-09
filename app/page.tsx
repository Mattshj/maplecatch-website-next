import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import Features from "./components/Features";
import FadeInSection from "./components/FadeInSection";

// Lazy load heavy components
const ScreenshotSection = dynamic(
  () => import("./components/ScreenshotPhoneCard"),
  {
    loading: () => (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    ),
    ssr: false, // Disable SSR for this component since it's interactive
  }
);

export default function Home() {
  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <Features />
      </FadeInSection>
      <FadeInSection>
        <ScreenshotSection />
      </FadeInSection>
    </>
  );
}
