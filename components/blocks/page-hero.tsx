import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";

/**
 * Hero compacto para páginas internas. Fundo navy-700, sem ilustração
 * absoluta — só eyebrow + H1 + subtítulo. Ilustrações específicas da
 * página vêm em SplitBleedBlocks abaixo.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-navy-800 text-white">
      <Container className="max-w-[820px] space-y-5 py-16 md:py-[96px]">
        {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
        <h1 className="font-display text-[32px] font-bold leading-[1.1] tracking-tightest md:text-[44px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-[680px] font-body text-[16px] font-light leading-[1.7] text-white/60">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
