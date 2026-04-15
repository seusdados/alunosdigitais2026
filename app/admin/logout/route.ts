import { NextResponse } from "next/server";

import { createClient } from "@/lib/db/server";

/**
 * Logs the current admin user out and redirects to the login page.
 *
 * Accepts both POST (from the sign-out button form) and GET (defensive, for
 * links/redirects). The client form should always use POST.
 */
async function handleLogout(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl, { status: 303 });
}

export async function POST(request: Request) {
  return handleLogout(request);
}

export async function GET(request: Request) {
  return handleLogout(request);
}
