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
            "Cidadania digital, ética em rede, segurança, pensamento crítico e mediação de conflitos são temas que exigem formação continuada — não improvisação.",
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
        eyebrow="Pilares da formação docente"
        title="Cinco frentes que sustentam a prática em sala"
        description="Cada uma das frentes abaixo combina conteúdo, ferramenta e canal de apoio. Juntas, formam o ecossistema de capacitação que acompanha o docente do início do ano à culminância."
        bgColor="sand"
        columns={2}
        bullets={[
          {
            title: "Formação no início do ano",
            description:
              "Workshops presenciais e/ou online para apresentação da lógica do programa, dos materiais e das possibilidades de aplicação. O time de professores começa o ano calibrado, com objetivos claros e cronograma combinado.",
          },
          {
            title: "Formação contínua",
            description:
              "Acompanhamento ao longo do ano por meio da plataforma e de conteúdos formativos complementares. O professor sempre tem onde recorrer quando o tema da aula da semana exigir aprofundamento.",
          },
          {
            title: "Plano de aula e caderno do professor",
            description:
              "Material estruturado para otimizar o tempo docente e dar segurança na condução das aulas. Cada aula vem com objetivo, dinâmica sugerida, situações-problema e orientação de mediação.",
          },
          {
            title: "Conexão curricular explícita",
            description:
              "Apoio para que a equipe compreenda como os temas se articulam com BNCC (competência 5), cultura digital, mundo digital, pensamento computacional, cidadania digital e uso crítico das mídias.",
          },
          {
            title: "Help desk pedagógico",
            description:
              "Canal de apoio para dúvidas, orientações e sustentação da implementação. Quando uma situação real em sala desafia o roteiro, o professor não fica sozinho — tem com quem conversar.",
          },
          {
            title: "E-book do professor",
            description:
              "Aprofundamento teórico que vai além do plano de aula: contexto regulatório, fundamentos pedagógicos e literatura de referência para quem quer ir mais fundo nos temas.",
          },
        ]}
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Continuidade ao longo do ano",
          title: "Formação não acaba no workshop inicial",
          paragraphs: [
            "Ao longo do ano, novos conteúdos formativos são publicados na plataforma, acompanhando a evolução do currículo e os temas emergentes do cenário digital.",
            "A formação acompanha o professor — e, com ele, a evolução do programa e da cultura digital da escola.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-04-formacao.jpg",
            alt: "Detalhe de plataforma com conteúdos formativos contínuos",
          },
          direction: "left",
          bgColor: "white",
        }}
      />

      <ProseSection
        eyebrow="Fechamento"
        title="O professor não é deixado sozinho"
        paragraphs={[
          "Ele é preparado para conduzir um processo pedagógico contínuo em um campo que exige atualização, criticidade e mediação qualificada.",
          "A formação docente do Alunos Digitais foi desenhada para que cada aula seja entregue com confiança técnica, embasamento pedagógico e suporte de equipe.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Conheça a formação que seu time vai receber",
          subtitle:
            "Apresentamos o pacote de formação inicial e contínua, materiais do professor e canal de help desk pedagógico em uma conversa sob medida pra sua escola.",
          primary: { label: "Solicitar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
