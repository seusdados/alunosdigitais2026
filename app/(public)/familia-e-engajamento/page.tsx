import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Engajamento familiar e cidadania digital | Alunos Digitais",
  description:
    "O Alunos Digitais inclui pais e responsáveis na formação em cidadania digital, com conteúdos, orientações, ações e participação ao longo do ano.",
  openGraph: { images: ["/brand/ilustracoes/illo-05-familia.jpg"] },
};

export default function FamiliaEngajamentoPage() {
  return (
    <>
      <PageHero
        eyebrow="Família e engajamento"
        title="Cidadania digital se constrói na escola e em casa"
        subtitle="A cultura digital das crianças e dos adolescentes não se forma apenas no ambiente escolar. Ela atravessa a rotina familiar, o uso de telas, jogos, aplicativos e interações cotidianas."
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Corresponsabilidade",
          title: "Por que a família entra na estratégia",
          paragraphs: [
            "Ao longo do ano, os estudantes levam temas, práticas e reflexões para casa. A proposta não é transferir responsabilidade para a família, mas promover corresponsabilidade formativa.",
            "Quando escola e família compartilham linguagem, cuidado e intencionalidade, a transformação cultural ganha profundidade e continuidade.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-05-familia.jpg",
            alt: "Família conversando em casa sobre uso consciente da tecnologia",
          },
          direction: "right",
          bgColor: "white",
        }}
      />

      <BulletsSection
        eyebrow="Entregas para pais e responsáveis"
        title="O que as famílias recebem"
        bullets={[
          "Conteúdos na plataforma",
          "Lives e webinários educativos",
          "Orientações sobre riscos e prevenção",
          "Materiais de apoio",
          "Atividades que estimulam conversa e acompanhamento",
          "Participação em ações de culminância",
        ]}
        columns={2}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Gamificação e participação"
        title="Aprendizagem lúdica que envolve toda a família"
        paragraphs={[
          "O jogo Guardião da Cidadania e Privacidade e as ações de culminância favorecem apropriação lúdica, conversa intergeracional e participação de pais e responsáveis.",
          "Uma escola pode ensinar muito. Mas quando escola e família compartilham linguagem, cuidado e intencionalidade, a formação ganha outra dimensão.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Conheça as ações de engajamento familiar do programa",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
