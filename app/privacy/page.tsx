import Link from "next/link";
import { ArrowLeft, Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans relative">
      
      {/* 🌌 Subtle Background */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-10">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <Shield size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">
                Your privacy is non-negotiable. Here's exactly how we handle your data.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-mono">Last Updated: January 07, 2026</p>
        </div>

        {/* Content Content */}
        <div className="space-y-12">
            
            <Section 
                icon={<Eye size={20}/>}
                title="1. Data We Collect"
                content={
                    <>
                        <p className="mb-4">We collect minimal data necessary to provide our services. This includes:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-purple-500">
                            <li><strong className="text-white">Identity Data:</strong> Email address and name (via Google Login).</li>
                            <li><strong className="text-white">Usage Data:</strong> Timelines created, features used, and interactions with the editor.</li>
                            <li><strong className="text-white">Technical Data:</strong> IP address, browser type, and device info for security.</li>
                        </ul>
                    </>
                }
            />

            <Section 
                icon={<Lock size={20}/>}
                title="2. How We Use Your Data"
                content={
                    <p>
                        We use your data solely to provide and improve the Timeline Maker service. 
                        We <span className="text-red-400 font-bold">never sell</span> your personal data to advertisers. 
                        Your data is used to authenticate you, save your projects, and process payments securely via Lemon Squeezy.
                    </p>
                }
            />

            <Section 
                icon={<FileText size={20}/>}
                title="3. Data Security"
                content={
                    <p>
                        We implement industry-standard security measures including SSL encryption and secure database storage (Supabase). 
                        While no service is 100% secure, we strive to protect your personal information using commercially acceptable means.
                    </p>
                }
            />

            {/* Contact Section */}
            <div className="bg-[#0f1014] border border-white/10 p-8 rounded-2xl mt-12">
                <h3 className="text-xl font-bold mb-2 text-white">Have questions?</h3>
                <p className="text-gray-400 mb-6">
                    If you have any concerns about your privacy, feel free to reach out.
                </p>
                <a href="mailto:privacy@aitimelinemaker.online" className="inline-flex items-center justify-center px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Contact Privacy Team
                </a>
            </div>

        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
            © 2026 AI Timeline Maker. All rights reserved.
        </div>

      </div>
    </div>
  );
}

// 🧩 Helper Component
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
                <div className="text-gray-400 leading-relaxed text-lg">
                    {content}
                </div>
            </div>
        </div>
    )
}