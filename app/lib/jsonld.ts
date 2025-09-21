export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  founder?: {
    "@type": "Person";
    name: string;
  };
  contactPoint?: {
    "@type": "ContactPoint";
    telephone?: string;
    contactType: string;
    email?: string;
    availableLanguage?: string[];
  };
  sameAs?: string[];
  address?: {
    "@type": "PostalAddress";
    addressCountry: string;
    addressRegion?: string;
    addressLocality?: string;
  };
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  potentialAction?: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
}

export interface WebPageSchema {
  "@context": "https://schema.org";
  "@type": "WebPage";
  name: string;
  url: string;
  description: string;
  isPartOf: {
    "@type": "WebSite";
    name: string;
    url: string;
  };
  about?: {
    "@type": "Thing";
    name: string;
  };
  breadcrumb?: {
    "@type": "BreadcrumbList";
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      item: string;
    }>;
  };
  mainEntity?: any;
}

export interface JobPostingSchema {
  "@context": "https://schema.org";
  "@type": "JobPosting";
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  employmentType: string;
  hiringOrganization: {
    "@type": "Organization";
    name: string;
    url: string;
  };
  jobLocation?: {
    "@type": "Place";
    address: {
      "@type": "PostalAddress";
      addressCountry: string;
    };
  };
  workHours?: string;
  baseSalary?: {
    "@type": "MonetaryAmount";
    currency: string;
    value: {
      "@type": "QuantitativeValue";
      minValue?: number;
      maxValue?: number;
      unitText: string;
    };
  };
}

export interface FAQSchema {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

// Base configuration
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://maplecatch.com';

// Organization schema for MapleCatch
export function getOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MapleCatch",
    url: BASE_URL,
    logo: `${BASE_URL}/assets/Logo.png`,
    description: "MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience. Support Canadian-owned businesses and shop local.",
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Matthew Jaberi"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "hello@maplecatch.com",
      availableLanguage: ["English", "French"]
    },
    sameAs: [
      // Add your social media URLs here when available
      // "https://twitter.com/maplecatch",
      // "https://linkedin.com/company/maplecatch"
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "CA"
    }
  };
}

// Website schema
export function getWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MapleCatch",
    url: BASE_URL,
    description: "MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience.",
    publisher: {
      "@type": "Organization",
      name: "MapleCatch",
      url: BASE_URL
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// WebPage schema generator
export function getWebPageSchema({
  name,
  url,
  description,
  breadcrumb,
  mainEntity
}: {
  name: string;
  url: string;
  description: string;
  breadcrumb?: Array<{ name: string; url: string }>;
  mainEntity?: any;
}): WebPageSchema {
  const schema: WebPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    url,
    description,
    isPartOf: {
      "@type": "WebSite",
      name: "MapleCatch",
      url: BASE_URL
    },
    about: {
      "@type": "Thing",
      name: "Canadian Shopping App"
    }
  };

  if (breadcrumb && breadcrumb.length > 0) {
    schema.breadcrumb = {
      "@type": "BreadcrumbList",
      itemListElement: breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
      }))
    };
  }

  if (mainEntity) {
    schema.mainEntity = mainEntity;
  }

  return schema;
}

// JobPosting schema for careers page
export function getJobPostingSchema(): JobPostingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: "No Current Openings - Future Opportunities",
    description: "MapleCatch is not currently hiring, but we welcome passionate individuals who share our vision of supporting Canadian businesses and communities. Send us your resume for future opportunities.",
    datePosted: new Date().toISOString(),
    validThrough: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: "MapleCatch",
      url: BASE_URL
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressCountry: "CA"
      }
    },
    workHours: "Flexible hours, remote-first"
  };
}

// FAQ schema generator
export function getFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

// Utility function to render JSON-LD script tag
export function renderJsonLd(schema: any): string {
  return `<script type="application/ld+json">${JSON.stringify(schema, null, 2)}</script>`;
}
