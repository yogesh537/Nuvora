import React, { useState } from 'react';
import { useLeads } from '../../context/LeadContext';
import { 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  MapPin, 
  ShieldCheck, 
  RotateCcw, 
  Clock, 
  Ship,
  FileCheck,
  Search,
  Sparkles
} from 'lucide-react';

export default function FarmToFacilityTracking() {
  const { openQuoteModal } = useLeads();
  const [activeStepIndex, setActiveStepIndex] = useState(3);

  const steps = [
    { title: "Harvest & QC", sub: "Contract Farm Tested", date: "Nov 14", icon: CheckCircle2, status: "completed" },
    { title: "Drying Tower", sub: "Class 100k Cleanroom", date: "Nov 15", icon: CheckCircle2, status: "completed" },
    { title: "Sealed Drums", sub: "Nitrogen Flushed", date: "Nov 16", icon: CheckCircle2, status: "completed" },
    { title: "At Sea Transit", sub: "JNPT to Rotterdam", date: "Nov 18", icon: Ship, status: "active" }
  ];

  return (
    <section className="py-14 lg:py-20 bg-[#FAF7F0] relative overflow-hidden">
      
      {/* Decorative leaf motifs */}
      <div className="absolute top-12 left-10 text-emerald-800/10 pointer-events-none select-none hidden lg:block animate-float">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z"/>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* ======================================================== */}
          {/* LEFT SIDE: "From Our Farm To Your Facility, Fresh & Fast"*/}
          {/* ======================================================== */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Cursive Tag */}
            <div className="flex items-center gap-2">
              <span className="font-script text-2xl sm:text-3xl text-emerald-800 font-bold animate-pulse-subtle">
                From Our Farm
              </span>
            </div>

            {/* Headline matching reference structure */}
            <div className="space-y-1">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F4D36] tracking-tight leading-[1.12]">
                To Your Facility,
              </h2>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-[#1F4D36] tracking-tight leading-[1.12]">
                Fresh & Fast.
              </h3>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Orders move through ingredient preparation, product-specific quality checks, packing and dispatch planning. The test scope and supporting documents are confirmed for each order.
            </p>

            {/* 3 Green Bullet Blocks */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-[#1F4D36] group-hover:text-white transition-colors flex items-center justify-center shrink-0 text-[#1F4D36] mt-0.5 shadow-sm">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Order progress & document scope</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Delivery timing and available documents are confirmed for each order.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-[#1F4D36] group-hover:text-white transition-colors flex items-center justify-center shrink-0 text-[#1F4D36] mt-0.5 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">Product-specific quality checks</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Moisture and other test targets are agreed in the product specification.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 group">
                <div className="w-10 h-10 rounded-full bg-emerald-100 group-hover:bg-[#1F4D36] group-hover:text-white transition-colors flex items-center justify-center shrink-0 text-[#1F4D36] mt-0.5 shadow-sm">
                  <Ship className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-stone-900">On-Time Ocean & Air Transit</h4>
                  <p className="text-xs text-stone-500 mt-0.5">Direct maritime sailings via JNPT (Nhava Sheva) and Mundra sea ports.</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button
                onClick={() => openQuoteModal()}
                className="px-8 py-3.5 rounded-full bg-[#1F4D36] hover:bg-[#163a28] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
              >
                <span>Request Quotation & Track Order</span>
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>

          </div>

          {/* ======================================================== */}
          {/* RIGHT SIDE: Interactive Consignment Tracking Card        */}
          {/* (Exactly matching the reference card design!)            */}
          {/* ======================================================== */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-stone-200/90 space-y-6 transform hover:shadow-elevated transition-shadow duration-300">
              
              {/* Card Header: Title & Live indicator */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <div>
                  <span className="text-xs font-mono font-bold text-stone-400 block uppercase">
                    Consignment Dispatch Tracker
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
                    <span>Track Your Commercial Shipment & COA</span>
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>Live Dispatch</span>
                </div>
              </div>

              {/* Delivery Partner / Account Officer Strip */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF7F0] p-4 rounded-2xl border border-stone-200/60">
                <div className="flex items-center gap-3.5">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Export Operations Head"
                      className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-sm"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">Vikram Singhania</h4>
                    <p className="text-xs text-stone-500">Sr. Global Export Operations Head</p>
                    <div className="flex items-center gap-1 text-xs text-amber-500 mt-0.5">
                      <span>★ ★ ★ ★ ★</span>
                      <span className="text-stone-700 font-semibold ml-1">4.9 / 5.0</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2">
                  <a
                    href="tel:+919820012345"
                    className="p-2.5 rounded-full bg-white text-emerald-800 hover:bg-emerald-50 border border-stone-200 shadow-sm transition-colors"
                    title="Call Export Desk"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a
                    href="https://wa.me/919820012345"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-full bg-[#25D366] text-white hover:bg-emerald-600 shadow-sm transition-transform hover:scale-110"
                    title="Direct WhatsApp"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Status Header: "On the way" */}
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-3">
                  <span className="text-stone-800 font-bold text-sm">
                    Consignment Status: <span className="text-emerald-700">Customs Cleared &bull; Vessel In Transit</span>
                  </span>
                  <span className="text-stone-400 font-mono text-[11px] bg-stone-50 px-2 py-0.5 rounded border border-stone-200">
                    ETA: 4 Days Ahead of Schedule
                  </span>
                </div>

                {/* Stepper with Green Checked Circles & Animated Traveling Dot */}
                <div className="relative pt-2 pb-2">
                  <div className="absolute top-6 left-6 right-6 h-1 bg-emerald-100 rounded-full">
                    <div className="h-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-[#C9972B] w-3/4 rounded-full transition-all duration-1000"></div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2 relative z-10 text-center">
                    {steps.map((st, i) => {
                      const Icon = st.icon;
                      const isComplete = st.status === 'completed';
                      return (
                        <div key={i} className="group cursor-default">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-1.5 shadow-sm transition-transform group-hover:scale-110 ${
                            isComplete 
                              ? 'bg-emerald-600 text-white' 
                              : 'bg-[#C9972B] text-white animate-pulse shadow-md ring-4 ring-[#C9972B]/20'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="text-[11px] font-bold text-stone-900 block leading-tight">{st.title}</span>
                          <span className="text-[9px] text-stone-400 block">{st.sub}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Transit Route Visualization Banner */}
              <div className="rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 shrink-0">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Port of Loading</span>
                      <span className="font-bold text-stone-800">Nhava Sheva (JNPT), Mumbai, India</span>
                    </div>
                  </div>

                  <div className="text-emerald-700 font-mono text-center text-xs font-semibold px-2 py-1 rounded bg-emerald-50 border border-emerald-200/60 hidden sm:flex items-center gap-1">
                    <span>Maritime Route (Direct)</span>
                    <Ship className="w-3.5 h-3.5 animate-bounce" />
                  </div>

                  <div className="flex items-center gap-2.5 sm:text-right">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-[#C9972B] shrink-0 sm:order-last">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase font-bold block">Discharge Port</span>
                      <span className="font-bold text-stone-800">Rotterdam / Hamburg / Long Beach</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
