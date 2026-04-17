import type { Metadata } from "next";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { CardsGridBlock } from "@/components/blocks/cards-grid-block";
import { ContactFormBlock } from "@/components/blocks/contact-form-block";
import { CurriculumSectionBlock } from "@/components/blocks/curriculum-section-block";
import { FAQAccordion } from "@/components/blocks/faq-accordion";
import { FlowStepsBlock } from "@/components/blocks/flow-steps-block";
import { HeroBlock } from "@/components/blocks/hero-block";
import { PillarBannerBlock } from "@/components/blocks/pillar-banner-block";
import { SplitBleedBlock } from "@/components/blocks/split-bleed-block";
import { RegulatoryBar } from "@/components/site/regulatory-bar";
import { curriculumYears } from "@/data/curriculo";
import {
  aboutData,
  challengeData,
  complianceData,
  contactData,
  ctaBarData,
  familyData,
  heroData,
  homeFaq,
  howItWorksData,
  materialsData,
  pillarsBanner,
  schoolsData,
  teacherSupportData,
  whatItDeliversData,
} from "@/data/home";

export const metadata: Metadata = {
  title: "Alunos Digitais | Programa contínuo de educação digital para o Ensino Fundamental",
  description:
    "Programa contínuo de educação digital e cidadania digital para o Ensino Fundamental, com material didático, formação docente, plataforma, suporte pedagógico e engajamento familiar.",
  openGraph: {
    title: "Alunos Digitais",
    description:
      "Programa contínuo de educação digital e cidadania digital para todo o Ensino Fundamental.",
    images: ["/brand/ilustracoes/illo-01-hero.jpg"],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroBlock data={heroData} />
      <RegulatoryBar />
      <SplitBleedBlock data={challengeData} />
      <CardsGridBlock data={whatItDeliversData} />
      <PillarBannerBlock data={pillarsBanner} />
      <SplitBleedBlock data={teacherSupportData} />
      <SplitBleedBlock data={familyData} />
      <CurriculumSectionBlock
        eyebrow="Currículo"
        title="Do 1º ao 9º ano, com progressão pedagógica real"
        subtitle="Nos anos iniciais: identidade, convivência, privacidade. Nos anos finais: pensamento crítico, segurança digital avançada, IA, autoria e protagonismo."
        years={curriculumYears}
        image={{
          src: "/brand/ilustracoes/illo-06-progressao.jpg",
          alt: "Jornada vertical do 1º ao 9º ano",
        }}
      />
      <FlowStepsBlock data={howItWorksData} />
      <SplitBleedBlock data={schoolsData} />
      <SplitBleedBlock data={materialsData} />
      <SplitBleedBlock data={complianceData} />
      <SplitBleedBlock data={aboutData} />
      <CTABarBlock data={ctaBarData} />
      <FAQAccordion data={homeFaq} />
      <ContactFormBlock data={contactData} />
    </>
  );
}
