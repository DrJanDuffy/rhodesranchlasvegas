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
  options?: { rootMargin?: string },
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      resolve();
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          obs.disconnect();
          resolve();
        }
      },
      { rootMargin: options?.rootMargin ?? "320px 0px 200px 0px", threshold: 0.01 },
    );
    obs.observe(el);
  });
}
