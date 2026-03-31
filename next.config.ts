import type { NextConfig } from "next";
import path from "path";

/** Pin Turbopack root when multiple lockfiles exist above this repo (silences wrong-root warnings). */
const turbopackRoot = path.resolve(process.cwd());

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://em.realscout.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "worker-src 'self' blob:",
  "connect-src 'self' https://www.realscout.com https://em.realscout.com wss://www.realscout.com",
  "frame-src 'self' https://maps.google.com https://www.google.com https://www.google.com/maps https://www.realscout.com https://em.realscout.com",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  turbopack: {
    root: turbopackRoot,
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
