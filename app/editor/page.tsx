"use client";

import { useState, useRef, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr"; // ✅ Correct Import
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, X, Sparkles, Loader2, Pencil, Save, FileText, Table } from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Papa from 'papaparse';
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function EditorPage() {
  const router = useRouter();
  const params = useParams();
  
  // ✅ FIX: ID Check (Handle both string and array, or undefined)
  const rawId = params?.id;
  const [timelineId, setTimelineId] = useState<number | null>(
    rawId ? parseInt(Array.isArray(rawId) ? rawId[0] : rawId) : null
  );

  const timelineRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  // ✅ Supabase Client Instance
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      // Agar ID hai to data load karo
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

  // ✅ Helper: Ensure Timeline Exists before adding events
  const ensureTimelineExists = async () => {
    if (timelineId) return timelineId;

    // Create new timeline if one doesn't exist
    const { data, error } = await supabase
        .from('timelines')
        .insert([{ title: projectTitle, user_id: user.id }])
        .select()
        .single();

    if (error || !data) {
        toast.error("Could not create timeline");
        return null;
    }

    setTimelineId(data.id);
    // URL update karo bina reload kiye
    window.history.replaceState(null, '', `/editor/${data.id}`);
    return data.id;
  };

  const updateTitle = async () => {
      setIsEditingTitle(false);
      if(!projectTitle.trim()) return;
      
      // Agar timeline abhi bani hi nahi, to bas state update karo
      if (!timelineId) return;

      await supabase.from('timelines').update({ title: projectTitle }).eq('id', timelineId);
      toast.success("Renamed!");
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) { toast.error("Title & Date required"); return; }
    setSaving(true);

    const currentTimelineId = await ensureTimelineExists();
    if (!currentTimelineId) { setSaving(false); return; }

    const { data, error } = await supabase.from('timeline_events').insert([{ 
          user_id: user.id, timeline_id: currentTimelineId, 
          title: newEvent.title, date: newEvent.date, description: newEvent.description 
        }]).select();

    if (error) toast.error(error.message);
    else {
      if(data) setEvents([...events, ...data]);
      setNewEvent({ title: "", date: "", description: "" });
      toast.success("Added!");
    }
    setSaving(false);
  };

  // 🟢 FIXED CSV IMPORT
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      Papa.parse(file, {
          header: true,
          complete: async (results) => {
              const currentTimelineId = await ensureTimelineExists();
              if (!currentTimelineId) return;

              const importedEvents: any[] = [];
              
              results.data.forEach((row: any) => {
                  if (row.Title && row.Date) {
                      // ✅ Date Format Fix (YYYY-MM-DD)
                      const dateObj = new Date(row.Date);
                      const isValidDate = !isNaN(dateObj.getTime());
                      const formattedDate = isValidDate ? dateObj.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

                      importedEvents.push({
                          user_id: user.id,
                          timeline_id: currentTimelineId,
                          title: row.Title,
                          date: formattedDate,
                          description: row.Description || ""
                      });
                  }
              });

              if (importedEvents.length > 0) {
                  const { data, error } = await supabase.from('timeline_events').insert(importedEvents).select();
                  if (!error && data) {
                      setEvents([...events, ...data]);
                      toast.success(`Imported ${data.length} events!`);
                  } else {
                      toast.error("Import failed.");
                  }
              } else {
                  toast.error("CSV format invalid. Headers: Title, Date, Description");
              }
          }
      });
  };

  // 🟢 AI GENERATOR
  const handleAIGenerate = async () => {
    if (!aiPrompt) return toast.error("Enter a topic!");
    setAiLoading(true);
    
    try {
        const currentTimelineId = await ensureTimelineExists();
        if (!currentTimelineId) return;

        const res = await fetch("/api/generate", {
            method: "POST",
            body: JSON.stringify({ prompt: aiPrompt }),
        });
        const data = await res.json();
        
        if (data.events) {
            const formattedEvents = data.events.map((ev: any) => ({
                user_id: user.id, timeline_id: currentTimelineId,
                title: ev.title, date: ev.date, description: ev.description || ""
            }));
            
            const { data: savedData, error } = await supabase.from('timeline_events').insert(formattedEvents).select();
            if (error) throw error;
            if (savedData) setEvents([...events, ...savedData]);
            toast.success(`Generated ${savedData.length} events!`);
            setShowAI(false);
            setAiPrompt("");
        } else {
            toast.error("AI could not generate timeline.");
        }
    } catch (error) {
        toast.error("Server error.");
    } finally {
        setAiLoading(false);
    }
  };

  const deleteEvent = async (id: number) => {
    if(!confirm("Are you sure?")) return;
    const { error } = await supabase.from('timeline_events').delete().eq('id', id);
    if (!error) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Deleted");
    }
  };

  // 🟢 PDF EXPORT (Scroll Fix Added)
  const handleExportPDF = async () => {
    if (!timelineRef.current) return;
    const loadToast = toast.loading("Generating PDF...");
    
    try {
        const canvas = await html2canvas(timelineRef.current, {
            scale: 2, backgroundColor: '#0f172a', useCORS: true,
            width: timelineRef.current.scrollWidth, // Full scroll width
            height: timelineRef.current.scrollHeight,
            windowWidth: timelineRef.current.scrollWidth
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
        
        const x = (pdfWidth - finalWidth) / 2;
        const y = (pdfHeight - finalHeight) / 2;
        
        pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
        pdf.save(`${projectTitle.replace(/\s+/g, '_')}_timeline.pdf`);
        toast.dismiss(loadToast);
        toast.success("Downloaded! 📄");
    } catch (err) { 
        toast.dismiss(loadToast); 
        toast.error("PDF Failed"); 
    }
  };

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const CARD_SPACING = 350; 
  const totalWidth = Math.max(1200, sortedEvents.length * CARD_SPACING + 400);

  if (loading) return <div className="min-h-screen bg-[#050505] flex items-center justify-center"><Loader2 className="animate-spin text-purple-500 w-8 h-8"/></div>;

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-6 flex flex-col font-sans h-screen overflow-hidden">
      
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
                        <h1 className="text-lg font-bold hover:text-purple-400 transition-colors">{projectTitle}</h1>
                        <Pencil className="w-3 h-3 text-gray-500 group-hover:text-white" />
                    </div>
                )}
            </div>
        </div>
        
        <div className="flex gap-2">
            <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileUpload} />
            
            <button onClick={() => fileInputRef.current?.click()} className="bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-600/50 px-3 py-2 rounded-xl font-medium flex items-center gap-2 text-xs">
                <Table className="w-4 h-4" /> Import Sheet
            </button>

            <button onClick={handleExportPDF} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-red-900/20 transition-all">
                <FileText className="w-4 h-4" /> PDF
            </button>
            <button onClick={() => setShowAI(true)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 text-sm shadow-lg shadow-indigo-900/20 transition-all">
                <Sparkles className="w-4 h-4" /> AI Generate
            </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden h-full relative">
        {/* SIDEBAR INPUT */}
        <div className="lg:w-1/4 h-full bg-[#111]/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl hidden lg:block overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-gray-200"><Plus className="w-5 h-5 text-purple-500" /> Manual Add</h2>
          <div className="space-y-4">
             <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event Title" />
             <input type="date" className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-gray-300" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
             <textarea className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-sm text-white" rows={2} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Details..." />
             <button onClick={addEvent} disabled={saving} className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200">{saving ? "Saving..." : "Save Event"}</button>
          </div>
        </div>

        {/* TIMELINE VISUAL */}
        <div className="flex-1 bg-[#0f172a] rounded-2xl border border-white/5 relative overflow-hidden shadow-inner w-full">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
            
            <div className="absolute inset-0 overflow-x-auto overflow-y-hidden custom-scrollbar">
                <div ref={timelineRef} className="relative h-full flex items-center bg-[#0f172a]" style={{ width: `${totalWidth}px` }}>
                    <div className="absolute w-full h-1 bg-gray-700 rounded-full left-0 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
                    
                    {sortedEvents.length === 0 && <div className="absolute inset-0 flex items-center justify-center flex-col text-gray-500 left-1/2 transform -translate-x-1/2 pointer-events-none"><p>Add an event to start...</p></div>}
                    
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
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-[#111] border border-gray-700 p-6 rounded-2xl w-full max-w-md relative text-center shadow-2xl">
                <button onClick={() => setShowAI(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X className="w-5 h-5"/></button>
                <Sparkles className="w-10 h-10 text-purple-500 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-white mb-4">AI Timeline Generator</h2>
                <input type="text" placeholder="e.g. History of Space Exploration..." className="w-full bg-black border border-gray-600 rounded-lg p-3 text-white mb-4 text-center" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} />
                <button onClick={handleAIGenerate} disabled={aiLoading} className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2">
                    {aiLoading ? <Loader2 className="animate-spin"/> : "Generate Timeline"}
                </button>
            </motion.div>
        </div>
      )}
      </AnimatePresence>
    </div>
  );
}