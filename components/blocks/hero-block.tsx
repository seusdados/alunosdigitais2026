import Image from "next/image";

import { SiteButton } from "@/components/site/site-button";
import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal — navy full-bleed com ilustração absolute à direita.
 *
 * Desktop (≥ lg): texto em coluna estreita (max-w-[520px]), ilustração
 * ocupando ~55% da largura ancorada no bottom-right, com máscara composta
 * que dissolve o encontro com o texto e o topo. Altura mínima 560px.
 *
 * Mobile (< lg): ilustração inline abaixo do texto, full-width com
 * mask-fade-edges — sem retângulo rígido.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="relative overflow-hidden bg-navy-800 px-8 text-white lg:flex lg:min-h-[560px] lg:items-center lg:px-12">
      {/* Desktop (≥ lg): ilustração absolute, ancorada em bottom-right */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 top-0 z-[1] hidden w-[58%] opacity-[0.88] lg:block lg:w-[55%]"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 80%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 18%, black 80%, transparent 100%), linear-gradient(to top, black 65%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-bottom"
          />
        </div>
      </div>

      <div className="relative z-10 max-w-[520px] space-y-6 py-12 lg:py-14">
        <span className="inline-flex w-fit items-center gap-[7px] rounded-pill border border-teal-500/[0.28] bg-teal-500/[0.08] py-[5px] pl-2 pr-3.5">
          <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-teal-300" />
          <span className="font-body text-[11.5px] font-medium text-teal-300">{pill}</span>
        </span>

        <h1 className="font-display text-[32px] font-bold leading-[1.08] tracking-tightest text-white md:text-[42px] lg:text-[46px]">
          {title}{" "}
          {titleAccent ? (
            <em className="font-display text-teal-300 [font-style:italic] [font-weight:400]">
              {titleAccent}
            </em>
          ) : null}
        </h1>

        <p className="font-body text-[15.5px] font-light leading-[1.72] text-white/60">
          {subtitle}
        </p>

        {(ctaPrimary || ctaSecondary) && (
          <div className="flex flex-wrap gap-3 pt-1">
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
          <dl className="mt-4 grid grid-cols-2 gap-6 border-t border-white/5 pt-6 md:grid-cols-4 md:gap-4">
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

      {/* Mobile (< lg): ilustração inline, sangrando pelas bordas */}
      <div className="-mx-8 overflow-hidden lg:hidden">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={800}
          priority
          sizes="100vw"
          className="mask-fade-edges h-auto w-full object-cover"
        />
      </div>
    </section>
  );
}
