import Link from "next/link";

import { Button } from "@/components/ui/button";
import { listContentItems } from "@/lib/db/queries/content";
import type { ContentStatus, ContentType } from "@/lib/db/types";
import { formatDateTime } from "@/lib/format";

import { StatusBadge } from "../_components/status-badge";
import { ContentFilters } from "./_components/content-filters";

const CONTENT_TYPES: readonly ContentType[] = [
  "page",
  "landing_page",
  "article",
  "resource",
  "case_study",
  "faq",
  "legal_page",
  "curriculum_unit",
];

const CONTENT_STATUSES: readonly ContentStatus[] = [
  "draft",
  "in_review",
  "scheduled",
  "published",
  "archived",
];

const TYPE_LABELS: Record<ContentType, string> = {
  article: "Artigo",
  page: "Página",
  landing_page: "Landing",
  resource: "Material",
  case_study: "Case",
  faq: "FAQ",
  legal_page: "Legal",
  curriculum_unit: "Currículo",
};

function normalizeType(value: string | undefined): ContentType | undefined {
  return CONTENT_TYPES.find((t) => t === value);
}

function normalizeStatus(value: string | undefined): ContentStatus | undefined {
  return CONTENT_STATUSES.find((s) => s === value);
}

type Search = Promise<{ q?: string; status?: string; type?: string }>;

export default async function ContentListPage({ searchParams }: { searchParams: Search }) {
  const { q, status, type } = await searchParams;
  const items = await listContentItems({
    search: q,
    status: normalizeStatus(status),
    type: normalizeType(type),
    limit: 100,
  });

  return (
    <div className="space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Conteúdos</h1>
          <p className="text-sm text-muted-foreground">
            Gestão de páginas, artigos e materiais. Fluxo: rascunho → revisão → publicação.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/conteudos/novo">Novo conteúdo</Link>
        </Button>
      </header>

      <ContentFilters />

      <div className="overflow-x-auto rounded-md border bg-card">
        <table className="min-w-full divide-y text-sm">
          <thead className="bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-2 font-medium">Título</th>
              <th className="px-4 py-2 font-medium">Tipo</th>
              <th className="px-4 py-2 font-medium">Status</th>
              <th className="px-4 py-2 font-medium">Atualizado</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  Nenhum conteúdo encontrado.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30">
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/conteudos/${item.id}`}
                      className="font-medium hover:underline"
                    >
                      {item.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">{item.path}</p>
                  </td>
                  <td className="px-4 py-3">{TYPE_LABELS[item.type]}</td>
                  <td className="px-4 py-3">
                    <StatusBadge kind="content" status={item.status} />
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {formatDateTime(item.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/conteudos/${item.id}`}
                      className="text-xs font-medium text-muted-foreground hover:text-foreground"
                    >
                      Editar →
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
