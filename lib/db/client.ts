"use client";

import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "./types";

/**
 * Browser-side Supabase client. Uses the anon key and respects RLS.
 *
 * Use this inside Client Components. For Server Components, Route Handlers
 * and Server Actions, import from `@/lib/db/server` instead so that cookies
 * and sessions are forwarded correctly.
 */
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
