"use client";

import Link from "next/link";
import {
  Sparkles,
  History,
  FileText,
  Zap,
  Globe,
  Quote,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "History Teacher",
    text: "Transformed how my students understand chronology. The AI is shockingly accurate.",
  },
  {
    name: "David Chen",
    role: "PhD Student",
    text: "Saved me 10+ hours on my thesis visualization. Export quality is publishing-ready.",
  },
  {
    name: "Emily Roberts",
    role: "YouTuber",
    text: "The visuals are stunning. I use the PNG exports directly in my documentary videos.",
  },
  {
    name: "Jessica Lee",
    role: "Student",
    text: "Got an 'A' on my history final! The timeline looked so professional.",
  },
];

function PricingCheck({ text, active }: { text: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-full flex items-center justify-center ${
          active ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400"
        }`}
      >
        <Check className="w-2.5 h-2.5" />
      </div>
      <span className={`text-sm ${active ? "text-white" : "text-gray-400"}`}>
        {text}
      </span>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group text-left">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
    </div>
  );
}

export default function PricingPage() {
  const supabase = useMemo(() => createClient(), []);

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setLoadingUser(true);

        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        setUserId(data.session?.user?.id ?? null);

        const { data: sub } = supabase.auth.onAuthStateChange(
          (_event, session) => {
            if (!mounted) return;
            setUserId(session?.user?.id ?? null);
          }
        );

        return () => sub.subscription.unsubscribe();
      } finally {
        if (mounted) setLoadingUser(false);
      }
    };

    let cleanup: undefined | (() => void);
    init().then((c) => (cleanup = c));

    return () => {
      mounted = false;
      if (cleanup) cleanup();
    };
  }, [supabase]);

  // ✅ Lemon store + Buy IDs (tumhare final)
  const STORE_DOMAIN = "timelinemakerai.lemonsqueezy.com";
  const BUY_ID_SINGLE = "0925ec6f-d5c6-4631-b7d6-5dceda7d8ef1"; // $2 one-time
  const BUY_ID_MONTHLY = "be758e5d-a55a-4f5a-9843-973813a9805c"; // $5/month

  // ✅ NEW: hard-guard checkout (user_id missing handle)
  const LOGIN_REDIRECT = "/login?next=/pricing";

  const goCheckout = (plan: "single" | "monthly") => {
    if (loadingUser) return;

    if (!userId) {
      window.location.href = LOGIN_REDIRECT;
      return;
    }

    const buyId = plan === "single" ? BUY_ID_SINGLE : BUY_ID_MONTHLY;

    const url =
      `https://${STORE_DOMAIN}/checkout/buy/${buyId}` +
      `?checkout[custom][user_id]=${encodeURIComponent(userId)}` +
      `&checkout[custom][plan]=${encodeURIComponent(plan)}`;

    window.location.href = url;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              AI Timeline Maker
            </span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="hover:text-white transition-colors"
            >
              Testimonials
            </Link>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              href="/es"
              className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-2 border border-white/10 px-2 py-1 rounded-md hover:bg-white/5"
            >
              <Globe className="w-3 h-3" />
              <span>ES</span>
            </Link>
            <Link
              href="/login"
              className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors py-2"
            >
              Login
            </Link>
            <Link
              href="/create"
              className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-transform hover:scale-105 shadow-xl"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* PRICING */}
        <section id="pricing" className="py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">
                Invest in your Grades
              </h2>
              <p className="text-gray-400">
                Free plan for drafts, Single for 1 project, Pro for unlimited.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all text-left">
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  Free Plan
                </h3>
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <p className="text-gray-400 text-sm mb-8 italic">
                  Drafts & basic AI.
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="Unlimited Drafts" active />
                  <PricingCheck text="Basic AI Generation" active />
                  <PricingCheck text="Watermarked Export" active />
                </div>

                <button className="w-full bg-white text-black py-3 rounded-xl font-bold cursor-default">
                  Current Plan
                </button>
              </div>

              {/* Single */}
              <div className="bg-[#1a1033] border border-purple-500 p-8 rounded-2xl flex flex-col relative transform hover:-translate-y-2 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.15)] text-left">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase">
                  One-time (1 project)
                </div>

                <h3 className="text-xl font-bold text-purple-200 mb-2">
                  Single Project
                </h3>

                <div className="text-4xl font-bold text-white mb-2">
                  $2{" "}
                  <span className="text-sm text-gray-400 font-normal">
                    / one-time
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-8 italic">
                  1 project export unlock. Next project needs purchase again.
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="Remove Watermark" active />
                  <PricingCheck text="HD PDF & PNG Export" active />
                  <PricingCheck
                    text="Premium AI Models (for this project)"
                    active
                  />
                </div>

                <button
                  onClick={() => goCheckout("single")}
                  disabled={loadingUser}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <Zap className="w-4 h-4" />
                  {loadingUser
                    ? "Loading..."
                    : userId
                    ? "Buy Now"
                    : "Login to Buy"}
                </button>
              </div>

              {/* Pro */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all text-left">
                <h3 className="text-xl font-bold text-gray-200 mb-2">
                  Pro Monthly
                </h3>

                <div className="text-4xl font-bold text-white mb-2">
                  $5{" "}
                  <span className="text-sm text-gray-400 font-normal">
                    / month
                  </span>
                </div>

                <p className="text-gray-400 text-sm mb-8 italic">
                  Unlimited exports + premium models.
                </p>

                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="Unlimited Exports" active />
                  <PricingCheck text="Premium AI Models" active />
                  <PricingCheck text="Priority Support" active />
                  <PricingCheck text="Cancel Anytime" active />
                </div>

                <button
                  onClick={() => goCheckout("monthly")}
                  disabled={loadingUser}
                  className="w-full bg-white text-black py-3 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loadingUser
                    ? "Loading..."
                    : userId
                    ? "Subscribe"
                    : "Login to Subscribe"}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* PREVIEW */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative mx-auto max-w-5xl group py-24"
        >
          <div className="rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/40 overflow-hidden">
            <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>
            <div className="relative h-auto bg-[#050505] overflow-hidden">
              <img
                src="/timeline-preview.png"
                alt="Preview"
                className="w-full h-auto object-cover opacity-95"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-purple-600/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl border border-white/20">
                <Sparkles className="w-3 h-3" /> Actual AI Output
              </div>
            </div>
          </div>
        </motion.div>

        {/* FEATURES */}
        <section id="features" className="py-24 text-center">
          <div className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">
              Everything you need.
            </h2>
            <p className="text-gray-400">
              Designed for speed, accuracy, and professional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="text-purple-400 w-6 h-6" />}
              title="AI Brain"
              desc="Describe your topic. AI plots events fast."
            />
            <FeatureCard
              icon={<FileText className="text-red-400 w-6 h-6" />}
              title="HD Export"
              desc="High-quality PDF & PNG exports."
            />
            <FeatureCard
              icon={<Zap className="text-yellow-400 w-6 h-6" />}
              title="Smart Editor"
              desc="Edit dates; layout adjusts automatically."
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden"
        >
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">
              Real feedback.
            </h2>
            <p className="text-gray-400">
              Join our growing community of creators.
            </p>
          </div>

          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6 px-6"
              animate={{ x: "-50%" }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              style={{ width: "fit-content" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="w-[350px] bg-[#0f172a] border border-white/5 p-8 rounded-2xl relative"
                >
                  <Quote className="absolute top-6 right-6 text-white/5 w-10 h-10" />
                  <p className="text-gray-300 mb-6 text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                      {t.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-white text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-purple-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-2">
            <History className="text-purple-500 w-6 h-6" />
            <span className="text-lg font-bold">AI Timeline Maker</span>
          </div>
          <div className="text-gray-600 text-[10px] uppercase tracking-widest">
            © 2026 aitimelinemaker.online. Made with ❤️ in India.
          </div>
        </div>
      </footer>
    </div>
  );
}
