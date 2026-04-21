import Script from "next/script";
import { publicEnv } from "@/lib/env";

/**
 * Google tag (gtag.js) — matches Google’s install snippet.
 * Uses `beforeInteractive` so the tag appears in the initial HTML and passes Tag Assistant / “tag not detected” checks.
 * Must stay in the root `app/layout.tsx` (Next.js requirement for `beforeInteractive`).
 */
export function GoogleAnalytics() {
  const id = publicEnv.googleAnalyticsMeasurementId;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="beforeInteractive"
      />
      <Script id="ga4-config" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
