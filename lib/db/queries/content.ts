import "server-only";

import { createClient } from "@/lib/db/server";
import type {
  ContentItemsRow,
  ContentRevisionsRow,
  ContentStatus,
  ContentType,
} from "@/lib/db/types";

export type ContentListItem = Pick<
  ContentItemsRow,
  | "id"
  | "title"
  | "slug"
  | "path"
  | "type"
  | "status"
  | "updated_at"
  | "published_at"
  | "author_user_id"
>;

export type ContentListFilters = {
  status?: ContentStatus;
  type?: ContentType;
  search?: string;
  limit?: number;
};

export async function listContentItems(
  filters: ContentListFilters = {},
): Promise<ContentListItem[]> {
  const supabase = await createClient();
  let query = supabase
    .from("content_items")
    .select("id, title, slug, path, type, status, updated_at, published_at, author_user_id")
    .order("updated_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.type) query = query.eq("type", filters.type);
  if (filters.search && filters.search.trim().length > 0) {
    const needle = filters.search.trim();
    query = query.ilike("title", `%${needle}%`);
  }
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query.returns<ContentListItem[]>();
  if (error) {
    console.error("[content] list", error);
    return [];
  }
  return data ?? [];
}

export async function getContentItem(id: string): Promise<ContentItemsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .maybeSingle<ContentItemsRow>();

  if (error) {
    console.error("[content] get", error);
    return null;
  }
  return data ?? null;
}

export type LatestRevision = Pick<
  ContentRevisionsRow,
  "id" | "content_item_id" | "version_number" | "editor_json" | "render_html" | "plain_text"
>;

export async function getLatestRevision(contentItemId: string): Promise<LatestRevision | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_revisions")
    .select("id, content_item_id, version_number, editor_json, render_html, plain_text")
    .eq("content_item_id", contentItemId)
    .order("version_number", { ascending: false })
    .limit(1)
    .maybeSingle<LatestRevision>();

  if (error) {
    console.error("[content] latest revision", error);
    return null;
  }
  return data ?? null;
}
