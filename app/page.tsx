"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, History, FileText, Zap, Globe, ChevronLeft, ChevronRight, Check, FileSpreadsheet, LayoutTemplate, Palette, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const previewImages = ["/preview.png", "/preview1.png", "/preview2.png"];

const testimonials = [
  { name: "Sarah Jenkins", role: "History Student", content: "This tool saved my final project! I created a timeline of the French Revolution in 2 minutes. The AI research is scary good.", rating: 5 },
  { name: "Dr. Robert Chen", role: "University Professor", content: "I recommend this to all my students. It helps them visualize historical context better than any textbook ever could.", rating: 5 },
  { name: "Marco Diaz", role: "Project Manager", content: "Not just for students! I use it for my product roadmaps. The design is clean and the exports are high-quality.", rating: 5 },
  { name: "Emily Watson", role: "High School Teacher", content: "The Smart Paste feature is a game changer. My students just paste their notes and boom—a beautiful timeline.", rating: 5 }
];

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === previewImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === previewImages.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? previewImages.length - 1 : prev - 1));

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 🌟 NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                    <History className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">AI Timeline Maker</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            </div>

            <div className="flex items-center gap-6">
                <Link href="/es" className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-2">
                    <Globe className="w-3 h-3" />
                    <span>ES</span>
                </Link>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Login</Link>
                <Link href="/create" className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-200 transition-transform hover:scale-105 shadow-xl">Get Started Free</Link>
            </div>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 px-4 py-1.5 rounded-full text-xs font-medium text-purple-300 mb-8 backdrop-blur-md">
                <Sparkles className="w-3 h-3" /> Join early users & simplify your projects. Free for Students.
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Create <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Historical & Project</span> <br />
                Timelines in Seconds
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-center">
                Whether it's for a history assignment or a project roadmap, just type your topic and our AI builds a visual timeline instantly.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                <Link href="/create" className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40">
                    Generate My Timeline <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </motion.div>

        {/* 💻 BROWSER MOCKUP WITH SLIDER */}
        <motion.div id="preview" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative mx-auto max-w-5xl group">
            <div className="rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/40 overflow-hidden">
                <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center justify-between px-4">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                </div>
                <div className="relative h-auto bg-[#050505] overflow-hidden group">
                    <AnimatePresence mode="wait">
                      <motion.img 
                          key={currentSlide}
                          src={previewImages[currentSlide]}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.5 }}
                          alt={`Timeline Preview ${currentSlide + 1}`}
                          className="w-full h-auto object-cover opacity-95"
                      />
                    </AnimatePresence>
                    <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 p-2 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </div>
            </div>
        </motion.div>
      </main>

      {/* ⚡ FEATURES SECTION */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tighter">
                  Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Speed & Beauty.</span>
              </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
              <FeatureCard icon={<Sparkles className="text-purple-400" />} title="Smart Paste (AI)" desc="Paste text from Wikipedia or notes. AI builds the timeline for you." />
              <FeatureCard icon={<FileSpreadsheet className="text-blue-400" />} title="Magic Sync" desc="Connect Sheets or Notion to transform data into roadmaps instantly." />
              <FeatureCard icon={<LayoutTemplate className="text-emerald-400" />} title="1000+ Templates" desc="From History to Startups—access ready-to-use templates in seconds." />
              <FeatureCard icon={<Palette className="text-pink-400" />} title="Design First" desc="Instagram-ready graphics that make your projects stand out in class." />
          </div>
      </section>

      {/* ⭐ TESTIMONIALS SECTION (The सुंदर Scrolling one) */}
      <section id="testimonials" className="py-24 bg-[#050505] overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-bold italic tracking-tighter">Loved by Students & Teachers</h2>
          </div>
          <div className="flex gap-6 animate-scroll whitespace-nowrap">
              {[...testimonials, ...testimonials].map((t, i) => (
                  <div key={i} className="inline-block w-[350px] bg-[#0f172a] border border-white/5 p-8 rounded-3xl whitespace-normal">
                      <div className="flex gap-1 mb-4">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                      </div>
                      <p className="text-gray-300 text-sm mb-6 italic leading-relaxed">"{t.content}"</p>
                      <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center font-bold text-purple-400">{t.name[0]}</div>
                          <div>
                              <div className="text-white font-bold text-sm">{t.name}</div>
                              <div className="text-gray-500 text-xs">{t.role}</div>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      {/* 💰 PRICING SECTION */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">Invest in your Grades</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left items-stretch">
              <PricingCard title="Free Starter" price="$0" features={["Unlimited Drafts", "Basic AI Generation", "Watermarked Export"]} link="/create" />
              <PricingCard title="Single Project" price="$2" featured features={["Remove Watermark", "HD PDF & PNG Export", "Lifetime Access", "Premium AI Models"]} link="/create" />
              <PricingCard title="Pro Monthly" price="$5" features={["Unlimited Exports", "Priority 24/7 Support", "Early Access Features", "Cancel Anytime"]} link="/create" />
          </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <div className="bg-[#0f172a] border border-white/5 p-8 rounded-3xl hover:border-purple-500/30 transition-all group">
      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function PricingCard({ title, price, features, featured, link }: any) {
  return (
    <div className={`p-8 rounded-2xl flex flex-col ${featured ? 'bg-[#1a1033] border-2 border-purple-500 transform scale-105 z-10 shadow-2xl' : 'bg-[#0f172a]/50 border border-white/10 hover:border-white/20'}`}>
      {featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase">Best for Students</div>}
      <h3 className={`text-xl font-bold mb-2 ${featured ? 'text-purple-300' : 'text-gray-300'}`}>{title}</h3>
      <div className="text-4xl font-bold text-white mb-8">{price}</div>
      <div className="space-y-4 mb-8 flex-1">
          {features.map((f: string, i: number) => (
              <div key={i} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">{f}</span>
              </div>
          ))}
      </div>
      <Link href={link} className={`w-full py-3 rounded-xl font-bold text-center transition-all ${featured ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg' : 'bg-white text-black hover:bg-gray-200'}`}>
          {title === "Free Starter" ? "Start Free" : title === "Single Project" ? "Buy Now" : "Subscribe"}
      </Link>
    </div>
  );
}

function PricingCheck({ text, active }: any) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full flex items-center justify-center ${active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'}`}>
                <Check className="w-2.5 h-2.5" />
            </div>
            <span className={`text-sm ${active ? 'text-white' : 'text-gray-400'}`}>{text}</span>
        </div>
    )
}