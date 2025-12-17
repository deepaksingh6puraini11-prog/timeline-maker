"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Plus, Trash2, Download, LogOut } from "lucide-react";
import { toPng } from 'html-to-image';
import toast from "react-hot-toast";

// Supabase Connect
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  description: string;
}

export default function EditorPage() {
  const router = useRouter();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", description: "" });
  const [saving, setSaving] = useState(false);

  // 1. Check User & Load Data
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data } = await supabase
        .from('timeline_events')
        .select('*')
        .order('date', { ascending: true });

      if (data) setEvents(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    router.push("/login");
  };

  // 2. Add Event
  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date) {
        toast.error("Please fill Title and Date!");
        return;
    }
    setSaving(true);

    const { data, error } = await supabase
      .from('timeline_events')
      .insert([{ 
          user_id: user.id,
          title: newEvent.title, 
          date: newEvent.date, 
          description: newEvent.description 
        }])
      .select();

    if (error) {
      toast.error(error.message);
    } else {
      if(data) setEvents([...events, ...data]);
      setNewEvent({ title: "", date: "", description: "" });
      toast.success("Event added successfully! 🎉");
    }
    setSaving(false);
  };

  // 3. Delete Event
  const deleteEvent = async (id: number) => {
    if(!confirm("Are you sure you want to delete this?")) return;

    const { error } = await supabase
      .from('timeline_events')
      .delete()
      .eq('id', id);

    if (!error) {
      setEvents(events.filter((e) => e.id !== id));
      toast.success("Event deleted!");
    } else {
      toast.error("Could not delete");
    }
  };

  const handleExport = useCallback(() => {
    if (timelineRef.current === null) return;
    const loadToast = toast.loading("Generating image...");

    toPng(timelineRef.current, { cacheBust: true, backgroundColor: '#111827' })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-timeline.png';
        link.href = dataUrl;
        link.click();
        toast.dismiss(loadToast);
        toast.success("Image downloaded! 📸");
      })
      .catch((err) => {
        toast.error("Failed to export image");
      });
  }, [timelineRef]);

  // Timeline Logic
  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const minDate = sortedEvents.length > 0 ? new Date(sortedEvents[0].date).getTime() : 0;
  const maxDate = sortedEvents.length > 0 ? new Date(sortedEvents[sortedEvents.length - 1].date).getTime() : 1;
  const totalDuration = maxDate - minDate;

  const getPosition = (dateStr: string) => {
    if (totalDuration === 0) return 50;
    const current = new Date(dateStr).getTime();
    return ((current - minDate) / totalDuration) * 100;
  };

  // 🔥 NEW SKELETON LOADING (Ye naya magic hai) 🔥
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-6">
        <div className="max-w-6xl mx-auto animate-pulse">
          {/* Header Skeleton */}
          <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
             <div className="h-8 bg-gray-800 rounded w-48"></div>
             <div className="h-10 bg-gray-800 rounded w-32"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Form Skeleton (Sidebar) */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 h-96">
               <div className="h-6 bg-gray-800 rounded w-1/3 mb-6"></div>
               <div className="space-y-4">
                 <div className="h-12 bg-gray-800 rounded"></div>
                 <div className="h-12 bg-gray-800 rounded"></div>
                 <div className="h-24 bg-gray-800 rounded"></div>
                 <div className="h-12 bg-gray-700 rounded mt-4"></div>
               </div>
            </div>

            {/* Timeline Display Skeleton (Main Area) */}
            <div className="lg:col-span-3 bg-[#111827] border border-gray-800 rounded-xl h-[400px] flex items-center justify-center p-8">
               <div className="h-1 w-full bg-gray-800 rounded relative">
                  <div className="absolute left-[20%] top-[-6px] w-4 h-4 bg-gray-700 rounded-full"></div>
                  <div className="absolute left-[50%] top-[-6px] w-4 h-4 bg-gray-700 rounded-full"></div>
                  <div className="absolute left-[80%] top-[-6px] w-4 h-4 bg-gray-700 rounded-full"></div>
               </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Return (Jab data load ho jaye)
  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center text-gray-400 hover:text-white transition">
            <ArrowLeft className="w-5 h-5 mr-2" /> Home
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Timeline Editor
            </h1>
        </div>
        
        <div className="flex items-center gap-4">
            <button onClick={handleExport} className="bg-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-700 flex items-center gap-2 text-sm">
            <Download className="w-4 h-4" /> Export
            </button>
            <button onClick={handleLogout} className="bg-red-600/20 text-red-500 hover:bg-red-600 hover:text-white px-3 py-2 rounded-lg transition-all">
                <LogOut className="w-4 h-4" />
            </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ADD EVENT FORM */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 h-fit">
          <h2 className="text-lg font-semibold mb-4">Add Event</h2>
          <div className="space-y-4">
            <input type="text" className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Title" />
            <input type="date" className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
            <textarea className="w-full bg-black border border-gray-700 rounded-lg p-2 text-white text-sm" rows={2} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} placeholder="Description" />
            
            <button 
              onClick={addEvent} 
              disabled={saving}
              className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2"
            >
              {saving ? "Saving..." : <><Plus className="w-4 h-4" /> Add Event</>}
            </button>
          </div>
        </div>

        {/* TIMELINE DISPLAY */}
        <div className="lg:col-span-3">
            <div ref={timelineRef} className="bg-[#111827] border border-gray-800 rounded-xl p-8 min-h-[400px] flex items-center justify-center overflow-x-auto text-white relative">
            <div className="relative w-full h-64 flex items-center px-10">
                <div className="absolute w-full h-1 bg-gray-700 rounded-full left-0"></div>
                
                {sortedEvents.length === 0 && <p className="absolute w-full text-center text-gray-500">No events found. Add your first event!</p>}

                {sortedEvents.map((ev) => {
                const leftPos = getPosition(ev.date);
                return (
                    <div key={ev.id} className="absolute transform -translate-x-1/2 flex flex-col items-center group cursor-pointer hover:z-50" style={{ left: `${leftPos}%` }}>
                    <div className="w-4 h-4 bg-purple-500 rounded-full border-4 border-[#111827] z-10 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-125 transition-transform"></div>
                    <div className="h-8 w-0.5 bg-gray-600 mt-1"></div>
                    <div className="mt-1 bg-gray-800/90 backdrop-blur border border-gray-700 p-3 rounded-lg w-40 text-center shadow-xl group-hover:border-purple-500 transition-colors relative">
                        <button onClick={(e) => { e.stopPropagation(); deleteEvent(ev.id); }} className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-3 h-3" /></button>
                        <div className="text-xs text-purple-300 font-bold mb-1">{ev.date}</div>
                        <div className="text-sm font-semibold text-white leading-tight">{ev.title}</div>
                    </div>
                    </div>
                );
                })}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}