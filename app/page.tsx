"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, History, FileText, Zap, Star, CheckCircle, Check, Globe, Quote, Twitter, Instagram, Github } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  { name: "Sarah Jenkins", role: "History Teacher", text: "Transformed how my students understand chronology. The AI is shockingly accurate." },
  { name: "David Chen", role: "PhD Student", text: "Saved me 10+ hours on my thesis visualization. Export quality is publishing-ready." },
  { name: "Emily Roberts", role: "YouTuber", text: "The visuals are stunning. I use the PNG exports directly in my documentary videos." },
  { name: "Jessica Lee", role: "Student", text: "Got an 'A' on my history final! The timeline looked so professional." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 🌟 NAVBAR (ES Button Restored) */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-left">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
                    <History className="text-white w-5 h-5" />
                </div>
                <span className="text-xl font-bold tracking-tight">AI Timeline Maker</span>
            </div>
            
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-400">
                <Link href="#features" className="hover:text-white transition-colors">Features</Link>
                <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
                <Link href="#testimonials" className="hover:text-white transition-colors">Testimonials</Link>
            </div>

            <div className="flex gap-4 items-center">
                <Link href="/es" className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-2 border border-white/10 px-2 py-1 rounded-md hover:bg-white/5" title="Ir a Español">
                    <Globe className="w-3 h-3" />
                    <span>ES</span>
                </Link>
                <Link href="/login" className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">Login</Link>
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

        {/* 💻 BROWSER MOCKUP - Updated Path */}
        <motion.div id="preview" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative mx-auto max-w-5xl group">
            <div className="rounded-2xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/40 overflow-hidden">
                <div className="h-10 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                </div>
                
                <div className="relative h-auto bg-[#050505] overflow-hidden">
                    <img 
                        src="/preview.png" 
                        alt="AI Generated Timeline Preview" 
                        className="w-full h-auto object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-purple-600/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-2xl border border-white/20">
                        <Sparkles className="w-3 h-3" /> Actual AI Output
                    </div>
                </div>
            </div>
        </motion.div>
      </main>

      {/* ⚡ FEATURES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter">Everything you need.</h2>
              <p className="text-gray-400 text-center">Designed for speed, accuracy, and professional results.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
              <FeatureCard icon={<Sparkles className="text-purple-400" />} title="AI Brain" desc="Simply describe your topic. Our AI researches and plots the events accurately." />
              <FeatureCard icon={<FileText className="text-red-400" />} title="HD Export" desc="Get high-quality PDF or PNG files. Perfect for assignments and presentations." />
              <FeatureCard icon={<Zap className="text-yellow-400" />} title="Smart Editor" desc="Want to change a date? Just edit it. The layout adjusts itself automatically." />
              <FeatureCard icon={<Globe className="text-blue-400" />} title="Multi-Language" desc="Supports Spanish, English, and more. Perfect for local and world history projects." />
              <FeatureCard icon={<CheckCircle className="text-green-400" />} title="Fact Checked" desc="Our AI verifies historical data points to ensure your work is reliable." />
              <FeatureCard icon={<Star className="text-orange-400" />} title="Custom Themes" desc="Switch between clean, dark, or colorful themes to match your project's vibe." />
          </div>
      </section>

      {/* 🗣️ TESTIMONIALS (Restored) */}
      <section id="testimonials" className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="text-center mb-16 px-6 relative z-10 text-center">
             <h2 className="text-3xl md:text-5xl font-bold mb-4 italic">Real feedback.</h2>
             <p className="text-gray-400 text-center">Join our growing community of students and creators.</p>
        </div>
        
        <div className="flex overflow-hidden">
            <motion.div className="flex gap-6 px-6" animate={{ x: "-50%" }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} style={{ width: "fit-content" }}>
                {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="w-[350px] md:w-[400px] flex-shrink-0 bg-[#0f172a] border border-white/5 p-8 rounded-2xl relative text-left">
                        <Quote className="absolute top-6 right-6 text-white/5 w-10 h-10" />
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed font-medium text-left">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                                {t.name[0]}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-white text-sm">{t.name}</div>
                                <div className="text-xs text-purple-400 font-medium tracking-wide">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 💰 PRICING - Restored Original Styles & Content */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 text-center">
          <div className="mb-16 text-center">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 italic tracking-tighter text-center">Invest in your Grades</h2>
              <p className="text-gray-400 text-center">Choose the plan that fits your project needs. No hidden fees.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left">
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
                  <button className="w-full bg-white text-black py-3 rounded-xl font-bold cursor-default">StartFree</button>
              </div>

              <div className="bg-[#1a1033] border border-purple-500 p-8 rounded-2xl flex flex-col relative transform hover:-translate-y-2 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff2e9b] text-white px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-lg">Best for Students</div>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Single Project</h3>
                  <div className="text-4xl font-bold text-white mb-2">$2 <span className="text-sm text-gray-500 font-normal">/ once</span></div>
                  <p className="text-gray-500 text-sm mb-8 italic text-left">For that one important assignment.</p>
                  <div className="space-y-4 mb-8 flex-1 text-left">
                      <PricingCheck text="Remove Watermark" active />
                      <PricingCheck text="HD PDF & PNG Export" active />
                      <PricingCheck text="Lifetime Access" active />
                      <PricingCheck text="Premium AI Models" active />
                      <PricingCheck text="No Subscription" active />
                  </div>
                  <Link href="/pricing" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-xl font-bold text-center flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
                      <Zap className="w-4 h-4 fill-current" /> Buy Now
                  </Link>
              </div>

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
                  <Link href="/pricing" className="w-full bg-white text-black py-3 rounded-xl font-bold text-center hover:bg-gray-200 transition-colors shadow-lg">Subscribe</Link>
              </div>
          </div>
      </section>

      {/* 🦶 FOOTER (Centered Copyright Restored) */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10 text-left">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1">
                  <div className="flex items-center gap-2 mb-4 text-left">
                        <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center font-bold text-white shadow-lg">
                            <History className="text-white w-3 h-3" />
                        </div>
                        <span className="text-lg font-bold tracking-tight text-left">AI Timeline Maker</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xs text-left">
                      Making history visual and interactive for everyone. Built with AI power for students and professionals.
                  </p>
                  <div className="flex gap-4 mt-6 text-gray-400">
                    <Twitter className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    <Instagram className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                    <Github className="w-4 h-4 hover:text-white cursor-pointer transition-colors" />
                  </div>
              </div>
              
              <div className="text-left">
                  <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest text-left">Product</h4>
                  <ul className="space-y-2 text-sm text-gray-400 text-left">
                      <li><Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
                      <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                      <li><Link href="/create" className="hover:text-purple-400 transition-colors">Create Timeline</Link></li>
                  </ul>
              </div>

              <div className="text-left">
                  <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest text-left">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400 text-left">
                      <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                      <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
                      <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                  </ul>
              </div>

              <div className="text-left">
                  <h4 className="font-bold mb-4 text-white uppercase text-xs tracking-widest text-left">Newsletter</h4>
                  <div className="flex gap-2">
                      <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-purple-500 text-white" />
                      <button className="bg-purple-600 hover:bg-purple-500 p-2 rounded-lg transition-colors"><ArrowRight className="w-4 h-4 text-white"/></button>
                  </div>
              </div>
          </div>
          <div className="text-center text-gray-600 text-[10px] pt-8 border-t border-white/5 uppercase tracking-widest">
              © 2026 aitimelinemaker.online. Made with ❤️ in India.
          </div>
      </footer>
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