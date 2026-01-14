"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, History, FileText, Zap, Star, CheckCircle, Check, Globe, Quote } from "lucide-react";
import { motion } from "framer-motion";

// ... (Baaki data same hai)
const testimonials = [
  { name: "Sarah Jenkins", role: "History Teacher", text: "Transformed how my students understand chronology. The AI is shockingly accurate." },
  { name: "David Chen", role: "PhD Student", text: "Saved me 10+ hours on my thesis visualization. Export quality is publishing-ready." },
  { name: "Emily Roberts", role: "YouTuber", text: "The visuals are stunning. I use the PNG exports directly in my documentary videos." },
  { name: "Prof. Alan Grant", role: "Archeologist", text: "Finally, a timeline tool that actually understands historical context. Highly recommended." },
  { name: "Jessica Lee", role: "Student", text: "Got an 'A' on my history final! The timeline looked so professional compared to others." },
  { name: "Rahul Verma", role: "EdTech Dev", text: "Clean UI, fast generation, and the dark mode is beautiful. Best tool in the market." },
  { name: "Maria Garcia", role: "Literature Student", text: "Perfect for mapping out 'Gabriel García Márquez's' life events. Love the Spanish support." },
  { name: "Tom Hollander", role: "Project Manager", text: "Not just for history! I use this for project roadmaps. It's faster than Jira." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-x-hidden">
      
      {/* 🌟 NAVBAR (English Version) */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-[#050505]/80 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
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
                {/* 🌍 BUTTON TO GO TO SPANISH */}
                <Link 
                  href="/es" 
                  className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors mr-2 border border-white/10 px-2 py-1 rounded-md hover:bg-white/5"
                  title="Ir a Español (Go to Spanish)"
                >
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
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs font-medium text-purple-300 mb-8 backdrop-blur-md">
                <Sparkles className="w-3 h-3" /> Trusted by 10,000+ Students & Historians
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                Create <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">Historical & Project</span> <br />
                Timelines in Seconds
            </h1>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Don't waste hours on design. Just type a topic like "Mexican Independence", "Epocas Literarias" or "History of Cinema", and AI builds it instantly.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                <Link href="/create" className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/40">
                    Create Timeline <ArrowRight className="w-5 h-5" />
                </Link>
                <Link href="#features" className="w-full md:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center justify-center gap-2 transition-all">
                    View Features
                </Link>
            </div>
        </motion.div>

        {/* 💻 BROWSER MOCKUP */}
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }} className="relative mx-auto max-w-5xl">
            <div className="rounded-xl bg-[#0f172a] border border-white/10 shadow-2xl shadow-purple-900/30 overflow-hidden">
                <div className="h-8 bg-[#1e293b] border-b border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-4 flex-1 bg-[#0f172a] h-5 rounded-md mx-auto max-w-lg opacity-50 text-xs flex items-center justify-center text-gray-500">aitimelinemaker.online</div>
                </div>
                <div className="relative h-[300px] md:h-[500px] bg-[#050505] flex items-center justify-center overflow-hidden group">
                      <div className="absolute w-full h-[2px] bg-gray-800"></div>
                      <div className="flex gap-8 md:gap-20 overflow-hidden px-10">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative flex flex-col items-center gap-4 mt-[-60px] md:mt-0">
                                <div className="w-4 h-4 rounded-full bg-[#050505] border-2 border-purple-500 z-10 shadow-[0_0_15px_rgba(168,85,247,0.8)]"></div>
                                <div className="w-48 md:w-64 h-32 md:h-40 bg-[#1a1a1a] border border-white/10 rounded-xl p-4 flex flex-col gap-2 hover:scale-105 transition-transform duration-500 hover:border-purple-500/50">
                                    <div className="w-12 h-3 bg-purple-500/20 rounded"></div>
                                    <div className="w-full h-4 bg-white/10 rounded"></div>
                                    <div className="w-3/4 h-3 bg-white/5 rounded"></div>
                                </div>
                            </div>
                        ))}
                      </div>
                      <div className="absolute bottom-10 bg-black/60 backdrop-blur-md border border-white/10 px-6 py-2 rounded-full text-sm text-gray-300">
                        ✨ AI generated timeline preview
                      </div>
                </div>
            </div>
        </motion.div>
      </main>

      {/* 📊 STATS */}
      <section className="border-y border-white/5 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <StatItem number="10,000+" label="Students" />
              <StatItem number="500+" label="Classrooms" />
              <StatItem number="1M+" label="Events Created" />
              <StatItem number="30%+" label="Time Saved" />
          </div>
      </section>

      {/* ⚡ FEATURES GRID */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Powerful Features</h2>
              <p className="text-gray-400">Everything you need to create, customize, and export.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
              <FeatureCard icon={<Sparkles className="text-purple-400" />} title="AI Generation" desc="Don't waste hours researching. Just type 'History of Mexico' and let AI build the timeline for you." />
              <FeatureCard icon={<FileText className="text-red-400" />} title="PDF Export" desc="Download your timeline as a professional PDF document. Perfect for submitting assignments." />
              <FeatureCard icon={<Zap className="text-yellow-400" />} title="Instant Customization" desc="Drag, drop, and edit any event. Our smart editor handles the layout automatically." />
              <FeatureCard icon={<Globe className="text-blue-400" />} title="Global Support" desc="Works in English, Spanish, and more. Perfect for 'Epocas Literarias' or 'World History'." />
              <FeatureCard icon={<CheckCircle className="text-green-400" />} title="Accuracy Check" desc="Our AI cross-references dates to ensure your historical data is accurate and reliable." />
              <FeatureCard icon={<Star className="text-orange-400" />} title="Premium Themes" desc="Switch between different visual styles to match your presentation needs." />
          </div>
      </section>

      {/* 🗣️ TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div className="text-center mb-16 px-6 relative z-10">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Loved by 10,000+ Users</h2>
             <p className="text-gray-400">Join students, teachers, and creators from top universities.</p>
        </div>
        
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-40 bg-gradient-to-r from-[#080808] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-40 bg-gradient-to-l from-[#080808] to-transparent z-20 pointer-events-none"></div>

        <div className="flex overflow-hidden">
            <motion.div 
                className="flex gap-6 px-6"
                animate={{ x: "-50%" }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                style={{ width: "fit-content" }}
            >
                {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="w-[350px] md:w-[400px] flex-shrink-0 bg-[#0f172a] border border-white/5 p-8 rounded-2xl relative hover:border-purple-500/30 transition-colors group">
                        <Quote className="absolute top-6 right-6 text-white/5 w-10 h-10 group-hover:text-purple-500/20 transition-colors" />
                        <div className="flex gap-1 mb-4 text-yellow-500">
                            {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
                        </div>
                        <p className="text-gray-300 mb-6 text-lg leading-relaxed font-medium">"{t.text}"</p>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg">
                                {t.name[0]}
                            </div>
                            <div>
                                <div className="font-bold text-white text-sm">{t.name}</div>
                                <div className="text-xs text-purple-400 font-medium tracking-wide">{t.role}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 💰 PRICING MODULE */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-24 relative">
          <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Student-Friendly Pricing</h2>
              <p className="text-gray-400">No expensive yearly plans. Pay only for what you need.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              
              {/* FREE PLAN */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Free Forever</h3>
                  <div className="text-4xl font-bold text-white mb-6">$0</div>
                  <p className="text-gray-400 text-sm mb-8">Create timelines for homework. Includes watermark.</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Unlimited Projects" active />
                      <PricingCheck text="Basic AI Generation" active />
                      <PricingCheck text="Watermarked Export" active />
                  </div>
                  <Link href="/create" className="w-full block text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold">Start Free</Link>
              </div>

              {/* PAY-PER-PROJECT */}
              <div className="bg-[#1a1033] border border-purple-500 p-8 rounded-2xl flex flex-col relative transform hover:-translate-y-2 transition-transform shadow-[0_0_40px_rgba(168,85,247,0.15)]">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Best for Assignments
                  </div>
                  <h3 className="text-xl font-bold text-purple-300 mb-2">Single Project</h3>
                  <div className="text-4xl font-bold text-white mb-6">$2 <span className="text-lg text-gray-500 font-normal">/ one-time</span></div>
                  <p className="text-gray-400 text-sm mb-8">Need just one perfect timeline for your final project?</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Remove Watermark" active />
                      <PricingCheck text="HD PDF & PNG Export" active />
                      <PricingCheck text="Lifetime Access to Project" active />
                  </div>
                  <Link href="/pricing" className="w-full block text-center bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform">Buy Now</Link>
              </div>

              {/* MONTHLY SUBSCRIPTION */}
              <div className="bg-[#0f172a]/50 border border-white/10 p-8 rounded-2xl flex flex-col hover:border-white/20 transition-all">
                  <h3 className="text-xl font-bold text-gray-300 mb-2">Pro Monthly</h3>
                  <div className="text-4xl font-bold text-white mb-6">$5 <span className="text-lg text-gray-500 font-normal">/ month</span></div>
                  <p className="text-gray-400 text-sm mb-8">For teachers & power users making timelines often.</p>
                  <div className="space-y-4 mb-8 flex-1">
                      <PricingCheck text="Everything in Single" active />
                      <PricingCheck text="Unlimited Exports" active />
                      <PricingCheck text="Priority Support" active />
                  </div>
                  <Link href="/pricing" className="w-full block text-center bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl font-bold hover:scale-105 transition-transform">Subscribe</Link>
              </div>

          </div>
      </section>

      {/* 🦶 FOOTER */}
      <footer className="max-w-7xl mx-auto px-6 py-16 border-t border-white/10">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-1">
                  <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 bg-purple-600 rounded flex items-center justify-center">
                            <History className="text-white w-3 h-3" />
                        </div>
                        <span className="text-lg font-bold">AI Timeline Maker</span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">
                      Making history visual and interactive for everyone. Built with AI power.
                  </p>
              </div>
              
              <div>
                  <h4 className="font-bold mb-4 text-white">Product</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                      <li><Link href="#features" className="hover:text-purple-400 transition-colors">Features</Link></li>
                      <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
                      <li><Link href="/create" className="hover:text-purple-400 transition-colors">Create Timeline</Link></li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold mb-4 text-white">Company</h4>
                  <ul className="space-y-2 text-sm text-gray-400">
                      <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
                      <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
                      <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
                  </ul>
              </div>

              <div>
                  <h4 className="font-bold mb-4 text-white">Stay Updated</h4>
                  <p className="text-xs text-gray-500 mb-4">Get the latest features and tips.</p>
                  <div className="flex gap-2">
                      <input type="email" placeholder="Enter your email" className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:border-purple-500 text-white" />
                      <button className="bg-purple-600 hover:bg-purple-500 p-2 rounded-lg transition-colors"><ArrowRight className="w-4 h-4 text-white"/></button>
                  </div>
              </div>
          </div>
          <div className="text-center text-gray-600 text-xs pt-8 border-t border-white/5">
              © 2026 aitimelinemaker.online. All rights reserved. Made with ❤️ in India.
          </div>
      </footer>

    </div>
  );
}

// 🧩 Helper Components
function PricingCheck({ text, active }: any) {
    return (
        <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${active ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-gray-400'}`}>
                <Check className="w-3 h-3" />
            </div>
            <span className={`text-sm ${active ? 'text-white' : 'text-gray-400'}`}>{text}</span>
        </div>
    )
}

function StatItem({ number, label }: any) {
    return (
        <div>
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1">{number}</div>
            <div className="text-sm text-gray-500 uppercase tracking-wider">{label}</div>
        </div>
    )
}

function FeatureCard({ icon, title, desc }: any) {
    return (
        <div className="bg-[#0f172a] border border-white/5 p-8 rounded-2xl hover:border-purple-500/30 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-2xl group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}