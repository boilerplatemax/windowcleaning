import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Stingray Cleaning wordmark.
 *
 * If a logo image has been dropped into `public/photos` (resolved server-side
 * and passed down as `src`), we render that. Otherwise we fall back to a clean
 * built-in wordmark with a stingray mark, so the brand always shows.
 *
 * `light` renders the wordmark text in dark ink for use on light backgrounds
 * (the header). The footer uses the default light-on-dark treatment.
 */
export function Logo({
  light = false,
  src,
}: {
  light?: boolean;
  src?: string;
}) {
  return (
    <Link href="/" className="group flex items-center gap-2.5 leading-none">
      {src ? (
        // A plain <img> lets the owner drop in any logo file type without
        // configuring width/height for next/image.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={site.name} className="h-9 w-auto sm:h-10" />
      ) : (
        <>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              light ? "bg-ocean-deep/10" : "bg-white/10"
            } transition-colors group-hover:bg-ocean/20`}
          >
            <StingrayMark className="h-6 w-6 text-ocean-deep" />
          </span>
          <span>
            <span
              className={`display block text-lg font-bold tracking-tight ${
                light ? "text-ink" : "text-cream"
              }`}
            >
              Stingray
            </span>
            <span className="eyebrow block text-[0.6rem] text-ocean-deep">
              Window Cleaning
            </span>
          </span>
        </>
      )}
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}

/** Minimal top-down stingray silhouette. */
export function StingrayMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.4c.66 0 1.13.46 1.5 1.28.95 2.16 3.07 3.66 6.07 4.45.86.23 1.2.86.9 1.6-.27.66-.93.86-1.97.78-.74-.06-1.4.02-1.98.23.38.3.68.66.86 1.1.3.72-.22 1.36-1 1.36-.55 0-1.05-.27-1.52-.74-.95.86-2.06 1.42-2.92 1.78l.36 2.06c.06.36-.19.7-.55.74-.16.02-.3-.02-.42-.1l-.02.14c-.04.4-.38.7-.78.66a.72.72 0 0 1-.66-.78l.04-.4a.66.66 0 0 1-.5-.16c-.12.08-.27.12-.43.1a.66.66 0 0 1-.55-.74l.36-2.06c-.86-.36-1.97-.92-2.92-1.78-.47.47-.97.74-1.52.74-.78 0-1.3-.64-1-1.36.18-.44.48-.8.86-1.1-.58-.21-1.24-.29-1.98-.23-1.04.08-1.7-.12-1.97-.78-.3-.74.04-1.37.9-1.6 3-.79 5.12-2.29 6.07-4.45.37-.82.84-1.28 1.5-1.28z"
      />
    </svg>
  );
}
