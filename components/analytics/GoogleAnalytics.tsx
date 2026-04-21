import Script from "next/script";
import { publicEnv } from "@/lib/env";

/** Google tag (gtag.js) — same behavior as Google’s install snippet; ID from `publicEnv`. */
export function GoogleAnalytics() {
  const id = publicEnv.googleAnalyticsMeasurementId;
  if (!id) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-config" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`}
      </Script>
    </>
  );
}
