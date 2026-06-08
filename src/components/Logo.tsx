import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-3">
      {/* Fedora + squeegee crest */}
      <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-gold/50 bg-ink shadow-luxe">
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6 text-gold"
          fill="currentColor"
          aria-hidden="true"
        >
          {/* fedora */}
          <path d="M12 3c-2.2 0-3.6 1.7-3.9 4.2-2.6.5-4.6 1.6-4.6 2.9 0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3c0-1.3-2-2.4-4.6-2.9C15.6 4.7 14.2 3 12 3z" />
          <path d="M2 11.3c1.6 1.2 5.4 2 10 2s8.4-.8 10-2v1.1C22 13.9 17.5 15 12 15S2 13.9 2 12.4v-1.1z" />
        </svg>
      </span>
      <span className="leading-none">
        <span
          className={`display block text-lg font-bold tracking-wide ${
            light ? "text-ink" : "text-cream"
          }`}
        >
          Wise Guys
        </span>
        <span className="display block text-[0.7rem] tracking-[0.35em] text-gold">
          WINDOWS
        </span>
      </span>
      <span className="sr-only">{site.name}</span>
    </Link>
  );
}
