import Image from "next/image";
import Link from "next/link";
import { Button, Container, SectionHeading } from "@/components/ui";
import { Icon, Stars } from "@/components/Icon";
import { site } from "@/lib/site";
import { photo } from "@/lib/photos";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Showcase />
      <Services />
      <HowItWorks />
      <PricingTeaser />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  );
}

/* ----------------------------------------------------------------- */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={photo(
            "home-hero",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2000&q=80",
          )}
          alt="Streak-free clean window with a clear view"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Strong, even overlay so the white headline always has dark behind
            it — no faded white-on-white. */}
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
      </div>

      <Container className="relative flex min-h-[86vh] flex-col justify-center py-24 sm:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow text-xs text-ocean-soft sm:text-sm">
            Local crew · {site.serviceArea}
          </span>
          <h1 className="display mt-4 text-5xl font-bold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            Spotless windows.
            <span className="block text-ocean-grad">Stunning views.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/85">
            Professional residential window cleaning across Greater Victoria.
            Streak-free glass, honest pricing, and an instant quote in under 60
            seconds — so you can get back to enjoying the view.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/quote" size="lg">
              Get Your Instant Quote
            </Button>
            <Button href={site.phoneHref} variant="outlineLight" size="lg">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/80">
            <span className="flex items-center gap-2">
              <Stars className="text-ocean-soft" /> Loved by locals
            </span>
            <span className="hidden text-ocean-soft/40 sm:inline">|</span>
            <span>No-obligation quote</span>
            <span className="hidden text-ocean-soft/40 sm:inline">|</span>
            <span>Fully insured</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

function TrustBar() {
  const items = [
    { stat: "60 sec", label: "To get a quote" },
    { stat: "100%", label: "Streak-free guarantee" },
    { stat: "Local", label: "Victoria-based crew" },
    { stat: "Insured", label: "& fully bonded" },
  ];
  return (
    <section className="border-y border-line bg-surface">
      <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.label} className="text-center">
            <p className="display text-2xl font-bold text-ocean-deep sm:text-3xl">
              {i.stat}
            </p>
            <p className="mt-1 text-sm text-ink/60">{i.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function Showcase() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src={photo(
            "home-see-the-difference",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=2000&q=80",
          )}
          alt="Bright living room with spotless floor-to-ceiling windows letting in the morning light"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/65 to-ink/20" />
      </div>
      <Container className="relative flex min-h-[60vh] items-center py-24">
        <div className="max-w-xl">
          <span className="eyebrow text-xs text-ocean-soft sm:text-sm">
            See the difference
          </span>
          <h2 className="display mt-3 text-3xl font-bold leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Let the light back in
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-cream/85">
            Grime builds up slowly — you don&apos;t notice until it&apos;s gone.
            One visit from Stingray and your rooms feel brighter, your glass
            disappears, and the view does the talking.
          </p>
          <div className="mt-8">
            <Button href="/gallery" variant="outlineLight" size="lg">
              See our work
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Exterior Window Cleaning",
      img: photo(
        "service-exterior",
        "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=1200&q=80",
      ),
      desc: "Spotless, streak-free glass on every outside pane.",
    },
    {
      title: "Interior Window Cleaning",
      img: photo(
        "service-interior",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      ),
      desc: "Crystal-clear views from the comfort of your couch.",
    },
    {
      title: "Screens, Tracks & Frames",
      img: photo(
        "service-screens",
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&q=80",
      ),
      desc: "We clear out the dust and grime from every corner.",
    },
  ];
  return (
    <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Our services"
          title="What we clean"
          subtitle="Professional residential window cleaning, inside and out."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group overflow-hidden rounded-2xl border border-line bg-surface shadow-card"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="display text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-ink/65">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/services" variant="outline">
            See all services
          </Button>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Get your quote",
      body: "Answer a few quick questions — no window-counting required. Get an instant price range.",
    },
    {
      n: "02",
      title: "Pick your time",
      body: "We confirm your final price within 24 hours and lock in a time that works for you.",
    },
    {
      n: "03",
      title: "Enjoy the view",
      body: "The crew arrives, cleans every pane, and leaves your windows spotless. Simple as that.",
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="How it works"
          title="Easy as one, two, three"
        />
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative">
              <span className="display text-5xl font-bold text-ocean/25">
                {s.n}
              </span>
              <h3 className="display mt-2 text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {s.body}
              </p>
              {i < steps.length - 1 && (
                <span className="absolute right-0 top-6 hidden text-ocean/40 md:block">
                  <Icon name="arrowRight" className="h-6 w-6" />
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function PricingTeaser() {
  return (
    <section className="relative isolate overflow-hidden border-y border-smoke">
      <div className="absolute inset-0 -z-10">
        <Image
          src={photo(
            "home-pricing-bg",
            "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=2000&q=80",
          )}
          alt="Modern glass home glowing at dusk"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 deep-sea opacity-60" />
      </div>
      <Container className="relative py-20 text-center sm:py-28">
        <span className="eyebrow text-xs text-ocean-soft sm:text-sm">
          Honest, upfront pricing
        </span>
        <h2 className="display mx-auto mt-3 max-w-2xl text-3xl font-bold text-white sm:text-5xl">
          Quotes starting around{" "}
          <span className="text-ocean-grad">$120</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/80">
          Every home is different, so we give you a real range up front — no
          mystery, no pressure. See your price in under a minute.
        </p>
        <div className="mt-9">
          <Button href="/quote" size="lg">
            Get My Instant Quote
          </Button>
        </div>
      </Container>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      quote:
        "Booked in two minutes and my windows have never looked better. Professional, friendly, and spotless.",
      name: "Marie T.",
      area: "Oak Bay",
    },
    {
      quote:
        "Honest pricing, super friendly crew, and a flawless job. You can actually see the ocean from my place now!",
      name: "Dave R.",
      area: "Saanich",
    },
    {
      quote:
        "Showed up on time, did the inside and out, left zero streaks. Easily the best window cleaners we've used.",
      name: "Priya K.",
      area: "Victoria",
    },
  ];
  return (
    <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Reviews"
          title="Loved across the coast"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-2xl border border-line bg-surface p-6 shadow-card"
            >
              <Stars className="text-ocean" />
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="display mt-4 text-sm font-semibold text-ocean-deep">
                {r.name} <span className="text-ink/45">· {r.area}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FAQ() {
  const faqs = [
    {
      q: "How much does window cleaning cost?",
      a: "Most homes in Greater Victoria land between $120 and $320 depending on size, number of floors, and whether you want the inside done too. Get an exact range with our 60-second quote tool.",
    },
    {
      q: "Do you service my area?",
      a: `We cover ${site.serviceArea}. If you can see the ocean from your place, we've probably cleaned windows nearby.`,
    },
    {
      q: "Are you insured?",
      a: "Absolutely. The whole crew is fully insured and bonded, so your home is always protected.",
    },
    {
      q: "How soon can you come out?",
      a: "We confirm your quote within 24 hours and usually book within the same week. Need it fast? Give us a call.",
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Questions?" title="Good to know" />
        <div className="mt-12 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-line bg-surface shadow-card [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex w-full cursor-pointer select-none items-center justify-between gap-4 p-5">
                <span className="display text-base font-medium text-ink">
                  {f.q}
                </span>
                <span className="text-2xl leading-none text-ocean-deep transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm leading-relaxed text-ink/75">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="deep-sea border-t border-smoke">
      <Container className="py-20 text-center sm:py-24">
        <h2 className="display mx-auto max-w-2xl text-3xl font-bold text-white sm:text-4xl">
          Ready to see your view again?
        </h2>
        <p className="mt-4 text-cream/75">
          No obligation. Takes under 60 seconds. Streak-free, guaranteed.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/quote" size="lg">
            Get Your Free Quote
          </Button>
          <Link
            href={site.phoneHref}
            className="display text-cream/85 hover:text-ocean-soft"
          >
            or call {site.phone}
          </Link>
        </div>
      </Container>
    </section>
  );
}
