"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { slugify } from "@/lib/format";

import { ContentEditor, type EditorHandle } from "./content-editor";
import type { ContentFormState } from "../actions";
import { saveContentItem } from "../actions";

const initialState: ContentFormState = { status: "idle" };

export type ContentFormDefaults = {
  id?: string;
  title: string;
  slug: string;
  path: string;
  type: string;
  excerpt: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  canonicalUrl: string;
  noindex: boolean;
  nofollow: boolean;
  status: string;
  publishedAt: string;
  bodyJson: unknown;
};

const CONTENT_TYPES: Array<{ value: string; label: string }> = [
  { value: "article", label: "Artigo" },
  { value: "page", label: "Página" },
  { value: "landing_page", label: "Landing page" },
  { value: "resource", label: "Material/recurso" },
  { value: "case_study", label: "Case" },
  { value: "faq", label: "FAQ" },
  { value: "legal_page", label: "Página legal" },
  { value: "curriculum_unit", label: "Unidade curricular" },
];

const STATUSES: Array<{ value: string; label: string }> = [
  { value: "draft", label: "Rascunho" },
  { value: "in_review", label: "Em revisão" },
  { value: "scheduled", label: "Agendado" },
  { value: "published", label: "Publicado" },
  { value: "archived", label: "Arquivado" },
];

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Salvando…" : "Salvar"}
    </Button>
  );
}

export function ContentForm({ defaults }: { defaults: ContentFormDefaults }) {
  const [state, formAction] = useActionState(saveContentItem, initialState);
  const [title, setTitle] = useState(defaults.title);
  const [slug, setSlug] = useState(defaults.slug);
  const slugTouched = useRef(defaults.slug !== "" && defaults.slug !== slugify(defaults.title));
  const editorRef = useRef<EditorHandle | null>(null);

  const [bodyJsonStr, setBodyJsonStr] = useState(
    JSON.stringify(defaults.bodyJson ?? { type: "doc", content: [] }),
  );
  const [bodyHtmlStr, setBodyHtmlStr] = useState("");
  const [bodyTextStr, setBodyTextStr] = useState("");

  useEffect(() => {
    if (!slugTouched.current) setSlug(slugify(title));
  }, [title]);

  const onEditorChange = ({
    json,
    html,
    text,
  }: {
    json: unknown;
    html: string;
    text: string;
  }) => {
    setBodyJsonStr(JSON.stringify(json));
    setBodyHtmlStr(html);
    setBodyTextStr(text);
  };

  const fieldError = (k: string) =>
    state.status === "error" ? state.fieldErrors?.[k] : undefined;

  return (
    <form action={formAction} className="space-y-8">
      {defaults.id && <input type="hidden" name="id" value={defaults.id} />}
      <input type="hidden" name="body_json" value={bodyJsonStr} />
      <input type="hidden" name="body_html" value={bodyHtmlStr} />
      <input type="hidden" name="body_text" value={bodyTextStr} />

      {state.status === "error" && state.error && (
        <div
          role="alert"
          className="rounded-md border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Field label="Título" error={fieldError("title")}>
            <Input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Dê um título descritivo"
            />
          </Field>

          <Field label="Subtítulo" error={fieldError("subtitle")}>
            <Input name="subtitle" defaultValue={defaults.subtitle} />
          </Field>

          <Field label="Resumo / excerpt" error={fieldError("excerpt")}>
            <textarea
              name="excerpt"
              defaultValue={defaults.excerpt}
              rows={3}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </Field>

          <Field label="Conteúdo" error={fieldError("body_json")}>
            <ContentEditor
              initialContent={defaults.bodyJson}
              placeholder="Comece a escrever…"
              onChange={onEditorChange}
              editorRef={editorRef}
            />
          </Field>

          <fieldset className="space-y-4 rounded-md border p-4">
            <legend className="px-1 text-sm font-semibold">SEO</legend>
            <Field label="Title (meta)" error={fieldError("seo_title")}>
              <Input name="seo_title" defaultValue={defaults.seoTitle} maxLength={70} />
            </Field>
            <Field label="Description (meta)" error={fieldError("seo_description")}>
              <textarea
                name="seo_description"
                defaultValue={defaults.seoDescription}
                rows={2}
                maxLength={180}
                className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </Field>
            <Field label="Canonical URL" error={fieldError("canonical_url")}>
              <Input name="canonical_url" defaultValue={defaults.canonicalUrl} type="url" />
            </Field>
            <div className="flex gap-6 text-sm">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="noindex" defaultChecked={defaults.noindex} /> noindex
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="nofollow" defaultChecked={defaults.nofollow} /> nofollow
              </label>
            </div>
          </fieldset>
        </div>

        <aside className="space-y-4">
          <div className="space-y-4 rounded-md border p-4">
            <h3 className="text-sm font-semibold">Publicação</h3>
            <Field label="Status" error={fieldError("status")}>
              <select
                name="status"
                defaultValue={defaults.status}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Publicado em" error={fieldError("published_at")}>
              <Input
                name="published_at"
                type="datetime-local"
                defaultValue={defaults.publishedAt}
              />
            </Field>
          </div>

          <div className="space-y-4 rounded-md border p-4">
            <h3 className="text-sm font-semibold">Metadados</h3>
            <Field label="Tipo" error={fieldError("type")}>
              <select
                name="type"
                defaultValue={defaults.type}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {CONTENT_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Slug" error={fieldError("slug")} hint="Usado na URL pública.">
              <Input
                name="slug"
                value={slug}
                onChange={(e) => {
                  slugTouched.current = true;
                  setSlug(slugify(e.target.value));
                }}
                required
              />
            </Field>
            <Field label="Path" error={fieldError("path")} hint="URL relativa. Ex.: /conteudos/meu-artigo">
              <Input name="path" defaultValue={defaults.path} required />
            </Field>
          </div>

          <div className="flex items-center justify-between gap-3">
            <Link
              href="/admin/conteudos"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </Link>
            <SubmitButton />
          </div>
        </aside>
      </div>
    </form>
  );
}

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium">{label}</label>
      {children}
      {hint && !error && <p className="text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
