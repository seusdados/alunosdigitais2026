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
    <section className="flex flex-col items-stretch justify-between gap-6 bg-navy-700 px-8 py-12 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
        <h3 className="font-display text-[24px] font-bold leading-tight tracking-tighter text-white md:text-[28px]">
          {title}
        </h3>
        {subtitle ? (
          <p className="font-body text-[14px] font-light leading-[1.7] text-white/45">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex flex-col items-stretch gap-3 lg:items-end">
        <SiteButton href={primary.href} variant="white" className="h-[46px] px-7">
          {primary.label}
        </SiteButton>
        {secondary ? (
          <SiteButton href={secondary.href} variant="outline-white" className="h-[46px] px-7">
            {secondary.label}
          </SiteButton>
        ) : null}
      </div>
    </section>
  );
}
