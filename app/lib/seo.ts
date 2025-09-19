import { Metadata } from 'next';

export function generateMetadata({
  title,
  description,
  path = '/',
  noIndex = false,
}: {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
}): Metadata {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://maplecatch.com';
  const canonicalUrl = `${baseUrl}${path}`;

  return {
    title: title ? `${title} | MapleCatch` : 'MapleCatch - Shop Local in Canada | Support Canadian Businesses',
    description: description || 'MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience.',
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: title || 'MapleCatch - Shop Local in Canada',
      description: description || 'Support Canadian businesses with MapleCatch',
      url: canonicalUrl,
      siteName: 'MapleCatch',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'MapleCatch - Shop Local in Canada',
      description: description || 'Support Canadian businesses with MapleCatch',
    },
  };
}
