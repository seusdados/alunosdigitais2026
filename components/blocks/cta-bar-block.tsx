import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SiteButton } from "@/components/site/site-button";
import type { CTABarData } from "@/types/content";

/**
 * CTABar — faixa navy compacta com título + 2 CTAs empilhados à direita
 * no desktop, stretch no mobile.
 */
export function CTABarBlock({ data }: { data: CTABarData }) {
  const { eyebrow, title, subtitle, primary, secondary } = data;

  return (
    <section className="flex flex-col items-stretch justify-between gap-10 bg-navy-700 px-8 py-20 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-24">
      <div className="max-w-3xl space-y-4">
        {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
        <h3 className="font-display text-[36px] font-bold leading-[1.08] tracking-[-0.035em] text-white lg:text-[48px]">
          {title}
        </h3>
        {subtitle ? (
          <p className="font-body text-[18px] font-light leading-[1.7] text-white/55 lg:text-[20px]">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-stretch gap-3 lg:items-end">
        <SiteButton href={primary.href} variant="white" className="h-[52px] px-8 py-4 text-[17px]">
          {primary.label}
        </SiteButton>
        {secondary ? (
          <SiteButton
            href={secondary.href}
            variant="outline-white"
            className="h-[52px] px-8 py-4 text-[16px]"
          >
            {secondary.label}
          </SiteButton>
        ) : null}
      </div>
    </section>
  );
}
