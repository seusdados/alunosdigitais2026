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
 * Duas colunas no desktop:
 *  - direction="left"  → imagem à esquerda, texto à direita
 *  - direction="right" → texto à esquerda, imagem à direita
 *
 * Mobile: stack vertical (texto em cima, imagem abaixo, sem bleed).
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;

  const imageFirst = direction === "left";

  return (
    <section className={cn("overflow-hidden", bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="grid gap-10 py-16 md:grid-cols-2 md:gap-14 md:py-[80px]">
        {/* Imagem — desktop respeita ordem, mobile sempre depois do texto */}
        <div className={cn("order-2", imageFirst ? "md:order-1" : "md:order-2")}>
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

          <div className="max-w-[480px] space-y-4">
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
