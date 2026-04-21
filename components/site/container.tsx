import { cn } from "@/lib/utils";

/**
 * Container principal do site público — viewport-wide com padding lateral
 * consistente (32px mobile, 48px ≥ lg). Sem max-width: o conteúdo ocupa
 * toda a largura da viewport, com a respiração controlada só pelo padding.
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
    <Component className={cn("mx-auto w-full px-8 lg:px-12", className)}>{children}</Component>
  );
}
