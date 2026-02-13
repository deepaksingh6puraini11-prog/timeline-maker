import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // अगर 'next' पैरामीटर है तो उस पर भेजें, वरना सीधे 'dashboard' पर
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = createClient();
    
    // PKCE कोड को सेशन (Session) से एक्सचेंज करें
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // अगर लॉगिन सक्सेसफुल है, तो डैशबोर्ड पर भेजें
      return NextResponse.redirect(`${origin}${next}`);
    }

    // अगर एरर आता है, तो एरर मैसेज के साथ लॉगिन पेज पर भेजें
    return NextResponse.redirect(
      `${origin}/login?error=exchange_failed&msg=${encodeURIComponent(error.message)}`
    );
  }

  // अगर कोड ही नहीं मिला, तो लॉगिन पर वापस भेजें
  return NextResponse.redirect(`${origin}/login`);
}