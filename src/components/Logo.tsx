import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Orca wordmark with a simple, friendly orca mark. `light` renders the
 * wordmark in dark ink for use on light backgrounds (e.g. the footer
 * uses the default light-on-dark treatment).
 */
export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 leading-none">
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          light ? "bg-ocean/10" : "bg-white/10"
        } transition-colors group-hover:bg-ocean/20`}
      >
        <OrcaMark className="h-6 w-6 text-ocean-soft" />
      </span>
      <span>
        <span
          className={`display block text-lg font-bold tracking-tight ${
            light ? "text-ink" : "text-cream"
          }`}
        >
          Orca
        </span>
        <span className="eyebrow block text-[0.6rem] text-ocean-soft">
          Window Cleaning
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}

/** Minimal breaching-orca silhouette. */
export function OrcaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 18c2.4.3 3.9-.2 5-1.2-.8-1.8-1-4-.6-6.4C7.9 6.7 9.7 4 12.4 3c.4-.15.8.27.62.66-.83 1.8-.9 3.5-.3 4.8.5 1.1 1.4 1.9 2.6 2.3 1.7.55 3.4.3 4.9-.2.4-.13.76.3.55.66-1 1.7-2.3 2.9-3.8 3.6.5.5 1.2.8 2 .92.42.06.5.64.1.8-1.7.7-3.3.6-4.6-.05-1.2 1.3-2.9 2.2-5 2.5-1.9.27-4 .03-6.1-.7-.42-.14-.38-.76.06-.83Z"
      />
      <circle cx="13.2" cy="7.4" r="0.9" fill="var(--color-ink)" />
    </svg>
  );
}
