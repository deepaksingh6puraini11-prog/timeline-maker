import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // ✅ 1) Force non-www (domain mismatch PKCE ko todta hai)
  const host = request.headers.get("host") || "";
  if (host.startsWith("www.")) {
    const nonWww = host.replace(/^www\./, "");
    const redirectUrl = new URL(request.url);
    redirectUrl.host = nonWww;
    return NextResponse.redirect(redirectUrl);
  }

  // ✅ 2) IMPORTANT: OAuth callback ko middleware touch nahi karega
  if (url.pathname.startsWith("/auth/callback")) {
    return NextResponse.next();
  }

  let response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set({ name, value, ...options, path: "/" });
          });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;

  // Protect routes
  const path = url.pathname;

  if (!user && (path.startsWith("/dashboard") || path.startsWith("/create"))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (user && path === "/login") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api/webhook|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
