import type { MetadataRoute } from "next";
import { WEEKDAY_SLUGS } from "@/lib/open-houses-weekdays";
import { siteContact } from "@/lib/site-contact";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteContact.siteUrl.replace(/\/$/, "");
  const lastModified = new Date();

  return [
    {
      url: base,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/buyers`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.88,
    },
    {
      url: `${base}/buyers/process`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.82,
    },
    {
      url: `${base}/rhodes-ranch-las-vegas`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.92,
    },
    {
      url: `${base}/rhodes-ranch-lifestyle`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${base}/map`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.78,
    },
    {
      url: `${base}/search`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${base}/open-houses`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.86,
    },
    ...WEEKDAY_SLUGS.map((weekday) => ({
      url: `${base}/open-houses/${weekday}`,
      lastModified,
      changeFrequency: "daily" as const,
      priority: 0.84,
    })),
    {
      url: `${base}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/questions`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.84,
    },
  ];
}
