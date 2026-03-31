import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import { CalendlyBadge } from "@/components/calendly/CalendlyBadge";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { JsonLd } from "@/components/seo/JsonLd";
import { defaultMetadata } from "@/lib/metadata";
import { realEstateAgentJsonLd } from "@/lib/schema";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Editorial serif for headlines—luxury real estate tone without sacrificing readability. */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export const viewport: Viewport = {
  themeColor: "#14532d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="luxury-canvas min-h-full flex flex-col font-sans text-stone-900">
        <JsonLd data={realEstateAgentJsonLd()} />
        {/*
          Office listings widget script loads from the client (lib/realscout-load.ts) when the widget mounts.
          Do not add a second script tag here — avoids duplicate loads and define() races.
        */}
        <SiteHeader />
        <div className="flex-1">{children}</div>
        <SiteFooter />
        <CalendlyBadge />
      </body>
    </html>
  );
}
