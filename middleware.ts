import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // ✅ tumhara existing PKCE cookie sync logic (unchanged)
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );

          supabaseResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // ✅ IMPORTANT (unchanged): PKCE cookies refresh
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  // ✅ protect these routes
  const isProtected =
    path === "/create" ||
    path.startsWith("/create/") ||
    path === "/dashboard" ||
    path.startsWith("/dashboard/");

  // ✅ not logged in -> send to login with next
  if (!user && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", path);

    const redirectResponse = NextResponse.redirect(url);

    // ✅ VERY IMPORTANT: keep cookies set by supabaseResponse (PKCE/session cookies)
    supabaseResponse.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c);
    });

    return redirectResponse;
  }

  // (optional but nice) logged in -> prevent visiting /login
  if (user && path === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.searchParams.delete("next");

    const redirectResponse = NextResponse.redirect(url);

    supabaseResponse.cookies.getAll().forEach((c) => {
      redirectResponse.cookies.set(c);
    });

    return redirectResponse;
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};