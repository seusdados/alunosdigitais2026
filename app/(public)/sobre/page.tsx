import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Sobre o Alunos Digitais | Origem, proposta e equipe",
  description:
    "Conheça a origem do Alunos Digitais, sua proposta pedagógica e a base multidisciplinar que sustenta o programa.",
  openGraph: { images: ["/brand/ilustracoes/illo-10-sobre.jpg"] },
};

export default function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre"
        title="A origem de uma proposta para formar cultura digital com responsabilidade"
        subtitle="Educar para o mundo digital é educar para a vida, para a convivência e para a cidadania."
      />

      <ProseSection
        eyebrow="Origem"
        title="Por que o programa nasceu"
        paragraphs={[
          "O Alunos Digitais nasce da leitura de um cenário em que crianças e adolescentes vivem conectados, enquanto escolas, professores e famílias precisam de ferramentas pedagógicas consistentes para atuar.",
          "A resposta pedagógica a esse cenário não cabe em palestras pontuais nem em projetos esparsos. Exige continuidade, progressão e arquitetura.",
        ]}
        bgColor="white"
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Quem desenvolve",
          title: "Uma equipe multidisciplinar",
          paragraphs: [
            "Educadores, juristas especialistas em proteção de dados, designers instrucionais, desenvolvedores e articuladores institucionais trabalhando em conjunto.",
            "A interseção entre educação, cidadania digital, proteção de dados, ética, segurança da informação, pedagogia e desenvolvimento humano sustenta a proposta.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-10-sobre.jpg",
            alt: "Equipe multidisciplinar do programa Alunos Digitais",
          },
          direction: "right",
          bgColor: "sand",
        }}
      />

      <ProseSection
        eyebrow="O que nos move"
        title="Formar cidadãos digitais conscientes é formar para a vida"
        paragraphs={[
          "Não queremos vender conteúdo. Queremos contribuir para uma geração mais preparada para habitar o digital com ética, senso crítico, empatia e responsabilidade.",
          "A diferença está entre reagir a cada crise ou construir uma resposta pedagógica contínua, lúcida e transformadora.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Quer conhecer a fundo a proposta e a equipe?",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
