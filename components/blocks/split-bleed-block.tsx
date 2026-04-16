import { BleedImage } from "@/components/site/bleed-image";
import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — bloco principal reutilizado em quase todas as páginas.
 *
 * Desktop (≥ md):
 *  - Grid assimétrico: texto em coluna estreita (max 460px), ilustração na
 *    coluna larga (1fr). A ilustração recebe prioridade visual —
 *    "estourada", sangrando pela borda da viewport e dissolvendo a borda
 *    que encontraria o texto (via BleedImage).
 *  - `direction='right'` → texto à esquerda, ilustração à direita
 *  - `direction='left'`  → ilustração à esquerda, texto à direita
 *
 * Mobile/tablet (< md):
 *  - Stack vertical: texto em cima, ilustração abaixo em rounded-card leve,
 *    sem bleed nem mask direcional.
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;

  const imageFirst = direction === "left";

  // Proporção assimétrica privilegia a ilustração (1.15fr vs texto 460px max).
  const gridCols = imageFirst
    ? "md:grid-cols-[minmax(0,1.15fr)_minmax(0,460px)]"
    : "md:grid-cols-[minmax(0,460px)_minmax(0,1.15fr)]";

  return (
    <section className={cn("overflow-hidden", bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className={cn("grid gap-10 py-16 md:gap-8 md:py-[88px] lg:gap-10", gridCols)}>
        {/* Imagem — desktop respeita ordem, mobile sempre depois do texto */}
        <div className={cn("order-2 min-w-0", imageFirst ? "md:order-1" : "md:order-2")}>
          <BleedImage src={image.src} alt={image.alt} direction={direction} />
        </div>

        <div
          className={cn(
            "order-1 flex flex-col justify-center space-y-5",
            imageFirst ? "md:order-2" : "md:order-1",
          )}
        >
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}

          <SectionHeading>{title}</SectionHeading>

          <div className="max-w-[460px] space-y-4">
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
      </Container>
    </section>
  );
}
