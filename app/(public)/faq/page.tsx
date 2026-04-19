import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { FAQAccordion } from "@/components/blocks/faq-accordion";
import { PageHero } from "@/components/blocks/page-hero";
import { FAQPageSchema } from "@/lib/seo/structured-data";

const faqEntries = [
  {
    question: "O Alunos Digitais é uma disciplina, um curso ou um programa?",
    answer:
      "É um programa curricular contínuo — não um curso isolado nem uma disciplina avulsa. Organiza aulas, fases pedagógicas, materiais, formação docente, engajamento familiar e suporte em uma estrutura anual.",
  },
  {
    question: "O programa atende quais anos escolares?",
    answer:
      "Do 1º ao 9º ano do Ensino Fundamental. São 9 anos de jornada, 36 aulas anuais e 6 fases pedagógicas por ano.",
  },
  {
    question: "Quantas aulas compõem o percurso anual?",
    answer:
      "36 aulas por ano, distribuídas em 6 fases pedagógicas que organizam a progressão de temas, atividades e avaliações.",
  },
  {
    question: "O professor recebe material pronto?",
    answer:
      "Sim. Livro do professor, planos de aula estruturados, e-book de aprofundamento e apoio por plataforma — com flexibilidade para adaptar ao contexto da turma.",
  },
  {
    question: "Existe formação no início do ano?",
    answer:
      "Sim. Oferecemos workshops de formação inicial (presenciais ou online) para apresentar a proposta, os materiais e as possibilidades de aplicação.",
  },
  {
    question: "Há formação contínua ao longo da implementação?",
    answer:
      "Sim. A plataforma oferece conteúdos formativos, acompanhamento pedagógico e ações formativas complementares ao longo do ano.",
  },
  {
    question: "A escola recebe material impresso?",
    answer:
      "Sim, no formato híbrido. A escola pode optar por digital (plataforma + recursos online) ou híbrido (impresso + plataforma + recursos digitais).",
  },
  {
    question: "Existe plataforma digital?",
    answer:
      "Sim. A plataforma é ambiente de continuidade com conteúdos para professor, aluno e família, recursos complementares, gamificação e trilhas de aprofundamento.",
  },
  {
    question: "Como funciona o engajamento familiar?",
    answer:
      "Pais e responsáveis recebem conteúdos na plataforma, lives, webinários, orientações sobre riscos e prevenção, materiais de apoio e participam de ações de culminância.",
  },
  {
    question: "Há suporte pedagógico?",
    answer:
      "Sim. Help desk pedagógico para dúvidas, consultoria de implementação, apoio contínuo da equipe e acompanhamento durante todo o ano letivo.",
  },
  {
    question: "O programa pode ser adotado em redes de ensino?",
    answer:
      "Sim. Temos modelo de adoção institucional específico para redes e secretarias, com escala, padronização e indicadores agregados.",
  },
  {
    question: "O currículo pode ser trabalhado de forma transversal?",
    answer:
      "Sim. A arquitetura curricular permite organização transversal ou como componente específico, conforme o contexto da rede ou da escola.",
  },
  {
    question: "O programa dialoga com BNCC e educação digital?",
    answer:
      "Sim. Aderente à BNCC (Competência 5), Resolução CNE/CEB 1/2022 (BNCC Computação), PNED (Lei 14.533/2023), CNE/CEB 2/2025 e ECA Digital.",
  },
  {
    question: "Como solicitar apresentação?",
    answer:
      "Pela página de contato: preencha o formulário e um especialista retorna em até 2 dias úteis com apresentação personalizada.",
  },
];

export const metadata: Metadata = {
  title: "Perguntas frequentes | Alunos Digitais",
  description:
    "Tire suas dúvidas sobre o programa Alunos Digitais: currículo, formação docente, plataforma, materiais, engajamento familiar e conformidade curricular.",
};

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Perguntas frequentes"
        subtitle="Reunimos aqui as dúvidas mais recorrentes sobre implementação, formação, materiais e alinhamento regulatório."
      />

      <FAQPageSchema entries={faqEntries} />

      <FAQAccordion data={{ title: "Sobre o programa", entries: faqEntries }} />

      <CTABarBlock
        data={{
          title: "Não encontrou sua pergunta?",
          subtitle: "Fale diretamente com nosso time pedagógico.",
          primary: { label: "Falar com especialista", href: "/fale-com-um-especialista" },
        }}
      />
    </>
  );
}
