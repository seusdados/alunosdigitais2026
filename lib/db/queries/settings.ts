import "server-only";

import { createClient } from "@/lib/db/server";
import type { Json, SiteSettingsRow } from "@/lib/db/types";

export async function listSiteSettings(): Promise<SiteSettingsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .order("key", { ascending: true })
    .returns<SiteSettingsRow[]>();
  if (error) {
    console.error("[site_settings] list", error);
    return [];
  }
  return data ?? [];
}

export async function getSettingsMap(): Promise<Record<string, Json>> {
  const rows = await listSiteSettings();
  const out: Record<string, Json> = {};
  for (const row of rows) out[row.key] = row.value_json;
  return out;
}
