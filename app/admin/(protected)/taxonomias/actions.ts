"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import { slugify } from "@/lib/format";

const taxonomySchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().trim().min(2).max(40),
  label: z.string().trim().min(2).max(80),
  description: z.string().trim().max(400).optional().default(""),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function saveTaxonomy(formData: FormData) {
  await requireAdmin();
  const parsed = taxonomySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    code: slugify(parsed.data.code),
    label: parsed.data.label,
    description: parsed.data.description || null,
    sort_order: parsed.data.sort_order,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("taxonomies").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("taxonomies").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/taxonomias");
}

export async function deleteTaxonomy(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("taxonomies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/taxonomias");
}

const termSchema = z.object({
  id: z.string().uuid().optional(),
  taxonomy_id: z.string().uuid(),
  name: z.string().trim().min(1).max(80),
  slug: z.string().trim().min(1).max(80),
  description: z.string().trim().max(400).optional().default(""),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function saveTerm(formData: FormData) {
  await requireAdmin();
  const parsed = termSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    taxonomy_id: parsed.data.taxonomy_id,
    name: parsed.data.name,
    slug: slugify(parsed.data.slug),
    description: parsed.data.description || null,
    sort_order: parsed.data.sort_order,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("terms").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("terms").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/taxonomias");
}

export async function deleteTerm(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("terms").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/taxonomias");
}
