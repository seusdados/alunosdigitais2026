import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";

export const metadata: Metadata = {
  title: "Educação digital para redes e secretarias de ensino | Alunos Digitais",
  description:
    "Solução estruturada para redes e secretarias que buscam implementar educação digital e midiática com escala, formação e acompanhamento.",
};

export default function ParaRedesPage() {
  return (
    <>
      <PageHero
        eyebrow="Para redes e secretarias"
        title="Para redes e secretarias que precisam implementar com escala e consistência"
        subtitle="A implementação da educação digital em rede exige mais do que conteúdo. Exige coerência curricular, formação docente, governança pedagógica, instrumentos de apoio e leitura de indicadores."
      />

      <ProseSection
        eyebrow="Desafio de escala"
        title="Por que redes precisam de uma solução estruturada"
        paragraphs={[
          "Múltiplas unidades, realidades diferentes, equipes docentes heterogêneas. Sem uma arquitetura comum, a implementação da educação digital fica fragmentada.",
          "A rede precisa de um modelo escalável que preserve consistência pedagógica e permita adaptação local.",
        ]}
        bgColor="white"
      />

      <BulletsSection
        eyebrow="Oferta institucional"
        title="O que o programa oferece para redes"
        bullets={[
          "Estrutura curricular do 1º ao 9º ano",
          "Formação e atualização de profissionais",
          "Materiais organizados por etapa",
          "Plataforma para continuidade",
          "Apoio à comunicação com famílias",
          "Elementos diagnósticos e indicadores",
          "Possibilidade de adoção em múltiplas unidades",
        ]}
        columns={2}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Valor institucional"
        title="O que a rede ganha"
        paragraphs={[
          "Uma solução com potencial de padronização, escalabilidade, apoio à implementação e alinhamento com a agenda contemporânea da educação digital.",
          "Governança pedagógica, indicadores agregados e comunicação coerente com famílias e gestão pública.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Solicitar reunião institucional",
          subtitle: "Nossa equipe apresenta o modelo de adoção para redes e secretarias.",
          primary: { label: "Solicitar reunião", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver conformidade e marcos", href: "/conformidade-e-curriculo" },
        }}
      />
    </>
  );
}
