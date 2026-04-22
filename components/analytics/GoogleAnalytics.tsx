import Script from "next/script";
import { publicEnv } from "@/lib/env";

/**
 * Google tag (gtag.js) via `next/script` with `lazyOnload` to reduce main-thread / LCP contention
 * (PageSpeed: unused JS, long tasks on `/gtag/js`). Events queue after `load`; very fast bounces
 * may not record—acceptable tradeoff per performance plan.
 */
export function GoogleAnalytics() {
  const id = publicEnv.googleAnalyticsMeasurementId;
  const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;

  return (
    <>
      <Script id="ga-gtag" src={src} strategy="lazyOnload" />
      <Script
        id="ga-config"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${id}');`,
        }}
      />
    </>
  );
}
