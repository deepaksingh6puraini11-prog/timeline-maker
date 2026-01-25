import Link from "next/link";
import { ArrowLeft, Scale, Globe, CreditCard, Ban } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        <div className="mb-16 border-b border-white/10 pb-10">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <Scale size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">Terms of Service</h1>
            <p className="text-gray-400 text-lg">
                Please read these terms carefully before using AI Timeline Maker.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-mono">Last Updated: January 25, 2026</p>
        </div>

        <div className="space-y-12">
            <Section 
                icon={<Globe size={20}/>}
                title="1. Acceptance of Terms"
                content="By accessing AI Timeline Maker, you agree to be bound by these Terms of Service and all applicable laws and regulations."
            />

            <Section 
                icon={<CreditCard size={20}/>}
                title="2. Payments & Refunds"
                content="Payments are processed securely via Lemon Squeezy. Due to the nature of AI generation costs, we generally do not offer refunds once a timeline has been generated, but we handle disputes on a case-by-case basis."
            />

            <Section 
                icon={<Ban size={20}/>}
                title="3. Prohibited Use"
                content="You may not use the service to generate harmful, illegal, or copyright-infringing content. We reserve the right to terminate accounts that violate these rules."
            />
        </div>

        <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
            © 2026 AI Timeline Maker. All rights reserved.
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, content }: any) {
    return (
        <div className="flex gap-6">
            <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-gray-400">
                    {icon}
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                <div className="text-gray-400 leading-relaxed text-lg">{content}</div>
            </div>
        </div>
    )
}