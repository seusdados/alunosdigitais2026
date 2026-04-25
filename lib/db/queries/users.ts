import "server-only";

import { createAdminClient } from "@/lib/db/admin";
import { createClient } from "@/lib/db/server";
import type { AppRole, ProfilesRow } from "@/lib/db/types";

export type AdminUser = {
  user_id: string;
  email: string | null;
  full_name: string | null;
  job_title: string | null;
  is_active: boolean;
  created_at: string;
  roles: AppRole[];
};

export async function listAdminUsers(): Promise<AdminUser[]> {
  const supabase = await createClient();

  const [{ data: profiles, error: profilesErr }, { data: roles, error: rolesErr }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("user_id, full_name, job_title, is_active, created_at")
        .order("created_at", { ascending: false })
        .returns<
          Pick<ProfilesRow, "user_id" | "full_name" | "job_title" | "is_active" | "created_at">[]
        >(),
      supabase
        .from("role_assignments")
        .select("user_id, role")
        .returns<{ user_id: string; role: AppRole }[]>(),
    ]);

  if (profilesErr) {
    console.error("[users] profiles", profilesErr);
    return [];
  }
  if (rolesErr) {
    console.error("[users] roles", rolesErr);
  }

  const rolesByUser = new Map<string, AppRole[]>();
  for (const r of roles ?? []) {
    const list = rolesByUser.get(r.user_id) ?? [];
    list.push(r.role);
    rolesByUser.set(r.user_id, list);
  }

  const emails = await fetchEmails((profiles ?? []).map((p) => p.user_id));

  return (profiles ?? []).map((p) => ({
    user_id: p.user_id,
    full_name: p.full_name,
    job_title: p.job_title,
    is_active: p.is_active,
    created_at: p.created_at,
    email: emails.get(p.user_id) ?? null,
    roles: rolesByUser.get(p.user_id) ?? [],
  }));
}

async function fetchEmails(userIds: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>();
  if (userIds.length === 0) return out;
  try {
    const admin = createAdminClient();
    // `listUsers` returns the first page. For larger deployments, paginate later.
    const { data, error } = await admin.auth.admin.listUsers({ perPage: 200 });
    if (error) {
      console.error("[users] listUsers", error);
      return out;
    }
    for (const u of data.users) {
      if (u.email) out.set(u.id, u.email);
    }
  } catch (err) {
    console.error("[users] fetchEmails", err);
  }
  return out;
}
