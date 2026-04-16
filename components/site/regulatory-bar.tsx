import { Container } from "@/components/site/container";
import { regulatoryTags } from "@/data/regulatory";

const DOT_COLOR: Record<string, string> = {
  bncc: "bg-regulatory-bncc",
  cne1: "bg-regulatory-cne1",
  pned: "bg-regulatory-pned",
  cne2: "bg-regulatory-cne2",
  eca: "bg-regulatory-eca",
  lei15100: "bg-regulatory-cne2",
};

/**
 * Faixa de marcos regulatórios (abaixo do hero).
 * Dots coloridos + labels curtos. Linha horizontal com wrap em mobile.
 */
export function RegulatoryBar() {
  return (
    <div className="bg-navy-900">
      <Container className="flex flex-wrap items-center gap-4 py-3.5 md:gap-4 md:py-[14px]">
        <span className="font-body text-[9.5px] font-medium uppercase tracking-regulatory text-white/25">
          Aderência normativa
        </span>
        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          {regulatoryTags.map((tag) => (
            <span
              key={tag.key}
              className="inline-flex items-center gap-1.5 rounded-pill border border-white/10 px-3 py-1"
            >
              <span
                aria-hidden
                className={`inline-block h-[5px] w-[5px] shrink-0 rounded-full ${
                  DOT_COLOR[tag.key] ?? "bg-white/40"
                }`}
              />
              <span className="font-body text-[11px] font-medium text-white/50">
                {tag.short ?? tag.label}
              </span>
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
