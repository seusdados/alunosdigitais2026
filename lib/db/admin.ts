import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import type { Database } from "./types";

/**
 * Admin Supabase client using the service role key. Bypasses RLS.
 *
 * DO NOT import this module from any Client Component or from code that can
 * be bundled for the browser. The `server-only` import above will make the
 * build fail if that happens.
 *
 * Use only for trusted server-side operations that genuinely need elevated
 * privileges (background jobs, migrations, admin-only maintenance tasks).
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase admin credentials. Check NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  return createSupabaseClient<Database>(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
