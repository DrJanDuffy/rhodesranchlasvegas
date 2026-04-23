/**
 * RealScout `realscout-office-listings` UMD readiness (client-only).
 * Expects a global script in `app/layout.tsx` (next/script) so registration is reliable after hydration.
 * If that tag is missing (edge cases), injects the UMD once and waits for the custom element.
 */

import { publicEnv } from "@/lib/env";

const SCRIPT_ID = "realscout-web-components-umd";

let loadPromise: Promise<void> | null = null;

function isRealScoutUmdUrl(scriptEl: HTMLScriptElement, expectedSrc: string): boolean {
  if (scriptEl.getAttribute("id") === "realscout-web-components" || scriptEl.getAttribute("id") === SCRIPT_ID) {
    return true;
  }
  try {
    const a = new URL(expectedSrc);
    const b = new URL(scriptEl.src);
    return a.hostname === b.hostname && a.pathname === b.pathname;
  } catch {
    return scriptEl.src === expectedSrc;
  }
}

function findRealScoutScriptTag(expectedSrc: string): HTMLScriptElement | null {
  for (const el of document.querySelectorAll<HTMLScriptElement>("script[src]")) {
    if (isRealScoutUmdUrl(el, expectedSrc)) return el;
  }
  return null;
}

function injectUmdAndAwaitLoad(): Promise<void> {
  const src = publicEnv.realScoutWidgetScriptSrc;
  const s = document.createElement("script");
  s.id = SCRIPT_ID;
  s.src = src;
  s.async = true;
  document.head.appendChild(s);
  return new Promise<void>((resolve, reject) => {
    s.addEventListener("load", () => resolve(), { once: true });
    s.addEventListener(
      "error",
      () =>
        reject(
          new Error(
            "RealScout UMD failed to load (check CSP script-src for em.realscout.com).",
          ),
        ),
      { once: true },
    );
  });
}

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get("realscout-office-listings")) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const expectedSrc = publicEnv.realScoutWidgetScriptSrc;

    // After navigation / hydration, allow layout’s next/script to append the tag.
    if (document.readyState !== "complete") {
      await new Promise<void>((resolve) => {
        window.addEventListener("load", () => resolve(), { once: true });
      });
    } else {
      await new Promise<void>((r) => requestAnimationFrame(() => r()));
    }

    for (let i = 0; i < 100; i++) {
      if (window.customElements.get("realscout-office-listings")) {
        return;
      }
      if (findRealScoutScriptTag(expectedSrc)) {
        break;
      }
      await new Promise((r) => setTimeout(r, 30));
    }

    if (!window.customElements.get("realscout-office-listings") && !findRealScoutScriptTag(expectedSrc)) {
      await injectUmdAndAwaitLoad();
    }

    const deadline = Date.now() + 30_000;
    while (
      !window.customElements.get("realscout-office-listings") &&
      Date.now() < deadline
    ) {
      await new Promise((r) => setTimeout(r, 32));
    }

    if (!window.customElements.get("realscout-office-listings")) {
      throw new Error(
        "Office listings widget did not register (check network, ad blockers, and CSP for em.realscout.com).",
      );
    }
  })().catch((e) => {
    loadPromise = null;
    throw e;
  });

  return loadPromise;
}
