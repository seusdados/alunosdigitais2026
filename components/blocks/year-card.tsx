import Link from "next/link";

import { cn } from "@/lib/utils";
import type { CurriculumYear } from "@/types/content";

const ORDINALS = [
  "",
  "1º ano",
  "2º ano",
  "3º ano",
  "4º ano",
  "5º ano",
  "6º ano",
  "7º ano",
  "8º ano",
  "9º ano",
];

/**
 * YearCard — card compacto para cada ano curricular (1º ao 9º).
 *
 * Duas variantes visuais automáticas:
 *  - Fundamental I (anos 1-5): card branco, cor institucional principal
 *  - Fundamental II (anos 6-9): borda lateral navy-500 (ritmo visual diferente)
 */
export function YearCard({ year }: { year: CurriculumYear }) {
  const isF2 = year.stage === "fundamental-2";
  const href = `/curriculo/${year.slug}`;
  const label = ORDINALS[year.year];

  return (
    <Link
      href={href}
      className={cn(
        "group flex flex-col gap-3 rounded-[10px] border bg-white p-5 transition-all hover:border-teal-400 hover:shadow-[0_0_0_3px_rgba(43,217,165,0.06)]",
        isF2
          ? "rounded-l-none border-l-[3px] border-[#E8E8E8] border-l-navy-500"
          : "border-[#E8E8E8]",
      )}
    >
      <div className="flex items-baseline gap-2">
        <span
          className={cn(
            "font-display text-[22px] font-extrabold leading-none tracking-tightest",
            isF2 ? "text-navy-500" : "text-navy-700",
          )}
        >
          {label}
        </span>
      </div>

      <p
        className={cn(
          "font-body text-[12px] font-medium",
          isF2 ? "text-navy-500" : "text-teal-500",
        )}
      >
        {year.theme}
      </p>

      <ul className="mt-1 space-y-1">
        {year.topics.slice(0, 4).map((topic, idx) => (
          <li key={idx} className="font-body text-[11px] leading-[1.45] text-site-text-light">
            {topic}
          </li>
        ))}
      </ul>

      <span className="mt-auto inline-flex items-center gap-1 font-body text-[11.5px] font-medium text-teal-500 opacity-0 transition-opacity group-hover:opacity-100">
        Ver programa do ano →
      </span>
    </Link>
  );
}
