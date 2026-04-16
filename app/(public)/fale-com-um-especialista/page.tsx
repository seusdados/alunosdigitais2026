import type { Metadata } from "next";

import { ContactFormBlock } from "@/components/blocks/contact-form-block";
import { PageHero } from "@/components/blocks/page-hero";

export const metadata: Metadata = {
  title: "Solicitar apresentação | Alunos Digitais",
  description:
    "Fale com a equipe do Alunos Digitais e conheça uma proposta estruturada de educação digital para sua escola ou rede.",
};

export default function FaleConoscoPage() {
  return (
    <>
      <PageHero
        eyebrow="Fale com um especialista"
        title="Vamos conversar sobre a implementação na sua escola ou rede?"
        subtitle="Conte em que etapa sua escola ou rede está. Nossa equipe retorna em até 2 dias úteis com uma apresentação adaptada ao seu contexto."
      />

      <ContactFormBlock
        data={{
          eyebrow: "Apresentação institucional",
          title: "Preencha os dados abaixo",
          subtitle:
            "Todos os campos marcados com * são obrigatórios. Tratamos seus dados em conformidade com a LGPD.",
          submitLabel: "Solicitar apresentação",
        }}
      />
    </>
  );
}
