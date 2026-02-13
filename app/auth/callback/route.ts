import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const baseUrl = "https://aitimelinemaker.online"

    if (!code) {
      console.error('No code found in URL')
      return NextResponse.redirect(`${baseUrl}/login?error=no_code`)
    }

    const supabase = await createClient() // ✅ ensure this is awaited
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Supabase exchange error:', error.message)
      return NextResponse.redirect(`${baseUrl}/login?error=exchange_failed`)
    }

    return NextResponse.redirect(`${baseUrl}/dashboard`)

  } catch (err: any) {
    // ये लाइन आपको बताएगी कि असल में क्या फटा है
    return new Response(`Server Error: ${err.message}`, { status: 500 })
  }
}