"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";

const schema = z.object({
  id: z.string().uuid().optional(),
  source_path: z
    .string()
    .trim()
    .min(1)
    .max(300)
    .refine((v) => v.startsWith("/"), { message: "Deve começar com /" }),
  target_path: z
    .string()
    .trim()
    .min(1)
    .max(500)
    .refine((v) => v.startsWith("/") || /^https?:\/\//.test(v), {
      message: "Use caminho relativo (/) ou URL absoluta (http/https).",
    }),
  redirect_type: z.enum(["301", "302", "307", "308"]),
  is_active: z.coerce.boolean().default(true),
  notes: z.string().trim().max(400).optional().default(""),
});

export async function saveRedirect(formData: FormData) {
  await requireAdmin();
  const parsed = schema.safeParse({
    ...Object.fromEntries(formData),
    is_active: formData.get("is_active") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  const supabase = await createClient();
  const payload = {
    source_path: parsed.data.source_path,
    target_path: parsed.data.target_path,
    redirect_type: Number(parsed.data.redirect_type) as 301 | 302 | 307 | 308,
    is_active: parsed.data.is_active,
    notes: parsed.data.notes || null,
  };

  if (parsed.data.id) {
    const { error } = await supabase.from("redirects").update(payload).eq("id", parsed.data.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await supabase.from("redirects").insert(payload);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/redirects");
}

export async function deleteRedirect(id: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("redirects").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/redirects");
}
