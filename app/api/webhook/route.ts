import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    // 1. Raw Body aur Signature verify karo (Security)
    const rawBody = await request.text();
    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    
    if (!secret) return NextResponse.json({ error: "Secret missing" }, { status: 500 });

    const hmac = crypto.createHmac("sha256", secret);
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(request.headers.get("x-signature") || "", "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // 2. Data Parse karo
    const payload = JSON.parse(rawBody);
    const { meta, data } = payload;
    const eventName = meta.event_name;
    
    // User ID (Jo frontend se checkout link me bheji thi)
    const userId = meta.custom_data?.user_id; 

    if (!userId) {
      console.log("⚠️ Payment received but No User ID found.");
      return NextResponse.json({ message: "No user_id found" }, { status: 200 });
    }

    // 3. Supabase Admin Client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! 
    );

    // 4. Logic: Order Created (Payment Success)
    if (eventName === "order_created") {
      const variantId = String(data.attributes.first_order_item.variant_id);
      const ID_SINGLE = process.env.LEMONSQUEEZY_VARIANT_ID_SINGLE;   // $2
      const ID_MONTHLY = process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY; // $5

      console.log(`💰 Payment from User: ${userId} | Variant: ${variantId}`);

      // ➤ CASE 1: Single Project ($2) - Increment Credits by 1
      if (variantId === ID_SINGLE) {
        // ✅ Safe RPC Call: Database level par increment karega
        const { error } = await supabaseAdmin.rpc('increment_credits', { 
          user_id: userId, 
          amount: 1 
        });

        if (error) {
          console.error("❌ RPC Error:", error.message);
          throw error;
        }
        
        console.log("✅ User upgraded to SINGLE plan (+1 Credit via RPC)");
      }

      // ➤ CASE 2: Monthly Pro ($5)
      else if (variantId === ID_MONTHLY) {
        const { error } = await supabaseAdmin
          .from('users')
          .update({ plan_type: 'pro' })
          .eq('id', userId);

        if (error) throw error;
        console.log("✅ User upgraded to PRO plan");
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" });

  } catch (err: any) {
    console.error("🔥 Webhook Error:", err.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}