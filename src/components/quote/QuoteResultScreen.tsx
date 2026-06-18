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
  const firstName = contact.name.trim().split(" ")[0] || "there";
  const sentPhotos = Boolean(input.hasPhotos);

  return (
    <div className="mx-auto w-full max-w-2xl animate-fade-up">
      <div className="overflow-hidden rounded-3xl border border-ocean/30 bg-surface shadow-luxe">
        {/* Header band */}
        <div className="bg-ocean-deep px-6 py-6 text-center text-white sm:px-9">
          <p className="eyebrow text-xs text-white/90">Your estimate is ready</p>
          <h2 className="display mt-1 text-2xl font-bold sm:text-3xl">
            Here&apos;s your price, {firstName} 👋
          </h2>
        </div>

        <div className="p-6 sm:p-9">
          {/* Price */}
          <div className="text-center">
            <p className="eyebrow text-xs text-ocean-deep">Estimated Range</p>
            <p className="display mt-2 text-4xl font-bold text-ink sm:text-5xl">
              {formatCAD(result.low)} – {formatCAD(result.high)}
            </p>
            <p className="mt-3 text-ink/70">
              Recommended:{" "}
              <span className="display text-xl text-ocean-deep">
                ~{formatCAD(result.midpoint)} {result.currency}
              </span>
            </p>

            <span
              className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs ${
                result.confidence === "high"
                  ? "border-emerald-600/40 bg-emerald-600/10 text-emerald-700"
                  : "border-ocean/40 bg-ocean/10 text-ocean-deep"
              }`}
            >
              {result.confidence === "high"
                ? "✓ High confidence estimate"
                : "◔ Preliminary estimate"}
            </span>
          </div>

          {/* Breakdown */}
          <div className="mt-8 rounded-2xl border border-line bg-surface-2 p-5">
            <p className="eyebrow text-xs text-ocean-deep">The breakdown</p>
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
          <div className="mt-6 rounded-2xl border border-line bg-surface-2 p-5 text-center">
            <p className="text-sm italic text-ink/80">
              &ldquo;Booked in two minutes, windows looked unbelievable.
              Professional and spotless.&rdquo;
            </p>
            <p className="display mt-2 text-xs font-semibold text-ocean-deep">
              — Marie T., Oak Bay
            </p>
          </div>

          {/* Urgency */}
          <p className="mt-6 text-center text-sm text-ink/60">
            🔒 Price locked for 7 days. We&apos;ll confirm your final quote
            within 24 hours.
          </p>

          {/* Confirmation — the request (and any photos) was already emailed
              to our team on submit, with a reply going to {contact.email}. */}
          <div className="mt-6 rounded-2xl border border-emerald-600/30 bg-emerald-600/10 px-5 py-4 text-center">
            <p className="display text-sm font-semibold text-emerald-700">
              ✓ Your request is on its way
            </p>
            <p className="mt-1 text-sm text-ink/70">
              We&apos;ve sent your quote details
              {sentPhotos ? " and photos" : ""} to our team. We&apos;ll reply to{" "}
              <span className="font-medium text-ink">{contact.email}</span> within
              24 hours.
            </p>
          </div>

          <a
            href={site.phoneHref}
            className="mt-4 block text-center text-sm text-ink/60 hover:text-ocean-deep"
          >
            Or just talk to us — {site.phone}
          </a>
        </div>
      </div>

      <p className="mt-5 text-center text-xs text-ink/45">
        Got your details, {firstName}. We&apos;ll be in touch shortly. 🌊
      </p>
    </div>
  );
}
