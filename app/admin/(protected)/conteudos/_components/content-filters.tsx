"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Input } from "@/components/ui/input";

const STATUSES = [
  { value: "", label: "Todos os status" },
  { value: "draft", label: "Rascunho" },
  { value: "in_review", label: "Em revisão" },
  { value: "scheduled", label: "Agendado" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Arquivado" },
];

const TYPES = [
  { value: "", label: "Todos os tipos" },
  { value: "article", label: "Artigo" },
  { value: "page", label: "Página" },
  { value: "landing_page", label: "Landing page" },
  { value: "resource", label: "Material/recurso" },
  { value: "case_study", label: "Case" },
  { value: "faq", label: "FAQ" },
  { value: "legal_page", label: "Página legal" },
  { value: "curriculum_unit", label: "Unidade curricular" },
];

export function ContentFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    startTransition(() => router.replace(`${pathname}?${next.toString()}`));
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Input
        placeholder="Buscar por título…"
        defaultValue={params.get("q") ?? ""}
        onChange={(e) => setParam("q", e.target.value)}
        className="max-w-xs"
      />
      <select
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        defaultValue={params.get("status") ?? ""}
        onChange={(e) => setParam("status", e.target.value)}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
      <select
        className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        defaultValue={params.get("type") ?? ""}
        onChange={(e) => setParam("type", e.target.value)}
      >
        {TYPES.map((t) => (
          <option key={t.value} value={t.value}>
            {t.label}
          </option>
        ))}
      </select>
      {pending && <span className="text-xs text-muted-foreground">Filtrando…</span>}
    </div>
  );
}
