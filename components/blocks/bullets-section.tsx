import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

/**
 * BulletsSection — seção textual com título e lista de bullets.
 *
 * Cada item pode ser uma string simples (bullet curto) ou um objeto
 * `{ title, description }` para entregar mais substância editorial sem
 * recorrer a múltiplos SplitBleeds quando não há ilustração suficiente.
 */
export type BulletItem = string | { title: string; description?: string };

export function BulletsSection({
  eyebrow,
  title,
  description,
  bullets,
  bgColor = "white",
  columns = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  bullets: BulletItem[];
  bgColor?: "white" | "sand";
  columns?: 1 | 2 | 3;
}) {
  return (
    <section className={cn(bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="py-20 lg:py-24">
        <div className="mb-12 max-w-2xl space-y-4">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={description}>{title}</SectionHeading>
        </div>

        <ul
          className={cn(
            "grid gap-4",
            columns === 1 && "md:grid-cols-1",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-3",
          )}
        >
          {bullets.map((b, idx) => {
            const isRich = typeof b === "object";
            return (
              <li
                key={idx}
                className={cn(
                  "rounded-card border border-[#E8E8E8] bg-white",
                  isRich ? "p-6" : "flex gap-3 px-5 py-4",
                )}
              >
                {isRich ? (
                  <>
                    <p className="font-display text-[18px] font-semibold leading-[1.3] text-site-text">
                      {b.title}
                    </p>
                    {b.description ? (
                      <p className="mt-2 font-body text-[15px] leading-[1.65] text-site-text-mid">
                        {b.description}
                      </p>
                    ) : null}
                  </>
                ) : (
                  <>
                    <span
                      aria-hidden
                      className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
                    />
                    <span className="font-body text-[15px] leading-[1.6] text-site-text">{b}</span>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
