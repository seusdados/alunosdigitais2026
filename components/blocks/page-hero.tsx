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
      <Container className="space-y-6 py-20 lg:py-24">
        {eyebrow ? <SectionEyebrow className="text-teal-300">{eyebrow}</SectionEyebrow> : null}
        <h1 className="max-w-4xl font-display text-[48px] font-bold leading-[1.05] tracking-[-0.035em] lg:text-[68px]">
          {title}
        </h1>
        {subtitle ? (
          <p className="max-w-3xl font-body text-[20px] font-light leading-[1.72] text-white/60 lg:text-[22px]">
            {subtitle}
          </p>
        ) : null}
      </Container>
    </section>
  );
}
