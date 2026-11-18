import React from 'react';

export default function PressBar() {
  const publications = [
    { name: "Well+Good", style: "font-serif italic tracking-wide" },
    { name: "mindbodygreen", style: "font-sans font-bold lowercase tracking-tight" },
    { name: "Forbes", style: "font-serif font-black uppercase tracking-wider" },
    { name: "bon appétit", style: "font-serif italic lowercase tracking-tight" },
    { name: "healthline", style: "font-sans font-bold lowercase tracking-tight" },
    { name: "yahoo!life", style: "font-sans font-extrabold lowercase tracking-tight" }
  ];

  return (
    <div className="bg-white border-b border-stone-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Label on left */}
        <div className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.24em] text-stone-400 shrink-0">
          AS FEATURED IN
        </div>

        {/* Publication Logos Row */}
        <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-10 text-stone-700/80">
          {publications.map((pub, idx) => (
            <div 
              key={idx}
              className={`text-base sm:text-lg opacity-85 hover:opacity-100 transition-opacity select-none ${pub.style}`}
            >
              {pub.name}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
