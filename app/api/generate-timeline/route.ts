import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  console.log("🚀 START: Timeline Generation (Live Pricing Mode)");

  try {
    const body = await req.json();
    const { topic, language } = body;

    if (!topic) return NextResponse.json({ error: "Topic is required" }, { status: 400 });

    // 🔒 AUTHENTICATION
    const cookieStore = cookies(); 
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) { return cookieStore.get(name)?.value; },
          set(name: string, value: string, options: CookieOptions) { try { cookieStore.set({ name, value, ...options }); } catch (e) {} },
          remove(name: string, options: CookieOptions) { try { cookieStore.set({ name, value: "", ...options }); } catch (e) {} },
        },
      }
    );

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // ============================================================
    // 💰 STEP 1: CHECK USER PLAN & CREDITS
    // ============================================================
    // Database se user ka credit aur plan check karo
    const { data: profile } = await supabase
      .from("users")
      .select("credits, plan_type") 
      .eq("id", user.id)
      .single();

    // ERROR: Agar profile nahi mili (New user signup issue fix)
    if (!profile) return NextResponse.json({ error: "User profile not found" }, { status: 404 });

    // LOGIC: Kaun Premium Hai? 
    // Agar plan 'pro' hai YA plan 'single' hai -> TO PREMIUM
    // Agar plan 'free' hai -> TO BASIC
    const isProMember = profile.plan_type === 'pro';
    const isSinglePayer = profile.plan_type === 'single';
    const isPremium = isProMember || isSinglePayer;

    // PAYWALL CHECK:
    // Pro member ko kabhi mat roko.
    // Free/Single wale ke pass credit hona chahiye.
    if (!isProMember && profile.credits < 1) {
      return NextResponse.json({ 
          error: "You have used all your credits. Please upgrade.", 
          requiresUpgrade: true 
      }, { status: 403 });
    }

    // ============================================================
    // 🎛️ STEP 2: SET QUALITY (Basic vs Premium)
    // ============================================================
    
    // Free Plan = 10 Events + Flash Model (Fast)
    // Paid Plan = 35 Events + Pro Model (Deep Detail)
    
    const eventCount = isPremium ? "30 to 35" : "10 to 12"; 
    const detailLevel = isPremium ? "Exhaustive, Deep, Academic-Grade" : "Brief, Concise Summary";
    // Important: Free walo ke liye 'flash', Paid walo ke liye 'pro' (Agar available ho)
    const preferredModel = isPremium ? "gemini-1.5-pro" : "gemini-1.5-flash"; 

    console.log(`💎 User Plan: ${profile.plan_type} | Mode: ${isPremium ? 'PREMIUM' : 'BASIC'} | Credits: ${profile.credits}`);

    // ============================================================
    // 🧠 STEP 3: SMART MODEL SELECTION
    // ============================================================
    if (!apiKey) return NextResponse.json({ error: "API Key missing" }, { status: 500 });
    
    let selectedModel = "gemini-1.5-flash"; // Default backup

    try {
        const listResp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        const listData = await listResp.json();
        if (listData.models) {
            const viable = listData.models.filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"));
            // Try to find the preferred model (Pro for paid, Flash for free)
            const best = viable.find((m: any) => m.name.includes(preferredModel) && !m.name.includes("exp")) || viable[0];
            if (best) selectedModel = best.name.replace("models/", "");
        }
    } catch (e) { console.warn("⚠️ Model detect failed, using default."); }

    // ============================================================
    // 🤖 STEP 4: GENERATION
    // ============================================================
    const promptText = `
      Act as an Expert Historian. Create a timeline for: "${topic}".
      ${language === 'es' ? "Translate content to Spanish." : "English language."}

      QUALITY LEVEL: ${isPremium ? "PREMIUM (Highly Detailed)" : "BASIC (Summary)"}

      INSTRUCTIONS:
      1. Range: Origins to 2026.
      2. Count: Generate exactly **${eventCount}** events.
      3. Depth: ${detailLevel}. ${isPremium ? "40-60" : "20-30"} words per item.
      4. Format: JSON Array only.

      JSON STRUCTURE:
      [{"year": "YYYY", "title": "Headline", "description": "Content...", "color": "#Hex", "image_prompt": "Visual..."}]
    `;

    const generateUrl = `https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`;
    const response = await fetch(generateUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
    });

    const data = await response.json();
    if (!response.ok) return NextResponse.json({ error: "AI Error" }, { status: 500 });

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let timelineData = [];
    try {
         // Kabhi kabhi AI extra text deta hai, usse clean karne ke liye:
        const jsonMatch = text.match(/\[.*\]/s);
        timelineData = JSON.parse(jsonMatch ? jsonMatch[0] : text);
    } catch (e) {
        return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    const enrichedTimeline = timelineData.map((item: any) => ({
        ...item,
        imageUrl: `https://image.pollinations.ai/prompt/${encodeURIComponent(item.image_prompt)}?width=800&height=600&nologo=true`
    }));

    // ============================================================
    // 💳 STEP 5: DEDUCT CREDIT logic
    // ============================================================
    // Rule:
    // 1. Agar 'Pro' (Monthly) hai -> Credit mat kato (Unlimited).
    // 2. Agar 'Free' hai -> Credit kato.
    // 3. Agar 'Single' ($2) hai -> Credit kato (Kyunki usne ek project ke liye pay kiya tha).
    
    if (!isProMember) {
        await supabase.from("users").update({ credits: profile.credits - 1 }).eq("id", user.id);
    }

    return NextResponse.json({ 
        success: true, 
        timeline: enrichedTimeline, 
        creditsLeft: isProMember ? '∞' : profile.credits - 1,
        plan: profile.plan_type
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}