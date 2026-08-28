import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

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
  title: "StrictMode — ten minutes of React + TypeScript reps a day",
  description:
    "Five short questions a day, picked from what you haven't seen yet. Built for the two weeks before a technical interview. Free, no signup, runs in your browser.",
  applicationName: "StrictMode",
};

export const viewport: Viewport = {
  themeColor: "#12100f",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="bg-ink text-parchment min-h-full font-sans">
        <ProgressProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ProgressProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
