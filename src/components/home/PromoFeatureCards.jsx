import React from 'react';
import { useLeads } from '../../context/LeadContext';

export default function PromoFeatureCards({ onExploreSubscriptions, onRequestSampleBox }) {
  const { openQuoteModal, openCatalogueModal } = useLeads();

  return (
    <section className="py-12 sm:py-16 bg-[#FAF8F5] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* ======================================================== */}
          {/* CARD 1 (LEFT): SUBSCRIBE & SAVE / ANNUAL SUPPLY CONTRACTS */}
          {/* ======================================================== */}
          <div className="bg-[#EAE5D9] rounded-2xl p-6 sm:p-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            
            {/* Left Content */}
            <div className="w-full sm:w-1/2 space-y-3 z-10">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1E3A2B] tracking-tight uppercase">
                SUBSCRIBE & SAVE
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Save up to 15% on your regular production batches, scheduled containers delivered on-time to your facility.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openQuoteModal()}
                  className="bg-[#2D4A36] hover:bg-[#1E3A2B] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
                >
                  EXPLORE SUBSCRIPTIONS
                </button>
              </div>
            </div>

            {/* Right Image: Open Sage Green Box with Kraft Pouches */}
            <div className="w-full sm:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-white/40">
              <img 
                src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=700&q=80" 
                alt="Nuvaro Agro Scheduled Bulk Powders" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

          {/* ======================================================== */}
          {/* CARD 2 (RIGHT): THE PERFECT GIFT / THE PERFECT SAMPLE KIT */}
          {/* ======================================================== */}
          <div className="bg-[#F3EFE6] rounded-2xl p-6 sm:p-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-6 overflow-hidden relative group">
            
            {/* Left Content */}
            <div className="w-full sm:w-1/2 space-y-3 z-10">
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-[#1E3A2B] tracking-tight uppercase">
                THE PERFECT SAMPLE KIT
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                Beautifully curated trial powder sets for every formulation requirement & R&D lab trial.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openCatalogueModal()}
                  className="bg-[#786450] hover:bg-[#635140] text-white text-[11px] sm:text-xs font-semibold uppercase tracking-[0.16em] px-6 py-2.5 rounded-full transition-all shadow-sm hover:shadow"
                >
                  SHOP SAMPLE SETS
                </button>
              </div>
            </div>

            {/* Right Image: Open Kraft Box with 3 Metal Canisters and Silk Ribbon */}
            <div className="w-full sm:w-1/2 relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm bg-white/40">
              <img 
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80" 
                alt="Nuvaro Agro Curated Powder Sample Box" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
