import "server-only";

import { createClient } from "@/lib/db/server";
import type { RedirectsRow } from "@/lib/db/types";

export async function listRedirects(): Promise<RedirectsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("redirects")
    .select("*")
    .order("source_path", { ascending: true })
    .returns<RedirectsRow[]>();
  if (error) {
    console.error("[redirects] list", error);
    return [];
  }
  return data ?? [];
}
