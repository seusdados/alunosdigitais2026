import { cn } from "@/lib/utils";

/**
 * Container principal do site público.
 *
 * Espaçamento do sistema:
 * - Desktop: padding lateral 44px, largura máxima 1200px
 * - Mobile:  padding lateral 24px
 *
 * Conforme docs/implementation/design-system-tailwind.md.
 */
export function Container({
  children,
  className,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "main" | "header" | "footer" | "nav";
}) {
  return (
    <Component className={cn("mx-auto w-full max-w-[1200px] px-6 md:px-11", className)}>
      {children}
    </Component>
  );
}
