"use client";

import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr"; // ✅ Updated import for SSR consistency
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, FileText, Sparkles, Loader2, Pencil, Save, Upload, Table, X, Globe } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse'; 
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

// 🗣️ DICTIONARY: English vs Spanish Text
const TRANSLATIONS = {
  en: {
    back: "Dashboard",
    free_plan: "Free Plan",
    untitled: "Untitled Project",
    renamed: "Renamed!",
    
    // Buttons
    btn_import: "Import CSV",
    btn_pdf: "PDF",
    btn_ai: "AI Generate",
    btn_save: "Save Event",
    btn_saving: "Saving...",
    btn_generate: "Generate Magic",
    
    // Manual Panel
    manual_title: "Manual Add",
    ph_title: "Title",
    ph_date: "Date",
    ph_desc: "Details...",
    
    // AI Modal
    ai_title: "AI Timeline Generator",
    ai_tab_topic: "By Topic",
    ai_tab_text: "Paste Text",
    ai_ph_topic: "e.g. History of Bitcoin...",
    ai_ph_text: "Paste paragraph from Wikipedia or Book...",
    
    // Timeline View
    watermark_title: "TimelinePro",
    watermark_sub: "Created with Free Plan",
    empty_state: "Import CSV or Use AI",
    
    // Toasts & Errors
    toast_missing: "Required fields missing",
    toast_added: "Added!",
    toast_imported: "Imported events!",
    toast_db_error: "Database Error",
    toast_csv_error: "CSV Headers must be: Title, Date",
    toast_input: "Enter input!",
    toast_ai_success: "Generated events!",
    toast_ai_fail: "AI failed.",
    toast_error: "Error generating.",
    confirm_delete: "Delete?",
    toast_deleted: "Deleted",
    toast_pdf_loading: "Creating PDF...",
    toast_pdf_success: "PDF Downloaded!",
    toast_pdf_fail: "Failed"
  },
  es: {
    back: "Panel",
    free_plan: "Plan Gratis",
    untitled: "Proyecto Sin Título",
    renamed: "¡Renombrado!",
    
    // Buttons
    btn_import: "Importar CSV",
    btn_pdf: "PDF",
    btn_ai: "Generar IA",
    btn_save: "Guardar",
    btn_saving: "Guardando...",
    btn_generate: "Generar Magia",
    
    // Manual Panel
    manual_title: "Agregar Manual",
    ph_title: "Título",
    ph_date: "Fecha",
    ph_desc: "Detalles...",
    
    // AI Modal
    ai_title: "Generador de Línea de Tiempo IA",
    ai_tab_topic: "Por Tema",
    ai_tab_text: "Pegar Texto",
    ai_ph_topic: "ej. Historia de Bitcoin...",
    ai_ph_text: "Pega un párrafo de Wikipedia o Libro...",
    
    // Timeline View
    watermark_title: "TimelinePro",
    watermark_sub: "Creado con Plan Gratis",
    empty_state: "Importar CSV o Usar IA",
    
    // Toasts & Errors
    toast_missing: "Faltan campos obligatorios",
    toast_added: "¡Agregado!",
    toast_imported: "¡Eventos importados!",
    toast_db_error: "Error de Base de Datos",
    toast_csv_error: "Encabezados CSV deben ser: Title, Date",
    toast_input: "¡Ingresa un tema!",
    toast_ai_success: "¡Eventos generados!",
    toast_ai_fail: "Fallo de IA.",
    toast_error: "Error al generar.",
    confirm_delete: "¿Eliminar?",
    toast_deleted: "Eliminado",
    toast_pdf_loading: "Creando PDF...",
    toast_pdf_success: "¡PDF Descargado!",
    toast_pdf_fail: "Falló"
  }
};

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  const timelineId = params?.id; 

  const timelineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  
  // 🟢 AI STATES
  const [showAI, setShowAI] = useState(false);
  const [aiMode, setAiMode] = useState<"topic" | "text">("topic");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // 🌍 Language State
  const [lang, setLang] = useState<'en' | 'es'>('en');

  // Supabase Client
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // 1️⃣ DETECT LANGUAGE & LOAD DATA
  useEffect(() => {
    // Language Logic
    const savedLang = localStorage.getItem('app-lang') as 'en' | 'es';
    if (savedLang) {
        setLang(savedLang);
    } else if (typeof document !== 'undefined' && document.referrer.includes('/es')) {
        setLang('es');
    }

    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      if (timelineId) {
        const { data: project } = await supabase.from('timelines').select('title').eq('id', timelineId).single();
        if (project) setProjectTitle(project.title);

        const { data: eventsData } = await supabase.from('timeline_events').select('*').eq('timeline_id', timelineId).order('date', { ascending: true });
        if (eventsData) setEvents(eventsData);
      }
      setLoading(false);
    }
    loadData();
  }, [timelineId, router]);

  // 🔄 Language Toggle
  const toggleLanguage = () => {
    const newLang = lang === 'en' ? 'es' : 'en';
    setLang(newLang);
    localStorage.setItem('app-lang', newLang);
  };

  const t = TRANSLATIONS[lang]; // Current Text

  const updateTitle = async () => {
      setIsEditingTitle(false);
      if(!projectTitle.trim()) return;
      await supabase.from('timelines').update({ title: projectTitle }).eq('id', timelineId);
      toast.success(t.renamed);
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) { toast.error(t.toast_missing); return; }
    setSaving(true);
    const { data, error } = await supabase.from('timeline_events').insert([{ 
          user_id: user.id, timeline_id: timelineId, 
          title: newEvent.title, date: newEvent.date, description: newEvent.description 
        }]).select();

    if (error) toast.error(error.message);
    else {
      if(data) setEvents([...events, ...data]);
      setNewEvent({ title: "", date: "", description: "" });
      toast.success(t.toast_added);
    }
    setSaving(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
              const importedEvents: any[] = [];
              results.data.forEach((row: any) => {
                  const title = row.Title || row.title || row.Name;
                  const date = row.Date || row.date;
                  const desc = row.Description || row.description || "";
                  if (title && date) {
                      importedEvents.push({
                          user_id: user.id, timeline_id: timelineId,
                          title: title, date: date, description: desc
                      });
                  }
              });

              if (importedEvents.length > 0) {
                  const { data, error } = await supabase.from('timeline_events').insert(importedEvents).select();
                  if (!error && data) {
                      setEvents([...events, ...data]);
                      toast.success(`${t.toast_imported} (${data.length})`);
                  } else { toast.error(t.toast_db_error); }
              } else { toast.error(t.toast_csv_error); }
          }
      });
      if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt) return toast.error(t.toast_input);
    setAiLoading(true);
    try {
        // Pass language to AI API
        const res = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ prompt: aiPrompt, language: lang }), 
        });
        const data = await res.json();
        if (data.events) {
            const formattedEvents = data.events.map((ev: any) => ({
                user_id: user.id, timeline_id: timelineId,
                title: ev.title, date: ev.date, description: ev.description || ""
            }));
            const { data: savedData, error } = await supabase.from('timeline_events').insert(formattedEvents).select();
            if (error) throw error;
            if (savedData) setEvents([...events, ...savedData]);
            toast.success(`${t.toast_ai_success} (${savedData.length})`);
            setShowAI(false);
            setAiPrompt("");
        } else { toast.error(t.toast_ai_fail); }
    } catch (error) { toast.error(t.toast_error); } finally { setAiLoading(false); }
  };

  const deleteEvent = async (id: number) => {
    if(!confirm(t.confirm_delete)) return;
    const { error } = await supabase.from('timeline_events').delete().eq('id', id);
    if (!error) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success(t.toast_deleted);
    }
  };

  const handleExportPDF = async () => {
    if (!timelineRef.current) return;
    const loadToast = toast.loading(t.toast_pdf_loading);
    try {
        const canvas = await html2canvas(timelineRef.current, {
            scale: 2, backgroundColor: '#0f172a', useCORS: true,
            width: timelineRef.current.scrollWidth, height: timelineRef.current.scrollHeight
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('l', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgProps = pdf.getImageProperties(imgData);
        const imgRatio = imgProps.width / imgProps.height;
        let finalWidth = pdfWidth;
        let finalHeight = finalWidth / imgRatio;
        if (finalHeight > pdfHeight) { finalHeight = pdfHeight; finalWidth = finalHeight * imgRatio; }
        const x = (pdfWidth - finalWidth) / 2; const y = (pdfHeight - finalHeight) / 2;
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save(`${projectTitle.replace(/\s+/g, '_')}_timeline.pdf`);
        toast.dismiss(loadToast);
        toast.success(t.toast_pdf_success);
    } catch (err) { toast.dismiss(loadToast); toast.error(t.toast_pdf_fail); }
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const CARD_SPACING = 350; 
  const totalWidth = Math.max(1200, sortedEvents.length * CARD_SPACING + 400);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500 w-8 h-8"/></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 flex flex-col font-sans h-screen">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 z-20 shrink-0">
        <div className="flex items-center gap-4 w-full md:w-auto">
            <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-400 hover:text-white" />
            </Link>
            <div className="flex flex-col">
                {isEditingTitle ? (
                    <div className="flex items-center gap-2">
                        <input autoFocus type="text" className="bg-transparent border-b border-purple-500 text-lg font-bold text-white outline-none w-48"
                            value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && updateTitle()}
                        />
                        <button onClick={updateTitle} className="bg-purple-600 p-1 rounded-md"><Save className="w-4 h-4"/></button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingTitle(true)}>
                        <h1 className="text-lg font-bold hover:text-purple-400 transition-colors">{projectTitle || t.untitled}</h1>
                        <Pencil className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </div>
                )}
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">{t.free_plan}</p>
            </div>
        </div>
        
        <div className="flex gap-2 items-center">
            
            {/* 🌍 Language Switcher */}
            <button onClick={toggleLanguage} className="bg-white/5 hover:bg-white/10 text-gray-300 px-3 py-2 rounded-xl font-bold flex items-center gap-1 text-xs border border-white/10">
                <Globe className="w-4 h-4" /> {lang === 'en' ? 'ES' : 'EN'}
            </button>

            <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            
            <button onClick={() => fileInputRef.current?.click()} className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 px-3 py-2 rounded-xl font-medium flex items-center gap-2 text-xs transition-all">
                <Table className="w-4 h-4" /> {t.btn_import}
            </button>

            <button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-red-900/20 transition-all">
                <FileText className="w-4 h-4" /> {t.btn_pdf}
            </button>
            <button onClick={() => setShowAI(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-indigo-900/20 transition-all">
                <Sparkles className="w-4 h-4" /> {t.btn_ai}
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden h-full relative">
        {/* MANUAL ADD */}
        <div className="lg:w-1/4 h-full bg-[#111]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hidden lg:block overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-200"><Plus className="w-5 h-5 text-purple-500" /> {t.manual_title}</h2>
          <div className="space-y-4">
             <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder={t.ph_title} />
             <input type="date" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-gray-300" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
             <textarea className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" rows={2} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder={t.ph_desc} />
             <button onClick={addEvent} disabled={saving} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200">{saving ? t.btn_saving : t.btn_save}</button>
          </div>
        </div>

        {/* TIMELINE DISPLAY */}
        <div className="flex-1 bg-[#0f172a] rounded-2xl border border-white/5 relative overflow-hidden shadow-inner w-full">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="absolute inset-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
                <div ref={timelineRef} className="relative h-full flex items-center bg-[#0f172a]" style={{ width: `${totalWidth}px` }}>
                    
                    {/* WATERMARK */}
                    <div className="absolute bottom-6 right-6 z-0 opacity-40 pointer-events-none flex flex-col items-end">
                        <div className="text-2xl font-bold text-white tracking-widest uppercase">{t.watermark_title}</div>
                        <div className="text-xs text-gray-400">{t.watermark_sub}</div>
                    </div>

                    <div className="absolute w-full h-1 bg-gray-700 rounded-full left-0 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                    
                    {sortedEvents.length === 0 && <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500 left-1/2 transform -translate-x-1/2"><p>{t.empty_state}</p></div>}
                    
                    <AnimatePresence>
                    {sortedEvents.map((ev, index) => {
                        const leftPos = (index * CARD_SPACING) + 150; 
                        const isTop = index % 2 === 0;
                        return (
                            <motion.div key={ev.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} className="absolute transform -translate-x-1/2 flex flex-col items-center group z-10" style={{ left: `${leftPos}px`, top: '50%', marginTop: '-6px' }}>
                                <div className="w-4 h-4 bg-[#0f172a] rounded-full border-[3px] border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)] z-20 absolute hover:scale-150 transition-transform cursor-pointer"></div>
                                <div className={`absolute text-[11px] font-mono text-purple-400 font-bold tracking-wider ${isTop ? 'top-6' : '-top-9'}`}>{ev.date}</div>
                                <div className={`absolute flex flex-col items-center w-72 transition-all duration-300 ${isTop ? '-top-52' : 'top-14'}`}>
                                    <div className={`w-[2px] bg-gradient-to-b from-purple-500 to-transparent h-14 opacity-50 ${isTop ? 'order-last rotate-180' : ''}`}></div>
                                    <div className={`bg-[#1a1a1a] border border-gray-700 p-5 rounded-xl text-center shadow-xl relative w-full group-hover:border-purple-500 group-hover:bg-black group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all z-30 ${isTop ? 'mb-2' : 'mt-2'}`}>
                                        <button onClick={() => deleteEvent(ev.id)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all z-40 cursor-pointer"><Trash2 className="w-3 h-3" /></button>
                                        <h3 className="text-base font-bold text-white leading-tight mb-2">{ev.title}</h3>
                                        <p className="text-xs text-gray-400 leading-relaxed line-clamp-4">{ev.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </div>

      {/* AI MODAL */}
      <AnimatePresence>
      {showAI && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#111] border border-gray-700 p-6 rounded-2xl w-full max-w-lg relative text-center shadow-2xl">
                <button onClick={() => setShowAI(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5"/></button>
                <Sparkles className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-2">{t.ai_title}</h2>
                
                {/* TABS */}
                <div className="flex gap-2 justify-center mb-6">
                    <button onClick={() => setAiMode("topic")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${aiMode === "topic" ? "bg-white text-black" : "bg-white/10 text-gray-400"}`}>{t.ai_tab_topic}</button>
                    <button onClick={() => setAiMode("text")} className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${aiMode === "text" ? "bg-white text-black" : "bg-white/10 text-gray-400"}`}>{t.ai_tab_text}</button>
                </div>

                {aiMode === "topic" ? (
                    <input type="text" placeholder={t.ai_ph_topic} className="w-full bg-black border border-gray-600 rounded-lg p-3 text-white mb-4 text-center" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                ) : (
                    <textarea placeholder={t.ai_ph_text} className="w-full bg-black border border-gray-600 rounded-lg p-3 text-white mb-4 text-sm min-h-[100px]" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                )}

                <button onClick={handleAIGenerate} disabled={aiLoading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                    {aiLoading ? <Loader2 className="animate-spin" /> : t.btn_generate}
                </button>
            </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}