import type { FaqItem } from "@/lib/schema";

/**
 * Buyer-focused FAQ for /buyers only (paired with FAQPage JSON-LD). No legal/tax advice.
 */
export const buyerFaq: FaqItem[] = [
  {
    question: "Should I get pre-approved before touring Rhodes Ranch homes?",
    answer:
      "Yes—in most cases. A lender pre-approval clarifies budget, strengthens offers, and speeds underwriting. Your loan officer sets the timeline; we coordinate showings once you know your comfortable price range.",
  },
  {
    question: "What does a buyer specialist do for Las Vegas home buyers?",
    answer:
      "A buyer specialist helps you interpret MLS data, schedule showings (including guard-gated communities), draft competitive offers aligned with local norms, and stay aligned with your lender and title partner through closing.",
  },
  {
    question: "How do I search MLS listings for Rhodes Ranch (89148)?",
    answer:
      "Use the on-site MLS search powered by RealScout to filter by price, beds, baths, and more. For a curated list that matches lifestyle goals—schools, commute, floor plan—ask for a private consult.",
  },
  {
    question: "Can I visit guard-gated Rhodes Ranch without a REALTOR®?",
    answer:
      "Many gated communities require agent coordination for entry. Contact us to schedule compliant tours and avoid wasted trips.",
  },
];
