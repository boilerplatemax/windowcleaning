"use client";

import { useMemo, useState } from "react";
import { AddressInput } from "./AddressInput";
import { OptionCard, CheckCard } from "./OptionCard";
import { calculateQuote } from "@/lib/pricing";
import type {
  QuoteInput,
  QuoteContact,
  QuoteResult,
  PhotoAttachment,
} from "@/lib/types";
import { QuoteResultScreen } from "./QuoteResultScreen";
import { clsx } from "@/lib/clsx";

const TOTAL_STEPS = 5;

const initialInput: QuoteInput = {
  address: "",
  propertyType: "detached",
  floors: "1",
  homeSize: "medium",
  largeWindows: "unsure",
  cleaning: "exterior",
  screens: false,
  tracks: false,
  skylights: false,
  windowCount: null,
  hasPhotos: false,
};

export function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState<QuoteInput>(initialInput);
  const [contact, setContact] = useState<QuoteContact>({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });
  const [advanced, setAdvanced] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuoteResult | null>(null);

  const set = <K extends keyof QuoteInput>(key: K, val: QuoteInput[K]) =>
    setInput((p) => ({ ...p, [key]: val }));

  // Live preview of the price so users feel the value building up.
  const preview = useMemo(() => calculateQuote(input), [input]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    (contact.email ?? "").trim(),
  );

  const canContinue = () => {
    if (step === 1) return input.address.trim().length > 3;
    if (step === 5)
      return Boolean(contact.name.trim() && contact.phone.trim() && emailValid);
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  async function submit() {
    setSubmitting(true);
    const finalResult = calculateQuote(input);
    setResult(finalResult);

    try {
      const attachments = await buildPhotoAttachments(photos);
      await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input,
          contact,
          result: finalResult,
          photoCount: photos.length,
          photos: attachments,
        }),
      });
    } catch {
      // Even if the network hiccups, still show the customer their price.
    } finally {
      setSubmitting(false);
      setStep(6);
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (step === 6 && result) {
    return <QuoteResultScreen result={result} contact={contact} input={input} />;
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="eyebrow text-xs text-ocean-deep">
            Step {step} of {TOTAL_STEPS}
          </span>
          <span className="eyebrow text-xs text-ink/50">~60 seconds</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full bg-ocean-deep transition-all duration-500"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div
        key={step}
        className="animate-fade-up rounded-3xl border border-line bg-surface p-6 shadow-luxe sm:p-9"
      >
        {/* STEP 1 — Address */}
        {step === 1 && (
          <div className="space-y-5">
            <StepHeader
              kicker="Where are we headed?"
              title="What's your address?"
              sub="We'll confirm you're in our service area and size things up."
            />
            <AddressInput
              value={input.address}
              onChange={(v) => set("address", v)}
            />
            {input.address.trim().length > 3 && (
              <div className="flex items-center gap-2 rounded-xl border border-ocean/30 bg-ocean/10 px-4 py-3 text-sm text-ocean-deep">
                <span>✓</span>
                <span>Nice — looks like we service your area.</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 — Property & size */}
        {step === 2 && (
          <div className="space-y-7">
            <div>
              <StepHeader
                kicker="The basics"
                title="What kind of place is it?"
              />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <OptionCard
                  selected={input.propertyType === "detached"}
                  onClick={() => set("propertyType", "detached")}
                  icon="🏠"
                  title="House"
                />
                <OptionCard
                  selected={input.propertyType === "townhouse"}
                  onClick={() => set("propertyType", "townhouse")}
                  icon="🏘️"
                  title="Townhouse"
                />
                <OptionCard
                  selected={input.propertyType === "condo"}
                  onClick={() => set("propertyType", "condo")}
                  icon="🏢"
                  title="Condo"
                />
              </div>
            </div>

            <div>
              <p className="display text-sm font-medium text-ink">
                How many floors?
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <OptionCard
                  selected={input.floors === "1"}
                  onClick={() => set("floors", "1")}
                  title="1 Story"
                />
                <OptionCard
                  selected={input.floors === "2"}
                  onClick={() => set("floors", "2")}
                  title="2 Story"
                />
                <OptionCard
                  selected={input.floors === "3+"}
                  onClick={() => set("floors", "3+")}
                  title="3+ Story"
                />
              </div>
            </div>

            <div>
              <p className="display text-sm font-medium text-ink">
                Lots of big windows or glass doors?
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <OptionCard
                  selected={input.largeWindows === "no"}
                  onClick={() => set("largeWindows", "no")}
                  title="Nope"
                />
                <OptionCard
                  selected={input.largeWindows === "yes"}
                  onClick={() => set("largeWindows", "yes")}
                  title="Yes"
                />
                <OptionCard
                  selected={input.largeWindows === "unsure"}
                  onClick={() => set("largeWindows", "unsure")}
                  title="Not sure"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3 — Home size */}
        {step === 3 && (
          <div className="space-y-5">
            <StepHeader
              kicker="Sizing it up"
              title="How big is your home?"
              sub="No need to count windows — just pick the closest match."
            />
            <div className="grid gap-3">
              <OptionCard
                selected={input.homeSize === "small"}
                onClick={() => set("homeSize", "small")}
                icon="🤏"
                title="Small"
                subtitle="1–2 bed condo or townhouse"
              />
              <OptionCard
                selected={input.homeSize === "medium"}
                onClick={() => set("homeSize", "medium")}
                icon="👌"
                title="Medium"
                subtitle="Around a 3 bedroom home"
              />
              <OptionCard
                selected={input.homeSize === "large"}
                onClick={() => set("homeSize", "large")}
                icon="💪"
                title="Large"
                subtitle="4+ bedroom home"
              />
            </div>

            <button
              type="button"
              onClick={() => setAdvanced((v) => !v)}
              aria-expanded={advanced}
              className={clsx(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all",
                advanced
                  ? "border-ocean bg-ocean/10"
                  : "border-ocean/40 bg-surface hover:border-ocean hover:bg-ocean/5",
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ocean-deep/10 text-lg">
                ✏️
              </span>
              <span className="flex-1">
                <span className="display block text-sm font-semibold text-ocean-deep">
                  Rather count the windows yourself?
                </span>
                <span className="block text-xs text-ink/60">
                  Know your number? Enter it for a tighter estimate.
                </span>
              </span>
              <span
                className={clsx(
                  "text-xl leading-none text-ocean-deep transition-transform",
                  advanced && "rotate-45",
                )}
              >
                +
              </span>
            </button>

            {advanced && (
              <div className="animate-fade-up rounded-xl border border-line bg-surface-2 p-4">
                <label className="display text-sm font-medium text-ink">
                  Approx. number of windows
                </label>
                <input
                  type="number"
                  min={0}
                  value={input.windowCount ?? ""}
                  onChange={(e) =>
                    set(
                      "windowCount",
                      e.target.value ? Number(e.target.value) : null,
                    )
                  }
                  placeholder="e.g. 15 (leave blank if not sure)"
                  className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink/40 focus:border-ocean"
                />
                <p className="mt-2 text-xs text-ink/55">
                  Windows, not panes. A guess is totally fine.
                </p>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 — Cleaning + add-ons */}
        {step === 4 && (
          <div className="space-y-7">
            <div>
              <StepHeader kicker="The job" title="What are we cleaning?" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                <OptionCard
                  selected={input.cleaning === "exterior"}
                  onClick={() => set("cleaning", "exterior")}
                  icon="🌤️"
                  title="Outside only"
                />
                <OptionCard
                  selected={input.cleaning === "both"}
                  onClick={() => set("cleaning", "both")}
                  icon="✨"
                  title="Inside + outside"
                />
              </div>
            </div>

            <div>
              <p className="display text-sm font-medium text-ink">
                Want the works? <span className="text-ink/50">(optional)</span>
              </p>
              <div className="mt-3 space-y-3">
                <CheckCard
                  checked={input.screens}
                  onClick={() => set("screens", !input.screens)}
                  icon="🪟"
                  title="Screen cleaning"
                  subtitle="Popped out, washed, and refitted"
                />
                <CheckCard
                  checked={input.tracks}
                  onClick={() => set("tracks", !input.tracks)}
                  icon="🧽"
                  title="Track & frame wipe"
                  subtitle="Clear out every corner"
                />
                <CheckCard
                  checked={input.skylights}
                  onClick={() => set("skylights", !input.skylights)}
                  icon="☀️"
                  title="Skylights"
                  subtitle="The hard-to-reach ones up top"
                />
              </div>
            </div>

            <PricePreview low={preview.low} high={preview.high} />
          </div>
        )}

        {/* STEP 5 — Contact + photos */}
        {step === 5 && (
          <div className="space-y-5">
            <StepHeader
              kicker="Last thing"
              title="Where do we send your price?"
              sub="No spam, no pressure — just your quote."
            />
            <div className="space-y-4">
              <Field
                label="Name"
                value={contact.name}
                onChange={(v) => setContact((p) => ({ ...p, name: v }))}
                placeholder="Jordan Smith"
                required
              />
              <Field
                label="Phone"
                value={contact.phone}
                onChange={(v) => setContact((p) => ({ ...p, phone: v }))}
                placeholder="(250) 555-0123"
                type="tel"
                required
              />
              <Field
                label="Email"
                value={contact.email ?? ""}
                onChange={(v) => setContact((p) => ({ ...p, email: v }))}
                placeholder="you@email.com"
                type="email"
                required
              />
              {(contact.email ?? "").trim().length > 0 && !emailValid && (
                <p className="-mt-2 text-xs text-red-600">
                  Please enter a valid email address.
                </p>
              )}

              <div>
                <label className="display text-sm font-medium text-ink">
                  Upload photos{" "}
                  <span className="text-ink/50">(recommended)</span>
                </label>
                <label className="mt-2 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-line bg-surface-2 px-4 py-6 text-center hover:border-ocean/50">
                  <span className="text-2xl">📸</span>
                  <span className="text-sm text-ink/70">
                    {photos.length > 0
                      ? `${photos.length} photo(s) added`
                      : "Tap to add photos of your windows"}
                  </span>
                  <span className="text-xs text-ink/45">
                    Helps us lock in your exact price
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files ?? []);
                      setPhotos(files);
                      set("hasPhotos", files.length > 0);
                    }}
                  />
                </label>
              </div>

              <p className="rounded-xl border border-ocean/20 bg-ocean/10 px-4 py-3 text-sm text-ink/80">
                We&apos;ll review and confirm your final price within 24 hours.
              </p>
            </div>
          </div>
        )}

        {/* Nav buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {step > 1 ? (
            <button
              onClick={back}
              className="display text-sm font-medium text-ink/60 hover:text-ocean-deep"
            >
              ← Back
            </button>
          ) : (
            <span />
          )}

          {step < TOTAL_STEPS && (
            <button
              onClick={next}
              disabled={!canContinue()}
              className={clsx(
                "display rounded-full px-7 py-3 text-sm font-semibold transition-all",
                canContinue()
                  ? "bg-ocean-deep text-white hover:bg-ocean"
                  : "cursor-not-allowed bg-surface-2 text-ink/40",
              )}
            >
              Continue →
            </button>
          )}

          {step === TOTAL_STEPS && (
            <button
              onClick={submit}
              disabled={!canContinue() || submitting}
              className={clsx(
                "display rounded-full px-7 py-3 text-sm font-semibold transition-all",
                canContinue() && !submitting
                  ? "bg-ocean-deep text-white hover:bg-ocean"
                  : "cursor-not-allowed bg-surface-2 text-ink/40",
              )}
            >
              {submitting ? "Crunching numbers…" : "Get My Price"}
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-ink/50">
        🔒 No obligation. Free quote. Local Victoria-based crew.
      </p>
    </div>
  );
}

// Keep the email well under typical request/SendGrid size limits.
const MAX_PHOTOS = 8;
const MAX_TOTAL_BYTES = 6 * 1024 * 1024; // ~6 MB of (compressed) image data

/**
 * Turns the customer's uploaded files into base64 attachments for the email.
 * Images are downscaled/recompressed client-side so they reliably fit, and we
 * stop once the running total would exceed the size budget.
 */
async function buildPhotoAttachments(files: File[]): Promise<PhotoAttachment[]> {
  const out: PhotoAttachment[] = [];
  let used = 0;

  for (const file of files.slice(0, MAX_PHOTOS)) {
    const attachment = await fileToAttachment(file);
    // base64 inflates size by ~4/3; estimate the real byte cost.
    const bytes = Math.ceil((attachment.content.length * 3) / 4);
    if (used + bytes > MAX_TOTAL_BYTES) break;
    used += bytes;
    out.push(attachment);
  }

  return out;
}

async function fileToAttachment(file: File): Promise<PhotoAttachment> {
  // Try to compress images via a canvas; fall back to the raw file.
  if (file.type.startsWith("image/")) {
    try {
      return await compressImage(file);
    } catch {
      // fall through to raw read
    }
  }
  const content = await fileToBase64(file);
  return {
    filename: file.name || "photo",
    type: file.type || "application/octet-stream",
    content,
  };
}

async function compressImage(file: File): Promise<PhotoAttachment> {
  const bitmap = await createImageBitmap(file);
  const maxDim = 1600;
  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close?.();

  const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
  const base64 = dataUrl.split(",")[1] ?? "";
  const baseName = (file.name || "photo").replace(/\.[^.]+$/, "");
  return { filename: `${baseName}.jpg`, type: "image/jpeg", content: base64 };
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1] ?? "");
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function StepHeader({
  kicker,
  title,
  sub,
}: {
  kicker: string;
  title: string;
  sub?: string;
}) {
  return (
    <div>
      <span className="eyebrow text-xs text-ocean-deep">{kicker}</span>
      <h2 className="display mt-1 text-2xl font-bold text-ink sm:text-3xl">
        {title}
      </h2>
      {sub && <p className="mt-2 text-sm text-ink/60">{sub}</p>}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="display text-sm font-medium text-ink">
        {label}
        {required && <span className="text-ocean-deep"> *</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink/40 focus:border-ocean"
      />
    </div>
  );
}

function PricePreview({ low, high }: { low: number; high: number }) {
  return (
    <div className="rounded-xl border border-ocean/30 bg-ocean/10 px-5 py-4 text-center">
      <p className="eyebrow text-xs text-ocean-deep">Running estimate</p>
      <p className="display mt-1 text-2xl font-bold text-ink">
        ${low} – ${high}{" "}
        <span className="text-sm font-normal text-ink/50">CAD</span>
      </p>
    </div>
  );
}
