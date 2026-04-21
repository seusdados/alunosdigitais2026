import { cn } from "@/lib/utils";

/**
 * Eyebrow label (pequeno rótulo acima de H2).
 *
 * Estilo fixo: DM Sans 500 10.5px, uppercase, letter-spacing 0.15em, teal-500.
 * Cor pode ser trocada via className (ex. "text-white/50" em fundos navy).
 */
export function SectionEyebrow({
  children,
  className,
  as: Component = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Component
      className={cn(
        "font-body text-[13px] font-medium uppercase tracking-[0.14em] text-teal-500",
        className,
      )}
    >
      {children}
    </Component>
  );
}
