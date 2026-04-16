import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Formação docente em educação digital | Alunos Digitais",
  description:
    "Formação inicial e contínua, planos de aula, e-book do professor, plataforma e help desk pedagógico para apoiar a implementação do programa.",
  openGraph: { images: ["/brand/ilustracoes/illo-04-formacao.jpg"] },
};

export default function FormacaoDocentePage() {
  return (
    <>
      <PageHero
        eyebrow="Formação docente"
        title="Professor protagonista, não mero aplicador de conteúdo"
        subtitle="Para que a educação digital faça sentido no currículo, o professor precisa de repertório, segurança pedagógica, material consistente e suporte. Por isso, a formação docente é parte estrutural do Alunos Digitais."
      />

      <SplitBleedBlock
        data={{
          eyebrow: "O lugar do professor",
          title: "O professor como mediador pedagógico",
          paragraphs: [
            "O programa transforma o professor em protagonista da implementação. Ele recebe material completo, formação estruturada e suporte contínuo para conduzir discussões sensíveis com segurança técnica e pedagógica.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-04-formacao.jpg",
            alt: "Professora conduzindo aula sobre cidadania digital",
          },
          direction: "right",
          bgColor: "white",
        }}
      />

      <BulletsSection
        eyebrow="Pacote de formação"
        title="O que o professor recebe"
        bullets={[
          "Formação inicial no começo do ano (workshops presenciais ou online)",
          "Formação contínua via plataforma e conteúdos formativos",
          "Plano de aula e caderno do professor estruturados",
          "E-book do professor com aprofundamento teórico",
          "Conexão curricular explícita com BNCC e cultura digital",
          "Help desk pedagógico para dúvidas e orientação",
        ]}
        columns={2}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Fechamento"
        title="O professor não é deixado sozinho"
        paragraphs={[
          "Ele é preparado para conduzir um processo pedagógico contínuo em um campo que exige atualização, criticidade e mediação qualificada.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Conheça a formação que seu time vai receber",
          primary: { label: "Solicitar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
