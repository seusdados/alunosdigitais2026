import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { FlowStepsBlock } from "@/components/blocks/flow-steps-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { curriculumSlugs, getYearBySlug } from "@/data/curriculo";

export function generateStaticParams() {
  return curriculumSlugs.map((ano) => ({ ano }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ ano: string }>;
}): Promise<Metadata> {
  const { ano } = await params;
  const year = getYearBySlug(ano);
  if (!year) return { title: "Página não encontrada" };

  const ordinal = `${year.year}º ano`;
  return {
    title: `Currículo do ${ordinal} | Educação digital no Ensino Fundamental`,
    description: year.heroText,
  };
}

export default async function YearPage({ params }: { params: Promise<{ ano: string }> }) {
  const { ano } = await params;
  const year = getYearBySlug(ano);
  if (!year) notFound();

  const stageLabel =
    year.stage === "fundamental-1"
      ? "Fundamental I · Anos iniciais"
      : "Fundamental II · Anos finais";

  return (
    <>
      <PageHero
        eyebrow={stageLabel}
        title={`Currículo do ${year.year}º ano`}
        subtitle={year.heroText}
      />

      <FlowStepsBlock
        data={{
          eyebrow: "Fases pedagógicas",
          title: "As 6 perguntas-chave do ano",
          subtitle:
            "O ano escolar é estruturado em 6 fases, cada uma guiada por uma pergunta-chave que orienta aulas, atividades e discussões.",
          bgColor: "white",
          steps: year.phases.slice(0, 4),
        }}
      />

      <FlowStepsBlock
        data={{
          title: "Continuação das fases",
          bgColor: "sand",
          steps: year.phases.slice(4),
        }}
      />

      <BulletsSection
        eyebrow="Desenvolvimento"
        title="O que o estudante desenvolve"
        bullets={year.developmentItems}
        columns={2}
        bgColor="white"
      />

      {year.pedagogicalDescription ? (
        <ProseSection
          eyebrow="Abordagem pedagógica"
          title="Como isso aparece na prática"
          paragraphs={[year.pedagogicalDescription]}
          bgColor="sand"
        />
      ) : null}

      <CTABarBlock
        data={{
          title: "Quer conversar com um especialista sobre este ano escolar?",
          subtitle: "Detalhamos a sequência didática e os materiais aplicados na sua escola.",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
          secondary: { label: "Voltar ao currículo", href: "/curriculo" },
        }}
      />
    </>
  );
}
