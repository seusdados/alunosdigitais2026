import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { CardsGridData } from "@/types/content";

/**
 * CardsGrid — grade de cards curtos, 4 colunas desktop, 2 mobile.
 *
 * Cada card tem título + texto opcional + dot colorido (teal/amber).
 * Usado na home para "o que entrega" e similares.
 */
export function CardsGridBlock({ data }: { data: CardsGridData }) {
  const { eyebrow, title, subtitle, cards, bgColor = "white" } = data;

  return (
    <section className={cn(bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="py-16 md:py-[80px]">
        <div className="mb-10 max-w-[720px] space-y-3 md:mb-12">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
        </div>

        <ul className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {cards.map((card, idx) => (
            <li
              key={idx}
              className="flex flex-col gap-3 rounded-card border border-[#E8E8E8] bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-[#C8C8C8]"
            >
              <span
                aria-hidden
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  card.icon === "amber" ? "bg-amber-100" : "bg-teal-100",
                )}
              >
                <span
                  className={cn(
                    "block h-[7px] w-[7px] rounded-full",
                    card.icon === "amber" ? "bg-amber-500" : "bg-teal-500",
                  )}
                />
              </span>
              <p className="font-display text-[15px] font-semibold leading-tight text-site-text">
                {card.title}
              </p>
              {card.text ? (
                <p className="font-body text-[13px] leading-[1.55] text-site-text-light">
                  {card.text}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
