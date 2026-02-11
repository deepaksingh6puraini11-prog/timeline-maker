mkdir app\auth\callback -Force

@'
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  // If Supabase sent an error, go back to login with message
  const error = searchParams.get("error");
  const errorDesc = searchParams.get("error_description");
  if (error) {
    const msg = errorDesc ? encodeURIComponent(errorDesc) : "oauth_error";
    return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error)}&msg=${msg}`);
  }

  if (code) {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }: any) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      return NextResponse.redirect(`${origin}/login?error=exchange_failed`);
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}
'@ | Out-File -Encoding utf8 app\auth\callback\route.ts
