import type { Metadata } from "next";
import { QuoteWizard } from "@/components/quote/QuoteWizard";
import { Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Get an Instant Window Cleaning Quote",
  description:
    "Get a free, no-obligation window cleaning quote in under 60 seconds. Honest CAD pricing for homes across Greater Victoria, BC.",
  alternates: { canonical: "/quote" },
};

export default function QuotePage() {
  return (
    <section className="relative py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 pinstripe opacity-40" />
      <Container className="relative">
        <div className="mb-12 text-center">
          <Eyebrow>No obligation · Under 60 seconds</Eyebrow>
          <h1 className="display mt-3 text-4xl font-bold text-cream sm:text-5xl">
            Get your instant quote
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-cream/70">
            No window-counting, no jargon. Just answer a few quick questions and
            we&apos;ll show you a real price range right away.
          </p>
        </div>
        <QuoteWizard />
      </Container>
    </section>
  );
}
