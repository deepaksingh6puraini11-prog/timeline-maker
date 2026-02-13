import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  // ✅ Pro Fix: Hardcoded URL use karein taaki mismatch na ho
  const baseUrl = "https://aitimelinemaker.online"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ✅ Success! Dashboard par bhejein
      return NextResponse.redirect(`${baseUrl}/dashboard`)
    }
    
    console.error('Auth exchange error:', error)
    return NextResponse.redirect(`${baseUrl}/login?error=exchange_failed`)
  }

  return NextResponse.redirect(`${baseUrl}/login`)
}