import type { MetadataRoute } from "next";
import { siteContact } from "@/lib/site-contact";

export default function robots(): MetadataRoute.Robots {
  const base = siteContact.siteUrl.replace(/\/$/, "");
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
