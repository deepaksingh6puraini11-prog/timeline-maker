"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Send, Twitter, Instagram, Linkedin, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  // Fake Form Submission (Visual ke liye)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // 2 second baad success dikhao
    setTimeout(() => {
        toast.success("Message sent successfully!");
        setLoading(false);
        // Form reset logic yahan aa sakti hai
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans relative overflow-hidden">
      
      {/* 🌌 Background Glows */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-16 items-start">
            
            {/* 👈 LEFT SIDE: INFO */}
            <div>
                <h1 className="text-4xl md:text-6xl font-extrabold mb-6 font-heading leading-tight">
                    Let's start a <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Conversation.</span>
                </h1>
                <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                    Have a question about the AI Timeline Maker? Need help with your account? 
                    Or just want to suggest a feature? We're here to help.
                </p>

                <div className="space-y-6">
                    <ContactCard 
                        icon={<Mail size={20} />} 
                        title="Email Us" 
                        value="support@aitimelinemaker.online"
                        sub="We reply within 24 hours."
                    />
                    <ContactCard 
                        icon={<MessageSquare size={20} />} 
                        title="Live Chat" 
                        value="Available on Dashboard"
                        sub="Mon-Fri, 9am - 6pm IST"
                    />
                </div>

                {/* Socials */}
                <div className="mt-12">
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Follow Us</p>
                    <div className="flex gap-4">
                        <SocialLink icon={<Twitter size={20} />} />
                        <SocialLink icon={<Instagram size={20} />} />
                        <SocialLink icon={<Linkedin size={20} />} />
                    </div>
                </div>
            </div>

            {/* 👉 RIGHT SIDE: CONTACT FORM */}
            <div className="bg-[#0f1014] border border-white/10 p-8 rounded-3xl shadow-2xl shadow-purple-900/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none"></div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">First Name</label>
                            <input required type="text" placeholder="John" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-400">Last Name</label>
                            <input required type="text" placeholder="Doe" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Email Address</label>
                        <input required type="email" placeholder="john@example.com" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Message</label>
                        <textarea required rows={4} placeholder="How can we help you?" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"></textarea>
                    </div>

                    <button 
                        disabled={loading}
                        type="submit" 
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                    >
                        {loading ? "Sending..." : <>Send Message <Send size={18} /></>}
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
}

// 🧩 Helper Components for Clean Code

function ContactCard({ icon, title, value, sub }: any) {
    return (
        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white shrink-0">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-white">{title}</h3>
                <p className="text-purple-400 font-medium">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{sub}</p>
            </div>
        </div>
    )
}

function SocialLink({ icon }: any) {
    return (
        <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110">
            {icon}
        </a>
    )
}