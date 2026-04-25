import "server-only";

import { createClient } from "@/lib/db/server";
import type { MediaAssetsRow } from "@/lib/db/types";

export type MediaListItem = Pick<
  MediaAssetsRow,
  | "id"
  | "bucket"
  | "path"
  | "file_name"
  | "title"
  | "alt_text"
  | "mime_type"
  | "size_bytes"
  | "width"
  | "height"
  | "visibility"
  | "created_at"
>;

export async function listMediaAssets(limit = 200): Promise<MediaListItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select(
      "id, bucket, path, file_name, title, alt_text, mime_type, size_bytes, width, height, visibility, created_at",
    )
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<MediaListItem[]>();

  if (error) {
    console.error("[media] list", error);
    return [];
  }
  return data ?? [];
}

export async function getMediaAsset(id: string): Promise<MediaAssetsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("media_assets")
    .select("*")
    .eq("id", id)
    .maybeSingle<MediaAssetsRow>();
  if (error) {
    console.error("[media] get", error);
    return null;
  }
  return data ?? null;
}

export function getPublicUrlFor(bucket: string, path: string): string | null {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!base) return null;
  return `${base.replace(/\/$/, "")}/storage/v1/object/public/${bucket}/${path}`;
}
