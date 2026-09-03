import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { ProgressProvider, Toaster, TooltipProvider } from "@components";
import "./globals.css";

const BASE_URL = "https://strictmode.bermeo.dev";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "StrictMode — Ten minutes of React + TypeScript reps a day",
    template: "%s | StrictMode",
  },
  description:
    "Five short questions a day, picked from what you haven't seen yet. Built for the two weeks before a technical interview. Free, no signup, runs in your browser.",
  applicationName: "StrictMode",
  keywords: [
    "React",
    "TypeScript",
    "Frontend Interview",
    "Technical Interview",
    "React Hooks",
    "Next.js",
    "React Server Components",
    "Web Performance",
    "Spaced Repetition",
    "Senior Frontend Engineer",
    "JavaScript",
    "System Design",
  ],
  authors: [{ name: "Bermeo", url: BASE_URL }],
  creator: "Bermeo",
  publisher: "StrictMode",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "StrictMode",
    title: "StrictMode — Ten minutes of React + TypeScript reps a day",
    description:
      "Master React and TypeScript for senior frontend technical interviews with 5 daily deliberate practice reps. Spaced repetition, zero login, local-first.",
  },
  twitter: {
    card: "summary_large_image",
    title: "StrictMode — Ten minutes of React + TypeScript reps a day",
    description:
      "Master React and TypeScript for senior frontend technical interviews with 5 daily deliberate practice reps.",
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
  icons: {
    icon: "/icon.svg",
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#12100f",
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "StrictMode",
      description:
        "Ten minutes of React + TypeScript reps a day for frontend technical interviews.",
      publisher: {
        "@type": "Person",
        name: "Bermeo",
        url: BASE_URL,
      },
    },
    {
      "@type": "WebApplication",
      "@id": `${BASE_URL}/#webapp`,
      name: "StrictMode",
      url: BASE_URL,
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Daily deliberate practice tool with 5 React and TypeScript questions a day using SM-2 spaced repetition.",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="en"
      className={`dark ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-ink text-parchment min-h-full font-sans">
        <ProgressProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ProgressProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
