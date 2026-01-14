"use client";

import { useRef } from "react";
import html2canvas from "html2canvas"; 
import { Download, Calendar, ArrowRight } from "lucide-react";

export default function TimelineDisplay({ events }: { events: any[] }) {
  const timelineRef = useRef<HTMLDivElement>(null);

  if (!events || events.length === 0) return null;

  // Function to download Timeline as Image
  const downloadImage = async () => {
    if (timelineRef.current) {
      // Background color black set kiya hai export ke liye
      const canvas = await html2canvas(timelineRef.current, { backgroundColor: "#050505", scale: 2 });
      const link = document.createElement("a");
      link.download = "timeline-export.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12">
      
      {/* Export Button */}
      <div className="flex justify-end gap-3 mb-6">
        <button onClick={downloadImage} className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] hover:bg-[#252525] rounded-lg text-sm text-white transition-all border border-white/10">
            <Download size={16} /> Export as Image
        </button>
      </div>

      {/* TIMELINE CONTAINER */}
      <div ref={timelineRef} className="relative p-8 md:p-12 bg-[#0a0a0a] rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        
        {/* Subtle Background Grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        {/* Center Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-12 bottom-12 w-[2px] bg-gradient-to-b from-white/5 via-white/20 to-white/5 z-0"></div>

        <div className="space-y-12 relative z-10">
          {events.map((event, index) => (
            <div 
                key={index} 
                // Layout logic: Even items go right, Odd items go left (on desktop)
                className={`relative flex flex-col md:flex-row gap-8 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
                
                {/* 1. CENTER DOT & YEAR BADGE */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex flex-col items-center justify-center z-20">
                    {/* Year Bubble */}
                    <div className="mb-3 bg-[#0a0a0a] border border-white/10 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm" style={{ color: event.color || '#a855f7', borderColor: event.color ? `${event.color}40` : '#ffffff20' }}>
                        {event.year}
                    </div>
                    {/* Dot */}
                    <div 
                        className="w-4 h-4 rounded-full bg-[#0a0a0a] border-[3px] shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-125"
                        style={{ borderColor: event.color || '#a855f7', boxShadow: `0 0 15px ${event.color}40` }}
                    ></div>
                </div>

                {/* Empty Space Spacer (to push text to side) */}
                <div className="hidden md:block flex-1"></div>

                {/* 2. CONTENT TEXT CARD */}
                <div className="flex-1 pl-20 md:pl-0 w-full">
                    <div 
                        className={`relative bg-[#111] border border-white/10 p-6 rounded-2xl hover:border-white/20 transition-all w-full shadow-lg group hover:-translate-y-1 duration-300 text-left
                        ${index % 2 !== 0 ? 'md:text-right md:items-end' : ''}
                        `}
                        style={{ borderLeft: index % 2 === 0 ? `4px solid ${event.color || '#a855f7'}` : '1px solid rgba(255,255,255,0.1)', borderRight: index % 2 !== 0 ? `4px solid ${event.color || '#a855f7'}` : '1px solid rgba(255,255,255,0.1)' }}
                    >
                         {/* Decorative gradient glow */}
                         <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                        
                        <h3 className="text-xl font-bold text-white mb-3 leading-tight flex items-center gap-2 justify-start" style={{ flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row' }}>
                            {event.title}
                        </h3>
                        
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">
                            {event.description}
                        </p>
                    </div>
                </div>

            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center pt-8 border-t border-white/5">
            <p className="text-gray-600 text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                <Sparkles size={14}/> Professional Timeline
            </p>
        </div>

      </div>
    </div>
  );
}

// Icon for footer
import { Sparkles } from "lucide-react";