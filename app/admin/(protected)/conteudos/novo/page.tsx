import Link from "next/link";

import { ContentForm, type ContentFormDefaults } from "../_components/content-form";

const defaults: ContentFormDefaults = {
  title: "",
  slug: "",
  path: "",
  type: "article",
  subtitle: "",
  excerpt: "",
  seoTitle: "",
  seoDescription: "",
  canonicalUrl: "",
  noindex: false,
  nofollow: false,
  status: "draft",
  publishedAt: "",
  bodyJson: { type: "doc", content: [] },
};

export default function NewContentPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Novo conteúdo</h1>
          <p className="text-sm text-muted-foreground">
            Comece por título e corpo — o slug e o path podem ser ajustados depois.
          </p>
        </div>
        <Link
          href="/admin/conteudos"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Voltar
        </Link>
      </header>

      <ContentForm defaults={defaults} />
    </div>
  );
}
