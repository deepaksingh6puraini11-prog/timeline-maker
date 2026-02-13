"use client";

import { useState, useEffect, useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
  User,
  Zap,
  Users,
  Share2,
  Star,
  Globe,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";

// 🗣️ DICTIONARY: English vs Spanish Text
const TRANSLATIONS = {
  en: {
    hero_title: "Create interactive stories",
    hero_highlight: "in minutes.",
    feature1_title: "Smart Templates",
    feature1_desc: "Start with ready-made AI templates",
    feature2_title: "Real-time Collaborate",
    feature2_desc: "Work together with your team",
    feature3_title: "Publish & Share",
    feature3_desc: "Export to PDF or share live link",
    review_text: "Trusted by 40,000+ storytellers",
    welcome_back: "Welcome Back",
    create_account: "Create Account",
    login_desc: "Sign in to continue your journey.",
    signup_desc: "Enter your details to get started free.",
    google_btn: "Continue with Google",
    or_email: "Or continue with email",
    placeholder_name: "Full Name",
    placeholder_email: "Email address",
    placeholder_pass: "Password",
    btn_login: "Log In",
    btn_signup: "Sign Up Free",
    have_account: "Already have an account?",
    need_account: "Need an account?",
    link_login: "Log In",
    link_register: "Register here",
    toast_name: "Please enter your name",
    toast_success: "Account created! Check email.",
    toast_invalid: "Invalid credentials",
    toast_welcome: "Welcome back! Redirecting...",
    back_home: "Back to Home",
  },
  es: {
    hero_title: "Crea historias interactivas",
    hero_highlight: "en minutos.",
    feature1_title: "Plantillas Inteligentes",
    feature1_desc: "Empieza con plantillas de IA listas",
    feature2_title: "Colaboración Real",
    feature2_desc: "Trabaja junto con tu equipo",
    feature3_title: "Publicar y Compartir",
    feature3_desc: "Exporta a PDF o comparte enlace",
    review_text: "Con la confianza de 40,000+ creadores",
    welcome_back: "Bienvenido de Nuevo",
    create_account: "Crear Cuenta",
    login_desc: "Inicia sesión para continuar tu viaje.",
    signup_desc: "Ingresa tus datos para empezar gratis.",
    google_btn: "Continuar con Google",
    or_email: "O continúa con email",
    placeholder_name: "Nombre Completo",
    placeholder_email: "Correo electrónico",
    placeholder_pass: "Contraseña",
    btn_login: "Iniciar Sesión",
    btn_signup: "Regístrate Gratis",
    have_account: "¿Ya tienes cuenta?",
    need_account: "¿Necesitas una cuenta?",
    link_login: "Ingresar",
    link_register: "Regístrate aquí",
    toast_name: "Por favor ingresa tu nombre",
    toast_success: "¡Cuenta creada! Revisa tu correo.",
    toast_invalid: "Credenciales inválidas",
    toast_welcome: "¡Bienvenido de nuevo! Redirigiendo...",
    back_home: "Volver al Inicio",
  },
};

function clearSupabaseCookies() {
  if (typeof document === "undefined") return;

  // Supabase cookie prefixes (most common)
  const cookieNames = document.cookie
    .split(";")
    .map((c) => c.trim().split("=")[0])
    .filter((name) => name.startsWith("sb-"));

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax; Secure`;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
  });
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [lang, setLang] = useState<"en" | "es">("en");

  // ✅ stable supabase client
  const supabase = useMemo(() => {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);

  // ✅ IMPORTANT: keep domain consistent (non-www)
  const redirectUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/auth/callback"
      : "https://aitimelinemaker.online/auth/callback";

  useEffect(() => {
    const savedLang = localStorage.getItem("app-lang") as "en" | "es";
    if (savedLang) setLang(savedLang);
    else if (typeof document !== "undefined" && document.referrer.includes("/es"))
      setLang("es");
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "en" ? "es" : "en";
    setLang(newLang);
    localStorage.setItem("app-lang", newLang);
  };

  const t = TRANSLATIONS[lang];

  // 👇 GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    setLoading(true);

    // ✅ safety: stale auth cookies kabhi-kabhi PKCE flow tod dete hain
    clearSupabaseCookies();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  // EMAIL AUTH
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      if (!fullName.trim()) {
        toast.error(t.toast_name);
        setLoading(false);
        return;
      }

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: redirectUrl,
        },
      });

      if (error) toast.error(error.message);
      else {
        toast.success(t.toast_success);
        setIsSignUp(false);
      }

      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(t.toast_invalid);
      setLoading(false);
      return;
    }

    toast.success(t.toast_welcome);
    router.refresh();

    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 700);
  };

  return (
    <div className="min-h-screen flex bg-[#050505] text-white font-sans relative">
      {/* 🧭 NAV BUTTONS */}
      <div className="absolute top-6 left-6 md:left-8 z-50">
        <Link
          href={lang === "es" ? "/es" : "/"}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full border border-white/10"
        >
          <ArrowLeft size={14} /> {t.back_home}
        </Link>
      </div>

      <div className="absolute top-6 right-6 md:right-8 z-50">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 text-sm font-bold text-gray-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded-full hover:bg-white/5 backdrop-blur-sm bg-black/50"
        >
          <Globe size={14} />
          <span>{lang === "en" ? "ES" : "EN"}</span>
        </button>
      </div>

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-[#0a0a0a] border-r border-white/5 flex-col justify-center px-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-12 leading-tight">
            {t.hero_title} <br />{" "}
            <span className="text-purple-400">{t.hero_highlight}</span>
          </h2>

          <div className="space-y-8 mb-12">
            <FeatureItem icon={<Zap className="text-yellow-400" />} title={t.feature1_title} desc={t.feature1_desc} />
            <FeatureItem icon={<Users className="text-blue-400" />} title={t.feature2_title} desc={t.feature2_desc} />
            <FeatureItem icon={<Share2 className="text-green-400" />} title={t.feature3_title} desc={t.feature3_desc} />
          </div>

          <div className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md inline-block">
            <div className="flex items-center gap-2 mb-1">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold">4.9/5</span>
            </div>
            <p className="text-xs text-gray-400">{t.review_text}</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 lg:text-left">
            <h1 className="text-3xl font-bold mb-2">
              {isSignUp ? t.create_account : t.welcome_back}
            </h1>
            <p className="text-gray-400 text-sm">
              {isSignUp ? t.signup_desc : t.login_desc}
            </p>
          </div>

          {/* GOOGLE BUTTON */}
          <div className="mb-8">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white text-black py-3.5 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95 shadow-lg shadow-white/5 text-base disabled:opacity-60"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              {t.google_btn}
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#050505] px-2 text-gray-500">{t.or_email}</span>
            </div>
          </div>

          {/* EMAIL FORM */}
          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
                <input
                  type="text"
                  placeholder={t.placeholder_name}
                  className="w-full bg-[#111] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-purple-500 focus:outline-none transition-all"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="email"
                placeholder={t.placeholder_email}
                className="w-full bg-[#111] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-purple-500 focus:outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-400 transition-colors" />
              <input
                type="password"
                placeholder={t.placeholder_pass}
                className="w-full bg-[#111] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white focus:border-purple-500 focus:outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-900/25 disabled:opacity-60"
            >
              {loading ? <Loader2 className="animate-spin" /> : isSignUp ? t.btn_signup : t.btn_login}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
            {isSignUp ? t.have_account + " " : t.need_account + " "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setFullName("");
              }}
              className="text-purple-400 hover:text-white font-bold transition-colors"
            >
              {isSignUp ? t.link_login : t.link_register}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-xl shrink-0 border border-white/5">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-200">{title}</h3>
        <p className="text-sm text-gray-500">{desc}</p>
      </div>
    </div>
  );
}
