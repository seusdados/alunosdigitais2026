import Image from "next/image";

import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SiteButton } from "@/components/site/site-button";
import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — texto + ilustração em 2 colunas, lado a lado.
 *
 * Desktop (≥ lg): grid 2 cols, items-center, min-h-[420px]. Texto numa
 * coluna, ilustração na outra — **nunca se sobrepõem**. A ordem é
 * controlada por `direction`:
 *   - direction="right" → texto à esquerda, ilustração à direita
 *   - direction="left"  → ilustração à esquerda, texto à direita
 *
 * A ilustração usa `fill` + `object-cover` pra preencher toda a coluna
 * (sem retângulo enquadrado). A borda interna (lado do texto) é
 * dissolvida com mask-image linear-gradient 12%, criando o efeito
 * "estourado" sem cortar a imagem lateralmente.
 *
 * Mobile (< lg): grid-cols-1. Texto em cima, ilustração embaixo.
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageLeft = direction === "left";

  return (
    <section className={cn("overflow-hidden", bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <div className="grid grid-cols-1 items-center lg:min-h-[420px] lg:grid-cols-2">
        {/* Texto */}
        <div
          className={cn(
            "px-8 py-14 lg:px-12",
            imageLeft ? "lg:order-2 lg:pl-16" : "lg:order-1 lg:pr-16",
          )}
        >
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <h2 className="mt-3 font-display text-[28px] font-bold leading-[1.08] tracking-tighter text-site-text lg:text-[34px]">
            {title}
          </h2>
          <div className="mt-4 space-y-3">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="font-body text-[15px] leading-[1.72] text-site-text-mid lg:text-[16px]"
              >
                {p}
              </p>
            ))}
          </div>
          {cta ? (
            <div className="mt-6">
              <SiteButton href={cta.href} variant="primary">
                {cta.label}
              </SiteButton>
            </div>
          ) : null}
        </div>

        {/* Ilustração */}
        <div
          className={cn(
            "relative h-full min-h-[300px] lg:min-h-[420px]",
            imageLeft ? "lg:order-1" : "lg:order-2",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{
              maskImage: imageLeft
                ? "linear-gradient(to left, transparent 0%, black 12%, black 100%)"
                : "linear-gradient(to right, transparent 0%, black 12%, black 100%)",
              WebkitMaskImage: imageLeft
                ? "linear-gradient(to left, transparent 0%, black 12%, black 100%)"
                : "linear-gradient(to right, transparent 0%, black 12%, black 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
