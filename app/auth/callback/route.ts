import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  // प्रोडक्शन का पक्का URL
  const baseUrl = "https://aitimelinemaker.online"

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // ✅ सीधे डैशबोर्ड पर भेजें
      return NextResponse.redirect(`${baseUrl}/dashboard`)
    }
    
    console.error('Auth exchange error:', error)
    // ❌ फेल होने पर लॉगिन पेज पर एरर के साथ
    return NextResponse.redirect(`${baseUrl}/login?error=exchange_failed`)
  }

  return NextResponse.redirect(`${baseUrl}/login`)
}