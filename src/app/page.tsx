import Image from "next/image";
import Link from "next/link";
import { Button, Container, SectionHeading, Eyebrow } from "@/components/ui";
import { Icon, Stars, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyUs />
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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
          alt="Bright modern home with spotless windows"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/70 to-paper" />
        <div className="absolute inset-0 pinstripe opacity-50" />
      </div>

      <Container className="relative py-24 sm:py-32 lg:py-40">
        <div className="max-w-2xl">
          <Eyebrow>Local crew · {site.serviceArea}</Eyebrow>
          <h1 className="display mt-4 text-5xl font-bold leading-[0.95] text-cream sm:text-6xl lg:text-7xl">
            Dirty windows?
            <span className="block text-gold-grad">Forget about it.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/80">
            You&apos;re the boss — you deserve clean windows. Let the Wise Guys
            do the dirty work. Streak-free shine, honest pricing, and an instant
            quote in under 60 seconds.
          </p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="/quote" size="lg">
              Get Your Instant Quote
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg">
              <Icon name="phone" className="h-4 w-4" /> {site.phone}
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-cream/70">
            <span className="flex items-center gap-2">
              <Stars className="text-gold-soft" /> Loved by locals
            </span>
            <span className="hidden sm:inline text-gold/40">|</span>
            <span>No-obligation quote</span>
            <span className="hidden sm:inline text-gold/40">|</span>
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
    <section className="border-y border-line bg-surface-2">
      <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
        {items.map((i) => (
          <div key={i.label} className="text-center">
            <p className="display text-2xl font-bold text-gold-deep sm:text-3xl">
              {i.stat}
            </p>
            <p className="mt-1 text-sm text-ink/60">{i.label}</p>
          </div>
        ))}
      </Container>
    </section>
  );
}

function WhyUs() {
  const cards: { icon: IconName; title: string; body: string }[] = [
    {
      icon: "tag",
      title: "An offer you can't refuse",
      body: "Upfront, honest pricing with no hidden fees. The number you see is the number you pay. Capisce?",
    },
    {
      icon: "sparkles",
      title: "We do the dirty work",
      body: "Inside, outside, screens, tracks, skylights — we make every pane look like a million bucks.",
    },
    {
      icon: "heart",
      title: "Treated like family",
      body: "Reliable, respectful, and on time. We show up, get it done clean, and leave no trace.",
    },
    {
      icon: "shieldCheck",
      title: "Fully insured crew",
      body: "Bonded and insured for total peace of mind. Your home is in good hands with the family.",
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Why the Wise Guys"
          title="The cleanest crew in town"
          subtitle="We keep it playful — but we take your windows seriously."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-line bg-surface p-6 shadow-luxe transition-colors hover:border-gold/50"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-deep">
                <Icon name={c.icon} className="h-6 w-6" />
              </span>
              <h3 className="display mt-4 text-lg font-semibold text-ink">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Services() {
  const services = [
    {
      title: "Exterior Window Cleaning",
      img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&q=80",
      desc: "Spotless, streak-free glass on every outside pane.",
    },
    {
      title: "Interior Window Cleaning",
      img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      desc: "Crystal-clear views from the comfort of your couch.",
    },
    {
      title: "Screen, Track & Frame",
      img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80",
      desc: "We get the gunk outta the corners you forgot about.",
    },
  ];
  return (
    <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The services"
          title="What we clean"
          subtitle="Residential window cleaning, done the wise-guy way."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              className="group overflow-hidden rounded-xl border border-line bg-surface shadow-luxe"
            >
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
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
      title: "Enjoy the shine",
      body: "The crew shows up, does the dirty work, and leaves your windows spotless. Forget about it.",
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
              <span className="display text-5xl font-bold text-gold/30">
                {s.n}
              </span>
              <h3 className="display mt-2 text-xl font-semibold text-ink">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {s.body}
              </p>
              {i < steps.length - 1 && (
                <span className="absolute right-0 top-6 hidden text-gold/40 md:block">
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
    <section className="relative overflow-hidden border-y border-smoke">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1400&q=80"
          alt="Clean bright interior"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/85" />
        <div className="absolute inset-0 pinstripe opacity-50" />
      </div>
      <Container className="relative py-20 text-center sm:py-28">
        <span className="display text-xs sm:text-sm tracking-[0.25em] text-gold-soft">
          Honest, upfront pricing
        </span>
        <h2 className="display mx-auto mt-3 max-w-2xl text-3xl font-bold text-cream sm:text-5xl">
          Quotes starting around{" "}
          <span className="text-gold-grad">$120</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-cream/75">
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
        "Booked in two minutes and my windows have never looked better. These guys are the real deal.",
      name: "Marie T.",
      area: "Oak Bay",
    },
    {
      quote:
        "Honest pricing, super friendly crew, and a spotless job. The mob theme made me laugh too.",
      name: "Dave R.",
      area: "Saanich",
    },
    {
      quote:
        "Showed up on time, did the inside and out, left zero streaks. An offer I couldn't refuse!",
      name: "Priya K.",
      area: "Victoria",
    },
  ];
  return (
    <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Word on the street"
          title="The neighbourhood talks"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.name}
              className="rounded-xl border border-line bg-surface p-6 shadow-luxe"
            >
              <Stars className="text-gold" />
              <blockquote className="mt-4 text-sm leading-relaxed text-ink/80">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="display mt-4 text-sm tracking-wide text-gold-deep">
                {r.name}{" "}
                <span className="text-ink/45">· {r.area}</span>
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
      a: `We cover ${site.serviceArea}. If you can see the ocean or a Tim Hortons, we've probably cleaned windows nearby.`,
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
        <SectionHeading eyebrow="Questions?" title="The lowdown" />
        <div className="mt-12 space-y-4">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-line bg-surface p-5 shadow-luxe [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex cursor-pointer items-center justify-between gap-4">
                <span className="display text-base text-ink">{f.q}</span>
                <span className="text-gold-deep transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
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
    <section className="border-t border-smoke bg-ink pinstripe">
      <Container className="py-20 text-center sm:py-24">
        <h2 className="display mx-auto max-w-2xl text-3xl font-bold text-cream sm:text-4xl">
          Ready to make your windows look like a million bucks?
        </h2>
        <p className="mt-4 text-cream/70">
          No obligation. Takes under 60 seconds. You&apos;re the boss.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button href="/quote" size="lg">
            Get Your Free Quote
          </Button>
          <Link
            href={site.phoneHref}
            className="display text-cream/80 hover:text-gold"
          >
            or call {site.phone}
          </Link>
        </div>
      </Container>
    </section>
  );
}
