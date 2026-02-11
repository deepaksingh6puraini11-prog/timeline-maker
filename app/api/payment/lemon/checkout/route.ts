import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          // ✅ read cookies
          getAll() {
            return cookieStore.getAll();
          },
          // ✅ DO NOT write cookies in route handlers
          setAll() {},
        },
      }
    );

    // ✅ Use getSession (more reliable with SSR cookies)
    const { data: sessionData, error: sessionErr } = await supabase.auth.getSession();
    if (sessionErr) console.error("supabase getSession:", sessionErr.message);

    const user = sessionData.session?.user ?? null;

    if (!user) {
      return NextResponse.json({ error: "Please login first" }, { status: 401 });
    }

    const reqData = await request.json().catch(() => ({}));
    const planType = reqData.planType as "single" | "monthly";

    if (planType !== "single" && planType !== "monthly") {
      return NextResponse.json({ error: "Invalid planType" }, { status: 400 });
    }

    const VARIANT_ID =
      planType === "monthly"
        ? process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY
        : process.env.LEMONSQUEEZY_VARIANT_ID_SINGLE;

    if (!VARIANT_ID) {
      return NextResponse.json(
        { error: "Plan ID missing in Server .env" },
        { status: 500 }
      );
    }

    if (!process.env.LEMONSQUEEZY_API_KEY) {
      return NextResponse.json(
        { error: "LEMONSQUEEZY_API_KEY missing" },
        { status: 500 }
      );
    }

    if (!process.env.LEMONSQUEEZY_STORE_ID) {
      return NextResponse.json(
        { error: "LEMONSQUEEZY_STORE_ID missing" },
        { status: 500 }
      );
    }

    // ✅ Create Lemon checkout
    const response = await fetch("https://api.lemonsqueezy.com/v1/checkouts", {
      method: "POST",
      headers: {
        Accept: "application/vnd.api+json",
        "Content-Type": "application/vnd.api+json",
        Authorization: `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: "checkouts",
          attributes: {
            checkout_data: {
              email: user.email,
              custom: {
                user_id: user.id,
                plan: planType,
              },
            },
            // fallback
            custom: {
              user_id: user.id,
              plan: planType,
            },
          },
          relationships: {
            store: {
              data: { type: "stores", id: process.env.LEMONSQUEEZY_STORE_ID },
            },
            variant: {
              data: { type: "variants", id: VARIANT_ID },
            },
          },
        },
      }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const msg = data?.errors?.[0]?.detail || "Lemon API error";
      return NextResponse.json({ error: msg }, { status: 500 });
    }

    const url = data?.data?.attributes?.url;
    if (!url) {
      return NextResponse.json(
        { error: "Checkout URL missing from Lemon response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Server error" },
      { status: 500 }
    );
  }
}
