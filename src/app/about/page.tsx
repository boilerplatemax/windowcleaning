import type { Metadata } from "next";
import Image from "next/image";
import { Button, Container, SectionHeading, Eyebrow } from "@/components/ui";
import { Icon, type IconName } from "@/components/Icon";
import { site } from "@/lib/site";
import { photo } from "@/lib/photos";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Stingray Cleaning is a local, professional window cleaning crew serving Greater Victoria, BC. Honest pricing, spotless results, and friendly service.",
  alternates: { canonical: "/about" },
};

const values: { icon: IconName; title: string; body: string }[] = [
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
    icon: "droplet",
    title: "Spotless every time",
    body: "If it's not streak-free, it's not done. That's the Stingray guarantee.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-2 py-16 sm:py-24">
        <Container className="text-center">
          <Eyebrow>About Stingray</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-ink sm:text-6xl">
            A clearer view of clean
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink/70">
            We&apos;re a local crew on a simple mission: make window cleaning
            easy, honest, and genuinely great — so you can enjoy the coast in
            full clarity.
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="relative h-96 overflow-hidden rounded-3xl border border-line shadow-luxe">
            <Image
              src={photo(
                "about-team",
                "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?w=1200&q=80",
              )}
              alt="Professional window cleaner at work on a bright home"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="Honest work, spotless glass"
            />
            <div className="mt-5 space-y-4 leading-relaxed text-ink/75">
              <p>
                Stingray Cleaning started with a simple idea: window cleaning
                should be easy, honest, and done to a genuinely high standard. No
                mystery pricing, no pushy sales — just a reliable crew that makes
                your glass disappear.
              </p>
              <p>
                We&apos;re proud to be local to {site.serviceArea}. When you book
                Stingray, you&apos;re not dealing with a faceless franchise —
                you&apos;re dealing with neighbours who take pride in every pane
                and treat your home like their own.
              </p>
              <p>
                So sit back, relax, and let us bring back the view. Clear
                windows, brighter rooms, and a coast worth looking at.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-line bg-surface-2 py-20 sm:py-28">
        <Container>
          <SectionHeading eyebrow="What we stand for" title="Our promise" />
          <div className="mt-14 grid gap-6 sm:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-line bg-surface p-6 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean/10 text-ocean-deep">
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

      <section className="deep-sea">
        <Container className="py-16 text-center sm:py-20">
          <h2 className="display text-3xl font-bold text-white sm:text-4xl">
            Ready for windows you can see right through?
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
