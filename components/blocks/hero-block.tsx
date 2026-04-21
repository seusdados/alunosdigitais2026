import Image from "next/image";

import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal — navy-800 com texto à esquerda e ilustração à direita.
 *
 * Princípios:
 *   - Texto preenche sua coluna inteira (sem max-w restritivo) até a
 *     linha divisória do grid (≈ 40% da viewport).
 *   - Ilustração ocupa ~60% da viewport, com gap estreito pro texto.
 *   - Ilustração em tamanho natural (sem crop) sangra até a borda direita
 *     da viewport via `-mr-12`.
 *   - Proporção 2fr / 3fr (40%/60%) com gap-4 entre colunas.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="overflow-hidden bg-navy-800 px-8 py-20 lg:px-12 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-4">
        {/* TEXTO — sem max-w, preenche a coluna */}
        <div>
          {/* Pill */}
          <span className="mb-8 inline-flex items-center gap-2.5 rounded-pill border border-teal-500/[0.28] bg-teal-500/[0.08] py-2 pl-3 pr-4">
            <span aria-hidden className="h-2 w-2 rounded-full bg-teal-300" />
            <span className="font-body text-[16px] font-medium text-teal-300">{pill}</span>
          </span>

          {/* H1 — 48px mobile / 68px desktop (+20% sobre 40/56) */}
          <h1 className="font-display text-[48px] font-bold leading-[1.05] tracking-[-0.035em] text-white lg:text-[68px]">
            {title}{" "}
            {titleAccent ? (
              <em className="font-display font-normal text-teal-300">{titleAccent}</em>
            ) : null}
          </h1>

          {/* Subtexto — 20px mobile / 22px desktop (+20% sobre 17/18) */}
          <p className="mt-7 font-body text-[20px] font-light leading-[1.72] text-white/65 lg:text-[22px]">
            {subtitle}
          </p>

          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-10 flex flex-wrap gap-3">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="inline-flex items-center gap-2 rounded-btn bg-teal-500 px-8 py-[17px] font-body text-[18px] font-medium text-white transition-colors hover:bg-teal-600"
                >
                  {ctaPrimary.label}
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
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="inline-flex items-center rounded-btn border border-white/15 bg-transparent px-8 py-[17px] font-body text-[18px] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}

          {/* Métricas — dt 48px, dd 16px */}
          {metrics && metrics.length > 0 && (
            <dl className="mt-14 grid grid-cols-2 gap-x-10 gap-y-7 border-t border-white/[0.08] pt-10 md:grid-cols-4 md:gap-x-12">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-[48px] font-bold leading-none tracking-[-0.035em] text-white">
                    {m.value}
                  </dt>
                  <dd className="mt-3 font-body text-[16px] leading-tight text-white/40">
                    {m.label}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* ILUSTRAÇÃO — tamanho natural, sangra pra borda direita da viewport */}
        <div className="-mx-8 overflow-hidden lg:-mr-12 lg:ml-0">
          <Image
            src={image.src}
            alt={image.alt}
            width={1200}
            height={900}
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="lg:mask-fade-right h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
