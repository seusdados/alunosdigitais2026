import Image from "next/image";

import { cn } from "@/lib/utils";
import type { BleedDirection } from "@/types/content";

/**
 * Ilustração com tratamento de "sangria".
 *
 * Princípio: nenhuma imagem enquadrada em retângulo nem cortada. Cada
 * ilustração aparece inteira (sem crop), excede seu container (width >
 * 100%) e tem as bordas dissolvidas por mask-image (gradiente transparente
 * → preto).
 *
 * A imagem renderiza em tamanho natural (`h-auto w-full`), sem aspect-ratio
 * fixo e sem `object-cover` — para que apareça COMPLETA, "estourada" mas
 * INTEIRA, sem cortar nenhum conteúdo visual.
 *
 * Direções:
 *  - `left`  — sangra pela borda esquerda, dissolve a direita
 *  - `right` — sangra pela borda direita, dissolve a esquerda
 *  - `full`  — full-bleed bilateral, dissolve topo e base
 *  - `hero`  — composição horizontal + vertical
 *  - `curriculum` — vertical à esquerda, dissolve direita + topo/base
 */
export function BleedImage({
  src,
  alt,
  direction,
  className,
  priority,
}: {
  src: string;
  alt: string;
  direction: BleedDirection;
  className?: string;
  priority?: boolean;
}) {
  const maskClass =
    direction === "left"
      ? "md:mask-fade-right"
      : direction === "right"
        ? "md:mask-fade-left"
        : direction === "full"
          ? "md:mask-fade-vertical"
          : direction === "hero"
            ? "md:mask-hero"
            : "md:mask-curriculum";

  const positionClass =
    direction === "left"
      ? "md:-ml-16 md:w-[140%]"
      : direction === "right"
        ? "md:-mr-16 md:w-[140%]"
        : direction === "full"
          ? "md:-mx-16 md:w-[calc(100%+128px)]"
          : direction === "curriculum"
            ? "md:-ml-16 md:w-[calc(100%+64px)]"
            : "md:w-[115%]";

  return (
    <div className={cn("relative overflow-hidden rounded-card md:rounded-none", className)}>
      <Image
        src={src}
        alt={alt}
        width={1800}
        height={1350}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 65vw"
        className={cn("h-auto w-full max-w-none", maskClass, positionClass)}
      />
    </div>
  );
}
