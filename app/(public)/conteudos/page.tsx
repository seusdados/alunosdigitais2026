import type { Metadata } from "next";
import Link from "next/link";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { articles, pillarList } from "@/data/articles";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Conteúdos sobre educação digital | Alunos Digitais",
  description:
    "Artigos, análises e guias sobre educação digital, BNCC Computação, cidadania digital, segurança online e engajamento familiar.",
};

export default function ConteudosPage() {
  const grouped = pillarList.map((p) => ({
    ...p,
    articles: articles.filter((a) => a.pillar === p.key),
  }));

  return (
    <>
      <PageHero
        eyebrow="Conteúdos"
        title="Hub editorial de educação digital"
        subtitle="Artigos, análises e guias sobre implementação de educação digital, BNCC, PNED, cidadania digital e engajamento familiar."
      />

      <section className="bg-site-white">
        <Container className="py-16 md:py-[80px]">
          <div className="space-y-14">
            {grouped.map((pillar) => (
              <div key={pillar.key}>
                <SectionEyebrow className="mb-5">{pillar.label}</SectionEyebrow>
                <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {pillar.articles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/conteudos/${a.slug}`}
                        className="group flex h-full flex-col gap-3 rounded-card border border-[#E8E8E8] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:shadow-[0_0_0_3px_rgba(43,217,165,0.06)]"
                      >
                        <p className="font-display text-[15px] font-semibold leading-snug text-site-text group-hover:text-teal-600">
                          {a.title}
                        </p>
                        <p className="font-body text-[13px] leading-[1.55] text-site-text-light">
                          {a.excerpt.length > 140 ? `${a.excerpt.slice(0, 140)}…` : a.excerpt}
                        </p>
                        <span className="mt-auto font-body text-[11.5px] text-site-text-light">
                          {formatDate(a.publishedAt)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CTABarBlock
        data={{
          title: "Receba novos conteúdos por e-mail",
          subtitle: "Deixe seu contato e avisamos quando publicarmos novas análises.",
          primary: { label: "Quero receber", href: "/fale-com-um-especialista" },
        }}
      />
    </>
  );
}
