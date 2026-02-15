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
  ShieldCheck,
  Crown,
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
    <div className="flex items-start gap-3">
      <div
        className={[
          "mt-0.5 w-5 h-5 rounded-full flex items-center justify-center border",
          active
            ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
            : "bg-white/5 text-gray-400 border-white/10",
        ].join(" ")}
      >
        <Check className="w-3 h-3" />
      </div>
      <span className={active ? "text-sm text-gray-100" : "text-sm text-gray-400"}>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7 hover:bg-white/[0.05] hover:border-white/20 transition-all text-left">
      <div className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mt-2">{desc}</p>
    </div>
  );
}

function PlanCard({
  badge,
  title,
  price,
  subtitle,
  highlight,
  features,
  cta,
  ctaVariant,
  disabled,
  onClick,
}: {
  badge?: string;
  title: string;
  price: string;
  subtitle: string;
  highlight?: boolean;
  features: { text: string; active: boolean }[];
  cta: string;
  ctaVariant: "primary" | "secondary";
  disabled?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className={[
        "relative rounded-2xl border p-7 md:p-8 text-left flex flex-col",
        highlight
          ? "border-purple-500/50 bg-gradient-to-b from-purple-500/10 to-white/[0.02] shadow-[0_0_60px_rgba(168,85,247,0.15)]"
          : "border-white/10 bg-white/[0.03]",
      ].join(" ")}
    >
      {badge ? (
        <div className="absolute -top-3 left-6">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-[11px] font-semibold text-gray-100">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            {badge}
          </span>
        </div>
      ) : null}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
        </div>

        {highlight ? (
          <div className="flex items-center gap-1 text-xs font-semibold text-purple-200 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-full">
            <Crown className="w-3.5 h-3.5" />
            Recommended
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        <div className="flex items-end gap-2">
          <div className="text-4xl font-bold text-white leading-none">{price}</div>
        </div>
      </div>

      <div className="mt-6 space-y-3 flex-1">
        {features.map((f, idx) => (
          <PricingCheck key={idx} text={f.text} active={f.active} />
        ))}
      </div>

      <button
        onClick={onClick}
        disabled={disabled}
        className={[
          "mt-7 w-full rounded-xl font-semibold py-3.5 transition-all flex items-center justify-center gap-2",
          disabled ? "opacity-60 cursor-not-allowed" : "hover:translate-y-[-1px]",
          ctaVariant === "primary"
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-900/25"
            : "bg-white text-black hover:bg-gray-200",
        ].join(" ")}
      >
        {ctaVariant === "primary" ? <Zap className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
        {cta}
      </button>

      <p className="mt-3 text-xs text-gray-500 flex items-center gap-2">
        <ShieldCheck className="w-3.5 h-3.5 text-gray-500" />
        Secure checkout · Instant access
      </p>
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

        const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
          if (!mounted) return;
          setUserId(session?.user?.id ?? null);
        });

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

  const STORE_DOMAIN = "timelinemakerai.lemonsqueezy.com";
  const BUY_ID_SINGLE = "0925ec6f-d5c6-4631-b7d6-5dceda7d8ef1";
  const BUY_ID_MONTHLY = "be758e5d-a55a-4f5a-9843-973813a9805c";

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

  const isLoggedIn = !!userId;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Background polish */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.22),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(59,130,246,0.10),transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:64px_64px]" />
      </div>

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#050505]/75 border-b border-white/10">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/25">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-semibold tracking-tight">
              AI Timeline Maker
            </span>
          </Link>

          <div className="hidden md:flex gap-8 text-sm font-medium text-gray-300">
            <Link href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#testimonials" className="hover:text-white transition-colors">
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/es"
              className="hidden sm:flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-white border border-white/10 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Globe className="w-4 h-4" />
              ES
            </Link>

            <Link
              href={isLoggedIn ? "/dashboard" : "/login"}
              className="hidden sm:inline-flex text-sm font-medium text-gray-200 hover:text-white transition-colors px-3 py-2 rounded-lg"
            >
              {isLoggedIn ? "Dashboard" : "Login"}
            </Link>

            <Link
              href="/create"
              className="inline-flex bg-white text-black px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 mx-auto w-full max-w-6xl px-5 sm:px-6 pt-14 pb-20">
        {/* HERO */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="mx-auto max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-4 py-2 text-xs text-gray-200">
              <Sparkles className="w-4 h-4 text-purple-300" />
              Clean exports · Premium AI · Instant access
            </div>

            <h1 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight text-white">
              Simple pricing for serious results
            </h1>

            <p className="mt-4 text-gray-300/90 text-base md:text-lg leading-relaxed">
              Start free. Upgrade only when you’re ready to export HD PDF/PNG and remove watermark.
            </p>

            <div className="mt-6 text-sm text-gray-400">
              {loadingUser ? (
                <span>Checking your login…</span>
              ) : isLoggedIn ? (
                <span>
                  You’re logged in:{" "}
                  <span className="text-gray-200 font-medium">checkout will include your user_id</span>
                </span>
              ) : (
                <span>
                  Not logged in:{" "}
                  <span className="text-gray-200 font-medium">we’ll ask you to login before checkout</span>
                </span>
              )}
            </div>
          </motion.div>
        </section>

        {/* PRICING */}
        <section id="pricing" className="mt-14">
          <div className="grid lg:grid-cols-3 gap-6">
            <PlanCard
              title="Free"
              price="$0"
              subtitle="Drafts & basic AI"
              features={[
                { text: "Unlimited drafts", active: true },
                { text: "Basic AI generation", active: true },
                { text: "Watermarked export", active: true },
                { text: "HD PDF/PNG export", active: false },
              ]}
              cta="Current Plan"
              ctaVariant="secondary"
              disabled
            />

            <PlanCard
              badge="One-time (1 project)"
              title="Single Project"
              price="$2"
              subtitle="Unlock export for one project"
              highlight
              features={[
                { text: "Remove watermark", active: true },
                { text: "HD PDF & PNG export", active: true },
                { text: "Premium AI models (for this project)", active: true },
                { text: "Next project needs purchase again", active: true },
              ]}
              cta={loadingUser ? "Loading…" : userId ? "Buy Now" : "Login to Buy"}
              ctaVariant="primary"
              disabled={loadingUser}
              onClick={() => goCheckout("single")}
            />

            <PlanCard
              title="Pro Monthly"
              price="$5"
              subtitle="Unlimited exports + premium models"
              features={[
                { text: "Unlimited exports", active: true },
                { text: "Premium AI models", active: true },
                { text: "Priority support", active: true },
                { text: "Cancel anytime", active: true },
              ]}
              cta={loadingUser ? "Loading…" : userId ? "Subscribe" : "Login to Subscribe"}
              ctaVariant="secondary"
              disabled={loadingUser}
              onClick={() => goCheckout("monthly")}
            />
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs text-gray-400">
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
              <ShieldCheck className="w-4 h-4" /> Secure checkout
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
              <FileText className="w-4 h-4" /> HD PDF/PNG export
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-white/10 bg-white/[0.03]">
              <Zap className="w-4 h-4" /> Instant access
            </span>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Built for speed and clarity
            </h2>
            <p className="text-gray-400 mt-3">
              Create clean timelines that look great in assignments, videos, and reports.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Sparkles className="text-purple-300 w-6 h-6" />}
              title="AI Brain"
              desc="Describe your topic. AI generates events fast and neatly."
            />
            <FeatureCard
              icon={<FileText className="text-rose-300 w-6 h-6" />}
              title="HD Export"
              desc="High-quality PDF & PNG exports that look professional."
            />
            <FeatureCard
              icon={<Zap className="text-yellow-300 w-6 h-6" />}
              title="Smart Editor"
              desc="Edit dates and details; layout adjusts automatically."
            />
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="mt-20 rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
        >
          <div className="px-6 py-10 md:px-10 md:py-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Real feedback from creators
            </h2>
            <p className="text-gray-400 mt-3">
              Students, teachers, researchers — everyone loves clean timelines.
            </p>
          </div>

          <div className="pb-10">
            <motion.div
              className="flex gap-5 px-6 md:px-10"
              animate={{ x: "-50%" }}
              transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
              style={{ width: "fit-content" }}
            >
              {[...testimonials, ...testimonials].map((t, i) => (
                <div
                  key={i}
                  className="w-[320px] md:w-[360px] rounded-2xl border border-white/10 bg-white/[0.03] p-6 relative"
                >
                  <Quote className="absolute top-5 right-5 text-white/10 w-9 h-9" />
                  <p className="text-gray-200/90 mb-5 text-base leading-relaxed">
                    “{t.text}”
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-purple-900/25">
                      {t.name[0]}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white text-sm">
                        {t.name}
                      </div>
                      <div className="text-xs text-purple-200/80">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
}
