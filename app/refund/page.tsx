import Link from "next/link";
import { ArrowLeft, RefreshCcw, CheckCircle2, AlertCircle, HelpCircle } from "lucide-react";

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30 font-sans relative">
      
      {/* 🌌 Subtle Background Effect */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16 border-b border-white/10 pb-10">
            <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center mb-6">
                <RefreshCcw size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 font-heading">Refund Policy</h1>
            <p className="text-gray-400 text-lg">
                We believe in transparency. Here's our policy on payments and refunds.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-mono">Last Updated: January 25, 2026</p>
        </div>

        {/* Policy Content */}
        <div className="space-y-12">
            
            <Section 
                icon={<CheckCircle2 size={20}/>}
                title="1. Digital Products Policy"
                content={
                    <p>
                        Since AI Timeline Maker provides non-tangible, irrevocable digital goods, we <span className="text-white font-bold">generally do not issue refunds</span> once the order is confirmed and the product is generated. As a customer, you are responsible for understanding this upon purchasing any plan on our site.
                    </p>
                }
            />

            <Section 
                icon={<AlertCircle size={20}/>}
                title="2. Exceptional Circumstances"
                content={
                    <>
                        <p className="mb-4">We do honor requests for a refund under the following reasons:</p>
                        <ul className="list-disc pl-5 space-y-2 text-gray-400 marker:text-purple-500">
                            <li><strong className="text-white">Technical issues:</strong> If a technical bug prevents you from accessing the service after payment.</li>
                            <li><strong className="text-white">Duplicate payment:</strong> If you were charged twice due to a billing error by our payment processor.</li>
                        </ul>
                    </>
                }
            />

            <Section 
                icon={<HelpCircle size={20}/>}
                title="3. How to Request a Refund"
                content={
                    <p>
                        Refund requests must be submitted within <span className="text-white font-bold">7 days</span> of the purchase date. Please email us at <span className="text-purple-400">support@aitimelinemaker.online</span> with your order number and the reason for your request.
                    </p>
                }
            />

            {/* Contact Section */}
            <div className="bg-[#0f1014] border border-white/10 p-8 rounded-2xl mt-12 text-center">
                <h3 className="text-xl font-bold mb-2 text-white">Need clarity on billing?</h3>
                <p className="text-gray-400 mb-6">
                    Our team is here to help you with any payment or subscription issues.
                </p>
                <a href="mailto:support@aitimelinemaker.online" className="inline-flex items-center justify-center px-8 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                    Contact Support
                </a>
            </div>

        </div>

        {/* Footer Note */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-gray-600 text-sm">
            © 2026 AI Timeline Maker. Payments secured by Lemon Squeezy.
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