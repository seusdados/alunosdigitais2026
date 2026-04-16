import Image from "next/image";

import { cn } from "@/lib/utils";
import type { BleedDirection } from "@/types/content";

/**
 * Ilustração com tratamento de "sangria".
 *
 * Princípio do design: nenhuma imagem aparece enquadrada num retângulo.
 * Cada ilustração excede seu container (width > 100%) e tem as bordas
 * dissolvidas por `mask-image` (gradiente transparente → preto → preto).
 *
 * Direções:
 *  - `left`  — imagem do lado esquerdo, sangra pela borda esquerda da
 *              viewport, dissolvendo a borda direita (mask-fade-right)
 *  - `right` — imagem do lado direito, sangra pela borda direita da
 *              viewport, dissolvendo a borda esquerda (mask-fade-left)
 *  - `full`  — faixa full-bleed, dissolvendo topo e base (mask-fade-vertical)
 *  - `hero`  — composição horizontal + vertical para o hero principal
 *  - `curriculum` — ilustração vertical à esquerda, dissolvendo na
 *              direita + fade topo/base (bloco curricular)
 *
 * No mobile/tablet (< md), a ilustração aparece enquadrada em rounded-card
 * leve (ainda respira sem virar retângulo duro), sem margem negativa nem
 * mask direcional.
 */
export function BleedImage({
  src,
  alt,
  direction,
  className,
  priority,
  aspect = "4/3",
}: {
  src: string;
  alt: string;
  direction: BleedDirection;
  className?: string;
  priority?: boolean;
  /** CSS aspect-ratio do wrapper (default 4/3). */
  aspect?: string;
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

  // Bleed maior (−64px = −mr-16) e width 140% para a ilustração realmente
  // transbordar — "estourada", não enquadrada.
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
    <div
      className={cn("relative overflow-hidden rounded-card md:rounded-none", className)}
      style={{ aspectRatio: aspect }}
    >
      <Image
        src={src}
        alt={alt}
        width={1800}
        height={1350}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 65vw"
        className={cn(
          "h-full w-full max-w-none object-cover object-center",
          // Desktop: mask direcional + bleed por margem negativa
          maskClass,
          positionClass,
        )}
      />
    </div>
  );
}
