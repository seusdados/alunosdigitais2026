import "server-only";

import { createClient } from "@/lib/db/server";
import type { TaxonomiesRow, TermsRow } from "@/lib/db/types";

export async function listTaxonomies(): Promise<TaxonomiesRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("taxonomies")
    .select("*")
    .order("sort_order", { ascending: true })
    .returns<TaxonomiesRow[]>();
  if (error) {
    console.error("[taxonomies] list", error);
    return [];
  }
  return data ?? [];
}

export async function listTerms(taxonomyId: string): Promise<TermsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("terms")
    .select("*")
    .eq("taxonomy_id", taxonomyId)
    .order("sort_order", { ascending: true })
    .returns<TermsRow[]>();
  if (error) {
    console.error("[terms] list", error);
    return [];
  }
  return data ?? [];
}
