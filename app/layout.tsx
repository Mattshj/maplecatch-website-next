import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ErrorProvider } from "./contexts/ErrorContext";
import ErrorToastContainer from "./components/ErrorToastContainer";
import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import { initializeErrorHandler } from "./utils/errorHandler";
import "./utils/production"; // Disable React DevTools in production

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MapleCatch - Shop Local in Canada | Support Canadian Businesses",
  description:
    "MapleCatch is a smart shopping web app for Canadians to create shopping lists, discover local brands, and enjoy a secure, privacy-focused experience. Support Canadian-owned businesses and shop local.",
  keywords: [
    "MapleCatch",
    "smart shopping",
    "Canadian brands",
    "shopping list",
    "local businesses",
    "secure web app",
    "privacy-focused",
    "shop smarter",
    "Canadian-made products",
    "local shopping",
    "accessibility",
  ],
  icons: {
    icon: [{ url: "/assets/favicon.png", type: "image/png", sizes: "42x42" }],
    shortcut: "/assets/Designer.png", // default favicon
    apple: "/assets/Designer.png", // for Apple touch devices
  },
  authors: [{ name: "Matthew Jaberi" }],
  creator: "Matthew Jaberi",
  publisher: "MapleCatch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    "theme-color": "#000000",
    "color-scheme": "light dark",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "MapleCatch",
    "application-name": "MapleCatch",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize global error handler
  if (typeof window !== "undefined") {
    initializeErrorHandler({
      onError: (error, errorInfo) => {
        console.error("Global error caught:", error, errorInfo);
      },
      onUnhandledRejection: (reason, promise) => {
        console.error("Unhandled promise rejection:", reason, promise);
      },
    });
  }

  return (
    <html lang="en">
      <head>
        {/* Security and Privacy Meta Tags */}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />

        {/* Prevent search engines from archiving */}
        <meta name="robots" content="noarchive" />

        {/* Accessibility Meta Tags */}
        <meta name="accessibility" content="WCAG 2.1 AA compliant" />
        <meta
          name="accessibility-feature"
          content="keyboard navigation, screen reader support, high contrast"
        />

        {/* DNS Prefetch for performance - Next.js handles Google Fonts optimization automatically */}
      </head>
      <body
        className={`${inter.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorProvider>
          <ErrorBoundary>
            <PageLoader>
              <Header />
              {children}
              <Footer />
              <ErrorToastContainer />
            </PageLoader>
          </ErrorBoundary>
        </ErrorProvider>
      </body>
    </html>
  );
}
