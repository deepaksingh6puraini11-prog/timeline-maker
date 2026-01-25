"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, History, FileText, Zap, Globe, ChevronLeft, ChevronRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const previewImages = [
  "/preview.png", 
  "/preview1.png", 
  "/preview2.png", 
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
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <History className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">AI Timeline Maker</span>
            </div>
            
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            </div>

            <div className="flex gap-4 items-center">
                <Link href="/es" className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-2">
                    <Globe className="w-3 h-3" />
                    <span>ES</span>
                </Link>
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
          <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">Everything you need.</h2>
              <p className="text-gray-400">Designed for speed, accuracy, and professional results.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 text-left">
              <FeatureCard icon={<Sparkles className="text-purple-400" />} title="AI Brain" desc="Simply describe your topic. Our AI researches and plots the events accurately." />
              <FeatureCard icon={<FileText className="text-red-400" />} title="HD Export" desc="Get high-quality PDF or PNG files. Perfect for assignments and presentations." />
              <FeatureCard icon={<Zap className="text-yellow-400" />} title="Smart Editor" desc="Want to change a date? Just edit it. The layout adjusts itself automatically." />
          </div>
      </section>

      {/* 💰 PRICING SECTION (Fixed as per screenshot) */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">Invest in your Grades</h2>
              <p className="text-gray-400">Choose the plan that fits your project needs. No hidden fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left items-stretch">
              
              {/* Free Starter */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Free Starter</h3>
                  <div className="text-4xl font-bold text-white mb-2">$0</div>
                  <p className="text-gray-500 text-sm mb-8 italic">Perfect for testing & drafts.</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Unlimited Drafts" active />
                      <PricingCheck text="Basic AI Generation" active />
                      <PricingCheck text="Watermarked Export" active />
                      <PricingCheck text="Standard Support" active />
                  </div>
                  <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Start Free</button>
              </div>

              {/* Single Project (Best for Students) */}
              <div className="bg-[#1a1033] border-2 border-purple-500 p-8 rounded-2xl flex flex-col relative transform scale-105 z-10 shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">
                      Best for Students
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Single Project</h3>
                  <div className="text-4xl font-bold text-white mb-2">$2 <span className="text-sm text-gray-500 font-normal">/ one-time</span></div>
                  <p className="text-gray-500 text-sm mb-8 italic">For that one important assignment.</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Remove Watermark" active />
                      <PricingCheck text="HD PDF & PNG Export" active />
                      <PricingCheck text="Lifetime Access" active />
                      <PricingCheck text="Premium AI Models" active />
                      <PricingCheck text="No Subscription" active />
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg">
                      <Zap className="w-4 h-4 fill-current" /> Buy Now
                  </button>
              </div>

              {/* Pro Monthly */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Pro Monthly</h3>
                  <div className="text-4xl font-bold text-white mb-2">$5 <span className="text-sm text-gray-500 font-normal">/ month</span></div>
                  <p className="text-gray-500 text-sm mb-8 italic">For power users & teachers.</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Everything in Single" active />
                      <PricingCheck text="Unlimited Exports" active />
                      <PricingCheck text="Priority 24/7 Support" active />
                      <PricingCheck text="Early Access Features" active />
                      <PricingCheck text="Cancel Anytime" active />
                  </div>
                  <button className="w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors">Subscribe</button>
              </div>
          </div>
      </section>
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

function FeatureCard({ icon, title, desc }: any) {
    return (
        <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group text-left">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}