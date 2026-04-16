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
 *  - `left`  — imagem do lado esquerdo, sangra pela borda esquerda,
 *              dissolvendo a borda direita (mask-fade-right)
 *  - `right` — imagem do lado direito, sangra pela borda direita,
 *              dissolvendo a borda esquerda (mask-fade-left)
 *  - `full`  — faixa full-bleed, dissolvendo topo e base (mask-fade-vertical)
 *  - `hero`  — composição horizontal + vertical para o hero principal
 *  - `curriculum` — ilustração vertical à esquerda, dissolvendo na
 *              direita + fade topo/base (bloco curricular)
 *
 * No mobile, todas as direções viram sangria suave sem margens negativas
 * (controlado via responsividade do componente que chama).
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
      ? "mask-fade-right"
      : direction === "right"
        ? "mask-fade-left"
        : direction === "full"
          ? "mask-fade-vertical"
          : direction === "hero"
            ? "mask-hero"
            : "mask-curriculum";

  const positionClass =
    direction === "left"
      ? "md:-ml-11 md:w-[130%]"
      : direction === "right"
        ? "md:-mr-11 md:w-[130%]"
        : direction === "full"
          ? "md:-mx-11 md:w-[calc(100%+88px)]"
          : direction === "curriculum"
            ? "md:-ml-11 md:w-[calc(100%+44px)]"
            : "md:w-[115%]";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={1200}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 60vw"
        className={cn(
          "h-auto w-full max-w-none object-cover",
          // Desktop: sangra com mask
          maskClass,
          positionClass,
        )}
      />
    </div>
  );
}
