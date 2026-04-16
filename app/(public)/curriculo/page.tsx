import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { CurriculumSectionBlock } from "@/components/blocks/curriculum-section-block";
import { PageHero } from "@/components/blocks/page-hero";
import { curriculumYears } from "@/data/curriculo";

export const metadata: Metadata = {
  title: "Currículo de educação digital do 1º ao 9º ano | Alunos Digitais",
  description:
    "Conheça a organização curricular do Alunos Digitais para o 1º ao 9º ano, com progressão pedagógica, fases anuais e temas por etapa.",
  openGraph: {
    images: ["/brand/ilustracoes/illo-06-progressao.jpg"],
  },
};

export default function CurriculoHubPage() {
  return (
    <>
      <PageHero
        eyebrow="Currículo"
        title="Currículo estruturado do 1º ao 9º ano"
        subtitle="A educação digital e a cidadania digital organizadas em progressão pedagógica ao longo de todo o Ensino Fundamental — adequação por faixa etária e conexão entre vida escolar, ambiente digital e projeto de vida."
      />

      <BulletsSection
        eyebrow="Organização do currículo"
        title="Como o currículo se organiza"
        bullets={[
          "1º ao 9º ano",
          "36 aulas anuais por ano",
          "6 fases pedagógicas por ano",
          "Metodologia dedutiva e indutiva",
          "Situações-problema, dinâmicas e casos reais",
          "Recursos gamificados",
        ]}
        columns={3}
        bgColor="white"
      />

      <CurriculumSectionBlock
        eyebrow="Panorama"
        title="Do 1º ao 9º ano, com progressão pedagógica real"
        subtitle="Nos anos iniciais, a criança constrói identidade, convivência, empatia e navegação segura. Nos anos finais, o estudante aprofunda pensamento crítico, segurança digital avançada, IA e protagonismo."
        years={curriculumYears}
        image={{
          src: "/brand/ilustracoes/illo-06-progressao.jpg",
          alt: "Jornada vertical do 1º ao 9º ano",
        }}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Receba o currículo completo por e-mail",
          subtitle:
            "Enviamos a grade detalhada com fases pedagógicas, materiais e conexões com a BNCC.",
          primary: { label: "Solicitar currículo completo", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver como funciona", href: "/como-funciona" },
        }}
      />
    </>
  );
}
