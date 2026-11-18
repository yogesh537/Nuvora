import React from 'react';
import { ShieldCheck, FileCheck2, Globe2, Sliders, CheckCircle } from 'lucide-react';

export default function TrustStrip() {
  const trustItems = [
    {
      icon: ShieldCheck,
      title: "FSSAI Licensed Facility",
      subtitle: "Facility license details available on request"
    },
    {
      icon: FileCheck2,
      title: "Lab Tested (COA with Every Batch)",
      subtitle: "Comprehensive Heavy Metal, TPC & Residual Testing"
    },
    {
      icon: Globe2,
      title: "Export Ready (50+ Countries)",
      subtitle: "FOB/CIF Nhava Sheva & Mundra Port Logistics"
    },
    {
      icon: Sliders,
      title: "Custom Specs & Mesh Size",
      subtitle: "60 to 120 Mesh, Carrier-Free & Private Blends"
    }
  ];

  return (
    <div className="bg-[#1F4D36] border-y border-emerald-900/60 py-6 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className="flex items-center gap-3.5 p-2 rounded-xl hover:bg-white/5 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-[#C9972B]/20 border border-[#C9972B]/40 flex items-center justify-center shrink-0 text-[#C9972B]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs text-emerald-200/80 mt-0.5 leading-tight">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
