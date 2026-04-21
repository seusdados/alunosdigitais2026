import Image from "next/image";
import Link from "next/link";

import { curriculumYears } from "@/data/curriculo";
import type { CurriculumStage } from "@/types/content";

/**
 * CurriculumRoadBlock — jornada pedagógica do 1º ao 9º ano.
 *
 * Ilustração central domina (52% da largura do canvas); cards laterais
 * ficam próximos à borda da ilustração (56% do lado oposto). Conectores
 * SVG curvos ligam cada ponto da estrada ao respectivo card, e números
 * (1-9) em círculos com glow são sobrepostos nos pontos luminosos da
 * ilustração. Pulse luminoso nos dots em cascata por ano.
 *
 * Layout é desktop-only (≥ lg). Em viewports menores, stack vertical
 * simplificado: ilustração reduzida + lista dos 9 anos.
 */

// Posições (top%) de cada ponto da trilha na ilustração illo-06-estrada-central.jpg.
// Calibradas visualmente contra a imagem — ajustar aqui se a ilustração mudar.
const ROAD_POINTS: Array<{ year: number; top: number; side: "left" | "right" }> = [
  { year: 1, top: 12, side: "left" },
  { year: 2, top: 22, side: "right" },
  { year: 3, top: 32, side: "left" },
  { year: 4, top: 42, side: "right" },
  { year: 5, top: 52, side: "left" },
  { year: 6, top: 62, side: "right" },
  { year: 7, top: 72, side: "left" },
  { year: 8, top: 82, side: "right" },
  { year: 9, top: 92, side: "left" },
];

export function CurriculumRoadBlock() {
  return (
    <section className="relative overflow-hidden bg-navy-800 text-white">
      {/* Header */}
      <div className="relative z-10 px-8 pb-6 pt-20 text-center lg:px-12 lg:pt-24">
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

      {/* Desktop canvas — ilustração dominante + cards absolutos + conectores SVG */}
      <div className="relative mx-auto hidden w-full max-w-[1100px] px-10 pb-10 pt-6 lg:block">
        {/* Label F1 flutuante (topo) */}
        <div className="absolute left-10 right-10 top-4 z-[5] flex justify-center">
          <span className="rounded-pill border border-teal-400/25 bg-teal-400/[0.12] px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-teal-300">
            Anos iniciais · 1º ao 5º
          </span>
        </div>

        {/* Label F2 flutuante (meio) */}
        <div className="absolute left-10 right-10 top-[58%] z-[5] flex justify-center">
          <span className="rounded-pill border border-navy-500/40 bg-navy-600/40 px-3.5 py-1.5 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-white/60">
            Anos finais · 6º ao 9º
          </span>
        </div>

        {/* Canvas com aspect-ratio da ilustração */}
        <div className="relative mx-auto aspect-[692/1400] w-full">
          {/* Ilustração central */}
          <div className="absolute left-1/2 top-0 z-[2] h-full w-[52%] -translate-x-1/2">
            <Image
              src="/brand/ilustracoes/illo-06-estrada-central.jpg"
              alt="Jornada curricular do 1º ao 9º ano — estrada pedagógica contínua"
              fill
              sizes="(max-width: 1024px) 80vw, 572px"
              className="object-cover object-top"
              loading="lazy"
            />
          </div>

          {/* Conectores SVG — curvas tracejadas do ponto da trilha ao card */}
          <svg
            className="pointer-events-none absolute inset-0 z-[3] h-full w-full"
            viewBox="0 0 1000 2000"
            preserveAspectRatio="none"
            aria-hidden
          >
            {ROAD_POINTS.map((point) => {
              const isF2 = point.year >= 6;
              const color = isF2 ? "rgba(42,79,122,0.6)" : "rgba(0,184,134,0.55)";
              const dotColor = isF2 ? "#2A4F7A" : "#00B886";
              const pointX = 500; // centro
              const pointY = point.top * 20; // top% → viewBox y (0-2000)
              const cardX = point.side === "left" ? 220 : 780;
              const midX = (pointX + cardX) / 2;
              return (
                <g key={point.year}>
                  <path
                    d={`M ${pointX} ${pointY} Q ${midX} ${pointY}, ${cardX} ${pointY}`}
                    stroke={color}
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 3"
                  />
                  <circle cx={cardX} cy={pointY} r="3" fill={dotColor} />
                </g>
              );
            })}
          </svg>

          {/* Números sobrepostos nos pontos da trilha (1-9) */}
          {ROAD_POINTS.map((point) => {
            const isF2 = point.year >= 6;
            return (
              <div
                key={`num-${point.year}`}
                aria-hidden
                className={`absolute left-1/2 z-[4] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white/30 font-display text-[14px] font-bold text-white shadow-[0_0_16px_rgba(0,184,134,0.55)] ${
                  isF2
                    ? "bg-gradient-to-br from-navy-500 to-navy-700 shadow-[0_0_16px_rgba(42,79,122,0.6)]"
                    : "bg-gradient-to-br from-teal-400 to-teal-600 shadow-[0_0_16px_rgba(0,184,134,0.55)]"
                }`}
                style={{ top: `${point.top}%` }}
              >
                {point.year}
              </div>
            );
          })}

          {/* Cards laterais próximos à ilustração */}
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

      {/* Mobile fallback — stack vertical simplificado */}
      <div className="px-8 pb-16 pt-6 lg:hidden">
        <div className="mb-8 flex justify-center">
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
                className={`rounded-[14px] border p-5 backdrop-blur-[10px] ${
                  isF2 ? "border-navy-500/40 bg-navy-700/40" : "border-white/15 bg-white/[0.06]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-display text-[15px] font-bold text-white ${
                      isF2
                        ? "bg-gradient-to-br from-navy-500 to-navy-700"
                        : "bg-gradient-to-br from-teal-400 to-teal-600"
                    }`}
                  >
                    {y.year}
                  </span>
                  <div>
                    <p className="font-display text-[15px] font-semibold leading-[1.3] text-white">
                      {y.theme}
                    </p>
                    <p className="mt-2 font-body text-[12.5px] leading-[1.55] text-white/55">
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
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-5 px-8 pb-20 pt-6 lg:px-12 lg:pb-24">
        <span className="font-display text-[14px] italic text-white/35">
          Identidade → Ética → Informação → Segurança → Protagonismo digital
        </span>
        <Link
          href="/curriculo"
          className="inline-flex items-center gap-2 rounded-btn border border-teal-400/35 px-6 py-3 font-body text-[15px] font-medium text-teal-300 transition-colors hover:bg-teal-400/10"
        >
          Explorar o currículo completo
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
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
      className="absolute z-[6] w-[200px]"
      style={{
        top: `${top}%`,
        transform: "translateY(-50%)",
        [side === "left" ? "right" : "left"]: "56%",
      }}
    >
      <div
        className={`relative rounded-[12px] px-4 py-3.5 backdrop-blur-[10px] ${
          isDark
            ? "border border-navy-500/40 bg-navy-700/85 shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
            : "border border-white/20 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
        }`}
      >
        <p
          className={`font-display text-[14px] font-semibold leading-[1.25] tracking-[-0.01em] ${
            isDark ? "text-white/92" : "text-site-text"
          }`}
        >
          {theme}
        </p>
        <p
          className={`mt-1.5 font-body text-[11.5px] leading-[1.55] ${
            isDark ? "text-white/45" : "text-site-text-light"
          }`}
        >
          {topics}
        </p>
      </div>
    </div>
  );
}
