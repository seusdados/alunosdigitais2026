import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Ensures `/admin/*` is never indexed.
 *
 * Adds `X-Robots-Tag: noindex, nofollow` at the edge, before any page logic
 * runs. Combined with the `robots` metadata in `app/admin/layout.tsx` and the
 * Disallow rule in `app/robots.ts`, this gives us defense in depth against the
 * admin surfacing in search (master spec §6.1).
 *
 * Auth/session handling for the admin will be layered on top of this on Fase 3.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/admin")) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
