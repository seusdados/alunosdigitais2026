import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SectionHeading } from "@/components/site/section-heading";
import { cn } from "@/lib/utils";
import type { FlowStepsData } from "@/types/content";

/**
 * FlowSteps — 4 etapas numeradas em linha (desktop) ou stack vertical (mobile).
 * Usado nas páginas "Como Funciona" e home para explicar fluxo.
 */
export function FlowStepsBlock({ data }: { data: FlowStepsData }) {
  const { eyebrow, title, subtitle, steps, bgColor = "white" } = data;

  return (
    <section className={cn(bgColor === "sand" ? "bg-sand" : "bg-site-white")}>
      <Container className="py-14">
        <div className="mb-8 max-w-2xl space-y-3 md:mb-10">
          {eyebrow ? <SectionEyebrow>{eyebrow}</SectionEyebrow> : null}
          <SectionHeading subtitle={subtitle}>{title}</SectionHeading>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-card border border-[#E8E8E8] bg-white md:grid-cols-4">
          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={cn(
                "p-6 md:p-7",
                idx < steps.length - 1 && "border-b border-[#E8E8E8] md:border-b-0 md:border-r",
              )}
            >
              <p className="font-body text-[10px] font-bold uppercase tracking-regulatory text-teal-500">
                {step.number}
              </p>
              <p className="mt-3 font-display text-[14.5px] font-semibold leading-snug text-site-text">
                {step.title}
              </p>
              <p className="mt-2 font-body text-[12.5px] leading-[1.55] text-site-text-light">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
