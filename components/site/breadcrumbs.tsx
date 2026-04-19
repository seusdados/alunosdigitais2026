import Link from "next/link";

import { Container } from "@/components/site/container";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Breadcrumbs — navegação hierárquica para páginas internas.
 *
 * Renderiza uma lista ordenada com separadores "/", onde o último item é o
 * atual (sem href). Inclui estrutura semântica acessível (<nav> + aria-label)
 * e JSON-LD BreadcrumbList para SEO.
 */
export function Breadcrumbs({ items, className }: { items: BreadcrumbItem[]; className?: string }) {
  if (items.length === 0) return null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alunosdigitais2026.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };

  return (
    <div className={cn("border-b border-[#E8E8E8] bg-site-white", className)}>
      <Container className="py-3.5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-body text-[12.5px] text-site-text-light">
            {items.map((item, idx) => {
              const isLast = idx === items.length - 1;
              return (
                <li key={idx} className="flex items-center gap-1.5">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="transition-colors hover:text-teal-600">
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      className={cn(isLast && "font-medium text-site-text-mid")}
                      aria-current={isLast ? "page" : undefined}
                    >
                      {item.label}
                    </span>
                  )}
                  {!isLast ? (
                    <span aria-hidden className="text-site-text-light/40">
                      /
                    </span>
                  ) : null}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
