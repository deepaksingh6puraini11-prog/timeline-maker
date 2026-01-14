"use client";

import Link from "next/link";
import { ArrowLeft, Users, Zap, Globe, Heart, Sparkles, Target } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans relative overflow-hidden">
      
      {/* 🌌 Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-16 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold text-purple-300 mb-6 uppercase tracking-wider">
                <Sparkles size={12} /> Our Mission
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-heading tracking-tight leading-tight">
                We make history <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">visual & interactive.</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                We believe history shouldn't be boring text on a page. We use AI to turn complex dates and events into beautiful, understandable stories.
            </p>
        </div>

        {/* 📊 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24 border-y border-white/10 py-12 bg-white/[0.02]">
             <StatItem label="Active Students" value="10,000+" />
             <StatItem label="Timelines Created" value="1M+" />
             <StatItem label="Countries" value="120+" />
             <StatItem label="Time Saved" value="500k Hrs" />
        </div>

        {/* 🚀 Values Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
            <ValueCard 
                icon={<Zap size={24} className="text-yellow-400"/>}
                title="Speed First"
                desc="Students don't have hours to design. We automate the boring stuff so you can focus on learning."
            />
            <ValueCard 
                icon={<Heart size={24} className="text-red-400"/>}
                title="User Focused"
                desc="Built for students, by developers who hated making timelines manually in PowerPoint."
            />
            <ValueCard 
                icon={<Globe size={24} className="text-blue-400"/>}
                title="Global Learning"
                desc="History belongs to everyone. Our tool supports multiple languages and regional history."
            />
        </div>

        {/* Story Section */}
        <div className="bg-[#0f1014] border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
            
            <Target className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4 font-heading">Why we started?</h2>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                "Back in college, I had to create a timeline for the 'Industrial Revolution'. It took me 4 hours just to draw the lines and align the boxes. 
                I realized there had to be a better way. That's when <span className="text-white font-bold">AI Timeline Maker</span> was born."
            </p>
            <div className="mt-8">
                <p className="font-bold text-white">The Founder</p>
                <p className="text-sm text-gray-500">Built with ❤️ in India</p>
            </div>
        </div>

      </div>
    </div>
  );
}

// 🧩 Components
function StatItem({ label, value }: any) {
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-extrabold text-white mb-1 font-heading">{value}</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest">{label}</div>
        </div>
    )
}

function ValueCard({ icon, title, desc }: any) {
    return (
        <div className="p-8 rounded-2xl bg-[#0f1014] border border-white/10 hover:border-purple-500/30 transition-all hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3 text-white">{title}</h3>
            <p className="text-gray-400 leading-relaxed text-sm">{desc}</p>
        </div>
    )
}