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
    <section className="flex flex-col items-stretch justify-between gap-8 bg-navy-700 px-8 py-[60px] lg:flex-row lg:items-center lg:gap-10 lg:px-12">
      <div className="max-w-2xl space-y-3">
        {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
        <h3 className="font-display text-[26px] font-bold leading-[1.1] tracking-tighter text-white md:text-[32px]">
          {title}
        </h3>
        {subtitle ? (
          <p className="font-body text-[15px] font-light leading-[1.65] text-white/50">
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="flex flex-col items-stretch gap-3 lg:items-end">
        <SiteButton
          href={primary.href}
          variant="white"
          className="h-[48px] px-[30px] py-[14px] text-[15px]"
        >
          {primary.label}
        </SiteButton>
        {secondary ? (
          <SiteButton
            href={secondary.href}
            variant="outline-white"
            className="h-[48px] px-[30px] py-[14px] text-[14px]"
          >
            {secondary.label}
          </SiteButton>
        ) : null}
      </div>
    </section>
  );
}
