import Hero from "./components/Hero";
import Features from "./components/Features";
import FadeInSection from "./components/FadeInSection";
import ScreenshotSection from "./components/ScreenshotPhoneCard";
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
