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
          "font-display text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-site-text lg:text-[44px]",
          className,
        )}
      >
        {children}
      </Component>
      {subtitle ? (
        <p className="max-w-2xl font-body text-[17px] font-light leading-[1.72] text-site-text-mid lg:text-[18px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
