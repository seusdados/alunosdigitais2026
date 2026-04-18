import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { CTABarBlock } from "@/components/blocks/cta-bar-block";
import { PageHero } from "@/components/blocks/page-hero";
import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SiteButton } from "@/components/site/site-button";
import { articleSlugs, getArticleBySlug } from "@/data/articles";
import { formatDate } from "@/lib/format";

export function generateStaticParams() {
  return articleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Artigo não encontrado" };

  return {
    title: article.seo.title,
    description: article.seo.description,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.seo.ogImage ?? "/brand/ilustracoes/illo-01-hero.jpg"],
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <PageHero eyebrow={article.pillarLabel} title={article.title} subtitle={article.excerpt} />

      <article className="bg-site-white">
        <Container className="max-w-[780px] py-14 md:py-[80px]">
          <div className="mb-6 flex items-center gap-3">
            <SectionEyebrow as="span">{article.pillarLabel}</SectionEyebrow>
            <span className="font-body text-[12px] text-site-text-light">
              {formatDate(article.publishedAt)}
            </span>
          </div>

          <div className="space-y-5">
            {article.body.map((p, idx) => (
              <p
                key={idx}
                className="font-body text-[16px] font-normal leading-[1.8] text-site-text-mid"
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-[#E8E8E8] pt-8 md:flex-row md:items-center md:justify-between">
            <Link
              href="/conteudos"
              className="font-body text-[13px] font-medium text-teal-500 hover:text-teal-600"
            >
              ← Voltar para Conteúdos
            </Link>
            <SiteButton href="/fale-com-um-especialista" variant="primary">
              Falar com especialista
            </SiteButton>
          </div>
        </Container>
      </article>

      <CTABarBlock
        data={{
          title: "Quer implementar educação digital na sua escola?",
          subtitle: "Nossa equipe apresenta o programa em até 60 minutos.",
          primary: { label: "Agendar apresentação", href: "/fale-com-um-especialista" },
          secondary: { label: "Conhecer o programa", href: "/o-programa" },
        }}
      />
    </>
  );
}
