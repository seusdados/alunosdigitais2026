import Image from "next/image";

import { cn } from "@/lib/utils";
import type { SplitBleedData } from "@/types/content";

/**
 * SplitBleedBlock — texto + ilustração em 2 colunas.
 *
 * Layout: coluna de texto 40%, coluna de ilustração 56%, gap 4%. A matriz
 * inverte conforme `direction` (imagem à esquerda ou à direita). O col de
 * imagem é levemente maior que o do texto pra dar presença vertical às
 * ilustrações panorâmicas (algumas têm aspect ratio 1.8:1, que fica baixo
 * se a coluna for estreita).
 *
 * Tipografia alinhada com o Hero: H2 48/68, parágrafos 20/22, eyebrow 16.
 *
 * Ilustrações são SEMPRE mostradas em tamanho natural (`w-full h-auto`),
 * sem crop. Sangram até a borda lateral correspondente via margem
 * negativa (-mr-12 ou -ml-12), e a mask fade dissolve a borda interna
 * (onde encontra o texto).
 *
 * Mobile: stack vertical, texto em cima, ilustração embaixo (bleed em
 * ambos os lados pra cancelar o padding da section).
 */
export function SplitBleedBlock({ data }: { data: SplitBleedData }) {
  const { eyebrow, title, paragraphs, image, direction, bgColor = "white", cta } = data;
  const imageRight = direction === "right";

  return (
    <section
      className={cn(
        "overflow-hidden px-8 py-20 lg:px-12 lg:py-24",
        bgColor === "sand" ? "bg-sand" : "bg-site-white",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-1 items-center gap-12 lg:gap-[4%]",
          imageRight ? "lg:grid-cols-[40%_56%]" : "lg:grid-cols-[56%_40%]",
        )}
      >
        {/* TEXTO — tamanhos iguais ao Hero (bloco 1) */}
        <div className={imageRight ? "" : "lg:order-2"}>
          {eyebrow ? (
            <p className="mb-6 font-body text-[16px] font-medium uppercase tracking-[0.14em] text-teal-500">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[48px] font-bold leading-[1.05] tracking-[-0.035em] text-site-text lg:text-[68px]">
            {title}
          </h2>
          <div className="mt-7 space-y-5">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="font-body text-[20px] leading-[1.72] text-site-text-mid lg:text-[22px]"
              >
                {p}
              </p>
            ))}
          </div>
          {cta ? (
            <div className="mt-10">
              <a
                href={cta.href}
                className="inline-flex items-center gap-2 rounded-btn bg-teal-500 px-8 py-[17px] font-body text-[18px] font-medium text-white transition-colors hover:bg-teal-600"
              >
                {cta.label}
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
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

        {/* ILUSTRAÇÃO — tamanho natural, sangra pra borda da viewport.
            Mobile: bleed em ambos os lados (cancela px-8 da section).
            Desktop: bleed apenas do lado EXTERNO (cancela px-12 só ali). */}
        <div
          className={cn(
            "-mx-8 overflow-hidden",
            imageRight ? "lg:-mr-12 lg:ml-0" : "lg:order-1 lg:-ml-12 lg:mr-0",
          )}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={1800}
            height={1350}
            sizes="(max-width: 1024px) 100vw, 56vw"
            className={cn("h-auto w-full", imageRight ? "lg:mask-fade-right" : "lg:mask-fade-left")}
          />
        </div>
      </div>
    </section>
  );
}
