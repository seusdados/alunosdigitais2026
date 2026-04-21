import { cn } from "@/lib/utils";

/**
 * H2 padrão de seção (site público).
 *
 * Fraunces 700 32px, tracking -0.03em, cor site-text por padrão.
 * Em fundos escuros, passe `className="text-white"`.
 */
export function SectionHeading({
  children,
  className,
  as: Component = "h2",
  subtitle,
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="space-y-3">
      <Component
        className={cn(
          "font-display text-[28px] font-bold leading-tight tracking-tighter text-site-text md:text-[32px]",
          className,
        )}
      >
        {children}
      </Component>
      {subtitle ? (
        <p className="max-w-2xl font-body text-[15px] font-light leading-[1.72] text-site-text-mid">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
