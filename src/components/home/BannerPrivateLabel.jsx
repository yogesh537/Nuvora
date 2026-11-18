import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, FlaskConical, PackageCheck } from 'lucide-react';

export default function BannerPrivateLabel({ onExplorePrivateLabel }) {
  const { openQuoteModal } = useLeads();

  return (
    <section className="py-12 bg-[#F5F1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#193E2C] via-[#1F4D36] to-[#163A28] text-white p-8 sm:p-12 shadow-elevated border border-emerald-800">
          
          {/* Subtle background graphics */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C9972B]/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9972B]/20 border border-[#C9972B]/40 text-[#C9972B] text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Turnkey Contract Manufacturing
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white font-sans leading-tight">
                “Your Formula. <span className="text-[#C9972B]">Our Powder.</span>”
              </h2>

              <p className="text-stone-200 text-sm sm:text-base max-w-2xl leading-relaxed">
                Whether you need a proprietary superfood green mix, carrier-free fruit powder, bespoke micronized mesh (&lt; 150 mesh), or retail-ready branded stand-up pouches, Nuvaro Agro delivers turnkey formulation and pilot batch trials.
              </p>

              {/* Feature pills */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs text-emerald-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B] shrink-0" />
                  <span>Custom Blend R&D</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B] shrink-0" />
                  <span>Carrier-Free Options</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9972B] shrink-0" />
                  <span>White Label Retail Packing</span>
                </div>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
              <button
                onClick={() => openQuoteModal({ name: "Custom Blend / Private Label Formulation", process: "Custom", meshSize: "Customer Spec", moq: "250 kg" })}
                className="w-full px-6 py-4 rounded-xl bg-gradient-to-r from-[#C9972B] to-[#b58622] hover:from-[#d4a233] hover:to-[#c49227] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 text-center"
              >
                <span>Start Custom Formulation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExplorePrivateLabel}
                className="w-full px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/20 transition-all text-center"
              >
                Learn About Our Private Label Process &rarr;
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
