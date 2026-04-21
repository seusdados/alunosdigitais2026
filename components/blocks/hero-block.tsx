import Image from "next/image";

import { Container } from "@/components/site/container";
import { SiteButton } from "@/components/site/site-button";
import type { HeroBlockData } from "@/types/content";

/**
 * Hero principal da home (e, com pequenas adaptações, de subpáginas).
 *
 * Desktop (≥ lg): texto na metade esquerda, ilustração absoluta ocupando
 *   a metade direita + bleed de 44px pela borda direita. Máscara composta
 *   `mask-hero` dissolve a borda esquerda (encontra o texto sem conflito)
 *   e o topo da imagem (sem borda dura com o navy do hero).
 *
 * Tablet e mobile (< lg): stack vertical — texto em cima, ilustração abaixo
 *   em tamanho natural, sem bleed nem máscara (apenas rounded card leve).
 *
 * Essa divisão evita que a ilustração cruze o texto em breakpoints md onde
 * o espaço horizontal é apertado — conforme spec em componentes.md.
 */
export function HeroBlock({ data }: { data: HeroBlockData }) {
  const { pill, title, titleAccent, subtitle, ctaPrimary, ctaSecondary, metrics, image } = data;

  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Desktop (≥ lg): ilustração absoluta ocupando a metade direita,
          sangrando 44px pela borda direita da viewport.
          A mask-hero dissolve o lado esquerdo (nunca cruza o texto) e o topo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 top-0 hidden lg:block"
        style={{ left: "48%", right: "-44px" }}
      >
        <div className="relative h-full w-full">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="mask-hero object-cover object-bottom opacity-[0.92]"
            style={{ maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat" }}
          />
        </div>
      </div>

      <Container className="relative z-10 grid gap-10 py-14 lg:min-h-[580px] lg:grid-cols-2 lg:gap-0 lg:py-16">
        <div className="flex max-w-[520px] flex-col justify-center space-y-6">
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

        {/* Tablet e mobile (< lg): ilustração inline, sangrando pelas bordas
            com fade — sem retângulo rígido enquadrando a imagem. */}
        <div className="-mx-6 overflow-hidden md:-mx-11 lg:hidden">
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
      </Container>
    </section>
  );
}
