"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { logAudit } from "@/lib/audit";
import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import { extractPlainText } from "@/lib/editor/plain-text";
import { slugify } from "@/lib/format";

const CONTENT_TYPES = [
  "page",
  "landing_page",
  "article",
  "resource",
  "case_study",
  "faq",
  "legal_page",
  "curriculum_unit",
] as const;

const STATUSES = ["draft", "in_review", "scheduled", "published", "archived"] as const;

const schema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(1, "Informe o título."),
  subtitle: z.string().trim().max(200).optional().default(""),
  excerpt: z.string().trim().max(500).optional().default(""),
  type: z.enum(CONTENT_TYPES, { message: "Tipo inválido." }),
  slug: z.string().trim().min(1, "Informe o slug."),
  path: z.string().trim().min(1, "Informe o path.").startsWith("/", "Path deve começar com /"),
  seo_title: z.string().trim().max(70).optional().default(""),
  seo_description: z.string().trim().max(180).optional().default(""),
  canonical_url: z
    .string()
    .trim()
    .optional()
    .default("")
    .refine((v) => !v || /^https?:\/\//.test(v), { message: "URL inválida." }),
  noindex: z.coerce.boolean().optional().default(false),
  nofollow: z.coerce.boolean().optional().default(false),
  status: z.enum(STATUSES).default("draft"),
  published_at: z.string().trim().optional().default(""),
  body_json: z.string().min(2, "Conteúdo vazio."),
  body_html: z.string().optional().default(""),
  body_text: z.string().optional().default(""),
});

export type ContentFormState =
  | { status: "idle" }
  | {
      status: "error";
      error?: string;
      fieldErrors?: Record<string, string>;
    };

export async function saveContentItem(
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const ctx = await requireAdmin();
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse({
    ...raw,
    noindex: formData.get("noindex") === "on",
    nofollow: formData.get("nofollow") === "on",
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { status: "error", fieldErrors };
  }

  let bodyJson: unknown;
  try {
    bodyJson = JSON.parse(parsed.data.body_json);
  } catch {
    return { status: "error", error: "Corpo do conteúdo em formato inválido." };
  }

  const plainText =
    parsed.data.body_text && parsed.data.body_text.trim().length > 0
      ? parsed.data.body_text.trim()
      : extractPlainText(bodyJson as never);

  const supabase = await createClient();

  const publishedAt =
    parsed.data.published_at && parsed.data.published_at.trim().length > 0
      ? new Date(parsed.data.published_at).toISOString()
      : parsed.data.status === "published"
        ? new Date().toISOString()
        : null;

  const slug = slugify(parsed.data.slug);
  const path = parsed.data.path.startsWith("/") ? parsed.data.path : `/${parsed.data.path}`;

  const baseFields = {
    title: parsed.data.title,
    subtitle: parsed.data.subtitle || null,
    excerpt: parsed.data.excerpt || null,
    type: parsed.data.type,
    slug,
    path,
    seo_title: parsed.data.seo_title || null,
    seo_description: parsed.data.seo_description || null,
    canonical_url: parsed.data.canonical_url || null,
    noindex: parsed.data.noindex,
    nofollow: parsed.data.nofollow,
    status: parsed.data.status,
    published_at: publishedAt,
    search_text: plainText.slice(0, 4000),
    author_user_id: ctx.user.id,
    owner_user_id: ctx.user.id,
  } as const;

  let contentId = parsed.data.id;

  if (contentId) {
    // Update + increment version_number
    const { data: current, error: currentErr } = await supabase
      .from("content_items")
      .select("current_version_number, first_published_at")
      .eq("id", contentId)
      .maybeSingle<{ current_version_number: number; first_published_at: string | null }>();
    if (currentErr) return { status: "error", error: currentErr.message };

    const nextVersion = (current?.current_version_number ?? 0) + 1;
    const firstPublishedAt =
      current?.first_published_at ??
      (parsed.data.status === "published" ? (publishedAt ?? new Date().toISOString()) : null);

    const { error: updErr } = await supabase
      .from("content_items")
      .update({
        ...baseFields,
        current_version_number: nextVersion,
        published_version_number: parsed.data.status === "published" ? nextVersion : null,
        first_published_at: firstPublishedAt,
      })
      .eq("id", contentId);
    if (updErr) return { status: "error", error: updErr.message };

    const { error: revErr } = await supabase.from("content_revisions").insert({
      content_item_id: contentId,
      version_number: nextVersion,
      editor_json: bodyJson as never,
      render_html: parsed.data.body_html || null,
      plain_text: plainText || null,
      created_by: ctx.user.id,
    });
    if (revErr) return { status: "error", error: revErr.message };
  } else {
    // Insert new + first revision
    const { data: inserted, error: insErr } = await supabase
      .from("content_items")
      .insert({
        ...baseFields,
        current_version_number: 1,
        published_version_number: parsed.data.status === "published" ? 1 : null,
        first_published_at: parsed.data.status === "published" ? publishedAt : null,
      })
      .select("id")
      .single<{ id: string }>();
    if (insErr || !inserted)
      return { status: "error", error: insErr?.message ?? "Falha ao criar." };

    const { error: revErr } = await supabase.from("content_revisions").insert({
      content_item_id: inserted.id,
      version_number: 1,
      editor_json: bodyJson as never,
      render_html: parsed.data.body_html || null,
      plain_text: plainText || null,
      created_by: ctx.user.id,
    });
    if (revErr) return { status: "error", error: revErr.message };

    contentId = inserted.id;
  }

  await logAudit(parsed.data.id ? "content.update" : "content.create", "content_items", {
    entityId: contentId,
    actorUserId: ctx.user.id,
    metadata: { status: parsed.data.status, type: parsed.data.type, title: parsed.data.title },
  });

  revalidatePath("/admin/conteudos");
  revalidatePath(`/admin/conteudos/${contentId}`);
  redirect(`/admin/conteudos/${contentId}?saved=1`);
}

export async function deleteContentItem(id: string) {
  const ctx = await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  await logAudit("content.delete", "content_items", {
    entityId: id,
    actorUserId: ctx.user.id,
  });
  revalidatePath("/admin/conteudos");
  redirect("/admin/conteudos");
}
