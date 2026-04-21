import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SiteButton } from "@/components/site/site-button";
import type { CTABarData } from "@/types/content";

/**
 * CTABar — faixa navy com título + 2 CTAs. Aparece em várias páginas
 * (depois dos blocos de conteúdo, antes do fecho / formulário).
 */
export function CTABarBlock({ data }: { data: CTABarData }) {
  const { eyebrow, title, subtitle, primary, secondary } = data;

  return (
    <section className="bg-navy-700">
      <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-10 md:py-[52px]">
        <div className="max-w-[540px] space-y-3">
          {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
          <h3 className="font-display text-[24px] font-bold leading-tight tracking-tighter text-white md:text-[28px]">
            {title}
          </h3>
          {subtitle ? (
            <p className="font-body text-[14px] font-light leading-[1.7] text-white/45">
              {subtitle}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col items-stretch gap-3 md:items-end">
          <SiteButton href={primary.href} variant="white" className="h-[46px] px-7">
            {primary.label}
          </SiteButton>
          {secondary ? (
            <SiteButton href={secondary.href} variant="outline-white" className="h-[46px] px-7">
              {secondary.label}
            </SiteButton>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
