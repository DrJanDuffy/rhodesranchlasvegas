/**
 * RealScout `realscout-office-listings` UMD readiness (client-only).
 * Expects a global `next/script` in `app/layout.tsx`; `ensureRealScoutReady` falls back to
 * injecting the UMD if the tag is still missing.
 */

import { publicEnv } from "@/lib/env";

const CE_NAME = "realscout-office-listings";
const SCRIPT_ID = "realscout-web-components-umd";
const REGISTRATION_MAX_MS = 40_000;

let loadPromise: Promise<void> | null = null;

function isRealScoutUmdUrl(scriptEl: HTMLScriptElement, expectedSrc: string): boolean {
  const hasSrc = scriptEl.getAttribute("src");
  if (!hasSrc) return false;
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
  if (document.getElementById("realscout-web-components") instanceof HTMLScriptElement) {
    const byId = document.getElementById("realscout-web-components") as HTMLScriptElement;
    if (isRealScoutUmdUrl(byId, expectedSrc)) return byId;
  }
  if (document.getElementById(SCRIPT_ID) instanceof HTMLScriptElement) {
    const byId = document.getElementById(SCRIPT_ID) as HTMLScriptElement;
    if (isRealScoutUmdUrl(byId, expectedSrc)) return byId;
  }
  return null;
}

/** UMD: wait for the external script to finish (load may not refire for cache hits). */
function waitForScriptToExecute(tag: HTMLScriptElement): Promise<void> {
  if (window.customElements.get(CE_NAME)) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const finish = () => resolve();
    tag.addEventListener("load", finish, { once: true });
    tag.addEventListener("error", finish, { once: true });
    // Cached / already-executed scripts: allow microtask, then `whenDefined` will decide.
    setTimeout(finish, 0);
  });
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

function waitForCustomElementRegistered(): Promise<void> {
  if (window.customElements.get(CE_NAME)) {
    return Promise.resolve();
  }
  return Promise.race([
    customElements.whenDefined(CE_NAME) as Promise<unknown>,
    new Promise<never>((_, r) => {
      setTimeout(
        () =>
          r(
            new Error(
              `Office listings widget did not register within ${REGISTRATION_MAX_MS / 1000}s (network, ad blockers, or CSP for em.realscout.com / ${CE_NAME}).`,
            ),
          ),
        REGISTRATION_MAX_MS,
      );
    }),
  ]).then(() => undefined);
}

export function ensureRealScoutReady(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.customElements.get(CE_NAME)) {
    return Promise.resolve();
  }

  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const expectedSrc = publicEnv.realScoutWidgetScriptSrc;

    if (document.readyState !== "complete") {
      await new Promise<void>((resolve) => {
        window.addEventListener("load", () => resolve(), { once: true });
      });
    } else {
      await new Promise<void>((r) => {
        requestAnimationFrame(() => r());
      });
    }

    for (let i = 0; i < 120; i++) {
      if (window.customElements.get(CE_NAME)) {
        return;
      }
      if (findRealScoutScriptTag(expectedSrc)) {
        break;
      }
      await new Promise((r) => setTimeout(r, 25));
    }

    if (window.customElements.get(CE_NAME)) {
      return;
    }

    let tag = findRealScoutScriptTag(expectedSrc);
    if (!tag) {
      await injectUmdAndAwaitLoad();
      tag = findRealScoutScriptTag(expectedSrc);
    }
    if (tag) {
      await waitForScriptToExecute(tag);
    }

    await waitForCustomElementRegistered();
  })().catch((e) => {
    loadPromise = null;
    throw e;
  });

  return loadPromise;
}
