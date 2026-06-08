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
        "sticky top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "glass border-line shadow-card"
          : "border-transparent bg-paper/70",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <div className="text-ink">
          <Logo light />
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "display text-sm font-medium transition-colors",
                pathname === item.href
                  ? "text-ocean-deep"
                  : "text-ink/70 hover:text-ocean-deep",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={site.phoneHref}
            className="display text-sm font-medium text-ink/70 hover:text-ocean-deep"
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
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span
              className={clsx(
                "block h-0.5 w-6 bg-ocean transition-transform",
                open && "translate-y-2 rotate-45",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-ocean transition-opacity",
                open && "opacity-0",
              )}
            />
            <span
              className={clsx(
                "block h-0.5 w-6 bg-ocean transition-transform",
                open && "-translate-y-2 -rotate-45",
              )}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={clsx(
          "overflow-hidden border-t border-line bg-surface transition-[max-height] duration-300 lg:hidden",
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
                "display rounded-lg px-3 py-3 text-base font-medium",
                pathname === item.href
                  ? "bg-surface-2 text-ocean-deep"
                  : "text-ink/80 hover:bg-surface-2",
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-2 flex flex-col gap-3 border-t border-line pt-4">
            <a
              href={site.phoneHref}
              className="display text-center font-medium text-ink/70"
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
