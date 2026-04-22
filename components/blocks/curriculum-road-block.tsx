import Image from "next/image";
import Link from "next/link";

import { curriculumYears } from "@/data/curriculo";
import type { CurriculumStage } from "@/types/content";

/**
 * CurriculumRoadBlock — jornada do 1º ao 9º ano.
 *
 * Layout (≥ lg): ilustração central estreita (~28%) com os 9 pontos da
 * trilha. Cards laterais largos (360px) com tipografia igual ao corpo
 * dos outros blocos (tema 22px Fraunces, tópicos 18px DM Sans).
 * Conectores SVG tracejados longos cruzam o espaço entre o ponto da
 * trilha e a borda do card, aproveitando a largura da página.
 *
 * Mobile (< lg): stack vertical com ilustração compacta + lista dos
 * 9 anos (cards com círculo numerado à esquerda).
 */

// Posições (top%) dos stops da trilha na ilustração illo-06-estrada-central.jpg.
// Lado alterna para distribuir os cards nas duas colunas laterais.
const ROAD_POINTS: Array<{ year: number; top: number; side: "left" | "right" }> = [
  { year: 1, top: 11, side: "left" },
  { year: 2, top: 22, side: "right" },
  { year: 3, top: 33, side: "left" },
  { year: 4, top: 44, side: "right" },
  { year: 5, top: 55, side: "left" },
  { year: 6, top: 66, side: "right" },
  { year: 7, top: 76, side: "left" },
  { year: 8, top: 86, side: "right" },
  { year: 9, top: 94, side: "left" },
];

export function CurriculumRoadBlock() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Header */}
      <div className="relative z-10 px-8 pb-12 pt-20 text-center lg:px-12 lg:pt-24">
        <p className="font-body text-[16px] font-medium uppercase tracking-[0.14em] text-teal-300">
          Currículo
        </p>
        <h2 className="mx-auto mt-5 max-w-4xl font-display text-[48px] font-bold leading-[1.05] tracking-[-0.035em] text-white lg:text-[68px]">
          Do 1º ao 9º ano, com progressão pedagógica real
        </h2>
        <p className="mx-auto mt-6 max-w-3xl font-body text-[20px] font-light leading-[1.72] text-white/55 lg:text-[22px]">
          Cada ano amplia o repertório do estudante. Uma jornada contínua de valores, ética,
          segurança, pensamento crítico e protagonismo digital.
        </p>
      </div>

      {/* Desktop canvas — ilustração estreita + cards largos + conectores longos */}
      <div className="relative mx-auto hidden w-full max-w-[1400px] px-12 pb-16 lg:block">
        {/* Labels de segmento (F1 no topo, F2 no meio) */}
        <div className="absolute left-12 right-12 top-2 z-[5] flex justify-center">
          <span className="rounded-pill border border-teal-400/25 bg-teal-400/[0.12] px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-teal-300">
            Anos iniciais · 1º ao 5º
          </span>
        </div>
        <div className="absolute left-12 right-12 top-[58%] z-[5] flex justify-center">
          <span className="rounded-pill border border-navy-500/40 bg-navy-600/40 px-4 py-2 font-body text-[12px] font-semibold uppercase tracking-[0.14em] text-white/65">
            Anos finais · 6º ao 9º
          </span>
        </div>

        {/* Canvas com aspect-ratio da ilustração (692×1400) */}
        <div className="relative mx-auto aspect-[692/1400] w-full">
          {/* Ilustração central estreita (28%) */}
          <div className="absolute left-1/2 top-0 z-[2] h-full w-[28%] -translate-x-1/2">
            <Image
              src="/brand/ilustracoes/illo-06-estrada-central.jpg"
              alt="Jornada curricular do 1º ao 9º ano — estrada pedagógica contínua"
              fill
              sizes="(max-width: 1024px) 80vw, 380px"
              className="object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* Conectores SVG — linhas tracejadas longas do ponto ao card */}
          <svg
            className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
            viewBox="0 0 1000 2000"
            preserveAspectRatio="none"
            aria-hidden
          >
            {ROAD_POINTS.map((point) => {
              const isF2 = point.year >= 6;
              const strokeColor = isF2 ? "rgba(42,79,122,0.6)" : "rgba(0,184,134,0.55)";
              const dotColor = isF2 ? "#2A4F7A" : "#00B886";
              const pointX = 500; // centro do canvas (trilha)
              const pointY = point.top * 20; // top% → viewBox y (0-2000)
              // Card edge ~ 30% / 70% do canvas (cards anchorados a right:70% / left:70%)
              const cardEdgeX = point.side === "left" ? 305 : 695;
              const midX = (pointX + cardEdgeX) / 2;
              return (
                <g key={point.year}>
                  <path
                    d={`M ${pointX} ${pointY} Q ${midX} ${pointY}, ${cardEdgeX} ${pointY}`}
                    stroke={strokeColor}
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="5 4"
                  />
                  <circle cx={cardEdgeX} cy={pointY} r="4" fill={dotColor} />
                </g>
              );
            })}
          </svg>

          {/* Números sobrepostos nos stops da trilha (1-9) */}
          {ROAD_POINTS.map((point) => {
            const isF2 = point.year >= 6;
            return (
              <div
                key={`num-${point.year}`}
                aria-hidden
                className={`absolute left-1/2 z-[4] flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/40 font-display text-[16px] font-bold text-white ${
                  isF2
                    ? "bg-gradient-to-br from-navy-500 to-navy-700 shadow-[0_0_20px_rgba(42,79,122,0.7)]"
                    : "bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_0_20px_rgba(0,184,134,0.6)]"
                }`}
                style={{ top: `${point.top}%` }}
              >
                {point.year}
              </div>
            );
          })}

          {/* Cards laterais largos (360px) com tipografia igual ao corpo */}
          {curriculumYears.map((y, i) => {
            const point = ROAD_POINTS[i];
            return (
              <YearCardAbsolute
                key={y.slug}
                theme={y.theme}
                topics={y.topics.slice(0, 3).join(" · ")}
                stage={y.stage}
                side={point.side}
                top={point.top}
              />
            );
          })}
        </div>
      </div>

      {/* Mobile fallback — stack vertical */}
      <div className="px-8 pb-16 lg:hidden">
        <div className="mb-10 flex justify-center">
          <Image
            src="/brand/ilustracoes/illo-06-estrada-central.jpg"
            alt="Jornada curricular do 1º ao 9º ano"
            width={720}
            height={1680}
            sizes="100vw"
            className="h-auto w-[220px] opacity-90 [mask-image:linear-gradient(to_bottom,transparent_0%,black_5%,black_92%,transparent_100%)]"
          />
        </div>
        <ul className="space-y-4">
          {curriculumYears.map((y) => {
            const isF2 = y.stage === "fundamental-2";
            return (
              <li
                key={y.slug}
                className={`rounded-[14px] border p-6 backdrop-blur-[10px] ${
                  isF2 ? "border-navy-500/40 bg-navy-700/40" : "border-white/15 bg-white/[0.06]"
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-[17px] font-bold text-white ${
                      isF2
                        ? "bg-gradient-to-br from-navy-500 to-navy-700"
                        : "bg-gradient-to-br from-teal-400 to-teal-600"
                    }`}
                  >
                    {y.year}
                  </span>
                  <div>
                    <p className="font-display text-[22px] font-semibold leading-[1.3] text-white">
                      {y.theme}
                    </p>
                    <p className="mt-2 font-body text-[17px] leading-[1.65] text-white/60">
                      {y.topics.slice(0, 3).join(" · ")}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-6 px-8 pb-20 pt-4 lg:px-12 lg:pb-24">
        <span className="font-display text-[18px] italic text-white/40">
          Identidade → Ética → Informação → Segurança → Protagonismo digital
        </span>
        <Link
          href="/curriculo"
          className="inline-flex items-center gap-2 rounded-btn border border-teal-400/35 px-7 py-[14px] font-body text-[16px] font-medium text-teal-300 transition-colors hover:bg-teal-400/10"
        >
          Explorar o currículo completo
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M3 7h8m-3.5-3.5L11 7l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}

function YearCardAbsolute({
  theme,
  topics,
  stage,
  side,
  top,
}: {
  theme: string;
  topics: string;
  stage: CurriculumStage;
  side: "left" | "right";
  top: number;
}) {
  const isDark = stage === "fundamental-2";
  return (
    <div
      className="absolute z-[6] w-[360px]"
      style={{
        top: `${top}%`,
        transform: "translateY(-50%)",
        [side === "left" ? "right" : "left"]: "70%",
      }}
    >
      <div
        className={`rounded-[14px] px-7 py-5 backdrop-blur-[12px] ${
          isDark
            ? "border border-navy-500/40 bg-navy-700/85 shadow-[0_8px_32px_rgba(0,0,0,0.32)]"
            : "border border-white/25 bg-white/95 shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
        }`}
      >
        <p
          className={`font-display text-[22px] font-semibold leading-[1.28] tracking-[-0.015em] ${
            isDark ? "text-white" : "text-site-text"
          }`}
        >
          {theme}
        </p>
        <p
          className={`mt-2.5 font-body text-[18px] leading-[1.55] ${
            isDark ? "text-white/55" : "text-site-text-mid"
          }`}
        >
          {topics}
        </p>
      </div>
    </div>
  );
}
