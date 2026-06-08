import type { Metadata } from "next";
import { Button, Container, Eyebrow } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with Orca Window Cleaning. Call ${site.phone} or request a free window cleaning quote in Greater Victoria, BC.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-24">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div>
          <Eyebrow>Let&apos;s talk</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-md text-ink/70">
            Questions, bookings, or just want to say hello? We&apos;re happy to
            help. The fastest way to a price is our instant quote tool.
          </p>

          <div className="mt-10 space-y-6">
            <ContactRow
              icon="phone"
              label="Phone"
              value={site.phone}
              href={site.phoneHref}
            />
            <ContactRow
              icon="mail"
              label="Email"
              value={site.email}
              href={site.emailHref}
            />
            <ContactRow
              icon="mapPin"
              label="Service area"
              value={site.serviceArea}
            />
            <ContactRow icon="clock" label="Hours" value={site.hours} />
          </div>

          <div className="mt-10">
            <Button href="/quote" size="lg">
              Get an Instant Quote
            </Button>
          </div>
        </div>

        <div className="rounded-3xl border border-line bg-surface p-8 shadow-luxe">
          <h2 className="display text-2xl font-bold text-ink">
            Prefer to get a price now?
          </h2>
          <p className="mt-3 text-ink/70">
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
              <li key={p} className="flex items-center gap-3 text-ink/80">
                <Icon name="check" className="h-4 w-4 text-ocean-deep" /> {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button href="/quote" size="lg" className="w-full">
              Start My Quote
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-ink/55">
            Or call us directly at{" "}
            <a href={site.phoneHref} className="text-ocean-deep hover:underline">
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
  icon: IconName;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ocean/10 text-ocean-deep">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div>
        <p className="eyebrow text-xs text-ocean-deep">{label}</p>
        <p className="mt-0.5 text-ink">{value}</p>
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
