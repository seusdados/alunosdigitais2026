import { BleedImage } from "@/components/site/bleed-image";
import { YearCard } from "@/components/blocks/year-card";
import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { CurriculumYear } from "@/types/content";

/**
 * CurriculumSection — dois segmentos (F1 e F2) com cards + ilustração vertical
 * à esquerda no desktop. No mobile: ilustração topo (enquadrada) + stacks.
 */
export function CurriculumSectionBlock({
  eyebrow,
  title,
  subtitle,
  years,
  image,
  bgColor = "sand",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  years: CurriculumYear[];
  image: { src: string; alt: string };
  bgColor?: "white" | "sand";
}) {
  const f1 = years.filter((y) => y.stage === "fundamental-1");
  const f2 = years.filter((y) => y.stage === "fundamental-2");

  return (
    <section className={cn("overflow-hidden", bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="py-16 md:py-[80px]">
        <div className="mb-10 max-w-[720px] space-y-3 md:mb-12">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
        </div>

        <div className="grid gap-10 md:grid-cols-[380px_1fr] md:gap-8">
          <div className="self-stretch">
            <BleedImage src={image.src} alt={image.alt} direction="curriculum" aspect="3/4" />
          </div>

          <div className="space-y-10 md:pl-2">
            <div>
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.02em] text-site-text-mid">
                Fundamental I · 1º ao 5º ano
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3">
                {f1.map((y) => (
                  <li key={y.slug}>
                    <YearCard year={y} />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-[13px] font-semibold uppercase tracking-[0.02em] text-site-text-mid">
                Fundamental II · 6º ao 9º ano
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-2.5 md:grid-cols-3">
                {f2.map((y) => (
                  <li key={y.slug}>
                    <YearCard year={y} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
