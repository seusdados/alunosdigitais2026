import Image from "next/image";

import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { SiteButton } from "@/components/site/site-button";
import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — texto + ilustração "estourada".
 *
 * Desktop (≥ lg): grid 2 colunas com gap-0, items-center. A coluna de
 * imagem ganha margem negativa do lado externo pra cancelar o padding
 * da section, e a imagem em si tem w-[130%] + margem negativa interna
 * pra exceder a coluna. A borda interna da imagem é dissolvida por
 * mask-image fade, impedindo corte duro contra o texto.
 *
 * Mobile (< lg): stack vertical, texto com padding normal da section,
 * imagem sem bleed (respeita o próprio padding).
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageOnLeft = direction === "left";

  return (
    <section
      className={cn(
        "overflow-hidden px-8 py-14 lg:px-12",
        bgColor === "sand" ? "bg-sand" : "bg-site-white",
      )}
    >
      <div className="grid grid-cols-1 items-center gap-0 lg:grid-cols-2">
        {/* Texto */}
        <div
          className={cn(
            "space-y-4",
            imageOnLeft ? "lg:order-2 lg:pl-8 xl:pl-12" : "lg:order-1 lg:pr-8 xl:pr-12",
          )}
        >
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading>{title}</SectionHeading>
          <div className="space-y-4 pt-1">
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

        {/* Ilustração — w-[130%] e margem negativa pra exceder a coluna */}
        <div
          className={cn(
            "order-first mt-8 overflow-hidden lg:order-none lg:mt-0",
            imageOnLeft ? "lg:-ml-12 xl:-ml-12" : "lg:-mr-12 xl:-mr-12",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1800}
            height={1350}
            sizes="(max-width: 1024px) 100vw, 55vw"
            className={cn("h-auto w-full lg:w-[130%]", imageOnLeft ? "lg:-ml-[5%]" : "lg:-ml-[0%]")}
            style={{
              maskImage: imageOnLeft
                ? "linear-gradient(to left, transparent 0%, black 15%, black 100%)"
                : "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
              WebkitMaskImage: imageOnLeft
                ? "linear-gradient(to left, transparent 0%, black 15%, black 100%)"
                : "linear-gradient(to right, transparent 0%, black 15%, black 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
