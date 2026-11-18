import React from 'react';
import { useLeads } from '../../context/LeadContext';
import { FlaskConical, Sparkles, ArrowRight, ShieldCheck, Truck, Plane } from 'lucide-react';

export default function SampleOfferBanner() {
  const { openSampleModal } = useLeads();

  return (
    <section className="py-12 bg-[#F5F1E6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-white border-2 border-[#C9972B]/40 shadow-card p-8 sm:p-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#C9972B] text-xs font-bold uppercase tracking-wider border border-amber-200">
                <FlaskConical className="w-3.5 h-3.5" /> For Verified R&D & Formulation Teams
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
                “Get a Free 100g Sample for Your Lab Trial”
              </h2>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
                Test our solubility, sensory profile, moisture content, and particle dispersion in your own lab before placing a bulk container order. Each sample is packaged in moisture-proof barrier pouches with a matching batch COA.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <Plane className="w-4 h-4 text-[#1F4D36] shrink-0" />
                  <span>DHL / FedEx Express Dispatch</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#1F4D36] shrink-0" />
                  <span>Complete Batch COA Included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#1F4D36] shrink-0" />
                  <span>Zero Sample Fee for Buyers</span>
                </div>
              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="bg-[#F5F1E6] rounded-2xl p-6 border border-stone-200 text-center w-full max-w-sm">
                <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Immediate Lab Dispatch
                </span>
                <div className="text-xl font-bold text-[#1F4D36] mb-3">
                  100g Testing Sample
                </div>
                <button
                  onClick={() => openSampleModal()}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Free Lab Sample</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-stone-400 mt-2">
                  Corporate business email required for verification.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
