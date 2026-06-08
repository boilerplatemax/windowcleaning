import Link from "next/link";
import { site } from "@/lib/site";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center leading-none">
      <span>
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
