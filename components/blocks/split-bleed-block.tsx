import Image from "next/image";

import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — texto + ilustração em 2 colunas.
 *
 * Princípio crítico: **a ilustração nunca é cortada**. Usamos sempre o
 * tamanho natural da imagem (`w-full h-auto`, proporção preservada). A
 * coluna cresce junto com a imagem; o texto fica vertically centered ao
 * lado. Nenhum `object-cover`, nenhum `fill` com crop.
 *
 * O efeito "sangria" é obtido por:
 *   - Margem negativa na coluna da imagem cancelando o padding da section
 *     do lado externo (a imagem vai até a borda da viewport).
 *   - Mask fade na borda interna da imagem (onde encontra o texto),
 *     dissolvendo sem corte duro.
 *
 * Layout:
 *   - Desktop (≥ lg): grid 2 cols, items-center, gap generoso.
 *   - Mobile (< lg): stack vertical, texto em cima, imagem embaixo.
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageRight = direction === "right";

  return (
    <section
      className={cn(
        "overflow-hidden px-8 py-24 lg:px-12",
        bgColor === "sand" ? "bg-sand" : "bg-site-white",
      )}
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* TEXTO */}
        <div className={imageRight ? "lg:order-1" : "lg:order-2"}>
          <div className="max-w-[540px]">
            {eyebrow ? (
              <p className="mb-5 font-body text-[13px] font-medium uppercase tracking-[0.14em] text-teal-500">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="font-display text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-site-text lg:text-[44px]">
              {title}
            </h2>
            <div className="mt-6 space-y-4">
              {paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="font-body text-[17px] leading-[1.78] text-site-text-mid lg:text-[18px]"
                >
                  {p}
                </p>
              ))}
            </div>
            {cta ? (
              <div className="mt-8">
                <a
                  href={cta.href}
                  className="inline-flex items-center gap-2 rounded-btn bg-teal-500 px-6 py-[14px] font-body text-[15px] font-medium text-white transition-colors hover:bg-teal-600"
                >
                  {cta.label}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 7h8m-3.5-3.5L11 7l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            ) : null}
          </div>
        </div>

        {/* ILUSTRAÇÃO — tamanho natural, sangra pra borda da viewport.
            Mobile: bleed em ambos os lados (cancela px-8 da section).
            Desktop: bleed apenas do lado EXTERNO (cancela px-12 só ali). */}
        <div
          className={cn(
            "-mx-8 overflow-hidden",
            imageRight ? "lg:order-2 lg:-mr-12 lg:ml-0" : "lg:order-1 lg:-ml-12 lg:mr-0",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1800}
            height={1350}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={cn("h-auto w-full", imageRight ? "lg:mask-fade-right" : "lg:mask-fade-left")}
          />
        </div>
      </div>
    </section>
  );
}
