"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogOut, Zap, PenTool, Layout, Clock, ChevronRight, History, Crown, Loader2, Trash2, Globe } from "lucide-react"; 
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// 🗣️ DICTIONARY: Updated with 'Unlimited'
const TRANSLATIONS = {
  en: {
    welcome: "Welcome back",
    subtitle: "Choose how you want to build your next timeline.",
    credits: "Credits",
    unlimited: "Unlimited", // Added
    upgrade: "Upgrade",
    pro: "PRO",
    logout: "Logout",
    ai_title: "AI Generator",
    ai_desc: "Generate detailed historical or project timelines instantly. Just enter a topic and let AI do the heavy lifting.",
    ai_cta: "Start with AI",
    manual_title: "Manual Editor",
    manual_desc: "Start from a blank canvas. Perfect for school projects, custom presentations, or when you need total control.",
    manual_cta: "Open Editor",
    recent_title: "Recent Timelines",
    view_all: "View All",
    no_timelines: "No timelines yet",
    no_timelines_desc: "Your generated and saved timelines will appear here automatically.",
    create_first: "Create your first timeline",
    untitled: "Untitled Project",
    edited: "Edited",
    continue: "Continue Editing",
    delete_confirm: "Are you sure you want to delete this project?",
    deleted: "Project deleted"
  },
  es: {
    welcome: "Bienvenido de nuevo",
    subtitle: "Elige cómo quieres construir tu próxima línea de tiempo.",
    credits: "Créditos",
    unlimited: "Ilimitado", // Added
    upgrade: "Mejorar",
    pro: "PRO",
    logout: "Cerrar Sesión",
    ai_title: "Generador IA",
    ai_desc: "Genera líneas de tiempo históricas detalladas al instante. Solo escribe un tema y deja que la IA haga el trabajo pesado.",
    ai_cta: "Empezar con IA",
    manual_title: "Editor Manual",
    manual_desc: "Empieza desde un lienzo en blanco. Perfecto para proyectos escolares, presentaciones o control total.",
    manual_cta: "Abrir Editor",
    recent_title: "Líneas de Tiempo Recientes",
    view_all: "Ver Todo",
    no_timelines: "Aún no hay líneas de tiempo",
    no_timelines_desc: "Tus líneas de tiempo generadas y guardadas aparecerán aquí automáticamente.",
    create_first: "Crea tu primera línea de tiempo",
    untitled: "Proyecto Sin Título",
    edited: "Editado",
    continue: "Continuar Editando",
    delete_confirm: "¿Estás seguro de que quieres eliminar este proyecto?",
    deleted: "Proyecto eliminado"
  }
};

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("Creator");
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [timelines, setTimelines] = useState<any[]>([]);
  
  // 🌍 Language State (Default English)
  const [lang, setLang] = useState<'en' | 'es'>('en'); 

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1️⃣ DETECT LANGUAGE & LOAD DATA
  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as 'en' | 'es';
    
    if (savedLang) {
        setLang(savedLang);
    } else if (typeof document !== 'undefined' && document.referrer.includes('/es')) {
        setLang('es');
        localStorage.setItem('app-lang', 'es');
    }

    const loadData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
         router.push("/login");
         return;
      }

      if (user.email) setUserName(user.email.split("@")[0]);

      // 🔥 FIX: Changed 'profiles' to 'users' (Kyunki aapne columns users table me banaye hain)
      const { data: profileData } = await supabase
        .from('users') 
        .select('*')
        .eq('id', user.id)
        .single();
        
      setProfile(profileData);

      const { data: timelinesData } = await supabase.from('timelines').select('*').eq('user_id', user.id).order('created_at', { ascending: false });

      if (timelinesData) setTimelines(timelinesData);
      setLoading(false);
    };

    loadData();
  }, [router]);

  // 🔄 Language Toggle Function
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('app-lang', newLang); 
  };

  // Helper to get current text
  const t = TRANSLATIONS[lang];

  // 🔥 CHECK: Is user PRO?
  const isProUser = profile?.plan_type === 'pro';

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login"); 
  };

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    if(!confirm(t.delete_confirm)) return;

    const { error } = await supabase.from('timelines').delete().eq('id', id);
    if (!error) {
        setTimelines(timelines.filter(t => t.id !== id));
        toast.success(t.deleted);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-purple-500 w-8 h-8"/>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-purple-500/30">
      
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]"></div>
      </div>

      {/* TOP NAVIGATION */}
      <nav className="flex justify-between items-center px-8 py-6 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
        
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-900/20">
                <History className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">Timeline Maker</span>
        </Link>

        <div className="flex items-center gap-4">
            
            {/* 🌍 LANGUAGE TOGGLE */}
            <button 
                onClick={toggleLanguage}
                className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors border border-white/10 px-2 py-1 rounded-md hover:bg-white/5"
            >
                <Globe className="w-3 h-3" />
                <span>{lang === 'en' ? 'ES' : 'EN'}</span> 
            </button>

            {/* 💎 CREDITS / PLAN STATUS (UPDATED LOGIC) */}
            <Link 
                href={isProUser ? "#" : "/pricing"} // Agar Pro hai to click karne par pricing page par mat le jao
                className={`group flex items-center gap-3 px-4 py-2 rounded-full border transition-all cursor-pointer ${
                    isProUser 
                    ? "bg-purple-900/20 border-purple-500/50" // Pro Style
                    : "bg-[#111] border-white/10 hover:border-purple-500/50" // Free Style
                }`}
            >
                {/* Status Dot */}
                <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)] ${
                    isProUser ? 'bg-gradient-to-r from-pink-500 to-purple-500 animate-pulse' : (profile?.credits > 0 ? 'bg-green-500' : 'bg-red-500')
                }`}></div>

                {/* Text Logic */}
                <span className={`text-sm font-medium ${isProUser ? "text-purple-300" : "text-gray-300 group-hover:text-white"}`}>
                    {isProUser 
                        ? t.unlimited // "Unlimited"
                        : `${profile?.credits || 0} ${t.credits}` // "2 Credits"
                    }
                </span>
                
                {/* Badge Logic */}
                {isProUser ? (
                    <span className="text-xs bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Crown size={10} fill="currentColor"/> {t.pro}
                    </span>
                ) : (
                    <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider group-hover:bg-purple-500 group-hover:text-white transition-all">
                        {t.upgrade}
                    </span>
                )}
            </Link>

            <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
            <button onClick={handleLogout} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm">
                <LogOut size={18} />
            </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {t.welcome}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 capitalize">{userName}</span>
            </h1>
            <p className="text-gray-500 text-lg">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Link 
                href="/create" 
                className="group relative bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl cursor-pointer hover:border-purple-500/40 transition-all duration-300 overflow-hidden block"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="w-14 h-14 bg-[#151515] border border-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                            <Zap className="text-purple-400 group-hover:text-purple-300" size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">{t.ai_title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.ai_desc}
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-white transition-colors">
                        {t.ai_cta} <ChevronRight size={16} />
                    </div>
                </div>
            </Link>

            <Link 
                href="/editor" 
                className="group relative bg-[#0A0A0A] border border-white/10 p-8 rounded-3xl cursor-pointer hover:border-blue-500/40 transition-all duration-300 block"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <div className="w-14 h-14 bg-[#151515] border border-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                            <PenTool className="text-blue-400 group-hover:text-blue-300" size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{t.manual_title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t.manual_desc}
                        </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-gray-500 group-hover:text-white transition-colors">
                        {t.manual_cta} <ChevronRight size={16} />
                    </div>
                </div>
            </Link>
        </div>

        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <Clock size={20} className="text-gray-500"/> {t.recent_title}
                </h2>
                {timelines.length > 0 && <button className="text-xs text-gray-500 hover:text-white">{t.view_all}</button>}
            </div>

            {timelines.length === 0 ? (
                <div className="border border-dashed border-white/10 rounded-2xl p-12 flex flex-col items-center justify-center text-center bg-white/[0.02]">
                    <div className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center mb-4 text-gray-600">
                        <Layout size={24} />
                    </div>
                    <h3 className="text-white font-medium mb-1">{t.no_timelines}</h3>
                    <p className="text-gray-500 text-sm mb-6 max-w-xs">
                        {t.no_timelines_desc}
                    </p>
                    <Link 
                        href="/create"
                        className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-gray-200 transition-colors inline-block"
                    >
                        {t.create_first}
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {timelines.map((project) => (
                        <Link 
                            key={project.id} 
                            href={`/editor/${project.id}`} 
                            className="group relative bg-[#0F0F0F] border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center border border-white/5">
                                    <Layout size={18} className="text-purple-400" />
                                </div>
                                <button onClick={(e) => handleDelete(e, project.id)} className="text-gray-600 hover:text-red-500 transition-colors z-20">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            
                            <h3 className="text-lg font-bold text-white mb-2 truncate pr-4">{project.title || t.untitled}</h3>
                            <p className="text-xs text-gray-500 mb-4 font-mono">
                                {t.edited}: {new Date(project.created_at).toLocaleDateString()}
                            </p>
                            
                            <div className="flex items-center text-xs font-bold text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                {t.continue} <ChevronRight size={12} />
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>

      </main>
    </div>
  );
}