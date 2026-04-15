import { cn } from "@/lib/utils";
import type { ContentStatus, LeadStatus } from "@/lib/db/types";

const CONTENT_STATUS_LABEL: Record<ContentStatus, string> = {
  draft: "Rascunho",
  in_review: "Em revisão",
  scheduled: "Agendado",
  published: "Publicado",
  archived: "Arquivado",
};

const CONTENT_STATUS_STYLE: Record<ContentStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  in_review: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  scheduled: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  published: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  archived: "bg-muted text-muted-foreground line-through",
};

const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  new: "Novo",
  qualified: "Qualificado",
  contacted: "Contatado",
  won: "Ganho",
  lost: "Perdido",
  spam: "Spam",
};

const LEAD_STATUS_STYLE: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-200",
  qualified: "bg-emerald-100 text-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-200",
  contacted: "bg-amber-100 text-amber-900 dark:bg-amber-900/30 dark:text-amber-200",
  won: "bg-emerald-200 text-emerald-900 dark:bg-emerald-900/50 dark:text-emerald-100",
  lost: "bg-muted text-muted-foreground",
  spam: "bg-destructive/10 text-destructive",
};

const BASE = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";

export function ContentStatusBadge({ status }: { status: ContentStatus }) {
  return (
    <span className={cn(BASE, CONTENT_STATUS_STYLE[status])}>{CONTENT_STATUS_LABEL[status]}</span>
  );
}

export function LeadStatusBadge({ status }: { status: LeadStatus }) {
  return <span className={cn(BASE, LEAD_STATUS_STYLE[status])}>{LEAD_STATUS_LABEL[status]}</span>;
}
