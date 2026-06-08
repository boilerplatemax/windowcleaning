import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, SectionHeading, Eyebrow } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About the Family",
  description:
    "Wise Guys Windows is a local window cleaning crew serving Greater Victoria, BC. Honest pricing, spotless results, and a bit of fun.",
  alternates: { canonical: "/about" },
};

const code: { icon: IconName; title: string; body: string }[] = [
  {
    icon: "badgeCheck",
    title: "Honesty first",
    body: "Transparent pricing and straight talk. The number you see is the number you pay.",
  },
  {
    icon: "clock",
    title: "Respect your time",
    body: "On-time, tidy, and efficient. We show up when we say we will.",
  },
  {
    icon: "gem",
    title: "Spotless every time",
    body: "If it's not streak-free, it's not done. That's the Wise Guys guarantee.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>Meet the family</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            We&apos;re in the clean business
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            ...the window clean business, that is. Around here, your windows are
            family — and we treat &apos;em that way.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-80 overflow-hidden rounded-2xl border border-line shadow-luxe">
            <Image
              src="https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=1000&q=80"
              alt="Professional window cleaner at work"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Honest work, spotless glass"
            />
            <div className="mt-5 space-y-4 text-ink/75 leading-relaxed">
              <p>
                Wise Guys Windows started with a simple idea: window cleaning
                should be easy, honest, and maybe even a little fun. No mystery
                pricing, no pushy sales — just a reliable crew that makes your
                glass gleam.
              </p>
              <p>
                We&apos;re proud to be local to {site.serviceArea}. When you
                book the Wise Guys, you&apos;re not dealing with some faceless
                franchise — you&apos;re dealing with neighbours who take pride in
                every pane.
              </p>
              <p>
                So sit back, relax, and let us do the dirty work. You&apos;re the
                boss — you deserve clean windows.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="The code" title="What we stand for" />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {code.map((v) => (
              <div
                key={v.title}
                className="rounded-xl border border-line bg-surface p-6 shadow-luxe"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/30 bg-gold/10 text-gold-deep">
                  <Icon name={v.icon} className="h-6 w-6" />
                </span>
                <h3 className="display mt-4 text-lg font-semibold text-ink">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-ink pinstripe">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="display text-3xl font-bold text-cream sm:text-4xl">
            Let&apos;s make your windows an offer they can&apos;t refuse
          </h2>
          <div className="mt-8">
            <Button href="/quote" size="lg">
              Get Your Free Quote
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
