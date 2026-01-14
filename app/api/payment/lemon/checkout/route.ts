import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 1. User Authentication
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) { try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)); } catch {} },
        },
      }
    );

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Please login first" }, { status: 401 });
    }

    // 2. Plan Check (Frontend se aayega)
    const reqData = await request.json();
    const planType = reqData.planType; // 'single' ya 'monthly'

    let VARIANT_ID;

    // Logic: Sahi ID select karo
    if (planType === 'monthly') {
        VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY; // $5 (1197199)
    } else {
        VARIANT_ID = process.env.LEMONSQUEEZY_VARIANT_ID_SINGLE;  // $2 (1197194)
    }

    if (!VARIANT_ID) {
        return NextResponse.json({ error: "Plan ID missing in Server .env" }, { status: 500 });
    }

    // 3. Call Lemon Squeezy
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        "Accept": "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        "Authorization": `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: user.email, 
              custom: {
                user_id: user.id,
                plan: planType, // Webhook ke liye
              },
            },
          },
          relationships: {
            store: { data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID } },
            variant: { data: { type: "variants", id: VARIANT_ID } },
          },
        },
      }),
    });

    const data = await response.json();
    if (data.errors) return NextResponse.json({ error: data.errors[0].detail }, { status: 500 });

    return NextResponse.json({ url: data.data.attributes.url });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}