/**
 * Browser scheduling helpers for Core Web Vitals (defer heavy third-party work past first paint).
 */

/** Wait for main-thread idle (or timeout) before loading non-critical widgets. */
export function waitForIdle(timeoutMs = 2000): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => resolve(), { timeout: timeoutMs });
      return;
    }
    setTimeout(resolve, Math.min(450, timeoutMs));
  });
}

/** Wait until element is near/in viewport (for lazy iframe / widget mount). */
export function waitUntilVisible(
  el: HTMLElement,
  options?: { rootMargin?: string; timeoutMs?: number },
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      resolve();
      return;
    }
    const margin = options?.rootMargin ?? "320px 0px 200px 0px";
    const maxMs = options?.timeoutMs ?? 12_000;
    const failSafe = setTimeout(done, maxMs);

    function done() {
      clearTimeout(failSafe);
      try {
        obs.disconnect();
      } catch {
        /* noop */
      }
      resolve();
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry?.isIntersecting) {
            done();
            return;
          }
        }
      },
      { rootMargin: margin, threshold: 0.01 },
    );
    obs.observe(el);
    // Flush pending records: avoids hanging when the target is already in an intersecting state.
    requestAnimationFrame(() => {
      if ("takeRecords" in obs && typeof obs.takeRecords === "function") {
        for (const entry of obs.takeRecords()) {
          if (entry.isIntersecting) {
            done();
            return;
          }
        }
      }
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const w = window.innerWidth;
      const preloaded =
        r.bottom > -100 && r.top < h + 320 && r.left < w + 1 && r.right > -1;
      if (preloaded) {
        done();
      }
    });
  });
}
