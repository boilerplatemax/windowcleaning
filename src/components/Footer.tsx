import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-smoke bg-ink pinstripe">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/65">
              The cleanest crew in {site.serviceArea}. We do the dirty work so
              your windows look like a million bucks. No obligation, no funny
              business — just an offer you can&apos;t refuse.
            </p>
            <p className="mt-4 text-sm text-cream/50">
              Serving {site.serviceArea} · {site.hours}
            </p>
          </div>

          <div>
            <h3 className="display text-sm tracking-[0.2em] text-gold">
              The Joint
            </h3>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-sm text-cream/70 hover:text-gold"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="display text-sm tracking-[0.2em] text-gold">
              Get in Touch
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>
                <a href={site.phoneHref} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.emailHref} className="hover:text-gold break-all">
                  {site.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={site.social.instagram}
                  className="hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                {" · "}
                <a
                  href={site.social.facebook}
                  className="hover:text-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-smoke pt-6 text-xs text-cream/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p className="display tracking-widest text-gold/70">
            Capisce? Clean windows, guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
