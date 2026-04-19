import Image from "next/image";

import { Container } from "@/components/site/container";
import { SectionEyebrow } from "@/components/site/section-eyebrow";
import { SiteButton } from "@/components/site/site-button";
import { curriculumYears } from "@/data/curriculo";
import { cn } from "@/lib/utils";
import type { CurriculumYear } from "@/types/content";

const ORDINALS = ["", "1º", "2º", "3º", "4º", "5º", "6º", "7º", "8º", "9º"];

/**
 * CurriculumRoadBlock — os 9 anos curriculares organizados ao redor de uma
 * ilustração central (a "estrada" vertical da jornada do 1º ao 9º ano).
 *
 * Desktop (≥ md): grid 3 colunas.
 *   - Esquerda: anos ímpares (1, 3, 5, 7, 9)
 *   - Centro: ilustração vertical com mask-fade-vertical
 *   - Direita: anos pares (2, 4, 6, 8)
 *   Connectors horizontais + dots luminosos conectam cada card à estrada.
 *
 * Mobile: stack vertical — ilustração compacta no topo seguida da lista dos
 * 9 anos em ordem cronológica.
 *
 * Variantes visuais:
 *   - F1 (anos 1-5): card glass branco, badge/connector/dot em teal
 *   - F2 (anos 6-9): card glass navy escuro, badge/connector/dot em navy
 */
export function CurriculumRoadBlock() {
  const oddYears = curriculumYears.filter((y) => y.year % 2 === 1);
  const evenYears = curriculumYears.filter((y) => y.year % 2 === 0);

  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      <Container className="relative py-20 md:py-[112px]">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-[720px] text-center md:mb-20">
          <SectionEyebrow className="inline-flex justify-center text-teal-300">
            Currículo
          </SectionEyebrow>
          <h2 className="mt-3 font-display text-[28px] font-bold leading-[1.1] tracking-tightest text-white md:text-[40px]">
            Do 1º ao 9º ano, com progressão pedagógica real
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] font-body text-[15.5px] font-light leading-[1.72] text-white/60">
            Nos anos iniciais, a criança constrói identidade, convivência, empatia e navegação
            segura. Nos anos finais, o estudante aprofunda pensamento crítico, segurança digital
            avançada, inteligência artificial e protagonismo.
          </p>
        </div>

        {/* Road grid (desktop) */}
        <div className="relative hidden md:block">
          <div className="grid grid-cols-[1fr_300px_1fr] items-start gap-0 lg:grid-cols-[1fr_360px_1fr]">
            {/* LEFT — anos ímpares */}
            <ul className="relative flex flex-col gap-10 pr-14">
              <StageBadge stage="fundamental-1" className="mb-2" />
              {oddYears.map((y) => (
                <li key={y.slug}>
                  <YearCard year={y} side="left" />
                </li>
              ))}
            </ul>

            {/* CENTER — ilustração */}
            <div className="relative">
              <Image
                src="/brand/ilustracoes/illo-06-progressao.jpg"
                alt="Jornada curricular do 1º ao 9º ano — estrada pedagógica contínua"
                width={720}
                height={1680}
                priority
                sizes="(max-width: 1024px) 300px, 360px"
                className="mask-fade-vertical h-auto w-full object-cover opacity-95"
              />
            </div>

            {/* RIGHT — anos pares (começa com offset pra simular estrada sinuosa) */}
            <ul className="relative flex flex-col gap-10 pl-14 pt-24">
              {evenYears.map((y) => (
                <li key={y.slug}>
                  <YearCard year={y} side="right" />
                </li>
              ))}
            </ul>
          </div>

          {/* Badge "Anos finais" flutuante próxima ao ano 7 (segundo na direita) */}
          <div className="pointer-events-none absolute left-0 top-[62%]">
            <StageBadge stage="fundamental-2" />
          </div>
        </div>

        {/* Mobile: stack vertical */}
        <div className="block md:hidden">
          <div className="mb-8 flex justify-center">
            <Image
              src="/brand/ilustracoes/illo-06-progressao.jpg"
              alt="Jornada curricular do 1º ao 9º ano"
              width={720}
              height={1680}
              sizes="100vw"
              className="mask-fade-vertical h-auto w-[220px] opacity-90"
            />
          </div>
          <ul className="space-y-6">
            <li>
              <StageBadge stage="fundamental-1" />
            </li>
            {curriculumYears
              .filter((y) => y.stage === "fundamental-1")
              .map((y) => (
                <li key={y.slug}>
                  <YearCard year={y} side="left" />
                </li>
              ))}
            <li className="pt-2">
              <StageBadge stage="fundamental-2" />
            </li>
            {curriculumYears
              .filter((y) => y.stage === "fundamental-2")
              .map((y) => (
                <li key={y.slug}>
                  <YearCard year={y} side="left" />
                </li>
              ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="mx-auto mt-20 max-w-[640px] text-center md:mt-24">
          <p className="mx-auto max-w-[560px] font-display text-[17px] italic leading-[1.55] text-white/70 md:text-[19px]">
            Cada ano é uma etapa de uma jornada contínua — do acolhimento infantil ao protagonismo
            digital da juventude.
          </p>
          <div className="mt-8 flex justify-center">
            <SiteButton href="/curriculo" variant="primary">
              Explorar o currículo completo
            </SiteButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function StageBadge({
  stage,
  className,
}: {
  stage: "fundamental-1" | "fundamental-2";
  className?: string;
}) {
  const isF2 = stage === "fundamental-2";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-pill px-3 py-1.5",
        isF2
          ? "border border-navy-500/60 bg-navy-600/30 text-white/80"
          : "border border-teal-400/30 bg-teal-500/[0.08] text-teal-300",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn("h-[6px] w-[6px] rounded-full", isF2 ? "bg-navy-400" : "bg-teal-300")}
      />
      <span className="font-body text-[10.5px] font-medium uppercase tracking-eyebrow">
        {isF2 ? "Anos finais · 6º ao 9º" : "Anos iniciais · 1º ao 5º"}
      </span>
    </span>
  );
}

function YearCard({ year, side }: { year: CurriculumYear; side: "left" | "right" }) {
  const isF2 = year.stage === "fundamental-2";
  const label = ORDINALS[year.year];

  return (
    <div
      className={cn(
        "relative rounded-[14px] border p-5 backdrop-blur-[10px] transition-all md:p-6",
        isF2
          ? "border-navy-500/40 bg-navy-700/40 hover:border-navy-500/70"
          : "border-white/15 bg-white/[0.06] hover:border-white/30",
      )}
    >
      {/* Connector horizontal + dot apontando para a ilustração central (desktop only) */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden h-px -translate-y-1/2 md:block",
          side === "left" ? "left-full w-[56px]" : "right-full w-[56px]",
          isF2 ? "bg-navy-500/60" : "bg-teal-400/60",
        )}
      />
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 hidden h-2 w-2 -translate-y-1/2 rounded-full md:block",
          side === "left"
            ? "left-[calc(100%+52px)] translate-x-0"
            : "right-[calc(100%+52px)] translate-x-0",
          isF2
            ? "bg-navy-400 shadow-[0_0_10px_rgba(42,79,122,0.85)]"
            : "bg-teal-300 shadow-[0_0_10px_rgba(43,217,165,0.85)]",
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <span
          className={cn(
            "inline-flex h-8 items-center rounded-pill px-3 font-display text-[13px] font-bold tracking-tight",
            isF2 ? "bg-navy-500/30 text-white" : "bg-teal-400/15 text-teal-300",
          )}
        >
          {label} ano
        </span>
      </div>
      <p className="mt-4 font-display text-[15.5px] font-semibold leading-snug text-white">
        {year.theme}
      </p>
      <ul className="mt-3 space-y-1">
        {year.topics.slice(0, 3).map((topic, idx) => (
          <li key={idx} className="font-body text-[12px] leading-[1.5] text-white/55">
            {topic}
          </li>
        ))}
      </ul>
    </div>
  );
}
