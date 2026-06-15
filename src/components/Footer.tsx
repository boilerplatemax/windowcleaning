import Link from "next/link";
import { nav, site } from "@/lib/site";
import { Logo } from "@/components/Logo";

export function Footer({ logoSrc }: { logoSrc?: string }) {
  return (
    <footer className="deep-sea border-t border-smoke">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo src={logoSrc} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream/70">
              Professional residential window cleaning across{" "}
              {site.serviceArea}. We bring back the view with a streak-free
              shine — every pane, inside and out, done right.
            </p>
            <p className="mt-4 text-sm text-cream/50">
              Serving {site.serviceArea} · {site.hours}
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-xs text-ocean-soft">Explore</h3>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-cream/70 hover:text-ocean-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/quote"
                  className="text-sm text-cream/70 hover:text-ocean-soft"
                >
                  Get a Quote
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-xs text-ocean-soft">Get in Touch</h3>
            <ul className="mt-4 space-y-2 text-sm text-cream/70">
              <li>
                <a href={site.phoneHref} className="hover:text-ocean-soft">
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={site.emailHref}
                  className="hover:text-ocean-soft break-all"
                >
                  {site.email}
                </a>
              </li>
              <li className="pt-2">
                <a
                  href={site.social.instagram}
                  className="hover:text-ocean-soft"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
                {" · "}
                <a
                  href={site.social.facebook}
                  className="hover:text-ocean-soft"
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
          <p className="display text-ocean-soft/80">
            Spotless windows, guaranteed.
          </p>
        </div>
      </div>
    </footer>
  );
}
