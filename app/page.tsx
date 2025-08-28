import Hero from "./components/Hero";
import Features from "./components/Features";
import FadeInSection from "./components/FadeInSection";
export default function Home() {
  return (
    <>
      <FadeInSection>
        <Hero />
      </FadeInSection>
      <FadeInSection>
        <Features />
      </FadeInSection>
    </>
  );
}
