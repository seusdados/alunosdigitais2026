"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth/session";
import { createAdminClient } from "@/lib/db/admin";
import type { AppRole } from "@/lib/db/types";

const ROLES = [
  "super_admin",
  "admin",
  "editor",
  "reviewer",
  "analyst",
] as const satisfies readonly AppRole[];

const inviteSchema = z.object({
  email: z.string().trim().email(),
  role: z.enum(ROLES),
  full_name: z.string().trim().max(160).optional().default(""),
});

export type InviteState =
  | { status: "idle" }
  | { status: "error"; error: string }
  | { status: "success"; message: string };

export async function inviteUser(_prev: InviteState, formData: FormData): Promise<InviteState> {
  await requireAdmin();
  const parsed = inviteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { status: "error", error: parsed.error.issues.map((i) => i.message).join("; ") };
  }

  const admin = createAdminClient();

  // Invite (sends email with magic link) — user record is created even before login.
  const { data, error } = await admin.auth.admin.inviteUserByEmail(parsed.data.email, {
    data: parsed.data.full_name ? { full_name: parsed.data.full_name } : undefined,
  });
  if (error || !data.user) {
    return { status: "error", error: error?.message ?? "Falha ao enviar convite." };
  }

  const { error: roleErr } = await admin
    .from("role_assignments")
    .upsert({ user_id: data.user.id, role: parsed.data.role });
  if (roleErr) return { status: "error", error: roleErr.message };

  revalidatePath("/admin/usuarios");
  return {
    status: "success",
    message: `Convite enviado para ${parsed.data.email} como ${parsed.data.role}.`,
  };
}

export async function toggleRole(userId: string, role: AppRole) {
  await requireAdmin();
  if (!(ROLES as readonly AppRole[]).includes(role)) throw new Error("Role inválida.");
  const admin = createAdminClient();
  const { data: existing, error: readErr } = await admin
    .from("role_assignments")
    .select("role")
    .eq("user_id", userId)
    .eq("role", role)
    .maybeSingle<{ role: AppRole }>();
  if (readErr) throw new Error(readErr.message);

  if (existing) {
    const { error } = await admin
      .from("role_assignments")
      .delete()
      .eq("user_id", userId)
      .eq("role", role);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("role_assignments").insert({ user_id: userId, role });
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/usuarios");
}

export async function setActive(userId: string, isActive: boolean) {
  await requireAdmin();
  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .update({ is_active: isActive })
    .eq("user_id", userId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/usuarios");
}
