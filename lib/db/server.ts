import "server-only";

import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

import type { Database } from "./types";

/**
 * Server-side Supabase client bound to the incoming request cookies.
 *
 * Use this in Server Components, Route Handlers and Server Actions. RLS is
 * applied based on the authenticated user, so this is safe for user-scoped
 * reads and writes.
 *
 * For privileged operations that need to bypass RLS (background jobs, admin
 * tooling), use `createAdminClient` from `@/lib/db/admin` instead.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` was called from a Server Component. This can be ignored
            // when refreshing sessions is handled by middleware.
          }
        },
      },
    },
  );
}
