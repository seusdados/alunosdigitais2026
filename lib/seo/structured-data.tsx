/**
 * Helpers de Structured Data (schema.org / JSON-LD).
 *
 * Cada helper retorna um `<script type="application/ld+json">` pronto para
 * ser renderizado em Server Components. O shape segue as specs de
 * schema.org. O objetivo é melhorar a indexação em mecanismos de busca
 * (rich snippets: FAQ, Article, Organization, BreadcrumbList).
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alunosdigitais2026.vercel.app";

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

/**
 * Organization — identifica o Alunos Digitais como organização educacional.
 * Deve ser renderizado na home e/ou no root layout.
 */
export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Alunos Digitais",
    url: siteUrl,
    logo: `${siteUrl}/brand/logo/logo-horizontal.png`,
    description:
      "Programa contínuo de educação digital e cidadania digital para todo o Ensino Fundamental.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      url: `${siteUrl}/fale-com-um-especialista`,
      availableLanguage: "Portuguese",
    },
    areaServed: "BR",
  };
  return <JsonLd data={data} />;
}

/**
 * WebSite — permite que o Google mostre sitelinks / searchbox.
 */
export function WebSiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Alunos Digitais",
    url: siteUrl,
    inLanguage: "pt-BR",
  };
  return <JsonLd data={data} />;
}

/**
 * Article — página individual de artigo editorial.
 */
export function ArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  image,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  image?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    dateModified: updatedAt ?? publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/conteudos/${slug}`,
    },
    author: {
      "@type": "Organization",
      name: "Alunos Digitais",
    },
    publisher: {
      "@type": "Organization",
      name: "Alunos Digitais",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/brand/logo/logo-horizontal.png`,
      },
    },
    ...(image
      ? {
          image: image.startsWith("http") ? image : `${siteUrl}${image}`,
        }
      : {}),
    inLanguage: "pt-BR",
  };
  return <JsonLd data={data} />;
}

/**
 * FAQPage — gera rich snippet de FAQ no Google.
 */
export function FAQPageSchema({ entries }: { entries: { question: string; answer: string }[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((e) => ({
      "@type": "Question",
      name: e.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: e.answer,
      },
    })),
  };
  return <JsonLd data={data} />;
}

/**
 * Course — cada ano do currículo pode ser modelado como Course.
 */
export function CourseSchema({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: `${siteUrl}${url}`,
    provider: {
      "@type": "EducationalOrganization",
      name: "Alunos Digitais",
      url: siteUrl,
    },
    inLanguage: "pt-BR",
  };
  return <JsonLd data={data} />;
}
