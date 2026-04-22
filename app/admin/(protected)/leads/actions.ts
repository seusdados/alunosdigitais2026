"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import type { LeadStatus } from "@/lib/db/types";

const ALLOWED: LeadStatus[] = ["new", "qualified", "contacted", "won", "lost", "spam"];

export async function updateLeadStatus(id: string, status: LeadStatus) {
  await requireAdmin();
  if (!ALLOWED.includes(status)) throw new Error("Status inválido.");
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${id}`);
}

export async function updateLeadNotes(id: string, formData: FormData) {
  await requireAdmin();
  const notes = (formData.get("notes") ?? "").toString().trim().slice(0, 4000);
  const supabase = await createClient();
  const { error } = await supabase.from("leads").update({ notes }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/leads/${id}`);
}

export async function deleteLead(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("leads").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/leads");
}
