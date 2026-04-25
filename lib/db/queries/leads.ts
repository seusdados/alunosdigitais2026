import "server-only";

import { createClient } from "@/lib/db/server";
import type { FormSubmissionsRow, LeadStatus, LeadsRow } from "@/lib/db/types";

export type LeadListItem = Pick<
  LeadsRow,
  | "id"
  | "full_name"
  | "email"
  | "phone"
  | "organization_name"
  | "status"
  | "source"
  | "created_at"
  | "last_submission_at"
>;

export type LeadListFilters = {
  status?: LeadStatus;
  search?: string;
  limit?: number;
};

export async function listLeads(filters: LeadListFilters = {}): Promise<LeadListItem[]> {
  const supabase = await createClient();
  let query = supabase
    .from("leads")
    .select(
      "id, full_name, email, phone, organization_name, status, source, created_at, last_submission_at",
    )
    .order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.search && filters.search.trim().length > 0) {
    const needle = filters.search.trim();
    query = query.or(
      `full_name.ilike.%${needle}%,email.ilike.%${needle}%,organization_name.ilike.%${needle}%`,
    );
  }
  if (filters.limit) query = query.limit(filters.limit);

  const { data, error } = await query.returns<LeadListItem[]>();
  if (error) {
    console.error("[leads] list", error);
    return [];
  }
  return data ?? [];
}

export async function getLead(id: string): Promise<LeadsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle<LeadsRow>();

  if (error) {
    console.error("[leads] get", error);
    return null;
  }
  return data ?? null;
}

export async function listLeadSubmissions(leadId: string): Promise<FormSubmissionsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("form_submissions")
    .select("*")
    .eq("lead_id", leadId)
    .order("submitted_at", { ascending: false })
    .returns<FormSubmissionsRow[]>();

  if (error) {
    console.error("[leads] submissions", error);
    return [];
  }
  return data ?? [];
}
