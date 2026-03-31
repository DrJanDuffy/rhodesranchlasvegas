/**
 * Single-flight loader for Calendly widget.js + widget.css (client-only).
 *
 * Post-deploy checklist (Google Search Console):
 * - URL Inspection: `/contact`, `/search` (live URL) — confirm indexed, no crawl blocks.
 * - If static assets fail: check CSP in next.config.ts (Calendly script/style/frame/connect).
 * - Core Web Vitals: this module loads the script once per session; avoid duplicate widget.js tags.
 */

export const CALENDLY_WIDGET_CSS_HREF =
  "https://assets.calendly.com/assets/external/widget.css";

export const CALENDLY_WIDGET_SCRIPT_SRC =
  "https://assets.calendly.com/assets/external/widget.js";

let loadPromise: Promise<void> | null = null;

function ensureCalendlyCss(): void {
  if (typeof document === "undefined") return;
  const id = "calendly-widget-css";
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = CALENDLY_WIDGET_CSS_HREF;
  document.head.appendChild(link);
}

export function ensureCalendlyReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.Calendly) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    ensureCalendlyCss();

    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${CALENDLY_WIDGET_SCRIPT_SRC}"]`,
    );

    if (!script) {
      script = document.createElement("script");
      script.src = CALENDLY_WIDGET_SCRIPT_SRC;
      script.async = true;
      document.head.appendChild(script);
      await new Promise<void>((resolve, reject) => {
        script!.onload = () => resolve();
        script!.onerror = () => reject(new Error("Calendly widget script failed to load"));
      });
    } else {
      await new Promise<void>((resolve, reject) => {
        if (window.Calendly) {
          resolve();
          return;
        }
        script!.addEventListener("load", () => resolve(), { once: true });
        script!.addEventListener("error", () => reject(new Error("Calendly script error")), {
          once: true,
        });
        if (document.readyState === "complete" && window.Calendly) resolve();
      });
    }

    const deadline = Date.now() + 25_000;
    while (!window.Calendly && Date.now() < deadline) {
      await new Promise((r) => setTimeout(r, 32));
    }
    if (!window.Calendly) {
      throw new Error("Calendly global not available after script load");
    }
  })().catch((e) => {
    loadPromise = null;
    throw e;
  });

  return loadPromise;
}
