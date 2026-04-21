import Image from "next/image";

import { cn } from "@/lib/utils";
import type { BleedDirection } from "@/types/content";

/**
 * Ilustração com tratamento de "sangria".
 *
 * Princípio: a imagem sangra pela borda da seção (margem negativa no
 * WRAPPER), mas NÃO invade a coluna do texto (wrapper tem overflow-hidden).
 * A seção pai também tem overflow-hidden como backstop.
 *
 * O wrapper é mais largo que o grid cell (w-[calc(100%+64px)]) e tem
 * margem negativa na direção do bleed (-ml-16 ou -mr-16). A imagem ocupa
 * 100% do wrapper (que já é mais largo que o cell), portanto aparece
 * "estourada" sem nunca transbordar para o lado do texto.
 *
 * A mask-image dissolve a borda que fica do lado do texto.
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

  const wrapperBleed =
    direction === "left"
      ? "md:-ml-16 md:w-[calc(100%+64px)]"
      : direction === "right"
        ? "md:-mr-16 md:w-[calc(100%+64px)]"
        : direction === "full"
          ? "-mx-6 w-[calc(100%+48px)] md:-mx-16 md:w-[calc(100%+128px)]"
          : direction === "curriculum"
            ? "md:-ml-16 md:w-[calc(100%+64px)]"
            : "";

  return (
    <div className={cn("relative overflow-hidden", wrapperBleed, className)}>
      <Image
        src={src}
        alt={alt}
        width={1800}
        height={1350}
        priority={priority}
        sizes="(max-width: 768px) 100vw, 65vw"
        className={cn("h-auto w-full max-w-none", maskClass)}
      />
    </div>
  );
}
