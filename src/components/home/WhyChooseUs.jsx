import React from 'react';
import { 
  Tractor, 
  ThermometerSnowflake, 
  QrCode, 
  PackageCheck, 
  Ship, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';

export default function WhyChooseUs() {
  const pillars = [
    {
      icon: Tractor,
      title: "Farm-Sourced Raw Material",
      desc: "Contract farming agreements with 1,200+ certified growers across Maharashtra and Gujarat agricultural belts. Processed within 24 hours of harvest to preserve active phytonutrients."
    },
    {
      icon: ThermometerSnowflake,
      title: "Controlled Drying Kinetics",
      desc: "Gentle multi-stage temperature control across our spray drying towers, continuous belt dryers, and lyophilizers prevents caramelization and protein denaturation."
    },
    {
      icon: QrCode,
      title: "100% Batch Traceability",
      desc: "Complete farm-gate to container provenance. Every drum is barcoded with lot data, soil pesticide screen records, and analytical laboratory testing results."
    },
    {
      icon: PackageCheck,
      title: "Bulk Food-Grade Packaging",
      desc: "Nitrogen-flushed multi-wall barrier bags, aluminium foil pouches, and sealed fibre drums engineered for zero moisture pick-up during trans-oceanic container shipping."
    },
    {
      icon: Ship,
      title: "On-Time Global Delivery",
      desc: "Direct access to JNPT (Nhava Sheva) and Mundra maritime ports. Fast customs documentation, certified phytosanitary clearance, and express DHL air samples."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#1F4D36] text-xs font-bold uppercase tracking-wider mb-2 border border-emerald-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9972B]" /> Industrial Quality Assurance
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1F4D36] tracking-tight">
            Why Leading Global Brands Choose Nuvaro Agro
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            Engineered to eliminate supply chain volatility and regulatory rejections for food and nutraceutical manufacturers worldwide.
          </p>
        </div>

        {/* 5 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={index}
                className="bg-[#F5F1E6]/40 rounded-2xl p-6 border border-stone-200 hover:border-[#1F4D36]/40 hover:bg-[#F5F1E6] hover:shadow-card transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1F4D36] text-[#C9972B] flex items-center justify-center mb-5 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-stone-900 text-base mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-200/60 flex items-center gap-1.5 text-[11px] font-semibold text-[#1F4D36]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9972B]" />
                  <span>Audited Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
