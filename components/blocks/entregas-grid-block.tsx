import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { entregas, type EntregaAccentColor, type EntregaItem } from "@/data/entregas";
import { cn } from "@/lib/utils";

/**
 * EntregasGridBlock — "O que o programa entrega" (home).
 *
 * Grid 4 cols (md+) / 2 cols (mobile) com 8 cards. Cada card tem ícone SVG
 * próprio (`data/entregas.tsx`), título, descrição curta, e uma cor de
 * acento (teal / amber / navy). Hover: card sobe 2px, shadow cresce, barra
 * superior de 3px na cor de acento aparece.
 */
export function EntregasGridBlock({
  caption,
}: {
  /** Texto curto exibido abaixo dos cards (ex.: introduz a faixa de pilares). */
  caption?: string;
}) {
  return (
    <section className="bg-sand">
      <Container className="py-14">
        <div className="mb-8 max-w-2xl space-y-3 md:mb-10">
          <SectionEyebrow>O que o programa entrega</SectionEyebrow>
          <SectionHeading subtitle="Não é curso isolado nem conteúdo solto. É uma arquitetura completa de implementação pedagógica.">
            Uma solução completa para implementar, ensinar e acompanhar
          </SectionHeading>
        </div>

        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {entregas.map((item, idx) => (
            <li key={idx}>
              <EntregaCard item={item} />
            </li>
          ))}
        </ul>

        {caption ? (
          <p className="mt-7 max-w-2xl font-body text-[13.5px] leading-[1.6] text-site-text-light">
            {caption}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

const ACCENT: Record<
  EntregaAccentColor,
  { bg: string; icon: string; border: string; bar: string }
> = {
  teal: {
    bg: "bg-teal-100",
    icon: "text-teal-500",
    border: "hover:border-teal-400/40",
    bar: "bg-teal-400",
  },
  amber: {
    bg: "bg-amber-100",
    icon: "text-amber-500",
    border: "hover:border-amber-300/40",
    bar: "bg-amber-400",
  },
  navy: {
    bg: "bg-navy-500/[0.06]",
    icon: "text-navy-500",
    border: "hover:border-navy-500/30",
    bar: "bg-navy-500",
  },
};

function EntregaCard({ item }: { item: EntregaItem }) {
  const s = ACCENT[item.accentColor];
  return (
    <div
      className={cn(
        "group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-gray-100 bg-site-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
        s.border,
      )}
    >
      {/* Barra de acento no topo — aparece no hover */}
      <span
        aria-hidden
        className={cn(
          "absolute left-0 right-0 top-0 h-[3px] rounded-t-2xl opacity-0 transition-opacity group-hover:opacity-100",
          s.bar,
        )}
      />

      <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", s.bg, s.icon)}>
        {item.icon}
      </div>

      <h3 className="font-display text-[15px] font-semibold leading-[1.25] tracking-tight text-site-text">
        {item.title}
      </h3>

      <p className="font-body text-[13px] leading-[1.6] text-site-text-light">{item.description}</p>
    </div>
  );
}
