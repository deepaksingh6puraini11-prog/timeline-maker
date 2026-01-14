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
    
    // 👇 YAHAN SE USER ID MILEGI (Jo frontend se bheji thi)
    const userId = meta.custom_data?.user_id; 

    if (!userId) {
      console.log("⚠️ Payment received but No User ID found.");
      return NextResponse.json({ message: "No user_id found" }, { status: 200 });
    }

    // 3. Supabase Admin Client (RLS Bypass karne ke liye)
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! 
    );

    // 4. Logic: Order Created (Payment Success)
    if (eventName === "order_created") {
      
      // Check karo kaunsa product bika hai
      const variantId = String(data.attributes.first_order_item.variant_id);

      // Environment Variables se IDs uthao
      const ID_SINGLE = process.env.LEMONSQUEEZY_VARIANT_ID_SINGLE;   // $2
      const ID_MONTHLY = process.env.LEMONSQUEEZY_VARIANT_ID_MONTHLY; // $5

      console.log(`💰 Payment from User: ${userId} | Variant: ${variantId}`);

      // ➤ CASE 1: Single Project ($2)
      if (variantId === ID_SINGLE) {
        // Logic: Plan = 'single', Credits = 1 (ya add 1)
        // Pehle current credit check karte hain
        const { data: user } = await supabaseAdmin.from('users').select('credits').eq('id', userId).single();
        const newCredits = (user?.credits || 0) + 1; // Existing me 1 jod do

        await supabaseAdmin
          .from('users')
          .update({ 
            plan_type: 'single',
            credits: newCredits 
          })
          .eq('id', userId);
        
        console.log("✅ User upgraded to SINGLE plan (+1 Credit)");
      }

      // ➤ CASE 2: Monthly Pro ($5)
      else if (variantId === ID_MONTHLY) {
        // Logic: Plan = 'pro', Credits ka tension nahi
        await supabaseAdmin
          .from('users')
          .update({ 
            plan_type: 'pro',
            // Pro walo ke credits update karne ki zarurat nahi, wo unlimited hain
          })
          .eq('id', userId);

        console.log("✅ User upgraded to PRO plan");
      }
    }

    return NextResponse.json({ message: "Webhook processed successfully" });

  } catch (err: any) {
    console.error("🔥 Webhook Error:", err.message);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}