import "server-only";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/db/server";

export type AppRole = "super_admin" | "admin" | "editor" | "reviewer" | "analyst";

export type AdminContext = {
  user: {
    id: string;
    email: string;
  };
  roles: AppRole[];
};

/**
 * Returns the current Supabase user, or null if not signed in.
 *
 * Safe to call from any Server Component, Route Handler or Server Action.
 */
export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/**
 * Loads the roles assigned to a given user from `public.role_assignments`.
 */
export async function getRolesForUser(userId: string): Promise<AppRole[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("role_assignments")
    .select("role")
    .eq("user_id", userId)
    .returns<{ role: AppRole }[]>();

  if (error) {
    console.error("[auth] failed to load role_assignments", error);
    return [];
  }

  return (data ?? []).map((row) => row.role);
}

/**
 * Gate for admin-only Server Components / Route Handlers.
 *
 * - If no user is signed in, redirects to `/admin/login`.
 * - If the user is signed in but has no role assignment, redirects to
 *   `/admin/login?error=not_authorized` (no access to the admin area).
 *
 * Returns `{ user, roles }` when the caller is allowed to continue.
 */
export async function requireAdmin(): Promise<AdminContext> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/admin/login");
  }

  const roles = await getRolesForUser(user.id);

  if (roles.length === 0) {
    redirect("/admin/login?error=not_authorized");
  }

  return {
    user: {
      id: user.id,
      email: user.email ?? "",
    },
    roles,
  };
}

/**
 * Convenience check for a specific role.
 */
export function hasRole(ctx: AdminContext, role: AppRole) {
  return ctx.roles.includes(role);
}

/**
 * Gate for Server Actions that need a narrower role than `requireAdmin()`.
 *
 * Use this for privileged mutations (role changes, user invites, settings
 * that change security posture). Callers that simply need "any admin-panel
 * role" should keep using `requireAdmin()`.
 *
 * Throws `Error` (not redirect) so the action fails with a clear error
 * message in the client toast instead of silently navigating.
 */
export async function requireRole(...allowed: AppRole[]): Promise<AdminContext> {
  const ctx = await requireAdmin();
  const ok = allowed.some((role) => ctx.roles.includes(role));
  if (!ok) {
    throw new Error(`Permissão insuficiente — ação restrita a: ${allowed.join(", ")}.`);
  }
  return ctx;
}
