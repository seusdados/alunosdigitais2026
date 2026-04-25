import "server-only";

import { createClient } from "@/lib/db/server";
import type { FormFieldsRow, FormsRow } from "@/lib/db/types";

export async function listForms(): Promise<FormsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .order("code", { ascending: true })
    .returns<FormsRow[]>();
  if (error) {
    console.error("[forms] list", error);
    return [];
  }
  return data ?? [];
}

export async function getForm(id: string): Promise<FormsRow | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("forms")
    .select("*")
    .eq("id", id)
    .maybeSingle<FormsRow>();
  if (error) {
    console.error("[forms] get", error);
    return null;
  }
  return data ?? null;
}

export async function listFormFields(formId: string): Promise<FormFieldsRow[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("form_fields")
    .select("*")
    .eq("form_id", formId)
    .order("sort_order", { ascending: true })
    .returns<FormFieldsRow[]>();
  if (error) {
    console.error("[form_fields] list", error);
    return [];
  }
  return data ?? [];
}
