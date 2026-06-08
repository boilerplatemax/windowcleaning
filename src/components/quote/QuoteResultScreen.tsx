"use client";

import { formatCAD } from "@/lib/pricing";
import type { QuoteResult, QuoteContact, QuoteInput } from "@/lib/types";
import { site } from "@/lib/site";

export function QuoteResultScreen({
  result,
  contact,
  input,
}: {
  result: QuoteResult;
  contact: QuoteContact;
  input: QuoteInput;
}) {
  const firstName = contact.name.trim().split(" ")[0] || "boss";

  return (
    <div className="mx-auto w-full max-w-2xl animate-fade-up">
      <div className="overflow-hidden rounded-2xl border border-gold/40 bg-surface shadow-luxe">
        {/* Header band */}
        <div className="gold-grad px-6 py-6 text-center text-ink sm:px-9">
          <p className="display text-xs tracking-[0.25em]">
            An offer you can&apos;t refuse
          </p>
          <h2 className="display mt-1 text-2xl font-bold sm:text-3xl">
            Here&apos;s your price, {firstName} 🤝
          </h2>
        </div>

        <div className="p-6 sm:p-9">
          {/* Price */}
          <div className="text-center">
            <p className="display text-sm tracking-[0.2em] text-gold-deep">
              Estimated Range
            </p>
            <p className="display mt-2 text-4xl font-bold text-ink sm:text-5xl">
              {formatCAD(result.low)} – {formatCAD(result.high)}
            </p>
            <p className="mt-3 text-ink/70">
              Recommended:{" "}
              <span className="display text-xl text-gold-deep">
                ~{formatCAD(result.midpoint)} {result.currency}
              </span>
            </p>

            <span
              className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${
                result.confidence === "high"
                  ? "border-green-600/40 bg-green-600/10 text-green-700"
                  : "border-gold/40 bg-gold/10 text-gold-deep"
              }`}
            >
              {result.confidence === "high"
                ? "✓ High confidence estimate"
                : "◔ Preliminary estimate"}
            </span>
          </div>

          {/* Breakdown */}
          <div className="mt-8 rounded-lg border border-line bg-surface-2 p-5">
            <p className="display text-xs tracking-[0.2em] text-gold-deep">
              The breakdown
            </p>
            <ul className="mt-3 divide-y divide-line">
              {result.breakdown.map((line, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between py-2 text-sm"
                >
                  <span className="text-ink/80">{line.label}</span>
                  <span className="text-ink/55">{line.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonial */}
          <div className="mt-6 rounded-lg border border-line bg-surface-2 p-5 text-center">
            <p className="text-sm italic text-ink/80">
              &ldquo;Booked in two minutes, windows looked unbelievable. These
              guys are the real deal.&rdquo;
            </p>
            <p className="display mt-2 text-xs tracking-widest text-gold-deep">
              — Marie T., Oak Bay
            </p>
          </div>

          {/* Urgency */}
          <p className="mt-6 text-center text-sm text-ink/60">
            🔒 Price locked for 7 days. We&apos;ll confirm your final quote
            within 24 hours.
          </p>

          {/* CTAs */}
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={site.phoneHref}
              className="display flex items-center justify-center rounded-sm bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-gold-soft"
            >
              📞 Book This Price
            </a>
            <a
              href={`${site.emailHref}?subject=Quote%20confirmation%20for%20${encodeURIComponent(
                input.address,
              )}`}
              className="display flex items-center justify-center rounded-sm border border-gold/70 px-6 py-3.5 text-sm uppercase tracking-wide text-gold-deep hover:bg-gold hover:text-ink"
            >
              Request Confirmation
            </a>
          </div>
          <a
            href={site.phoneHref}
            className="mt-3 block text-center text-sm text-ink/60 hover:text-gold-deep"
          >
            Or just talk to us — {site.phone}
          </a>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-ink/45">
        Got your details, {firstName}. We&apos;ll be in touch shortly. 🕴️
      </p>
    </div>
  );
}
