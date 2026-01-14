"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { createBrowserClient } from "@supabase/ssr"; 
import { ArrowLeft, ArrowRight, Sparkles, Loader2, Zap, Plus, Trash2, FileSpreadsheet, Image as ImageIcon, X, Download, Copy, PenTool, Calendar, Save, AlignLeft, Palette, Search, Wand2, LayoutTemplate, Layers, UploadCloud, Globe } from "lucide-react";
import toast from "react-hot-toast";
import Papa from "papaparse";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { motion } from "framer-motion";

// 👇 IMPORT THE NEW COMPONENT
import TimelineDisplay from "@/components/TimelineDisplay"; 

// 🗣️ DICTIONARY: English vs Spanish Text
const TRANSLATIONS = {
  en: {
    back: "Dashboard",
    import_btn: "Import from Sheets",
    hero_title: "How do you want to",
    hero_highlight: "build your timeline?",
    hero_desc: "Choose the power of AI or control every detail manually.",
    ai_placeholder: "Type a topic for AI (e.g. 'History of Apple')",
    generate_btn: "Generate",
    or: "OR",
    manual_title: "Start from Scratch",
    manual_desc: "Build your timeline manually, event by event. Perfect for custom projects.",
    import_title: "Import from Google Sheets",
    import_desc: "Paste a public Google Sheet link. Ensure columns are named: Year, Title, Description.",
    import_action: "Import",
    project_name: "Project Name",
    save_btn: "Save Project",
    add_event: "Add Event",
    empty_title: "Your timeline is empty.",
    empty_action: "Add your first event",
    editor_title: "Create Event",
    editor_edit: "Edit Event",
    save_changes: "Save Changes",
    cancel: "Cancel",
    toast_empty: "Timeline is empty",
    toast_name: "Please give your project a name",
    toast_login: "Please login to save",
    toast_saved: "Project Saved! 🎉",
    toast_gen_success: "Timeline Generated!",
    toast_import_success: "Imported events!",
    copy_success: "Copied to clipboard!"
  },
  es: {
    back: "Panel",
    import_btn: "Importar de Sheets",
    hero_title: "¿Cómo quieres",
    hero_highlight: "construir tu línea de tiempo?",
    hero_desc: "Elige el poder de la IA o controla cada detalle manualmente.",
    ai_placeholder: "Escribe un tema (ej. 'Historia de México')",
    generate_btn: "Generar",
    or: "O",
    manual_title: "Empezar desde Cero",
    manual_desc: "Construye tu línea de tiempo manualmente, evento por evento. Perfecto para proyectos personalizados.",
    import_title: "Importar de Google Sheets",
    import_desc: "Pega un enlace público de Google Sheet. Asegúrate de que las columnas se llamen: Year, Title, Description.",
    import_action: "Importar",
    project_name: "Nombre del Proyecto",
    save_btn: "Guardar Proyecto",
    add_event: "Agregar Evento",
    empty_title: "Tu línea de tiempo está vacía.",
    empty_action: "Agrega tu primer evento",
    editor_title: "Crear Evento",
    editor_edit: "Editar Evento",
    save_changes: "Guardar Cambios",
    cancel: "Cancelar",
    toast_empty: "La línea de tiempo está vacía",
    toast_name: "Por favor nombra tu proyecto",
    toast_login: "Inicia sesión para guardar",
    toast_saved: "¡Proyecto Guardado! 🎉",
    toast_gen_success: "¡Línea de tiempo generada!",
    toast_import_success: "¡Eventos importados!",
    copy_success: "¡Copiado al portapapeles!"
  }
};

export default function CreatePage() {
  const router = useRouter(); 
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false); 
  const [timeline, setTimeline] = useState<any[] | null>(null);
  const [importMode, setImportMode] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");
  
  // 🌍 Language State
  const [lang, setLang] = useState<'en' | 'es'>('en');

  // --- EDITOR STATES ---
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>({ title: "", year: "", description: "", image: "", color: "#3b82f6" });
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const printRef = useRef<HTMLDivElement>(null);

  // --- SUPABASE CLIENT ---
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1️⃣ DETECT LANGUAGE Logic
  useEffect(() => {
    const savedLang = localStorage.getItem('app-lang') as 'en' | 'es';
    if (savedLang) {
        setLang(savedLang);
    } else if (typeof document !== 'undefined' && document.referrer.includes('/es')) {
        setLang('es');
    }
  }, []);

  const t = TRANSLATIONS[lang]; // Current Translation

  // --- 💾 SAVE FUNCTION ---
  const handleSaveProject = async () => {
    if (!timeline || timeline.length === 0) return toast.error(t.toast_empty);
    if (!topic) return toast.error(t.toast_name);

    setSaving(true);
    
    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        toast.error(t.toast_login);
        router.push("/login");
        return;
    }

    // 2. Insert into DB
    const { error } = await supabase.from("timelines").insert({
        user_id: user.id,
        title: topic,
        events: timeline, 
    });

    setSaving(false);

    if (error) {
        console.error(error);
        toast.error("Failed to save project");
    } else {
        toast.success(t.toast_saved);
        router.push("/dashboard"); 
    }
  };

  // --- 1. AI GENERATION ---
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!topic.trim()) return toast.error(lang === 'es' ? "Por favor escribe un tema" : "Please enter a topic");
    
    setLoading(true);
    setTimeline(null);

    try {
        const res = await fetch("/api/generate-timeline", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ topic, language: lang }), 
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed");

        if (data.success && data.timeline) {
            // Hum ab yahan "image" ko null nahi karenge, kyunki API ab real images bhej raha hai
            // Hum API ke response ko as-is use karenge
            const enrichedData = data.timeline.map((item: any) => ({
                ...item,
                image: item.imageUrl || null, // Map API 'imageUrl' to local 'image'
                color: item.color || "#3b82f6" 
            }));
            
            setTimeline(enrichedData);
            toast.success(t.toast_gen_success);
        }
    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  // --- 2. MANUAL & EVENT MANAGEMENT ---
  const openEditor = (event: any = null, index: number | null = null) => {
    if (event) {
        setCurrentEvent({ ...event });
        setEditIndex(index);
    } else {
        setCurrentEvent({ title: "", year: "", description: "", image: "", color: "#3b82f6" });
        setEditIndex(null);
    }
    setIsEditorOpen(true);
  };

  const saveEvent = () => {
    if (!currentEvent.title || !currentEvent.year) return toast.error(lang === 'es' ? "Título y Año son obligatorios" : "Title & Year are required");
    let newTimeline = timeline ? [...timeline] : [];
    if (editIndex !== null) newTimeline[editIndex] = currentEvent;
    else newTimeline.push(currentEvent);
    
    setTimeline(newTimeline);
    setIsEditorOpen(false);
    toast.success(lang === 'es' ? "¡Evento Guardado!" : "Event Saved!");
  };

  const handleManualCreate = () => {
    setTopic(lang === 'es' ? "Nuevo Proyecto" : "New Project");
    setTimeline([]); 
    openEditor(); 
  };

  // --- 3. SHEET IMPORT ---
  const handleSheetImport = async () => {
    if (!sheetUrl) return toast.error("Please paste a link");
    let csvUrl = sheetUrl.replace(/\/edit.*$/, "/export?format=csv");
    setLoading(true);
    try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Ensure sheet is public");
        const csvText = await response.text();
        Papa.parse(csvText, {
            header: true,
            complete: (results: any) => {
                const importedData = results.data.map((row: any) => ({
                    year: row.Year || row.Date || "2024",
                    title: row.Title || row.Event || "Untitled",
                    description: row.Description || row.Desc || "",
                    image: row.Image || null,
                    color: row.Color || "#3b82f6"
                })).filter((item: any) => item.title);
                setTimeline(importedData);
                setImportMode(false);
                toast.success(`${t.toast_import_success} (${importedData.length})`);
            },
        });
    } catch (error: any) {
        toast.error(error.message);
    } finally {
        setLoading(false);
    }
  };

  // --- 4. IMAGE HANDLER ---
  const handleEditorImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setCurrentEvent({ ...currentEvent, image: reader.result });
        reader.readAsDataURL(file);
    }
  };

  // --- 5. DOWNLOAD & UTILS ---
  const downloadPDF = async () => {
    if (!printRef.current) return;
    printRef.current.style.display = "block";
    try {
        toast.loading("Rendering PDF...");
        // 'as any' lagane se Vercel check karna band kar dega
const canvas = await html2canvas(printRef.current, { scale: 2, backgroundColor: "#ffffff", useCORS: true } as any);
        const imgData = canvas.toDataURL("image/png");
        const pdfWidth = 210; 
        const pxToMm = 210 / canvas.width;
        const pdfHeight = canvas.height * pxToMm;
        const pdf = new jsPDF({ orientation: "p", unit: "mm", format: [pdfWidth, pdfHeight] });
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${topic.replace(/\s+/g, "_") || "Timeline"}.pdf`);
        toast.success("Downloaded!");
    } catch (err) {
        toast.error("Download Failed");
    } finally {
        toast.dismiss();
        if(printRef.current) printRef.current.style.display = "none";
    }
  };

  const copyForNotion = () => {
    if (!timeline) return;
    let text = `# Timeline: ${topic}\n\n`;
    timeline.forEach(t => text += `- **${t.year}**: ${t.title}\n  ${t.description}\n`);
    navigator.clipboard.writeText(text);
    toast.success(t.copy_success);
  };

  const handleDelete = (i: number) => { if(timeline) setTimeline(timeline.filter((_, idx) => idx !== i)); };

  const suggestions = lang === 'en' 
    ? ["History of Internet", "Elon Musk's Career", "French Revolution", "Project Roadmap 2026", "Evolution of AI"]
    : ["Historia de México", "Revolución Francesa", "Carrera de Messi", "Evolución del Internet", "Independencia"];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans relative overflow-hidden">
      
      {/* 🌌 Background Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center mb-12">
            <Link href="/dashboard" className="text-gray-400 hover:text-white flex items-center gap-2 transition-colors group">
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 border border-white/5 transition-all">
                    <ArrowLeft size={18}/> 
                </div>
                <span className="font-medium">{t.back}</span>
            </Link>
            
            {!timeline && (
                <button 
                    onClick={() => setImportMode(!importMode)} 
                    className="flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-900/10 border border-emerald-500/20 px-4 py-2 rounded-full hover:bg-emerald-900/20"
                >
                    <FileSpreadsheet size={16}/> {t.import_btn}
                </button>
            )}
        </div>

        {/* --- MAIN CREATION HERO --- */}
        {!timeline && !importMode && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto text-center mt-6"
            >
                {/* Hero Headline */}
                <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                    {t.hero_title} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">{t.hero_highlight}</span>
                </h1>
                <p className="text-gray-400 text-lg mb-10">
                    {t.hero_desc}
                </p>

                {/* 🚀 AI SECTION (Big Box) */}
                <div className="relative w-full group mb-8">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                    <form onSubmit={handleSubmit} className="relative flex bg-[#0f1014] border border-white/10 rounded-2xl p-2 shadow-2xl items-center">
                        <div className="pl-4 text-purple-400">
                            <Wand2 size={24} />
                        </div>
                        <input 
                            value={topic} 
                            onChange={(e) => setTopic(e.target.value)} 
                            placeholder={t.ai_placeholder}
                            className="w-full bg-transparent text-white px-4 py-4 text-lg outline-none placeholder:text-gray-600 font-medium"
                        />
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="bg-white text-black hover:bg-gray-200 font-bold px-6 py-3 rounded-xl transition-all flex items-center gap-2 shrink-0 disabled:opacity-50"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20}/> : <Sparkles size={20}/>}
                            <span className="hidden md:inline">{t.generate_btn}</span>
                        </button>
                    </form>
                    
                    {/* Suggestions */}
                    <div className="mt-3 flex flex-wrap justify-center gap-2">
                        {suggestions.slice(0, 4).map((s) => (
                            <button 
                                key={s} 
                                onClick={() => setTopic(s)}
                                className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-xs text-gray-400 transition-all cursor-pointer"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* OR DIVIDER */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="h-px bg-white/10 w-24"></div>
                    <span className="text-gray-500 text-sm font-bold">{t.or}</span>
                    <div className="h-px bg-white/10 w-24"></div>
                </div>

                {/* 🛠️ MANUAL SECTION (HIGHLIGHTED) */}
                <button 
                    onClick={handleManualCreate}
                    className="w-full group relative bg-[#0f1014] hover:bg-[#15151a] border border-white/10 hover:border-white/20 rounded-2xl p-6 flex items-center gap-6 transition-all hover:-translate-y-1 hover:shadow-xl cursor-pointer text-left"
                >
                    <div className="w-14 h-14 bg-blue-900/20 text-blue-400 rounded-xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                        <PenTool size={28} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{t.manual_title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{t.manual_desc}</p>
                    </div>
                    <div className="ml-auto text-gray-600 group-hover:text-white transition-colors">
                        <ArrowRight size={24} />
                    </div>
                </button>

            </motion.div>
        )}

        {/* --- IMPORT MODE --- */}
        {importMode && !timeline && (
             <motion.div initial={{opacity:0, scale:0.95}} animate={{opacity:1, scale:1}} className="max-w-xl mx-auto bg-[#111] border border-white/10 p-8 rounded-2xl shadow-2xl relative mt-20">
                <button onClick={() => setImportMode(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={20}/></button>
                <div className="w-12 h-12 bg-emerald-900/20 text-emerald-400 rounded-xl flex items-center justify-center mb-6">
                    <FileSpreadsheet size={24}/>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.import_title}</h3>
                <p className="text-gray-400 text-sm mb-6">{t.import_desc}</p>
                
                <div className="flex gap-2">
                    <input 
                        value={sheetUrl} 
                        onChange={(e) => setSheetUrl(e.target.value)} 
                        placeholder="https://docs.google.com/spreadsheets/d/..." 
                        className="flex-1 bg-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button onClick={handleSheetImport} disabled={loading} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                        {loading ? <Loader2 className="animate-spin"/> : t.import_action}
                    </button>
                </div>
             </motion.div>
        )}

        {/* --- TIMELINE EDITOR VIEW --- */}
        {timeline && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
                
                {/* Editor Toolbar with SAVE BUTTON */}
                <div className="bg-[#0f1014]/80 backdrop-blur-xl border border-white/10 p-4 rounded-2xl sticky top-4 z-40 shadow-2xl flex flex-wrap gap-4 items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-500/20 text-purple-400 rounded-lg">
                            <LayoutTemplate size={20} />
                        </div>
                        <div>
                            <input 
                                value={topic} 
                                onChange={(e) => setTopic(e.target.value)} 
                                className="bg-transparent font-bold text-xl outline-none text-white placeholder-gray-600 w-full md:w-64" 
                                placeholder={t.project_name}
                            />
                            <p className="text-xs text-gray-500">{timeline.length} Events</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={handleSaveProject} disabled={saving} className="h-10 px-4 bg-green-600 text-white hover:bg-green-700 rounded-lg flex items-center gap-2 text-sm font-bold transition-all shadow-lg shadow-green-900/20">
                            {saving ? <Loader2 className="animate-spin" size={16}/> : <UploadCloud size={16}/>} 
                            {t.save_btn}
                        </button>

                        <div className="w-px h-6 bg-white/10 mx-2"></div>

                        <button onClick={() => openEditor()} className="h-10 px-4 bg-white text-black hover:bg-gray-200 rounded-lg flex items-center gap-2 text-sm font-bold transition-transform hover:scale-105 active:scale-95">
                            <Plus size={16}/> {t.add_event}
                        </button>
                        <button onClick={copyForNotion} className="h-10 w-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-gray-300 rounded-lg transition-colors" title="Copy Text">
                            <Copy size={18}/>
                        </button>
                        <button onClick={downloadPDF} className="h-10 w-10 flex items-center justify-center bg-[#1a1a1a] hover:bg-[#252525] border border-white/10 text-gray-300 rounded-lg transition-colors" title="Download PDF">
                            <Download size={18}/>
                        </button>
                        <button onClick={() => setTimeline(null)} className="h-10 w-10 flex items-center justify-center bg-red-900/10 hover:bg-red-900/20 border border-red-500/20 text-red-400 rounded-lg transition-colors" title="Delete All">
                            <Trash2 size={18}/>
                        </button>
                    </div>
                </div>

                {/* 👇 THIS IS THE CHANGE: Using TimelineDisplay for images */}
                {timeline.length > 0 ? (
                    <TimelineDisplay events={timeline} />
                ) : (
                    <div className="text-center py-20 bg-[#0a0a0a] border border-white/5 rounded-3xl">
                        <p className="text-gray-500 mb-4">{t.empty_title}</p>
                        <button onClick={() => openEditor()} className="text-purple-400 hover:text-purple-300 hover:underline">{t.empty_action}</button>
                    </div>
                )}
            </motion.div>
        )}

        {/* --- EDITOR MODAL (Kept for manual edits) --- */}
        {isEditorOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60] flex items-center justify-center p-4">
                <motion.div initial={{scale: 0.95, opacity: 0}} animate={{scale: 1, opacity: 1}} className="bg-[#0f1014] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]">
                    
                    <div className="p-5 border-b border-white/10 flex justify-between items-center bg-[#1a1a1a]/50 rounded-t-2xl">
                        <h2 className="text-lg font-bold flex items-center gap-2">
                            <PenTool size={16} className="text-purple-500"/> 
                            {editIndex !== null ? t.editor_edit : t.editor_title}
                        </h2>
                        <button onClick={() => setIsEditorOpen(false)} className="text-gray-500 hover:text-white bg-white/5 p-1.5 rounded-full"><X size={16}/></button>
                    </div>

                    <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1.5">Event Title</label>
                            <input 
                                value={currentEvent.title} 
                                onChange={(e) => setCurrentEvent({...currentEvent, title: e.target.value})}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors"
                                placeholder="e.g. Invention of the Wheel"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1.5 flex items-center gap-1"><Calendar size={12}/> Year / Date</label>
                                <input 
                                    value={currentEvent.year} 
                                    onChange={(e) => setCurrentEvent({...currentEvent, year: e.target.value})}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors"
                                    placeholder="2024"
                                />
                            </div>
                            <div>
                                <label className="text-xs text-gray-400 uppercase font-bold block mb-1.5 flex items-center gap-1"><Palette size={12}/> Color Tag</label>
                                <div className="flex items-center gap-2 bg-black/50 border border-white/10 rounded-lg px-2 py-1.5 h-[48px]">
                                    <input 
                                        type="color"
                                        value={currentEvent.color} 
                                        onChange={(e) => setCurrentEvent({...currentEvent, color: e.target.value})}
                                        className="h-8 w-8 bg-transparent border-none cursor-pointer rounded overflow-hidden"
                                    />
                                    <span className="text-xs text-gray-500 uppercase">{currentEvent.color}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1.5 flex items-center gap-1"><AlignLeft size={12}/> Description</label>
                            <textarea 
                                value={currentEvent.description} 
                                onChange={(e) => setCurrentEvent({...currentEvent, description: e.target.value})}
                                className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500 transition-colors min-h-[100px] resize-none"
                                placeholder="What happened during this event?"
                            />
                        </div>

                        <div>
                            <label className="text-xs text-gray-400 uppercase font-bold block mb-1.5 flex items-center gap-1"><ImageIcon size={12}/> Cover Image</label>
                            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-white/20 rounded-lg cursor-pointer hover:border-purple-500 hover:bg-purple-900/10 transition-all relative overflow-hidden group">
                                {currentEvent.image ? (
                                    <>
                                        <img src={currentEvent.image} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"/>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="bg-black/80 px-3 py-1 rounded-full text-xs font-bold">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex flex-col items-center pt-5 pb-6 text-gray-500 group-hover:text-purple-400">
                                        <ImageIcon size={24} className="mb-2"/>
                                        <p className="text-xs">Click to upload</p>
                                    </div>
                                )}
                                <input type="file" className="hidden" accept="image/*" onChange={handleEditorImage} />
                            </label>
                        </div>
                    </div>

                    <div className="p-5 border-t border-white/10 flex gap-3 bg-[#1a1a1a]/50 rounded-b-2xl">
                        <button onClick={() => setIsEditorOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-400 hover:bg-white/5 transition-colors">{t.cancel}</button>
                        <button onClick={saveEvent} className="flex-1 bg-white text-black hover:bg-gray-200 py-3 rounded-xl font-bold flex justify-center items-center gap-2 shadow-lg shadow-white/10">
                            <Save size={18}/> {t.save_changes}
                        </button>
                    </div>

                </motion.div>
            </div>
        )}

        {/* PRINT TEMPLATE (Hidden) - for PDF Engine compatibility */}
        <div ref={printRef} className="hidden" style={{ width: '800px', background: 'white', padding: '50px', color: 'black', fontFamily: 'sans-serif' }}>
            <div style={{ borderBottom: '2px solid #ddd', paddingBottom: '20px', marginBottom: '40px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: 'bold', margin: '0 0 10px 0', textTransform: 'capitalize' }}>{topic}</h1>
                <p style={{ color: '#666', fontSize: '14px' }}>Timeline Report • Generated by AI Timeline Maker</p>
            </div>
            <div style={{ position: 'relative', borderLeft: '4px solid #e5e7eb', marginLeft: '20px', paddingLeft: '40px' }}>
                {timeline?.map((event, index) => (
                    <div key={index} style={{ marginBottom: '50px', position: 'relative' }}>
                        <div style={{ position: 'absolute', left: '-50px', top: '5px', width: '16px', height: '16px', background: 'white', border: `4px solid ${event.color || '#3b82f6'}`, borderRadius: '50%' }}></div>
                        <div style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
                            <div style={{ width: '100px', flexShrink: 0 }}>
                                <span style={{ background: '#f3f4f6', color: '#1f2937', padding: '5px 15px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: '1px solid #e5e7eb' }}>
                                    {event.year}
                                </span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 10px 0', color: '#111' }}>{event.title}</h3>
                                {event.image && (
                                    <img src={event.image} alt="Event" style={{ width: '300px', height: '180px', objectFit: 'cover', borderRadius: '10px', marginBottom: '15px', border: '1px solid #eee' }} />
                                )}
                                <p style={{ fontSize: '15px', lineHeight: '1.6', color: '#4b5563', margin: 0 }}>{event.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div style={{ marginTop: '60px', borderTop: '1px solid #eee', paddingTop: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
                © 2026 AI Timeline Maker
            </div>
        </div>

      </div>
    </div>
  );
}