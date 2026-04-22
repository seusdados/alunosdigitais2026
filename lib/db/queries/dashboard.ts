import "server-only";

import { createClient } from "@/lib/db/server";
import type { ContentItemsRow, ContentStatus, LeadsRow } from "@/lib/db/types";

export type ContentStatusCounts = Record<ContentStatus, number>;

const EMPTY_COUNTS: ContentStatusCounts = {
  draft: 0,
  in_review: 0,
  scheduled: 0,
  published: 0,
  archived: 0,
};

export async function getContentStatusCounts(): Promise<ContentStatusCounts> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("status")
    .returns<{ status: ContentStatus }[]>();

  if (error) {
    console.error("[dashboard] content_items status counts", error);
    return EMPTY_COUNTS;
  }

  const counts: ContentStatusCounts = { ...EMPTY_COUNTS };
  for (const row of data ?? []) counts[row.status] = (counts[row.status] ?? 0) + 1;
  return counts;
}

export type RecentContentItem = Pick<
  ContentItemsRow,
  "id" | "title" | "type" | "status" | "updated_at"
>;

export async function getRecentContentItems(limit = 5): Promise<RecentContentItem[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("content_items")
    .select("id, title, type, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(limit)
    .returns<RecentContentItem[]>();

  if (error) {
    console.error("[dashboard] recent content_items", error);
    return [];
  }
  return data ?? [];
}

export type RecentLead = Pick<
  LeadsRow,
  "id" | "full_name" | "email" | "organization_name" | "status" | "created_at"
>;

function thirtyDaysAgoISO(): string {
  return new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
}

export async function getRecentLeads(limit = 5): Promise<RecentLead[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("id, full_name, email, organization_name, status, created_at")
    .gte("created_at", thirtyDaysAgoISO())
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<RecentLead[]>();

  if (error) {
    console.error("[dashboard] recent leads", error);
    return [];
  }
  return data ?? [];
}

export async function getLeadsCountLast30Days(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .gte("created_at", thirtyDaysAgoISO());
  if (error) {
    console.error("[dashboard] leads count 30d", error);
    return 0;
  }
  return count ?? 0;
}

export async function getActiveRedirectsCount(): Promise<number> {
  const supabase = await createClient();
  const { count, error } = await supabase
    .from("redirects")
    .select("id", { count: "exact", head: true })
    .eq("is_active", true);

  if (error) {
    console.error("[dashboard] active redirects count", error);
    return 0;
  }
  return count ?? 0;
}
