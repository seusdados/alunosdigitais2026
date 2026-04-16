import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "O Programa Alunos Digitais | Estrutura curricular contínua de cidadania digital",
  description:
    "Conheça a essência do programa Alunos Digitais: uma estrutura curricular contínua com material, formação, plataforma, gamificação e engajamento familiar.",
  openGraph: {
    images: ["/brand/ilustracoes/illo-03-pilares.jpg"],
  },
};

export default function ProgramaPage() {
  return (
    <>
      <PageHero
        eyebrow="O Programa"
        title="Um programa contínuo para formar cultura de cidadania digital"
        subtitle="O Alunos Digitais foi criado para ajudar escolas a sair da lógica de iniciativas isoladas e passar a construir uma cultura digital estruturada, contínua e pedagógica."
      />

      <ProseSection
        eyebrow="O problema"
        title="O problema que o programa resolve"
        paragraphs={[
          "A escola contemporânea convive com cyberbullying, fake news, exposição indevida de dados, superexposição digital, dependência tecnológica, conflitos em ambientes online, jogos e desafios de risco, circulação de desinformação e impactos emocionais relacionados às mídias.",
          "Ao mesmo tempo, muitas instituições ainda respondem a esse cenário com ações desconectadas, esporádicas ou sem continuidade.",
        ]}
        bgColor="white"
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Resposta",
          title: "A resposta do Alunos Digitais",
          paragraphs: [
            "O Alunos Digitais responde a esse cenário com uma proposta integrada: sequência pedagógica anual, formação do professor, participação da família, apoio institucional e recursos didáticos estruturados.",
            "Não se trata de reagir a incidentes. Trata-se de educar para prevenir, compreender, refletir e agir com responsabilidade.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-03-pilares.jpg",
            alt: "Pilares do programa em mural panorâmico",
          },
          direction: "right",
          bgColor: "sand",
        }}
      />

      <BulletsSection
        eyebrow="Diferenciais"
        title="O que torna o programa diferente"
        bullets={[
          "Progressão do 1º ao 9º ano",
          "Continuidade ao longo do ano letivo",
          "Material didático completo",
          "Formação docente desde o início da implementação",
          "Plataforma com recursos permanentes",
          "Apoio pedagógico durante a jornada",
          "Engajamento familiar planejado",
          "Possibilidade de uso em formato híbrido ou digital",
        ]}
        columns={2}
        bgColor="white"
      />

      <BulletsSection
        eyebrow="Pilares curriculares"
        title="Os oito pilares do programa"
        bullets={[
          "Identidade e presença digital",
          "Privacidade e segurança online",
          "Direitos e responsabilidades",
          "Cyberbullying e empatia",
          "Fake news e pensamento crítico",
          "Dependência tecnológica",
          "Inteligência artificial",
          "Protagonismo digital",
        ]}
        columns={2}
        bgColor="sand"
      />

      <ProseSection
        eyebrow="Resultado esperado"
        title="Ao longo da jornada"
        paragraphs={[
          "O estudante deixa de ocupar o lugar de usuário passivo e desenvolve repertório para identificar riscos, proteger sua privacidade, respeitar o outro online, checar informações, compreender direitos digitais, resolver conflitos com diálogo e usar tecnologia com mais propósito.",
        ]}
        bgColor="white"
      />

      <CTABarBlock
        data={{
          title: "Conheça o programa aplicado à sua escola",
          subtitle:
            "Agende uma conversa e receba uma apresentação institucional adaptada à sua realidade.",
          primary: { label: "Solicitar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver como funciona", href: "/como-funciona" },
        }}
      />
    </>
  );
}
