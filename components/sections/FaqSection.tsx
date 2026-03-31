import type { FaqItem } from "@/lib/schema";

export function FaqSection({
  id,
  heading,
  items,
}: {
  id: string;
  heading: string;
  items: FaqItem[];
}) {
  return (
    <section aria-labelledby={id} className="space-y-6">
      <h2 id={id} className="font-display text-2xl font-semibold tracking-tight text-emerald-950">
        {heading}
      </h2>
      <div className="space-y-6">
        {items.map((item) => (
          <article
            key={item.question}
            className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-[0_4px_20px_rgb(0_0_0_/0.04)] ring-1 ring-stone-900/5"
          >
            <h3 className="text-lg font-medium text-stone-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
