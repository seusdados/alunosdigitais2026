import { Container } from "@/components/site/container";

/**
 * LegalContent — wrapper para páginas legais (privacidade, termos, cookies,
 * acessibilidade). Renderiza o conteúdo em container estreito, tipografia
 * editorial e headings hierárquicos bem diferenciados.
 *
 * Aceita `children` como conteúdo arbitrário (geralmente composto por
 * headings e parágrafos).
 */
export function LegalContent({
  lastUpdated,
  children,
}: {
  lastUpdated?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="bg-site-white">
      <Container className="max-w-3xl py-14">
        {lastUpdated ? (
          <p className="mb-10 font-body text-[12.5px] text-site-text-light">
            Última atualização: <time>{lastUpdated}</time>
          </p>
        ) : null}

        <div className="prose-legal space-y-6 font-body text-[15px] leading-[1.75] text-site-text-mid [&_a]:text-teal-600 [&_a]:underline hover:[&_a]:text-teal-500 [&_h2]:mb-2 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:tracking-tighter [&_h2]:text-site-text [&_h3]:mb-1 [&_h3]:mt-6 [&_h3]:font-display [&_h3]:text-[16px] [&_h3]:font-semibold [&_h3]:text-site-text [&_li]:marker:text-teal-500 [&_p+h2]:mt-10 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5 [&_ul]:text-site-text-mid">
          {children}
        </div>
      </Container>
    </section>
  );
}
