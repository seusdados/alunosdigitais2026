import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Solução de educação digital para escolas | Alunos Digitais",
  description:
    "Conheça a solução do Alunos Digitais para escolas que desejam implementar educação digital com currículo, material, formação e suporte.",
  openGraph: { images: ["/brand/ilustracoes/illo-07-escolas.jpg"] },
};

export default function ParaEscolasPage() {
  return (
    <>
      <PageHero
        eyebrow="Para escolas"
        title="Para escolas que precisam transformar a educação digital em prática pedagógica"
        subtitle="Modelos flexíveis de adoção — digital, impresso ou híbrido — com previsibilidade para a gestão, segurança para o professor e engajamento para a família."
      />

      <BulletsSection
        eyebrow="Dores"
        title="O que a escola precisa resolver"
        bullets={[
          "Pressão regulatória e curricular",
          "Falta de continuidade pedagógica",
          "Falta de formação docente específica em cultura digital",
          "Dificuldade de engajar famílias",
          "Necessidade de resposta concreta a cyberbullying, fake news, privacidade, redes e segurança",
        ]}
        columns={2}
        bgColor="white"
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Arquitetura de implementação",
          title: "O que a escola recebe",
          paragraphs: [
            "Um programa anual estruturado com material didático, formação inicial e contínua, plataforma digital, suporte pedagógico, recursos para famílias e indicadores de acompanhamento.",
            "Formato híbrido ou digital, conforme a realidade da instituição.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-07-escolas.jpg",
            alt: "Escola isométrica em corte com salas integradas ao programa",
          },
          direction: "right",
          bgColor: "sand",
        }}
      />

      <BulletsSection
        eyebrow="Entregas"
        title="Componentes do programa"
        bullets={[
          "Programa anual estruturado",
          "Material didático físico e digital",
          "Formação inicial e contínua para professores",
          "Plataforma digital com recursos permanentes",
          "Suporte pedagógico ao longo do ano",
          "Ações e conteúdos para famílias",
          "Indicadores e acompanhamento",
          "Possibilidade de formato híbrido",
        ]}
        columns={2}
        bgColor="white"
      />

      <BulletsSection
        eyebrow="Benefícios para gestão"
        title="Direção e coordenação ganham"
        bullets={[
          "Clareza de implementação",
          "Consistência curricular",
          "Apoio ao professor com planos prontos",
          "Previsibilidade operacional",
          "Discurso institucional mais sólido diante das famílias",
        ]}
        columns={2}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Agende uma apresentação para sua escola",
          subtitle: "Nossa equipe adapta o modelo ao seu calendário e infraestrutura.",
          primary: { label: "Agendar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver currículo completo", href: "/curriculo" },
        }}
      />
    </>
  );
}
