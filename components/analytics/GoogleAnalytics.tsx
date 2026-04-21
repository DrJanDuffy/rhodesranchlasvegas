import { publicEnv } from "@/lib/env";

/**
 * Google tag (gtag.js) — same markup as Google’s install snippet (async loader + inline config).
 * Renders in root layout `<head>` so Tag Assistant sees it in the initial HTML.
 */
export function GoogleAnalytics() {
  const id = publicEnv.googleAnalyticsMeasurementId;
  const src = `https://www.googletagmanager.com/gtag/js?id=${id}`;

  return (
    <>
      {/* Google tag (gtag.js) */}
      <script async src={src} />
      <script
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
