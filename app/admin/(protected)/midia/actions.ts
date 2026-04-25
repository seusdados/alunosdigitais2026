"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/db/admin";
import { slugify } from "@/lib/format";

const BUCKETS = ["site-public", "documents", "og-images", "cms-private"] as const;
type BucketName = (typeof BUCKETS)[number];

export type MediaUploadState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "success"; assetId: string };

const uploadSchema = z.object({
  bucket: z.enum(BUCKETS).default("site-public"),
  title: z.string().trim().max(200).optional().default(""),
  alt_text: z.string().trim().max(240).optional().default(""),
});

function safeFileName(name: string): string {
  const dot = name.lastIndexOf(".");
  const base = dot >= 0 ? name.slice(0, dot) : name;
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : "";
  const safeBase = slugify(base) || "arquivo";
  return `${Date.now().toString(36)}-${safeBase}${ext}`;
}

export async function uploadMedia(
  _prev: MediaUploadState,
  formData: FormData,
): Promise<MediaUploadState> {
  const ctx = await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { status: "error", error: "Selecione um arquivo." };
  }
  if (file.size > 25 * 1024 * 1024) {
    return { status: "error", error: "Arquivo maior que 25MB." };
  }

  const parsed = uploadSchema.safeParse({
    bucket: formData.get("bucket") ?? "site-public",
    title: formData.get("title") ?? "",
    alt_text: formData.get("alt_text") ?? "",
  });
  if (!parsed.success) {
    return { status: "error", error: "Parâmetros inválidos." };
  }

  const bucket: BucketName = parsed.data.bucket;
  const fileName = safeFileName(file.name);
  const path = `${new Date().getFullYear()}/${fileName}`;

  const admin = createAdminClient();
  const upload = await admin.storage.from(bucket).upload(path, file, {
    contentType: file.type || undefined,
    cacheControl: "3600",
    upsert: false,
  });
  if (upload.error) return { status: "error", error: upload.error.message };

  const { data: inserted, error: insErr } = await admin
    .from("media_assets")
    .insert({
      bucket,
      path,
      file_name: file.name,
      title: parsed.data.title || file.name,
      alt_text: parsed.data.alt_text || null,
      mime_type: file.type || null,
      size_bytes: file.size,
      visibility: bucket === "cms-private" ? "private" : "public",
      uploaded_by: ctx.user.id,
    })
    .select("id")
    .single<{ id: string }>();

  if (insErr || !inserted) {
    // Best-effort cleanup of the uploaded object if we couldn't register it.
    await admin.storage.from(bucket).remove([path]);
    return { status: "error", error: insErr?.message ?? "Falha ao registrar asset." };
  }

  revalidatePath("/admin/midia");
  return { status: "success", assetId: inserted.id };
}

const updateSchema = z.object({
  id: z.string().uuid(),
  title: z.string().trim().max(200).optional().default(""),
  alt_text: z.string().trim().max(240).optional().default(""),
});

export async function updateMediaAsset(formData: FormData) {
  await requireAdmin();
  const parsed = updateSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error("Parâmetros inválidos.");

  const admin = createAdminClient();
  const { error } = await admin
    .from("media_assets")
    .update({
      title: parsed.data.title || null,
      alt_text: parsed.data.alt_text || null,
    })
    .eq("id", parsed.data.id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/midia");
}

export async function deleteMediaAsset(id: string) {
  await requireAdmin();
  const admin = createAdminClient();
  const { data: asset, error: getErr } = await admin
    .from("media_assets")
    .select("bucket, path")
    .eq("id", id)
    .maybeSingle<{ bucket: string; path: string }>();
  if (getErr) throw new Error(getErr.message);
  if (!asset) return;

  await admin.storage.from(asset.bucket).remove([asset.path]);
  const { error: delErr } = await admin.from("media_assets").delete().eq("id", id);
  if (delErr) throw new Error(delErr.message);

  revalidatePath("/admin/midia");
}
