import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  // ✅ Pro Fix: Hardcoded stable URL to avoid domain mismatch
  const baseUrl = "https://aitimelinemaker.online"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ✅ Session exchange successful, go to dashboard
      return NextResponse.redirect(`${baseUrl}/dashboard`)
    }
    
    console.error('Auth exchange error:', error)
    return NextResponse.redirect(`${baseUrl}/login?error=exchange_failed`)
  }

  return NextResponse.redirect(`${baseUrl}/login`)
}