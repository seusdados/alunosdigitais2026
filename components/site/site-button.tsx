import Link from "next/link";

import { cn } from "@/lib/utils";

export type SiteButtonVariant = "primary" | "secondary" | "white" | "outline-white";

const VARIANT_CLASSES: Record<SiteButtonVariant, string> = {
  primary: "bg-teal-500 text-white hover:bg-teal-600 focus-visible:ring-teal-500/50",
  secondary:
    "bg-transparent text-white/90 border border-white/20 hover:bg-white/5 focus-visible:ring-white/40",
  white: "bg-white text-navy-700 hover:bg-sand focus-visible:ring-white/60",
  "outline-white":
    "bg-transparent text-white/80 border border-white/20 hover:bg-white/5 focus-visible:ring-white/40",
};

const BASE_CLASSES =
  "inline-flex h-[42px] items-center justify-center gap-2 whitespace-nowrap rounded-btn px-6 font-body text-[13.5px] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50";

/**
 * Botão do site público. Variantes alinhadas com docs/implementation/componentes.md.
 *
 * Se `href` é passado, renderiza como <Link>. Caso contrário, <button>.
 */
export function SiteButton({
  href,
  variant = "primary",
  className,
  children,
  type = "button",
  onClick,
  disabled,
  ariaLabel,
}: {
  href?: string;
  variant?: SiteButtonVariant;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  ariaLabel?: string;
}) {
  const classes = cn(BASE_CLASSES, VARIANT_CLASSES[variant], className);

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
