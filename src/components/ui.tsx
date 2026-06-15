import Link from "next/link";
import { clsx } from "@/lib/clsx";

type ButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "ocean" | "outline" | "outlineLight" | "dark";
  size?: "md" | "lg";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold rounded-full transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

const variants = {
  ocean:
    "bg-ocean-deep text-white shadow-luxe hover:bg-ocean hover:-translate-y-0.5",
  outline:
    "border-2 border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-white",
  outlineLight:
    "border-2 border-white text-white hover:bg-white hover:text-ink",
  dark: "bg-ink text-cream border border-ink hover:bg-noir",
};

const sizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function Button({
  href,
  children,
  variant = "ocean",
  size = "md",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  const cls = clsx(base, variants[variant], sizes[size], className);
  if (href) {
    return (
      <Link href={href} className={cls} onClick={onClick}>
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
    <span className="eyebrow text-xs sm:text-sm text-ocean-deep">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  onDark = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
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
          "display mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.08]",
          onDark ? "text-cream" : "text-ink",
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={clsx(
            "mt-4 text-base sm:text-lg leading-relaxed",
            onDark ? "text-cream/85" : "text-ink/75",
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
