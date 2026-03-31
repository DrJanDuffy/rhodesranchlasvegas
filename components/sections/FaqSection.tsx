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
      <h2 id={id} className="text-2xl font-semibold tracking-tight text-emerald-950">
        {heading}
      </h2>
      <div className="space-y-6">
        {items.map((item) => (
          <article key={item.question} className="rounded-xl border border-emerald-900/10 bg-white p-5 shadow-sm">
            <h3 className="text-lg font-medium text-slate-900">{item.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
