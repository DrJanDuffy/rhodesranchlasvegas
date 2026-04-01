/** Slugs and copy for `/open-houses/[weekday]` — SEO + AEO; map pins may link to RealScout from Google My Maps. */

export type WeekdaySlug =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export const WEEKDAY_SLUGS: WeekdaySlug[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export const weekdayMeta: Record<
  WeekdaySlug,
  { label: string; title: string; intro: string }
> = {
  monday: {
    label: "Monday",
    title: "Monday open houses and showings",
    intro:
      "Start the week with a focused plan: review open house listings below, cross-check times on the map, and call for a private tour if a Rhodes Ranch or southwest Las Vegas home fits your list.",
  },
  tuesday: {
    label: "Tuesday",
    title: "Tuesday open houses and showings",
    intro:
      "Tuesday tours often have lighter traffic—use the listings search for scheduled opens, then confirm details on the weekend map or with your agent before you drive.",
  },
  wednesday: {
    label: "Wednesday",
    title: "Wednesday open houses and showings",
    intro:
      "Midweek is a good time to compare new inventory and line up weekend routes. Listings update as brokers publish open house times; refresh before you head out.",
  },
  thursday: {
    label: "Thursday",
    title: "Thursday open houses and showings",
    intro:
      "Thursday listings help you finalize a short list for the weekend. Guard-gated communities may require advance notice—call if you need access arranged.",
  },
  friday: {
    label: "Friday",
    title: "Friday open houses and showings",
    intro:
      "Friday often previews the weekend lineup. Pair the search below with the map to plan Saturday and Sunday stops across Rhodes Ranch and nearby neighborhoods.",
  },
  saturday: {
    label: "Saturday",
    title: "Saturday open houses",
    intro:
      "Saturday is peak open-house day in Las Vegas—arrive early, bring questions about HOA and timing, and use the map to route multiple properties in 89148 and Spring Valley.",
  },
  sunday: {
    label: "Sunday",
    title: "Sunday open houses",
    intro:
      "Sunday opens are popular for busy buyers. Confirm hours on each listing; times and status can change the same day in a competitive market.",
  },
};

export function isWeekdaySlug(s: string): s is WeekdaySlug {
  return (WEEKDAY_SLUGS as string[]).includes(s);
}
