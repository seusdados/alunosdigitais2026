import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { CardsGridBlock } from "@/components/blocks/cards-grid-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Plataforma, livros e materiais didáticos | Alunos Digitais",
  description:
    "Conheça os materiais do Alunos Digitais: livros do professor e do aluno, plataforma, vídeos, gamificação e kits para escola e família.",
  openGraph: { images: ["/brand/ilustracoes/illo-08-materiais.jpg"] },
};

export default function PlataformaMateriaisPage() {
  return (
    <>
      <PageHero
        eyebrow="Plataforma e materiais"
        title="Material completo para ensinar, aprender e acompanhar"
        subtitle="Os materiais não funcionam apenas como apoio visual. Eles estruturam a aula, organizam a progressão, apoiam o professor e ampliam a experiência do aluno."
      />

      <CardsGridBlock
        data={{
          eyebrow: "O que compõe a solução",
          title: "Componentes do programa",
          bgColor: "white",
          cards: [
            { title: "Livro do professor", icon: "teal" },
            { title: "Livro do aluno", icon: "teal" },
            { title: "Plataforma digital", icon: "amber" },
            { title: "Vídeos formativos", icon: "teal" },
            { title: "Recursos complementares", icon: "amber" },
            { title: "Gamificação", icon: "teal" },
            { title: "Informativos", icon: "amber" },
            { title: "Kits por público", icon: "teal" },
          ],
        }}
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Material didático",
          title: "Pensado para cada público",
          paragraphs: [
            "Livros do professor e do aluno, vídeos, cadernos de atividades e recursos digitais — tudo sincronizado com a progressão pedagógica de cada ano.",
            "A escola escolhe entre formato digital (plataforma + recursos online) ou híbrido (material impresso + plataforma + recursos digitais).",
          ],
          image: {
            src: "/brand/ilustracoes/illo-08-materiais.jpg",
            alt: "Mesa do professor com livros, tablet e materiais do programa",
          },
          direction: "left",
          bgColor: "sand",
        }}
      />

      <ProseSection
        eyebrow="Plataforma"
        title="Ambiente de continuidade"
        paragraphs={[
          "A plataforma não é apenas repositório. É o ambiente de continuidade que conecta professor, aluno e família durante todo o ano: conteúdos permanentes, apoio ao professor, materiais para alunos, ações voltadas às famílias e trilhas de aprofundamento.",
        ]}
        bgColor="white"
      />

      <ProseSection
        eyebrow="Gamificação"
        title="Aprendizado que engaja"
        paragraphs={[
          "A ludicidade não aparece como elemento decorativo, mas como estratégia de apropriação do aprendizado, revisão de conceitos e engajamento. O jogo Guardião da Cidadania e Privacidade é parte central dessa frente.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Veja a plataforma e os materiais em uma demonstração",
          primary: { label: "Agendar demonstração", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver como funciona", href: "/como-funciona" },
        }}
      />
    </>
  );
}
