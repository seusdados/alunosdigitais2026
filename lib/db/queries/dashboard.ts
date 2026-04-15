import "server-only";

import { createClient } from "@/lib/db/server";
import type { ContentStatus, ContentType, LeadStatus } from "@/lib/db/types";

export type DashboardMetrics = {
  published: number;
  pendingDrafts: number;
  recentLeads: number;
  activeRedirects: number;
};

export type RecentContentItem = {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  status: ContentStatus;
  updated_at: string;
};

export type RecentLead = {
  id: string;
  full_name: string | null;
  email: string | null;
  status: LeadStatus;
  created_at: string;
};

const RECENT_LEADS_WINDOW_DAYS = 7;

/**
 * Loads the counters shown at the top of the admin dashboard.
 *
 * Uses `head: true, count: 'exact'` so Postgres returns only the row count —
 * no row payload transits the network.
 *
 * Failures are swallowed on purpose: a transient Supabase error should not
 * take the whole dashboard down. Each card falls back to 0 and the error is
 * logged for server-side debugging.
 */
export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = await createClient();

  const windowStart = new Date(
    Date.now() - RECENT_LEADS_WINDOW_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();

  const [publishedRes, draftsRes, leadsRes, redirectsRes] = await Promise.all([
    supabase
      .from("content_items")
      .select("id", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("content_items")
      .select("id", { count: "exact", head: true })
      .in("status", ["draft", "in_review"]),
    supabase
      .from("leads")
      .select("id", { count: "exact", head: true })
      .gte("created_at", windowStart),
    supabase.from("redirects").select("id", { count: "exact", head: true }).eq("is_active", true),
  ]);

  const resolve = (res: { error: unknown; count: number | null }, label: string): number => {
    if (res.error) {
      console.error(`[dashboard] failed to count ${label}`, res.error);
      return 0;
    }
    return res.count ?? 0;
  };

  return {
    published: resolve(publishedRes, "published content_items"),
    pendingDrafts: resolve(draftsRes, "pending drafts"),
    recentLeads: resolve(leadsRes, "recent leads"),
    activeRedirects: resolve(redirectsRes, "active redirects"),
  };
}

/**
 * Returns the most recently updated content items, across all statuses.
 * Used by the "Atividade recente" section of the dashboard.
 */
export async function getRecentContentItems(limit = 5): Promise<RecentContentItem[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("content_items")
    .select("id, title, slug, type, status, updated_at")
    .order("updated_at", { ascending: false })
    .limit(limit)
    .returns<RecentContentItem[]>();

  if (error) {
    console.error("[dashboard] failed to load recent content_items", error);
    return [];
  }

  return data ?? [];
}

/**
 * Returns the most recent leads (any status) for the dashboard.
 */
export async function getRecentLeads(limit = 5): Promise<RecentLead[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("leads")
    .select("id, full_name, email, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<RecentLead[]>();

  if (error) {
    console.error("[dashboard] failed to load recent leads", error);
    return [];
  }

  return data ?? [];
}
