import Image from "next/image";

import { YearCard } from "@/components/blocks/year-card";
import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { CurriculumYear } from "@/types/content";

/**
 * CurriculumSection — F1 e F2 com cards + ilustração vertical à esquerda.
 *
 * Desktop (≥ md): grid em duas colunas. A coluna da ilustração sangra até
 * a borda esquerda da viewport (sem container) — em harmonia com os outros
 * blocos. A coluna dos cards mantém o padding do Container à direita,
 * preservando alinhamento com o resto do site.
 *
 * Mobile (< md): stack vertical — header + ilustração enquadrada + listas.
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
      <Container className="pt-16 md:pt-[80px]">
        <div className="mb-10 max-w-[720px] space-y-3 md:mb-12">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
        </div>
      </Container>

      <div className="grid grid-cols-1 pb-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-10 md:pb-[80px]">
        {/* Ilustração vertical — sangra até a borda esquerda */}
        <div className="pad-container-l pad-container-r md:px-0">
          <div className="overflow-hidden rounded-card md:rounded-none">
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={1800}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="md:mask-curriculum h-auto w-full"
            />
          </div>
        </div>

        {/* Cards F1 + F2 */}
        <div className="pad-container-l pad-container-r mt-10 space-y-10 md:mt-0 md:pl-0">
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
    </section>
  );
}
