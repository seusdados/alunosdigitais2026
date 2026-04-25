import Link from "next/link";
import { notFound } from "next/navigation";

import { getContentItem, getLatestRevision } from "@/lib/db/queries/content";
import { formatDateTime } from "@/lib/format";

import { StatusBadge } from "../../_components/status-badge";
import { ContentForm, type ContentFormDefaults } from "../_components/content-form";
import { DeleteContentButton } from "./delete-button";

type Search = Promise<{ saved?: string }>;

function toLocalInput(value: string | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`;
}

export default async function EditContentPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Search;
}) {
  const { id } = await params;
  const { saved } = await searchParams;
  const item = await getContentItem(id);
  if (!item) notFound();
  const revision = await getLatestRevision(id);

  const defaults: ContentFormDefaults = {
    id: item.id,
    title: item.title,
    slug: item.slug,
    path: item.path,
    type: item.type,
    subtitle: item.subtitle ?? "",
    excerpt: item.excerpt ?? "",
    seoTitle: item.seo_title ?? "",
    seoDescription: item.seo_description ?? "",
    canonicalUrl: item.canonical_url ?? "",
    noindex: item.noindex,
    nofollow: item.nofollow,
    status: item.status,
    publishedAt: toLocalInput(item.published_at),
    bodyJson: revision?.editor_json ?? { type: "doc", content: [] },
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold tracking-tight">{item.title}</h1>
            <StatusBadge kind="content" status={item.status} />
          </div>
          <p className="text-sm text-muted-foreground">
            v{item.current_version_number} · atualizado {formatDateTime(item.updated_at)}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/conteudos"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Voltar
          </Link>
          <DeleteContentButton id={item.id} />
        </div>
      </header>

      {saved === "1" && (
        <div
          role="status"
          className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800"
        >
          Alterações salvas — nova revisão criada (v{item.current_version_number}).
        </div>
      )}

      <ContentForm defaults={defaults} />
    </div>
  );
}
