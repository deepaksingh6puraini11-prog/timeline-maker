import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ✅ Session exchange सफल रहा, अब सीधे डैशबोर्ड पर भेजें
      return NextResponse.redirect(`${origin}${next}`)
    }
    
    // ❌ अगर एक्सचेंज फेल हुआ तो एरर के साथ लॉगिन पर वापस भेजें
    console.error('Auth exchange error:', error)
    return NextResponse.redirect(`${origin}/login?error=exchange_failed`)
  }

  // बिना कोड के आने पर लॉगिन पर भेजें
  return NextResponse.redirect(`${origin}/login`)
}