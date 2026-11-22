import React from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';

export default function FloatingWhatsApp() {
  const phoneNumber = "918087405952";
  const defaultMessage = encodeURIComponent("Hello Nuvaro Agro Export Desk, I would like to inquire about bulk dehydrated powders specification, FOB/CIF pricing, and lab samples.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Tooltip on hover */}
      <div className="hidden group-hover:flex items-center gap-1.5 bg-stone-900 text-white text-[11px] font-medium py-1.5 px-3 rounded-xl shadow-lg border border-stone-700 animate-fadeIn pointer-events-none">
        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        <span>Chat with Export Sales (Online)</span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat with Nuvaro Agro Export Desk"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-elevated transition-transform duration-200 transform hover:scale-110 active:scale-95 border-2 border-white"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366]" />
      </a>
    </div>
  );
}
