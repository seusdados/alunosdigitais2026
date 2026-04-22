"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import { slugify } from "@/lib/format";

const menuSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().trim().min(2).max(40),
  label: z.string().trim().min(2).max(80),
  location: z.string().trim().min(1).max(40),
});

export async function saveMenu(formData: FormData) {
  await requireAdmin();
  const parsed = menuSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    code: slugify(parsed.data.code),
    label: parsed.data.label,
    location: parsed.data.location,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("menus").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
    revalidatePath(`/admin/menus/${parsed.data.id}`);
  } else {
    const { data, error } = await supabase
      .from("menus")
      .insert(payload)
      .select("id")
      .single<{ id: string }>();
    if (error || !data) throw new Error(error?.message ?? "Falha ao criar menu.");
    revalidatePath("/admin/menus");
    redirect(`/admin/menus/${data.id}`);
  }
  revalidatePath("/admin/menus");
}

export async function deleteMenu(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("menus").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/menus");
  redirect("/admin/menus");
}

const menuItemSchema = z.object({
  id: z.string().uuid().optional(),
  menu_id: z.string().uuid(),
  label: z.string().trim().min(1).max(120),
  item_type: z.enum(["internal", "external", "content"]),
  href: z.string().trim().max(300).optional().default(""),
  target: z.string().trim().max(20).optional().default(""),
  sort_order: z.coerce.number().int().min(0).default(0),
  is_visible: z.coerce.boolean().default(true),
});

export async function saveMenuItem(formData: FormData) {
  await requireAdmin();
  const parsed = menuItemSchema.safeParse({
    ...Object.fromEntries(formData),
    is_visible: formData.get("is_visible") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    menu_id: parsed.data.menu_id,
    label: parsed.data.label,
    item_type: parsed.data.item_type,
    href: parsed.data.href || null,
    target: parsed.data.target || null,
    sort_order: parsed.data.sort_order,
    is_visible: parsed.data.is_visible,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("menu_items").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("menu_items").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath(`/admin/menus/${parsed.data.menu_id}`);
}

export async function deleteMenuItem(id: string, menuId: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath(`/admin/menus/${menuId}`);
}
