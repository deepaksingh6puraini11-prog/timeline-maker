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
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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

export default function PricingPage() {
  // ✅ Stable Supabase client (prevents effect loop)
  const supabase = useMemo(() => createClientComponentClient(), []);

  const [userId, setUserId] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // ✅ 1) Fetch logged-in userId
  useEffect(() => {
    const getUser = async () => {
      try {
        setLoadingUser(true);
        const { data, error } = await supabase.auth.getUser();
        if (error) console.error("Supabase getUser:", error.message);

        setUserId(data.user?.id ?? null);
      } catch (e) {
        console.error("Supabase getUser exception:", e);
        setUserId(null);
      } finally {
        setLoadingUser(false);
      }
    };

    getUser();
  }, [supabase]);

  // ✅ 3) Correct Lemon Squeezy Store + Variant IDs
  const STORE_URL = "timelinemakerai.lemonsqueezy.com";
  const ID_SINGLE = "1273917"; // $2 Single Project
  const ID_MONTHLY = "1273928"; // $5 Pro Monthly

  // ✅ 2) Dynamic checkout URLs with custom user_id
  const SINGLE_CHECKOUT_URL = userId
    ? `https://${STORE_URL}/checkout/buy/${ID_SINGLE}?checkout[custom][user_id]=${encodeURIComponent(
        userId
      )}`
    : "";

  const PRO_CHECKOUT_URL = userId
    ? `https://${STORE_URL}/checkout/buy/${ID_MONTHLY}?checkout[custom][user_id]=${encodeURIComponent(
        userId
      )}`
    : "";

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* 🌟 NAVBAR */}
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

        {/* 💰 PRICING */}
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
                Choose the plan that fits your project needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Free Starter */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all text-left">
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  Free Starter
                </h3>
                <div className="text-4xl font-bold text-white mb-8">$0</div>

                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="Unlimited Drafts" active />
                  <PricingCheck text="Basic AI Generation" active />
                </div>

                <button className="w-full bg-white/10 text-white py-3 rounded-xl font-bold cursor-default">
                  Current Plan
                </button>
              </div>

              {/* Single Project */}
              <div className="bg-[#1a1033] border border-purple-500 p-8 rounded-2xl flex flex-col relative transform hover:-translate-y-2 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.15)] text-left">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase">
                  Best for Students
                </div>

                <h3 className="text-xl font-bold text-purple-300 mb-2">
                  Single Project
                </h3>

                <div className="text-4xl font-bold text-white mb-8">
                  $2{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    / once
                  </span>
                </div>

                {/* ✅ FIX: No lifetime. It's 1 project only */}
                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="1 Project Unlock" active />
                  <PricingCheck text="Remove Watermark (1 project)" active />
                  <PricingCheck text="HD PDF & PNG Export (1 project)" active />
                </div>

                {/* ✅ FIX: Avoid glitch with Loading */}
                {loadingUser ? (
                  <button className="w-full bg-white/10 text-white py-3 rounded-xl font-bold opacity-60 cursor-not-allowed">
                    Loading...
                  </button>
                ) : userId ? (
                  <a
                    href={SINGLE_CHECKOUT_URL}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Zap className="w-4 h-4" /> Buy Now
                  </a>
                ) : (
                  <Link
                    href="/login"
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform"
                  >
                    <Zap className="w-4 h-4" /> Login to Buy
                  </Link>
                )}
              </div>

              {/* Pro Monthly */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all text-left">
                <h3 className="text-xl font-bold text-gray-300 mb-2">
                  Pro Monthly
                </h3>

                <div className="text-4xl font-bold text-white mb-8">
                  $5{" "}
                  <span className="text-sm text-gray-500 font-normal">
                    / month
                  </span>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <PricingCheck text="Everything in Single" active />
                  <PricingCheck text="Unlimited Exports" active />
                  <PricingCheck text="Priority Support" active />
                </div>

                {loadingUser ? (
                  <button className="w-full bg-white/10 text-white py-3 rounded-xl font-bold opacity-60 cursor-not-allowed">
                    Loading...
                  </button>
                ) : userId ? (
                  <a
                    href={PRO_CHECKOUT_URL}
                    className="w-full bg-white text-black py-3 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors"
                  >
                    Subscribe
                  </a>
                ) : (
                  <Link
                    href="/login"
                    className="w-full bg-white text-black py-3 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors"
                  >
                    Login to Subscribe
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </section>

        {/* 💻 PREVIEW */}
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

        {/* ⚡ FEATURES */}
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
              desc="Simply describe your topic. Our AI researches and plots the events accurately."
            />
            <FeatureCard
              icon={<FileText className="text-red-400 w-6 h-6" />}
              title="HD Export"
              desc="Get high-quality PDF or PNG files. Perfect for assignments and presentations."
            />
            <FeatureCard
              icon={<Zap className="text-yellow-400 w-6 h-6" />}
              title="Smart Editor"
              desc="Want to change a date? Just edit it. The layout adjusts itself automatically."
            />
          </div>
        </section>

        {/* 🗣️ TESTIMONIALS */}
        <section
          id="testimonials"
          className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden"
        >
          <div className="text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">
              Real feedback.
            </h2>
            <p className="text-gray-400">Join our growing community of creators.</p>
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
                      <div className="font-bold text-white text-sm">{t.name}</div>
                      <div className="text-xs text-purple-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      {/* 🦶 FOOTER */}
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
