import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";

/**
 * ProseSection — bloco simples de texto corrido com H2 + parágrafos.
 * Usado em páginas institucionais sem ilustração (tipo seções textuais
 * curtas de "Sobre", "Conformidade", etc.).
 */
export function ProseSection({
  eyebrow,
  title,
  paragraphs,
  bgColor = "white",
}: {
  eyebrow?: string;
  title: string;
  paragraphs: string[];
  bgColor?: "white" | "sand";
}) {
  return (
    <section className={cn(bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="max-w-[820px] py-14 md:py-[80px]">
        <div className="space-y-5">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading>{title}</SectionHeading>
          <div className="space-y-4 pt-2">
            {paragraphs.map((p, idx) => (
              <p
                key={idx}
                className="font-body text-[15.5px] font-normal leading-[1.75] text-site-text-mid"
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
