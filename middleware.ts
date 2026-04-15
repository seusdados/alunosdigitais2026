import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware responsibilities:
 *
 * 1. `/admin/*` is never indexed (X-Robots-Tag header).
 * 2. Supabase session is refreshed on every request under `/admin/*` so that
 *    the auth cookies remain valid for Server Components downstream.
 * 3. Unauthenticated access to `/admin/*` is redirected to `/admin/login`.
 *    The reverse (already-signed-in user hitting /admin/login) is handled
 *    inside the page itself, since the role check requires a DB lookup.
 */
export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Mutable response we can attach refreshed cookies to.
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  response.headers.set("X-Robots-Tag", "noindex, nofollow");

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.headers.set("X-Robots-Tag", "noindex, nofollow");
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh the session (rotates tokens if needed).
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";
  const isLogoutRoute = pathname === "/admin/logout";

  if (!user && !isLoginRoute && !isLogoutRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.search = "";
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
