import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050505] py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Logo & Copyright */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold text-white mb-2">AI Timeline Maker</h2>
          <p className="text-gray-500 text-sm">© 2026 AI Timeline Maker. All rights reserved.</p>
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
          <Link href="/refund" className="hover:text-purple-400 transition-colors">Refund Policy</Link>
          <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact Us</Link>
        </div>

        {/* Payment Partner (Approval ke liye zaroori) */}
        <div className="text-gray-500 text-xs text-center">
          Payments secured by <span className="text-gray-300 font-medium">Lemon Squeezy</span>
        </div>
      </div>
    </footer>
  );
}