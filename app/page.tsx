"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  History,
  FileText,
  Zap,
  Globe,
  ChevronLeft,
  ChevronRight,
  Check,
  FileSpreadsheet,
  LayoutTemplate,
  Palette,
  Star,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const previewImages = ["/preview.png", "/preview1.png", "/preview2.png"];

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "History Student",
    content:
      "This tool saved my final project! I created a timeline of the French Revolution in 2 minutes. The AI research is scary good.",
    rating: 5,
  },
  {
    name: "Dr. Robert Chen",
    role: "University Professor",
    content:
      "I recommend this to all my students. It helps them visualize historical context better than any textbook ever could.",
    rating: 5,
  },
  {
    name: "Marco Diaz",
    role: "Project Manager",
    content:
      "Not just for students! I use it for my product roadmaps. The design is clean and the exports are high-quality.",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "High School Teacher",
    content:
      "The Smart Paste feature is a game changer. My students just paste their notes and boom—a beautiful timeline.",
    rating: 5,
  },
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ✅ Auto slide (same functionality)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === previewImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) =>
      prev === previewImages.length - 1 ? 0 : prev + 1
    );
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? previewImages.length - 1 : prev - 1));

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* ✅ NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight">
              AI Timeline Maker
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-white transition-colors">
              Testimonials
            </a>
          </div>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/es"
              className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors border border-white/10 px-2.5 py-1.5 rounded-md hover:bg-white/5"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>ES</span>
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
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

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg border border-white/10 bg-white/5"
            onClick={() => setMobileMenu((s) => !s)}
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="md:hidden border-t border-white/5 bg-[#050505]/95 backdrop-blur-lg"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 text-gray-300">
                <a
                  href="#features"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 hover:text-white"
                >
                  Features
                </a>
                <a
                  href="#pricing"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 hover:text-white"
                >
                  Pricing
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenu(false)}
                  className="py-2 hover:text-white"
                >
                  Testimonials
                </a>

                <div className="h-px bg-white/10 my-2" />

                <div className="flex items-center gap-3">
                  <Link
                    href="/es"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center gap-2 text-sm font-bold text-gray-300 border border-white/10 px-3 py-2 rounded-lg hover:bg-white/5"
                  >
                    <Globe className="w-4 h-4" /> ES
                  </Link>
                  <Link
                    href="/login"
                    onClick={() => setMobileMenu(false)}
                    className="text-sm font-medium text-gray-300 hover:text-white"
                  >
                    Login
                  </Link>
                </div>

                <Link
                  href="/create"
                  onClick={() => setMobileMenu(false)}
                  className="mt-2 bg-white text-black px-5 py-3 rounded-xl text-sm font-bold text-center hover:bg-gray-200"
                >
                  Get Started Free
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ✅ HERO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-14 sm:pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] sm:w-[700px] h-[520px] sm:h-[700px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-medium text-purple-200 mb-7 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            Join early users — Free for students.
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-5 leading-[1.05]">
            Create{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Historical & Project
            </span>{" "}
            <br className="hidden sm:block" />
            Timelines in Seconds
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
            Type your topic and our AI builds a clean, visual timeline instantly — perfect for
            assignments, documentaries, and roadmaps.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link
              href="/create"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-7 py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40"
            >
              Generate My Timeline <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/pricing"
              className="w-full sm:w-auto border border-white/10 bg-white/5 hover:bg-white/10 text-white px-7 py-4 rounded-xl font-bold text-base sm:text-lg transition-all"
            >
              View Pricing
            </Link>
          </div>
        </motion.div>

        {/* ✅ PREVIEW (mobile-friendly controls + dots) */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative mx-auto max-w-5xl"
        >
          <div className="rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/40 overflow-hidden">
            <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="ml-2 text-xs text-gray-400 hidden sm:block">
                Live preview
              </span>
            </div>

            <div className="relative bg-[#050505] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={previewImages[currentSlide]}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.35 }}
                  alt={`Timeline Preview ${currentSlide + 1}`}
                  className="w-full h-auto object-cover"
                />
              </AnimatePresence>

              {/* Always visible on mobile */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 p-2 rounded-full border border-white/10 transition-opacity z-10"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 p-2 rounded-full border border-white/10 transition-opacity z-10"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {previewImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentSlide ? "w-7 bg-white/80" : "w-3 bg-white/30"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ✅ FEATURES */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 tracking-tighter">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Speed & Beauty
            </span>
            .
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Clean exports, smart editor, and AI generation that feels instant.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <FeatureCard
            icon={<Sparkles className="text-purple-400" />}
            title="Smart Paste (AI)"
            desc="Paste notes or Wikipedia text — AI turns it into a timeline."
          />
          <FeatureCard
            icon={<FileSpreadsheet className="text-blue-400" />}
            title="Magic Sync"
            desc="Use structured data to create roadmaps faster."
          />
          <FeatureCard
            icon={<LayoutTemplate className="text-emerald-400" />}
            title="Templates"
            desc="History, startups, exams — pick a layout and go."
          />
          <FeatureCard
            icon={<Palette className="text-pink-400" />}
            title="Design First"
            desc="Professional visuals that look great on PDF and slides."
          />
        </div>
      </section>

      {/* ✅ TESTIMONIALS (reliable + professional) */}
      <section id="testimonials" className="py-16 sm:py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-14 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold italic tracking-tighter">
            Loved by Students & Teachers
          </h2>
          <p className="text-gray-400 mt-3">
            Real feedback from early users.
          </p>
        </div>

        <div className="relative">
          <motion.div
            className="flex gap-4 sm:gap-6 px-4 sm:px-6"
            animate={{ x: "-50%" }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            style={{ width: "fit-content" }}
          >
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[340px] bg-[#0f172a] border border-white/5 p-6 sm:p-8 rounded-3xl"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-yellow-500 text-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm mb-6 italic leading-relaxed">
                  "{t.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center font-bold text-purple-300">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-gray-500 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* subtle fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-[#050505] to-transparent" />
        </div>
      </section>

      {/* ✅ PRICING CTA (no payment logic here, only link) */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="mb-10 sm:mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">
            Invest in your Grades
          </h2>
          <p className="text-gray-400">
            Start free, upgrade anytime when you're ready to export.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          <PricingCard
            title="Free Starter"
            price="$0"
            features={["Unlimited Drafts", "Basic AI Generation", "Watermarked Export"]}
            link="/create"
          />
          <PricingCard
            title="Single Project"
            price="$2"
            featured
            features={["Remove Watermark", "HD PDF & PNG Export", "Premium AI Models"]}
            link="/pricing"
          />
          <PricingCard
            title="Pro Monthly"
            price="$5"
            features={["Unlimited Exports", "Priority Support", "Cancel Anytime"]}
            link="/pricing"
          />
        </div>
      </section>

      {/* ✅ ONE PROFESSIONAL FOOTER (NO extra copyright strip) */}
      <footer className="border-t border-white/10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <History className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">AI Timeline Maker</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Make history and projects visual — fast, clean, and export-ready.
              </p>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-300 tracking-widest mb-3">
                PRODUCT
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link href="/pricing" className="hover:text-white">Pricing</Link>
                <Link href="/create" className="hover:text-white">Create Timeline</Link>
                <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-300 tracking-widest mb-3">
                COMPANY
              </div>
              <div className="flex flex-col gap-2 text-sm text-gray-400">
                <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white">Terms of Service</Link>
                <Link href="/refund" className="hover:text-white">Refund Policy</Link>
                <Link href="/contact" className="hover:text-white">Contact</Link>
              </div>
            </div>

            <div>
              <div className="text-xs font-bold text-gray-300 tracking-widest mb-3">
                GET STARTED
              </div>
              <p className="text-sm text-gray-400 mb-4">
                Try it free. Upgrade only when you need exports.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-5 py-3 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Start Free <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <div>© {year} AI Timeline Maker. All rights reserved.</div>
            <div>Made with ❤️ in India.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#0f172a] border border-white/5 p-6 sm:p-8 rounded-3xl hover:border-purple-500/30 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, featured, link }: any) {
  return (
    <div
      className={`relative p-8 rounded-2xl flex flex-col ${
        featured
          ? "bg-[#1a1033] border-2 border-purple-500 shadow-2xl"
          : "bg-[#0f172a]/50 border border-white/10 hover:border-white/20"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase">
          Popular
        </div>
      )}

      <h3 className={`text-lg font-bold mb-2 ${featured ? "text-purple-200" : "text-gray-200"}`}>
        {title}
      </h3>

      <div className="text-4xl font-bold text-white mb-6">{price}</div>

      <div className="space-y-3 mb-7 flex-1">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-300">{f}</span>
          </div>
        ))}
      </div>

      <Link
        href={link}
        className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
          featured
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {title === "Free Starter" ? "Start Free" : title === "Single Project" ? "Buy Now" : "Subscribe"}
      </Link>
    </div>
  );
}
