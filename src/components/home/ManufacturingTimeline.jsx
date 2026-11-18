import React from 'react';
import { 
  Tractor, 
  Waves, 
  Wind, 
  SlidersHorizontal, 
  SearchCheck, 
  Box, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ManufacturingTimeline({ onExploreManufacturing }) {
  const steps = [
    {
      num: "01",
      icon: Tractor,
      title: "Contract Farm Harvest",
      desc: "Selected botanical varieties harvested at peak ripeness under Good Agricultural Practices (GAP)."
    },
    {
      num: "02",
      icon: Waves,
      title: "Ozone Washing & Prep",
      desc: "Automated bubbling wash flumes with ozone sterilization eliminate surface microbes without chemicals."
    },
    {
      num: "03",
      icon: Wind,
      title: "Controlled Dehydration",
      desc: "Gentle thermal drying curves (spray / vacuum freeze / conveyor belt) optimized per botanical profile."
    },
    {
      num: "04",
      icon: SlidersHorizontal,
      title: "Micronizing & Sieving",
      desc: "Milling and screening are selected to meet the particle-size requirement agreed for the product."
    },
    {
      num: "05",
      icon: SearchCheck,
      title: "Metal Detection & QA",
      desc: "Product-specific quality checks are reviewed against the agreed order specification."
    },
    {
      num: "06",
      icon: Box,
      title: "Cleanroom Nitrogen Packing",
      desc: "Pack format, batch identification and seal details are confirmed before order dispatch."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#F5F1E6]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2">
            Process & Quality Checks
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
            The Farm-to-Powder Process
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Every gram of powder undergoes six stringent processing stages within our state-of-the-art facility.
          </p>
        </div>

        {/* Visual Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white rounded-2xl p-5 border border-stone-200/90 shadow-sm hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-extrabold text-[#C9972B] bg-[#C9972B]/10 px-2 py-0.5 rounded">
                      STAGE {step.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#1F4D36] flex items-center justify-center group-hover:bg-[#1F4D36] group-hover:text-white transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-bold text-stone-900 text-sm mb-2 leading-tight">
                    {step.title}
                  </h3>

                  <p className="text-[11px] text-stone-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-stone-100 flex items-center gap-1 text-[10px] text-emerald-800 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#1F4D36]" />
                  <span>QC Passed</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Plant Facility Banner Link */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-stone-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#1F4D36] text-[#C9972B] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-stone-900 text-base">Explore Our Processing Plant & Testing Laboratories</h4>
              <p className="text-xs text-stone-500 mt-0.5">
                Our plant houses spray drying columns, continuous dehydration lines, and an in-house HPLC/Microbiology testing lab.
              </p>
            </div>
          </div>

          <button
            onClick={onExploreManufacturing}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-[#1F4D36] hover:bg-[#163a28] text-white text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <span>Virtual Plant Walkthrough</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
