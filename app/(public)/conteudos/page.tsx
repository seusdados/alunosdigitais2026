import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { ProseSection } from "@/components/blocks/prose-section";
import { Container } from "@/components/site/container";

export const metadata: Metadata = {
  title: "Conteúdos | Alunos Digitais",
  description:
    "Hub de conteúdos sobre educação digital e midiática, BNCC Computação, PNED, cidadania digital, segurança online e engajamento familiar.",
};

const pillars = [
  {
    label: "Educação digital e midiática",
    topics: [
      "O que é educação digital e midiática na escola",
      "Como implementar educação digital no currículo",
      "Transversalidade ou componente específico",
      "O que mudou com a Resolução CNE/CEB 2/2025",
    ],
  },
  {
    label: "BNCC, currículo e regulação",
    topics: [
      "O que é BNCC Computação",
      "Como a PNED impacta escolas e redes",
      "O que escolas precisam fazer até 2026",
      "Educação digital e projeto político-pedagógico",
    ],
  },
  {
    label: "Segurança e cidadania digital",
    topics: [
      "Como prevenir cyberbullying na escola",
      "Privacidade e proteção de dados de crianças",
      "Fake news e pensamento crítico no Fundamental",
      "Segurança digital para crianças e adolescentes",
    ],
  },
  {
    label: "Família e desenvolvimento",
    topics: [
      "Como engajar famílias na cidadania digital",
      "Tempo de tela, convivência e aprendizagem",
      "Saúde mental e ambiente digital",
      "Como conversar com filhos sobre riscos online",
    ],
  },
  {
    label: "Formação docente",
    topics: [
      "Como apoiar professores na educação digital",
      "Formação continuada em cultura digital",
      "O professor como mediador da cidadania digital",
      "Planos de aula e implementação na prática",
    ],
  },
];

export default function ConteudosPage() {
  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Hub editorial de educação digital"
        subtitle="Artigos, análises e guias sobre implementação de educação digital, BNCC, PNED, cidadania digital e engajamento familiar. Publicações em breve."
      />

      <ProseSection
        eyebrow="Em construção"
        title="Estamos preparando a primeira onda de conteúdos"
        paragraphs={[
          "Abaixo estão os pilares editoriais que vão organizar nossas publicações. Cada pilar terá artigos aprofundados, análises, entrevistas e guias práticos.",
          "Inscreva-se pelo formulário de contato para ser avisado quando os primeiros artigos forem publicados.",
        ]}
        bgColor="white"
      />

      <section className="bg-sand">
        <Container className="py-16 md:py-[80px]">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.label} className="rounded-card border border-[#E8E8E8] bg-white p-6">
                <p className="mb-3 font-body text-[10.5px] font-medium uppercase tracking-eyebrow text-teal-500">
                  {pillar.label}
                </p>
                <ul className="space-y-2">
                  {pillar.topics.map((t) => (
                    <li
                      key={t}
                      className="font-body text-[13.5px] leading-[1.55] text-site-text-mid"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTABarBlock
        data={{
          title: "Receba os primeiros conteúdos por e-mail",
          subtitle:
            "Deixe seu e-mail pelo formulário e te avisamos assim que as primeiras análises forem publicadas.",
          primary: { label: "Quero ser avisado", href: "/fale-com-um-especialista" },
        }}
      />
    </>
  );
}
