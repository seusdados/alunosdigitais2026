import Image from "next/image";

import { Container } from "@/components/site/container";
import { SiteButton } from "@/components/site/site-button";
import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal da home (e, com pequenas adaptações, de subpáginas).
 *
 * Desktop: texto à esquerda + ilustração absoluta à direita (sangra).
 * Mobile:  texto empilhado + ilustração abaixo, sem bleed, sem mask.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Desktop: ilustração absoluta, sangra pela direita.
          Mobile: renderizada abaixo do texto (ver bloco mobile). */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="60vw"
            className="mask-hero object-cover object-right opacity-[0.92] [object-position:right_bottom]"
            style={{ maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
          />
        </div>
      </div>

      <Container className="relative z-10 grid gap-10 py-14 md:min-h-[580px] md:grid-cols-2 md:gap-0 md:py-16">
        <div className="flex max-w-[520px] flex-col justify-center space-y-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-pill border border-teal-400/30 bg-teal-500/[0.08] px-3 py-1.5">
            <span aria-hidden className="h-[7px] w-[7px] rounded-full bg-teal-300" />
            <span className="font-body text-[11.5px] font-medium text-teal-300">{pill}</span>
          </span>

          <h1 className="font-display text-[32px] font-bold leading-[1.08] tracking-tightest text-white md:text-[46px]">
            {title}{" "}
            {titleAccent ? (
              <em className="font-display text-teal-300 [font-style:italic] [font-weight:400]">
                {titleAccent}
              </em>
            ) : null}
          </h1>

          <p className="max-w-[440px] font-body text-[15.5px] font-light leading-[1.72] text-white/60">
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

        {/* Mobile: renderiza inline a ilustração (sem bleed, sem mask) */}
        <div className="md:hidden">
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            priority
            sizes="100vw"
            className="h-auto w-full rounded-card object-cover"
          />
        </div>
      </Container>
    </section>
  );
}
