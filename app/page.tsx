import Hero from "./components/Hero";
import Features from "./components/Features";
import FadeInSection from "./components/FadeInSection";
import ScreenshotSection from "./components/LazyScreenshotSection";
import JsonLd from "./components/JsonLd";
import { getWebSiteSchema, getWebPageSchema } from "./lib/jsonld";

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maplecatch.com";

  return (
    <>
      {/* JSON-LD Structured Data */}
      <JsonLd data={getWebSiteSchema()} />
      <JsonLd
        data={getWebPageSchema({
          name: "MapleCatch - Shop Local in Canada",
          url: baseUrl,
          description:
            "MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience. Support Canadian-owned businesses and shop local.",
          breadcrumb: [{ name: "Home", url: baseUrl }],
        })}
      />

      <FadeInSection>
        <Hero />
      </FadeInSection>
      <Features />
      <FadeInSection>
        <ScreenshotSection />
      </FadeInSection>
    </>
  );
}
