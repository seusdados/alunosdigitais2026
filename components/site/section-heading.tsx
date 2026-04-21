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
          "font-display text-[48px] font-bold leading-[1.05] tracking-[-0.035em] text-site-text lg:text-[68px]",
          className,
        )}
      >
        {children}
      </Component>
      {subtitle ? (
        <p className="max-w-3xl font-body text-[20px] font-light leading-[1.72] text-site-text-mid lg:text-[22px]">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
