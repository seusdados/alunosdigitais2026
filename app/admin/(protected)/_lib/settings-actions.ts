"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createClient } from "@/lib/db/server";
import type { Json } from "@/lib/db/types";

const KEY_RE = /^[a-z0-9_.-]+$/;

const schema = z.object({
  key: z.string().trim().min(2).max(80).regex(KEY_RE, "Use apenas letras, números, ., - e _"),
  value: z.string().trim().min(0).max(10_000),
  is_public: z.coerce.boolean().default(false),
});

export async function saveSetting(formData: FormData) {
  const ctx = await requireAdmin();
  const parsed = schema.safeParse({
    ...Object.fromEntries(formData),
    is_public: formData.get("is_public") === "on",
  });
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join("; "));

  let value: Json;
  const raw = parsed.data.value.trim();
  if (raw.length === 0) {
    value = null;
  } else {
    try {
      value = JSON.parse(raw) as Json;
    } catch {
      // Fallback: store as plain string. Caller can always switch to JSON later.
      value = raw;
    }
  }

  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").upsert({
    key: parsed.data.key,
    value_json: value,
    is_public: parsed.data.is_public,
    updated_by: ctx.user.id,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(error.message);

  revalidatePath("/admin/seo");
  revalidatePath("/admin/configuracoes");
}

export async function deleteSetting(key: string) {
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from("site_settings").delete().eq("key", key);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/seo");
  revalidatePath("/admin/configuracoes");
}
