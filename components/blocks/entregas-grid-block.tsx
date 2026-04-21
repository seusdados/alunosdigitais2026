import { Container } from "@/components/site/container";
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
      <Container className="py-20 lg:py-24">
        <div className="mb-12 max-w-2xl space-y-4 md:mb-14">
          <p className="font-body text-[13px] font-medium uppercase tracking-[0.14em] text-teal-500">
            O que o programa entrega
          </p>
          <h2 className="font-display text-[36px] font-bold leading-[1.08] tracking-[-0.03em] text-site-text lg:text-[44px]">
            Uma solução completa para implementar, ensinar e acompanhar
          </h2>
          <p className="mt-2 max-w-2xl font-body text-[17px] font-light leading-[1.72] text-site-text-mid lg:text-[18px]">
            Não é curso isolado nem conteúdo solto. É uma arquitetura completa de implementação
            pedagógica.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {entregas.map((item, idx) => (
            <li key={idx}>
              <EntregaCard item={item} />
            </li>
          ))}
        </ul>

        {caption ? (
          <p className="mt-10 max-w-2xl font-body text-[15px] leading-[1.7] text-site-text-mid">
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
        "group relative flex flex-col gap-3.5 overflow-hidden rounded-2xl border border-gray-100 bg-site-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg",
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

      <h3 className="font-display text-[16px] font-semibold leading-[1.3] tracking-tight text-site-text">
        {item.title}
      </h3>

      <p className="font-body text-[14px] leading-[1.65] text-site-text-light">
        {item.description}
      </p>
    </div>
  );
}
