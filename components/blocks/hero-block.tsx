import Image from "next/image";

import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal — navy-800 com texto à esquerda e ilustração à direita.
 *
 * Ilustração SEMPRE mostrada no tamanho natural (sem crop) via
 * `width/height + w-full h-auto`. Sangra para a borda direita da
 * viewport via margem negativa cancelando o padding da section.
 * Mask fade dissolve a borda esquerda (onde encontra o texto) no navy.
 *
 * Desktop (≥ lg): grid 2 cols items-center.
 * Mobile (< lg): texto em cima com bleed lateral da ilustração embaixo.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="overflow-hidden bg-navy-800 px-8 py-20 lg:px-12 lg:py-24">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* TEXTO */}
        <div className="max-w-[560px]">
          {/* Pill */}
          <span className="mb-7 inline-flex items-center gap-2 rounded-pill border border-teal-500/[0.28] bg-teal-500/[0.08] py-1.5 pl-2.5 pr-4">
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-teal-300" />
            <span className="font-body text-[13px] font-medium text-teal-300">{pill}</span>
          </span>

          {/* H1 */}
          <h1 className="font-display text-[40px] font-bold leading-[1.05] tracking-[-0.035em] text-white lg:text-[56px]">
            {title}{" "}
            {titleAccent ? (
              <em className="font-display font-normal text-teal-300">{titleAccent}</em>
            ) : null}
          </h1>

          {/* Subtexto */}
          <p className="mt-6 font-body text-[17px] font-light leading-[1.78] text-white/60 lg:text-[18px]">
            {subtitle}
          </p>

          {/* CTAs */}
          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="inline-flex items-center gap-2 rounded-btn bg-teal-500 px-7 py-[15px] font-body text-[15px] font-medium text-white transition-colors hover:bg-teal-600"
                >
                  {ctaPrimary.label}
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
              )}
              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="inline-flex items-center rounded-btn border border-white/15 bg-transparent px-7 py-[15px] font-body text-[15px] text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}

          {/* Métricas */}
          {metrics && metrics.length > 0 && (
            <dl className="mt-12 grid grid-cols-2 gap-x-10 gap-y-6 border-t border-white/[0.08] pt-8 md:grid-cols-4 md:gap-x-12">
              {metrics.map((m) => (
                <div key={m.label}>
                  <dt className="font-display text-[40px] font-bold leading-none tracking-[-0.035em] text-white">
                    {m.value}
                  </dt>
                  <dd className="mt-2 font-body text-[13px] leading-tight text-white/35">
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
