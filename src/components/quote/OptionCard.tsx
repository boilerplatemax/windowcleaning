"use client";

import { clsx } from "@/lib/clsx";

export function OptionCard({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={clsx(
        "group flex w-full flex-col items-center gap-2 rounded-xl border p-5 text-center transition-all duration-200",
        selected
          ? "border-ocean bg-ocean/10 shadow-card"
          : "border-line bg-surface hover:border-ocean/50",
      )}
    >
      {icon && (
        <span
          className={clsx(
            "text-3xl transition-transform group-hover:scale-110",
            selected ? "text-ocean-deep" : "text-ink/60",
          )}
        >
          {icon}
        </span>
      )}
      <span
        className={clsx(
          "display text-base font-medium",
          selected ? "text-ocean-deep" : "text-ink",
        )}
      >
        {title}
      </span>
      {subtitle && (
        <span className="text-xs leading-snug text-ink/55">{subtitle}</span>
      )}
    </button>
  );
}

export function CheckCard({
  checked,
  onClick,
  icon,
  title,
  subtitle,
}: {
  checked: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={checked}
      className={clsx(
        "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all",
        checked
          ? "border-ocean bg-ocean/10"
          : "border-line bg-surface hover:border-ocean/50",
      )}
    >
      <span
        className={clsx(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded border",
          checked
            ? "border-ocean bg-ocean text-white"
            : "border-ink/30 text-transparent",
        )}
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={3}>
          <path d="M5 13l4 4L19 7" />
        </svg>
      </span>
      {icon && <span className="text-2xl">{icon}</span>}
      <span className="flex-1">
        <span className="display block text-sm font-medium text-ink">
          {title}
        </span>
        {subtitle && (
          <span className="block text-xs text-ink/55">{subtitle}</span>
        )}
      </span>
    </button>
  );
}
