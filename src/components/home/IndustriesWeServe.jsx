import React from 'react';
import { industriesList } from '../../data/products';
import { 
  Utensils, 
  Pill, 
  Cake, 
  Baby, 
  PawPrint, 
  Sparkles, 
  Wheat, 
  ArrowRight 
} from 'lucide-react';

const iconMap = {
  Utensils,
  Pill,
  Cake,
  Baby,
  PawPrint,
  Sparkles,
  Wheat
};

export default function IndustriesWeServe({ onSelectIndustry }) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-[#C9972B] text-xs font-bold uppercase tracking-wider mb-2 border border-amber-200">
            Tailored Applications
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
            Industries We Supply Worldwide
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Formulation-grade botanical powders engineered to meet unique functional, physical, and regulatory demands.
          </p>
        </div>

        {/* 7 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesList.map((ind, idx) => {
            const Icon = iconMap[ind.icon] || Sparkles;
            return (
              <div
                key={idx}
                className="bg-[#F5F1E6]/40 rounded-2xl p-6 border border-stone-200/80 hover:border-[#1F4D36]/40 hover:bg-[#F5F1E6] hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center text-[#1F4D36] shadow-sm mb-4">
                    <Icon className="w-6 h-6 text-[#1F4D36]" />
                  </div>

                  <h3 className="font-bold text-stone-900 text-base mb-2">
                    {ind.name}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/60">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                    Recommended Powders:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {ind.powders.map((p, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-semibold bg-white text-[#1F4D36] px-2 py-0.5 rounded border border-stone-200 shadow-2xs"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* 8th Card: Custom Consultation Box */}
          <div className="bg-[#1F4D36] text-white rounded-2xl p-6 flex flex-col justify-between shadow-card">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C9972B] text-white flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">
                Have a Custom Industry Specification?
              </h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                Our food technologists and QA engineers will evaluate your target moisture, viscosity, and microbial specifications.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onSelectIndustry()}
                className="w-full py-2.5 px-4 rounded-xl bg-[#C9972B] hover:bg-[#b58622] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Consult Our R&D Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
