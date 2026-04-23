import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { CalendlyBadge } from "@/components/calendly/CalendlyBadge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { publicEnv } from "@/lib/env";
import { defaultMetadata } from "@/lib/metadata";
import { realEstateAgentJsonLd, websiteJsonLd } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

/** Editorial serif for headlines—luxury real estate tone without sacrificing readability. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  adjustFontFallback: true,
  preload: false,
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#14532d",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${cormorant.variable} h-full antialiased`}>
      <head>
        {/*
          RealScout: global UMD once in head (reliable customElements registration). `ensureRealScoutReady`
          still runs before mount and can fall back to injecting the tag in rare edge cases.
        */}
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <GoogleAnalytics />
        <Script
          id="realscout-web-components"
          src={publicEnv.realScoutWidgetScriptSrc}
          strategy="afterInteractive"
        />
      </head>
      <body className="luxury-canvas min-h-full flex flex-col font-sans text-stone-900">
        <JsonLd data={realEstateAgentJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <CalendlyBadge />
      </body>
    </html>
  );
}
