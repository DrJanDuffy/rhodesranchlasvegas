import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

/**
 * Static FAQ copy for AEO; keep answers accurate—no dollar amounts for HOA or fees unless sourced.
 */
export const rhodesRanchFaq: FaqItem[] = [
  {
    question: "Is Rhodes Ranch a gated community?",
    answer:
      "Yes. Rhodes Ranch is a guard-gated master-planned community in southwest Las Vegas (89148) with resort-style amenities and a central golf course.",
  },
  {
    question: "What is Rhodes Ranch Golf Club?",
    answer:
      "Rhodes Ranch Golf Club is a Ted Robinson–designed course that opened in 1997. Public information about tee times, membership, and events is available on the official Rhodes Ranch Golf Club website.",
  },
  {
    question: "What are the HOA fees at Rhodes Ranch?",
    answer:
      "HOA assessments change over time and depend on the home and section. For current fees and billing, contact the Rhodes Ranch homeowners association or your real estate professional for verified documents during a purchase.",
  },
  {
    question: "What are golf membership options at Rhodes Ranch?",
    answer:
      "Membership categories and pricing are set by Rhodes Ranch Golf Club. Review current options directly with the club or on their official website before you rely on them for budgeting.",
  },
  {
    question: "What real estate options exist in Rhodes Ranch?",
    answer:
      "The community includes single-family homes across a range of sizes and floor plans. Inventory and pricing change daily—use the home search on this site or ask Dr. Jan Duffy or Chance Fuller for a curated list that matches your criteria.",
  },
  {
    question: "Where can I find open houses for Rhodes Ranch Las Vegas homes?",
    answer: `${siteContact.secondaryContactName} (${siteContact.secondaryContactTitle}) maintains an interactive Google Map of upcoming open houses and tour stops in Rhodes Ranch, Spring Valley, and southwest Las Vegas—the map appears on the homepage and on our Open houses hub. For day-by-day planning and an MLS open house search, use ${siteContact.siteUrl.replace(/\/$/, "")}/open-houses. Inventory and times change; call ${siteContact.phoneDisplay} or use the contact page for private showings.`,
  },
];
