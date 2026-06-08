import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, SectionHeading, Eyebrow } from "@/components/ui";
import { Icon } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Window Cleaning Services",
  description:
    "Exterior & interior window cleaning, screens, tracks, frames and skylights for homes across Greater Victoria, BC. Honest pricing from the Wise Guys crew.",
  alternates: { canonical: "/services" },
};

const services = [
  {
    title: "Exterior Window Cleaning",
    img: "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900&q=80",
    body: "Pure, streak-free shine on every outside pane using professional-grade gear and purified water. Rain or shine, your glass stays gleaming.",
    points: ["Streak-free guarantee", "Ground & upper floors", "Eco-friendly solutions"],
  },
  {
    title: "Interior Window Cleaning",
    img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=80",
    body: "Crystal-clear views from the couch. We protect your floors and furniture, then leave every inside pane spotless.",
    points: ["Shoe covers & drop cloths", "Sills wiped down", "No mess left behind"],
  },
  {
    title: "Screen Cleaning",
    img: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900&q=80",
    body: "We pop 'em out, scrub off the dust and pollen, and pop 'em right back. Fresh air never looked so clean.",
    points: ["Hand-washed screens", "Dust & pollen removed", "Re-fitted carefully"],
  },
  {
    title: "Track & Frame Detailing",
    img: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=900&q=80",
    body: "We get the gunk outta the corners you forgot about — dirt, bugs and grime vacuumed and wiped from every track.",
    points: ["Vacuumed tracks", "Wiped frames", "Like-new finish"],
  },
  {
    title: "Skylight Cleaning",
    img: "https://images.unsplash.com/photo-1503602642458-232111445657?w=900&q=80",
    body: "Those hard-to-reach ones up top? Consider it handled. More natural light, zero ladders for you.",
    points: ["Safe access", "Inside & out", "Brighter rooms"],
  },
  {
    title: "Regular Maintenance Plans",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=900&q=80",
    body: "Keep that million-dollar shine year-round with a recurring plan. Set it once and forget about it.",
    points: ["Monthly / quarterly", "Priority booking", "Loyal-customer pricing"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>The full menu</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            Services that shine
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            From a quick exterior refresh to the full white-glove treatment, the
            Wise Guys do the dirty work so you don&apos;t have to.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-xl border border-line bg-surface shadow-luxe"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h2 className="display text-xl font-semibold text-ink">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {s.body}
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {s.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-ink/75"
                      >
                        <Icon name="check" className="h-4 w-4 text-gold-deep" />{" "}
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line bg-surface-2">
        <Container className="py-16 text-center sm:py-20">
          <SectionHeading
            title="Not sure what you need?"
            subtitle="Tell us about your place and we'll price it out in seconds — no pressure, no obligation."
          />
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button href="/quote" size="lg">
              Get a Free Quote
            </Button>
            <Button href={site.phoneHref} variant="outline" size="lg">
              Call {site.phone}
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
