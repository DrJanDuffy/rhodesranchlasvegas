import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * Canonical host redirect (apex → www) when NEXT_PUBLIC_SITE_URL uses a www hostname.
 * Vercel/DNS should still be primary; this guards misconfigured DNS or alternate entry hosts.
 */
function canonicalHostname(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return "www.rhodesranchlasvegas.com";
  try {
    const href = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
    return new URL(href).hostname.toLowerCase();
  } catch {
    return "www.rhodesranchlasvegas.com";
  }
}

export function middleware(request: NextRequest) {
  const canonical = canonicalHostname();
  const host = request.headers.get("host")?.split(":")[0]?.toLowerCase();
  if (!host || host === canonical) {
    return NextResponse.next();
  }

  if (host === "localhost" || host.endsWith(".vercel.app")) {
    return NextResponse.next();
  }

  const apex =
    canonical.startsWith("www.") && canonical.length > 4 ? canonical.slice(4) : null;
  if (apex && host === apex) {
    const url = request.nextUrl.clone();
    url.hostname = canonical;
    url.protocol = "https:";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json|webmanifest)$).*)",
  ],
};
