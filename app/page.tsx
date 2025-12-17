import Link from "next/link";
import { Check, X, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500 selection:text-white">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 max-w-6xl mx-auto border-b border-gray-800">
        <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
          Timeline Maker 🚀
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition">Login</Link>
          <Link href="/editor" className="bg-white text-black px-4 py-2 rounded-lg font-bold hover:bg-gray-200 transition">
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          Create Beautiful Timelines <br /> in Seconds.
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
          Apni journey, project roadmap, ya history ko ek visual kahani me badlo.
        </p>
        <Link href="/editor" className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105">
          Start Building for Free <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>

      {/* PRICING SECTION */}
      <section className="py-20 bg-[#0a0a0a] border-t border-gray-900">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing Plans</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* FREE PLAN */}
            <div className="border border-gray-800 bg-gray-900/50 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-gray-300">Free Starter</h3>
              <div className="text-4xl font-bold mt-4 mb-2">$0 <span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="space-y-4 mb-8 mt-4">
                <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5"/> Unlimited Timelines</li>
                <li className="flex items-center gap-3"><Check className="text-green-500 w-5 h-5"/> Export to PNG Image</li>
              </ul>
              <Link href="/editor" className="block w-full text-center bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition">
                Start for Free
              </Link>
            </div>

            {/* PRO PLAN */}
            <div className="border border-purple-500/30 bg-gray-900/80 p-8 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>
              <h3 className="text-xl font-semibold text-purple-400">Pro Creator</h3>
              <div className="text-4xl font-bold mt-4 mb-2">$9 <span className="text-lg text-gray-500 font-normal">/month</span></div>
              <ul className="space-y-4 mb-8 mt-4">
                <li className="flex items-center gap-3"><Check className="text-purple-500 w-5 h-5"/> Everything in Free</li>
                <li className="flex items-center gap-3"><Check className="text-purple-500 w-5 h-5"/> Save & Edit Later</li>
              </ul>
              <button className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-bold transition">
                Upgrade to Pro
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
      <footer className="text-center py-8 text-gray-600 text-sm border-t border-gray-900">
        © 2025 Timeline Maker. Built by You.
      </footer>
    </div>
  );
}