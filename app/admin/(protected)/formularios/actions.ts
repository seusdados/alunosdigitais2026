"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import { slugify } from "@/lib/format";

const formSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().trim().min(2).max(40),
  name: z.string().trim().min(2).max(120),
  description: z.string().trim().max(400).optional().default(""),
  destination_email: z.string().trim().email().optional().or(z.literal("")).default(""),
  success_message: z.string().trim().max(400).optional().default(""),
  is_active: z.coerce.boolean().default(true),
});

export async function saveForm(formData: FormData) {
  await requireAdmin();
  const parsed = formSchema.safeParse({
    ...Object.fromEntries(formData),
    is_active: formData.get("is_active") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    code: slugify(parsed.data.code),
    name: parsed.data.name,
    description: parsed.data.description || null,
    destination_email: parsed.data.destination_email || null,
    success_message: parsed.data.success_message || null,
    is_active: parsed.data.is_active,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("forms").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
    revalidatePath(`/admin/formularios/${parsed.data.id}`);
  } else {
    const { data, error } = await supabase
      .from("forms")
      .insert(payload)
      .select("id")
      .single<{ id: string }>();
    if (error || !data) throw new Error(error?.message ?? "Falha ao criar formulário.");
    revalidatePath("/admin/formularios");
    redirect(`/admin/formularios/${data.id}`);
  }
  revalidatePath("/admin/formularios");
}

export async function deleteForm(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("forms").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/formularios");
  redirect("/admin/formularios");
}

const fieldSchema = z.object({
  id: z.string().uuid().optional(),
  form_id: z.string().uuid(),
  field_key: z.string().trim().min(1).max(40),
  label: z.string().trim().min(1).max(120),
  field_type: z.string().trim().min(1).max(20),
  placeholder: z.string().trim().max(120).optional().default(""),
  help_text: z.string().trim().max(240).optional().default(""),
  is_required: z.coerce.boolean().default(false),
  sort_order: z.coerce.number().int().min(0).default(0),
});

export async function saveFormField(formData: FormData) {
  await requireAdmin();
  const parsed = fieldSchema.safeParse({
    ...Object.fromEntries(formData),
    is_required: formData.get("is_required") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    form_id: parsed.data.form_id,
    field_key: slugify(parsed.data.field_key).replace(/-/g, "_") || parsed.data.field_key,
    label: parsed.data.label,
    field_type: parsed.data.field_type,
    placeholder: parsed.data.placeholder || null,
    help_text: parsed.data.help_text || null,
    is_required: parsed.data.is_required,
    sort_order: parsed.data.sort_order,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("form_fields").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("form_fields").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath(`/admin/formularios/${parsed.data.form_id}`);
}

export async function deleteFormField(id: string, formId: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("form_fields").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/formularios/${formId}`);
}
