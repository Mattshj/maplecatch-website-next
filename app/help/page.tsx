import HelpCenterClient from "../components/HelpCenterClient";
import JsonLd from "../components/JsonLd";
import { getWebPageSchema, getFAQSchema } from "../lib/jsonld";

export default function Page() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maplecatch.com";

  // Sample FAQ data - you can expand this with real FAQ content
  const faqs = [
    {
      question: "What is MapleCatch?",
      answer:
        "MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience. We help support Canadian-owned businesses and promote local shopping.",
    },
    {
      question: "How do I create a shopping list?",
      answer:
        "You can create personalized shopping lists with intelligent suggestions. Add items, mark them as purchased, and stay organized with our intuitive interface.",
    },
    {
      question: "Is MapleCatch free to use?",
      answer:
        "Yes, MapleCatch is free to download and use. We're committed to providing accessible tools for supporting Canadian businesses.",
    },
    {
      question: "How do I discover Canadian brands?",
      answer:
        "Our app matches you with local Canadian brands based on your selected items. From dairy to snacks, discover authentic Canadian products that support local businesses.",
    },
  ];

  return (
    <div className="p-6">
      {/* JSON-LD Structured Data */}
      <JsonLd
        data={getWebPageSchema({
          name: "Help Center - MapleCatch Support",
          url: `${baseUrl}/help`,
          description:
            "Get help and support for MapleCatch. Find answers to frequently asked questions and learn how to use our smart shopping app.",
          breadcrumb: [
            { name: "Home", url: baseUrl },
            { name: "Help", url: `${baseUrl}/help` },
          ],
        })}
      />
      <JsonLd data={getFAQSchema(faqs)} />

      <HelpCenterClient />
    </div>
  );
}
