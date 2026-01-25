import Link from "next/link";
import { Twitter, Instagram, Github, Mail, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-16 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* --- TOP SECTION: Newsletter & Info --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center font-bold">T</div>
              <h2 className="text-xl font-bold text-white tracking-tight">AI Timeline Maker</h2>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Making history visual and interactive for everyone. Built with AI power for students and professionals.
            </p>
            <div className="flex gap-4 mt-6 text-gray-400">
                <Twitter size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Instagram size={18} className="hover:text-white cursor-pointer transition-colors" />
                <Github size={18} className="hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Product</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/pricing" className="hover:text-purple-400 transition-colors">Pricing</Link></li>
              <li><Link href="/create" className="hover:text-purple-400 transition-colors">Create Timeline</Link></li>
              <li><Link href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</Link></li>
            </ul>
          </div>

          {/* Column 3: Company & Support */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Company</h3>
            <ul className="space-y-4 text-gray-500 text-sm">
              <li><Link href="/about" className="hover:text-purple-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link></li>
              <li><Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Newsletter</h3>
            <p className="text-gray-500 text-sm mb-4">Get the latest updates and AI features.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-all"
              />
              <button className="absolute right-2 top-2 p-1.5 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* --- BOTTOM SECTION: Legal & Copyright --- */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-xs text-center md:text-left">
            <p>© 2026 AI Timeline Maker. All rights reserved.</p>
            <p className="mt-1">MADE WITH ❤️ IN INDIA.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-white transition-colors">Refund Policy</Link>
          </div>

          <div className="text-gray-600 text-[10px] tracking-widest uppercase">
            Payments secured by <span className="text-gray-400 font-bold">Lemon Squeezy</span>
          </div>
        </div>

      </div>
    </footer>
  );
}