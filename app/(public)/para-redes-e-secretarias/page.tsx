import type { Metadata } from "next";

import { BulletsSection } from "@/components/blocks/bullets-section";
import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";

export const metadata: Metadata = {
  title: "Educação digital para redes e secretarias de ensino | Alunos Digitais",
  description:
    "Solução estruturada para redes e secretarias que buscam implementar educação digital e midiática com escala, formação docente e acompanhamento.",
  openGraph: { images: ["/brand/ilustracoes/illo-09-conformidade.jpg"] },
};

export default function ParaRedesPage() {
  return (
    <>
      <PageHero
        eyebrow="Para redes e secretarias"
        title="Para redes e secretarias que precisam implementar com escala e consistência"
        subtitle="A implementação da educação digital em rede exige mais do que conteúdo. Exige coerência curricular, formação docente, governança pedagógica, instrumentos de apoio e leitura de indicadores agregados."
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Desafio de escala",
          title: "Por que redes precisam de uma solução estruturada",
          paragraphs: [
            "Múltiplas unidades, realidades diferentes, equipes docentes heterogêneas. Sem uma arquitetura comum, a implementação da educação digital fica fragmentada — cada escola interpreta os marcos regulatórios à sua maneira e a rede perde a capacidade de medir.",
            "A rede precisa de um modelo escalável que preserve consistência pedagógica e permita adaptação local. O Alunos Digitais foi desenhado pensando nisso desde o início.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-09-conformidade.jpg",
            alt: "Árvore regulatória conectando marcos normativos à prática escolar",
          },
          direction: "right",
          bgColor: "white",
        }}
      />

      <BulletsSection
        eyebrow="Oferta institucional"
        title="O que o programa oferece para redes"
        description="Cada item abaixo foi pensado para responder a uma dor concreta de quem implementa em escala — da secretaria ao gestor de unidade."
        bgColor="sand"
        columns={2}
        bullets={[
          {
            title: "Estrutura curricular do 1º ao 9º ano",
            description:
              "Currículo unificado em 36 aulas anuais e 6 fases pedagógicas por ano. A rede inteira fala a mesma língua e segue o mesmo arco de progressão.",
          },
          {
            title: "Formação e atualização docente em escala",
            description:
              "Workshops iniciais, formação contínua via plataforma e help desk pedagógico — modelo replicável para qualquer quantidade de unidades.",
          },
          {
            title: "Materiais organizados por etapa",
            description:
              "Livros do professor e do aluno, planos de aula, gamificação e recursos digitais distribuídos por ano. Padronização sem engessamento.",
          },
          {
            title: "Plataforma para continuidade",
            description:
              "Ambiente único onde professores, alunos e famílias acessam conteúdos durante todo o ano letivo. Disponibilidade contínua, sem dependência de evento.",
          },
          {
            title: "Apoio à comunicação com famílias",
            description:
              "Materiais e roteiros prontos para que cada escola da rede dialogue com responsáveis sobre o programa, mantendo unidade de discurso.",
          },
          {
            title: "Diagnóstico e indicadores agregados",
            description:
              "Avaliação inicial e acompanhamento contínuo. A rede vê o quadro consolidado e cada escola enxerga o próprio.",
          },
          {
            title: "Aderência regulatória explícita",
            description:
              "Mapeamento direto com BNCC competência 5, Resolução CNE/CEB 1/2022, PNED (Lei 14.533/2023), CNE/CEB 2/2025 e ECA Digital. Pronto para auditoria.",
          },
          {
            title: "Modelo flexível de adoção",
            description:
              "Adoção em onda piloto ou em rede inteira, formato digital ou híbrido — calibrado conforme a maturidade e infraestrutura local.",
          },
        ]}
      />

      <SplitBleedBlock
        data={{
          eyebrow: "Governança pedagógica",
          title: "Padronização sem perda de autonomia",
          paragraphs: [
            "Para a secretaria, o programa entrega uma camada de governança pedagógica que permite acompanhar a implementação em todas as unidades simultaneamente. Cada escola mantém sua autonomia operacional, mas dentro de um arco curricular comum.",
            "O resultado é menos retrabalho, comunicação coerente com a comunidade educacional e segurança regulatória diante de exigências federais e estaduais.",
          ],
          image: {
            src: "/brand/ilustracoes/illo-09-conformidade.jpg",
            alt: "Visão de governança pedagógica em rede de escolas",
          },
          direction: "left",
          bgColor: "white",
        }}
      />

      <ProseSection
        eyebrow="Valor institucional"
        title="O que a rede ganha"
        paragraphs={[
          "Uma solução com potencial de padronização, escalabilidade, apoio à implementação e alinhamento com a agenda contemporânea da educação digital.",
          "Governança pedagógica, indicadores agregados, comunicação coerente com famílias e gestão pública — sem que cada unidade precise reinventar o seu próprio caminho.",
        ]}
        bgColor="sand"
      />

      <CTABarBlock
        data={{
          title: "Solicitar reunião institucional",
          subtitle:
            "Nossa equipe apresenta o modelo de adoção para redes e secretarias, incluindo cronograma de implantação, modelos de contratação e estimativas de cobertura.",
          primary: { label: "Solicitar reunião", href: "/fale-com-um-especialista" },
          secondary: { label: "Ver conformidade e marcos", href: "/conformidade-e-curriculo" },
        }}
      />
    </>
  );
}
