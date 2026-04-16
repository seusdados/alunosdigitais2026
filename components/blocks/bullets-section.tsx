import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

/**
 * BulletsSection — seção textual com título e lista de bullets.
 * Usada em páginas institucionais para elencar "o que a escola recebe",
 * "o que o estudante desenvolve", etc.
 */
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
  bullets: string[];
  bgColor?: "white" | "sand";
  columns?: 1 | 2 | 3;
}) {
  return (
    <section className={cn(bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="py-14 md:py-[64px]">
        <div className="mb-8 max-w-[720px] space-y-3">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={description}>{title}</SectionHeading>
        </div>

        <ul
          className={cn(
            "grid gap-3",
            columns === 1 && "md:grid-cols-1",
            columns === 2 && "md:grid-cols-2",
            columns === 3 && "md:grid-cols-3",
          )}
        >
          {bullets.map((b, idx) => (
            <li
              key={idx}
              className="flex gap-3 rounded-card border border-[#E8E8E8] bg-white px-5 py-4"
            >
              <span
                aria-hidden
                className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500"
              />
              <span className="font-body text-[14px] leading-[1.55] text-site-text">{b}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
