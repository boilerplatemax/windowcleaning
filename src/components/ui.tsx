import Link from "next/link";
import { clsx } from "@/lib/clsx";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "dark";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide rounded-sm transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  gold: "gold-grad text-ink font-semibold hover:brightness-110 shadow-luxe",
  outline:
    "border border-gold/60 text-gold hover:bg-gold hover:text-ink",
  dark: "bg-charcoal text-cream border border-smoke hover:border-gold/50",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="display text-xs sm:text-sm tracking-[0.25em] text-gold">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  light?: boolean;
}) {
  return (
    <div
      className={clsx(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2
        className={clsx(
          "display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.05]",
          light ? "text-ink" : "text-cream",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 text-base sm:text-lg leading-relaxed",
            light ? "text-ink/70" : "text-cream/70",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
