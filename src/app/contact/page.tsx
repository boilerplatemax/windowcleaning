import type { Metadata } from "next";
import { Button, Container, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Wise Guys Windows. Call ${site.phone} or request a free window cleaning quote in Greater Victoria, BC.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-cream sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-md text-cream/70">
            Questions, bookings, or just want to say hello? The Wise Guys are
            happy to help. The fastest way to a price is our instant quote tool.
          </p>

          <div className="mt-10 space-y-6">
            <ContactRow
              icon="📞"
              label="Phone"
              value={site.phone}
              href={site.phoneHref}
            />
            <ContactRow
              icon="✉️"
              label="Email"
              value={site.email}
              href={site.emailHref}
            />
            <ContactRow icon="📍" label="Service area" value={site.serviceArea} />
            <ContactRow icon="🕒" label="Hours" value={site.hours} />
          </div>

          <div className="mt-10">
            <Button href="/quote" size="lg">
              Get an Instant Quote
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-smoke bg-noir p-8 shadow-luxe">
          <h2 className="display text-2xl font-bold text-cream">
            Prefer to get a price now?
          </h2>
          <p className="mt-3 text-cream/70">
            Skip the back-and-forth. Our 60-second quote tool gives you a real
            price range instantly, and we&apos;ll follow up to confirm.
          </p>
          <ul className="mt-6 space-y-3">
            {[
              "No obligation, ever",
              "Takes under 60 seconds",
              "Local Victoria-based crew",
              "Honest, upfront pricing",
            ].map((p) => (
              <li key={p} className="flex items-center gap-3 text-cream/80">
                <span className="text-gold">✓</span> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/quote" size="lg" className="w-full">
              Start My Quote
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-cream/50">
            Or call us directly at{" "}
            <a href={site.phoneHref} className="text-gold hover:underline">
              {site.phone}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-charcoal text-lg">
        {icon}
      </span>
      <div>
        <p className="display text-xs tracking-[0.2em] text-gold">{label}</p>
        <p className="mt-0.5 text-cream">{value}</p>
      </div>
    </div>
  );
  return href ? (
    <a href={href} className="block hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}
