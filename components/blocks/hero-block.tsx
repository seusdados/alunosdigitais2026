import Image from "next/image";

import { SiteButton } from "@/components/site/site-button";
import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal — layout 2 colunas sobre navy-800.
 *
 * Desktop (≥ lg): grid de 2 cols, items-center, min-h-[560px]. Texto
 * numa coluna, ilustração na outra — **nunca se sobrepõem**. Ilustração
 * usa `fill` + `object-cover` pra preencher toda a coluna, com mask-image
 * fade 15/85% nas laterais pra dissolver no navy do fundo.
 *
 * Mobile (< lg): grid-cols-1. Texto em cima, ilustração embaixo.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="overflow-hidden bg-navy-800 text-white">
      <div className="grid grid-cols-1 items-center lg:min-h-[560px] lg:grid-cols-2">
        {/* Texto */}
        <div className="px-8 py-14 lg:px-12 lg:pr-8">
          <span className="mb-6 inline-flex items-center gap-[7px] rounded-pill border border-teal-500/[0.28] bg-teal-500/[0.08] py-[5px] pl-2 pr-3.5">
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-teal-300" />
            <span className="font-body text-[11.5px] font-medium text-teal-300">{pill}</span>
          </span>

          <h1 className="font-display text-[36px] font-bold leading-[1.04] tracking-tightest text-white lg:text-[46px]">
            {title}{" "}
            {titleAccent ? (
              <em className="font-display text-teal-300 [font-style:italic] [font-weight:400]">
                {titleAccent}
              </em>
            ) : null}
          </h1>

          <p className="mt-5 max-w-[440px] font-body text-[15px] font-light leading-[1.72] text-white/55 lg:text-[16px]">
            {subtitle}
          </p>

          {(ctaPrimary || ctaSecondary) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {ctaPrimary && (
                <SiteButton href={ctaPrimary.href} variant="primary">
                  {ctaPrimary.label}
                </SiteButton>
              )}
              {ctaSecondary && (
                <SiteButton href={ctaSecondary.href} variant="secondary">
                  {ctaSecondary.label}
                </SiteButton>
              )}
            </div>
          )}

          {metrics && metrics.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.07] pt-7 md:grid-cols-4 md:gap-4">
              {metrics.map((m) => (
                <div key={m.label} className="flex flex-col gap-1">
                  <dt className="font-display text-[26px] font-bold tracking-tightest text-white md:text-[32px]">
                    {m.value}
                  </dt>
                  <dd className="font-body text-[11px] leading-tight text-white/30">{m.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Ilustração */}
        <div className="relative h-full min-h-[360px] lg:min-h-[560px]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
