import Image from "next/image";

import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — bloco principal reutilizado em quase todas as páginas.
 *
 * Estratégia de alinhamento (≥ md):
 *  - Layout em grid 2 colunas, sem Container.
 *  - A coluna da imagem ocupa metade da viewport e sangra até a borda lateral
 *    correspondente (esquerda ou direita), criando ritmo visual contínuo
 *    com o hero e os blocos vizinhos.
 *  - A coluna do texto recebe `pad-container-l/r` no lado externo, o que
 *    garante que o texto comece exatamente onde o conteúdo do Container
 *    começaria (44px ou (100vw - 1200) / 2 + 44px) — preserva o alinhamento
 *    com o resto do site.
 *  - Texto nunca cobre a ilustração (cada um na sua coluna), respeitando
 *    legibilidade.
 *
 * Mobile (< md):
 *  - Stack vertical: texto em cima dentro do padding mobile, ilustração
 *    abaixo enquadrada com cantos arredondados, sem bleed.
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageOnLeft = direction === "left";

  return (
    <section className={cn("overflow-hidden", bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <div className="grid grid-cols-1 md:grid-cols-2 md:items-center">
        {/* Texto */}
        <div
          className={cn(
            "pad-container-l pad-container-r py-12 md:py-[88px]",
            imageOnLeft ? "md:order-2 md:pl-8 lg:pl-12" : "md:order-1 md:pr-8 lg:pr-12",
          )}
        >
          <div className="space-y-5 md:max-w-[460px]">
            {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
            <SectionHeading>{title}</SectionHeading>
            <div className="space-y-4">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-body text-[15px] font-normal leading-[1.72] text-site-text-mid"
                >
                  {p}
                </p>
              ))}
            </div>
            {cta ? (
              <div className="pt-2">
                <SiteButton href={cta.href} variant="primary">
                  {cta.label}
                </SiteButton>
              </div>
            ) : null}
          </div>
        </div>

        {/* Ilustração */}
        <div
          className={cn(
            "pad-container-l pad-container-r md:px-0",
            imageOnLeft ? "md:order-1" : "md:order-2",
          )}
        >
          <div className="overflow-hidden rounded-card md:rounded-none">
            <Image
              src={image.src}
              alt={image.alt}
              width={1800}
              height={1350}
              sizes="(max-width: 768px) 100vw, 50vw"
              className={cn(
                "h-auto w-full",
                imageOnLeft ? "md:mask-fade-right" : "md:mask-fade-left",
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
