import Link from "next/link";
import { Twitter, Instagram, Github, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-purple-600 rounded-lg flex items-center justify-center font-bold text-white">
                T
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                AI Timeline Maker
              </h2>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Make history and projects visual — fast, clean, and export-ready.
            </p>

            <div className="flex gap-4 mt-6 text-gray-400">
              <a
                href="#"
                aria-label="Twitter"
                className="hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="hover:text-white transition-colors"
              >
                <Github size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">
              Product
            </h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-purple-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/create" className="hover:text-purple-400 transition-colors">
                  Create Timeline
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-purple-400 transition-colors">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">
              Company
            </h3>
            <ul className="space-y-3 text-gray-500 text-sm">
              <li>
                <Link href="/about" className="hover:text-purple-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-purple-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-purple-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-purple-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-purple-400 transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-5 text-xs uppercase tracking-widest">
              Newsletter
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Get the latest updates and AI features.
            </p>

            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500 transition-all text-white pr-12"
              />
              <button
                type="button"
                aria-label="Subscribe"
                className="absolute right-2 top-2 p-2 bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors text-white"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-gray-600 text-[11px] sm:text-xs text-center sm:text-left tracking-wide">
            © 2026 AI Timeline Maker. All rights reserved.{" "}
            <span className="ml-1">Made with ❤️ in India.</span>
          </div>

          <div className="text-gray-600 text-[11px] sm:text-xs tracking-wide">
            Payments secured by{" "}
            <span className="text-gray-400 font-semibold">Lemon Squeezy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
