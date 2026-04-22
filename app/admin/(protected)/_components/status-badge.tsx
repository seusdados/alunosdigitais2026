import { cn } from "@/lib/utils";
import type { ContentStatus, LeadStatus } from "@/lib/db/types";

const contentStyles: Record<ContentStatus, string> = {
  draft: "bg-slate-100 text-slate-700 ring-slate-200",
  in_review: "bg-amber-100 text-amber-700 ring-amber-200",
  scheduled: "bg-blue-100 text-blue-700 ring-blue-200",
  published: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  archived: "bg-zinc-100 text-zinc-600 ring-zinc-200",
};

const contentLabels: Record<ContentStatus, string> = {
  draft: "Rascunho",
  in_review: "Em revisão",
  scheduled: "Agendado",
  published: "Publicado",
  archived: "Arquivado",
};

const leadStyles: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700 ring-blue-200",
  qualified: "bg-emerald-100 text-emerald-700 ring-emerald-200",
  contacted: "bg-amber-100 text-amber-700 ring-amber-200",
  won: "bg-emerald-200 text-emerald-800 ring-emerald-300",
  lost: "bg-zinc-100 text-zinc-600 ring-zinc-200",
  spam: "bg-rose-100 text-rose-700 ring-rose-200",
};

const leadLabels: Record<LeadStatus, string> = {
  new: "Novo",
  qualified: "Qualificado",
  contacted: "Contatado",
  won: "Ganho",
  lost: "Perdido",
  spam: "Spam",
};

type Props =
  | { kind: "content"; status: ContentStatus; className?: string }
  | { kind: "lead"; status: LeadStatus; className?: string };

export function StatusBadge(props: Props) {
  const { kind, status, className } = props;
  const style = kind === "content" ? contentStyles[status] : leadStyles[status];
  const label = kind === "content" ? contentLabels[status] : leadLabels[status];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset",
        style,
        className,
      )}
    >
      {label}
    </span>
  );
}
