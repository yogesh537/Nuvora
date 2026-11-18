import React from 'react';
import { 
  Sparkles, 
  Leaf, 
  Truck, 
  ShieldCheck, 
  RotateCcw 
} from 'lucide-react';

export default function TrustBarReference() {
  const trustItems = [
    {
      icon: Sparkles,
      title: "PREMIUM QUALITY",
      desc: "Finest whole farm harvest"
    },
    {
      icon: Leaf,
      title: "ETHICALLY SOURCED",
      desc: "Sustainable & fair trade"
    },
    {
      icon: Truck,
      title: "SHIPPING OPTIONS",
      desc: "Confirmed for each destination"
    },
    {
      icon: ShieldCheck,
      title: "PAYMENT TERMS",
      desc: "Shared with each quotation"
    },
    {
      icon: RotateCcw,
      title: "QUALITY SCOPE",
      desc: "Confirmed for each order"
    }
  ];

  return (
    <div className="bg-white border-b border-stone-200 py-6 sm:py-7">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-stone-100">
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div 
                key={index}
                className={`flex items-center gap-3.5 ${index > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''}`}
              >
                <div className="w-10 h-10 rounded-full bg-[#1E3A2B]/5 flex items-center justify-center text-[#1E3A2B] shrink-0">
                  <Icon className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-stone-900 leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[11.5px] text-stone-500 font-normal mt-0.5 leading-tight">
                    {item.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
