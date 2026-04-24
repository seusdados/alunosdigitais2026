import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
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
        subtitle="Educar para o mundo digital é educar para a vida, para a convivência e para a cidadania. O Alunos Digitais é a resposta pedagógica contínua que escolas e famílias precisavam — desenhada por quem entende de educação, direito digital e produto."
      />

      <ProseSection
        eyebrow="Origem"
        title="Por que o programa nasceu"
        paragraphs={[
          "O Alunos Digitais nasce da leitura de um cenário em que crianças e adolescentes vivem conectados, enquanto escolas, professores e famílias precisam de ferramentas pedagógicas consistentes para atuar.",
          "A resposta pedagógica a esse cenário não cabe em palestras pontuais nem em projetos esparsos. Exige continuidade, progressão e arquitetura — exatamente o que o programa entrega ao longo de toda a jornada do Ensino Fundamental.",
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

      <BulletsSection
        eyebrow="O que faz parte do nosso DNA"
        title="Princípios que orientam o programa"
        description="Decisões de produto, currículo, formação e ferramentas se ancoram nestes princípios. Eles guiam o que entra, o que fica de fora e como cada peça é construída."
        bgColor="white"
        columns={2}
        bullets={[
          {
            title: "Continuidade pedagógica",
            description:
              "Educação digital não acontece em palestra única. Acontece em arco curricular contínuo, com progressão calibrada por faixa etária e revisitação dos temas em níveis crescentes de complexidade.",
          },
          {
            title: "Rigor regulatório embutido",
            description:
              "Aderência à BNCC, PNED, CNE/CEB 1/2022, CNE/CEB 2/2025 e ECA Digital não é declaração: é arquitetura. Cada aula tem competência mapeada e cada material está auditável.",
          },
          {
            title: "Professor protagonista",
            description:
              "O programa não substitui o professor — empodera. Materiais estruturados, formação continuada e help desk pedagógico devolvem ao docente tempo e segurança técnica.",
          },
          {
            title: "Família como parte da estratégia",
            description:
              "Cidadania digital se constrói também em casa. Conteúdos, lives e materiais para responsáveis fazem parte do programa desde o desenho — sem terceirizar o pedagógico.",
          },
          {
            title: "Tecnologia a serviço da aprendizagem",
            description:
              "Plataforma, gamificação e recursos digitais existem para apoiar a aprendizagem — nunca para substituir mediação humana ou para criar dependência tecnológica.",
          },
          {
            title: "Compromisso com proteção de dados",
            description:
              "LGPD e proteção da infância online não são checklist: são pré-requisito. Toda decisão de produto passa por revisão jurídica especializada antes de chegar à sala de aula.",
          },
        ]}
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Como trabalhamos",
          title: "Educação digital construída em ciclos",
          paragraphs: [
            "Cada ano letivo traz revisão de conteúdo, atualização regulatória, escuta dos professores em campo e aprimoramento dos materiais. O programa é vivo.",
            "A evolução do cenário digital não para — e o currículo precisa acompanhar. Por isso, o programa é desenhado para iteração contínua, não para virar produto estático na prateleira.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-10-sobre.jpg",
            alt: "Ciclo de evolução do programa Alunos Digitais",
          },
          direction: "left",
          bgColor: "white",
        }}
      />

      <ProseSection
        eyebrow="O que nos move"
        title="Formar cidadãos digitais conscientes é formar para a vida"
        paragraphs={[
          "Não queremos vender conteúdo. Queremos contribuir para uma geração mais preparada para habitar o digital com ética, senso crítico, empatia e responsabilidade.",
          "A diferença está entre reagir a cada crise ou construir uma resposta pedagógica contínua, lúcida e transformadora.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Quer conhecer a fundo a proposta e a equipe?",
          subtitle:
            "Apresentamos o programa, a equipe responsável e o roadmap de evolução em uma conversa direta com a sua escola ou rede.",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
