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
      "Monday is when serious buyers reset the week: scan new MLS open house rows for Rhodes Ranch and Spring Valley (89148), note broker-reported windows, then cross-check the weekend map so you are not chasing stale pins after a quiet Sunday night.",
  },
  tuesday: {
    label: "Tuesday",
    title: "Tuesday open houses and showings",
    intro:
      "Tuesday walk-through traffic is usually lighter than Saturday, which can mean easier parking at guard-gated entries and more time with the hosting agent—still verify gate rules and ID requirements before you queue at Rhodes Ranch.",
  },
  wednesday: {
    label: "Wednesday",
    title: "Wednesday open houses and showings",
    intro:
      "Wednesday is ideal for comparing list-to-list without weekend crowds: use the office search below for midweek opens, then short-list two or three Spring Valley alternates if your first Rhodes Ranch pick does not hold an open this cycle.",
  },
  thursday: {
    label: "Thursday",
    title: "Thursday open houses and showings",
    intro:
      "Thursday listings often tee up the Friday-through-Sunday surge—lock your route early, text the listing side if a Rhodes Ranch address needs RSVP for gate access, and keep a backup slot open in case one host moves hours at the last minute.",
  },
  friday: {
    label: "Friday",
    title: "Friday open houses and showings",
    intro:
      "Friday is when the weekend tour plan comes together: blend the live MLS widget with the Google My Maps layer for Rhodes Ranch and southwest Las Vegas so you are not doubling back between 89148 pockets and parallel Spring Valley corridors.",
  },
  saturday: {
    label: "Saturday",
    title: "Saturday open houses",
    intro:
      "Saturday remains the busiest open-house block in the valley—start near Rhodes Ranch if guard lines form, carry HOA questions for the listing agent, and budget extra drive time between Spring Valley pockets when multiple 89148 homes overlap.",
  },
  sunday: {
    label: "Sunday",
    title: "Sunday open houses",
    intro:
      "Sunday draws relocation buyers and locals finishing a two-day sweep—re-read each listing status the same morning, watch for early closes, and call if you need a private showing after a crowded Rhodes Ranch or Las Vegas open house window.",
  },
};

export function isWeekdaySlug(s: string): s is WeekdaySlug {
  return (WEEKDAY_SLUGS as string[]).includes(s);
}
