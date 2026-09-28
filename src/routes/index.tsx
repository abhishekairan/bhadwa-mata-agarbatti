import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/data/products";
import { ProductCard } from "@/components/site/ProductCard";
import heroImg from "@/assets/hero.jpg";
import chandanImg from "@/assets/products/shahi-chandan.jpg";
import {
  Sparkles,
  Leaf,
  ShieldCheck,
  Truck,
  Flame,
  HeartHandshake,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({ component: Home });

const moods = [
  "Morning Prayers",
  "Meditation & Yoga",
  "Stress Relief",
  "Festive Pooja",
  "Daily Home Fragrance",
  "Temple Essentials",
];
const why = [
  { i: Leaf, t: "Charcoal Free" },
  { i: Sparkles, t: "Five Shahi Fragrances" },
  { i: HeartHandshake, t: "Registered Brand" },
  { i: ShieldCheck, t: "Easy WhatsApp Ordering" },
  { i: Truck, t: "Fast Shipping" },
  { i: Flame, t: "Ideal for Daily Puja" },
];
const faqs = [
  {
    q: "Which dhoop batti is best for daily puja?",
    a: "Shahi Chandan and Shahi Gugal are our traditional choices for daily worship and meditation.",
  },
  { q: "Do you deliver across India?", a: "Yes, we ship pan-India with trusted courier partners." },
  {
    q: "How long does shipping take?",
    a: "Orders are usually dispatched within 7 days and arrive within 3–6 working days after dispatch.",
  },
  {
    q: "What are the fragrances?",
    a: "Our Shahi range has five fragrances: Chandan, Gugal, Gulab, Kewda and Mogra.",
  },
];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImg}
            alt="Incense sticks burning beside a brass diya and marigolds"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
        </div>
        <div className="container-x relative grid min-h-[520px] items-center gap-8 py-16 sm:py-20 md:grid-cols-2 md:py-28 lg:py-32">
          <div className="fade-up">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-secondary">
              <span className="h-px w-8 bg-secondary" /> Bhadwamata Agarbatti
            </span>
            <h1 className="mt-4 max-w-3xl break-words font-serif text-4xl leading-[1.05] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Fragrance for Prayer,
              <br /> Peace & Everyday <em className="text-secondary">Devotion</em>
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-lg">
              Discover Shahi dhoop batti in five classic fragrances, bombless and charcoal free,
              made to bring purity, positivity and calmness into your home.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/shop"
                className="btn-saffron rounded-full px-7 py-3.5 text-center text-sm font-medium"
              >
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="btn-outline-dark rounded-full px-7 py-3.5 text-center text-sm font-medium"
              >
                Explore Fragrances
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="container-x py-16 md:py-24">
        <SectionHead
          eyebrow="The Shahi Collection"
          title="Choose Your Fragrance"
          sub="Bombless, charcoal-free dhoop batti in five classic scents."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Mood */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Discover" title="Shop by Mood & Scent" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {moods.map((m) => (
              <Link
                key={m}
                to="/scent-finder"
                className="group rounded-2xl border bg-card p-5 shadow-card transition-transform hover:-translate-y-1 md:p-8"
              >
                <Sparkles className="h-6 w-6 text-secondary mb-3" />
                <h3 className="break-words font-serif text-xl md:text-2xl">{m}</h3>
                <p className="text-sm text-muted-foreground mt-2 group-hover:text-foreground">
                  Explore picks →
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:gap-12 md:py-28">
        <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-soft">
          <img
            src={chandanImg}
            alt="Shahi Chandan dhoop batti"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-secondary">Our Story</span>
          <h2 className="mt-3 break-words font-serif text-3xl md:text-5xl">
            Rooted in Tradition, Crafted for Today
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Bhadwamata Agarbatti brings together devotional purity and soothing fragrances for
            homes that value peace, prayer and positivity.
          </p>
          <Link to="/about" className="mt-7 inline-block link-underline text-foreground">
            Read our story
          </Link>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-primary text-primary-foreground py-16 md:py-20">
        <div className="container-x">
          <h2 className="font-serif text-3xl md:text-4xl text-center">Why Choose Bhadwamata</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            {why.map(({ i: Icon, t }) => (
              <div key={t} className="text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-white/10">
                  <Icon className="h-6 w-6 text-accent" />
                </div>
                <p className="mt-3 text-sm">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scent finder */}
      <section className="container-x py-16 md:py-20">
        <div className="grid items-center gap-8 rounded-3xl bg-secondary p-6 text-secondary-foreground sm:p-10 md:grid-cols-2 md:p-16">
          <div>
            <h2 className="break-words font-serif text-3xl md:text-4xl">
              Not sure which fragrance suits you?
            </h2>
            <p className="mt-3 opacity-90">
              Take our 3-question scent finder to discover your perfect daily fragrance.
            </p>
          </div>
          <div className="md:text-right">
            <Link
              to="/scent-finder"
              className="inline-block w-full rounded-full bg-background px-7 py-3.5 text-center text-sm font-medium text-foreground hover:opacity-90 sm:w-auto"
            >
              Find Your Scent
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-16">
        <SectionHead eyebrow="Help" title="Frequently Asked" />
        <div className="max-w-3xl mx-auto mt-10 space-y-3">
          {faqs.map((f, i) => (
            <FaqItem key={i} {...f} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x pb-24">
        <div className="rounded-3xl border bg-card p-6 text-center sm:p-10 md:p-14">
          <h2 className="break-words font-serif text-3xl">Stay in the Fragrance Loop</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Receive devotional offers, festive packs and fragrance recommendations.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <input
              placeholder="Email address"
              className="min-w-0 flex-1 rounded-full border px-5 py-3 outline-none focus:ring-2 focus:ring-ring sm:rounded-l-full sm:rounded-r-none"
            />
            <button className="btn-saffron rounded-full px-6 py-3 text-sm font-medium sm:rounded-l-none sm:rounded-r-full">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-2xl mx-auto">
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.3em] text-secondary">{eyebrow}</span>
      )}
      <h2 className="mt-3 break-words font-serif text-3xl md:text-5xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}
function FaqItem({ q, a }: { q: string; a: string }) {
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
