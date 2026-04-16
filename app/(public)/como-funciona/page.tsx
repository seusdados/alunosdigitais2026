import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { FlowStepsBlock } from "@/components/blocks/flow-steps-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";

export const metadata: Metadata = {
  title: "Como funciona o Alunos Digitais | Implementação do programa",
  description:
    "Veja como o Alunos Digitais é implementado na prática: formação inicial, material, aulas, plataforma, suporte pedagógico, família e acompanhamento.",
};

export default function ComoFuncionaPage() {
  return (
    <>
      <PageHero
        eyebrow="Como funciona"
        title="Como o Alunos Digitais funciona na prática"
        subtitle="Do primeiro alinhamento ao diagnóstico do ano, cada etapa foi pensada para que a escola implemente a educação digital como prática pedagógica — não apenas como discurso institucional."
      />

      <FlowStepsBlock
        data={{
          title: "Oito etapas de implementação",
          subtitle: "Percurso anual da parceria com escolas e redes.",
          bgColor: "white",
          steps: [
            {
              number: "01",
              title: "Preparação da escola",
              description:
                "Reunião de alinhamento, definição do modelo de implementação, planejamento pedagógico e cronograma anual.",
            },
            {
              number: "02",
              title: "Formação inicial",
              description:
                "Workshops presenciais e/ou online para apresentação da proposta e preparação da equipe docente.",
            },
            {
              number: "03",
              title: "Entrega dos recursos",
              description:
                "Livros do professor e do aluno, plataforma digital, materiais complementares, vídeos e gamificação.",
            },
            {
              number: "04",
              title: "Aplicação em sala",
              description:
                "Desenvolvimento das aulas ao longo do ano com base na sequência anual e nas fases pedagógicas.",
            },
          ],
        }}
      />

      <FlowStepsBlock
        data={{
          title: "Continuidade durante todo o ano",
          subtitle: "Suporte e formação contínuos são parte estrutural do programa.",
          bgColor: "sand",
          steps: [
            {
              number: "05",
              title: "Formação contínua",
              description:
                "Professores recebem atualização, apoio e aprofundamento pela plataforma e ações formativas permanentes.",
            },
            {
              number: "06",
              title: "Help desk pedagógico",
              description:
                "Consultoria para dúvidas pedagógicas e operacionais, favorecendo implementação consistente.",
            },
            {
              number: "07",
              title: "Engajamento familiar",
              description:
                "Pais e responsáveis recebem conteúdos, orientações e oportunidades de participação ao longo do ano.",
            },
            {
              number: "08",
              title: "Diagnóstico e indicadores",
              description:
                "Acompanhamento do desenvolvimento do estudante e geração de indicadores para gestão e famílias.",
            },
          ],
        }}
      />

      <ProseSection
        eyebrow="Fechamento"
        title="Um programa anual, não uma ação pontual"
        paragraphs={[
          "Cada etapa foi pensada para garantir que a escola consiga implementar a educação digital como prática pedagógica, e não apenas como discurso institucional.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Quer ver a implementação na sua escola ou rede?",
          subtitle: "Nossa equipe apresenta o modelo em até 60 minutos.",
          primary: { label: "Agendar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Conhecer o currículo", href: "/curriculo" },
        }}
      />
    </>
  );
}
