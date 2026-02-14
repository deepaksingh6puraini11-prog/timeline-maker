"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  History,
  Globe,
  ChevronLeft,
  ChevronRight,
  Check,
  FileSpreadsheet,
  LayoutTemplate,
  Palette,
  Star,
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

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* ✅ local-only marquee animation (no tailwind config needed) */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
            transform: none !important;
          }
        }
      `}</style>

      {/* 🌟 NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-2 min-w-[160px]">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20">
              <History className="text-white w-5 h-5" />
            </div>
            <span className="text-base sm:text-xl font-bold tracking-tight whitespace-nowrap">
              AI Timeline Maker
            </span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
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

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/es"
              className="hidden sm:flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors border border-white/10 px-2.5 py-1.5 rounded-md hover:bg-white/5"
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
              className="bg-white text-black px-4 sm:px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-transform hover:scale-105 shadow-xl whitespace-nowrap"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-12 sm:pb-16 text-center relative">
        <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[520px] h-[520px] sm:w-[650px] sm:h-[650px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-2 rounded-full text-[11px] sm:text-xs font-medium text-purple-300 mb-6 sm:mb-8 backdrop-blur-md">
            <Sparkles className="w-3 h-3" />
            Join early users & simplify your projects. Free for Students.
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-5 sm:mb-6 leading-[1.15]">
            Create{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
              Historical & Project
            </span>{" "}
            <br className="hidden sm:block" />
            Timelines in Seconds
          </h1>

          <p className="text-gray-400 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            Whether it's for a history assignment or a project roadmap, just type
            your topic and our AI builds a visual timeline instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16">
            <Link
              href="/create"
              className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40"
            >
              Generate My Timeline <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>

        {/* 💻 BROWSER MOCKUP WITH SLIDER */}
        <motion.div
          id="preview"
          initial={{ opacity: 0, y: 34 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.75 }}
          className="relative mx-auto max-w-5xl group"
        >
          <div className="rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/40 overflow-hidden">
            <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>

              {/* small dots */}
              <div className="hidden sm:flex items-center gap-2">
                {previewImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 w-6 rounded-full transition-all ${
                      i === currentSlide ? "bg-white/70" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="relative bg-[#050505] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={previewImages[currentSlide]}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.45 }}
                  alt={`Timeline Preview ${currentSlide + 1}`}
                  className="w-full h-auto object-cover opacity-95"
                />
              </AnimatePresence>

              {/* Controls: always visible on mobile, hover on desktop */}
              <button
                onClick={prevSlide}
                aria-label="Previous slide"
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 p-2.5 rounded-full border border-white/10 transition-opacity z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next slide"
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 bg-black/55 hover:bg-black/80 p-2.5 rounded-full border border-white/10 transition-opacity z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </button>
            </div>
          </div>
        </motion.div>
      </main>

      {/* ⚡ FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tighter">
            Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              Speed & Beauty.
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Clean designs, fast generation, and exports that look like you hired a designer.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          <FeatureCard
            icon={<Sparkles className="text-purple-400" />}
            title="Smart Paste (AI)"
            desc="Paste text from Wikipedia or notes. AI builds the timeline for you."
          />
          <FeatureCard
            icon={<FileSpreadsheet className="text-blue-400" />}
            title="Magic Sync"
            desc="Connect Sheets or Notion to transform data into roadmaps instantly."
          />
          <FeatureCard
            icon={<LayoutTemplate className="text-emerald-400" />}
            title="1000+ Templates"
            desc="From History to Startups—access ready-to-use templates in seconds."
          />
          <FeatureCard
            icon={<Palette className="text-pink-400" />}
            title="Design First"
            desc="Instagram-ready graphics that make your projects stand out in class."
          />
        </div>
      </section>

      {/* ⭐ TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-16 sm:py-24 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-10 sm:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold italic tracking-tighter">
            Loved by Students & Teachers
          </h2>
          <p className="text-gray-400 mt-3 text-sm sm:text-base">
            Real feedback from people using it for school, teaching, and work.
          </p>
        </div>

        <div className="relative">
          <div className="flex gap-5 sm:gap-6 whitespace-nowrap marquee">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="inline-block w-[280px] sm:w-[340px] bg-[#0f172a] border border-white/5 p-6 sm:p-8 rounded-3xl whitespace-normal align-top"
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
          </div>

          {/* subtle fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#050505] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#050505] to-transparent" />
        </div>
      </section>

      {/* 💰 PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-bold mb-3 italic tracking-tighter">
            Invest in your Grades
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Start free. Upgrade when you’re ready to export clean, high-quality timelines.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto text-left items-stretch">
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
            features={[
              "Remove Watermark",
              "HD PDF & PNG Export",
              "Lifetime Access (1 project)",
              "Premium AI Models",
            ]}
            link="/create"
          />
          <PricingCard
            title="Pro Monthly"
            price="$5"
            features={[
              "Unlimited Exports",
              "Priority 24/7 Support",
              "Early Access Features",
              "Cancel Anytime",
            ]}
            link="/create"
          />
        </div>
      </section>

      {/* FOOTER (simple) */}
      <footer className="border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <History className="text-purple-500 w-5 h-5" />
            <span className="font-bold">AI Timeline Maker</span>
          </div>
          <div className="text-gray-600 text-xs">
            © {new Date().getFullYear()} aitimelinemaker.online
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#0f172a] border border-white/5 p-6 sm:p-8 rounded-3xl hover:border-purple-500/30 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, featured, link }: any) {
  return (
    <div
      className={`relative p-6 sm:p-8 rounded-2xl flex flex-col ${
        featured
          ? "bg-[#1a1033] border-2 border-purple-500 md:transform md:scale-105 z-10 shadow-2xl shadow-purple-900/25"
          : "bg-[#0f172a]/50 border border-white/10 hover:border-white/20"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase shadow-lg">
          Best for Students
        </div>
      )}

      <h3
        className={`text-lg sm:text-xl font-bold mb-2 ${
          featured ? "text-purple-200" : "text-gray-200"
        }`}
      >
        {title}
      </h3>

      <div className="text-4xl font-bold text-white mb-7">{price}</div>

      <div className="space-y-3.5 mb-8 flex-1">
        {features.map((f: string, i: number) => (
          <div key={i} className="flex items-center gap-3">
            <Check className="w-4 h-4 text-green-400 shrink-0" />
            <span className="text-sm text-gray-300">{f}</span>
          </div>
        ))}
      </div>

      <Link
        href={link}
        className={`w-full py-3 rounded-xl font-bold text-center transition-all ${
          featured
            ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg hover:opacity-95"
            : "bg-white text-black hover:bg-gray-200"
        }`}
      >
        {title === "Free Starter"
          ? "Start Free"
          : title === "Single Project"
          ? "Buy Now"
          : "Subscribe"}
      </Link>
    </div>
  );
}
