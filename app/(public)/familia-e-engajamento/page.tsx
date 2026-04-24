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
        subtitle="A cultura digital das crianças e dos adolescentes não se forma apenas no ambiente escolar. Ela atravessa a rotina familiar, o uso de telas, jogos, aplicativos, redes e interações cotidianas — e o programa incorpora a família como parte ativa da estratégia."
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Corresponsabilidade formativa",
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
        title="O que as famílias recebem ao longo do ano"
        description="Mais do que comunicação institucional, o programa entrega conteúdo formativo e ferramentas práticas para que pais e responsáveis acompanhem e participem da jornada."
        bgColor="sand"
        columns={2}
        bullets={[
          {
            title: "Conteúdos na plataforma",
            description:
              "Acesso permanente a vídeos, infográficos e textos curtos sobre os temas trabalhados em sala — explicados em linguagem acessível para o público familiar.",
          },
          {
            title: "Lives e webinários educativos",
            description:
              "Encontros ao longo do ano com especialistas em educação digital, segurança online e parentalidade conectada. Tira-dúvidas em tempo real.",
          },
          {
            title: "Orientações sobre riscos e prevenção",
            description:
              "Guias práticos sobre exposição infantil, cyberbullying, privacidade, tempo de tela e configurações de segurança em apps e dispositivos.",
          },
          {
            title: "Materiais de apoio",
            description:
              "Cartilhas, checklists e roteiros de conversa para situações concretas: comunicação em redes, jogos online, mediação parental, primeiro celular.",
          },
          {
            title: "Atividades que estimulam conversa",
            description:
              "Propostas levadas pela criança para casa que abrem espaço para diálogo intergeracional sobre o que se vive no mundo digital — sem clima de cobrança.",
          },
          {
            title: "Participação em culminâncias",
            description:
              "Ações de fechamento de etapa abertas para a família, em que o estudante apresenta o que construiu e a comunidade escolar reforça o vínculo educativo.",
          },
        ]}
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Gamificação e participação",
          title: "Aprendizagem lúdica que envolve toda a família",
          paragraphs: [
            "O jogo Guardião da Cidadania e Privacidade e as ações de culminância favorecem apropriação lúdica, conversa intergeracional e participação de pais e responsáveis.",
            "A criança ensina, o adulto aprende, a família combina regras juntas. A gamificação vira ponte de diálogo, não substituto dele.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-05-familia.jpg",
            alt: "Família jogando e conversando sobre cidadania digital",
          },
          direction: "left",
          bgColor: "white",
        }}
      />

      <ProseSection
        eyebrow="Fechamento"
        title="Da sala de aula para a rotina familiar"
        paragraphs={[
          "Uma escola pode ensinar muito. Mas quando escola e família compartilham linguagem, cuidado e intencionalidade, a formação ganha outra dimensão.",
          "Esse é o tipo de continuidade que o Alunos Digitais foi desenhado para promover — sem invadir a casa, sem terceirizar o pedagógico, e respeitando o protagonismo educativo da família.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Conheça as ações de engajamento familiar do programa",
          subtitle:
            "Mostramos como as famílias da sua escola podem ser incluídas na estratégia desde o primeiro dia do ano letivo.",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
