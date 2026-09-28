import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/faq")({
  head: () => ({ meta: [{ title: "FAQ — Bhadwamata Agarbatti" }] }),
  component: FaqPage,
});

const faqs = [
  [
    "Which dhoop batti is best for daily puja?",
    "Shahi Chandan and Shahi Gugal are our traditional choices for daily worship and meditation.",
  ],
  [
    "How do I choose the right fragrance?",
    "Try our Scent Finder quiz — it recommends a fragrance based on your mood and ritual.",
  ],
  [
    "What does bombless and charcoal free mean?",
    "Every Shahi jar is labelled “Bombless Sticks / Charcoal Free”. Message us on Instagram if you would like to know more about how the sticks are made.",
  ],
  [
    "How long does delivery take?",
    "Orders are dispatched within 7 days and delivered pan-India in 3–6 working days.",
  ],
  [
    "Can I order through WhatsApp?",
    "Yes, tap the WhatsApp button at the bottom-right and we'll help you place your order.",
  ],
  [
    "Are bulk orders available?",
    "Absolutely. Reach out via the contact form for festival gifting and bulk pricing.",
  ],
  ["Are secure payments available?", "Yes, we offer COD, UPI and secure online payments."],
  [
    "How should dhoop batti be stored?",
    "Keep in a cool, dry place away from direct sunlight to preserve fragrance.",
  ],
];

function FaqPage() {
  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        crumbs={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
      />
      <section className="container-x max-w-3xl py-12 md:py-14">
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <Item key={q} q={q} a={a} />
          ))}
        </div>
      </section>
    </>
  );
}
function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
      >
        <span className="min-w-0 break-words font-medium">{q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-muted-foreground">{a}</div>}
    </div>
  );
}
