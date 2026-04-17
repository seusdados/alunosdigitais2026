import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";

export const metadata: Metadata = {
  title: "Conformidade curricular e regulatória | Alunos Digitais",
  description:
    "Entenda como o Alunos Digitais se conecta à BNCC, à BNCC Computação, à PNED e às Diretrizes Operacionais sobre educação digital e midiática.",
  openGraph: { images: ["/brand/ilustracoes/illo-09-conformidade.jpg"] },
};

export default function ConformidadePage() {
  return (
    <>
      <PageHero
        eyebrow="Conformidade curricular"
        title="Como o programa se conecta ao currículo e aos marcos vigentes"
        subtitle="O Alunos Digitais apoia a escola a transformar exigência normativa em prática pedagógica possível, contínua e consistente — sem alarmismo jurídico e sem substituir assessoria especializada."
      />

      <ProseSection
        eyebrow="BNCC"
        title="Base curricular"
        paragraphs={[
          "A BNCC já reconhece a cultura digital como direito de aprendizagem e base para formação integral dos estudantes, especialmente quando trata do uso crítico, significativo, reflexivo e ético das tecnologias.",
        ]}
        bgColor="white"
      />

      <ProseSection
        eyebrow="Resolução CNE/CEB nº 1/2022"
        title="BNCC Computação"
        paragraphs={[
          "As normas de Computação na Educação Básica detalham três eixos que organizam o desenvolvimento dos estudantes: pensamento computacional, mundo digital e cultura digital. Esses eixos ajudam a escola a estruturar a aprendizagem de forma mais clara e progressiva.",
        ]}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Lei nº 14.533/2023"
        title="Política Nacional de Educação Digital (PNED)"
        paragraphs={[
          "A PNED amplia a agenda da educação digital escolar, reforçando a necessidade de integrar competências digitais, midiáticas e informacionais aos currículos e à formação da população brasileira.",
        ]}
        bgColor="white"
      />

      <ProseSection
        eyebrow="Resolução CNE/CEB nº 2/2025"
        title="Diretrizes Operacionais Nacionais"
        paragraphs={[
          "As diretrizes operacionais sobre uso de dispositivos digitais e integração curricular da educação digital e midiática orientam a revisão curricular e a implementação a partir de 2026.",
          "A organização pode ocorrer de forma transversal ou como componente específico, conforme o contexto da rede ou da escola.",
        ]}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Dispositivos e ambiente escolar"
        title="Mediação pedagógica e uso consciente"
        paragraphs={[
          "O contexto recente exige das escolas políticas claras sobre uso de dispositivos, foco pedagógico, saúde mental, convivência e formação crítica no ambiente digital.",
        ]}
        bgColor="white"
      />

      <ProseSection
        eyebrow="Lei nº 15.211/2025 (ECA Digital)"
        title="Proteção da infância no ambiente digital"
        paragraphs={[
          "O ECA Digital reforça a urgência de preparar crianças, adolescentes, famílias, escolas e sociedade para uma cultura de proteção, responsabilidade e cuidado no ambiente digital.",
          "Isso amplia a relevância social da educação digital, ainda que o eixo curricular da escola deva ser comunicado prioritariamente pelos marcos educacionais.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Quer entender como o programa atende os marcos vigentes?",
          subtitle:
            "Fale com um especialista e receba a matriz de aderência curricular e regulatória.",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
        }}
      />
    </>
  );
}
