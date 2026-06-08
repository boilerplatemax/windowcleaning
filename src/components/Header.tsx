"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui";
import { clsx } from "@/lib/clsx";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 border-b border-smoke bg-ink transition-shadow duration-300",
        scrolled ? "shadow-luxe" : "",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "display text-sm tracking-wide transition-colors",
                pathname === item.href
                  ? "text-gold"
                  : "text-cream/80 hover:text-gold",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="display text-sm text-cream/80 hover:text-gold"
          >
            {site.phone}
          </a>
          <Button href="/quote" size="md">
            Get a Quote
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-sm border border-smoke text-cream lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={clsx(
                "block h-0.5 w-6 bg-gold transition-transform",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-gold transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-gold transition-transform",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "overflow-hidden border-t border-smoke bg-noir transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={clsx(
                "display rounded-sm px-3 py-3 text-base tracking-wide",
                pathname === item.href
                  ? "bg-charcoal text-gold"
                  : "text-cream/85 hover:bg-charcoal",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-smoke pt-4">
            <a
              href={site.phoneHref}
              className="display text-center text-cream/80"
            >
              Call {site.phone}
            </a>
            <Button href="/quote" size="lg">
              Get a Quote
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
