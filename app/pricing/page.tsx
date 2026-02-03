"use client";

import { useState, useEffect } from "react";
import { Check, Sparkles, Zap, Star, ShieldCheck, Globe, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";

// ✅ STORE NAME (Lemon Squeezy Slug)
const STORE_SLUG = "timelinemakerai"; 

// 🔄 LIVE MODE IDs (Updated as per your latest request)
const ID_SINGLE_PROJECT = "0925ec6f-d5c6-4631-b7d6-5dceda7d8ef1"; // $2 Live ID
const ID_MONTHLY_PRO = "be758e5d-a55a-4f5a-9843-973813a9805c";    // $5 Live ID

// 🗣️ DICTIONARY: English vs Spanish Text
const TRANSLATIONS = {
  en: {
    badge: "Simple, Transparent Pricing",
    title: "Invest in your",
    title_highlight: "Grades",
    subtitle: "Choose the plan that fits your project needs. No hidden fees.",
    free_title: "Free Starter",
    free_price: "$0",
    free_desc: "Perfect for testing & drafts.",
    free_btn: "Current Plan",
    free_features: ["Unlimited Drafts", "Basic AI Generation", "Watermarked Export", "Standard Support"],
    single_title: "Single Project",
    single_price: "$2",
    single_period: "/ one-time",
    single_desc: "For that one important assignment.",
    single_btn: "Buy Now",
    single_badge: "Best for Students",
    single_features: ["Remove Watermark", "HD PDF & PNG Export", "Lifetime Access", "Premium AI Models", "No Subscription"],
    monthly_title: "Pro Monthly",
    monthly_price: "$5",
    monthly_period: "/ month",
    monthly_desc: "For power users & teachers.",
    monthly_btn: "Subscribe",
    monthly_features: ["Everything in Single", "Unlimited Exports", "Priority 24/7 Support", "Early Access Features", "Cancel Anytime"],
    secure: "Secure Payment by Lemon Squeezy",
    satisfaction: "100% Satisfaction",
    toast_connecting: "Securely connecting to payment...",
    toast_login: "Please login first to upgrade",
    toast_error: "Something went wrong",
    toast_network: "Network Error"
  },
  es: {
    badge: "Precios Simples y Transparentes",
    title: "Invierte en tus",
    title_highlight: "Calificaciones",
    subtitle: "Elige el plan que se adapte a tu proyecto. Sin tarifas ocultas.",
    free_title: "Gratis Inicial",
    free_price: "$0",
    free_desc: "Perfecto para pruebas y borradores.",
    free_btn: "Plan Actual",
    free_features: ["Borradores Ilimitados", "Generación IA Básica", "Exportación con Marca de Agua", "Soporte Estándar"],
    single_title: "Proyecto Único",
    single_price: "$2",
    single_period: "/ pago único",
    single_desc: "Para esa tarea importante.",
    single_btn: "Comprar Ahora",
    single_badge: "Mejor para Estudiantes",
    single_features: ["Eliminar Marca de Agua", "Exportación HD PDF y PNG", "Acceso de por vida", "Modelos IA Premium", "Sin Suscripción"],
    monthly_title: "Pro Mensual",
    monthly_price: "$5",
    monthly_period: "/ mes",
    monthly_desc: "Para usuarios avanzados y maestros.",
    monthly_btn: "Suscribirse",
    monthly_features: ["Todo en Único", "Exportaciones Ilimitadas", "Soporte Prioritario 24/7", "Funciones Anticipadas", "Cancela Cuando Quieras"],
    secure: "Pago Seguro vía Lemon Squeezy",
    satisfaction: "100% Satisfacción",
    toast_connecting: "Conectando de forma segura...",
    toast_login: "Por favor inicia sesión primero",
    toast_error: "Algo salió mal",
    toast_network: "Error de Red"
  }
};

export default function PricingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [lang, setLang] = useState<'en' | 'es'>('en');

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as 'en' | 'es';
    if (savedLang) {
        setLang(savedLang);
    } else if (typeof document !== 'undefined' && document.referrer.includes('/es')) {
        setLang('es');
    }

    const getUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) setUserId(user.id);
    };
    getUser();
  }, [supabase.auth]);

  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const t = TRANSLATIONS[lang]; 

  // 🛒 HANDLE PURCHASE LOGIC
  const handlePurchase = (planType: 'single' | 'monthly') => {
    setLoading(planType);
    
    if (!userId) {
        toast.error(t.toast_login);
        router.push("/login"); 
        setLoading(null);
        return;
    }

    const variantId = planType === 'single' ? ID_SINGLE_PROJECT : ID_MONTHLY_PRO;
    
    // 🔄 FIXED URL: Using Lemon Squeezy domain directly to avoid 404
    const checkoutUrl = `https://${STORE_SLUG}.lemonsqueezy.com/checkout/buy/${variantId}?checkout[custom][user_id]=${userId}`;

    toast.loading(t.toast_connecting);
    window.location.href = checkoutUrl;
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 overflow-hidden relative">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -z-10 opacity-50"></div>
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10 opacity-30"></div>

      <nav className="absolute top-0 left-0 w-full px-6 py-6 flex justify-between items-center z-50">
          <Link href={lang === 'es' ? '/es' : '/'} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
              <ArrowLeft size={16} /> {lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}
          </Link>
          <button onClick={toggleLanguage} className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/5 backdrop-blur-sm">
              <Globe size={14} />
              <span>{lang === 'en' ? 'ES' : 'EN'}</span>
          </button>
      </nav>

      <div className="text-center pt-28 pb-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-6">
            <Sparkles size={12} /> {t.badge}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            {t.title} <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{t.title_highlight}</span>
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t.subtitle}
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <PricingCard title={t.free_title} price={t.free_price} desc={t.free_desc} features={t.free_features} btnText={t.free_btn} onClick={() => router.push("/dashboard")} delay={0.3} />
            <div className="relative z-10">
                <div className="absolute -inset-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-3xl blur-md opacity-70 animate-pulse"></div>
                <PricingCard title={t.single_title} price={t.single_price} period={t.single_period} desc={t.single_desc} features={t.single_features} btnText={t.single_btn} onClick={() => handlePurchase('single')} loading={loading === 'single'} highlight={true} badge={t.single_badge} delay={0.4} />
            </div>
            <PricingCard title={t.monthly_title} price={t.monthly_price} period={t.monthly_period} desc={t.monthly_desc} features={t.monthly_features} btnText={t.monthly_btn} onClick={() => handlePurchase('monthly')} loading={loading === 'monthly'} delay={0.5} />
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 text-center flex items-center justify-center gap-6 text-gray-500 text-sm">
            <span className="flex items-center gap-2"><ShieldCheck size={16}/> {t.secure}</span>
            <span className="flex items-center gap-2"><Star size={16}/> {t.satisfaction}</span>
        </motion.div>
      </div>
    </div>
  );
}

function PricingCard({ title, price, period, desc, features, btnText, onClick, loading, highlight, badge, delay }: any) {
    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: delay, duration: 0.5 }} className={`relative bg-[#0f1014] border p-8 rounded-2xl flex flex-col h-full transition-all duration-300 group hover:-translate-y-2 ${highlight ? 'border-purple-500/50 shadow-2xl shadow-purple-900/20' : 'border-white/10 hover:border-white/20'}`}>
            {badge && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg whitespace-nowrap">{badge}</div>}
            <div className="mb-8">
                <h3 className={`text-lg font-bold mb-2 ${highlight ? 'text-purple-300' : 'text-gray-300'}`}>{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">{price}</span>
                    {period && <span className="text-gray-500 text-sm">{period}</span>}
                </div>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">{desc}</p>
            </div>
            <div className="flex-1 space-y-4 mb-8">
                {features.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center min-w-[20px] ${highlight ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400'}`}>
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="text-gray-300 text-sm">{feat}</span>
                    </div>
                ))}
            </div>
            <button onClick={onClick} disabled={loading} className={`w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${highlight ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white shadow-lg shadow-purple-900/40' : 'bg-white text-black hover:bg-gray-200'} ${loading ? 'opacity-70 cursor-wait' : ''}`}>
                {loading ? <span className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></span> : <>{highlight && <Zap size={16} fill="currentColor" />}{btnText}</>}
            </button>
        </motion.div>
    )
}