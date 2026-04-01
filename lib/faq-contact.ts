/**
 * Contact / scheduling FAQ for `/contact` only (paired with FAQPage JSON-LD).
 */

import type { FaqItem } from "@/lib/schema";
import { siteContact } from "@/lib/site-contact";

export const contactFaq: FaqItem[] = [
  {
    question: "What is your office address in Las Vegas?",
    answer: `Our office is at ${siteContact.fullAddressLine}. Phone and hours are listed on this page.`,
  },
  {
    question: "How do I schedule a call with Dr. Jan Duffy or the buyer specialist?",
    answer:
      "Use the scheduling calendar on this page to book a private 15-minute conversation. You can also call or text the office number in the contact section for immediate questions, or email the listing or buyer inbox if you prefer written contact first.",
  },
  {
    question: "What should I prepare before a Rhodes Ranch home consultation?",
    answer:
      "Have a general budget range, your timeline (e.g. 30–90 days), and any must-haves (bedrooms, single-story, golf or guard-gate preference). For selling, note your target timeframe and any upgrades you have made to the home.",
  },
  {
    question: "Do you offer in-person showings in 89148?",
    answer:
      "Yes. Weekend and evening showings are often available by appointment. Mention timing constraints when you book or call so we can align calendars.",
  },
  {
    question: "Is email still a good way to reach your team?",
    answer:
      "Yes. Use the listing agent email for seller and listing questions, and the buyer specialist email for purchase-side questions. Scheduling through Calendly is best when you want a fixed time on the calendar.",
  },
];
